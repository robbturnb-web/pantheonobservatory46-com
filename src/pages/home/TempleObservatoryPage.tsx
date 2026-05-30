import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  Home, Eye, Mountain, Brain, Satellite, Folder, Bot, Settings,
  Sun, Volume2, Radio, Flame, Activity, AlertTriangle, ChevronRight,
  MapPin, Lock, Telescope, Sparkles, Zap, Waves,
} from 'lucide-react';

import heroBg from '@/assets/dashboard-hero.jpg';
import feedSolar from '@/assets/temple/feed-solar.jpg';
import feedUap from '@/assets/temple/feed-uap.jpg';
import feedQuake from '@/assets/temple/feed-quake.jpg';
import sdo193 from '@/assets/temple/sdo-193.jpg';
import sdo304 from '@/assets/temple/sdo-304.jpg';
import sdo171 from '@/assets/temple/sdo-171.jpg';
import sdoHmi from '@/assets/temple/sdo-hmi.jpg';
import portalDisclosure from '@/assets/temple/portal-disclosure.jpg';
import portalMythology from '@/assets/temple/portal-mythology.jpg';
import portalConsciousness from '@/assets/temple/portal-consciousness.jpg';
import portalObservatory from '@/assets/temple/portal-observatory.jpg';
import portalEcho from '@/assets/temple/portal-echo.jpg';

import { gods } from '@/data/gods';

/* ─────────────────────────────────────────────────────────────────
 * PANTHEON FREQUENCY 46 — Temple Observatory home.
 * Top navigation · persistent left sidebar · cinematic hero with
 * live Kp gauge & flare class bar · Earth / Anomalous activity
 * panels · 2×2 live cosmic feed · five core portals · The Gods
 * Return preview · SDO live imagery · transmissions ticker.
 * ───────────────────────────────────────────────────────────────── */

