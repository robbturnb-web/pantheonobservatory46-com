import { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type LayoutKey = 'pillars' | 'temple' | 'constellation' | 'console' | 'cathedral';

const LAYOUTS: Array<{ key: LayoutKey; label: string; sub: string }> = [
  { key: 'pillars', label: 'Pillars', sub: 'Four colossal columns' },
  { key: 'temple', label: 'Temple', sub: 'Inside the ruined hall' },
  { key: 'constellation', label: 'Constellations', sub: 'Living night sky' },
  { key: 'console', label: 'Oracle Console', sub: 'Retro CRT control room' },
  { key: 'cathedral', label: 'Cathedral', sub: '3D star nave' },
];

const STORAGE_KEY = 'pantheon.homeLayout';

export function readStoredLayout(): LayoutKey {
  if (typeof window === 'undefined') return 'pillars';
  // URL takes precedence
  const url = new URL(window.location.href);
  const fromUrl = url.searchParams.get('layout') as LayoutKey | null;
  if (fromUrl && LAYOUTS.some((l) => l.key === fromUrl)) {
    window.localStorage.setItem(STORAGE_KEY, fromUrl);
    return fromUrl;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY) as LayoutKey | null;
  if (stored && LAYOUTS.some((l) => l.key === stored)) return stored;
  return 'pillars';
}

interface Props {
  active: LayoutKey;
  onChange: (key: LayoutKey) => void;
}

export function ConceptSwitcher({ active, onChange }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, active);
  }, [active]);

  const activeMeta = LAYOUTS.find((l) => l.key === active) ?? LAYOUTS[0];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-2 w-64 rounded-xl border border-white/15 bg-black/85 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-white/10">
              <div className="text-[10px] uppercase tracking-[3px] text-white/50">Layout Concept</div>
              <div className="text-sm text-white font-semibold mt-0.5">Pick a homepage</div>
            </div>
            <ul className="py-1 max-h-72 overflow-y-auto">
              {LAYOUTS.map((l) => {
                const isActive = l.key === active;
                return (
                  <li key={l.key}>
                    <button
                      onClick={() => {
                        onChange(l.key);
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 transition-colors flex items-start gap-3 ${
                        isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <span
                        className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                          isActive ? 'bg-emerald-400' : 'bg-white/30'
                        }`}
                      />
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium">{l.label}</span>
                        <span className="block text-[11px] text-white/50">{l.sub}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/15 bg-black/80 backdrop-blur-xl text-white text-xs uppercase tracking-[2px] hover:border-white/30 transition-colors shadow-lg"
      >
        <Layers className="w-3.5 h-3.5" />
        Layout · {activeMeta.label}
      </button>
    </div>
  );
}
