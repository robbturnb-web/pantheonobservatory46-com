I hear you. The next pass needs to be a fidelity rebuild, not another loose “inspired by” treatment. Here’s the plan I’ll execute after you approve.

## What I’ll change

### 1. Fix the homepage 46 symbol to match your reference
- Replace the current generated 46 emblem direction with a closer recreation of your uploaded reference:
  - massive central golden 46
  - cracked temple gate behind it
  - two Anubis guardian statues flanking it
  - vertical gold energy beam through the center
  - purple/cyan nebula and sacred compass ring behind it
- Keep it as the true homepage centerpiece, not a small decorative badge.
- Make the 46 symbol clickable and route it into `/the-46`.
- Keep the 12 gods around it, but make them feel like a sacred orbit/compass instead of random little bubbles.

### 2. Add all major categories to the left sidebar
I’ll expand the left rail beyond the current core few items so it covers the actual Pantheon sections, with icons and correct routes:
- Home
- The 46
- Disclosure
- UAP Cases
- Whistleblowers
- Crash Retrieval
- Underground Bases
- Missing Scientists
- Mythology / Gods
- Consciousness
- Frequencies
- Observatory / Galaxy
- Earth Pulse
- Echo AI
- Profile / Settings

On mobile, these will stay available in the horizontal category strip so nothing disappears.

### 3. Real human photos for whistleblowers and missing scientists
- Replace emoji/silhouette placeholders with real portrait fields in the data models.
- For whistleblowers, add real publicly available image assets for people such as Bob Lazar, David Grusch, Lue Elizondo, Steven Greer, Phil Schneider, Gary McKinnon, Mark McCandlish, etc., where reliable public imagery is available.
- For missing scientists, replace generic silhouettes with real portraits only where a credible public image can be sourced. If a verified image cannot be sourced, I’ll use a clearly labeled classified-file treatment rather than inventing a fake face.
- No fake AI faces for real people.
- No animated/cartoon portraits for real people.

### 4. Upgrade the Whistleblower Vault visually
- Rebuild the cards from “simple accordion cards” into classified dossier cards:
  - real portrait thumbnail
  - black-project document styling
  - evidence badge
  - status strip
  - source/video actions
  - cinematic hover states
- Keep everything clickable and expandable.
- Preserve evidence grades and existing sources.

### 5. Upgrade Missing Scientists visually
- Move it away from the current beige newspaper look and into the Pantheon temple/intelligence aesthetic.
- Add real portraits where verified.
- Keep the investigative seriousness, but make it feel like a classified observatory dossier wall.
- Keep full details, tabs, theories, sources, and modal behavior workable.

### 6. Make the Gods collage hit harder
- Upgrade `/gods` and the homepage “The Gods Return” preview:
  - bigger, more regal cards
  - stronger gold/purple temple atmosphere
  - improved portrait cropping
  - stronger hover glow and dossier interaction
  - better hierarchy by pantheon
- Keep all gods clickable and opening dossiers.

### 7. Match the reference-image style across all portal cards
For Disclosure, Mythology, Consciousness, Observatory, and Echo:
- Use the uploaded images as the visual standard.
- Make each card feel like a portal poster:
  - thick holographic glass border
  - cinematic background image
  - large title
  - “ENTER PORTAL” button treatment
  - glowing cyan/purple/gold energy accents
- Keep every card linked to its real route.

## Technical notes
- I’ll keep this frontend-only unless real image sourcing requires adding asset files.
- I won’t use fake generated faces for real people.
- I’ll use local imported assets, not random hotlinked images in components.
- I’ll keep existing routing and data structure intact, extending it where needed.
- I’ll verify the mobile viewport since you’re currently viewing it around 384px wide.

## Expected result
The homepage becomes the true Temple Observatory dashboard: left category rail, cinematic portal grid, real data-card atmosphere, and a central Pantheon 46 compass that actually looks like the temple gate/Anubis/gold-energy reference you showed — not just a generic gold coin.