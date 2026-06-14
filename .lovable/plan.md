## Goal

Turn the Solar, Orbital, Seismic, and Atmosphere chambers on `/live-feeds` from static themed cards into **live instruments** by layering real imagery and maps over the existing AI hero plates.

## What ships

### 1. Solar Chamber → Live SDO sun disk
- Add a circular inset (top-right of the chamber, ~180px) showing NASA SDO's latest AIA 304 (chromosphere, orange-red) image.
- Source: `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0304.jpg` — public, no key, refreshed ~every 15 min upstream.
- Soft cyan glow ring, "SDO · AIA 304 · LIVE" caption with timestamp.
- Auto-refresh every 5 min via cache-busting query param.

### 2. Orbital Chamber → Live ISS ground track
- Replace the plain lat/lon text panel with a small (full-width, ~200px tall) world-map strip showing the ISS marker on its current position.
- Use static Mapbox image API (no JS, no globe rendering) — single `<img>` with marker overlay. Falls back to a CSS world-map silhouette + dot if the Mapbox token is missing.
- Reuses existing `useISS()` hook — no new data fetch.
- Updates every 15s with the existing ISS polling.

### 3. Seismic Chamber → Pulsing quake markers strip
- Add a horizontal "fault-line ribbon" below the count: a 100%-width SVG showing the last 24h of quakes as pulsing dots positioned by longitude, sized by magnitude, colored by depth.
- Pure SVG, driven off existing `useEarthquakes()` data — no new APIs.
- Strongest quake gets a larger crimson pulse animation.

### 4. Atmosphere Chamber → NOAA GOES IR loop
- Add an inset (same treatment as Solar) showing the latest GOES-East IR satellite snapshot.
- Source: `https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/13/1250x750.jpg` — public, no key.
- "GOES-16 · Band 13 IR · LIVE" caption.

### 5. Shared `LiveImageInset` component
- New `src/components/command/LiveImageInset.tsx` — reusable circular/rounded inset with:
  - Image URL + alt
  - Caption (source label)
  - Auto-refresh interval (ms)
  - Theme color (gold/cyan/sky) for the glow ring
  - Loading shimmer + graceful fallback if the upstream image 404s

## Technical details

### Files created
- `src/components/command/LiveImageInset.tsx` — shared inset component
- `src/components/command/SeismicRibbon.tsx` — SVG quake ribbon
- `src/components/command/IssTrackStrip.tsx` — ISS mini-map strip

### Files edited
- `src/components/command/LiveChamber.tsx` — add optional `topRightInset` slot rendered absolutely over the hero plate
- `src/pages/LiveFeedsPage.tsx` — wire the four new visual components into their chambers

### No backend changes
- All four image sources are public CDNs (NASA SDO, NOAA NESDIS) — no NASA key, no edge function, no secrets, no migrations.
- Mapbox: optional. If a `VITE_MAPBOX_TOKEN` exists I'll use the static-image API; otherwise I render a clean SVG world silhouette with the ISS dot. Either way it ships.

### Performance
- All four image inserts use `loading="lazy"` and `decoding="async"`.
- Auto-refresh uses `setInterval` cleared on unmount; cache-buster appended only on refresh, not on initial mount, so the browser HTTP cache works.
- Total added weight: ~3 small JPGs (~150KB combined), only loaded once a chamber scrolls into view.

### Accessibility & motion
- Pulse animations on the seismic ribbon respect `prefers-reduced-motion` (existing `MotionConfig reducedMotion="user"` already wraps the page).
- All images have meaningful `alt` text describing the live source.

## What stays the same

- All existing data hooks, status badges, chamber themes, hero plates, copy, and routes.
- Codex, Anomaly chambers — unchanged (no upstream live image source that fits).
- Framer Motion stagger reveal continues to work; insets fade in with their parent chamber.

## Result

Solar gets a real sun. Orbital gets a real moving ISS. Seismic gets a real pulse from real quakes. Atmosphere gets a real satellite view. Zero new dependencies, zero new secrets, zero backend work — just the existing public NASA/NOAA endpoints and the data hooks already in the project.
