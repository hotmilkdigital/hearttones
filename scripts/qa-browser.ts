/**
 * Browser QA on the built site (run after `npm run build`): npm run qa:browser [-- --shots]
 * Starts `astro preview` on port 4330, drives the installed Chrome with puppeteer-core and checks:
 * - every built page at 390 and 1440 px: no horizontal overflow, no script errors, no failed
 *   requests and no request to another origin (no external requests in v1, CLAUDE.md §10);
 * - skip link, mobile menu (disclosure + Escape), audio player (mouse, keyboard tabs, bar button,
 *   DE and EN), map markers focusable, consent video button shown without loading YouTube;
 * - a missing DE and EN URL returns HTTP 404.
 * With --shots: full-page screenshots per page and width in qa-shots/ (gitignored).
 * Chrome: CHROME_PATH or the default install paths. Exits 1 on any failure.
 */

import { existsSync, mkdirSync, mkdtempSync, rmSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, sep } from 'node:path';
import { preview } from 'astro';
import puppeteer, { type Page } from 'puppeteer-core';

const PORT = 4330;
const BASE = `http://localhost:${PORT}`;
const DIST = 'dist';
const SHOTS = 'qa-shots';
const shots = process.argv.includes('--shots');

const chromePath = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((p) => p && existsSync(p));
if (!chromePath) {
  console.error('Chrome not found – set CHROME_PATH.');
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error('dist/ missing – run npm run build first.');
  process.exit(1);
}

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const urls = walk(DIST)
  .filter((f) => f.endsWith('.html') && !f.endsWith('404.html'))
  .map((f) => '/' + relative(DIST, f).split(sep).join('/').replace(/index\.html$/, ''))
  .sort();

const failures: string[] = [];
const fail = (msg: string) => {
  failures.push(msg);
  console.log(`  ✗ ${msg}`);
};
const pass = (msg: string) => console.log(`  ✓ ${msg}`);
const check = (ok: boolean, msg: string) => (ok ? pass(msg) : fail(msg));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Polls the shared <audio> until it plays and has advanced, or gives up after `ms`. */
const playing = async (page: Page, ms = 6000) => {
  for (const until = Date.now() + ms; Date.now() < until; await wait(200)) {
    const s = await audioState(page);
    if (s && !s.paused && s.t > 0.3) return s;
  }
  return audioState(page);
};
const audioState = (page: Page) =>
  page.evaluate(() => {
    const a = document.querySelector<HTMLAudioElement>('[data-player] audio');
    return a ? { src: a.currentSrc.split('/').slice(-2).join('/'), paused: a.paused, t: a.currentTime } : null;
  });
const activeIs = (page: Page, selector: string) =>
  page.evaluate((s) => document.activeElement?.matches(s) ?? false, selector);

const server = await preview({ root: '.', logLevel: 'warn', server: { port: PORT } });
const profile = mkdtempSync(join(tmpdir(), 'hearttones-qa-'));
const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  userDataDir: profile,
  args: ['--no-first-run', '--no-default-browser-check', '--mute-audio'],
});

