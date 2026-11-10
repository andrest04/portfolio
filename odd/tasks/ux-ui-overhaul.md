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
- [ ] T2 Design direction, presented to Andrés for approval; `DESIGN.md`, `.impeccable/design.json`, and `.taste-skill/direction.json` updated after approval.
- [ ] T3 Foundations: tokens in `src/app/globals.css`, type in `src/app/layout.tsx`.
- [ ] T4 Navigation: mobile pattern and active section state.
- [ ] T5 Hero.
- [ ] T6 Work, and case pages if approved.
- [ ] T7 Experience and skills, About, Contact, footer.
- [ ] T8 Motion, gated by `prefers-reduced-motion`.
- [ ] T9 States and edge cases: error, not-found, focus, touch targets, long Spanish strings.
- [ ] T10 Hardening: measured contrast, landmarks, image weight and hints, Person JSON-LD, unused assets.
- [ ] T11 Final verification and before/after report.

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

T0 and T1 are closed. Next step: T2, the design direction, which waits on Andrés's choice between evolving the current look and replacing it.
