import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera } from 'lucide-react';
import { JWST_GALLERY, type JwstGalleryImage } from '@/data/jwst-gallery';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

export function WebbGalleryStrip() {
  const [active, setActive] = useState<JwstGalleryImage | null>(null);

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
              Twelve images that changed the conversation. Swipe through · tap to view full.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-violet-300/50" style={{ fontFamily: "'Space Mono', monospace" }}>
            <Camera className="w-3 h-3" /> {JWST_GALLERY.length} frames
          </div>
        </div>

        <div
          className="flex gap-4 overflow-x-auto pb-6 -mx-5 px-5 md:-mx-10 md:px-10 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {JWST_GALLERY.map((img, i) => (
            <motion.button
              key={img.id}
              type="button"
              onClick={() => setActive(img)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group relative shrink-0 w-[82%] sm:w-[44%] md:w-[28%] lg:w-[24%] snap-start rounded-2xl overflow-hidden border text-left"
              style={{
                borderColor: 'rgba(167,139,250,0.25)',
                background: 'rgba(15,10,35,0.6)',
                boxShadow: '0 20px 40px -20px rgba(0,0,0,0.7)',
              }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#05030d] via-[#05030d]/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] px-1.5 py-0.5 rounded"
                    style={{
                      color: '#fde68a',
                      background: 'rgba(252,211,77,0.12)',
                      border: '1px solid rgba(252,211,77,0.35)',
                    }}
                  >
                    {img.instrument}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-violet-300/70" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {img.distance}
                  </span>
                </div>
                <h3
                  className="text-base md:text-lg font-bold text-violet-50 leading-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {img.title}
                </h3>
                <p className="mt-0.5 text-[11px] md:text-xs text-violet-200/70 truncate">
                  {img.target}
                </p>
                <p className="mt-2 text-[11px] md:text-xs text-violet-100/80 leading-snug line-clamp-2">
                  {img.why}
                </p>
              </div>
            </motion.button>
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
