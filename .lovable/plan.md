
# JWST Section — Image Hero Swap + Expansion Backlog

## Part 1 — Replace 3D telescope with image hero

The 3D model isn't reading well on mobile. We'll retire it and rebuild the hero using the same visual language as Gods, Cosmos, and Consciousness realms: cinematic photography, layered glass cards, glow accents.

### Hero rebuild (`WebbHero3D.tsx` → `WebbHeroImage.tsx`)
- **Backdrop**: NASA's Carina Nebula (Cosmic Cliffs) full-bleed, with parallax on scroll and a deep violet/obsidian radial vignette so text stays legible.
- **Foreground composition**:
  - Left/center: title block (JAMES WEBB · Cinzel, amber kicker, "Online · L2 Halo Orbit · Day X" green status pill).
  - Right side (desktop) / below (mobile): **floating polaroid stack** of 3 iconic Webb images (Pillars of Creation, Phantom Galaxy, SMACS 0723 deep field) — tilted, glass-edged, with hover lift. Tapping any opens it fullscreen.
  - Bottom: existing CTA pair (Mission Console / Browse Findings) + scroll chevron.
- **Motion**: framer-motion entrance stagger, slow Ken Burns zoom on backdrop, subtle float on the polaroid stack. No three.js.

### Cleanup
- Delete `WebbModel3D.tsx` and `WebbHero3D.tsx`.
- Remove `@react-three/fiber`, `@react-three/drei`, `three` from `package.json` **only if** no other page uses them — `GalaxyExplorerPage`, `PyramidScene`, `SolarSystem` likely still need them, so keep installed.
- Update `JWSTPage.tsx` import to `WebbHeroImage`.

### New "Webb Gallery" strip directly under the hero
A horizontal scroll rail of ~12 hand-picked Webb images (NIRCam + MIRI), each captioned with target name, distance, instrument, and a "Why it matters" one-liner. Uses the existing `ImageWithFallback` pattern and lazy loading. Tapping opens a lightbox.

Files:
- New: `src/components/jwst/WebbHeroImage.tsx`, `src/components/jwst/WebbGalleryStrip.tsx`, `src/data/jwst-gallery.ts`
- Edited: `src/pages/JWSTPage.tsx`
- Deleted: `src/components/jwst/WebbModel3D.tsx`, `src/components/jwst/WebbHero3D.tsx`

## Part 2 — Expansion ideas (pick what to build next)

Ranked by impact for the flagship feel:

1. **Webb vs Hubble Image Slider Gallery** — Expand current `WhyOnlyWebb` from 1–2 comparisons to 8+ side-by-side reveals (Pillars, Carina, Stephan's Quintet, Tarantula, Phantom Galaxy, Cartwheel, Ring Nebula, Southern Ring).
2. **"What Webb Sees That Others Can't" infographic strip** — Visual EM-spectrum diagram showing infrared window, with hover callouts: redshifted galaxies, dust-piercing, exoplanet atmospheres, cold protostars. One scrollable graphic, no text wall.
3. **Exoplanet Atmosphere Lab** — Dedicated subsection cataloguing every exoplanet Webb has sniffed (WASP-39b CO₂, WASP-96b H₂O, K2-18b DMS/CH₄, TRAPPIST-1 set, GJ 1214b haze). Each card shows the transmission spectrum graphic + plain-English "what this molecule means for life."
4. **Deep Field Zoomer** — Interactive pan/zoom on SMACS 0723 with pinpoints on the most-distant galaxies, ages, and redshift values. Pure 2D (react-zoom-pan-pinch), feels 3D.
5. **Mission Vitals Console** — Live-looking telemetry strip (temperature of each instrument, fuel remaining, days to mission end estimate, current pointing target from STScI schedule API). Adds the "operating system" feel.
6. **"Discovery of the Week" featured card** — Editorial spotlight pulled from the daily feed but enlarged, with Echo commentary baked in.
7. **Cost & Engineering Stats** — $10B, 25 years, 14 countries, 1,200 engineers, 344 single-point failures survived during deployment. Animated counter cards.
8. **Threats & Limitations** — Honest section: micrometeoroid damage to segment C3 (2022), fuel-limited lifespan (~20 years), what could end the mission early. Adds credibility.
9. **"Ask Webb" Echo prompt grid** — 6 pre-seeded deep-question buttons that hand off to Echo (e.g., "Explain JADES-GS-z13-0 to me like I'm 12").
10. **Successor Telescopes preview** — Habitable Worlds Observatory, LUVOIR, what comes after Webb and why.

### Recommended build order for next loop after hero swap
Hero swap → Gallery strip → #1 expanded comparisons → #3 Exoplanet Lab → #4 Deep Field Zoomer. Save #2/#5–#10 as follow-ups.

## Out of scope for this plan
- Removing three.js from the project (other pages still use it).
- Real telemetry API hookup (#5 will be styled-static for v1).
- New edge functions (daily feed already covers live data).

---

**Confirm**: greenlight the hero swap + gallery strip now, and tell me which of the 10 expansion ideas to queue immediately after.
