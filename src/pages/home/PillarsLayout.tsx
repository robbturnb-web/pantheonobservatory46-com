import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Eye, FileSearch, Sparkles, Brain, Telescope, ChevronDown, Zap, MessageCircle } from 'lucide-react';
import { useHomeTheme, HomeDomain } from '@/contexts/HomeThemeContext';
import { LiveBackdrop } from '@/components/home/LiveBackdrop';

interface Pillar {
  domain: HomeDomain;
  label: string;
  sub: string;
  to: string;
  accent: string;
  glyph: string;
  icon: typeof FileSearch;
}

const PILLARS: Pillar[] = [
  { domain: 'disclosure', label: 'Disclosure', sub: 'The cover-up files', to: '/uap', accent: '#ef4444', glyph: '𓂀', icon: FileSearch },
  { domain: 'ancient',    label: 'Pantheon',   sub: 'Gods & forgotten history', to: '/gods', accent: '#fcd34d', glyph: '𒀭', icon: Sparkles },
  { domain: 'cosmic',     label: 'Cosmos',     sub: 'The sky is no longer empty', to: '/galaxy', accent: '#a78bfa', glyph: '☥', icon: Telescope },
  { domain: 'inner',      label: 'Mind',       sub: 'Tune the receiver', to: '/consciousness', accent: '#34d399', glyph: '◐', icon: Brain },
];

/** A single Greek-marble pillar that lights up on hover. */
function MarbleColumn({ pillar, idx }: { pillar: Pillar; idx: number }) {
  const { bind, domain } = useHomeTheme();
  const isActive = domain === pillar.domain;
  const Icon = pillar.icon;

  return (
    <Link
      to={pillar.to}
      {...bind(pillar.domain)}
      className="group relative flex-1 max-w-[180px] sm:max-w-[220px] flex flex-col items-center"
      style={{ perspective: '1200px' }}
    >
      {/* Capital — the carved top */}
      <motion.div
        className="relative w-full h-16 sm:h-20 rounded-t-md"
        style={{
          background: `linear-gradient(180deg, #f3eee2 0%, #d9cfb6 60%, #b8ad92 100%)`,
          boxShadow: isActive
            ? `0 0 60px ${pillar.accent}, inset 0 -4px 0 rgba(0,0,0,0.2)`
            : 'inset 0 -4px 0 rgba(0,0,0,0.2), 0 4px 18px rgba(0,0,0,0.6)',
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {/* Acanthus + alien glyph carving */}
        <div className="absolute inset-x-0 top-3 flex items-center justify-center">
          <span
            className="text-2xl sm:text-3xl font-bold"
            style={{
              color: isActive ? pillar.accent : 'rgba(70,55,30,0.7)',
              textShadow: isActive ? `0 0 12px ${pillar.accent}` : 'none',
              transition: 'all 0.4s ease',
            }}
          >
            {pillar.glyph}
          </span>
        </div>
        <div className="absolute inset-x-2 bottom-1 h-1 bg-gradient-to-b from-[#a89571] to-[#8a7a5a] rounded-sm" />
      </motion.div>

      {/* Shaft */}
      <div
        className="relative w-[58%] flex-1 min-h-[280px] sm:min-h-[380px]"
        style={{
          background: `linear-gradient(90deg,
            #6b6450 0%, #b8ad92 12%, #ece3cc 28%, #f3ecd6 50%,
            #ece3cc 72%, #b8ad92 88%, #6b6450 100%)`,
          boxShadow: isActive
            ? `0 0 80px ${pillar.accent}80`
            : '0 8px 40px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {/* Vertical fluting */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent 0 8%, rgba(0,0,0,0.18) 8% 9%, transparent 9% 17%)',
          }}
        />
        {/* Glow column on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isActive ? 0.6 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${pillar.accent}40 50%, transparent 100%)`,
            mixBlendMode: 'screen',
          }}
        />
        {/* Floating embers */}
        {isActive && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ background: pillar.accent, left: `${15 + (i * 9) % 70}%`, bottom: 0 }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.9, 0], y: -260 }}
                transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </>
        )}
      </div>

      {/* Base */}
      <div
        className="relative w-full h-8 sm:h-10 rounded-b-sm"
        style={{
          background: 'linear-gradient(180deg, #b8ad92 0%, #8a7a5a 100%)',
          boxShadow: 'inset 0 4px 0 rgba(0,0,0,0.18), 0 6px 30px rgba(0,0,0,0.7)',
        }}
      />

      {/* Floating label */}
      <motion.div
        className="absolute -bottom-20 sm:-bottom-24 inset-x-0 text-center pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0.7, y: isActive ? 0 : 6 }}
        transition={{ duration: 0.4 }}
      >
        <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: pillar.accent }} />
        <div
          className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase"
          style={{ color: pillar.accent, textShadow: `0 0 16px ${pillar.accent}` }}
        >
          {pillar.label}
        </div>
        <div className="text-[10px] sm:text-xs text-white/60 mt-1 max-w-[140px] mx-auto leading-tight">
          {pillar.sub}
        </div>
      </motion.div>

      {/* Pillar number */}
      <div className="absolute top-1 right-1 text-[8px] font-mono text-black/40">
        {String(idx + 1).padStart(2, '0')}
      </div>
    </Link>
  );
}

