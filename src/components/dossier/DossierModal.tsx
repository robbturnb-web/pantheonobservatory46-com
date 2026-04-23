import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, Eye, Play, BookOpen, ShieldAlert } from 'lucide-react';
import { VideoEmbed } from '@/components/VideoEmbed';
import type { DossierEntry } from './types';
import type { PageTheme } from '@/lib/page-themes';

interface DossierModalProps {
  entry: DossierEntry | null;
  theme: PageTheme;
  onClose: () => void;
}

type Tab = 'overview' | 'evidence' | 'watch' | 'sources';

export function DossierModal({ entry, theme, onClose }: DossierModalProps) {
  const [tab, setTab] = useState<Tab>('overview');

  if (!entry) return null;

  const hasVideos = (entry.videos?.length ?? 0) > 0;
  const hasSources = (entry.sources?.length ?? 0) > 0;
  const hasEvidence = (entry.evidence?.length ?? 0) > 0 || (entry.keyEvents?.length ?? 0) > 0 || !!entry.skepticalView;

  const tabs: { id: Tab; label: string; icon: typeof Eye; show: boolean }[] = [
    { id: 'overview', label: 'Overview', icon: BookOpen, show: true },
    { id: 'evidence', label: 'Evidence', icon: ShieldAlert, show: hasEvidence },
    { id: 'watch', label: 'Watch', icon: Play, show: hasVideos },
    { id: 'sources', label: 'Sources', icon: FileText, show: hasSources },
  ];
  const visibleTabs = tabs.filter((t) => t.show);

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl my-8 rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: theme.pageBg,
              border: `1px solid ${theme.cardBorder}`,
              fontFamily: theme.fontFamily,
            }}
          >
            {/* Classification banner */}
            <div
              className="px-5 py-1.5 text-[10px] font-bold tracking-[0.3em] text-center"
              style={{
                background: `${theme.accent}15`,
                color: theme.accent,
                fontFamily: "'Space Mono', monospace",
                borderBottom: `1px solid ${theme.cardBorder}`,
              }}
            >
              {theme.classificationLabel} · CASE FILE #{entry.id.toUpperCase()}
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-9 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ color: theme.heroFg }}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="px-5 md:px-8 pt-6 pb-5">
              <div className="flex items-start gap-3 mb-2">
                {entry.symbol && (
                  <span className="text-3xl mt-1" aria-hidden>
                    {entry.symbol}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  {entry.category && (
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1"
                      style={{ color: theme.accent }}
                    >
                      {entry.category}
                    </p>
                  )}
                  <h2
                    className="text-2xl md:text-3xl font-bold leading-tight"
                    style={{ color: theme.heroFg }}
                  >
                    {entry.title}
                  </h2>
                  {entry.subtitle && (
                    <p className="mt-1 text-sm opacity-75" style={{ color: theme.heroFg }}>
                      {entry.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-3 flex-wrap mt-3 text-[11px] uppercase tracking-wider opacity-70" style={{ color: theme.heroFg }}>
                {entry.era && <span>📅 {entry.era}</span>}
                {entry.location && <span>📍 {entry.location}</span>}
                {entry.confidence && <span>🛡 {entry.confidence}</span>}
              </div>
            </div>

            {/* Tabs */}
            <div
              className="flex gap-1 px-5 md:px-8 border-b overflow-x-auto"
              style={{ borderColor: theme.cardBorder }}
            >
              {visibleTabs.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="relative px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors"
                    style={{
                      color: active ? theme.accent : `${theme.heroFg}99`,
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <t.icon className="w-3.5 h-3.5" />
                      {t.label}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="dossier-tab"
                        className="absolute -bottom-px left-0 right-0 h-0.5"
                        style={{ background: theme.accent }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="px-5 md:px-8 py-6 max-h-[60vh] overflow-y-auto" style={{ color: theme.heroFg }}>
              {tab === 'overview' && (
                <div className="space-y-5">
                  <p className="text-base leading-relaxed opacity-90">{entry.summary}</p>
                  {entry.origin?.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm md:text-base leading-relaxed opacity-85">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {tab === 'evidence' && (
                <div className="space-y-6">
                  {entry.keyEvents && entry.keyEvents.length > 0 && (
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: theme.accent }}>
                        Key Events
                      </h4>
                      <ul className="space-y-2">
                        {entry.keyEvents.map((k, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed opacity-85">
                            <span style={{ color: theme.accent }}>▸</span>
                            <span>{k}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {entry.evidence && entry.evidence.length > 0 && (
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: theme.accent }}>
                        Evidence Log
                      </h4>
                      <ul className="space-y-2">
                        {entry.evidence.map((e, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm leading-relaxed opacity-85 p-3 rounded border"
                            style={{ background: `${theme.accent}08`, borderColor: theme.cardBorder }}
                          >
                            <span style={{ color: theme.accent }}>◆</span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {entry.skepticalView && (
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-80">
                        Mainstream / Skeptical View
                      </h4>
                      <p className="text-sm leading-relaxed opacity-75 italic p-4 rounded border-l-2" style={{ borderColor: `${theme.accent}55` }}>
                        {entry.skepticalView}
                      </p>
                    </section>
                  )}
                </div>
              )}

              {tab === 'watch' && (
                <div className="space-y-4">
                  {entry.videos?.map((v) => (
                    <div key={v.id} className="space-y-1.5">
                      <VideoEmbed video={{ platform: 'youtube', id: v.id, title: v.title }} />
                      <p className="text-xs opacity-60 px-1">
                        {v.channel}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'sources' && (
                <ul className="space-y-2">
                  {entry.sources?.map((s, i) => (
                    <li key={i}>
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:underline"
                          style={{ color: theme.accent }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          {s.label}
                        </a>
                      ) : (
                        <span className="flex items-center gap-2 text-sm opacity-80">
                          <FileText className="w-3.5 h-3.5" />
                          {s.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
