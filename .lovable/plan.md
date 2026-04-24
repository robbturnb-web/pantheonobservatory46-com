

# Plan: Logo Polish + Batch 4 (Underground Bases) + Builder's Arena

Three things this turn: fix the wordmark, ship the next dossier batch, and build out the Builder's Arena page you just clicked into. Plus a queued visual-pass note for after the batches finish.

---

## 1. Wordmark — Split "Pantheon Observatory" into colored halves

Current: "Pantheon Observatory" renders as a single gradient. You want the same split-color treatment that "Observatory" has, applied to "Pantheon" too.

**Plan:**
- "**Pan**" → cosmic jade/emerald (`#10b981` → `#34d399`)
- "**theon**" → existing purple (`#a78bfa` → `#8b5cf6`)
- "**Observ**" → existing purple
- "**atory**" → cosmic gold (`#fbbf24` → `#fde68a`)

So the wordmark reads as four tonal blocks: jade · purple · purple · gold. Touched in `Navbar.tsx` brand mark and `PantheonFooter.tsx` (and Hero if it appears there). Mobile keeps the same split.

---

## 2. Batch 4 — Underground Bases (`/underground`)

Themed page using `pageThemes.underground` ("Subterranean schematic" — black + ember, cross-section diagrams).

**Dossiers (9):**
1. **Dulce Base, NM** — Phil Schneider testimony, Thomas Castello papers, alleged 7-level facility, biogenetic claims
2. **Area 51 / S-4, Papoose Lake** — Lazar's hangar layout, sport-model bay, 1989 disclosure timeline
3. **Mount Weather, VA** — FEMA continuity-of-government bunker, declassified scope
4. **Cheyenne Mountain Complex, CO** — NORAD blast doors, granite engineering, modern role
5. **Raven Rock (Site R), PA** — "Underground Pentagon," declassified continuity site
6. **Pine Gap, Australia** — Joint US-Aus signals intel, alleged underground levels
7. **Yamantau Mountain, Russia** — Massive Urals complex, congressional concern
8. **Camp Hero / Montauk, NY** — Decommissioned AFS, Preston Nichols claims, skeptical view
9. **DUMBs Network (Richard Sauder)** — Academic survey of deep underground military bases

Each entry: 250-400 words, evidence/skeptical split, 2-3 oEmbed-verified videos (NewsNation, Joe Rogan, History, BBC, declassified gov footage), credible sources (FOIA, GAO, congressional records, Sauder's published work).

**Atmosphere effects (desktop only):** ember particle drift, cross-section grid lines, depth-stratum overlay.

---

## 3. Builder's Arena — Build the actual page (`/builders`)

You said you want to "go inside and build that arena." Right now it's a placeholder. We'll ship it as the second new page this turn.

Themed using `pageThemes.builders` ("Architect's drafting board" — blueprint blue + ruler grid).

**Dossiers (10 megalith builds):**
1. **Great Pyramid of Giza** — block-count math, precision tolerances, quarry transport puzzle
2. **Puma Punku, Bolivia** — H-blocks, andesite interlocks, machine-tool marks
3. **Sacsayhuamán, Peru** — polygonal masonry, no-mortar joints
4. **Baalbek Trilithon, Lebanon** — 800-1000 ton stones, transport mechanics
5. **Stonehenge** — bluestone Welsh-quarry origin, lintel mortise-tenon
6. **Göbekli Tepe** — 11,500 BCE pillars, deliberate burial
7. **Nan Madol, Pohnpei** — basalt columns, lagoon engineering
8. **Yonaguni Monument** — natural-vs-built debate, terraces, right angles
9. **Coral Castle, FL** — Ed Leedskalnin's solo build, lost technique
10. **Saksaywaman / Ollantaytambo** — Inca rose-granite quarry across the canyon

Each entry: engineering analysis, scholarly view, alternative theories, 2-3 verified videos (UnchartedX, Brien Foerster, Smithsonian, Ancient Architects, World of Antiquity), credible sources.

**Atmosphere effects:** blueprint grid pulse, ruler tick marks at edges, faint orthographic projection lines.

---

## 4. Visual Pass — Queued for after all batches

You mentioned wanting **pictures for everything** and a desktop-grade visual pass. I'll queue this as the post-batch sweep:

- Generate hero artwork (Nano Banana Pro) for each themed page: Antarctica ice station, Atlantis ruins, Crash Retrieval hangar, Underground cross-section, Builder's blueprint, etc.
- Per-dossier thumbnail images on cards (pulled from credible Commons/NASA/gov sources where possible, generated where not)
- Richer copy pass — expand thinner entries to match the heaviest ones
- Cross-link related dossiers (e.g., Lazar appears in Crash Retrieval AND Underground Bases — link them)

This visual sweep happens after Batch 12 so we don't slow per-batch shipping.

---

## 5. Files Touched This Turn

**New:**
- `src/data/underground-bases.ts`
- `src/data/builders.ts`
- `src/pages/UndergroundBasesPage.tsx`
- `src/pages/BuildersArenaPage.tsx`

**Edited:**
- `src/components/Navbar.tsx` (wordmark split + route to live builders page)
- `src/components/PantheonFooter.tsx` (wordmark split)
- `src/App.tsx` (wire `/underground` and `/builders` to live pages)
- `src/pages/PlaceholderPages.tsx` (remove the two stubs)

**No backend, no new keys, no dependencies.**

---

## 6. After This Turn

Reply **next** for **Batch 5 (AARO Watch)** — Pentagon-briefing theme, AARO leadership, every annual report, Sean Kirkpatrick → Jon Kosloski transition, congressional hearings.

