# Feature: polish-fixes

## Objective
Close the three open findings left by `odd/tasks/obsidian-blocks.md` without changing any content: the hero title reflow, the mobile footer overlap, and the 2 baseline ESLint errors. User answered "si" to "fix the title reflow, the footer overlap or the eslint errors?" and the parent interpreted it as all three.

## Findings being fixed (with evidence)
- F1 `hero-breathe` animates the h1 `letter-spacing` (-0.02em <-> -0.014em, 9s) in `src/app/globals.css` (~line 280); it exists on main (`Hero.tsx:60`). At the current column width the line "with Clean Architecture," fits or wraps depending on the phase, so the title reflows between 3 and 4 lines.
- F2 On mobile (390px) the footer legal text ("All rights reserved.") overlaps the top of the wordmark letters (`src/components/block/footer.tsx` / `Footer.tsx`).
- F3 `npx eslint src` reports exactly 2 errors, both `react-hooks/set-state-in-effect`: `src/components/providers/ThemeProvider.tsx:39` (`setThemeState(resolved)` inside an effect) and `src/components/layout/navbar/NavbarThemeToggle.tsx:17` (`setMounted(true)` inside an effect).

## Constraints
- No change to copy, links, routes or i18n.
- F3 must keep theme behavior: `ThemeScript` applies the `dark`/`light` class and `colorScheme` before paint from localStorage `theme` (falling back to `prefers-color-scheme`); the provider API `{theme, setTheme, toggleTheme}` and `useTheme()` stay the same (consumers: `NavbarThemeToggle.tsx`, `src/components/block/v-prism.tsx`). No hydration mismatch warnings.
- Prefer fixing the cause over `eslint-disable`; a disable is acceptable only with a justification comment if no clean alternative exists.
- Each task closes with `npx tsc --noEmit`, `npx eslint src` (target: 0 errors) and `npm run build`, then a work-unit commit.

## Tasks
- [x] F1 Stop the title reflow: replace the layout-affecting `letter-spacing` animation of `hero-breathe` with a non-layout animation that keeps the "breathing" feel (transform scale, origin left), still under `motion-safe:`. Route: inline (one small, understood CSS change).
- [x] F2 Fix the mobile overlap of the footer legal text with the wordmark without changing the desktop look. Route: inline (one vendored/patched file, small).
- [x] F3 Remove the 2 `set-state-in-effect` errors: derive the theme with `useSyncExternalStore` (class on `<html>` as the source of truth, server snapshot `"dark"`) in `ThemeProvider.tsx`, and a hydration-safe `mounted` in `NavbarThemeToggle.tsx` (also `useSyncExternalStore` with `() => true` / `() => false` snapshots). Route: delegated writer (2 non-trivial files, theme logic).
- [x] F4 Parent browser check: theme toggle both ways and persistence after reload (dark/light), v-prism follows the toggle, title wrapping stable across a breathe cycle, footer on mobile width.

## Acceptance criteria
- `npx eslint src`: 0 errors. `npx tsc --noEmit` clean. `npm run build` ok.
- Toggling the theme updates the class on `<html>`, the toggle icon and the v-prism scene; the choice persists across reload.
- The h1 line count does not change over time at a fixed viewport width.

## Progress
- Branch `fix/hero-footer-lint` created from `feat/obsidian-blocks` (388bafa).

## Evidence
- F3: `npx tsc --noEmit` exit 0; `npx eslint src` exit 0 with no output (0 problems); `npm run build` ok; `rg eslint-disable` in providers/navbar: no matches. ThemeProvider uses useSyncExternalStore (MutationObserver on <html> class, server snapshot "dark"); NavbarThemeToggle uses a useSyncExternalStore-based useIsClient. Not browser-verified (F4).

- F1 (parent, inline): `hero-breathe` keyframes now animate `transform: scale(1 <-> 1.012)` (h1 got `origin-left`) instead of `letter-spacing`; still `motion-safe:`. Verified in Chrome on the production build, 4 samples with real frames: animation live (4 distinct transforms, scale 1.00016-1.01064), `letter-spacing` constant at -1.5px, h1 stays at 3 lines and `offsetHeight` 189 in every sample (in the previous build the light theme showed 4 lines).
- F2 (parent, inline): below `md` the legal block gets `pb-[calc(min(11vw,12rem)+2rem)]` (vendored `footer.tsx`, patch noted in its header comment); desktop unchanged. Verified at 390px (iframe): "All rights reserved." bottom 645px vs wordmark top 677px = 0px overlap (32px gap), `scrollWidth` 375 of 390.
- F3 parent re-verification: `git status` showed only the expected files; `npx tsc --noEmit` clean; `npx eslint src` exit 0 with no output (0 problems; baseline was 2); `npm run build` exit 0; `rg eslint-disable src`: no matches.
- F4 browser check (Chrome, production build on :3001): after reload the stored theme persists (dark: class `dark`, localStorage `dark`, sun icon); a real click toggles dark -> light (class, localStorage, moon icon, and the v-prism scene turns from black to white); toggling light -> dark via `button.click()` also updates class, localStorage and icon. No hydration or console messages matched `hydrat|mismatch|Warning|ThemeProvider`. The very first real click in a freshly opened tab did not register (page still hydrating in the throttled automated tab); the repeat after a full load worked.
- NOT verified: dark-theme footer on mobile, reduced-motion rendering of the new scale animation, the theme toggle with `prefers-color-scheme` as the only source (empty localStorage), and the observer lag on very slow devices.

## Next step
All tasks done on branch `fix/hero-footer-lint` (stacked on feat/obsidian-blocks). Open for the user: pushing and PRs; the blocks blocked by missing inputs (hover-img/art-gallery need project screenshots, visitor-count needs backend and consent, status-bars needs data).
