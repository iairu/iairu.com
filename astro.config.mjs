import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://iairu.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', sk: 'sk' } },
    }),
  ],
  // URLs of the previous Sapper site and the old static graphic-design portfolio
  redirects: {
    '/en/dev': '/en/projects/',
    '/sk/dev': '/sk/projects/',
    '/en/links': '/en/contact/',
    '/sk/links': '/sk/contact/',
    '/en/archive': '/en/projects/',
    '/sk/archive': '/sk/projects/',
    '/en/dev/iptables-portforward': '/en/docs/iptables-portforward/',
    '/sk/dev/ahk': '/sk/docs/ahk/',
    '/sk/dev/ipv4-calc': '/sk/docs/ipv4-calc/',
    '/sk/dev/log': '/sk/docs/log/',
    '/en/dev/save-the-princess': '/en/projects/save-the-princess/',
    '/sk/dev/save-the-princess': '/sk/projects/save-the-princess/',
    '/en/art/comics': '/en/projects/comics/',
    '/sk/art/komixy': '/sk/projects/comics/',
    '/gfx': '/sk/art/',
    '/gfx/en': '/en/art/',
    '/zrada': '/sk/projects/zrada/',
    '/gfx/zrada': '/sk/projects/zrada/',
    '/gfx/en/treason': '/en/projects/zrada/',
  },
});
