# Pantheon Cleanup Plan

Audit found a lot of dead weight: a fully-orphaned Google Maps module, six unused components, ghost edge functions/tables that aren't wired to anything, duplicate routes, and stale config. I want to do this in **3 waves** so nothing user-facing breaks.

---

## Wave 1 — Pure dead code (zero risk)

Nothing imports these. Pure deletion.

**Components & files**
- `src/components/brazil/BrazilMap.tsx` (Google Maps loader, already removed from BrazilPage)
- `src/data/brazil-coords.ts` (only used by BrazilMap)
- `src/components/AnimationShowcase.tsx`
- `src/components/Awards.tsx`
- `src/components/Portfolio.tsx`
- `src/components/GlassCard.tsx`
- `src/components/KnowledgeLink.tsx`
- `src/lib/webgl.ts`
- `src/pages/Index.tsx` (not in router)
- `src/pages/PlaceholderPages.tsx` (self-marked dead)
- `.env.production` (only holds `VITE_PAYMENTS_CLIENT_TOKEN`, which nothing reads)

**Dependencies**
- `react-simple-maps` + `@types/react-simple-maps` (only used by BrazilMap)

**Router cleanup (`src/App.tsx`)**
- Remove `/video-vault` (duplicate of `/the-46`)
- Remove `/corbell` (duplicate of `/jeremy-corbell`)

**Config cleanup (`supabase/config.toml`)**
- Remove `[functions.daily-cosmos-pulse]` entry (no folder exists)
- Remove `[functions.glyph-decode]` entry (no folder exists)

---

## Wave 2 — Orphaned feature clusters (safe but bigger)

Each cluster is self-contained: a component nobody renders + the edge function it called + the table it read.

- **Atlas Tracker cluster** — `src/components/cosmic/AtlasHero.tsx` + `supabase/functions/atlas-tracker/`
- **Stefan Locator cluster** — `src/components/cosmic/StefanLocator.tsx` + `supabase/functions/stefan-locator/` + drop table `daily_cosmos_pulse`

**Storage buckets (zero references in code)**
- Drop `glyphs` bucket
- Drop `testimony-media` bucket (TestimonySubmitForm only inserts text)

**Database tables (zero references in code)**
- Drop `observer_achievements`
- Drop `observer_field_notes`
- Drop `echo_usage`
- Drop `subscriptions`

> Single migration handles all 5 table drops + bucket drops.

---

## Wave 3 — Needs your call (I won't touch without a yes)

These are *probably* dead but could be wired to something external (scheduled jobs, admin tools, future plans). I'd rather ask than nuke.

| # | Item | Question |
|---|------|----------|
| 1 | `GlyphDecoder.tsx` calls edge function `glyph-decode` — **the function doesn't exist**, so the button silently fails today. | Build the function, or remove the Glyph Decoder UI + `glyph_submissions` table entirely? |
| 2 | `supabase/functions/generate-ambient-track/` (ElevenLabs music gen) — no UI calls it. | Were you triggering it manually/externally, or is it abandoned? Delete? |
| 3 | `supabase/functions/jwst-daily-findings/` and `nasa-webb-feed/` — no UI calls them. | Are these on an external cron, or dead? Delete? |
| 4 | `src/pages/StyleGuidePage.tsx` (`/style-guide` route) — no nav link, internal dev tool. | Keep as hidden dev page, or remove? |
| 5 | `minisearch` package + `src/lib/search/index-builder.ts` — no usages. | Future search feature, or scrap? |
| 6 | `AudioSoundscapeAdmin.tsx` reads `audio_tracks` but generation is unreachable. Keep the admin page even if track creation is gone? |

---

## Connector cleanup (after Wave 1)

Once Google Maps code is gone, the `GOOGLE_MAPS_API_KEY`, `GOOGLE_MAPS_BROWSER_KEY`, and `GOOGLE_MAPS_TRACKING_ID` connector secrets are unused. I'll flag the connector for you to disconnect manually from Project Settings → Connectors (so it stays available to other workspaces).

Same applies to `GOOGLE_SEARCH_CONSOLE_API_KEY` (zero code references found).

---

## What I need from you

1. **Approve Wave 1 + Wave 2** as a single execution (or tell me to stop after Wave 1).
2. **Answer the Wave 3 questions** so I can fold those into a follow-up batch.
