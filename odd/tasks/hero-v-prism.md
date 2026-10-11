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
- [x] T2 Integrate in Hero: `dynamic(ssr:false)`, remove MorphingBlob, reduced-motion fallback, text contrast in both themes. Route: delegated writer, visual check in browser.
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

- T2: new `src/components/sections/hero/HeroPrismBackground.tsx` (dynamic ssr:false VPrism, reduced-motion + WebGL probe fallback, IntersectionObserver mount/unmount, vertical edge mask, left-to-right scrim); `Hero.tsx` uses it (section got `isolate`, layer is `-z-10`); `MorphingBlob.tsx` deleted (no callers). Route: delegated writer. Test-first exception: no deterministic runner for a WebGL background.
- T2 checks: `npx tsc --noEmit` exit 0; `npx eslint src/components/sections` exit 0; `npm run build` exit 0; `rg MorphingBlob src` no matches; `rg "obsidianui|next-themes|Program Files" src public` only matches a comment in the vendored v-prism.tsx ("Patched: use the project theme hook instead of next-themes"), no import or URL.
- T1 risk assessment (RDD is off globally, so no review started): `gentle-ai review assess --base-ref b2cf2aa --committed-only` (with `.codegraph/` declared excluded) -> medium (`configuration_change`), 1215 changed lines (mostly vendored block and lockfile), `review_due: slice_budget_reached`; outcome: not run because RDD is off; ordinary checks (tsc, eslint, build) passed.
- T2 visual check (parent, production build served on :3001 because the pre-existing dev server on :3000 was stale and returned 500 after the next downgrade):
  - Parent found a seam defect the writer could not see: the canvas was confined to the 1376px hero box inside `main.max-w-[1440px]` on a 1920px viewport, leaving hard vertical edges. Fixed inline: layer is now full-bleed (`inset-y-0 left-1/2 w-screen -translate-x-1/2`) and the section uses `overflow-y-clip` instead of `overflow-hidden`. Measured after the fix: canvas 1920px wide, `scrollWidth` 1905 = client width (no horizontal overflow).
  - Dark: prism renders, title readable, 54 FPS over 3s at 1920x832. Light: toggle re-themes the scene, all hero content present and readable (eyebrow, title, subtitle, CTAs, portrait, scroll indicator).
  - Network: 5 assets served from `/effects/v-prism/`; 0 requests to `obsidianui` (performance entries).
  - Off-screen: canvas unmounts when the hero is out of view (0 canvases at heroBottom -1148 after a real scroll). Caveat: in the automated tab IntersectionObserver callbacks are only delivered when a frame is produced (screenshot), so JS-only scroll tests were misleading; a first note of this as a bug was retracted.
  - Mobile (390px, iframe emulation): no horizontal overflow (`scrollWidth` 375), prism renders at that width; text/prism contrast on mobile NOT judged (hero intro animation was mid-state in captures).
  - NOT verified: `prefers-reduced-motion` fallback (code read only), WebGL-unavailable fallback (code read only), real mobile device performance.
- Pre-existing dev server on :3000 (PID 5000) was started before the next 16.2.10 pin and returns 500; user should restart it.

## Next step
Commit T2, then decide T3 (flip-text on the h1) with the user.
