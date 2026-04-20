
# Plan: Elements Lab + Glyphs Archive + Stone Faces + Community Vault + Live data spine

## Scope confirmed
- **Slice**: Elements & Alchemy Lab, Glyphs & Symbols Archive, Stone Faces & Lost Markers
- **Live data**: free APIs + Lovable AI for daily Stefan Burns summary (cron-driven edge function)
- **Community**: full submissions + tags + search + mod queue + your pinned story + Flow Drive embed
- **Style**: keep existing Pantheon Observatory cosmic-purple theme

---

## Phase 1 — Database (one migration)

Tables:
- `community_testimonies` — id, user_id, title, body, tags (text[]), category, status ('pending'|'approved'|'rejected'), pinned (bool), flow_drive_url (text, nullable), created_at, approved_at, approved_by
- `user_roles` — id, user_id, role enum ('admin','moderator','user') — proper RLS pattern with `has_role()` security definer fn
- `glyph_submissions` — id, user_id, image_url, drawn_svg (text), ai_interpretation (text, nullable), culture_tags (text[]), status, created_at
- `daily_cosmos_pulse` — id, summary_date (date unique), source_url, summary_md, generated_at — populated by daily edge function

Storage buckets:
- `glyphs` (public read, auth write) — uploaded glyph images
- `testimony-media` (public read, auth write) — optional images for testimonies

RLS: anyone can read approved content; users can insert/edit their own; only admins/moderators can approve or pin.

## Phase 2 — Elements & Alchemy Lab (`/elements`)

- Full periodic table grid (118 elements + spotlight Element 115 / Moscovium with Lazar fuel lore card)
- Click any element → detail panel with properties, lore, animations
- **Mixer mode**: drag-drop two elements onto a "reactor" → particle collision animation (framer-motion + canvas burst) → outcome card showing real chemistry (when known) + "exotic matter" speculation for combos involving 115/119/heavy synthetics
- Compatibility highlighting: when one element is selected, valid reaction partners glow neon-green; incompatible fade
- Mad-scientist toggle that unlocks fictional UFO-fuel outcomes

Data: `src/data/elements.ts` (full periodic table, each with `lore?` field for the spotlight ones). Reaction logic in `src/lib/element-reactions.ts`.

## Phase 3 — Glyphs & Symbols Archive (`/glyphs`)

- Curated grid of ~30 ancient glyphs (Sumerian cuneiform, Egyptian hieroglyphs, Mayan, Vinča, Indus, crop-circle motifs) in `src/data/glyphs.ts`
- Each card flips on hover, rotates with subtle animation, opens dossier with culture/era/translation/ET interpretation
- **Decoder tool**: upload an image OR draw on a canvas (use `react-signature-canvas` or a tiny custom canvas) → submit → edge function `glyph-decode` calls Lovable AI (gemini-2.5-pro for vision) with prompt: "Match this glyph to known ancient symbols and provide a literal + ET-disclosure interpretation"
- Submitted glyphs save to `glyph_submissions` and can be browsed in a public gallery once approved

## Phase 4 — Stone Faces & Lost Markers (`/stone-faces`)

- Curated dossier set: Treasure Island, Oak Island, Easter Island moai, Olmec heads, Göbekli Tepe pillars, Yonaguni monument, Bucegi sphinx
- World map (use `react-simple-maps` — already in the React ecosystem, no API key) with pulsing markers at coordinates
- Click marker → side dossier with theories, builder hypotheses, photo, "activation" pulse animation when opened
- Data: `src/data/stone-markers.ts`

## Phase 5 — Community Vault (`/community`)

- Public feed of approved testimonies, sorted: pinned first, then newest
- Filters: by tag, by category (sighting/encounter/contact/dream/synchronicity), full-text search
- Submit form (auth-gated) → goes into `pending` queue
- Moderator dashboard at `/community/mod` — gated by `has_role(uid, 'moderator')` — approve/reject/pin
- Your personal story seeded as pinned with the Flow Drive video embed (URL passed by you later or placeholder for now)

## Phase 6 — Daily Cosmos Pulse spine (foundational for the bigger Live Cosmos Pulse next batch)

- Edge function `daily-cosmos-pulse`:
  - Fetch Stefan Burns YouTube channel RSS (`https://www.youtube.com/feeds/videos.xml?channel_id=...` — public, no key)
  - Take latest video title + description
  - Send to Lovable AI (gemini-2.5-flash) → "Summarize this Stefan Burns update in 3 bullets emphasizing planetary/energetic forecasts"
  - Upsert into `daily_cosmos_pulse` keyed by today's date
- pg_cron job runs it daily at 23:00 UTC
- Small `<DailyPulseCard />` widget mounted on `HomePage` showing today's summary + link to source video
- This is the foundation for Phase 2's full Live Cosmos Pulse page next batch

## Phase 7 — Navigation + wiring

- Add 4 new routes: `/elements`, `/glyphs`, `/stone-faces`, `/community` (+ `/community/mod`)
- Add to `Navbar.tsx` nav links (it's already getting long — group them visually under collapsible categories: "Cosmos / Disclosure / Lore / Community")
- XP events for new pages (10 XP each first visit)
- Daily pulse widget on HomePage above the existing fold

---

## Files (new ~14, edited ~5)

**New:**
- `src/data/elements.ts`, `src/data/glyphs.ts`, `src/data/stone-markers.ts`
- `src/lib/element-reactions.ts`
- `src/pages/ElementsLabPage.tsx`, `src/pages/GlyphsArchivePage.tsx`, `src/pages/StoneFacesPage.tsx`, `src/pages/CommunityVaultPage.tsx`, `src/pages/CommunityModPage.tsx`
- `src/components/elements/PeriodicTable.tsx`, `src/components/elements/ElementMixer.tsx`
- `src/components/glyphs/GlyphDecoder.tsx`
- `src/components/community/TestimonySubmitForm.tsx`, `src/components/community/TestimonyCard.tsx`
- `src/components/cosmos/DailyPulseCard.tsx`
- `src/hooks/use-user-role.ts`
- `supabase/functions/glyph-decode/index.ts`
- `supabase/functions/daily-cosmos-pulse/index.ts`

**Edited:**
- `src/App.tsx` (5 new routes)
- `src/components/Navbar.tsx` (collapsible nav categories — getting too long)
- `src/pages/HomePage.tsx` (mount `<DailyPulseCard />`)
- `src/lib/xp-events.ts` (4 new event ids)
- `supabase/config.toml` (new function entries)

**One migration**: 4 tables + user_roles enum + has_role function + 2 storage buckets + RLS policies + pg_cron schedule for daily pulse

---

## Verification
- Click periodic table cells, run a few mixes (Hydrogen + Oxygen → water animation; Element 115 + anything heavy → "exotic matter")
- Open Glyph decoder, draw a symbol, get AI interpretation back
- Open `/stone-faces`, click Easter Island marker, see dossier
- Submit a testimony, switch to mod account (I'll seed you as admin), approve it, see it appear in public feed
- Check `/profile` after visiting all 4 new pages → +40 XP

## Out of scope (next batches, not this one)
- Live Cosmos Pulse full page + 3D solar system + Comet Vault + JWST + USGS feeds
- Local UFO Pulse map + crash retrieval map + Entity Encounters + Underground bases + CERN + Antarctica + Atlantis + Burchett tracker
- These are massive on their own — I'll tackle them in dedicated batches after you approve and we verify this slice
