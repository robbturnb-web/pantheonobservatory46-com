# Phase 3-4: Moons, Spaceship Tour, Echoverse & Pyramid Explorer

Four major features built across existing and new pages.

---

## 1. Galaxy Explorer — Moons & Echo Spaceship Tour

### Moons
Add a `Moon` interface to `src/data/planets.ts` with `moons` array on each planet. Three featured moons with full click-to-info:

- **Earth's Moon** — distance 1.5 from Earth, grey, facts about tidal locking, Apollo missions, hollow moon theory
- **Titan** (Saturn) — orange, methane lakes, Huygens probe, prebiotic chemistry
- **Europa** (Jupiter) — icy white, subsurface ocean, Europa Clipper, possible life

Each moon orbits its parent planet in `SolarSystem.tsx` using a `MoonMesh` component (smaller sphere, faster orbit, own Html label). Clicking a moon opens the same `PlanetInfo` panel (reused with moon data).

### Echo Spaceship Tour
Wire the existing "Let Echo Guide You" button in `GalaxyExplorerPage.tsx`:

- **Tour mode state** — cycles through planets in order (Mercury → Pluto) with 6-second pause on each
- Animated camera transitions using `OrbitControls` target updates via ref
- Echo narration panel at bottom — short pre-written blurbs per planet (no AI call needed, keeps it instant)
- Glowing spaceship mesh (simple cone + cylinder) that leads the camera between planets
- Stop/skip controls overlay

**Files:** `src/data/planets.ts` (add moons data), `src/components/galaxy/SolarSystem.tsx` (MoonMesh, SpaceshipTour, camera controls), `src/components/galaxy/PlanetInfo.tsx` (support moon type), `src/pages/GalaxyExplorerPage.tsx` (tour state management)

---

## 2. Echoverse Community (`/echoverse`)

Discord-style real-time community platform using Lovable Cloud.

### Database (migration)
- `echoverse_channels` table — id, name, slug, description, icon, sort_order
- `echoverse_messages` table — id, channel_id (FK), user_id (FK auth), username, content, created_at
- Enable realtime on `echoverse_messages`
- RLS: authenticated users can read all messages, insert own messages
- Seed 5 channels: #uap-sightings, #consciousness, #starseeds, #whistleblower-intel, #general

### Auth
- Simple email/password signup + login modal (reusable `AuthModal` component)
- User picks a display name on first sign-up (stored in `profiles` table if not already present)

### UI (`src/pages/EchoversePage.tsx`)
- Left sidebar: channel list with icons and unread indicators
- Center: message feed with real-time subscription, auto-scroll, timestamp grouping
- Bottom: message input (authenticated only, prompt to sign in if not)
- Right sidebar (optional): online users count, channel description
- Glass-cosmic styling consistent with rest of site
- Framer motion for message entrance animations

**Files:** `src/pages/EchoversePage.tsx`, `src/components/echoverse/ChannelList.tsx`, `src/components/echoverse/MessageFeed.tsx`, `src/components/echoverse/AuthModal.tsx`, migration SQL, route in `App.tsx`, nav link

---

## 3. 3D Pyramid Explorer (`/pyramids`)

Interactive page with clickable 3D pyramid structures.

### Structures (6 pyramids)
- **Great Pyramid of Giza** — Orion alignment, internal chambers, 2.3M blocks
- **Pyramid of the Sun (Teotihuacan)** — Mesoamerican cosmology, mica chambers
- **Bosnian Pyramid of the Sun** — Visočica hill, energy beam claims
- **Nubian Pyramids (Meroë)** — Kushite civilization, steeper angles
- **Pyramid of Kukulcán (Chichén Itzá)** — equinox serpent shadow, acoustic anomalies
- **Ziggurat of Ur** — Sumerian/Anunnaki connection, temple of Nanna

### 3D Scene (`src/components/pyramid/PyramidScene.tsx`)
- React Three Fiber canvas with 6 pyramids arranged in a circular layout
- Each pyramid: `ConeGeometry` (4 sides) with stone-like color, glowing edges on hover
- Click to select → side panel slides in with full info (alignment data, theories, mystery connections)
- Starfield background, ambient lighting, orbit controls
- Alignment lines drawn from pyramids to star positions (Orion, Sirius) as thin glowing lines

### Data (`src/data/pyramids.ts`)
- `Pyramid` interface: id, name, location, builtDate, facts[], alignments[], theories, mysteryConnections

**Files:** `src/data/pyramids.ts`, `src/pages/PyramidExplorerPage.tsx`, `src/components/pyramid/PyramidScene.tsx`, `src/components/pyramid/PyramidInfo.tsx`, route in `App.tsx`, nav link

---

## 4. Wiring & Navigation

- Add `/echoverse` and `/pyramids` routes to `App.tsx`
- Add "Echoverse" and "Pyramids" nav links to `Navbar.tsx`
- Update `HomePage.tsx` section grid with new pages and stat counters

---

## Technical Notes

- Moons reuse the existing `PlanetInfo` panel by extending the `Planet` type with an optional `moons` array
- Echoverse requires a database migration (2 tables + RLS + realtime) and authentication
- Pyramid scene reuses the same React Three Fiber + drei setup as Galaxy Explorer
- Spaceship tour uses pre-written narration (no AI calls) for instant responsiveness
- All new pages use existing glass-cosmic styling and framer-motion patterns
