# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: people booking a premium magician for an event, prioritizing **private
exclusive clients** — hosts of high-end private and VIP occasions — followed by
corporate and gala organizers (event agencies and companies). They are evaluating
whether this performer fits a refined, high-stakes occasion and whether he is
credible, bookable and safe to put in front of their guests.

Audiences are served bilingually: **Slovak is the primary language**, English the
international version (he also performs fully in English for clients in Chicago,
Ireland and Norway). A secondary user is the performer's manager, who receives and
answers enquiries.

## Product Purpose

The public site of modern magician **Braňo "Brian" Struk** ("StrukShow"). It exists
to convert a qualified visitor into contact with the act for a specific event.
Success is a booking conversation started — and the site must drive two conversion
paths as **equal** primaries: a submitted enquiry via the contact form and direct
phone/email contact with the booking line. It also presents a video-production
service (`/produkcia`) and a focused premium-show campaign page (`/ponuka`).

## Positioning

A contemporary magician for refined, high-level events rather than children's-party
or stage-gimmick magic. The claim a neighboring act could not truthfully copy: a
track record of hundreds of performances for leading international brands, television
exposure (Czech & Slovak Got Talent), and genuine English-language delivery for
international audiences — presented with control, precision and quiet confidence.

Two performance formats define the offer: a solo **Magic Show** (stage/room
performance) and **Table Hopping** (refined close-up magic moving through guests).

## Operating Context

- Bilingual site: `/sk/...` and `/en/...`, with `/` redirecting by browser language.
- Enquiries are delivered by email to the booking contact; there is no booking
  backend, login or account.
- The act is evaluated largely through video — a self-hosted showreel loop and
  click-to-play YouTube facades carry proof of the live experience.
- The performer and management are based in Trenčín, Slovakia; the act travels
  internationally.

## Capabilities and Constraints

- Static Astro site (static output, no server runtime, no database, no auth).
- Content is data-driven and bilingual, authored in `src/data/` (`content.js` page
  content, `site.js` person/contacts/links/nav, `i18n.js` UI strings). All copy
  exists in both Slovak and English.
- Contact form posts to **FormSubmit** (formsubmit.co), which emails the booking
  address — no API key or backend; the owner must click FormSubmit's one-time
  activation link on first use. Provider is swappable via two URLs in `site.js`.
- **No tracking / no analytics / no third-party ad or marketing scripts** — a
  deliberate privacy stance to preserve.
- Video is loaded as click-to-play YouTube facades (no autoloaded YouTube iframes);
  the production showreel is a self-hosted muted loop.
- Builds for `https://strukshow.com` by default; `SITE_URL` sets absolute
  canonical/sitemap URLs at build time. Requires Node 20+.
- This site lives on the `v3-astro-strukshow` branch and builds at the repo root;
  the unrelated iairu.com portfolio lives on another branch and must stay untouched.

## Brand Commitments

- Name: **StrukShow**. Performer: **Braňo Struk** (English: **Brian Struk**; legal:
  Branislav Struk).
- Booking contact (public): manager@strukshow.com · +421 908 666 921.
- Management/invoicing contact (on `/produkcia`): strukmanagement@gmail.com ·
  +421 908 055 048 · IČO 53 300 858 · DIČ 1126785671, Trenčín.
- Social: YouTube @brianstruk, Instagram @brianstruk.
- Voice: refined, composed, high-class — "control, precision and intelligent
  mystery"; confident without hype. The Slovak and English copy are peers, not
  literal translations of each other (e.g. taglines differ by design), and that
  parallel-not-mirrored voice should be preserved.
- Privacy-first, no-tracking commitment (see Capabilities).

## Evidence on Hand

Confirmed genuine and verified — future work may feature these freely but must not
alter the numbers, brand names or quotes:

- Stats: **10,000 viewers a year**, **2.5M online views**, **10+ years on stage**
  (plus a playful "vanished guests = ?" stat kept from the original).
- Brand references with logos in `public/media/` (`ref-*.png`): Česko Slovensko má
  talent, Red Bull, Dell, Crowne Plaza, Danfoss, Hotel Panorama, STV1 HD, Grape
  Festival, Ginoo, and others. Bio also cites Hilton.
- Television exposure: Czech & Slovak **Got Talent** (Česko Slovensko má talent).
- International English-language performances: Chicago, Ireland, Norway.
- Seven client testimonials (`content.js`), genuine but published **without named
  authors** — keep them unattributed; do not invent names, companies or ratings.
- Image galleries and photography in `public/media/` (show, Got Talent, Los Angeles
  shoot, card magic, audience interaction), plus a self-hosted showreel video and
  linked YouTube videos.

## Product Principles

1. **Proof over persuasion.** The brands, numbers, television and video evidence are
   real and do the convincing — lead with them honestly; never embellish or fabricate.
2. **Serve the private-exclusive client first.** When a trade-off arises, optimize for
   the high-end, discreet booker; corporate/gala and international needs follow.
3. **Two conversions, equal weight.** Make both the enquiry form and direct
   phone/email obvious and friction-free on every relevant surface.
4. **Bilingual peers.** Slovak and English are first-class and parallel in voice, not
   one translated from the other; neither language is a second-class afterthought.
5. **Privacy is a feature.** Keep the site tracker-free and dependency-light; proof
   lives in self-hosted and click-to-play media, not embedded surveillance.
