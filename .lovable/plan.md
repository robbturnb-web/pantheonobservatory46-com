

# Plan: Pantheon Expansion — 12 New Themed Dossier Pages + Mega-Menu

We bring the categorized mega-menu from your other remix into this app and build out **12 new fully-themed pages** at the same depth as `/missing` and `/gods`. Each new tab gets its own visual identity — like Missing has its "classified detective case" theme, every new section gets its own atmosphere.

---

## 1. Navbar — Categorized Mega-Menu

Replace the current flat link list with a grouped dropdown matching your screenshots:

- **Cosmos & Disclosure** (purple): UAP Catalog, AARO Watch, Crash Retrieval, Disclosure Timeline, Whistleblower Vault, Cosmos Pulse
- **Ancient Mysteries** (gold): Atlantis, Pyramid Interior, Glyphs Codex, Stone Faces, Pantheon of Gods, **Antarctica Files**
- **Entity Encounters** (red): Alien Species, Entity Encounters, Extinct Species, Underground Bases
- **Federation & Forge** (cyan): Galactic Federation, Builder's Arena, Elements Lab, CERN Watch, Observer Profile

Desktop: hover-triggered mega-menu with icons + colored category headers.
Mobile: same accordion pattern from the screenshot.

---

## 2. Twelve New Pages — Each Themed Like a Distinct "Case File"

Every page follows the proven `/missing` formula: themed hero → curated dossiers → expandable detail modal → curated YouTube videos → sources. Each gets its own **visual atmosphere** (color palette, overlay effects, typography flourish).

| # | Page | Route | Theme | Content depth |
|---|---|---|---|---|
| 1 | **AARO Watch** | `/aaro` | "Pentagon briefing room" — beige folders, redaction bars, `[CLASSIFIED]` stamps | All AARO leadership, every annual report, every congressional hearing, current case backlog |
| 2 | **Crash Retrieval** | `/crash-retrieval` | "Black-program recovery vault" — graphite + amber warning, blueprint grid | Roswell, Kingman, Kecksburg, Aztec, Varginha, Bob Lazar's S-4 metals, Grusch's reverse-engineering claims |
| 3 | **Atlantis** | `/atlantis` | "Submerged ruins" — deep teal, caustic light ripples, ancient Greek serif | Plato's accounts, Bimini Road, Yonaguni, Cuba sunken city, Edgar Cayce readings, Hancock theories, geological dating |
| 4 | **Antarctica Files** | `/antarctica` | "Ice-station expedition log" — white/cyan, snow particles, frostbite vignette, Operation Highjump dossier feel | Operation Highjump, Admiral Byrd diary, Lake Vostok, pyramid claims, Nazi base rumor, recent ice-shelf anomalies, scientist deaths there |
| 5 | **Glyphs Codex** | `/glyphs` | "Cuneiform scroll" — papyrus + ink, animated sigil reveal | Sumerian, Egyptian, Vedic, Olmec, crop circles, Voynich — uses existing `glyphs.ts` |
| 6 | **Stone Faces** | `/stone-faces` | "Field-archaeology dig site" — dust + sepia, callipers UI | Easter Island, Olmec heads, Bucegi, Gobekli Tepe, Yonaguni faces, Adam's Calendar — uses `stone-markers.ts` |
| 7 | **Entity Encounters** | `/encounters` | "Witness interview transcript" — typewriter font, polaroid stack | Travis Walton, Betty/Barney Hill, Pascagoula, Ariel School, Kelly-Hopkinsville, Skinwalker Ranch encounters |
| 8 | **Extinct Species** | `/extinct` | "Natural-history museum exhibit" — bone white, taxonomy plates | Nephilim giants, Denisovans, Hobbits (H. floresiensis), Paracas elongated skulls, Lovelock cave giants, Patagonian giants |
| 9 | **Underground Bases** | `/underground` | "Subterranean schematic" — black + ember, cross-section diagrams | Dulce, Area 51 S-4, Mount Weather, Cheyenne Mountain, DUMBs theory, Pine Gap, Hawaiian volcano claims |
| 10 | **Galactic Federation** | `/federation` | "Diplomatic treaty hall" — deep indigo + gold, embassy seals | Haim Eshed claims, Pleiadian council, Andromedan council, Ashtar Command, Sirian high council, Galactic Confederation overlap |
| 11 | **Builder's Arena** | `/builders` | "Architect's drafting board" — blueprint blue + ruler grid | Megalith builders worldwide: Egypt, Puma Punku, Sacsayhuamán, Baalbek, Stonehenge, Nan Madol, Yonaguni — engineering analysis |
| 12 | **CERN Watch** | `/cern` | "Particle-collider control room" — cyan + magenta hex grid, oscilloscope HUD | LHC timeline, Mandela Effect correlation theories, Shiva statue, dimensional-portal claims, every public experiment, anomaly logs |

