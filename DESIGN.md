---
name: iairu.com
description: The Night Workbench — one dark blueprint bench where wireframe and circuit trace share the same sheet.
colors:
  bench-black: "#0a0f14"
  bench-panel: "#0f171f"
  bench-inset: "#15212b"
  chalk-ink: "#e9eff3"
  pencil-grey: "#9fb1bd"
  grid-rule: "#243542"
  grid-rule-strong: "#35505f"
  wireframe-cyan: "#3fe0d0"
  trace-copper: "#ff9a52"
  render-pink: "#ff74b8"
  prompt-violet: "#b199ff"
  ink-lime: "#bde75e"
  signal-amber: "#ffcf5a"
  on-accent: "#06100f"
  focus-blue: "#8fd0ff"
  paper-bench: "#f4f2ea"
  paper-panel: "#ebe8dc"
  paper-inset: "#e0dccd"
  paper-ink: "#121c24"
  paper-pencil: "#4b5b66"
  paper-rule: "#cfcab8"
  paper-rule-strong: "#a9a38c"
  wireframe-cyan-paper: "#007a70"
  trace-copper-paper: "#b2500c"
  render-pink-paper: "#b8216f"
  prompt-violet-paper: "#5a3fc4"
  ink-lime-paper: "#4c6e00"
  signal-amber-paper: "#8a6200"
  focus-blue-paper: "#0b57b8"
typography:
  display:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 5vw, 5.2rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 1.3rem + 2vw, 2.8rem)"
    fontWeight: 640
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.05rem + .5vw, 1.45rem)"
    fontWeight: 640
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.05rem + .5vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Bricolage Grotesque Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1rem, .96rem + .2vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: ".74rem"
    fontWeight: 500
    letterSpacing: "0.16em"
  mono-ui:
    fontFamily: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: ".82rem"
    fontWeight: 500
    letterSpacing: "0.03em"
rounded:
  none: "0px"
  part: "2px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  grid-gap: "clamp(1rem, 2vw, 1.5rem)"
  section: "clamp(3rem, 7vw, 6.5rem)"
  grid-cell: "48px"
  container: "1200px"
  reading: "780px"
  header: "64px"
components:
  button-default:
    backgroundColor: "{colors.chalk-ink}"
    textColor: "{colors.bench-black}"
    typography: "{typography.mono-ui}"
    rounded: "{rounded.part}"
    padding: ".85em 1.3em"
    height: "46px"
  button-primary:
    backgroundColor: "{colors.wireframe-cyan}"
    textColor: "{colors.on-accent}"
    typography: "{typography.mono-ui}"
    rounded: "{rounded.part}"
    padding: ".85em 1.3em"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.chalk-ink}"
    typography: "{typography.mono-ui}"
    rounded: "{rounded.part}"
    padding: ".85em 1.3em"
    height: "46px"
  button-sm:
    rounded: "{rounded.part}"
    padding: ".6em .9em"
    height: "38px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.pencil-grey}"
    rounded: "{rounded.part}"
    padding: ".42em .65em"
  chip:
    backgroundColor: "{colors.bench-black}"
    textColor: "{colors.chalk-ink}"
    typography: "{typography.mono-ui}"
    rounded: "{rounded.part}"
    padding: ".4em .7em"
    height: "36px"
  chip-selected:
    backgroundColor: "{colors.wireframe-cyan}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.part}"
  card:
    backgroundColor: "{colors.bench-panel}"
    textColor: "{colors.chalk-ink}"
    rounded: "{rounded.none}"
    padding: "1rem 1.1rem 1.2rem"
  input-field:
    backgroundColor: "{colors.bench-black}"
    textColor: "{colors.chalk-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.part}"
    padding: ".6rem .8rem"
    height: "44px"
  nav-link:
    textColor: "{colors.pencil-grey}"
    typography: "{typography.mono-ui}"
    padding: ".5rem .85rem"
  nav-link-active:
    textColor: "{colors.chalk-ink}"
  lang-switch-active:
    backgroundColor: "{colors.wireframe-cyan}"
    textColor: "{colors.on-accent}"
    padding: ".45rem .55rem"
---

# Design System: iairu.com

## Overview

**Creative North Star: "The Night Workbench"**

It's late, the room is dark, and everything is laid out on one bench: a 3D model's wireframe, a half-routed circuit board, a sketch, a terminal. The whole site is that bench. The page itself is a near-black surface ruled with a faint 48px drafting grid. Above it a star-field sky (one of six generated pictures, picked at random per visit) fades down into the work. Every discipline gets drawn on the same sheet, in the same squared, labelled hand, so a recipe, a PCB and a Blender render all read as parts of one practice rather than separate storefronts.

