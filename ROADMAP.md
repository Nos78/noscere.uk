# noscere.uk • Unified Project Master Backlog

This document serves as the single source of truth for the engineering, architecture, design, and operational lifecycles of noscere.uk. It merges structural data pipelines with presentation-layer features and infrastructure runbooks.

---

## 🟢 1. Core Data Layer & Content Engines (Status: IN PROGRESS / PROFILE COMPLETED)

Focuses on type-safe collection management, content validation, and Astro content layer synchronization.

- [x] **Content Schema Blueprinting**
    - Define strict validation rules using Zod within `src/content.config.ts`.
    - Implement date coercions (`z.coerce.date()`) to guarantee native JS Date objects for sorting.
- [x] **Dynamic Routing Pipelines**
    - Construct dynamic paths inside `src/pages/notes/[...slug].astro` and `src/pages/blog/[...slug].astro`.
    - Align routing to Astro decoupled syntax using standalone `render(entry)` handlers.
- [x] **Alphanumeric Target Sanitization**
    - Purge unsafe URI control characters (like `?`) from raw markdown filenames to prevent pathing collisions.
- [x] **Type Cache Synchronization**
    - Resolve TypeScript compilation errors using `npx astro sync` execution loops to align internal metadata bindings.
- [x] **Profile Data Model & Engine Validation**
    - Construct strict TypeScript interfaces for `ProfileData`, `SocialLink`, and qualifications within `src/data/profileData.ts`.
    - Build validation pipeline in `src/utils/profileEngine.ts` to execute Gravatar MD5 image hashing and automated primary email lookup with fallback orchestration.
- [x] **Automated Build-Time vCard Engine**
    - Build an automated script pipeline (`vcardEngine`) to cleanly compile an RFC 6350 compliant `.vcf` file into `/public/contacts/` at build time, enforcing `profileData.ts` as the single source of truth.

---

## 🟡 2. UX, Layout & Structural Refactoring (Status: ACTIVE SPRINT)

Focuses on resolving design drift, eliminating CSS footprint duplication, and enforcing a unified visual inheritance model.

- [x] **Alpine.js Client Integration**
    - Integrate the `@astrojs/alpinejs` framework utility into the build engine to allow zero-bloat runtime micro-interactions.
- [x] **Modular Profile Presentation Layer**
    - Build `src/components/ProfileCard.astro` using a mobile-first column layout, hooked directly into the Alpine tab switcher to toggle link states.
- [x] **Contact Sandbox Route**
    - Deploy an isolated `src/pages/contact.astro` endpoint route to act as an un-cluttered visual testing bed and standalone digital business card.
- [ ] **Unified Visual Inheritance Model (BaseLayout)**
    - Extract fragmented container elements, background layers, and spatial blocks from the root index page.
    - Centralize core layout variables directly within `src/layouts/BaseLayout.astro` so pages automatically inherit consistent high-contrast design.
- [ ] **Unified Component Wrapper (`Card.astro`)**
    - Establish a reusable UI component (`Card.astro`) to encapsulate common utility classes (borders, background tints, paddings) used across modular features like the Skills Filter card layout.
- [ ] **Tailwind Typography Engine Integration (`.prose`)**
    - Inject the `.prose` structural layer (`prose prose-slate dark:prose-invert max-w-none`) into dynamic markdown layouts (`[...slug].astro`).
- [ ] **Mobile Chrome Layout Correction**
    - Resolve vertical layout stretching by replacing `justify-between` with a flexible `flex-grow` main shell container.
- [ ] **Blog Call-To-Action Relocation**
    - Reposition the engineering blog CTA block to sit immediately after the introductory welcome paragraph on the homepage.
- [ ] **Footer Badge Compaction**
    - Compact footer telemetry output layout (`build.branch.sha`) to prevent aggressive two-line wrapping on narrow mobile screens.
- [ ] **Screen Density Calibration**
    - Tidy up global screen width profile by shifting layout boundaries down from `max-w-4xl` to a more legible `max-w-3xl`.
- [ ] **Homepage Project Isolation**
    - Extract hardcoded project iteration logic out of the root `index.astro` template into a dedicated, isolated `Projects.astro` module.

---

## 🔵 3. Interactive Feature Components (Status: BACKLOG)

Focuses on runtime mechanics, custom interactivity scripts, and external API integrations.

- [ ] **Custom Navigation Menu (`Menu.astro`)**
    - Build a customizable, compile-time hamburger navigation component powered by low-overhead native hardware transitions.
- [ ] **Quote Engine Hyperlink Upgrades**
    - Modify the micro-quote engine to support optional reference links, utilizing `event.stopPropagation()` to protect the click-shuffle mechanics.
- [ ] **GitHub API Metrics Integration**
    - Design a GitHub API-driven compile-time tracker module to dynamically pull open bugs and milestone metrics onto project showcase pages.

---

## ⚪ 4. DevOps, Assets & Infrastructure Systems (Status: IN PROGRESS)

Focuses on local continuity loops, automation integrity, and asset optimization pipelines.

- [x] **Local Multi-Device Network Access (Vite Allowed Hosts Validation)**
    - Resolve DNS Rebinding security blocks by configuring `server.allowedHosts` inside `astro.config.mjs` to seamlessly support `easynote` and `easynote.local` domain handshakes for smartphone testing.
- [x] **Node.js Environment Out-of-Memory Mitigations**
    - Identify and resolve V8 engine WebAssembly execution panics by modifying `package.json` run scripts and resetting restrictive shell virtual memory parameters (`ulimit -v`).
- [x] **Husky Pre-Commit Hook Pipeline Hardening**
    - Re-architect `.husky/pre-commit` to prevent subshell exit status code failures during code styling checks, injecting an early-exit loop condition to allow safe configuration changes and `git commit --amend` updates when no source code files are staged.
- [ ] **Asset Pipeline Optimization**
    - Build a high-performance `src/assets/` media pipeline to serve responsive, multi-viewport web formats for deep technical layout imagery.
- [ ] **Playwright Visual Regression Testing**
    - Deploy a Playwright screenshot regression pipeline inside GitHub Actions to pixel-match builds before production deployment.
- [ ] **GitHub Actions Production Hardening**
    - Refine deployment workflows to securely trigger target production mirrors upon mainline push events.
- [ ] **On-Premises K3s Air-Gapped Test Loop**
    - Configure the local Raspberry Pi 4 cluster master node with an active container registry to support off-grid, end-to-end site continuity testing.

---

_Last Updated: June 25, 2026_
