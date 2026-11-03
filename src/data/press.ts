/**
 * Reviews of Vol. 1 – press and listeners (CLAUDE.md §5.10, §11 03.11.2026). Verbatim from Philipp's
 * list ../02_Assets/reviews/hearttones-reviews.txt. Only quotes with a verified source – „Schlaf, mein
 * Kind" (07_Presse-Rezensionen) was removed for lack of one (Robert, 03.11.2026). Typography only:
 * „…" quotes, the five dots in „Wir Eltern" as „ … ", „Schwangerschaftstagebuch" typo fixed.
 * FolkWorld: only the accurate last sentences (Robert) – the first part misspells the name and
 * claims all recordings were made by one musician (§5.3, §5.7).
 * Never quote the sentence about the three-year-old son; no images of the magazine pages.
 *
 * `quote.de` / `quote.en`: the text shown on DE / EN pages. `lang` is the original language: German
 * originals get "(translated from German)" on EN pages; FolkWorld is English on both.
 */

import type { Localized } from '../i18n/localized.ts';

export type ReviewId =
  | 'eltern'
  | 'wir-eltern'
  | 'sein'
  | 'himbeer'
  | 'folkworld'
  | 'bettina'
  | 'annika';

export interface Review {
  id: ReviewId;
  kind: 'press' | 'listener';
  quote: Localized;
  /** Language of the original wording. */
  lang: 'de' | 'en';
  /** Outlet/person and issue as given by Philipp; null → [PLATZHALTER: Magazin, Ausgabe, Jahr]. */
  source: Localized | null;
  /** Headline of the article, as on the scan (German, shown with lang="de" on EN pages). */
  headline?: string;
  album: 'vol-1';
}

export const reviews: Review[] = [
  {
    id: 'eltern',
    kind: 'press',
    quote: { de: 'wunderschöne Einschlaflieder', en: 'beautiful lullabies' },
    lang: 'de',
    source: { de: 'Eltern, 9/2012', en: 'Eltern, 9/2012' },
    headline: 'Schlaf, Baby, schlaf',
    album: 'vol-1',
  },
  {
    id: 'wir-eltern',
    kind: 'press',
    quote: {
      de: 'musikalische Streicheleinheiten … süßer die Sitars nie klingen',
      en: 'musical caresses … sitars never sounded sweeter',
    },
    lang: 'de',
    source: { de: 'Wir Eltern (Schweiz), 12/2012', en: 'Wir Eltern (Switzerland), 12/2012' },
    album: 'vol-1',
  },
  {
    id: 'sein',
    kind: 'press',
    quote: {
      de: 'Beruhigend, sanft, stärkend, stellenweise auch bittersüß-melancholisch. Musik, die einen zum Einschlafen liebevoll zudeckt, einen zarten Kuss auf die Stirn drückt und in das Land der Träume schickt.',
      en: 'Soothing, gentle, strengthening, at times bittersweet and melancholy. Music that lovingly tucks you in to sleep, places a tender kiss on your forehead and sends you off to the land of dreams.',
    },
    lang: 'de',
    source: { de: 'Sein, Januar 2012', en: 'Sein, January 2012' },
    album: 'vol-1',
  },
  {
    id: 'himbeer',
    kind: 'press',
    quote: {
      de: 'Abwechslungsreich und schön ist diese Sammlung internationaler Schlaflieder.',
      en: 'This collection of international lullabies is varied and lovely.',
    },
    lang: 'de',
    source: { de: 'Himbeer, 9/2012', en: 'Himbeer, 9/2012' },
    album: 'vol-1',
  },
  {
    id: 'folkworld',
    kind: 'press',
    quote: {
      de: 'The album feels overall rounded, and will be suitable to calm your little children down to sleep, or for you to chill out with it.',
      en: 'The album feels overall rounded, and will be suitable to calm your little children down to sleep, or for you to chill out with it.',
    },
    lang: 'en',
    source: { de: 'FolkWorld, 3/2012', en: 'FolkWorld, 3/2012' },
    album: 'vol-1',
  },
  {
    id: 'bettina',
    kind: 'listener',
    quote: {
      de: 'Da möchte man glatt nochmal Kinder kriegen',
      en: 'It almost makes you want to have children all over again',
    },
    lang: 'de',
    source: { de: 'Bettina W., Dresden', en: 'Bettina W., Dresden' },
    album: 'vol-1',
  },
  {
    id: 'annika',
    kind: 'listener',
    quote: {
      de: 'da kann ich schon jetzt super bei entspannen, und bestimmt wird das Baby später gar nicht anders können, als dabei einzuschlafen',
      en: 'I can already relax to it beautifully, and I’m sure the baby won’t be able to do anything but fall asleep to it later',
    },
    lang: 'de',
    source: { de: 'Annika, Schwangerschaftstagebuch „Kids Go“', en: 'Annika, pregnancy diary “Kids Go”' },
    album: 'vol-1',
  },
];

export const review = (id: ReviewId): Review => reviews.find((r) => r.id === id)!;

/**
 * Further press from Philipp's answers (00_Projektstatus) – named as text only, no links until
 * the sources are checked (07_Presse-Rezensionen: „nur als Text nennen, Belege/Links prüfen“).
 */
export const pressMentions = [
  { outlet: 'MDR Figaro', what: { de: 'Interview', en: 'Interview' }, date: { de: '19.01.2012', en: '19 January 2012' } },
  { outlet: 'sein.de', what: null, date: { de: 'Januar 2012', en: 'January 2012' } },
  { outlet: 'FolkWorld', what: { de: 'Ausgabe #47', en: 'Issue 47' }, date: { de: 'März 2012', en: 'March 2012' } },
  { outlet: 'Eltern', what: { de: 'Rezension', en: 'Review' }, date: { de: 'Ausgabe 9/2012', en: 'Issue 9/2012' } },
  { outlet: 'Sein', what: { de: 'Rezension', en: 'Review' }, date: { de: 'Januar 2012', en: 'January 2012' } },
  { outlet: 'Himbeer', what: { de: 'Rezension', en: 'Review' }, date: { de: 'Ausgabe 9/2012', en: 'Issue 9/2012' } },
  { outlet: 'Wir Eltern (Schweiz)', what: { de: 'Rezension', en: 'Review' }, date: { de: 'Ausgabe 12/2012', en: 'Issue 12/2012' } },
] satisfies { outlet: string; what: Localized | null; date: Localized | null }[];

/** Press mentioned by name only (§5.10, artboard press strip). „Himbeer" as in Philipp's list (03.11.2026). */
export const pressOutlets = ['MDR Figaro', 'Eltern', 'Sein', 'Himbeer', 'FolkWorld'] as const;
