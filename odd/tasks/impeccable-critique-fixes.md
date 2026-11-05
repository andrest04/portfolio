# Impeccable critique fixes

## Objective

Apply the findings of the home page critique that do not need new facts or assets from Andrés, then verify the result by looking at the rendered page.

## Problem and why

The critique scored the page 21/32 (`.impeccable/critique/2026-11-05T05-01-24Z__src-app-page-tsx.md`). The primary audience is recruiters and tech leads, and the page makes them work to reach the CV and the next step.

## Scope and constraints

- Refinement only: the Evidence Folio visual system in `DESIGN.md` stays, including palette, Literata, flat depth, and square corners.
- Factual claims are not added or changed. Both `en.json` and `es.json` change together.
- Andrés authorized working to the end without further input (2026-11-05). Push, pull request, and merge stay with Andrés.
- `main` is untouched. The prior uncommitted work is snapshotted in `6fc3a3e` so these fixes stay reviewable.

## Delivery

Strategy: `ask-on-risk`. Forecast: about 400 authored changed lines. The chain choice, if needed, waits for Andrés because nothing is pushed.

## Tasks

Route for T1-T6: delegated direct, one writer (2+ non-trivial files). RDD is off globally, so verification follows `gentle-ai review assess`.

- [x] T1 `harden`: real CV download, label "CV (PDF)", links in Contact and footer, readable missing-CV response, localized error and not-found pages, new-tab notice on external links. Commit `6c9ffa2`, delegated (writer trigger, 2+ non-trivial files).
- [x] T2 `layout`: hero copy and actions inside the first screen down to about 620px tall; hero pictures captioned with project and role, naming the link by project. Commit `07f8b3f`, delegated (writer trigger).
- [x] T3 `typeset`: mobile headline larger than section titles with no clipping; Spanish role no longer breaks ledger alignment. Commit `44911e4`, delegated (writer trigger).
- [x] T4 `clarify` and `distill`: contact line for hiring, consistent page title, duplicated Skills notes removed. Commit `d066b96`, delegated (writer trigger).
- [x] T5 `adapt` and `animate`: coarse-pointer touch targets, email wrapping, accordion row stability, no ghosted sections during fast scrolling. Commit `6108cbf`, delegated (writer trigger).
- [ ] T6 Docs and cleanup: stale README, dead tokens, stale comments, detector exceptions, `DESIGN.md` and sidecar in sync, `PRODUCT.md` open decision resolved. Commit `d772211`, delegated (writer trigger). Everything is done except the `cream-palette` exception, which stays open: the detector refuses a value form for that rule, and offers only a `"*"` wildcard scoped to a file glob, which is not used here. `oversized-h1` no longer reports, so it needs no exception.
- [ ] T7 `audit` and `polish`: technical pass, snapshot closure, and a final critique run.

## Acceptance checks

`npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`, the Impeccable detector, and browser inspection at desktop and mobile widths in both languages.

## Waiting on Andrés

- A real backend artifact (Swagger, architecture diagram, or schema) and the API repository link for EduSpace.
- Whether "+25% / +20% / -30%" in the EduSpace screenshot is real.
- Whether "Enterprise platform" and "measure outcomes" should stay.
- Expected graduation date and availability.
- A Spanish CV, if wanted.
- Whether "Ingeniero de Software" is acceptable in the Spanish title and description, given that `PRODUCT.md` rules out claiming a professional title not yet held.
- Whether to accept the `cream-palette` detector finding or suppress it with the wildcard form.

## Verification evidence

Observed on `d772211`:

- `npx tsc --noEmit`: exit 0.
- `npm run lint`: exit 1, 3 errors and 101 warnings, all in `.claude/skills/`. `npx eslint src` is clean. The fix is an ignore in `eslint.config.mjs`, outside this writer's edit surface.
- `npm test`: 1 test, 1 pass. It failed as expected when a Spanish key was renamed on purpose.
- `impeccable detect --json src`: `[]`.
- `impeccable detect --json http://localhost:3000`: one finding, `cream-palette`.
- Browser: hero actions end at y=634 at 1536x674 and y=580 at 1536x620, in both languages. No horizontal overflow from 320px to 1536px. Opened ledger rows hold their position. The error boundary rendered in both languages under a temporary throw, since removed.
- Not run: `npm run build`, owned by the parent. Real touch devices: coarse-pointer sizing was measured by applying the rule's CSS on a desktop pointer.

## T7 audit and polish

