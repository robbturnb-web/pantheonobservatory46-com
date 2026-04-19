

User wants 4 things bundled, then verify:
1. XP & walkthrough system (define earn/unlock, build first-visit tour)
2. Species Codex portraits (16 species, cosmic horror style — matches shadow gods)
3. Brand auth emails (custom templates for Pantheon Observatory)
4. Loose ends: SpeciesBadge wired into UAP/whistleblower cards, EchoversePage modal → /auth redirect
5. Verify end-to-end

Already have: `useEchoXp` hook (XP, ranks, page tracking), `XPBar` component, `echo_xp` table. So XP foundation exists. Need to expand triggers + unlocks + walkthrough + a profile/rank page.

Plan stays focused. Big batch — split into clear phases.

---

# Plan: Finish the loose ends + XP system + portraits + branded emails

## Phase 1 — Loose ends (quick wins, ~15 min)

**1a. Wire `<SpeciesBadge />` into existing pages**
- `UAPPage.tsx` cards → match `keyCases` IDs from `species.ts`, render badges per case (e.g. Roswell → Greys; Nimitz → Greys/Interdimensional; NJ drones → Synthetics)
- `WhistleblowerVaultPage.tsx` cards → match `keyWitnesses` IDs (Lazar → Greys; Schneider → Reptilians; Grusch → multi)
- Build a tiny helper `getSpeciesForCase(caseId)` / `getSpeciesForWitness(id)` in `src/data/species.ts`

**1b. EchoversePage auth modal → `/auth` redirect**
- Replace `AuthModal` calls with `navigate('/auth')`
- Keep the modal file for now (no deletion) but stop importing it

---

## Phase 2 — Species Codex portraits (16 AI portraits)

Generate cosmic-horror / esoteric portraits matching the shadow gods style. One image per species, saved to `src/assets/species/{id}.jpg`:

greys, reptilians, draconians, pleiadians, arcturians, sirians, andromedans, lyrans, mantids, anunnaki-species, tall-whites, synthetics, interdimensionals, mexico-bodies, nj-drones, jellyfish-uap

- Add `image` field to `Species` interface
- Update `SpeciesCodexPage.tsx` cards: portrait at top of each card, dark gradient overlay, name + classification badge floating over it
- Mobile: portrait crops to 16:9; desktop: 4:3

---

## Phase 3 — XP & Walkthrough system

### 3a. XP earning rules (centralized in `useEchoXp`)

| Action | XP | Cap |
|---|---|---|
| Visit new page | 10 | once per page |
| Open species dossier | 15 | once per species |
| Open UAP case | 10 | once per case |
| Open whistleblower file | 10 | once per witness |
| Open vault slot (the46) | 20 | once per slot |
| Watch frequencies video (click play) | 5 | once per video |
| Complete Origin quiz | 100 | once |
| Sign up | 50 | once |
| Daily return (24h gap) | 25 | once per day |

New tables needed:
- `echo_xp_events` — log of awarded events (user_id, event_type, event_id, xp, created_at, unique on user+type+id) → prevents double-grants
- Extend `echo_xp` with `last_daily_at timestamp`

### 3b. Ranks & unlocks

| Rank | XP | Unlocks |
|---|---|---|
| Initiate | 0 | Base access |
| Seeker | 100 | Vault slot 1 of 46 unlocked |
| Adept | 300 | Hidden lore on species dossiers (extra paragraph) |
| Mystic | 600 | Echo "Oracle" persona variant + 2 more vault slots |
| Oracle | 1000 | Shadow Pantheon "ritual" details unlocked + 5 more vault slots |
| Ascended | 2000 | Full vault (46/46), all hidden lore, gold rank glow |

Implementation:
- Add `hiddenLore?: string` to `Species` and `UAPCase` types — gated by `rank.minXp >= 300`
- Add `lockedReason` UI hint on locked content ("Reach Adept rank to unveil")

### 3c. Walkthrough (first-visit guided tour)

Tech: lightweight custom overlay (no library). 5-step tour:
1. "Welcome, Starseed" — hero of HomePage
2. "Track your discoveries" — point to XPBar (bottom right)
3. "Explore the pantheons" — point to Gods nav link
4. "The species are watching" — point to Species nav link
5. "Sign in to earn rank" — point to Sign In button

- Component: `src/components/Walkthrough.tsx` with framer-motion overlay + spotlight cutout
- Trigger: localStorage `pantheon_walkthrough_seen` = false on first visit to `/`
- Skip + Restart buttons; restart available from a profile menu later

### 3d. Profile/Rank page (`/profile`)
Simple page showing:
- Current rank + portrait halo
- XP progress bar
- Pages explored count
- Unlocks list (locked/unlocked indicators)
- Recent XP events feed

Nav link only visible when signed in.

---

## Phase 4 — Branded auth emails

Set up Lovable auth email templates with cosmic-horror/observatory branding:
- Background: white (required)
- Headers: deep purple (#8b5cf6) on dark accent bar
- Button: purple primary, rounded
- Logo: use the eye/observatory iconography from `Hero.tsx` (or generate a small mark)
- Tone: matches app voice — "Welcome, Starseed", "The Observatory awaits"

Templates customized: signup, recovery (password reset), magic-link, email-change, invite, reauthentication.

Requires: email domain setup dialog (will trigger automatically if not configured).

---

## Phase 5 — Verification checklist (manual, after build)

You'll be guided to test:
- /species filters + expand + deep link `#draconians`
- SpeciesBadge clicks from UAP and whistleblower cards
- /auth signup → email arrives branded → click verify → XP +50 awarded
- Walkthrough fires on first visit (clear localStorage to retest)
- Visit 3 new pages → XP +30, watch progress bar
- Reach Seeker (100 XP) → toast + first vault slot unlocks
- /profile renders rank + unlocks correctly

---

## Files touched (estimate)

**Created (~25):**
- `src/assets/species/*.jpg` (16 portraits)
- `src/components/Walkthrough.tsx`
- `src/components/RankUnlock.tsx` (locked content gate)
- `src/pages/ProfilePage.tsx`
- `src/lib/xp-events.ts` (event constants + helpers)
- 6 email template `.tsx` files
- `supabase/functions/auth-email-hook/`

**Edited (~10):**
- `src/data/species.ts` (image, hiddenLore fields, helpers)
- `src/data/uap-cases.ts` (hiddenLore optional)
- `src/hooks/use-echo-xp.ts` (event-based grants, daily, unlocks)
- `src/pages/SpeciesCodexPage.tsx`, `UAPPage.tsx`, `WhistleblowerVaultPage.tsx`, `EchoversePage.tsx`, `HomePage.tsx`, `App.tsx`, `Navbar.tsx`
- DB migration: `echo_xp_events` table + `last_daily_at` column

**Out of scope this batch:** Echo persona variants UI (just the unlock flag), full Origin quiz rebuild (already exists in OriginChamberPage), payment/premium gates.

