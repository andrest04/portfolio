---
name: Andrés Torres Portfolio
description: A dossier on stone paper where screenshots of real work carry the visual weight.
colors:
  archive-teal: "#256f82"
  stone-paper: "#dedad3"
  folio-stone: "#d3cec6"
  folio-ink: "#0a0a0a"
  pencil-gray: "#5c5852"
  paper-white: "#ffffff"
typography:
  display:
    fontFamily: "Literata, Literata Fallback"
    fontSize: "calc(100cqw / var(--line-em))"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontFeature: "lnum"
  headline:
    fontFamily: "Literata, Literata Fallback"
    fontSize: "clamp(1.75rem, 1.5rem + 1vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontFeature: "lnum"
  lead:
    fontFamily: "Literata, Literata Fallback"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.3
    fontFeature: "lnum"
  title:
    fontFamily: "Literata, Literata Fallback"
    fontSize: "clamp(1.0625rem, 1.02rem + 0.15vw, 1.1875rem)"
    fontWeight: 500
    lineHeight: 1.6
    fontFeature: "lnum"
  body:
    fontFamily: "Literata, Literata Fallback"
    fontSize: "clamp(1.0625rem, 1.02rem + 0.15vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "lnum"
  label:
    fontFamily: "Literata, Literata Fallback"
    fontSize: "clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "lnum"
rounded:
  square: "0px"
  circle: "50%"
spacing:
  margin: "20px"
  margin-wide: "40px"
  section-gap: "clamp(96px, 12vw, 180px)"
  column-start: "22vw"
  band-padding: "clamp(72px, 8vw, 120px)"
