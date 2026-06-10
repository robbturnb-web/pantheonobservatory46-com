# Contributing to Pantheon Frequency 46

Thanks for helping build the observatory. This is the short rulebook.

## Branch & commit style

- Branch names: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`, `docs/<scope>`.
- Commit messages: imperative present tense — _"add live feed card"_, _"fix broken-link reporter"_.

## Code conventions

- **TypeScript everywhere.** No `any` unless wrapping a third-party untyped API.
- **Design tokens only.** Never hardcode hex values in components — use Tailwind realm/signal tokens (`text-realm-gods`, `text-signal-online`, `bg-primary`, …).
- **Green (`text-signal-online` / `#22C55E`) is reserved for ONLINE / LIVE / ACTIVE / STATUS.** Never decorative.
- **One file = one component.** Split anything over ~250 lines.
- **No fake live data.** If an upstream source fails, surface a clear *Source Offline* / *Unavailable* state via `LiveDataFooter` — never fabricate readings.
- **Every external link goes through `SourceLink`** so it carries status + publisher + "Report Broken Link".
- **Every content claim carries a `ContentTrustBadge`** (Verified Fact, Official Source, Historical Record, Academic Source, Myth/Lore, Speculative, Community Theory, Needs Review).

## Required PR checklist

- [ ] `bun run lint` passes.
- [ ] `bunx vitest run` passes.
- [ ] Visual change? Screenshots at desktop + mobile.
- [ ] New external link → wrapped in `SourceLink` with proper category + status.
- [ ] New live feed → uses `LiveFeedCard` + `LiveDataFooter` (no fake data).
- [ ] New content surface → tagged with `ContentTrustBadge`.
- [ ] New env var → added to `.env.example` AND `src/config/env.ts`.
- [ ] Database change → migration file + `GRANT` statements + RLS policies.
- [ ] Updated `CHANGELOG.md` under `## [Unreleased]`.

## Running the project

```bash
bun install
cp .env.example .env.local   # fill in keys
bun run dev                  # http://localhost:8080
```

## Internal launch tools

- `/debug-checklist` — runtime probe of env vars, Supabase reachability, link-health queue.
- `docs/app-store-readiness.md` — web / iOS / Android pre-launch sweep.
