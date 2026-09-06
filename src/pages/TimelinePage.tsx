import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEntries, type TimelineEntry } from '../data/timeline';
import { ExternalLink } from 'lucide-react';
import { SEO } from '@/components/SEO';

const categories = [
  { key: 'all', label: 'All Eras' },
  { key: 'ancient', label: 'Ancient' },
  { key: 'medieval', label: 'Medieval' },
  { key: 'modern', label: 'Modern' },
  { key: 'recent', label: 'Recent' },
] as const;

const significanceStyles: Record<string, string> = {
  high: 'border-l-primary shadow-[inset_0_0_30px_rgba(139,92,246,0.08)]',
  medium: 'border-l-accent-blue',
  low: 'border-l-muted-foreground/30',
};

export function TimelinePage() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? timelineEntries
    : timelineEntries.filter((e) => e.category === filter);

  let lastCategory = '';

  return (
    <>
    <SEO
      title="UAP & Disclosure Timeline — Ancient to Present | Pantheon"
      description={`${timelineEntries.length} pivotal moments from ancient sightings to congressional hearings — the full disclosure arc, filterable by era.`}
      path="/timeline"
      schema={{ '@context':'https://schema.org','@type':'CollectionPage', name:'Disclosure Timeline', url:'https://pantheonobservatory46.com/timeline', numberOfItems: timelineEntries.length }}
    />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Cosmic Timeline</h1>
        <p className="text-muted-foreground text-lg">
          {timelineEntries.length} events spanning 300,000 years of hidden history.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilter(cat.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat.key
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

        <AnimatePresence mode="popLayout">
          <div className="space-y-6">
            {filtered.map((event, i) => {
              const showDivider = filter === 'all' && event.category !== lastCategory;
              lastCategory = event.category;

              return (
                <div key={event.id}>
                  {showDivider && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pl-12 mb-4 mt-8 first:mt-0"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {event.category === 'ancient' ? '🏛️ Ancient Era' :
                         event.category === 'medieval' ? '⚔️ Medieval Era' :
                         event.category === 'modern' ? '🛸 Modern Era' :
                         '📡 Recent Disclosure'}
                      </span>
                    </motion.div>
                  )}
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="relative pl-12"
                  >
                    <div className={`absolute left-2 top-4 w-4 h-4 rounded-full border-2 border-primary bg-background ${
                      event.significance === 'high' ? 'cosmic-glow-pulse' : ''
                    }`} />

                    <div className={`glass-cosmic rounded-xl p-5 border-l-4 ${significanceStyles[event.significance]}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {event.era}
                        </span>
                        {event.significance === 'high' && (
                          <span className="text-xs text-accent-foreground bg-accent px-2 py-0.5 rounded">
                            Key Event
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      {event.sourceUrl && (
                        <a
                          href={event.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-2 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {event.sourceLabel || 'Source'}
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
