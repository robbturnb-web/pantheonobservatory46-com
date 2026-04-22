import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scroll, Swords, Sparkles, Users, Flame, Compass, Lock, Play } from 'lucide-react';
import type { God } from '@/types';
import { SourceList } from '@/components/SourceList';
import { RankUnlock } from '@/components/RankUnlock';
import { VideoEmbed } from '@/components/VideoEmbed';
import { godVideos } from '@/data/god-videos';

type TabId = 'origin' | 'myths' | 'powers' | 'relationships' | 'worship' | 'modern' | 'watch' | 'oracle';

const TABS: { id: TabId; label: string; icon: typeof Scroll }[] = [
  { id: 'origin', label: 'Origin', icon: Scroll },
  { id: 'myths', label: 'Myths', icon: Sparkles },
  { id: 'powers', label: 'Powers', icon: Swords },
  { id: 'relationships', label: 'Bonds', icon: Users },
  { id: 'worship', label: 'Worship', icon: Flame },
  { id: 'modern', label: 'Modern', icon: Compass },
  { id: 'watch', label: 'Watch', icon: Play },
  { id: 'oracle', label: 'Oracle', icon: Lock },
];

interface Props {
  god: God;
  onClose: () => void;
}

export function GodDossierModal({ god, onClose }: Props) {
  const [tab, setTab] = useState<TabId>('origin');

  const hasContent = (id: TabId): boolean => {
    switch (id) {
      case 'origin': return !!god.originStory;
      case 'myths': return !!(god.keyMyths && god.keyMyths.length);
      case 'powers': return !!(god.powersAndRelics && god.powersAndRelics.length);
      case 'relationships': return !!(god.relationships && god.relationships.length);
      case 'worship': return !!god.worship;
      case 'modern': return !!god.modernRelevance;
      case 'oracle': return !!god.oracleLore;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="relative max-w-2xl w-full max-h-[90vh] flex flex-col rounded-2xl overflow-hidden glass-cosmic border border-primary/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-44 sm:h-56 shrink-0 overflow-hidden">
          {god.image ? (
            <img src={god.image} alt={god.name} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="absolute inset-0" style={{ background: god.atmosphericBg }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-foreground hover:bg-black/80 transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <div className="flex items-end gap-3">
              <span className="text-4xl sm:text-5xl drop-shadow-lg">{god.symbol}</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight tracking-tight">
                  {god.name}
                </h2>
                <p className="text-xs uppercase tracking-[3px] text-primary/90">
                  {god.pantheon} · {god.archetypeRole.split('—')[0].trim()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border bg-background/80 backdrop-blur-sm overflow-x-auto scrollbar-hide shrink-0">
          <div className="flex min-w-max">
            {TABS.map((t) => {
              const filled = hasContent(t.id);
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  disabled={!filled && t.id !== 'oracle'}
                  className={`relative px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    active
                      ? 'text-accent-neon'
                      : filled
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-muted-foreground/30 cursor-not-allowed'
                  }`}
                >
                  <t.icon className="w-3 h-3" />
                  {t.label}
                  {active && (
                    <motion.div
                      layoutId="god-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-neon"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content (scrollable) */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4 text-sm leading-relaxed text-foreground/90">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'origin' && (
                <div className="space-y-4">
                  <p className="whitespace-pre-line">{god.originStory ?? <em className="text-muted-foreground">Origin lore not yet recorded for this archetype.</em>}</p>
                  {god.domains?.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[3px] text-primary mb-2">Domains</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {god.domains.map((d) => (
                          <span key={d} className="text-xs bg-primary/10 text-foreground px-2.5 py-0.5 rounded-full border border-primary/20">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {tab === 'myths' && (
                <div className="space-y-5">
                  {god.keyMyths?.length ? (
                    god.keyMyths.map((myth, i) => (
                      <div key={i} className="border-l-2 border-primary/40 pl-4">
                        <h4 className="text-base font-bold text-accent-neon mb-1.5">{myth.title}</h4>
                        <p className="whitespace-pre-line">{myth.body}</p>
                      </div>
                    ))
                  ) : (
                    <em className="text-muted-foreground">Core myths still being transcribed.</em>
                  )}
                </div>
              )}

              {tab === 'powers' && (
                <ul className="space-y-2">
                  {god.powersAndRelics?.length ? (
                    god.powersAndRelics.map((p, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent-neon shrink-0">▸</span>
                        <span>{p}</span>
                      </li>
                    ))
                  ) : (
                    <em className="text-muted-foreground">Powers not yet catalogued.</em>
                  )}
                </ul>
              )}

              {tab === 'relationships' && (
                <ul className="space-y-2">
                  {god.relationships?.length ? (
                    god.relationships.map((r, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary shrink-0">◆</span>
                        <span>{r}</span>
                      </li>
                    ))
                  ) : (
                    <em className="text-muted-foreground">Bonds not yet mapped.</em>
                  )}
                </ul>
              )}

              {tab === 'worship' && (
                <p className="whitespace-pre-line">
                  {god.worship ?? <em className="text-muted-foreground">Worship records not yet recovered.</em>}
                </p>
              )}

              {tab === 'modern' && (
                <div className="space-y-4">
                  <p className="whitespace-pre-line">
                    {god.modernRelevance ?? <em className="text-muted-foreground">Modern resonance pending interpretation.</em>}
                  </p>
                  <div className="border-t border-border pt-4">
                    <h4 className="text-[10px] uppercase tracking-[3px] text-primary mb-2">Reflection</h4>
                    <p className="text-foreground italic text-base leading-relaxed">
                      "{god.reflectionQuestion}"
                    </p>
                  </div>
                </div>
              )}

              {tab === 'oracle' && (
                <RankUnlock minXp={1000} rankName="Oracle" label="esoteric stratum">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                      <div className="text-[10px] uppercase tracking-[3px] text-amber-300 mb-1">Oracle Stratum</div>
                      <p className="whitespace-pre-line text-amber-50/90">
                        {god.oracleLore ?? 'Deeper transmission pending.'}
                      </p>
                    </div>
                    {god.quotes?.length ? (
                      <div className="space-y-2">
                        {god.quotes.map((q, i) => (
                          <blockquote key={i} className="text-sm italic text-foreground/80 border-l-2 border-amber-500/40 pl-3">
                            "{q}"
                          </blockquote>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </RankUnlock>
              )}
            </motion.div>
          </AnimatePresence>

          {god.sources && god.sources.length > 0 && (
            <div className="pt-3 border-t border-border">
              <SourceList sources={god.sources} />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
