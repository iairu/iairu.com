---
name: StrukShow
description: A near-black, single-gold evening world for a modern magician — a delicate high-contrast serif over a quiet grotesque, dark by design.
colors:
  bench-night: "#0a0a0c"
  bench-panel: "#101014"
  bench-inset: "#17171d"
  bench-raise: "#1f1f27"
  ivory-ink: "#f4f0e7"
  soft-ink: "#b4afa3"
  mute-ink: "#938d82"
  hairline: "#26262e"
  hairline-strong: "#34343f"
  gold: "#d1a645"
  gold-bright: "#ecc677"
  gold-deep: "#a07c2c"
  on-gold: "#0a0a0c"
  error: "#e8a08f"
typography:
  display:
    fontFamily: "Cormorant, Cormorant Garamond, EB Garamond, Georgia, serif"
    fontSize: "clamp(2.75rem, 1.6rem + 5.4vw, 5.8rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "normal"
  headline:
    fontFamily: "Cormorant, Cormorant Garamond, EB Garamond, Georgia, serif"
    fontSize: "clamp(1.9rem, 1.35rem + 2.5vw, 3.2rem)"
    fontWeight: 600
    lineHeight: 1.08
  title:
    fontFamily: "Cormorant, Cormorant Garamond, EB Garamond, Georgia, serif"
    fontSize: "clamp(1.35rem, 1.05rem + 1.1vw, 1.9rem)"
    fontWeight: 600
    lineHeight: 1.1
  lead:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.12rem, 1.02rem + 0.5vw, 1.4rem)"
    fontWeight: 300
    lineHeight: 1.6
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.25vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0.005em"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.28em"
rounded:
  sm: "2px"
  md: "3px"
spacing:
  gutter: "clamp(18px, 5vw, 56px)"
  section: "clamp(3.5rem, 8vw, 7.5rem)"
  section-sm: "clamp(2.5rem, 5vw, 4rem)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.sm}"
    padding: "0.85em 1.7em"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
    textColor: "{colors.on-gold}"
    rounded: "{rounded.sm}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ivory-ink}"
    rounded: "{rounded.sm}"
    padding: "0.85em 1.7em"
    height: "52px"
  input:
    backgroundColor: "{colors.bench-inset}"
    textColor: "{colors.ivory-ink}"
    rounded: "{rounded.md}"
    padding: "0.8em 0.9em"
  nav-link:
    textColor: "{colors.soft-ink}"
    typography: "{typography.label}"
---

# Design System: StrukShow

## Overview

**Creative North Star: "The Midnight Gala"**

StrukShow is a black-tie room after dark. The lights are down, the conversation is
hushed, and a single source of gold — a glint of gilt on an invitation, candlelight
caught on a glass — is the only warmth in the frame. This is a world of refined
luxury and discretion, not spectacle: the restraint is the point. A premium modern
magician performing for private, exclusive and corporate galas is credible here
precisely because the design never shouts.

The surfaces are near-black and tonally layered (five steps from `#0a0a0c` up to
`#1f1f27`), so depth comes from quiet contrast rather than shadow. The ink is a warm
ivory, never pure white, as if printed on heavy cream stock. Type carries the drama:
**Cormorant**, a delicate high-contrast Garamond-didone display serif, sets every
heading like engraved gala stationery, while **Manrope**, a clean geometric-humanist
grotesque, keeps everything functional calm and legible underneath. A single gold
accent (`#d1a645`) does all the persuading — it is the invitation's gilt edge, used
sparingly so each appearance reads as deliberate.

The site is **dark only, by design** — there is no light theme to serve. Two thin,
gold-tinted vertical rails frame the content column across the whole page, with the
margins beyond them a shade darker, so the eye is seated in the room like a stage
framed by its proscenium.

**Key Characteristics:**
- Near-black tonal depth; no bright surfaces, no pure white, no light mode.
- One gold accent, used rarely and always on purpose.
- Theatrical didone headlines over a quiet grotesque body.
- Framed composition: twin gold rails and darker margins as a proscenium.
- Composed, luxurious, discreet — persuasion through restraint.

## Colors

A near-monochrome evening palette: five near-black tonal surfaces, a three-step warm
ivory ink ramp, and a single gold family that carries every accent.

### Primary
- **Gold** (`#d1a645`): the one accent. Primary buttons, eyebrow labels, the rail
  tint, focus rings, selection, and the hairline glow on lifted cards. It is the
  gilt edge of the invitation — the whole mood turns on using it sparingly.
- **Gold Bright** (`#ecc677`): link text at rest and the hover state of gold
  surfaces — a lift toward candlelight on interaction.
- **Gold Deep** (`#a07c2c`): the low end of the gold ramp, for gradients and pressed
  or recessed gold moments.

### Neutral
- **Bench Night** (`#0a0a0c`): the page background and the room itself; also the
  text color that sits *on* gold (`on-gold`).
