/**
 * Performers on Vol. 1 and Vol. 2 (persons and ensembles), source: ../01_Brief/02_CD-Credits-Vol1-Vol2.md.
 * One entry per person, so the same musician on both albums counts once (CLAUDE.md §5.4: 46).
 *
 * `diedYear` is shown as „verstorben 2012“ / „died 2012“ – never a cross (§5.16).
 *
 * `website`: only the musician's own website, researched 25.10.2026 (CLAUDE.md §5.16) – never a
 * platform profile (SoundCloud, Bandcamp, SoundBetter, Facebook, YouTube, Wikipedia) or an
 * employer/orchestra/school page. Without an own website the musician is listed by name only.
 *
 * `photo`: prepared for later, not used anywhere yet. Only fill it once Philipp has the artist's
 * permission and the photographer credit; until then `consent` stays false (absent = no consent).
 */

export interface Person {
  name: string;
  kind: 'person' | 'ensemble';
  /** Own website – https, except where the site has no working HTTPS (see comment at the entry). */
  website?: string;
  /** Other name the person is credited under (shown on the Künstler:innen page). */
  alsoCredited?: string;
  /** Year of death, for a respectful mention. */
  diedYear?: number;
  photo?: {
    /** File in src/assets/people/. */
    file: string;
    /** Photographer credit, e.g. „Foto: …". */
    credit: string;
    /** true only once the artist's permission is on file (via Philipp). */
    consent: boolean;
  };
}

export const people = {
  // Vol. 1
  'rachelle-jeanty': { name: 'Rachelle Jeanty', kind: 'person', website: 'https://rachellejeanty.com/' },
  'cremildo-de-caifaz': { name: 'Cremildo de Caifaz', kind: 'person' },
  'philipp-v-rothkirch': { name: 'Philipp von Rothkirch', kind: 'person' },
  'talia-kliger': { name: 'Talia Kliger', kind: 'person' },
  'uri-gincel': { name: 'Uri Gincel', kind: 'person', website: 'https://gincel.com/' },
  'gilbert-abdourahmane-diop': { name: 'Gilbert Abdourahmane Diop', kind: 'person', diedYear: 2012 },
  'djefily-sako': { name: 'Djefily Sako', kind: 'person' },
  'arcadius-didavi': { name: 'Arcadius Didavi', kind: 'person', website: 'https://didavi.de/' },
  'goekce-sayan': { name: 'Gökce Sayan', kind: 'person' },
  // Printed as "Serkan Kaynarcali" on Vol. 1 and "Serkan Ky" on Vol. 2 – same person; "Serkan Ky" is his
  // artist name since then and is used outside the Vol. 1 credits (confirmed 24.10.2026).
  'serkan-ky': { name: 'Serkan Ky', kind: 'person', alsoCredited: 'Serkan Kaynarcali' },
  'mesut-lekesiz': { name: 'Mesut Lekesiz', kind: 'person', diedYear: 2017 },
  'eugenia-tapia': { name: 'Eugenia Tapia', kind: 'person' },
  'rodrigo-santa-maria': { name: 'Rodrigo Santa Maria', kind: 'person', website: 'https://www.rodrigosantamaria.de/' },
  tutarchela: { name: 'Tutarchela', kind: 'ensemble' },
  'joergen-dickmeiss': { name: 'Jørgen Dickmeiss', kind: 'person', website: 'https://www.tumulten.dk/' },
  'maren-hallberg': { name: 'Maren Hallberg', kind: 'person' },
  'peter-sund': { name: 'Peter Sund', kind: 'person', website: 'https://www.thefarm-music.com/' },
  'aly-keita': { name: 'Aly Keita', kind: 'person', website: 'https://www.alykeitabalafon.com/' },
  // Performs as "Brune"; credited as writer under her full name "Ruby Brune" – same person (confirmed 24.10.2026).
  brune: { name: 'Brune', kind: 'person', alsoCredited: 'Ruby Brune' },
  'sabine-v-rothkirch': { name: 'Sabine v. Rothkirch', kind: 'person' },
  'isabelle-klemt': { name: 'Isabelle Klemt', kind: 'person' },
  'kiko-king': { name: 'Kiko King', kind: 'person' },
  'christoph-schmitz': { name: 'Christoph Schmitz', kind: 'person' },
  'hye-young': { name: 'Hye Young', kind: 'person' },
  'christoph-jung': { name: 'Christoph Jung', kind: 'person', website: 'https://www.christophjung.info/' },
  // The Kirtaniyas
  'sarasvati-dasi': { name: 'Sarasvati Dasi', kind: 'person', website: 'https://sarasvatidasi.com/' },
  'tribhanga-campling': { name: 'Tribhanga Campling', kind: 'person' },
  // Vol. 2
  'kgomotso-tsatsi': { name: 'Kgomotso Tsatsi', kind: 'person', website: 'https://kileza.com/' },
  // No HTTPS on the server (times out); http works – tested by Robert and curl, 25.10.2026.
  'momo-djender': { name: 'Momo Djender', kind: 'person', website: 'http://www.momodjender.com/' },
  'sepideh-safiaryan': { name: 'Sepideh Safiaryan', kind: 'person' },
  'roksana-vikaluk': { name: 'Roksana Vikaluk', kind: 'person', website: 'https://roksana.com.pl/' },
  'julia-messenger': { name: 'Julia Messenger', kind: 'person', website: 'https://juliamessenger.com/' },
  'zulya-nazipovna-kamalova': { name: 'Zulya Nazipovna Kamalova', kind: 'person', diedYear: 2024 },
  // HTTPS broken (TLS error in every client); http works – tested by Robert and curl, 25.10.2026.
  'nino-tsitsishvili': { name: 'Nino Tsitsishvili', kind: 'person', website: 'http://ninotsitsishvili.org/' },
  'joseph-jordania': { name: 'Joseph Jordania', kind: 'person', website: 'https://www.josephjordania.org/' },
  'mal-webb': { name: 'Mal Webb', kind: 'person', website: 'https://www.malwebb.com/' },
  'iza-hoell': { name: 'Iza Höll', kind: 'person', website: 'https://www.iza-hoell.com/' },
  'raphael-winterbloom': { name: 'Raphael Winterbloom', kind: 'person' },
  'jonathan-robinson': { name: 'Jonathan Robinson', kind: 'person' },
  'hosso-dangaa-khosbayar': { name: 'Hosso Dangaa Khosbayar', kind: 'person' },
  transmongolia: { name: 'Transmongolia', kind: 'ensemble' },
  'sandra-caqueo': { name: 'Sandra Caqueo', kind: 'person' },
  'dira-sugandi': { name: 'Dira Sugandi', kind: 'person' },
  'dwiki-dharmawan': { name: 'Dwiki Dharmawan', kind: 'person', website: 'https://dwikidharmawan.id/' },
  'tamara-soldan': { name: 'Tamara Soldan', kind: 'person', website: 'https://www.tamarasoldan.com/' },
  'isabela-santos': { name: 'Isabela Santos', kind: 'person' },
} as const satisfies Record<string, Person>;

export type PersonId = keyof typeof people;