The character is **technical and playful**: blueprint rigour first (mono labels, exact rules, 2px corners, numbered steps), with small physical surprises on top. A button jumps up-left and leaves a copper shadow behind it, a card's colour bar runs across its whole top edge on hover, and the hero icosahedron is half wireframe, half PCB trace. Colour is functional: two signature accents name the two halves of the work (wireframe vs. wiring), and six field colours tag which discipline a thing belongs to. Density is moderate. Sections breathe (up to 6.5rem of block padding), but cards, filters and meta lines are compact and dense with mono detail, like labels on parts bins.

Dark is the native theme. Light is a full first-class counterpart: the bench becomes warm drafting paper, the sky turns sepia, and every accent drops to a deep ink tone that passes contrast on paper. Neither theme is an inversion of the other; both are tuned by hand.

**Key Characteristics:**
- Near-black bench with a 48px drafting grid and a random star-field sky that fades out downwards.
- Two signature accents, Wireframe Cyan and Trace Copper, plus six field colours applied through a single `--c` hook.
- Bricolage Grotesque for voice, IBM Plex Mono for every label, meta line, control and number.
- Squared parts: 2px corners on controls, 0 on cards and panels.
- Hard offset shadows and growing accent bars instead of soft lifts.
- Hand-tuned dark (default) and paper-light themes.

## Colors

The palette is a dark bench lit by two working colours: cyan for what's drawn and copper for what's wired. Six discipline colours act as coloured pencils, one per field.

### Primary
- **Wireframe Cyan** (`wireframe-cyan`; paper: `wireframe-cyan-paper`): the "drawn" half. Used for links, primary buttons, the active language switch, selected chips, text selection, the search focus underline, the projects filter panel's top rule, and the Software & web field. It is the default `--c` for any component that has no field.
- **Trace Copper** (`trace-copper`; paper: `trace-copper-paper`): the "wired" half and the system's structural voice. Used for eyebrows and section labels, the active-nav underline, breadcrumb separators, the button hover shadow, the viewer's corner brackets, `pre` left rules, search result kinds, remarks and notices, and the Electronics & making field.

### Secondary (field pencils)
Each field of expertise owns one colour, assigned through the `.c-{name}` → `--c` hook. They appear on card top bars, tag outlines, chip selection, pipeline step bars and field counts, never as page backgrounds.
- **Prompt Violet** (`prompt-violet`): Prompt engineering & AI.
- **Render Pink** (`render-pink`): 3D & animation.
- **Ink Lime** (`ink-lime`): Graphic design & illustration.
- **Signal Amber** (`signal-amber`): Systems, network & security; also GitHub stars (★) and the language filter.
- Cyan and Copper double as the Software and Electronics pencils.

### Neutral
- **Bench Black** (`bench-black`; paper: `paper-bench`): page background, input and chip fill, mobile nav sheet, dialog body.
- **Bench Panel** (`bench-panel`; paper: `paper-panel`): raised working surfaces such as cards, the filter panel, `.band` sections, the footer, pipeline cells, `pre` blocks.
- **Bench Inset** (`bench-inset`; paper: `paper-inset`): recessed wells such as card media placeholders, inline `code`, table heads, the selected search result.
- **Chalk Ink** (`chalk-ink`; paper: `paper-ink`): headings, body text, default button fill.
- **Pencil Grey** (`pencil-grey`; paper: `paper-pencil`): secondary text, leads, meta lines, nav links at rest, hints.
- **Grid Rule** (`grid-rule`; paper: `paper-rule`): hairline borders on cards, sections, header, tables.
- **Grid Rule Strong** (`grid-rule-strong`; paper: `paper-rule-strong`): control outlines (ghost buttons, chips, inputs, language switch, search button).
- **On-Accent** (`on-accent`; paper: white): text on any filled accent.
- **Focus Blue** (`focus-blue`; paper: `focus-blue-paper`): the 3px focus outline, and nothing else.
- The drafting grid is `rgb(120 190 220 / .07)` (paper: `rgb(20 60 90 / .07)`), drawn as two 1px linear gradients on `body`.

### Named Rules
**The Two Halves Rule.** Cyan means drawn (code, links, selection); copper means wired (structure, labels, emphasis). Don't swap them, and don't add a third signature accent.

**The Pencil Hook Rule.** Field colour enters a component only through `--c`. Components read `var(--c, …)`; they never hard-code a field hex.

**The Paper Ink Rule.** Every dark-theme accent has a darker paper twin that clears contrast on `paper-bench`. Never reuse a dark-theme accent on the light theme.

## Typography

**Display Font:** Bricolage Grotesque Variable (with Segoe UI, system-ui)
**Body Font:** Bricolage Grotesque Variable (same family)
**Label/Mono Font:** IBM Plex Mono 400/500 (with ui-monospace, SF Mono, Menlo)

