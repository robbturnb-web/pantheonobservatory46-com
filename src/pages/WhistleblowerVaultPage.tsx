import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { whistleblowers, type Whistleblower } from '../data/whistleblowers';
import type { EvidenceGrade } from '../types';

const gradeFilters: ('ALL' | EvidenceGrade)[] = ['ALL', 'DOCUMENTED', 'CREDIBLE', 'SPECULATIVE', 'UNVERIFIED'];

const statusColors: Record<Whistleblower['status'], string> = {
  alive: 'text-emerald-400',
  deceased: 'text-amber-400',
  murdered: 'text-red-400',
};

const statusLabels: Record<Whistleblower['status'], string> = {
  alive: '● Alive',
  deceased: '● Deceased',
  murdered: '● Murdered / Suspicious Death',
};

export function WhistleblowerVaultPage() {
  const [filter, setFilter] = useState<'ALL' | EvidenceGrade>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = filter === 'ALL' ? whistleblowers : whistleblowers.filter(w => w.grade === filter);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Whistleblower Vault</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Those who risked everything to tell the truth. Evidence-graded profiles of the most significant
            whistleblowers in UAP and classified program disclosure.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {gradeFilters.map(g => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === g
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-cosmic text-muted-foreground hover:text-foreground'
              }`}
            >
              {g === 'ALL' ? 'All' : g.charAt(0) + g.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((w, i) => {
              const isExpanded = expandedId === w.id;
              return (
                <motion.div
                  key={w.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-cosmic rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : w.id)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="text-4xl w-14 h-14 flex items-center justify-center rounded-lg shrink-0"
                        style={{ background: `${w.accentColor}20` }}
                      >
                        {w.photo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="text-lg font-bold text-foreground">{w.name}</h3>
                          <EvidenceBadge grade={w.grade} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{w.role}</p>
                        <span className={`text-xs font-semibold ${statusColors[w.status]}`}>
                          {statusLabels[w.status]}
                        </span>
                      </div>
                      <div className="text-muted-foreground shrink-0">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{w.summary}</p>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
                          {/* Key Claims */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Key Claims</h4>
                            <ul className="space-y-1.5">
                              {w.keyClaims.map((claim, ci) => (
                                <li key={ci} className="text-sm text-muted-foreground flex gap-2">
                                  <span className="text-primary mt-1">▸</span>
                                  <span>{claim}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Timeline */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Timeline</h4>
                            <div className="space-y-2">
                              {w.timeline.map((t, ti) => (
                                <div key={ti} className="flex gap-3 text-sm">
                                  <span className="text-primary font-mono shrink-0 w-20">{t.year}</span>
                                  <span className="text-muted-foreground">{t.event}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Sources */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">Sources</h4>
                            <div className="flex flex-wrap gap-2">
                              {w.sources.map((s, si) => (
                                <span key={si} className="text-xs px-2 py-1 rounded-md bg-accent text-accent-foreground flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" /> {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
