# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: peers and curious makers, meaning developers, 3D artists, electronics hobbyists and other builders who arrive from GitHub, a shared link or search, and browse to see what Ondrej "iairu" Špánik has made and how. They read in English or Slovak and care about how things work, not just how they look.

Secondary audiences (prospective clients, employers) are served by the same material: the quick-start presets ("I need a website or app", "I want a real object built", …) remain, but they are not the main design target.

## Product Purpose

A personal portfolio and notebook for one person whose focus moves with the problem: prompt engineering and AI, classic software, electronics and making, 3D and animation, graphic design and illustration, systems and security. It exists to show the range and depth of finished work in one place, replacing the old Svelte/Sapper site and merging in the old graphic-design portfolio (`/gfx`).

Success for a visit, in order:
1. **The visitor digs into a project.** They open a detail page, a repository, or a write-up.
2. **The visitor makes contact.** Email, Messenger or LinkedIn.

## Positioning

"The challenge picks the craft. I finish it." One person takes a challenge at a time, goes deep until it works, and crosses disciplines (prompt → code → model → circuit → object) to get there. The proof is shipped, working objects such as Nightjar, where code, electronics and 3D models meet in one physical thing. A single-discipline portfolio couldn't honestly make that claim.

## Operating Context

- Visitors land on `/` (redirected by browser language) or deep-link into `/en/...` and `/sk/...`.
- The project list is ordered by GitHub stars (snapshot in `src/data/repos.json`, refreshed with `npm run sync:repos`) and filtered on the client by field, interest, preset and starred, with filter state kept in the URL.
- Project detail pages link to the GitHub repo and live sites where they exist.
- Write-ups (`src/content/docs/`) mix technical notes (iptables, IPv4 calc, AHK), a thesis, recipes and a Balkan travel log. Each is written in one language, and a note says so.
- Art & 3D has its own section; a three.js hero viewer shows the Nightjar STL models (lazy-loaded).
- Site search runs from a static `search.json` per language.

## Capabilities and Constraints

- **Static output only.** Astro static build. No server runtime, **no tracking, no analytics, no cookies.**
- **EN + SK parity.** Every page and UI string ships in both languages (`src/data/i18n.js`, bilingual fields in `projects.js` / `site.js`). Write-ups are the exception: each exists in one language and is labelled.
- **Legacy URLs must keep resolving.** Old Sapper and `/gfx` routes are redirected in `astro.config.mjs`; static legacy content stays at its old paths (`public/dl`, `public/gfx/dl`, `public/dbs`, `public/strukshow-docs`, `public/_dev`).
- Content is data-driven: projects in `src/data/projects.js` (fields and interests keyed from `site.js`), and adding an entry updates the portfolio, detail page, sitemap and filters.
- Terminology: **fields** = disciplines of expertise (ai, software, hardware, art3d, design, systems); **interests** = what a visitor is looking for (web, automation, maker, visual, brand, data, infra, games, audio, learning); **presets** = one-click filter combinations.

## Brand Commitments

- Name and handle: Ondrej "iairu" Špánik, pronounced "Andrei". "iairu" is read as "i air you".
- Role line: "Prompt engineer · maker · one challenge at a time" (SK: "Prompt inžinier · maker · jedna výzva naraz").
- Voice: first person, plain and direct, slightly wry; it states what works and why rather than selling. The SK copy uses informal "ty".
- Existing iairu logo (`src/components/Logo.astro`, `public/img/brand`).

## Evidence on Hand

- 56 real projects with GitHub star/language snapshots (`src/data/projects.js`, `src/data/repos.json`, `src/data/repo-images.json`).
- Project, art and repo imagery in `public/img/projects`, `public/img/art`, `public/img/repos`.
- Nightjar 3D models (`public/models/*.stl`) and the live product at nightjar.gift / knifes.nightjar.gift.
- 32 write-up files (16 topics × language variants) in `src/content/docs/`.
- Bio photo (`public/img/bio.png`, `public/img/newpic1.jpg`), Montaigne content (`src/data/montaigne.json`).
- **Absent:** no testimonials, client quotes, pricing or availability statements. Future work must not invent them.

## Product Principles

1. **Work first, claims second.** Every assertion about range should point to a real project a visitor can open.
2. **Reward curiosity.** Make it easy to go one level deeper: from card to detail page to repo or write-up.
3. **Range without dilution.** Disciplines are chapters of one practice, not separate storefronts; a visitor following one field should still sense the whole.
4. **Equal in both languages.** Slovak is never a lesser translation.
5. **Durable and honest.** Static, private by default, and old links never break.
