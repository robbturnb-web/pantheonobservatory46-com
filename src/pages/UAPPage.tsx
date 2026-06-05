import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { uapCases } from '../data/uap-cases';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { SourceList } from '../components/SourceList';
import { VideoList } from '../components/VideoEmbed';
import { SpeciesBadgesForCase } from '../components/SpeciesBadge';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { VideoStrip } from '../components/VideoStrip';
import { useEchoXp } from '../hooks/use-echo-xp';
import { SEO } from '@/components/SEO';

export function UAPPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { trackUapOpen } = useEchoXp();

  const handleToggle = (id: string) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
      trackUapOpen(id);
    }
  };

  return (
    <div className="relative">
      <SEO
        title="UAP Case Files — Pantheon Observatory"
        description={`${uapCases.length} documented UAP encounters, each graded by evidence quality. Tic-Tac, Gimbal, GoFast and beyond.`}
        canonical="/uap"
      />

      {/* Cinematic hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(16,185,129,0.18), transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(16,185,129,0.10), transparent 60%), linear-gradient(180deg, rgba(5,3,13,0) 0%, hsl(var(--background)) 100%)',
          }}
        />
        {/* Scanline grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16,185,129,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] mb-4"
              style={{ color: '#10b981' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              Disclosure · Case Archive
            </div>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl mb-5 leading-tight"
              style={{
                fontFamily: 'Cinzel, serif',
                color: '#E5F8FF',
                textShadow: '0 0 28px rgba(16,185,129,0.35), 0 2px 12px rgba(0,0,0,0.7)',
              }}
            >
              UAP Case Files
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-6">
              {uapCases.length} documented encounters. Tic-Tac, Gimbal, GoFast, Nimitz, Calvine, and every credible sighting in between — each one graded by evidence quality, never by belief.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 self-center mr-1">Evidence tiers:</span>
              <div className="grade-documented px-3 py-1 rounded-full font-semibold">Documented</div>
              <div className="grade-credible px-3 py-1 rounded-full font-semibold">Credible</div>
              <div className="grade-speculative px-3 py-1 rounded-full font-semibold">Speculative</div>
              <div className="grade-unverified px-3 py-1 rounded-full font-semibold">Unverified</div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">


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
              {c.heroImage && (
                <button
                  type="button"
                  onClick={() => handleToggle(c.id)}
                  className="relative w-full h-48 sm:h-64 overflow-hidden group block"
                  aria-label={`Open ${c.title}`}
                >
                  <img
                    src={c.heroImage}
                    alt={c.title}
                    loading="lazy"
                    width={1280}
                    height={720}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 flex-wrap">
                    <EvidenceBadge grade={c.grade} />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{c.date}</span>
                  </div>
                </button>
              )}
              <button
                className="w-full text-left p-6 flex items-start justify-between gap-4"
                onClick={() => handleToggle(c.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h2 className="text-lg font-bold text-foreground">{c.title}</h2>
                    {!c.heroImage && <EvidenceBadge grade={c.grade} />}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {c.date}
                  </p>
                  <div className="mt-2"><SpeciesBadgesForCase caseId={c.id} /></div>
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

                      <SourceList sources={c.sources} />

                      {c.videos && c.videos.length > 0 && (
                        <VideoList videos={c.videos} title="Declassified Footage & Interviews" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8 mt-8">
        <VideoStrip topic="UAP" title="From the Field" subtitle="Latest UAP coverage from our tracked sources." limit={3} />
      </div>
    </div>
  );
}
