

# Plan: Holographic Particle Glow-Up — Starfield, ATLAS Hero, Shadow Pantheon

A focused visual upgrade to the particle systems and the Shadow Pantheon's atmosphere. No data, no backend — pure shader and canvas work.

---

## 1. Global Starfield — "Living Stars" (`src/components/StarfieldCanvas.tsx`)

**Current:** uniform 0.18-size purple dots. Flat. No depth, no twinkle.

**Upgrade:**
- **Per-star size variation** — 3 size tiers via custom shader: tiny dust (60%), mid stars (30%), bright giants (10%) with halo
- **Soft round glow sprite** — replace square `pointsMaterial` with a custom shader that draws each star as a radial-gradient glow (hot core → soft falloff). No more pixelated squares.
- **Twinkle** — each star has its own phase; shader animates brightness with `sin(time * speed + phase)` so the field shimmers
- **Color depth** — add hot-pink and cyan to the palette alongside violet/lavender for richer chromatic field
- **Parallax depth layers** — split into 3 `<points>` groups at different z-depths (near/mid/far) rotating at different speeds. Closer stars feel bigger and move faster on mouse-drift.
- **Bright "hero stars"** — ~20 special stars with a lens-flare cross spike (4-point star sprite) that pulse occasionally
- **Replace the static nebula plane** with 2 slow-drifting volumetric nebula clouds (large noise-textured planes, additive, very low opacity) in violet + cyan that crossfade

**Result:** the starfield reads as a real deep-space view with depth, twinkle, and color, not a flat dot pattern.

---

## 2. ATLAS Hero Comet — Sharper Particles & Holographic HUD (`src/components/cosmic/AtlasHero.tsx`)

**Current:** ion + dust tails are square dots. HUD is flat.

**Upgrade:**
- **Round glowing particle sprite** for both tails (custom point shader with radial alpha gradient) — particles now read as light, not pixels
- **Size variance per particle** — head particles 2x larger and brighter, tip particles tiny — gives the tail real taper
- **Velocity-driven streaks** — fast particles get slight motion blur (additive trail behind each)
- **Coma pulse** — the gas halo gently pulses (size + opacity) on a 4-second breath cycle
- **Holographic HUD upgrade** — animate the scanline grid downward (CRT effect), add a faint chromatic-aberration RGB split on corner brackets, blinking "REC" dot, animated telemetry numbers (live distance counter ticks)
- **Sun lens flare** — when the sun's position is roughly visible, draw a soft horizontal flare bar across the canvas

---

## 3. Shadow Pantheon — Holographic Restricted-Chamber Atmosphere (`src/pages/ShadowPantheonPage.tsx`)

**Current:** static red gradient bg, plain card grid. Doesn't feel "restricted" or holographic.

**Upgrade:**

**Background layer (new):**
- A scoped `<ShadowAtmosphere />` component layered behind the page content with:
  - **Holographic scanlines** — animated horizontal CRT lines drifting upward, reddish tint
  - **Floating glyph particles** — 80 occult symbols (✦ ◯ ✕ ⌬ ◬) drifting slowly, faintly red/violet, twinkling
  - **Embers/ash particles** — 150 small orange-red particles rising slowly with flicker
  - **Volumetric fog** — 2 large red-violet noise planes drifting in opposite directions, very low opacity
  - **Vignette pulse** — subtle red corner glow that breathes with a 6s cycle (like a pulsing warning)

**Card upgrade — holographic style:**
- Add a thin **scanline overlay** on each card (animated diagonal lines)
- **Glitch-shimmer** on hover — RGB split effect on the title text for ~200ms
- **Holographic edge** — gradient border that shifts hue (red → violet → red) on hover, with a brief sweep of light across the card
- Symbol icon gets a soft red glow halo
- Card background gains a subtle iridescent sheen (conic gradient at low opacity)

**Modal upgrade:**
- Replace flat backdrop with the same scanlines + floating embers
- Title "Shadow Codex" headline gets a holographic shimmer (animated linear-gradient text-clip with red/violet/cyan)
- Section dividers become animated pulsing lines

**Result:** entering Shadow Pantheon feels like opening a forbidden holographic terminal, not a styled grid.

---

## Files

**Edited (3):**
- `src/components/StarfieldCanvas.tsx` — custom shader stars, twinkle, parallax layers, hero stars, drifting nebulae
- `src/components/cosmic/AtlasHero.tsx` — round glowing tail particles, size variance, coma pulse, holographic HUD animations
- `src/pages/ShadowPantheonPage.tsx` — wire in the new atmosphere component, holographic card + modal styling

**New (1):**
- `src/components/shadow/ShadowAtmosphere.tsx` — scoped holographic background (scanlines, glyphs, embers, fog) for the Shadow Pantheon page only

**No data changes. No new dependencies (uses existing three / framer-motion / canvas).**

---

## Verification

- `/` → starfield has depth, twinkles, varied star sizes, soft round glow (no square pixels), occasional bright lens-flare stars
- `/` → ATLAS comet tails have soft round particles with size taper; HUD scanlines drift; corner brackets shimmer
- `/shadow-pantheon` → holographic scanlines drift up the background, ash embers rise, occult glyphs float, cards have scanline overlays and holographic borders that shift on hover, modal title shimmers

## Out of scope (next batch)

- WebGL post-processing bloom (would need `@react-three/postprocessing`; using shader/sprite glow instead for now)
- Audio layer (low ambient hum on Shadow Pantheon)

