# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and tech leads evaluating Andrés Torres as a candidate, deciding whether to interview Andrés.

## Product Purpose

A personal portfolio that presents Andrés Torres as a software engineer and gives an evaluator enough real evidence to take the next step. The site's calls to action are downloading the CV, making contact, and opening a project.

## Positioning

Andrés presents as a general software engineer, not as a backend or frontend specialist and not as a list of technologies. Andrés asked for this on 2026-11-09: the page leads with work experience, in reverse order of time, and each project sits in the period where it began. Technologies appear as a short secondary line per item and are never the navigation.

The target role is deliberately not narrowed to one specialty.

## Operating Context

Evaluators can verify the site's claims through live demos, GitHub repositories, and the CV. The site is available in English and Spanish.

## Capabilities and Constraints

- Structure: an opening screen, one band per period of work with its projects, education with certifications, languages and a short skills list, and a closing contact band. A persistent rail links to every period, the CV, and contact.
- Available in English and Spanish, with the language selected by cookie rather than by route. Content lives in `src/content/en.json` and `src/content/es.json`, and any copy change must cover both.
- CV download, plus links to live demos and GitHub for each project.

Factual limits:

- Andrés is still a student: ninth term of Software Engineering at UPC, August 2022 to July 2027 (expected). Copy must not claim a completed degree or a professional title not yet held, and Spanish copy must not use "Ingeniero de Software" as a title for Andrés.
- The current position is Reporting intern at Teleperformance Perú, since August 2026, and this must stay stated accurately.
- Project copy must not claim what the repositories do not support: no "2FA", "Cloudinary", or "e-commerce", no Firestore design or optimisation, and no payments work on the booking platform. `src/content/content.test.ts` checks the first three.

The contact statement addresses the primary audience, recruiters and tech leads: "Hiring? Let's talk." in English and "¿Estás contratando? Hablemos." in Spanish.

## Brand Commitments

- Name: Andrés Torres.
- Voice observed in the current copy: first person, direct, and factual.

## Evidence on Hand

- Experience: Teleperformance Perú (Reporting intern, Aug 2026 to present), EDteam (Frontend intern, Apr 2026 to May 2026), and Mathyu's Solutions (Full-Stack Developer, Mar 2025 to Jul 2025).
- Five projects: Vozella (solo, beta, Windows only), EduSpace (technical lead of a five-person university team), Kataleya Flowers (solo, in production for a flower shop in Lima), Booking Platform for recreational spaces in Italy (team of six at Mathyu's Solutions), and Finance App (solo). Screenshots are in `public/work/`. Attendia was left out on 2026-11-09 because no product screen can be captured without a production login.
- Education: Software Engineering at UPC, top fifth of the class ("Quinto Superior"). Six certifications. Languages: Spanish (native) and English (B1).
- The CV, served from `/api/cv`.

Absent from the current content, and not to be fabricated: testimonials, employer references, usage or performance metrics, press, and awards.

## Product Principles

1. Evidence over adjectives: every claim should point to a project, role, or link the visitor can verify.
2. Respect the evaluator's time: who Andrés is, what Andrés has built, and how to make contact must be quick to find.
3. Honest about seniority: present real ownership without inflating titles or experience.
4. Equal in both languages: the English and Spanish versions carry the same facts.
