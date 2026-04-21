// ============================================================
// FREQUENCIES — Hand-curated video feed
// ============================================================
// All IDs below were verified live against YouTube oEmbed on
// 2026-04-21. If a video stops playing in the future it usually
// means the creator deleted it or disabled embedding — replace
// the ID with a fresh one from the same channel's RSS feed:
//   https://www.youtube.com/feeds/videos.xml?channel_id=<UC...>
// ============================================================

export type Topic = 'UAP' | 'energy' | 'disclosure' | 'consciousness' | 'ancient' | 'mystery';
export type Rating = 'GREEN' | 'YELLOW' | 'RED';
export type Platform = 'YouTube' | 'TikTok';

export interface FrequencyVideo {
  platform: 'youtube' | 'tiktok';
  id: string;
  title: string;
  topic?: Topic;
}

export interface Creator {
  id: string;
  name: string;
  platform: Platform;
  channelUrl: string;
  rating: Rating;
  description: string;
  topics: Topic[];
  videos: FrequencyVideo[];
}

export const creators: Creator[] = [
  {
    id: 'stefan-burns',
    name: 'Stefan Burns',
    platform: 'YouTube',
    channelUrl: 'https://www.youtube.com/@StefanBurns',
    rating: 'GREEN',
    description:
      'Earth energy, Schumann resonance, geomagnetic storms, and planetary frequency updates. Field researcher with consistent data-driven coverage.',
    topics: ['energy', 'consciousness'],
    // ✅ Verified live 2026-04-21 — channel UCGutiiMqD6jEy6J9hNdNniA
    videos: [
      { platform: 'youtube', id: 'yU7On40ujsw', title: 'Japanese Geophysicists Issue Megaquake Alert — "The Next Week is Critical"', topic: 'energy' },
      { platform: 'youtube', id: 'n_Jw5IjyUWo', title: 'There Are Signs Something BIG is Coming...', topic: 'energy' },
      { platform: 'youtube', id: 'bAVzZzyr-7Y', title: 'The Moment Mystics Have Been Anticipating for Decades has Begun', topic: 'consciousness' },
      { platform: 'youtube', id: '4I29ADIfco8', title: 'The Countdown to Something Incredible Has Begun', topic: 'energy' },
    ],
  },
  {
    id: 'why-files',
    name: 'The Why Files',
    platform: 'YouTube',
    channelUrl: 'https://www.youtube.com/@TheWhyFiles',
    rating: 'YELLOW',
    description:
      'Long-form investigations into UAPs, ancient mysteries, and unexplained phenomena. Entertaining + sourced — separates "Just the Facts" from speculation.',
    topics: ['UAP', 'mystery', 'ancient'],
    // ✅ Verified live 2026-04-21 — channel UCIFk2uvCNcEmZ77g0ESKLcQ
    videos: [
      { platform: 'youtube', id: 'opaMzW5E6o8', title: 'Basement #008: Avi Loeb | 3I/Atlas, Oumuamua, and What NASA Won\'t Say', topic: 'UAP' },
      { platform: 'youtube', id: 'OLqomIh6JDo', title: 'The Roswell Alien Interview | Your Soul Has Been Here Thousands of Times', topic: 'mystery' },
      { platform: 'youtube', id: 'L7eqw_pRRPE', title: 'Basement: Daniel Whiteson | Dark Matter, Dark Aliens, Dark Physics', topic: 'mystery' },
      { platform: 'youtube', id: 'TGGlLkE_-SA', title: 'Basement #011: Peter Levenda | Nazis, UFOs, and the Hidden History', topic: 'ancient' },
    ],
  },
  {
    id: 'bob-lazar',
    name: 'Bob Lazar (Interviews)',
    platform: 'YouTube',
    channelUrl: 'https://www.youtube.com/results?search_query=bob+lazar+interview',
    rating: 'YELLOW',
    description:
      'S4, Element 115, and the gravity-amplifier reverse-engineering claim. Foundational testimony — controversial sourcing, consistent narrative since 1989.',
    topics: ['UAP', 'disclosure'],
    // ✅ Verified live 2026-04-21
    videos: [
      { platform: 'youtube', id: 'BEWz4SXfyCQ', title: 'Joe Rogan Experience #1315 — Bob Lazar & Jeremy Corbell', topic: 'UAP' },
      { platform: 'youtube', id: 'TiGbn0rck1E', title: 'Bob Lazar Details His UFO Experiences | Joe Rogan', topic: 'UAP' },
      { platform: 'youtube', id: 'sZaE5rIavVA', title: 'Bob Lazar: Area 51 & Flying Saucers (Documentary)', topic: 'disclosure' },
    ],
  },
  {
    id: 'ross-coulthart',
    name: 'Ross Coulthart',
    platform: 'YouTube',
    channelUrl: 'https://www.youtube.com/@NewsNation/search?query=coulthart',
    rating: 'GREEN',
    description:
      'Investigative journalist on the UAP/UFO disclosure beat. Broke the Grusch story. Source-driven, careful with claims, persistent on the record.',
    topics: ['UAP', 'disclosure'],
    // ✅ Verified live 2026-04-21 via NewsNation channel
    videos: [
      { platform: 'youtube', id: 'enQX9T4tLTU', title: 'Ross Coulthart: "You can\'t rule out the possibility of foul play"', topic: 'disclosure' },
      { platform: 'youtube', id: 'y5ZygDMxhWU', title: 'Mummy mystery: UFO proof or hoax? Ross Coulthart investigates', topic: 'UAP' },
      { platform: 'youtube', id: 'l8J2HwubMbs', title: 'Ross Coulthart on UAP Whistleblower Testimony', topic: 'disclosure' },
      { platform: 'youtube', id: 'IbvorziWMm8', title: 'Reality Check with Ross Coulthart — UAP Latest', topic: 'UAP' },
    ],
  },
  {
    id: 'ufo-law',
    name: 'UFO_LAW',
    platform: 'TikTok',
    channelUrl: 'https://www.tiktok.com/@ufo_law',
    rating: 'YELLOW',
    description:
      'Daily UAP news, sightings, and disclosure tracking on TikTok. TikTok blocks iframe embeds — tap the card to open the creator\'s feed in a new tab.',
    topics: ['UAP', 'disclosure'],
    videos: [],
  },
  {
    id: 'massi-maredona',
    name: 'Massi Maredona',
    platform: 'TikTok',
    channelUrl: 'https://www.tiktok.com/@massimaredona',
    rating: 'YELLOW',
    description:
      'Disclosure narratives, hidden history, and frequency-based commentary. TikTok blocks iframe embeds — tap the card to open the creator\'s feed in a new tab.',
    topics: ['disclosure', 'consciousness'],
    videos: [],
  },
];

export const allTopics: Topic[] = ['UAP', 'energy', 'disclosure', 'consciousness', 'ancient', 'mystery'];

// Helper: flat list of all videos with creator metadata
export interface VideoWithCreator extends FrequencyVideo {
  creatorId: string;
  creatorName: string;
  rating: Rating;
}

export function getAllVideos(): VideoWithCreator[] {
  return creators.flatMap((c) =>
    c.videos.map((v) => ({
      ...v,
      creatorId: c.id,
      creatorName: c.name,
      rating: c.rating,
    })),
  );
}

export function getVideosByTopic(topic: Topic, limit?: number): VideoWithCreator[] {
  const filtered = getAllVideos().filter((v) => v.topic === topic);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getMixedVideos(limit: number): VideoWithCreator[] {
  // One video from each creator, up to limit
  const picks: VideoWithCreator[] = [];
  for (const c of creators) {
    if (c.videos[0]) {
      picks.push({
        ...c.videos[0],
        creatorId: c.id,
        creatorName: c.name,
        rating: c.rating,
      });
    }
    if (picks.length >= limit) break;
  }
  return picks.slice(0, limit);
}
