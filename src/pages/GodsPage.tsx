import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gods } from '../data/gods';
import type { PantheonFilter, God } from '../types';
import { GodDossierModal } from '@/components/gods/GodDossierModal';

const filters: PantheonFilter[] = ['All', 'Greek', 'Norse', 'Egyptian', 'Hindu', 'Anunnaki', 'Starseed'];

export function GodsPage() {
  const [filter, setFilter] = useState<PantheonFilter>('All');
  const [selectedGod, setSelectedGod] = useState<God | null>(null);

  const filtered = filter === 'All' ? gods : gods.filter((g) => g.pantheon === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Gods & Archetypes</h1>
        <p className="text-muted-foreground text-lg">
          {gods.length} deities across {filters.length - 1} pantheons. Tap any card to enter their atmosphere.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            }`}
          >
            {f}
            {f !== 'All' && (
              <span className="ml-1.5 text-xs opacity-60">
                {gods.filter((g) => g.pantheon === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((god, i) => (
            <motion.div
              key={god.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedGod(god)}
            >
              <div className="glass-cosmic rounded-xl overflow-hidden h-full transition-all group-hover:scale-[1.02]">
                {/* Portrait Image */}
                {god.image ? (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={god.image}
                      alt={god.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,40,0.95)] via-[rgba(15,10,40,0.3)] to-transparent" />
                    {/* Name overlay on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{god.symbol}</span>
                        <div>
                          <h2 className="font-bold text-foreground text-lg leading-tight">{god.name}</h2>
                          <span className="text-xs text-muted-foreground">{god.pantheon}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative p-5">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"
                      style={{ background: god.atmosphericBg }}
                    />
                    <div className="relative z-10 flex items-center gap-3 mb-3">
                      <span className="text-3xl">{god.symbol}</span>
                      <div>
                        <h2 className="font-bold text-foreground text-lg">{god.name}</h2>
                        <span className="text-xs text-muted-foreground">{god.pantheon}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info below image */}
                <div className="p-4 pt-2">
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{god.archetypeRole}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {god.domains.slice(0, 3).map((d) => (
                      <span key={d} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                        {d}
                      </span>
                    ))}
                    {god.domains.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{god.domains.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedGod && <GodModal god={selectedGod} onClose={() => setSelectedGod(null)} />}
      </AnimatePresence>
    </div>
  );
}
