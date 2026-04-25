import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Zap, MessageCircle } from 'lucide-react';
import { useHomeTheme, HomeDomain } from '@/contexts/HomeThemeContext';
import { LiveBackdrop } from '@/components/home/LiveBackdrop';
import pantheonShipHero from '@/assets/pantheon-ship-hero.jpg';

interface Statue {
  id: string;
  name: string;
  domain: HomeDomain;
  to: string;
  emoji: string;       // visual stand-in
  accent: string;
  whisper: string;
}

const STATUES: Statue[] = [
  { id: 'zeus',    name: 'ZEUS',     domain: 'ancient',    to: '/gods',           emoji: '⚡', accent: '#fcd34d', whisper: 'The lightning remembers.' },
  { id: 'athena',  name: 'ATHENA',   domain: 'inner',      to: '/consciousness',  emoji: '🦉', accent: '#34d399', whisper: 'Wisdom is the only weapon.' },
  { id: 'hermes',  name: 'HERMES',   domain: 'cosmic',     to: '/galaxy',         emoji: '⚕',  accent: '#a78bfa', whisper: 'Messages cross every veil.' },
  { id: 'anubis',  name: 'ANUBIS',   domain: 'ancient',    to: '/pyramids',       emoji: '𓃢', accent: '#f59e0b', whisper: 'The desert keeps its dead.' },
  { id: 'grey',    name: 'OBSERVER', domain: 'disclosure', to: '/uap',            emoji: '👽', accent: '#67e8f9', whisper: 'They have always been watching.' },
];

function ColumnSilhouette({ left, height, delay }: { left: string; height: number; delay: number }) {
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left, width: 50, height, background: 'linear-gradient(180deg, transparent 0%, rgba(140,125,95,0.4) 8%, rgba(180,165,135,0.6) 50%, rgba(120,105,80,0.55) 100%)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay }}
    >
      <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg, transparent 0 8px, rgba(0,0,0,0.2) 8px 10px)' }} />
    </motion.div>
  );
}

function GodRays() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: '-20%',
            left: `${20 + i * 30}%`,
            width: 200,
            height: '120%',
            background: `linear-gradient(180deg, rgba(252,211,77,${0.08 + i * 0.02}) 0%, transparent 70%)`,
            transform: 'skewX(-12deg)',
            filter: 'blur(20px)',
          }}
          animate={{ x: [-60, 60, -60] }}
          transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function StatuePedestal({ statue, isFocused, onFocus }: { statue: Statue; isFocused: boolean; onFocus: (id: string) => void }) {
  const { bind } = useHomeTheme();
  return (
    <Link
      to={statue.to}
      {...bind(statue.domain)}
      onMouseEnter={() => { bind(statue.domain).onMouseEnter(); onFocus(statue.id); }}
      className="relative flex flex-col items-center group"
    >
      {/* Statue figure */}
      <motion.div
        className="relative w-16 sm:w-20 h-32 sm:h-40 flex items-end justify-center"
        animate={{ y: isFocused ? -4 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="absolute inset-0 rounded-t-3xl"
          style={{
            background: 'linear-gradient(180deg, #ddd2b8 0%, #b8ad92 60%, #8a7a5a 100%)',
            filter: isFocused ? `drop-shadow(0 0 24px ${statue.accent})` : 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
            transition: 'filter 0.5s ease',
          }}
        />
        <span
          className="relative text-3xl sm:text-4xl mb-3"
          style={{ filter: isFocused ? `drop-shadow(0 0 16px ${statue.accent})` : 'grayscale(0.4)' }}
        >
          {statue.emoji}
        </span>
      </motion.div>
      {/* Pedestal */}
      <div className="relative w-20 sm:w-24 h-6 -mt-1" style={{ background: 'linear-gradient(180deg, #b8ad92 0%, #6b6450 100%)', boxShadow: 'inset 0 2px 0 rgba(0,0,0,0.2)' }}>
        <div className="absolute inset-x-0 top-1 text-center text-[8px] font-mono uppercase tracking-[2px] text-black/60">
          {statue.name}
        </div>
      </div>
    </Link>
  );
}

export function TempleLayout() {
  const [focused, setFocused] = useState<string | null>(null);
  const focusedStatue = STATUES.find((s) => s.id === focused);

  return (
    <div className="relative">
      <LiveBackdrop />

      <section className="relative min-h-[100vh] overflow-hidden">
        {/* Sky with mothership */}
        <div className="absolute inset-x-0 top-0 h-[55vh] overflow-hidden">
          <motion.img
            src={pantheonShipHero}
            alt="The Pantheon mothership hovering above the temple"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 3 }}
            className="w-full h-full object-cover object-top cosmic-float-slow"
          />
          {/* Broken roof framing — diagonal cuts at the bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.85) 100%)',
              clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0 100%)',
            }}
          />
          {/* Mothership underglow pulse */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bottom-12 w-[60%] h-20 rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.45) 0%, transparent 70%)', filter: 'blur(20px)' }}
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <GodRays />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-20 text-center pt-12 px-4"
        >
          <div className="text-[10px] uppercase tracking-[6px] text-white/50 mb-2">Enter the Temple</div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            <span style={{ background: 'linear-gradient(90deg, #fcd34d, #f3ecd6, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              PANTHEON
            </span>
          </h1>
          <p className="text-sm text-white/70 mt-2">
            {focusedStatue ? <em>"{focusedStatue.whisper}"</em> : 'The gods are still in the room.'}
          </p>
        </motion.div>

        {/* Foreground temple floor with columns and statues */}
        <div className="absolute inset-x-0 bottom-0 h-[55vh] z-10">
          {/* Columns receding */}
          <ColumnSilhouette left="2%" height={400} delay={0.1} />
          <ColumnSilhouette left="14%" height={460} delay={0.2} />
          <ColumnSilhouette left="86%" height={460} delay={0.2} />
          <ColumnSilhouette left="96%" height={400} delay={0.1} />

          {/* Marble floor */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(180,165,135,0.25) 30%, rgba(140,125,95,0.5) 100%)',
              borderTop: '1px solid rgba(252,211,77,0.25)',
            }}
          />
          {/* Floor tile pattern */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 opacity-15"
            style={{
              background: 'repeating-linear-gradient(45deg, transparent 0 30px, rgba(252,211,77,0.4) 30px 31px), repeating-linear-gradient(-45deg, transparent 0 30px, rgba(252,211,77,0.4) 30px 31px)',
            }}
          />

          {/* Statues row */}
          <div
            className="absolute bottom-16 inset-x-0 flex justify-center items-end gap-4 sm:gap-12 px-4"
            onMouseLeave={() => setFocused(null)}
          >
            {STATUES.map((s) => (
              <StatuePedestal key={s.id} statue={s} isFocused={focused === s.id} onFocus={setFocused} />
            ))}
          </div>
        </div>

        {/* Bottom plaque scroll */}
        <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center px-4">
          <div className="flex gap-3">
            <Link to="/timeline" className="px-5 py-2 bg-amber-500/90 text-black rounded-md font-bold text-xs uppercase tracking-[2px] flex items-center gap-2 hover:bg-amber-400 transition-colors">
              <Zap className="w-4 h-4" /> Enter
            </Link>
            <Link to="/echo" className="px-5 py-2 glass-cosmic rounded-md font-bold text-xs uppercase tracking-[2px] flex items-center gap-2 hover:border-amber-500/40 transition-colors">
              <MessageCircle className="w-4 h-4" /> Echo
            </Link>
          </div>
        </div>

        <div className="absolute bottom-1 inset-x-0 flex justify-center z-20 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
        </div>
      </section>
    </div>
  );
}
