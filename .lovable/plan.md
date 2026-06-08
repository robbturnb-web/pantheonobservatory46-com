# Fix All Four Gaps

Knocking out everything surfaced in the audit, in priority order.

## 1. Pantheon-styled 404 page

Replace the default gray `NotFound.tsx` with a cosmic-themed page matching the rest of Pantheon.

- Obsidian + deep cosmic violet background, starfield layer
- "Signal Lost" headline (Cinzel) + flavor copy
- Glitched `404` numerals with subtle motion
- CTA buttons back to Home, Echo, Observatory
- `<SEO>` with `noindex` + proper title
- Reuse `RealmAtmosphere` base for consistency

## 2. SEO across all missing realm pages

Add `<SEO>` (title, meta description, canonical, og:*, JSON-LD) to every page currently missing it:

- `/timeline`
- `/signals`
- `/telescopes`
- `/jwst` (replace manual `document.title` with `<SEO>`)
- `/pyramids`
- `/frequencies`
- `/species`
- `/shadow-pantheon`
- `/aaro`
- `/crash-retrieval`
- `/underground`
- `/encounters`
- `/glyphs`
- `/stone-faces`
- `/extinct`
- `/cern`

Each gets:
- Unique title `< 60 chars` (realm-flavored)
- Meta description `< 160 chars`
- Canonical = `https://pantheonobservatory46-com.lovable.app{path}`
- og:title / og:description / og:type=website
- JSON-LD `WebPage` (or `CollectionPage` for index-style pages like Signals/Species)
- Update `public/sitemap.xml` to include any newly-public routes that are missing

## 3. Signals page — full atmospheric pass

Currently bare bones. Add:

- Hero block: "Live Signal Feed" headline, realm-tinted gradient, signal-online pulse indicator
- Atmospheric backdrop (`RealmAtmosphere` + subtle scanline overlay)
- Stat strip: total signals, active today, by-realm counts
- Improved filter chips styled with realm tokens (not bare buttons)
- Echo handoff card at bottom: "Ask Echo about a signal →"
- Keep existing filter/list logic untouched — pure presentation upgrade

## 4. Observatory landing (`/telescopes`) — stronger identity

Currently thin compared to JWST sub-page. Add:

- Hero: "The Pantheon Observatory" (Cinzel) + tagline, royal-violet glow
- Atmospheric backdrop with rotating star layer
- Telescope roster cards (JWST, Hubble, Chandra, Spitzer, future entries) with hover states and "Enter" CTAs
- "What we watch" strip: deep field, exoplanets, transients, anomalies
- Echo handoff card
- `<SEO>` with `CollectionPage` JSON-LD listing child telescope pages

## Technical Notes

- Color tokens only — `text-realm-*`, `text-signal-*`, `bg-cosmic-*` (no hardcoded hex)
- Reuse existing `<SEO>` component (already used on Home, Gods, Consciousness, etc.)
- Reuse `RealmAtmosphere`, glass card utilities, framer-motion presets already in the project
- No new dependencies
- No business logic changes — presentation + metadata only

## Out of Scope

- Echo AI prompt tuning
- New backend tables / RLS
- New telescope data integrations (JWST page already covers deep dive)

## Order of Execution

1. NotFound redesign (smallest, isolated)
2. SEO sweep across the 16 pages + sitemap update
3. Signals atmospheric pass
4. Observatory landing rebuild
5. Quick visual QA in preview at mobile + desktop widths
