/**
 * Data integrity check – runs before every build (npm run check:data).
 * Asserts the published numbers (CLAUDE.md §5.4: 26 Lieder · 24 Länder · 46 Musiker:innen),
 * referential integrity, and that restricted content (§5.8, §5.9) never enters src/.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { albums } from '../src/data/albums.ts';
import { countries, type CountryCode } from '../src/data/countries.ts';
import { people } from '../src/data/people.ts';
import { singles } from '../src/data/singles.ts';

const errors: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) errors.push(message);
};

// 26 tracks, 13 per album, numbered 1–13, unique slugs
const tracks = albums.flatMap((a) => a.tracks.map((t) => ({ album: a, track: t })));
check(tracks.length === 26, `expected 26 tracks, found ${tracks.length}`);
for (const album of albums) {
  check(album.tracks.length === 13, `${album.id}: expected 13 tracks, found ${album.tracks.length}`);
  album.tracks.forEach((t, i) => {
    check(t.no === i + 1, `${album.id}: track ${t.title} has no ${t.no}, expected ${i + 1}`);
    check(t.slug.startsWith(String(t.no).padStart(2, '0') + '-'), `${album.id}/${t.slug}: slug must start with the track number`);
    check(/^[a-z0-9-]+$/.test(t.slug), `${album.id}/${t.slug}: slug must be kebab-case ASCII`);
    check(t.durationSec > 30 && t.durationSec < 600, `${album.id}/${t.slug}: implausible duration ${t.durationSec}`);
    check(t.lineup.length > 0, `${album.id}/${t.slug}: empty line-up`);
  });
}

// 24 distinct countries (first-named only), exactly the set in countries.ts
const primary = new Set(tracks.map(({ track }) => track.countries[0]));
const defined = new Set(Object.keys(countries) as CountryCode[]);
check(primary.size === 24, `expected 24 distinct countries, found ${primary.size}`);
for (const c of primary) check(defined.has(c), `country ${c} used by a track but missing in countries.ts`);
for (const c of defined) check(primary.has(c), `country ${c} in countries.ts has no track as first-named country`);
for (const { album, track } of tracks)
  for (const c of track.countries) check(defined.has(c), `${album.id}/${track.slug}: unknown country ${c}`);

// 46 distinct performers (persons and ensembles), no orphans in people.ts
const performers = new Set(tracks.flatMap(({ track }) => track.lineup.map((p) => p.person)));
check(performers.size === 46, `expected 46 distinct performers, found ${performers.size}`);
for (const id of Object.keys(people)) check(performers.has(id as keyof typeof people), `people.ts: ${id} is not on any track`);

// Singles: Berlin Peace Collective only, unreleased (§5.8)
for (const s of singles) {
  check(s.artist === 'Berlin Peace Collective', `${s.slug}: artist must be Berlin Peace Collective`);
  check(s.status === 'upcoming', `${s.slug}: must stay "upcoming" until released`);
}

// Restricted content anywhere in src/ (§5.8, §5.9)
const forbidden: [RegExp, string][] = [
  [/sophie[\s-]*scholl/i, 'Sophie-Scholl-Schule (§5.8)'],
  [/big\s*band/i, 'big band (§5.8)'],
  [/semjon|barlas/i, 'Semjon Barlas (§5.8)'],
  [/nina\s*hagen|charity\s*gala/i, 'Nina Hagen / Peace Charity Gala (§5.8)'],
  [/worldpeacenow/i, 'worldpeacenow.global (§5.9)'],
];
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
for (const file of walk('src').filter((f) => /\.(astro|ts|js|mjs|md|mdx|json|css|svg|html)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  for (const [re, label] of forbidden) check(!re.test(text), `${file}: contains restricted content – ${label}`);
}

if (errors.length) {
  console.error(`check:data failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`check:data ok – ${tracks.length} tracks · ${primary.size} countries · ${performers.size} performers`);
