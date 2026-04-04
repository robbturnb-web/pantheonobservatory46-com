
# Phase 6: Deep Content Enhancement — Sources, Media & Real Visuals

This is a large enhancement pass across every page to add credibility, real media, and deep-dive links.

---

## 1. Credible Sources & Fact Links

Add `sources` arrays to all data files with clickable external links:

**Whistleblowers** (`src/data/whistleblowers.ts`):
- Bob Lazar → Link to Joe Rogan interview, Jeremy Corbell documentary, MIT/CalTech investigation
- David Grusch → Link to NewsNation interview, Congressional testimony C-SPAN, The Debrief article
- Steven Greer → Link to Disclosure Project press conference (YouTube), CE5 documentary
- Each whistleblower gets 3-5 source links with labels (Interview, Documentary, Government Record, News Article)

**Timeline** (`src/data/timeline.ts`):
- Each event gets `sourceUrl` and `sourceLabel` fields
- Göbekli Tepe → Link to Smithsonian article, Klaus Schmidt research
- Roswell → Link to Project Blue Book files, FOIA documents

**UAP Cases** (`src/data/uap-cases.ts`):
- Tic Tac → Pentagon AATIP report, NYTimes 2017 article
- Phoenix Lights → AZ Republic coverage, Gov. Fife Symington statement

**Pyramids** (`src/data/pyramids.ts`):
- Great Pyramid → National Geographic, Robert Bauval's research links
- Teotihuacan → INAH Mexico, scholarly articles on mica chambers

**Gods** (`src/data/gods.ts`):
- Each deity → Link to Theoi.com (Greek), Norse-mythology.org, etc.

**UI**: Add a "📎 Sources" collapsible section in each info panel/card with clickable links that open in new tabs.

---

## 2. Real Photos & Visual Media

Replace or supplement animations with real imagery:

**Pyramids Page** — Add a photo gallery section below the 3D explorer:
- Real photos of each pyramid site (sourced from Wikimedia Commons / public domain)
- "Hidden Discoveries" section with photos of: Giza void discovery (2017 muon scan), Teotihuacan mercury pools, Bosnian tunnel photos, Meroë restoration

**Whistleblowers** — Add real headshot photos (public domain press images)

**Telescopes** — Real telescope facility photos from NASA/ESA press kits

**Implementation**: Use Wikimedia Commons API or direct URLs to public domain images. Create an `ImageGallery` component for photo sections.

---

## 3. YouTube & TikTok Video Embeds

Create a reusable `VideoEmbed` component that supports both YouTube and TikTok:

**YouTube** (`<iframe>` embed):
```tsx
<iframe src="https://www.youtube.com/embed/{videoId}" />
```

**TikTok** (`<blockquote>` + script embed):
```tsx
<blockquote className="tiktok-embed" cite="https://www.tiktok.com/@user/video/{id}" />
```

**Where videos go:**
- **Whistleblowers**: Each profile gets a "Watch" section with 1-2 key YouTube interviews
- **Pyramids**: "Discoveries" tab with recent documentary clips
- **UAP Cases**: Key footage clips (Tic Tac FLIR, Gimbal, GoFast — all declassified)
- **New "Media Vault" section on homepage**: Curated TikTok + YouTube playlist carousel

**Video data**: Add `videos: { platform: 'youtube' | 'tiktok', id: string, title: string }[]` to relevant data types.

---

## 4. Deep-Dive Link Architecture

Every fact, name, and concept becomes a link:

- Internal cross-links: Clicking "Orion" in Pyramids → navigates to Gods page filtered to Egyptian
- External knowledge links: Clicking "Element 115" → Wikipedia article on Moscovium
- Create a `KnowledgeLink` component that renders as a styled inline link with an icon indicating internal vs external

---

## Implementation Order

1. **Data layer first**: Add `sources`, `videos`, `images` fields to all data files
2. **Reusable components**: `VideoEmbed`, `SourceList`, `ImageGallery`, `KnowledgeLink`
3. **Whistleblowers page** (richest content — sources, photos, videos)
4. **Pyramids page** (photo gallery, discoveries section, videos)
5. **UAP page** (declassified footage embeds, source links)
6. **Timeline page** (source links per event)
7. **Gods page** (mythology reference links)
8. **Homepage media vault** (curated video carousel)

---

## Technical Notes

- All external links use `target="_blank" rel="noopener noreferrer"`
- YouTube embeds use `loading="lazy"` and privacy-enhanced mode (`youtube-nocookie.com`)
- TikTok embeds load the script dynamically to avoid performance impact
- Real photos sourced from Wikimedia Commons (CC-BY-SA) with attribution
- No database changes needed — all static data
