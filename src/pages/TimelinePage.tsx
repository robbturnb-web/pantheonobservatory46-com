import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEntries } from '../data/timeline';
import { spaceAgeEntries } from '../data/space-age-timeline';
import { ExternalLink, Telescope } from 'lucide-react';
import { SEO } from '@/components/SEO';

const themes = [
  { key: 'all', label: 'All Events', icon: '✦' },
  { key: 'ancient-world', label: 'Ancient World', icon: '🏛️' },
  { key: 'classical-mythology', label: 'Classical Mythology', icon: '⚱️' },
  { key: 'lost-civilizations', label: 'Lost Civilizations', icon: '🗿' },
  { key: 'modern-disclosure', label: 'Modern Disclosure', icon: '🛸' },
  { key: 'space-age', label: 'Space Age', icon: '🚀' },
  { key: 'future-watch', label: 'Future Watch', icon: '🔭' },
] as const;

type TimelineTheme = Exclude<(typeof themes)[number]['key'], 'all'>;

// Merge the focused Space Age milestones into the main record and keep the full timeline chronological.
const allTimelineEntries = [...timelineEntries, ...spaceAgeEntries].sort((a, b) => Number(a.year) - Number(b.year));

// Curated thematic tags keep the timeline useful without changing the source data model.
// Entries can appear in more than one lens; the original chronology remains intact.
const eventThemes: Record<string, TimelineTheme[]> = {
  '1': ['ancient-world'],
  '2': ['ancient-world'],
  '3': ['ancient-world', 'classical-mythology'],
  '4': ['ancient-world', 'lost-civilizations'],
  '5': ['ancient-world', 'lost-civilizations'],
  '6': ['ancient-world', 'lost-civilizations'],
  '7': ['ancient-world', 'lost-civilizations'],
  '8': ['ancient-world', 'classical-mythology', 'lost-civilizations'],
  '9': ['ancient-world', 'lost-civilizations'],
  '10': ['ancient-world', 'classical-mythology', 'lost-civilizations'],
  '11': ['ancient-world', 'classical-mythology'],
  '12': ['ancient-world', 'classical-mythology'],
  '13': ['classical-mythology'],
  '14': ['classical-mythology'],
  '15': ['classical-mythology'],
  '16': ['modern-disclosure', 'space-age'],
  '17': ['modern-disclosure', 'space-age'],
  '18': ['modern-disclosure', 'space-age'],
  '19': ['modern-disclosure', 'space-age'],
  '20': ['modern-disclosure'],
  '21': ['modern-disclosure', 'space-age'],
  '22': ['modern-disclosure'],
  '23': ['modern-disclosure', 'space-age'],
  '24': ['modern-disclosure', 'space-age'],
  '25': ['modern-disclosure', 'space-age'],
  '26': ['modern-disclosure', 'space-age'],
  '27': ['modern-disclosure', 'space-age'],
  '28': ['modern-disclosure', 'space-age'],
  '29': ['modern-disclosure'],
  '30': ['modern-disclosure'],
  '31': ['modern-disclosure'],
  '32': ['modern-disclosure'],
  '33': ['space-age'],
  '34': ['space-age'],
  '35': ['space-age'],
  '36': ['space-age'],
  '37': ['space-age'],
};

const significanceStyles: Record<string, string> = {
  high: 'border-l-primary shadow-[inset_0_0_30px_rgba(139,92,246,0.08)]',
  medium: 'border-l-accent-blue',
  low: 'border-l-muted-foreground/30',
};

export function TimelinePage() {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? allTimelineEntries
    : filter === 'future-watch'
      ? []
      : allTimelineEntries.filter((event) => eventThemes[event.id]?.includes(filter as TimelineTheme));

  return (
    <>
      <SEO
        title="Cosmic Timeline — Ancient World to Future Watch | Pantheon"
        description={`Explore ${allTimelineEntries.length} timeline entries through six thematic lenses: ancient history, mythology, lost civilizations, disclosure, space, and future watch.`}
        path="/timeline"
        schema={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Cosmic Timeline', url: 'https://pantheonobservatory46.com/timeline', numberOfItems: allTimelineEntries.length }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Pantheon Observatory · Field Record</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Cosmic Timeline</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {allTimelineEntries.length} entries spanning deep human history to present-day reports. Choose a lens to explore the record from a different angle.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter timeline by theme">
          {themes.map((theme) => (
            <button
              key={theme.key}
              type="button"
              aria-pressed={filter === theme.key}
              onClick={() => setFilter(theme.key)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all border ${
                filter === theme.key
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25'
                  : 'bg-secondary/70 text-secondary-foreground border-border/60 hover:bg-accent'
              }`}
            >
              <span className="mr-1.5" aria-hidden="true">{theme.icon}</span>{theme.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 mb-6 text-xs text-muted-foreground">
          <span>{filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}</span>
          <span className="uppercase tracking-widest">Chronological record</span>
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-cosmic rounded-2xl p-8 sm:p-12 text-center border border-primary/20"
          >
            <Telescope className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">The watch is open</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              No future milestones have been added to this timeline yet. Future Watch is reserved for dated, checkable items such as announced missions, scheduled hearings, and upcoming public reports, not predictions presented as facts.
            </p>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
            <AnimatePresence mode="popLayout">
              <div className="space-y-6">
                {filtered.map((event, i) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.025, 0.3) }}
                    className="relative pl-12"
                  >
                    <div className={`absolute left-2 top-4 w-4 h-4 rounded-full border-2 border-primary bg-background ${
                      event.significance === 'high' ? 'cosmic-glow-pulse' : ''
                    }`} />
                    <article className={`glass-cosmic rounded-xl p-5 border-l-4 ${
                      significanceStyles[event.significance] || significanceStyles.low
                    }`}>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                          {event.era}
                        </span>
                        {event.significance === 'high' && (
                          <span className="text-xs text-accent-foreground bg-accent px-2 py-1 rounded">
                            Key Event
                          </span>
                        )}
                        {filter !== 'all' && eventThemes[event.id]?.map((themeKey) => {
                          const theme = themes.find((item) => item.key === themeKey);
                          return theme ? (
                            <span key={themeKey} className="text-xs text-muted-foreground border border-border/70 px-2 py-1 rounded-full">
                              {theme.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                      <h2 className="text-lg font-bold text-foreground mb-2">{event.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                      {event.sourceUrl && (
                        <a
                          href={event.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-3 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {event.sourceLabel || 'Source'}
                        </a>
                      )}
                    </article>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </>
  );
}
