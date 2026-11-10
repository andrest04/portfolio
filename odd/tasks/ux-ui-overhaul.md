# UX/UI overhaul

## Objective

Raise the portfolio's UX and UI well above the current state, so a recruiter or tech lead understands who Andrés is, sees real evidence, and reaches the CV or contact quickly. A rewrite is allowed.

## Problem and why

The recovered base scores 23/32 on the Impeccable critique and 15/20 on the technical audit. The earlier pass was limited to refinement. Andrés asked on 2026-11-09 for a complete improvement using the project design skills and available MCP servers.

## Scope and constraints

- Base: `feat/impeccable-critique-fixes` re-created at `09c67ec` (23 commits that were unreachable after the branch was deleted). This work lives on `feat/ux-ui-overhaul`. `main` is untouched.
- Facts are not added or changed (`PRODUCT.md`). `src/content/en.json` and `src/content/es.json` change together.
- The visual direction may change. Andrés approves the direction before any section is built.
- Out of scope unless requested: moving the locale from a cookie to `[locale]` routes.
- Push, pull request, and merge stay with Andrés. Conventional commits, no AI attribution.
- The "Waiting on Andrés" list in `odd/tasks/impeccable-critique-fixes.md` stays open and is not filled with assumptions.

## Targets

Impeccable critique at least 28/32, audit at least 18/20, no FAIL in the taste-skill inspector.

## Delivery

Strategy: `ask-on-risk`. Forecast: well over 400 authored changed lines, so the chain choice is due when Andrés decides on delivery. Nothing is pushed.

## Tasks

