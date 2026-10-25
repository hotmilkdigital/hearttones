/**
 * Every HTML id on the site, in one place (CLAUDE.md §11, 25.10.2026): shared across languages,
 * short, lowercase, ASCII and language-neutral – never translated, so deep links like
 * /musik/lullabies-vol-1/#vol-1-07 and /en/music/lullabies-vol-1/#vol-1-07 hit the same element.
 *
 * `ids` are link targets and section names; headings use `titleId(ids.x)` for aria-labelledby.
 * `npm run qa:dist` checks that every internal #link resolves to an id on the target page.
 */

export const ids = {
  // Layout
  main: 'main',
  menu: 'menu',
  footerPages: 'footer-pages',
  // Homepage sections (link targets of the hero buttons and other pages)
  hero: 'hero',
  player: 'player',
  newMusic: 'new-music',
  albums: 'albums',
  journey: 'journey',
  story: 'story',
  production: 'production',
  pressStrip: 'press-strip',
  // Album pages
  album: 'album',
  tracks: 'tracks',
  performers: 'performers',
  credits: 'credits',
  order: 'order',
  // Über Philipp
  about: 'about',
  instruments: 'instruments',
  works: 'works',
  enquiry: 'enquiry',
  // Other pages
  music: 'music',
  singlesTeaser: 'bpc',
  more: 'more',
  singles: 'singles',
  map: 'map',
  countries: 'countries',
  team: 'team',
  artists: 'artists',
  services: 'services',
  process: 'process',
  references: 'references',
  partner: 'partner',
  press: 'press',
  quotes: 'quotes',
  mentions: 'mentions',
  pressContact: 'press-contact',
  contact: 'contact',
  topics: 'topics',
  legal: 'legal',
  notFound: 'not-found',
} as const;

export type AnchorId = (typeof ids)[keyof typeof ids];

/** Id of the heading that labels a section (aria-labelledby). */
export const titleId = (id: string): string => `${id}-title`;

/** Fragment for an href, e.g. hash(ids.order) → "#order". */
export const hash = (id: string): string => `#${id}`;

/** Track in the player list: album id + two-digit track number, e.g. "vol-1-07". */
export const trackId = (albumId: string, no: number): string => `${albumId}-${String(no).padStart(2, '0')}`;

/** Player tabs and panels per album. */
export const tabId = (albumId: string): string => `tab-${albumId}`;
export const panelId = (albumId: string): string => `panel-${albumId}`;

/** Album card heading on the homepage / music hub. */
export const albumCardId = (albumId: string): string => `card-${albumId}`;

/** Single card (slug is ASCII already, e.g. "world-peace-now"). */
export const singleId = (slug: string): string => slug;

/** Die Reise: country entry in the list (ISO alpha-2, lower case), continent heading, map tooltip. */
export const countryId = (code: string): string => `${ids.countries}-${code.toLowerCase()}`;
export const continentId = (continent: string): string => `continent-${continent}`;
export const mapTipId = (key: string): string => `map-tip-${key.toLowerCase()}`;

/** Künstler:innen: one section per album. */
export const artistsAlbumId = (albumId: string): string => `${ids.artists}-${albumId}`;

/** Über Philipp videos and Produktion references. */
export const workId = (workSlug: string): string => `work-${workSlug}`;
export const referenceId = (workSlug: string): string => `ref-${workSlug}`;

/** Privacy note under a consent video's „Video laden" button. */
export const videoNoteId = (youtubeId: string): string => `video-note-${youtubeId.toLowerCase()}`;
