# Pantheon Frequency 46 — Production Foundation Upgrade

This plan turns the current Vite + React 18 + TypeScript + Tailwind + Supabase project into a clean, scalable, GitHub-ready foundation. It preserves the existing cosmic visual identity, all current routes, and the Lovable Cloud (Supabase) backend. No framework migration (no Next.js, no Expo) — those would destroy the current app. Mobile-app conversion is handled via Capacitor later, per project memory.

---

## Detected stack (confirmed before planning)

- React 18 + Vite 5 + TypeScript 5 + Tailwind 3 + shadcn/ui
- React Router v6, TanStack Query, Framer Motion, Three.js
- Supabase (Lovable Cloud): auth, RLS, edge functions, XP system already exists (`echo_xp`, `award_xp`, ranks Initiate → Ascended)
- Existing modules already in place: `src/lib/source-tier.ts`, `src/components/SourceLabel.tsx`, `src/lib/live-data.ts`, `src/hooks/use-live-data.ts`, `src/components/live/LiveDataFooter.tsx`, `src/hooks/use-echo-xp.ts`, `src/lib/xp-events.ts`

Implication: a lot of what's requested **already exists**. The plan extends and formalizes it rather than rebuilding it. I will NOT rename the XP ranks (Initiate/Seeker/Adept/Mystic/Oracle/Ascended) to Observer→Legendary Witness because they're persisted in the database and referenced across the app — instead I'll add the requested labels as a **display-only Mission Tier** layer on top.

---

## Scope (what changes)

### 1. Folder structure — light reorganization, not a rewrite

Keep `src/pages`, `src/components`, `src/hooks`, `src/lib`, `src/data`, `src/integrations`, `src/services` as-is. Add these new subfolders only where empty:

```text
src/
  components/
    cards/        (new — CosmicCard, MissionCard, YouTubeResourceCard, ProfileStatsCard)
    feeds/        (new — LiveFeedCard wrapper)
    profile/      (new — profile widgets)
    xp/           (new — XPBar already exists, move + add LevelBadge, StreakChip)
  config/         (new — app constants, feature flags, nav config)
  services/
    api/          (new — thin re-exports)
    nasa/ noaa/ youtube/ sources/   (new — typed service modules)
  styles/         (new — extracted token files imported by index.css)
  types/          (already exists — extend)
```

No existing file is moved without an updated import. Pages and existing components stay where they are to avoid breaking the 100+ routes.

### 2. GitHub-ready project files

- **README.md** — rewrite into the requested structure (name, install, run, build, deploy, env vars, features, data sources, facts-vs-speculation disclaimer). Keep current Lovable Cloud notes.
- **.env.example** — `VITE_NASA_API_KEY`, `VITE_YOUTUBE_API_KEY`, `VITE_NOAA_BASE_URL`, `VITE_APP_ENV`, plus existing `VITE_SUPABASE_*` placeholders.
- **.gitignore** — verify Node/Vite/Supabase entries; add `.env.local`, `dist`, `coverage`, `.DS_Store`, `playwright-report`.
- **CHANGELOG.md** — Keep a Changelog format, seeded with v0.x → v1.0 foundation entry.
- **CONTRIBUTING.md** — branch naming, commit style, PR checklist, link to debug-checklist.
- **LICENSE** — leave untouched (private project per current README).

### 3. Facts-vs-Speculation content model

Extend the existing `source-tier` system into a broader **ContentTrust** model.

- New file `src/lib/content-trust.ts` with enum:
  `VERIFIED_FACT | OFFICIAL_SOURCE | HISTORICAL_RECORD | ACADEMIC_SOURCE | MYTH_LORE | SPECULATIVE | COMMUNITY_THEORY | UNSOURCED_PENDING_REVIEW`
- New `src/components/ContentTrustBadge.tsx` — Tailwind-token-based chip (no hex), one per type, with tooltip explanation.
- Bridge function maps existing `SourceTier` → ContentTrust so nothing currently rendered breaks.

### 4. Source / citation system

- Extend existing `SourceLabel` with the requested shape via a new `src/types/source.ts`:
  `{ title, url, publisher?, lastChecked?, category, status }`
- New `src/components/SourceLink.tsx` — opens in new tab, shows status pill + lastChecked, falls back to `SourceLabel` styling, never renders placeholder/empty URLs.
- New `src/components/SourceList.tsx` already exists — refactor to consume the new shape.

### 5. Live feeds — honest

- New `src/services/{nasa,noaa,youtube,sources}/` typed modules wrapping the existing `live-data.ts` proxies. No fake data — reuse the proven Verified/Cached/Source Offline/Unavailable footer states.
- New `src/components/feeds/LiveFeedCard.tsx` — generic card: title, description, source link, status pill, last-updated, "Open Feed" CTA, graceful "needs API key" + "live feed unavailable" states.
- New `src/pages/LiveFeedsPage.tsx` — dashboard composing NOAA SWPC, NASA SDO, NEO, ISS, SOHO, YouTube embeds, official UAP doc links. Reuses existing `useKp`, `useFlare`, `useSolarWind`, `useISS`, etc.
- New `src/services/sources/sourceHealthService.ts` — `checkSingleUrl`, `checkYouTubeVideo`, `checkOfficialSource`, `markSourceAsBroken`, `markSourceAsVerified`. Frontend stubs with JSDoc explaining the real check belongs on a Supabase Edge Function / GitHub Action cron.

### 6. Profile + XP — extend, don't replace

