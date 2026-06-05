import { motion } from 'framer-motion';
import { Telescope, Waves, Snowflake, Sparkles } from 'lucide-react';

const CARDS = [
  {
    icon: Waves,
    title: 'Redshift',
    eq: 'λobserved = λemitted × (1 + z)',
    body: 'The universe is expanding, so light from distant galaxies is stretched. A 13-billion-year-old UV photon arrives as mid-infrared. Hubble can\'t see it. Webb can.',
    accent: '#a78bfa',
  },
  {
    icon: Telescope,
    title: 'Aperture × Area',
    eq: '25.4 m² collecting area — 6.25× Hubble',
    body: 'Bigger mirror catches more photons. The 18 hexagonal beryllium segments unfold in orbit because no rocket fairing could fit a single 6.5 m disc.',
    accent: '#fbbf24',
  },
  {
    icon: Snowflake,
    title: 'Cryogenic Silence',
    eq: 'NIRCam −234 °C · MIRI −266 °C',
    body: 'Infrared IS heat. A warm telescope would blind itself with its own glow. Webb\'s five-layer sunshield drops temperature by 280 °C across its width.',
    accent: '#22d3ee',
  },
  {
    icon: Sparkles,
    title: 'Spectroscopy',
    eq: 'Each molecule = unique absorption fingerprint',
    body: 'When starlight passes through a planet\'s atmosphere, gases absorb specific wavelengths. NIRSpec splits the light and reads the spectrum — that\'s how we now know WASP-39b has CO₂.',
    accent: '#10b981',
  },
];

export function HowWebbSees() {
  return (
    <section id="jwst-physics" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300/80 mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            THE PHYSICS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            How Webb Actually Sees
          </h2>
          <p className="mt-3 text-violet-100/70 text-sm md:text-base max-w-2xl mx-auto">
            Four physical principles do all the work. Strip away the engineering and this is what's left.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border p-6 backdrop-blur-md transition-all hover:-translate-y-1"
                style={{
                  borderColor: `${c.accent}44`,
                  background: `linear-gradient(135deg, ${c.accent}0d, rgba(15,8,40,0.7))`,
                  boxShadow: `0 20px 50px -25px ${c.accent}55`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${c.accent}1f`, color: c.accent }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>{c.title}</h3>
                </div>
                <p className="text-xs font-mono px-3 py-2 rounded-md mb-3 border" style={{ color: c.accent, borderColor: `${c.accent}33`, background: 'rgba(5,3,13,0.6)' }}>
                  {c.eq}
                </p>
                <p className="text-sm text-violet-100/80 leading-relaxed">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
