
# JWST Flagship + Telescope Realm Rebuild

A new top-level **/jwst** page becomes the cinematic flagship of Pantheon's Observatory. The existing TelescopePage is reworked into a realm hub at **/telescope** with JWST featured and reserved slots for Hubble, Chandra, Vera Rubin, ALMA, Spitzer.

## What you'll see

**`/jwst` — the flagship (hybrid experience)**

1. **Deep Field Hero**
   - Full-bleed Webb deep-field image (JWST's First Deep Field — SMACS 0723)
   - Slow parallax zoom on scroll; starfield + nebula glow layered behind
   - Hero title in Cinzel: *"JAMES WEBB"* / subtitle Space Grotesk: *"Looking back to the dawn of light."*
   - Live status chip (signal-online green): "ONLINE · L2 ORBIT · Day 1,420"
   - Two CTAs: *Enter Mission Console* / *Browse Findings*

2. **Mission Console (sticky instrument panel)**
   - Left rail: 4 instruments — NIRCam, MIRI, NIRSpec, FGS/NIRISS — each with realm-violet glyph
   - Center readouts: target name, RA/Dec, redshift z, wavelength range, exposure time
   - Right rail: telemetry (distance from Earth 1.5M km, temp -223°C, fuel margin)
   - Clicking an instrument filters the findings grid below to that instrument's captures

3. **Findings Vault** (curated)
   - 12–15 hand-picked discoveries as glass dossier cards, evidence-graded:
     JADES-GS-z14-0 (most distant galaxy), Pillars of Creation revisit, WASP-39b CO₂ detection, Cartwheel Galaxy, Phantom Galaxy M74, Cosmic Cliffs (Carina), Stephan's Quintet, Earendel (most distant star), K2-18b atmosphere, TRAPPIST-1 system, Neptune rings, Jupiter aurora, Saturn rings IR, Tarantula Nebula, Ring Nebula
   - Cards open into modal dossiers (reuse existing DossierModal pattern) with image, what it shows, why it matters, sources

4. **Cosmic Timeline**
   - Horizontal scroll timeline: 13.6 Bya → present
   - Each Webb finding pinned to its cosmic-era slot
   - Hover = ghost preview, click = jump to vault dossier

5. **Live from Webb** (NASA API feed strip)
   - Rotating strip pulling latest JWST images from NASA Image API (`q=james+webb`, filtered)
   - Cached via edge function (4-hour TTL) so we never hammer NASA
   - Falls back to curated set if the API is down

6. **Echo handoff**
   - "Ask Echo about James Webb" CTA → opens Echo with seeded prompt
   - Awards XP event `page:/jwst` on first visit, plus `vault:jwst-<id>` per finding opened

**`/telescope` — Observatory realm hub (rebuild)**
- Replace the current generic list with a realm-styled grid of telescope tiles
- JWST tile = featured/large with "FLAGSHIP" ribbon → links to `/jwst`
- Other tiles (Hubble, Chandra, Vera Rubin, ALMA, Spitzer) = "Coming soon" with short blurbs
- Same starfield + realm-violet atmosphere as other realms

## Also in this pass

- Remove the leftover `BAGEL FAT` starter UI on `/index` (replace with a redirect to `/`)
- Add `/jwst` to Navbar + Cosmos realm cross-links
- SEO: title, meta, JSON-LD `CreativeWork` for the flagship
- Mobile pass on JWST (Console collapses into tab strip; Vault becomes 1-col)

## Tech notes

**Files created**
- `src/pages/JWSTPage.tsx` — flagship route
- `src/components/jwst/DeepFieldHero.tsx`
- `src/components/jwst/MissionConsole.tsx`
- `src/components/jwst/FindingsVault.tsx` (reuses `DossierCard`/`DossierModal`)
- `src/components/jwst/CosmicTimeline.tsx`
- `src/components/jwst/LiveWebbFeed.tsx`
- `src/data/jwst-findings.ts` — curated discoveries with NASA/ESA image URLs, evidence grades, sources
- `supabase/functions/nasa-webb-feed/index.ts` — proxied NASA Image API call with 4h memory cache

**Files edited**
- `src/pages/TelescopePage.tsx` — rebuilt as realm hub
- `src/data/telescopes.ts` — add JWST flagship entry, restructure
- `src/components/Navbar.tsx` — add JWST link under Cosmos/Observatory
- `src/App.tsx` — register `/jwst` route; redirect `/index` → `/`
- `src/pages/Index.tsx` — delete starter content

**Data sources**
- Curated: NASA/ESA/STScI image CDN URLs (free, hot-linkable, with credit)
- Live: NASA Image and Video Library API (`images-api.nasa.gov`) — no key needed, free, public
- All image credits rendered per-card per NASA/ESA usage policy

**No database changes** — findings are static; XP/visit tracking reuses existing `award_xp` / `track_page_visit` RPCs.

## Out of scope (future passes)

- Building out Hubble/Chandra/Vera Rubin dossiers (slots reserved, content later)
- 3D L2 orbit visualization (cool but big lift — flag for v2)
- User-submitted JWST observations
