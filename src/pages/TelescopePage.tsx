import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Telescope as TelescopeIcon, ChevronDown, ChevronUp, Sparkles, Info } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { telescopes } from '../data/telescopes';

type FilterType = 'all' | 'space' | 'ground';

export function TelescopePage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = typeFilter === 'all' ? telescopes : telescopes.filter(t => t.type === typeFilter);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
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

        {/* Cards Grid */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((t, i) => {
              const isExpanded = expandedId === t.id;
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="glass-cosmic rounded-2xl overflow-hidden">
                    {/* Header with Image */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : t.id)}
                      className="w-full text-left"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Telescope Image */}
                        <div className="relative w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden">
                          <img
                            src={t.image}
                            alt={t.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(15,10,40,0.8)] hidden sm:block" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,40,0.8)] to-transparent sm:hidden" />
                          {/* Status badge on image */}
                          <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold ${
                            t.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            t.status === 'retired' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {t.status.toUpperCase()}
                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap mb-2">
                                <span className="text-2xl">{t.icon}</span>
                                <h3 className="text-xl font-bold text-foreground">{t.name}</h3>
                                <EvidenceBadge grade={t.grade} />
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                                <span className="font-mono bg-secondary px-2 py-0.5 rounded">{t.launchYear}</span>
                                <span className="capitalize">{t.type}-based</span>
                                <span>{t.discoveries.length} discoveries</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">{t.summary}</p>

                              {/* Specs row */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {t.specs.slice(0, 3).map((s, si) => (
                                  <span key={si} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded flex items-center gap-1">
                                    <Info className="w-3 h-3" /> {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-muted-foreground shrink-0 mt-1">
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                          </div>
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
                          <div className="px-5 pb-6 space-y-4 border-t border-border pt-4">
                            {/* All specs */}
                            {t.specs.length > 3 && (
                              <div className="flex flex-wrap gap-2">
                                {t.specs.slice(3).map((s, si) => (
                                  <span key={si} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded flex items-center gap-1">
                                    <Info className="w-3 h-3" /> {s}
                                  </span>
                                ))}
                              </div>
                            )}

                            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ background: t.accentColor }} />
                              Key Discoveries ({t.discoveries.length})
                            </h4>

                            <div className="relative">
                              <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: t.accentColor, opacity: 0.3 }} />
                              <div className="space-y-4">
                                {t.discoveries.map((d, di) => (
                                  <motion.div
                                    key={di}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: di * 0.05 }}
                                    className="flex gap-4 pl-8 relative"
                                  >
                                    <div
                                      className="absolute left-1.5 w-3 h-3 rounded-full border-2 border-background"
                                      style={{ background: t.accentColor, top: '0.25rem' }}
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-baseline gap-2 mb-0.5">
                                        <span className="text-xs font-mono text-primary shrink-0">{d.year}</span>
                                        <p className="text-sm font-semibold text-foreground">{d.title}</p>
                                      </div>
                                      <p className="text-sm text-muted-foreground">{d.description}</p>
                                      {d.significance && (
                                        <p className="text-xs mt-1 flex items-center gap-1" style={{ color: t.accentColor }}>
                                          <Sparkles className="w-3 h-3" /> {d.significance}
                                        </p>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            {t.anomalyConnections && (
                              <div className="bg-accent rounded-lg p-4 mt-3 border border-primary/20">
                                <p className="text-xs font-semibold text-accent-neon mb-1">⚡ Anomaly Connection</p>
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
  );
}
