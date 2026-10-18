---
name: iairu.com
description: The Night Workbench in IBM Carbon colour — one dark bench where wireframe and circuit trace share the same sheet, set in IBM Plex with an IBM-blue voice.
colors:
  bg: "#161616"
  bg2: "#262626"
  bg3: "#393939"
  ink: "#f4f4f4"
  soft: "#c6c6c6"
  line: "#393939"
  line2: "#525252"
  blue: "#78a9ff"
  cobalt: "#4589ff"
  cyan: "#33b1ff"
  magenta: "#ff7eb6"
  teal: "#3ddbd9"
  yellow: "#f1c21b"
  on-accent: "#001141"
  focus: "#78a9ff"
  bg-paper: "#ffffff"
  bg2-paper: "#f4f4f4"
  bg3-paper: "#e0e0e0"
  ink-paper: "#161616"
  soft-paper: "#525252"
  line-paper: "#e0e0e0"
  line2-paper: "#a8a8a8"
  blue-paper: "#0f62fe"
  cobalt-paper: "#0043ce"
  cyan-paper: "#0072c3"
  magenta-paper: "#d02670"
  teal-paper: "#005d5d"
  yellow-paper: "#8a6a00"
  on-accent-paper: "#ffffff"
  focus-paper: "#0f62fe"
typography:
  display:
    fontFamily: "'IBM Plex Sans Variable', 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 5vw, 5.2rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'IBM Plex Sans Variable', 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 1.3rem + 2vw, 2.8rem)"
    fontWeight: 640
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'IBM Plex Sans Variable', 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.05rem + .5vw, 1.45rem)"
    fontWeight: 640
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "'IBM Plex Sans Variable', 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.05rem + .5vw, 1.35rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'IBM Plex Sans Variable', 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif"
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
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    typography: "{typography.mono-ui}"
    rounded: "{rounded.part}"
    padding: ".85em 1.3em"
    height: "46px"
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.on-accent}"
    typography: "{typography.mono-ui}"
    rounded: "{rounded.part}"
    padding: ".85em 1.3em"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
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
    textColor: "{colors.soft}"
    rounded: "{rounded.part}"
    padding: ".42em .65em"
  chip:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-ui}"
    rounded: "{rounded.part}"
    padding: ".4em .7em"
    height: "36px"
  chip-selected:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.part}"
  card:
    backgroundColor: "{colors.bg2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1rem 1.1rem 1.2rem"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.part}"
    padding: ".6rem .8rem"
    height: "44px"
  nav-link:
    textColor: "{colors.soft}"
    typography: "{typography.mono-ui}"
    padding: ".5rem .85rem"
  nav-link-active:
    textColor: "{colors.ink}"
  lang-switch-active:
    backgroundColor: "{colors.purple}"
    textColor: "{colors.on-accent}"
    padding: ".45rem .55rem"
---

# Design System: iairu.com

## Overview

**Creative North Star: "The Night Workbench"**

It's late, the room is dark, and everything is laid out on one bench: a 3D model's wireframe, a half-routed circuit board, a sketch, a terminal. The whole site is that bench. The page itself is a neutral near-black surface ruled with a faint 48px drafting grid. Above it a star-field sky (one of six generated pictures, picked at random per visit) fades down into the work. Every discipline gets drawn on the same sheet, in the same squared, labelled hand, so a recipe, a PCB and a Blender render all read as parts of one practice rather than separate storefronts.

The bench is rendered in **IBM's Carbon palette** and set in **IBM Plex**, the typeface and colour system behind Qiskit. Neutral Carbon grays carry every surface; a single **Qiskit purple** is the voice of the work and **IBM blue** is its structural hand. The character is **technical and playful**: Carbon rigour first (mono labels, exact rules, 2px corners, numbered steps), with small physical surprises on top. A button jumps up-left and leaves a blue shadow behind it, a card's colour bar runs across its whole top edge on hover, and the hero icosahedron is half wireframe, half PCB trace. Colour is functional: two signature accents name the roles (voice vs. structure), and six Carbon field colours tag which discipline a thing belongs to. Density is moderate. Sections breathe (up to 6.5rem of block padding), but cards, filters and meta lines are compact and dense with mono detail, like labels on parts bins.

Dark is the native theme. Light is a full first-class counterpart: the bench becomes Carbon white, the sky lightens, and every accent drops to a deeper Carbon tone that passes contrast on white. Neither theme is an inversion of the other; both use Carbon's hand-tuned token steps.

