---
target: home page
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Code\\portfolio\\src\\app\\page.tsx"
target_fingerprint: "sha256:c06b5590f8a96c958eac85d80ea4df37fe6abc566691b37b81ef9e10dd834c46"
target_path: "C:\\Code\\portfolio\\src\\app\\page.tsx"
timestamp: 2026-11-05T05-38-57Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review; B: detector and browser). Production build.

# Critique: home page (src/app/page.tsx), second run

## Design health: 23/32 (72%, Good)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | No current-section cue on a long page |
| 2 | Match System / Real World | 3 | TCEA/TREA and "Unit of Work" unexplained |
| 3 | User Control and Freedom | 3 | New-tab links have no visual cue |
| 4 | Consistency and Standards | 2 | "Education Project" in the role column; "Live Demo" points at landing pages; previews collide |
| 5 | Error Prevention | 3 | Hero pictures leave the site |
| 6 | Recognition Rather Than Recall | 3 | Links in closed rows are hidden |
| 7 | Flexibility and Efficiency | n/a | No repeat-use workflow |
| 8 | Aesthetic and Minimalist Design | 3 | Repeated copy; duplicate footer links |
| 9 | Error Recovery | 3 | CV failure message has no way back |
| 10 | Help and Documentation | n/a | Nothing needs documentation |

## Design specificity

Visually specific, narratively weaker. Detector: 0 in src; rendered page reports cream-palette and oversized-h1, both documented in DESIGN.md. Contrast 0 of 115 under 4.5:1 at desktop in English.

## Priority issues

- [P1] Visual evidence undercuts the headline; EduSpace, the only .NET project, has the smallest picture. Needs real backend artifacts from Andrés. Command: shape.
- [P1] "Live Demo" and repository links promise more than they deliver (EduSpace and Finance App URLs are landing pages; EduSpace GitHub is an organization list). Needs real URLs or relabeling by Andrés. Command: clarify.
- [P2] Ledger hides and displaces evidence on desktop: previews stack, detail image clips, closed rows look disabled. Command: layout.
- [P2] Copy relies on adjectives and repeats itself ("robust", "results-driven", "Enterprise platform"). Command: distill.
- [P2] Contact ends flat: equal channel weight, duplicate footer links. Command: layout.

## Persona red flags

- Jordan: TCEA/TREA and CQRS unexplained.
- Casey: 6708px page with non-sticky nav; "Contacto" wraps alone in Spanish.
- Sam: "Live Demo" and "GitHub" repeat without project name; nav sits inside main.
- Recruiter: no graduation date or availability; "Ingeniero de Software" reads closer to a held title.
- Tech lead: no architecture artifact.

## Minor observations

- Booking caption wraps to two lines in Spanish.
- "Download" is a weak label above "CV (PDF)".
- Hero pictures are links; ledger pictures are not.
