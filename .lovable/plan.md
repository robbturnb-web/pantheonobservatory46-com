## Black Programs Vault — Rubik's Cube & the Hidden UAP SAPs

A new dedicated page cataloging every alleged / unacknowledged UAP-related Special Access Program (SAP), with **Rubik's Cube** as the flagship featured dossier at the top.

### Why a new page (not just an entry in Crash Retrieval)
Crash Retrieval = recovered *craft/bodies*. The 46 Vault = the specific congressional file list. Neither cleanly hosts the **programs themselves** (the umbrellas that allegedly fund, hide, and reverse-engineer the material). This deserves its own vault — and Rubik's Cube specifically has zero coverage anywhere on the site right now.

### Route & Navigation
- New route: `/black-programs`
- New navbar link: **"Black Programs"** (placed next to Crash Retrieval)
- Reuses `DossierPageLayout` + `DossierCard` + `DossierModal` (same look/feel as Crash Retrieval, Glyphs, Stone Faces)

### Featured: Rubik's Cube (top of page, oversized hero)
Custom hero block above the standard grid — cinematic banner image of a glowing multi-colored cube lattice over redacted document scans + crimson "BLACK PROJECTS" classification strip. Contents:
- **What it allegedly is**: A compartmented UAP material-analysis / reverse-engineering program named for the way recovered NHI craft components reportedly reconfigure their internal geometry like a Rubik's cube — surfaced publicly via Jake Barber, Ross Coulthart, and Shawn Ryan Show interviews (2024-2025).
- **Current status / what they may have found**: alleged "egg" craft retrieval, biologics, material that responds to consciousness, the "psionic pilot" claims.
- **Speculations & theories**: tie-ins to Immaculate Constellation, Kona Blue, Legacy Program.
- **Linked people**: Jake Barber, Ross Coulthart, Matthew Brown, Tim Gallaudet, Lue Elizondo, David Grusch (adjacent).
- **Sources**: Shawn Ryan Show ep, NewsNation Reality Check, Liberation Times, Coulthart Substack — with citation chips.
- **Curated videos**: Barber/Ryan interview, Coulthart NewsNation segments.

### Standard grid: every alleged UAP program
~15 dossier cards, each with hero image, evidence grade, origin, key events, evidence, skeptical view, sources, videos:

1. **Rubik's Cube** (also rendered as featured card)
2. **Immaculate Constellation** — Matthew Brown's 2024 report, "umbrella" UAP SAP
3. **Kona Blue** — DHS-proposed successor to AAWSAP, never funded per DoD
4. **AAWSAP / AATIP** — Bigelow/DIA, the publicly-acknowledged seed
5. **Legacy Program** — Grusch's term for the multi-decade retrieval program
6. **Project Aquarius** — alleged MJ-12 era successor to Grudge
7. **Project Grudge / Sign / Blue Book** — the historical acknowledged trilogy
8. **MJ-12 / Majestic** — the contested foundational document
9. **GATEWAY / Sunstreak / Stargate** — CIA/DIA remote viewing (UAP overlap)
10. **Project Pounce** — alleged USAF crash-recovery team
11. **Project Moon Dust / Operation Blue Fly** — declassified foreign-tech recovery
12. **SOLAR WARDEN** — alleged secret space fleet (low confidence, included as "ALLEGED")
13. **Yankee Blue / Yankee White adjuncts** — alleged indoctrination ops (Lue Elizondo testimony)
14. **NRO "Zodiac" / unnamed compartments** — referenced in Schumer Amendment
15. **UAPTF / AARO** — the modern public-facing layer (for contrast)

Each card carries a confidence stamp: VERIFIED (AATIP, Blue Book, AARO), REPORTED (Immaculate Constellation, Rubik's Cube), ALLEGED (Solar Warden, MJ-12), DEBATED (Kona Blue, Legacy).

### Hero imagery
Generate one cinematic hero per program (~16 images, premium quality) in `src/assets/black-programs/` — consistent visual language: obsidian + crimson accent (matches the "Black Projects" realm token `#DC2626`), redaction bars, classification stamps, no fake "alien" art for unverified programs (stays truth-oriented per established pattern).

### Technical details
- New file `src/data/black-programs.ts` exporting `blackProgramEntries: DossierEntry[]` + `blackProgramCategories`
- New page `src/pages/BlackProgramsPage.tsx` — custom Rubik's Cube hero section above `<DossierPageLayout>`
- Add `pageThemes.blackPrograms` to `src/lib/page-themes.ts` (crimson accent, obsidian surface, classification label "TOP SECRET // SAP // NOFORN")
- Lazy route + Navbar entry
- SEO tags via `<SEO>` component
- Realm color: crimson `#DC2626` (matches existing Black Projects realm token — no new colors)

### Out of scope
- No backend / database changes
- No edits to existing Crash Retrieval, The 46, or Whistleblower vaults (they cross-link via shared people only)
- No new auth / cloud features
