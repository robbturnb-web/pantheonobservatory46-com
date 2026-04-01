import { motion } from 'framer-motion';
import { timelineEntries } from '../data/timeline';

export function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Cosmic Timeline</h1>
        <p className="text-muted-foreground">From ancient mysteries to modern disclosure.</p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-8">
          {timelineEvents.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-12"
            >
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-primary cosmic-glow-pulse" />
              <div className="glass-cosmic rounded-lg p-4">
                <span className="text-xs font-mono text-primary">{event.year}</span>
                <p className="text-sm text-foreground mt-1">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
