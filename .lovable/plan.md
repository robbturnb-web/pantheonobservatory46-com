

# Plan: Tab-by-Tab Enhancement — Desktop-First Visuals + Credible Video Layer

A structured, multi-batch upgrade. Each tab gets richer information, sharper desktop visuals, and curated YouTube videos (high-view, credible channels only — History Channel, BBC, PBS, National Geographic, Joe Rogan, NewsNation, Crash Course, Religion for Breakfast, etc.).

We'll do **one tab per batch** so each gets full attention and you can review before we move on.

---

## Foundation work (Batch 0 — quick, before tab batches)

Two tiny additions that every tab will reuse:

1. **Extend the `God` / `Species` / `ShadowGod` / `UAPCase` / `Whistleblower` / `Pyramid` types** with an optional `videos: { id: string; title: string; channel: string }[]` field — fully optional so existing data still works.
2. **Reuse the existing `<VideoEmbed />`** (lite-thumbnail → click-to-play pattern, already battle-tested) inside each dossier modal as a new "Watch" tab.

No new dependencies. No layout shift on load.

---

## Tab batches (proposed order — confirm or reorder)

### Batch 1 — **Gods & Archetypes** (start here)
- **Add a "Watch" tab** to the `GodDossierModal` showing 1-3 curated YouTube videos per god (origin story, mythology breakdown, or documentary clip).
- **Curated sources only**: Religion for Breakfast, Crash Course Mythology, Overly Sarcastic Productions (Mythology series), History Channel, PBS, Mythology & Fiction Explained — all high-view, well-reviewed channels.
- **Desktop visual upgrade**: hover on a god card now reveals a soft atmospheric glow matching `god.atmosphericBg`; modal gets a subtle parallax layer behind the portrait.
- **Curate ~3 videos for each of the 18 gods** (~54 video IDs, all verified live before commit).

### Batch 2 — **Species Codex**
- Add **Watch tab** to species dossiers (Greys, Reptilians, Pleiadians, Mantis, Tall Whites, NJ drones, Mexico bodies, etc.).
- Curated sources: Joe Rogan (Bob Lazar, David Grusch, Jacques Vallée segments), NewsNation (Coulthart), History Channel "Ancient Aliens" (clearly tagged as speculative), Why Files episodes per species.
- **Desktop visual**: holographic species card frame on hover, scan-line overlay reading "SPECIMEN //  CLASS //  ORIGIN".

### Batch 3 — **Shadow Pantheon**
- Watch tab inside each `ShadowCodexModal` — occult/comparative-religion lectures (Religion for Breakfast on Lilith, ESOTERICA on Lucifer/Set, Crecganford on dark deities).
- **Desktop visual**: deepen the existing holographic atmosphere — add a "REDACTED // RESTRICTED" header band only visible at ≥lg breakpoints, animated red pulse on the corner of each card.

### Batch 4 — **UAP Files**
- Add **Watch tab** to each of the 6 UAP cases (Roswell, Phoenix Lights, Tic-Tac, Rendlesham, Travis Walton, Aguadilla).
- Sources: NewsNation Coulthart segments, original Navy Tic-Tac footage, congressional hearing clips, Joe Rogan #1315 (Lazar), Lex Fridman (Avi Loeb).
- **Desktop visual**: each case gets a "DECLASSIFIED" stamp watermark and a parallax document-stack background behind its dossier.

### Batch 5 — **Whistleblowers**
- Watch tab per whistleblower (Grusch, Elizondo, Fravor, Mellon, Bushman, Lazar, etc.) — pin their best on-camera testimony from credible outlets only (Congressional C-SPAN, NewsNation, 60 Minutes, Joe Rogan).
- **Desktop visual**: dossier header gets a "REC ●" blinking indicator and a typewriter-style classification banner.

### Batch 6 — **Pyramid Explorer**
- Add a **"Documentaries" panel** to each pyramid info card (Joe Rogan / Graham Hancock segments, Ancient Architects, UnchartedX, History Channel pyramid specials).
- **Desktop visual**: the 3D scene gets a wider field of view and a HUD-style coordinate readout in the top-left at lg+ breakpoints.

### Batch 7 — **Timeline**
- Add **"Watch this era" buttons** at major timeline nodes (Sumerian tablets, Vimanas, Roswell era, Tic-Tac era, Grusch testimony) linking to a single curated video each.
- **Desktop visual**: the timeline rail gets parallax depth — events further from the viewport blur slightly.

### Batch 8 — **Consciousness Lab, Telescopes, Galaxy, Earth Pulse, Echoverse, Origin Chamber**
- Lighter pass each: 1-2 curated videos per major section, plus desktop-only visual touches (constellation overlays on Telescope page, Voyager-feed style HUD on Galaxy at lg+, ambient frequency waveform on Earth Pulse at lg+).

---

## Desktop-first principles applied across every batch

- **All new visual flourishes gated behind `lg:` breakpoint** so phones stay fast (you mentioned the heavier graphics were too much for mobile).
- **Hover-state polish** (glow, parallax, scanlines) — invisible on touch devices, meaningful on desktop.
- **Wider 7xl/6xl containers** where currently capped at 5xl to fill big monitors.
- **No new heavy 3D scenes** — desktop polish through CSS, SVG, and reused canvases only.

---

## Video curation rules (applied to every tab)

- **Minimum 100K views** OR from a verified credible channel (History, PBS, BBC, Smithsonian, NewsNation, Joe Rogan, Lex Fridman, Religion for Breakfast, ESOTERICA, Crash Course).
- **No clickbait, no UFO TikTok reuploads, no flat-earth/conspiracy-grift channels.**
- **Verify each video ID is live** via YouTube oEmbed before commit (same process used for `frequencies.ts`).
- Videos shown in lite-embed mode (thumbnail → click to play), so no autoplay tax on page load.

---

## Files touched per batch (typical)

- `src/types/index.ts` — add optional `videos` field (Batch 0 only)
- `src/data/<topic>.ts` — append `videos: [...]` to each entry
- `src/components/<topic>/<X>Modal.tsx` — add Watch tab
- `src/pages/<X>Page.tsx` — small desktop-only visual additions

No backend, no migrations, no new dependencies.

---

## What I need from you to start

Pick batch order (or accept the proposed order: **Gods first**), and I'll execute one batch per turn. Each batch ends with a verification list so you can confirm before moving on.

