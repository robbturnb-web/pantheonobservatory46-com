

# Full End-to-End Verification + Cinematic Effects

## Current State

- **Build**: Clean — `tsc --noEmit` passes with zero errors
- **Runtime**: No runtime errors detected
- **Dev server**: Running smoothly on Vite 5
- **Pages**: All 13 routes wired in `App.tsx` with matching navbar links

---

## 1. Browser Testing — Every Route (Using Browser Tools)

Navigate to each of the 13 routes and verify:

| Route | Check |
|-------|-------|
| `/` (Home) | All 12 section cards render, links navigate correctly, stat counters animate |
| `/timeline` | Timeline entries render, source links open in new tabs |
| `/uap` | UAP cases expand, sources are clickable, YouTube embeds load |
| `/gods` | 18 gods render across pantheons, reference links work |
| `/consciousness` | Content renders, all interactive elements work |
| `/signals` | Signal ratings display, green/yellow/red badges correct |
| `/whistleblowers` | 8 profiles render, source links open, YouTube embeds load |
| `/telescopes` | Telescope cards render, expandable content works |
| `/galaxy` | 3D scene loads — planets, moons, asteroids, comets, Milky Way, constellations visible; tour button works; planet click opens info panel |
| `/pyramids` | 3D scene loads — 6 pyramids clickable, info panel shows sources and videos |
| `/echoverse` | Auth modal opens, channel list renders |
| `/origin` | Quiz questions render, selection works, result reveals archetype |
| `/echo` | Chat interface loads, message input works |

Also test on mobile viewport (384px) — navbar hamburger menu opens, all links accessible, panels don't overflow.

---

## 2. Cinematic Effects

Add CSS-based cinematic effects to `src/index.css` and update `Layout.tsx`:

### Film grain overlay
- CSS `::after` pseudo-element on `body` with a subtle noise texture using SVG filter (`feTurbulence`)
- Very low opacity (0.03) so it's atmospheric but not distracting

### Vignette
- CSS `::before` on the main content wrapper with `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)`
- Fixed position, pointer-events: none, z-index above content but below modals

### Cinematic letterbox bars (optional subtle)
- Thin (2-3px) gradient bars at top/bottom of viewport for a widescreen cinema feel
- Only visible on desktop (hidden on mobile)

### Ambient light flicker
- New keyframe animation `@keyframes ambient-flicker` that subtly varies the background brightness
- Applied to the starfield container

### Page transition enhancement
- Update `Layout.tsx` page variants to include a brief scale shift (0.98 → 1) for a cinematic "camera push" on page enter

### Files changed:
- `src/index.css` — Add film grain, vignette, letterbox, ambient flicker keyframes
- `src/components/Layout.tsx` — Add vignette wrapper div, update page transition variants with scale

---

## 3. Fix Any Issues Found During Testing

If browser testing reveals broken links, missing content, or UI issues, those will be fixed inline during implementation.

