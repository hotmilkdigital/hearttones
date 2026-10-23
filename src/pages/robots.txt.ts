/**
 * robots.txt (CLAUDE.md §8.7, §10). Production: everything allowed, including AI crawlers
 * (no special rules unless Robert says otherwise), plus the sitemap. Staging: disallow all –
 * staging is also password-protected and sends noindex.
 */
import type { APIRoute } from 'astro';
import { isIndexable } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  const body = isIndexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Staging – not for indexing\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
