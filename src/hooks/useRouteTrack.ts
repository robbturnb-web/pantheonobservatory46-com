import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import type { PlaylistKey } from '@/lib/audio/playlists';

const DISCLOSURE_ROUTES = new Set([
  '/uap',
  '/whistleblowers',
  '/missing',
  '/the-46',
  '/video-vault',
  '/aaro',
  '/crash-retrieval',
  '/underground',
  '/signals',
  '/encounters',
]);

const ANCIENT_ROUTES = new Set([
  '/timeline',
  '/gods',
  '/shadow-pantheon',
  '/pyramids',
  '/atlantis',
  '/glyphs',
  '/stone-faces',
  '/antarctica',
  '/extinct',
]);

/**
 * Map current pathname → playlist key. Defaults to 'cosmos'.
 */
export function useRouteTrack(): PlaylistKey {
  const { pathname } = useLocation();
  return useMemo<PlaylistKey>(() => {
    if (DISCLOSURE_ROUTES.has(pathname)) return 'disclosure';
    if (ANCIENT_ROUTES.has(pathname)) return 'ancient';
    return 'cosmos';
  }, [pathname]);
}
