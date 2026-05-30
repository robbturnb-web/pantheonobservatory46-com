import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Track } from './audio-engine';
import { PLAYLISTS as FALLBACK_PLAYLISTS, type PlaylistKey } from './playlists';

export type RemoteTrack = {
  track_key: string;
  playlist: string;
  label: string;
  public_url: string | null;
  status: string;
};

/**
 * Hook that fetches AI-generated soundscape URLs from `audio_tracks`
 * and assembles per-playlist Track arrays. Falls back to local /audio/*.mp3
 * paths (which 404 today) when no generated URL exists, so the existing
 * AudioEngine "exhausted" guard still gracefully pauses instead of looping.
 */
export function useRemotePlaylists(): {
  playlists: Record<PlaylistKey, Track[]>;
  loading: boolean;
  hasAnyRemote: boolean;
  refresh: () => void;
} {
  const [remote, setRemote] = useState<RemoteTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('audio_tracks')
        .select('track_key, playlist, label, public_url, status')
        .eq('status', 'ready')
        .not('public_url', 'is', null);
      if (!cancelled) {
        setRemote((data ?? []) as RemoteTrack[]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  // Merge: prefer remote tracks; fall back to local for any slot without a generated URL.
  const playlists: Record<PlaylistKey, Track[]> = {
    cosmos: [],
    ancient: [],
    disclosure: [],
  };
  (Object.keys(FALLBACK_PLAYLISTS) as PlaylistKey[]).forEach((key) => {
    const remoteForKey = remote.filter((r) => r.playlist === key && r.public_url);
    if (remoteForKey.length > 0) {
      playlists[key] = remoteForKey.map((r) => ({ src: r.public_url!, label: r.label }));
    } else {
      playlists[key] = FALLBACK_PLAYLISTS[key];
    }
  });

  return {
    playlists,
    loading,
    hasAnyRemote: remote.length > 0,
    refresh: () => setTick((t) => t + 1),
  };
}