**Key Characteristics:**
- Neutral Carbon-gray bench (`#161616`) with a 48px drafting grid and a random star-field sky that fades out downwards.
- Two signature accents, Qiskit Purple (voice) and IBM Blue (structure), plus six Carbon field colours applied through a single `--c` hook.
- IBM Plex Sans for voice, IBM Plex Mono for every label, meta line, control and number.
- Squared parts: 2px corners on controls, 0 on cards and panels.
- Hard offset shadows and growing accent bars instead of soft lifts.
- Hand-tuned dark (default) and Carbon-white themes, both drawn from Carbon tokens.

## Colors

The palette is IBM Carbon. Neutral grays carry every surface; a vivid purple is the one colour the eye follows (links, primary actions), and a confident blue does the structural talking (labels, section heads, the interactive lift). Six Carbon discipline colours act as coloured pencils, one per field. The CSS custom property for each colour is named for its hue (`--purple`, `--blue`, `--cyan`, `--magenta`, `--teal`, `--yellow`); a field is bound to one through `fields[x].color` in `site.js`.

### Primary
- **Qiskit Purple** (`purple`; paper: `purple-paper`): the site's voice. Used for links, primary buttons, the active language switch, selected chips, text selection, the caret, the search focus underline, and the Software & web field. It is the default `--c` for any component that has no field. Dark `#a56eff` (Carbon Purple 50), paper `#6929c4` (Purple 70).
- **IBM Blue** (`blue`; paper: `blue-paper`): the structural voice. Used for eyebrows and section labels, the active-nav underline, breadcrumb separators, the button hover shadow, the viewer's corner brackets, `pre` left rules, search result kinds, remarks and notices, and the Electronics & making field. Dark `#78a9ff` (Carbon Blue 40), paper `#0f62fe` (Blue 60).

### Secondary (field pencils)
Each field of expertise owns one Carbon colour, assigned through the `.c-{hue}` → `--c` hook. They appear on card top bars, tag outlines, chip selection, pipeline step bars and field counts, never as page backgrounds.
- **Cyan** (`cyan`): Prompt engineering & AI. Carbon Cyan 40 / Cyan 70.
- **Magenta** (`magenta`): 3D & animation. Carbon Magenta 40 / Magenta 60.
- **Teal** (`teal`): Graphic design & illustration. Carbon Teal 30 / Teal 70.
- **Yellow** (`yellow`): Systems, network & security; also GitHub stars (★) and the language filter. Carbon Yellow 30 / custom dark gold.
- Purple and Blue double as the Software and Electronics pencils.

### Neutral (Carbon gray ramp)
- **bg** (`#161616`; paper `#ffffff`): page background, input and chip fill, mobile nav sheet, dialog body.
- **bg2** (`#262626`; paper `#f4f4f4`): raised working surfaces such as cards, the filter panel, `.band` sections, the footer, pipeline cells, `pre` blocks.
- **bg3** (`#393939`; paper `#e0e0e0`): recessed wells such as card media placeholders, inline `code`, table heads, the selected search result.
- **ink** (`#f4f4f4`; paper `#161616`): headings, body text, default button fill.
- **soft** (`#c6c6c6`; paper `#525252`): secondary text, leads, meta lines, nav links at rest, hints.
- **line** (`#393939`; paper `#e0e0e0`): hairline borders on cards, sections, header, tables.
- **line2** (`#525252`; paper `#a8a8a8`): control outlines (ghost buttons, chips, inputs, language switch, search button).
- **on-accent** (`#1c0f30`; paper `#ffffff`): text on any filled accent.
- **focus** (`#78a9ff`; paper `#0f62fe`): the 3px focus outline, and nothing else.
- The drafting grid is `rgb(120 190 220 / .07)` (paper: `rgb(20 60 90 / .07)`), drawn as two 1px linear gradients on `body`.

### Named Rules
**The Two Voices Rule.** Purple is the voice of the work (links, primary actions, selection); blue is its structure (labels, eyebrows, section heads, the lift shadow). Don't swap them, and don't add a third signature accent.

**The Pencil Hook Rule.** Field colour enters a component only through `--c`. Components read `var(--c, …)`; they never hard-code a field hex.