DB ranks stay. Add a **display-only "Mission Tier"** mapping XP → Observer / Researcher / Signal Tracker / Archivist / Skywatcher / Field Investigator / Disclosure Analyst / Pantheon Builder / Frequency Keeper / Legendary Witness (10 tiers across the existing XP curve).

- New `src/lib/mission-tiers.ts` — pure function `xp → tier`.
- Extend `src/lib/xp-events.ts` with new action values for: daily-login, read-verified-source, watch-video, complete-lore, complete-quiz, report-broken-link, submit-source, finish-learning-path, weekly-streak. Wire any new server-side events via a follow-up migration (flagged below — not auto-run; user approves).
- New `src/components/profile/*`: `ProfileStatsCard`, `BadgeGrid`, `StreakChip`, `ReputationScore` (computed client-side from XP + submissions).
- Badges (display-only, derived from XP/event history): First Signal, Source Hunter, Truth Splitter, Lore Keeper, Skywatcher, Deep Archive, Verified Mind, Pantheon Founder, Frequency 46.

### 7. Missions

- New `src/data/missions.ts` — seed mission catalog matching the requested examples.
- New `src/components/cards/MissionCard.tsx` and `src/pages/MissionsPage.tsx`.
- Progress stored client-side (localStorage) for v1; flagged for future Supabase table.

### 8. Link health architecture

- Frontend: status pill on every SourceLink, "Report Broken Link" button → writes to localStorage queue + (future) Supabase table.
- `sourceHealthService.ts` documented for backend cron — no fake CORS-defying fetches.

### 9. YouTube system

- New `src/components/cards/YouTubeResourceCard.tsx` — lazy iframe, fallback "Open on YouTube" link, verified-status badge, last-checked date.
- New `src/data/youtube-resources.ts` — clearly labelled mock entries marked `UNSOURCED_PENDING_REVIEW` until real IDs supplied. No dead IDs.

### 10. App-store readiness

- New `docs/app-store-readiness.md` with the three checklists (web, Android, iOS).
- Capacitor is **not** installed in this plan — flagged as the next step per project memory's mobile guidance.

### 11. Legal pages

- New `/privacy`, `/terms`, `/disclaimer`, `/contact` pages. Disclaimer uses the exact wording requested.
- Routes registered in `src/App.tsx`, linked from footer.

### 12. Navigation

- New `src/config/nav.ts` single source of truth for nav items (Home, Live Feeds, Archives, Starseed, Pantheon/Gods, UAP Disclosure, Antarctica & Atlantis, Lore, Blood Types, Pyramids, Profile, Missions, Sources, About, Contact).
- `Navbar.tsx` + mobile sheet consume the config. Tap-target audit (44×44) per the accessibility skill.

### 13. Design system

Keep existing Pantheon tokens (per project memory: obsidian/violet base, realm accent hierarchy, signal-green = status only). Add reusable wrappers: `CosmicCard`, `GlowButton`, `SectionHeader`, `SourceBadge`, `XPBar` (already exists), `MissionCard`, `LiveFeedCard`, `YouTubeResourceCard`, `ProfileStatsCard`. No hardcoded hex anywhere — Tailwind tokens only.

### 14. Performance

- Convert top-level routes in `App.tsx` to `React.lazy` + `Suspense` (most are not lazy today).
- Add `loading="lazy"` to non-hero images.
- Pause `SpaceshipFlyby` / `CometTrails` when `prefers-reduced-motion`.

### 15. Accessibility

Run the accessibility skill audit on Navbar, LiveFeedCard, MissionCard, ProfileStatsCard, and the new legal pages. Fix critical/warning items (alt text, aria-labels on icon buttons, h-dvh, focus rings).

### 16. Error handling

Friendly states across LiveFeedCard, YouTubeResourceCard, SourceLink, and a top-level "API key missing" notice driven by `src/config/env.ts`.

### 17. Debug checklist

- New `/debug-checklist` route (hidden, not in nav) listing the launch items as live checkboxes backed by simple runtime probes (routes mounted, env vars present, supabase reachable, etc.).

### 18. Visual identity

No teardown. All new components consume existing tokens. Existing pages untouched except for the lazy-loading wrap in `App.tsx` and the footer additions for legal links.

---

## Out of scope (intentionally)

- Migrating to Next.js / Expo / React Native — would destroy the project.
- Installing Capacitor — separate decision, surfaced as the next step.
- Renaming database XP ranks — would break stored data.
- Real link-health crons — backend work flagged for a follow-up.
- New Supabase tables for missions/streaks/broken-link reports — flagged; will be proposed as a separate migration the user approves explicitly.

---

## Deliverables at the end

1. Summary of files changed/added.
2. New components list.
3. What still needs real API keys (NASA, YouTube).
4. What still needs manual review (mission seed copy, badge art, video IDs).
5. GitHub push instructions (uses Lovable's GitHub integration — Plus menu → GitHub → Connect).
6. ChatGPT/Codex review pointer (point Codex at the repo; the new `CONTRIBUTING.md` + `docs/` give it the conventions).
7. Pre-app-store next steps (install Capacitor, generate icons, fill `docs/app-store-readiness.md`).

---

## Confirm before I build

- OK to **keep** existing DB rank names (Initiate → Ascended) and layer the requested 10-tier names as display-only? (Renaming the DB enum would break stored XP.)
- OK to defer the new Supabase tables (missions progress, broken-link reports, streaks) to a follow-up migration you approve separately, with v1 using localStorage?
- OK that mobile = future Capacitor step (not Expo/React Native rewrite)?

Reply "go" (or with adjustments) and I'll switch to build mode and execute.
