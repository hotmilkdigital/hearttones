/**
 * Contrast table for every colour pair the site uses (CLAUDE.md §6.1, §6.7 – compute, don't eyeball).
 * Reads the tokens from src/styles/global.css, computes WCAG 2.2 ratios and writes docs/contrast.md.
 * Fails if a pair is below its requirement. Add a row here whenever a new pair is introduced.
 *
 *   npm run qa:contrast
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

type Kind = 'text' | 'ui';

const css = readFileSync('src/styles/global.css', 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--([a-z0-9-]+): (#[0-9A-Fa-f]{6});/g)].map((m) => [m[1]!, m[2]!]));

// [foreground, background, kind, where]. text = 4.5:1 (all text is checked as normal size),
// ui = 3:1 (focus indicators, control borders, map markers – WCAG 1.4.11 / 2.4.13 basis).
const pairs: [string, string, Kind, string][] = [
  // Light sections
  ['cocoa', 'cream', 'text', 'Fließtext auf Creme; Text auf hellen Buttons'],
  ['cocoa', 'paper', 'text', 'Fließtext auf weißen Flächen (Mitwirkende, Länderkarten, Förderblock)'],
  ['cocoa', 'sand', 'text', 'Fließtext auf Sand (Bestellblock, Zitat, Cover-Platzhalter)'],
  ['ink-muted', 'cream', 'text', 'Meta-Zeilen, Breadcrumb, Bildunterschriften auf Creme'],
  ['ink-muted', 'paper', 'text', 'Meta-Zeilen und Förderhinweis auf Weiß'],
  ['ink-muted-sand', 'sand', 'text', 'Sekundärtext auf Sand'],
  ['taupe', 'cream', 'text', 'Eyebrows auf Creme'],
  ['taupe', 'paper', 'text', 'Eyebrow „Wie alles begann" auf Weiß'],
  ['heart-red', 'cream', 'text', 'Links auf Creme'],
  ['heart-red', 'paper', 'text', 'Links auf Weiß'],
  ['heart-red', 'sand', 'text', 'Links und Outline-Buttons auf Sand'],
  ['heart-red-dark', 'cream', 'text', 'Link-Hover auf Creme'],
  ['heart-red-dark', 'paper', 'text', 'Link-Hover auf Weiß'],
  ['paper', 'heart-red', 'text', 'Primär-Button'],
  ['paper', 'heart-red-dark', 'text', 'Primär-Button Hover'],
  ['cocoa', 'placeholder-bg', 'text', '[PLATZHALTER] (nur Staging)'],
  ['ink-faint', 'cream', 'text', 'Inaktive Sprachauswahl (noch nicht sichtbar)'],
  // Taupe bands
  ['cream', 'taupe', 'text', 'Hero- und CTA-Text, Outline-Button auf Taupe'],
  ['cocoa', 'cream-muted', 'text', 'Heller Button Hover'],
  // Night sections
  ['cream', 'cocoa', 'text', 'Text auf Cocoa; „Demnächst"-Pill'],
  ['cream-muted', 'cocoa', 'text', 'Sekundärtext auf Cocoa'],
  ['cream-faint', 'cocoa', 'text', 'Tracknummern, Dauer, Autor:innen auf Cocoa'],
  ['cream', 'cocoa-2', 'text', 'Player-Leiste, Single-Karten, aktive Trackzeile'],
  ['cream-muted', 'cocoa-2', 'text', 'Credits in Single-Karten, Video-Hinweis mobil'],
  ['cream-faint', 'cocoa-2', 'text', 'Meta in Single-Karten, Dauer in aktiver Trackzeile'],
  ['globe-ochre', 'cocoa', 'text', 'Hinweis „Zum Lied →" im Karten-Tooltip'],
  ['cocoa', 'globe-ochre', 'text', '„Demnächst"-Badge'],
  // Non-text: focus, controls, map
  ['heart-red', 'cream', 'ui', 'Fokusring und Outline-Buttons auf Creme'],
  ['heart-red', 'paper', 'ui', 'Fokusring auf Weiß'],
  ['heart-red', 'sand', 'ui', 'Fokusring auf Sand'],
  ['globe-ochre', 'cocoa', 'ui', 'Fokusring auf Cocoa'],
  ['globe-ochre', 'cocoa-2', 'ui', 'Fortschrittsbalken (Player-Leiste)'],
  ['cream', 'taupe', 'ui', 'Fokusring und Outline-Button auf Taupe'],
  ['cream', 'cocoa', 'ui', 'Rand der Play-Buttons, aktiver Album-Tab'],
  ['cocoa-outline', 'cocoa', 'ui', 'Rand inaktiver Album-Tab, gestrichelter „Erscheint demnächst"-Rahmen'],
  ['cream', 'globe-blue', 'ui', 'Karte: Marker-Ring und äußerer Fokusring auf Meer'],
  ['cocoa', 'globe-ochre', 'ui', 'Karte: innerer Fokusring auf Land'],
  ['heart-red', 'globe-ochre', 'ui', 'Karte: Marker auf Land'],
];

const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
};

const failures: string[] = [];
const rows = pairs.map(([fg, bg, kind, where]) => {
  const f = tokens[fg];
  const b = tokens[bg];
  if (!f || !b) throw new Error(`Unknown token in pair ${fg} / ${bg}`);
  const r = ratio(f, b);
  const need = kind === 'text' ? 4.5 : 3;
  const ok = r >= need;
  if (!ok) failures.push(`${fg} on ${bg}: ${r.toFixed(2)} < ${need}`);
  const aaa = kind === 'text' && r >= 7 ? ' · AAA' : '';
  return `| \`--${fg}\` ${f} | \`--${bg}\` ${b} | ${kind === 'text' ? 'Text' : 'UI'} | ${r.toFixed(2)}:1 | ${need}:1 | ${ok ? `✅ AA${aaa}` : '❌'} | ${where} |`;
});

const forbidden = ratio(tokens['paper']!, tokens['heart-light']!);
const md = `# Kontrast – alle verwendeten Farbpaare

Generiert von \`npm run qa:contrast\` aus \`src/styles/global.css\` (WCAG 2.2: Text ≥ 4,5:1, alle Texte als normale Größe geprüft; UI-Elemente, Fokusringe und Kartenmarker ≥ 3:1).

| Vordergrund | Hintergrund | Art | Kontrast | Mindestens | Ergebnis | Wo |
|---|---|---|---|---|---|---|
${rows.join('\n')}

Nicht verwendet (§6.1): Weiß auf \`--heart-light\` = ${forbidden.toFixed(2)}:1 – deshalb nie Text auf Heart Light; Glyph und Akzente auf Cocoa/Taupe sind dekorativ. Deaktivierte Play-Buttons sind nach WCAG von der Kontrastpflicht ausgenommen. Dekorative Linien (\`--cocoa-line\`, \`--sand\`, \`--taupe-line\`) sind nicht prüfpflichtig.
`;

mkdirSync('docs', { recursive: true });
writeFileSync('docs/contrast.md', md);
console.log(`qa:contrast – ${pairs.length} pairs, ${failures.length} below requirement → docs/contrast.md`);
for (const f of failures) console.log(`  FAIL ${f}`);
if (failures.length) process.exit(1);
