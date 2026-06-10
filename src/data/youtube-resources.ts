import type { YouTubeResource } from '@/components/cards/YouTubeResourceCard';

/**
 * Seed YouTube resource catalog.
 *
 * ⚠️ Every entry below is marked `needsRealId: true` until a verified,
 * embeddable video ID is supplied. The card will render a "Needs real
 * video ID" notice — never a broken / dead embed.
 */
export const YOUTUBE_RESOURCES: YouTubeResource[] = [
  {
    title: 'Congressional UAP Hearing — Opening Statements',
    channel: 'C-SPAN',
    videoId: '__REPLACE_ME__',
    category: 'UAP Hearings',
    trust: 'OFFICIAL_SOURCE',
    needsRealId: true,
  },
  {
    title: 'NASA — Live ISS Earth View',
    channel: 'NASA',
    videoId: '__REPLACE_ME__',
    category: 'Space · ISS',
    trust: 'OFFICIAL_SOURCE',
    needsRealId: true,
  },
  {
    title: 'NOAA SWPC — Space Weather Briefing',
    channel: 'NOAA',
    videoId: '__REPLACE_ME__',
    category: 'Space Weather',
    trust: 'OFFICIAL_SOURCE',
    needsRealId: true,
  },
];
