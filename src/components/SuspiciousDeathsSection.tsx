import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, LayoutGrid, FileText, X, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import { SourceList } from './SourceList';
import { suspiciousDeaths, deathFields, type SuspiciousDeath } from '../data/suspicious-deaths';

type ViewMode = 'timeline' | 'forensic';
type FieldFilter = 'ALL' | SuspiciousDeath['field'];

const fieldColors: Record<SuspiciousDeath['field'], string> = {
  UAP: '#a855f7',
  Aerospace: '#ef4444',
  Microbiology: '#22d3ee',
  Nuclear: '#facc15',
  Intelligence: '#f43f5e',
  Corporate: '#fb923c',
};

export function SuspiciousDeathsSection() {
  const [view, setView] = useState<ViewMode>('timeline');
  const [field, setField] = useState<FieldFilter>('ALL');
  const [selected, setSelected] = useState<SuspiciousDeath | null>(null);

  const filtered = useMemo(() => {
    const list = field === 'ALL' ? suspiciousDeaths : suspiciousDeaths.filter((d) => d.field === field);
    return [...list].sort((a, b) => (a.dateOfDeath < b.dateOfDeath ? -1 : 1));
  }, [field]);

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4">
          <Skull className="w-3.5 h-3.5" />
          SUSPICIOUS DEATHS REGISTRY
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">The Pattern of Silenced Voices</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
          Scientists, engineers, and journalists who died under questionable circumstances after threatening to expose
          UAP programs, aerospace defects, bioweapons research, or covert operations. Cross-reference the patterns.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mb-8">
        {/* Field filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setField('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              field === 'ALL' ? 'bg-red-500 text-white' : 'glass-cosmic text-muted-foreground hover:text-foreground'
            }`}
          >
            All ({suspiciousDeaths.length})
          </button>
          {deathFields.map((f) => {
            const count = suspiciousDeaths.filter((d) => d.field === f).length;
            if (count === 0) return null;
            return (
              <button
                key={f}
                onClick={() => setField(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  field === f
                    ? 'text-white'
                    : 'glass-cosmic text-muted-foreground hover:text-foreground'
                }`}
                style={field === f ? { background: fieldColors[f] } : {}}
              >
                {f} ({count})
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div className="flex glass-cosmic rounded-full p-1">
          <button
            onClick={() => setView('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              view === 'timeline' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Timeline
          </button>
          <button
            onClick={() => setView('forensic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              view === 'forensic' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Forensic
          </button>
        </div>
      </div>

      {/* TIMELINE VIEW */}
      {view === 'timeline' && (
        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-red-500/50 via-red-500/20 to-transparent" />
          <div className="space-y-6">
            {filtered.map((d, i) => (
              <motion.button
                key={d.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelected(d)}
                className={`relative w-full flex items-start gap-4 sm:w-1/2 ${
                  i % 2 === 0 ? 'sm:pr-8' : 'sm:ml-auto sm:pl-8 sm:flex-row-reverse'
                }`}
              >
                <div
                  className="absolute left-4 sm:left-auto top-3 w-3 h-3 rounded-full ring-4 ring-background z-10"
                  style={{
                    background: fieldColors[d.field],
                    [i % 2 === 0 ? 'right' : 'left']: '-6px',
                  } as React.CSSProperties}
                />
                <div className="ml-12 sm:ml-0 flex-1 glass-cosmic rounded-xl p-4 text-left hover:border-red-500/40 transition-colors border border-transparent">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{d.symbol}</span>
                    <span className="text-xs font-mono text-red-400">{d.dateOfDeath}</span>
                    <EvidenceBadge grade={d.grade} />
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{d.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{d.role}</p>
                  <p className="text-xs text-foreground/80 line-clamp-2">{d.officialCause}</p>
                  {d.pattern && (
                    <span className="inline-block mt-2 text-[10px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded">
                      {d.pattern}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* FORENSIC VIEW */}
      {view === 'forensic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelected(d)}
              className="glass-cosmic rounded-xl p-5 text-left border border-transparent hover:border-red-500/40 transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="text-3xl w-12 h-12 flex items-center justify-center rounded-lg shrink-0"
                  style={{ background: `${d.accentColor}20` }}
                >
                  {d.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground">{d.name}</h3>
                    <EvidenceBadge grade={d.grade} />
                  </div>
                  <p className="text-xs text-muted-foreground">{d.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3 h-3" /> <span>{d.dateOfDeath}{d.age && ` (age ${d.age})`}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3 h-3" /> <span>{d.location}</span>
                </div>
                <div className="flex items-start gap-2 text-red-300">
                  <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                  <span className="font-medium">{d.officialCause}</span>
                </div>
              </div>
              <p className="text-xs text-foreground/70 mt-3 line-clamp-3">{d.whatTheyKnew}</p>
              <span className="inline-block mt-3 text-[10px] font-mono text-primary">▸ Open forensic file</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* MODAL — full forensic profile */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-cosmic max-w-2xl w-full rounded-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div
                  className="text-5xl w-16 h-16 flex items-center justify-center rounded-xl shrink-0"
                  style={{ background: `${selected.accentColor}25` }}
                >
                  {selected.symbol}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-foreground">{selected.name}</h2>
                    <EvidenceBadge grade={selected.grade} />
                  </div>
                  <p className="text-sm text-muted-foreground">{selected.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs">
                <div className="glass-cosmic rounded-lg p-3">
                  <div className="text-muted-foreground mb-1">Date of Death</div>
                  <div className="font-mono text-red-400">{selected.dateOfDeath}</div>
                  {selected.age && <div className="text-muted-foreground mt-1">Age {selected.age}</div>}
                </div>
                <div className="glass-cosmic rounded-lg p-3">
                  <div className="text-muted-foreground mb-1">Location</div>
                  <div className="text-foreground">{selected.location}</div>
                </div>
                <div className="glass-cosmic rounded-lg p-3">
                  <div className="text-muted-foreground mb-1">Field</div>
                  <div className="font-semibold" style={{ color: fieldColors[selected.field] }}>
                    {selected.field}
                  </div>
                </div>
              </div>

              {selected.pattern && (
                <div className="mb-5 inline-block bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-mono">
                  ⛓ Part of: {selected.pattern}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-bold text-red-400 mb-2 uppercase tracking-wider">Official Cause</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{selected.officialCause}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-amber-400 mb-2 uppercase tracking-wider">
                    Suspicious Circumstances
                  </h4>
                  <ul className="space-y-2">
                    {selected.suspiciousCircumstances.map((c, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex gap-2 leading-relaxed">
                        <span className="text-amber-400 mt-1 shrink-0">▸</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary mb-2 uppercase tracking-wider">What They Knew</h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">{selected.whatTheyKnew}</p>
                </div>

                {selected.aboutToReveal && (
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wider">
                      About to Reveal
                    </h4>
                    <p className="text-sm text-foreground/90 leading-relaxed italic">{selected.aboutToReveal}</p>
                  </div>
                )}

                <SourceList sources={selected.sources} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
