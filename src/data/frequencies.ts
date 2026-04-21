// ============================================================
// FREQUENCIES — Hand-curated video feed
// ============================================================
// HOW TO EDIT:
//   YouTube: paste the ID from the URL after `v=`
//     e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  id: 'dQw4w9WgXcQ'
//   TikTok:  paste the long number from the URL
//     e.g. https://www.tiktok.com/@user/video/7384712345678901234  →  id: '7384712345678901234'
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
    // Verified evergreen IDs from @StefanBurns — Schumann + geomagnetic series
    videos: [
      { platform: 'youtube', id: 'sm0X4ZiZdcA', title: 'Schumann Resonance & Solar Activity', topic: 'energy' },
      { platform: 'youtube', id: '0lPm_J7yfLY', title: 'Geomagnetic Storm Forecast', topic: 'energy' },
      { platform: 'youtube', id: 'BwtR6Q1nJzs', title: 'Earth Energy Frequency Update', topic: 'energy' },
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
    videos: [
      { platform: 'youtube', id: 'h3qKJqRJtmc', title: 'The Phoenix Lights — What Really Happened', topic: 'UAP' },
      { platform: 'youtube', id: 'wAKxFm5Q8Lk', title: 'Skinwalker Ranch Files', topic: 'mystery' },
      { platform: 'youtube', id: 'sqBh9SnZmu8', title: 'The Mandela Effect Explained', topic: 'mystery' },
    ],
  },
  {
    id: 'ufo-law',
    name: 'UFO_LAW',
    platform: 'TikTok',
    channelUrl: 'https://www.tiktok.com/@ufo_law',
    rating: 'YELLOW',
    description:
      'Daily UAP news, sightings, and disclosure tracking. TikTok blocks iframe embeds — videos open in a new tab on the creator\'s feed.',
    topics: ['UAP', 'disclosure'],
    // TikTok IDs cannot be reliably verified server-side; clicking opens the channel feed
    videos: [],
  },
  {
    id: 'massi-maredona',
    name: 'Massi Maredona',
    platform: 'TikTok',
    channelUrl: 'https://www.tiktok.com/@massimaredona',
    rating: 'YELLOW',
    description:
      'Disclosure narratives, hidden history, and frequency-based commentary. TikTok blocks iframe embeds — videos open in a new tab on the creator\'s feed.',
    topics: ['disclosure', 'consciousness'],
    videos: [],
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
    videos: [
      { platform: 'youtube', id: 'PSwP-KglEKU', title: 'Bob Lazar — Joe Rogan Experience #1315', topic: 'UAP' },
      { platform: 'youtube', id: 'cPwBlXgzbxc', title: 'Bob Lazar — Area 51 & Element 115', topic: 'UAP' },
    ],
  },
  {
    id: 'ross-coulthart',
    name: 'Ross Coulthart',
    platform: 'YouTube',
    channelUrl: 'https://www.youtube.com/results?search_query=ross+coulthart',
    rating: 'GREEN',
    description:
      'Investigative journalist on the UAP/UFO disclosure beat. Broke the Grusch story. Source-driven, careful with claims, persistent on the record.',
    topics: ['UAP', 'disclosure'],
    videos: [
      { platform: 'youtube', id: 'pHCpmlZ5RFo', title: 'Ross Coulthart on UAP Disclosure', topic: 'disclosure' },
      { platform: 'youtube', id: 'iCFVWDnj7Bs', title: 'Need To Know — Coulthart & Knapp', topic: 'UAP' },
    ],
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
