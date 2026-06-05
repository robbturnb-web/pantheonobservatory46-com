## Goal
Make the JWST gallery pictures auto-cycle through, and clean up the messy hero polaroid stack on mobile. Leave the rest of `/jwst` alone.

## Part 1 — Auto-advancing gallery carousel
Rework `src/components/jwst/WebbGalleryStrip.tsx`:
- Replace the horizontal snap-scroll row with a single-stage carousel: one large featured frame at a time, full-width on mobile, ~70% width centered on desktop.
- Auto-advance every 5s with a crossfade + subtle Ken Burns zoom on the active image (framer-motion `AnimatePresence`).
- Pause on hover / touch, resume after 2s idle.
- Controls: left/right chevrons, clickable dot indicators below, frame counter (e.g. `04 / 12`).
- Keep current caption block (instrument chip, distance, title, target, "why it matters") overlaid bottom-left on the image, plus a thin progress bar that fills over the 5s interval.
- Lightbox (tap to open full view) stays as-is.
- Keyboard: ← / → arrows when section is in view.
- All colors via existing realm tokens (gold for instrument chip, violet/amber for text) — no new hex.

## Part 2 — Hero polaroid cleanup (mobile only)
Edit `src/components/jwst/WebbHeroImage.tsx`:
- On mobile (`useIsMobile`), swap the 3-polaroid absolute stack for a single hero polaroid (Pillars of Creation) centered, slight tilt, no overlap.
- Keep the 3-polaroid fan on desktop, but widen horizontal spacing slightly so they don't crowd.
- Reduce the right-column container height on mobile from `380px` → `300px` so the hero is shorter and the text block isn't pushed off-screen.
- Lower hero `minHeight` on mobile from `92vh` to `auto` with `pb-10` so content flows naturally.

## Out of scope
- No changes to MissionConsole, WhyOnlyWebb, FindingsVault, CosmicTimeline, DailyFindingsFeed, LiveWebbFeed, or Echo handoff.
- No new data files, no edge functions, no 3D.

## Files touched
- `src/components/jwst/WebbGalleryStrip.tsx` (rewrite)
- `src/components/jwst/WebbHeroImage.tsx` (mobile polaroid + height tweaks)
