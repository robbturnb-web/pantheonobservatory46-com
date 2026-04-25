import { useEffect, useState, useCallback } from 'react';
import { AudioEngine, type Track } from '@/lib/audio/audio-engine';

/**
 * React binding for the AudioEngine singleton.
 * Subscribes to engine events so multiple consumers stay in sync.
 */
export function useAudioEngine() {
  const engine = AudioEngine.getInstance();

  const [playing, setPlaying] = useState(engine.isPlaying());
  const [volume, setVolumeState] = useState(engine.getVolume());
  const [currentTrack, setCurrentTrack] = useState<Track | null>(engine.getCurrentTrack());

  useEffect(() => {
    const offPlay = engine.on('play', () => setPlaying(engine.isPlaying()));
    const offPause = engine.on('pause', () => setPlaying(engine.isPlaying()));
    const offVolume = engine.on('volume', () => setVolumeState(engine.getVolume()));
    const offTrack = engine.on('track', () => setCurrentTrack(engine.getCurrentTrack()));
    const offPlaylist = engine.on('playlist', () => setCurrentTrack(engine.getCurrentTrack()));
    return () => {
      offPlay();
      offPause();
      offVolume();
      offTrack();
      offPlaylist();
    };
  }, [engine]);

  const play = useCallback(() => engine.play(), [engine]);
  const pause = useCallback(() => engine.pause(), [engine]);
  const toggle = useCallback(() => engine.toggle(), [engine]);
  const next = useCallback(() => engine.next(), [engine]);
  const prev = useCallback(() => engine.prev(), [engine]);
  const setVolume = useCallback((v: number) => engine.setVolume(v), [engine]);
  const setPlaylist = useCallback((list: Track[]) => engine.setPlaylist(list), [engine]);

  return {
    playing,
    volume,
    currentTrack,
    play,
    pause,
    toggle,
    next,
    prev,
    setVolume,
    setPlaylist,
  };
}
