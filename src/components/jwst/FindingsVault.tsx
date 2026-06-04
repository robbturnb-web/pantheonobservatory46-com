import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JWST_FINDINGS, type JwstFinding, type JwstInstrument } from '@/data/jwst-findings';
import { ChevronRight } from 'lucide-react';

interface Props {
  instrumentFilter: JwstInstrument | 'all';
  onOpen: (f: JwstFinding) => void;
}

export function FindingsVault({ instrumentFilter, onOpen }: Props) {
  const list = useMemo(
    () =>
      instrumentFilter === 'all'
        ? JWST_FINDINGS
        : JWST_FINDINGS.filter((f) => f.instrument === instrumentFilter),
    [instrumentFilter],
  );

  return (
    <section id="jwst-vault" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80" style={{ fontFamily: "'Space Mono', monospace" }}>
              FINDINGS VAULT · {list.length} ENTRIES
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
              What Webb has shown us
            </h2>
          </div>
          {instrumentFilter !== 'all' && (
            <p className="text-xs uppercase tracking-widest text-violet-300/70">
              Filtered · {instrumentFilter}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {list.map((f, i) => (
              <motion.button
                key={f.id}
                layout
                type="button"
                onClick={() => onOpen(f)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.4) }}
                whileHover={{ y: -4 }}
                className="group relative text-left rounded-2xl overflow-hidden border transition-all"
                style={{
                  background: 'rgba(15,8,40,0.7)',
                  borderColor: 'rgba(167,139,250,0.22)',
                  boxShadow: '0 12px 40px -20px rgba(124,58,237,0.5)',
                }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,3,13,0.1) 0%, rgba(15,8,40,0.85) 95%)' }} />
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full border backdrop-blur-md"
                    style={{ color: '#fde68a', borderColor: 'rgba(252,211,77,0.45)', background: 'rgba(252,211,77,0.08)' }}>
                    {f.instrument}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full border backdrop-blur-md"
                    style={{ color: '#ede9fe', borderColor: 'rgba(167,139,250,0.45)', background: 'rgba(167,139,250,0.1)' }}>
                    {f.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold leading-tight text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
                    {f.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-amber-200/70">{f.subtitle}</p>
                  <p className="mt-3 text-sm text-violet-100/75 leading-relaxed line-clamp-3">{f.summary}</p>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(167,139,250,0.18)' }}>
                    <span className="text-[10px] uppercase tracking-widest text-violet-300/70" style={{ fontFamily: "'Space Mono', monospace" }}>
                      {f.era}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-200 opacity-80 group-hover:opacity-100">
                      Open dossier <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
