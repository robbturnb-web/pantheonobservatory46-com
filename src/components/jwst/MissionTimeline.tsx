import { motion } from 'framer-motion';

const EVENTS = [
  { date: '1996', title: 'Concept Approved', body: 'NASA, ESA, and CSA greenlight the Next Generation Space Telescope — successor to Hubble.' },
  { date: '2002', title: 'Renamed JWST', body: 'Named after James E. Webb, NASA administrator during Apollo. Design pivots to 6.5 m segmented mirror.' },
  { date: '2016', title: 'Mirror Complete', body: '18 gold-coated beryllium hexagons assembled at Goddard. Total collecting area: 25.4 m².' },
  { date: '2021-12-25', title: 'Launch', body: 'Ariane 5 ECA lifts off from Kourou, French Guiana on Christmas morning. Flawless insertion saves ~10 years of fuel.' },
  { date: '2022-01-08', title: 'Sunshield Deployed', body: '344 single-point failures cleared. Five-layer Kapton shield the size of a tennis court unfurls.' },
  { date: '2022-01-24', title: 'L2 Insertion', body: 'Arrives at Sun-Earth L2 Lagrange point, 1.5 million km from Earth.' },
  { date: '2022-07-12', title: 'First Light Released', body: 'SMACS 0723 deep field shown at the White House — deepest infrared image ever taken.' },
  { date: '2023', title: 'CO₂ on Exoplanet', body: 'First unambiguous detection of carbon dioxide in an exoplanet atmosphere (WASP-39b).' },
  { date: '2024', title: 'Earliest Galaxy', body: 'JADES-GS-z14-0 confirmed at z=14.32 — 290 million years after the Big Bang.' },
  { date: '2025+', title: 'Extended Mission', body: 'Fuel reserves project ~20 years of science operations. Cycle 4 underway.' },
];

export function MissionTimeline() {
  return (
    <section id="jwst-mission" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80 mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            MISSION TIMELINE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            25 Years From Concept to First Light
          </h2>
          <p className="mt-3 text-violet-100/70 text-sm md:text-base max-w-2xl mx-auto">
            The most complex science instrument ever flown — and every milestone that almost didn't happen.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, rgba(252,211,77,0.5), rgba(124,58,237,0.4), transparent)' }} />
          <div className="space-y-8">
            {EVENTS.map((e, i) => (
              <motion.div
                key={e.date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05 }}
                className={`relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 0 ? '' : 'md:[&>div:first-child]:col-start-2'}`}
              >
                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-2 w-3 h-3 rounded-full border-2" style={{ background: '#fde68a', borderColor: 'rgba(252,211,77,0.4)', boxShadow: '0 0 12px rgba(252,211,77,0.6)' }} />
                <div className={`${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80 mb-1">{e.date}</p>
                  <h3 className="text-lg font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>{e.title}</h3>
                  <p className="mt-1 text-sm text-violet-100/70 leading-relaxed">{e.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
