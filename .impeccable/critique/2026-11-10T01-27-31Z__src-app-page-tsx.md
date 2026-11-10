---
target: home page
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Code\\portfolio\\src\\app\\page.tsx"
target_fingerprint: "sha256:f2f879c171087cd4cb06a26e56b11a014bc127ed7054609dedf3c7a4db9ee1fb"
target_path: "C:\\Code\\portfolio\\src\\app\\page.tsx"
timestamp: 2026-11-10T01-27-31Z
slug: src-app-page-tsx
---
Method: dual-agent (A: afd57c467fbd87a48 · B: aba3361d64c1259ab)

Run note: the dev server on port 3000 served a stale stylesheet, found independently by both assessors. Rendered evidence comes from a production build of `feat/ux-ui-overhaul` (base `09c67ec`) on port 3100. Viewport widths were measured in same-origin iframes because the browser window would not resize.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Nav is not sticky and has no current-section state |
| 2 | Match System / Real World | 3 | Unexplained jargon piles (Clean Architecture, DDD, CQRS, Unit of Work) |
| 3 | User Control and Freedom | 3 | No route back to the nav once scrolled; hero pictures leave for external sites with no cue |
| 4 | Consistency and Standards | 3 | Pictures link out, rows expand, hover swaps the preview: three behaviours for one kind of object |
| 5 | Error Prevention | 3 | The exclusive accordion closes what the visitor was reading |
| 6 | Recognition Rather Than Recall | 2 | Three of four projects and all project links are hidden behind closed rows |
| 7 | Flexibility and Efficiency | n/a | Experience mode, no repeat-use workflow |
| 8 | Aesthetic and Minimalist Design | 2 | Flat after the hero: one size and weight, teal used once, facts repeated up to five times |
| 9 | Error Recovery | 3 | CV fallback copy exists; not triggered in this run |
| 10 | Help and Documentation | n/a | Not needed on a portfolio |
| **Total** | | **22/32** | **Acceptable (69%)** |

## Design Specificity Verdict

LLM assessment: authored in one place only. The measured two-line headline and the triptych of real client screenshots belong to Andrés. Everything below the fold (text accordion, two-column CV dump, centred letter, contact list) would serve any junior developer with the name swapped. The system is defined by abstentions (no borders, shadows, second face, or colour), which reads as tasteful but timid. The claim is "backends, starting from the architecture" and the page shows no architecture.

Deterministic scan: `impeccable detect src` returned no findings. On the rendered page: `cream-palette` on `body`, and `oversized-h1` in the overlay at 1920 (127px, 57 characters, 32vh). Taste-skill inspector: 1 FAIL (`headline-lines`, the hero headline wraps to 4 lines at 390px) and 2 WARN (`hero-words` 11 words, `no-footage`). `lint.mjs src`: clean. The detector agrees with the review that the headline is the one loud element, and caught what the review missed: the 4-line mobile headline, and that `h1` text content has no whitespace between its two lines ("backendsand", "backendsy").

Visual overlays: injection succeeded and reported the two rendered findings above.

## Overall Impression

A confident first screen followed by four screens of quiet text. The biggest opportunity is to make the page prove the engineering claim instead of stating it.

## What's Working

- The measured headline fits both languages on two lines from 768px up and states the positioning in one sentence.
- Real work on the first screen with honest captions, and a truthful subline about being a student and intern.
- Ledger interaction craft: an opened row holds its position, focus has a clear ring, the accordion works without script. Contrast passes everywhere (lowest pair 4.51:1); no horizontal overflow from 390 to 1536px.

## Priority Issues

- **[P1] The evidence contradicts the claim.** Every image is a marketing landing page; no API, schema, diagram, or code appears. A tech lead checking "backends, starting from the architecture" concludes "frontend". Fix: one engineering artefact per project and lead with EduSpace. Needs assets from Andrés. Suggested command: /impeccable shape.
- **[P1] Work hides three of four projects and buries the links.** Viewing projects is the primary action, and Live Demo and GitHub sit inside closed panels. Fix: four open case entries with image, role, one-line outcome, and both links visible. Suggested command: /impeccable layout.
- **[P1] Redundant, adjective-led copy.** "Clean Architecture, DDD, CQRS" appears five times; Experience, Skills, and About restate each other; "robust" and "results-driven" break the product's own principle. Fix: one short record, each fact once. Suggested command: /impeccable distill, then /impeccable clarify.
- **[P2] Flat record and a weak ending.** One size and weight after the hero; the contact statement is smaller than a section title. Fix: real scale contrast and a display-size close with email and CV. Suggested command: /impeccable bolder.
- **[P2] No persistent route to the CV or contact, and small touch targets.** The CV link exists only at the top and bottom of about 4,500px. At 390px, 21 of 30 targets are under 44x44 on a fine pointer, and four contact links are 19px high. Fix: a sticky slim bar and larger targets. Suggested command: /impeccable adapt.

## Persona Red Flags

- **Recruiter with 30 seconds**: gets name, claim, and status in 5 seconds; then one open project full of acronyms and three closed rows; then a grey text wall. Likely takeaway: "student, some sites", not "led a team of five".
- **Jordan (first-timer)**: clicks the sunflower picture and lands on a flower shop in a new tab; reads "+" as decoration; "Education Project" and "Microservices (baseline)" mean nothing.
- **Casey (mobile)**: about 6,500px of page; the headline takes four lines; the nav takes two rows in English and three in Spanish; the email breaks across lines; contact links are 19px high.

## Minor Observations

- `h1` text content joins its two lines without a space.
- "Tech Lead" on a university team project is not marked as academic.
- The portrait appears twice within one screen.
- Metadata says "specialized in .NET 8" while PRODUCT.md says not a specialist.
- Fonts are a third of the first load (223 kB of 661 kB).
- The Contact heading takes two lines in Spanish.

## Questions to Consider

- If the claim is architecture, why is the most prominent thing a florist's sunflowers?
- With only four projects, what is the accordion saving?
- Would the page be stronger with Skills deleted and each technology shown where it was used?
