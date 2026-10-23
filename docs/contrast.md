# Kontrast – alle verwendeten Farbpaare

Generiert von `npm run qa:contrast` aus `src/styles/global.css` (WCAG 2.2: Text ≥ 4,5:1, alle Texte als normale Größe geprüft; UI-Elemente, Fokusringe und Kartenmarker ≥ 3:1).

| Vordergrund | Hintergrund | Art | Kontrast | Mindestens | Ergebnis | Wo |
|---|---|---|---|---|---|---|
| `--cocoa` #2E2420 | `--cream` #F6F0E8 | Text | 13.35:1 | 4.5:1 | ✅ AA · AAA | Fließtext auf Creme; Text auf hellen Buttons |
| `--cocoa` #2E2420 | `--paper` #FFFFFF | Text | 15.11:1 | 4.5:1 | ✅ AA · AAA | Fließtext auf weißen Flächen (Mitwirkende, Länderkarten, Förderblock) |
| `--cocoa` #2E2420 | `--sand` #D9CCBD | Text | 9.59:1 | 4.5:1 | ✅ AA · AAA | Fließtext auf Sand (Bestellblock, Zitat, Cover-Platzhalter) |
| `--ink-muted` #5E4E42 | `--cream` #F6F0E8 | Text | 7.01:1 | 4.5:1 | ✅ AA · AAA | Meta-Zeilen, Breadcrumb, Bildunterschriften auf Creme |
| `--ink-muted` #5E4E42 | `--paper` #FFFFFF | Text | 7.94:1 | 4.5:1 | ✅ AA · AAA | Meta-Zeilen und Förderhinweis auf Weiß |
| `--ink-muted-sand` #4A3C33 | `--sand` #D9CCBD | Text | 6.71:1 | 4.5:1 | ✅ AA | Sekundärtext auf Sand |
| `--taupe` #7E6650 | `--cream` #F6F0E8 | Text | 4.75:1 | 4.5:1 | ✅ AA | Eyebrows auf Creme |
| `--taupe` #7E6650 | `--paper` #FFFFFF | Text | 5.38:1 | 4.5:1 | ✅ AA | Eyebrow „Wie alles begann" auf Weiß |
| `--heart-red` #9A0000 | `--cream` #F6F0E8 | Text | 7.81:1 | 4.5:1 | ✅ AA · AAA | Links auf Creme |
| `--heart-red` #9A0000 | `--paper` #FFFFFF | Text | 8.85:1 | 4.5:1 | ✅ AA · AAA | Links auf Weiß |
| `--heart-red` #9A0000 | `--sand` #D9CCBD | Text | 5.61:1 | 4.5:1 | ✅ AA | Links und Outline-Buttons auf Sand |
| `--heart-red-dark` #6E0000 | `--cream` #F6F0E8 | Text | 11.15:1 | 4.5:1 | ✅ AA · AAA | Link-Hover auf Creme |
| `--heart-red-dark` #6E0000 | `--paper` #FFFFFF | Text | 12.63:1 | 4.5:1 | ✅ AA · AAA | Link-Hover auf Weiß |
| `--paper` #FFFFFF | `--heart-red` #9A0000 | Text | 8.85:1 | 4.5:1 | ✅ AA · AAA | Primär-Button |
| `--paper` #FFFFFF | `--heart-red-dark` #6E0000 | Text | 12.63:1 | 4.5:1 | ✅ AA · AAA | Primär-Button Hover |
| `--cocoa` #2E2420 | `--placeholder-bg` #FFE27A | Text | 11.81:1 | 4.5:1 | ✅ AA · AAA | [PLATZHALTER] (nur Staging) |
| `--ink-faint` #6B5A4C | `--cream` #F6F0E8 | Text | 5.81:1 | 4.5:1 | ✅ AA | Inaktive Sprachauswahl (noch nicht sichtbar) |
| `--cream` #F6F0E8 | `--taupe` #7E6650 | Text | 4.75:1 | 4.5:1 | ✅ AA | Hero- und CTA-Text, Outline-Button auf Taupe |
| `--cocoa` #2E2420 | `--cream-muted` #E2D6C6 | Text | 10.56:1 | 4.5:1 | ✅ AA · AAA | Heller Button Hover |
| `--cream` #F6F0E8 | `--cocoa` #2E2420 | Text | 13.35:1 | 4.5:1 | ✅ AA · AAA | Text auf Cocoa; „Demnächst"-Pill |
| `--cream-muted` #E2D6C6 | `--cocoa` #2E2420 | Text | 10.56:1 | 4.5:1 | ✅ AA · AAA | Sekundärtext auf Cocoa |
| `--cream-faint` #CDBFAE | `--cocoa` #2E2420 | Text | 8.39:1 | 4.5:1 | ✅ AA · AAA | Tracknummern, Dauer, Autor:innen auf Cocoa |
| `--cream` #F6F0E8 | `--cocoa-2` #3A2E29 | Text | 11.57:1 | 4.5:1 | ✅ AA · AAA | Player-Leiste, Single-Karten, aktive Trackzeile |
| `--cream-muted` #E2D6C6 | `--cocoa-2` #3A2E29 | Text | 9.15:1 | 4.5:1 | ✅ AA · AAA | Credits in Single-Karten, Video-Hinweis mobil |
| `--cream-faint` #CDBFAE | `--cocoa-2` #3A2E29 | Text | 7.27:1 | 4.5:1 | ✅ AA · AAA | Meta in Single-Karten, Dauer in aktiver Trackzeile |
| `--globe-ochre` #D6A462 | `--cocoa` #2E2420 | Text | 6.73:1 | 4.5:1 | ✅ AA | Hinweis „Zum Lied →" im Karten-Tooltip |
| `--cocoa` #2E2420 | `--globe-ochre` #D6A462 | Text | 6.73:1 | 4.5:1 | ✅ AA | „Demnächst"-Badge |
| `--heart-red` #9A0000 | `--cream` #F6F0E8 | UI | 7.81:1 | 3:1 | ✅ AA | Fokusring und Outline-Buttons auf Creme |
| `--heart-red` #9A0000 | `--paper` #FFFFFF | UI | 8.85:1 | 3:1 | ✅ AA | Fokusring auf Weiß |
| `--heart-red` #9A0000 | `--sand` #D9CCBD | UI | 5.61:1 | 3:1 | ✅ AA | Fokusring auf Sand |
| `--globe-ochre` #D6A462 | `--cocoa` #2E2420 | UI | 6.73:1 | 3:1 | ✅ AA | Fokusring auf Cocoa |
| `--globe-ochre` #D6A462 | `--cocoa-2` #3A2E29 | UI | 5.83:1 | 3:1 | ✅ AA | Fortschrittsbalken (Player-Leiste) |
| `--cream` #F6F0E8 | `--taupe` #7E6650 | UI | 4.75:1 | 3:1 | ✅ AA | Fokusring und Outline-Button auf Taupe |
| `--cream` #F6F0E8 | `--cocoa` #2E2420 | UI | 13.35:1 | 3:1 | ✅ AA | Rand der Play-Buttons, aktiver Album-Tab |
| `--cocoa-outline` #8A786A | `--cocoa` #2E2420 | UI | 3.58:1 | 3:1 | ✅ AA | Rand inaktiver Album-Tab, gestrichelter „Erscheint demnächst"-Rahmen |
| `--cream` #F6F0E8 | `--globe-blue` #6A87A8 | UI | 3.29:1 | 3:1 | ✅ AA | Karte: Marker-Ring und äußerer Fokusring auf Meer |
| `--cocoa` #2E2420 | `--globe-ochre` #D6A462 | UI | 6.73:1 | 3:1 | ✅ AA | Karte: innerer Fokusring auf Land |
| `--heart-red` #9A0000 | `--globe-ochre` #D6A462 | UI | 3.94:1 | 3:1 | ✅ AA | Karte: Marker auf Land |

Nicht verwendet (§6.1): Weiß auf `--heart-light` = 4.18:1 – deshalb nie Text auf Heart Light; Glyph und Akzente auf Cocoa/Taupe sind dekorativ. Deaktivierte Play-Buttons sind nach WCAG von der Kontrastpflicht ausgenommen. Dekorative Linien (`--cocoa-line`, `--sand`, `--taupe-line`) sind nicht prüfpflichtig.