components:
  button-primary:
    backgroundColor: "{colors.archive-teal}"
    textColor: "{colors.paper-white}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0 1.5rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "color-mix(in srgb, #256f82 82%, #0a0a0a)"
    textColor: "{colors.paper-white}"
  text-link:
    textColor: "{colors.folio-ink}"
    typography: "{typography.body}"
  text-link-active:
    textColor: "{colors.pencil-gray}"
  nav-bar:
    backgroundColor: "{colors.folio-stone}"
    textColor: "{colors.folio-ink}"
    typography: "{typography.label}"
    padding: "8px 20px 0"
  nav-bar-wide:
    backgroundColor: "transparent"
    textColor: "{colors.folio-ink}"
    typography: "{typography.label}"
    padding: "24px 40px 0"
  skip-link:
    backgroundColor: "{colors.folio-ink}"
    textColor: "{colors.stone-paper}"
    rounded: "{rounded.square}"
    padding: "0.5rem 1rem"
  hero-picture:
    backgroundColor: "{colors.folio-stone}"
    rounded: "{rounded.square}"
  hero-caption:
    textColor: "{colors.folio-ink}"
    typography: "{typography.label}"
  ledger-row:
    textColor: "{colors.folio-ink}"
    typography: "{typography.title}"
    padding: "10px 0"
    height: "52px"
  ledger-row-wide:
    height: "44px"
  ledger-row-dimmed:
    textColor: "{colors.pencil-gray}"
  ledger-frame:
    backgroundColor: "{colors.folio-stone}"
    rounded: "{rounded.square}"
  record-value:
    textColor: "{colors.pencil-gray}"
    typography: "{typography.label}"
  about-band:
    backgroundColor: "{colors.folio-stone}"
    textColor: "{colors.folio-ink}"
    padding: "clamp(72px, 8vw, 120px) 24px"
  about-portrait:
    rounded: "{rounded.circle}"
    size: "44px"
---

# Design System: Andrés Torres Portfolio

## Overview

**Creative North Star: "The Evidence Folio"**

The site is a dossier on stone paper where screenshots of real work carry the visual weight. The tone is sober, exact, and documentary: a warm paper ground, near-black ink, and one serif family set at a few deliberate sizes. Everything around the screenshots stays quiet so the evidence is what the eye lands on first.

Density is calm and generous between sections, tight inside them. Records read as ledgers and two-ended rows rather than as framed objects: a name on one end, a date or stack on the other, with whitespace doing the separating. The page is flat, square-cornered, and tonal, and it spends its only saturated color on a single filled button.

Motion is sparse and documentary. One long ease-out curve carries every entrance and state change, the headline rises through a mask once on load, sections settle into place as they enter the viewport, and one project picture drifts slowly while it is in view. All hidden start states are gated so the page is complete without script or with reduced motion.

**Key Characteristics:**
- Stone paper ground with near-black ink and a single teal accent.
- One serif family, Literata, across every role.
- Flat surfaces: tonal shifts only, no shadows or borders.
- Square corners and a single filled button.
- Screenshots of real work as the main carriers of color and weight.
- English and Spanish carry the same layout, with the display size measured per language.

## Colors

A warm, near-monochrome stone palette with one restrained teal, leaving color to the screenshots it frames.

### Primary
- **Archive Teal** (#256f82): The fill of the one filled button, and nothing else in the interface. On hover it mixes 82% with Folio Ink (`color-mix(in srgb, #256f82 82%, #0a0a0a)`), which resolves to about #205d6c.

### Neutral
- **Stone Paper** (#dedad3): The page ground, including the html canvas and the scrollbar track. It also serves as text on the skip link and in the text selection, where the ink and ground invert.
- **Folio Stone** (#d3cec6): The one tonal surface, a step darker than the ground. It fills the About band, the navigation bar on narrower screens, and the frames behind screenshots while they load.
- **Folio Ink** (#0a0a0a): All primary text, links, headings, drawn icons, the focus ring, and the fill of the skip link and text selection.
- **Pencil Gray** (#5c5852): Secondary text: dates, stacks, roles, group headings, contact labels, the footer note, and pressed or dimmed states. It also colors the scrollbar thumb. It holds 5.07:1 on Stone Paper and 4.51:1 on Folio Stone.
- **Paper White** (#ffffff): Text on the filled button only, at 5.71:1 on Archive Teal.

### Named Rules
**The One Accent Rule.** Archive Teal is the fill of the filled button and has no other use. The system is Primary plus Neutral, with no Secondary or Tertiary color.

**The Single Filled Button Rule.** A view carries one filled button. Every other action is an underlined or plain text link.

**The Color Lives In The Evidence Rule.** Screenshots of real work supply the page's color and visual weight; the interface around them stays in stone and ink.

## Typography

**Display Font:** Literata (with its generated Literata Fallback)
**Body Font:** Literata (with its generated Literata Fallback)

**Character:** A bookish text serif with an optical-size axis, loaded with its italic and tuned automatically to each size. Set with lining numerals throughout, it reads like a well-kept printed record; dates and stack names in rows and ledgers add tabular numerals so they align.

### Hierarchy
- **Display** (500, fluid: the hero's content width, in container units so a classic scrollbar cannot clip it, divided by the longest line's width in em, 14.4 in English and 16.2 in Spanish; 1.05; -0.02em): The hero headline only, two lines spanning the full page width from 768px. Below 768px it wraps at clamp(2.125rem, 10cqw, 2.5rem), so it stays clearly larger than the section titles.
- **Headline** (500, clamp(1.75rem, 1.5rem + 1vw, 2.25rem), 1.05; -0.02em): Section titles.
- **Lead** (400 italic, clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem), 1.3): The signature that closes the About letter.
- **Title** (500, clamp(1.0625rem, 1.02rem + 0.15vw, 1.1875rem), 1.6): Project and company names in rows, and Andrés's name in the navigation. It differs from Body by weight alone.
- **Body** (400, clamp(1.0625rem, 1.02rem + 0.15vw, 1.1875rem), 1.6): All running text and the button label. Introductory sentences are held to 44ch; the About letter to 520px.
- **Label** (400, clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem), 1.6, sentence case): Navigation links, dates, stacks, roles, hero captions, contact labels, and the footer.

The contact statement is the one considered variation: Headline size at weight 400, line height 1.15, held to 14em. Group headings within the record use Body size in Pencil Gray rather than a new step. Below 600px the hero sentence tightens to a line height of 1.5.

### Named Rules
**The One Family Rule.** Literata sets every role. Hierarchy comes from size, the 500 weight, and italic, never from a second typeface.

**The Measured Line Rule.** The display size from 768px is derived from the width of the longest authored line, per language, so both lines always fit the available width exactly on one line each. Below 768px the headline wraps at a size above the section titles. Changing the headline copy means re-measuring it.

**The Sentence Case Rule.** Labels stay in sentence case at weight 400 with no added tracking. Small text is differentiated by size and Pencil Gray, not by capitals.

## Layout

The page is a single vertical document with a side margin of 20px, widening to 40px from 768px up. Major sections are separated by a fluid gap (clamp(96px, 12vw, 180px)), and the About band and the top of Contact use their own fluid padding (clamp(72px, 8vw, 120px)). Inside sections, spacing steps through 4, 8, 12, 16, 20, 24, and 32px; it tightens within a group and opens up between groups.

The hero stacks on narrow screens: headline, copy, then three captioned pictures with the first at full width above a pair, all at 4:3. From 1100px it becomes a full-viewport 12-column composition (minimum height 100svh, 16px column gap, 32px row gap), with the headline across all columns, the copy in the first three columns anchored to the bottom, and the pictures in the remaining nine at a 2:1 split, the large one spanning both rows. The picture row takes what the headline leaves of the first screen, with the copy and a 180px minimum as its floor, so the sentence and actions stay on the first screen down to about 620px tall.

From 1200px, Work and the record sections hang from a shared column start at 22vw. The Work column is 560px wide with the project picture in the open ground 64px to its right, up to 640px wide. The record splits into two equal columns with 72px between rows, and its two note groups run in two columns from 768px, aligned to those columns from 1200px.

Row pairings become label-and-value columns from 600px (an 11rem label column). Below 600px the contact links run full width under the portrait. Contact moves to a 12-column grid at 900px with a 24px gap: the statement in columns 1 to 5, the square portrait in 7 and 8, and the links in 9 to 12. The About letter stays a centered column at every width, with 24px of side padding and 24px between its parts. The footer becomes a three-part line from 768px, set far below the content (20svh, then 30svh).

## Elevation & Depth

The system is flat: there are no shadows and no borders anywhere. Depth is conveyed only by tonal shift, with Folio Stone sitting one step darker than Stone Paper, and by the screenshots themselves. Structure comes from spacing and alignment rather than from lines, including the ledger, whose rows are separated by whitespace alone.

### Named Rules
**The Flat Folio Rule.** Surfaces separate by tone and space only. No shadows and no borders.

## Shapes

Every surface, button, and picture frame has square corners (0px). The single exception is the small portrait at the top of the About letter, a 44px circle (50%) that reads like a seal on a letter; the larger portrait beside the contact links remains square at a 1:1 ratio.

Pictures are clipped to their frames at fixed ratios: 4:3 in the hero on narrower screens and in the wide ledger preview, 16:10 for the ledger on narrower screens, anchored to the top so a screenshot always shows its header. The one drawn icon is a 16px plus sign with a 1.5px stroke in the current text color.

## Components

The character is quiet and precise: square corners, a single filled button, and text that does the rest.

### Buttons
- **Shape:** Square corners (0px), at least 44px tall.
- **Primary:** Archive Teal fill with Paper White Body text and 1.5rem of horizontal padding. It is the only button style.
- **Hover / Focus:** Over 150ms on the shared ease-out, the fill deepens to the 82% mix with Folio Ink; pressing scales it to 0.98. Focus uses the global ring: a 2px Folio Ink outline at a 3px offset.

### Links
- **Underlined link:** A 1px underline with a 0.2em offset thickens to 2px on hover and turns Pencil Gray when pressed. Used for the CV download, project links, and contact details.
- **Plain link:** No underline at rest; a 1px underline appears on hover and Pencil Gray when pressed. Used in the navigation and footer, including the footer CV link.
- **Touch:** On coarse pointers, links and the language switch are at least 44px tall, with no change for mouse pointers.
- **New tab:** Links that open a new tab carry a visually hidden notice from the dictionary.

### Navigation
- **Style:** A plain Label-size bar, with Andrés's name in Title on one end and the language switch on the other. No sticky behavior.
- **Narrow:** Below 1100px it is a Folio Stone bar with the links on their own wrapping row; link gaps grow from 0.4375rem to 1.5rem at 768px.
- **Wide:** From 1100px the bar is transparent and overlays the top of the hero, with name, links, and switch on one line.
- **Language switch:** A text button styled as an underlined link; it thickens on hover, fades to 0.6 when pressed, and shows a progress cursor at 0.5 opacity while the language changes.

### Skip Link
Folio Ink fill with Stone Paper text, parked off-screen until focused, when it appears at the top of the page. It targets `#content`, the hero on the home page and the `main` of the error and not-found pages, so the next Tab lands past the navigation.

### Masked Headline
The hero headline's lines each rise from behind their own clipping mask (900ms), staggered by 110ms after a 60ms delay. Each mask leaves 0.14em of room so accents and descenders are not cut off. The copy and pictures then fade up 16px (700ms) after a 620ms delay.

### Hero Triptych
Three linked screenshots of real work, one large and two small, on a Folio Stone frame. Each carries a Label caption beneath it, the project name in Folio Ink and the role in Pencil Gray at the two ends of the line; the caption names the link, so the image alt is empty. On devices that hover, the image inside scales to 1.03 over 500ms.

### Work Ledger
The signature component: an exclusive accordion in which opening one row closes the others, with the first row open on load.
- **Stability:** Opening a row holds it in place on screen when the open row above it collapses, by correcting the scroll with no animation. Without script the native accordion still works.
- **Row:** Project name in Title, role in Pencil Gray Label, lead technology in tabular Label, and a drawn plus sign that rotates 45 degrees over 200ms when the row is open.
- **Panel:** A description, an optional detail screenshot, highlights, the stack in Pencil Gray Label, and underlined links for the demo and repository.
- **Narrow:** Each row has its own 16:10 picture above it and a 52px minimum height, with 28px between rows.
- **Wide:** From 1200px rows sit on a single line at a 44px minimum height, with the name in the first 50% and the role kept on one line, and a sticky 4:3 picture appears in the open ground. It fades in over 150ms when a row is hovered or focused, and the open row holds it otherwise. Rows not being pointed at dim to Pencil Gray.
- **Drift:** The visible picture slowly scales to 1.07 and shifts up 1.5% over 24s, alternating, only while the ledger is on screen. It is the one looping animation on the page.

### Record Rows
Two-ended rows for experience and education: a Title name on one end, a tabular Pencil Gray Label date on the other, with the role, description, and stack beneath. Skills use a paired variant with the group name in a fixed label column from 600px, followed by two note groups, Focus and Teamwork. These rows are not interactive.

### About Letter
A centered 520px column on the Folio Stone band, opening with the 44px round portrait and closing with Andrés's name in Lead italic above a Pencil Gray Label role line.

### Reveal
Sections enter by fading in over 400ms and rising 24px over 500ms, staggered by 40ms per item, starting while they are still 25% of a viewport below the fold, so fast scrolling does not land on empty sections. Hidden start states apply only under both the reduced-motion preference of no-preference and a script-present flag, and a 4-second failsafe removes that flag if the page never hydrates.

## Do's and Don'ts

### Do:
- **Do** let screenshots of real work carry the visual weight, at the sizes the hero triptych and Work ledger give them.
- **Do** keep Archive Teal (#256f82) to the fill of the filled button, with Paper White (#ffffff) text.
- **Do** create depth by placing Folio Stone (#d3cec6) on Stone Paper (#dedad3).
- **Do** set every role in Literata and build hierarchy from size, weight 500, and italic.
- **Do** use Pencil Gray (#5c5852) for secondary text and keep Folio Ink (#0a0a0a) for primary text.
- **Do** give every focusable element the 2px Folio Ink ring at a 3px offset.
- **Do** run state changes at 150ms on the shared ease-out, cubic-bezier(0.16, 1, 0.3, 1).
- **Do** keep every hidden entrance state behind both the no-preference motion query and the script-present flag.
- **Do** re-measure the display line width in both English and Spanish whenever the headline copy changes.

### Don't:
- **Don't** add shadows or borders; depth is tonal only.
- **Don't** introduce a Secondary or Tertiary color; the palette is Primary plus Neutral.
- **Don't** use Archive Teal for text, links, or decoration; it appears only as the button fill.
- **Don't** add a second filled button to a view; secondary actions stay text links, as the CV link does beside the hero button.
- **Don't** round corners other than the 44px About portrait.
- **Don't** uppercase or letterspace labels; they stay sentence case at weight 400.
- **Don't** add a second typeface alongside Literata.
- **Don't** add another looping animation; the drifting project picture is the only one.
- **Don't** set the display headline at a fixed size, or let its lines wrap from 768px up.