**Character:** Bricolage carries the voice: slightly quirky, warm, and tightly tracked at display sizes, like a maker's handwriting set in metal. Plex Mono is the bench label maker. It handles every number, tag, nav item, button, eyebrow and breadcrumb, which is what gives the site its schematic feel.

### Hierarchy
- **Display** (h1): hero and page titles. Tight negative tracking. Hero spans can colour single words cyan and copper.
- **Headline** (h2): section heads, always preceded by a mono eyebrow.
- **Title** (h3): card titles (fixed 1.25rem inside cards), pipeline steps, field tiles.
- **Lead**: intro paragraphs in Pencil Grey, max 52ch.
- **Body**: fluid 1rem–1.12rem at line-height 1.6. Long-form `.prose` caps at 78ch.
- **Label** (eyebrow): uppercase, wide-tracked, copper, with a 1.8em × 2px leading rule. Filter-panel and footer headings use the same treatment at .72rem / .14–.15em.
- **Mono UI**: nav, buttons, chips, meta lines, breadcrumbs, captions; .66–.88rem at weight 500.

Headings use `text-wrap: balance` and paragraphs use `text-wrap: pretty`.

### Named Rules
**The Label Maker Rule.** If it's a number, a category, a control or a piece of metadata, set it in Plex Mono. Bricolage is for things a person would say.

**The Eyebrow-First Rule.** Every section headline sits under a copper mono eyebrow that names the section in a few words.

## Layout

- **Container:** `.wrap` is `min(100% − 2·gutter, 1200px)`, centred. `.narrow` uses 780px for reading pages. The gutter is fluid, 16–40px.
- **Sections:** `.block` gets fluid vertical padding (3–6.5rem). `.band` alternates a section onto Bench Panel with hairline rules top and bottom.
- **Grids:** auto-fit grids with `min(100%, N)` minimums (`.g2` 340px, `.g3` 280px, `.split` 420px) so they collapse to one column without breakpoints. The gap is fluid, 1–1.5rem.
- **Hero:** two columns (copy 1.1fr / viewer 1fr). They stack at 900px.
- **Projects finder:** a sticky filter panel (260–340px) beside the results. It stacks and un-sticks at 900px.
- **Header:** sticky at 64px. Nav collapses to a full-width sheet under the header at 860px. Without JS, the nav renders inline and the header becomes static.
- **Footer:** brand column plus an auto-fit link map (140px minimum). It stacks at 800px.
- **Breakpoints in use:** 560, 640, 700, 800, 860, 900, 1060px. They are content-driven, not a fixed scale.
- **Scroll padding** clears the sticky header by 16px.

### Named Rules
**The Drafting Grid Rule.** The 48px body grid is the sheet everything sits on. Opaque surfaces may cover it, but nothing re-draws a competing grid on top.

## Elevation & Depth

Mostly flat, with depth shown by tonal steps (Bench Black → Panel → Inset) and hairline rules. A single shadow exists, a long, dark, tight drop (`--shadow`). It appears only as a response: on card hover, on the search dialog, and on the Nightjar image. The playful depth cue is the **hard offset shadow**: buttons move (−2px, −2px) and cast a solid 4px Trace Copper block, as if lifted off the paper. Glass is limited to the sticky header (88% bench + 12px blur), viewer controls and the dialog backdrop.

### Named Rules
**The Flat-At-Rest Rule.** Nothing casts a shadow until the visitor touches it.

**The Hard Shadow Rule.** Interactive lift is a solid offset block in copper, never a soft glow.

## Shapes

Squared parts on a drafting sheet. Controls (buttons, chips, tags, inputs, search button, icon buttons) take a barely-there 2px corner. Cards, panels, sections, the viewer, dialogs and images are fully square. Circles appear only as the language dot in tags and the solder pads in the hero art.

Recurring geometry:
- **Accent bars:** a 3–4px coloured rule on a top or left edge marks a surface's discipline or role (card top bar, filter panel, dialog, footer split bar, `pre`/blockquote/remark left rules, selected search result).
- **Corner brackets:** 22px copper L-brackets at opposite corners frame the 3D viewer like a camera viewfinder.
- **Dashed borders** mean provisional or optional: preset chips, empty states, the viewer's notice badge.
- **Hatching:** 45° repeating stripes in the field colour fill image placeholders.
- **Split rule:** the footer's top bar is half cyan, half copper, the two halves of the work side by side.

## Components

