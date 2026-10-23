/**
 * JSON-LD (schema.org) for CLAUDE.md §8.7. Every page gets the site graph (WebSite, Person,
 * MusicGroup, record label); album pages add a MusicAlbum with MusicRecording tracks.
 * Only facts from the data files – nothing invented (§5.1). Validate with validator.schema.org.
 */
import { people } from '../data/people';
import { albumDuration, isoDuration, trackAnchor, vol1, vol2, type Album } from '../data/albums';
import { path, type RouteKey } from '../data/routes';
import { site } from '../data/site';

type Node = Record<string, unknown>;

const abs = (p: string) => new URL(p, site.url).href;

export const ids = {
  website: abs('/#website'),
  person: abs('/#philipp-von-rothkirch'),
  group: abs('/#heart-tones'),
  label: abs('/#heart-tones-records'),
  album: (album: Album) => `${abs(albumPath(album))}#album`,
};

export const albumPath = (album: Album) => path((album.id === 'vol-1' ? 'vol1' : 'vol2') as RouteKey);

export function siteGraph(): Node[] {
  return [
    {
      '@type': 'WebSite',
      '@id': ids.website,
      url: abs('/'),
      name: site.brand,
      inLanguage: 'de-DE',
      publisher: { '@id': ids.person },
    },
    {
      '@type': 'Person',
      '@id': ids.person,
      name: site.owner.fullName,
      url: abs(path('about')),
      // Exact job title still to be confirmed by Philipp (§8.7).
      jobTitle: '[PLATZHALTER: jobTitle]',
      description: 'Komponist, Produzent und Musiker in Berlin-Kreuzberg',
      homeLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' } },
      email: `mailto:${site.contact.email}`,
      memberOf: { '@id': ids.group },
    },
    {
      '@type': 'MusicGroup',
      '@id': ids.group,
      name: site.brand,
      url: abs('/'),
      founder: { '@id': ids.person },
      album: [{ '@id': ids.album(vol1) }, { '@id': ids.album(vol2) }],
    },
    {
      '@type': 'Organization',
      '@id': ids.label,
      name: site.label,
      identifier: site.labelCode,
      founder: { '@id': ids.person },
    },
  ];
}

export function albumGraph(album: Album, imageUrl?: string): Node[] {
  const url = abs(albumPath(album));
  const label =
    album.label === site.label
      ? { '@id': ids.label }
      : { '@type': 'Organization', name: album.label, url: album.links.find((l) => l.label.startsWith('Asphalt'))?.href };

  return [
    {
      '@type': 'MusicAlbum',
      '@id': ids.album(album),
      name: `Lullabies From Around The World ${album.shortTitle}`,
      url,
      byArtist: { '@id': ids.group },
      datePublished: album.releaseDate,
      recordLabel: label,
      albumProductionType: 'https://schema.org/StudioAlbum',
      numTracks: album.tracks.length,
      duration: isoDuration(albumDuration(album)),
      ...(imageUrl ? { image: imageUrl } : {}),
      sameAs: album.links.map((l) => l.href),
      track: album.tracks.map((track) => ({
        '@type': 'MusicRecording',
        name: track.title,
        ...(track.titleAlt ? { alternateName: track.titleAlt } : {}),
        position: track.no,
        duration: isoDuration(track.durationSec),
        url: `${url}#${trackAnchor(album, track)}`,
        inAlbum: { '@id': ids.album(album) },
        byArtist: track.lineup.map((p) => {
          const person = people[p.person];
          return {
            '@type': person.kind === 'ensemble' ? 'MusicGroup' : 'Person',
            name: p.creditedAs ?? person.name,
          };
        }),
      })),
    },
  ];
}
