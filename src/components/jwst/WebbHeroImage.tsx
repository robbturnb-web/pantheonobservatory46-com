import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Radio, Telescope } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

function daysOnStation() {
  const launch = new Date('2021-12-25T12:20:00Z').getTime();
  return Math.floor((Date.now() - launch) / (1000 * 60 * 60 * 24));
}

const BACKDROP = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/NASA%E2%80%99s_Webb_Reveals_Cosmic_Cliffs%2C_Glittering_Landscape_of_Star_Birth_-_Flickr_-_James_Webb_Space_Telescope.png/1920px-NASA%E2%80%99s_Webb_Reveals_Cosmic_Cliffs%2C_Glittering_Landscape_of_Star_Birth_-_Flickr_-_James_Webb_Space_Telescope.png'; // Cosmic Cliffs
const POLAROIDS = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Pillars_of_Creation_%28NIRCam_Image%29.png/1280px-Pillars_of_Creation_%28NIRCam_Image%29.png',
    label: 'Pillars of Creation',
    sub: 'NIRCam · 6,500 ly',
    rotate: -8,
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/M74_Galaxy_JWST_MIRI.jpg/1280px-M74_Galaxy_JWST_MIRI.jpg',
    label: 'Phantom Galaxy',
    sub: 'MIRI · M74',
    rotate: 4,
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Webb%27s_First_Deep_Field.jpg/1280px-Webb%27s_First_Deep_Field.jpg",
    label: 'First Deep Field',
    sub: 'SMACS 0723',
    rotate: 9,
  },
];

export function WebbHeroImage() {
  const [days, setDays] = useState(daysOnStation());
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = window.setInterval(() => setDays(daysOnStation()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: isMobile ? 'auto' : '100vh' }}
    >
      {/* Backdrop with slow Ken Burns */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.18 }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0"
      >
        <ImageWithFallback
          src={BACKDROP}
          alt="JWST Carina Nebula Cosmic Cliffs"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Vignette + brand glow wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(5,3,13,0.25) 0%, rgba(5,3,13,0.75) 60%, rgba(5,3,13,0.98) 100%)',
        }}
      />
      <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full blur-[140px] opacity-30" style={{ background: '#7c3aed' }} />
      <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full blur-[140px] opacity-20" style={{ background: '#22d3ee' }} />

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-24 md:pt-32 pb-12 md:pb-20 grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center ${isMobile ? '' : 'min-h-[88vh]'}`}>
        {/* Left — text block */}
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border backdrop-blur-md"
            style={{
              borderColor: 'rgba(34, 197, 94, 0.45)',
              background: 'rgba(34, 197, 94, 0.12)',
              color: '#22c55e',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Online · L2 Halo Orbit · Day {days.toLocaleString()}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-5 text-[10px] md:text-xs uppercase tracking-[0.5em] text-amber-300/80"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            Pantheon Observatory · Flagship Telescope
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-3 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.95]"
            style={{
              fontFamily: "'Cinzel', 'Space Grotesk', serif",
              color: '#f5f3ff',
              textShadow: '0 0 50px rgba(167, 139, 250, 0.55)',
            }}
          >
            JAMES<br />WEBB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-5 text-base md:text-lg text-violet-100/85 max-w-xl md:pr-6 leading-relaxed mx-auto md:mx-0"
          >
            The most powerful eye humanity has ever built. 6.5 meters of gold-coated mirror, parked
            a million miles from Earth, rewriting what we know about the universe — one image at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollTo('jwst-console')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border backdrop-blur-md transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(167, 139, 250, 0.18)',
                borderColor: 'rgba(167, 139, 250, 0.5)',
                color: '#ede9fe',
                boxShadow: '0 0 24px rgba(167, 139, 250, 0.3)',
              }}
            >
              <Radio className="w-4 h-4" /> Enter Mission Console
            </button>
            <button
              type="button"
              onClick={() => scrollTo('jwst-vault')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border backdrop-blur-md transition-all hover:scale-[1.02]"
              style={{
                background: 'rgba(252, 211, 77, 0.1)',
                borderColor: 'rgba(252, 211, 77, 0.45)',
                color: '#fde68a',
              }}
            >
              <Telescope className="w-4 h-4" /> Browse 25 Findings
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="mt-6 text-[10px] md:text-xs uppercase tracking-[0.4em] text-violet-300/60"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            6.5 m · 18 gold mirrors · L2 · 1.5 million km from Earth
          </motion.p>
        </div>

        {/* Right — floating polaroid stack (desktop) / single polaroid (mobile) */}
        <div className={`relative ${isMobile ? 'h-[300px]' : 'h-[520px]'} flex items-center justify-center`}>
          {(isMobile ? POLAROIDS.slice(0, 1) : POLAROIDS).map((p, i) => {
            const offsetX = isMobile ? 0 : (i - 1) * 96;
            const offsetY = isMobile ? 0 : (i - 1) * 24;
            const rotate = isMobile ? -4 : p.rotate;
            return (
              <motion.figure
                key={p.label}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                animate={{ opacity: 1, y: offsetY, rotate, x: offsetX }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                whileHover={{ scale: 1.06, rotate: rotate * 0.4, zIndex: 30 }}
                className={`${isMobile ? 'relative w-[68%]' : 'absolute w-[60%] md:w-[62%]'} aspect-[4/5] rounded-md p-3 pb-12 backdrop-blur-md cursor-pointer`}
                style={{
                  background: 'linear-gradient(180deg, rgba(245,243,255,0.94), rgba(237,233,254,0.88))',
                  boxShadow: '0 30px 60px -20px rgba(0,0,0,0.7), 0 0 40px rgba(167,139,250,0.35)',
                  zIndex: 10 + i,
                }}
              >
                <ImageWithFallback
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover rounded-sm"
                />
                <figcaption
                  className="absolute bottom-2 left-3 right-3 text-center"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <div className="text-[11px] md:text-sm font-bold text-violet-950 tracking-wide truncate">
                    {p.label}
                  </div>
                  <div className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-violet-700/70 truncate" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {p.sub}
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}

          {/* Soft glow under stack */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full blur-2xl opacity-50" style={{ background: 'rgba(167,139,250,0.6)' }} />
        </div>
      </div>


      {/* Scroll chevron */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-violet-200/60 z-10"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>

      {/* Credit */}
      <p className="absolute bottom-2 right-3 text-[9px] tracking-widest uppercase opacity-40 text-violet-100 z-10">
        Imagery · NASA / ESA / CSA / STScI
      </p>
    </section>
  );
}

export default WebbHeroImage;
