

# Plan: Upgrade Cosmic Visuals — ATLAS, Comets, Galaxy, Pyramids

A focused graphics overhaul across the four areas you flagged. No backend, no data changes — pure visual depth.

---

## 1. 3I/ATLAS Hero — From Blob to Cinematic Comet

**Current problem:** the comet is a low-poly icosahedron with a sparse purple particle tail. Reads as a fuzzy blob, not a comet.

**Upgrade (`src/components/cosmic/AtlasHero.tsx`):**
- **Real nucleus:** swap icosahedron for a high-detail cratered sphere with displacement (procedural noise bumps), warm icy-grey material with rim lighting
- **Multi-layer coma (the gas halo):** 3 nested transparent spheres with additive blending — bright cyan core → teal mid → faint violet outer
- **Dual-tail system** (real comets have two):
  - **Ion tail** — straight, electric-blue particle stream pointing directly away from the sun light source (4000 particles, additive blend, gradient cyan→white)
  - **Dust tail** — curved, golden-amber particle arc (3000 particles) lagging behind the orbit
- **Sun in scene:** add a glowing sun sphere off-screen-right so the tails physically point away from it (orbital realism)
- **Background starfield** inside the canvas viewport (not just the page background)
- **Subtle camera drift** — slow orbital pan so the comet feels alive, not static
- **Scanline/HUD overlay** — corner brackets, telemetry crosshair, faint grid like a JWST viewport

**Result:** looks like a real telescope feed, not a particle demo.

---

## 2. Comet Trails — From Abstract Streaks to Recognizable Comets

**Current problem:** the cursor-following streaks look like green/purple smears. You can't tell they're comets.

**Upgrade (`src/components/cosmic/CometTrails.tsx`):**
- **Recognizable head + tail anatomy:**
  - Bright white nucleus (hard center)
  - Glowing radial coma (soft halo)
  - Tapered, fading tail with proper falloff curve (not a uniform line)
- **Spark trail** — 3-5 tiny sparkle particles trailing each comet that twinkle then fade (gives motion and "debris" feel)
- **Color science:** keep the violet/neon-green palette but add a hot-white core so each comet reads as light, not paint
- **Reduced count, higher quality:** spawn slightly less often (every 30-50s) but each comet looks 3x better
- **Cursor-tracker behavior softened:** instead of dive-bombing the cursor, it gently arcs near it — feels curious, not predatory
- **Optional rare "fireball" event** — once every 3-5 minutes a much larger meteor streaks across with a long orange-white trail and a small flash

---

## 3. Galaxy Explorer — More Going On

**Current state:** planets, sun, moons, asteroid belt, 3 comets, constellations, milky way disc. Functional but quiet between planets.

**Upgrade (`src/components/galaxy/SolarSystem.tsx`):**
- **Solar flares** — animated tendrils erupting from the sun surface (shader-like noise scrolling on a sphere) plus occasional CME bursts
- **Saturn rings detail** — add a particle-based ring layer (300 small chunks) instead of just flat ring meshes, so you can see structure
- **Earth city lights on night side** — a subtle warm glow on the dark hemisphere
- **Earth aurora** — faint green ring near the poles
- **Jupiter Great Red Spot upgrade** — proper swirl with surrounding band animation
- **Shooting stars in the background** — 1-2 per minute streaking across the starfield
- **More comets, more variety:** bump from 3 to 6, with different sizes, speeds, and colors (blue ice comets vs. golden dust comets)
- **Voyager probe easter egg** — tiny spacecraft slowly drifting outward past Pluto with a faint signal blink, click for an info card
- **Subtle volumetric dust clouds** in deep space (large semi-transparent noise planes) for depth between planets
- **Planet selection upgrade** — when you click a planet, the camera does a smooth dolly-in instead of jumping, with the planet's data card fading in over a soft vignette

---

## 4. Pyramid Explorer — From Flat Cones to Detailed Structures

**Current problem:** every pyramid is the same 4-sided cone. Doesn't feel like real archaeology.

**Upgrade (`src/components/pyramid/PyramidScene.tsx` + new `src/components/pyramid/PyramidGeometry.tsx`):**
- **Stepped geometry** for Mesoamerican pyramids (Teotihuacan, Chichen Itza) — 5-7 stacked tiers with stairs on one face
- **Smooth-faced limestone** for Giza pyramids with a slight bevel and weathered texture color
- **Bent pyramid** for Dahshur (real angle change halfway up)
- **Per-pyramid detail props:**
  - Sphinx mesh next to Giza
  - Stair detail on Mesoamerican faces
  - Small sun-disc on top of Teotihuacan
- **Better ground plane** — desert sand texture under Egyptian pyramids, jungle-green tint under Mesoamerican, with a soft gradient between regions
- **Stellar alignment beams upgrade:**
  - Replace cylinder lines with actual particle beams (animated dots traveling up the beam toward Orion/Sirius)
  - Add 2 more star targets: Pleiades (cluster of 7 small stars) and Polaris
  - Beams pulse softly so they read as "active alignment" not static lines
- **Atmospheric fog** at the horizon for depth
- **Scarab/glyph easter egg** — click a small floating glyph above Giza for an XP bonus
- **Day/night toggle button** in the corner — switches lighting from golden sunset to moonlit night with stars more visible (matches the cosmic theme of the rest of the site)

---

## Files

**Edited (4):**
- `src/components/cosmic/AtlasHero.tsx` — full comet rebuild
- `src/components/cosmic/CometTrails.tsx` — head/tail/sparkles + fireball
- `src/components/galaxy/SolarSystem.tsx` — sun flares, ring particles, Earth glow, Voyager, dust, dolly camera
- `src/components/pyramid/PyramidScene.tsx` — better geometry per pyramid type, particle beams, day/night

**New (2):**
- `src/components/pyramid/PyramidGeometry.tsx` — per-pyramid geometry builders (stepped, smooth, bent)
- `src/components/galaxy/SolarFlares.tsx` — animated sun surface + CME

**No data changes. No new edge functions. No migrations.** Pure Three.js + canvas upgrades.

---

## Verification (after build)

- `/` → ATLAS comet has clear nucleus, dual tails pointing away from sun, telescope-feed feel
- Move cursor anywhere on site → comets that streak past have visible white head + tapered glowing tail + sparkle trail
- `/galaxy` → sun has flares, Saturn rings are particles, Earth has city-light glow, occasional shooting stars, find Voyager past Pluto
- `/pyramids` → Giza is smooth-faced with a Sphinx, Teotihuacan is stepped with stairs, Dahshur bends, beams pulse with particles, day/night toggle works

## Out of scope (can do next batch)

- Custom shaders for the sun surface (would need GLSL — using procedural geometry instead for now)
- Real planet textures from JPL imagery (stays procedural for performance)
- Audio/music layer

