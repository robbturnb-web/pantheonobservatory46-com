import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import type { Planet } from '../../data/planets';

interface PlanetInfoProps {
  planet: Planet | null;
  onClose: () => void;
}

export function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          className="absolute right-4 top-4 bottom-4 w-80 glass-cosmic rounded-xl p-5 overflow-y-auto z-10"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">{planet.name}</h2>
              <p className="text-xs text-muted-foreground">Click planet again or × to close</p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-primary mb-2">Scientific Facts</h3>
              <ul className="space-y-1.5">
                {planet.facts.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">▸</span><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-accent-foreground mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Mythology & Culture
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{planet.mythology}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Theories & Anomalies</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{planet.theories}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
