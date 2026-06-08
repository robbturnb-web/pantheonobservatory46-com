import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Radio, Telescope, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 — signal lost at:', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title="Signal Lost — 404 | Pantheon Observatory"
        description="The frequency you tuned to no longer broadcasts. Return to a known channel."
        path={location.pathname}
        noindex
      />
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
        {/* Cosmic backdrop */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.25), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.10), transparent 55%), linear-gradient(180deg, #05030D 0%, #0a0420 60%, #03020a 100%)',
          }}
        />
        {/* Subtle scanlines */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none opacity-30 mix-blend-screen"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0 2px, rgba(167,139,250,0.04) 2px 3px)',
          }}
        />

        <div className="text-center max-w-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] font-bold uppercase tracking-[0.35em] text-realm-observatory mb-4"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            // TRANSMISSION INTERRUPTED
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-7xl md:text-9xl font-bold text-violet-50 leading-none"
            style={{
              fontFamily: "'Cinzel', serif",
              textShadow:
                '0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(124,58,237,0.3)',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              404
            </motion.span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-2xl md:text-3xl font-bold text-violet-100"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Signal Lost
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 text-violet-200/70 text-sm md:text-base leading-relaxed"
          >
            The frequency you tuned to no longer broadcasts.{' '}
            <span className="font-mono text-xs text-violet-300/60 block mt-1">
              {location.pathname}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all hover:-translate-y-0.5"
              style={{
                color: '#f5f3ff',
                background: 'rgba(124,58,237,0.18)',
                borderColor: 'rgba(167,139,250,0.5)',
                boxShadow: '0 0 24px rgba(124,58,237,0.35)',
              }}
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link
              to="/echo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-cyan-400/40 text-cyan-100 bg-cyan-500/10 hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Ask Echo
            </Link>
            <Link
              to="/telescopes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-amber-400/40 text-amber-100 bg-amber-500/10 hover:-translate-y-0.5 transition-all"
            >
              <Telescope className="w-4 h-4" /> Observatory
            </Link>
            <Link
              to="/signals"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-violet-400/30 text-violet-100 bg-violet-500/10 hover:-translate-y-0.5 transition-all"
            >
              <Radio className="w-4 h-4" /> Signals
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
