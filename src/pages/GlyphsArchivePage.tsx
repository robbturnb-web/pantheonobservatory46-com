import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, X } from 'lucide-react';
import { GLYPHS, type Glyph } from '@/data/glyphs';
import { GlyphDecoder } from '@/components/glyphs/GlyphDecoder';

export function GlyphsArchivePage() {
  const [selected, setSelected] = useState<Glyph | null>(null);

  useEffect(() => {
    document.title = 'Glyphs & Symbols Archive — Pantheon Observatory';
  }, []);

  const cultures = Array.from(new Set(GLYPHS.map((g) => g.culture)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-xs uppercase tracking-wider text-primary mb-4">
          <ScanLine className="w-3.5 h-3.5" /> Symbol Archive
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Glyphs & Symbols</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {GLYPHS.length} ancient marks across {cultures.length} cultures. Browse the archive — or upload / draw your own glyph and let Echo decode it.
        </p>
      </motion.header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {GLYPHS.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              onClick={() => setSelected(g)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              className="group glass-cosmic rounded-xl aspect-square flex flex-col items-center justify-center p-3 border border-border hover:border-primary/50 transition-all"
            >
              <div className="text-5xl mb-2 group-hover:scale-110 transition-transform" aria-hidden>
                {g.glyph}
              </div>
              <div className="text-[10px] text-center text-muted-foreground leading-tight">
                {g.culture}
              </div>
            </motion.button>
          ))}
        </section>

        <aside className="glass-cosmic rounded-xl p-4 h-fit lg:sticky lg:top-20">
          <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
            <ScanLine className="w-4 h-4 text-primary" /> Echo Decoder
          </h2>
          <GlyphDecoder />
        </aside>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-cosmic rounded-2xl max-w-lg w-full p-6 border border-primary/40"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-accent"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-7xl text-center mb-4">{selected.glyph}</div>
              <h3 className="text-xl font-bold text-center mb-1">{selected.name}</h3>
              <div className="text-xs text-center text-muted-foreground mb-4">
                {selected.culture} · {selected.era}
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-primary mb-1">Literal meaning</div>
                  <p className="text-muted-foreground">{selected.meaning}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="text-xs uppercase tracking-wider text-primary mb-1">ET / Disclosure interpretation</div>
                  <p>{selected.etInterpretation}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selected.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50">#{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
