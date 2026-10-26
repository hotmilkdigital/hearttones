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
  en: ['Piano (since the age of six)', 'Rhodes', 'Clavinet', 'Moog and talk box', 'Vibraphone', 'Bass', 'Percussion'],
};

/** Block A (B10 intro). */
export const bio: Localized = {
  de: 'Philipp von Rothkirch stammt aus Niedersachsen und lebt seit 2000 in Berlin. Als Keyboarder mit einer Vorliebe für Funk und Soul spielte er live und im Studio unter anderem für Gilbert Abdourahmane Diop, Kirk Smith, Della Miles und Ingrid Arthur sowie im Wintergarten Varieté Berlin. Außerdem arbeitet er als Musiktherapeut in Kitas, in Seniorenheimen und mit einer Gruppe von Menschen mit Trisomie 21 und unterrichtet Klavier an einer Berliner Musikschule.',
  en: 'Philipp von Rothkirch comes from Lower Saxony and has lived in Berlin since 2000. A keyboard player with a love of funk and soul, he has played live and in the studio for artists including Gilbert Abdourahmane Diop, Kirk Smith, Della Miles and Ingrid Arthur, and at the Wintergarten Varieté in Berlin. He also works as a music therapist in nurseries, in care homes and with a group of people with Down’s syndrome, and teaches piano at a Berlin music school.',
};

/** How Philipp and Robert met (no street name for Philipp, §11 24.10.2026). */
export const met: Localized = {
  de: 'Philipp von Rothkirch wohnt in Berlin-Kreuzberg. Eine Straße weiter, in der Wartenburgstraße, lag von 2009 bis 2022 das Hot Milk Studio, in einer typischen Berliner Souterrainwohnung. Eines Tages im Jahr 2009 ging Philipp mit einem Freund einmal um den Block. Er schaute in das Souterrain und sah zu seiner Überraschung ein Studio. Er klopfte an die Tür und stellte sich vor. Seitdem sind Philipp und Robert Cummings befreundet.',
  en: 'Philipp von Rothkirch lives in Berlin-Kreuzberg. From 2009 to 2022, Hot Milk Studio was one street away, on Wartenburgstraße, in a typical Berlin basement flat. One day in 2009, Philipp was walking around the block with a friend. He glanced down into the basement and, to his surprise, saw a studio. He knocked on the door and introduced himself. Philipp and Robert Cummings have been friends ever since.',
};

/** Instruments and way of working: block B, block C ({singles} → singles page), process ({studio} → hotmilkstudio.de). */
export const craft: { favourites: Localized; approach: Localized; singles: Localized; process: Localized } = {
  favourites: {
    de: 'Seine Lieblingsinstrumente sind Fender Rhodes, Hohner Clavinet und Moog, gern auch mit Talkbox.',
    en: 'His favourite instruments are the Fender Rhodes, the Hohner Clavinet and the Moog, often with a talk box.',
  },
  approach: {
    de: 'Philipp von Rothkirch komponiert schnell einen tragfähigen Basis-Song und gibt ihm prägnante Licks – genreübergreifend.',
    en: 'Philipp von Rothkirch quickly composes a solid basic song and gives it distinctive licks – across genres.',
  },
  singles: {
    de: 'Seine neuen Songs „World Peace Now!“ und „Bombs Away!“ erscheinen demnächst als {singles}. „Bombs Away!“ entstand 2006 mit seiner damaligen Band Phases of Life, als Statement gegen den Wahnsinn der Kriege weltweit; noch im selben Jahr spielte die Band den Song auf persönliche Einladung von Nina Hagen bei deren Peace Charity Gala. Für das Berlin Peace Collective wurde er teilweise neu aufgenommen und von Robert Cummings im Hot Milk Studio neu gemischt und gemastert. „World Peace Now!“ entstand gemeinsam mit Produzent Robert Cummings im Hot Milk Studio.',
    en: 'His new songs “World Peace Now!” and “Bombs Away!” will be released soon as {singles}. “Bombs Away!” was written in 2006 with his band at the time, Phases of Life, as a statement against the madness of wars around the world; that same year, the band played the song at Nina Hagen’s Peace Charity Gala at her personal invitation. For Berlin Peace Collective it was partly re-recorded, and remixed and remastered by Robert Cummings at Hot Milk Studio. “World Peace Now!” was created together with producer Robert Cummings at Hot Milk Studio.',
  },
  process: {
    de: 'Am Anfang steht ein Erstgespräch, telefonisch oder vor Ort. Die Vorproduktion entsteht in Kreuzberg, Aufnahme und Postproduktion im {studio} in Berlin.',
    en: 'It all starts with an initial conversation, by phone or in person. Pre-production takes place in Kreuzberg, recording and post-production at {studio}.',
  },
};

/** Person description in the JSON-LD (lib/schema.ts). */
export const personDescription: Localized = {
  de: 'Komponist, Produzent und Musiker in Berlin-Kreuzberg',
  en: 'Composer, producer and musician in Berlin-Kreuzberg',
};
