## Where we are

Three things are now on the table. None are started. Pick the order — I'd recommend the order below.

---

## Option A — Route-aware Audio Engine (the code you just sent)

What it is: a singleton audio player that crossfades between tracks, persists volume + index in localStorage, and swaps playlists when the route changes (cosmos / ancient / disclosure).

**Build:**
- `src/lib/audio/audio-engine.ts` — singleton with two `<Audio>` elements for crossfading, `setPlaylist`, `play/pause/next/prev`, `setVolume`, localStorage persistence. Same shape as your snippet, with three fixes:
  - Guard `localStorage` for SSR/private mode (try/catch on read AND write).
  - Replace the `setInterval` crossfade with `requestAnimationFrame` + a kill-flag so rapid `next()` clicks don't leak intervals.
  - Add `error` + `ended` listeners so a 404 track auto-skips instead of freezing the UI.
- `src/lib/audio/playlists.ts` — the 3 playlist constants you defined. Tracks point to `/audio/*.mp3` in `public/audio/`.
- `src/hooks/useAudioEngine.ts` — wraps the singleton, exposes `playing`, `volume`, `currentTrack`, and subscribes to engine state via a tiny event emitter (so multiple components stay in sync — your current version only updates the component that called play).
- `src/hooks/useRouteTrack.ts` — maps `useLocation().pathname` to a playlist key:
  - `/uap`, `/whistleblowers`, `/missing`, `/the-46`, `/aaro`, `/crash-retrieval`, `/underground` → `disclosure`
  - `/timeline`, `/gods`, `/shadow-pantheon`, `/pyramids`, `/atlantis`, `/glyphs`, `/stone-faces` → `ancient`
  - everything else → `cosmos`
- `src/components/AudioPlayer.tsx` — fixed bottom-right pill with prev / play-pause / next / volume slider / track label. Glassmorphic, matches the cosmic theme. Hidden on `/auth` and `/reset-password`.
- Mount inside `Layout.tsx`, below `XPBar`, so it appears on every app route.

**What I will NOT do here:**
- I won't add or upload actual audio files. The 6 paths (`/audio/cosmos1.mp3`, etc.) will be wired but the files need to be dropped into `public/audio/` by you (or you tell me to use a generator / royalty-free source and I'll handle it as a follow-up). The player will gracefully show "No track loaded" until files exist.
- No autoplay on first load — browsers block it. First click on the play button starts audio.

---

## Option B — Command Center page (the earlier snippet)

A dedicated `/command` route with the Alerts / AI Core / Live Signals grid you sent.

**Build:**
- `src/pages/CommandCenterPage.tsx` — your layout, but wired to real data:
  - **Active Alerts** — pulls from `src/data/pulse-updates.ts` (latest 3 entries flagged urgent).
  - **AI Core** button — links to `/echo`.
  - **Live Signals** — pulls from `src/data/uap-cases.ts` (3 most recent cases, status from case `evidenceLevel`).
- New nav entry "Command" in `Navbar.tsx`, far-right next to Profile.
- New route in `App.tsx`: `/command`.
- Reuses `glass-cosmic` cards + the new hub palette tokens — no new design primitives.

This is a 1-shot build, no backend changes.

---

## Option C — Portraits batch (originally queued from Batch 3 Part 2)

Generate ~25 stylized intel-file portraits for whistleblowers / the 46 / missing scientists, replace emoji `🧪 🎖️ 👤` with actual `<img>` tags. Slowest of the three (~25 image-gen calls) but the highest visual payoff.

---

## Recommended order

1. **Option A — Audio Engine.** It's the smallest, the code is mostly written, and it adds a constant-presence feature across the whole site. Ships in one pass.
2. **Option C — Portraits.** Long but offline-able — I generate while you do something else.
3. **Option B — Command Center.** Most design decisions involved (do alerts go realtime? does AI Core stay a link or open inline?), so it benefits from being last when the visual system is settled.

---

## Reply with one of:

- **"audio first"** — I ship Option A now, you queue audio files when ready.
- **"portraits"** — I start the 25-image generation pass.
- **"command center"** — I build Option B as a static-first page.
- **"all three, in order"** — I do A → C → B back-to-back in this turn (longer single response, but no more check-ins until done).

Or tell me a different order.
