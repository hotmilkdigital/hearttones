/**
 * Production services (CLAUDE.md §1 priority 2, §5.13). Source: Philipp's questionnaire answers
 * (00_Projektstatus „Aus Philipps Antworten") and the approved homepage artboard.
 * Not offered: arrangements for school ensembles (§11, 18.10.2026) – never list them.
 */

import type { Localized } from '../i18n/localized.ts';

/** Services as worded in the artboard. */
export const services: Localized[] = [
  { de: 'Produktion & Arrangement', en: 'Production & arrangement' },
  { de: 'Komposition & Songwriting', en: 'Composition & songwriting' },
  { de: 'Aufnahme, Mixing, Mastering', en: 'Recording, mixing, mastering' },
  { de: 'Session-Keys: Klavier, Rhodes, Moog', en: 'Session keys: piano, Rhodes, Moog' },
  { de: 'Vibraphon', en: 'Vibraphone' },
];

/** Approved artboard intro for the production section. */
export const productionIntro: Localized = {
  de: 'Sie singen und brauchen ein Instrumental, ein Arrangement oder eine fertige Produktion? Philipp von Rothkirch komponiert schnell einen tragfähigen Basis-Song und gibt ihm prägnante Licks – genreübergreifend.',
  en: 'Are you a singer who needs an instrumental, an arrangement or a finished production? Philipp von Rothkirch quickly composes a solid basic song and gives it distinctive licks – across genres.',
};

/** How a production runs (Philipp's answers: Ablauf). */
export const process = [
  { title: { de: 'Erstgespräch', en: 'Initial conversation' }, text: { de: 'Telefonisch oder vor Ort – nach Vereinbarung.', en: 'By phone or in person, by appointment.' } },
  { title: { de: 'Vorproduktion', en: 'Pre-production' }, text: { de: 'In Philipps Studio in Kreuzberg.', en: 'In Philipp’s studio in Kreuzberg.' } },
  { title: { de: 'Aufnahme und Postproduktion', en: 'Recording and post-production' }, text: { de: 'Im Hot Milk Studio in Berlin – mit Mixing und Mastering.', en: 'At Hot Milk Studio in Berlin, including mixing and mastering.' } },
] satisfies { title: Localized; text: Localized }[];

/** Prices are given on request only (Philipp's answers). */
export const pricing: Localized = { de: 'Preise auf Anfrage.', en: 'Prices on request.' };

/** Subject lines for the prefilled contact emails (§10: mailto only, no form). */
export const mailSubjects = {
  production: 'Produktionsanfrage',
  press: 'Presseanfrage',
} as const;
