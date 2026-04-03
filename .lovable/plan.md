

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

- **Tour mode** — cycles through planets in order (Mercury → Pluto) with 6-second pause on each
- Animated camera transitions via OrbitControls target ref
- Echo narration panel at bottom — short pre-written blurbs per planet (no AI call, keeps it instant)
- Glowing spaceship mesh (simple cone + cylinder) that leads the camera between planets
- Stop/skip controls overlay

**Files:** `src/data/planets.ts`, `src/components/galaxy/SolarSystem.tsx`, `src/components/galaxy/PlanetInfo.tsx`, `src/pages/GalaxyExplorerPage.tsx`

---

## 2. Echoverse Community (`/echoverse`)

Discord-style real-time community platform using Lovable Cloud.

### Database (migration)
- `profiles` table — id (FK auth.users), username, avatar_url, created_at
- `echoverse_channels` table — id, name, slug, description, icon, sort_order
- `echoverse_messages` table — id, channel_id (FK), user_id (FK auth), content, created_at
- Enable realtime on `echoverse_messages`
- RLS: authenticated users can read all, insert own messages
- Trigger to auto-create profile on signup
- Seed 5 channels: #uap-sightings, #consciousness, #starseeds, #whistleblower-intel, #general

### Auth
- Email/password signup + login modal (`AuthModal` component)
- User picks display name on signup (stored in profiles)

### UI
- Left sidebar: channel list with icons
- Center: real-time message feed with auto-scroll and timestamp grouping
- Bottom: message input (auth-gated)
- Glass-cosmic styling, framer-motion message animations

**Files:** `src/pages/EchoversePage.tsx`, `src/components/echoverse/ChannelList.tsx`, `src/components/echoverse/MessageFeed.tsx`, `src/components/echoverse/AuthModal.tsx`, migration SQL

---

## 3. 3D Pyramid Explorer (`/pyramids`)

Interactive 3D page with clickable ancient structures.

### 6 Pyramids
- **Great Pyramid of Giza** — Orion alignment, internal chambers, 2.3M blocks
- **Pyramid of the Sun (Teotihuacan)** — Mesoamerican cosmology, mica chambers
- **Bosnian Pyramid** — Visočica hill, energy beam claims
- **Nubian Pyramids (Meroë)** — Kushite civilization, steeper angles
- **Kukulcán (Chichén Itzá)** — equinox serpent shadow, acoustic anomalies
- **Ziggurat of Ur** — Sumerian/Anunnaki connection

### 3D Scene
- React Three Fiber canvas with 6 pyramids in circular layout
- `ConeGeometry` (4 sides) with stone colors, glowing edges on hover
- Click → side panel with facts, alignments, theories
- Alignment lines drawn from pyramids to star positions (Orion, Sirius)
- Starfield background, orbit controls

**Files:** `src/data/pyramids.ts`, `src/pages/PyramidExplorerPage.tsx`, `src/components/pyramid/PyramidScene.tsx`, `src/components/pyramid/PyramidInfo.tsx`

---

## 4. Wiring

- Add `/echoverse` and `/pyramids` routes to `App.tsx`
- Add nav links to `Navbar.tsx`
- Update `HomePage.tsx` grid and stats

---

## Technical Notes

- Echoverse requires a database migration + auth — email confirmation will be standard (not auto-confirmed)
- Pyramid scene reuses same R3F + drei setup as Galaxy Explorer
- Spaceship tour uses pre-written narration for instant responsiveness
- All pages use existing glass-cosmic styling and framer-motion

