

# Plan: God Lore Expansion + Cosmic Visual Upgrade

## Part 1 — Deep Lore for the Gods (`/gods`)

The current god entries are single sentences. I'll rewrite all 26 gods to match the depth pattern already used in `shadow-gods.ts` (origin story, full mythology, why they matter today, ritual lore for high-rank users).

**Schema additions to `God` type:**
- `originStory` — 2-3 paragraph birth/origin myth
- `keyMyths` — array of 2-4 famous stories with title + body
- `powersAndRelics` — bullet list of weapons, abilities, sacred objects
- `relationships` — key allies, rivals, lovers, children (with brief context)
- `worship` — how they were honored (temples, festivals, offerings)
- `modernRelevance` — what this archetype means for the seeker today
- `oracleLore` — Oracle-tier (1000 XP) deeper esoteric/ET-disclosure interpretation
- `quotes` — 1-2 ancient quotes attributed to them

**Modal redesign (`GodsPage.tsx`):**
- Make the dossier modal scrollable and tabbed: **Origin · Myths · Powers · Relationships · Worship · Modern · Oracle (locked)**
- Use the existing `RankUnlock` component to gate the Oracle tab at 1000 XP (matches Shadow Pantheon pattern)
- Keep the atmospheric image header, add a "scroll for more" indicator

**Scope:** Full rewrite of all 26 gods. Each entry grows from ~1 line to a full dossier (~400-600 words). One file: `src/data/gods.ts`.

## Part 2 — Cosmic Visual Upgrade (background layer)

**A. Cursor-following comets** (replace static comet boxes)
- New `CometTrails.tsx` — canvas component that spawns 1-2 comets per minute that streak across the viewport from random edges
- One comet always tracks toward the cursor with a glowing ion tail (purple→cyan gradient)
- Mouse-idle comets fall back to free-flight across the sky
- Replaces any existing static "comet square" elements

**B. 3I/ATLAS hero on HomePage**
- New `<AtlasHero />` section above the existing fold
- Live 3D model of comet 3I/ATLAS using `@react-three/fiber` (already installed): glowing nucleus + procedurally-animated ion tail trailing toward the sun
- Live data card next to it pulled from JPL Horizons / TheSkyLive RSS via a new edge function `atlas-tracker` (cached 6h):
  - Current distance from Earth (AU)
  - Current speed (km/s)
  - Closest approach date
  - Current constellation it's passing through
- "What is 3I/ATLAS?" expandable lore: 3rd known interstellar object, discovered July 2025, hyperbolic trajectory, anomalies (non-gravitational acceleration, unusual brightening)
- Companion card: "Comet Watch" listing other inbound comets (C/2024 G3, C/2023 A3 leftovers) — fetched from same edge function

**C. Passing spaceship cameo**
- New `<SpaceshipFlyby />` — every 90-180 seconds a small SVG saucer (subtle, not cartoony) glides across the starfield with a faint engine glow trail
- Click it for an easter-egg toast: "👽 You spotted a Lazar-class craft" + grants 25 XP (one-time per session)

**D. Stefan Burns "Where is he?" widget**
- Mount a small `<StefanLocator />` card on HomePage next to DailyPulseCard
- Reads the latest video title from the existing `daily_cosmos_pulse` table
- AI-extracts location/topic from the title via a tiny edge function (`stefan-locator`) and displays: "Latest signal: [topic] · [date] · [link to video]"

## Part 3 — Files

**New (8):**
- `src/components/cosmic/CometTrails.tsx`
- `src/components/cosmic/SpaceshipFlyby.tsx`
- `src/components/cosmic/AtlasHero.tsx`
- `src/components/cosmic/StefanLocator.tsx`
- `src/components/gods/GodDossierModal.tsx` (extracted + tabbed)
- `supabase/functions/atlas-tracker/index.ts`
- `supabase/functions/stefan-locator/index.ts`

**Edited (5):**
- `src/types/index.ts` — expanded `God` interface
- `src/data/gods.ts` — full rewrite with deep lore for all 26 gods
- `src/pages/GodsPage.tsx` — use new tabbed modal
- `src/components/Layout.tsx` — mount `<CometTrails />` and `<SpaceshipFlyby />`
- `src/pages/HomePage.tsx` — mount `<AtlasHero />` and `<StefanLocator />`
- `supabase/config.toml` — register two new edge functions

## Part 4 — Verification
- Open `/gods`, click Zeus → see tabbed dossier with Origin/Myths/Powers/etc., Oracle tab gated until 1000 XP
- Hover the homepage — comet should track cursor, then drift away
- Wait 60-90s on any page — spaceship should fly across, click for XP
- HomePage shows live 3I/ATLAS distance + Stefan's latest signal

## Out of scope (next batch)
- Live Cosmos Pulse full page with planetary parade 3D viewer
- Local UFO Pulse map, Crash Retrieval, Entity Encounters
- Underground Bases / CERN / Antarctica / Burchett tracker

