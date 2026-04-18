import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Skull, AlertTriangle, Eye } from 'lucide-react';
import { shadowGods, SHADOW_LORE, type ShadowGod } from '@/data/shadow-gods';

function ShadowGodModal({ god, onClose }: { god: ShadowGod; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full max-h-[88vh] overflow-y-auto rounded-2xl border border-red-900/40 bg-black/80"
        style={{ boxShadow: '0 0 60px rgba(180, 0, 0, 0.25)' }}
      >
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: god.atmosphericBg, opacity: 0.5 }} />

        <div className="relative z-10 p-7">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-foreground hover:bg-red-900/50 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.15 }}
              className="text-6xl block mb-3 grayscale-[40%]"
            >
              {god.symbol}
            </motion.span>
            <h2 className="text-3xl font-black text-foreground tracking-tight">{god.name}</h2>
            <p className="text-sm text-red-400/80 mt-1 uppercase tracking-[3px]">{god.pantheon}</p>
          </div>

          {god.warning && (
            <div className="mb-5 flex items-start gap-2 px-3 py-2 rounded-lg border border-red-800/50 bg-red-950/40">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-200/90">{god.warning}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <h3 className="text-[10px] font-semibold text-red-400/80 uppercase tracking-[2px] mb-1">Archetype</h3>
              <p className="text-sm text-foreground/95 leading-relaxed">{god.archetypeRole}</p>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold text-red-400/80 uppercase tracking-[2px] mb-2">Domains</h3>
              <div className="flex flex-wrap gap-1.5">
                {god.domains.map((d) => (
                  <span key={d} className="text-xs bg-red-950/40 text-red-100 px-2.5 py-0.5 rounded-full border border-red-900/40">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold text-red-400/80 uppercase tracking-[2px] mb-1">Atmosphere</h3>
              <p className="text-sm text-muted-foreground italic leading-relaxed">{god.atmosphericDesc}</p>
            </div>

            <div className="border-t border-red-900/30 pt-4">
              <h3 className="text-[10px] font-semibold text-red-400/80 uppercase tracking-[2px] mb-1">Shadow Aspect</h3>
              <p className="text-sm text-foreground/90 leading-relaxed">{god.shadowAspect}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-t border-red-900/40 pt-4"
            >
              <h3 className="text-[10px] font-semibold text-red-400 uppercase tracking-[2px] mb-2">Reflection</h3>
              <p className="text-foreground italic text-base leading-relaxed">"{god.reflectionQuestion}"</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ShadowPantheonPage() {
  const [selected, setSelected] = useState<ShadowGod | null>(null);

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto relative"
      style={{
        background:
          'radial-gradient(ellipse at top, rgba(60, 0, 0, 0.15), transparent 60%), radial-gradient(ellipse at bottom, rgba(20, 0, 30, 0.2), transparent 60%)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-900/40 text-[10px] uppercase tracking-[3px] text-red-300 mb-4">
          <Skull className="w-3 h-3" />
          Restricted Chamber
        </div>
        <h1
          className="text-5xl sm:text-7xl font-black tracking-tight mb-3"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--foreground)) 0%, rgba(180, 30, 30, 0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {SHADOW_LORE.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto italic">
          {SHADOW_LORE.subtitle}
        </p>
      </motion.div>

      {/* Lore */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-5 sm:p-6 mb-8 border border-red-900/30 bg-black/40 backdrop-blur-sm"
      >
        <p className="text-sm text-foreground/85 leading-relaxed mb-4">{SHADOW_LORE.intro}</p>
        <div className="flex items-start gap-2 text-[10px] uppercase tracking-wider text-red-300/90 border-l-2 border-red-500/60 pl-3">
          <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
          <span className="leading-relaxed">{SHADOW_LORE.warning}</span>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shadowGods.map((god, i) => (
          <motion.button
            key={god.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ scale: 1.025, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(god)}
            className="relative text-left rounded-xl overflow-hidden border border-red-950/50 bg-black/60 hover:border-red-700/60 transition-colors group cursor-pointer min-h-[200px]"
          >
            {/* Atmospheric backdrop */}
            <div
              className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity duration-700"
              style={{ background: god.atmosphericBg }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            <div className="relative z-10 p-5 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-4xl grayscale-[30%] group-hover:grayscale-0 transition-all">{god.symbol}</span>
                {god.warning && (
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400/70" />
                )}
              </div>

              <div>
                <h2 className="font-black text-xl text-foreground mb-0.5 tracking-tight">{god.name}</h2>
                <p className="text-[10px] uppercase tracking-[2px] text-red-300/70 mb-2">{god.pantheon}</p>
                <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">{god.archetypeRole}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12 text-xs text-muted-foreground/70 max-w-md mx-auto"
      >
        <Eye className="w-4 h-4 mx-auto mb-2 text-red-500/50" />
        <p className="italic">"What you do not bring into the light, you live out as fate." — C.G. Jung</p>
      </motion.div>

      <AnimatePresence>
        {selected && <ShadowGodModal god={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
