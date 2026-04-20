import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, X, Sparkles, Zap } from 'lucide-react';
import { ELEMENTS, ELEMENT_CATEGORY_COLORS, type ChemElement } from '@/data/elements';
import { findReaction, speculativeOutcome, type ReactionOutcome } from '@/lib/element-reactions';

export function ElementMixer() {
  const [slotA, setSlotA] = useState<ChemElement | null>(null);
  const [slotB, setSlotB] = useState<ChemElement | null>(null);
  const [outcome, setOutcome] = useState<ReactionOutcome | null>(null);
  const [reacting, setReacting] = useState(false);
  const [madMode, setMadMode] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = ELEMENTS.filter(
    (e) =>
      !search ||
      e.symbol.toLowerCase().includes(search.toLowerCase()) ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      String(e.number) === search
  ).slice(0, 30);

  const handleReact = () => {
    if (!slotA || !slotB) return;
    setReacting(true);
    setOutcome(null);
    setTimeout(() => {
      const known = findReaction(slotA.symbol, slotB.symbol);
      const result = known ?? (madMode ? speculativeOutcome(slotA.symbol, slotB.symbol) : null);
      setOutcome(result ?? { product: 'No reaction', formula: '—', description: 'These elements do not produce a documented compound. Toggle Mad-Scientist mode for speculation.' });
      setReacting(false);
    }, 1100);
  };

  const reset = () => {
    setSlotA(null);
    setSlotB(null);
    setOutcome(null);
  };

  const Slot = ({ el, onClear, label }: { el: ChemElement | null; onClear: () => void; label: string }) => {
    const color = el ? ELEMENT_CATEGORY_COLORS[el.category] : 'hsl(var(--border))';
    return (
      <div
        className="relative aspect-square w-full max-w-[140px] mx-auto rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all"
        style={{
          borderColor: color,
          background: el ? `${color}20` : 'transparent',
          boxShadow: el ? `0 0 30px ${color}60` : 'none',
        }}
      >
        {el ? (
          <>
            <button
              onClick={onClear}
              className="absolute top-1 right-1 p-1 rounded-full bg-background/60 hover:bg-background"
              aria-label="Clear slot"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="text-[10px] opacity-60">{el.number}</div>
            <div className="text-3xl font-bold" style={{ color }}>{el.symbol}</div>
            <div className="text-[10px] opacity-80">{el.name}</div>
          </>
        ) : (
          <div className="text-xs text-muted-foreground">{label}</div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Beaker className="w-5 h-5 text-primary" /> Element Mixer
        </h2>
        <button
          type="button"
          onClick={() => setMadMode((v) => !v)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
            madMode
              ? 'border-[#39ff14] text-[#39ff14] bg-[#39ff14]/10 shadow-[0_0_12px_rgba(57,255,20,0.5)]'
              : 'border-border text-muted-foreground'
          }`}
        >
          <Zap className="w-3 h-3 inline mr-1" /> Mad-Scientist Mode {madMode ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <Slot el={slotA} onClear={() => setSlotA(null)} label="Slot A" />
        <div className="flex flex-col items-center gap-3">
          <AnimatePresence>
            {reacting && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 1], opacity: [0, 1, 0.6] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c77dff] via-[#39ff14] to-[#00d9ff] blur-xl"
              />
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={handleReact}
            disabled={!slotA || !slotB || reacting}
            className="px-4 py-2 rounded-full text-sm font-bold border border-primary bg-primary/20 text-primary hover:bg-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            {reacting ? 'Reacting…' : 'React →'}
          </button>
          <button onClick={reset} className="text-[10px] text-muted-foreground hover:text-foreground">
            Reset
          </button>
        </div>
        <Slot el={slotB} onClear={() => setSlotB(null)} label="Slot B" />
      </div>

      <AnimatePresence>
        {outcome && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="rounded-xl p-4 sm:p-6 border"
            style={{
              borderColor: outcome.exotic ? '#39ff14' : 'hsl(var(--border))',
              background: outcome.exotic ? 'rgba(57,255,20,0.06)' : 'hsl(var(--card))',
              boxShadow: outcome.fuel ? '0 0 30px rgba(57,255,20,0.3)' : 'none',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {outcome.fuel ? (
                <Sparkles className="w-4 h-4 text-[#39ff14]" />
              ) : outcome.exotic ? (
                <Zap className="w-4 h-4 text-[#39ff14]" />
              ) : (
                <Beaker className="w-4 h-4 text-primary" />
              )}
              <h3 className="font-bold text-base">{outcome.product}</h3>
              {outcome.fuel && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/40 font-mono">
                  UFO FUEL
                </span>
              )}
            </div>
            <div className="font-mono text-sm text-primary mb-2">{outcome.formula}</div>
            <p className="text-sm text-muted-foreground">{outcome.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search elements (Au, 79, gold)…"
          className="w-full px-3 py-2 rounded-md bg-input border border-border text-sm mb-3"
        />
        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-y-auto p-1">
          {filtered.map((el) => {
            const color = ELEMENT_CATEGORY_COLORS[el.category];
            return (
              <button
                key={el.symbol}
                type="button"
                onClick={() => {
                  if (!slotA) setSlotA(el);
                  else if (!slotB) setSlotB(el);
                  else setSlotA(el);
                }}
                className="aspect-square rounded border text-xs font-bold hover:scale-110 transition-transform"
                style={{
                  background: `${color}15`,
                  borderColor: `${color}60`,
                  color,
                }}
                title={`${el.name} (${el.symbol})`}
              >
                {el.symbol}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
