# Heart Tones – hearttones.net

Static Astro site for Philipp von Rothkirch's "Heart Tones" (Lullabies From Around The World, Berlin Peace Collective, production services). Built and maintained by Hot Milk Digital.

Build rules, content rules and decisions: **[CLAUDE.md](CLAUDE.md)** – read it before changing anything.

## Requirements

- Node 24 LTS (see `.nvmrc`; Astro 7 needs ≥ 22.23.4)
- npm

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at http://localhost:4323 (fixed port; 4321/4322 belong to other projects) |
| `npm run check` | Type-check `.astro` and `.ts` files |
| `npm run build` | Type-check, then build the static site into `dist/` – must pass without warnings |
| `npm run preview` | Serve the built `dist/` locally |

## Environments

| | `PUBLIC_INDEXABLE` | Behaviour |
|---|---|---|
| Local / staging | unset | `noindex`, all rights-gated content renders for review |
| Production | `true` | indexable; uncleared items (covers, audio) render their fallbacks |

Rights flags live in `src/data/site.ts` (CLAUDE.md §9). Copy `.env.example` to `.env` to try production behaviour locally.

## Structure

```
src/
  data/      routes.ts (all URLs), site.ts (business data, rights flags, funding notice),
             albums/people/countries/roles/singles/press.ts (content; checked by scripts/check-data.ts)
  styles/    global.css (design tokens, type scale), fonts.css (self-hosted Literata + Nunito)
  pages/     index.astro (home) and [...page].astro, which builds every other URL from routes.ts
  views/     one component per page (AlbumView, SinglesView, …)
  components/ shared UI (Section, Cover, AudioPlayer, CreditList, Placeholder, …)
public/      static files served as-is (audio goes to public/audio/)
```

Source material (brief, assets, design) lives next to this repo in `../01_Brief`, `../02_Assets`, `../03_Design` and is not committed.
