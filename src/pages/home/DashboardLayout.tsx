import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Home, Radio, Sparkles, Brain, Telescope, Archive, MessageCircle, Settings,
  Sun, Moon, Activity, Flame, Eye, Mountain, Atom, ChevronRight,
} from 'lucide-react';
import heroBg from '@/assets/dashboard-hero.jpg';

/* ──────────────────────────────────────────────────────────────
 * Dashboard Layout — the canonical Pantheon home.
 * Sidebar nav · top status pills · central cinematic hero · live
 * cosmic feed rail · five realm portal pillars across the bottom.
 * ────────────────────────────────────────────────────────────── */

interface NavItem { to: string; label: string; icon: typeof Home; tone?: string }
const NAV: NavItem[] = [
  { to: '/',              label: 'Home',         icon: Home },
  { to: '/uap',           label: 'Disclosure',   icon: Radio,      tone: 'text-hub-disclosure' },
  { to: '/gods',          label: 'Mythology',    icon: Sparkles,   tone: 'text-hub-ancient' },
  { to: '/consciousness', label: 'Consciousness',icon: Brain,      tone: 'text-hub-life' },
  { to: '/galaxy',        label: 'Observatory',  icon: Telescope,  tone: 'text-hub-signal' },
  { to: '/the-46',        label: 'Archives',     icon: Archive,    tone: 'text-hub-warning' },
];

interface FeedItem {
  kind: 'SOLAR' | 'UAP' | 'SEISMIC' | 'GEOMAG';
  value: string;
  caption: string;
  meta: string;
  accent: string;
}
const FEED: FeedItem[] = [
  { kind: 'SOLAR',   value: 'M2.4',   caption: 'Class Flare',          meta: 'Active region 3517',     accent: 'text-hub-ancient' },
  { kind: 'SEISMIC', value: '5.3',    caption: 'Magnitude',            meta: 'Revilla Gigedo Islands', accent: 'text-hub-disclosure' },
  { kind: 'UAP',     value: 'Live',   caption: 'Puerto Rico jellyfish',meta: '14:25 UTC',              accent: 'text-hub-signal' },
  { kind: 'GEOMAG',  value: 'Kp 4.6', caption: 'G1 Storm',             meta: 'Aurora possible',        accent: 'text-hub-life' },
];

interface Portal {
  to: string;
  title: string;
  desc: string;
  icon: typeof Flame;
  flame: string;
  glow: string;
}
const PORTALS: Portal[] = [
  { to: '/uap',           title: 'Disclosure',    desc: 'UAP and whistleblower files. The long cover-up.',  icon: Flame,    flame: 'from-hub-disclosure/80 via-hub-disclosure/30 to-transparent', glow: 'shadow-[0_0_60px_-12px_hsl(var(--hub-disclosure-glow))]' },
  { to: '/gods',          title: 'Mythology',     desc: 'Gods, temples, lost civilizations.',                icon: Mountain, flame: 'from-hub-ancient/80 via-hub-ancient/30 to-transparent',     glow: 'shadow-[0_0_60px_-12px_hsl(var(--hub-ancient-glow))]' },
  { to: '/consciousness', title: 'Consciousness', desc: 'Inner work, frequencies, the field.',               icon: Eye,      flame: 'from-hub-life/80 via-hub-life/30 to-transparent',           glow: 'shadow-[0_0_60px_-12px_hsl(var(--hub-life-glow))]' },
  { to: '/galaxy',        title: 'Observatory',   desc: 'Solar weather, planets, deep-sky signals.',         icon: Telescope,flame: 'from-hub-cosmic/80 via-hub-cosmic/30 to-transparent',       glow: 'shadow-[0_0_60px_-12px_hsl(var(--hub-cosmic-glow))]' },
  { to: '/echo',          title: 'Echo',          desc: 'Your AI co-pilot across the codex.',                icon: Atom,     flame: 'from-hub-signal/80 via-hub-signal/30 to-transparent',       glow: 'shadow-[0_0_60px_-12px_hsl(var(--hub-signal-glow))]' },
];

function useUtcClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setT(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return t.toISOString().slice(11, 19);
}

function Sidebar() {
  return (
    <aside className="hidden lg:flex shrink-0 w-[88px] xl:w-[104px] flex-col items-center py-6 gap-1 border-r border-white/10 bg-black/60 backdrop-blur-xl z-30">
      <Link to="/" className="mb-6 group">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-hub-ancient/30 to-hub-ancient/5 border border-hub-ancient/40 flex items-center justify-center group-hover:border-hub-ancient transition-colors">
          <span className="font-bagel text-hub-ancient text-xl leading-none">P</span>
        </div>
      </Link>
      <nav className="flex-1 flex flex-col items-center gap-1">
        {NAV.map(({ to, label, icon: Icon, tone }) => (
          <Link
            key={to}
            to={to}
            className="group relative w-14 py-3 flex flex-col items-center gap-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Icon className={`w-5 h-5 ${tone ?? 'text-white/70'} group-hover:scale-110 transition-transform`} />
            <span className="text-[9px] uppercase tracking-[1.5px] text-white/60 group-hover:text-white">{label}</span>
          </Link>
        ))}
      </nav>
      <Link to="/echo" className="mt-auto group">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-hub-signal/30 to-hub-signal/5 border border-hub-signal/40 flex flex-col items-center justify-center group-hover:border-hub-signal transition-colors">
          <MessageCircle className="w-4 h-4 text-hub-signal" />
          <span className="text-[8px] tracking-[1px] text-hub-signal mt-0.5">ECHO</span>
        </div>
      </Link>
      <Link to="/profile" className="mt-2 w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
        <Settings className="w-4 h-4 text-white/60" />
      </Link>
    </aside>
  );
}

