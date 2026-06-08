
# Pantheon — SEO, Search & Performance Hardening

Four workstreams, executed in order. Each ends with verifiable output (report, file, or screenshot) so nothing is "done" on vibes.

---

## 1. SEO verification (deep pass)

**Audit**
- Run `seo_chat--list_findings` (all states) + `seo_chat--trigger_scan` for a fresh server-side review.
- Per-page check across all 46+ routes: confirm `<SEO>` is mounted, title <60 chars, description <160 chars, canonical present, og:* set, JSON-LD valid.
- Validate every JSON-LD blob with `schema.org` shape checks (required fields per type: `CollectionPage`, `Article`, `Organization`, `WebSite`, `BreadcrumbList`).
- Confirm single `<h1>` per page, semantic landmarks, alt text on images, lazy loading on non-LCP images.
- Cross-check `index.html` sitewide head vs Helmet per-route (no duplicate canonicals, no stale title).

**Fix**
- Patch any page missing/oversized tags.
- Add `BreadcrumbList` JSON-LD to all dossier pages (Cosmos / Disclosure / Earth groupings).
- Add `WebSite` + `SearchAction` schema on the home page (powers Google sitelinks searchbox — ties into workstream 3).
- Add `og:image` only where a real hero asset exists; otherwise leave off (per project rule).

**Verify**
- Re-run `seo_chat--trigger_scan`, mark fixed findings via `seo_chat--update_findings`.
- Manual spot-check: curl `/` and 3 representative routes, grep for `<title>`, `canonical`, `application/ld+json`.

---

## 2. Sitemap & robots verification

**Audit**
- Diff `scripts/generate-sitemap.ts` entries against the actual `<Route>` table in `src/App.tsx` — find missing routes, find stale entries, find routes that shouldn't be indexed.
- Confirm `predev`/`prebuild` hooks actually regenerate `public/sitemap.xml` (run the script, diff output).
- Fetch the live `https://pantheonobservatory46-com.lovable.app/sitemap.xml` and `/robots.txt` — confirm 200, correct content-type, parseable XML.
- Validate sitemap against XSD (every `<loc>` absolute, `<lastmod>` ISO format, priorities in [0.0, 1.0]).
- Confirm `robots.txt` `Sitemap:` directive points to the live URL and that disallowed paths (`/auth`, `/profile`, `/reset-password`) are correct.

**Fix**
- Add any missing public routes; remove any unreachable ones.
- Ensure `/404` and gated routes are excluded.

**Verify**
- `curl -I` both files for HTTP 200.
- Run `xmllint --noout public/sitemap.xml`.
- Submit-ready sitemap reported back with entry count.

---

## 3. Site-wide search (new build)

**Goal:** Cmd/Ctrl-K palette + dedicated `/search` page. Every result is **verifiable, linkable, and creditable** — every hit shows source dossier, evidence grade, and a deep link.

**Architecture**
- Pure client-side index (no backend) using **MiniSearch** — fast, tiny, fuzzy, prefix, field-weighted.
- Index built at module load from existing data sources:
  - `src/data/*.ts` (aaro, crash-retrieval, underground, encounters, glyphs, stone-faces, extinct-species, cern, frequencies, species, shadow-gods, atlantis, antarctica, builders, brazil, black-programs, whistleblowers, jwst-findings, telescopes, timeline, pyramids, the-46, glyphs-dossier, federation, consciousness, documentaries, experts, jeremy-corbell, uap-cases, …).
  - Realm/route registry (titles + descriptions for navigational hits).
- Each indexed record normalized to:
  ```ts
  type SearchDoc = {
    id: string;            // stable
    title: string;
    summary: string;
    body: string;          // searchable concat
    realm: RealmKey;       // for accent color + filter
    route: string;         // deep link
    evidenceGrade?: string;// A/B/C/D when present
    sources?: {label,url}[]; // for "creditable"
    type: 'dossier'|'finding'|'route'|'expert'|...;
  };
  ```

**UI**
- `CommandPalette` (shadcn `Command` + `Dialog`) — global Cmd/K, available in `Layout`.
- `/search?q=...` page with full results, filter chips per realm (using realm tokens), evidence-grade filter, type filter.
- Each result card shows: title, realm accent stripe, summary, evidence badge, source count, "Open dossier →" link, optional "Ask Echo" handoff button that opens Echo prefilled with the query + result context.
- Empty state + recent searches (localStorage).
- Keyboard nav, ARIA roles, focus trap.

**Verifiable / linkable / creditable**
- **Linkable:** `/search?q=...` is a real route, deep-linkable, indexable (with `<SEO>` + `noindex` on results to avoid SERP bloat but canonical to `/search`).
- **Creditable:** every result card renders `SourceList` (existing component) when the underlying dossier has sources; otherwise shows "No primary source on file" honestly.
- **Verifiable:** evidence grade pulled from existing dossier metadata; click-through lands on the full dossier with its source list and confidence label intact.

**Tech**
- `bun add minisearch`.
- New: `src/lib/search/index-builder.ts`, `src/lib/search/use-search.ts`, `src/components/search/CommandPalette.tsx`, `src/components/search/SearchResultCard.tsx`, `src/pages/SearchPage.tsx`.
- Hook into `Navbar` (search icon + Cmd/K hint) and `Layout` (global keybind + dialog mount).
- Add `WebSite` + `SearchAction` JSON-LD to `index.html` pointing at `/search?q={search_term_string}` (Google sitelinks searchbox).

**Out of scope**
- Algolia or server-side search (overkill for current corpus; revisit if data grows past ~5k docs).
- Echo semantic search (separate workstream).

---

## 4. Lighthouse pass (thorough)

**Run**
- Use `browser--performance_profile` on 5 representative routes at mobile + desktop viewports:
  - `/` (home, heavy starfield + three.js)
  - `/echo` (chat)
  - `/jwst` (image-heavy)
  - `/signals` (data list)
  - `/search` (new)
- Capture: FCP, LCP, CLS, INP, TBT, JS heap, DOM size, largest resources, render-blocking resources.

**Fix targets**
- LCP > 2.5s on mobile → defer non-critical three.js / starfield init, `loading="lazy"` + `decoding="async"` on below-fold images, preload hero image on `/` and `/jwst`.
- CLS > 0.1 → reserve aspect-ratio boxes on `WebbHeroImage`, `DeepFieldHero`, gallery strips.
- TBT/INP → code-split heavy routes (`React.lazy` for `/jwst`, `/galaxy`, `/echoverse`, `/elements` if not already), audit `framer-motion` usage on initial paint.
- Render-blocking → confirm fonts use `font-display: swap`, drop unused Tailwind utilities (already purged in build, verify).
- A11y wins surfaced by profiler (contrast, labels, focus order).

**Verify**
- Re-profile after each fix; record before/after deltas in a short report.
- Final report stored at `/mnt/documents/lighthouse-report.md` with per-route scores + diff.

---

## Order of execution

1. SEO audit + fixes (workstream 1)
2. Sitemap/robots verification (workstream 2) — quick
3. Build site-wide search (workstream 3) — largest chunk
4. Lighthouse pass last (so /search is included in the perf budget)
5. Final report: `/mnt/documents/seo-search-perf-report.md` summarizing all four

## Out of scope

- New backend tables, auth changes, Echo prompt changes
- Algolia or server-side search
- Visual redesigns beyond the search UI itself
