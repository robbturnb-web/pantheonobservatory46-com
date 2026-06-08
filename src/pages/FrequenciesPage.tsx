import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, ExternalLink, ChevronDown, ChevronUp, Youtube } from 'lucide-react';
import { creators, allTopics, type Topic, type Rating } from '@/data/frequencies';
import { VideoEmbed } from '@/components/VideoEmbed';
import { SEO } from '@/components/SEO';

const ratingDot = (rating: Rating) => {
  if (rating === 'GREEN') return 'bg-accent-neon shadow-[0_0_8px_hsl(var(--accent-neon))]';
  if (rating === 'YELLOW') return 'bg-accent-amber shadow-[0_0_8px_hsl(var(--accent-amber))]';
  return 'bg-destructive shadow-[0_0_8px_hsl(var(--destructive))]';
};

export function FrequenciesPage() {
  const [topicFilter, setTopicFilter] = useState<Topic | 'ALL'>('ALL');
  const [ratingFilter, setRatingFilter] = useState<Rating | 'ALL'>('ALL');
  const [expanded, setExpanded] = useState<string | null>(creators[0]?.id ?? null);

  const filtered = creators.filter((c) => {
    const topicMatch = topicFilter === 'ALL' || c.topics.includes(topicFilter);
    const ratingMatch = ratingFilter === 'ALL' || c.rating === ratingFilter;
    return topicMatch && ratingMatch;
  });

  return (
    <>
    <SEO
      title="Frequencies — Curated UAP & Consciousness Channels | Pantheon"
      description={`${creators.length} researchers and creators rated for sourcing rigor. Filter by topic and reliability to find the signal beneath the noise.`}
      path="/frequencies"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Frequencies', url:'https://pantheonobservatory46-com.lovable.app/frequencies', numberOfItems: creators.length }}
    />
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] text-accent-neon mb-3">
          <Radio className="w-3.5 h-3.5" /> Voices We Track
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-foreground">
          FREQUENCIES
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Hand-curated channels we monitor for signal vs. noise. Each creator graded on
          sourcing and consistency. Updated by hand — paste new video IDs into{' '}
          <code className="text-accent-neon text-xs">src/data/frequencies.ts</code>.
        </p>
      </motion.div>

      {/* FILTERS */}
      <div className="glass-cosmic rounded-2xl p-5 mb-8 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Topic</p>
          <div className="flex flex-wrap gap-2">
            {(['ALL', ...allTopics] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTopicFilter(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors ${
                  topicFilter === t
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Signal Rating</p>
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'GREEN', 'YELLOW'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRatingFilter(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  ratingFilter === r
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                {r !== 'ALL' && <span className={`w-2 h-2 rounded-full ${ratingDot(r as Rating)}`} />}
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CREATOR CARDS */}
      <div className="space-y-5">
        {filtered.map((c, i) => {
          const isOpen = expanded === c.id;
          return (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-cosmic rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="w-full text-left p-6 flex items-start gap-4"
              >
                <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${ratingDot(c.rating)}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h2 className="text-xl font-bold text-foreground">{c.name}</h2>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent text-muted-foreground inline-flex items-center gap-1">
                      {c.platform === 'YouTube' ? <Youtube className="w-3 h-3" /> : null}
                      {c.platform}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {c.rating}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {c.topics.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-border pt-5 space-y-4">
                      <a
                        href={c.channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent-neon hover:underline"
                      >
                        Visit channel <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {c.videos.map((v, vi) => (
                          <div key={`${c.id}-${vi}`}>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{v.title}</p>
                            <VideoEmbed video={{ platform: v.platform, id: v.id, title: v.title }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}

        {filtered.length === 0 && (
          <div className="glass-cosmic rounded-2xl p-12 text-center text-muted-foreground">
            No creators match the current filters.
          </div>
        )}
      </div>
    </div>
    </>
  );
}
