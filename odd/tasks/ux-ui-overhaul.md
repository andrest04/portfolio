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
- [ ] T3 Content model: experience from the CV (Teleperformance Perú, EDteam, Mathyu's Solutions), education, certifications, languages, and the agreed project list, in `src/content/en.json`, `src/content/es.json`, and `src/types/i18n.ts`; `PRODUCT.md` facts brought up to date.
- [ ] T4 Foundations: Strata tokens in `src/app/globals.css`, type in `src/app/layout.tsx`.
- [ ] T5 First viewport: depth rail, surface stratum, navigation.
- [ ] T6 Strata: one stratum per job with its project samples; education as bedrock.
- [ ] T7 Close: contact, CV, footer signature.
- [ ] T8 Motion and the rail interaction, gated by `prefers-reduced-motion`.
- [ ] T9 States and edge cases: error, not-found, focus, touch targets, long Spanish strings, phone layout.
- [ ] T10 Hardening: measured contrast, landmarks, image weight and hints, Person JSON-LD, unused assets.
- [ ] T11 Finish: Impeccable finish review, documenter, final critique and audit, before/after report.

## Decisions

- 2026-11-09: replace the visual world instead of evolving Evidence Folio (Andrés).
- 2026-11-09: evidence comes from Andrés's own repositories, and other projects may be added (Andrés).
- 2026-11-09: the page leads with work experience and the CV, as a general software engineer, with a timeline; technology detail is secondary (Andrés, after the first hand of directions).
- 2026-11-09: direction "Strata" chosen over the assigned "Stamped logbook" (Andrés).

## Waiting on Andrés

- The project list, and further material Andrés said he would send.
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

## Progress

T0, T1, and T2 are closed. Next step: T3, which waits on the project list.