**The Carbon Token Rule.** Every colour comes from a Carbon token step. Each dark-theme accent has a deeper paper twin (a lower/higher Carbon step) that clears contrast on the white bench. Never reuse a dark-theme accent value on the light theme.

## Typography

**Display Font:** IBM Plex Sans Variable (with IBM Plex Sans, Segoe UI, system-ui)
**Body Font:** IBM Plex Sans Variable (same family)
**Label/Mono Font:** IBM Plex Mono 400/500 (with ui-monospace, SF Mono, Menlo)

**Character:** IBM Plex is the Carbon/Qiskit typeface, and it carries the voice here: humanist, engineered, quietly confident, tightly tracked at display sizes. Plex Mono is the bench label maker. It handles every number, tag, nav item, button, eyebrow and breadcrumb, which is what gives the site its schematic, instrument-panel feel. Plex Sans and Plex Mono are siblings from the same family, so headings and labels sit together cleanly.

### Hierarchy
- **Display** (h1): hero and page titles. Tight negative tracking. Hero spans can colour single words purple and blue.
- **Headline** (h2): section heads, always preceded by a mono eyebrow.
- **Title** (h3): card titles (fixed 1.25rem inside cards), pipeline steps, field tiles.
- **Lead**: intro paragraphs in soft gray, max 52ch.
- **Body**: fluid 1rem–1.12rem at line-height 1.6. Long-form `.prose` caps at 78ch.
- **Label** (eyebrow): uppercase, wide-tracked, blue, with a 1.8em × 2px leading rule. Filter-panel and footer headings use the same treatment at .72rem / .14–.15em.
- **Mono UI**: nav, buttons, chips, meta lines, breadcrumbs, captions; .66–.88rem at weight 500.

Headings use `text-wrap: balance` and paragraphs use `text-wrap: pretty`.

### Named Rules
**The Label Maker Rule.** If it's a number, a category, a control or a piece of metadata, set it in Plex Mono. Plex Sans is for things a person would say.

**The Eyebrow-First Rule.** Every section headline sits under a blue mono eyebrow that names the section in a few words.

## Layout

- **Container:** `.wrap` is `min(100% − 2·gutter, 1200px)`, centred. `.narrow` uses 780px for reading pages. The gutter is fluid, 16–40px.
- **Sections:** `.block` gets fluid vertical padding (3–6.5rem). `.band` alternates a section onto the bg2 gray with hairline rules top and bottom.
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

