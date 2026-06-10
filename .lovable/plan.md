
# Pantheon Frequency 46 — Stabilization Pass

This is a big multi-week scope. To deliver real quality (not a surface sweep), I'll execute it in clearly-bounded phases, one phase per turn, and report back between phases so you can steer. Doing all 8 phases in a single pass would mean shallow fixes everywhere and likely regressions across ~150 components — exactly what we want to avoid before GitHub + launch.

## Execution Order

### Phase 1 — Full Audit (this pass, no code changes)
Deliverables, written to `/mnt/documents/pantheon-audit.md`:
- Route inventory vs `PRIMARY_NAV` / `App.tsx` (broken / missing / orphan routes)
- Nav + sidebar + footer link check
- YouTube inventory — flag every `__REPLACE_ME__` and unverified videoId
- Live feed inventory (edge functions + `live-data.ts`) — real vs simulated, source, cadence
- Placeholder/fake data scan (lorem, TODO, mock, "coming soon")
- Console errors + network failures from current preview
- Mobile audit at 384px (current viewport) + tablet + desktop snapshots of top 10 pages
- Performance signals (LCP image, bundle hotspots)
- Accessibility quick-pass (contrast tokens, icon-only buttons, single `<main>`)

### Phase 2 — Critical Fixes
Routing, broken buttons/links, dead videos, console errors, mobile overflow. Each fix tied to an audit line item. No redesigns.

### Phase 3 — Live Data Truth Layer
- Standardize every live card to show: source name, source URL, last-updated, status badge (Live / Delayed / Offline / Placeholder), error state
- Replace simulated feeds where a real public endpoint exists (NASA, NOAA SWPC, USGS, ESA, ISS)
- Anything still simulated gets an explicit "Demo data" pill — no exceptions

### Phase 4 — Link & Video Health
- Extend `sourceHealthService.ts` with a real backend checker (edge function cron: HEAD checks + YouTube Data API `videos.list` for embeddable)
- New `source_health` table (status, last_checked, http_status, kind)
- Admin status panel reading from it

### Phase 5 — Mobile Readiness
Systematic pass at 360 / 390 / 414 / 768 / 1024 / 1440. Fix overflow, tap targets ≥44px, sticky nav, modal sizing, image scaling. No horizontal scroll anywhere.

### Phase 6 — Command Center
New `/command-center` (admin-gated via `has_role('admin')`): site health, link health, video health, live feed status, API status, recent errors, mobile/perf scores, last audit timestamp. Built on Phase 4's tables.

### Phase 7 — XP & Profile Foundation
Extend existing `echo_xp` schema with XP categories (knowledge / discovery / research), streaks, badge definitions table, user_badges table. Seed the 10 badges you listed. Upgrade ProfilePage to feel rewarding.

### Phase 8 — Final Report
Honest written report at `/mnt/documents/pantheon-launch-report.md`: fixed / outstanding / real vs placeholder data / broken links + videos / ready features / next dev step.

## What I need from you to start

Two quick confirmations:

1. **Phase 1 first, alone?** I'll produce the audit report this turn with zero code changes, then you greenlight Phase 2. (Recommended — prevents wasted edits.)
2. **Admin identity** for Phase 6: who is admin? I can either (a) seed your current logged-in user into `user_roles` as `admin`, or (b) you tell me an email to seed.

If you'd rather I just charge through all 8 phases without checkpoints, say "no checkpoints, ship it" and I'll batch them — but expect rougher results and a much longer single turn.
