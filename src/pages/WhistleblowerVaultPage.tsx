import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ChevronUp, Skull } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { SourceList } from '../components/SourceList';
import { VideoList } from '../components/VideoEmbed';
import { SpeciesBadgesForWitness } from '../components/SpeciesBadge';
import { SuspiciousDeathsSection } from '../components/SuspiciousDeathsSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { whistleblowers, type Whistleblower } from '../data/whistleblowers';
import type { EvidenceGrade } from '../types';
import { useEchoXp } from '../hooks/use-echo-xp';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/HeroSection';

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
  const { trackWhistleblowerOpen } = useEchoXp();

  const filtered = filter === 'ALL' ? whistleblowers : whistleblowers.filter(w => w.grade === filter);

  const handleToggle = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      trackWhistleblowerOpen(id);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Whistleblower Vault — Disclosure Testimony Archive | Pantheon"
        description="Evidence-graded profiles of those who risked everything to disclose UAP, aerospace, and intelligence programs — and the forensic registry of suspicious deaths."
        canonical="/whistleblowers"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Whistleblower Vault',
          description: 'Profiles and testimony from UAP, aerospace, and intelligence whistleblowers.',
          url: 'https://pantheonobservatory46-com.lovable.app/whistleblowers',
        }}
      />
      <HeroSection
        label="Deep Archive · Testimony"
        title="Whistleblower Vault"
        tagline="Those who risked everything to tell the truth — and those who paid with their lives. Evidence-graded profiles and a forensic registry of suspicious deaths across UAP, aerospace, and intelligence programs."
        accent="#7F1D1D"
        atmosphere={{ radial: true, scanline: true }}
        align="center"
      />
      <div className="max-w-6xl mx-auto px-4 py-12">

        <Tabs defaultValue="profiles" className="w-full">
          <TabsList className="mx-auto mb-10 grid grid-cols-2 max-w-md bg-card/50 border border-border h-auto p-1">
            <TabsTrigger value="profiles" className="flex items-center gap-2 py-2.5">
              <Shield className="w-4 h-4" /> Profiles
            </TabsTrigger>
            <TabsTrigger value="deaths" className="flex items-center gap-2 py-2.5 data-[state=active]:text-red-400">
              <Skull className="w-4 h-4" /> Suspicious Deaths
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="mt-0">
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
                    onClick={() => handleToggle(w.id)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start gap-4">
                      {w.image ? (
                        <div
                          className="relative w-16 h-20 rounded-md overflow-hidden shrink-0 ring-1"
                          style={{ boxShadow: `0 0 18px -4px ${w.accentColor}80`, ['--tw-ring-color' as never]: `${w.accentColor}66` }}
                        >
                          <img src={w.image} alt={w.name} loading="lazy" className="w-full h-full object-cover object-top" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-0.5 left-0 right-0 text-center text-[7px] uppercase tracking-[1.5px] text-white/80 font-mono">CLASSIFIED</div>
                        </div>
                      ) : (
                        <div
                          className="relative w-16 h-20 rounded-md shrink-0 flex flex-col items-center justify-center border border-dashed"
                          style={{ background: `${w.accentColor}10`, borderColor: `${w.accentColor}55` }}
                        >
                          <span className="text-3xl">{w.photo}</span>
                          <span className="text-[7px] uppercase tracking-[1.5px] text-white/50 font-mono mt-0.5">NO PHOTO</span>
                        </div>
                      )}
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
                    <div className="mt-3"><SpeciesBadgesForWitness witnessId={w.id} /></div>
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

                          <SourceList sources={w.sources} />

                          {w.videos && w.videos.length > 0 && (
                            <VideoList videos={w.videos} title="Watch" />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
          </TabsContent>

          <TabsContent value="deaths" className="mt-0">
            <SuspiciousDeathsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
