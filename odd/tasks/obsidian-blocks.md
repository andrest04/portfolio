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
- [x] B3 `flip-text`: use it for the Hero `<h1>` title in place of the GSAP `SplitText` character animation (both animate characters, so keep only one). Patch the block to render a `span` (a `div` is invalid inside `h1`), `loop={false}`, add a reduced-motion guard, keep the rest of `useHeroAnimation` (eyebrow, subtitle, CTA, portrait, scroll indicator). Route: delegated writer.
- [x] B4 `footer`: rebuild `src/components/layout/Footer.tsx` on the Obsidian `footer` structure with the portfolio's own wordmark/name, real links (GitHub, LinkedIn, mailto) and `t.footer` i18n texts; ship the CSS the block needs (`font-serif-elegant`, `wordmark-gradient`, `#light-*` ids) and use no `<h1>`. Route: delegated writer.
- [x] B5 Parent visual check in Chrome (dark and light): AboutSkills marquee, Hero CTAs and title animation, Contact CTA, Footer.

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

- B3 (delegated writer): `npx tsc --noEmit` clean; `npx eslint src` only the 2 baseline errors; `npm run build` OK; `rg "Program Files|obsidianui" src public package.json` no matches; `src/lib/utils.ts` unchanged. Visual/timing check pending (B5).
- B3 patches: vendored `flip-text.tsx` renders a `span` instead of `div`. The block ships no CSS, so `flip-char` keyframes (rotateX flip-in) live in `globals.css` under `prefers-reduced-motion: no-preference` (static text otherwise). Hero: `h1` has `aria-label`, FlipText wrapped in `aria-hidden` span, inline `opacity:0` removed, `duration={1.6}` `loop={false}`. `useHeroAnimation`: SplitText removed, replaced by a 1.2s no-op tween so portrait "-=0.7" pacing stays.

- B3 parent re-verification: diffs match the report (SplitText step removed from `useHeroAnimation.ts`, placeholder `tl.to({}, {duration: 1.2})`, `hero.title` still the text, `aria-label` on the h1 and `aria-hidden` on the flip span, inline `opacity:0` removed from the h1); vendored `flip-text.tsx` has only the `div` -> `span` patch; registry JSON for `flip-text` has no `css` field, so the `@keyframes flip-char-in` in `globals.css` are OUR interpretation of the effect, not Obsidian code (gated on `prefers-reduced-motion: no-preference`); `npx tsc --noEmit` clean. To judge in B5: flip look in both themes, word wrapping on mobile, entrance pacing (portrait starts ~0.3s earlier than before).

- B4 (delegated writer): `npx tsc --noEmit` clean; `npx eslint src` only the 2 baseline errors; `npm run build` OK; `rg "Obsidian|obsidianui|Program Files|href=\"#\"|<h1"` on the two footer files only matches the English patch comment in the vendored block; `src/lib/utils.ts` unchanged. Visual check pending (B5).
- B4 patch: vendored `block/footer.tsx` is props-ified (`wordmark`, `intro`, `children`, `legal`, `className`); brand copy, badge, headline, fake links and `<h1>` removed; wordmark is a decorative `aria-hidden` div sized `min(11vw,12rem)`. Theme choice (a): follows `--bg`/`--text`. The registry ships no CSS, so `.font-serif-elegant` (system serif), `.wordmark-gradient`, `#lighting-*`/`.lighting-section` glow (reduced-motion gated) in `globals.css` are our interpretation. No new strings.

- B4 parent re-verification: `Footer.tsx` keeps `© {year} {t.hero.name}`, `t.footer.rights`, `t.footer.text` and the three links with their aria-labels/targets/rels; the only leftover mention of the brand in the footer files is the English origin comment in the vendored block; `npx tsc --noEmit` clean; `npx eslint src` = exactly the 2 baseline errors; `npm run build` exit 0.
- B5 visual check (parent, Chrome, production build on :3001, 1920px viewport, dark and light, plus a 390px iframe emulation):
  - AboutSkills (dark): the draggable marquee renders as a strip of text pills between the skill cards and the Principle block; 84 marquee copies in the DOM (28 skills x 3).
  - Hero (dark and light): eyebrow, FlipText title, subtitle, "View projects" (DiscoverButton), "Contact me", portrait and prism all render; all five GSAP-driven elements reach opacity 1 and `.flip-char` carries the `flip-char-in` animation (55 chars). In the automated tab the GSAP timeline only advances when frames are produced (screenshots), so early captures showed a partial hero; this was an artifact, not a bug.
  - DiscoverButton: legible in both themes (white pill + white circle in dark; light-gray pill + black circle in light). Same for the Contact "Send email" CTA.
  - Footer: serif gradient wordmark, glow rings and the real links render in both themes; no horizontal overflow at 1920px or 390px (`scrollWidth` 375 of 390), wordmark 242px wide on mobile.
  - FINDING (pre-existing, not caused by flip-text): `hero-breathe` animates the h1 `letter-spacing` (-0.02em <-> -0.014em, 9s; it exists on main at `Hero.tsx:60`), so at this column width the title reflows between 3 and 4 lines during the cycle (seen as 3 lines in dark and 4 in light). Not fixed (design decision).
  - FINDING (new, minor): on mobile the footer legal text ("All rights reserved.") overlaps the top of the wordmark letters; on desktop the same overlap exists by the block's design and reads fine. Not fixed.
  - Small differences accepted: DiscoverButton is taller than the old CTAs (66px); the Contact CTA no longer has the small up-right arrow; footer content spans the full width while the rest of the page is contained.
  - NOT verified: hover/active states of DiscoverButton, real drag behavior of the marquee, `prefers-reduced-motion` rendering of flip-text and the marquee (CSS gated, not exercised), the entrance pacing versus the old SplitText intro (portrait now starts ~0.3s earlier), real-device performance.

## Next step
All tasks (B1-B5) done. Open decisions for the user: (1) fix the title reflow caused by the existing `hero-breathe` letter-spacing animation; (2) fix the mobile overlap of the footer legal text with the wordmark; (3) the 2 baseline eslint errors (ThemeProvider.tsx:39, NavbarThemeToggle.tsx:17); (4) blocks blocked by missing inputs: `hover-img`/`art-gallery` (project screenshots), `visitor-count` (backend + consent), `status-bars` (data); (5) merge order of the three stacked branches (feat/hero-v-prism -> feat/obsidian-primitives -> feat/obsidian-blocks), PRs are the user's call.
