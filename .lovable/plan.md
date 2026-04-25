
# Batch 3 — The Visual & Navigation Overhaul

This is the work you originally asked for: get rid of the "everything is purple cosmosis on every page" feel, give speakers real faces, and make the homepage feel organized instead of one long scroll of cards.

Four parts. Each is independent — can ship together or one at a time.

---

## Part 1 — `BackgroundManager` (route-aware backdrops)

**Problem:** Every page wears the same starfield + purple nebula. Disclosure pages, god pages, and underground bases all feel identical.

**Build:**
- New file: `src/components/BackgroundManager.tsx`
- Reads `useLocation().pathname`, picks a config from a route map, renders a fixed full-screen layer at `z-index: -10` behind everything.
- Animates a 600ms crossfade between backgrounds when route changes (Framer Motion `AnimatePresence`).
- Each config controls: base gradient, accent tint, particle intensity (0–1), parallax speed, optional themed image/video layer.
- Mounted once inside `Layout.tsx`, **replacing** the global `<StarfieldCanvas />` so we don't double-stack canvases. Starfield becomes one of the available "modes" the manager can render.

**Route → mood map (initial pass — extends `src/lib/page-themes.ts` which already has 14 themes defined):**

```text
ROUTE                  MOOD                       ACCENT       BACKGROUND LAYER
──────────────────────────────────────────────────────────────────────────────────
/ (home)               cosmic-cathedral           gold+green   ship hero + dim starfield
/timeline              deep-time                  amber        slow-drift nebula, no stars
/uap                   declassified               red+amber    grain + redaction marks
/whistleblowers        intel-drop                 red          dark vignette + scanlines
/missing               somber-archive             desaturated  near-black, faint static
/the-46                vault                      gold         locked-vault metal sheen
/gods                  ancient-temple             gold+violet  warm gold particles
/shadow-pantheon       underworld                 deep-red     ember rise, dark
/species               specimen                   cyan         clinical grid lines
/galaxy                cosmic-void                violet       full starfield (current look)
/pyramids              desert-night               sand+gold    sand particles, low stars
/antarctica            ice-station                ice-blue     snow particles
/atlantis              submerged                  teal         caustic ripples
/cern                  collider                   cyan+magenta hex-grid HUD
/echoverse             social-warm                neon-green   soft starfield + bloom
/echo                  conversation               soft-violet  breathing gradient
default                cosmic                     purple       current starfield
```

Most of these moods already exist as `pageThemes` in `src/lib/page-themes.ts` — `BackgroundManager` will read from there as the source of truth, not duplicate the palette.

---

## Part 2 — Real portraits for whistleblowers, witnesses, and "the 46"

**Problem:** Bob Lazar is currently a `🧪` emoji. David Grusch is `🎖️`. You explicitly asked for faces.

**Build:**
- New folder: `src/assets/portraits/whistleblowers/` — one image per whistleblower in `src/data/whistleblowers.ts` (Lazar, Grusch, Elizondo, Mellon, Fravor, Burchett, Stratton, Coulthart). 8 images.
- New folder: `src/assets/portraits/the-46/` — for the disclosed slots in `src/data/the-46.ts` that name a real person.
- New folder: `src/assets/portraits/missing/` — the missing-scientists list in `src/data/missing-scientists.ts`.
- Generate images via Lovable's image-generation tool — **stylized, not photographic**. Brief: high-contrast painted portrait, 3/4 angle, single key light from above (intel-file aesthetic), neutral grey-black background with subtle accent glow per person's accentColor. This avoids deepfake/likeness issues while still giving "a face by the name" — much better than emoji.
- Update each data file: change `photo: '🧪'` → `photo: '/src/assets/portraits/whistleblowers/bob-lazar.jpg'` (import via `?url`).
- Update `WhistleblowerVaultPage.tsx`, `VaultSlotCard.tsx`, and `MissingPage.tsx` to render `<img>` instead of emoji-as-text. Add a graceful fallback to the existing emoji + initials when an image is missing.
- Add a new optional field `portraitCredit?: string` so we can attribute later if we swap to real licensed photos.

This is a one-time generation pass — once they exist they stay.

---

## Part 3 — Homepage reorganization (the "everything in one thing" problem)

**Current state:** Homepage scrolls through hero → daily pulse → stats → 46 banner → missing teaser → 14 section cards in one flat grid → video strip → CTA. All cards are equally weighted and visually identical, which is why it feels overwhelming.

**New structure:** Group the 14 sections into **4 themed hubs**, each with its own short header strip and 3–4 cards. Hub headers act as visual chapter breaks.