try {
  const page = await browser.newPage();
  let problems: string[] = [];
  page.on('pageerror', (e) => problems.push(`script error: ${(e as Error).message}`));
  page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
  // A track switch or pause aborts the running MP3 download – not an error.
  page.on('requestfailed', (r) => {
    if (!(r.failure()?.errorText === 'net::ERR_ABORTED' && r.url().endsWith('.mp3')))
      problems.push(`request failed: ${r.url()} ${r.failure()?.errorText}`);
  });
  page.on('request', (r) => {
    if (!r.url().startsWith(BASE) && !r.url().startsWith('data:')) problems.push(`external request: ${r.url()}`);
  });
  page.on('response', (r) => r.status() >= 400 && r.url().startsWith(BASE) && problems.push(`${r.status()} ${r.url()}`));

  console.log(`\nPages (${urls.length}) at 390 and 1440 px`);
  if (shots) mkdirSync(SHOTS, { recursive: true });
  for (const url of urls) {
    for (const width of [390, 1440]) {
      problems = [];
      await page.setViewport({ width, height: 900 });
      await page.goto(BASE + url, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) problems.push(`horizontal overflow ${overflow}px`);
      for (const p of problems) fail(`${url} @${width}: ${p}`);
      if (shots) {
        const name = (url.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home') + `_${width}.png`;
        await page.screenshot({ path: join(SHOTS, name), fullPage: true });
      }
    }
  }
  if (!failures.length) pass('no overflow, errors or external requests');
  problems = [];

  console.log('\nSkip link');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.keyboard.press('Tab');
  check(await activeIs(page, '.skip-link'), 'first Tab focuses the skip link');
  await page.keyboard.press('Enter');
  check(new URL(page.url()).hash === '#main', 'Enter jumps to #main');

  console.log('\nMobile menu (390 px)');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  const expanded = () => page.$eval('[data-menu-toggle]', (b) => b.getAttribute('aria-expanded'));
  await page.click('[data-menu-toggle]');
  check((await expanded()) === 'true', 'toggle opens the menu (aria-expanded=true)');
  check(await page.$eval('[data-menu]', (n) => (n as HTMLElement).offsetHeight > 0), 'menu is visible');
  await page.keyboard.press('Escape');
  check((await expanded()) === 'false' && (await activeIs(page, '[data-menu-toggle]')), 'Escape closes it and returns focus');

  console.log('\nAudio player');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.click('#vol-1-03 [data-track-toggle]');
  let s = await playing(page);
  check(!!s && !s.paused && s.src.startsWith('vol-1/'), `homepage: track button plays Vol. 1 track 3 (${s?.src})`);
  await page.click('#vol-1-03 [data-track-toggle]');
  await wait(300);
  check(!!(await audioState(page))?.paused, 'second click pauses');
  await page.focus('#tab-vol-1');
  await page.keyboard.press('ArrowRight');
  check(
    (await page.$eval('#tab-vol-2', (t) => t.getAttribute('aria-selected'))) === 'true' && (await activeIs(page, '#tab-vol-2')),
    'ArrowRight on the tabs selects Vol. 2',
  );
  await page.focus('#vol-2-01 [data-track-toggle]');
  await page.keyboard.press('Enter');
  s = await playing(page);
  check(!!s && !s.paused && s.src.startsWith('vol-2/'), `keyboard Enter plays Vol. 2 track 1 (${s?.src})`);
  await page.goto(BASE + '/en/music/lullabies-vol-2/', { waitUntil: 'networkidle0' });
  await page.click('[data-bar-toggle]');
  s = await playing(page);
  check(!!s && !s.paused, `EN Vol. 2 page: bar button plays (${s?.src})`);

  console.log('\nMap and video');
  await page.goto(BASE + '/die-reise/', { waitUntil: 'networkidle0' });
  const markers = await page.$$eval('.marker', (m) => m.length);
  // SVG <a>: page.focus() only takes HTML elements
  await page.$eval('.marker', (m) => (m as SVGAElement).focus());
  check(markers >= 24 && (await activeIs(page, '.marker')), `${markers} map markers, focusable`);
  await page.goto(BASE + '/philipp-von-rothkirch/', { waitUntil: 'networkidle0' });
  const buttons = await page.$$eval('[data-video-load]', (b) => b.filter((x) => !(x as HTMLButtonElement).hidden).length);
  check(buttons > 0 && !(await page.$('iframe')), `${buttons} „Video laden" buttons, no iframe before the click`);

  for (const p of problems) fail(`interactive checks: ${p}`);

  // Last, as these pages log their own 404s
  console.log('\n404');
  for (const url of ['/gibt-es-nicht/', '/en/does-not-exist/']) {
    const res = await page.goto(BASE + url, { waitUntil: 'networkidle0' });
    check(res?.status() === 404, `${url} → HTTP ${res?.status()}`);
  }
} finally {
  await browser.close();
  await server.stop();
  rmSync(profile, { recursive: true, force: true });
}

console.log(failures.length ? `\n${failures.length} failure(s).` : '\nAll browser checks passed.');
process.exit(failures.length ? 1 : 0);
