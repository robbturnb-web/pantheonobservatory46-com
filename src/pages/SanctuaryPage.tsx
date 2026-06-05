import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Radio } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { ManifestoLetter } from '@/components/sanctuary/ManifestoLetter';
import { PillarsTriad } from '@/components/sanctuary/PillarsTriad';
import { NumerologyCodex } from '@/components/sanctuary/NumerologyCodex';
import { OracleConsole } from '@/components/sanctuary/OracleConsole';
import { daysOverdue } from '@/data/the-46';
import sigil from '@/assets/temple/sigil-46.png';

/**
 * Sanctuary of 46 — the soul of the site.
 * Single cinematic scroll explaining why the number is the key.
 */
export function SanctuaryPage() {
  const overdue = daysOverdue();
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setPulse((p) => p + 1), 4600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SEO
        title="The Sanctuary of 46 — Pantheon Frequency 46"
        description="46 chromosomes. 46 hidden UAP files. One frequency. The Sanctuary is the bridge between your biology and the stars — Manifesto, Codex, and the 46-Oracle."
        canonical="/46"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'The Sanctuary of 46',
          description: 'The Pantheon Frequency 46 Sanctuary: Manifesto, Codex, and the 46-Oracle.',
          url: 'https://pantheonobservatory46-com.lovable.app/46',
        }}
      />

      {/* Cosmic backdrop unique to the Sanctuary */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at top, rgba(124, 58, 237, 0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(34, 211, 238, 0.08) 0%, transparent 60%), linear-gradient(180deg, #05030D 0%, #0a0518 60%, #02010a 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.4) 2px 3px)',
          }}
        />
      </div>

      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Halo behind sigil */}
        <motion.div
          key={pulse}
          initial={{ scale: 0.8, opacity: 0.4 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 4.4, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, transparent 65%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-[10px] sm:text-xs uppercase tracking-[8px] text-primary/80 mb-6"
        >
          The Sanctuary
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
          src={sigil}
          alt="The 46 Sigil — emblem of the Pantheon Frequency 46"
          width={220}
          height={220}
          className="w-44 sm:w-56 h-auto mb-8 drop-shadow-[0_0_40px_rgba(124,58,237,0.6)]"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-5 bg-gradient-to-b from-foreground via-foreground to-primary/60 bg-clip-text text-transparent"
        >
          46 chromosomes.
          <br />
          46 hidden files.
          <br />
          <span className="text-primary">One frequency.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="text-base sm:text-lg text-foreground/75 max-w-2xl mx-auto mb-8"
        >
          The bridge between your biology and the stars. The Sanctuary is where the micro and
          the macro stop pretending they are not the same signal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/40 text-[10px] sm:text-xs uppercase tracking-[3px] text-destructive backdrop-blur-sm"
        >
          <Radio className="w-3 h-3 animate-pulse" />
          Luna Deadline · {overdue} Days Past · No Files Released
        </motion.div>
      </section>

      <ManifestoLetter />
      <PillarsTriad />
      <NumerologyCodex />
      <OracleConsole />

      {/* ───────── CTA → Star-Seed Terminal ───────── */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-primary/40 bg-background/70 backdrop-blur-xl p-8 sm:p-12 text-center"
          style={{
            boxShadow: '0 0 80px -20px hsl(var(--primary))',
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.20) 0%, transparent 70%)',
            }}
          />
          <div className="relative">
            <div className="text-[10px] sm:text-xs uppercase tracking-[6px] text-primary/80 mb-4">
              Step Two
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
              Find Your Origin
            </h2>
            <p className="text-base sm:text-lg text-foreground/75 max-w-xl mx-auto mb-8">
              You carry the 46 in your cells. The Star-Seed Terminal traces where that code
              first came from — Lyra, Sirius, the Pleiades, Arcturus, Andromeda, Orion.
            </p>
            <Link
              to="/star-seed"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[3px] hover:bg-primary/90 transition-all hover:scale-[1.02]"
            >
              Enter the Terminal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
