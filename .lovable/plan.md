
User wants several things bundled. Let me parse:

1. **Verify live signup** — they're asking me to test it (browser tool ok per instructions)
2. **Build first-visit walkthrough** — Walkthrough.tsx exists already but needs to be mounted/triggered
3. **Add Oracle-tier Shadow Pantheon lore** — gated at 1000 XP
4. **What's the app missing?** — open question, I'll surface gaps
5. **Color scheme for ratings** — teal, neon green, sky blue. "No wordings, no lettering" — they want color-only badges (the EvidenceBadge currently shows text). They want it to work on the cosmic background.
6. **Fix YouTube videos** — VideoEmbed.tsx exists with lite-yt pattern; need to verify the actual video IDs in frequencies.ts are real (the comment in VideoEmbed.tsx already flags placeholder IDs as a data problem)

Let me check existing state quickly to scope properly.

Re: "no wordings, no lettering for ratings" — they want EvidenceBadge to be color-only dots/pills, not text labels. That's a clear style call.

Re: walkthrough — Walkthrough.tsx exists but I need to verify it's mounted in Layout/HomePage.

Re: videos — need to check frequencies.ts video IDs.

Plan stays focused. I'll present and let them approve.

---

# Plan: Verify signup + walkthrough mount + Oracle lore + color-only ratings + fix videos

## Phase 1 — Verify live signup flow (browser test)

Use the browser to:
1. Navigate to `/auth`, sign up with a fresh test email
2. Check that the signup completes and a verification email is queued
3. After confirming (manual step you'll need to do in your inbox), reload `/profile` and confirm +50 XP / Seeker progress

I'll report what I see at each step. If the email fails to arrive, I'll check the queue logs and report back without guessing fixes.

## Phase 2 — Mount the first-visit walkthrough

`Walkthrough.tsx` exists but isn't mounted anywhere. Add it to `HomePage.tsx` so the 5-step tour auto-fires once for new visitors (localStorage-gated, already wired in the component).

## Phase 3 — Oracle-tier Shadow Pantheon lore (1000 XP gate)

Add a `ritualLore` field to each of the 10 shadow gods in `src/data/shadow-gods.ts`. Render gated by `<RankUnlock minXp={1000} rankName="Oracle">` inside each dossier on `ShadowPantheonPage.tsx` — a "Ritual Details" panel revealing how each god was historically invoked (Moloch's bronze furnace, Lilith's mirror summoning, Baphomet's inverted pentagram, etc.).

## Phase 4 — Color-only rating badges

Redesign `EvidenceBadge.tsx`:
- Remove the text labels ("Documented", "Credible", etc.)
- Replace with a small glowing dot + ring pill (no letters)
- New palette tuned for the dark cosmic background:
  - DOCUMENTED → neon green (#39ff14)
  - CREDIBLE → sky blue (#38bdf8)
  - SPECULATIVE → teal (#2dd4bf)
  - UNVERIFIED → muted purple/grey
- Add tooltip on hover showing the grade name (so accessibility isn't lost)
- Update `index.css` `.grade-*` classes accordingly

## Phase 5 — Fix YouTube videos

The `VideoEmbed.tsx` lite-yt pattern is solid. The real issue is video IDs. I'll:
1. Audit `src/data/frequencies.ts` and any other data files with `videos: []` arrays
2. Replace placeholder IDs with real, embeddable YouTube IDs for the relevant frequency/topic (432Hz, 528Hz, Schumann resonance, etc.) — picking videos that allow embedding
3. For TikTok: keep the "open in new tab" fallback (TikTok blocks iframe embeds without their script — this is a TikTok restriction, not fixable client-side)

## Phase 6 — Quick "what's missing" gap report

After the build, I'll surface a short list of meaningful gaps I noticed (e.g. no search across codex, no bookmarks, no daily lore drop, profile lacks avatar, no share buttons on cases, no global "explored %" counter). You decide what's next — no scope creep this batch.

---

## Files touched

**Edited (~6):**
- `src/components/EvidenceBadge.tsx` (color-only redesign)
- `src/index.css` (grade-* classes → neon/teal/sky)
- `src/pages/HomePage.tsx` (mount Walkthrough)
- `src/pages/ShadowPantheonPage.tsx` (render ritualLore with RankUnlock)
- `src/data/shadow-gods.ts` (add ritualLore to 10 gods)
- `src/data/frequencies.ts` (replace placeholder video IDs)

**Verification:**
- Browser test of signup flow on live preview
- Manual: check /shadow at 1000+ XP, verify ritual panels unlock
- Manual: refresh / with cleared localStorage to retrigger walkthrough
- Manual: open /frequencies and play 2-3 videos to confirm they load
