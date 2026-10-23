/**
 * Site-wide business data (CLAUDE.md §5.12, §5.13, §10) and rights gates (§9).
 * Payment details (bank account, PayPal) never go here or anywhere on the site (§5.14).
 */

export const site = {
  url: 'https://hearttones.net',
  brand: 'Heart Tones',
  label: 'Heart Tones Records',
  labelCode: 'LC-27925',
  claim: 'Music from around the world',
  owner: {
    /** Impressum, schema, titles/meta (§5.3) */
    fullName: 'Philipp von Rothkirch',
    /** Running text (§5.3) */
    shortName: 'Philipp v. Rothkirch',
  },
  contact: {
    email: 'info@hearttones.net',
    phone: '+4917661233929',
    phoneDisplay: '0176 61233929',
    /** No opening hours (§5.12). */
    availability: 'Erstgespräch nach Vereinbarung',
    /** Shown in header/footer instead of the address. */
    area: 'Berlin-Kreuzberg',
  },
  /** Impressum only – never in header/footer (§5.12). */
  address: {
    street: 'Obentrautstraße 51',
    postalCode: '10963',
    city: 'Berlin',
    country: 'DE',
  },
  /** Production partner (§5.13). Never present as owner; never use its address for Philipp. */
  partner: {
    name: 'Hot Milk Studio',
    url: 'https://www.hotmilkstudio.de/',
  },
} as const;

/** Vol. 2 order by email (§10). */
export const order = {
  subject: 'Bestellung Heart Tones Vol. 2',
  priceEur: 15,
  shippingDeEur: 3.5,
  shippingIntlEur: 7,
  taxNote: 'Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.',
} as const;

/**
 * Default social image src/assets/og/og-default.png (1200×630, built from the hero, §8.7).
 * false → listed as [PLATZHALTER] until Robert approves it.
 */
export const ogDefaultApproved = false;

/** Image credits for captions and the Impressum (§5.11). */
export const imageCredits = [
  { image: 'Familienfoto 2011 (Philipp v. Rothkirch und Robert Cummings mit ihren Kindern)', credit: 'Benedikt Stehle' },
  { image: 'Philipp v. Rothkirch am Flügel im Hot Milk Studio', credit: 'Robert Cummings' },
  { image: 'Cover Vol. 1', credit: 'Andre Wagner (Foto), Sylvia Puta (Bodypainting)' },
  { image: 'Cover Vol. 2', credit: 'Benedikt Stehle (Foto)' },
] as const;

/**
 * Förderhinweis for Vol. 2 – verbatim from the Initiative Musik guidelines (§11, 18.10.2026).
 * Shown with both logos on a light background. Layout needs Initiative Musik's approval before launch.
 */
export const fundingNotice = {
  de: 'Gefördert durch die Initiative Musik gemeinnützige Projektgesellschaft mbH im Rahmen von Neustart Kultur mit Projektmitteln der Beauftragten der Bundesregierung für Kultur und Medien.',
  en: 'Supported by Initiative Musik gGmbH with project funds from the Federal Government Commissioner for Culture and Media.',
} as const;

/**
 * Rights gates (§9). Robert flips a flag only after the consent/licence is on file in writing.
 * Cover consents were given verbally on 23.10.2026 – still false until filed.
 */
export const rights = {
  vol1CoverCleared: false,
  vol2CoverCleared: false,
  audioCleared: false,
} as const;

export type RightsKey = keyof typeof rights;

/** Production build (PUBLIC_INDEXABLE=true). Staging and local dev are not indexable. */
export const isIndexable = import.meta.env.PUBLIC_INDEXABLE === 'true';

/**
 * Whether a rights-gated item may render. Staging shows everything for review;
 * production shows it only once the flag is cleared.
 */
export function isCleared(key: RightsKey): boolean {
  return !isIndexable || rights[key];
}
