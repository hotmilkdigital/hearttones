/**
 * Facts the Datenschutzerklärung must cover (CLAUDE.md §10). Keep in sync with what the site
 * actually does; Robert supplies the final legal wording.
 */

/**
 * Hosts a browser contacts after the visitor clicks "Video laden" (ConsentVideo), observed in
 * Edge on 24.10.2026 for youtube-nocookie.com embeds. Before the click: none.
 * Subdomains vary (e.g. rr3---sn-….googlevideo.com), so the list names registrable domains.
 */
export const youtubeHosts = [
  { host: 'youtube-nocookie.com', purpose: 'Video-Player (eingebettet)' },
  { host: 'googlevideo.com', purpose: 'Auslieferung der Videodaten' },
  { host: 'ytimg.com', purpose: 'Vorschaubilder und Player-Grafiken' },
  { host: 'google.com', purpose: 'Google-Dienste des Players' },
  { host: 'googleapis.com', purpose: 'Google-Dienste des Players' },
  { host: 'gstatic.com', purpose: 'Statische Dateien und Schriften von Google (u. a. fonts.gstatic.com)' },
] as const;

export const youtubeHostsCheckedOn = '24.10.2026';

/** Sites the visitor can reach by plain links (no data transfer before clicking). */
export const externalLinkTargets = [
  'Spotify',
  'Deezer',
  'Bandcamp',
  'Asphalt Tango Records',
  'YouTube („Auf YouTube ansehen“)',
  'Hot Milk Studio',
  'Websites von Künstler:innen',
] as const;
