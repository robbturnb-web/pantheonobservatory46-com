import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Filter, Users } from 'lucide-react';
import {
  species as allSpecies,
  classificationLabels,
  threatLabels,
  threatColors,
  type SpeciesClassification,
  type ThreatLevel,
} from '../data/species';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { uapCases } from '../data/uap-cases';
import { whistleblowers } from '../data/whistleblowers';
import { Link } from 'react-router-dom';

type ClassFilter = 'All' | SpeciesClassification;
type ThreatFilter = 'All' | ThreatLevel;

const classOptions: ClassFilter[] = [
  'All',
  'biological',
  'humanoid',
  'reptilian',
  'insectoid',
  'synthetic',
  'interdimensional',
  'ancient-engineer',
];

const threatOptions: ThreatFilter[] = ['All', 'benevolent', 'neutral', 'observer', 'predator', 'unknown'];

export function SpeciesCodexPage() {
  const [classFilter, setClassFilter] = useState<ClassFilter>('All');
  const [threatFilter, setThreatFilter] = useState<ThreatFilter>('All');
  const [openId, setOpenId] = useState<string | null>(null);

  // Auto-open from hash (e.g. /species#greys)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setOpenId(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  const filtered = useMemo(() => {
    return allSpecies.filter((s) => {
      if (classFilter !== 'All' && s.classification !== classFilter) return false;
      if (threatFilter !== 'All' && s.threatLevel !== threatFilter) return false;
      return true;
    });
  }, [classFilter, threatFilter]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-cosmic text-xs uppercase tracking-widest text-primary mb-4">
          <Users className="w-3 h-3" /> The Codex
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-4">Alien Species</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {allSpecies.length} documented and reported non-human intelligences. Sourced.
          Cross-linked. No editorial. Threat level reflects the weight of public testimony — not opinion.
        </p>
      </motion.div>

      {/* Filters */}
      <div className="glass-cosmic rounded-2xl p-4 sm:p-6 mb-8 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Filter className="w-3 h-3" /> Classification
          </div>
          <div className="flex flex-wrap gap-2">
            {classOptions.map((c) => (
              <button
                key={c}
                onClick={() => setClassFilter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  classFilter === c
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/40 text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                {c === 'All' ? 'All' : classificationLabels[c]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Filter className="w-3 h-3" /> Threat Level
          </div>
          <div className="flex flex-wrap gap-2">
            {threatOptions.map((t) => (
              <button
                key={t}
                onClick={() => setThreatFilter(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  threatFilter === t
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={
                  threatFilter === t
                    ? { borderColor: t === 'All' ? 'hsl(var(--primary))' : threatColors[t], background: t === 'All' ? 'hsl(var(--primary) / 0.15)' : `${threatColors[t]}22` }
                    : { borderColor: 'hsl(var(--border))' }
                }
              >
                {t === 'All' ? 'All' : threatLabels[t]}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Showing <span className="text-foreground font-semibold">{filtered.length}</span> of {allSpecies.length} species.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        {filtered.map((s, i) => {
          const open = openId === s.id;
          const linkedCases = s.keyCases.map((id) => uapCases.find((c) => c.id === id)).filter(Boolean);
          const linkedWits = s.keyWitnesses.map((id) => whistleblowers.find((w) => w.id === id)).filter(Boolean);

          return (
            <motion.div
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className="glass-cosmic rounded-2xl overflow-hidden border transition-colors"
              style={{ borderColor: open ? s.accentColor : 'hsl(var(--border))' }}
            >
              <button
                onClick={() => setOpenId(open ? null : s.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ background: `${s.accentColor}22`, border: `1px solid ${s.accentColor}55` }}
                >
                  {s.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">{s.name}</h2>
                    <EvidenceBadge grade={s.evidenceGrade} />
                    <span
                      className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full border"
                      style={{ color: threatColors[s.threatLevel], borderColor: threatColors[s.threatLevel] }}
                    >
                      {threatLabels[s.threatLevel]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {classificationLabels[s.classification]} · {s.aliases.slice(0, 2).join(' · ')}
                  </p>
                </div>
                <ChevronDown
                  className="w-5 h-5 text-muted-foreground transition-transform shrink-0"
                  style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 pt-2 space-y-5 border-t border-border/50">
                      <p className="text-foreground leading-relaxed">{s.summary}</p>

                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <Field label="Origin" value={s.origin} />
                        <Field label="Appearance" value={s.appearance} />
                        <Field label="Motives" value={s.motives} />
                        <Field label="View of Humans" value={s.viewOfHumans} />
                      </div>

                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                          Key Traits
                        </div>
                        <ul className="space-y-1.5">
                          {s.keyTraits.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                              <span style={{ color: s.accentColor }} className="mt-1">✦</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {(linkedCases.length > 0 || linkedWits.length > 0) && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {linkedCases.length > 0 && (
                            <div>
                              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                Linked UAP Cases
                              </div>
                              <div className="space-y-1.5">
                                {linkedCases.map((c) => c && (
                                  <Link
                                    key={c.id}
                                    to="/uap"
                                    className="block text-sm text-foreground hover:text-primary transition-colors"
                                  >
                                    → {c.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                          {linkedWits.length > 0 && (
                            <div>
                              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                                Linked Witnesses
                              </div>
                              <div className="space-y-1.5">
                                {linkedWits.map((w) => w && (
                                  <Link
                                    key={w.id}
                                    to="/whistleblowers"
                                    className="block text-sm text-foreground hover:text-primary transition-colors"
                                  >
                                    → {w.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                          Sources
                        </div>
                        <div className="space-y-1.5">
                          {s.sources.map((src, idx) => (
                            <a
                              key={idx}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span>{src.label}</span>
                            </a>
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

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No species match these filters.
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
      <p className="text-foreground leading-relaxed">{value}</p>
    </div>
  );
}
