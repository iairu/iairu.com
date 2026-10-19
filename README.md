## StrukShow (v3-astro-strukshow)

Website of **Braňo "Brian" Struk**, a modern magician — rewritten in [Astro](https://astro.build)
(static output) on this branch of the repository. Bilingual (Slovak default, English),
dark/luxury design with a single gold accent, no tracking. It replaces the previous
Svelte + CockpitCMS single-page app; all content was carried over from the live site.

> This branch builds the StrukShow site at the root. The iairu.com portfolio lives on the
> `v3-astro` branch and is untouched there.

```bash
npm install
npm run dev      # dev server
npm run build    # static site -> dist/
npm run preview
```

Needs Node 20+. Set `SITE_URL` at build time for absolute canonical / sitemap URLs
(default `https://strukshow.com`).

### Where things live

| What | Where |
|---|---|
| Person, contacts (booking + management), social links, menu | `src/data/site.js` |
| All page content, bilingual (home / production / offer) | `src/data/content.js` |
| UI strings, 404 text, language list | `src/data/i18n.js` |
| Design tokens (colours, type, spacing) | `src/styles/global.css` |
| Layout shell (head, fonts, lightbox, reveal) | `src/layouts/Base.astro` |
| Section & UI components | `src/components/*` |
| Pages (`/sk/...` and `/en/...`; `/` redirects by browser language) | `src/pages/*` |
| Images, logos, icons, showreel video | `public/media/` |

### Pages

- `/[lang]/` — home: hero, stats, references, about, two show formats, gallery,
  video, testimonials, booking.
- `/[lang]/produkcia/` — video production service, process and manager contact.
- `/[lang]/ponuka/` — focused "premium show" campaign landing page.

### Content & fonts

Text is taken from the original CockpitCMS content and lightly cleaned up; the English for
the `/ponuka` page was translated for this rewrite (the original was Slovak only). Headings
use **Cormorant Garamond**, body copy **Inter**, both from Google Fonts. Videos are loaded as
click-to-play YouTube facades; the production showreel is a self-hosted muted loop.
