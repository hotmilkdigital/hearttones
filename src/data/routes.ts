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
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;

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
 * EN pages exist only after Philipp approves the German copy (§4). Until then the language
 * switch stays hidden and no hreflang alternates are emitted.
 */
export const enPublished = false;
