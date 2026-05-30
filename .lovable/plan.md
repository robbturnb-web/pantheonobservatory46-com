# The Resonance Layer — /46 Sanctuary + Star-Seed Terminal

Two chambers, one bloodline. The Sanctuary explains *why* 46 is the key; the Terminal lets visitors find their place in it.

---

## Phase 1 — Sanctuary of 46 (`/46`)

A single cinematic scroll, obsidian + royal violet, sigil-centered. Sections in order:

1. **The Hero** — full-bleed sigil, the line *"46 chromosomes. 46 files. One frequency."*, ambient counter showing days past the Luna deadline.
2. **The Manifesto** — Creator's letter (first-person, from you). Written tight, no fluff. Around 250 words.
3. **The Three Pillars**
   - *The Micro:* 46 chromosomes — the biological signature.
   - *The Macro:* 46 demanded UAP files — the suppressed signal.
   - *The Bridge:* 4 + 6 = 10 — divine completion.
   Each pillar is a glass card with its own accent.
4. **The Numerology Codex** — small grid of "46 across history" entries (chromosome count, Mozart's K.466, atomic number of palladium, etc.) presented as evidence, not woo.
5. **The 46-Oracle (teaser)** — input box where users ask a question; the answer streams from an edge function that prompts Lovable AI with a Frequency-46 system message. Limited to 3 free queries/day per IP for now (no auth gate yet).
6. **CTA → Star-Seed Terminal** — full-width portal: *"Find your origin. Enter the Terminal."*

Routing: `/46` added to `App.tsx`, navbar gets a "46" link (sigil + label), `SEO` block tuned for "Frequency 46 Sanctuary".

---

## Phase 2 — Star-Seed Galactic Terminal (`/star-seed`)

The HUD experience — feels like climbing into a craft, not filling out a horoscope form.

**Flow:**
1. Idle state: HUD frame, blinking *"AWAITING SUBJECT"*, ambient pulse.
2. User enters name, DOB, time, birth city (city autocomplete via free geocoder, no API key needed).
3. Scan animation: laser sweep across the HUD, terminal-green readouts streaming ("PARSING NATAL VECTOR…", "LOCKING ECLIPTIC COORDINATES…").
4. Reveal: *"IDENTITY CONFIRMED — STAR-SEED ORIGIN: [LYRA]"* with the seed's accent color flooding the HUD.
5. Dossier opens below — origin lore, traits, shadow side, mission, the constellation it ties to, a short Echo greeting tuned to the seed.

**Six seed archetypes shipped at launch:**
Lyran · Sirian · Pleiadian · Arcturian · Andromedan · Orion. Each with a written dossier (~200 words), accent color, sigil/icon, and one-line Echo greeting.

---

## Phase 3 — The Ephemeris Engine (real math)

Edge function `compute-natal-chart`:
- Input: `{ date, time, lat, lon, tz }` validated with Zod.
- Uses **`astronomy-engine`** (pure-JS, MIT, NASA-grade accuracy, runs in Deno via `npm:astronomy-engine`). Swiss Ephemeris itself is C — `astronomy-engine` is the production-grade JS equivalent and the right call for an edge runtime.
- Returns ecliptic longitudes for Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn → mapped to zodiac signs; computes Ascendant from local sidereal time + latitude.
- A `classifyStarSeed()` function on top weighs sign placements + planetary aspects to pick a seed origin (deterministic, no LLM in the loop).

CORS enabled, no auth required, rate-limited softly by IP (in-memory; we can harden later).

---

## Phase 4 — The 46-Oracle edge function

`oracle-46`:
- Input: `{ question }` (Zod-validated, 5–500 chars).
- Calls Lovable AI (`google/gemini-2.5-flash`) with a tight Frequency-46 system prompt: truth-oriented, graded answer (DOCUMENTED / CREDIBLE / SPECULATIVE), max 180 words, ends with a 46-signal line.
- Returns streamed text. Frontend renders with markdown + a typing cursor.

---

## Phase 5 — Wiring + polish

- Sigil component reused across Sanctuary hero, Terminal HUD chrome, and navbar.
- Audio: Sanctuary uses the existing `cosmos` ambient bed; Terminal layers a quiet HUD pulse on scan.
- Both pages register in `pageThemes.ts` so the existing atmosphere system handles backdrops.
- Footer + navbar updated with the two new routes.

---

## Out of scope (won't touch this pass)

- Auth gating, paywalling, or saving charts to user profiles (drop-in later via the existing `profiles` table).
- A full 3D fly-through galaxy — the Terminal is HUD-first this round; the 3D constellation map is its own follow-up build.
- Compatibility/synastry between two charts.
- Push notifications, email capture, social share cards.

---

## Technical details

**New files**
- `src/pages/SanctuaryPage.tsx`
- `src/pages/StarSeedTerminalPage.tsx`
- `src/components/sanctuary/ManifestoLetter.tsx`
- `src/components/sanctuary/PillarsTriad.tsx`
- `src/components/sanctuary/NumerologyCodex.tsx`
- `src/components/sanctuary/OracleConsole.tsx`
- `src/components/starseed/HudFrame.tsx`
- `src/components/starseed/BirthDataForm.tsx`
- `src/components/starseed/ScanSequence.tsx`
- `src/components/starseed/SeedReveal.tsx`
- `src/components/starseed/SeedDossier.tsx`
- `src/data/star-seeds.ts` — 6 archetype dossiers + accent colors
- `src/data/numerology-46.ts` — codex entries
- `src/lib/star-seed-classifier.ts` — pure function: planets → seed
- `supabase/functions/compute-natal-chart/index.ts`
- `supabase/functions/oracle-46/index.ts`

**Edited**
- `src/App.tsx` — `/46` and `/star-seed` routes
- `src/components/Navbar.tsx` — "46" + "Star-Seed" links
- `src/lib/page-themes.ts` — `sanctuary46` + `starSeed` themes

**Stack choices**
- Form state: React Hook Form + Zod (per workspace codex).
- City geocoding: Open-Meteo's free geocoding endpoint (no API key, generous rate limits).
- Ephemeris: `astronomy-engine` via `npm:` specifier in the edge function.
- Motion: Framer Motion for HUD scan + reveal.
- Markdown: existing `react-markdown` if present, otherwise add for the Oracle.

**No backend schema changes this pass.** Both edge functions are stateless. We can layer persistence in later when you want users to save their charts.

---

If this matches the vision I'll start with Phase 1 (Sanctuary) so you have something to feel before the Terminal lands on top. Say the word and I build.