**Each page includes:**
- Themed hero banner with page-specific atmospheric effect
- 6-12 dossier cards (full content, not stubs)
- Click-to-expand modal with: Origin/Background, Key events, Evidence, Skeptical view, Curated videos (3 per dossier from credible channels — same rules as Gods batch), Sources
- Confidence/evidence badges where relevant (VERIFIED / REPORTED / ALLEGED / DEBATED)

---

## 3. Foundation — Reusable Themed Page Kit

To avoid 12 one-off files, we build:

- **`<DossierPageLayout>`** — accepts `theme` prop (color palette, hero overlay, font flourish) and renders consistent hero + grid + modal scaffolding
- **`<DossierCard>`** + **`<DossierModal>`** — universal expandable card with tabs (Overview · Evidence · Watch · Sources)
- **Theme tokens** in `src/lib/page-themes.ts` — one config per page (12 themes)

This means the 12 pages share the same battle-tested code, but each *feels* distinct via theme config + hero artwork.

---

## 4. Data Files (12 new)

Each at `src/data/<topic>.ts` with a `<Topic>Entry[]` export containing 6-12 fully-written entries (200-400 words each), curated `videos[]` (verified live via oEmbed), and `sources[]`.

```
src/data/aaro.ts
src/data/crash-retrieval.ts
src/data/atlantis.ts
src/data/antarctica.ts
src/data/entity-encounters.ts
src/data/extinct-species.ts
src/data/underground-bases.ts
src/data/galactic-federation.ts
src/data/builders.ts
src/data/cern.ts
```
(`glyphs.ts` and `stone-markers.ts` already exist — reuse.)

---

## 5. Execution — One Page Per Batch

Same rhythm we used for Gods. Per batch:
1. Write the data file (full content + verified videos)
2. Wire the page to the shared `<DossierPageLayout>` with that page's theme
3. Add to router + mega-menu
4. Verify videos via oEmbed
5. You review → next batch

**Proposed order** (heaviest themes first while energy is high):
1. **Antarctica Files** (you mentioned it first)
2. **Atlantis** (you mentioned it second)
3. Crash Retrieval
4. Underground Bases
5. AARO Watch
6. Entity Encounters
7. Extinct Species
8. CERN Watch
9. Galactic Federation
10. Builder's Arena
11. Glyphs Codex (page over existing data)
12. Stone Faces (page over existing data)

**Pre-batches:**
- **Batch A**: Mega-menu + `<DossierPageLayout>` + theme tokens (foundation only, no new pages yet)

---

## 6. Files Touched

**New:**
- `src/components/Navbar.tsx` (rewrite to mega-menu)
- `src/components/dossier/DossierPageLayout.tsx`
- `src/components/dossier/DossierCard.tsx`
- `src/components/dossier/DossierModal.tsx`
- `src/lib/page-themes.ts`
- 10 new `src/data/*.ts` files
- 12 new `src/pages/*.tsx` files

**Edited:**
- `src/App.tsx` (12 new routes)

**No backend changes. No new dependencies.** All visuals via CSS/SVG/canvas.

---

## 7. Mobile Note

You said this is desktop-first. New pages render fully on desktop with all atmospheric effects; mobile gets the same content with effects disabled (gated behind `lg:` breakpoint) so phones stay fast.

---

## What I need from you

Confirm the **batch order** above (or reorder), and I'll start with **Batch A (foundation + mega-menu)**, then **Antarctica Files** as the first themed page.

