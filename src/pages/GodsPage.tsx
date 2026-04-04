import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gods } from '../data/gods';
import type { PantheonFilter } from '../types';
import type { God } from '../types';
import { X } from 'lucide-react';
import { SourceList } from '../components/SourceList';

const filters: PantheonFilter[] = ['All', 'Greek', 'Norse', 'Egyptian', 'Hindu', 'Anunnaki', 'Starseed'];

function GodModal({ god, onClose }: { god: God; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-w-lg w-full rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image background */}
        {god.image ? (
          <div className="relative h-56 overflow-hidden">
            <img src={god.image} alt={god.name} className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/60 to-transparent" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: god.atmosphericBg }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </>
        )}

        <div className={`relative z-10 ${god.image ? '-mt-16' : ''} p-8`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-foreground hover:bg-black/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="text-5xl block mb-3"
            >
              {god.symbol}
            </motion.span>
            <h2 className="text-3xl font-bold text-foreground">{god.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{god.pantheon} Pantheon</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Archetype</h3>
              <p className="text-sm text-foreground">{god.archetypeRole}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {god.domains.map((d) => (
                  <span key={d} className="text-xs bg-white/10 text-foreground px-3 py-1 rounded-full border border-white/10">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Atmosphere</h3>
              <p className="text-sm text-muted-foreground italic">{god.atmosphericDesc}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-t border-white/10 pt-4 mt-4"
            >
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Reflection</h3>
              <p className="text-foreground italic text-lg leading-relaxed">
                "{god.reflectionQuestion}"
              </p>
            </motion.div>

            {god.sources && god.sources.length > 0 && (
              <SourceList sources={god.sources} defaultOpen />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
