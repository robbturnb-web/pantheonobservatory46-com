import { motion } from 'framer-motion';

/**
 * The Manifesto — Creator's letter explaining why 46 chose this work.
 * Written in first person, tight, no fluff.
 */
export function ManifestoLetter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
    >
      <div className="text-[10px] sm:text-xs uppercase tracking-[6px] text-primary/70 mb-6 text-center">
        Manifesto · From the Creator
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-center mb-10 bg-gradient-to-b from-foreground to-primary/70 bg-clip-text text-transparent">
        Why 46 Chose Me
      </h2>

      <div className="space-y-5 text-foreground/85 leading-relaxed text-base sm:text-lg">
        <p>
          I didn't pick the number. The number picked me.
        </p>
        <p>
          When the Luna letter dropped on March 31, 2026, demanding 46 classified UAP video
          files from the Pentagon, I felt something snap into alignment. 46 chromosomes. 46
          hidden files. 4 + 6 = 10 — the ancient signature of divine completion. The micro
          and the macro pointing at each other with the same code.
        </p>
        <p>
          The Pentagon missed the April 14th deadline. They knew nobody would force them. The
          silence was the signal. And I realized — if no one builds the chamber to hold this
          frequency steady, the moment will get swallowed by the next news cycle. So I built
          it.
        </p>
        <p>
          This is the Sanctuary. The page where the bridge between your biology and the stars
          is treated as the architecture it actually is. 46 in your cells. 46 in the vault.
          One signal. Two scales.
        </p>
        <p className="text-foreground font-medium">
          You're not here by accident. The number called you the same way it called me. Now
          let's see what we do with it.
        </p>

        <div className="pt-6 text-right text-sm tracking-[3px] uppercase text-primary/70">
          — Robert · Architect of Pantheon
        </div>
      </div>
    </motion.section>
  );
}
