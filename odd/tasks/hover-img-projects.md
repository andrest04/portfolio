# Feature: hover-img-projects

## Objective
Rebuild the Projects list on the ObsidianUI `hover-img` block (rows with a cursor-following thumbnail), with NO project photos for now: the thumbnail frame still appears and follows the cursor, as a placeholder, and the spacing/layout stay as designed. Builds on `odd/tasks/obsidian-blocks.md`.

## Decision history
- Previously blocked: `hover-img` needed project screenshots. User: "por ahora no las tengo pero dejalas sin fotos, que salga ahi sin foto pero con los espacios y todo eso." So ship it with a placeholder thumbnail; adding `imageSrc` later must work without code changes to the block.
- `art-gallery` is not used: it is a photo gallery with no place in the existing content and nothing to show without photos. Revisit when there are images.
- Content parity is non-negotiable (user: keep all texts, projects, links): every project keeps name, role, "Featured" badge, description, stack tags (max 6), highlights (max 4), GitHub and demo links with their labels and `sr-only` text.

## Constraints
- Vendor the Obsidian code with minimal documented patches (header comment); adaptation code in separate files.
- The block ships dark/light colors, `min-height: 100vh`, its own background and the Raleway font: bridge them to the site tokens (`rgb(var(--text))`, `rgb(var(--bg))`, `.light`/`.dark`) from `globals.css` or an override class, without editing the registry CSS beyond documented patches.
- The row hover dims the hovered row (`opacity: .5`): that is wrong for rows holding links; patch/override so only the title/label shift remains.
- The thumbnail wrapper is `position: fixed` unless `isContained`: use `isContained` (absolute inside the list) so transformed ancestors (ScrollReveal/GSAP) cannot break it.
- No photo: render a placeholder panel per project in the thumbnail stack (theme-aware surface, project name), no `<img>` with a missing src. A project with an `imageSrc` renders the `<img>`.
- Hidden below 768px by the block (no hover on touch): rows must still show all content.
- Respect `prefers-reduced-motion`; keep text readable in both themes; no new strings in i18n.
- Each task closes with `npx tsc --noEmit`, `npx eslint src` (0 problems) and `npm run build`, then a work-unit commit.

## Tasks
- [x] H1 Vendor `hover-img` (tsx + css) with patches: per-item `children` content below the row header, placeholder thumbnail when `imageSrc` is missing, theme bridge, no row dimming. Route: delegated writer.
- [x] H2 Replace the `ProjectCard` grid in `Projects.tsx` with the adapted list (new `ProjectsHoverList` client component or similar), keeping content parity. Route: same writer (same unit).
- [x] H3 Parent visual check in Chrome (dark/light, desktop hover + 390px): rows, placeholder following the cursor, links clickable, no overflow.

## Acceptance criteria
- tsc, eslint (0 problems) and build pass; only allowed files change.
- Content parity in Projects (same texts/links as before, both languages).
- `rg "Shree Krishna|Radha|Divine Love|/cdn/hover-img"` in `src`: no matches.

## Progress
- Branch `feat/hover-img-projects` created from `fix/hero-footer-lint` (f9fc4bd).

## Evidence
- H1+H2 (writer): vendored `src/components/block/hover-img.{tsx,css}` with documented patches (item `content`, optional `imageSrc` + placeholder panel, `h3` titles, no demo data, no row dimming, reduced-motion skips listeners); adapter `ProjectsHoverList.tsx` (isContained, `hover-img-site`); bridge block appended to `globals.css`; `ProjectCard.tsx` deleted (no remaining importers; `ProjectItem` moved to `ProjectsHoverList.tsx`).
- `npx tsc --noEmit`: clean. `npx eslint src`: 0 problems. `npm run build`: exit 0.
- `rg "Shree Krishna|Radha|Divine Love|/cdn/hover-img"` in src: no matches; `Raleway` only in vendored css (documented, overridden by bridge).
- H3 (parent, Chrome, production build on :3001): rows render in light and dark with name, role, badge, description, stack, highlights and both links; the placeholder panel (project name, no image) appears on row hover and follows the cursor, in both themes. At 390px: document scrollWidth 375 of 390 (no overflow), thumbnail wrapper display none, each of the 4 rows keeps its 2 links. Parent re-ran tsc (clean), eslint (0 problems) and build (ok).
- Known trade-off: the 400x250 placeholder covers part of the row text while hovering (pointer-events none, links stay clickable).
- NOT verified: reduced-motion path, Spanish copy visually, adding a real `imageSrc`, touch devices.

## Next step
All tasks done. Open: real project screenshots (set `imageSrc` per project to replace the placeholder); push/PRs are the user's call.
