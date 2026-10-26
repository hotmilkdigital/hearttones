# English version – inventory and plan

Stand: 25.10.2026 · Basis: Commit `6a7e9e4` · Nichts davon ist gebaut. EN folgt erst nach Philipps Freigabe der deutschen Texte (CLAUDE.md §4). Bis dahin bleibt `enPublished = false` und der Sprachumschalter versteckt. **Keine maschinelle Übersetzung**, solange Robert sie nicht anfordert.

Zeilennummern beziehen sich auf den Stand oben und verschieben sich mit jeder Änderung. Prosa-Abschnitte stehen als Zeilenbereich mit den ersten Wörtern, nicht Satz für Satz.

---

## 1. Seiten und geplante EN-Routen

Quelle: `src/data/routes.ts`. Alle 14 Routen haben schon einen `en`-Pfad. Die Slugs sind vorläufig, bis der Keyword-Check durch ist.

| Key | DE | EN | View | Hinweis |
|---|---|---|---|---|
| `home` | `/` | `/en/` | `pages/index.astro` (Home-Komponenten) | |
| `music` | `/musik/` | `/en/music/` | `MusicView` | |
| `vol1` | `/musik/lullabies-vol-1/` | `/en/music/lullabies-vol-1/` | `AlbumView` | |
| `vol2` | `/musik/lullabies-vol-2/` | `/en/music/lullabies-vol-2/` | `AlbumView` | Förderhinweis EN liegt schon vor (§11) |
| `singles` | `/musik/berlin-peace-collective/` | `/en/music/berlin-peace-collective/` | `SinglesView` | |
| `journey` | `/die-reise/` | `/en/the-journey/` | `JourneyView` | |
| `artists` | `/kuenstlerinnen/` | `/en/artists/` | `ArtistsView` | |
| `about` | `/philipp-von-rothkirch/` | `/en/philipp-von-rothkirch/` | `AboutView` | |
| `production` | `/produktion/` | `/en/production/` | `ProductionView` | |
| `press` | `/presse/` | `/en/press/` | `PressView` | |
| `contact` | `/kontakt/` | `/en/contact/` | `ContactView` | |
| `imprint` | `/impressum/` | `/en/legal-notice/` | `ImprintView` (`LegalPage`) | Rechtstext von Robert |
| `privacy` | `/datenschutz/` | `/en/privacy/` | `PrivacyView` (`LegalPage`) | Rechtstext von Robert |
| `withdrawal` | `/widerruf/` | `/en/withdrawal/` | `WithdrawalView` (`LegalPage`) | Rechtstext von Robert, nicht in der Navigation |
| – | `/404` | – | `pages/404.astro` | Astro baut nur eine `404.html` → Vorschlag in §5.7 |

Hauptnavigation (`mainNav`) hat bereits `{ de, en }`: Music · The Journey · Production · About Philipp · Contact.

---

## 2. Fest eingebaute deutsche Texte in Komponenten, Layouts und Seiten

Art: **nav** Navigation · **btn** Button/Link-Text · **lbl** Label/Überschrift/Eyebrow · **aria** aria-label/visually-hidden · **alt** Alt-Text/Bildunterschrift · **meta** Title/Description/OG · **body** Fließtext · **fmt** Format (Datum, Zahl, Sortierung).

### 2.1 Layout und globale Komponenten

| Datei:Zeile | Text | Art |
|---|---|---|
| `layouts/BaseLayout.astro:47` | „Zum Inhalt springen" (EN „Skip to content" schon vorhanden) | aria |
| `layouts/BaseLayout.astro:58` | OG-Alt-Text Standardbild: „{brand} – Schlaflieder aus aller Welt: illustrierter Globus als Nachtlicht" | alt/meta |
| `layouts/BaseLayout.astro:101` | `[PLATZHALTER: OG-Bild freigeben]` (nur Staging) | meta |
| `layouts/BaseLayout.astro:109` | Sprungziel `#inhalt` | Anker |
| `components/Header.astro:37` | Logo-Label „Heart Tones – Startseite" | aria |
| `components/Header.astro:51` | „Menü" | btn |
| `components/Header.astro:54` | „Hauptnavigation" | aria |
| `components/Header.astro:69ff.` | Sprachumschalter DE/EN (schon vorhanden, versteckt) | nav |
| `components/Footer.astro:19–30` | Seitenlinks: Musik, Die Reise, Künstler:innen, Presse, Produktion, Über Philipp, Impressum, Datenschutz, Widerruf (eigene Liste, nicht aus `mainNav`) | nav |
| `components/Footer.astro:43, 56, 70` | Überschriften „Kontakt", „Seiten", „Rechtliches" (+ aria-label „Rechtliches") | lbl/aria |
| `components/Footer.astro:82` | „English" (Sprachlink) | nav |
| `components/Footer.astro` | Label-Zeile „Heart Tones Records · LC-27925", Kontaktzeilen aus `site` | – (Eigennamen) |
| `components/Breadcrumb.astro:10` | aria-label „Sie sind hier" | aria |
| `components/LegalPage.astro:27` | Breadcrumb „Start" | nav |
| `components/Placeholder.astro` | Präfix „PLATZHALTER" | intern, bleibt DE |
| `components/Cover.astro:43` | Typo-Cover aria-label „Cover von {artist} {shortTitle}: {title}" | aria |
| `components/CreditList.astro` | keine Texte (bekommt sie von den Views) | – |
| `components/FundingNotice.astro:23–24` | Alt „Logo Initiative Musik gGmbH", „Logo Neustart Kultur" (Text selbst schon `{de,en}`) | alt |
| `components/ConsentVideo.astro:31` | iframe-Titel „Video: {title}" | aria |
| `components/ConsentVideo.astro:46` | „Video laden" | btn |
| `components/ConsentVideo.astro:49` | „Beim Laden werden Daten an YouTube (Google) übertragen. Datenschutz" | body/btn |
| `components/ConsentVideo.astro:54` | „Auf YouTube ansehen" | btn |

