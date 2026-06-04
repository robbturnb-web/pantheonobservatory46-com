import { motion } from 'framer-motion';
import { Eye, Sparkles } from 'lucide-react';
import { TELESCOPE_COMPARISONS } from '@/data/jwst-comparisons';
import { ImageCompareSlider } from './ImageCompareSlider';

export function WhyOnlyWebb() {
  return (
    <section id="jwst-why" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80" style={{ fontFamily: "'Space Mono', monospace" }}>
            WHY ONLY WEBB · COMPARATIVE OPTICS
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            What other telescopes <em className="text-amber-300 not-italic">couldn't</em> see
          </h2>
          <p className="mt-4 text-sm md:text-base text-violet-200/70 max-w-2xl mx-auto leading-relaxed">
            Every telescope before Webb hit a physical wall — wavelength, aperture, atmosphere, or temperature. Here's exactly what those walls were, and how Webb walks through them.
          </p>
        </div>

        <div className="space-y-6">
          {TELESCOPE_COMPARISONS.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border backdrop-blur-md overflow-hidden"
              style={{ borderColor: 'rgba(167,139,250,0.25)', background: 'rgba(15,8,40,0.55)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Rival side */}
                <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r" style={{ borderColor: 'rgba(167,139,250,0.18)' }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-300/60 inline-flex items-center gap-1.5" style={{ fontFamily: "'Space Mono', monospace" }}>
                    <Eye className="w-3 h-3" /> Predecessor
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-violet-100" style={{ fontFamily: "'Cinzel', serif" }}>
                    {c.rival.name}
                  </h3>
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {[
                      ['Aperture', c.rival.aperture],
                      ['Wavelength', c.rival.wavelength],
                      ['Orbit', c.rival.orbit],
                      ['Launched', c.rival.launch],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-lg border p-2.5" style={{ borderColor: 'rgba(167,139,250,0.18)', background: 'rgba(10,5,30,0.5)' }}>
                        <dt className="text-[9px] uppercase tracking-[0.2em] text-violet-300/50">{k}</dt>
                        <dd className="text-violet-100 mt-0.5 text-[11px] leading-tight">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-4 rounded-lg p-3 border" style={{ borderColor: 'rgba(220,38,38,0.3)', background: 'rgba(220,38,38,0.06)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300/80 mb-1">Hard limit</p>
                    <p className="text-sm text-rose-50/85 leading-relaxed">{c.rival.limit}</p>
                  </div>
                </div>

                {/* Webb side */}
                <div className="p-6 md:p-8" style={{ background: 'linear-gradient(135deg, rgba(252,211,77,0.04), rgba(124,58,237,0.06))' }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300 inline-flex items-center gap-1.5" style={{ fontFamily: "'Space Mono', monospace" }}>
                    <Sparkles className="w-3 h-3" /> Webb's edge
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-bold text-violet-50 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                    {c.webbWin}
                  </h3>
                  <p className="mt-4 text-sm md:text-base text-violet-100/85 leading-relaxed">
                    {c.why}
                  </p>
                </div>
              </div>

              {/* Optional split slider */}
              {c.split && (
                <div className="p-6 md:p-8 border-t" style={{ borderColor: 'rgba(167,139,250,0.18)', background: 'rgba(5,3,13,0.4)' }}>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-300/70 mb-3" style={{ fontFamily: "'Space Mono', monospace" }}>
                    Side-by-side · {c.split.subject} · drag to compare
                  </p>
                  <ImageCompareSlider
                    leftSrc={c.split.rivalImage}
                    rightSrc={c.split.webbImage}
                    leftLabel={c.split.rivalLabel}
                    rightLabel={c.split.webbLabel}
                    alt={c.split.subject}
                  />
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
