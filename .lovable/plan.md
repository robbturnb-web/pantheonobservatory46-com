# Cosmos/Disclosure Nav Split + Missing Badge Fix

Two tightly scoped visual fixes. No backend, no new pages.

## Part 1 — Split "Cosmos & Disclosure" mega-menu

File: `src/components/Navbar.tsx`

Today one purple dropdown holds 16 mixed links. Split into two realm-correct categories so the navbar stops feeling like a wall of violet.

**New `Cosmos` category** — cyan `#22D3EE` (realm-cosmos token)
- JWST · James Webb (keep ★)
- Telescope Observatory
- Galaxy Explorer
- Earth Pulse (Cosmos Pulse)
- Signals
- Rubik's Cube

**New `Disclosure` category** — emerald `#10b981` (realm-disclosure token)
- UAP Catalog
- AARO Watch
- Crash Retrieval
- Black Programs
- Disclosure Timeline
- Whistleblower Vault
- Jeremy Corbell
- Brazil UAP Dossier
- Missing Scientists
- Orb Report

Other two categories (Ancient Mysteries gold, Entity Encounters red, Federation & Forge cyan) stay as-is. Note: Federation currently uses cyan too — keep it; the eye distinguishes by label + icon, and Forge content is functionally different from Cosmos content.

Icons: Cosmos → `Telescope` (lucide), Disclosure → `FileSearch` or keep `Satellite`. Pick whichever reads cleaner at 14px.

No behavior changes — same hover mega-menu, same mobile accordion, same animation. Only the `categories` array changes.

## Part 2 — Fix invisible confidence badges on `/missing`

File: `src/pages/MissingPage.tsx` (lines ~47-55)

Current `confidenceConfig` uses light-mode pastels (`#ecfccb`, `#dbeafe`, `#fef3c7`, `#fae8ff`) with dark text on a dark page → effectively invisible.

Swap to dark-theme treatment using realm tokens:

```
VERIFIED            → emerald   (realm-disclosure) #10b981
REPORTED            → cyan      (realm-cosmos)     #22D3EE
ALLEGED             → gold      (realm-gods)       #D6B35A
UNDER_INVESTIGATION → indigo    (realm-consciousness) #4F46E5
```

Pattern per badge: transparent tinted bg (`color + '15'`), border (`color + '55'`), text in full color, subtle glow on hover. Matches the StatusPill treatment already in the same file.

## Out of scope
- No nav structural rework beyond the split (no search, no command palette)
- No content edits to `/missing` data
- No changes to Ancient/Entity/Forge categories
- No realm-color audit of individual disclosure pages (separate pass)

## Files touched
- `src/components/Navbar.tsx` — replace single `cosmos` category with `cosmos` + `disclosure`
- `src/pages/MissingPage.tsx` — rewrite `confidenceConfig` color values