- **Bench Panel** (`#101014`): banded sections, panels and the footer — the first
  step of tonal lift off the page.
- **Bench Inset** (`#17171d`): recessed wells — form inputs and inset surfaces.
- **Bench Raise** (`#1f1f27`): the highest resting surface, for raised cards.
- **Ivory Ink** (`#f4f0e7`): headings and primary body copy — warm cream, never
  `#fff`.
- **Soft Ink** (`#b4afa3`): leads, secondary copy and resting navigation.
- **Mute Ink** (`#938d82`): placeholders, captions and the faintest meta text —
  lifted to clear a 4.5:1 contrast floor on near-black.
- **Hairline** (`#26262e`) / **Hairline Strong** (`#34343f`): dividers, band edges
  and control outlines.

### Feedback
- **Error** (`#e8a08f`): the single non-gold signal — a warm muted coral for form
  error messages, readable on near-black. Reserved for genuine error feedback; it is
  not a decorative accent and never competes with gold.

### Named Rules
**The One Candle Rule.** Gold is the only accent and appears on a small fraction of
any screen — a label, a button, a hairline, a rail. If a second accent hue or a
flood of gold shows up, the room stops reading as candlelit and the illusion breaks.

**The No-White Rule.** The brightest ink is warm ivory (`#f4f0e7`) and the darkest
surface is near-black (`#0a0a0c`). Never introduce pure `#ffffff` or a light surface;
there is no light theme and nothing earns one.

## Typography

**Display Font:** Cormorant (variable 300–700, with italics; fallback Cormorant Garamond, EB Garamond, Georgia, serif)
**Body Font:** Manrope (variable 300–800; fallback system-ui, sans-serif)

**Character:** A delicate high-contrast display serif against a quiet, humanist
grotesque. Cormorant's thin-to-hairline stroke contrast and aristocratic proportions
give every heading the engraved feel of gala stationery; Manrope recedes into calm,
even, readable service copy so the serif keeps all the voice. Headings hold 600
weight — thin Cormorant cuts would lose their hairlines on the near-black surface.

### Hierarchy
- **Display** (Cormorant 600, `clamp(2.75rem…5.8rem)`, lh 1.08, tracking normal):
  page H1 / hero titles. Balanced wrap; tight and tall.
- **Headline** (Cormorant 600, `clamp(1.9rem…3.2rem)`): section H2s.
- **Title** (Cormorant 600, `clamp(1.35rem…1.9rem)`): card and sub-section H3s.
- **Lead** (Manrope 300, `clamp(1.12rem…1.4rem)`, lh 1.6, soft ink, max 56ch):
  the intro sentence under a heading — light weight for an airy, spoken tone.
- **Body** (Manrope 400, `clamp(1rem…1.12rem)`, lh 1.65, tracking 0.005em):
  running copy.
