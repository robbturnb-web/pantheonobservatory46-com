import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Sparkles, Beaker, X } from 'lucide-react';
import { PeriodicTable } from '@/components/elements/PeriodicTable';
import { ElementMixer } from '@/components/elements/ElementMixer';
import { ELEMENTS, ELEMENT_CATEGORY_COLORS, type ChemElement } from '@/data/elements';
import { useEchoXp } from '@/hooks/use-echo-xp';
import { XP_VALUES } from '@/lib/xp-events';

export function ElementsLabPage() {
  const [tab, setTab] = useState<'table' | 'mixer'>('table');
  const [selected, setSelected] = useState<ChemElement | null>(null);
  const { userId, awardEvent } = useEchoXp();

  useEffect(() => {
    document.title = 'Elements & Alchemy Lab — Pantheon Observatory';
  }, []);

  const handleSelect = (el: ChemElement) => {
    setSelected(el);
    if (userId) {
      awardEvent('page', `element:${el.symbol}`, XP_VALUES.ELEMENT_OPEN, `Studied ${el.name}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-xs uppercase tracking-wider text-primary mb-4">
          <Atom className="w-3.5 h-3.5" /> Alchemy Lab
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Elements & Alchemy Lab</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Full periodic table with disclosure lore on the elements that matter — Element 115 (Bob Lazar fuel), gold (Anunnaki extraction), magnesium (Ubatuba UFO), and more.
        </p>
      </motion.header>

      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setTab('table')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            tab === 'table'
              ? 'bg-primary/20 border-primary text-primary'
              : 'border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <Atom className="w-4 h-4 inline mr-1.5" /> Periodic Table
        </button>
        <button
          onClick={() => setTab('mixer')}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
            tab === 'mixer'
              ? 'bg-primary/20 border-primary text-primary'
              : 'border-border text-muted-foreground hover:text-foreground'
          }`}
        >
          <Beaker className="w-4 h-4 inline mr-1.5" /> Element Mixer
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="glass-cosmic rounded-xl p-4 sm:p-6">
          {tab === 'table' ? (
            <PeriodicTable
              selected={selected?.symbol ?? null}
              onSelect={handleSelect}
            />
          ) : (
            <ElementMixer />
          )}
        </div>

        <AnimatePresence mode="wait">
          {selected && tab === 'table' ? (
            <motion.aside
              key={selected.symbol}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-cosmic rounded-xl p-5 h-fit sticky top-20"
              style={{
                borderColor: ELEMENT_CATEGORY_COLORS[selected.category],
                borderWidth: 1,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs text-muted-foreground">{selected.number}</div>
                  <div
                    className="text-5xl font-bold mb-1"
                    style={{ color: ELEMENT_CATEGORY_COLORS[selected.category] }}
                  >
                    {selected.symbol}
                  </div>
                  <div className="text-lg font-medium">{selected.name}</div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1 rounded-full hover:bg-accent"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Atomic mass</span>
                  <span className="font-mono">{selected.mass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="capitalize">{selected.category.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period · Group</span>
                  <span>{selected.period} · {selected.group || 'f-block'}</span>
                </div>
              </div>
              {selected.lore && (
                <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-primary mb-2">
                    <Sparkles className="w-3 h-3" /> Disclosure Lore
                  </div>
                  <p className="text-sm leading-relaxed">{selected.lore}</p>
                </div>
              )}
            </motion.aside>
          ) : (
            <aside className="glass-cosmic rounded-xl p-5 h-fit text-sm text-muted-foreground hidden lg:block">
              {tab === 'table'
                ? 'Click any element to inspect. Stars (✦) mark elements with disclosure lore.'
                : 'Drag two elements into slots and react. Toggle Mad-Scientist mode for UFO-fuel speculation.'}
            </aside>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground/70 text-center mt-8">
        Lore claims (Lazar / Ubatuba / Anunnaki) are presented as cultural and disclosure-community narratives. Physical chemistry data is standard IUPAC.
      </p>
    </div>
  );
}
