import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import type { JwstFinding } from '@/data/jwst-findings';

interface Props {
  finding: JwstFinding | null;
  onClose: () => void;
}

export function FindingModal({ finding, onClose }: Props) {
  return (
    <AnimatePresence>
      {finding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl my-8 rounded-2xl overflow-hidden shadow-2xl border"
            style={{
              background: 'linear-gradient(180deg, #0a0420 0%, #05030d 100%)',
              borderColor: 'rgba(167,139,250,0.3)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {/* Classification banner */}
            <div
              className="px-5 py-1.5 text-[10px] font-bold tracking-[0.3em] text-center"
              style={{
                background: 'rgba(167,139,250,0.12)',
                color: '#a78bfa',
                fontFamily: "'Space Mono', monospace",
                borderBottom: '1px solid rgba(167,139,250,0.25)',
              }}
            >
              JWST OBSERVATION · {finding.instrument} · CAPTURE #{finding.id.toUpperCase()}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="absolute top-9 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-violet-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hero image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img src={finding.image} alt={finding.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,3,13,0.95) 100%)' }} />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300/90 mb-1">{finding.category}</p>
                <h2 className="text-2xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
                  {finding.title}
                </h2>
                <p className="text-sm text-violet-100/80 mt-1">{finding.subtitle}</p>
              </div>
            </div>

            {/* Body */}
            <div className="px-5 md:px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Target table */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                {[
                  { label: 'Target', value: finding.target.name },
                  { label: 'RA', value: finding.target.ra },
                  { label: 'Dec', value: finding.target.dec },
                  { label: 'Distance', value: finding.target.distance },
                  ...(finding.target.redshift ? [{ label: 'Redshift', value: finding.target.redshift }] : []),
                  { label: 'Era', value: finding.era },
                  { label: 'Date', value: finding.date },
                  { label: 'Instrument', value: finding.instrument },
                ].map((row) => (
                  <div key={row.label} className="rounded-lg border p-3" style={{ borderColor: 'rgba(167,139,250,0.2)', background: 'rgba(15,8,40,0.65)' }}>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-violet-300/60">{row.label}</p>
                    <p className="text-violet-50 mt-1 text-sm break-all">{row.value}</p>
                  </div>
                ))}
              </div>

              <section>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300 mb-2">What you're seeing</h4>
                <p className="text-sm md:text-base text-violet-100/85 leading-relaxed">{finding.summary}</p>
              </section>

              <section className="rounded-xl border p-4" style={{ borderColor: 'rgba(252,211,77,0.3)', background: 'rgba(252,211,77,0.05)' }}>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Why it matters
                </h4>
                <p className="text-sm text-amber-50/90 leading-relaxed">{finding.why}</p>
              </section>

              {/* Deep intel sections — only render if present */}
              {([
                ['Technique used', finding.technique, '#a78bfa'],
                ['Prior attempts & why they failed', finding.priorAttempts, '#22d3ee'],
                ['Open controversy', finding.controversy, '#f87171'],
                ['What it rewrites', finding.implications, '#fde68a'],
              ] as const).map(([label, text, color]) =>
                text ? (
                  <section
                    key={label}
                    className="rounded-xl border p-4"
                    style={{ borderColor: `${color}55`, background: `${color}0d` }}
                  >
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-2" style={{ color }}>
                      {label}
                    </h4>
                    <p className="text-sm text-violet-100/85 leading-relaxed">{text}</p>
                  </section>
                ) : null,
              )}

              {finding.papers && finding.papers.length > 0 && (
                <section>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-200/70 mb-2">Papers</h4>
                  <ul className="space-y-1.5">
                    {finding.papers.map((p, i) => (
                      <li key={i}>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-amber-200 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" /> {p.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}



              <section>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-200/70 mb-2">Sources</h4>
                <ul className="space-y-1.5">
                  {finding.sources.map((s, i) => (
                    <li key={i}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-violet-200 hover:text-amber-200 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[10px] uppercase tracking-widest text-violet-300/50">
                  Image credit · {finding.credit}
                </p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
