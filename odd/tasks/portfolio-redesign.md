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

- [ ] R1 Bond calculation module ported from `andrest04/finance-app`, with tests. Route: delegated (writer trigger, 2+ non-trivial files).
- [ ] R2 Tokens, Literata, page shell, nav with language switch, footer, removal of the old world. Route: delegated.
- [ ] R3 Hero with the working instrument. Route: delegated.
- [ ] R4 Work ledger with real screenshots. Route: delegated.
- [ ] R5 Experience, skills, about letter, contact, en and es copy, metadata facts. Route: delegated.
- [ ] R6 Motion layer. Route: delegated.
- [ ] R7 Gate on the production build, three look rounds at most. Route: delegated, parent reviews screenshots.

## Acceptance

- `inspect.mjs` on the production build: 0 FAIL at 1440, 768, 390. Every WARN fixed or defended.
- `npm run lint`, `npm run build`, `npm test` pass.
- Both locales render, every link works, keyboard reaches the instrument, reduced motion keeps all content.

## Findings to report to the user

- `https://kataleya-flawers.appwrite.network/` returned 404 on 2026-11-02.
- Metadata said 7th term and PostgreSQL while the content says 8th term and MySQL.
- Metadata points to `/og.png`, which is not in `public/`.
- Geist was loaded but never applied, so the old site rendered in `system-ui`.

## Progress

Skills `design-taste-frontend` and `impeccable` installed globally. Before-inspection: 14 FAIL, 5 WARN in `.taste-skill/before`.

## Next step

R1.
