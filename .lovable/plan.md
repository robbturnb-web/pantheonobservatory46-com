
# Finish hero rollout + worldwide species expansion

Two phases. Phase A closes out the realm-tinted hero image waves already in flight. Phase B opens a new, larger expansion of the Species dataset.

---

## Phase A — Finish Waves 3 & 4 (hero images)

Continuation of the realm-tinted cinematic rollout. Same pattern as Waves 1-2: generate `.jpg` assets in `src/assets/`, extend the dataset/type if needed, import + map to entry IDs, render via existing `DossierCard` `heroImage` prop or section-local equivalent.

### Wave 3 — Disclosure adjacency (~39 images)

Sequential per dataset, verify after each.

- **Pyramids (6)** — finish wiring. Add `heroImage?: string` to `Pyramid` type, render in `PyramidInfo` UI, attach the 6 already-generated `pyramid-*.jpg` assets. Amber + gold, desert night, monolithic sacred geometry.
- **Stone Faces (~12)** — bronze + violet, weathered monumental carvings (Easter Island, Olmec heads, Bayon, Mt Nemrut, etc.).
- **Glyphs (~8)** — indigo + cyan, glowing engraved symbols (Nazca, cuneiform, Mayan, Voynich-style, etc.).
- **Missing Scientists (~15)** — desaturated noir + crimson surveillance/archival energy. Unique heroes for named cases; shared fallback for any remainder.
- **Whistleblowers gaps (~4)** — emerald + obsidian portrait energy, matching existing whistleblower set.

### Wave 4 — The 46 vault (50 images)

- Use `coverImage` on `VaultSlot` (already in type).
- Two visual treatments handled in `VaultSlotCard` + `VaultSlotModal`:
  - **Sealed/pending** slots → blurred + darkened + violet sigil overlay (classified-folder energy).
  - **Unlocked** slots → full cinematic hero (royal violet + obsidian, classified-folder + sigil energy).
- Generate 50 unique covers tied to each vault slot's theme.

### Verification per wave

Read final files, hit each affected page in preview, spot-check 3-4 cards per dataset for broken imports, missing alts, or generic-looking renders. Regenerate any image that reads as generic stock.

---

## Phase B — Species worldwide expansion

After Wave 4 lands cleanly. Goal: turn the species section into a true global cryptid/wildlife codex — every continent, ocean discoveries, and extinct/critically-endangered tracks — each with a hero image matching the existing species visual standard.

### New entries (target ~60-70 additions, grouped)

- **Asia (incl. China)** — e.g. Yeren (China wildman), Almas (Mongolia), Mongolian Death Worm, Nguma-monene, Orang Pendek (Sumatra), Hibagon (Japan), Ahool (Java), Mongolian ibex sightings, Tibetan migou.
- **Australia & Oceania** — Yowie, Bunyip, Burrunjor, Queensland Tiger, Moehau (NZ), Megalania reports, Tasmanian Tiger modern sightings.
- **Africa** — Mokele-Mbembe, Kongamato, Emela-ntouka, Mngwa, Nandi Bear, Inkanyamba.
- **South America** — Mapinguari, Chupacabra (deep cut beyond existing), Minhocão, Ucumar, Cuero.
- **Europe** — Beast of Bodmin, Beast of Gévaudan, Lagarfljót Worm, Tatzelwurm.
- **Arctic / Antarctic** — Ningen, Tizheruk, Adlet.
- **Ocean — new findings (real, recent)** — Hadal snailfish (Mariana), Casper octopus, scaly-foot snail, yeti crab, deep-sea bigfin squid sightings, recently described Indonesian coelacanth populations, 2020s reef discoveries. Tag as "Verified discovery" vs "Cryptid report" so the grade system stays honest.
- **Extinct / recently lost** — Thylacine, Steller's sea cow, Caspian tiger, Pyrenean ibex, Baiji river dolphin, Pinta Island tortoise, Bramble Cay melomys, Po'ouli, Splendid poison frog.
- **Going extinct (critically endangered)** — Vaquita, Saola, Javan rhino, Sumatran rhino, Northern white rhino, Amur leopard, Yangtze finless porpoise, Kakapo, Axolotl (wild), Hawksbill.

### Data model touch-ups

Add to species entry type (only if not already present):

- `region: "Asia" | "Africa" | ...` for filtering
- `status: "cryptid" | "verified-discovery" | "extinct" | "critically-endangered"`
- `heroImage: string` (required for new entries; backfill existing if missing)
- Keep evidence-grade system as-is; new "verified-discovery" and "extinct" entries should carry strong grades (peer-reviewed, museum specimens, photo/video).

### UI touch-ups

- Add region + status filter chips to the species page so the larger dataset stays navigable.
- Section headers per region OR per status (pick whichever reads cleaner — likely region groups with status badges on cards).
- Reuse existing species card; ensure hero image area matches DossierCard treatment for visual consistency.

### Style lock for species images

Match the existing species set already shipped — same lighting, framing, and grade. Subtle region-tinted atmosphere (jungle green for SE Asia, ice blue for Arctic, bioluminescent deep blue for ocean finds, sepia/archival for extinct) but the creature stays the hero, photoreal, no generic stock energy.

---

## Out of scope

- No copy rewrites on existing entries beyond adding `heroImage`/`region`/`status` fields.
- No new pages — everything lands inside existing Species, Disclosure, and 46 surfaces.
- No animation work on hero images this pass.

## Execution order

1. Wave 3 (Pyramids → Stone Faces → Glyphs → Missing Scientists → Whistleblowers gaps)
2. Wave 4 (The 46 vault, with both sealed + unlocked treatments)
3. Species type/UI updates (region + status filters)
4. Species expansion in regional batches: Asia → Oceania → Africa → S. America → Europe → Arctic → Ocean discoveries → Extinct → Critically endangered

Verify in preview between each batch; regenerate any image that reads as generic before moving on.
