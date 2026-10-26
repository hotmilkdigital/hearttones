// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { enPublished, routes } from './src/data/routes.ts';

const SITE = 'https://hearttones.net';

// hreflang pairs for the sitemap from routes.ts – DE and EN slugs differ (/musik/ ↔ /en/music/), so the
// plugin's own i18n option (same path after the locale prefix) cannot pair them. Only once EN is published.
const alternates = new Map(
  Object.values(routes).flatMap((r) => {
    const links = [
      { lang: 'de-DE', url: new URL(r.de, SITE).href },
      { lang: 'en-GB', url: new URL(r.en, SITE).href },
      { lang: 'x-default', url: new URL(r.de, SITE).href },
    ];
    return [
      [links[0].url, links],
      [links[1].url, links],
    ];
  }),
);

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  // DE at the root, EN under /en/ (CLAUDE.md §4). EN pages follow after Philipp approves the German copy.
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      serialize(item) {
        const links = enPublished ? alternates.get(item.url) : undefined;
        return links ? { ...item, links } : item;
      },
    }),
  ],
  // Inline all CSS (~8 KB gzipped per page): no render-blocking stylesheet requests (Lighthouse, mobile).
  build: {
    inlineStylesheets: 'always',
  },
  // 4321/4322 belong to other client projects. strictPort makes dev fail instead of drifting to another port.
  server: {
    port: 4323,
  },
  vite: {
    server: {
      strictPort: true,
    },
  },
});
