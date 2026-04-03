import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Compass, FlaskConical, Info } from 'lucide-react';
import type { Pyramid } from '../../data/pyramids';

interface PyramidInfoProps {
  pyramid: Pyramid | null;
  onClose: () => void;
}

export function PyramidInfo({ pyramid, onClose }: PyramidInfoProps) {
  return (
    <AnimatePresence>
      {pyramid && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute right-4 top-4 bottom-4 w-[360px] glass-cosmic rounded-2xl overflow-hidden z-10 flex flex-col"
        >
          <div className="p-5 pb-3 border-b border-border/30">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">{pyramid.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{pyramid.location} • {pyramid.age}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-0.5">{pyramid.coordinates}</p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted/30 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <section>
              <h3 className="text-xs font-bold text-neon uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Key Facts
              </h3>
              <ul className="space-y-2">
                {pyramid.facts.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
                  >
                    <span className="text-neon mt-0.5">▸</span><span>{f}</span>
                  </motion.li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Astronomical Alignments
              </h3>
              <ul className="space-y-2">
                {pyramid.alignments.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.2 }}
                    className="text-sm text-muted-foreground flex gap-2 leading-relaxed"
                  >
                    <span className="text-primary mt-0.5">◆</span><span>{a}</span>
                  </motion.li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" /> Theories & Mysteries
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pyramid.theories}</p>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