/* ───────────── live clock ───────────── */
function useUtcClock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setT(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

/* ───────────── TOP NAV ───────────── */
const TABS: { to: string; label: string }[] = [
  { to: '/',              label: 'Home' },
  { to: '/uap',           label: 'Disclosure' },
  { to: '/gods',          label: 'Mythology' },
  { to: '/consciousness', label: 'Consciousness' },
  { to: '/galaxy',        label: 'Observatory' },
  { to: '/echo',          label: 'Echo AI' },
];

function TopNav({ kp }: { kp: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#a020f0]/30 bg-[#0a0a1f]/85 backdrop-blur-xl">
      {/* Subtle purple top glow */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#a020f0]/80 to-transparent" />
      <div className="relative flex items-center gap-3 px-3 sm:px-5 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-9 h-9 rounded-md border border-[#ffd700]/60 bg-gradient-to-br from-[#ffd700]/25 to-[#a020f0]/20 flex items-center justify-center shadow-[0_0_18px_-2px_rgba(255,215,0,0.55)] group-hover:shadow-[0_0_28px_-2px_rgba(255,215,0,0.9)] transition-shadow">
            <span className="font-bagel text-[#ffd700] text-base leading-none">P</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-[#ffd700] bg-[#0a0a1f] border border-[#ffd700]/60 rounded-sm px-0.5 leading-none py-px">46</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[4px] text-white/60">Pantheon</span>
            <span className="text-[10px] uppercase tracking-[4px] text-[#ffd700]/80">Frequency 46</span>
          </div>
        </Link>

        {/* Tabs */}
        <nav className="hidden md:flex items-center gap-0.5 mx-auto">
          {TABS.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className={`relative px-3 py-1.5 rounded-md text-[11px] uppercase tracking-[2.5px] font-semibold transition-colors ${
                i === 0 ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
              {i === 0 && (
                <span className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#a020f0] to-transparent" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-400/40 bg-emerald-400/10">
            <Sun className="w-3 h-3 text-[#ffd700]" />
            <span className="text-[9px] uppercase tracking-[2px] text-white/60">Solar</span>
            <span className="text-[10px] font-bold text-emerald-300 tracking-[1px]">ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#a020f0]/40 bg-[#a020f0]/10">
            <span className="text-[9px] uppercase tracking-[2px] text-white/60">Kp</span>
            <span className="text-[11px] font-bold text-[#c77dff] font-mono">{kp.toFixed(1)}</span>
          </div>
          <button className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 text-[10px] uppercase tracking-[2px] text-white/70 hover:text-white hover:border-white/30 transition-colors">
            <Radio className="w-3 h-3" /> Feed
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <Link to="/profile" className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#a020f0] to-[#7209b7] text-white text-xs font-bold border border-[#c77dff]/50 shadow-[0_0_12px_-2px_rgba(199,125,255,0.7)]">
            R
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ───────────── SIDEBAR ───────────── */
interface SideItem { to: string; label: string; icon: typeof Home; tone: string; glow: string }
const SIDE_ITEMS: SideItem[] = [
  { to: '/',              label: 'Home',          icon: Home,      tone: 'text-white',           glow: 'shadow-[0_0_16px_-2px_rgba(255,255,255,0.5)]' },
  { to: '/uap',           label: 'Disclosure',    icon: Eye,       tone: 'text-emerald-300',     glow: 'shadow-[0_0_16px_-2px_rgba(16,185,129,0.7)]' },
  { to: '/gods',          label: 'Mythology',     icon: Mountain,  tone: 'text-[#ffd700]',       glow: 'shadow-[0_0_16px_-2px_rgba(255,215,0,0.7)]' },
  { to: '/consciousness', label: 'Conscious',     icon: Brain,     tone: 'text-emerald-300',     glow: 'shadow-[0_0_16px_-2px_rgba(52,211,153,0.7)]' },
  { to: '/galaxy',        label: 'Observatory',   icon: Satellite, tone: 'text-[#c77dff]',       glow: 'shadow-[0_0_16px_-2px_rgba(160,32,240,0.7)]' },
  { to: '/the-46',        label: 'Archives',      icon: Folder,    tone: 'text-amber-300',       glow: 'shadow-[0_0_16px_-2px_rgba(251,191,36,0.7)]' },
  { to: '/echo',          label: 'Echo AI',       icon: Bot,       tone: 'text-cyan-300',        glow: 'shadow-[0_0_16px_-2px_rgba(34,211,238,0.7)]' },
  { to: '/profile',       label: 'Settings',      icon: Settings,  tone: 'text-white/70',        glow: '' },
];

function Sidebar() {
  const active = '/';
  return (
    <aside className="hidden lg:flex shrink-0 w-[84px] flex-col items-center py-5 gap-1 border-r border-[#a020f0]/20 bg-[#0a0a1f]/85 backdrop-blur-xl">
      {SIDE_ITEMS.map((item) => {
        const isActive = item.to === active;
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`group relative w-16 py-2.5 flex flex-col items-center gap-1 rounded-lg transition-colors ${
              isActive ? 'bg-white/5' : 'hover:bg-white/5'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-transparent via-[#a020f0] to-transparent rounded-full" />
            )}
            <item.icon
              className={`w-5 h-5 ${item.tone} ${isActive ? item.glow : ''} group-hover:scale-110 transition-transform`}
            />
            <span className="text-[8.5px] uppercase tracking-[1.5px] text-white/55 group-hover:text-white/90">
              {item.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}

/* ───────────── KP GAUGE ───────────── */
function KpGauge({ kp }: { kp: number }) {
  // Semi-circle gauge 0..9 → arc 180deg from -180 to 0
  const max = 9;
  const ratio = Math.min(Math.max(kp / max, 0), 1);
  const radius = 110;
  const circumference = Math.PI * radius;
  const dash = circumference * ratio;

  return (
    <div className="relative w-[280px] h-[180px] mx-auto">
      <svg viewBox="0 0 280 180" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="kpArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#a020f0" />
            <stop offset="55%" stopColor="#c77dff" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <filter id="kpGlow">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {/* Track */}
        <path
          d={`M 30 150 A ${radius} ${radius} 0 0 1 250 150`}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* Active arc */}
        <path
          d={`M 30 150 A ${radius} ${radius} 0 0 1 250 150`}
          stroke="url(#kpArc)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          filter="url(#kpGlow)"
        />
        {/* Tick marks */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = -180 + (i / 9) * 180;
          const a = (angle * Math.PI) / 180;
          const x1 = 140 + Math.cos(a) * (radius + 12);
          const y1 = 150 + Math.sin(a) * (radius + 12);
          const x2 = 140 + Math.cos(a) * (radius + 18);
          const y2 = 150 + Math.sin(a) * (radius + 18);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          );
        })}
      </svg>
      {/* Center readout */}
      <div className="absolute inset-x-0 bottom-3 text-center">
        <div className="text-[9px] uppercase tracking-[3px] text-white/50">Geomagnetic Index</div>
        <div className="text-5xl font-black bg-gradient-to-r from-[#c77dff] to-[#fde68a] bg-clip-text text-transparent leading-none mt-1">
          Kp {kp.toFixed(1)}
        </div>
      </div>
      {/* End labels */}
      <div className="absolute left-0 bottom-0 text-[9px] text-white/40 font-mono">0</div>
      <div className="absolute right-0 bottom-0 text-[9px] text-white/40 font-mono">9</div>
    </div>
  );
}

/* ───────────── HERO ───────────── */
function Hero({ kp, utc }: { kp: number; utc: Date }) {
  return (
    <section className="relative px-4 sm:px-8 pt-8 pb-6">
      {/* Subtitle row */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[3px] text-white/55 mb-3">
        <span className="flex items-center gap-1.5 text-emerald-300">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="relative rounded-full w-1.5 h-1.5 bg-emerald-400" />
          </span>
          All Systems Nominal
        </span>
        <span className="hidden sm:inline">·</span>
        <span>Realm: <span className="text-[#c77dff]">The Observatory</span></span>
        <span className="hidden sm:inline">·</span>
        <span className="font-mono text-white/70">Live Sync {utc.toISOString().slice(11, 19)} UTC</span>
      </div>

      {/* Title */}
      <h1 className="text-center font-black tracking-[1px] leading-none">
        <span className="block text-4xl sm:text-6xl lg:text-7xl" style={{ fontFamily: '"Cinzel", "Space Grotesk", serif' }}>
          <span className="bg-gradient-to-b from-white via-[#fde68a] to-[#ffd700] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', textShadow: '0 0 40px rgba(255,215,0,0.25)' }}>
            TEMPLE OBSERVATORY
          </span>
        </span>
      </h1>
      <div className="text-center mt-2 text-[10px] uppercase tracking-[6px] text-white/45">
        Pantheon · Frequency 46
      </div>

      {/* Central stage */}
      <div className="relative mt-6 grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-6xl mx-auto">
        {/* Left flank — flare class bar */}
        <div className="hidden lg:flex flex-col gap-2 order-1">
          <div className="text-[10px] uppercase tracking-[3px] text-white/50">Flare Class</div>
          <FlareClassBar current="M2.4" />
        </div>

        {/* Center — gauge + flare callout */}
        <div className="order-2 relative">
          <div className="absolute -inset-8 rounded-full bg-[#a020f0]/15 blur-3xl pointer-events-none" />
          <KpGauge kp={kp} />
          <div className="relative mt-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ffd700]/40 bg-black/40">
              <Flame className="w-3 h-3 text-[#ffd700]" />
              <span className="text-[10px] uppercase tracking-[3px] text-white/60">Solar Flare</span>
              <span className="text-sm font-bold text-[#ffd700]">M2.4</span>
              <span className="text-[10px] uppercase tracking-[2px] text-emerald-300 ml-1">Quiet</span>
            </div>
            <p className="text-xs text-white/60 mt-3 max-w-md mx-auto leading-relaxed">
              Geomagnetic conditions quiet. Aurora visibility elevated at high latitudes.
            </p>
          </div>
        </div>

        {/* Right flank — quick CTAs */}
        <div className="order-3 flex flex-col gap-2 items-stretch lg:items-end">
          <Link to="/earth-pulse" className="group inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-md border border-[#a020f0]/40 bg-[#a020f0]/10 hover:bg-[#a020f0]/20 transition-colors">
            <span className="text-[10px] uppercase tracking-[3px] text-[#c77dff]">Earth Pulse Live</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#c77dff] group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/echo" className="group inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-md border border-cyan-400/40 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors">
            <span className="text-[10px] uppercase tracking-[3px] text-cyan-300">Open Echo AI</span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FlareClassBar({ current }: { current: string }) {
  const classes = ['A', 'B', 'C', 'M', 'X'];
  const activeIdx = classes.indexOf(current[0]);
  return (
    <div className="rounded-lg border border-white/10 bg-black/40 backdrop-blur-md p-3 w-full">
      <div className="flex items-end gap-1.5 h-16">
        {classes.map((c, i) => {
          const intensity = (i + 1) / 5;
          const isActive = i === activeIdx;
          return (
            <div key={c} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-sm transition-all ${isActive ? 'ring-1 ring-[#ffd700]' : ''}`}
                style={{
                  height: `${intensity * 100}%`,
                  background: isActive
                    ? 'linear-gradient(to top, #ffd700, #fde68a)'
                    : `linear-gradient(to top, rgba(160,32,240,${0.15 + intensity * 0.4}), rgba(160,32,240,${0.05 + intensity * 0.2}))`,
                  boxShadow: isActive ? '0 0 12px rgba(255,215,0,0.6)' : 'none',
                }}
              />
              <span className={`text-[9px] font-bold ${isActive ? 'text-[#ffd700]' : 'text-white/40'}`}>{c}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-[2px] text-white/40">
        <span>Quiet</span>
        <span className="text-[#ffd700]">{current}</span>
        <span>Extreme</span>
      </div>
    </div>
  );
}

/* ───────────── ACTIVITY PANELS ───────────── */
function ActivityPanels() {
  return (
    <section className="relative px-4 sm:px-8 pb-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        {/* Earth Activity */}
        <div className="relative rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[3px] text-red-300/80 mb-1">Earth Activity · 24H</div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-red-400">5</span>
                <span className="text-xs uppercase tracking-[2px] text-white/50">Events</span>
                <span className="text-[10px] uppercase tracking-[2px] text-white/40">Highest M<span className="text-red-300 font-bold">5.3</span></span>
              </div>
            </div>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          {/* Mini activity chart */}
          <Sparkline color="#ef4444" data={[2, 3, 2.4, 4, 3.2, 5.3, 4.6, 3.8, 4.2, 5, 4.4, 3.6, 4.8, 5.1, 4.2]} />
          <div className="relative flex flex-wrap gap-1.5 mt-3">
            {['China', 'Revilla Gigedo Is.', 'Pacific Rim', 'Sumatra'].map((t) => (
              <span key={t} className="text-[9px] uppercase tracking-[2px] px-2 py-0.5 rounded-full border border-red-400/30 text-red-200 bg-red-500/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Anomalous Activity */}
        <div className="relative rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-start justify-between mb-3">
            <div className="text-[10px] uppercase tracking-[3px] text-emerald-300/80">Anomalous Activity · 24H</div>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="relative grid grid-cols-2 gap-3 mb-3">
            <Stat label="UAP Reports" value="5" delta="+12%" sub="3 high cred" />
            <Stat label="USO Reports" value="4" delta="+3%"  sub="Coastal" />
          </div>
          {/* Correlation engine */}
          <div className="relative rounded-lg border border-white/10 bg-black/40 p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3.5 h-3.5 text-[#c77dff]" />
              <span className="text-[10px] uppercase tracking-[3px] text-white/70 font-semibold">Correlation Engine</span>
            </div>
            <CorrelationRow grade="MED" text="Solar flare + seismic cluster · 63% prob next 48h" />
            <CorrelationRow grade="MED" text="UAP cluster near western US military range" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, delta, sub }: { label: string; value: string; delta: string; sub: string }) {
  return (
    <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/5 p-3">
      <div className="text-[9px] uppercase tracking-[2px] text-emerald-200/70 mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-emerald-300">{value}</span>
        <span className="text-[10px] font-bold text-emerald-400">{delta}</span>
      </div>
      <div className="text-[9px] uppercase tracking-[2px] text-white/40 mt-0.5">{sub}</div>
    </div>
  );
}

function CorrelationRow({ grade, text }: { grade: string; text: string }) {
  return (
    <div className="flex items-start gap-2 py-1">
      <span className="shrink-0 mt-0.5 text-[8.5px] font-bold px-1.5 py-0.5 rounded-sm bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-[1px]">
        {grade}
      </span>
      <span className="text-[11px] text-white/75 leading-snug">{text}</span>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const w = 100;
  const h = 32;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${h - (v / max) * h}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="relative w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spk-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={`url(#spk-${color})`} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────── LIVE COSMIC FEED 2x2 ───────────── */
interface FeedCard { img: string; kind: string; tone: string; live: string; title: string; meta: string }
const FEED_CARDS: FeedCard[] = [
  { img: feedSolar, kind: 'Solar Storm',       tone: 'text-[#ffd700]', live: 'M2.4',     title: 'Active region 3517 erupts', meta: 'GOES-16 · 14:25 UTC' },
  { img: feedUap,   kind: 'UAP Sighting',      tone: 'text-emerald-300', live: '0:90M', title: 'Jellyfish anomaly · Iraq',   meta: 'FLIR · declassified' },
  { img: feedQuake, kind: 'Earthquake',        tone: 'text-red-400',   live: 'M5.3',    title: 'Revilla Gigedo Islands',     meta: 'USGS · 12 min ago' },
  { img: portalEcho,kind: 'Echo Signal',       tone: 'text-cyan-300',  live: 'LIVE',    title: 'Codex 46 transmission',      meta: 'AI cluster online' },
];

function LiveCosmicFeed({ utc }: { utc: Date }) {
  return (
    <section className="relative px-4 sm:px-8 pb-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon={Radio} label="Live Cosmic Feed" sub="Real-time signal across all four watch domains" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEED_CARDS.map((c, i) => (
            <motion.article
              key={c.kind}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl hover:border-[#a020f0]/50 transition-colors"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.4s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {/* Live badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-emerald-500/95 text-black text-[9px] font-black tracking-[1.5px] uppercase shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-black animate-ping opacity-50" />
                    <span className="relative rounded-full w-1.5 h-1.5 bg-black" />
                  </span>
                  Live
                </div>
                {/* Kind tag */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-sm bg-black/70 backdrop-blur text-[9px] uppercase tracking-[2px] text-white/80 border border-white/15">
                  {c.kind}
                </div>
                {/* Big value bottom-right */}
                <div className={`absolute bottom-2 right-3 text-2xl font-black ${c.tone}`} style={{ textShadow: '0 0 12px currentColor' }}>
                  {c.live}
                </div>
              </div>
              <div className="p-3.5">
                <h3 className="text-sm font-bold text-white leading-tight">{c.title}</h3>
                <div className="text-[10px] uppercase tracking-[2px] text-white/45 mt-1.5 font-mono">{c.meta}</div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Status panel */}
        <div className="mt-4 rounded-xl border border-[#a020f0]/30 bg-gradient-to-r from-[#0a0a1f] via-[#1a1038]/70 to-[#0a0a1f] backdrop-blur-xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[2px]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative rounded-full w-1.5 h-1.5 bg-emerald-400" />
            </span>
            <span className="text-emerald-300 font-bold">Online</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/55">
            <MapPin className="w-3 h-3 text-[#c77dff]" />
            <span className="font-mono">40.8605° N · 76.7883° W</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/55">
            <span className="text-[#ffd700] font-bold">Codex 46</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/55 font-mono">
            <span>{utc.toISOString().slice(0, 10)} · {utc.toISOString().slice(11, 19)} UTC</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Lock className="w-3 h-3 text-emerald-300" />
            <span className="text-emerald-300 font-bold">Access · Authorized</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── CORE PORTALS ───────────── */
interface Portal {
  to: string; title: string; desc: string; icon: typeof Eye;
  img: string; tone: string; ring: string; glow: string;
}
const PORTALS: Portal[] = [
  { to: '/uap',           title: 'Disclosure',    desc: 'UAP cases, whistleblowers, government archives, declassified files.', icon: Eye,       img: portalDisclosure,    tone: 'text-emerald-300', ring: 'border-emerald-400/40', glow: 'shadow-[0_0_40px_-10px_rgba(16,185,129,0.7)]' },
  { to: '/gods',          title: 'Mythology',     desc: 'Gods, ancient civilizations, symbols, global lore, comparative mythology.', icon: Mountain,  img: portalMythology,     tone: 'text-[#ffd700]',   ring: 'border-[#ffd700]/40',   glow: 'shadow-[0_0_40px_-10px_rgba(255,215,0,0.7)]' },
  { to: '/consciousness', title: 'Consciousness', desc: 'Frequencies, meditation, NDEs, altered states, psychology, philosophy.',  icon: Brain,     img: portalConsciousness, tone: 'text-emerald-300', ring: 'border-emerald-400/40', glow: 'shadow-[0_0_40px_-10px_rgba(52,211,153,0.7)]' },
  { to: '/galaxy',        title: 'Observatory',   desc: 'Live solar activity, space weather, celestial events, cosmos.',           icon: Satellite, img: portalObservatory,   tone: 'text-[#c77dff]',   ring: 'border-[#a020f0]/50',   glow: 'shadow-[0_0_40px_-10px_rgba(160,32,240,0.8)]' },
  { to: '/echo',          title: 'Echo AI',       desc: 'Your AI guide, researcher, summarizer, and cosmic intelligence system.',  icon: Bot,       img: portalEcho,          tone: 'text-cyan-300',    ring: 'border-cyan-400/40',    glow: 'shadow-[0_0_40px_-10px_rgba(34,211,238,0.7)]' },
];

function CorePortals() {
  return (
    <section className="relative px-4 sm:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon={Flame} label="Core Portals" sub="Five chambers. Each pulls you deeper into the codex." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {PORTALS.map((p, i) => (
            <motion.div
              key={p.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07 }}
            >
              <Link
                to={p.to}
                className={`group block relative h-full rounded-xl overflow-hidden border ${p.ring} bg-black/70 hover:-translate-y-1 transition-all ${p.glow}`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[1.6s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${p.tone}`} style={{
                    background: 'radial-gradient(circle at 50% 80%, currentColor, transparent 60%)',
                    mixBlendMode: 'soft-light',
                  }} />
                  <p.icon className={`absolute top-3 left-3 w-6 h-6 ${p.tone} drop-shadow-[0_0_10px_currentColor]`} />
                </div>
                <div className="relative p-4">
                  <h3 className={`text-base font-black ${p.tone} tracking-tight`} style={{ fontFamily: '"Cinzel", "Space Grotesk", serif' }}>
                    {p.title.toUpperCase()}
                  </h3>
                  <p className="text-[11px] text-white/65 leading-snug mt-1.5 line-clamp-3">{p.desc}</p>
                  <div className={`mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[3px] font-bold ${p.tone} group-hover:gap-2 transition-all`}>
                    Enter Portal <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── THE GODS RETURN ───────────── */
function TheGodsReturn() {
  // Pull a curated subset from the existing gods catalog (already imaged)
  const featured = useMemo(() => {
    const wanted = ['anubis', 'ra', 'thoth', 'enki', 'isis', 'odin', 'shiva', 'kali', 'marduk', 'nephilim', 'pleiadian', 'freya'];
    return wanted
      .map((id) => gods.find((g) => g.id === id))
      .filter((g): g is typeof gods[number] => Boolean(g));
  }, []);

  return (
    <section className="relative px-4 sm:px-8 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-[10px] uppercase tracking-[6px] text-[#ffd700]/70">Mythology · Pantheon</div>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 tracking-[1px]" style={{ fontFamily: '"Cinzel", serif' }}>
            <span className="bg-gradient-to-b from-white via-[#fde68a] to-[#d4a574] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', textShadow: '0 0 40px rgba(255,215,0,0.25)' }}>
              THE GODS RETURN
            </span>
          </h2>
          <p className="text-sm text-white/55 mt-2 max-w-xl mx-auto">
            {gods.length} deities across Greek, Norse, Egyptian, Hindu, Anunnaki and Starseed pantheons.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {featured.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
            >
              <Link
                to="/gods"
                className="group block relative rounded-xl overflow-hidden border border-[#a020f0]/25 bg-black/70 hover:border-[#ffd700]/50 transition-colors"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {g.image && (
                    <img src={g.image} alt={g.name} loading="lazy" className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-[1.4s]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ background: g.atmosphericBg }} />
                  <div className="absolute top-2 left-2 text-[9px] uppercase tracking-[2px] px-1.5 py-0.5 rounded-sm bg-black/70 border border-[#ffd700]/30 text-[#fde68a]">
                    {g.pantheon}
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg leading-none">{g.symbol}</span>
                    <h3 className="text-sm font-bold text-white leading-tight" style={{ fontFamily: '"Cinzel", serif' }}>
                      {g.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-white/55 mt-1 line-clamp-2 leading-snug">{g.archetypeRole}</p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[9px] uppercase tracking-[2px] font-bold text-[#ffd700] group-hover:gap-1.5 transition-all">
                    Open Dossier <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link to="/gods" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#ffd700]/50 bg-[#ffd700]/10 text-[#fde68a] text-[11px] uppercase tracking-[3px] font-bold hover:bg-[#ffd700]/20 transition-colors">
            Enter The Full Pantheon <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────────── SDO IMAGERY ───────────── */
const SDO_IMAGES = [
  { src: sdo193, label: 'AIA 193 Å · Corona',       hint: 'Coronal holes & active regions' },
  { src: sdo304, label: 'AIA 304 Å · Chromosphere', hint: 'Prominences & filaments' },
  { src: sdo171, label: 'AIA 171 Å · Quiet Corona', hint: 'Coronal loops' },
  { src: sdoHmi, label: 'HMI · Magnetogram',        hint: 'Magnetic polarity' },
];

function SdoLiveImagery({ utc }: { utc: Date }) {
  return (
    <section className="relative px-4 sm:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon={Sun} label="SDO Live Imagery" sub="Solar Dynamics Observatory · refreshed automatically" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SDO_IMAGES.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-xl overflow-hidden border border-[#ffd700]/25 bg-black"
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={img.src} alt={img.label} loading="lazy" className="w-full h-full object-cover" />
                {/* Crosshair overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40" />
                </div>
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-sm bg-black/70 text-[8.5px] uppercase tracking-[1.5px] text-emerald-300 border border-emerald-400/40 font-bold">
                  LIVE
                </div>
              </div>
              <div className="p-2.5 bg-black/80 border-t border-white/10">
                <div className="text-[10px] font-bold text-[#fde68a] tracking-[1px] uppercase">{img.label}</div>
                <div className="text-[9px] text-white/50 mt-0.5">{img.hint}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[2px] text-white/45">
          <span>Source · NASA SDO</span>
          <span className="font-mono">Last refresh {utc.toISOString().slice(11, 16)} UTC</span>
        </div>
      </div>
    </section>
  );
}

/* ───────────── TRANSMISSIONS TICKER ───────────── */
const TRANSMISSIONS = [
  { icon: Flame,    color: 'text-[#ffd700]',   text: 'M2.4 solar flare · AR 3517 · 12 min ago' },
  { icon: Eye,      color: 'text-emerald-300', text: 'UAP cluster · western US military range · high cred' },
  { icon: Mountain, color: 'text-red-400',     text: 'M5.3 quake · Revilla Gigedo Islands · USGS' },
  { icon: Waves,    color: 'text-cyan-300',    text: 'USO ping · Pacific coastal grid · 3 reports' },
  { icon: Sparkles, color: 'text-[#c77dff]',   text: 'Codex 46 slot rotation queued · awaiting auth' },
  { icon: Telescope,color: 'text-cyan-300',    text: 'JWST mid-IR pass · cluster IC 2944 archived' },
  { icon: Activity, color: 'text-amber-300',   text: 'Schumann resonance spike · 7.83 → 8.21 Hz' },
];

function TransmissionsTicker() {
  return (
    <section className="relative border-y border-[#a020f0]/30 bg-black/80 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center">
        <div className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-[#a020f0]/40 to-transparent border-r border-[#a020f0]/30 flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
            <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
          </span>
          <span className="text-[10px] uppercase tracking-[3px] text-emerald-300 font-bold">Live Transmissions</span>
        </div>
        <div className="flex-1 overflow-hidden py-2.5">
          <div className="flex gap-10 whitespace-nowrap animate-[ticker_60s_linear_infinite]">
            {[...TRANSMISSIONS, ...TRANSMISSIONS].map((t, i) => (
              <span key={i} className="flex items-center gap-2 text-[11px] text-white/80">
                <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
                <span>{t.text}</span>
                <span className="text-white/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── SHARED ─ heading ───────────── */
function SectionHeading({ icon: Icon, label, sub }: { icon: typeof Sun; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-md border border-[#a020f0]/40 bg-[#a020f0]/15 flex items-center justify-center shadow-[0_0_18px_-2px_rgba(160,32,240,0.5)]">
        <Icon className="w-4 h-4 text-[#c77dff]" />
      </div>
      <div>
        <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-[3px]" style={{ fontFamily: '"Cinzel", serif' }}>
          {label}
        </h2>
        <div className="text-[10px] uppercase tracking-[2px] text-white/45">{sub}</div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-[#a020f0]/40 via-[#a020f0]/10 to-transparent" />
    </div>
  );
}

/* ───────────── PAGE ───────────── */
export function TempleObservatoryPage() {
  const utc = useUtcClock();
  const kp = 4.6;

  return (
    <div className="relative min-h-screen text-white" style={{ background: 'radial-gradient(ellipse at top, #1a1038 0%, #0a0a1f 45%, #05030d 100%)' }}>
      {/* Cinematic backdrop — first viewport only */}
      <div className="absolute inset-x-0 top-0 h-[100vh] z-0 pointer-events-none">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,rgba(5,3,13,0.85)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05030d] to-transparent" />
        {/* Drifting nebula tints */}
        <div className="absolute -top-32 -left-32 w-[60vw] h-[60vw] rounded-full bg-[#a020f0]/20 blur-3xl animate-[cosmic-pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-32 w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-3xl animate-[cosmic-pulse_11s_ease-in-out_infinite]" />
      </div>

      {/* Particle drift (cheap CSS dots) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/40"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              opacity: 0.15 + ((i % 5) * 0.1),
              animation: `cosmic-pulse ${6 + (i % 7)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <TopNav kp={kp} />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <Hero kp={kp} utc={utc} />
            <ActivityPanels />
            <LiveCosmicFeed utc={utc} />
            <CorePortals />
            <TheGodsReturn />
            <SdoLiveImagery utc={utc} />
            <TransmissionsTicker />
          </main>
        </div>
      </div>
    </div>
  );
}
