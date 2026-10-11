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
- [ ] P2 `card` (11 importer files). Route: delegated writer.
- [ ] P3 `badge` (ExperienceItem, ProjectCard). Route: delegated writer or inline if mechanical.
- [ ] P4 `input` + `textarea` (CommandPaletteDialog and any textarea importer). Route: delegated writer or inline if mechanical.
- [ ] P5 Parent visual check in Chrome (dark and light, desktop), once P1-P4 are in.

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

## Next step
P2 (`card`).
