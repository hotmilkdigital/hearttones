/**
 * The 24 countries of origin (CLAUDE.md §5.4, §8.5). A track counts for the first-named
 * country only; second-named countries (Georgien, Deutschland on Vol. 2) are mentioned in
 * the text but get no extra marker.
 *
 * isoNumeric matches the feature ids in world-atlas (Natural Earth) for the build-time map.
 * lat/lon are approximate geographic centres, used only to place the marker.
 */

import { albums, type Album, type Track } from './albums.ts';
import type { Locale } from './routes.ts';

export type Continent = 'africa' | 'americas' | 'asia' | 'europe' | 'oceania';

export const continentLabels: Record<Continent, Record<Locale, string>> = {
  africa: { de: 'Afrika', en: 'Africa' },
  americas: { de: 'Amerika', en: 'Americas' },
  asia: { de: 'Asien', en: 'Asia' },
  europe: { de: 'Europa', en: 'Europe' },
  oceania: { de: 'Ozeanien', en: 'Oceania' },
};

export interface Country {
  name: Record<Locale, string>;
  isoNumeric: string;
  continent: Continent;
  lat: number;
  lon: number;
}

export const countries = {
  // Vol. 1
  HT: { name: { de: 'Haiti', en: 'Haiti' }, isoNumeric: '332', continent: 'americas', lat: 19.0, lon: -72.4 },
  IL: { name: { de: 'Israel', en: 'Israel' }, isoNumeric: '376', continent: 'asia', lat: 31.4, lon: 35.0 },
  SN: { name: { de: 'Senegal', en: 'Senegal' }, isoNumeric: '686', continent: 'africa', lat: 14.4, lon: -14.5 },
  TR: { name: { de: 'Türkei', en: 'Turkey' }, isoNumeric: '792', continent: 'asia', lat: 39.0, lon: 35.2 },
  CL: { name: { de: 'Chile', en: 'Chile' }, isoNumeric: '152', continent: 'americas', lat: -35.7, lon: -71.5 },
  GE: { name: { de: 'Georgien', en: 'Georgia' }, isoNumeric: '268', continent: 'asia', lat: 42.3, lon: 43.4 },
  DK: { name: { de: 'Dänemark', en: 'Denmark' }, isoNumeric: '208', continent: 'europe', lat: 56.0, lon: 10.0 },
  ML: { name: { de: 'Mali', en: 'Mali' }, isoNumeric: '466', continent: 'africa', lat: 17.6, lon: -4.0 },
  FR: { name: { de: 'Frankreich', en: 'France' }, isoNumeric: '250', continent: 'europe', lat: 46.6, lon: 2.4 },
  DE: { name: { de: 'Deutschland', en: 'Germany' }, isoNumeric: '276', continent: 'europe', lat: 51.2, lon: 10.4 },
  US: { name: { de: 'USA', en: 'USA' }, isoNumeric: '840', continent: 'americas', lat: 39.8, lon: -98.6 },
  KR: { name: { de: 'Südkorea', en: 'South Korea' }, isoNumeric: '410', continent: 'asia', lat: 36.5, lon: 127.9 },
  IN: { name: { de: 'Indien', en: 'India' }, isoNumeric: '356', continent: 'asia', lat: 22.9, lon: 79.6 },
  // Vol. 2 (Chile and Deutschland already above)
  ZA: { name: { de: 'Südafrika', en: 'South Africa' }, isoNumeric: '710', continent: 'africa', lat: -29.0, lon: 25.1 },
  DZ: { name: { de: 'Algerien', en: 'Algeria' }, isoNumeric: '012', continent: 'africa', lat: 28.0, lon: 2.6 },
  IR: { name: { de: 'Iran', en: 'Iran' }, isoNumeric: '364', continent: 'asia', lat: 32.4, lon: 53.7 },
  UA: { name: { de: 'Ukraine', en: 'Ukraine' }, isoNumeric: '804', continent: 'europe', lat: 49.0, lon: 31.4 },
  AU: { name: { de: 'Australien', en: 'Australia' }, isoNumeric: '036', continent: 'oceania', lat: -25.7, lon: 134.5 },
  RU: { name: { de: 'Russland', en: 'Russia' }, isoNumeric: '643', continent: 'europe', lat: 61.5, lon: 105.3 },
  PL: { name: { de: 'Polen', en: 'Poland' }, isoNumeric: '616', continent: 'europe', lat: 52.1, lon: 19.4 },
  MN: { name: { de: 'Mongolei', en: 'Mongolia' }, isoNumeric: '496', continent: 'asia', lat: 46.9, lon: 103.8 },
  ID: { name: { de: 'Indonesien', en: 'Indonesia' }, isoNumeric: '360', continent: 'asia', lat: -2.5, lon: 117.9 },
  IT: { name: { de: 'Italien', en: 'Italy' }, isoNumeric: '380', continent: 'europe', lat: 42.8, lon: 12.6 },
  BR: { name: { de: 'Brasilien', en: 'Brazil' }, isoNumeric: '076', continent: 'americas', lat: -10.8, lon: -53.1 },
} as const satisfies Record<string, Country>;

export type CountryCode = keyof typeof countries;

export function countryName(code: CountryCode, locale: Locale = 'de'): string {
  return countries[code].name[locale];
}

export interface CountryTrack {
  album: Album;
  track: Track;
  /** false when the country is only the second-named one (no marker, mention in text). */
  primary: boolean;
}

/** Track refs per country, derived from albums.ts so there is one source of truth. */
export function tracksForCountry(code: CountryCode): CountryTrack[] {
  return albums.flatMap((album) =>
    album.tracks
      .filter((track) => track.countries.includes(code))
      .map((track) => ({ album, track, primary: track.countries[0] === code })),
  );
}
