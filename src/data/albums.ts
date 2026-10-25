/**
 * Vol. 1 and Vol. 2 – single source for player, album pages, map and schema.
 * Source: ../01_Brief/02_CD-Credits-Vol1-Vol2.md, with the rules in CLAUDE.md §5.5–§5.7 and §11:
 * - titles: wording and diacritics from the back-cover tracklist, capitalised per language
 * - durations: measured from the delivered MP3s (frame count), not the booklet
 * - no lyrics, ever (§5.6)
 */

import type { CountryCode } from './countries.ts';
import { people, type PersonId } from './people.ts';
import type { Locale } from './routes.ts';
import { roleLabel, type Role } from './roles.ts';

/** How the song was written. Vol. 2 prints names without saying who wrote music or lyrics. */
export type Writing =
  | { type: 'traditional' }
  | { type: 'music'; music: string; lyrics?: string } // lyrics === music → "Musik & Text"
  | { type: 'unspecified'; names: string }; // as printed, roles not stated

export interface Performer {
  person: PersonId;
  roles: Role[];
  /** Name as printed on this album when it differs from the canonical name. */
  creditedAs?: string;
}

export interface Track {
  no: number;
  /** File stem in public/audio/<album>/ – kebab-case ASCII. */
  slug: string;
  title: string;
  /** Second printed form of the title (e.g. Cyrillic). */
  titleAlt?: string;
  /** BCP 47 code of the title's language – only where known and written in that language's own script (§6.7 nice-to-have). */
  lang?: string;
  titleAltLang?: string;
  writing: Writing;
  /** First entry gets the map marker and counts towards the 24 countries. */
  countries: [CountryCode, ...CountryCode[]];
  /** Measured from the MP3 in seconds; round only when displaying. */
  durationSec: number;
  /** Group name printed before the line-up (e.g. "Svøbsk"). */
  ensemble?: string;
  lineup: Performer[];
}

