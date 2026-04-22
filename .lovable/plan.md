

# Plan: Homepage teaser for Missing Persons Archive

Add a prominent teaser card on the homepage driving traffic to `/missing`, styled to fit the cosmic dark theme of the homepage (not the editorial light-paper theme of the dossier page itself — the contrast happens when you click through).

## What gets built

**New homepage section** between the existing "THE 46" vault banner and the "Explore the Observatory" grid. Reason: it's a parallel investigative banner — same visual weight as The 46, same "this is serious, click in" energy.

**Card contents:**
- Left: small editorial-style portrait collage (3 of the silhouette images stacked/overlapped, slightly desaturated)
- Center:
  - Eyebrow label: "INVESTIGATION" in muted red
  - Headline: "The Vanishing — 11 Scientists. 6 Programs. Zero Answers."
  - Subline: "House Oversight Committee inquiry into the deaths and disappearances of US scientists tied to nuclear, fusion, and aerospace programs."
  - Stat row: "11 dossiers · 6 programs · 4 historical precedents"
- Right: "Open the Archive →" CTA button

**Visual treatment:**
- Dark glass-cosmic card (matches site theme on homepage)
- Subtle muted-red accent border on hover (signals it's the investigative section)
- Animated scanning line effect like The 46 banner for visual consistency
- Click anywhere on card → routes to `/missing`

## Files

**Edited (1):**
- `src/pages/HomePage.tsx` — add the new `<section>` block between The 46 banner and the section grid; import 3 silhouette assets and `FileSearch` icon (already imported)

**No new files, no data changes, no backend.** Pure frontend addition reusing existing assets.

## Verification

- Open `/` → scroll past The 46 banner → see "The Vanishing" investigative card with portraits, stats, and CTA
- Click the card → routes to `/missing` and the editorial light-paper page loads
- Verify on mobile (384px viewport) — card stacks vertically, portraits shrink, CTA full-width

