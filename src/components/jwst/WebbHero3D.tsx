import { Suspense, lazy, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown, Radio, Telescope } from 'lucide-react';
import { isWebGLAvailable } from '@/lib/webgl';
import { useIsMobile } from '@/hooks/use-mobile';

const WebbModel3D = lazy(() => import('./WebbModel3D').then((m) => ({ default: m.WebbModel3D })));

function daysOnStation() {
  const launch = new Date('2021-12-25T12:20:00Z').getTime();
  return Math.floor((Date.now() - launch) / (1000 * 60 * 60 * 24));
}

const DEEP_FIELD = 'https://stsci-opo.org/STScI-01G7DCWB7137MYJ05CSH1Q5Z1Z.png';

interface Props {
  onFallback?: () => void;
}

export function WebbHero3D({ onFallback }: Props) {
  const [days, setDays] = useState(daysOnStation());
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setWebglOk(isWebGLAvailable());
    const id = window.setInterval(() => setDays(daysOnStation()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (webglOk === false) onFallback?.();
  }, [webglOk, onFallback]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="relative w-full overflow-hidden" style={{ height: isMobile ? '88vh' : '100vh', minHeight: isMobile ? 560 : 640 }}>
      {/* Deep field backdrop */}
      <div className="absolute inset-0">
        <img
          src={DEEP_FIELD}
          alt="JWST first deep field — SMACS 0723"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(5,3,13,0.35) 0%, rgba(5,3,13,0.82) 68%, rgba(5,3,13,1) 100%)',
          }}
        />
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-30" style={{ background: '#7c3aed' }} />
        <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] rounded-full blur-[120px] opacity-20" style={{ background: '#22d3ee' }} />
      </div>

      {/* 3D Canvas */}
      {webglOk && (
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 1, isMobile ? 11 : 9], fov: isMobile ? 38 : 42 }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.35} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fff8e0" />
            <Stars radius={60} depth={50} count={1500} factor={3} fade speed={0.4} />
            <Suspense fallback={null}>
              <WebbModel3D autoRotate scale={isMobile ? 0.75 : 1} />
            </Suspense>
            {!isMobile && (
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
              />
            )}
          </Canvas>
        </div>
      )}

      {/* Foreground content (top + bottom, keep middle clear for model) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-between text-center px-4 py-6 md:py-12 pointer-events-none">
        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-4 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
            style={{
              fontFamily: "'Cinzel', 'Space Grotesk', serif",
              color: '#f5f3ff',
              textShadow: '0 0 40px rgba(167, 139, 250, 0.5)',
            }}
          >
            JAMES WEBB
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-300/80"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            6.5 m · 18 gold mirrors · L2 · 1.5 million km from Earth
          </motion.p>
        </div>

        <div className="pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap gap-3 justify-center"
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

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="mt-6 text-violet-200/60 flex justify-center"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Credit */}
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-widest uppercase opacity-40 text-violet-100 z-10">
        Model · stylized · backdrop NASA/ESA/CSA/STScI SMACS 0723
      </p>
    </section>
  );
}
