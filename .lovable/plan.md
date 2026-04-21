

# Plan: Neon stat colors + Real "46" Hegseth list + Fix videos

## 1. Neon-green + yellow stat numbers on HomePage

Current: stat counters (UAP Cases, Ancient Gods, Whistleblowers, Pyramids, Telescopes) are plain white. You want the OBSERVATORY purple/neon-green look.

**Edit `src/pages/HomePage.tsx`:**
- Stat number: change `text-foreground` → `text-accent-neon` with `neon-glow` class (matches the "VATORY" text)
- Stat label: split-color treatment — first word in `text-primary` (purple), second word in `text-yellow-400` (yellow accent) so "UAP Cases", "Ancient Gods", "Whistleblowers", "Pyramids", "Telescopes" pop on the dark starfield
- Add subtle yellow glow on the icon ring

Result: Numbers glow neon-green, labels are purple+yellow. Same vibe as the "OBSER**VATORY**" hero treatment.

## 2. Replace the 4-slot placeholder vault with the real Hegseth letter list

Your screenshots are the **Crockett/Mace congressional letter to Pete Hegseth (March 31, 2026)** demanding 46 specific UAP video files by **April 14, 2026**. That's the actual "46" — not the publicly released Pentagon clips currently shown.

**Rewrite `src/data/the-46.ts`:**
- Seed all 46 slots with the **real codenames + dates** from the letter (Hackney 6 / Persian Gulf, HH-11 UAPs, Spherical UAP pulsing over water, Voodoo 4X Cranberry, NGA UAP, Warlock 4X, AFSOC Kabul, USCG C-144 Tic Tac IR, F-18 FLIR UAP, Eglin AFB IIR, Lake H, Kazakhstan IIR 1777, MQ-9 East China Sea, etc.)
- All 46 start with `status: 'pending-disclosure'` (new third status) — meaning Congress has demanded them but they haven't been released yet
- Each slot shows: the official codename, the date of the encounter, the platform (MQ-9, F-18, USCG C-144, etc.), the geographic area
- Add `requestedBy: "Rep. Anna Paulina Luna / Rep. Jasmine Crockett — H. Oversight Committee Task Force on Declassification"` and `dueBy: "2026-04-14"`
- Keep the 4 currently-released DoD videos (Tic Tac, Gimbal, Go Fast, Aguadilla) in a **separate "Already Public" section** at the bottom of `/the-46` page so the ones you mean (the 46 Congress is asking for) stand alone

**Update `src/components/the46/VaultSlotCard.tsx` + `VaultSlotModal.tsx`:**
- Add visual treatment for new `pending-disclosure` status: amber lock icon + countdown to April 14
- Update the locked-state copy to match the real story: "Demanded by Congress · Awaiting DoD response"

**Update `/the-46` page header:**
- Lead with the actual congressional letter: "On March 31, 2026, the House Oversight Committee demanded 46 specific UAP videos from Secretary Hegseth by April 14, 2026."
- Embed image of the letter (I'll save your screenshots into `src/assets/the-46/` as the source proof)

**Update the homepage banner counter:**
- Currently shows "X of 46 unlocked" — change to "0 of 46 disclosed · Demand expired April 14, 2026" with a live "days overdue" counter

## 3. Fix the broken videos

Two separate issues, both data-side, not code:

**A. Most TikTok IDs are fake placeholders** (`7384712345678901234`, `7384712345678901235`) — those return 404. The current `VideoEmbed.tsx` already handles TikTok correctly (opens in new tab since TikTok blocks iframes), but there's no real video to open.

**B. Some YouTube IDs may be embedding-disabled or stale.** The `VideoEmbed.tsx` is already correct (lite-YT pattern with thumbnail → iframe on click + always-visible "Open on YouTube" fallback). The fix is replacing the IDs.

**Action:**
- Replace all placeholder TikTok IDs across `src/data/frequencies.ts` with **real recent video IDs** from each creator's actual TikTok page (I'll fetch their channels and pull the latest 2–3 video IDs each)
- Replace any stale YouTube IDs with verified current uploads from each creator's channel
- For Stefan Burns specifically: pull his 3 most recent videos (the daily-cosmos-pulse function already targets his RSS feed, so I'll align the seed videos with whatever his channel has live now)

**No code change needed in `VideoEmbed.tsx`** — it's already production-quality. The fix is data only.

## 4. Mobile vs desktop note (answering your question)

There is **no functional difference** between editing on mobile vs desktop for what we're doing. Same AI, same memory, same code. Mobile just has a smaller preview panel. You can run everything from your phone. Nothing about visuals or graphics needs the desktop. Use whatever's in your hand.

---

## Files

**Edited:**
- `src/pages/HomePage.tsx` — neon-green stats + yellow labels + updated 46 banner
- `src/data/the-46.ts` — 46 real Hegseth-letter codenames, new `pending-disclosure` status, separate "already public" section
- `src/data/frequencies.ts` — real TikTok + YouTube IDs across all creators
- `src/components/the46/VaultSlotCard.tsx` — render `pending-disclosure` state
- `src/components/the46/VaultSlotModal.tsx` — render `pending-disclosure` modal copy
- `src/pages/The46Page.tsx` — new header explaining the real congressional letter + demand expired counter

**New:**
- `src/assets/the-46/hegseth-letter-page-1.jpg` through `page-4.jpg` (your 4 screenshots as proof)

**No backend changes. No migrations. Pure frontend + data.**

## Verification
- Open `/` on mobile → stat numbers glow neon-green, labels purple+yellow
- Scroll to The 46 banner → shows "0/46 disclosed · X days overdue"
- Open `/the-46` → see all 46 codenames from the letter, the 4 already-public videos in their own section below, embedded letter screenshots at top
- Open `/frequencies` → click 3 different videos → all play (YouTube via thumbnail-then-iframe, TikTok opens in new tab to a real video)

