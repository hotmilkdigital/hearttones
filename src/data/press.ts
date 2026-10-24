/**
 * Press quotes (CLAUDE.md §5.10). Only these two short quotes, verbatim, always with source.
 * Source: ../01_Brief/07_Presse-Rezensionen.md. Both are reviews of Vol. 1 from two different
 * magazine articles; magazine, issue and year are not confirmed yet (source = null → placeholder).
 * Never quote the sentence about sitars or the one about the three-year-old son; no page images.
 */

export interface PressQuote {
  id: string;
  quote: string;
  /** Headline of the article, as on the scan. */
  headline: string;
  /** "Magazin, Ausgabe, Jahr" once confirmed. */
  source: string | null;
  album: 'vol-1';
}

export const pressQuotes: PressQuote[] = [
  {
    id: 'schlaf-baby-schlaf',
    quote: 'wunderschöne Einschlaflieder',
    headline: 'Schlaf, Baby, schlaf',
    source: null,
    album: 'vol-1',
  },
  {
    id: 'schlaf-mein-kind',
    quote: 'eine wunderschöne CD mit traditionellen Schlafliedchen und eigenen Kompositionen aus allen Kontinenten',
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
  { outlet: 'MDR Figaro', what: 'Interview', date: '19.01.2012' },
  { outlet: 'sein.de', what: null, date: 'Januar 2012' },
  { outlet: 'FolkWorld', what: 'Ausgabe #47', date: 'März 2012' },
  { outlet: 'Eltern', what: 'Rezension', date: null },
  { outlet: 'Sein', what: 'Rezension', date: null },
  { outlet: 'Himbeere', what: 'Rezension', date: null },
] as const;

/** Press mentioned by name only (§5.10, artboard press strip). */
export const pressOutlets = ['MDR Figaro', 'Eltern', 'Sein', 'Himbeere', 'FolkWorld'] as const;