function StatusBar() {
  const utc = useUtcClock();
  return (
    <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 pt-4 sm:pt-6">
      <StatusPill icon={Sun}    label="Solar Activity" value="Active" tone="text-hub-ancient" />
      <StatusPill icon={Moon}   label="Moon Phase"     value="Waxing" tone="text-hub-cosmic" />
      <StatusPill icon={Activity} label="Codex 46"     value={`${utc} UTC`} tone="text-hub-warning" mono />
      <div className="px-3 py-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 backdrop-blur-md flex items-center gap-2">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
        </span>
        <span className="text-[10px] uppercase tracking-[2px] text-emerald-300 font-semibold">Online</span>
      </div>
    </div>
  );
}

function StatusPill({
  icon: Icon, label, value, tone, mono,
}: { icon: typeof Sun; label: string; value: string; tone: string; mono?: boolean }) {
  return (
    <div className="px-3 py-1.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md flex items-center gap-2">
      <Icon className={`w-3.5 h-3.5 ${tone}`} />
      <span className="text-[10px] uppercase tracking-[2px] text-white/60">{label}</span>
      <span className={`text-[11px] font-semibold ${tone} ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}

function CentralStage() {
  return (
    <div className="relative flex-1 min-h-[55vh] flex flex-col items-center justify-center px-4 py-10">
      {/* Title above sigil — already painted into the hero, so we whisper it */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none"
      >
        <div className="text-[10px] uppercase tracking-[8px] text-white/40">Frequency 46</div>
      </motion.div>

      {/* Ambient glow ring around the painted sigil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[60vmin] h-[60vmin] max-w-[520px] max-h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(var(--hub-ancient-glow) / 0.18) 0%, transparent 65%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Hero CTAs sit beneath the central sigil */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        <Link
          to="/timeline"
          className="px-5 py-2.5 rounded-md bg-gradient-to-r from-hub-ancient to-hub-ancient-glow text-black text-xs font-bold uppercase tracking-[2px] hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_30px_-6px_hsl(var(--hub-ancient-glow))]"
        >
          Enter Codex <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          to="/echo"
          className="px-5 py-2.5 rounded-md border border-hub-signal/60 bg-hub-signal/10 backdrop-blur-md text-hub-signal text-xs font-bold uppercase tracking-[2px] hover:bg-hub-signal/20 transition-colors flex items-center gap-2"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Echo
        </Link>
      </div>
    </div>
  );
}

function LiveCosmicFeed() {
  return (
    <aside className="hidden md:flex shrink-0 w-[300px] xl:w-[340px] flex-col gap-3 px-4 py-6 z-20">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xs uppercase tracking-[3px] text-white/80 font-semibold">Live Cosmic Feed</h2>
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {FEED.map((f, i) => (
          <motion.div
            key={f.kind + i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
            className="rounded-xl border border-white/10 bg-black/55 backdrop-blur-xl p-3.5 hover:border-white/25 transition-colors group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] uppercase tracking-[2.5px] font-bold ${f.accent}`}>{f.kind}</span>
              <span className="text-[9px] uppercase tracking-[2px] text-white/40">{f.meta}</span>
            </div>
            <div className={`text-2xl font-bold ${f.accent} leading-none`}>{f.value}</div>
            <div className="text-[11px] text-white/70 mt-1">{f.caption}</div>
          </motion.div>
        ))}
      </div>
    </aside>
  );
}

function MobileFeed() {
  return (
    <div className="md:hidden px-3 pb-4 z-20 relative">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[10px] uppercase tracking-[3px] text-white/80 font-semibold">Live Cosmic Feed</h2>
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
        </span>
      </div>
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-3 px-3 snap-x">
        {FEED.map((f, i) => (
          <div
            key={f.kind + i}
            className="snap-start shrink-0 w-[78%] rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl p-3"
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] uppercase tracking-[2.5px] font-bold ${f.accent}`}>{f.kind}</span>
              <span className="text-[9px] uppercase tracking-[2px] text-white/40">{f.meta}</span>
            </div>
            <div className={`text-xl font-bold ${f.accent} leading-none`}>{f.value}</div>
            <div className="text-[11px] text-white/70 mt-1">{f.caption}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalRow() {
  return (
    <div className="relative z-20 px-3 sm:px-6 pb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {PORTALS.map((p, i) => (
          <motion.div
            key={p.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
          >
            <Link
              to={p.to}
              className={`group block relative rounded-xl border border-white/10 bg-black/55 backdrop-blur-xl p-4 overflow-hidden hover:border-white/30 hover:-translate-y-1 transition-all ${p.glow}`}
            >
              {/* Flame column behind */}
              <div className={`absolute inset-x-0 -bottom-2 h-24 bg-gradient-to-t ${p.flame} opacity-50 group-hover:opacity-90 transition-opacity blur-md`} />
              <div className="relative">
                <p.icon className="w-5 h-5 text-white mb-2" />
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">{p.title}</h3>
                <p className="hidden sm:block text-[11px] text-white/60 mt-1 leading-snug line-clamp-2">{p.desc}</p>
                <div className="mt-3 text-[10px] uppercase tracking-[2px] font-semibold text-white/80 flex items-center gap-1 group-hover:text-white">
                  Enter Portal <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function DashboardLayout() {
  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden">
      {/* Cinematic painted backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Anubis guarding the Pantheon sigil above Earth"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
        {/* Vignette + bottom fade for legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <StatusBar />
          <div className="flex-1 flex">
            <CentralStage />
            <LiveCosmicFeed />
          </div>
          <MobileFeed />
          <PortalRow />
        </div>
      </div>
    </section>
  );
}