- [x] T0 Recover the base and confirm it is green. Route: inline (git state and bounded checks).
- [x] T1 Measured baseline: Impeccable critique and detector, taste-skill inspector, and measurements at 390, 768, 1200, and 1536px in both languages. Route: delegated, two isolated assessors (mapping trigger, evidence beyond the inline budget). The Impeccable audit is deferred to T10 and T11, where its findings are acted on.
- [x] T2 Design direction. Andrés chose "Strata" on the Impeccable decision page (second hand, after asking for an experience-led page built from the CV). Direction contract: `.impeccable/surfaces/src-app-page-tsx.md`. Chosen sketch: `.impeccable/mocks/decision/r2-model-pick.html`. Build path: code-led (no image generation available). Route: inline (decision round). `DESIGN.md` and `.impeccable/design.json` are rewritten at finish by the Impeccable documenter, from the built page.
- [x] T3 Content model: experience from the CV (Teleperformance Perú, EDteam, Mathyu's Solutions), education, certifications, languages, and the agreed project list, in `src/content/en.json`, `src/content/es.json`, and `src/types/i18n.ts`; `PRODUCT.md` facts brought up to date. Route: delegated, one writer (writer trigger: more than two non-trivial files). Commits `e622e90`, `d01d7a5`.
- [x] T4 Foundations: Strata tokens in `src/app/globals.css`, type in `src/app/layout.tsx`. Route: delegated, same writer. Commit `e622e90`.
- [x] T5 First viewport: depth rail, surface stratum, navigation. Route: delegated, same writer. Commit `e622e90`.
- [x] T6 Strata: one stratum per job with its project samples; education as bedrock. Route: delegated, same writer. Commit `e622e90`.
- [x] T7 Close: contact, CV, footer signature. Route: delegated, same writer. Commits `e622e90`, `8376491` (error pages and manifest).
- [x] T8 Motion and the rail interaction, gated by `prefers-reduced-motion`. Route: delegated, one writer. Commits `e992234`, `85d401d` (styles in `0436d7e`).
- [x] T9 States and edge cases: error, not-found, focus, touch targets, long Spanish strings, phone layout. Route: delegated, same writer. Commits `85d401d`, `0436d7e`.
- [x] T10 Hardening: measured contrast, landmarks, image weight and hints, Person JSON-LD, unused assets. Route: delegated, same writer. Commits `298a25f`, `7ee72ed` (picture sizes).
- [ ] T11 Finish: Impeccable finish review, documenter, final critique and audit, before/after report.

## Decisions

- 2026-11-09: replace the visual world instead of evolving Evidence Folio (Andrés).
- 2026-11-09: evidence comes from Andrés's own repositories, and other projects may be added (Andrés).
- 2026-11-09: the page leads with work experience and the CV, as a general software engineer, with a timeline; technology detail is secondary (Andrés, after the first hand of directions).
- 2026-11-09: direction "Strata" chosen over the assigned "Stamped logbook" (Andrés).
- 2026-11-09: Attendia removed from the project list (Andrés), because no product screen can be captured without a production login.

## Waiting on Andrés

- Any further material Andrés said he would send.
- Claims the repositories do not support: "JWT + 2FA" (EduSpace), "Cloudinary" and "e-commerce" (Kataleya), Firestore design and the July 2025 end date (Booking, Mathyu's Solutions), and the "Tech Lead" title.
- The final headline in both languages.

## Acceptance checks

Per task: `npx tsc --noEmit`, `npm run lint`, `npm test`, and browser inspection at 320, 390, 768, 1200, and 1536px in both languages with no horizontal overflow. At close: `npm run build`, keyboard pass, reduced motion, `impeccable detect` on `src` and on the URL, the taste-skill inspector, and a final critique and audit compared with the baseline.

## Verification evidence

T0, observed on `09c67ec` (branch `feat/ux-ui-overhaul`), 2026-11-09:

- `npx tsc --noEmit`: exit 0.
- `npm run lint`: exit 0.
- `npm test`: 1 test, 1 pass.
- `npm run build`: exit 0.

T1 baseline, observed on `09c67ec`, 2026-11-09. Snapshot: `.impeccable/critique/2026-11-10T01-27-31Z__src-app-page-tsx.md`.

- The dev server on port 3000 served a stale stylesheet, so rendered evidence comes from `next start` on port 3100, whose stylesheet was confirmed to match source.
- Critique: 22/32 (heuristics 7 and 10 not applicable), 0 P0, 3 P1. Trend 21, 23, 22. The 23 and the 22 come from different assessors, so the one point is not a regression in the code.
- `impeccable detect src`: no findings. Rendered: `cream-palette`, and `oversized-h1` in the overlay at 1920px.
- Taste-skill inspector: 1 FAIL (`headline-lines`, four lines at 390px), 2 WARN (`hero-words`, `no-footage`). `lint.mjs src`: clean.
- No horizontal overflow from 390 to 1536px. Contrast: six pairs, lowest 4.51:1. Page height about 4,400 to 4,500px on desktop and 6,450 to 6,600px at 390px.
- Targets at 390px on a fine pointer: 21 of 30 under 44x44, four contact links 19px high. The coarse-pointer rule was not exercised.
- First load, production build: 24 requests, 661 kB; fonts 223 kB, images 234 kB, JS 162 kB.
- `h1` text content has no whitespace between its two lines.
- Not measured: real window resizing (same-origin iframes were used), scroll reveals and motion, hover and focus contrast, touch devices, screen readers.

Priority findings: the pictures show landing pages while the claim is backend architecture; Work hides three of four projects and their links; copy repeats itself; the record and the ending are flat; no persistent route to the CV or contact.

T3 to T7, observed on `d01d7a5`, 2026-11-09. One writer; the content, the page, and the stylesheet share one commit because the old sections stop compiling as soon as the content shape changes.

- Test-first, `src/content/content.test.ts`: RED on the old content, 10 tests, 1 pass, 9 fail (`projects is not iterable`, `strata` undefined). GREEN after the new content, 10 tests, 10 pass.
- `npx tsc --noEmit`: exit 0. `npx eslint src`: exit 0. `npm test`: 10 pass. `npm run build`: exit 0. `impeccable detect --json src`: `[]`.
- Rendered on `next start -p 3200` from this build, in same-origin iframes whose layout width was 320, 390, 768, 1200, 1440, 1536, and 1920px, in English and Spanish: no horizontal overflow at any width, including with the rail scrolled to every period.
- First viewport: at 1440x900 and 1536x700 the opening screen is exactly one viewport high in both languages, with the navigation, headline, dates line, status sentence, primary action, CV link, and the edges of the next two periods inside it. At 390x844 the same content ends at 478px (English) and 544px (Spanish); the two edges start at 516 and 666px (English).
- Headline: two lines on desktop, at most three at 320 and 390px. Its text content is one string with ordinary spaces.
- Contrast, computed from the rendered colours: basalt on ochre 7.54, chalk on oxide 4.72, chalk on slate 7.83, basalt on chalk 14.58, chalk on basalt 14.58, ochre on basalt 7.54. No other text pair is rendered.
- Structure: one `main`; the masthead and the rail are outside it; two named navigations; six sections, each named by its heading; the skip link target exists. Outline: one `h1`, an `h2` per period and for the close, an `h3` per sample and per bedrock group.
- Targets: none under 24px high at any width. With the coarse-pointer token applied by hand at 390px, none under 44x44, the open jump menu included. A real coarse pointer was not available.
- Keyboard: focus order runs skip link, masthead, rail, then the page; the ring is a 3px solid outline in the band's ink. Rail links, the contact link, and the primary action scroll to their targets and the marker follows.
- Pictures: five screenshots render at their own proportions, lazily; Attendia shows the labelled blank. Sample links read "Live site: <name> (opens in a new tab)" and "GitHub: <name> (opens in a new tab)".
- Console: no errors. The only messages are the Vercel Analytics and Speed Insights scripts, which do not load outside Vercel.
- Not checked: a real phone or touch device, a screen reader, the page with JavaScript disabled in a browser (the markup is server-rendered and the rail starts on the first period), `prefers-reduced-motion` in a browser (the rule is in the stylesheet), and real window resizing.

Look fixes, Attendia removal, and T8 to T10, observed on `298a25f`, 2026-11-09.

- `npx tsc --noEmit`: exit 0. `npx eslint src`: exit 0. `npm test`: 10 pass. `npm run build`: exit 0. `impeccable detect --json src`: `[]`. These ran on the final tree, not on each commit.
- `rg -i attendia src public`: no matches. Five projects, numbered 01 Vozella, 02 EduSpace, 03 Kataleya Flowers, 04 Booking Platform, 05 Finance App. The EDteam entry and its edge strip render without a tag row. The missing-picture state, its copy, and its styles were removed because nothing uses them.
- Taste-skill inspector at 1440, 768, and 390px on `next start -p 3200`. Before: `micro-label` (37), `side-scroll`, `covered-text`, `font-not-dealt`, plus the three below. After the first pass one new finding appeared, `eyebrow` at 768px (the primary action above the first edge strip); more space under the actions cleared it. Final: `palette-terracotta` (oxide is a contract colour), `off-centre` (the fixed rail), `no-footage`. `.taste-skill/direction.json` now records Strata, Archivo, and the five colours; the folder is git-ignored, so that change is local.
- Opening screen: the band of empty ochre is gone. At 1440x900 the CV link ends at 408px, the two edges start at 497 and 619px, and the first entry's heading is inside the viewport. At 1536x700 the edges start at 434 and 546px. Headline: two lines on desktop in both languages, three at most on phones in Spanish.
- No horizontal overflow at 320, 390, 768, 1200, 1440, and 1536px in English and Spanish, measured while scrolling the whole page.
- Labels: no uppercase letter-spaced text of 14px or less outside navigation and links. Smallest running text in `main` and the footer: 16px at 320px, 18px at 1440px.
- Motion: 1.3s after load nothing in the opening screen carries a transform; after scrolling through, all six bands are settled with no transform left. A band jumped over by a rail link settles when it is first seen. The rail marker's transform equals the offset of the current tick (282px for the fourth) and it parks at the contact band.
- Reduced motion was emulated by removing the `motion` class, which leaves the same rules inactive as the media query does: no element in `main` carries a transform. The real media query was not toggled in a browser.
- Phone menu: closed it is `display: none` with `aria-expanded="false"`; open it shows six links; Escape closes it and focus returns to the button; choosing a period closes it and scrolls there.
- Without script, emulated by removing the `js` class at 390 and 320px: the rail is in the flow under the masthead as the full list of six links, no button, no marked period, no overflow. JavaScript was not actually disabled in a browser.
- Coarse pointers: with the token the `pointer: coarse` query sets (`--target: 2.75rem`) applied by hand at 390px and the menu open, no link or button is under 44x44. The inspector's 390px run emulates touch and its screenshots show the 44px tags. A real touch device was not used.
- Person JSON-LD is in the document head: name, URL, role and employer from the first period, the university as `affiliation`, `knowsLanguage`, and two `sameAs` links.
- Fonts: the page requests one file, Archivo latin with the width axis, 90,096 bytes. The latin-ext (86 kB) and Vietnamese (34 kB) files are emitted by the build and are only fetched if a page uses those glyphs.
- Console: no errors.

## Progress

T0 to T10 are closed. Remaining: T11 (finish review, documenter, final critique and audit).

Open for Andrés:

- `PRODUCT.md` still lists Attendia and six projects.
- `public/og.png` still shows the old look.
- The removed Attendia screenshot was moved out of `public/work/`, not destroyed.
- The first screen shows the next two periods as link strips, then the surface entry continues in ochre. The periods' own bands follow further down, so oxide and slate each appear twice.
- The dates line sits under the headline, not above it, because the craft floor bans a label above a heading.
- The final headline wording.
