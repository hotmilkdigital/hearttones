/**
 * Selected works for other artists (../01_Brief/05_Ueber-Philipp_Seitenplan.md).
 * Videos load only after consent (ConsentVideo, CLAUDE.md §8.6). No YouTube thumbnails:
 * until an own 16:9 poster exists, the card shows a cocoa surface with the title.
 *
 * Credits: Robert's wording ("songwriter and producer; recorded, mixed and mastered by Robert
 * Cummings at Hot Milk Studio") is used where it matches Philipp's own answers. For
 * „Escape from Baltimore" Philipp only named composition plus mix/master – production and
 * recording are unconfirmed, so the site states only what both sources agree on.
 */

export interface Work {
  id: string;
  title: string;
  artist: string;
  /** null → placeholder until confirmed. */
  year: number | null;
  youtubeId: string;
  credit: string;
  /** false: roles still to be checked against Philipp's full credits. */
  creditConfirmed: boolean;
  artistLink: { label: string; href: string };
}

export const works: Work[] = [
  {
    id: 'escape-from-baltimore',
    title: 'Escape from Baltimore',
    artist: 'Fanfare Ciocărlia',
    year: null,
    youtubeId: 'G4tORyVfDb8',
    credit: 'Komposition: Philipp v. Rothkirch. Gemischt und gemastert von Robert Cummings im Hot Milk Studio.',
    creditConfirmed: false,
    artistLink: { label: 'Fanfare Ciocărlia bei Asphalt Tango', href: 'https://asphalt-tango.de/' },
  },
  {
    id: 'this-is-my-body',
    title: 'This Is My Body',
    artist: 'Ingrid Arthur',
    year: null,
    youtubeId: 'IVkwNzdCu88',
    credit:
      'Komposition und Produktion: Philipp v. Rothkirch. Aufgenommen, gemischt und gemastert von Robert Cummings im Hot Milk Studio.',
    creditConfirmed: true,
    artistLink: { label: 'ingridarthur.com', href: 'https://www.ingridarthur.com/' },
  },
];