Mostly flat, with depth shown by tonal steps (bg → bg2 → bg3, Carbon's gray layering) and hairline rules. A single shadow exists, a long, dark, tight drop (`--shadow`). It appears only as a response: on card hover, on the search dialog, and on the Nightjar image. The playful depth cue is the **hard offset shadow**: buttons move (−2px, −2px) and cast a solid 4px IBM Blue block, as if lifted off the paper. Glass is limited to the sticky header (88% bench + 12px blur), viewer controls and the dialog backdrop.

### Named Rules
**The Flat-At-Rest Rule.** Nothing casts a shadow until the visitor touches it.

**The Hard Shadow Rule.** Interactive lift is a solid offset block in blue, never a soft glow.

## Shapes

Squared parts on a drafting sheet. Controls (buttons, chips, tags, inputs, search button, icon buttons) take a barely-there 2px corner. Cards, panels, sections, the viewer, dialogs and images are fully square. Circles appear only as the language dot in tags and the solder pads in the hero art.

Recurring geometry:
- **Accent bars:** a 3–4px coloured rule on a top or left edge marks a surface's discipline or role (card top bar, filter panel, dialog, footer split bar, `pre`/blockquote/remark left rules, selected search result).
- **Corner brackets:** 22px blue L-brackets at opposite corners frame the 3D viewer like a camera viewfinder.
- **Dashed borders** mean provisional or optional: preset chips, empty states, the viewer's notice badge.
- **Hatching:** 45° repeating stripes in the field colour fill image placeholders.
- **Split rule:** the footer's top bar is half purple, half blue, the two voices of the work side by side.

## Components

### Buttons
Square tools that jump when touched.
- **Shape:** 2px corners, 46px minimum height (38px for `.sm`), mono .88rem/500 label, .6em icon gap.
- **Default:** Ink fill with bg text.
- **Primary:** Qiskit Purple fill with on-accent text. Used for the main call to action in a group.
- **Ghost:** transparent with a line2 outline and ink text.
- **Hover:** translate (−2px, −2px) plus a 4px 4px solid IBM Blue shadow, over 150ms. No colour change.
- **Focus:** the global 3px focus-blue outline at 3px offset.

### Tags & Chips
- **Tag** (read-only): mono .7rem, an outline in 60% `--c`, text in `--c`. The language variant leads with a filled dot.
- **Chip** (filter toggle): 36px minimum, bg fill with a line2 outline. Hover outlines it in `--c`. **Selected** fills with `--c` and uses on-accent text. **Dim** (no results) drops to .38 opacity. **Preset** chips are transparent with dashed outlines. Counts sit inside in a smaller, faded span.

### Cards / Containers
- **Project card:** bg2, a 1px line border, square, no shadow at rest. A 28 × 3px `--c` bar sits on the top-left edge.
- **Hover:** the card lifts 3px, its border turns `--c`, the top bar grows to full width (250ms), it gains the soft shadow, and the media zooms to 1.04.
- **Media:** 16:9, bg3 fill. A missing image becomes a hatched `--c` placeholder showing the project's initial in a large Plex Sans letter.
- **Body:** a mono meta line, a 1.25rem title whose link covers the whole card, a mono tagline in `--c`, a soft-gray description and tags pinned to the bottom.
- **Panels** (filter panel, pipeline cells, field tiles): the same bg2 and hairline treatment, with a coloured top rule.

### Inputs / Fields
- **Style:** bg fill, a line2 outline, 2px corners, 44px minimum height, body font at 1rem (16px on mobile so iOS doesn't zoom).
- **Search dialog field:** a borderless 56px input whose row underline turns purple on focus.
- **Focus:** the global focus-blue outline (1px offset on filter inputs).

### Navigation
- **Header:** sticky glass bar with the logo on the left, mono nav links and tools (search, EN/SK switch, theme toggle, menu).
- **Links:** soft gray at rest, ink on hover. The active link gets a 2px blue underline inset to the label width.
- **Language switch:** a segmented outline control. The active language is filled with Qiskit Purple.
- **Mobile (≤860px):** a full-width sheet under the header with 1rem links, hairline separators, and a short blue bar marking the active page.
- **Breadcrumbs:** mono .78rem, with blue `/` separators. Links turn purple on hover.

### Search Dialog
A command palette. It's a square `<dialog>` with a blue top rule and a blurred dark backdrop, and it pops in over 160ms. Results are rows of a blue mono kind label plus a bold title and gray summary. The selected row gets a bg3 fill and a 3px purple left rule. On mobile it goes full-screen.

### 3D Viewer (signature)
The Nightjar bench. It's a square frame with a radial purple glow on bg2 and blue corner brackets. A floating MeshCircuit poster shows until three.js loads. Mono toggle buttons sit top-right, and the active one is filled purple. A dashed blue notice badge sits top-left, and a mono caption runs along the bottom.

### Pipeline Strip (signature)
A row of numbered steps (01 Prompt → 05 Object) in one bordered strip. Each cell has a 4px top bar in its field colour, a mono step number in that colour, a title and a gray description. It stacks vertically at 900px.

## Do's and Don'ts

### Do:
- **Do** route every discipline colour through `--c` via the `.c-{hue}` classes.
- **Do** set numbers, labels, controls and metadata in IBM Plex Mono, and speech in IBM Plex Sans.
- **Do** put a blue mono eyebrow above every section headline.
- **Do** keep controls at a 2px corner and cards, panels and media fully square.
- **Do** use the hard blue offset shadow for button hover and the growing `--c` top bar for card hover.
- **Do** draw every new colour from a Carbon token step, with a deeper paper twin for light that clears contrast.
- **Do** keep tap targets at 36px or more (chips), 40px or more (icon buttons) and 44px or more (inputs and primary controls).
- **Do** respect `prefers-reduced-motion`. The global rule already kills animations and transitions.

### Don't:
- **Don't** round cards, panels, dialogs or images, or go past 2px on controls.
- **Don't** use soft glows or resting shadows. Depth is tonal until interaction.
- **Don't** introduce a third signature accent, or use field colours as large background fills.
- **Don't** swap the roles of purple (voice) and blue (structure).
- **Don't** reuse dark-theme accent values on the paper theme.
- **Don't** overlay a second grid or texture that competes with the 48px drafting grid.
