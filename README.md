# Pantheon Frequency 46

> A cinematic cosmic operating system — observatory, research platform, disclosure archive, and intelligence dashboard for UAP research, ancient civilizations, consciousness research, and space weather.

**Live URL:** https://pantheonobservatory46.com

## Features

- 🛰️ **Live Feeds** — honest, source-attributed space weather (NOAA SWPC, NASA SDO, ISS, NWS). When upstream is offline we say so — we never fabricate readings.
- 📜 **Facts vs Speculation** — every claim is tagged with a content-trust badge (Verified Fact, Official Source, Historical Record, Academic Source, Myth / Lore, Speculative, Community Theory, Needs Review).
- 🔗 **Source citation system** — every external link shows tier, publisher, last-checked date, and supports a "Report Broken Link" workflow.
- 🎮 **XP + Missions + Tiers** — 10-tier journey from Observer → Legendary Witness with mission-based progression.
- 🧠 **Echo AI** — streaming Claude-powered research companion (Lovable AI Gateway).
- 🏛️ **The 46 Vault**, **12 Gods Pantheon Clock**, **Star-Seed Terminal**, **Deep Archive**, **JWST Explorer**, **Oracle 46** — full immersive feature set.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite 5 + TypeScript 5 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| 3D / Visuals | Three.js + React Three Fiber + Postprocessing |
| Animation | Framer Motion |
| Backend | Lovable Cloud (Supabase: PostgreSQL, Auth, Edge Functions) |
| AI | Lovable AI Gateway (Claude Sonnet, Gemini) |
| State | TanStack Query, React hooks, localStorage |
| Routing | React Router DOM 6 |
| Testing | Vitest + Playwright |

## Quick Start

```bash
# 1. Install dependencies
bun install        # or: npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your keys (see Environment Variables below)

# 3. Run the dev server
bun run dev        # opens http://localhost:8080
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start Vite dev server with hot reload |
| `bun run build` | Production build into `dist/` |
| `bun run build:dev` | Development-mode build |
| `bun run preview` | Serve the production build locally |
| `bun run lint` | ESLint across the codebase |
| `bun run smoke` | Playwright smoke tests |
| `bunx vitest run` | Run unit tests |

## Deploy

This project is hosted via Lovable. Push to GitHub via Lovable's two-way sync, then click **Publish** in the Lovable editor. Frontend changes require clicking *Update* in the publish dialog; backend (edge functions / migrations) deploy automatically.

## Environment Variables

Required (Lovable Cloud auto-provisions these):

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
```

Optional:

```bash
VITE_NASA_API_KEY=                    # NASA APIs (proxy uses DEMO_KEY when unset)
VITE_YOUTUBE_API_KEY=                 # YouTube Data API (video availability checks)
VITE_NOAA_BASE_URL=https://services.swpc.noaa.gov
VITE_APP_ENV=development              # development | staging | production
```

See `.env.example` for the full template.

## Project Structure

```
src/
  assets/                  # Images and media
  components/
    cards/                 # CosmicCard, MissionCard, YouTubeResourceCard, ProfileStatsCard
    feeds/                 # LiveFeedCard
    profile/               # ProfileStatsCard, BadgeGrid
    live/                  # LiveDataFooter (verified/cached/offline/unavailable states)
    ui/                    # shadcn primitives
    ...                    # Existing dossier / echo / observatory / jwst modules
  config/                  # nav.ts, env.ts (centralized env-var accessor)
  data/                    # Static data (UAP cases, gods, missions, youtube resources, …)
  hooks/                   # use-mission-progress, use-live-data, use-echo-xp, …
  integrations/supabase/   # Auto-generated client (do not edit)
  lib/                     # content-trust, source-tier, mission-tiers, live-data, …
  pages/
    legal/                 # Privacy, Terms, Disclaimer, Contact, About
    ...                    # All route-level pages
  services/
    api/                   # Aggregated re-exports
    nasa/ noaa/ youtube/   # Typed service modules
    sources/               # sourceHealthService (link-health architecture)
  types/                   # source.ts, …
supabase/
  functions/               # Edge functions (echo-chat, oracle-46, live-data-proxy, …)
  migrations/              # SQL migrations
docs/
  app-store-readiness.md   # Web + iOS + Android launch checklist
```

## Data Sources

| Source | Tier | Used For |
|--------|------|----------|
| NASA (SDO, DONKI, NEO, ISS) | Official | Solar imagery, flares, ISS telemetry |
| NOAA SWPC | Official | Kp index, solar wind, alerts |
| USGS | Official | Earthquakes |
| NWS (weather.gov) | Official | Severe weather alerts |
| AARO / DoD / Congress | Primary | UAP documents, hearings |
| arXiv, Nature, NIH | Primary | Peer-reviewed research |
| C-SPAN, Reuters, BBC | Secondary | Journalism context |

## Facts vs Speculation Policy

Pantheon Frequency 46 contains a mix of official sources, historical material, mythology, folklore, speculative theories, and community research. **Content should not be treated as legal, medical, financial, scientific, or government-confirmed fact unless directly linked to official verified sources.** See `/disclaimer`.

## Mobile Conversion (Future)

The codebase is ready for Capacitor wrapping into iOS/Android apps. See `docs/app-store-readiness.md` for launch checklists.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Private project. All rights reserved.