### 2.2 Player, Karte, Album-Bausteine

| Datei:Zeile | Text | Art |
|---|---|---|
| `components/AudioPlayer.astro:42` | Standard-Überschrift „Reinhören" | lbl |
| `components/AudioPlayer.astro:71–72` | Album-Meta „Heart Tones Records · HTR 001 · {Dauer}", „Asphalt Tango Records · HTR 002 · gefördert von der Initiative Musik" | lbl |
| `components/AudioPlayer.astro:76` | „Vol. 2 bei Asphalt Tango Records", „Vol. 2 auf Bandcamp" (Pflichtlinks §8.2) | btn |
| `components/AudioPlayer.astro:87–88` | `data-label-play` „„{title}" abspielen", `data-label-pause` „„{title}" pausieren" (vom Script `scripts/player.ts:93–112` gelesen) | aria |
| `components/AudioPlayer.astro:95–97` | „Wählen Sie ein Album und hören Sie alle Lieder direkt hier.", „Hören Sie alle Lieder direkt hier.", „Hörproben folgen in Kürze." | body |
| `components/AudioPlayer.astro:102` | Tablist aria-label „Album wählen" | aria |
| `components/AudioPlayer.astro:147, 205` | Startwert aria-label „„{title}" abspielen" | aria |
| `components/AudioPlayer.astro:169` | Slider aria-label „Position im Lied" | aria |
| `components/AudioPlayer.astro:232` | „Dauer" (visually-hidden) | aria |
| `components/AudioPlayer.astro:58` | Länder über `countryName(c)` (nur DE aufgerufen) | fmt |
| `components/WorldMap.astro:32` | Karten-Label „Weltkarte mit den {n} Herkunftsländern der Lieder" | aria |
| `components/WorldMap.astro:54, 63` | Tooltip-Text „{Land}: {Lieder}", Team-Pin „{Ort}: {Name} – {Rollen}" | body |
| `components/WorldMap.astro:74` | „Karte überspringen – zur Länderliste" | aria/btn |
| `components/WorldMap.astro:118` | aria-label „Legende" | aria |
| `components/WorldMap.astro:123, 129` | Legende „Herkunftsland eines Liedes", „Hinter den Aufnahmen: Produktion, Mix und Mastering" | lbl |
| `components/WorldMap.astro:153` | „Zum Lied →", „Zu den Liedern →" | btn |
| `components/AlbumCard.astro:35, 43, 54` | „Lullabies From Around The World", „CD vergriffen – als Stream erhältlich", „CD per E-Mail bestellen" | lbl/btn |
| `components/SingleCard.astro:20` | `c.note?.de` fest auf DE | fmt |
| `components/SingleCard.astro:42` | „Erscheint demnächst" | lbl |
| `components/album/OrderBlock.astro:28–35` | „Preis", „{€} pro CD", „Versand", „{€} innerhalb Deutschlands, {€} international", „Zahlung", „Per Überweisung oder PayPal – die Zahlungsdaten erhalten Sie mit der Bestellbestätigung per E-Mail." | lbl/body |
| `components/album/OrderBlock.astro:41, 48, 61` | „CD bestellen", „CD per E-Mail bestellen", „Widerrufsbelehrung und Muster-Widerrufsformular" | lbl/btn |
| `components/album/OrderBlock.astro` | `eur()` formatiert mit `de-DE` | fmt |

### 2.3 Startseite

