/**
 * QA on the built site (run after `npm run build`): npm run qa:dist [-- --write]
 * - SEO checks per page (CLAUDE.md §8.7): unique title and description, description length,
 *   canonical, og:image file exists, JSON-LD parses, exactly one <h1>, lang, alt on every <img>,
 *   every internal link resolves to a built page.
 * - Lists every [PLATZHALTER: …] per page (§5.1). With --write: docs/platzhalter.md.
 * Exits 1 on SEO errors; placeholders are reported, not failed (they are expected on staging).
 */

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SITE = 'https://hearttones.net';
const write = process.argv.includes('--write');

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const decode = (s: string) =>
  s
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const pages = walk(DIST)
  .filter((f) => f.endsWith('.html'))
  .map((file) => {
    const url = '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '');
    return { file, url, html: readFileSync(file, 'utf8') };
  })
  .sort((a, b) => a.url.localeCompare(b.url));

const errors: string[] = [];
const warn: string[] = [];
const meta = (html: string, attr: string, name: string) =>
  decode(html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1] ?? '');

const titles = new Map<string, string[]>();
const descriptions = new Map<string, string[]>();
const placeholders: { url: string; text: string }[] = [];

for (const { url, html } of pages) {
  const is404 = url === '/404';
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const description = meta(html, 'name', 'description');

  if (!title) errors.push(`${url}: missing <title>`);
  if (!description) errors.push(`${url}: missing meta description`);
  titles.set(title, [...(titles.get(title) ?? []), url]);
  descriptions.set(description, [...(descriptions.get(description) ?? []), url]);
  if (description && (description.length < 50 || description.length > 170))
    warn.push(`${url}: description is ${description.length} characters (aim for 50–170)`);
  if (title.length > 70) warn.push(`${url}: title is ${title.length} characters (may be cut in results)`);

  if (!/<html lang="(de|en)"/.test(html)) errors.push(`${url}: missing lang on <html>`);
  if (!is404 && !/<link rel="canonical" href="https:\/\/hearttones\.net\/[^"]*"/.test(html))
    errors.push(`${url}: missing canonical`);

  const ogImage = meta(html, 'property', 'og:image');
  if (!ogImage) errors.push(`${url}: missing og:image`);
  else if (!existsSync(join(DIST, ogImage.replace(SITE, '')))) errors.push(`${url}: og:image not in dist: ${ogImage}`);
  for (const p of ['og:title', 'og:description', 'og:image:alt'])
    if (!meta(html, 'property', p)) errors.push(`${url}: missing ${p}`);

  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (!ld) errors.push(`${url}: missing JSON-LD`);
  else {
    try {
      const data = JSON.parse(ld);
      if (!Array.isArray(data['@graph'])) errors.push(`${url}: JSON-LD has no @graph`);
    } catch (e) {
      errors.push(`${url}: JSON-LD does not parse – ${(e as Error).message}`);
    }
  }

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) errors.push(`${url}: ${h1} <h1> elements`);

  for (const img of html.match(/<img\b[^>]*>/g) ?? [])
    if (!/\balt="/.test(img)) errors.push(`${url}: <img> without alt: ${img.slice(0, 80)}`);

  // Internal links must resolve to a built page or file (no link into the 404).
  for (const m of html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)/g)) {
    const href = m[1]!;
    const target = href.endsWith('/') ? join(DIST, href, 'index.html') : join(DIST, href);
    if (!existsSync(target) && !existsSync(join(DIST, `${href}.html`)))
      errors.push(`${url}: internal link to ${href} has no page`);
  }

  // Placeholders in text and attributes
  const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, (s) => (s.includes('PLATZHALTER') ? s : '')).replace(/<[^>]+>/g, ' '));
  const attrs = decode(html.match(/"[^"]*\[PLATZHALTER:[^"]*"/g)?.join(' ') ?? '');
  const seen = new Set<string>();
  for (const m of `${text} ${attrs}`.matchAll(/\[PLATZHALTER:\s*([^\]]+)\]/g)) {
    const t = m[1]!.replace(/\s+/g, ' ').trim();
    if (!seen.has(t)) {
      seen.add(t);
      placeholders.push({ url, text: t });
    }
  }
}

for (const [t, urls] of titles) if (t && urls.length > 1) errors.push(`duplicate title "${t}": ${urls.join(', ')}`);
for (const [d, urls] of descriptions) if (d && urls.length > 1) errors.push(`duplicate description: ${urls.join(', ')}`);

// Report
console.log(`qa:dist – ${pages.length} pages`);
for (const w of warn) console.log(`  warn: ${w}`);
for (const e of errors) console.log(`  ERROR: ${e}`);

const byText = new Map<string, string[]>();
for (const p of placeholders) byText.set(p.text, [...(byText.get(p.text) ?? []), p.url]);
console.log(`\n${byText.size} distinct placeholders (${placeholders.length} occurrences):`);
for (const [t, urls] of byText) console.log(`  - ${t}  (${urls.join(', ')})`);

if (write) {
  mkdirSync('docs', { recursive: true });
  const rows = [...byText].map(([t, urls]) => `| ${t.replace(/\|/g, '\\|')} | ${urls.map((u) => `\`${u}\``).join(', ')} |`);
  writeFileSync(
    'docs/platzhalter.md',
    `# PLATZHALTER – offene Inhalte\n\nGeneriert von \`npm run qa:dist -- --write\` aus dem Build (\`dist/\`). ${byText.size} verschiedene Platzhalter, ${placeholders.length} Vorkommen. Vor jedem Release: Liste muss leer sein.\n\n| Was fehlt | Seiten |\n|---|---|\n${rows.join('\n')}\n`,
  );
  console.log('\nwrote docs/platzhalter.md');
}

if (errors.length) process.exit(1);
