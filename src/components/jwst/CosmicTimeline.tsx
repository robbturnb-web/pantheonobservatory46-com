import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { JWST_FINDINGS, type JwstFinding } from '@/data/jwst-findings';

interface Props {
  onOpen: (f: JwstFinding) => void;
}

const ERAS = [
  { at: 0, label: 'Big Bang', sub: '13.8 Gyr ago' },
  { at: 0.022, label: 'First Galaxies', sub: '~300 Myr after' },
  { at: 0.07, label: 'Cosmic Dawn', sub: '~900 Myr after' },
  { at: 0.35, label: 'Peak Star Formation', sub: '~3 Gyr after' },
  { at: 0.7, label: 'Solar System Forms', sub: '~9 Gyr after' },
  { at: 1, label: 'Present Day', sub: 'Now' },
];

export function CosmicTimeline({ onOpen }: Props) {
  const railRef = useRef<HTMLDivElement>(null);

  // Stable jitter per finding so overlapping pins spread vertically
  const items = useMemo(() => {
    return JWST_FINDINGS.map((f, i) => ({
      finding: f,
      offset: i % 3, // 0,1,2 vertical lanes
    }));
  }, []);

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80" style={{ fontFamily: "'Space Mono', monospace" }}>
            COSMIC TIMELINE · 13.8 BILLION YEARS
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            Where Webb looks
          </h2>
          <p className="mt-3 text-sm text-violet-200/60 max-w-xl mx-auto">
            From the first 300 million years after the Big Bang to weather on Neptune — every Webb finding placed on the cosmic timeline.
          </p>
        </div>

        <div ref={railRef} className="relative overflow-x-auto pb-4">
          <div className="relative min-w-[920px] h-[280px] mx-auto">
            {/* Spectrum rail */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, #fcd34d 0%, #f97316 20%, #a78bfa 55%, #4f46e5 80%, #22d3ee 100%)' }} />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] blur-md opacity-50" style={{ background: 'linear-gradient(90deg, #fcd34d 0%, #a78bfa 60%, #22d3ee 100%)' }} />

            {/* Era markers */}
            {ERAS.map((e) => (
              <div key={e.label} className="absolute top-0 bottom-0 flex flex-col items-center" style={{ left: `${e.at * 100}%`, transform: 'translateX(-50%)' }}>
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: '#fcd34d', boxShadow: '0 0 8px #fcd34d' }} />
                <p className="absolute top-[calc(50%+14px)] text-[10px] uppercase tracking-widest text-amber-300/80 whitespace-nowrap" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {e.label}
                </p>
                <p className="absolute top-[calc(50%+30px)] text-[9px] text-violet-300/50 whitespace-nowrap" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {e.sub}
                </p>
              </div>
            ))}

            {/* Finding pins (above the line) */}
            {items.map(({ finding, offset }, i) => {
              const top = `calc(50% - ${52 + offset * 36}px)`;
              return (
                <motion.button
                  key={finding.id}
                  type="button"
                  onClick={() => onOpen(finding)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="absolute group"
                  style={{ left: `${finding.cosmicPosition * 100}%`, top, transform: 'translateX(-50%)' }}
                >
                  <div
                    className="px-2 py-1 rounded-md text-[10px] uppercase tracking-wider whitespace-nowrap border backdrop-blur-sm"
                    style={{
                      color: '#ede9fe',
                      borderColor: 'rgba(167,139,250,0.4)',
                      background: 'rgba(15,8,40,0.85)',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    {finding.title.length > 22 ? finding.title.slice(0, 20) + '…' : finding.title}
                  </div>
                  {/* connector */}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 w-px" style={{ height: `${52 + offset * 36 - 8}px`, background: 'rgba(167,139,250,0.45)' }} />
                  <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ top: `${52 + offset * 36 + 4}px`, background: '#a78bfa', boxShadow: '0 0 8px #a78bfa' }} />
                </motion.button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] uppercase tracking-widest text-violet-300/40">
          ← scroll the rail · tap any pin to open its dossier →
        </p>
      </div>
    </section>
  );
}
