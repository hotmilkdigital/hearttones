/**
 * Press quotes (CLAUDE.md §5.10). Only these two short quotes, verbatim, always with source.
 * Source: ../01_Brief/07_Presse-Rezensionen.md. Both are reviews of Vol. 1 from two different
 * magazine articles; magazine, issue and year are not confirmed yet (source = null → placeholder).
 * Never quote the sentence about sitars or the one about the three-year-old son; no page images.
 */

import type { Localized } from '../i18n/localized.ts';

export interface PressQuote {
  id: string;
  quote: Localized;
  /** Headline of the article, as on the scan. */
  headline: string;
  /** "Magazin, Ausgabe, Jahr" once confirmed. */
  source: string | null;
  album: 'vol-1';
}

export const pressQuotes: PressQuote[] = [
  {
    id: 'schlaf-baby-schlaf',
    quote: { de: 'wunderschöne Einschlaflieder', en: null },
    headline: 'Schlaf, Baby, schlaf',
    source: null,
    album: 'vol-1',
  },
  {
    id: 'schlaf-mein-kind',
    quote: { de: 'eine wunderschöne CD mit traditionellen Schlafliedchen und eigenen Kompositionen aus allen Kontinenten', en: null },
    headline: 'Schlaf, mein Kind',
    source: null,
    album: 'vol-1',
  },
];

/**
 * Further press from Philipp's answers (00_Projektstatus) – named as text only, no links until
 * the sources are checked (07_Presse-Rezensionen: „nur als Text nennen, Belege/Links prüfen“).
 */
export const pressMentions = [
  { outlet: 'MDR Figaro', what: { de: 'Interview', en: null }, date: { de: '19.01.2012', en: null } },
  { outlet: 'sein.de', what: null, date: { de: 'Januar 2012', en: null } },
  { outlet: 'FolkWorld', what: { de: 'Ausgabe #47', en: null }, date: { de: 'März 2012', en: null } },
  { outlet: 'Eltern', what: { de: 'Rezension', en: null }, date: null },
  { outlet: 'Sein', what: { de: 'Rezension', en: null }, date: null },
  { outlet: 'Himbeere', what: { de: 'Rezension', en: null }, date: null },
] satisfies { outlet: string; what: Localized | null; date: Localized | null }[];

/** Press mentioned by name only (§5.10, artboard press strip). */
export const pressOutlets = ['MDR Figaro', 'Eltern', 'Sein', 'Himbeere', 'FolkWorld'] as const;
