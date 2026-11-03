# Portfolio redesign from scratch

Locator: `odd/tasks/portfolio-redesign.md` · Engram: `odd/portfolio-redesign/tasks` · Branch: `feat/redesign-from-scratch`

## Objective

Replace the ObsidianUI visual world with a new one, dealt by `design-taste-frontend`, that does not read as generated and keeps all factual content.

## Problem and why

The site renders in `system-ui`, projects are four identical stacks of pills and bullets without images, scroll reveals leave sections nearly invisible, and the hero leads with acronyms. The user asked for a redesign from scratch using the best design skills, with community portfolios as reference.

## Direction (`.taste-skill/direction.json`, reprint with `draw.mjs --show`)

- Direction `quiet-instrument`, seed 1537978750. Type Literata. Palette putty `#dedad3`, surface `#d3cec6`, ink `#0a0a0a`, muted `#5c5852`, accent teal `#256f82`.
- Hero `Control that reads the page`, sections: work `Quiet ledger`, list `Two-ended rows`, about `Founder's letter`, contact `Sentence, portrait, two links`, footer `A single quiet line`. Motion `Masked headline`.
- Why this direction: Andrés's work can run on the page as small exact demonstrations.
- Idea: on this page, the bond schedule his Finance App really calculates (TCEA, TREA, cash flows) becomes the working instrument in the hero.
- Live thing: change the face value, term, coupon and issue costs of a bond and read the real schedule, TCEA and TREA.

## Scope

In: all sections, tokens, type, copy in en and es, motion, removal of code and dependencies only the old world used, metadata facts.
Out: push, PR, deploy, new backend, invented facts.

## Constraints

- Keep the stack: Next.js 16, Tailwind 4, next-intl, en and es, `/api/cv`, analytics.
- Keep every fact in `src/content/*.json`. No invented numbers, years, clients or quotes.
- House rules of `design-taste-frontend` apply and are measured by `inspect.mjs`.
- UI copy in the language of each dictionary. Code and comments in English.

## Delivery

Strategy `single-pr`. Forecast is far above 400 authored lines, mostly deletions, and one visual world cannot ship half replaced. Work-unit commits on the branch; push and PR stay with the user.

## Tasks

- [x] R1 Bond calculation module ported from `andrest04/finance-app`, with tests. Route: delegated (writer trigger, 2+ non-trivial files). Commit `4af9df4`. RED: `ERR_MODULE_NOT_FOUND` on `bond.ts`. GREEN: 14 pass, 0 fail.
- [x] R2 Tokens, Literata, page shell, nav with language switch, footer, removal of the old world. Route: delegated. Commit `07610f1`.
- [x] R3 Hero with the working instrument. Route: delegated. Commit `c869ed9`.
- [x] R4 Work ledger with real screenshots. Route: delegated. Commit `75738a9`.
- [x] R5 Experience, skills, about letter, contact, en and es copy, metadata facts. Route: delegated. Commit `5cab480`.
- [x] R6 Motion layer. Route: delegated. Commit `0682d00`.
- [x] R7 Gate on the production build, two look rounds. Route: delegated, parent reviews screenshots. Commit: see `git log`, `fix(ui): align the instrument...`.

## Acceptance

- `inspect.mjs` on the production build: 0 FAIL at 1440, 768, 390. Every WARN fixed or defended.
- `npm run lint`, `npm run build`, `npm test` pass.
- Both locales render, every link works, keyboard reaches the instrument, reduced motion keeps all content.

## Findings to report to the user

- `https://kataleya-flawers.appwrite.network/` returned 404 on 2026-11-02.
- Metadata said 7th term and PostgreSQL while the content says 8th term and MySQL.
- Metadata points to `/og.png`, which is not in `public/`.
- Geist was loaded but never applied, so the old site rendered in `system-ui`.

## Decisions and exceptions

- Coupon is labelled nominal. The Finance App form calls its rate "Efectiva", but its French schedule divides the annual rate by the payment count, which is the nominal convention, while its real-time panel converts the same rate as effective. The port keeps the schedule arithmetic and labels the input honestly.
- Zero coupon gives NaN in the source (0 / 0) and non-convergence returns the last iterate. The port repays face / n and returns null.
- One "issue costs" control sets both the issuer and the investor commission, so both readouts move. The module keeps them separate.
- Control ranges follow the source form: face value in multiples of 1000, term 3 to 10 years, coupon 2 to 10%. Costs stop at 5% in the UI (source allows 10%).
- Kataleya: `kataleyaflowers.com` is live and is the homepage of the GitHub repo, so it replaces the dead demo link in both dictionaries and is the screenshot source.
- About letter: "working in Scrum" was attached to EduSpace in the deck, but the dictionary does not state that. Reworded so Scrum is a general practice.
- Experience and Skills share one `<section>` band so the right half is not empty; each keeps its own heading and anchor.
- Hero order on phones is instrument first per the blueprint; DOM order stays headline first for assistive technology.
- `public/og.png` is the real hero at 1200x630, with the schedule cut to two rows so it fits.

- Name corrected to Kataleya Flowers and the repository link updated after the repo rename. Commit `e985790`.

## Verification (production build)

- `npm test`: 14 pass, 0 fail.
- `npm run lint`: clean. `npm run build`: compiled.
- `lint.mjs src`: 0 FAIL, 0 WARN.
- `inspect.mjs http://localhost:3100 --out .taste-skill/after`: 0 FAIL, 2 WARN.
- WARN `no-footage`: no honest clip of a bond schedule or of these projects exists; the drifting screenshot is the moving picture.
- WARN `small-title` at 390px: the two-line rule forces 24px at that width (22px in Spanish), and the instrument carries the large type on that screen.
- Both locales render, language switch works, keyboard reaches and moves the sliders, disclosures toggle, no console errors or hydration warnings, external links resolve.

## Parent review fixes

Commit: `fix(ui): drop the generic EduSpace picture, the bullets and sliced schedule rows`.

- Detail images: removed EduSpace, a stock-looking laptop with generic analytics ("Users: last 7 days") that implied it was EduSpace's product. Kept Finance App (its own French-method chart and TCEA and TREA panels), Booking (its real rates) and Kataleya (its real best sellers).
- Removed every round dot and the EDTeam logo, which reads as a small spinner at 16px on putty, and the hanging indent. `public/edteam-logo.svg` is unused and outside the allowed surface.
- Schedule height is a whole multiple of a fixed row height (5 rows at 1440x900, 4 at 1280x800 and 768, 2 at 390), with row snapping. Measured: 0 sliced rows at rest, after arrow keys and after an arbitrary scrollTop.
- Removing the EduSpace crop raised `empty-screens` (screens 2 and 6 under 20%). Contact top padding now matches the About band, so the last screen holds more of that band.
- Result: `inspect.mjs` 0 FAIL, 2 WARN (`no-footage`, `small-title`, same defences). `npm test` 14 pass, `npm run lint` clean, `npm run build` compiled, `lint.mjs src` 0 FAIL, 0 WARN.

## Progress

Skills `design-taste-frontend` and `impeccable` installed globally. Before-inspection: 14 FAIL, 5 WARN in `.taste-skill/before`. After-inspection: 0 FAIL, 2 WARN in `.taste-skill/after`. Engram mirror `odd/portfolio-redesign/tasks` pending, for the parent to synchronize.

## Next step

None. Merged into main and pushed at the user's request on 2026-11-02.