| Datei:Zeile | Text | Art |
|---|---|---|
| `pages/index.astro:17–18` | Title „Heart Tones – Schlaflieder aus aller Welt", Description „Zwei Alben mit Wiegenliedern aus 24 Ländern …" | meta |
| `home/Hero.astro:26–27` | Pill „Demnächst", „Neue Musik: {Single} ({Artist}) →" | lbl/btn |
| `home/Hero.astro:29–33` | Eyebrow „Lullabies from around the world", H1 „Schlaflieder aus aller Welt", Intro „Zwei Alben mit Wiegenliedern …" | lbl/body |
| `home/Hero.astro:36` | Statistik „{n} Lieder · {n} Länder · {n} Musiker:innen" | lbl |
| `home/Hero.astro:39–40` | „Reinhören", „Die Reise entdecken" | btn |
| `home/Albums.astro:9` | H2 „Die Alben" | lbl |
| `home/NewMusic.astro:15–24` | „Demnächst", H2 „Neue Musik", Intro „Zwei neue Stücke des …", Link „Alle Mitwirkenden der beiden Singles" | lbl/body/btn |
| `home/JourneyTeaser.astro:20–31` | H2 „Die Reise", zwei Absätze („Von Haiti bis in die Mongolei …", „Auf der Karte finden Sie …" + „ und einer Hörprobe"), „Zur Karte", Karten-Label „Weltkarte mit {n} Markierungen …" | lbl/body/btn/aria |
| `home/Story.astro:18, 23` | Alt und Bildunterschrift „Philipp von Rothkirch und Robert Cummings mit ihren Kindern, 2011 · Foto: Benedikt Stehle" | alt |
| `home/Story.astro:26–36` | Eyebrow „Wie alles begann", H2 „Zwei Kinder, ein Tag Abstand", 2 Absätze, Link „Über Philipp von Rothkirch" | lbl/body/btn |
| `home/Production.astro:19–60` | Eyebrow/H2 „Produktion", „Produktion anfragen", „Mehr zur Produktion", „Referenzen", „Videos und Credits", Alt „Philipp von Rothkirch am Flügel …", H3 „In Partnerschaft mit Hot Milk Studio", Absatz „Vorproduktion in Kreuzberg …", „Foto: Robert Cummings" | lbl/btn/alt/body |
| `home/PressStrip.astro:9` | „Presse" | lbl |

### 2.4 Views (Unterseiten)

