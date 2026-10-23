/**
 * Album covers and their rights gates (CLAUDE.md §9). Final JPEG masters (Robert, 24.10.2026):
 * Vol. 1 1468 px, Vol. 2 2400 px, sRGB, no metadata. Astro derives AVIF/WebP/JPEG sizes at build.
 */
import type { ImageMetadata } from 'astro';
import type { Album } from '../data/albums';
import { isCleared, type RightsKey } from '../data/site';
import vol1Cover from '../assets/covers/vol-1-cover.jpg';
import vol2Cover from '../assets/covers/vol-2-cover.jpg';

const covers: Record<Album['id'], { image: ImageMetadata; gate: RightsKey }> = {
  'vol-1': { image: vol1Cover, gate: 'vol1CoverCleared' },
  'vol-2': { image: vol2Cover, gate: 'vol2CoverCleared' },
};

/** The cover image if it may be shown in this build, otherwise null (→ typographic placeholder). */
export function clearedCover(album: Album): ImageMetadata | null {
  const { image, gate } = covers[album.id];
  return isCleared(gate) ? image : null;
}
