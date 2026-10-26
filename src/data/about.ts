/**
 * Prose of the Über Philipp page (structure: ../01_Brief/05_Ueber-Philipp_Seitenplan.md).
 * German verbatim from ../01_Brief/08_Ueber-Philipp_Kurzbio.md (blocks A–C, Philipp's approval
 * pending) and the approved story texts. {slot} placeholders become links on the page (t.split).
 * Never: school projects, ensemble arrangements as a service (§11), the campaign in §5.9.
 */
import type { Localized } from '../i18n/localized.ts';

/** From Philipp's questionnaire answers (00_Projektstatus). */
export const instruments: Localized<string[]> = {
  de: ['Klavier (seit dem sechsten Lebensjahr)', 'Rhodes', 'Clavinet', 'Moog und Talkbox', 'Vibraphon', 'Bass', 'Percussion'],
  en: null,
};

/** Block A (B10 intro). */
export const bio: Localized = {
  de: 'Philipp von Rothkirch stammt aus Niedersachsen und lebt seit 2000 in Berlin. Als Keyboarder mit einer Vorliebe für Funk und Soul spielte er live und im Studio unter anderem für Gilbert Abdourahmane Diop, Kirk Smith, Della Miles und Ingrid Arthur sowie im Wintergarten Varieté Berlin. Außerdem arbeitet er als Musiktherapeut in Kitas, in Seniorenheimen und mit einer Gruppe von Menschen mit Trisomie 21 und unterrichtet Klavier an einer Berliner Musikschule.',
  en: null,
};

/** How Philipp and Robert met (no street name for Philipp, §11 24.10.2026). */
export const met: Localized = {
  de: 'Philipp von Rothkirch wohnt in Berlin-Kreuzberg. Eine Straße weiter, in der Wartenburgstraße, lag von 2009 bis 2022 das Hot Milk Studio, in einer typischen Berliner Souterrainwohnung. Eines Tages im Jahr 2009 ging Philipp mit einem Freund einmal um den Block. Er schaute in das Souterrain und sah zu seiner Überraschung ein Studio. Er klopfte an die Tür und stellte sich vor. Seitdem sind Philipp und Robert Cummings befreundet.',
  en: null,
};

/** Instruments and way of working: block B, block C ({singles} → singles page), process ({studio} → hotmilkstudio.de). */
export const craft: { favourites: Localized; approach: Localized; singles: Localized; process: Localized } = {
  favourites: {
    de: 'Seine Lieblingsinstrumente sind Fender Rhodes, Hohner Clavinet und Moog, gern auch mit Talkbox.',
    en: null,
  },
  approach: {
    de: 'Philipp von Rothkirch komponiert schnell einen tragfähigen Basis-Song und gibt ihm prägnante Licks – genreübergreifend.',
    en: null,
  },
  singles: {
    de: 'Seine neuen Songs „World Peace Now!“ und „Bombs Away!“ erscheinen demnächst als {singles}. „Bombs Away!“ entstand 2006 mit seiner damaligen Band Phases of Life, als Statement gegen den Wahnsinn der Kriege weltweit; noch im selben Jahr spielte die Band den Song auf persönliche Einladung von Nina Hagen bei deren Peace Charity Gala. Für das Berlin Peace Collective wurde er teilweise neu aufgenommen und von Robert Cummings im Hot Milk Studio neu gemischt und gemastert. „World Peace Now!“ entstand gemeinsam mit Produzent Robert Cummings im Hot Milk Studio.',
    en: null,
  },
  process: {
    de: 'Am Anfang steht ein Erstgespräch, telefonisch oder vor Ort. Die Vorproduktion entsteht in Kreuzberg, Aufnahme und Postproduktion im {studio} in Berlin.',
    en: null,
  },
};

/** Person description in the JSON-LD (lib/schema.ts). */
export const personDescription: Localized = {
  de: 'Komponist, Produzent und Musiker in Berlin-Kreuzberg',
  en: null,
};
