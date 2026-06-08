import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Telescope as TelescopeIcon, ChevronDown, ChevronUp, Sparkles, Info, ArrowRight, Lock } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { telescopes } from '../data/telescopes';
import jwstImg from '../assets/telescopes/jwst.jpg';
import { SEO } from '@/components/SEO';

const upcomingScopes = [
  { name: 'Vera C. Rubin Observatory', blurb: 'LSST · 10-year survey of the entire southern sky', status: 'First Light 2025' },
  { name: 'Roman Space Telescope', blurb: '100× Hubble field of view · dark energy + exoplanet hunt', status: 'Launch 2027' },
  { name: 'Extremely Large Telescope', blurb: '39-meter mirror · Chile · direct exoplanet imaging', status: 'First Light 2028' },
];

type FilterType = 'all' | 'space' | 'ground';

export function TelescopePage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Pull JWST out for the flagship slot
  const others = telescopes.filter(t => t.id !== 'jwst');
  const filtered = typeFilter === 'all' ? others : others.filter(t => t.type === typeFilter);

  return (
    <>
    <SEO
      title="The Observatory — Every Telescope Humanity Has Built | Pantheon"
      description={`From Arecibo's lost dish to Webb's gold hexagons — ${telescopes.length} major telescopes, their key discoveries, and what comes next (Rubin, Roman, ELT).`}
      path="/telescopes"
      schema={{
        '@context':'https://schema.org','@type':'CollectionPage',
        name:'The Pantheon Observatory',
        url:'https://pantheonobservatory46-com.lovable.app/telescopes',
        numberOfItems: telescopes.length,
        hasPart: telescopes.slice(0, 8).map(t => ({ '@type':'Observatory', name: t.name }))
      }}
    />
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Realm header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80 mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            PANTHEON OBSERVATORY · TELESCOPE REALM
          </p>
          <TelescopeIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
            The Observatory
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every major eye humanity has aimed at the cosmos — from Arecibo's lost dish to Webb's gold hexagons —
            and the discoveries that rewrote what we thought was out there.
          </p>
        </motion.div>

        {/* JWST flagship card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <Link
            to="/jwst"
            className="group relative block rounded-3xl overflow-hidden border transition-all hover:-translate-y-1"
            style={{
              borderColor: 'rgba(167,139,250,0.4)',
              boxShadow: '0 20px 60px -25px rgba(124,58,237,0.6)',
            }}
          >
            <div className="relative aspect-[16/10] md:aspect-[21/9] overflow-hidden">
              <img src={jwstImg} alt="James Webb Space Telescope" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(5,3,13,0.92) 0%, rgba(15,8,40,0.65) 45%, transparent 80%)' }} />
              <div className="absolute inset-0 flex items-center">
                <div className="px-6 md:px-12 max-w-2xl">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase border" style={{ color: '#fde68a', borderColor: 'rgba(252,211,77,0.6)', background: 'rgba(252,211,77,0.12)' }}>
                    ★ FLAGSHIP MISSION
                  </span>
                  <h2 className="mt-4 text-3xl md:text-5xl font-bold text-violet-50 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                    James Webb Space Telescope
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-violet-100/80 leading-relaxed">
                    The most powerful observatory ever built — 1.5 million km from Earth, watching the first light of the universe and reading the atmospheres of alien worlds.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-200 group-hover:gap-3 transition-all">
                    Enter Mission Console <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
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
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : t.id)}
                      className="w-full text-left"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-56 h-44 sm:h-auto shrink-0 overflow-hidden">
                          <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(15,10,40,0.8)] hidden sm:block" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,40,0.8)] to-transparent sm:hidden" />
                          <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold ${
                            t.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            t.status === 'retired' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {t.status.toUpperCase()}
                          </div>
                        </div>

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
                                    <div className="absolute left-1.5 w-3 h-3 rounded-full border-2 border-background" style={{ background: t.accentColor, top: '0.25rem' }} />
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

        {/* Upcoming slots */}
        <div className="mt-16">
          <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground mb-5" style={{ fontFamily: "'Space Mono', monospace" }}>
            Incoming · Next-Generation Observatories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingScopes.map((u, i) => (
              <motion.div
                key={u.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border p-5 backdrop-blur-sm relative"
                style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(15,8,40,0.55)' }}
              >
                <Lock className="absolute top-4 right-4 w-3.5 h-3.5 text-muted-foreground/60" />
                <p className="text-[10px] uppercase tracking-widest text-amber-300/70" style={{ fontFamily: "'Space Mono', monospace" }}>{u.status}</p>
                <h4 className="mt-2 font-bold text-foreground" style={{ fontFamily: "'Cinzel', serif" }}>{u.name}</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{u.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
