/**
 * Data integrity check – runs before every build (npm run check:data).
 * Asserts the published numbers (CLAUDE.md §5.4: 26 Lieder · 24 Länder · 46 Musiker:innen),
 * referential integrity, every track has its MP3 with matching duration (±2 s), and that
 * restricted content (§5.8, §5.9) never enters src/.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { albums } from '../src/data/albums.ts';
import { countries, type CountryCode } from '../src/data/countries.ts';
import { people } from '../src/data/people.ts';
import { singles } from '../src/data/singles.ts';

const errors: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) errors.push(message);
};

/**
 * Duration of an MPEG-1 Layer III file in seconds, from the Xing/Info header (frame count,
 * minus LAME encoder delay/padding) or, without one, by walking the frames. null if unreadable.
 */
function mp3Duration(b: Buffer): number | null {
  const BITRATES = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
  const RATES = [44100, 48000, 32000];
  let p = 0;
  if (b.toString('latin1', 0, 3) === 'ID3') {
    p = 10 + (((b[6]! & 127) << 21) | ((b[7]! & 127) << 14) | ((b[8]! & 127) << 7) | (b[9]! & 127));
  }
  const header = (i: number) => {
    if (b[i] !== 0xff || (b[i + 1]! & 0xfe) !== 0xfa) return null; // MPEG-1 Layer III only
    const kbps = BITRATES[b[i + 2]! >> 4];
    const rate = RATES[(b[i + 2]! >> 2) & 3];
    if (!kbps || !rate) return null;
    return { rate, length: Math.floor((144000 * kbps) / rate) + ((b[i + 2]! >> 1) & 1) };
  };
  while (p < b.length - 4 && !header(p)) p++;
  const first = header(p);
  if (!first) return null;

  const tag = b.indexOf('Info', p) === -1 ? b.indexOf('Xing', p) : b.indexOf('Info', p);
  if (tag !== -1 && tag < p + first.length && b.readUInt32BE(tag + 4) & 1) {
    const frames = b.readUInt32BE(tag + 8);
    const lame = b.indexOf('L', tag + 120) === tag + 120 ? tag + 120 : -1; // LAME/Lavf tag follows the TOC
    const delayPadding = lame !== -1 ? b.readUIntBE(lame + 21, 3) : 0;
    return (frames * 1152 - (delayPadding >> 12) - (delayPadding & 0xfff)) / first.rate;
  }
  let frames = 0;
  for (let h = header(p); h; h = header(p)) {
    frames++;
    p += h.length;
  }
  return (frames * 1152) / first.rate;
}

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

// Web audio: every track has its MP3 in public/audio/, and its duration matches albums.ts (±2 s).
const AUDIO_TOLERANCE_SEC = 2;
for (const { album, track } of tracks) {
  const file = join('public', 'audio', album.id, `${track.slug}.mp3`);
  if (!existsSync(file)) {
    errors.push(`${file}: missing MP3 for „${track.title}“`);
    continue;
  }
  const seconds = mp3Duration(readFileSync(file));
  if (seconds === null) errors.push(`${file}: cannot read MP3 duration`);
  else
    check(
      Math.abs(seconds - track.durationSec) <= AUDIO_TOLERANCE_SEC,
      `${file}: MP3 is ${seconds.toFixed(2)} s, albums.ts says ${track.durationSec} s`,
    );
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
