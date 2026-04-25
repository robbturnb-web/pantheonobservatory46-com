import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Eye, Power, Radio } from 'lucide-react';
import { useHomeTheme, HomeDomain } from '@/contexts/HomeThemeContext';
import { LiveBackdrop } from '@/components/home/LiveBackdrop';

interface Rune {
  id: string;
  glyph: string;
  label: string;
  domain: HomeDomain;
  to: string;
  accent: string;
}

const RUNES: Rune[] = [
  { id: 'uap', glyph: '𓂀', label: 'UAP', domain: 'disclosure', to: '/uap', accent: '#ef4444' },
  { id: 'wb', glyph: '⚐', label: 'WHISTLE', domain: 'disclosure', to: '/whistleblowers', accent: '#dc2626' },
  { id: 'gods', glyph: '𒀭', label: 'GODS', domain: 'ancient', to: '/gods', accent: '#fcd34d' },
  { id: 'pyramid', glyph: '△', label: 'PYRAMID', domain: 'ancient', to: '/pyramids', accent: '#f59e0b' },
  { id: 'galaxy', glyph: '◐', label: 'GALAXY', domain: 'cosmic', to: '/galaxy', accent: '#a78bfa' },
  { id: 'species', glyph: '☥', label: 'SPECIES', domain: 'cosmic', to: '/species', accent: '#67e8f9' },
  { id: 'mind', glyph: '◈', label: 'MIND', domain: 'inner', to: '/consciousness', accent: '#34d399' },
  { id: 'echo', glyph: '◉', label: 'ECHO', domain: 'inner', to: '/echo', accent: '#10b981' },
];

const ORACLE_LINES = [
  '> SCANNING SCHUMANN RESONANCE … 7.83 Hz NOMINAL',
  '> ORION ARM — NO ANOMALY',
  '> AARO INBOX: 12 NEW SIGHTINGS, 3 GRADED CREDIBLE',
  '> "WHAT IS ABOVE IS WITHIN." — HERMES TRISMEGISTUS',
  '> THE 46: AWAITING DISCLOSURE',
  '> JWST DEEP-FIELD UPDATED 04:21 UTC',
  '> ECHO LISTENING. ASK ANYTHING.',
];

