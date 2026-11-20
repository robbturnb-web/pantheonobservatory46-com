# Pantheon Observatory 46 — Hybrid Transformation Plan
Direction: scientific research institution + classified-intelligence command center. Same project, same URLs, no new paid services or dependencies.

## What exists today (inspected)
- Routes already live: `/disclosure` (Disclosure Command page), `/uap`, `/whistleblowers`, `/crash-retrieval`, `/encounters` (small, ~37 lines), `/species`, `/elements` (Elements Lab), `/search`, `/sources`, `/live-feeds`, `/health`, `/echo`, auth/profile/admin pages.
- Data files already cover UAP cases, whistleblowers, legislation, AARO, crash retrieval, black programs, underground bases, entity encounters, species, elements.
- Jake Barber is mentioned only inside the black-programs / Rubik's Cube entry, not in the whistleblower archive. Some of that wording overstates (e.g. "most concrete first-hand testimony", "corroborating sourcing") and needs relabeling as allegation.
- No PURSUE / war.gov references exist yet. No dedicated plasma page.
- Menu has 11 main links, with "Disclosure" pointing to `/uap`.
- Tests: auth navigation, live data, env, CodexPage, filename. Lint script available.

## Phase 0 — Shared evidence system (foundation)
- One shared "trust tier" label set: Official primary, Peer-reviewed, Established journalism, Testimony, Community / unverified.
- One shared "claim type" label set: Verified fact, Official statement, Historical record, Academic research, Testimony / allegation, Speculation, Community theory, Unresolved.
- Small reusable badge + source line (source, date, tier, link) used by all new content. Extends the existing source list and evidence grades without replacing them.

## Phase 1 — Research & Disclosure Command Center (`/disclosure`)
Upgrade the existing page into the hub. It links to sections instead of copying them.
- Latest developments: dated entries, each sourced.
- PURSUE release tracker: releases 01–07 (May 8, May 22, Jun 12, Jul 10, Aug 7, Sep 18, Oct 23 2026), linking to https://www.war.gov/ufo/ and each official notice. A "What this does and does not show" note: releases are official documents, not proof of alien craft. No file totals unless clearly labeled as third-party estimates with the index linked. Show "Last reviewed 2026-11-20".
- Pathways (cards): UAP cases → `/uap`; Witnesses & whistleblowers → `/whistleblowers`; Entities → `/encounters`, `/species`; Plasma → new plasma page; Alleged retrieval & underground programs → `/crash-retrieval`, black programs, underground bases (labeled "allegations"); Legislation & hearings → existing legislation data; AARO → existing data.
- Release/hearing timeline built from existing legislation + new PURSUE data, filterable by type.
- Curated primary sources panel (Congress.gov, AARO, war.gov, NARA, ODNI).

## Phase 2 — Plasma & Atmospheric Phenomena
- New `/plasma` page; `/elements` stays unchanged and gets a link to it.
- Known physics: ball lightning, sprites/jets/elves, plasmoids, dusty plasma, plasma propulsion — each with peer-reviewed or agency sources (NASA, NOAA, journals). Links checked before adding.
- Separate, clearly fenced "Hypotheses" section on alleged intelligent plasma, with the explicit statement: there is no demonstrated evidence that atmospheric plasma is intelligent extraterrestrial life.
- Plain "How scientists test this" box.

## Phase 3 — Entities (`/encounters`, `/species`)
- Add a label to every entity entry: Reported (witness), Folklore / tradition, Speculative.
- Banner on both pages: these are reports and traditions, not a confirmed taxonomy.
- Filter by label. Existing entries kept; only labels and wording added.

## Phase 4 — Jake Barber in the whistleblower archive
- New whistleblower entry using the existing format: public claims (egg-shaped object, helicopter retrieval account, Skywatcher work) written as allegations, with dated sources (NewsNation, Shawn Ryan Show, Skywatcher statements).
- Explicit note: no publicly authenticated chain of custody or physical evidence. No claim of congressional staff role unless a primary source confirms it.
- Tone down the overstated lines in the existing Rubik's Cube entry and link it to the new entry.

## Phase 5 — Homepage
- New opening section: "A living research observatory" — evidence-led, no question off limits, no claim true by default.
- Six entry cards: Investigate, Disclosure, Entities, Plasma, Live Observatory, Echo.
- Keep existing live panels, join/sign-in buttons, and current sections below.

## Phase 6 — Navigation
- Desktop: group into a few divisions (Observatory, Disclosure, Archives, Mythology & Mind, Echo, Account) with dropdowns.
- Phone: same divisions as expandable groups in the menu so it doesn't get long.
- "Disclosure" points to the new `/disclosure` hub; `/uap` stays linked inside it. Every existing link remains reachable.

## Phase 7 — Search
- Add Disclosure, PURSUE, Plasma and Jake Barber entries to the existing search index. Filter/sort only in the timeline and entity lists.

## Phase 8 — Checks and report (no publishing)
- Run tests, lint, build; Playwright screenshots on phone (390px) and desktop for home, `/disclosure`, `/plasma`, `/encounters`, `/species`, `/whistleblowers`; confirm no sideways scrolling.
- Confirm sign-in, profile, Echo, live feeds, admin routes still load.
- Verify every new external link responds.
- Report preview link, changed files, exact test/lint/build results, blockers. Publish only when you say so.

## Style
- Crimson, black, gold, silver, restrained royal purple. No neon or lime green (green stays only for "online" status). Light motion only; respects reduced-motion.

## Still pending from the earlier launch plan
- Real-signup end-to-end check, security fix on shared Echoverse chat (you previously chose to keep chat shared — will re-confirm), invitations (need recipients).

## Technical notes
- New files: `src/lib/evidence.ts` (tier/claim types), `src/components/research/EvidenceBadge.tsx`, `src/data/pursue-releases.ts`, `src/data/disclosure-developments.ts`, `src/data/plasma.ts`, `src/pages/PlasmaPage.tsx`; route added in `src/App.tsx`.
- Edits: `DisclosureCommandPage.tsx`, `EntityEncountersPage.tsx`, species page, `entity-encounters.ts`/`species.ts` (add optional `claimType`), `whistleblowers.ts` (Barber), `black-programs.ts` (wording), homepage, `src/config/nav.ts` (add optional `division` field, keep existing arrays), Navbar/mobile menu, search index.
- Tests added: PURSUE list has exactly 7 releases with the stated dates and war.gov links; every plasma hypothesis entry is typed speculation; every new nav division includes all previous links.
- Record the evidence-tier rule in `AGENTS.md`. No new npm packages, no paid APIs, no database changes.
