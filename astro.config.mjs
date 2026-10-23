// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://hearttones.net',
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
  integrations: [sitemap()],
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
