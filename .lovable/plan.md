## Goal

Add an **Experts** feature to Pantheon Observatory using the page layout you supplied (hero with portrait, bio, Knowledge / Videos tabs, social links). Stefan Burns is the first expert; the system supports adding more (Bob Lazar, Steven Greer, Garry Nolan, etc.) by dropping data files.

Your snippet ships its own `tailwind.config.js`. We will **NOT overwrite** the project's existing Tailwind + CSS-variable design system — it already defines `sacred`, `mystic`, `cosmic`, `clarity`, `space`, `alert`, `gold`, plus glow shadows. Instead we'll port the few missing tokens (`divine`, `sacred-dark`, `cosmic-light`, custom gradient backgrounds, `shadow-neon-*`) into `tailwind.config.ts` + `src/index.css` so existing pages keep working.

---

## What gets built

### 1. Expert data layer
- `src/data/experts.ts` — typed `Expert[]` array
  - Types: `Expert`, `ExpertKnowledgeItem` (categories: `disclosure | testimony | research | theory`), `ExpertVideo` (reuses existing `VideoData` shape)
  - Seeded with **Stefan Burns** entry from your snippet
  - Image field points at `/images/experts/stefan-burns.jpg` (placeholder until you upload one — falls back to `/placeholder.svg`)

### 2. Routes
- `src/pages/ExpertsIndexPage.tsx` — grid of all experts (portrait + name + title + expertise chips)
- `src/pages/ExpertProfilePage.tsx` — the detailed page you provided, refactored to:
  - Use `useParams()` to read `:slug` and look up the expert
  - 404 to the existing `NotFound` page if slug not found
  - Replace inline YouTube `<iframe>` with the project's existing `<VideoEmbed>` (handles invalid IDs, lite-YT thumbnail, TikTok fallback)
  - Replace inline TikTok `<blockquote>` + script tag with `<VideoEmbed>` (no third-party script injection)
- Register both in `src/App.tsx`:
  - `/experts` → `ExpertsIndexPage`
  - `/experts/:slug` → `ExpertProfilePage`
  - Both lazy-loaded like the rest

### 3. Wire into the existing app
- Add a **"Voices"** entry to `src/components/Navbar.tsx` linking to `/experts`
- Update the existing `StefanLocator` card (`src/components/cosmic/StefanLocator.tsx`) so its title links to `/experts/stefan-burns`
- Add an "Experts" cross-link from `WhistleblowerVaultPage` and `UAPPage`

### 4. Design-system alignment (no breakage)
Add only the missing tokens to `tailwind.config.ts` and `src/index.css`:
- Colors: `divine` (`#ffd700` / warm / dark), `sacred.dark` (`#009955`), `cosmic.light` (`#6a9fd8`), `mystic.darkest`, `alert.glow`
- `backgroundImage`: `cosmic-gradient`, `purple-green`, `purple-blue`, `green-cyan`, `full-spectrum`
- `boxShadow`: `neon-green`, `neon-purple`, `neon-blue`, `cosmic`
- Keep all existing `--hub-*`, `--accent-*` variables intact

### 5. Component polish (vs. raw snippet)
- Wrap page in the existing `<SEO>` component for title/description
- Use `framer-motion` fade-in to match the rest of the site (Layout already wraps routes in transitions)
- Mobile responsive: hero collapses portrait above name on `< sm`, tabs become scrollable
- Tab state persists in URL (`?tab=videos`) so links share-able
- Dead social link buttons (no URL) are hidden, not rendered as broken `<a>`

---

## File map

```text
src/
├─ data/
│  └─ experts.ts                  NEW  — Expert type + Stefan Burns seed
├─ pages/
│  ├─ ExpertsIndexPage.tsx        NEW  — grid of experts
│  └─ ExpertProfilePage.tsx       NEW  — detailed profile (your layout, refactored)
├─ components/
│  ├─ Navbar.tsx                  EDIT — add "Voices" link
│  └─ cosmic/StefanLocator.tsx    EDIT — title links to profile
├─ App.tsx                        EDIT — register /experts + /experts/:slug
├─ index.css                      EDIT — add divine + missing tokens
└─ tailwind.config.ts             EDIT — add backgroundImage, boxShadow, divine palette
```

No existing files are deleted. No CSS variables are renamed.

---

## Out of scope (ask if you want any of these)

- Admin UI for adding experts via a form (currently they're added by editing `experts.ts`)
- Storing experts in Lovable Cloud / database
- Auto-fetching the expert's latest YouTube uploads (would need YouTube Data API key)
- AI-generated expert bios

---

## After approval

I'll implement all files in one pass, including a placeholder portrait fallback so the page renders even before you upload Stefan's photo. You'll be able to navigate to `/experts/stefan-burns` immediately.