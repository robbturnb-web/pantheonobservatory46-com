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
    // TODO: replace with real video IDs from https://www.youtube.com/@StefanBurns/videos
    videos: [
      { platform: 'youtube', id: 'OoNQpIfLmFA', title: 'Schumann Resonance Update', topic: 'energy' },
      { platform: 'youtube', id: 'tH2w6Oxx0kQ', title: 'Solar Storm Forecast', topic: 'energy' },
      { platform: 'youtube', id: 'b6N6JnLk4yI', title: 'Earth Energy Pulse', topic: 'energy' },
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
    // TODO: replace with real video IDs
    videos: [
      { platform: 'youtube', id: 'gO3kOaQ8YTo', title: 'The Phoenix Lights', topic: 'UAP' },
      { platform: 'youtube', id: 'Iaa8j5fVHTU', title: 'Ancient Anomalies', topic: 'ancient' },
      { platform: 'youtube', id: '0w9o3KZkP1k', title: 'UAP Whistleblowers', topic: 'UAP' },
    ],
  },
  {
    id: 'ufo-law',
    name: 'UFO_LAW',
    platform: 'TikTok',
    channelUrl: 'https://www.tiktok.com/@ufo_law',
    rating: 'YELLOW',
    description:
      'Daily UAP news, sightings, and disclosure tracking. Fast-moving feed pulling from active military and pilot reports.',
    topics: ['UAP', 'disclosure'],
    // TODO: replace with real TikTok video IDs (the long number from the URL)
    videos: [
      { platform: 'tiktok', id: '7384712345678901234', title: 'Latest UAP Sighting', topic: 'UAP' },
      { platform: 'tiktok', id: '7384712345678901235', title: 'Disclosure Update', topic: 'disclosure' },
    ],
  },
  {
    id: 'massi-maredona',
    name: 'Massi Maredona',
    platform: 'TikTok',
    channelUrl: 'https://www.tiktok.com/@massimaredona',
    rating: 'YELLOW',
    description:
      'Disclosure narratives, hidden history, and frequency-based commentary. Independent voice tracking the disclosure rollout in real time.',
    topics: ['disclosure', 'consciousness'],
    // TODO: replace with real TikTok video IDs
    videos: [
      { platform: 'tiktok', id: '7384712345678901236', title: 'Disclosure Breakdown', topic: 'disclosure' },
      { platform: 'tiktok', id: '7384712345678901237', title: 'Hidden History Drop', topic: 'disclosure' },
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
    // TODO: replace with real video IDs
    videos: [
      { platform: 'youtube', id: 'V44a7yJUaGY', title: 'Bob Lazar — Joe Rogan Interview', topic: 'UAP' },
      { platform: 'youtube', id: 'AhIAUFXyOQM', title: 'Element 115 Explained', topic: 'UAP' },
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
    // TODO: replace with real video IDs
    videos: [
      { platform: 'youtube', id: 'syQVcr_Yexw', title: 'Coulthart on Grusch Hearings', topic: 'disclosure' },
      { platform: 'youtube', id: 'qvmVSvPUpAg', title: 'Reverse Engineering Programs', topic: 'UAP' },
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