| Datei:Zeile | Text | Art |
|---|---|---|
| **MusicView** `:23–25` | Kacheln „Die Reise / Alle {n} Herkunftsländer …", „Künstler:innen / Die {n} Musiker:innen …", „Presse / Rezensionen und Berichte …" | btn/body |
| MusicView `:31–32` | Title „Musik: Lullabies und Berlin Peace Collective", Description | meta |
| MusicView `:35–64` | Breadcrumb, H1 „Musik", Lead „Zwei Alben mit Wiegenliedern …", „Demnächst", Absatz „Zwei neue Stücke …", „Zu den Singles mit allen Mitwirkenden", H2 „Mehr entdecken" | nav/lbl/body/btn |
| **AlbumView** `:38–45` | Faktenliste „Künstler", „Label", „Katalognummer", „Labelcode", „Erschienen", „Spielzeit", „{n} Lieder · {n} Länder" | lbl |
| AlbumView `:36` | Datum `Intl.DateTimeFormat('de-DE')` | fmt |
| AlbumView `:48, 53, 63` | „Nr. {n} („{Titel}")", „(außer Nr. …)", „Nr. {Liste}" | lbl |
| AlbumView `:62` | „verstorben {Jahr}" (EN „deceased {Jahr}", §5.16) | lbl |
| AlbumView `:76–77` | Title „Lullabies From Around The World {Vol} ({Jahr}) – Heart Tones", Description „… Schlaflieder aus {n} Ländern … Titelliste, Mitwirkende und Streaming-Links/Bestellung der CD" | meta |
| AlbumView `:92–94` | Breadcrumb „Start", „Musik" | nav |
| AlbumView `:99` | Eyebrow „Heart Tones · Album · {Jahr}" | lbl |
| AlbumView `:109, 122` | „CD vergriffen – als Stream erhältlich", „CD per E-Mail bestellen" | lbl/btn |
| AlbumView `:135` | „Zum größten Teil aufgenommen sowie gemischt und gemastert im Hot Milk Studio Berlin." (§5.7-Wortlaut) | body |
| AlbumView `:146–189` | „Die Lieder", „Mitwirkende", „{n} Musiker:innen und Ensembles.", „Alle Künstler:innen beider Alben", „Produktion und Gestaltung", aria „Presse", „Presse"-Link, Platzhalter „Magazin, Ausgabe, Jahr", aria „Förderung" | lbl/aria/btn |
| **SinglesView** `:17–32` | Title „{Artist} – neue Singles", Description, Breadcrumb, „Demnächst", Intro „Zwei neue Stücke des …", aria „Singles" | meta/nav/body/aria |
| **JourneyView** `:37` | Sortierung `localeCompare(…, 'de')` | fmt |
| JourneyView `:40` | `continentLabels[continent].de` fest auf DE | fmt |
| JourneyView `:58–59` | Title „Die Reise: Schlaflieder aus {n} Ländern", Description | meta |
| JourneyView `:62–85` | Breadcrumb, H1 „Die Reise", Intro (2 Absätze, §11-Wortlaut 24.10.), „ und einer Hörprobe", H2 „Weltkarte" (hidden), Hinweis „Zeigen Sie auf einen Punkt …", H2 „Alle {n} Länder" | nav/lbl/body/aria |
| JourneyView `:115, 121–125` | `lineupText(track)` ohne Locale, „Außerdem:" | fmt/lbl |
| JourneyView `:138` | H3 „Hinter den Aufnahmen" | lbl |
| **ArtistsView** `:44` | Sortierung `localeCompare(…, 'de')` | fmt |
| ArtistsView `:54–57` | „{Name} (verstorben {Jahr})", „In Erinnerung an …" | body |
| ArtistsView `:63–64` | Title „Künstler:innen der Lullabies From Around The World", Description | meta |
| ArtistsView `:67–71` | Breadcrumb, H1 „Künstler:innen", Intro „… gesungen und gespielt." | nav/lbl/body |
| ArtistsView `:93–126` | aria „Musiker:innen und Ensembles auf {Vol}", „auf {Vol} als {Name}", „auch: {Name}", „Ensemble", „Website:", „Mehr über Philipp von Rothkirch" | aria/lbl/btn |
| **AboutView** `:24` | Instrumentenliste „Klavier (seit dem sechsten Lebensjahr)", Rhodes, Clavinet, „Moog und Talkbox", Vibraphon, Bass, Percussion | lbl |
| AboutView `:34–35` | Porträt-Alt „Philipp von Rothkirch spielt Klavier, sein kleiner Sohn …", Credit | alt |
| AboutView `:44–45` | Title „Philipp von Rothkirch – Komponist und Produzent", Description | meta |
| AboutView `:49–61` | Breadcrumb, H1 „Über Philipp", Untertitel „Komponist, Produzent und Musiker in Berlin-Kreuzberg.", Bio-Intro B10 (Absatz „Philipp von Rothkirch stammt aus Niedersachsen …") | nav/lbl/body |
| AboutView `:79–83` | Platzhalter „Fotograf:in", aria „Platzhalter für ein Porträt", „Porträt … – Fotoshooting ausstehend" | aria |
| AboutView `:96–102` | Familienfoto Alt + Bildunterschrift | alt |
| AboutView `:106–130` | „Wie alles begann", „Zwei Kinder, ein Tag Abstand", „Wie Philipp und Robert sich kennenlernten" + Absatz („Philipp von Rothkirch wohnt in Berlin-Kreuzberg …"), „Die Idee zu den Schlafliedern" + 2 Absätze, Albumlinks, „Die Reise" | lbl/body |
| AboutView `:140–163` | „Instrumente und Arbeitsweise", aria „Instrumente", Absätze zu Lieblingsinstrumenten, Arbeitsweise, Berlin Peace Collective/Bombs Away!/Nina Hagen (Block C), Ablauf | lbl/aria/body |
| AboutView `:169–174` | Alt Flügelfoto, Bildunterschrift „Philipp von Rothkirch im Hot Milk Studio · Foto: Robert Cummings" | alt |
| AboutView `:181–202` | „Ausgewählte Arbeiten", „Kompositionen und Produktionen für andere Künstler:innen.", Video-Titel „{Artist} – „{Titel}"", Platzhalter „Jahr", „Rollen mit Philipps vollständigen Credits abgleichen" | lbl/aria |
| AboutView `:217–224` | „Produktion anfragen", Absatz „Sie singen und brauchen …", „Mehr zur Produktion" | lbl/body/btn |
| **ProductionView** `:22–23` | Title „Produktion: Komposition, Arrangement und Aufnahme", Description | meta |
| ProductionView `:26–33` | Breadcrumb, H1, „Produktion per E-Mail anfragen", „Anrufen: {Telefon}", Hinweis Verfügbarkeit + Preise | nav/lbl/btn |
| ProductionView `:39–83` | „Leistungen", „Genreübergreifend – für Sänger:innen …", „So läuft eine Produktion ab", „Referenzen", „Kompositionen und Produktionen …", „Video ansehen", „Außerdem: die beiden Alben … produziert hat." | lbl/body/btn |
| ProductionView `:92–118` | Alt Flügelfoto, „Foto: Robert Cummings", „In Partnerschaft mit Hot Milk Studio" + 2 Absätze, „Produktion anfragen", „Schreiben Sie kurz, woran Sie arbeiten. …" | alt/lbl/body |
| **PressView** `:21–28` | Title „Presse: Rezensionen und Berichte", Description, Breadcrumb, H1 „Presse", „Stimmen zu …" | meta/nav/body |
| PressView `:33–74` | „Pressestimmen" (hidden), „· Rezension zu Vol. 1", Platzhalter „Magazin, Ausgabe, Jahr", „Weitere Presse", Platzhalter „Belege und Links …", „Pressekontakt" + Absatz „Anfragen zu Interviews …", Platzhalter „Pressefotos …" | aria/lbl/body |
| **ContactView** `:19–34` | Anliegen-Karten: „Produktion"/„Instrumental, Arrangement …"/„Produktion anfragen", „CD Vol. 2 bestellen"/„Bestellung per E-Mail …"/„Zur Bestellung", „Presse"/„Interviews, Rezensionsexemplare …"/„Presseanfrage senden" | lbl/body/btn |
| ContactView `:41–79` | Title „Kontakt", Description, Breadcrumb, H1, Lead „Schreiben Sie eine E-Mail oder rufen Sie an.", H2 „Ihr Anliegen", Absatz „Die Postanschrift finden Sie im Impressum. Vol. 2 kostet …" | meta/nav/lbl/body |
| **ImprintView** `:17–70` | Title, Heading, Description, Status-Platzhalter, „Angaben gemäß § 5 DDG", „Deutschland", „Kontakt", „Umsatzsteuer" + Satz § 19 UStG, „Verantwortlich … § 18 Abs. 2 MStV", „Label", „Bildnachweise", „Verbraucherstreitbeilegung", „Haftung für Inhalte und Links", „Urheberrecht", „Datenschutzerklärung" + 4 Platzhalter | Recht |
| **PrivacyView** `:16–93` | Title, Heading, Description, Status-Platzhalter, Abschnitte 1–9 (Verantwortlicher, Das Wichtigste in Kürze, Hosting, Schriftarten, Hörproben, YouTube, Links, Kontakt, Ihre Rechte) + 5 Platzhalter | Recht |
| **WithdrawalView** `:14–32` | Title, Heading, Description, Status-Platzhalter, Intro „… per E-Mail.", „Widerrufsrecht", „Muster-Widerrufsformular" + 2 Platzhalter | Recht |
| **404** `pages/404.astro:9–17` | Title „Seite nicht gefunden", Description, Eyebrow „Fehler 404", H1, Absatz „Diese Seite gibt es nicht oder nicht mehr …", „Zur Startseite", Navlinks `item.label.de` fest auf DE | meta/lbl/body/btn |

