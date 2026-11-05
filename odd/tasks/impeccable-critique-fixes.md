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

## Progress

Baselines committed: `6fc3a3e`, `37139cd`. T1 to T5 are closed; T6 has the one open exception above. Authored changes so far are about 585 lines, above the 400 line delivery budget, so the chain choice is due when Andrés decides on delivery. T7 next.
