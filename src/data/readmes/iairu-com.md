## iairu.com v3

Portfolio of Ondrej "iairu" Špánik, prompt engineer and 3D artist who bridges classic programming, electronics and 3D models into working objects.
Built with [Astro](https://astro.build) (static output), English and Slovak, no tracking. It replaces the Svelte + Sapper site and merges the old graphic design portfolio (`/gfx`) into it.

```bash
npm install
npm run dev          # dev server
npm run build        # static site -> dist/
npm run preview
npm run sync:repos   # refresh the GitHub snapshot (stars, languages) in src/data/repos.json
```

Needs Node 20+. Set `SITE_URL` at build time for absolute canonical / sitemap URLs (default `https://iairu.com`).

### Where things live

| What | Where |
|---|---|
| Every project (bilingual text, fields, interests, links) | `src/data/projects.js` |
| GitHub numbers snapshot (stars decide the order) | `src/data/repos.json`, from `npm run sync:repos` |
| Fields of expertise, areas of interest, quick-start presets, menu | `src/data/site.js` |
| UI strings, 404 text | `src/data/i18n.js` |
| Write-ups (markdown, one language each: `en_` / `sk_` prefix) | `src/content/docs/` |
| Portfolio filters (client side, state kept in the URL) | `src/pages/[lang]/projects/index.astro`, `src/scripts/finder.ts` |
| Pages | `src/pages/[lang]/*` (`/en/...` and `/sk/...`); `/` redirects by browser language |
| Hero 3D viewer (three.js, lazy loaded) | `src/components/Viewer.astro`, models in `public/models` |
| Old static content kept at its old URLs | `public/dl`, `public/gfx/dl`, `public/dbs`, `public/strukshow-docs`, `public/_dev` |

### Adding a project

Add an entry to `raw` in `src/data/projects.js`. Give it `repo` (a name from `repos.json`) to inherit stars, language and date, or set `year` and `lang` by hand for work outside GitHub. Pick `fields` and `interests` keys from `site.js`. The portfolio, the detail page, the sitemap and the filters pick it up on the next build.

Old Sapper and `/gfx` URLs are redirected in `astro.config.mjs`.
