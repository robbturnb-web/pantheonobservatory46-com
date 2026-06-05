## Sitemap & Robots.txt for Pantheon

### Goal
Generate a sitemap and update robots.txt that accurately reflect all public realm pages, while excluding gated and utility routes.

### Existing State
- `public/robots.txt` exists with basic `Allow: /` blocks but no sitemap reference and no gated-route exclusions.
- No sitemap mechanism exists (no generator script, no `public/sitemap.xml`, no Vite plugin).

### Deliverables

1. **Create `scripts/generate-sitemap.ts`**
   - Static entries for every public route from `src/App.tsx`.
   - Base URL: `https://pantheonobservatory46-com.lovable.app`
   - Omit `/auth`, `/reset-password`, `/profile`, wildcard `*`, redirects (`/community`, `/index`), and dynamic `/experts/:slug` (the `/experts` index is included).
   - Writes output to `public/sitemap.xml`.

2. **Wire generator into build pipeline**
   - Add `"predev"` and `"prebuild"` scripts to `package.json` that run `bunx tsx scripts/generate-sitemap.ts`.
   - Ensures `sitemap.xml` is present in both dev preview and production build.

3. **Update `public/robots.txt`**
   - Add `Sitemap: https://pantheonobservatory46-com.lovable.app/sitemap.xml`
   - Add `Disallow: /auth`, `Disallow: /reset-password`, `Disallow: /profile` under `User-agent: *` while preserving existing bot-specific blocks.

### Routes Included in Sitemap
`/` `/timeline` `/uap` `/gods` `/consciousness` `/signals` `/origin` `/echo` `/whistleblowers` `/telescopes` `/galaxy` `/echoverse` `/pyramids` `/earth-pulse` `/orb-report` `/the-46` `/codex` `/video-vault` `/shadow-pantheon` `/frequencies` `/species` `/missing` `/antarctica` `/atlantis` `/aaro` `/crash-retrieval` `/black-programs` `/rubiks-cube` `/46` `/star-seed` `/underground` `/encounters` `/extinct` `/cern` `/federation` `/builders` `/glyphs` `/stone-faces` `/elements` `/experts` `/style-guide` `/documentaries` `/corbell` `/jeremy-corbell` `/brazil` `/jwst`

### Routes Excluded from Sitemap & Blocked in Robots
`/auth` `/reset-password` `/profile` `/community` `/index` `*`