import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { Atmosphere } from './Atmosphere';
import { DossierCard } from './DossierCard';
import { DossierModal } from './DossierModal';
import type { DossierEntry } from './types';
import type { PageTheme } from '@/lib/page-themes';

interface DossierPageLayoutProps {
  theme: PageTheme;
  entries: DossierEntry[];
  /** Optional categories to filter by — first one is used as "All" */
  categories?: string[];
  /** Optional content rendered above the grid (e.g., classified intro paragraph) */
  introSlot?: ReactNode;
  /** Optional content rendered below the grid */
  footerSlot?: ReactNode;
}

export function DossierPageLayout({
  theme,
  entries,
  categories,
  introSlot,
  footerSlot,
}: DossierPageLayoutProps) {
  const [open, setOpen] = useState<DossierEntry | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (filter !== 'All' && e.category !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          (e.subtitle?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [entries, filter, query]);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: theme.pageBg,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Hero */}
      <header className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
        {/* Atmosphere — desktop only */}
        <div className="hidden lg:block absolute inset-0">
          <Atmosphere id={theme.atmosphere} accent={theme.accent} />
        </div>
        <div
          className="absolute inset-0"
          style={{ background: theme.heroOverlay }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Classification banner */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-[10px] font-bold tracking-[0.3em] border"
            style={{
              color: theme.accent,
              borderColor: theme.accent,
              background: `${theme.accent}10`,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: theme.accent }} />
            {theme.classificationLabel}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-3"
            style={{ color: theme.heroFg }}
          >
            {theme.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-xl opacity-80 max-w-3xl"
            style={{ color: theme.heroFg }}
          >
            {theme.tagline}
          </motion.p>

          {introSlot && (
            <div className="mt-8 max-w-3xl text-sm md:text-base opacity-85 leading-relaxed" style={{ color: theme.heroFg }}>
              {introSlot}
            </div>
          )}
        </div>
      </header>

      {/* Filter / search bar */}
      <div className="sticky top-16 z-30 backdrop-blur-md border-y" style={{ background: `${theme.pageBg}`, borderColor: theme.cardBorder }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `${theme.heroFg}99` }} />
            <input
              type="text"
              placeholder="Search the archive…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1"
              style={{
                background: `${theme.accent}10`,
                border: `1px solid ${theme.cardBorder}`,
                color: theme.heroFg,
              }}
            />
          </div>
          {categories && categories.length > 1 && (
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((c) => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className="px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all"
                    style={{
                      color: active ? theme.heroFg : `${theme.heroFg}88`,
                      background: active ? theme.accent : `${theme.accent}10`,
                      border: `1px solid ${active ? theme.accent : theme.cardBorder}`,
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {filtered.length === 0 ? (
          <p className="text-center opacity-60 py-20" style={{ color: theme.heroFg }}>
            No matching files in this archive.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((entry, i) => (
              <DossierCard
                key={entry.id}
                entry={entry}
                theme={theme}
                index={i}
                onOpen={() => setOpen(entry)}
              />
            ))}
          </div>
        )}

        {footerSlot && <div className="mt-12">{footerSlot}</div>}
      </main>

      <DossierModal entry={open} theme={theme} onClose={() => setOpen(null)} />
    </div>
  );
}
