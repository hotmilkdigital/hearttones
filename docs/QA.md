# QA – hearttones.net (Entwurf, Stand 24.10.2026)

Für Robert. Ergebnis des QA-Durchgangs nach CLAUDE.md §8.7 und §13. Wiederholen mit den Befehlen am Ende.

## 1. Build

`npm run build` (check:data → astro check → astro build): **0 Fehler, 0 Warnungen, 0 Hinweise**. Datencheck: 26 Lieder · 24 Länder · 46 Musiker:innen.

Gebaute Seiten (10): `/`, `/musik/lullabies-vol-1/`, `/musik/lullabies-vol-2/`, `/musik/berlin-peace-collective/`, `/die-reise/`, `/philipp-von-rothkirch/`, `/impressum/`, `/datenschutz/`, `/widerruf/`, `/404`. Noch nicht gebaut (Layout-Schritt P3): Header, Footer, `/musik/`, `/kuenstlerinnen/`, `/produktion/`, `/presse/`, `/kontakt/`.

## 2. SEO / GEO (§8.7)

`npm run qa:dist` prüft jede gebaute Seite – alle bestanden:

| Prüfung | Ergebnis |
|---|---|
| Eindeutiger `<title>` und Meta-Description je Seite | ✅ (Description 50–170 Zeichen, Titel ≤ 70) |
| Canonical (außer 404) | ✅ |
| `lang` auf `<html>` | ✅ `de` |
| Genau ein `<h1>` je Seite, `alt` an jedem `<img>` | ✅ |
| Interne Links und Anker (seit 25.10.2026) | ✅ Jeder Link führt auf eine gebaute Seite; jedes `#fragment` (gleiche oder andere Seite) und jede `aria-labelledby`/`-controls`/`-describedby`-Referenz trifft eine vorhandene ID; IDs je Seite eindeutig, klein, ASCII (`src/data/anchors.ts`) |
| Open Graph + Twitter Card, `og:image` vorhanden | ✅ Standardbild 1200×630 aus dem Hero; Albumseiten nutzen das Cover, sobald es freigegeben ist |
| JSON-LD | ✅ `WebSite`, `Person`, `MusicGroup` (Heart Tones), `Organization` (Heart Tones Records, LC-27925) auf allen Seiten; `MusicAlbum` mit 13 `MusicRecording` (Name, Position, ISO-Dauer, Mitwirkende) auf Vol. 1/Vol. 2 |
| `hreflang` | Vorbereitet, aktiv sobald `enPublished = true` in `src/data/routes.ts` |
| `sitemap-index.xml` | ✅ 9 URLs, 404 ausgeschlossen |
| `robots.txt` | Staging: `Disallow: /`. Produktion: alles erlaubt (auch KI-Crawler) + Sitemap |
| Staging `noindex` | ✅ Meta-Tag; `X-Robots-Tag` setzt der Server (Coolify) |
| Rechte-Schalter in Produktion (`PUBLIC_INDEXABLE=true`) | ✅ Cover als Typo-Platzhalter, Player „Hörproben folgen in Kürze", kein `noindex`, robots.txt offen |

**Noch manuell:** JSON-LD einmal im [Schema Markup Validator](https://validator.schema.org/) und im Rich-Results-Test prüfen, sobald Staging online ist (lokal nicht erreichbar).

## 3. Lighthouse 12.8 (Edge headless, lokal über `astro preview`)

| Seite | Build | Gerät | Performance | Barrierefreiheit | Best Practices | SEO | LCP |
|---|---|---|---|---|---|---|---|
| Start | Staging | Mobil | 100 | 100 | 100 | 69¹ | 1,7 s |
| Start | Staging | Desktop | 100 | 100 | 100 | 69¹ | 0,4 s |
| Vol. 2 | Staging | Mobil | 92 | 100 | 100 | 69¹ | 3,2 s |
| Vol. 2 | Staging | Desktop | 100 | 100 | 100 | 69¹ | 0,6 s |
| Start | Produktion | Mobil | 100 | 100 | 100 | **100** | 1,7 s |
| Start | Produktion | Desktop | 100 | 100 | 100 | **100** | 0,4 s |
| Vol. 2 | Produktion | Mobil | 94 | 100 | 100 | **100** | 2,7 s |
| Vol. 2 | Produktion | Desktop | 100 | 100 | 100 | **100** | 0,5 s |

¹ Einziger SEO-Befund auf Staging: `is-crawlable` – gewollt (`noindex`).

Im QA-Durchgang behoben: CSS wird in jede Seite eingebettet (keine render-blockierenden Stylesheets; vorher Mobil 87 auf Vol. 2), Literata (latin) wird vorgeladen, Favicon ergänzt (404 in der Konsole), Cover mit 1,5×-Zwischengröße und `fetchpriority="high"`.

**Offen (Entscheidung Robert):** LCP auf Vol. 2 mobil ist die H1 und wartet auf Literata. Die Literata-Dateien mit optischer Größe (`opsz`) sind rund doppelt so groß wie die reine Gewichtsachse (latin 110 KB statt 52 KB; mit latin-ext und kyrillisch ~280 KB statt ~133 KB). Umstieg würde LCP spürbar senken, Überschriften sähen aber etwas kräftiger aus als im Artboard.

## 4. Kontrast

Alle 38 verwendeten Farbpaare erfüllen WCAG 2.2 AA → [contrast.md](contrast.md). Knappste Paare: Creme auf Taupe 4,75:1 (Hero-Text), Creme-Ring auf Globe-Blau 3,29:1 (Kartenmarker).

## 5. Platzhalter

22 verschiedene `[PLATZHALTER]` an 39 Stellen → [platzhalter.md](platzhalter.md). Vor dem Livegang muss die Liste leer sein. Dazu gehören auch: `jobTitle` im Person-Schema (alle Seiten) und die Freigabe des OG-Bilds (`ogDefaultApproved` in `src/data/site.ts`).

## 6. Bekannte Lücken außerhalb dieses Durchgangs

- Header/Navigation, Footer und die Seiten Musik, Künstler:innen, Produktion, Presse, Kontakt (P3) – Links dorthin laufen bis dahin auf die 404.
- Homepage-Abschnitte nach dem Player (Alben, Neue Musik, Reise-Teaser, Geschichte, Produktion, Presse; P6).
- Web-Audio: ffmpeg fehlt noch; Bitrate offen.
- Tastaturtest und 390/1440-Screenshots wurden je Seite beim Bau gemacht; nach P3 einmal komplett wiederholen.

## 7. Nach dem Deploy auf Staging (manuell)

- **404-Status:** Eine fehlende URL muss HTTP-Status **404** liefern, nicht 200 (sonst indexieren Suchmaschinen leere Seiten als „Soft 404“). Prüfen für eine DE- und eine EN-Adresse, z. B.:
  ```
  curl -s -o /dev/null -w "%{http_code}\n" -u <user>:<passwort> https://<staging>/gibt-es-nicht/
  curl -s -o /dev/null -w "%{http_code}\n" -u <user>:<passwort> https://<staging>/en/does-not-exist/
  ```
  Beide müssen `404` ausgeben und die zweisprachige Seite aus `dist/404.html` zeigen. Lokal (`astro preview`) geprüft am 25.10.2026: beide 404.

## Befehle

```
npm run build                  # Daten, Typen, Build
npm run qa:dist -- --write     # SEO-Checks + docs/platzhalter.md
npm run qa:contrast            # docs/contrast.md
```

Lighthouse lief außerhalb des Repos (Scratchpad, `lighthouse@12` + Edge); für Staging die Online-Version von PageSpeed Insights nutzen.
