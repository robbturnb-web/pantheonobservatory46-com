
User wants me to finish the remaining work from the previous batch. Based on what I tracked as incomplete:

1. Render species portraits in SpeciesCodexPage cards
2. Wire per-event XP triggers (species/uap/whistleblower/vault open)
3. EchoversePage: replace AuthModal with /auth redirect
4. Build /profile page
5. Hidden lore on remaining 14 species
6. Branded auth email templates

Keeping it tight — this is a continuation, not new scope.

---

# Plan: Finish the remaining work

## Phase 1 — Species Codex portraits + XP triggers

**1a. Render portraits in `SpeciesCodexPage.tsx`**
- Import `speciesImages` map
- Add a 4:3 portrait at the top of each card with dark gradient overlay
- Float name + classification badge over the bottom of the image

**1b. Wire XP `awardEvent` calls into expand handlers**
- `SpeciesCodexPage` → `trackSpeciesOpen(id)` on dossier expand
- `UAPPage` → `trackUapOpen(id)` on case expand
- `WhistleblowerVaultPage` → `trackWhistleblowerOpen(id)` on file expand
- `The46Page` (vault) → `trackVaultOpen(id)` on slot reveal

## Phase 2 — Loose ends

**2a. EchoversePage modal → `/auth` redirect**
- Replace `setShowAuth(true)` with `navigate('/auth')`
- Remove `AuthModal` import (keep file)

**2b. Sign-up XP grant (+50)**
- In `AuthPage` after successful signup, call `awardEvent('sign_up', userId, 50)`

## Phase 3 — Profile page (`/profile`)

New page showing:
- Current rank with colored halo + portrait
- XP progress bar to next rank
- 6 unlock tiles (locked/unlocked indicators with check/lock icons)
- Recent XP events feed (last 20 from `echo_xp_events`)
- Pages explored count

Add nav link in `Navbar.tsx` (only visible when signed in).

## Phase 4 — Hidden lore on remaining species

Add `hiddenLore` paragraph to the 14 species missing it:
reptilians, pleiadians, arcturians, sirians, andromedans, lyrans, mantids, anunnaki, tall-whites, synthetics, interdimensionals, mexico-bodies, nj-drones, jellyfish

Render gated by `<RankUnlock minXp={300} rankName="Adept">` inside each expanded dossier.

## Phase 5 — Branded auth email templates

Custom Pantheon Observatory templates for: signup confirmation, password recovery, magic link, email change, invite, reauthentication.

Style: white background (required), deep purple (#8b5cf6) accent header, observatory eye iconography, "Welcome, Starseed" tone. Will trigger the email domain setup dialog if not already configured.

---

## Files touched (~12 edits + 1 new page + 6 templates)

**Created:**
- `src/pages/ProfilePage.tsx`
- 6 email template files via the email scaffolding tool

**Edited:**
- `src/pages/SpeciesCodexPage.tsx` (portraits + XP)
- `src/pages/UAPPage.tsx` (XP on expand)
- `src/pages/WhistleblowerVaultPage.tsx` (XP on expand)
- `src/pages/The46Page.tsx` (XP on slot reveal)
- `src/pages/EchoversePage.tsx` (auth redirect)
- `src/pages/AuthPage.tsx` (signup XP grant)
- `src/data/species.ts` (14 hiddenLore additions)
- `src/components/Navbar.tsx` (Profile link)
- `src/App.tsx` (/profile route)

**Verification after build:**
- /species shows portraits + filters work + opening a dossier grants 15 XP once
- /uap and /whistleblowers open → 10 XP each (once per item)
- /profile renders rank, progress, unlocks, and event feed
- EchoversePage sign-in button routes to /auth
- Confirmation email arrives with Pantheon Observatory branding
