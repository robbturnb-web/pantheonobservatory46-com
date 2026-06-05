import { motion } from 'framer-motion';

export function L2OrbitExplainer() {
  return (
    <section id="jwst-orbit" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80 mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            LAGRANGE POINT 2 · L2
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            1.5 Million km From Home
          </h2>
          <p className="mt-3 text-violet-100/70 text-sm md:text-base max-w-2xl mx-auto">
            Why Webb doesn't orbit Earth — and why no other deep-IR telescope ever has either.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Diagram */}
          <div className="relative aspect-square max-w-md mx-auto w-full">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              {/* Sun */}
              <defs>
                <radialGradient id="sunGrad">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </radialGradient>
                <radialGradient id="earthGrad">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#1e40af" />
                </radialGradient>
              </defs>

              {/* Earth orbit */}
              <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(167,139,250,0.2)" strokeDasharray="3 4" />

              {/* Sun */}
              <circle cx="200" cy="200" r="28" fill="url(#sunGrad)" filter="drop-shadow(0 0 20px #fbbf24)" />
              <text x="200" y="245" textAnchor="middle" fill="#fde68a" fontSize="11" fontFamily="monospace">SUN</text>

              {/* Earth */}
              <circle cx="320" cy="200" r="10" fill="url(#earthGrad)" />
              <text x="320" y="225" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace">EARTH</text>

              {/* L2 point and halo orbit */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ originX: '350px', originY: '200px' }}
              >
                <ellipse cx="350" cy="200" rx="22" ry="14" fill="none" stroke="rgba(252,211,77,0.5)" strokeWidth="1" />
                <circle cx="372" cy="200" r="4" fill="#fde68a" filter="drop-shadow(0 0 6px #fde68a)" />
              </motion.g>
              <text x="355" y="170" fill="#fde68a" fontSize="10" fontFamily="monospace" fontWeight="bold">JWST · L2</text>

              {/* Shadow line — sunshield direction */}
              <line x1="200" y1="200" x2="380" y2="200" stroke="rgba(252,211,77,0.25)" strokeWidth="0.5" strokeDasharray="2 3" />

              {/* Distance label */}
              <text x="345" y="270" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace">1.5M km from Earth</text>
              <text x="345" y="283" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace">~4× Moon distance</text>
            </svg>
          </div>

          {/* Explanation */}
          <div className="space-y-5">
            <Block
              title="Gravity Parking Spot"
              body="L2 is where the Sun's and Earth's gravity combine to let a small object orbit the Sun in lockstep with Earth — once per year. Almost no fuel needed to stay in formation."
            />
            <Block
              title="Cold by Design"
              body="From L2, the Sun, Earth, and Moon all line up on the same side. Webb's tennis-court sunshield blocks all three at once, letting the mirror cool passively to −233 °C. MIRI gets even colder with active cryocoolers."
            />
            <Block
              title="No Servicing — Ever"
              body="Hubble was serviced 5 times at 540 km altitude. Webb sits 4,000× farther away. There is no spacecraft on Earth that can reach it. Every system had to work first try."
            />
            <Block
              title="20-Year Reserve"
              body="The flawless Ariane 5 launch saved so much station-keeping fuel that Webb's mission life jumped from 10 years to ~20+."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border p-5"
      style={{ borderColor: 'rgba(167,139,250,0.25)', background: 'rgba(15,8,40,0.5)' }}
    >
      <h3 className="text-base font-bold text-amber-200 mb-1.5" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
      <p className="text-sm text-violet-100/75 leading-relaxed">{body}</p>
    </motion.div>
  );
}
