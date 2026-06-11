
# Command Center + Live Intelligence Hub Upgrade

The existing `TempleObservatoryPage` (1100 lines) already does most of the cosmic hero / live work. Rather than rewriting it, I'll add new polished sections **on top of** what's there and upgrade the `/live-feeds` page into the new "Live Intelligence Hub". All current content stays.

## What gets built

### 1. New reusable primitives (`src/components/command/`)
- `CommandHeroBar.tsx` — animated status bar strip ("Signal Online · Archive Active · Live Feed Monitoring · Last Updated"). Uses existing `signal-online` token + live-data hooks.
- `CommandCard.tsx` — glass card with holographic border + corner glow, icon, title, description, Explore button. Used everywhere.
- `LivePanel.tsx` — panel with status badge, body slot, source link, "Refresh / Check Source" button. Shows "Live API connection pending" / "Manual update mode" when no data hook is wired.
- `ClaimBadge.tsx` — FACT / THEORY / MYTH / SPECULATION badge (4 distinct styles, semantic tokens only). Replaces ad-hoc per-section variants.

### 2. New homepage sections (appended via `HomeLowerSections.tsx`, no deletions)
- **Command Dashboard** — 8-card grid (Gods, Starseed, Antarctica, Atlantis, UAP, Pyramids, Bloodline/RH → routes to `/species`, Live Hub). Routes to existing pages. Mobile: 1 col, sm: 2, lg: 4.
- **Featured Mystery** — "The Lost Knowledge of the Pyramids" card with claim badges + Investigate (→ `/pyramids`) + Save (toast-only for now).
- **Begin Your Pantheon Path** — 6 rank chips (Seeker → Ascendant) + XP action list. Links to `/profile`.
- **Source Integrity** — 4 trust cards reusing `ClaimBadge` styles. Links to `/sources`.

### 3. Live Intelligence Hub (`/live-feeds` upgrade)
Replace current `LiveFeedsPage` body with a 7-panel dashboard:
Solar Activity · Space Weather (Kp) · ISS/Orbital · UAP Watch · Earthquake · Interstellar Objects · Mystery Signal of the Week.
Wires existing `useKp`, `useFlare`, `useEarthquakes` hooks; panels without a hook show the honest "Live API connection pending" placeholder (never fake data).

### 4. Hero status bar
Inject `CommandHeroBar` near top of the existing hero (no removal of current hero content). Title/subtitle copy stays; we already have "Enter Archive" CTA — add the secondary "View Live Intelligence" → `/live-feeds`.

### 5. Footer upgrade
Extend `PantheonFooter.tsx` with the mission statement + disclaimer block + pantheonobservatory.com link. Keep existing nav links.

## What I will NOT touch
- The Temple Observatory hero, KP gauge, compass, SDO imagery, transmissions ticker, sidebar — all preserved.
- Existing routes, data files, edge functions.
- Color/animation tokens (use `realm-*`, `signal-online`, `primary`, `accent` per project memory — no hardcoded hex in new components).

## Mobile-first
All grids `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, tap targets ≥ 44px, panels stack vertically, no horizontal scroll, animations CSS-only (no heavy framer payloads on mobile).

## Files created
- `src/components/command/CommandHeroBar.tsx`
- `src/components/command/CommandCard.tsx`
- `src/components/command/LivePanel.tsx`
- `src/components/command/ClaimBadge.tsx`
- `src/components/command/CommandDashboard.tsx`
- `src/components/command/FeaturedMystery.tsx`
- `src/components/command/PantheonPathTeaser.tsx`
- `src/components/command/SourceIntegrity.tsx`

## Files edited
- `src/components/home/HomeLowerSections.tsx` — append new sections
- `src/pages/home/TempleObservatoryPage.tsx` — inject `CommandHeroBar` + secondary CTA only
- `src/pages/LiveFeedsPage.tsx` — rebuild as Live Intelligence Hub
- `src/components/PantheonFooter.tsx` — mission + disclaimer block

Estimated ~700 lines new code across 12 files, no deletions.