Route: delegated direct, one writer. Commits: `0c2cfca`, `66604d7`, `78ed936`, `927913c`, `0d919c3`. T7 stays open until the parent runs `npm run build` and the final critique.

Baseline audit on `0ef8db4`, before the fixes:

| Dimension | Score | Key finding |
| --- | --- | --- |
| Accessibility | 3 | Skip link did not bypass the navigation; contrast 0 of 129 text elements below threshold |
| Performance | 3 | Four font files, 396 kB, preloaded; two of them unused `latin-ext` |
| Theming | 3 | Full token system; light only by decision; hex in the manifest, where CSS variables cannot apply |
| Responsive | 3 | Spanish h1 33.6px against a 30px h2 at 600px; no overflow from 320px to 1920px |
| Implementation integrity | 3 | Stale role in the manifest, hard-coded loading text, lint reporting vendored code |
| **Total** | **15/20** | **Good** |

Findings:

- [P1] Skip link targeted `main`, which starts with the navigation, so the next Tab landed on the name link. `src/app/layout.tsx:121`. Fixed in `927913c`.
- [P2] Skip link target missing on the error and not-found pages. `src/app/not-found.tsx:10`, `src/app/error.tsx:21`. Fixed in `927913c`.
- [P2] Headline hierarchy from 600px to 767px. `src/app/globals.css:300`. Fixed in `78ed936`.
- [P2] Unused `latin-ext` preloads, about 177 kB. `src/app/layout.tsx:12`. Fixed in `0d919c3`.
- [P2] Hard-coded English loading text. `src/app/loading.tsx:5`. Fixed in `66604d7`.
- [P3] Manifest role. `src/app/manifest.ts:8`. Fixed in `66604d7`.
- [P3] Lint scope. `eslint.config.mjs:9`. Fixed in `0c2cfca`.
- [P3] Not-found page had the home title. Fixed in `927913c`.
- [P3] Contact portrait had no `sizes`, and rendered at 284px from a 256px source at 1920px wide. `src/components/sections/Contact.tsx:20`. Fixed in `0d919c3`.
- [P3] Open, outside the edit surface: `public/brand.svg` (546 kB) and `public/edteam-logo.svg` have no reference in `src`. `@eslint/js`, `eslint-plugin-react`, `globals`, and `typescript-eslint` are not referenced by `eslint.config.mjs` or `next.config.ts`; a wider dependency check was not run.
- [P3] Open, judgment call: where a headline line wraps below 768px, the gap between authored lines is about 0.14em larger than inside a line, because the masks' negative margins collapse. It comes from the same rule as the desktop look, so it stays.

Decision: `full-stack developer` and `desarrollador full-stack` stay in the `layout.tsx` keywords unchanged. They are search terms that visitors do not see, and they match the real role at Mathyu's Solutions.

The first P1 of the critique snapshot (backend evidence) stays open, so `2026-11-05T05-01-24Z__src-app-page-tsx.md` is not closed.

Evidence on `0d919c3`:

- `npx tsc --noEmit`: exit 0.
- `npm run lint`: exit 0, no output from ESLint.
- `npm test`: 1 test, 1 pass.
- `impeccable detect --json src`: `[]`.
- `impeccable detect --json http://localhost:3000`: one finding, `cream-palette`, left for Andrés.
- Browser, same-origin iframes: h1 is 34px against a 28px h2 at 320px and 390px, and 40px against 30px to 31.7px from 599px to 767px, in both languages. From 768px up it is unchanged: 46.7px in English and 41.5px in Spanish at 768px, against a 31.7px h2. No clipped lines and no horizontal overflow at 320, 390, 599, 600, 640, 700, 767, 768, 1100, 1536, and 1920px in either language.
- Keyboard, 1536px, English: skip link, then Enter, then Tab lands on "View projects". The order then runs through the hero, Work, Contact, and footer with a visible ring, and no console errors. Fonts now load two files. The loading text appears in the response stream in the active language, and the not-found title is localized.
- Not run: `npm run build`, owned by the parent. Not tested: real touch devices, screen readers, the error page after the `id` change (only an attribute changed), and `prefers-reduced-motion` in a live browser (checked in the CSS only). Performance figures come from the dev server, not a production build.

## Progress

Baselines committed: `6fc3a3e`, `37139cd`. T1 to T5 are closed; T6 has the one open exception above. Authored changes so far are about 585 lines before T7, above the 400 line delivery budget, so the chain choice is due when Andrés decides on delivery. T7 fixes are committed; the build and final critique remain with the parent.
