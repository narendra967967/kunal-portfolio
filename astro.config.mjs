// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Placeholder until Kunal's domain is chosen; set it here or with SITE_URL / BASE_PATH.
const SITE = process.env.SITE_URL ?? 'https://kunal-portfolio.example';
const BASE = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  // Inline CSS (about 8 KB gzipped per page) so nothing blocks the first paint.
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      lastmod: new Date(), // build date, so search engines know when to re-crawl
    }),
  ],
});
