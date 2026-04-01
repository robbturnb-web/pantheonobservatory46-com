import { useState } from 'react';
import { motion } from 'framer-motion';
import { gods } from '../data/gods';
import type { PantheonFilter } from '../types';

const filters: PantheonFilter[] = ['All', 'Greek', 'Norse', 'Egyptian', 'Hindu', 'Anunnaki', 'Starseed'];

export function GodsPage() {
  const [filter, setFilter] = useState<PantheonFilter>('All');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === 'All' ? gods : gods.filter((g) => g.pantheon === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Gods & Archetypes</h1>
        <p className="text-muted-foreground">Mythological intelligence across civilizations.</p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((god, i) => (
          <motion.div
            key={god.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="glass-cosmic rounded-xl p-5 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setSelected(selected === god.id ? null : god.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{god.symbol}</span>
              <div>
                <h2 className="font-bold text-foreground">{god.name}</h2>
                <span className="text-xs text-muted-foreground">{god.pantheon}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{god.archetypeRole}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {god.domains.map((d) => (
                <span key={d} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">{d}</span>
              ))}
            </div>

            {selected === god.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-border pt-3 mt-3"
              >
                <p className="text-sm text-muted-foreground italic">"{god.reflectionQuestion}"</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
