import type { Track } from './audio-engine';

export type PlaylistKey = 'cosmos' | 'ancient' | 'disclosure';

export const PLAYLISTS: Record<PlaylistKey, Track[]> = {
  cosmos: [
    { src: '/audio/cosmos1.mp3', label: 'Deep Space' },
    { src: '/audio/cosmos2.mp3', label: 'Nebula Drift' },
  ],
  ancient: [
    { src: '/audio/ancient1.mp3', label: 'Temple Echo' },
    { src: '/audio/ancient2.mp3', label: 'Lost Civilizations' },
  ],
  disclosure: [
    { src: '/audio/disclosure1.mp3', label: 'Signal Pulse' },
    { src: '/audio/disclosure2.mp3', label: 'Dark Briefing' },
  ],
};

export const PLAYLIST_LABELS: Record<PlaylistKey, string> = {
  cosmos: 'Cosmos',
  ancient: 'Ancient',
  disclosure: 'Disclosure',
};
