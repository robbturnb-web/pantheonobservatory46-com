import { motion } from 'framer-motion';
import { ExternalLink, Flame, Sparkles } from 'lucide-react';
import { tiktokVoices } from '@/data/tiktok-voices';

/**
 * "Skeptic to Seeker" horizontal spotlight row.
 * Surfaces the highest-conversion clips — voices that personally flipped
 * from non-believer to believer, or that consistently turn skeptics. The
 * card mirrors the Disclosure card aesthetic but with a warmer gold edge.
 */
const SPOTLIGHT_IDS = new Set([
  'age-of-disclosure',
  'bashar-cycle',
  'corbell-leaks',
  'amy-eskridge',
  'jack-kruse',
  'elizondo-batch2',
]);

export function SkepticSpotlight() {
  const featured = tiktokVoices.filter((v) => SPOTLIGHT_IDS.has(v.id));

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <div className="flex items-end justify-between mb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[3px] text-amber-300 mb-1">
            <Flame className="w-3 h-3" />
            Skeptic → Seeker · Spotlight
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            The clips that flip non-believers
          </h2>
        </div>
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
      </div>

      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <div className="flex gap-3 sm:gap-4 min-w-max">
          {featured.map((v, i) => (
            <motion.a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative w-[260px] sm:w-[300px] shrink-0 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-background to-primary/5 p-4 hover:border-amber-400/60 transition-colors"
            >
              <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[2px] text-amber-300">{v.handle}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {v.rating}
                </span>
              </div>
              <div className="font-bold text-foreground mb-2 leading-tight">{v.creator}</div>
              <p className="text-sm text-foreground/85 italic leading-snug mb-3 line-clamp-3">
                "{v.quote}"
              </p>
              <div className="text-[10px] text-muted-foreground line-clamp-1">{v.topic}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-amber-300 group-hover:text-amber-200">
                Watch clip <ExternalLink className="w-2.5 h-2.5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
