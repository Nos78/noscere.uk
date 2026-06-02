# noscere.uk - Engineering Sprint Backlog

## 1. UX, Layout & Structural Refactoring (Active Sprint)
- [ ] **Fix:** Resolve mobile Chrome vertical layout stretching by replacing `justify-between` with a flexible `flex-grow` main shell container.
- [ ] **UX:** Relocate the engineering blog call-to-action button to sit immediately after the introductory welcome paragraph.
- [ ] **UI:** Compact the footer telemetry badges (`build.branch.sha`) to prevent aggressive two-line wrapping on narrow vertical viewports.
- [ ] **Refactor:** Tidy up global screen density by shifting layout max-width bounds from `max-w-4xl` down to `max-w-3xl`.
- [ ] **Refactor:** Extract the hardcoded projects iteration logic out of `index.astro` into an isolated `Projects.astro` template module.
- [ ] **Architecture:** Establish a unified component wrapper (`Card.astro`) to eliminate duplicated Tailwind utility class footprints across components.

## 2. Interactive Feature Components
- [ ] **Feature:** Build a customizable, compile-time `Menu.astro` hamburger component with low-overhead native hardware transitions.
- [ ] **Feature:** Upgrade the quote engine to accept optional reference hyperlinks using `event.stopPropagation()` to secure the click-shuffle mechanics.
- [ ] **Feature:** Design a GitHub API-driven compile-time tracker module to dynamically mirror open bugs and milestone metrics onto project pages.

## 3. Dev-Ops & Infrastructure Systems
- [ ] **Automation:** Implement a Playwright Visual Regression automated pipeline via GitHub Actions to pixel-match deployment links before releases.
- [ ] **Assets:** Build out a performant `src/assets/` optimized pipeline to manage multi-viewport image formats for hardware breakdowns.
- [ ] **Infrastructure:** Provision the local Raspberry Pi K3s stack to act as an air-gapped, on-premises testing loop for offline continuity.