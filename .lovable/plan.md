## Full-Site QA Sweep — Pantheon Observatory 46

Goal: run the live site through several focused passes and fix every broken visual, link, image, video, and piece of stale info before launch.

### Pass 1 — Video integrity (highest priority)
Every embedded video must play.
- Inventory all video sources: `src/data/god-videos.ts`, `src/data/tiktok-voices.ts`, `src/data/documentaries.ts`, `src/data/jeremy-corbell.ts`, `src/data/creators.ts`, `src/data/the-46.ts`, plus anything in `src/data/youtube-resources.ts` and any inline `VideoEmbed` / `YouTubeResourceCard` usage.
- Validate every YouTube ID with the oEmbed endpoint (`https://www.youtube.com/oembed?url=...`). Anything that 404s = dead → replace with a verified working video from the same creator/topic or remove.
- Validate TikTok URLs return 200 (not deleted/private).
- Flag any `needsRealId: true` placeholders and replace with real IDs.
- Re-run validator until 100% pass.

### Pass 2 — Links & routes
- Crawl every internal `<Link>` / `href` for 404s against the route table in `src/App.tsx`.
- Check external links (sources, citations, expert profiles, legislation, whistleblower refs) with HEAD requests; replace dead ones with Wayback or current equivalents.
- Verify `public/sitemap.xml` matches actual routes.

### Pass 3 — Images & media
- Scan every `<img>`, `background-image`, and asset import for 404s.
- Verify external image hosts (NASA, USGS, Wikimedia, etc.) still resolve.
- Confirm fallbacks render (`ImageWithFallback`) and alt text is present for SEO/accessibility.

### Pass 4 — Live data feeds
- Confirm Observatory globe layers still load: USGS quakes, NOAA SWPC solar, NWS storms, ISS API, Open-Meteo.
- Check `live-data-proxy` edge function logs for errors.
- Verify no lingering Google Maps calls.

### Pass 5 — Visual / responsive QA
- Browser pass at mobile (390), tablet (768), desktop (1440) on key pages: Home, Observatory, Codex, Gods, The46, Disclosure Command, Echoverse, Sanctuary, Frequencies, Daily Briefing, Profile.
- Look for: overflow, clipped text, broken grids, missing realm-accent colors, contrast issues, animation jank.

### Pass 6 — Content & info accuracy
- Spot-check dossiers (gods, UAP cases, whistleblowers, legislation, missing scientists) for typos, broken markdown, stale dates.
- Verify evidence badges and trust tiers render correctly.

### Pass 7 — SEO & meta
- Run `seo_chat--list_findings`, fix every failing item, mark fixed.
- Verify `<title>`, meta description, OG tags, canonical, JSON-LD on each top route.

### Deliverable per pass
A short report listing: items checked, items broken, items fixed, items needing user decision (e.g. video has no good replacement → remove or substitute?).

### Technical approach
- Build a Node validator script (`scripts/qa/`) for videos + links + images. Runs in batches with concurrency limits, outputs JSON + console summary.
- Use `browser--view_preview` for visual passes with screenshots at each breakpoint.
- Fix issues inline as they're found; re-run validator after each fix batch.
- No business-logic changes — only data corrections, asset swaps, and presentation fixes.

### Order of execution
1. Videos (Pass 1) — biggest user-visible breakage
2. Links + Images (Passes 2–3) in parallel
3. Live data (Pass 4)
4. Visual responsive (Pass 5)
5. Content (Pass 6)
6. SEO (Pass 7)

### Out of scope
- New features, new pages, redesigns.
- Backend schema changes.
- Reconnecting Google Maps (already removed per your call).

Approve and I'll start with Pass 1 (videos) and report back before moving to the next pass.