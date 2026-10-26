/**
 * Locale-aware formatting (docs/i18n-inventory.md §5.3). Replaces the fixed 'de-DE' / 'de'
 * calls in views: prices „15 €" (DE) / "€15" (EN-GB), dates, name sorting, lists.
 */
import type { Locale } from '../data/routes';

export const intlLocale: Record<Locale, string> = { de: 'de-DE', en: 'en-GB' };

/** Euro amount without decimals for whole numbers: DE „15 €", „3,50 €" · EN „€15", „€3.50". */
export function formatEur(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

/** Long date: DE „16. November 2011" · EN „16 November 2011". */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], { dateStyle: 'long' }).format(new Date(iso));
}

/** Comparator for sorting names and countries alphabetically in the page language. */
export function compareText(locale: Locale): (a: string, b: string) => number {
  return new Intl.Collator(locale).compare;
}

/** „A, B und C" / "A, B and C". */
export function formatList(items: string[], locale: Locale): string {
  return new Intl.ListFormat(intlLocale[locale], { style: 'long', type: 'conjunction' }).format(items);
}
