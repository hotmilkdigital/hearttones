/**
 * QA on the built site (run after `npm run build`): npm run qa:dist [-- --write]
 * - SEO checks per page (CLAUDE.md §8.7): unique title and description, description length,
 *   canonical, og:image file exists, JSON-LD parses, exactly one <h1>, lang, alt on every <img>,
 *   every internal link resolves to a built page, every #fragment (same page or other page) and
 *   every aria-labelledby/-controls/-describedby resolves to an id on that page; ids are unique and
 *   lowercase ASCII (anchors.ts, CLAUDE.md §11).
 * - EN pages (/en/): lang="en", hreflang alternate, and a list of German words still visible
 *   outside lang="de" elements (for a human check, not failed).
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

// All ids per page, for the fragment and ARIA reference checks.
const ID_FORMAT = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const idsByUrl = new Map(pages.map(({ url, html }) => [url, [...html.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]!)]));

const errors: string[] = [];
const warn: string[] = [];
const meta = (html: string, attr: string, name: string) =>
  decode(html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1] ?? '');

const titles = new Map<string, string[]>();
const descriptions = new Map<string, string[]>();
const placeholders: { url: string; text: string }[] = [];
const germanOnEn: { url: string; text: string }[] = [];

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

  // Ids: unique, lowercase ASCII, language-neutral (anchors.ts).
  const pageIds = idsByUrl.get(url)!;
  const idSet = new Set(pageIds);
  for (const id of new Set(pageIds.filter((id, i) => pageIds.indexOf(id) !== i))) errors.push(`${url}: duplicate id "${id}"`);
  for (const id of idSet) if (!ID_FORMAT.test(id)) errors.push(`${url}: id "${id}" is not lowercase ASCII`);

  // Every #fragment link resolves to an id on the target page (same page or another built page).
  for (const m of html.matchAll(/<a\b[^>]*\bhref="(\/[^"#?]*)?#([^"]*)"/g)) {
    const path = m[1] ?? url;
    const fragment = decodeURIComponent(m[2]!);
    if (!fragment) continue;
    const targetIds = idsByUrl.get(path.replace(/index\.html$/, ''));
    if (!targetIds) continue; // a missing page is reported above
    if (!targetIds.includes(fragment)) errors.push(`${url}: link to ${path}#${fragment} – no such id`);
  }

  // ARIA references point to ids on the same page.
  for (const m of html.matchAll(/\saria-(labelledby|controls|describedby)="([^"]*)"/g))
    for (const ref of m[2]!.split(/\s+/).filter(Boolean))
      if (!idSet.has(ref)) errors.push(`${url}: aria-${m[1]} refers to missing id "${ref}"`);

  // EN pages: lang="en", hreflang pair, and no German text outside lang="de" elements (press
  // headlines, tax note, German song titles) and [PLATZHALTER] markers. German hits are listed for a
  // human check, not failed – names like „Böckelmann" or „Wartenburgstraße" are correct in EN too.
  if (url.startsWith('/en/')) {
    if (!/<html lang="en"/.test(html)) errors.push(`${url}: EN page without <html lang="en">`);
    if (!/<link rel="alternate" hreflang="de"/.test(html) && !is404) errors.push(`${url}: EN page without hreflang="de" alternate`);
    let visible = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<span class="placeholder">[\s\S]*?<\/span>/g, ' ');
    // Drop elements marked German (innermost first, repeated for nesting).
    for (let i = 0; i < 5; i++) visible = visible.replace(/<(\w+)\b[^>]*\blang="de"[^>]*>(?:(?!<\1\b)[\s\S])*?<\/\1>/g, ' ');
    const attrText = [...visible.matchAll(/\b(?:alt|aria-label|title|content)="([^"]*)"/g)].map((m) => m[1]).join(' | ');
    const plain = decode(`${visible.replace(/<[^>]+>/g, ' ')} | ${attrText}`).replace(/\s+/g, ' ');
    const german = /\b(und|der|die|das|mit|für|nicht|oder|zur|zum|im|bei|Sie|Ihr|Ihre|Lieder|Länder|Musiker:innen|Künstler:innen|Seite|Startseite|Foto|verstorben|Nr\.)(?=[\s.,:;!?)]|$)|\b\w*(?<!Böckelm|Wartenburgstr|Ciocărl)(?:ä|ö|ü|ß)\w*/g;
    const hits = new Set<string>();
    for (const m of plain.matchAll(german)) {
      const at = m.index ?? 0;
      hits.add(plain.slice(Math.max(0, at - 35), at + m[0].length + 35).trim());
    }
    for (const h of hits) germanOnEn.push({ url, text: h });
  }

  // Placeholders in text and attributes
  const text =decode(html.replace(/<script[\s\S]*?<\/script>/g, (s) => (s.includes('PLATZHALTER') ? s : '')).replace(/<[^>]+>/g, ' '));
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

if (pages.some((p) => p.url.startsWith('/en/'))) {
  console.log(`
German text on EN pages (outside lang="de"): ${germanOnEn.length}`);
  for (const g of germanOnEn) console.log(`  - ${g.url}: …${g.text}…`);
}

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