- **Label** (Manrope 600, 0.78rem, tracking 0.28em, UPPERCASE, gold): the small-caps
  gold label — used **standalone** to title a headingless section (e.g. the "Trusted
  by" logo wall), never as a kicker above a heading. Buttons and nav links share this
  uppercase, wide-tracked grotesque treatment at 0.82rem with slightly tighter
  tracking (0.10–0.14em).

### Named Rules
**The Marquee Rule.** All display type is Cormorant; the grotesque never sizes up to
headline scale. Drama lives in the serif, order lives in the sans — don't blur the
two.

**The Bare Heading Rule.** Headings stand on their own. No kicker or eyebrow label
sits above a heading; the Cormorant heading carries its own weight. The gold label
survives only to title a section that has no heading of its own.

## Layout

A centered single column on a framed field. Content lives in `--maxw` 1180px (`.wrap`)
with a `--wide` 1360px variant (`.wrap-wide`) and a 760px reading measure (`.narrow`),
all gutter-clamped (`clamp(18px, 5vw, 56px)`). Sections breathe on a generous vertical
rhythm (`clamp(3.5rem, 8vw, 7.5rem)`, with a compact `section-sm` variant). Banded
sections (`.band`) step up to Bench Panel with a hairline top and bottom.

Two fixed gold-tinted **vertical rails** frame the content column across the entire
page (drawn as a `body::after` overlay above content, below the header/dialogs), with
the margins beyond them shaded darker (`rgb(0 0 0 / 0.42)`) — the proscenium that
seats the whole site. The fixed header is 74px (`--hdr`), transparent at the top and
resolving to an 82%-opaque near-black with `blur(14px) saturate(1.2)` once scrolled.
The page never scrolls horizontally (`overflow-x: clip`), and long unbroken strings
wrap rather than widen it.

## Elevation & Depth

**Tonal, not shadowed.** Depth is built almost entirely from the five-step near-black
surface ramp (Night → Panel → Inset → Raise) plus hairline borders; surfaces are flat
at rest. The two shadow tokens that exist are deep and diffuse — ambient, not
structural — used to float the hero image and lightbox off the room, never to emboss a
button.

### Shadow Vocabulary
- **Ambient Drop** (`box-shadow: 0 30px 70px -40px rgb(0 0 0 / 0.9)`): large media and
  floated panels resting above the page.
- **Gold Lift** (`box-shadow: 0 0 0 1px color-mix(in srgb, gold 30%, transparent), 0 24px 60px -30px rgb(0 0 0 / 0.8)`):
  the signature hover for feature cards — a thin gold ring plus a deep diffuse drop,
  as if a spotlight found the card.

### Named Rules
**The Flat-Room Rule.** Surfaces are flat at rest; lift (the Gold Lift ring) appears
only as a response to hover or focus. Never pre-emboss resting UI with shadow.

## Shapes

Near-square corners throughout — the engraved, printed register of the high-contrast
serif world.
Buttons and chips use a 2px radius (`--rounded.sm`); inputs a 3px radius
(`--rounded.md`). Structure is drawn with **hairlines**, not fills: 1px borders in
Hairline / Hairline Strong, gradient rules that fade to transparent at both ends
(`.rule`), and the eyebrow's short gold gradient tick. No pill shapes, no heavy
rounding, no decorative blobs — the geometry stays crisp and theatrical.

## Components

### Buttons
- **Shape:** near-square (2px radius), min-height 52px, uppercase Hanken Grotesk 600
  at 0.82rem with 0.14em tracking; an optional inline icon nudges `translateX(3px)`
  on hover.
- **Primary:** solid Gold on near-black ink (`on-gold`), 0.85em × 1.7em padding.
- **Hover / Focus:** background lifts to Gold Bright, the whole button rises
  `translateY(-2px)`; focus-visible draws a 2px gold outline offset 3px.
- **Ghost:** transparent with a Hairline Strong border and ivory text; on hover the
  fill becomes a faint gold tint, text goes Gold Bright and the border goes Gold.
- **Small (`.sm`):** 42px min-height, 0.74rem.

### Inputs / Fields
- **Style:** Bench Inset fill, 1px Hairline Strong border, 3px radius, 0.8em × 0.9em
  padding; labels are uppercase Soft Ink micro-caps (0.72rem, 0.12em tracking) stacked
  above the field. Placeholders are Mute Ink.
- **Focus:** no outline — the border shifts to Gold and the fill darkens
  (`color-mix(bench-inset 70%, #000)`), a quiet "you're here" without a glow.
- **Textarea:** vertical resize only, min-height 120px.

### Navigation
- **Style:** fixed 74px bar, transparent over the hero, resolving to 82%-opaque
  near-black with backdrop blur + saturate once scrolled, under a Hairline bottom
  border. Links are uppercase Soft Ink grotesque (0.82rem, 0.10em tracking) that
  brighten to Ivory Ink on hover. White SVG wordmark at 26px tall.
- **Mobile:** a 48px menu button reveals a full-width near-black blurred panel that
  slides from under the header; each item is a full-width row divided by hairlines.

### Signature — Standalone Gold Label
A small uppercase gold label (0.78rem, 0.28em tracking), optionally preceded by a
2.2em gold gradient tick that fades in from transparent. It is used **standalone** to
title a section that carries no heading — the "Trusted by" logo wall is the canonical
case — and is never stacked as a kicker above a heading.

### Signature — Content Rails
The twin fixed gold-tinted vertical rails + darker margins (see Layout) are a
page-level signature, not a per-component one. New full-bleed surfaces must respect
them: nothing should visually collide with or redraw the rails.

## Do's and Don'ts

### Do:
- **Do** let each heading stand on its own, set in Cormorant, with no kicker or
  eyebrow label above it (The Bare Heading Rule).
- **Do** keep gold to a small fraction of any screen (The One Candle Rule) — a label,
  a button, a hairline, the rails.
- **Do** build depth from the near-black tonal ramp and hairlines; reserve the two
  shadows for floated media and the Gold Lift hover.
- **Do** keep headings in Cormorant and functional copy in Manrope; let the serif
  carry the drama.
- **Do** keep corners near-square (2–3px) and draw structure with 1px hairlines.
- **Do** honor dark-only: warm ivory is the brightest ink, near-black the darkest
  surface.

### Don't:
- **Don't** introduce a second accent hue or flood the page with gold.
- **Don't** use pure `#ffffff` or any light surface, and don't add a light theme.
- **Don't** size the grotesque up to headline scale or set a heading in the sans.
- **Don't** pre-emboss resting UI with shadow or add pill shapes, heavy rounding, or
  decorative blobs.
- **Don't** let any element collide with or redraw the twin content rails.
- **Don't** place a kicker or eyebrow label above a heading; the heading carries its
  own weight.
- **Don't** set display headings or hero accent words in italic; keep Cormorant
  display roman (italic stays for inline emphasis and pull-quotes only).
