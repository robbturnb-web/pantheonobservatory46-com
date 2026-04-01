

# Phase 2: Whistleblower Vault, Telescope Observatory & 3D Galaxy Explorer

Three major new sections, each with its own route, data, and page.

---

## 1. Whistleblower Vault (`/whistleblowers`)

A filterable card-grid page with 8+ full whistleblower profiles:

**Bob Lazar** (Area 51, Element 115) · **Steven Greer** (CE5, Disclosure Project) · **David Grusch** (Congressional testimony 2023) · **Phil Schneider** (Dulce Base, murdered 1996) · **Gary McKinnon** (NASA hack, Solar Warden) · **Mark McCandlish** (ARV, died 2021) · **Bob Fish** (DIA insider) · **Lue Elizondo** (AATIP director)

Each profile includes: key claims, evidence grade badge, event timeline, sources, and status (alive/deceased/murdered). Glass-cosmic cards with expand-to-detail, staggered framer-motion entrance.

**Files:** `src/data/whistleblowers.ts`, `src/pages/WhistleblowerVaultPage.tsx`, new `Whistleblower` type.

---

## 2. Telescope Observatory (`/telescopes`)

A vertical timeline page covering every major space telescope and their discoveries year-by-year:

**Hubble** (1990) · **Chandra** (1999) · **Spitzer** (2003) · **Kepler** (2009) · **James Webb** (2021) · plus ground observatories (Arecibo, ALMA, Green Bank)

Each telescope: launch year, key discoveries by year, what it changed, and connections to UAP/anomaly topics. JWST gets the deepest treatment — deep field images, early universe revelations, exoplanet atmospheres.

**Files:** `src/data/telescopes.ts`, `src/pages/TelescopePage.tsx`, new `Telescope`/`TelescopeDiscovery` types.

---

## 3. 3D Galaxy Explorer (`/galaxy`)

Interactive Three.js solar system using React Three Fiber (v8, React 18 compatible):

- Sun at center with glow effect, orbiting planets Mercury through Pluto + Moon
- Click any planet to smooth-zoom in and see an info panel with scientific facts AND mythological significance (Greek, Roman, Hindu names, theories)
- Orbit animations, hover glow effects, starfield background
- "Let Echo Guide You" button placeholder for future AI narration mode

**Files:** `src/pages/GalaxyExplorerPage.tsx`, `src/components/galaxy/SolarSystem.tsx`, `src/components/galaxy/PlanetInfo.tsx`, `src/data/planets.ts`, new `Planet` type.

---

## 4. Wiring It Up

- Add 3 new routes to `App.tsx`
- Add nav links to `Navbar.tsx`
- Update `HomePage.tsx` section grid with new pages
- Update stat counters

All data is static (no database needed). Reuses existing evidence badge system, glass-cosmic styling, and framer-motion patterns.

