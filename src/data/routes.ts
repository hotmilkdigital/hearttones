/**
 * All page URLs in one place (CLAUDE.md §4). Slugs are provisional until the keyword check
 * (03_Sitemap-und-Keywords.md); change them here only. Trailing slashes on.
 */

export type Locale = 'de' | 'en';

export const locales: readonly Locale[] = ['de', 'en'];
export const defaultLocale: Locale = 'de';

export const routes = {
  home: { de: '/', en: '/en/' },
  music: { de: '/musik/', en: '/en/music/' },
  vol1: { de: '/musik/lullabies-vol-1/', en: '/en/music/lullabies-vol-1/' },
  vol2: { de: '/musik/lullabies-vol-2/', en: '/en/music/lullabies-vol-2/' },
  singles: { de: '/musik/berlin-peace-collective/', en: '/en/music/berlin-peace-collective/' },
  journey: { de: '/die-reise/', en: '/en/the-journey/' },
  artists: { de: '/kuenstlerinnen/', en: '/en/artists/' },
  about: { de: '/philipp-von-rothkirch/', en: '/en/philipp-von-rothkirch/' },
  production: { de: '/produktion/', en: '/en/production/' },
  press: { de: '/presse/', en: '/en/press/' },
  contact: { de: '/kontakt/', en: '/en/contact/' },
  imprint: { de: '/impressum/', en: '/en/legal-notice/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
  /** Widerrufsbelehrung + Muster-Widerrufsformular for the Vol. 2 order (§10). Not in the nav. */
  withdrawal: { de: '/widerruf/', en: '/en/withdrawal/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

/** Every page except the homepage (rendered by PageView). */
export type PageKey = Exclude<RouteKey, 'home'>;

/** URL of a page in the given locale. */
export function path(key: RouteKey, locale: Locale = defaultLocale): string {
  return routes[key][locale];
}

/** Main navigation, in order (§4). Künstler:innen and Presse live under Musik and in the footer. */
export const mainNav: readonly { key: RouteKey; label: Record<Locale, string> }[] = [
  { key: 'music', label: { de: 'Musik', en: 'Music' } },
  { key: 'journey', label: { de: 'Die Reise', en: 'The Journey' } },
  { key: 'production', label: { de: 'Produktion', en: 'Production' } },
  { key: 'about', label: { de: 'Über Philipp', en: 'About Philipp' } },
  { key: 'contact', label: { de: 'Kontakt', en: 'Contact' } },
];

/**
 * EN pages, language switch, hreflang alternates and sitemap pairs are on (CLAUDE.md §11,
 * 26.10.2026): the site is not live yet, so EN runs on dev and staging now. Robert approves the
 * English texts himself; launch only after he has verified them and the three legal pages.
 * With true, `npm run check:i18n` is strict: a missing EN string fails the build.
 */
export const enPublished = true;