/** Lightning fork between pillar tops every 8–15s. */
function LightningCanvas() {
  const [bolt, setBolt] = useState<{ x1: number; x2: number; key: number } | null>(null);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const fire = () => {
      const x1 = 12 + Math.random() * 30;
      const x2 = 60 + Math.random() * 28;
      setBolt({ x1, x2, key: Date.now() });
      setTimeout(() => setBolt(null), 320);
      t = setTimeout(fire, 8000 + Math.random() * 7000);
    };
    t = setTimeout(fire, 2000);
    return () => clearTimeout(t);
  }, []);

  if (!bolt) return null;
  return (
    <svg key={bolt.key} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
      <motion.path
        d={`M ${bolt.x1} 12 L ${(bolt.x1 + bolt.x2) / 2 - 3} 18 L ${(bolt.x1 + bolt.x2) / 2 + 4} 16 L ${bolt.x2} 12`}
        stroke="#fef9c3"
        strokeWidth="0.3"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6, 1, 0] }}
        transition={{ duration: 0.32 }}
        style={{ filter: 'drop-shadow(0 0 4px #fde047)' }}
      />
    </svg>
  );
}

/** Drifting starfield — pure CSS, cheap. */
function StarBackdrop() {
  const stars = useRef<Array<{ x: number; y: number; s: number; d: number }>>([]);
  if (stars.current.length === 0) {
    stars.current = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 0.4 + Math.random() * 1.6,
      d: 2 + Math.random() * 4,
    }));
  }
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.current.map((star, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.s, height: star.s }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: star.d, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

export function PillarsLayout() {
  return (
    <div className="relative">
      <LiveBackdrop />

      {/* HERO */}
      <section className="relative min-h-[100vh] flex flex-col items-center pt-12 pb-32 px-4 overflow-hidden">
        <StarBackdrop />
        <LightningCanvas />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center mb-10"
        >
          <Eye className="w-12 h-12 sm:w-14 sm:h-14 text-primary mx-auto mb-4 cosmic-float" />
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span style={{ background: 'linear-gradient(90deg, #fcd34d, #f3ecd6, #34d399)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              PANTHEON OBSERVATORY
            </span>
          </h1>
          <p className="text-sm sm:text-base text-white/70 mt-3 max-w-xl mx-auto">
            Choose a pillar. The sky responds.
          </p>
        </motion.div>

        {/* Four pillars */}
        <div className="relative z-10 flex-1 w-full max-w-5xl flex items-stretch justify-center gap-3 sm:gap-6 mt-4">
          {PILLARS.map((p, i) => (
            <MarbleColumn key={p.domain} pillar={p} idx={i} />
          ))}
        </div>

        {/* Marble floor */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(180,160,120,0.15) 60%, rgba(140,120,80,0.3) 100%)',
            borderTop: '1px solid rgba(252,211,77,0.2)',
          }}
        />

        {/* CTA + scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 inset-x-0 flex flex-col items-center gap-3 z-10"
        >
          <div className="flex gap-3">
            <Link to="/timeline" className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
              <Zap className="w-4 h-4" /> Begin
            </Link>
            <Link to="/echo" className="px-5 py-2 glass-cosmic rounded-lg font-semibold text-sm flex items-center gap-2 hover:border-primary/40 transition-colors">
              <MessageCircle className="w-4 h-4" /> Ask Echo
            </Link>
          </div>
          <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
        </motion.div>
      </section>
    </div>
  );
}
