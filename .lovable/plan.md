
User chose hand-curated route. Skip the API key, skip the edge function. Just build the data file + hub page + contextual embeds. `VideoEmbed` component already exists.

## Plan: Hand-curated video hub + contextual embeds

### 1. New data file `src/data/frequencies.ts`
Hand-curated creator + video list, easy to edit. Shape:
```ts
{
  id, name, platform: 'YouTube' | 'TikTok',
  channelUrl, rating: 'GREEN'|'YELLOW'|'RED',
  description, topics: ['UAP','energy',...],
  videos: [{ platform, id, title, topic? }]
}
```
Seeded creators (with placeholder video IDs you can swap):
- **Stefan Burns** (YouTube) — energy, schumann, solar — GREEN
- **The Why Files** (YouTube) — UAP, mysteries — YELLOW
- **UFO_LAW** (TikTok) — UAP news — YELLOW
- **Massi Maredona** (TikTok) — disclosure — YELLOW
- **Bob Lazar / interviews** (YouTube) — S4, Element 115 — YELLOW
- **Ross Coulthart** (YouTube clips) — disclosure — GREEN

I'll add 3–4 video IDs per creator as starter content with a clear `// TODO: replace with real IDs` comment so you know where to edit.

### 2. New page `src/pages/FrequenciesPage.tsx`
Route: `/frequencies`. Layout:
- Hero: "FREQUENCIES — Voices We Track"
- Filter chips: All / UAP / Energy / Disclosure / Consciousness
- Rating filter: All / GREEN / YELLOW
- Creator cards (glass-cosmic) → expand to show their videos in a responsive grid using existing `VideoEmbed`
- Each card shows: name, platform badge, rating dot, description, channel link, video grid

### 3. Contextual embeds (3 strips)
Add a small `<VideoStrip topic="..." limit={3} />` component that pulls from `frequencies.ts` matching the topic:
- **HomePage** → "Latest Transmissions" strip (mixed topics, 3 videos)
- **UAPPage** → "From the Field" strip (topic: UAP, 3 videos)
- **EarthPulsePage** → "Stefan Burns + Energy Updates" strip (topic: energy, 3 videos)

### 4. Navbar
Add "Frequencies" link between existing items (after Echo or near Signals — I'll place it after Signals for thematic fit).

### 5. App.tsx
Register `/frequencies` route.

### Reuses (no rewrites)
- `VideoEmbed` + `VideoList` already handle YouTube + TikTok rendering
- Glass-cosmic + sacred/mystic/cosmic tokens already in place
- `creators.ts` stays as-is (about creators in general); `frequencies.ts` is purely the video feed

### Out of scope
- No API, no edge function, no auto-fetch
- No auth, no favoriting (can add later)
- No TikTok script loader — embeds use the existing blockquote fallback

### How you edit later
Open `src/data/frequencies.ts`, paste a new YouTube ID (the part after `v=`) or TikTok video ID into the `videos` array — that's it. I'll add inline comments showing exactly where.
