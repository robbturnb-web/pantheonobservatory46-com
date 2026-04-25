# Pantheon Observatory — Homepage Concepts

Five complete, distinct homepage layouts. Each has its own **live background** (animated, not static) and its own **click-reactive theme system** — the page's color, atmosphere, and audio shift based on which "domain" you touch. Mythological + cosmic + UAP-disclosure motifs are woven in differently in each.

Build approach: ship all five as switchable variants (`?layout=pillars`, `?layout=temple`, etc.) with a small **floating concept switcher** in the corner. Once you pick a winner, we delete the others and promote it to the canonical `/`.

---

## Concept 1 — "Pillars of the Pantheon"

A vertical row of **four colossal Greek marble pillars** stretching from floor to sky. Each pillar = one domain (Disclosure · Ancient · Cosmic · Inner). Hovering a pillar makes it glow and tilts the entire scene toward its color. Clicking enters that hub.

**Live background**

- WebGL: slow-rotating starfield (existing) behind the pillars
- Pillars rendered in CSS 3D with subtle parallax on mouse move (they sway like they're floating in space)
- Faint **lightning forks** crackle randomly between the pillar tops every 8–15s (Zeus motif)
- Particle "embers" drift upward when you hover a pillar

**Click → theme reaction**

- Hover Disclosure pillar → entire bg shifts blood-red, scanlines fade in, audio crossfades to a low static drone
- Hover Ancient pillar → bg goes gold/amber, faint chanting + wind
- Hover Cosmic pillar → bg cools to violet, deeper starfield, ambient pad swells
- Hover Inner pillar → bg breathes green/teal, slow heartbeat pulse
- Click → page transitions by the camera "flying through" the pillar

**Greek/alien fusion**: The pillar capitals are carved with both Corinthian acanthus leaves AND alien glyphs from `data/glyphs.ts`. Reads as "the gods were always extra-terrestrial."

---

## Concept 2 — "The Living Temple"

You arrive **inside** a colossal ruined temple. Marble columns recede into haze on both sides. Through the broken roof you see a Pantheon-class mothership hovering in the night sky (reuse `pantheon-ship-hero.jpg`). Statues of **Zeus, Athena, Hermes, Anubis, and a Grey** stand between the columns — equal billing, no hierarchy.

**Live background**

- Parallax: 5 depth layers (foreground rubble → near columns → far columns → ship → starfield)
- Volumetric light shafts sweep slowly across the floor (CSS animated god-rays)
- Dust motes drift in the beams (canvas particles)
- The mothership's underglow pulses on a 6-second breathing cycle

**Click → theme reaction**

- Click a statue → camera dollies to it, lights dim everywhere else, the statue's "domain" theme takes over the whole scene (Athena → wisdom-blue, Anubis → desert-amber, Grey → clinical-cyan)
- Bottom of screen: a horizontal "scroll" of brass plaques (one per page) — clicking re-themes everything

**Greek/alien fusion**: The pantheon literally **shares the room** with the alien — the visual thesis is that mythology and modern UAP disclosure are the same story across millennia.

---

## Concept 3 — "Constellation Map"

The whole homepage is a **dark night sky** filled with constellation shapes. Each "constellation" is actually a god face / UAP silhouette / pyramid outline drawn in connected stars. As you hover, the constellation lights up and faint mythological line-art fades in over the dots showing what it represents.

**Live background**

- Pure starfield (denser than current), with ~20 named constellations placed across it
- A slow-drifting **comet** crosses the screen every ~30s (reuse `CometTrails`)
- An occasional **UFO blip** streaks past in the corner (reuse `SpaceshipFlyby`)
- The "horizon" at the bottom is the silhouette of the Pantheon temple in Rome, lights flickering

**Click → theme reaction**

- Hover a constellation → it brightens, its name appears in clean serif type, a soft chord plays
- Click → the camera "zooms into" the constellation and the page transitions in via a starfield-warp
- The whole sky tints to that constellation's color while it's active

**Greek/alien fusion**: Constellation shapes blend Greek (Orion, Pleiades) with alien (a Grey's head, a saucer, an obelisk). They're all just stars until you look closer.

---

## Concept 4 — "Oracle's Console"

A retro-futuristic **observatory control room**. The viewport is a curved CRT screen showing live cosmic feeds. The hero panel is a **terminal/oracle** that types out a daily prophecy mixing scripture, leaked Pentagon docs, and astronomy alerts. Around the terminal, eight glowing **rune-buttons** (each a different domain) sit on a brass-and-blacksteel console.

**Live background**

- Behind the curved CRT: full starfield + slow-rotating Earth (reuse `galaxy/SolarSystem` scaled down)
- CRT scanlines + occasional VHS tracking glitches
- A slow oscilloscope waveform across the bottom = "Schumann resonance live"
- Idle: the oracle types one new line every 12s (rotating from `pulse-updates.ts`)

**Click → theme reaction**

- Hover a rune-button → it heats up amber, a CRT corner-readout shows the domain stats
- Click → screen "switches channel" with a CRT off-on flicker, then routes
- A small bookshelf icon flips the whole console between **"Modern Disclosure"** mode (military green, AARO aesthetic) and **"Ancient Oracle"** mode (gold, Greek temple aesthetic) — same console, two skins. This is the "everything feels real" lever.

**Greek/alien fusion**: The runes themselves are half Greek letters, half alien glyphs. The oracle's voice quotes Heraclitus and Grusch in the same breath.

---

## Concept 5 — "Deep Sky Cathedral" (Most Ambitious)

A genuine **3D scene** built with React Three Fiber. You float inside a vast cathedral made of stars — Doric columns made of light, a domed ceiling that IS the Milky Way, and four altars at the cardinal points (one per hub). Mouse drags rotate the camera. Scroll dives deeper into the nave.

**Live background**

- True 3D, 60fps target (with mobile fallback to a still render + parallax layers)
- Volumetric nebula clouds drift between the columns
- Each altar holds a slowly-rotating artifact: a pyramid (Ancient), a UAP saucer (Disclosure), a planet (Cosmic), a glowing brain (Inner)
- Random "godrays" sweep through when an artifact is interacted with

**Click → theme reaction**

- Look at an altar (raycast on camera direction) → that altar's light intensifies, ambient music adds a layer, scene tints toward its color
- Click altar → smooth 3D camera fly-through into that hub's portal, then route transition

**Greek/alien fusion**: The cathedral architecture is unmistakably Greek (Pantheon dome, Corinthian capitals) but the materials are all stars and energy — it's a temple built by something non-human. Mobile gets a 2.5D fallback that still feels alive.

---

## How "Theme Based On What You Click" Works (shared system)

Right now `BackgroundManager.tsx` already changes the background per **route**. We extend it to also react **on the homepage**, before you even click through:

1. New `<HomeThemeProvider>` wraps the homepage. Holds active `domainKey` state (`disclosure | ancient | cosmic | inner | none`).
2. Every interactive element (pillar, statue, constellation, rune, altar) calls `setDomain(key)` on hover/focus.
3. The provider drives:
   - **Background gradient** (animated crossfade between domain palettes)
   - **Particle accent color** (cursor trail, comet trails)
   - **Audio bed** (crossfade between `playlists.ts` tracks — already supports `cosmos | disclosure | ancient`)
   - **Optional camera tilt / parallax target** (concepts 1, 2, 5)
4. On click → route navigates, `BackgroundManager` takes over with that route's existing theme — feels seamless because the homepage already pre-tinted.

This is the "everything feels real" hook: the page **responds to your attention**, not just your clicks.

---

## Concept Switcher (build-time)

While you decide, the homepage shows a small floating chip in the bottom-right:

```text
┌─ LAYOUT ─┐
│ ● Pillars │
│ ○ Temple  │
│ ○ Constel.│
│ ○ Console │
│ ○ Cathedr.│
└───────────┘
```

Clicking switches concepts instantly (no reload). Persisted to `localStorage` so it survives refreshes. Once you pick a winner, this chip and the other four concepts get deleted in a follow-up pass.

---

## Build Plan (technical)

1. Add `src/contexts/HomeThemeContext.tsx` — provider + `useHomeTheme()` hook driving bg color, audio bed, particle tint.
2. Refactor `HomePage.tsx` → thin shell that reads `?layout=` (or localStorage) and renders one of:
   - `src/pages/home/PillarsLayout.tsx`
   - `src/pages/home/TempleLayout.tsx`
   - `src/pages/home/ConstellationLayout.tsx`
   - `src/pages/home/ConsoleLayout.tsx`
   - `src/pages/home/CathedralLayout.tsx`
3. Add `src/components/home/ConceptSwitcher.tsx` — floating chip.
4. Each layout file owns its own live background component (some reuse `StarfieldCanvas`, `CometTrails`, `SpaceshipFlyby`; concept 5 adds a new R3F scene).
5. Extend `BackgroundManager` to read homepage domain hint from `HomeThemeContext` so background pre-tints before navigation.
6. Pull existing data (`hubs`, `vaultSlots`, `daysOverdue`, `pulse-updates`, `gods`) into each layout — no data work, just new presentation shells.
7. Mobile: each concept ships with a simplified fallback (still animated, no heavy 3D on small viewports) — verified at 384px.
8. AI-generate two missing assets via Lovable AI (Nano banana): a "marble pillar capital with alien glyphs" texture, and a "Greek pantheon dome from inside" sky-dome.

Existing components reused: `StarfieldCanvas`, `CometTrails`, `SpaceshipFlyby`, `CosmicCursorTrail`, `DailyPulseCard`, `VideoStrip`, `AudioPlayer`, `Walkthrough`, `SEO`. No data migration. No backend changes.

---

## What I Need From You

Pick one of these to start building (or say "build all five with the switcher" — that's my recommendation so you can compare them live):

1. **Pillars of the Pantheon** — fastest to build, biggest hover-theme payoff
2. **The Living Temple** — most cinematic, strongest mythology + alien fusion narrative
3. **Constellation Map** — most "alive sky" feel, lightest performance
4. **Oracle's Console** — most unique, retro-future, two-skin lever
5. **Deep Sky Cathedral** — most ambitious, true 3D, longest build
6. **All five + switcher** ← recommended
