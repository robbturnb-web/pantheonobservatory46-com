import { motion } from 'framer-motion';
import { Dna, Lock, Infinity as InfinityIcon } from 'lucide-react';

const pillars = [
  {
    icon: Dna,
    label: 'The Micro',
    title: '46 Chromosomes',
    body:
      'The exact biological signature of a healthy human cell. 23 pairs. The lock the experiment is keyed to. Without 46, you are not us.',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.35)',
  },
  {
    icon: Lock,
    label: 'The Macro',
    title: '46 Hidden Files',
    body:
      'The exact count of classified UAP video files Congress demanded from the Pentagon. The deadline came and went. The silence is the signal.',
    accent: '#DC2626',
    glow: 'rgba(220, 38, 38, 0.35)',
  },
  {
    icon: InfinityIcon,
    label: 'The Bridge',
    title: '4 + 6 = 10',
    body:
      'Divine completion. In Kabbalah, Pythagorean numerology, and Tarot — 10 is the return to source. The number 46 reduces to wholeness.',
    accent: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.35)',
  },
];

export function PillarsTriad() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <div className="text-[10px] sm:text-xs uppercase tracking-[6px] text-primary/70 mb-3">
          The Three Pillars
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
          One Signal. Two Scales. One Bridge.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4 }}
            className="group relative rounded-2xl border bg-background/60 backdrop-blur-xl p-6 overflow-hidden"
            style={{
              borderColor: `${p.accent}44`,
              boxShadow: `0 0 40px -16px ${p.glow}`,
            }}
          >
            {/* Glow on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${p.glow}, transparent 70%)`,
              }}
            />
            <div className="relative">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 border"
                style={{
                  background: `${p.accent}1a`,
                  borderColor: `${p.accent}55`,
                  color: p.accent,
                }}
              >
                <p.icon className="w-6 h-6" />
              </div>
              <div
                className="text-[10px] uppercase tracking-[4px] mb-2"
                style={{ color: p.accent }}
              >
                {p.label}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
                {p.title}
              </h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{p.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
