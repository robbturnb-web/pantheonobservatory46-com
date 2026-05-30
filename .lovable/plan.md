## Goal

Every card in every grid gets its own cinematic, realm-tinted hero image. No two-grade placeholders, no shared stock — each card gets a custom prompt tied to its actual content. Cards become visual first, readable second.

## Realm tint mapping (locked palette per dataset)

Each dataset gets a fixed accent baked into every prompt so the section reads as one realm at a glance.

- Antarctica → icy cyan + obsidian, aurora, ice-shelf cold
- Atlantis → emerald + gold, deep ocean, submerged ruins
- Crash Retrieval → crimson + black, military hangar, redacted-document energy
- Underground Bases → crimson + amber, tunnel lighting, subterranean industrial
- Entity Encounters → indigo + violet, dreamlike, eerie close-range
- Pyramids → amber + gold, desert night, monolithic sacred geometry
- Stone Faces → bronze + violet, weathered monumental carvings
- Glyphs → indigo + cyan, glowing engraved symbols on stone/metal
- Missing Scientists → desaturated noir + crimson, surveillance / archival
- Whistleblowers (gaps only) → emerald + obsidian portrait energy, matches existing set
- The 46 (vault slots) → royal violet + obsidian, classified-folder + sigil energy. Pending-disclosure slots get sealed/redacted look; unlocked slots get the actual subject matter.

All prompts share the Pantheon base: obsidian backgrounds, cinematic photoreal, dramatic volumetric lighting, ultra-detailed, no on-image text.

## Scope (final card counts to image)

Pulled live from the data files:

- Antarctica: 11
- Atlantis: 12
- Crash Retrieval: 9
- Underground Bases: 9
- Entity Encounters: 10
- Pyramids: 6
- Stone Faces: ~12 (verify on read)
- Glyphs: ~8 (verify on read)
- Missing Scientists: ~15 high-profile entries (cap the list — 699-line file likely has more than warrant a unique image; rest get a shared category fallback)
- Whistleblowers gaps: ~4 missing portraits
- The 46: 50

Estimated total: ~146 new images. Generated with the standard tier for cinematic detail.

## Data layer pattern (consistent across every dataset)

1. Add `heroImage?: string` to the entry type (or reuse `image` where it already exists, like Whistleblowers).
2. Top-of-file ES6 imports for each new image: `import slugImg from '@/assets/<dataset>-<slug>.jpg'`.
3. Attach `heroImage: slugImg` on each entry.
4. For The 46, store under `coverImage` on `VaultSlot` so vault-specific UI can decide pending vs unlocked treatment.

## UI layer pattern

For each list/grid page (`AntarcticaPage`, `AtlantisPage`, `CrashRetrievalPage`, `UndergroundBasesPage`, `EntityEncountersPage`, `PyramidExplorerPage`, `StoneFacesPage`, `GlyphsPage`, `MissingPage`, `The46Page`, `WhistleblowerVaultPage`):

- Render a 16:9 hero header above the existing card body, identical pattern to the UAP card I just shipped:
  - `<img loading="lazy">` absolute-filled, `object-cover`, `transition-transform group-hover:scale-105`
  - Bottom-to-top gradient `from-background via-background/60 to-transparent` so titles overlap cleanly
  - Confidence / status badge anchored bottom-left over the gradient
  - Whole image is the same click target as the card (open modal / expand)
- Where cards already use the shared `DossierCard` component (Antarctica, Atlantis, etc.), extend `DossierCard` once with an optional `heroImage` prop — single change cascades to every consumer.
- Vault slots get a slightly different treatment: pending-disclosure slots use a sealed/blurred cover with the 46 sigil watermark; unlocked slots show the full image.

## Execution waves (so we can ship visibly, not all-or-nothing)

Wave 1 — Antarctica + Atlantis (23 images). Highest user-priority sections, both already flagged for the deepest layout work. Extend `DossierCard` here.

Wave 2 — Crash Retrieval + Underground Bases + Entity Encounters + Pyramids (34 images). All share the dossier pattern, no new component work.

Wave 3 — Stone Faces + Glyphs + Missing Scientists + Whistleblowers gaps (~39 images). Each page gets the same hero-header pattern; Missing Scientists capped to ~15 unique heroes plus a shared fallback.

Wave 4 — The 46 vault (50 images). Two visual treatments (pending vs unlocked). `VaultSlotCard` and `VaultSlotModal` updated to render the cover.

Each wave is fully self-contained: types updated, images generated in parallel, page rendered, verified before moving on.

## Verification per wave

- Read final file to confirm imports + heroImage fields landed cleanly.
- Visit the page in preview, screenshot a card, zoom in to confirm image renders, gradient sits right, badge contrast holds, hover scale fires.
- Fix any prompt that came back generic (e.g. wrong subject) before moving to the next wave.

## Technical notes

- All images saved to `src/assets/<dataset>-<slug>.jpg`, 1280×720, standard quality tier.
- Realm tint enforced in every prompt string, not via CSS overlay — the image itself carries the color identity.
- No design-token violations: badges and gradients continue to use semantic tokens (`bg-background`, `text-realm-*`, `text-signal-online`), never raw hex in components.
- `DossierCard` change is additive — `heroImage` is optional, so any dossier dataset that doesn't get a hero (yet) continues to render the existing text-only layout.

## Out of scope this pass

- Animating the hero (parallax, video loops) — static images first; we can promote standout cards to video later.
- Regenerating the existing UAP set or the existing Whistleblower portraits — those stay.
- Editing copy, sources, or video lists on any card — visuals only.
