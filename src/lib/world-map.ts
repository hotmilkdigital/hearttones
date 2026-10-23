/**
 * Build-time world map (CLAUDE.md §3, §8.5): Natural Earth 1:110m land from world-atlas,
 * Equal Earth projection, rendered to a static SVG path. Nothing here runs in the browser.
 * Antarctica is left out so the inhabited world fills the frame.
 */
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature, merge } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import world from 'world-atlas/countries-110m.json';

const ANTARCTICA = '010';

export const MAP_WIDTH = 1000;

const topology = world as unknown as Topology<{ countries: GeometryCollection }>;
const inhabited = topology.objects.countries.geometries.filter((g) => g.id !== ANTARCTICA);
const land = merge(topology, inhabited as Parameters<typeof merge>[1]);
const countriesFc = feature(topology, {
  type: 'GeometryCollection',
  geometries: inhabited,
}) as FeatureCollection<Geometry>;

const projection = geoEqualEarth().fitWidth(MAP_WIDTH, countriesFc);
const path = geoPath(projection).digits(1);

const [[, top], [, bottom]] = path.bounds(countriesFc);
// Small breathing room above and below the land.
const PAD = 12;
projection.translate([projection.translate()[0], projection.translate()[1] - top + PAD]);

export const MAP_HEIGHT = Math.round(bottom - top + PAD * 2);

/** One path for all land, no borders – an illustration, not a political map. */
export const landPath: string = path(land) ?? '';

/** Outline of single countries by ISO 3166-1 numeric id (for highlighting). */
export function countryPath(isoNumeric: string): string {
  const f = (countriesFc.features as Feature<Geometry>[]).find((c) => String(c.id) === isoNumeric);
  return f ? (path(f) ?? '') : '';
}

/** Project a lon/lat pair to SVG coordinates, rounded to 0.1. */
export function project(lon: number, lat: number): [number, number] {
  const p = projection([lon, lat]);
  if (!p) throw new Error(`Cannot project ${lon},${lat}`);
  return [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10];
}
