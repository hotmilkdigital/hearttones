/**
 * Selected works for other artists (../01_Brief/05_Ueber-Philipp_Seitenplan.md).
 * Videos load only after consent (ConsentVideo, CLAUDE.md §8.6). No YouTube thumbnails:
 * until an own 16:9 poster exists, the card shows a cocoa surface with the title.
 *
 * Credits confirmed by Robert, 24.10.2026: „Escape from Baltimore" composed by Philipp von
 * Rothkirch, Benedikt Stehle & Henry Ernst, produced by Henry Ernst, mixed and mastered at
 * Hot Milk Studio. „This Is My Body" composed and produced by Philipp, recorded, mixed and
 * mastered by Robert Cummings at Hot Milk Studio.
 */

import type { Localized } from '../i18n/localized.ts';

export interface Work {
  id: string;
  title: string;
  artist: string;
  /** null → placeholder until confirmed. */
  year: number | null;
  youtubeId: string;
  credit: Localized;
  /** Philipp's role in a few words, for the homepage reference list. */
  shortRole: Localized;
  /** false: roles still to be checked against Philipp's full credits. */
  creditConfirmed: boolean;
  artistLink: { label: Localized; href: string };
}

export const works: Work[] = [
  {
    id: 'escape-from-baltimore',
    title: 'Escape from Baltimore',
    artist: 'Fanfare Ciocărlia',
    year: 2021,
    youtubeId: 'G4tORyVfDb8',
    credit: {
      de: 'Komposition: Philipp von Rothkirch, Benedikt Stehle und Henry Ernst. Produktion: Henry Ernst. Gemischt und gemastert von Robert Cummings im Hot Milk Studio. Erschienen auf dem Jubiläumsalbum von Fanfare Ciocărlia.',
      en: 'Composition: Philipp von Rothkirch, Benedikt Stehle and Henry Ernst. Production: Henry Ernst. Mixed and mastered by Robert Cummings at Hot Milk Studio. Released on Fanfare Ciocărlia’s anniversary album.',
    },
    shortRole: { de: 'Komposition mit Benedikt Stehle und Henry Ernst', en: 'Composition with Benedikt Stehle and Henry Ernst' },
    creditConfirmed: true,
    artistLink: { label: { de: 'Fanfare Ciocărlia bei Asphalt Tango', en: 'Fanfare Ciocărlia on Asphalt Tango' }, href: 'https://asphalt-tango.de/' },
  },
  {
    id: 'this-is-my-body',
    title: 'This Is My Body',
    artist: 'Ingrid Arthur',
    year: 2014,
    youtubeId: 'IVkwNzdCu88',
    credit: {
      de: 'Komposition und Produktion: Philipp von Rothkirch. Aufgenommen, gemischt und gemastert von Robert Cummings im Hot Milk Studio.',
      en: 'Composition and production: Philipp von Rothkirch. Recorded, mixed and mastered by Robert Cummings at Hot Milk Studio.',
    },
    shortRole: { de: 'Komposition und Produktion', en: 'Composition and production' },
    creditConfirmed: true,
    artistLink: { label: { de: 'ingridarthur.com', en: 'ingridarthur.com' }, href: 'https://www.ingridarthur.com/' },
  },
];
