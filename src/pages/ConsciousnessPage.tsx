import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { consciousnessSections } from '../data/consciousness';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { HeroSection } from '@/components/HeroSection';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export function ConsciousnessPage() {
  const [expanded, setExpanded] = useState<string | null>(consciousnessSections[0]?.id ?? null);

  return (
    <>
      <HeroSection
        label="Realm of Consciousness"
        title="Consciousness Lab"
        tagline={`From classified military programs to the frontiers of mind. ${consciousnessSections.length} research topics, evidence-graded.`}
        accent="#4F46E5"
        atmosphere={{ radial: true, orbs: true }}
      >
        <div className="flex flex-wrap gap-3 text-xs mt-4">
          <div className="grade-documented px-3 py-1 rounded-full font-semibold">Documented — Government-confirmed</div>
          <div className="grade-credible px-3 py-1 rounded-full font-semibold">Credible — Scientific basis</div>
          <div className="grade-speculative px-3 py-1 rounded-full font-semibold">Speculative — Hypothesis stage</div>
        </div>
      </HeroSection>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-4">
        {consciousnessSections.map((section, i) => {
          const isOpen = expanded === section.id;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-cosmic rounded-xl overflow-hidden"
            >
              <button
                className="w-full text-left p-6 flex items-start justify-between gap-4"
                onClick={() => setExpanded(isOpen ? null : section.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                    <EvidenceBadge grade={section.grade} />
                  </div>
                  <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                </div>
                <div className="mt-1 flex-shrink-0">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
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
                      <p className="text-foreground leading-relaxed">{section.summary}</p>

                      <div className="grid grid-cols-1 gap-2">
                        {section.keyFacts.map((fact, fi) => (
                          <motion.div
                            key={fi}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: fi * 0.05 }}
                            className="flex items-start gap-3 bg-secondary/30 rounded-lg px-4 py-2.5"
                          >
                            <span className="text-primary mt-0.5 flex-shrink-0">▸</span>
                            <p className="text-sm text-foreground">{fact}</p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/20 rounded-lg p-3">
                        <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <p className="italic">{section.sourceNote}</p>
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
    </>
  );
}
