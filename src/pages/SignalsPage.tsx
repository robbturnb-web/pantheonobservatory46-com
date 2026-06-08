import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { creators } from '../data/creators';
import type { SignalRating } from '../types';
import { Shield, AlertTriangle, XCircle, Filter, Radio, MessageCircle, ExternalLink } from 'lucide-react';
import { SEO } from '@/components/SEO';

const ratingConfig: Record<SignalRating, { label: string; icon: typeof Shield; text: string; ring: string; chip: string }> = {
  GREEN: {
    label: 'Reliable',
    icon: Shield,
    text: 'text-signal-online',
    ring: 'border-l-signal-online',
    chip: 'bg-signal-online/10 border-signal-online/30 text-signal-online',
  },
  YELLOW: {
    label: 'Mixed',
    icon: AlertTriangle,
    text: 'text-amber-300',
    ring: 'border-l-amber-300',
    chip: 'bg-amber-400/10 border-amber-400/30 text-amber-200',
  },
  RED: {
    label: 'Unreliable',
    icon: XCircle,
    text: 'text-rose-400',
    ring: 'border-l-rose-400',
    chip: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
  },
};

const filterOptions: { key: string; label: string; rating?: SignalRating }[] = [
  { key: 'all', label: 'All Signals' },
  { key: 'GREEN', label: 'Reliable', rating: 'GREEN' },
  { key: 'YELLOW', label: 'Mixed', rating: 'YELLOW' },
  { key: 'RED', label: 'Unreliable', rating: 'RED' },
];

export function SignalsPage() {
  const [filter, setFilter] = useState('all');

  const counts = useMemo(() => ({
    total: creators.length,
    green: creators.filter(c => c.rating === 'GREEN').length,
    yellow: creators.filter(c => c.rating === 'YELLOW').length,
    red: creators.filter(c => c.rating === 'RED').length,
  }), []);

  const filtered = filter === 'all' ? creators : creators.filter((c) => c.rating === filter);

  return (
    <>
      <SEO
        title="Signal Watch — UAP & Consciousness Credibility | Pantheon"
        description={`Credibility ratings for ${counts.total} UAP and consciousness researchers. Not character — sourcing rigor. ${counts.green} reliable, ${counts.yellow} mixed, ${counts.red} unreliable.`}
        path="/signals"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Signal Watch',
          description: 'Credibility ratings for UAP and consciousness researchers.',
          url: 'https://pantheonobservatory46-com.lovable.app/signals',
          numberOfItems: counts.total,
        }}
      />

      {/* Atmospheric backdrop */}
      <div className="relative">
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.18), transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(34,211,238,0.08), transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 -z-10 pointer-events-none opacity-25 mix-blend-screen"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0 2px, rgba(167,139,250,0.05) 2px 3px)',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-realm-observatory mb-3" style={{ fontFamily: "'Space Mono', monospace" }}>
              // SIGNAL WATCH · CREDIBILITY DECK
            </p>
            <div className="inline-flex items-center gap-2 mb-4">
              <Radio className="w-6 h-6 text-realm-observatory" />
              <span className="flex items-center gap-2 text-xs font-semibold text-signal-online">
                <span className="w-2 h-2 rounded-full bg-signal-online animate-pulse shadow-[0_0_8px_currentColor]" />
                LIVE FEED
              </span>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-bold text-violet-50 mb-4"
              style={{
                fontFamily: "'Cinzel', serif",
                textShadow: '0 0 30px rgba(124,58,237,0.5)',
              }}
            >
              The Signal Deck
            </h1>
            <p className="text-violet-100/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Credibility ratings for <span className="text-violet-50 font-semibold">{counts.total}</span> UAP &amp; consciousness researchers. Not a judgment of character — a measure of sourcing rigor.
            </p>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
          >
            {[
              { label: 'Total', value: counts.total, cls: 'text-violet-50 border-violet-400/30 bg-violet-500/10' },
              { label: 'Reliable', value: counts.green, cls: 'text-signal-online border-signal-online/30 bg-signal-online/10' },
              { label: 'Mixed', value: counts.yellow, cls: 'text-amber-200 border-amber-400/30 bg-amber-400/10' },
              { label: 'Unreliable', value: counts.red, cls: 'text-rose-300 border-rose-500/30 bg-rose-500/10' },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border px-4 py-3 text-center ${s.cls}`}>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-80 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Filters */}
          <div className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.04] backdrop-blur-md p-4 mb-8 flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-violet-200/70">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((opt) => {
                const isActive = filter === opt.key;
                const cfg = opt.rating ? ratingConfig[opt.rating] : null;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setFilter(opt.key)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isActive
                        ? cfg
                          ? cfg.chip
                          : 'bg-violet-500/20 border-violet-400/50 text-violet-50'
                        : 'bg-transparent border-violet-400/15 text-violet-200/60 hover:text-violet-100 hover:border-violet-400/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Signal cards */}
          <div className="space-y-3">
            {filtered.map((c, i) => {
              const config = ratingConfig[c.rating];
              const Icon = config.icon;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.6) }}
                  className={`rounded-xl border border-violet-400/10 bg-violet-950/30 backdrop-blur-sm border-l-4 ${config.ring} p-5 hover:border-violet-400/30 transition-colors`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <h2 className="text-lg font-bold text-violet-50 truncate">{c.name}</h2>
                      <p className="text-[11px] uppercase tracking-widest text-violet-300/60 mt-0.5">{c.platform}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${config.text} flex-shrink-0`}>
                      <Icon className="w-3.5 h-3.5" />
                      {config.label}
                    </div>
                  </div>
                  <p className="text-sm text-violet-100/85 leading-relaxed mb-3">{c.description}</p>
                  <p className="text-xs text-violet-200/60 italic bg-violet-500/[0.04] border border-violet-400/10 rounded-lg px-3 py-2">
                    {c.ratingNote}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Echo handoff */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent backdrop-blur-md p-8 text-center"
            style={{ boxShadow: '0 0 60px rgba(34,211,238,0.15)' }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300 mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
              ECHO HANDOFF
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-violet-50 mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Ask Echo about any signal
            </h3>
            <p className="text-violet-100/70 text-sm md:text-base mb-5 max-w-xl mx-auto">
              Need deeper sourcing context? Echo has the full file on every researcher in this deck.
            </p>
            <Link
              to="/echo?seed=Walk+me+through+how+you+rate+UAP+researcher+credibility"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-cyan-400/50 text-cyan-50 bg-cyan-500/15 hover:bg-cyan-500/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Open Echo <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
