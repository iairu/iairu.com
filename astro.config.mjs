import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://strukshow.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'sk', locales: { sk: 'sk', en: 'en' } },
      // Drop the bare "/" language gateway (a client-side redirect, not a real page).
      filter: (page) => page !== `${site}/`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  // Keep legacy flat URLs working after the Astro rewrite ('/' is handled by the
  // language gateway in src/pages/index.astro).
  redirects: {
    '/produkcia': '/sk/produkcia/',
    '/ponuka': '/sk/ponuka/',
  },
});
