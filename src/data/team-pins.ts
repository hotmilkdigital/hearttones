/**
 * Extra pins on the Die Reise map for the people behind the recordings (Robert, 24.10.2026).
 * They are NOT countries of origin: distinct marker, not counted in the 24 countries (§5.4),
 * listed separately below the map. Studio wording per §5.7 (Vol. 1 „Sov sødt barnlille" was
 * recorded by Peter Sund), so the roles say „fast alle Aufnahmen".
 */

import { site } from './site.ts';
import type { Localized } from '../i18n/localized.ts';

export interface TeamPin {
  id: string;
  name: string;
  place: string;
  /** Country, shown in the list. */
  country: Localized;
  lat: number;
  lon: number;
  /** Why this place is on the map. */
  note: Localized;
  roles: Localized;
  link: { label: string; href: string };
}

export const teamPins: TeamPin[] = [
  {
    id: 'robert-cummings',
    name: 'Robert Cummings',
    place: 'Vancouver, BC',
    country: { de: 'Kanada', en: 'Canada' },
    lat: 49.28,
    lon: -123.12,
    note: { de: 'Heimatstadt von Robert Cummings, Inhaber und Betreiber des Hot Milk Studio Berlin', en: 'Home town of Robert Cummings, owner and operator of Hot Milk Studio Berlin' },
    roles: { de: 'Koproduktion, Mixing und Mastering von Vol. 1 und Vol. 2 – und fast alle Aufnahmen', en: 'Co-production, mixing and mastering of Vol. 1 and Vol. 2 – and almost all of the recording' },
    link: { label: 'hotmilkstudio.de', href: site.partner.url },
  },
];