export interface Credit {
  role: Role;
  names: string[];
  /** Only these tracks (e.g. a single recording by another engineer). */
  tracks?: number[];
  /** All tracks except these. */
  exceptTracks?: number[];
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface Album {
  id: 'vol-1' | 'vol-2';
  artist: string;
  title: string;
  /** Short label used in tabs and running text. */
  shortTitle: string;
  year: number;
  releaseDate: string;
  label: string;
  catalogueNo: string;
  labelCode: string;
  /** Printed ℗/© line where known. */
  copyright?: string;
  status: 'outOfPrint' | 'available';
  coverAlt: string;
  /** One-line teaser (approved artboard copy). */
  teaser: string;
  /** Album text (01_Brief/09, approved 25.10.2026), two paragraphs below the lead line on the album page (not on the homepage, not in the schema). */
  story?: string[];
  credits: Credit[];
  /** Short thanks line shown below the production credits on the album page (not on the homepage, not in the schema). */
  thanks?: string;
  /** Studio statement (§5.7): almost entirely recorded, entirely mixed and mastered there. */
  studio: string;
  links: ExternalLink[];
  tracks: Track[];
}

const PvR = 'philipp-v-rothkirch' satisfies PersonId;

export const vol1: Album = {
  id: 'vol-1',
  artist: 'Heart Tones',
  title: 'Lullabies From Around The World',
  shortTitle: 'Vol. 1',
  year: 2011,
  releaseDate: '2011-11-16',
  label: 'Heart Tones Records',
  catalogueNo: 'HTR 001',
  labelCode: 'LC-27925',
  copyright: 'Heart Tones Records 2011',
  // At Philipp's request (25.10.2026): Peter Böckelmann pre-financed the CD pressing.
  thanks: 'Vielen Dank an Peter Böckelmann für seine Unterstützung.',
  status: 'outOfPrint',
  coverAlt:
    'Cover von Heart Tones Vol. 1: Lullabies From Around The World, eine lächelnde schwangere Frau mit einem als Erdkugel bemalten Bauch',
  teaser: '13 Lieder aus Haiti, Senegal, Georgien, Indien und neun weiteren Ländern.',
  story: [
    'Zwei Kinder, ein Tag Abstand: 2009 kam der Sohn von Philipp von Rothkirch zur Welt, nur einen Tag nach der Tochter von Robert Cummings, mit dem er das Album produziert hat. Aus diesem Zufall wurde ein gemeinsames Projekt. Philipp bat befreundete Musiker:innen um ein Schlaflied aus ihrer Heimat.',
    'Dabei galten ein paar einfache Regeln: Die Lieder sollten so ruhig sein, dass ein schlafendes Baby nicht aufwacht. Alles wurde von Hand eingespielt, ohne Computer-Synthesizer und programmierte Beats. Musikalisch sollten die Lieder so sein, dass man sie auch über das Kindesalter hinaus gern hört. Und sie sollten den Gedanken der Völkerverbindung schon in die Wiege legen, mit 13 Liedern aus 13 Ländern, von Haiti bis Indien.',
  ],
  credits: [
    { role: 'production', names: ['Philipp von Rothkirch'] },
    { role: 'coProduction', names: ['Robert Cummings'] },
    { role: 'recording', names: ['Robert Cummings'], exceptTracks: [7] },
    { role: 'recording', names: ['Peter Sund („the farm“)'], tracks: [7] },
    { role: 'mixing', names: ['Robert Cummings'] },
    { role: 'mastering', names: ['Robert Cummings'] },
    { role: 'coverPhoto', names: ['Andre Wagner'] },
    { role: 'bodyPainting', names: ['Sylvia Puta'] },
    { role: 'coverModel', names: ['Dalal'] },
    { role: 'design', names: ['Tobias Henze (aitrio crossmedia communication)'] },
  ],
  studio: 'Hot Milk Studio Berlin',
  links: [
    { label: 'Spotify', href: 'https://open.spotify.com/album/7r0XB0MCeqNUErFdQELJ1F' },
    { label: 'Deezer', href: 'https://link.deezer.com/s/34L7axZdYtt7kwXeT6ibH' },
  ],
  tracks: [
    {
      no: 1,
      slug: '01-dodo',
      title: 'Dodo',
      lang: 'ht',
      writing: { type: 'traditional' },
      countries: ['HT'],
      durationSec: 130.48,
      lineup: [
        { person: 'rachelle-jeanty', roles: ['vocals'] },
        { person: 'cremildo-de-caifaz', roles: ['guitar'] },
        { person: PvR, roles: ['piano'] },
      ],
    },
    {
      no: 2,
      slug: '02-layla-tov',
      title: 'Layla tov',
      writing: { type: 'music', music: 'Yoni Rechter', lyrics: 'Yehonatan Geffen' },
      countries: ['IL'],
      durationSec: 245.42,
      lineup: [
        { person: 'talia-kliger', roles: ['vocals'] },
        { person: 'uri-gincel', roles: ['piano'] },
      ],
    },
    {
      no: 3,
      slug: '03-ajo-nene-nene-tuuti',
      title: 'Ajo nènè – nènè tuuti',
      writing: { type: 'music', music: 'Gilbert Abdourahmane Diop', lyrics: 'Gilbert Abdourahmane Diop' },
      countries: ['SN'],
      durationSec: 237.71,
      lineup: [
        { person: 'gilbert-abdourahmane-diop', roles: ['vocals'] },
        { person: 'djefily-sako', roles: ['kora'] },
        { person: 'arcadius-didavi', roles: ['bass'] },
      ],
    },
    {
      no: 4,
      slug: '04-uyu',
      title: 'Uyu',
      lang: 'tr',
      writing: { type: 'music', music: 'Gökce Sayan', lyrics: 'Gökce Sayan' },
      countries: ['TR'],
      durationSec: 154.78,
      lineup: [
        { person: 'goekce-sayan', roles: ['vocals'] },
        { person: 'serkan-ky', roles: ['violin'], creditedAs: 'Serkan Kaynarcali' },
        { person: 'mesut-lekesiz', roles: ['clarinet'] },
        { person: PvR, roles: ['guitar', 'piano'] },
      ],
    },
    {
      no: 5,
      slug: '05-tu-mi-mariposa',
      title: 'Tu mi mariposa',
      lang: 'es',
      writing: { type: 'music', music: 'Philipp von Rothkirch & Eugenia Tapia', lyrics: 'Eugenia Tapia' },
      countries: ['CL'],
      durationSec: 166.45,
      lineup: [
        { person: 'eugenia-tapia', roles: ['vocals'] },
        { person: 'rodrigo-santa-maria', roles: ['guitar'] },
        { person: PvR, roles: ['piano', 'vibraphone'] },
      ],
    },
    {
      no: 6,
      slug: '06-nani',
      title: 'Nani',
      writing: { type: 'traditional' },
      countries: ['GE'],
      durationSec: 193.7,
      lineup: [{ person: 'tutarchela', roles: ['vocals'] }],
    },
    {
      no: 7,
      slug: '07-sov-sodt-barnlille',
      title: 'Sov sødt barnlille',
      lang: 'da',
      writing: { type: 'music', music: 'Thomas Laub', lyrics: 'N. F. S. Grundtvig' },
      countries: ['DK'],
      durationSec: 222.93,
      ensemble: 'Svøbsk',
      lineup: [
        { person: 'joergen-dickmeiss', roles: ['vocals', 'guitar', 'glockenspiel'] },
        { person: 'maren-hallberg', roles: ['accordion'] },
        { person: 'peter-sund', roles: ['guitar'] },
      ],
    },
    {
      no: 8,
      slug: '08-dream-of-mikael',
      title: 'Dream of Mikael',
      lang: 'en',
      writing: { type: 'music', music: 'Aly Keita' },
      countries: ['ML'],
      durationSec: 260.6,
      lineup: [{ person: 'aly-keita', roles: ['balafon'] }],
    },
    {
      no: 9,
      slug: '09-dans-les-etoiles',
      title: 'Dans les étoiles',
      lang: 'fr',
      writing: { type: 'music', music: 'Ruby Brune', lyrics: 'Ruby Brune' },
      countries: ['FR'],
      durationSec: 147.96,
      lineup: [
        { person: 'brune', roles: ['vocals'] },
        { person: 'uri-gincel', roles: ['piano'] },
      ],
    },
    {
      no: 10,
      slug: '10-viele-tausend-sternlein',
      title: 'Viele tausend Sternlein',
      lang: 'de',
      writing: { type: 'music', music: 'Philipp von Rothkirch', lyrics: 'Sabine v. Rothkirch' },
      countries: ['DE'],
      durationSec: 99.47,
      lineup: [
        { person: 'sabine-v-rothkirch', roles: ['vocals'] },
        { person: PvR, roles: ['vocals', 'piano'] },
        { person: 'isabelle-klemt', roles: ['cello'] },
      ],
    },
    {
      no: 11,
      slug: '11-sleep-little-baby',
      title: 'Sleep Little Baby',
      lang: 'en',
      writing: { type: 'music', music: 'Philipp von Rothkirch', lyrics: 'Kiko King' },
      countries: ['US'],
      durationSec: 142.76,
      lineup: [
        { person: 'kiko-king', roles: ['vocals'] },
        { person: 'christoph-schmitz', roles: ['cello'] },
        { person: PvR, roles: ['piano'] },
      ],
    },
    {
      no: 12,
      slug: '12-omaya-nunaya',
      title: 'Omaya nunaya',
      writing: { type: 'traditional' },
      countries: ['KR'],
      durationSec: 160.73,
      lineup: [
        { person: 'hye-young', roles: ['vocals'] },
        { person: 'christoph-jung', roles: ['guitar'] },
      ],
    },
    {
      no: 13,
      slug: '13-gopi-lullaby',
      title: 'Gopi Lullaby',
      lang: 'en',
      writing: { type: 'traditional' },
      countries: ['IN'],
      durationSec: 181.97,
      ensemble: 'The Kirtaniyas',
      lineup: [
        { person: 'sarasvati-dasi', roles: ['vocals', 'harmonium'] },
        { person: 'tribhanga-campling', roles: ['guitar', 'esraj'] },
      ],
    },
  ],
};

export const vol2: Album = {
  id: 'vol-2',
  artist: 'Heart Tones',
  title: 'Lullabies From Around The World Vol. 2',
  shortTitle: 'Vol. 2',
  year: 2023,
  releaseDate: '2023-06-02',
  label: 'Asphalt Tango Records',
  catalogueNo: 'HTR 002',
  labelCode: 'LC-12494',
  status: 'available',
  coverAlt:
    'Cover von Heart Tones Vol. 2: Lullabies From Around The World, vier schlafende Kinder unter einer bunten Decke',
  teaser: '13 Lieder von Südafrika über Iran und die Mongolei bis Brasilien.',
  story: [
    'Zwölf Jahre nach dem ersten Album setzt Vol. 2 die Reise fort: 13 neue Schlaflieder aus aller Welt, wieder produziert von Philipp von Rothkirch und Robert Cummings, erschienen 2023 bei Asphalt Tango Records und gefördert von der Initiative Musik.',
    'Die Grundsätze sind geblieben. Jedes Lied ist so leise, dass es ein schlafendes Baby nicht weckt, und von Hand eingespielt, ganz ohne Computerklänge und programmierte Beats. Die Musik ist für Kinder gemacht, aber so, dass auch Erwachsene sie gern hören. Und wie schon beim ersten Album verbindet sie Menschen und Kulturen, von Südafrika über Iran und die Mongolei bis nach Brasilien.',
  ],
  credits: [
    { role: 'production', names: ['Robert Cummings', 'Philipp von Rothkirch'] },
    { role: 'recording', names: ['Robert Cummings'] },
    { role: 'mixing', names: ['Robert Cummings'] },
    { role: 'mastering', names: ['Robert Cummings'] },
    { role: 'coverPhoto', names: ['Benedikt Stehle'] },
    { role: 'design', names: ['Tobias Henze (aitrio crossmedia communication)'] },
  ],
  studio: 'Hot Milk Studio Berlin',
  // Condition of the streaming permission: always visible near the Vol. 2 player and on the Vol. 2 page (§8.2).
  links: [
    { label: 'Asphalt Tango Records', href: 'https://asphalt-tango.de/' },
    {
      label: 'Bandcamp',
      href: 'https://asphalttango.bandcamp.com/album/heart-tones-lullabies-from-around-the-world-vol-2',
    },
  ],
  tracks: [
    {
      no: 1,
      slug: '01-thula-baba',
      title: 'Thula baba',
      writing: { type: 'traditional' },
      countries: ['ZA'],
      durationSec: 166.71,
      // The CD prints no role; she is the vocalist (Robert, 24.10.2026).
      lineup: [{ person: 'kgomotso-tsatsi', roles: ['vocals'] }],
    },
    {
      no: 2,
      slug: '02-ersed-ayidhass',
      title: 'Ersed ayidhass',
      writing: { type: 'unspecified', names: 'Momo Djender' },
      countries: ['DZ'],
      durationSec: 149.03,
      lineup: [{ person: 'momo-djender', roles: ['vocals', 'allInstruments'] }],
    },
    {
      no: 3,
      slug: '03-bahar-shode',
      title: 'Bahar shode',
      writing: { type: 'unspecified', names: 'Farzaneh Navai / Albert Farahbakhsh' },
      countries: ['IR'],
      durationSec: 171.13,
      lineup: [
        { person: 'sepideh-safiaryan', roles: ['vocals', 'tar'] },
        { person: PvR, roles: ['rhodes'] },
      ],
    },
    {
      no: 4,
      slug: '04-sadok-vyshnevyy',
      title: 'Sadok vyshnevyy',
      // As printed; "Shevchenko / Taras Hryhorovych" is probably one person (open, see 02_CD-Credits #10).
      writing: { type: 'unspecified', names: 'Roksana Vikaluk / Shevchenko / Taras Hryhorovych' },
      countries: ['UA'],
      durationSec: 363.05,
      lineup: [{ person: 'roksana-vikaluk', roles: ['vocals', 'allInstruments'] }],
    },
    {
      no: 5,
      slug: '05-munzel',
      title: 'Munzel',
      writing: { type: 'unspecified', names: 'Philipp von Rothkirch' },
      countries: ['DE'],
      durationSec: 197.15,
      lineup: [{ person: PvR, roles: ['piano'] }],
    },
    {
      no: 6,
      slug: '06-take-me-far-away',
      title: 'Take Me Far Away',
      lang: 'en',
      writing: { type: 'unspecified', names: 'Julia Messenger' },
      countries: ['AU'],
      durationSec: 287.45,
      lineup: [
        { person: 'julia-messenger', roles: ['vocals'] },
        { person: 'serkan-ky', roles: ['kanun'] },
        { person: PvR, roles: ['rhodes'] },
      ],
    },
    {
      no: 7,
      slug: '07-bishek-jyri',
      title: 'Bishek jyri',
      writing: { type: 'unspecified', names: 'Zulya Nazipovna Kamalova' },
      // Russian song, Georgian arrangement (Philipp) – marker in Russland, Georgien mentioned.
      countries: ['RU', 'GE'],
      durationSec: 191.03,
      lineup: [
        { person: 'zulya-nazipovna-kamalova', roles: ['mainVocals'] },
        // CD: "Nino Tsitsishvili, Joseph Jordania, Mal Webb (backing vocals, arr)" – applies to all three (confirmed 24.10.2026).
        { person: 'nino-tsitsishvili', roles: ['backingVocals', 'arrangement'] },
        { person: 'joseph-jordania', roles: ['backingVocals', 'arrangement'] },
        { person: 'mal-webb', roles: ['backingVocals', 'arrangement'] },
      ],
    },
    {
      no: 8,
      slug: '08-kolysanka-dla-sloneczka',
      // Correct Polish letters, not the CD's ASCII spelling (Robert, 24.10.2026).
      title: 'Kołysanka dla słoneczka',
      lang: 'pl',
      writing: { type: 'unspecified', names: 'Iza Höll / Christian Kreutzer' },
      countries: ['PL'],
      durationSec: 166.03,
      lineup: [
        { person: 'iza-hoell', roles: ['vocals'] },
        { person: 'raphael-winterbloom', roles: ['cello'] },
        { person: 'jonathan-robinson', roles: ['doubleBass'] },
        { person: PvR, roles: ['rhodes'] },
      ],
    },
    {
      no: 9,
      slug: '09-buuvein-duu',
      title: 'Buuvein duu',
      // Correct Mongolian capitalisation, not the CD's "Бүүвэйн Дуу" (Robert, 24.10.2026).
      titleAlt: 'Бүүвэйн дуу',
      titleAltLang: 'mn',
      writing: { type: 'unspecified', names: 'Hosso Dangaa Khosbayar' },
      countries: ['MN'],
      durationSec: 164.08,
      lineup: [
        { person: 'hosso-dangaa-khosbayar', roles: ['vocals'] },
        { person: 'transmongolia', roles: ['horseHeadFiddles'] },
      ],
    },
    {
      no: 10,
      slug: '10-qullasinataki-luqtana',
      title: 'Qullasiñataki luqtaña',
      writing: { type: 'unspecified', names: 'Rodrigo Santa Maria / Sandra Caqueo' },
      countries: ['CL'],
      durationSec: 122.04,
      lineup: [
        { person: 'sandra-caqueo', roles: ['vocals'] },
        { person: 'rodrigo-santa-maria', roles: ['guitar'] },
      ],
    },
    {
      no: 11,
      slug: '11-tidurlah-sayang',
      title: 'Tidurlah sayang',
      lang: 'id',
      writing: { type: 'unspecified', names: 'Dwiki Dharmawan / Dira Sugandi' },
      countries: ['ID'],
      durationSec: 228.75,
      lineup: [
        { person: 'dira-sugandi', roles: ['vocals'] },
        { person: 'dwiki-dharmawan', roles: ['instruments'] },
      ],
    },
    {
      no: 12,
      slug: '12-ninna-nanna',
      title: 'Ninna nanna',
      lang: 'it',
      writing: { type: 'unspecified', names: 'Tamara Soldan / Philipp von Rothkirch' },
      countries: ['IT', 'DE'],
      durationSec: 135.24,
      lineup: [
        { person: 'tamara-soldan', roles: ['vocals'] },
        { person: 'serkan-ky', roles: ['kanun'] },
        { person: PvR, roles: ['rhodes'] },
      ],
    },
    {
      no: 13,
      slug: '13-ouve-o-sinho',
      title: 'Ouve o sinho',
      lang: 'pt',
      writing: { type: 'unspecified', names: 'Isabela Santos / Philipp von Rothkirch' },
      countries: ['BR', 'DE'],
      durationSec: 135.92,
      lineup: [
        { person: 'isabela-santos', roles: ['vocals'] },
        { person: PvR, roles: ['vibraphone', 'guitar', 'piano'] },
      ],
    },
  ],
};

export const albums = [vol1, vol2] as const;

/** Public URL of a track's MP3. */
export function audioSrc(album: Album, track: Track): string {
  return `/audio/${album.id}/${track.slug}.mp3`;
}

/** m:ss, rounded to the nearest second. */
export function formatDuration(seconds: number): string {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** ISO 8601 duration for schema.org (e.g. PT4M21S). */
export function isoDuration(seconds: number): string {
  const s = Math.round(seconds);
  return `PT${Math.floor(s / 60)}M${s % 60}S`;
}

export function albumDuration(album: Album): number {
  return album.tracks.reduce((sum, t) => sum + t.durationSec, 0);
}

/** Name as credited on this track (printed form), falling back to the canonical name. */
export function performerName(performer: Performer): string {
  return performer.creditedAs ?? people[performer.person].name;
}

/** One-line line-up, e.g. "Svøbsk: Jørgen Dickmeiss (Gesang, Gitarre, Glockenspiel), Maren Hallberg (Akkordeon)". */
export function lineupText(track: Track, locale: Locale = 'de'): string {
  const list = track.lineup
    .map((p) => {
      const roles = p.roles.map((r) => roleLabel(r, locale)).join(', ');
      return roles ? `${performerName(p)} (${roles})` : performerName(p);
    })
    .join(', ');
  return track.ensemble ? `${track.ensemble}: ${list}` : list;
}

/** Writer credit line, e.g. "Musik: Yoni Rechter · Text: Yehonatan Geffen". */
export function writingText(writing: Writing, locale: Locale = 'de'): string {
  const de = locale === 'de';
  switch (writing.type) {
    case 'traditional':
      return de ? 'Traditionell' : 'Traditional';
    case 'music':
      if (!writing.lyrics) return `${de ? 'Musik' : 'Music'}: ${writing.music}`;
      if (writing.lyrics === writing.music) return `${de ? 'Musik & Text' : 'Music & lyrics'}: ${writing.music}`;
      return `${de ? 'Musik' : 'Music'}: ${writing.music} · ${de ? 'Text' : 'Lyrics'}: ${writing.lyrics}`;
    case 'unspecified':
      // Vol. 2 prints names without saying who wrote music or lyrics – don't assign roles.
      return `${de ? 'Geschrieben von' : 'Written by'}: ${writing.names}`;
  }
}

export interface AlbumPerformer {
  id: PersonId;
  name: string;
  roles: Role[];
  tracks: number[];
}

/** Everyone on an album in order of first appearance, with all their roles and track numbers. */
export function albumPerformers(album: Album): AlbumPerformer[] {
  const byPerson = new Map<PersonId, AlbumPerformer>();
  for (const track of album.tracks) {
    for (const p of track.lineup) {
      const entry = byPerson.get(p.person) ?? { id: p.person, name: performerName(p), roles: [], tracks: [] };
      for (const role of p.roles) if (!entry.roles.includes(role)) entry.roles.push(role);
      entry.tracks.push(track.no);
      byPerson.set(p.person, entry);
    }
  }
  return [...byPerson.values()];
}