### 2.5 Scripts und Lib

| Datei:Zeile | Text | Art |
|---|---|---|
| `scripts/player.ts:93–112` | Liest die Labels aus `data-label-play/pause` → keine eigenen Texte | – |
| `scripts/world-map.ts` | keine Texte (Tooltip kommt aus `data-tip`) | – |
| `lib/schema.ts:41–42` | Person `jobTitle` `[PLATZHALTER: jobTitle]`, `description` „Komponist, Produzent und Musiker in Berlin-Kreuzberg" | meta |
| `lib/schema.ts:76` | Albumname „Lullabies From Around The World {Vol}" | – (Eigenname) |
| `lib/schema.ts` | kein `inLanguage` gesetzt | meta |
| `lib/world-map.ts:46` | Build-Fehlermeldung (Englisch, intern) | – |

### 2.6 Anker-IDs – erledigt (25.10.2026)

Alle IDs stehen in `src/data/anchors.ts`: sprachneutral, kurz, klein, ASCII, in DE und EN gleich (z. B. `#main`, `#new-music`, `#journey`, `#order`, `#works`). Track-Anker sind Album + Nummer (`#vol-1-07`). Der Sprachumschalter übernimmt das aktuelle `#fragment`. `qa:dist` prüft, dass jeder `#`-Link eine vorhandene ID trifft.

---

## 3. Deutsche Textfelder in `src/data/*.ts`

