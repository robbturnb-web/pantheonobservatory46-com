import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uapCases } from '../data/uap-cases';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function UAPPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">UAP Case Files</h1>
        <p className="text-muted-foreground">Documented encounters with evidence grading.</p>
      </motion.div>

      <div className="space-y-4">
        {uapCases.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-cosmic rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left p-5 flex items-center justify-between"
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-lg font-bold text-foreground">{c.title}</h2>
                  <EvidenceBadge grade={c.grade} />
                </div>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>
              {expanded === c.id ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
            </button>

            <AnimatePresence>
              {expanded === c.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                    <p className="text-sm text-foreground">{c.summary}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Official Explanation</h3>
                        <p className="text-sm text-foreground">{c.officialExplanation}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-1">Alternative Explanation</h3>
                        <p className="text-sm text-foreground">{c.alternativeExplanation}</p>
                      </div>
                    </div>

                    {c.timeline.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Case Timeline</h3>
                        <div className="space-y-2">
                          {c.timeline.map((t, ti) => (
                            <div key={ti} className="flex gap-3 text-sm">
                              <span className="text-primary font-mono text-xs whitespace-nowrap">{t.year}</span>
                              <span className="text-foreground">{t.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {c.sources.map((s, si) => (
                        <span key={si} className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
