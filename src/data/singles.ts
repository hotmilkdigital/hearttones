/**
 * Berlin Peace Collective – unreleased singles (CLAUDE.md §5.8, §8.4).
 * Source: ../01_Brief/02_CD-Credits-Vol1-Vol2.md, section "Singles".
 *
 * Never add anything listed as restricted in CLAUDE.md §5.8 and §5.9 (school performance and
 * arrangement, the unproven gala story, the campaign domain). scripts/check-data.ts fails the
 * build if those terms appear anywhere in src/. No player, artwork or release date until released.
 */

import type { Locale } from './routes.ts';
import type { Role } from './roles.ts';

export interface SingleCredit {
  name: string;
  roles: Role[];
  /** Short qualifier as given by Philipp, e.g. the year of the original recording. */
  note?: Record<Locale, string>;
  /** Members of a group credit, e.g. the drumline. */
  members?: string[];
}

export interface Single {
  slug: string;
  title: string;
  artist: 'Berlin Peace Collective';
  status: 'upcoming';
  /** Approved draft teaser from the homepage artboard. */
  teaser: Record<Locale, string | null>;
  /** false: Philipp has not explicitly assigned this line-up to the single yet. */
  creditsConfirmed: boolean;
  credits: SingleCredit[];
}

export const singlesArtist = 'Berlin Peace Collective';

export const singles: Single[] = [
  {
    slug: 'world-peace-now',
    title: 'World Peace Now!',
    artist: 'Berlin Peace Collective',
    status: 'upcoming',
    teaser: { de: 'Ein Stück für den Frieden.', en: null },
    // Line-up confirmed by Robert, 24.10.2026; the drumline members on the recording are adults, names cleared.
    creditsConfirmed: true,
    credits: [
      { name: 'Philipp von Rothkirch', roles: ['composition', 'keys'] },
      { name: 'Robert Cummings', roles: ['production', 'mixing', 'mastering'] },
      { name: 'Benedikt Stehle', roles: ['drums', 'vocals', 'arrangement'] },
      { name: 'Rene Flechsenhaar', roles: ['bass'] },
      { name: 'Christoph Jung', roles: ['guitar'] },
      { name: 'Ingrid Arthur', roles: ['vocals'] },
      { name: 'Sebastian Borkowsky', roles: ['flute'] },
      { name: 'Philipp Sindhy', roles: ['trumpet'] },
      { name: 'Friedrich Milz', roles: ['trombone'] },
      { name: '„BÄM“ drumline', roles: ['drumline'], members: ['Ramon Buntebart', 'Leander Winkler', 'Rafael Nussbaumer'] },
    ],
  },
  {
    slug: 'bombs-away',
    title: 'Bombs Away!',
    artist: 'Berlin Peace Collective',
    status: 'upcoming',
    teaser: {
      de: '2006 aufgenommen als Statement zum Wahnsinn der weltweiten Kriege – jetzt teilweise neu aufgenommen, neu gemischt und gemastert.',
      en: null,
    },
    creditsConfirmed: true,
    credits: [
      { name: 'Philipp von Rothkirch', roles: ['composition', 'keys', 'production'] },
      { name: 'Kiko King', roles: ['vocals'], note: { de: 'Phases of Life, 2006', en: 'Phases of Life, 2006' } },
      { name: 'Ingo Schulz', roles: ['recording', 'production'], note: { de: '2006', en: '2006' } },
      { name: 'Benedikt Stehle', roles: ['liveDrums'] },
      { name: 'Jeremy Osborne', roles: ['chorusOperaVocals'] },
      { name: 'Torsten Weber', roles: ['guitar'] },
      { name: 'Christoph Jung', roles: ['guitar'] },
      { name: 'Sebastian Vogel', roles: ['bass'] },
      { name: 'Robert Cummings', roles: ['remixRemaster'], note: { de: 'Hot Milk Studio Berlin', en: 'Hot Milk Studio Berlin' } },
    ],
  },
];
