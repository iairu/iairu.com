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
    }),
  ],
  // Keep legacy flat URLs working after the Astro rewrite ('/' is handled by the
  // language gateway in src/pages/index.astro).
  redirects: {
    '/produkcia': '/sk/produkcia/',
    '/ponuka': '/sk/ponuka/',
  },
});
