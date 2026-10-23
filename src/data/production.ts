/**
 * Production services (CLAUDE.md §1 priority 2, §5.13). Source: Philipp's questionnaire answers
 * (00_Projektstatus „Aus Philipps Antworten") and the approved homepage artboard.
 * Not offered: arrangements for school ensembles (§11, 18.10.2026) – never list them.
 */

/** Services as worded in the artboard. */
export const services = [
  'Produktion & Arrangement',
  'Komposition & Songwriting',
  'Aufnahme, Mixing, Mastering',
  'Session-Keys: Klavier, Rhodes, Moog',
  'Vibraphon',
] as const;

/** Approved artboard intro for the production section. */
export const productionIntro =
  'Sie singen und brauchen ein Instrumental, ein Arrangement oder eine fertige Produktion? Philipp v. Rothkirch komponiert schnell einen tragfähigen Basis-Song und gibt ihm prägnante Licks – genreübergreifend.';

/** How a production runs (Philipp's answers: Ablauf). */
export const process = [
  { title: 'Erstgespräch', text: 'Telefonisch oder vor Ort – nach Vereinbarung.' },
  { title: 'Vorproduktion', text: 'In Philipps Studio in Kreuzberg.' },
  { title: 'Aufnahme und Postproduktion', text: 'Im Hot Milk Studio in Berlin – mit Mixing und Mastering.' },
] as const;

/** Prices are given on request only (Philipp's answers). */
export const pricing = 'Preise auf Anfrage.';

/** Subject lines for the prefilled contact emails (§10: mailto only, no form). */
export const mailSubjects = {
  production: 'Produktionsanfrage',
  press: 'Presseanfrage',
} as const;
