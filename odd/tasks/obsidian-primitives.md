# Feature: obsidian-primitives

## Objective
Replace the project's shadcn primitives in `src/components/ui/` with the ObsidianUI (`@obsidian`) versions, keeping every text, project and link of the portfolio unchanged. Part of the full portfolio redesign (see `odd/tasks/hero-v-prism.md` for the Hero work this branch builds on).

## Decision history
- Earlier constraint "do not install @obsidian primitives, keep components/ui" is LIFTED by the user ("si, todo quiero de obsidian todooo"). Start with `button`, then the rest.
- Obsidian primitives have the same paths as ours (`@ui/<name>.tsx` -> `src/components/ui/<name>.tsx`), so they overwrite ours. No `registryDependencies`. Their `lib/utils.ts` is byte-identical to ours: do NOT overwrite `src/lib/utils.ts`.
- Out of scope here (separate feature, needs user decision): the non-primitive blocks (`flip-text`, `draggable-marquee`, `footer`, ...). `split-showcase` (built for exactly 2 items) and `smooth-scroll` (conflicts with `scroll-behavior: smooth`, hash anchors and the command palette) had concrete incompatibilities flagged earlier.

## Constraints
- Overwrite only the primitive file of the task; do not touch `src/lib/utils.ts`.
- Keep component behavior and public API used by callers. Variants/sizes used today: `variant="outline"`, `size` in default / icon / lg / sm, plus `asChild`. If an Obsidian primitive lacks something a caller uses, report it instead of silently dropping behavior; adapt the call site minimally only when the equivalent exists.
- No change to copy, links, routes or i18n.
- Every task closes with tsc, eslint (project config) and build passing, then a work-unit commit.

## Tasks
- [x] P1 `button` (importers: ProjectCard, Navbar, ContactEmailCard, NavbarLangSwitch, Hero, NavbarThemeToggle). Route: delegated writer (reading prepares the write).
- [x] P2 `card` (11 importer files). Route: delegated writer.
- [x] P3 `badge` (ExperienceItem, ProjectCard). Route: delegated writer or inline if mechanical.
- [x] P4 `input` + `textarea` (CommandPaletteDialog and any textarea importer). Route: delegated writer or inline if mechanical.
- [x] P5 Parent visual check in Chrome (dark and light, desktop), once P1-P4 are in.

## Acceptance criteria
- `npx tsc --noEmit`, `npx eslint` (project config) and `npm run build` pass after each task.
- No visual regression that breaks layout or readability in dark and light; differences in style that come from the Obsidian design are accepted and reported.
- Only the allowed files change per task.

## Progress
- Branch `feat/obsidian-primitives` created from `feat/hero-v-prism` (073ebc8).

## Evidence
- P1 (writer, uncommitted, NOT checked off): `@obsidian/button` installed via CLI; only src/components/ui/button.tsx changed (utils.ts skipped as identical).
  - `npx tsc --noEmit`: exit 0. `npm run build`: exit 0. `rg "Program Files" src public package.json`: no matches.
  - `npx eslint src`: 2 errors (react-hooks/set-state-in-effect in NavbarThemeToggle.tsx:17 and ThemeProvider.tsx:39), identical on the base (verified with git stash); not caused by P1.
  - GAP found by the writer, resolved by the parent: project `@theme inline` lacked `--color-primary-foreground`, `--color-secondary(-foreground)`, `--color-accent(-foreground)`, so `text-primary-foreground` and `hover:bg-accent` generated no CSS. Added the 5 mappings in `src/app/globals.css` onto the existing raw vars (`--primary-foreground`, `--secondary`, `--accent`, ...). Checked: `--accent-primary` is white in dark / black in light and `--primary-foreground` is its opposite, so default-variant contrast holds; `@custom-variant dark (&:is(.dark *))` follows the `.dark` class. Verified in built CSS: `.hover\:bg-accent:hover{background-color:rgb(var(--accent))}`, `.hover\:text-accent-foreground:hover{...}`, `.text-primary-foreground`, `.text-secondary-foreground`, `.bg-secondary`, `.bg-primary` are emitted.
  - Parent re-verified: `git status` shows only button.tsx (+ globals.css, doc) changed; `npx tsc --noEmit` clean; `npm run build` exit 0.
  - Known failing check, NOT caused by this feature: `npx eslint src` reports 2 `react-hooks/set-state-in-effect` errors in `src/components/providers/ThemeProvider.tsx:39` and `src/components/layout/navbar/NavbarThemeToggle.tsx:17` (files untouched here). Treat as known baseline failures for P2-P4; the rest of `npx eslint src` must stay clean. Not fixed (out of scope); needs a decision.
  - Visual result NOT judged yet (P5).

- P2/P4 (writer, uncommitted): `@obsidian/card`, `@obsidian/input`, `@obsidian/textarea` via CLI were all skipped as byte-identical (modulo CRLF) to the files already in `src/components/ui/` (the shadcn originals match Obsidian). No file change, no caller change.
- P3 (writer, uncommitted): `@obsidian/badge` installed; only badge.tsx changed. Differences: import `Slot` from `@radix-ui/react-slot` (already a dependency) instead of `radix-ui`; `variant` has no default value in the signature (cva default still "default"); `data-variant` attribute removed; `ghost` and `link` variants removed (callers use only default and `outline`); `outline` no longer sets `border-border` (uses base `border` color); base `border` moved from per-variant to the base class with `border-transparent` per variant. Callers unchanged. No new tokens needed.
  - `npx tsc --noEmit`: exit 0. `npx eslint src`: only the 2 known errors. `npm run build`: ok. `rg "Program Files"`: no matches. Visual result NOT judged (P5).

- Parent independent check (P1-P4): normalized comparison (CRLF ignored) of `src/components/ui/{button,card,badge,input,textarea}.tsx` against the registry JSON: all five IDENTICAL. `git diff b2cf2aa` on card/input/textarea is empty, so they were already Obsidian-identical since the initial commit 600b3c5; only button and badge actually changed in this feature. `git status` before commit: only badge.tsx and the doc modified. `npx tsc --noEmit` clean.

- P5 visual check (parent, Chrome, production build on :3001, 1920px viewport):
  - Light, Projects: default button ("Live Demo") renders black with legible white text; outline ("GitHub") white with border; badges ("Featured", tech tags) and cards render correctly.
  - Dark, Projects: default button renders white with dark text; outline dark with light text; badges and cards correct.
  - Dark, Hero: "View projects" (default) white/black, "Contact me" (outline) readable; prism, portrait and text intact.
  - Dark, Contact: "Send email" (default) light with dark text, cards correct.
  - Command palette (input, `data-slot="input"`): opened by dispatching Ctrl+K from the page (the real keystroke is captured by a Chrome extension overlay in this browser); typed text shows and results filter ("exp" -> Experience under Navigation).
  - Known small visual difference: Obsidian outline adds `dark:bg-input/30`, and the Hero "Contact me" override `bg-transparent` has no `dark:` counterpart in tailwind-merge, so in dark the CTA gets a faint fill instead of being fully transparent. Accepted for now, not changed.
  - NOT verified: button hover/focus states, mobile widths, the Experience and About sections, the mobile drawer.

## Next step
Decide with the user the non-primitive Obsidian blocks (flip-text, draggable-marquee, footer, ...) as a separate feature; and whether to fix the 2 baseline eslint errors (ThemeProvider.tsx:39, NavbarThemeToggle.tsx:17).