```text
─────────────────────────────────────────────────────────────────
 HERO (unchanged — ship + wordmark)
─────────────────────────────────────────────────────────────────
 LIVE STRIP (compact row)
   → Daily Cosmos Pulse · The 46 counter · Missing teaser
   (replaces the 3 separate full-width banner sections —
    same info, 1 row of glass cards instead of 3 stacked)
─────────────────────────────────────────────────────────────────
 HUB 1 · DISCLOSURE FILES                            [red accent]
   UAP Cases · Whistleblowers · Crash Retrieval · AARO Watch
─────────────────────────────────────────────────────────────────
 HUB 2 · ANCIENT INTELLIGENCE                       [gold accent]
   Cosmic Timeline · Gods · Shadow Pantheon · Pyramids · Glyphs
─────────────────────────────────────────────────────────────────
 HUB 3 · COSMIC OBSERVATORY                       [violet accent]
   Galaxy Explorer · Telescopes · Species Codex · Federation
─────────────────────────────────────────────────────────────────
 HUB 4 · INNER WORK                                [green accent]
   Consciousness · Frequencies · Origin Chamber · Echo AI · Echoverse
─────────────────────────────────────────────────────────────────
 STATS STRIP (kept, moved to bottom as a "by the numbers")
─────────────────────────────────────────────────────────────────
 VIDEO STRIP + FINAL CTA
─────────────────────────────────────────────────────────────────
```

Each hub gets:
- A 1-line section header in its accent color
- 3–4 cards in a tighter grid (`grid-cols-2 lg:grid-cols-4`)
- Cards inherit the hub's accent for hover glow, instead of all 14 having their own random color
- Background: subtle gradient band in the hub's accent (very low opacity) so the eye gets a visual cue when crossing into a new section

This is **layout/grouping work in `HomePage.tsx` only** — no new pages, no removed features.

---

## Part 4 — Color palette refresh (move beyond all-purple)

You said: red+black, yellow+gold, some purple still, some greens. Currently everything is purple-dominant.

**New accent system** (tokens added to `src/index.css` + `tailwind.config.ts`):

```text
--accent-disclosure   #dc2626   crimson red    (whistleblower / UAP / vault)
--accent-ancient      #d4a574   warm gold      (timeline / gods / pyramids)
--accent-cosmic       #8b5cf6   violet         (galaxy / starfield — kept)
--accent-life         #10b981   emerald        (consciousness / inner work / echo)
--accent-signal       #22d3ee   cyan           (cern / species / observatory)
--accent-warning      #f59e0b   amber          (47/missing/redacted)
```

Existing `--primary` (purple) stays as the brand anchor — wordmark, navbar, default CTAs. The new accents are used **per hub, per page theme, per card hover** so the site reads as multi-colored without abandoning the cosmic identity.

I'll do a sweep of the 14 section cards on the homepage and the navbar pills to use these tokens instead of the inline hex colors hardcoded in `HomePage.tsx` line 16-30.

---

## What I'm explicitly NOT doing this batch

- **No live video backgrounds yet.** You mentioned 4K screensaver-style live backgrounds — those are 5-20MB files that hurt mobile performance. I want to land the image-based BackgroundManager first; if you love the system, we add 1-2 hero pages with looping video in a follow-up batch. Doing both at once = blame-a-bug nightmare.
- **No new content / data.** All 14 sections, all whistleblowers, all 46 stay. This is purely visual reorg + portraits.
- **No nav changes.** Navbar order stays the same. Only the homepage card grid is regrouped.

---

## Execution order

1. Part 4 (palette tokens) — 5 min, zero risk, unblocks 1 + 3
2. Part 1 (BackgroundManager) — biggest visual payoff
3. Part 3 (homepage reorg) — uses the new palette
4. Part 2 (portraits) — last, because it's the slowest (image generation)

I'll ship Parts 1–3 in one pass, then portraits as a follow-up so you can review the layout before we commit to a face for every name.

---

## Technical notes (for the dev side)

- `BackgroundManager` reads `pageThemes` from `src/lib/page-themes.ts` so the existing 14 themed pages don't get a different look from the manager and from their `<DossierPageLayout>` — single source of truth.
- The current `<StarfieldCanvas>` in `Layout.tsx` is removed; it becomes one of the renderable modes inside `BackgroundManager` (default for `/`, `/galaxy`, `/echoverse`, `/echo`).
- Cinematic effects already in `Layout.tsx` (`CometTrails`, `SpaceshipFlyby`, `CosmicCursorTrail`, `cinematic-vignette`) stay — they layer on top of whatever background mode is active.
- Portrait images generated via the image-generation tool, saved to `src/assets/portraits/...`, imported with Vite `?url` so they're hashed and cached.
- Homepage hub cards reuse the existing `glass-cosmic` class — no new card primitive needed.
- All work is additive: no migration, no routing change, no auth touched. Backend from Batches 1-2 stays locked down.

Reply **go** to ship Parts 1, 3, and 4 together (background system + homepage reorg + palette). Portraits follow in Part 2 once you've seen the new layout.
