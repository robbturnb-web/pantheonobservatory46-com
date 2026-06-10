/**
 * Seed mission catalog. Progress lives in localStorage for v1 — see
 * `useMissionProgress` in `src/hooks/use-mission-progress.ts`.
 */

export type MissionCategory = 'research' | 'observation' | 'archive' | 'community' | 'tutorial';

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: MissionCategory;
  /** Total units (videos to watch, sources to read, etc.) to complete. */
  target: number;
  xpReward: number;
}

export const MISSIONS: Mission[] = [
  {
    id: 'watch-3-uap-hearings',
    title: 'Watch 3 verified UAP hearing videos',
    description: 'Open three official UAP / AARO / Congressional hearing recordings.',
    category: 'observation',
    target: 3,
    xpReward: 60,
  },
  {
    id: 'read-5-official-sources',
    title: 'Read 5 official NASA/NOAA sources',
    description: 'Open five primary sources from NASA, NOAA, USGS or another government agency.',
    category: 'research',
    target: 5,
    xpReward: 75,
  },
  {
    id: 'starseed-beginner',
    title: 'Complete the Starseed beginner path',
    description: 'Run the Star-Seed Terminal birth-date classifier and read your origin dossier.',
    category: 'tutorial',
    target: 1,
    xpReward: 100,
  },
  {
    id: 'compare-myth-vs-official',
    title: 'Compare one myth against one official source',
    description: 'Pick a god / lore entry and an official scientific source, then read both.',
    category: 'research',
    target: 1,
    xpReward: 50,
  },
  {
    id: 'report-broken-link',
    title: 'Report one broken link',
    description: 'Help the archive stay clean — report any source that no longer loads.',
    category: 'community',
    target: 1,
    xpReward: 40,
  },
  {
    id: 'save-3-sources',
    title: 'Save 3 sources to your archive',
    description: 'Bookmark three verified sources you want to return to.',
    category: 'archive',
    target: 3,
    xpReward: 45,
  },
  {
    id: 'facts-vs-speculation',
    title: 'Complete the “Facts vs Speculation” tutorial',
    description: 'Learn how Pantheon labels verified facts, lore, and speculation.',
    category: 'tutorial',
    target: 1,
    xpReward: 80,
  },
];
