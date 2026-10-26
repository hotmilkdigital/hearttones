/**
 * Bilingual data fields (docs/i18n-inventory.md §5.4). German is the source; `en: null` means
 * "not translated yet" – `npm run check:i18n` reports these and fails once EN is published.
 */
import type { Locale } from '../data/routes.ts';

export type Localized<T = string> = { de: T; en: T | null };

/** The value in the page language; falls back to German while EN is missing. */
export function loc<T>(value: Localized<T>, locale: Locale): T {
  return locale === 'en' ? (value.en ?? value.de) : value.de;
}
