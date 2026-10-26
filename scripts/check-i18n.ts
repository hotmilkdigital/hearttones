/**
 * EN completeness check (docs/i18n-inventory.md §5.8): npm run check:i18n
 * - ui.ts: every key has an EN value (not null, not empty) with the same {placeholders} as DE
 *   (link slots such as {link} may be left out in EN).
 * - Data files: every Localized field ({ de, en }) has an EN value; arrays of the same length.
 * While `enPublished` is false the check only reports (exit 0), so the DE build is never blocked.
 * Once EN is published, any missing string fails the build (exit 1).
 */
import { registerHooks } from 'node:module';

// The data modules are written for Vite: resolve imports without the .ts extension and turn
// import.meta.env.X (statically replaced by Astro) into process.env.X for plain Node.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith('.') && !/\.[a-z]+$/.test(specifier)) return nextResolve(`${specifier}.ts`, context);
      throw error;
    }
  },
  load(url, context, nextLoad) {
    const result = nextLoad(url, context);
    if (url.includes('/src/') && url.endsWith('.ts') && result.source) {
      const source = String(result.source).replace(/import\.meta\.env\.(\w+)/g, 'process.env.$1');
      return { ...result, source };
    }
    return result;
  },
});

const { ui } = await import('../src/i18n/ui.ts');
const { enPublished } = await import('../src/data/routes.ts');
const modules: Record<string, Record<string, unknown>> = {
  albums: await import('../src/data/albums.ts'),
  about: await import('../src/data/about.ts'),
  press: await import('../src/data/press.ts'),
  production: await import('../src/data/production.ts'),
  site: await import('../src/data/site.ts'),
  singles: await import('../src/data/singles.ts'),
  'team-pins': await import('../src/data/team-pins.ts'),
  works: await import('../src/data/works.ts'),
  legal: await import('../src/data/legal.ts'),
};

const missing: string[] = [];
const mismatched: string[] = [];
const placeholders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
// Link slots (filled with a link by t.split) may be left out in EN – the sentence then simply has no
// link (artists.intro, press.lead, decided by Robert 26.10.2026). Every other variable must match.
const LINK_SLOTS = new Set(['link', 'vol1', 'vol2', 'imprint', 'privacy', 'studio', 'singles']);
const sameVars = (de: string, en: string) => {
  const d = new Set(placeholders(de).split(',').filter(Boolean));
  const e = new Set(placeholders(en).split(',').filter(Boolean));
  return [...e].every((v) => d.has(v)) && [...d].every((v) => e.has(v) || LINK_SLOTS.has(v));
};
const empty = (v: unknown) => v === null || v === undefined || (typeof v === 'string' && v.trim() === '');

// 1. UI strings
for (const [key, de] of Object.entries(ui.de) as [string, string][]) {
  const en = (ui.en as Record<string, string | null>)[key];
  if (de === '') continue; // German intentionally empty (e.g. press.translated)
  if (empty(en)) missing.push(`ui: ${key}`);
  else if (!sameVars(de, en!)) mismatched.push(`ui: ${key} – DE {${placeholders(de)}} / EN {${placeholders(en!)}}`);
}

// 2. Localized data fields
const isLocalized = (v: unknown): v is { de: unknown; en: unknown } =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && Object.keys(v).sort().join() === 'de,en';

let fields = 0;
const walk = (value: unknown, at: string, seen: Set<unknown>) => {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  seen.add(value);
  if (isLocalized(value)) {
    fields++;
    const { de, en } = value;
    if (Array.isArray(de)) {
      if (!Array.isArray(en) || en.length !== de.length || en.some(empty)) missing.push(`${at}.en`);
    } else if (typeof de === 'string') {
      if (empty(en)) missing.push(`${at}.en`);
      else if (!sameVars(de, en as string)) mismatched.push(`${at} – DE {${placeholders(de)}} / EN {${placeholders(en as string)}}`);
    }
    return;
  }
  for (const [k, v] of Object.entries(value)) walk(v, Array.isArray(value) ? `${at}[${k}]` : `${at}.${k}`, seen);
};
for (const [name, mod] of Object.entries(modules)) for (const [k, v] of Object.entries(mod)) walk(v, `${name}.${k}`, new Set());

// Report
const uiTotal = Object.values(ui.de).filter((v) => v !== '').length;
console.log(`check:i18n – ${uiTotal} UI strings, ${fields} data fields; EN ${enPublished ? 'published' : 'not published (report only)'}`);
console.log(`  missing EN: ${missing.length}`);
for (const m of missing.slice(0, enPublished ? Infinity : 12)) console.log(`    - ${m}`);
if (!enPublished && missing.length > 12) console.log(`    … and ${missing.length - 12} more`);
if (mismatched.length) {
  console.log(`  placeholders differ: ${mismatched.length}`);
  for (const m of mismatched) console.log(`    - ${m}`);
}

if (enPublished && (missing.length || mismatched.length)) process.exit(1);
