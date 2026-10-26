/**
 * Production services (CLAUDE.md §1 priority 2, §5.13). Source: Philipp's questionnaire answers
 * (00_Projektstatus „Aus Philipps Antworten") and the approved homepage artboard.
 * Not offered: arrangements for school ensembles (§11, 18.10.2026) – never list them.
 */

import type { Localized } from '../i18n/localized.ts';

/** Services as worded in the artboard. */
export const services: Localized[] = [
  { de: 'Produktion & Arrangement', en: null },
  { de: 'Komposition & Songwriting', en: null },
  { de: 'Aufnahme, Mixing, Mastering', en: null },
  { de: 'Session-Keys: Klavier, Rhodes, Moog', en: null },
  { de: 'Vibraphon', en: null },
];

/** Approved artboard intro for the production section. */
export const productionIntro: Localized = {
  de: 'Sie singen und brauchen ein Instrumental, ein Arrangement oder eine fertige Produktion? Philipp von Rothkirch komponiert schnell einen tragfähigen Basis-Song und gibt ihm prägnante Licks – genreübergreifend.',
  en: null,
};

/** How a production runs (Philipp's answers: Ablauf). */
export const process = [
  { title: { de: 'Erstgespräch', en: null }, text: { de: 'Telefonisch oder vor Ort – nach Vereinbarung.', en: null } },
  { title: { de: 'Vorproduktion', en: null }, text: { de: 'In Philipps Studio in Kreuzberg.', en: null } },
  { title: { de: 'Aufnahme und Postproduktion', en: null }, text: { de: 'Im Hot Milk Studio in Berlin – mit Mixing und Mastering.', en: null } },
] satisfies { title: Localized; text: Localized }[];

/** Prices are given on request only (Philipp's answers). */
export const pricing: Localized = { de: 'Preise auf Anfrage.', en: null };

/** Subject lines for the prefilled contact emails (§10: mailto only, no form). */
export const mailSubjects = {
  production: 'Produktionsanfrage',
  press: 'Presseanfrage',
} as const;
