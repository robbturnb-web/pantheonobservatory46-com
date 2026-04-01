import { motion } from 'framer-motion';
import { creators } from '../data/creators';
import type { SignalRating } from '../types';

const ratingLabel: Record<SignalRating, string> = { GREEN: '🟢 Green', YELLOW: '🟡 Yellow', RED: '🔴 Red' };

export function SignalsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Signal Watch</h1>
        <p className="text-muted-foreground">Credibility ratings for UAP/consciousness researchers and creators.</p>
        <div className="flex gap-4 mt-4 text-sm">
          <span className="signal-green">🟢 Green — Reliable</span>
          <span className="signal-yellow">🟡 Yellow — Mixed</span>
          <span className="signal-red">🔴 Red — Unreliable</span>
        </div>
      </motion.div>

      <div className="space-y-4">
        {creators.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-cosmic rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-foreground">{c.name}</h2>
              <span className={`text-sm font-semibold signal-${c.rating.toLowerCase()}`}>
                {ratingLabel[c.rating]}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{c.platform}</p>
            <p className="text-sm text-foreground mb-2">{c.description}</p>
            <p className="text-xs text-muted-foreground italic">{c.ratingNote}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
