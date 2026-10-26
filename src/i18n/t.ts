/**
 * Translation helper (docs/i18n-inventory.md §5.3):
 *   const t = useT(locale);
 *   t('hero.h1')                         → string
 *   t('album.eyebrow', { year: 2011 })   → fills {year}
 *   t.split('press.lead')                → ['Stimmen zu ', 'link', '.'] – text and slot names
 *                                          alternate, so links can sit inside a sentence.
 * A missing EN value (null) falls back to German; `npm run check:i18n` reports it, and fails
 * once EN is published.
 */
import type { Locale } from '../data/routes';
import { ui, uiTable, type UiKey } from './ui';

export type Vars = Record<string, string | number>;

/** Replaces {name} with vars.name; unknown placeholders stay as they are (slots for split). */
export function fill(text: string, vars?: Vars): string {
  return text.replace(/\{(\w+)\}/g, (m, k: string) => (vars && k in vars ? String(vars[k]) : m));
}

/** Splits at the remaining {slot} placeholders: even indexes are text, odd indexes slot names. */
export function splitSlots(text: string): string[] {
  return text.split(/\{(\w+)\}/);
}

export function useT(locale: Locale) {
  const t = (key: UiKey, vars?: Vars): string => fill(uiTable(locale)[key] ?? ui.de[key], vars);
  t.split = (key: UiKey, vars?: Vars): string[] => splitSlots(t(key, vars));
  return t;
}
