/**
 * Instrument and credit roles with DE/EN labels. Albums and singles store role keys, never
 * free text, so both languages render from one source. The CD prints roles in English
 * ("voc", "git", "cora", "balaphone" …); keys normalise those spellings.
 */

import type { Locale } from './routes.ts';

export const roleLabels = {
  // Voices
  vocals: { de: 'Gesang', en: 'vocals' },
  mainVocals: { de: 'Leadgesang', en: 'main vocals' },
  backingVocals: { de: 'Backgroundgesang', en: 'backing vocals' },
  chorusOperaVocals: { de: 'Opern-Chorgesang', en: 'chorus opera vocals' },
  // Instruments
  accordion: { de: 'Akkordeon', en: 'accordion' },
  allInstruments: { de: 'alle Instrumente', en: 'all instruments' },
  balafon: { de: 'Balafon', en: 'balafon' },
  bass: { de: 'Bass', en: 'bass' },
  cello: { de: 'Cello', en: 'cello' },
  clarinet: { de: 'Klarinette', en: 'clarinet' },
  doubleBass: { de: 'Kontrabass', en: 'double bass' },
  drums: { de: 'Schlagzeug', en: 'drums' },
  drumline: { de: 'Drumline', en: 'drumline' },
  esraj: { de: 'Esraj', en: 'esraj' },
  flute: { de: 'Flöte', en: 'flute' },
  glockenspiel: { de: 'Glockenspiel', en: 'glockenspiel' },
  guitar: { de: 'Gitarre', en: 'guitar' },
  harmonium: { de: 'Harmonium', en: 'harmonium' },
  horseHeadFiddles: { de: 'Pferdekopfgeigen', en: 'horse-head fiddles' },
  instruments: { de: 'Instrumente', en: 'instruments' },
  kanun: { de: 'Kanun', en: 'kanun' },
  keys: { de: 'Keyboards', en: 'keys' },
  kora: { de: 'Kora', en: 'kora' },
  liveDrums: { de: 'Live-Schlagzeug', en: 'live drums' },
  piano: { de: 'Klavier', en: 'piano' },
  rhodes: { de: 'Rhodes', en: 'Rhodes' },
  tar: { de: 'Tar', en: 'tar' },
  trombone: { de: 'Posaune', en: 'trombone' },
  trumpet: { de: 'Trompete', en: 'trumpet' },
  vibraphone: { de: 'Vibraphon', en: 'vibraphone' },
  violin: { de: 'Violine', en: 'violin' },
  // Production and artwork
  arrangement: { de: 'Arrangement', en: 'arrangement' },
  composition: { de: 'Komposition', en: 'composition' },
  production: { de: 'Produktion', en: 'production' },
  coProduction: { de: 'Koproduktion', en: 'co-production' },
  recording: { de: 'Aufnahme', en: 'recording' },
  mixing: { de: 'Mix', en: 'mixing' },
  mastering: { de: 'Mastering', en: 'mastering' },
  remixRemaster: { de: 'neu gemischt und gemastert', en: 're-mix and re-master' },
  coverPhoto: { de: 'Coverfoto', en: 'cover photo' },
  bodyPainting: { de: 'Bodypainting', en: 'body painting' },
  coverModel: { de: 'Covermodel', en: 'cover model' },
  design: { de: 'Gestaltung und Realisierung', en: 'design and realisation' },
} as const satisfies Record<string, Record<Locale, string>>;

export type Role = keyof typeof roleLabels;

export function roleLabel(role: Role, locale: Locale = 'de'): string {
  return roleLabels[role][locale];
}
