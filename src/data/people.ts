/**
 * Performers on Vol. 1 and Vol. 2 (persons and ensembles), source: ../01_Brief/02_CD-Credits-Vol1-Vol2.md.
 * One entry per person, so the same musician on both albums counts once (CLAUDE.md §5.4: 46).
 *
 * `printedLink` is what the booklet printed. Most are dead MySpace pages – reference only,
 * never rendered. Verified links come from Philipp's research table (CLAUDE.md §12).
 */

export interface Person {
  name: string;
  kind: 'person' | 'ensemble';
  printedLink?: string;
}

export const people = {
  // Vol. 1
  'rachelle-jeanty': { name: 'Rachelle Jeanty', kind: 'person', printedLink: 'myspace.com/rachellejeanty' },
  'cremildo-de-caifaz': { name: 'Cremildo de Caifaz', kind: 'person' },
  'philipp-v-rothkirch': { name: 'Philipp v. Rothkirch', kind: 'person', printedLink: 'philippvonrothkirch.com' },
  'talia-kliger': { name: 'Talia Kliger', kind: 'person', printedLink: 'myspace.com/taliakliger' },
  'uri-gincel': { name: 'Uri Gincel', kind: 'person', printedLink: 'gincel.com' },
  'gilbert-abdourahmane-diop': { name: 'Gilbert Abdourahmane Diop', kind: 'person', printedLink: 'myspace.com/abdourahmanediop' },
  'djefily-sako': { name: 'Djefily Sako', kind: 'person', printedLink: 'myspace.com/nakadiberlin' },
  'arcadius-didavi': { name: 'Arcadius Didavi', kind: 'person', printedLink: 'myspace.com/arcadiusdidavi' },
  'goekce-sayan': { name: 'Gökce Sayan', kind: 'person', printedLink: 'myspace.com/gokcesayan' },
  // Printed as "Serkan Kaynarcali" on Vol. 1 and "Serkan Ky" on Vol. 2 – same person (confirmed 18.10.2026).
  'serkan-ky': { name: 'Serkan Ky', kind: 'person', printedLink: 'myspace.com/serkanun' },
  'mesut-lekesiz': { name: 'Mesut Lekesiz', kind: 'person', printedLink: 'triomorgenland.com' },
  'eugenia-tapia': { name: 'Eugenia Tapia', kind: 'person', printedLink: 'myspace.com/quenatapia' },
  'rodrigo-santa-maria': { name: 'Rodrigo Santa Maria', kind: 'person', printedLink: 'myspace.com/rodrigosantamt' },
  tutarchela: { name: 'Tutarchela', kind: 'ensemble', printedLink: 'myspace.com/tutarchela' },
  'joergen-dickmeiss': { name: 'Jørgen Dickmeiss', kind: 'person', printedLink: 'svobsk.dk' },
  'maren-hallberg': { name: 'Maren Hallberg', kind: 'person' },
  'peter-sund': { name: 'Peter Sund', kind: 'person', printedLink: 'thefarm-music.com' },
  'aly-keita': { name: 'Aly Keita', kind: 'person', printedLink: 'myspace.com/alykeita' },
  brune: { name: 'Brune', kind: 'person', printedLink: 'myspace.com/lovelybrune' },
  'sabine-v-rothkirch': { name: 'Sabine v. Rothkirch', kind: 'person', printedLink: 'myspace.com/sabinevonrothkirch' },
  'isabelle-klemt': { name: 'Isabelle Klemt', kind: 'person', printedLink: 'andromedameo.com' },
  'kiko-king': { name: 'Kiko King', kind: 'person', printedLink: 'kikoking.bandcamp.com' },
  'christoph-schmitz': { name: 'Christoph Schmitz', kind: 'person', printedLink: 'dohatango.com' },
  'hye-young': { name: 'Hye Young', kind: 'person' },
  'christoph-jung': { name: 'Christoph Jung', kind: 'person', printedLink: 'myspace.com/christophjung' },
  'sarasvati-dasi': { name: 'Sarasvati Dasi', kind: 'person', printedLink: 'kirtaniyas.com' },
  'tribhanga-campling': { name: 'Tribhanga Campling', kind: 'person', printedLink: 'timothycampling.de' },
  // Vol. 2
  'kgomotso-tsatsi': { name: 'Kgomotso Tsatsi', kind: 'person', printedLink: 'kileza.com' },
  'momo-djender': { name: 'Momo Djender', kind: 'person', printedLink: 'momodjender.com' },
  'sepideh-safiaryan': { name: 'Sepideh Safiaryan', kind: 'person', printedLink: 'rumisounds.bandcamp.com' },
  'roksana-vikaluk': { name: 'Roksana Vikaluk', kind: 'person', printedLink: 'roksana.com.pl' },
  'julia-messenger': { name: 'Julia Messenger', kind: 'person', printedLink: 'juliamessenger.com' },
  'zulya-nazipovna-kamalova': { name: 'Zulya Nazipovna Kamalova', kind: 'person', printedLink: 'zulya.com' },
  'nino-tsitsishvili': { name: 'Nino Tsitsishvili', kind: 'person' },
  'joseph-jordania': { name: 'Joseph Jordania', kind: 'person' },
  'mal-webb': { name: 'Mal Webb', kind: 'person' },
  'iza-hoell': { name: 'Iza Höll', kind: 'person', printedLink: 'iza-hoell.com' },
  'raphael-winterbloom': { name: 'Raphael Winterbloom', kind: 'person' },
  'jonathan-robinson': { name: 'Jonathan Robinson', kind: 'person' },
  'hosso-dangaa-khosbayar': { name: 'Hosso Dangaa Khosbayar', kind: 'person', printedLink: 'mongoleishop.de/hoso' },
  transmongolia: { name: 'Transmongolia', kind: 'ensemble' },
  'sandra-caqueo': { name: 'Sandra Caqueo', kind: 'person', printedLink: 'rodrigosantamaria.com' },
  'dira-sugandi': { name: 'Dira Sugandi', kind: 'person', printedLink: 'dirasugandi.bandcamp.com' },
  'dwiki-dharmawan': { name: 'Dwiki Dharmawan', kind: 'person' },
  'tamara-soldan': { name: 'Tamara Soldan', kind: 'person', printedLink: 'tamarasoldan.com' },
  'isabela-santos': { name: 'Isabela Santos', kind: 'person' },
} as const satisfies Record<string, Person>;

export type PersonId = keyof typeof people;
