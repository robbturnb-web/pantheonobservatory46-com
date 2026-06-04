import { motion } from 'framer-motion';
import { JWST_INSTRUMENTS, type JwstInstrument } from '@/data/jwst-findings';
import { Thermometer, Gauge, Navigation } from 'lucide-react';

interface Props {
  active: JwstInstrument | 'all';
  onChange: (i: JwstInstrument | 'all') => void;
}

const telemetry = [
  { label: 'Distance from Earth', value: '1.5M km', sub: 'Sun-Earth L2 point', icon: Navigation },
  { label: 'Cold-side Temp', value: '−233 °C', sub: 'Behind 5-layer sunshield', icon: Thermometer },
  { label: 'Fuel Margin', value: '~20 yr', sub: 'Beyond original 10-yr spec', icon: Gauge },
];

export function MissionConsole({ active, onChange }: Props) {
  return (
    <section
      id="jwst-console"
      className="relative py-20 px-4"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(15,8,40,0.55), transparent)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80" style={{ fontFamily: "'Space Mono', monospace" }}>
            MISSION CONSOLE · STSCI BALTIMORE
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            The Four Eyes of Webb
          </h2>
          <p className="mt-3 text-sm text-violet-200/60 max-w-xl mx-auto">
            Select an instrument to filter the findings vault below by what captured them.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* Instruments */}
          <div className="rounded-2xl border p-5 backdrop-blur-md" style={{ borderColor: 'rgba(167,139,250,0.25)', background: 'rgba(15,8,40,0.55)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-violet-200/80">Instruments</h3>
              <button
                onClick={() => onChange('all')}
                className={`text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border transition-colors ${active === 'all' ? 'text-violet-100 border-violet-400/60 bg-violet-400/10' : 'text-violet-300/60 border-transparent hover:text-violet-100'}`}
              >
                Show all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {JWST_INSTRUMENTS.map((inst, i) => {
                const isActive = active === inst.id;
                return (
                  <motion.button
                    key={inst.id}
                    type="button"
                    onClick={() => onChange(isActive ? 'all' : inst.id)}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="text-left rounded-xl p-4 border transition-all relative overflow-hidden"
                    style={{
                      borderColor: isActive ? 'rgba(252,211,77,0.55)' : 'rgba(167,139,250,0.22)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(252,211,77,0.12), rgba(167,139,250,0.08))'
                        : 'rgba(10,5,30,0.55)',
                      boxShadow: isActive ? '0 0 24px rgba(252,211,77,0.25)' : undefined,
                    }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-bold tracking-wide" style={{ color: isActive ? '#fde68a' : '#ede9fe' }}>
                        {inst.name}
                      </span>
                      <span className="text-[10px] font-mono opacity-70" style={{ color: isActive ? '#fcd34d' : '#a78bfa' }}>
                        {inst.band}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-violet-200/70 leading-relaxed">{inst.blurb}</p>
                    {isActive && (
                      <motion.div
                        layoutId="instrument-glow"
                        className="absolute inset-x-0 bottom-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, #fcd34d, transparent)' }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Telemetry readouts */}
          <div className="rounded-2xl border p-5 backdrop-blur-md" style={{ borderColor: 'rgba(167,139,250,0.25)', background: 'rgba(15,8,40,0.55)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-violet-200/80">Live Telemetry</h3>
              <span className="text-[10px] uppercase tracking-wider text-green-400 inline-flex items-center gap-1.5" style={{ fontFamily: "'Space Mono', monospace" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Nominal
              </span>
            </div>
            <div className="space-y-3">
              {telemetry.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-4 p-3 rounded-lg border"
                  style={{ borderColor: 'rgba(167,139,250,0.18)', background: 'rgba(10,5,30,0.5)' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.35)' }}>
                    <t.icon className="w-4 h-4 text-violet-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-violet-300/60">{t.label}</p>
                    <p className="text-xl font-bold text-violet-50" style={{ fontFamily: "'Space Mono', monospace" }}>{t.value}</p>
                    <p className="text-[11px] text-violet-300/60">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
