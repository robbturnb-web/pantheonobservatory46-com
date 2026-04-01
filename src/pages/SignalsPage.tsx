import { useState } from 'react';
import { motion } from 'framer-motion';
import { creators } from '../data/creators';
import type { SignalRating } from '../types';
import { Shield, AlertTriangle, XCircle, Filter } from 'lucide-react';

const ratingConfig: Record<SignalRating, { label: string; icon: typeof Shield; className: string; bgClass: string }> = {
  GREEN: { label: 'Reliable', icon: Shield, className: 'text-accent-emerald', bgClass: 'bg-accent-emerald/10 border-accent-emerald/20' },
  YELLOW: { label: 'Mixed', icon: AlertTriangle, className: 'text-[var(--accent-amber)]', bgClass: 'bg-[var(--accent-amber)]/10 border-[var(--accent-amber)]/20' },
  RED: { label: 'Unreliable', icon: XCircle, className: 'text-[var(--accent-rose)]', bgClass: 'bg-[var(--accent-rose)]/10 border-[var(--accent-rose)]/20' },
};

const filterOptions: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'GREEN', label: '🟢 Reliable' },
  { key: 'YELLOW', label: '🟡 Mixed' },
  { key: 'RED', label: '🔴 Unreliable' },
];

export function SignalsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? creators : creators.filter((c) => c.rating === filter);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Signal Watch</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Credibility ratings for {creators.length} UAP & consciousness researchers.
          Not a judgment of character — a measure of sourcing rigor.
        </p>

        <div className="glass-cosmic rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span>Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === opt.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {filtered.map((c, i) => {
          const config = ratingConfig[c.rating];
          const Icon = config.icon;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`glass-cosmic rounded-xl p-6 border-l-4 ${config.bgClass}`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{c.name}</h2>
                  <p className="text-xs text-muted-foreground">{c.platform}</p>
                </div>
                <div className={`flex items-center gap-1.5 text-sm font-semibold ${config.className} flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                  {config.label}
                </div>
              </div>
              <p className="text-sm text-foreground mb-3 leading-relaxed">{c.description}</p>
              <p className="text-xs text-muted-foreground italic bg-secondary/30 rounded-lg px-3 py-2">{c.ratingNote}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
