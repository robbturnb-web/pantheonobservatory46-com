import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Info, FlaskConical, Moon as MoonIcon } from 'lucide-react';
import type { Planet, Moon } from '../../data/planets';

interface PlanetInfoProps {
  planet: Planet | null;
  moon: Moon | null;
  onClose: () => void;
}

export function PlanetInfo({ planet, moon, onClose }: PlanetInfoProps) {
  const item = moon || planet;
  const isMoon = !!moon;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute right-4 top-4 bottom-4 w-[340px] glass-cosmic rounded-2xl overflow-hidden z-10 flex flex-col"
        >
          <div className="p-5 pb-3 border-b border-border/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full shadow-lg"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, ${item.color}dd, ${item.color}44)`,
                    boxShadow: `0 0 20px ${item.color}44`,
                  }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">{item.name}</h2>
                    {isMoon && <MoonIcon className="w-3.5 h-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    {isMoon ? `Moon of ${planets.find(p => p.id === moon.parentId)?.name}` : `Distance: ${(item as Planet).distance > 0 ? `${(item as Planet).distance} AU (scaled)` : 'Center'}`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <section>
              <h3 className="text-xs font-bold text-neon uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Scientific Facts
              </h3>
              <ul className="space-y-2">
                {item.facts.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
                  >
                    <span className="text-neon mt-0.5">▸</span><span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Mythology & Culture
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.mythology}</p>
            </section>

            <section>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" /> Theories & Anomalies
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.theories}</p>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
