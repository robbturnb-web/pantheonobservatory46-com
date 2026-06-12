# Chamber Entry Animations

Add smooth fade + slide reveals to each themed chamber on `/live-feeds`, with staggered timing so chambers cascade in as the user scrolls, and a soft cross-fade when content updates.

## Approach

Use **Framer Motion** (already installed via `motion` in the project) with `whileInView` for scroll-triggered reveals. Keep all changes in presentation layer — no data/logic touched.

## Changes

### 1. `src/components/command/LiveChamber.tsx`
- Wrap the root `<section>` in `motion.section`.
- Replace static `animate-fade-in` class with motion variants:
  - `initial`: `{ opacity: 0, y: 32, filter: 'blur(12px)', scale: 0.98 }`
  - `whileInView`: `{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }`
  - `viewport`: `{ once: true, margin: '-80px' }`
  - `transition`: `{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }`
- Add inner stagger: header and body wrapped in `motion.div` children of a `motion.div` parent with `staggerChildren: 0.12`, so the header fades in first, then the panel grid.
- Add a one-shot theme-tinted glow pulse on entry (CSS keyframe `chamber-enter-glow` triggered via animation class for ~1.2s) so each chamber "ignites" in its accent color.

### 2. `src/components/command/LivePanel.tsx`
- Wrap root card in `motion.div` with variants that inherit from parent stagger:
  - `initial`: `{ opacity: 0, y: 16 }`
  - `animate`: `{ opacity: 1, y: 0 }` (driven by parent `LiveChamber` stagger)
  - `transition`: `{ duration: 0.5, ease: 'easeOut' }`
- This makes panels inside a chamber cascade after the chamber shell reveals.

### 3. `src/index.css`
- Add `@keyframes chamber-enter-glow` — a single-pass radial flash using `currentColor` opacity ramp (0 → 0.35 → 0), 1.2s, used as a one-shot overlay on chamber mount.
- Respect `prefers-reduced-motion`: wrap new keyframes in a media query so motion is disabled and Framer Motion variants degrade (Framer respects it automatically when `MotionConfig reducedMotion="user"` is set).

### 4. `src/pages/LiveFeedsPage.tsx`
- Wrap the chamber list in `<MotionConfig reducedMotion="user">` from `framer-motion` so accessibility is honored globally on the page.
- No structural changes; chambers continue to render in the same order.

## What stays the same
- All data hooks, status badges, theme backgrounds, copy, routes.
- Existing CSS chamber background animations (`chamber-pulse`, `chamber-sweep`, etc.) remain untouched.
- No new dependencies — `framer-motion` already in `package.json` (used in `Layout.tsx`).

## Result
- Each chamber slides up + de-blurs into view as the user scrolls.
- Inner panels stagger in after the shell.
- A subtle theme-colored glow pulse marks the entry.
- Reduced-motion users get instant, non-animated reveals.
