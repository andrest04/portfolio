# Feature: hero-v-prism

## Objective
Redesign the Hero section with the ObsidianUI `v-prism` shader as background, keeping all existing content (texts, links, portrait, CTAs).

## Constraints (user decisions)
- Use `v-prism` (not `liquid-metal`). Remove `MorphingBlob` from the Hero.
- Do NOT install any `@obsidian` primitive (button, card, badge, input...). Keep `components/ui`.
- Do NOT overwrite `src/lib/utils.ts` (registry copy is byte-identical; skip it).
- Do NOT install `next-themes`: patch `v-prism` to use the project `useTheme` from `@/components/providers/ThemeProvider` (class `dark`/`light` on `<html>`).
- Self-host the 4 textures + `prism.glb` under `public/effects/v-prism/` (no runtime dependency on `cdn-new.obsidianui.dev`).
- Discarded for now: `click-spark`, `text-stream`, `split-showcase` (built for exactly 2 items), `smooth-scroll` (conflicts with `scroll-behavior: smooth`, anchors and command palette; out of scope for the Hero).
- Delivery strategy: `ask-on-risk`. Forecast well under 400 authored lines (vendored block excluded as third-party code).

## Authorized scope
- `src/components/block/v-prism.tsx`, `src/components/block/v-prism-settings.ts`
- `public/effects/v-prism/*`
- `src/components/sections/Hero.tsx`, `src/components/ui/MorphingBlob.tsx` (delete if no callers remain)
- `package.json`, `package-lock.json` (new deps only: `three`, `postprocessing`, types if required)

## Tasks
- [x] T1 Install and adapt v-prism (vendored block, theme hook patch, self-hosted assets, deps). Route: delegated writer (4+ files, preparation reading). Trigger: writer trigger (2+ non-trivial files) + preparation reading.
- [ ] T2 Integrate in Hero: `dynamic(ssr:false)`, remove MorphingBlob, reduced-motion fallback, text contrast in both themes. Route: delegated writer, visual check in browser.
- [ ] T3 Evaluate `flip-text` on the title (renders a `div`; title is an `h1` animated by GSAP). Optional; decide after T2 visually.

## Acceptance criteria
- `npm run build` and `npm run lint` pass.
- Hero renders prism in dark and light; theme toggle updates the scene.
- `prefers-reduced-motion` shows a static fallback, no WebGL loop.
- No network request to `cdn-new.obsidianui.dev`.
- Hero texts, links (#projects, #contact), portrait and ScrollIndicator unchanged.

## Progress
- Branch `feat/hero-v-prism` created. Pending changes committed: f1b3f2d (deps), 59c1dc1 (@obsidian registry).

## Evidence
- T1: vendored block + 5 self-hosted assets + deps `three@0.186.0`, `postprocessing@6.39.5`, `@types/three@0.186.0`.
- Writer defect caught by parent spot check: Git Bash (MSYS) rewrote the 5 asset URLs to `C:/Program Files/Git/effects/...` while the writer reported `/effects/v-prism/...`. Fixed by the parent; `rg "Program Files" src public odd package.json` returns nothing.
- Writer diagnosis "pre-existing" was only partly right: `next` 16.2.10 (main lock) -> 16.3.8 entered with commit f1b3f2d (the user's pending lock churn, committed on request), and 16.3.8 drops `experimental.viewTransition`. Together with `eslint-config-next@^14.2.35` (ERESOLVE, lint config fails to load) this broke tsc/build/lint. Fix kept inside package.json/lock: `next@16.2.10`, `eslint-config-next@16.0.10` (exact), i.e. the versions main compiled with. `next.config.ts` untouched.
- Verified by parent: `npx tsc --noEmit`: clean. `npx eslint src/components/block src/components/sections/Hero.tsx` (project config): no output. `npm run build`: success, 11/11 static pages.
- `rg "obsidianui|next-themes" src/components/block`: no matches (writer report).
- Canvas is opaque (`alpha: false`, `scene.background` set from preset): in T2 it must be a full-bleed layer behind content; text contrast to be checked in both themes.
- Open follow-up (outside this feature): Next 16.3 needs `viewTransition` migrated in `next.config.ts` before upgrading `next` again.

## Next step
T2.
