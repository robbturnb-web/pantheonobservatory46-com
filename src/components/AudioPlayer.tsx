import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, ChevronUp, ChevronDown } from 'lucide-react';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useRouteTrack } from '@/hooks/useRouteTrack';
import { PLAYLISTS, PLAYLIST_LABELS } from '@/lib/audio/playlists';

const HIDDEN_ROUTES = new Set(['/auth', '/reset-password']);

export function AudioPlayer() {
  const location = useLocation();
  const routeTrack = useRouteTrack();
  const { playing, volume, currentTrack, toggle, next, prev, setVolume, setPlaylist } =
    useAudioEngine();

  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(volume || 0.3);

  // Swap the engine's playlist whenever the route's mood changes.
  useEffect(() => {
    setPlaylist(PLAYLISTS[routeTrack]);
  }, [routeTrack, setPlaylist]);

  if (HIDDEN_ROUTES.has(location.pathname)) return null;

  const handleMuteToggle = () => {
    if (muted) {
      setVolume(lastVolume);
      setMuted(false);
    } else {
      setLastVolume(volume);
      setVolume(0);
      setMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value) / 100;
    setVolume(v);
    if (v > 0 && muted) setMuted(false);
  };

  const trackLabel = currentTrack?.label ?? 'No signal';
  const moodLabel = PLAYLIST_LABELS[routeTrack];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="fixed bottom-4 left-4 z-50"
    >
      <div className="glass-cosmic rounded-xl px-3 py-2 backdrop-blur-md border border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          {/* Mood + track */}
          <div className="flex items-center gap-2 pr-2 border-r border-white/10 min-w-0">
            <Music2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[9px] uppercase tracking-[2px] text-muted-foreground font-bold">
                {moodLabel}
              </span>
              <span className="text-[11px] font-mono text-foreground truncate max-w-[110px]">
                {trackLabel}
              </span>
            </div>
          </div>

          {/* Transport */}
          <button
            onClick={prev}
            className="text-foreground/70 hover:text-foreground transition-colors p-1 rounded hover:bg-white/5"
            aria-label="Previous track"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggle}
            className="text-foreground hover:text-primary transition-colors p-1.5 rounded-full bg-white/5 hover:bg-white/10"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={next}
            className="text-foreground/70 hover:text-foreground transition-colors p-1 rounded hover:bg-white/5"
            aria-label="Next track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-foreground/50 hover:text-foreground/80 transition-colors p-1 rounded hover:bg-white/5 ml-1"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={handleMuteToggle}
                  className="text-foreground/70 hover:text-foreground transition-colors p-1 rounded hover:bg-white/5"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 accent-primary cursor-pointer"
                  aria-label="Volume"
                />
                <span className="text-[10px] font-mono text-muted-foreground w-7 text-right">
                  {Math.round(volume * 100)}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
