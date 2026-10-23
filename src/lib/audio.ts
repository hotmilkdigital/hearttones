/**
 * Build-time audio availability. A track is playable only if audio is rights-cleared (§9,
 * always true on staging) AND its MP3 exists in public/audio/. Used by the player and by any
 * copy that promises a "Hörprobe".
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { albums, audioSrc, type Album, type Track } from '../data/albums';
import { isCleared } from '../data/site';

export function isPlayable(album: Album, track: Track): boolean {
  return isCleared('audioCleared') && existsSync(join(process.cwd(), 'public', audioSrc(album, track)));
}

/** True when at least one track on the site can be played. */
export function anyAudioPlayable(): boolean {
  return albums.some((album) => album.tracks.some((track) => isPlayable(album, track)));
}