| Datei | Feld | Heute | Einträge | Hinweis |
|---|---|---|---|---|
| `albums.ts` | `coverAlt` | `string` (DE) | 2 | |
| | `teaser` | `string` (DE) | 2 | |
| | `story` | `string[]` (DE) | 2 × 2 Absätze | freigegebener Wortlaut (01_Brief/09) – EN braucht Philipps Freigabe |
| | `thanks` | `string` (DE) | 1 (Vol. 1) | |
| | `studio` | „Hot Milk Studio Berlin" | 2 | Eigenname, bleibt |
| | `links[].label` | Spotify, Deezer, Asphalt Tango Records, Bandcamp | 4 | Eigennamen, bleiben |
| | `tracks[].title` / `titleAlt` / `ensemble` / `creditedAs` | Originalsprache | 26 | **nicht übersetzen** (§5.5) |
| | `writingText()` | hat schon `locale` (Traditionell/Musik/Text/Geschrieben von) | – | fertig |
| | `lineupText()` | hat schon `locale` | – | Aufrufer übergeben noch kein `locale` |
| `countries.ts` | `name`, `continentLabels` | `{ de, en }` | 24 + 5 | fertig. `countryName()` hat schon `locale` |
| `people.ts` | `name`, `alsoCredited` | Eigennamen | 46 | bleibt. `photo.credit` später ggf. „Foto:"/"Photo:" in der View |
| `press.ts` | `quote`, `headline` | DE (wörtliche Zitate) | 2 | **Entscheidung nötig** (§6) |
| | `pressMentions[].what`, `.date` | „Interview", „Rezension", „Ausgabe #47", „Januar 2012", „März 2012" | 6 | `what` und Monatsnamen übersetzen |
| | `pressOutlets` | Eigennamen | 5 | bleibt |
| `privacy.ts` | `youtubeHosts[].purpose` | DE | 6 | |
| | `externalLinkTargets` | teils DE („YouTube („Auf YouTube ansehen")", „Websites von Künstler:innen") | 7 | |
| `production.ts` | `services` | DE | 5 | |
| | `productionIntro` | DE | 1 | |
| | `process[].title/.text` | DE | 3 × 2 | |
| | `pricing` | „Preise auf Anfrage." | 1 | |
| | `mailSubjects` | „Produktionsanfrage", „Presseanfrage" | 2 | Betreffzeilen der Mails → §6 |
| `roles.ts` | `roleLabels` | `{ de, en }` | 44 | fertig (EN klein geschrieben, britisch „realisation") |
| `routes.ts` | `mainNav[].label` | `{ de, en }` | 5 | fertig |
| `singles.ts` | `teaser` | `{ de, en: null }` | 2 | EN fehlt |
| | `credits[].note` | `{ de, en }` | 3 | fertig |
| | `title`, `artist`, `credits[].name/members` | Eigennamen | – | bleibt |
| `site.ts` | `claim` | „Music from around the world" (EN) | 1 | |
| | `contact.availability` | „Erstgespräch nach Vereinbarung" | 1 | |
| | `contact.area` | „Berlin-Kreuzberg" | 1 | bleibt |
| | `order.subject` | „Bestellung Heart Tones Vol. 2" | 1 | Mail-Betreff → §6 |
| | `order.taxNote` | „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet." | 1 | Rechtstext |
| | `imageCredits[].image` | DE | 5 | |
| | `fundingNotice` | `{ de, en }` | 1 | fertig, wörtlich (§11) |
| `team-pins.ts` | `country`, `note`, `roles` | DE | 1 Pin | `link.label` bleibt |
| `works.ts` | `credit`, `shortRole` | DE | 2 | `title`, `artist`, `artistLink.label` bleiben (außer „Fanfare Ciocărlia bei Asphalt Tango" → „… on Asphalt Tango") |
| | `artistLink.label` | „Fanfare Ciocărlia bei Asphalt Tango" | 1 | |

**Schon zweisprachig:** `mainNav`, `countries`, `continentLabels`, `roleLabels`, `writingText()`, `fundingNotice`, `singles[].credits[].note`, Skip-Link. **Bleibt in jeder Sprache gleich:** Songtitel, Personen- und Ensemblenamen, Label, Katalognummern, „Lullabies From Around The World", „Heart Tones", „Berlin Peace Collective", Single-Titel.

---

## 4. Zahlen und Umfang

- Seiten: 14 Routen + 404.
- UI-Texte in Komponenten/Views (ohne Rechtstexte und lange Prosa): grob **230 Schlüssel**.
- Prosa-Blöcke (Absätze): grob **45**, die meisten auf Über Philipp, Produktion, Die Reise und der Startseite.
- Rechtstexte: 3 Seiten (Impressum, Datenschutz, Widerruf), Wortlaut von Robert.
- Daten-Felder ohne EN: ca. **60 Einzelwerte** (siehe §3).

---

## 5. Vorgeschlagene Struktur

### 5.1 Routing (wie konfiguriert)

`astro.config.mjs` bleibt: `i18n: { defaultLocale: 'de', locales: ['de','en'], routing: { prefixDefaultLocale: false } }`. Die URLs kommen weiter **nur** aus `routes.ts`. Astros `getRelativeLocaleUrl()` wird nicht verwendet, weil sich die Slugs zwischen den Sprachen unterscheiden (`/musik/` ↔ `/en/music/`).

### 5.2 Dünne EN-Seiten

```
src/pages/
  index.astro              (DE, unverändert)
  [...page].astro          (DE, unverändert bis auf locale="de")
  404.astro
  en/
    index.astro            → <Home locale="en" />
    [...page].astro        → getStaticPaths aus routes[key].en, gleiche View-Zuordnung
```

- Die Startseite wird dafür in eine `src/views/HomeView.astro` verschoben (heute direkt in `pages/index.astro`), damit DE und EN dieselbe View nutzen.
- Die Key→View-Zuordnung aus `[...page].astro` wandert in **eine** gemeinsame Komponente (`src/views/PageView.astro`), damit DE und EN nicht auseinanderlaufen.
- `en/[...page].astro` erzeugt nur Pfade, solange `enPublished === true`. Sonst gibt `getStaticPaths` `[]` zurück, und der Build enthält keine EN-Seiten.
- Jede View und jede Komponente mit Text bekommt `locale: Locale` als Prop und reicht es weiter (BaseLayout, Header und Footer haben es schon).

### 5.3 `src/i18n/ui.ts` und typisierte `t()`-Funktion

```ts
// src/i18n/ui.ts
export const ui = {
  de: {
    'nav.skip': 'Zum Inhalt springen',
    'player.play': '„{title}“ abspielen',
    'hero.stats': '{tracks} Lieder · {countries} Länder · {performers} Musiker:innen',
    // …
  },
  en: {
    'nav.skip': 'Skip to content',
    'player.play': 'Play “{title}”',
    // fehlende Keys → Typfehler (siehe unten)
  },
} as const;

export type UiKey = keyof (typeof ui)['de'];
// EN muss genau dieselben Keys haben: fehlt einer, scheitert schon `astro check`.
ui.en satisfies Record<UiKey, string>;

// src/i18n/t.ts
export function useT(locale: Locale) {
  return (key: UiKey, vars?: Record<string, string | number>) =>
    ui[locale][key].replace(/\{(\w+)\}/g, (_, k) => String(vars?.[k] ?? `{${k}}`));
}
```

- Schlüssel nach Bereich: `nav.*`, `footer.*`, `player.*`, `map.*`, `album.*`, `order.*`, `home.*`, `music.*`, `journey.*`, `artists.*`, `about.*`, `production.*`, `press.*`, `contact.*`, `legal.*`, `notFound.*`, `meta.<route>.title|description`.
- Lange Prosa (Über Philipp, Produktion) steht nicht in `ui.ts`, sondern als `{ de, en }`-Felder in Daten-Dateien (z. B. neu `src/data/about.ts`). Dort prüft sie Robert gegen 01_Brief/08 und sie bleibt aus den Templates heraus.
- Für Formatierung gibt es `src/i18n/format.ts`: `formatDate(locale)`, `formatEur(locale)`, `sortNames(locale)` (`Intl.Collator`). Damit verschwinden die festen `'de'`/`'de-DE'` aus den Views.
- „Musiker:innen" ist Teil des DE-Strings, in EN heißt es „musicians". Keine Logik für Gendern.

### 5.4 Daten-Dateien mit `{ de, en }`

```ts
// src/i18n/types.ts
export type Localized<T = string> = { de: T; en: T | null };
export const loc = <T>(v: Localized<T>, locale: Locale): T => v[locale] ?? v.de;
```

- `en: null` bedeutet „noch nicht übersetzt" und ist erlaubt, solange `enPublished === false`. Das gleiche Muster nutzt `singles.teaser` schon.
- Umgestellt werden die Felder in §3 ohne EN: `albums.coverAlt/teaser/story/thanks`, `press.pressMentions.what/date`, `privacy.*.purpose`, `production.*`, `site.contact.availability`, `site.imageCredits[].image`, `team-pins.country/note/roles`, `works.credit/shortRole/artistLink.label`.
- Die Daten-Helper bekommen `locale` (`lineupText`, `writingText`, `roleLabel`, `countryName` haben es schon). Die Views reichen es nur noch durch.
- **Wörtliche Rechts- und Fördertexte** (`order.taxNote`, `fundingNotice`) bleiben eigene Felder. EN-Versionen kommen nur von Robert bzw. aus den Vorgaben der Initiative Musik.

### 5.5 hreflang

`BaseLayout` erzeugt die Alternates schon (`de`, `en`, `x-default` → DE), sobald `enPublished` true ist. Ergänzen:
- `og:locale:alternate` (`en_GB` ↔ `de_DE`).
- Header-Sprachumschalter: verlinkt `routes[routeKey][other]` statt nur auf die Startseite.
- Optional `lang`/`hreflang` am Umschalter-Link.

### 5.6 Sitemap mit i18n

Die eingebaute `i18n`-Option von `@astrojs/sitemap` ordnet Seiten nur zu, wenn der Pfad nach dem Sprachpräfix gleich ist. Bei `/musik/` ↔ `/en/music/` greift sie nicht. Vorschlag:

```js
sitemap({
  i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en-GB' } },
  serialize(item) {
    const key = routeKeyFor(item.url);          // aus routes.ts (als .mjs/.ts importierbar machen)
    if (key && enPublished) item.links = [
      { lang: 'de-DE', url: abs(routes[key].de) },
      { lang: 'en-GB', url: abs(routes[key].en) },
      { lang: 'x-default', url: abs(routes[key].de) },
    ];
    return item;
  },
})
```

Dafür muss `routes.ts` von `astro.config.mjs` importierbar sein (TS-Import in der Config vorher testen; falls er nicht geht, ein kleines `routes.mjs`, aus dem `routes.ts` re-exportiert).

### 5.7 404 – erledigt (25.10.2026)

Eine zweisprachige `404.html` (DE oben, EN darunter, je mit `lang`), siehe §6 Nr. 8. Keine Server-Regeln, keine Weiterleitungen, kein eigenes JavaScript.

### 5.8 Build-Check: fehlende EN-Texte

`scripts/check-i18n.ts` → `npm run check:i18n`, wird in `npm run build` vorgeschaltet (wie `check:data`):

1. **UI:** Jeder Key in `ui.de` existiert in `ui.en` und ist nicht leer. Fehlt einer, schlägt schon die Typprüfung über `satisfies` an. Das Script prüft zusätzlich auf leere Strings und darauf, dass die `{platzhalter}`-Variablen in DE und EN gleich sind.
2. **Daten:** Läuft rekursiv über alle `Localized`-Felder der exportierten Daten (`albums`, `press`, `production`, `site`, `team-pins`, `works`, `singles`, `about`) und meldet jedes `en: null` oder `''` mit Pfad (z. B. `albums.vol1.story[1].en`).
3. **Modus:** Bei `enPublished === false` nur **Bericht** (Anzahl fehlender Strings, Exit 0), damit der DE-Build nicht blockiert. Bei `enPublished === true` **Fehler** (Exit 1), wenn etwas fehlt.
4. **Dist-Check** (`qa:dist`) erweitern: Auf EN-Seiten fehlen typische DE-Wörter („Lieder", „Länder", „Musiker:innen", „abspielen", „Startseite", „Zum Inhalt"), außer in `lang="de"`-Elementen (z. B. Zitate). `<html lang="en">` ist gesetzt, und jede Seite hat ihr hreflang-Paar.
5. `docs/platzhalter.md` bekommt eine EN-Spalte, sobald EN-Seiten gebaut werden.

### 5.9 Empfohlene Reihenfolge (je ein Commit)

1. `refactor(i18n): HomeView + shared PageView, locale prop through views` – keine sichtbare Änderung.
2. `feat(i18n): ui.ts, t(), format helpers; DE strings moved` – DE-Ausgabe identisch (Diff von `dist/` vorher/nachher prüfen).
3. `feat(i18n): Localized data fields (en: null)` + `check:i18n` im Berichtsmodus.
4. `feat(i18n): en pages behind enPublished`, Sitemap-`serialize`, hreflang, bilinguale 404.
5. Übersetzung – erst nach Philipps DE-Freigabe und Roberts Auftrag. Danach `enPublished = true` und den Check auf Fehlermodus stellen.

**Stand 26.10.2026:** Schritte 1–4 umgesetzt (`985d918`, `3166a78`, `772778a` und der Commit `feat(i18n): en pages behind enPublished`). Der Fehlermodus von `check:i18n` hängt direkt an `enPublished` – kein eigener Schalter nötig. EN-Rechtsseiten: `LegalPointerView` mit Texten aus `src/data/legal.ts`. Test mit `enPublished = true` (nur lokal): 14 EN-Seiten, hreflang im Head und in der Sitemap, Sprachumschalter mit `#fragment`, `check:i18n` bricht mit fehlenden Texten ab.

---

## 6. Entscheidungen (Robert, 25.10.2026)

| # | Frage | Entscheidung |
|---|---|---|
| 1 | Englisch-Variante | **Britisches Englisch** (en-GB, `og:locale` `en_GB`). |
| 2 | Pressezitate | Auf EN-Seiten **übersetzt**, mit Hinweis, dass es eine Übersetzung ist (z. B. „translated from German“). Quelle wie im DE-Original. |
| 3 | Rechtsseiten | `/en/legal-notice/`, `/en/privacy/` und `/en/withdrawal/` sind kurze EN-Seiten, die **auf die deutsche Fassung verweisen**. Keine übersetzten Rechtstexte. |
| 4 | Mail-Betreffzeilen | **Nicht übersetzen** („Bestellung Heart Tones Vol. 2“, „Produktionsanfrage“, „Presseanfrage“ bleiben auch auf EN-Seiten). |
| 5 | Preisformat | EN **„€15“**, DE **„15 €“** (über `formatEur(locale)`). |
| 6 | Vancouver-Pin | **Wird übersetzt** (Note, Rollen, Land). |
| 7 | Anker-IDs | **Gemeinsam für beide Sprachen**, kurz, klein, ASCII, sprachneutral, nicht übersetzt (`src/data/anchors.ts`, umgesetzt). |
| 8 | 404 | **Eine zweisprachige Seite** (`src/pages/404.astro`, umgesetzt): DE-Block, dann EN-Block, je mit `lang`; EN-Links erst, wenn `enPublished`. Keine Server-Regeln. |
| 9 | Übersetzung | **Claude übersetzt** in den folgenden Prompts. Robert prüft, Philipp gibt frei. |

Damit fällt für §5.4 weg: EN-Fassungen von `order.taxNote` und den Rechtstexten. `mailSubjects` und `order.subject` bleiben einsprachig (kein `Localized`).
