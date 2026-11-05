---
target: home page
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Code\\portfolio\\src\\app\\page.tsx"
target_fingerprint: "sha256:c06b5590f8a96c958eac85d80ea4df37fe6abc566691b37b81ef9e10dd834c46"
target_path: "C:\\Code\\portfolio\\src\\app\\page.tsx"
timestamp: 2026-11-05T05-01-24Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review; B: detector and browser)

# Critique: home page (src/app/page.tsx)

## Design health: 21/32 (66%, Acceptable)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Accordion feedback is clear; nav has no current-section state |
| 2 | Match System / Real World | 2 | "Have a project in mind?" addresses clients; TCEA/TREA unexplained |
| 3 | User Control and Freedom | 3 | CV replaces the page; opening a row jumps it under the cursor |
| 4 | Consistency and Standards | 3 | Solid visual system; identity varies across title, hero and CV filename |
| 5 | Error Prevention | 3 | "Download" mislabels what happens |
| 6 | Recognition Rather Than Recall | 2 | Hero pictures uncaptioned; CV only at the top |
| 7 | Flexibility and Efficiency | n/a | One-page reading surface |
| 8 | Aesthetic and Minimalist Design | 3 | Disciplined; Skills notes repeat earlier claims |
| 9 | Error Recovery | 2 | Missing CV returns raw JSON |
| 10 | Help and Documentation | n/a | Nothing needs documentation |

## Design specificity

The system is authored, but the argument is not proven: "builds backends" sits above marketing homepages and no backend artifact appears. Detector: 0 findings in src; rendered page reports cream-palette and oversized-h1, both documented intentional choices in DESIGN.md. Contrast 0 of 112 under 4.5:1 at desktop; 15 of 28 interactive elements under 44px tall.

## Priority issues

- [P1] Headline claims backends; evidence shows storefronts. Fix: caption hero pictures with project and role; add a real backend artifact and API repository link. Command: shape.
- [P1] CV misnamed and only at the top; opens over the page. Fix: real download, links in Contact and footer, label "CV (PDF)". Command: harden.
- [P1] Hero actions below the fold at 1536x674 (hero 814px, actions at y=730). Fix: constrain picture height so copy and actions fit down to about 620px. Command: layout.
- [P2] Copy addresses the wrong reader and repeats itself (contact line, Clean Architecture on 6 lines, "results-driven mindset" twice, tab title). Fix: rewrite for hiring, dedupe, align title. Command: clarify.
- [P2] On mobile the h1 (24px) is smaller than h2 (28px), and the last letter clips with a classic scrollbar. Fix: below 600px wrap at a larger size, measured against the container. Command: typeset.

## Persona red flags

- Jordan: uncaptioned external picture links; unexplained DDD and CQRS; bare plus icon.
- Casey: Download CV 27px tall, nav 33px; Work runs 1830px; email breaks mid-string.
- Sam: tab order, focus and skip link pass; hero links announced by picture description; no new-tab warning.
- Recruiter: no graduation date or availability; contact line reads as freelance.
- Tech lead: EduSpace links go to a landing page and repository list; "+25% / +20% / -30%" in the screenshot lacks backing; "Enterprise platform" may read as inflated.

## Minor observations

- Opening Finance moves its row from y=349 to y=45.
- "Desarrollador Full-Stack" wraps and knocks row alignment.
- Same portrait twice within about 800px.
- Ghosted sections during fast scrolling.
- A single PDF for both locales.

## Questions to consider

1. What would the page look like if the biggest image were an API?
2. Does an evaluator need four equal projects, or one EduSpace case and three supporting rows?
3. Can the folio show an architecture decision with its tradeoffs?
