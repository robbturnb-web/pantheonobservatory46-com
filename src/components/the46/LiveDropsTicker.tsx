import { motion } from 'framer-motion';
import { Radio, Zap } from 'lucide-react';

/**
 * Scrolling Live Drops ticker — sits at the bottom of the Disclosure
 * Portal and broadcasts incoming TikTok drops, new file additions,
 * and breaking AARO/Pentagon disclosures. Pure decorative for now;
 * once a `live_drops` table exists this can subscribe to realtime.
 */
const DROPS: Array<{ tag: 'LIVE' | 'NEW' | 'BREAKING'; text: string }> = [
  { tag: 'LIVE', text: 'Jeremy Corbell drops new clip — "We have surviving non-human biologics"' },
  { tag: 'NEW', text: 'File #07 · Project Aquarius redaction status moved to PENDING-DISCLOSURE' },
  { tag: 'BREAKING', text: 'Luis Elizondo confirms second batch UFO files cleared for release' },
  { tag: 'LIVE', text: 'Age of Disclosure: another skeptic flipped after watching the JFK/CIA leak' },
  { tag: 'NEW', text: 'Dr. Garry Nolan publishes follow-up on UAP material analysis' },
  { tag: 'BREAKING', text: 'Hegseth memo deadline expired · 46 files officially overdue' },
  { tag: 'LIVE', text: 'AgeOfDisclosure: "I did not believe any of this. Now I do."' },
  { tag: 'NEW', text: 'Cmdr. David Fravor: Tic Tac chase synced across two ships and two jets' },
];

const COLOR: Record<string, string> = {
  LIVE: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  NEW: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  BREAKING: 'bg-red-500/20 text-red-300 border-red-500/40',
};

export function LiveDropsTicker() {
  // Duplicate the array so the scroll loop is seamless
  const items = [...DROPS, ...DROPS];

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 via-background to-emerald-500/5 py-3">
      <div className="absolute left-0 top-0 z-10 flex h-full items-center gap-2 bg-gradient-to-r from-background via-background/90 to-transparent pl-4 pr-8">
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_hsl(140_70%_50%)]"
        />
        <span className="text-[10px] font-bold uppercase tracking-[3px] text-emerald-300">Live Drops</span>
        <Radio className="w-3 h-3 text-emerald-400" />
      </div>

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-8 whitespace-nowrap pl-44 will-change-transform"
      >
        {items.map((d, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-xs text-foreground/85">
            <span className={`px-2 py-0.5 rounded border text-[9px] font-mono ${COLOR[d.tag]}`}>
              {d.tag === 'BREAKING' && <Zap className="inline w-2.5 h-2.5 mr-0.5" />}
              {d.tag}
            </span>
            {d.text}
            <span className="text-muted-foreground">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
