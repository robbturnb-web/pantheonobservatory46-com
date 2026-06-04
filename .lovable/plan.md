# JWST Flagship — Deep Polish Pass

Turn `/jwst` from a solid page into the definitive Webb experience on the web. Four big additions, one polish pass.

## 1. 3D James Webb Telescope (hero centerpiece)

Replace the current static parallax hero with an interactive 3D Webb model.

- **Tech:** `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0` + `three@^0.160` (versions pinned per stack rules). Lazy-loaded with `Suspense`, gated by `isWebGLAvailable()` from `src/lib/webgl.ts` — falls back to current `DeepFieldHero` image on mobile/no-GPU.
- **Model:** Stylized low-poly Webb built from primitives (no external GLB needed for v1):
    - 18 hex gold-tinted primary mirror segments (`CylinderGeometry`, 6 sides)
    - Secondary mirror on tripod struts
    - 5-layer kapton sunshield (stacked rounded planes, amber→violet gradient material)
    - Spacecraft bus + solar panel
- **Motion:** Slow Y-axis rotation, mouse-parallax tilt, scroll-linked zoom-out revealing starfield. `OrbitControls` enabled on desktop, disabled on touch.
- **Overlays:** Hot-spot pins on mirror / sunshield / instruments → click opens a side panel with that subsystem's spec sheet (aperture 6.5 m, mass 6,500 kg, L2 orbit 1.5M km, mirror coating: gold on beryllium, etc.).
- **Status HUD:** Keep "ONLINE · L2 ORBIT · Day N" chip, add live telemetry-style readouts (temp −233 °C cold side / +85 °C hot side, fuel remaining estimate, next observation window).

New file: `src/components/jwst/WebbModel3D.tsx` + `src/components/jwst/WebbHero3D.tsx` (wraps Canvas + HUD).

## 2. "Why Only Webb" — telescope comparison module

Brand-new section answering exactly what the user asked: what Hubble / Spitzer / Kepler / ground scopes could **not** see, and **why** Webb can.

- Side-by-side comparison cards: Webb vs Hubble, vs Spitzer, vs Kepler, vs Keck/VLT.
- For each rival: aperture, wavelength range, orbit, launch year, key limitation.
- For each Webb advantage: physics explanation in plain English (e.g. "Hubble sees visible/UV — early-universe light is redshifted into infrared, invisible to Hubble. Webb's 6.5 m gold-coated mirror + cryogenic MIRI detector catch it.").
- Visual: split-image sliders (Hubble vs Webb) for Pillars of Creation, Carina Nebula, Stephan's Quintet, Southern Ring — using existing curated CDN URLs.
- New files: `src/components/jwst/WhyOnlyWebb.tsx`, `src/components/jwst/ImageCompareSlider.tsx`, `src/data/jwst-comparisons.ts`.

## 3. Daily Findings Feed

A live "what Webb saw recently" rail, separate from the existing NASA image grid.

- New edge function `supabase/functions/jwst-daily-findings/index.ts` that aggregates:
    - NASA APOD API filtered for Webb (`?date=...`)
    - STScI / ESA Webb news RSS (`https://esawebb.org/news/feed/`, `https://webbtelescope.org/news/news-releases.xml`) — parsed server-side.
    - Falls back to curated list if both fail. 6-hour cache.
- Client component `DailyFindingsFeed.tsx`: vertical timeline of last ~30 days, each entry has date chip, thumbnail, 1-paragraph summary, "Open dossier" if it matches a vault entry.
- Wires into existing `useEchoXp` so opening a daily finding awards XP.

## 4. Intel deepening — expand every dossier

Current `jwst-findings.ts` has 15 entries with short summaries. Expand each to full intel sheet:

- Add fields: `priorAttempts` (which scopes tried & failed and why), `techniqueUsed` (NIRCam grism, MIRI MRS, NIRSpec MOS, transmission spectroscopy, etc.), `controversies` (open debates / contradicting data), `implications` (what it rewrites in cosmology/astrobiology), `relatedFindings` (cross-links), `papers` (arXiv DOIs).
- Add ~10 more findings to bring total to 25: WASP-96b water, GJ 1214b haze, NGC 346 protostars, Ring Nebula MIRI, Cassiopeia A reverse shock, Jupiter auroras, Saturn Enceladus plume IR, Uranus rings, asteroid Dimorphos DART debris, comet 238P main-belt water, plus 2 freshest 2025–2026 results pulled live.
- Update `FindingModal.tsx` to render the new sections as collapsible accordions (Prior Attempts / Technique / Controversy / Implications / Papers).

## 5. Polish pass

- Mobile: cap 3D model DPR to 1.5, hide hot-spots, swap OrbitControls for a single auto-rotation.
- Add a sticky sub-nav inside `/jwst`: `Hero · Mission · Why Webb · Findings · Timeline · Daily · Live`.
- SEO: expand JSON-LD to `Observatory` schema, add OpenGraph image (SMACS 0723 hero).
- Accessibility: every 3D hot-spot also reachable via keyboard list below the canvas.
- Performance: `React.lazy` the 3D hero + LiveWebbFeed; preload critical images.

## File map

**New**
- `src/components/jwst/WebbModel3D.tsx`
- `src/components/jwst/WebbHero3D.tsx`
- `src/components/jwst/WhyOnlyWebb.tsx`
- `src/components/jwst/ImageCompareSlider.tsx`
- `src/components/jwst/DailyFindingsFeed.tsx`
- `src/components/jwst/JwstSubNav.tsx`
- `src/data/jwst-comparisons.ts`
- `supabase/functions/jwst-daily-findings/index.ts`

**Edited**
- `src/pages/JWSTPage.tsx` — wire new sections, sub-nav, lazy loading
- `src/components/jwst/DeepFieldHero.tsx` — becomes the 2D fallback
- `src/data/jwst-findings.ts` — expanded schema + 10 new entries + deeper copy
- `src/components/jwst/FindingModal.tsx` — render new fields
- `package.json` — add three, @react-three/fiber@^8.18, @react-three/drei@^9.122.0

## Out of scope (call out before building)

- Real GLB model of Webb (v1 uses primitives; can swap to a NASA-released GLB later if you want photoreal).
- User accounts saving "favorite findings" — could be a follow-up.
- Hubble / Spitzer dedicated pages — `/telescopes` hub already slots those as "Incoming".

## One clarification before I build

The 3D model: do you want **stylized low-poly Webb built from Three primitives** (fast, ships today, matches Pantheon's cosmic aesthetic) or should I hunt down a **photoreal GLB** from NASA's 3D resources (heavier, longer load, but museum-accurate)? I'll default to stylized unless you say otherwise.