### Buttons
Square tools that jump when touched.
- **Shape:** 2px corners, 46px minimum height (38px for `.sm`), mono .88rem/500 label, .6em icon gap.
- **Default:** Chalk Ink fill with Bench Black text.
- **Primary:** Wireframe Cyan fill with On-Accent text. Used for the main call to action in a group.
- **Ghost:** transparent with a Grid Rule Strong outline and Chalk Ink text.
- **Hover:** translate (−2px, −2px) plus a 4px 4px solid Trace Copper shadow, over 150ms. No colour change.
- **Focus:** the global 3px Focus Blue outline at 3px offset.

### Tags & Chips
- **Tag** (read-only): mono .7rem, an outline in 60% `--c`, text in `--c`. The language variant leads with a filled dot.
- **Chip** (filter toggle): 36px minimum, Bench Black fill with a Grid Rule Strong outline. Hover outlines it in `--c`. **Selected** fills with `--c` and uses On-Accent text. **Dim** (no results) drops to .38 opacity. **Preset** chips are transparent with dashed outlines. Counts sit inside in a smaller, faded italic-free span.

### Cards / Containers
- **Project card:** Bench Panel, a 1px Grid Rule border, square, no shadow at rest. A 28 × 3px `--c` bar sits on the top-left edge.
- **Hover:** the card lifts 3px, its border turns `--c`, the top bar grows to full width (250ms), it gains the soft shadow, and the media zooms to 1.04.
- **Media:** 16:9, Bench Inset fill. A missing image becomes a hatched `--c` placeholder showing the project's initial in a large Bricolage letter.
- **Body:** a mono meta line, a 1.25rem title whose link covers the whole card, a mono tagline in `--c`, a Pencil Grey description and tags pinned to the bottom.
- **Panels** (filter panel, pipeline cells, field tiles): the same Bench Panel and hairline treatment, with a coloured top rule.

### Inputs / Fields
- **Style:** Bench Black fill, a Grid Rule Strong outline, 2px corners, 44px minimum height, body font at 1rem (16px on mobile so iOS doesn't zoom).
- **Search dialog field:** a borderless 56px input whose row underline turns cyan on focus.
- **Focus:** the global Focus Blue outline (1px offset on filter inputs).

### Navigation
- **Header:** sticky glass bar with the logo on the left, mono nav links and tools (search, EN/SK switch, theme toggle, menu).
- **Links:** Pencil Grey at rest, Chalk Ink on hover. The active link gets a 2px copper underline inset to the label width.
- **Language switch:** a segmented outline control. The active language is filled with Wireframe Cyan.
- **Mobile (≤860px):** a full-width sheet under the header with 1rem links, hairline separators, and a short copper bar marking the active page.
- **Breadcrumbs:** mono .78rem, with copper `/` separators. Links turn cyan on hover.

### Search Dialog
A command palette. It's a square `<dialog>` with a copper top rule and a blurred dark backdrop, and it pops in over 160ms. Results are rows of a copper mono kind label plus a bold title and grey summary. The selected row gets a Bench Inset fill and a 3px cyan left rule. On mobile it goes full-screen.

### 3D Viewer (signature)
The Nightjar bench. It's a square frame with a radial cyan glow on Bench Panel and copper corner brackets. A floating MeshCircuit poster shows until three.js loads. Mono toggle buttons sit top-right, and the active one is filled cyan. A dashed copper notice badge sits top-left, and a mono caption runs along the bottom.

### Pipeline Strip (signature)
A row of numbered steps (01 Prompt → 05 Object) in one bordered strip. Each cell has a 4px top bar in its field colour, a mono step number in that colour, a title and a grey description. It stacks vertically at 900px.

## Do's and Don'ts

### Do:
- **Do** route every discipline colour through `--c` via the `.c-{field}` classes.
- **Do** set numbers, labels, controls and metadata in IBM Plex Mono, and speech in Bricolage.
- **Do** put a copper mono eyebrow above every section headline.
- **Do** keep controls at a 2px corner and cards, panels and media fully square.
- **Do** use the hard copper offset shadow for button hover and the growing `--c` top bar for card hover.
- **Do** tune every new colour for both themes by hand, with a darker paper twin for light.
- **Do** keep tap targets at 36px or more (chips), 40px or more (icon buttons) and 44px or more (inputs and primary controls).
- **Do** respect `prefers-reduced-motion`. The global rule already kills animations and transitions.

### Don't:
- **Don't** round cards, panels, dialogs or images, or go past 2px on controls.
- **Don't** use soft glows or resting shadows. Depth is tonal until interaction.
- **Don't** introduce a third signature accent, or use field colours as large background fills.
- **Don't** swap the meaning of cyan (drawn) and copper (wired).
- **Don't** reuse dark-theme accent values on the paper theme.
- **Don't** overlay a second grid or texture that competes with the 48px drafting grid.
