import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Plus, Users, Building2, ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/SEO';
import codexHero from '@/assets/codex/codex-hero.jpg';

interface CodexButton {
  to: string;
  label: string;
  icon: typeof BookOpen;
  desc: string;
}

const BUTTONS: CodexButton[] = [
  { to: '/the-46',         label: 'Browse Codex',          icon: BookOpen,  desc: 'Open the full archive' },
  { to: '/profile',        label: 'My Frequency Entries',  icon: Sparkles,  desc: 'Your personal vault' },
  { to: '/echoverse',      label: 'Add to Codex',          icon: Plus,      desc: 'Contribute knowledge' },
  { to: '/echoverse',      label: 'Community Highlights',  icon: Users,     desc: 'Voices of the Circle' },
  { to: '/pyramids',       label: 'Ritual Blueprints',     icon: Building2, desc: 'Sacred geometry plans' },
  { to: '/',               label: 'Back to Temple',        icon: ArrowLeft, desc: 'Return to Observatory' },
];

export default function CodexPage() {
  return (
    <>
      <SEO
        title="The 46 Codex — Pantheon Frequency 46"
        description="Ancient knowledge. Modern power. The Codex holds every law, right, ritual, and truth the Pantheon has gathered across realms and timelines."
        canonical="/codex"
      />

      {/* Nebula backdrop */}
      <div className="relative min-h-screen overflow-hidden bg-[#05030D]">
        {/* layered cosmic glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(160,32,240,0.35),transparent_60%)]" />
          <div className="absolute top-1/3 -right-32 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(255,215,0,0.18),transparent_65%)] blur-2xl" />
          <div className="absolute bottom-0 -left-32 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(124,58,237,0.28),transparent_65%)] blur-3xl" />
        </div>

        <main className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-32">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center font-black tracking-[2px] leading-none text-4xl sm:text-6xl"
            style={{ fontFamily: '"Cinzel", "Space Grotesk", serif' }}
          >
            <span
              className="bg-gradient-to-b from-white via-[#fde68a] to-[#ffd700] bg-clip-text text-transparent"
              style={{ WebkitTextFillColor: 'transparent', textShadow: '0 0 40px rgba(255,215,0,0.35)' }}
            >
              THE 46 CODEX
            </span>
          </motion.h1>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mt-6 rounded-2xl overflow-hidden border border-[#ffd700]/30 shadow-[0_0_60px_-10px_rgba(255,215,0,0.45),0_0_120px_-30px_rgba(160,32,240,0.6)]"
          >
            <img
              src={codexHero}
              alt="The 46 Codex — sacred temple archive"
              width={1024}
              height={1280}
              className="w-full h-auto object-cover"
            />
            {/* edge vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05030D]/80" />
            {/* animated sigil pulse overlay */}
            <motion.div
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.18),transparent_55%)]"
            />
          </motion.div>

          {/* Body copy */}
          <div className="mt-6 text-center space-y-4">
            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light">
              Ancient knowledge. Modern power. The Codex holds every law, right,
              ritual, and truth the Pantheon has gathered across realms and timelines.
            </p>
            <p className="text-xs sm:text-sm text-white/55 leading-relaxed tracking-wide">
              Search the full archive · Filter by culture, era, or frequency
              <br className="hidden sm:inline" />
              · Save to your personal vault · Share with the Circle
            </p>
          </div>

          {/* Button grid */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {BUTTONS.map((btn, i) => (
              <motion.div
                key={btn.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
              >
                <Link
                  to={btn.to}
                  className="group relative flex flex-col items-center justify-center gap-2 aspect-square rounded-xl border border-[#ffd700]/30 bg-gradient-to-b from-[#1a1038]/80 to-[#05030D]/90 backdrop-blur-sm shadow-[0_0_20px_-6px_rgba(255,215,0,0.35),inset_0_0_30px_-10px_rgba(160,32,240,0.4)] hover:border-[#ffd700]/70 hover:shadow-[0_0_30px_-4px_rgba(255,215,0,0.65),inset_0_0_40px_-10px_rgba(160,32,240,0.6)] transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#ffd700]/20 blur-xl group-hover:bg-[#ffd700]/40 transition-colors" />
                    <btn.icon className="relative w-7 h-7 sm:w-8 sm:h-8 text-[#fde68a] drop-shadow-[0_0_8px_rgba(255,215,0,0.7)] group-hover:scale-110 transition-transform" />
                  </div>
                  <div
                    className="text-[10px] sm:text-[11px] uppercase tracking-[2px] font-bold text-center text-white/90 leading-tight px-2"
                    style={{ fontFamily: '"Cinzel", "Space Grotesk", serif' }}
                  >
                    {btn.label}
                  </div>
                  <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd700]/60 to-transparent" />
                </Link>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
