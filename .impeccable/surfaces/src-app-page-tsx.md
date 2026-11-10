---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Home page

## Scope and mode

The single home page of the portfolio, `src/app/page.tsx`. Mode: Experience. Build path: code-led.

## Audience, job, action

Recruiters and tech leads deciding whether to interview Andrés. They look first at where a candidate has worked, so work experience leads and projects support it. Actions: download the CV, make contact, open a project.

## Proof and content

- The CV (`Andres_Torres_CV.docx`, supplied 2026-11-09) is the content source for experience, education, certifications, and languages.
- Projects come from Andrés's public repositories; engineering facts stay secondary to the experience story and are never the navigation.
- Andrés asked for the page to read as a general software engineer, not as a list of technologies.

## Constraints

- Facts are not invented; English and Spanish carry the same facts.
- Screenshots are real and are not cropped.
- No cream ground, no single-serif page: the previous look was replaced on purpose.

## Direction contract

THESIS: The page is a core sample of a working life. Scrolling down goes back in time, each job is a stratum, and each project sits inside the stratum where it was built. It refuses the hero, card grid, and skills list every developer portfolio ships.

OWN-WORLD: Flat strata in ochre `#e0a11b`, oxide `#b5432a`, slate `#2f4a66`, and basalt `#1b1c1e` on cool chalk `#e9eef0`. Irregular stratum boundaries. A fixed basalt depth rail with year ticks. Numbered sample labels in outlined tags. Heavy grotesk display type. No gradients, shadows, or rounded cards.

STORY: In one screen the visitor knows who Andrés is and where he works now. Each stratum gives employer, role, dates, what he did, and its samples with links, so the claim is checkable. The CV and contact stay reachable from the rail at any depth.

FIRST VIEWPORT: A 150px basalt rail on the left with year ticks. The top stratum, ochre, fills about 62% of the height: navigation, a "Surface" kicker with the current dates, a short display headline, the status sentence bottom left, the primary action and CV bottom right. Below it, the edges of the next two strata show employer, role, dates, and sample tags.

SIGNATURE INTERACTION: The depth rail tracks the scroll: the current tick marks the position and choosing a tick drills to that stratum. Stratum boundaries settle as they enter. Reduced motion renders everything in place.

FORM: Strata (stratigraphic column), first on the ordered list of the second round and chosen by Andrés over the assigned direction. seed:c1124c546a4ab16f

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

- Which projects appear, and in which stratum each one sits.
- The final headline in both languages.
- Portfolio claims the repositories do not support (2FA, Cloudinary, e-commerce, Firestore design, the Mathyu's Solutions end date, the Tech Lead title) wait on Andrés.
