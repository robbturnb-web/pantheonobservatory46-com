import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { JWST_GALLERY, type JwstGalleryImage } from '@/data/jwst-gallery';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

const INTERVAL_MS = 5000;

export function WebbGalleryStrip() {
  const [active, setActive] = useState<JwstGalleryImage | null>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeTimer = useRef<number | null>(null);

  const total = JWST_GALLERY.length;
  const current = JWST_GALLERY[index];

  const goTo = useCallback((i: number) => {
    setIndex(((i % total) + total) % total);
    setProgress(0);
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto advance + progress
  useEffect(() => {
    if (paused || active) return;
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / INTERVAL_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => (i + 1) % total);
        setProgress(0);
      }
    }, 50);
    return () => window.clearInterval(tick);
  }, [index, paused, active, total]);

  // Pause-then-resume helper
  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 2000);
  }, []);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active) return;
      if (e.key === 'ArrowRight') { next(); pauseTemporarily(); }
      if (e.key === 'ArrowLeft') { prev(); pauseTemporarily(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, active, pauseTemporarily]);

  return (
    <section id="jwst-gallery" className="relative py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-300/80"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Pantheon Archive · 02
            </p>
            <h2
              className="mt-2 text-3xl md:text-5xl font-bold text-violet-50 tracking-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Webb's Greatest Frames
            </h2>
            <p className="mt-2 text-violet-200/70 text-sm md:text-base max-w-2xl">
              Twelve images that changed the conversation. Auto-cycling · tap to view full.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-violet-300/50" style={{ fontFamily: "'Space Mono', monospace" }}>
            <Camera className="w-3 h-3" /> {total} frames
          </div>
        </div>

        {/* Stage */}
        <div
          className="relative mx-auto w-full md:w-[78%] aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border"
          style={{
            borderColor: 'rgba(167,139,250,0.28)',
            background: 'rgba(15,10,35,0.6)',
            boxShadow: '0 30px 60px -25px rgba(0,0,0,0.8), 0 0 40px rgba(124,58,237,0.18)',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={pauseTemporarily}
        >
          <AnimatePresence mode="wait">
            <motion.button
              key={current.id}
              type="button"
              onClick={() => setActive(current)}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1.12 }}
              exit={{ opacity: 0, scale: 1.16 }}
              transition={{ opacity: { duration: 0.8 }, scale: { duration: INTERVAL_MS / 1000, ease: 'linear' } }}
              className="absolute inset-0 w-full h-full cursor-zoom-in"
              aria-label={`Open ${current.title}`}
            >
              <ImageWithFallback
                src={current.src}
                alt={current.title}
                className="w-full h-full object-cover"
              />
            </motion.button>
          </AnimatePresence>

          {/* Bottom gradient + caption */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#05030d] via-[#05030d]/30 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={`cap-${current.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 p-5 md:p-7 pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-0.5 rounded"
                  style={{
                    color: '#fde68a',
                    background: 'rgba(252,211,77,0.12)',
                    border: '1px solid rgba(252,211,77,0.35)',
                  }}
                >
                  {current.instrument}
                </span>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-violet-300/80" style={{ fontFamily: "'Space Mono', monospace" }}>
                  {current.distance}
                </span>
              </div>
              <h3
                className="text-xl md:text-3xl font-bold text-violet-50 leading-tight"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {current.title}
              </h3>
              <p className="mt-0.5 text-xs md:text-sm text-violet-200/80">{current.target}</p>
              <p className="mt-2 text-xs md:text-sm text-violet-100/85 leading-snug max-w-3xl line-clamp-2 md:line-clamp-3">
                {current.why}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); pauseTemporarily(); }}
            className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 p-2 md:p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-violet-100 backdrop-blur-md transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); pauseTemporarily(); }}
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 p-2 md:p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-violet-100 backdrop-blur-md transition"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Counter + pause */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setPaused((p) => !p); }}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/75 text-violet-100 backdrop-blur-md"
              aria-label={paused ? 'Play' : 'Pause'}
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <span
              className="px-2 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] bg-black/55 text-violet-100 backdrop-blur-md"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-50/10 z-10">
            <div
              className="h-full bg-gradient-to-r from-amber-300 to-violet-400 transition-[width] duration-75 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center justify-center gap-1.5 flex-wrap">
          {JWST_GALLERY.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => { goTo(i); pauseTemporarily(); }}
              aria-label={`Go to frame ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? 28 : 8,
                background: i === index ? '#fde68a' : 'rgba(167,139,250,0.35)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-md cursor-zoom-out"
            style={{ background: 'rgba(5,3,13,0.92)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full max-h-full overflow-auto rounded-2xl border"
              style={{ borderColor: 'rgba(167,139,250,0.3)', background: 'rgba(10,4,30,0.95)' }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-violet-100 hover:bg-black/80"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <ImageWithFallback
                src={active.src}
                alt={active.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-5 md:p-7">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-0.5 rounded"
                    style={{
                      color: '#fde68a',
                      background: 'rgba(252,211,77,0.12)',
                      border: '1px solid rgba(252,211,77,0.35)',
                    }}
                  >
                    {active.instrument}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-violet-300/70" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {active.distance}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
                  {active.title}
                </h3>
                <p className="text-violet-300/80 text-sm">{active.target}</p>
                <p className="mt-3 text-violet-100/90 text-sm md:text-base leading-relaxed">{active.why}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-violet-400/50" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Credit · {active.credit}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WebbGalleryStrip;
