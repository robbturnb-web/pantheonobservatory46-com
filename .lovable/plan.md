# Pantheon Observatory 46 — Completion Buildout Plan

This is a large, multi-module buildout. I'll ship it in **4 sequential waves** so we can verify each batch on mobile before stacking the next. Nothing existing gets deleted — every module is additive and uses the locked cosmic design tokens (obsidian + violet + gold + realm accents, green reserved for live/online status only).

---

## What I already see in the codebase (reusing, not rebuilding)
- `TimelinePage`, `ObservatoryMapPage`, `DailyBriefingPage`, `LiveFeedsPage` — pages exist
- `XPBar`, `RankUnlock`, `use-echo-xp`, `BadgeGrid`, `ProfileStatsCard` — XP/rank system already wired
- `ContentTrustBadge`, `EvidenceBadge`, `SourceLabel`, `source-tier` — FACT/MYTH/THEORY/SPECULATION primitives exist
- `data/pyramids.ts`, `data/timeline.ts`, `data/atlantis.ts`, `data/underground-bases.ts`, `data/aaro.ts` — partial source data
- `live-data.ts` + `live-data-proxy` edge function — live NOAA/ISS/NWS already working

So the buildout = mostly new data files + new section components + nav wiring, reusing existing primitives.

---

## Wave 1 — Daily return loop (homepage above-the-fold)
**Goal:** Give every visitor a reason to come back tomorrow.

1. **Pantheon Daily Brief** (`src/components/home/PantheonDailyBrief.tsx`)
   - 5 cards: Solar / Earth Pulse / Orbit / Mythology Spotlight / Mystery Watch
   - Cards 1–3 read from existing `use-live-data` hooks (NOAA SWPC, USGS, ISS) — Verified badge + green ONLINE dot
   - Cards 4–5 read from new `src/data/daily-brief.ts` editorial rotation (date-keyed)
   - "Open Brief" → routes to existing `DailyBriefingPage`
2. **Mystery of the Day** (`src/components/home/MysteryOfTheDay.tsx`)
   - Cinematic full-width band, starter: "Lost Knowledge of the Pyramids"
   - Golden scan-beam animation overlay (CSS only, mobile-reduced)
   - FACT/MYTH/THEORY/SPECULATION chips via `ContentTrustBadge`
   - Buttons: Investigate (→ `/pyramid-explorer`), Save to Archive (localStorage), Compare Sources (modal)
3. Inject both into `HomePage.tsx` near the top, below the hero.

## Wave 2 — Knowledge expansion (new categories)
4. **Ancient Technologies Archive** — new route `/ancient-tech`
   - `src/data/ancient-tech.ts` (8 starter entries)
   - `src/pages/AncientTechPage.tsx` using `DossierCard` grid
5. **Lost Places Archive** — new route `/lost-places`
   - `src/data/lost-places.ts` (8 starter entries)
   - `src/pages/LostPlacesPage.tsx`
6. **Restricted Locations** — new route `/restricted`
   - `src/data/restricted-locations.ts` (8 entries)
   - `src/pages/RestrictedLocationsPage.tsx` — split "Known Facts" vs "Claims/Theories" columns, classified-archive visual treatment
7. **Pantheon Timeline upgrade** — extend `src/data/timeline.ts` with the 6 tabs (Ancient World, Classical Mythology, Lost Civilizations, Modern Disclosure, Space Age, Future Watch) and add tab UI to `TimelinePage`

## Wave 3 — Engagement systems
8. **Global Observatory Map enhancement** (`ObservatoryMapPage`)
   - Add static-atlas fallback layer with glowing pins for: ancient ruins, pyramids, megaliths, UAP hotspots, volcanoes, observatories, restricted, lost cities
   - Filter chips, graceful "Google Maps API required for live map" notice (does not break)
9. **Pantheon Academy** — new route `/academy`
   - `src/data/learning-paths.ts` (7 paths)
   - `src/pages/AcademyPage.tsx` — path cards (difficulty/time/XP) + quiz teaser card
   - Quiz data scaffolded in `src/data/quizzes.ts` (5 categories, ~5 questions each starter)
10. **Builder's Library** — new route `/library`
    - `src/data/builders-library.ts` (curated entries, clearly marked "Curated list pending" where empty)
    - `src/pages/BuildersLibraryPage.tsx`
11. **Human Potential** — new route `/human-potential`
    - `src/data/human-potential.ts` (10 practices, educational framing — no medical claims)
    - `src/pages/HumanPotentialPage.tsx`

## Wave 4 — Glue: retention, integrity, navigation
12. **Pantheon Path / XP teaser** (`src/components/home/PantheonPathTeaser.tsx` already exists — extend with the 6 ranks: Seeker → Researcher → Pathfinder → Archivist → Guardian → Ascendant and the 7 achievement cards). Wires into existing `use-echo-xp`.
13. **Source Integrity panel** (`src/components/SourceIntegrityPanel.tsx`)
    - Reusable explainer block with the 4-label legend
    - Drop into HomePage footer-zone + Academy + each new archive page header
14. **Navigation update** (`src/config/nav.ts` + `Navbar.tsx`)
    - Reorder primary: Home · Live · Daily Brief · Timeline · Academy · Map · Gods · Disclosure · Echo · Codex
    - Add **"Begin Journey"** CTA button → opens a small modal with 6 path options that deep-link to the matching section
15. **Mobile pass** — verify each new section against the mobile checklist (no horizontal overflow, large tap targets, reduced animation, lazy images)

---

## Technical notes (for me)
- All new colors via existing tokens (`text-realm-gods`, `text-signal-online`, etc.) — zero hardcoded hex
- New data files follow the `extract_strings_from_ts()` shape so the PDF archive script keeps working
- All new pages get `<SEO>` + lazy-loaded in `App.tsx`
- Daily-rotating content uses `new Date().getUTCDate() % length` for stable per-day picks
- XP/saves use existing localStorage keys via `use-echo-xp`
- Restricted Locations page: strict 2-column "Verified | Claims" split so speculation is never visually equal to fact
- Map page: detect `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY` — if absent, show Static Atlas Mode (no crash)

## Verification at each wave
- Build passes (auto)
- Playwright smoke: load `/`, `/timeline`, `/academy`, `/map`, `/lost-places`, `/restricted`, `/ancient-tech`, `/library`, `/human-potential` at 384×800 — screenshot each, confirm no overflow
- Console clean

## Out of scope (will flag, not build)
- Real quiz scoring backend (frontend-only scaffold for now, as requested)
- Live editorial CMS for Daily Brief (uses local rotating data file — easy to swap to Cloud later)
- Google Maps live integration (placeholder unless you say "connect Maps")

---

**Approve and I'll start Wave 1 immediately.** If you want a different order (e.g. ship Navigation + Source Integrity first so the new pages have entry points as they land), say the word.
