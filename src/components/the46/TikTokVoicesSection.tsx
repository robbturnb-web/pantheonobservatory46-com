import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ExternalLink, Radio, Search, X, Check, Filter } from 'lucide-react';
import { tiktokVoices, type TikTokVoice, type VoiceTopic } from '@/data/tiktok-voices';

const WATCHED_KEY = 'pantheon_tiktok_watched_v1';
const TOPICS: (VoiceTopic | 'All')[] = [
  'All',
  'Whistleblower',
  'Documentary',
  'Politics',
  'Science',
  'Channeled',
  'Skeptic-Turned',
  'Tech',
];
const RATINGS: ('All' | 'GREEN' | 'YELLOW' | 'RED')[] = ['All', 'GREEN', 'YELLOW', 'RED'];

function loadWatched(): Record<string, number> {
  try {
    const raw = localStorage.getItem(WATCHED_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function saveWatched(state: Record<string, number>) {
  try {
    localStorage.setItem(WATCHED_KEY, JSON.stringify(state));
  } catch {
    /* quota — ignore */
  }
}

export function TikTokVoicesSection() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>('All');
  const [rating, setRating] = useState<(typeof RATINGS)[number]>('All');
  const [active, setActive] = useState<TikTokVoice | null>(null);
  const [watched, setWatched] = useState<Record<string, number>>(() => loadWatched());

  useEffect(() => {
    saveWatched(watched);
  }, [watched]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tiktokVoices.filter((v) => {
      if (topic !== 'All' && !v.topics.includes(topic)) return false;
      if (rating !== 'All' && v.rating !== rating) return false;
      if (!q) return true;
      return (
        v.creator.toLowerCase().includes(q) ||
        v.handle.toLowerCase().includes(q) ||
        v.quote.toLowerCase().includes(q) ||
        v.topic.toLowerCase().includes(q)
      );
    });
  }, [query, topic, rating]);

  const totalWatched = Object.keys(watched).length;

  const openClip = (v: TikTokVoice) => {
    setActive(v);
    setWatched((prev) => ({ ...prev, [v.id]: Date.now() }));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 pt-10 border-t border-border"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-realm-gods/10 border border-realm-gods/30 text-xs uppercase tracking-[3px] text-realm-gods mb-3">
          <Radio className="w-3 h-3" />
          TikTok Disclosure Voices
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Real voices. Real sources.
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Turning skeptics into seekers — the creators driving disclosure into the mainstream feed.
        </p>
      </div>

      {/* Search + filters */}
      <div className="glass-cosmic rounded-2xl p-4 mb-6 border border-border space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search creator, quote, topic…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Filter className="w-3.5 h-3.5 text-muted-foreground self-center mr-1" />
          {TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors ${
                topic === t
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-1">
            Credibility
          </span>
          {RATINGS.map((r) => {
            const tone =
              r === 'GREEN'
                ? 'text-signal-online border-signal-online/50 bg-signal-online/10'
                : r === 'YELLOW'
                  ? 'text-realm-gods border-realm-gods/50 bg-realm-gods/10'
                  : r === 'RED'
                    ? 'text-realm-blackProjects border-realm-blackProjects/50 bg-realm-blackProjects/10'
                    : 'text-foreground border-border bg-background/40';
            const inactive =
              'text-muted-foreground border-border hover:text-foreground hover:border-primary/50';
            return (
              <button
                key={r}
                onClick={() => setRating(r)}
                className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors ${
                  rating === r ? tone : inactive
                }`}
              >
                {r}
              </button>
            );
          })}
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">
            {filtered.length} / {tiktokVoices.length} · watched {totalWatched}
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-sm text-muted-foreground">
          No voices match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v, i) => {
            const isWatched = Boolean(watched[v.id]);
            const ring =
              v.rating === 'GREEN'
                ? 'border-signal-online/40 hover:border-signal-online'
                : v.rating === 'YELLOW'
                  ? 'border-realm-gods/40 hover:border-realm-gods'
                  : 'border-realm-blackProjects/40 hover:border-realm-blackProjects';
            const dot =
              v.rating === 'GREEN'
                ? 'bg-signal-online'
                : v.rating === 'YELLOW'
                  ? 'bg-realm-gods'
                  : 'bg-realm-blackProjects';
            return (
              <motion.button
                key={v.id}
                onClick={() => openClip(v)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                className={`group text-left glass-cosmic rounded-2xl p-5 border ${ring} transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)] relative`}
              >
                {isWatched && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-signal-online">
                    <Check className="w-3 h-3" /> Watched
                  </span>
                )}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="text-sm font-bold text-foreground">{v.creator}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      {v.handle}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-wider px-2 py-1 rounded-full bg-background/40 ${dot.replace('bg-', 'text-')}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                    {v.rating}
                  </span>
                </div>
                <blockquote className="text-sm text-foreground/90 leading-relaxed italic border-l-2 border-primary/40 pl-3 mb-3">
                  “{v.quote}”
                </blockquote>
                <div className="text-[11px] text-muted-foreground mb-3 line-clamp-2">
                  {v.topic}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {v.topics.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-accent-neon transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                  Watch Clip
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* In-app player modal */}
      <AnimatePresence>
        {active && <VoicePlayerModal voice={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </motion.section>
  );
}

function VoicePlayerModal({ voice, onClose }: { voice: TikTokVoice; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const embedSrc =
    voice.videoId && voice.username
      ? `https://www.tiktok.com/embed/v2/${voice.videoId}`
      : voice.username
        ? `https://www.tiktok.com/embed/@${voice.username}`
        : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-cosmic rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-primary/40 p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">{voice.creator}</h3>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
              {voice.handle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <blockquote className="text-base text-foreground/90 leading-relaxed italic border-l-2 border-primary pl-4">
          “{voice.quote}”
        </blockquote>
        <p className="text-xs text-muted-foreground">{voice.topic}</p>

        {embedSrc ? (
          <div className="rounded-xl overflow-hidden border border-border bg-black aspect-[9/16] max-h-[60vh] mx-auto">
            <iframe
              src={embedSrc}
              title={`TikTok — ${voice.creator}`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No embedded video yet for this voice. Open on TikTok to watch the latest clips.
          </div>
        )}

        <a
          href={voice.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent-neon transition-colors"
        >
          Open on TikTok
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </motion.div>
  );
}
