import { motion } from 'framer-motion';
import { numerologyEntries, codexCategories } from '@/data/numerology-46';

export function NumerologyCodex() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="text-[10px] sm:text-xs uppercase tracking-[6px] text-primary/70 mb-3">
          The Codex
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-3">
          46 Across History
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Not coincidence. Pattern. Every entry is verifiable. The number keeps showing up
          because the number is the signature.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {numerologyEntries.map((entry, i) => {
          const cat = codexCategories.find((c) => c.id === entry.category)!;
          return (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group rounded-xl border bg-background/50 backdrop-blur-sm p-5 transition-all hover:bg-background/70"
              style={{ borderColor: `${cat.color}33` }}
            >
              <div
                className="text-[9px] uppercase tracking-[4px] font-bold mb-2"
                style={{ color: cat.color }}
              >
                {cat.label}
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 leading-tight">
                {entry.title}
              </h3>
              <p className="text-[13px] text-foreground/70 leading-relaxed">{entry.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
