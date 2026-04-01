import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uapCases } from '../data/uap-cases';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ChevronDown, ChevronUp, ExternalLink, Clock } from 'lucide-react';

export function UAPPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">UAP Case Files</h1>
        <p className="text-muted-foreground text-lg mb-4">
          {uapCases.length} documented encounters. Every case graded by evidence quality.
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="grade-documented px-3 py-1 rounded-full font-semibold">Documented</div>
          <div className="grade-credible px-3 py-1 rounded-full font-semibold">Credible</div>
          <div className="grade-speculative px-3 py-1 rounded-full font-semibold">Speculative</div>
          <div className="grade-unverified px-3 py-1 rounded-full font-semibold">Unverified</div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {uapCases.map((c, i) => {
          const isOpen = expanded === c.id;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-cosmic rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex items-start justify-between gap-4"
                onClick={() => setExpanded(isOpen ? null : c.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h2 className="text-lg font-bold text-foreground">{c.title}</h2>
                    <EvidenceBadge grade={c.grade} />
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {c.date}
                  </p>
                  {!isOpen && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.summary}</p>
                  )}
                </div>
                <div className="mt-1 flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
                      <p className="text-foreground leading-relaxed">{c.summary}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-secondary/30 rounded-xl p-4">
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Official Explanation
                          </h3>
                          <p className="text-sm text-foreground">{c.officialExplanation}</p>
                        </div>
                        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                          <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                            Alternative Explanation
                          </h3>
                          <p className="text-sm text-foreground">{c.alternativeExplanation}</p>
                        </div>
                      </div>

                      {c.timeline.length > 0 && (
                        <div>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Case Timeline
                          </h3>
                          <div className="relative pl-4 border-l border-primary/30 space-y-3">
                            {c.timeline.map((t, ti) => (
                              <motion.div
                                key={ti}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: ti * 0.05 }}
                                className="flex gap-3"
                              >
                                <div className="absolute left-[-5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-primary/60" />
                                <div>
                                  <span className="text-primary font-mono text-xs">{t.year}</span>
                                  <p className="text-sm text-foreground">{t.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sources</h3>
                        <div className="flex flex-wrap gap-2">
                          {c.sources.map((s, si) => (
                            <span key={si} className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-lg flex items-center gap-1">
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
      </div>
    </div>
  );
}
