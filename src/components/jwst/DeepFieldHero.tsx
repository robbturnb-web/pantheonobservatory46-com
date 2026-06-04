import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Radio, Telescope } from 'lucide-react';

const DEEP_FIELD =
  'https://stsci-opo.org/STScI-01G7DCWB7137MYJ05CSH1Q5Z1Z.png';

// JWST launched Dec 25, 2021. Day counter from that date.
function daysOnStation() {
  const launch = new Date('2021-12-25T12:20:00Z').getTime();
  return Math.floor((Date.now() - launch) / (1000 * 60 * 60 * 24));
}

export function DeepFieldHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const [days, setDays] = useState(daysOnStation());

  useEffect(() => {
    const id = window.setInterval(() => setDays(daysOnStation()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const scrollToVault = () => {
    document
      .getElementById('jwst-vault')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const scrollToConsole = () => {
    document
      .getElementById('jwst-console')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Deep field image with parallax zoom */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0"
      >
        <img
          src={DEEP_FIELD}
          alt="JWST First Deep Field — galaxy cluster SMACS 0723"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(5,3,13,0.1) 0%, rgba(5,3,13,0.6) 60%, rgba(5,3,13,0.95) 100%)',
          }}
        />
        {/* Nebula glow accents */}
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-30" style={{ background: '#7c3aed' }} />
        <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-20" style={{ background: '#22d3ee' }} />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        {/* Live status chip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border backdrop-blur-md"
          style={{
            borderColor: 'rgba(34, 197, 94, 0.45)',
            background: 'rgba(34, 197, 94, 0.1)',
            color: '#22c55e',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Online · L2 Halo Orbit · Day {days.toLocaleString()}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-6 text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight"
          style={{
            fontFamily: "'Cinzel', 'Space Grotesk', serif",
            color: '#f5f3ff',
            textShadow: '0 0 40px rgba(167, 139, 250, 0.4)',
          }}
        >
          JAMES WEBB
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-4 max-w-2xl text-base md:text-xl text-violet-100/80 leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Looking back to the dawn of light. A 6.5-meter gold mirror unfolding
          the first 300 million years of the universe — and reading the air of
          worlds 700 light-years away.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-8 flex flex-wrap gap-3 justify-center"
        >
          <button
            type="button"
            onClick={scrollToConsole}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(167, 139, 250, 0.15)',
              borderColor: 'rgba(167, 139, 250, 0.45)',
              color: '#ede9fe',
              boxShadow: '0 0 24px rgba(167, 139, 250, 0.25)',
            }}
          >
            <Radio className="w-4 h-4" />
            Enter Mission Console
          </button>
          <button
            type="button"
            onClick={scrollToVault}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-all hover:scale-[1.02]"
            style={{
              background: 'rgba(252, 211, 77, 0.08)',
              borderColor: 'rgba(252, 211, 77, 0.35)',
              color: '#fde68a',
            }}
          >
            <Telescope className="w-4 h-4" />
            Browse Findings
          </button>
        </motion.div>

        {/* Credit */}
        <p className="absolute bottom-20 text-[10px] tracking-widest uppercase opacity-50 text-violet-100">
          NASA · ESA · CSA · STScI — First Deep Field, SMACS 0723
        </p>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-violet-200/60"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