export function ConsoleLayout() {
  const { bind } = useHomeTheme();
  const [skin, setSkin] = useState<'modern' | 'oracle'>('modern');
  const [oracleIdx, setOracleIdx] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    setTyped('');
    const target = ORACLE_LINES[oracleIdx];
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(t);
    }, 35);
    const next = setTimeout(() => setOracleIdx((x) => (x + 1) % ORACLE_LINES.length), 8000);
    return () => { clearInterval(t); clearTimeout(next); };
  }, [oracleIdx]);

  const isOracle = skin === 'oracle';

  return (
    <div className="relative">
      <LiveBackdrop />

      <section className="relative min-h-[100vh] overflow-hidden flex items-center justify-center px-3 py-10">
        {/* Console body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-3xl"
        >
          {/* Outer brass/steel chassis */}
          <div
            className="rounded-3xl p-3 sm:p-5 relative"
            style={{
              background: isOracle
                ? 'linear-gradient(180deg, #4a3618 0%, #2a1f0d 100%)'
                : 'linear-gradient(180deg, #2c2c2c 0%, #0e0e0e 100%)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.08)',
              border: `1px solid ${isOracle ? '#7a5f2d' : '#3a3a3a'}`,
            }}
          >
            {/* Top status bar */}
            <div className="flex items-center justify-between px-3 py-2 mb-3 rounded-md" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <div className="flex items-center gap-2">
                <Power className={`w-3 h-3 ${isOracle ? 'text-amber-400' : 'text-emerald-400'} animate-pulse`} />
                <span className={`text-[9px] uppercase tracking-[3px] font-mono ${isOracle ? 'text-amber-300' : 'text-emerald-300'}`}>
                  {isOracle ? 'ORACLE MODE · ANCIENT FREQ' : 'OBSERVATORY · LIVE FEED'}
                </span>
              </div>
              <button
                onClick={() => setSkin((s) => (s === 'modern' ? 'oracle' : 'modern'))}
                className="text-[9px] uppercase tracking-[2px] font-mono px-2 py-1 rounded border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                {isOracle ? '↔ MODERN' : '↔ ORACLE'}
              </button>
            </div>

            {/* CRT screen */}
            <div
              className="relative rounded-lg overflow-hidden aspect-[16/9] sm:aspect-[16/8]"
              style={{
                background: isOracle
                  ? 'radial-gradient(ellipse at center, #2a1a0a 0%, #1a0a04 70%, #0a0402 100%)'
                  : 'radial-gradient(ellipse at center, #021015 0%, #010608 70%, #000 100%)',
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.6)',
              }}
            >
              {/* Scanlines */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)' }}
              />
              {/* CRT vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />

              {/* Screen content */}
              <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
                <div className="text-center">
                  <Eye className={`w-7 h-7 mx-auto mb-2 ${isOracle ? 'text-amber-300' : 'text-cyan-300'}`} />
                  <h1
                    className="text-2xl sm:text-4xl font-bold tracking-[0.15em]"
                    style={{
                      color: isOracle ? '#fcd34d' : '#67e8f9',
                      textShadow: isOracle ? '0 0 12px #fcd34d' : '0 0 12px #67e8f9',
                      fontFamily: "'Space Mono', monospace",
                    }}
                  >
                    PANTHEON
                  </h1>
                  <div className={`text-[10px] uppercase tracking-[4px] mt-1 ${isOracle ? 'text-amber-300/70' : 'text-cyan-300/70'} font-mono`}>
                    {isOracle ? 'ORACULUM · DELPHI MODE' : 'OBSERVATORY · CHANNEL 7'}
                  </div>
                </div>

                {/* Oracle terminal */}
                <div className="flex-1 mt-4 sm:mt-6 px-2 flex items-end">
                  <div className={`text-xs sm:text-sm font-mono ${isOracle ? 'text-amber-200' : 'text-cyan-200'} text-left w-full`}>
                    <span style={{ textShadow: 'currentColor 0 0 6px' }}>{typed}</span>
                    <span className="animate-pulse">█</span>
                  </div>
                </div>

                {/* Bottom HUD waveform */}
                <svg viewBox="0 0 200 20" className="w-full h-6 mt-3 opacity-70">
                  <motion.path
                    d="M0 10 Q 10 4, 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10 T 180 10 T 200 10"
                    stroke={isOracle ? '#fcd34d' : '#22d3ee'}
                    strokeWidth={0.7}
                    fill="none"
                    animate={{ d: [
                      'M0 10 Q 10 4, 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10 T 180 10 T 200 10',
                      'M0 10 Q 10 14, 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10 T 180 10 T 200 10',
                      'M0 10 Q 10 6, 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10 T 180 10 T 200 10',
                    ] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </svg>
              </div>
            </div>

            {/* Rune buttons */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-4">
              {RUNES.map((r) => (
                <Link
                  key={r.id}
                  to={r.to}
                  {...bind(r.domain)}
                  className="group relative flex flex-col items-center gap-1 py-2.5 rounded-md border border-white/10 hover:border-white/30 transition-colors"
                  style={{
                    background: isOracle ? 'rgba(50,35,12,0.6)' : 'rgba(15,15,20,0.6)',
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `inset 0 0 18px ${r.accent}, 0 0 14px ${r.accent}55` }}
                  />
                  <span
                    className="relative text-xl"
                    style={{ color: r.accent, textShadow: `0 0 8px ${r.accent}` }}
                  >
                    {r.glyph}
                  </span>
                  <span className="relative text-[8px] uppercase tracking-[2px] font-mono text-white/70">
                    {r.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Bottom CTA strip */}
            <div className="flex items-center justify-between mt-4 px-3">
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[3px] text-white/40 font-mono">
                <Radio className="w-3 h-3" />
                LIVE · {new Date().toUTCString().slice(17, 25)} UTC
              </div>
              <Link
                to="/echo"
                className={`text-[10px] uppercase tracking-[3px] font-mono px-3 py-1.5 rounded border transition-colors ${
                  isOracle
                    ? 'border-amber-500/40 text-amber-200 hover:bg-amber-500/10'
                    : 'border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/10'
                }`}
              >
                ASK ECHO →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
