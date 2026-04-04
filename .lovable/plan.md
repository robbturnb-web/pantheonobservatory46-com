

# Galaxy & Pyramid Testing + Content Enhancements + Milky Way & Constellations

## Test Results

Both pages verified in browser:
- **Galaxy Explorer** (/galaxy): Renders correctly — Sun, planets with realistic colors, Saturn rings, asteroid belt, comets, orbit lines, labels all visible. No console errors.
- **Pyramid Explorer** (/pyramids): Renders correctly — 6 pyramids with labels, alignment beams to Orion/Sirius, ground plane. No console errors.

---

## Implementation Plan

### 1. Milky Way Background & Constellations (Galaxy Explorer)

Add to `SolarSystem.tsx`:
- **Milky Way plane**: A large tilted ring/disc mesh behind the solar system using a semi-transparent gradient material to suggest the galactic plane
- **Constellation markers**: Add labeled star groups for Orion, Big Dipper, Sirius, Pleiades, and Cassiopeia as small sphere clusters with Html labels at far distances (radius ~80-100)
- **Galactic center glow**: Faint emissive sphere in the background suggesting the galactic core

### 2. Content Enhancement — Credible Sources with Links

Add `sources` arrays with real URLs to all data files:

**`src/data/pyramids.ts`** — Add `sources: { label: string; url: string }[]` field:
- Great Pyramid → National Geographic, Robert Bauval research, Smithsonian
- Teotihuacan → INAH Mexico, mica chamber research papers
- Each pyramid gets 3-4 linked sources

**`src/data/whistleblowers.ts`** — Convert existing `sources: string[]` to `sources: { label: string; url: string }[]`:
- Bob Lazar → Joe Rogan #1315, Jeremy Corbell documentary
- David Grusch → C-SPAN testimony, NewsNation interview, The Debrief
- Each whistleblower gets 3-5 clickable source links

**`src/data/uap-cases.ts`** — Convert existing `sources: string[]` to `sources: { label: string; url: string }[]`:
- Nimitz → Pentagon FOIA release, NYTimes 2017, Fravor testimony
- Each case gets links to primary documents

**`src/data/timeline.ts`** — Add `sourceUrl` and `sourceLabel` fields to each entry

**`src/data/gods.ts`** — Add `sources: { label: string; url: string }[]` to God interface in `types/index.ts`

### 3. Reusable Components

**`src/components/SourceList.tsx`** — Collapsible "Sources" section with external link icons, `target="_blank" rel="noopener noreferrer"`. Used in PyramidInfo, PlanetInfo, WhistleblowerVaultPage, UAPPage, TimelinePage.

**`src/components/VideoEmbed.tsx`** — YouTube iframe embed component with `loading="lazy"` and `youtube-nocookie.com` privacy mode. TikTok blockquote embed with dynamic script loading.

**`src/components/KnowledgeLink.tsx`** — Inline styled link component that distinguishes internal (react-router Link) vs external (new tab) links with small icons.

### 4. Video Embeds in Data

Add `videos: { platform: 'youtube' | 'tiktok'; id: string; title: string }[]` to:
- Whistleblowers: Key interview clips per person
- UAP cases: Declassified footage (Tic Tac FLIR, Gimbal)
- Pyramids: Documentary clips about discoveries

### 5. UI Integration

- **PyramidInfo.tsx**: Add SourceList and VideoEmbed sections below existing content
- **PlanetInfo.tsx**: Add SourceList section
- **WhistleblowerVaultPage.tsx**: Add SourceList and VideoEmbed to each profile card
- **UAPPage.tsx**: Add SourceList with clickable links, VideoEmbed for declassified footage
- **TimelinePage.tsx**: Add source link per event entry
- **GodsPage.tsx**: Add reference links per deity

### 6. Files Changed

| File | Change |
|------|--------|
| `src/data/pyramids.ts` | Add `sources` and `videos` arrays |
| `src/data/whistleblowers.ts` | Convert sources to objects with URLs, add videos |
| `src/data/uap-cases.ts` | Convert sources to objects with URLs, add videos |
| `src/data/timeline.ts` | Add `sourceUrl`/`sourceLabel` fields |
| `src/types/index.ts` | Add sources/videos to God and UAPCase interfaces |
| `src/components/SourceList.tsx` | New reusable component |
| `src/components/VideoEmbed.tsx` | New reusable component |
| `src/components/KnowledgeLink.tsx` | New reusable component |
| `src/components/galaxy/SolarSystem.tsx` | Add MilkyWay, Constellations components |
| `src/components/pyramid/PyramidInfo.tsx` | Add SourceList, VideoEmbed |
| `src/components/galaxy/PlanetInfo.tsx` | Add SourceList |
| `src/pages/WhistleblowerVaultPage.tsx` | Integrate SourceList, VideoEmbed |
| `src/pages/UAPPage.tsx` | Integrate SourceList, VideoEmbed |
| `src/pages/TimelinePage.tsx` | Add source links |
| `src/pages/GodsPage.tsx` | Add reference links |

No database changes needed — all static data enhancements.

