# Changelog

All notable changes to Pantheon Frequency 46 are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added — Production Foundation Upgrade
- `src/lib/content-trust.ts` + `ContentTrustBadge` — 8-tier Facts-vs-Speculation labeling.
- `src/components/SourceLink.tsx` — production-grade citation link with status pill, last-checked, and "Report Broken Link" hook.
- `src/services/sources/sourceHealthService.ts` — link-health architecture (frontend now, backend-ready).
- `src/services/{nasa,noaa,youtube}/` — typed external-API service modules.
- `src/components/feeds/LiveFeedCard.tsx` + `src/pages/LiveFeedsPage.tsx` — honest live dashboard with Verified / Cached / Source Offline / Unavailable / Needs API Key / External states.
- `src/lib/mission-tiers.ts` — 10-tier display-only journey (Observer → Legendary Witness) layered on the existing XP system.
- `src/data/missions.ts` + `src/hooks/use-mission-progress.ts` + `src/pages/MissionsPage.tsx` — mission catalog with localStorage progress.
- `src/components/cards/{CosmicCard,MissionCard,YouTubeResourceCard}.tsx` — reusable card primitives.
- `src/components/profile/{ProfileStatsCard,BadgeGrid}.tsx` — profile widgets with 9 Pantheon badges.
- `src/config/{env,nav}.ts` — centralized env accessor + nav source of truth.
- `src/pages/legal/{Privacy,Terms,Disclaimer,Contact,About}Page.tsx` — full legal surface.
- `src/pages/SourcesPage.tsx` — public Facts vs Speculation explainer.
- `src/pages/DebugChecklistPage.tsx` — hidden `/debug-checklist` launch-readiness page.
- `docs/app-store-readiness.md` — web + Android + iOS launch checklists.
- `.env.example`, refreshed `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, expanded `.gitignore`.

### Changed
- `src/App.tsx` — registered new routes: `/live-feeds`, `/missions`, `/sources`, `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/debug-checklist`.
- `src/components/PantheonFooter.tsx` — added Platform / legal link group.

### Preserved
- All existing dossier, dashboard, and visual identity surfaces — no breaking changes.
- Database `app_role` + `compute_rank` enum + every existing XP event remain untouched.
