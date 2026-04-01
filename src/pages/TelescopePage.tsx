import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Telescope as TelescopeIcon, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { telescopes } from '../data/telescopes';

type FilterType = 'all' | 'space' | 'ground';

export function TelescopePage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = typeFilter === 'all' ? telescopes : telescopes.filter(t => t.type === typeFilter);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <TelescopeIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Telescope Observatory</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From Hubble to James Webb — every major telescope, their groundbreaking discoveries year by year,
            and connections to anomalous phenomena.
          </p>
        </motion.div>

        {/* Type Filter */}
        <div className="flex justify-center gap-2 mb-10">
          {(['all', 'space', 'ground'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                typeFilter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-cosmic text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'all' ? 'All' : f === 'space' ? '🛰 Space' : '📡 Ground'}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((t, i) => {
                const isExpanded = expandedId === t.id;
                return (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative pl-16 md:pl-20"
                  >
                    {/* Dot */}
                    <div
                      className="absolute left-4 md:left-6 w-5 h-5 rounded-full border-2 border-background z-10"
                      style={{ background: t.accentColor, top: '1.5rem' }}
                    />

                    <div className="glass-cosmic rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : t.id)}
                        className="w-full text-left p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-2xl">{t.icon}</span>
                              <h3 className="text-lg font-bold text-foreground">{t.name}</h3>
                              <EvidenceBadge grade={t.grade} />
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                              <span className="font-mono">{t.launchYear}</span>
                              <span className={`font-semibold ${
                                t.status === 'active' ? 'text-emerald-400' :
                                t.status === 'retired' ? 'text-amber-400' : 'text-red-400'
                              }`}>
                                {t.status.toUpperCase()}
                              </span>
                              <span className="capitalize">{t.type}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{t.summary}</p>
                          </div>
                          <div className="text-muted-foreground shrink-0 mt-1">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                              <h4 className="text-sm font-semibold text-foreground">Key Discoveries</h4>
                              <div className="space-y-3">
                                {t.discoveries.map((d, di) => (
                                  <div key={di} className="flex gap-3">
                                    <span className="text-xs font-mono text-primary shrink-0 w-16 pt-0.5">{d.year}</span>
                                    <div>
                                      <p className="text-sm font-semibold text-foreground">{d.title}</p>
                                      <p className="text-sm text-muted-foreground">{d.description}</p>
                                      {d.significance && (
                                        <p className="text-xs text-primary mt-1 flex items-center gap-1">
                                          <Sparkles className="w-3 h-3" /> {d.significance}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {t.anomalyConnections && (
                                <div className="bg-accent rounded-lg p-3 mt-3">
                                  <p className="text-xs font-semibold text-primary mb-1">⚡ Anomaly Connection</p>
                                  <p className="text-sm text-muted-foreground">{t.anomalyConnections}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
