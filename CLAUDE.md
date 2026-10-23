# Heart Tones – hearttones.net · Build rules for Claude Code

Client: Philipp von Rothkirch (sole owner of the brand "Heart Tones" and the label "Heart Tones Records").
Agency: Hot Milk Digital (Robert Cummings). Robert builds and maintains the site; Philipp approves content.
Repo root: `D:\HOT MILK DIGITAL\CLIENTS\Heart Tones\04_Website` · GitHub: `hotmilkstudio/hearttones` (private, https://github.com/hotmilkstudio/hearttones).
Status: first draft build, started 23.10.2026.

Read this file completely at the start of every session. **§11 Decisions overrides everything in `docs/`, `../01_Brief/` and `../03_Design/`.** If a request from Robert conflicts with this file, say so and ask before building.

---

## 1. What the site is for

A bilingual (DE first, EN later) home for Philipp's lullaby project "Lullabies From Around The World" (Vol. 1, 2011; Vol. 2, 2023), his upcoming singles as "Berlin Peace Collective", and his production services in partnership with Hot Milk Studio.

Priorities (Philipp's order): 1. visibility of the lullaby project and new releases, 2. production enquiries, 3. concerts/dates, 4. press.

Audience: parents, families, educators, world-music listeners; musicians/singers looking for a producer. Tone: matter-of-fact to warm. German uses **Sie** on all pages (mixed audience; parents are the main group).

## 2. Sources in this folder tree

| Path | What it is | Use |
|---|---|---|
| `../01_Brief/00_Projektstatus.md` | Master status: decisions, rights checklist, open points | Background; §11 here wins |
| `../01_Brief/02_CD-Credits-Vol1-Vol2.md` | Full tracklists, credits, countries, singles credits | Single source for `src/data/albums.ts` and `src/data/singles.ts` |
| `../01_Brief/05_Ueber-Philipp_Seitenplan.md` | Plan and draft text for the "Über Philipp" page, reference videos | Page structure, `ConsentVideo` |
| `../01_Brief/07_Presse-Rezensionen.md` | Two press reviews, approved short quotes | Press page, Vol. 1 page |
| `../03_Design/Startseite-Artboard_v6.dc.html` | Approved desktop homepage artboard (Claude Design export) | **Reference** for layout, order and German copy of the homepage. Not code to copy (see §6.8) |
| `../03_Design/hero-globus.svg` | Approved hero illustration (globe as night light) | Use as-is in the hero |
| `../03_Design/reise-weltkarte-platzhalter.svg` | Rough map placeholder from the artboard | Replace with the generated map (§8.5) |
| `../02_Assets/` | Originals (covers, logos, photos, funding logos, audio later) | Copy only what is used into `src/assets/` (§7) |

## 3. Stack

- **Astro**, current stable version, static output (`output: 'static'`), TypeScript strict. No UI framework; plain `.astro` components plus small vanilla `<script>` islands where needed (audio player, menu, consent video, map tooltips).
- Styling: one `src/styles/global.css` with design tokens as CSS custom properties, plus scoped component styles. No Tailwind.
- Fonts self-hosted via Fontsource: `@fontsource-variable/literata`, `@fontsource-variable/nunito` (latin + latin-ext + cyrillic subsets). **No Google Fonts requests.** Quicksand only inside the logo (outlined SVG, or a tiny self-hosted subset until Robert's SVGs arrive).
- Images: `astro:assets` (`<Image>`/`<Picture>`), AVIF + WebP, explicit `width`/`height`. Hero illustration is inline SVG (no LCP image).
- Map: generated **at build time** from Natural Earth data (`world-atlas` TopoJSON + `topojson-client` + `d3-geo`) into static SVG. No map library or tiles at runtime.
- Integrations: `@astrojs/sitemap`. Nothing else without asking.
- Dev server: port **4323** with `strictPort: true` (4321/4322 are used by other client projects). One VS Code window per project.
- Node LTS. Windows host: use cross-platform npm scripts (no bash-only syntax).

## 4. Information architecture and URLs

DE at the root, EN under `/en/`. Astro i18n routing: `defaultLocale: 'de'`, `locales: ['de','en']`, `prefixDefaultLocale: false`. Slugs are **provisional** until the keyword check (`03_Sitemap-und-Keywords.md`, not written yet); keep them in one place (`src/data/routes.ts`) so they can change without hunting.

| Page | DE | EN (later) |
|---|---|---|
| Start | `/` | `/en/` |
| Musik (hub) | `/musik/` | `/en/music/` |
| Vol. 1 | `/musik/lullabies-vol-1/` | `/en/music/lullabies-vol-1/` |
| Vol. 2 | `/musik/lullabies-vol-2/` | `/en/music/lullabies-vol-2/` |
| Singles (Berlin Peace Collective) | `/musik/berlin-peace-collective/` | `/en/music/berlin-peace-collective/` |
| Die Reise (map) | `/die-reise/` | `/en/the-journey/` |
| Künstler:innen | `/kuenstlerinnen/` | `/en/artists/` |
| Über Philipp | `/philipp-von-rothkirch/` | `/en/philipp-von-rothkirch/` |
| Produktion | `/produktion/` | `/en/production/` |
| Presse | `/presse/` | `/en/press/` |
| Kontakt | `/kontakt/` | `/en/contact/` |
| Impressum | `/impressum/` | `/en/legal-notice/` |
| Datenschutz | `/datenschutz/` | `/en/privacy/` |
| Widerruf (Vol. 2 order, not in nav) | `/widerruf/` | `/en/withdrawal/` |
| 404 | `/404` | – |

Main navigation: **Musik · Die Reise · Produktion · Über Philipp · Kontakt** + language switch DE/EN. Künstler:innen and Presse live under Musik and in the footer, not top level. Trailing slashes on.

**EN workflow:** German-first. Build all DE pages, Philipp approves, then translate. Until then: i18n config, `hreflang` plumbing and the language switch exist, but the switch is hidden (or links to `/en/` "coming soon") – never machine-translate copy without Robert asking.

## 5. Content rules (hard)

1. **No invented facts.** Anything missing is a visible placeholder: `[PLATZHALTER: what is missing]`, styled so it stands out on staging. Grep for `PLATZHALTER` before every release.
2. Brand spelling **"Heart Tones"** (two words, capitalised) in copy. Label: "Heart Tones Records". The heart glyph is never used as a character in text or alt text.
3. Name: **"Philipp von Rothkirch"** in Impressum, schema, titles/meta; **"Philipp v. Rothkirch"** in running text.
4. Numbers: **26 Lieder · 24 Länder · 46 Musiker:innen** (derivation in `02_CD-Credits`, section "Abgeleitete Zahlen"). Don't recount differently.
5. Song titles: wording and diacritics as printed on the CD back (exception: correct native spelling where the CD simplified it – „Kołysanka dla słoneczka", „Бүүвэйн дуу", decided 24.10.2026), but **in proper capitalisation, not all lower case** (decided 23.10.2026): each title follows its language's convention (English titles in title case, e.g. "Sleep Little Baby"; others capitalise the first word and proper nouns, e.g. "Sov sødt barnlille", "Viele tausend Sternlein"). The exact forms live in `src/data/albums.ts` and are reviewed by Robert. Where spellings differ between tracklist and booklet, the **back-cover tracklist wins** (e.g. "Layla tov", "Ajo nènè – nènè tuuti"). Artist name **"Aly Keita"** everywhere (also in the line-up of "Dream of Mikael"). Cyrillic title "Бүүвэйн дуу" must render (Literata/Nunito cyrillic + cyrillic-ext for Ү).
6. **No lyrics online.** Only titles, credits, countries, durations.
7. Credits: Robert Cummings is **co-producer of Vol. 1 and Vol. 2** plus recording, mixing, mastering; "sov sødt barnlille" (Vol. 1) was **recorded by Peter Sund ("the farm")**. Studio wording: both albums were **almost entirely recorded** at Hot Milk Studio Berlin (exceptions as credited) and **entirely mixed and mastered** there. Never claim they were recorded there in full. Singles: Robert = production/mix/master (World Peace Now!), re-mix/master (Bombs Away!).
8. Singles appear **only as "Berlin Peace Collective"**, separate from the lullabies, marked **"Demnächst"**, without player or release date until released. **Never mention the Sophie-Scholl-Schule, its big band, the arrangement by Semjon Barlas or any school performance.** The Nina Hagen "Peace Charity Gala" story is not published until Robert supplies proof.
9. **Do not link worldpeacenow.global.**
10. Press: only the two approved short quotes from `07_Presse-Rezensionen.md`, verbatim, with source. Source is `[PLATZHALTER: Magazin, Ausgabe, Jahr]` until confirmed. Never quote the "Sitars" sentence or the sentence about the three-year-old son. No images of the magazine pages. The artboard's press strip (MDR Figaro · Eltern · Sein · Himbeere · FolkWorld) may be shown as plain text (decided 23.10.2026).
11. Photo credit "Foto: Benedikt Stehle" under the family photo (and in the Impressum image credits).
12. Contact: `info@hearttones.net`, phone `+49 176 61233929` (display "0176 61233929"). No opening hours; use "Erstgespräch nach Vereinbarung". Address (Impressum only, not in header/footer): Obentrautstraße 51, 10963 Berlin.
13. Hot Milk Studio may be named and linked (https://www.hotmilkstudio.de/) as production partner. Never present Robert/Hot Milk as owner of Heart Tones, and never show Hot Milk Studio's address as Philipp's.
14. Payment details (bank account, PayPal address) **never** on the site – they go in the email order confirmation only.
15. German typography: „…" quotes, en dash with spaces – , non-breaking space in "Vol. 1", "§ 19", numbers + units. Gender: Doppelpunkt (Musiker:innen).

## 6. Design system

Source: approved artboard + the design system doc in the chat project (summarised here; this section is binding).

### 6.1 Colour tokens

| Token | Hex | Role |
|---|---|---|
| `--cream` | #F6F0E8 | Main page background |
| `--sand` | #D9CCBD | Cards, dividers, light section tint |
| `--taupe` | #7E6650 | Brand bands (hero, footer) |
| `--cocoa` | #2E2420 | Body text; dark "night" sections |
| `--heart-red` | #9A0000 | Buttons, links, the one strong accent on light |
| `--heart-light` | #D94A4A | Glyph and accents on cocoa/taupe; never body text |
| `--globe-blue` | #6A87A8 | Seas on the map, cool accent |
| `--globe-ochre` | #D6A462 | Continents, map markers, progress bars on dark |
| `--cocoa-2` | #3A2E29 | Raised surfaces in night sections (player bar) |
| `--cocoa-line` | #5A4A40 | Borders in night sections |
| `--cream-muted` | #E2D6C6 | Secondary text on cocoa |

Additional tokens taken from the artboard (added 23.10.2026; contrast to be verified in the QA pass):

| Token | Hex | Role |
|---|---|---|
| `--paper` | #FFFFFF | White cards/sections on light (album cards, Produktion) |
| `--heart-red-dark` | #6E0000 | Hover state of links/buttons on light |
| `--ink-muted` | #5E4E42 | Secondary text on cream/paper (meta lines, captions) |
| `--ink-muted-sand` | #4A3C33 | Secondary text on sand |
| `--ink-faint` | #6B5A4C | Inactive items on cream (e.g. language switch) |
| `--cream-faint` | #CDBFAE | Tertiary text on cocoa (track numbers, durations) |
| `--cocoa-outline` | #8A786A | Inactive tab borders, dashed "Erscheint demnächst" border on cocoa |
| `--taupe-line` | #9C8571 | Dividers on taupe (footer) |

"Demnächst" pills: **cocoa text on globe-ochre** (≈6.7:1), not cocoa on heart-light (≈3.6:1, fails AA).

Rules: body text only cocoa on cream/sand or cream on cocoa/taupe. Primary button on light: heart-red fill, white text. On cocoa/taupe: cream fill with cocoa text, or cream outline. Never white on heart-light (≈4.2:1). No soft pink anywhere. Hex values only in `global.css`, never in components.

**Day/night rhythm:** light cream/sand sections alternate with cocoa "night" bands (player, Neue Musik, selected works). Hero and footer are taupe.

### 6.2 Type

- Headings/titles: **Literata** 600; body/UI: **Nunito** 400/600/700.
- Body 18px / 1.65. H1 `clamp(40px, 5vw, 64px)`, line-height 1.08, tracking −0.015em. H2 `clamp(32px, 3.6vw, 44px)`.
- Eyebrow: Nunito 700, 15px, uppercase, letter-spacing 0.08em.
- Track metadata (composer, country, line-up): Nunito 14–15px.
- Stats line "26 Lieder · 24 Länder · 46 Musiker:innen" in Literata.

### 6.3 Shape and layout

Cards radius 12px, buttons 8px, pills 999px. Covers always square with a soft shadow. Content max-width 1200px, side padding 24px (16px on phones). Section padding ~88px desktop, ~56px mobile. Touch targets ≥ 44px.

### 6.4 Logo

Wordmark "heart" + glyph (heart with note stem) + "tones". Variants: on cream (wordmark cocoa, glyph heart-red); on cocoa (wordmark cream, glyph heart-light); on taupe (wordmark all cream, glyph heart-light). Robert will deliver final SVGs (Quicksand and Nunito versions). Until then build `Logo.astro` from the artboard's inline glyph SVG + text, with a `variant` prop, so swapping in the SVGs touches one file. PNG references are in `../02_Assets/logos/`.

### 6.5 Hero

Taupe band. Left: "Demnächst" pill linking to the singles teaser, eyebrow "Lullabies from around the world", H1 „Schlaflieder aus aller Welt", intro, stats line, buttons „Reinhören" (→ player) and „Die Reise entdecken" (→ map). Right: **the original globe illustration** (`hero-globus.svg`, decided 23.10.2026). The globe may get a very slow, subtle glow pulse – only with `prefers-reduced-motion: no-preference`, and only if Robert asks.

### 6.6 Motion and effects

Philipp likes it pragmatic: clear, simple, few effects. No parallax, no scroll-jacking, no autoplay. Respect `prefers-reduced-motion`.

### 6.7 Accessibility (WCAG 2.2 AA)

Contrast AA for every text/background pair actually used (compute, don't eyeball). Visible focus ring ≥ 3:1 on light and dark sections. Skip link. Real `<button>`/`<a>`. Keyboard-operable player, menu, map. Alt texts in German describing content and context. `lang` attributes on foreign-language song titles where known is nice-to-have, not required.

### 6.8 Using the artboard

The artboard is a Claude Design file with inline styles and `{{…}}` template bindings. Rebuild it with project tokens and components. Never copy its Google Fonts `<link>`, inline styles, `/_blob/…` image URLs or the `<x-dc>`/`<sc-for>` markup. German copy from the artboard is approved draft copy and may be used verbatim.

## 7. Assets

- Originals stay in `../02_Assets/`. Copy only used files into `src/assets/<folder>/` with kebab-case names. Check file size after copying.
- Current files are **interim**: covers are 1200px WebP (Robert will deliver JPEG 95 masters: Vol. 1 ~1470px, Vol. 2 ~2400px); family photo 1280×1599 WebP; piano photo 1600×1200 WebP; funding logos as raster (vector versions to be fetched from Initiative Musik). Build so masters can be swapped by replacing the file.
- `vol-2-kinder-ohne-schrift.jpg`: Vol. 2 cover photo with the logo/lettering retouched out (23.10.). Not for the hero. Possible later use as a wide section image (e.g. Vol. 2 page). **Same consent condition as the Vol. 2 cover (§9).**
- Audio: all 26 MP3s are delivered in `../02_Assets/audio/` (192 kbps, ~111 MB). Copy to `public/audio/vol-1/01-dodo.mp3` etc. (kebab-case, ASCII) and **commit them to git** (decided 23.10.2026). **Track durations come from the MP3s, not the booklets** (e.g. Vol. 1 "Sov sødt barnlille" 3:43, "Dream of Mikael" 4:20, "Dans les étoiles" 2:28); album totals are the sum of the MP3 durations.
- Strip metadata (EXIF/GPS) from any new image before committing.

## 8. Components and features

### 8.1 Layout
`BaseLayout.astro` (head/meta/OG/hreflang/schema slot, skip link), `Header.astro` (logo, nav, mobile menu as disclosure button), `Footer.astro` (taupe: contact, label line "Heart Tones Records · LC-27925", links Künstler:innen, Presse, Impressum, Datenschutz, language, small funding note for Vol. 2 if Robert confirms), `Section.astro` (`tone="light|sand|night|taupe"`).

### 8.2 Audio player (`AudioPlayer.astro` + small script)
Self-hosted MP3s, no third-party embed, no consent needed (no data to third parties). Album switch Vol. 1 / Vol. 2 as tabs; track list with title, country, duration, line-up; one shared `<audio>` element; play/pause, progress, time, next track auto-advance; keyboard accessible; `preload="none"`. Near the Vol. 2 list, always visible: links to Asphalt Tango (https://asphalt-tango.de/) and the Bandcamp album page (https://asphalttango.bandcamp.com/album/heart-tones-lullabies-from-around-the-world-vol-2) – **condition of the streaming permission**. Gated by `rights.audioCleared` on production (§9).

### 8.3 Album pages
Cover, facts (label, catalogue no., LC, year), tracklist with full credits, people with verified links (links only once Philipp's research table is back – until then names without links), Vol. 1: "vergriffen" + streaming links Spotify (https://open.spotify.com/album/7r0XB0MCeqNUErFdQELJ1F) and Deezer (https://link.deezer.com/s/34L7axZdYtt7kwXeT6ibH) as plain links, no embeds; no other services unless supplied; Vol. 2: order block (§10) + Bandcamp + Asphalt Tango + **funding block** (also on the homepage Vol. 2 card, as in the artboard) (Förderhinweis DE/EN verbatim from §11, Initiative Musik logo + NEUSTART KULTUR logo, on a light background).

### 8.4 Singles page
"Berlin Peace Collective" – World Peace Now! and Bombs Away! as cards with credits (§5.8 restrictions), dashed "Erscheint demnächst" state, no player, no artwork until supplied.

### 8.5 Die Reise (map)
Static SVG world map generated at build time (equal-earth or natural-earth projection), seas globe-blue, land globe-ochre on cocoa or blue ground per artboard. One marker per country (24), coloured heart-red with cream ring. Each marker is a focusable link/button showing country, song title(s), album and performers, and linking to the track in the player/album page. Below the map an accessible list grouped by continent that contains the same information (the map is an enhancement; the list is the content). Countries with two-country credits (Russland/Georgien, Italien/Deutschland, Brasilien/Deutschland): marker at the first-named country, mention the second in the text. Data in `src/data/countries.ts` (ISO code, DE/EN name, lat/lon, track refs).

### 8.6 ConsentVideo
Per `05_Ueber-Philipp_Seitenplan.md`: own poster image (never a YouTube thumbnail), button "Video laden" with privacy note, then `youtube-nocookie.com` iframe; text link "Auf YouTube ansehen" works without JS. Used on Über Philipp (two reference videos) and later for singles.

### 8.7 SEO / GEO
Unique title + description per page; canonical; `hreflang` (de, en, x-default) once EN exists; OG/Twitter tags with a default OG image (1200×630, generated from the hero; `[PLATZHALTER]` until approved); `sitemap-index.xml`; `robots.txt` (AI crawlers allowed unless Robert says otherwise). JSON-LD: `WebSite`, `Person` (Philipp von Rothkirch, jobTitle `[PLATZHALTER]`, sameAs later incl. GBP), `MusicGroup` "Heart Tones", `MusicAlbum` ×2 with `MusicRecording` tracks (name, duration ISO 8601, byArtist), `Organization`/`MusicLabel`-like for Heart Tones Records where valid. Validate with the Schema validator. Staging outputs `noindex` (see §10).

## 9. Rights gates (must stay in code until cleared)

`src/data/site.ts` holds `rights = { vol2CoverCleared: false, audioCleared: false, vol1CoverCleared: false }`.

- On **staging** (`PUBLIC_INDEXABLE` unset) everything renders so Philipp can review.
- On **production** (`PUBLIC_INDEXABLE=true`) an uncleared item renders its fallback: typographic placeholder cover (album title in Literata on sand), player with disabled play buttons and the note "Hörproben folgen in Kürze".
- Robert flips a flag only after the consent/licence is on file (Vol. 2 cover: consent of the Kita parents; Vol. 1 cover: Andre Wagner, Sylvia Puta, Dalal; audio: GEMA question resolved).

## 10. Environments, legal, privacy

- GitHub `hotmilkstudio/hearttones` (private, HTTPS remote), deploy via Coolify on Hetzner. Staging: password-protected, `noindex` meta + `X-Robots-Tag`, `PUBLIC_INDEXABLE` unset. Production: `PUBLIC_INDEXABLE=true`. Domain/DNS move is still open – do not touch DNS.
- **No cookies, no analytics, no external requests** in v1 → no consent banner. YouTube only via ConsentVideo. If Robert later adds Plausible, it goes through the proxy pattern used on hotmilkdigital.de.
- **Kontakt:** mailto and tel links only, no form in v1.
- **Vol. 2 order:** order by email (prefilled mailto subject „Bestellung Heart Tones Vol. 2"), price **15 € pro CD**, shipping **3,50 € Deutschland / 7 € international**, payment by bank transfer or PayPal (details in the confirmation email only), note „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet." Widerrufsbelehrung + Muster-Widerrufsformular page or section: `[PLATZHALTER]` until Robert supplies the text.
- Impressum per § 5 DDG, Datenschutz per DSGVO (hosting at Hetzner, server logs, self-hosted fonts, YouTube two-click, email contact). Texts: `[PLATZHALTER]` scaffolds; Robert supplies final wording.

## 11. Decisions (override everything else)

| Date | Decision |
|---|---|
| 14.10.2026 | Static Astro site, built fully (no interim version); maintained by Robert. |
| 14.10.2026 | Fonts Literata + Nunito; Quicksand only in logo; no soft pink; day/night rhythm; nav Musik · Die Reise · Produktion · Über Philipp · Kontakt. |
| 18.10.2026 | Singles only as "Berlin Peace Collective", unreleased → "Demnächst", no player. Title spelling „Bombs Away!". No school/big band/Semjon Barlas mention. |
| 18.10.2026 | Self-hosted audio for all Vol. 1 + Vol. 2 tracks; Asphalt Tango permits streaming Vol. 2 on condition of visible links to asphalt-tango.de and the Bandcamp album page. |
| 18.10.2026 | Förderhinweis DE: „Gefördert durch die Initiative Musik gemeinnützige Projektgesellschaft mbH im Rahmen von Neustart Kultur mit Projektmitteln der Beauftragten der Bundesregierung für Kultur und Medien." EN: "Supported by Initiative Musik gGmbH with project funds from the Federal Government Commissioner for Culture and Media." + both logos, on the Vol. 2 page. Layout must be approved by Initiative Musik before launch. |
| 18.10.2026 | Contact email info@hearttones.net; no opening hours; GBP area "Berlin und Umland", website international. |
| 18.10.2026 | No production offer for school ensembles. |
| 23.10.2026 | Hero keeps the **original globe illustration**. Alternatives (moon cradle, mobile, cover photo) rejected. |
| 23.10.2026 | Vol. 2 cover photo without lettering is an asset for later use, not the hero; same consent condition as the cover. |
| 23.10.2026 | Defaults for the first draft (Robert may overrule): Sie-form; no contact form; no analytics; slugs provisional; EN after DE approval. |
| 23.10.2026 | GitHub repo is `hotmilkstudio/hearttones` (not hotmilkdigital). |
| 23.10.2026 | Track durations and album totals from the MP3s; booklet durations ignored. MP3s committed to git. |
| 23.10.2026 | Song titles in proper capitalisation per language (§5.5), not all lower case. "Aly Keita" everywhere. |
| 23.10.2026 | Vol. 1 streaming: Spotify and Deezer links (§8.3); "CD vergriffen – als Stream erhältlich" is allowed. |
| 23.10.2026 | Studio wording: almost entirely recorded, entirely mixed and mastered at Hot Milk Studio Berlin (§5.7). |
| 23.10.2026 | "Demnächst" pills cocoa on globe-ochre; artboard colours added as tokens (§6.1). |
| 23.10.2026 | Press strip and the two approved quotes shown; funding block on homepage Vol. 2 card and Vol. 2 page, no footer note. Initiative Musik reviews the staging site. |
| 24.10.2026 | Correct native spelling for „Kołysanka dla słoneczka" and „Бүүвэйн дуу" (§5.5). Kgomotso Tsatsi = vocals. „Bishek jyri": backing vocals and arrangement for all three. Serkan Kaynarcali = Serkan Ky (artist name since Vol. 2; Vol. 1 credit as printed). Brune = Ruby Brune. Russland marker near Kazan. German role labels approved. |
| 24.10.2026 | Die Reise intro corrected (artboard said „Jedes Lied kommt aus einem anderen Land"): „Die Lieder kommen aus 24 Ländern – gesungen und gespielt von Menschen, die sie von dort mitgebracht haben." Use the same wording in the homepage teaser. |
| 24.10.2026 | Über Philipp: no street name for Philipp („wohnt in Berlin-Kreuzberg"). „Escape from Baltimore" (Fanfare Ciocărlia, 2021): composed by Philipp von Rothkirch, Benedikt Stehle & Henry Ernst, produced by Henry Ernst, mixed and mastered at Hot Milk Studio. „This Is My Body" (Ingrid Arthur, 2014). Artist link https://www.ingridarthur.com/. Piano photo: „Foto: Robert Cummings" (caption and Impressum). |
| 24.10.2026 | Datenschutz names every domain contacted after „Video laden" (youtube-nocookie.com, googlevideo.com, ytimg.com, google.com, googleapis.com, gstatic.com – `src/data/privacy.ts`); re-check when the embed changes. Legal wording still from Robert. |
| 24.10.2026 | SEO/QA: CSS inlined per page (`build.inlineStylesheets: 'always'`), Literata latin preloaded, interim favicon from the artboard glyph, robots.txt `Disallow: /` on staging. Default OG image `src/assets/og/og-default.png` generated from the hero – `[PLATZHALTER]` until approved (`ogDefaultApproved`). QA reports in `docs/` (`npm run qa:dist`, `npm run qa:contrast`). |
| 24.10.2026 | World Peace Now! line-up confirmed, incl. the „BÄM" drumline members Ramon Buntebart, Leander Winkler, Rafael Nussbaumer. All three are adults (Robert) – names may be published; no guardian consent needed. |

## 12. Open items (build around them with placeholders)

- Portraits of Philipp (shoot pending) → placeholder blocks.
- Über Philipp: self-description (B10), perspective of the "Wie wir uns kennenlernten" text, end of Philipp's Vol. 1 story.
- Musicians' current links/photos (Philipp's research table).
- Press sources (magazine/issue/year).
- Singles artwork, date, distribution.
- Widerrufsbelehrung, Impressum/Datenschutz final texts.
- Logo SVGs; vector funding logos; cover masters.
- Rights: Vol. 1 and Vol. 2 cover consents, GEMA question for audio, Initiative Musik layout approval.
- Domain/DNS (IONOS vs ALL-INKL) and info@hearttones.net mailbox.

## 13. Working agreement

- One concern per prompt, one commit per concern, clear commit messages. Push after a batch.
- Ask (multiple choice is fine) when the brief is silent or conflicts with this file.
- Before saying a step is done: `npm run build` passes without warnings, check 390px and 1440px in the browser, keyboard pass on new interactive parts.
- New decisions get a row in §11 in the same commit.
- Never commit secrets, `.env`, or client personal data beyond what the Impressum requires.
