# Feature: obsidian-blocks

## Objective
Bring the ObsidianUI (`@obsidian`) non-primitive blocks into the portfolio wherever they can carry the existing content, keeping every text, link and project unchanged. Builds on `odd/tasks/obsidian-primitives.md` and `odd/tasks/hero-v-prism.md`.

## Decision history
- User: "todo quiero de obsidian" (twice), then "todoooo obsidian" after the parent recommended leaving most blocks out. The parent's concerns stand as documented risks, but the instruction is to use Obsidian for everything feasible. Do not re-litigate.
- Blocked by missing inputs, not by preference (revisit when the input exists): `hover-img` and `art-gallery` need project screenshots (`public/` has none; `ProjectCard` has no image field); `visitor-count` needs a `/api/visitors` backend and a consent decision (it stores a localStorage fingerprint); `status-bars` needs real status data.
- Still rejected for concrete incompatibility: `split-showcase` (exactly 2 items), `smooth-scroll` (Lenis conflicts with `scroll-behavior: smooth`, hash anchors and the command palette `scrollIntoView`). `liquid-metal` is already not used (v-prism was chosen).

## Constraints
- Vendor the Obsidian code unmodified except for minimal, documented patches (theme hook, valid HTML element, content). Our adaptation code lives in separate files.
- Keep all copy, links, routes and i18n. Brand copy in Obsidian demo blocks (e.g. "Obsidian UI" wordmark, sponsor logos, fake links, default labels) must be replaced by the portfolio's own i18n content.
- Do not overwrite `src/lib/utils.ts` (every registry item ships an identical copy).
- Respect `prefers-reduced-motion` and keep text readable in dark and light.
- Each task closes with `npx tsc --noEmit`, `npx eslint src` (only the 2 known baseline errors allowed: `src/components/providers/ThemeProvider.tsx:39` and `src/components/layout/navbar/NavbarThemeToggle.tsx:17`) and `npm run build`, then a work-unit commit.

## Tasks
- [x] B1 `draggable-marquee`: draggable strip of the portfolio's skills in AboutSkills, rendering the existing skill pills as text through the block's `renderItem` (items carry a symbolic `src`). Existing skill groups and all text stay. Route: delegated writer.
- [x] B2 `discover-button`: use it (it renders an `<a>` when `href` is set) for the Hero primary CTA ("View projects", `#projects`) and the Contact "Send email" CTA (mailto), with i18n labels instead of the demo label. Route: delegated writer.
- [ ] B3 `flip-text`: use it for the Hero `<h1>` title in place of the GSAP `SplitText` character animation (both animate characters, so keep only one). Patch the block to render a `span` (a `div` is invalid inside `h1`), `loop={false}`, add a reduced-motion guard, keep the rest of `useHeroAnimation` (eyebrow, subtitle, CTA, portrait, scroll indicator). Route: delegated writer.
- [ ] B4 `footer`: rebuild `src/components/layout/Footer.tsx` on the Obsidian `footer` structure with the portfolio's own wordmark/name, real links (GitHub, LinkedIn, mailto) and `t.footer` i18n texts; ship the CSS the block needs (`font-serif-elegant`, `wordmark-gradient`, `#light-*` ids) and use no `<h1>`. Route: delegated writer.
- [ ] B5 Parent visual check in Chrome (dark and light): AboutSkills marquee, Hero CTAs and title animation, Contact CTA, Footer.

## Acceptance criteria
- tsc, eslint (baseline of 2) and build pass after each task; only allowed files change.
- No Obsidian demo copy or external URL left in the shipped code (`rg "Obsidian|obsidianui"` in `src` only matches code comments of patches).
- Content parity: same texts and links as before in every touched section.

## Progress
- Branch `feat/obsidian-blocks` created from `feat/obsidian-primitives` (b1491a8).

## Evidence
- B1 (delegated writer): `npx tsc --noEmit` clean; `npx eslint src` only the 2 baseline errors; `npm run build` OK; `rg "Program Files|obsidianui" src public package.json` no matches; `src/lib/utils.ts` unchanged. Visual/drag check pending (B5).
- B1 patch: vendored block imports `gsap/dist/Draggable` instead of `gsap/Draggable` (TS1149 casing clash with gsap's lowercase `draggable.d.ts`). `renderItem` bypasses `next/image`, so the symbolic `src: "#"` is never used. New i18n key `aboutSkills.marqueeLabel` (en/es).

- B1 parent re-verification: `git status` shows only the expected files (3 new: block `.jsx`, its CSS, `SkillsMarquee.tsx`; 4 modified: AboutSkills, en/es dictionaries, i18n types); dictionary diff is exactly the new `marqueeLabel` key; `node_modules/gsap/dist/Draggable.js` exists; `npx tsc --noEmit` clean; `src/lib/utils.ts` unchanged.
- B2 (delegated writer): `npx tsc --noEmit` clean; `npx eslint src` only the 2 baseline errors; `npm run build` OK; `rg "Program Files|obsidianui|Discover Components" src public package.json` no matches; `src/lib/utils.ts` unchanged; built CSS emits `.discover-cta` custom properties and border rule. Visual/hover check pending (B5).
- B2 patch: vendored `discover-button.tsx` default label `"Discover Components"` replaced by `""` (callers always pass i18n label). Theme bridge `.discover-cta` in `globals.css` maps the block's custom properties to `--text`/`--bg` (swapped by `.light`/`.dark`), so one rule serves both themes. Contact CTA lost the small ArrowUpRight icon (block has its own arrow).

- B2 parent re-verification: call-site diffs keep `hero.ctaPrimary` -> `#projects` and `isEs ? "Enviar email" : "Send email"` -> `mailto:${email}`; `--text`/`--bg` triplets swap under `.light` (0 0 0 / 255 255 255), so the single `.discover-cta` rule inverts correctly; `npx tsc --noEmit` clean; `src/lib/utils.ts` unchanged. Visual contrast, hover animation and sizes pending in B5. Known differences to judge there: the block is 66px tall (old buttons were `size="lg"`/`"sm"`), the Contact CTA lost its small `ArrowUpRight` (the block has its own arrow), and the block adds an enter animation on top of `MagneticButton`.

## Next step
B3 (flip-text for the Hero title).
