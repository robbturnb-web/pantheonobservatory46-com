
# Phase 2: Content Expansion & 3D Galaxy Explorer

Three major builds in priority order. Each becomes a new route in the app.

---

## 1. Whistleblower Vault (`/whistleblowers`)

**New files:**
- `src/data/whistleblowers.ts` — Full profiles for 8+ whistleblowers with evidence grades
- `src/pages/WhistleblowerVaultPage.tsx` — Main vault page with filterable card grid

**Whistleblower profiles included:**
- Bob Lazar (Area 51, Element 115, S-4)
- Steven Greer (CE5, Disclosure Project, National Press Club 2001)
- David Grusch (Congressional testimony 2023, "non-human biologics")
- Phil Schneider (Dulce Base claims, murdered 1996)
- Gary McKinnon (NASA hack, Solar Warden program)
- Mark McCandlish (Alien Reproduction Vehicle, died 2021)
- Bob Fish (DIA insider, email to John Podesta)
- Lue Elizondo (AATIP director, Pentagon insider)

Each profile: name, role, key claims, evidence grade (DOCUMENTED/CREDIBLE/SPECULATIVE), timeline of events, sources, and a "status" field (alive, deceased, murdered, unknown).

**UI:** Glass-cosmic cards with expand-to-detail view, evidence badges, timeline accordion, source links. Animated entrance with framer-motion stagger.

---

## 2. Telescope Observatory (`/telescopes`)

**New files:**
- `src/data/telescopes.ts` — Data for all major space telescopes and key discoveries
- `src/pages/TelescopePage.tsx` — Timeline-style page showing telescope evolution

**Telescopes covered:**
- Hubble Space Telescope (1990–present) — Deep field, Pillars of Creation, exoplanet atmospheres
- Spitzer Space Telescope (2003–2020) — Infrared universe, TRAPPIST-1 system
- Kepler Space Telescope (2009–2018) — 2,700+ confirmed exoplanets, Tabby's Star
- James Webb Space Telescope (2021–present) — Deep field, early galaxies, atmospheric analysis
- Chandra X-ray Observatory (1999–present) — Black holes, supernovae
- Ground observatories: Green Bank, Arecibo (collapsed 2020), ALMA

Each entry: launch year, key discoveries by year, notable images/findings, what it changed about our understanding, and connections to UAP/consciousness topics where relevant.

**UI:** Vertical timeline layout showing telescope eras. Each telescope gets a hero card with key stats and expandable yearly discoveries. Evidence grades on controversial findings.

---

## 3. 3D Galaxy Explorer (`/galaxy`)

**New files:**
- `src/pages/GalaxyExplorerPage.tsx` — Main 3D scene wrapper
- `src/components/galaxy/SolarSystem.tsx` — Three.js solar system with orbiting planets
- `src/components/galaxy/PlanetInfo.tsx` — Info panel when a planet is selected
- `src/data/planets.ts` — Scientific + mythological data for each celestial body

**Tech:** React Three Fiber (`@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@^0.160`)

**Features:**
- Orbiting planets with accurate relative sizes and distances (compressed for UX)
- Click any planet to zoom in smoothly (camera lerp) and see an info panel
- Each planet shows: scientific facts, mythological significance (Greek/Roman/Hindu names), theories, and discoveries
- Sun at center with glow shader
- Starfield background (reuse existing star system)
- Planet data includes: Mercury through Pluto, plus the Moon, asteroid belt markers
- Smooth orbit animations, glow effects on hover

**Echo integration (future):** Placeholder for Echo "spaceship" navigation mode — a button that says "Let Echo guide you" which triggers the AI to narrate as you fly between planets. This hooks into the existing Echo chat system.

---

## 4. Navigation & Homepage Updates

- Add three new routes to `App.tsx`: `/whistleblowers`, `/telescopes`, `/galaxy`
- Add nav links to `Navbar.tsx`
- Update `HomePage.tsx` sections array with the three new pages
- Update stats counters (whistleblower count, telescope count, planets)

---

## Technical Notes

- All data files follow existing patterns (typed interfaces in `src/types/index.ts`)
- New types: `Whistleblower`, `Telescope`, `TelescopeDiscovery`, `Planet`
- Evidence badge system reused from UAP pages
- Three.js packages pinned to React 18-compatible versions
- No database needed — all static data for now
