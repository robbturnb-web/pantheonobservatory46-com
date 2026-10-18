import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  Home, Eye, Mountain, Brain, Satellite, Folder, Bot, Settings,
  Sun, Volume2, Radio, Flame, Activity, AlertTriangle, ChevronRight,
  Lock, Telescope, Sparkles, Zap, Waves, Film,
  Shield, Skull, Plane, Mountain as MountainIcon, Users, Radio as RadioIcon, Globe,
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
import sigil46 from '@/assets/temple/sigil-46.png';

import { gods } from '@/data/gods';
import {
  useEarthquakes,
  useKp,
  useFlare,
  useSolarWind,
  useMoon,
} from '@/hooks/use-live-data';
import { LiveDataFooter } from '@/components/live/LiveDataFooter';
import { SolarEventsPanel } from '@/components/live/SolarEventsPanel';
import { SkyTrackerPanel } from '@/components/live/SkyTrackerPanel';
import { WeatherStormPanel } from '@/components/live/WeatherStormPanel';
import { timeAgo } from '@/lib/live-data';

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
  { to: '/observatory',   label: 'Observatory' },
  { to: '/echo',          label: 'Echo AI' },
];

function TopNav({ kp }: { kp: number | null }) {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 border-b border-[#9B1C31]/30 bg-[#09090B]/85 backdrop-blur-xl">
      {/* Subtle purple top glow */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#9B1C31]/80 to-transparent" />
      <div className="relative flex items-center gap-3 px-3 sm:px-5 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-9 h-9 rounded-md border border-[#D4AF5A]/60 bg-gradient-to-br from-[#D4AF5A]/25 to-[#9B1C31]/20 flex items-center justify-center shadow-[0_0_18px_-2px_rgba(212,175,90,0.55)] group-hover:shadow-[0_0_28px_-2px_rgba(212,175,90,0.9)] transition-shadow">
            <span className="font-bagel text-[#D4AF5A] text-base leading-none">P</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-[#D4AF5A] bg-[#09090B] border border-[#D4AF5A]/60 rounded-sm px-0.5 leading-none py-px">46</span>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[10px] uppercase tracking-[4px] text-white/60">Pantheon</span>
            <span className="text-[10px] uppercase tracking-[4px] text-[#D4AF5A]/80">Frequency 46</span>
          </div>
        </Link>

        {/* Tabs */}
        <nav className="hidden md:flex items-center gap-0.5 mx-auto">
          {TABS.map((t) => {
            const isActive = t.to === '/' ? pathname === '/' : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`relative px-3 py-1.5 rounded-md text-[11px] uppercase tracking-[2.5px] font-semibold transition-colors ${
                  isActive ? 'text-white bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {t.label}
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#9B1C31] to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster */}
        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-amber-400/40 bg-amber-400/10">
            <Sun className="w-3 h-3 text-[#D4AF5A]" />
            <span className="text-[9px] uppercase tracking-[2px] text-white/60">Solar</span>
            <span className="text-[10px] font-bold text-amber-300 tracking-[1px]">ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#9B1C31]/40 bg-[#9B1C31]/10">
            <span className="text-[9px] uppercase tracking-[2px] text-white/60">Kp</span>
            <span className="text-[11px] font-bold text-[#D4AF5A] font-mono">
              {kp == null ? '—' : kp.toFixed(1)}
            </span>
          </div>
          <Link to="/live-feeds" aria-label="Open live feeds" className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 text-[10px] uppercase tracking-[2px] text-white/70 hover:text-white hover:border-white/30 transition-colors">
            <Radio className="w-3 h-3" /> Feed
          </Link>
          <button className="w-8 h-8 flex items-center justify-center rounded-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-colors">
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <Link to="/profile" className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#9B1C31] to-[#7209b7] text-white text-xs font-bold border border-[#D4AF5A]/50 shadow-[0_0_12px_-2px_rgba(212,175,90,0.7)]">
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
  { to: '/',                label: 'Home',          icon: Home,         tone: 'text-white',         glow: 'shadow-[0_0_16px_-2px_rgba(255,255,255,0.5)]' },
  { to: '/uap',             label: 'Disclosure',    icon: Eye,          tone: 'text-amber-300',   glow: 'shadow-[0_0_16px_-2px_rgba(16,185,129,0.7)]' },
  { to: '/documentaries',   label: 'Docs',          icon: Film,         tone: 'text-amber-300',   glow: '' },
  { to: '/whistleblowers',  label: 'Whistleblw',    icon: Shield,       tone: 'text-amber-300',   glow: '' },
  { to: '/crash-retrieval', label: 'Crash Retr',    icon: AlertTriangle,tone: 'text-red-400',       glow: '' },
  { to: '/missing',         label: 'Missing',       icon: Users,        tone: 'text-amber-300',     glow: '' },
  { to: '/underground',     label: 'Bases',         icon: MountainIcon, tone: 'text-stone-300',     glow: '' },
  { to: '/gods',            label: 'Mythology',     icon: Mountain,     tone: 'text-[#D4AF5A]',     glow: 'shadow-[0_0_16px_-2px_rgba(212,175,90,0.7)]' },
  { to: '/consciousness',   label: 'Conscious',     icon: Brain,        tone: 'text-stone-300',    glow: '' },
  { to: '/frequencies',     label: 'Frequency',     icon: RadioIcon,    tone: 'text-stone-300',      glow: '' },
  { to: '/observatory',     label: 'Observatory',   icon: Satellite,    tone: 'text-[#D4AF5A]',     glow: 'shadow-[0_0_16px_-2px_rgba(155,28,49,0.7)]' },
  { to: '/earth-pulse',     label: 'Earth Pulse',   icon: Globe,        tone: 'text-stone-300',      glow: '' },
  { to: '/echo',            label: 'Echo AI',       icon: Bot,          tone: 'text-stone-300',      glow: 'shadow-[0_0_16px_-2px_rgba(192,192,200,0.7)]' },
  { to: '/profile',         label: 'Settings',      icon: Settings,     tone: 'text-white/70',      glow: '' },
];


function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden lg:flex shrink-0 w-[84px] flex-col items-center py-4 gap-0.5 border-r border-[#9B1C31]/20 bg-[#09090B]/85 backdrop-blur-xl max-h-screen sticky top-14 overflow-y-auto scrollbar-thin">
      {SIDE_ITEMS.map((item) => {
        const isActive = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
        return (
          <Link
            key={item.label}
            to={item.to}
            className={`group relative w-16 py-2 flex flex-col items-center gap-1 rounded-lg transition-colors ${
              isActive ? 'bg-white/5' : 'hover:bg-white/5'
            }`}
          >
            {isActive && (
              <span className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-transparent via-[#9B1C31] to-transparent rounded-full" />
            )}
            <item.icon
              className={`w-5 h-5 ${item.tone} ${isActive ? item.glow : ''} group-hover:scale-110 transition-transform`}
            />
            <span className="text-[8.5px] uppercase tracking-[1.2px] text-white/55 group-hover:text-white/90 text-center leading-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}

/* ───────────── KP GAUGE ───────────── */
function KpGauge({ kp }: { kp: number | null }) {
  // Semi-circle gauge 0..9 → arc 180deg from -180 to 0
  const max = 9;
  const ratio = kp == null ? 0 : Math.min(Math.max(kp / max, 0), 1);
  const radius = 110;
  const circumference = Math.PI * radius;
  const dash = circumference * ratio;

  return (
    <div className="relative w-[280px] h-[180px] mx-auto">
      <svg viewBox="0 0 280 180" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="kpArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor="#9B1C31" />
            <stop offset="55%" stopColor="#D4AF5A" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#E5C77D" />
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
        <div className="text-[9px] uppercase tracking-[3px] text-white/50">
          {kp == null ? 'Geomagnetic Index · Connecting…' : 'Geomagnetic Index · NOAA SWPC'}
        </div>
        <div className="text-5xl font-black bg-gradient-to-r from-[#D4AF5A] to-[#E5C77D] bg-clip-text text-transparent leading-none mt-1">
          {kp == null ? 'Kp —' : `Kp ${kp.toFixed(1)}`}
        </div>
      </div>
      {/* End labels */}
      <div className="absolute left-0 bottom-0 text-[9px] text-white/40 font-mono">0</div>
      <div className="absolute right-0 bottom-0 text-[9px] text-white/40 font-mono">9</div>
    </div>
  );
}

/* ───────────── PANTHEON COMPASS — 46 sigil + 12 gods ───────────── */
const COMPASS_GOD_IDS = [
  'zeus', 'ra', 'odin', 'enki', 'thoth', 'shiva',
  'isis', 'anubis', 'marduk', 'kali', 'freya', 'anu',
];

function PantheonCompass() {
  const orbit = useMemo(() => {
    return COMPASS_GOD_IDS
      .map((id) => gods.find((g) => g.id === id))
      .filter((g): g is typeof gods[number] => Boolean(g));
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-[min(92vw,560px)]">
      {/* Outer rotating constellation ring */}
      <div className="absolute inset-0 rounded-full border border-[#D4AF5A]/15 animate-[spin_120s_linear_infinite]">
        <div className="absolute inset-3 rounded-full border border-dashed border-[#9B1C31]/25" />
        <div className="absolute inset-8 rounded-full border border-[#C0C0C8]/10" />
      </div>

      {/* Glow halo */}
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(212,175,90,0.35),rgba(155,28,49,0.18)_45%,transparent_70%)] blur-2xl animate-[cosmic-pulse_6s_ease-in-out_infinite] pointer-events-none" />

      {/* Center sigil */}
      <Link
        to="/observatory"
        aria-label="Enter Observatory 46"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] aspect-square rounded-full overflow-hidden group focus-visible:outline-none"
      >
        <div className="absolute inset-0 rounded-full bg-black/70 shadow-[0_0_80px_-10px_rgba(212,175,90,0.55),0_0_120px_-20px_rgba(155,28,49,0.6)] group-hover:shadow-[0_0_120px_-10px_rgba(212,175,90,0.9),0_0_180px_-20px_rgba(155,28,49,0.9)] transition-shadow duration-500" />
        <img
          src={sigil46}
          alt="Pantheon 46 sigil"
          width={1024}
          height={1024}
          loading="eager"
          className="relative w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-700"
        />
        <span className="absolute inset-x-0 -bottom-1 text-center text-[9px] uppercase tracking-[5px] text-[#D4AF5A]/0 group-hover:text-[#D4AF5A]/90 transition-colors">
          Enter Observatory 46
        </span>
      </Link>

      {/* 12 god orbit nodes */}
      {orbit.map((g, i) => {
        const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 46; // % from center
        const left = 50 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius;
        return (
          <Link
            key={g.id}
            to={`/gods/${g.id}`}
            title={`${g.name} · ${g.pantheon}`}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className="relative w-[10.5%] aspect-square min-w-[44px]">
              <div className="absolute inset-0 rounded-full border border-[#D4AF5A]/40 bg-black/70 overflow-hidden shadow-[0_0_18px_-2px_rgba(212,175,90,0.5)] group-hover:shadow-[0_0_28px_-2px_rgba(212,175,90,0.95)] group-hover:border-[#D4AF5A] group-hover:scale-110 transition-all duration-300">
                {g.image && (
                  <img src={g.image} alt={g.name} loading="lazy" className="w-full h-full object-cover object-top" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[8.5px] uppercase tracking-[2px] font-bold text-[#E5C77D] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
                {g.name}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/* ───────────── HERO ───────────── */
interface HeroLiveProps {
  kp: number | null;
  kpOk: boolean;
  flareClass: string | null;
  flareOk: boolean;
  utc: Date;
}
function Hero({ kp, kpOk, flareClass, flareOk, utc }: HeroLiveProps) {
  // Derive a real "uplink" status from live source health — never a fake "nominal".
  const okCount = (kpOk ? 1 : 0) + (flareOk ? 1 : 0);
  const connecting = kp == null && flareClass == null;
  const status = connecting
    ? { label: 'Establishing Uplink', tone: 'text-stone-300', dot: 'bg-stone-400' }
    : okCount === 2
      ? { label: 'All Sources Verified', tone: 'text-signal-online', dot: 'bg-signal-online' }
      : okCount === 1
        ? { label: 'Partial Uplink', tone: 'text-amber-300', dot: 'bg-amber-400' }
        : { label: 'Sources Offline', tone: 'text-red-300', dot: 'bg-red-400' };
  return (
    <section className="relative px-4 sm:px-8 pt-8 pb-6">
      {/* Subtitle row */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[3px] text-white/55 mb-3">
        <span className={`flex items-center gap-1.5 ${status.tone}`}>
          <span className="relative flex w-1.5 h-1.5">
            <span className={`absolute inset-0 rounded-full ${status.dot} animate-ping opacity-75`} />
            <span className={`relative rounded-full w-1.5 h-1.5 ${status.dot}`} />
          </span>
          {status.label}
        </span>
        <span className="hidden sm:inline">·</span>
        <span>Realm: <span className="text-[#D4AF5A]">The Observatory</span></span>
        <span className="hidden sm:inline">·</span>
        <span className="font-mono text-white/70">Live Sync {utc.toISOString().slice(11, 19)} UTC</span>
      </div>


      {/* Title */}
      <h1 className="text-center font-black tracking-[1px] leading-none">
        <span className="block text-3xl sm:text-5xl lg:text-6xl" style={{ fontFamily: '"Cinzel", "Space Grotesk", serif' }}>
          <span className="bg-gradient-to-b from-white via-[#E5C77D] to-[#D4AF5A] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', textShadow: '0 0 40px rgba(212,175,90,0.25)' }}>
            THE UNKNOWN IS NOT THE END OF THE SEARCH.
          </span>
        </span>
      </h1>
      <div className="text-center mt-2 text-[10px] uppercase tracking-[6px] text-white/45">
        PANTHEON OBSERVATORY 46 · EVIDENCE-LED INQUIRY
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm sm:text-base leading-relaxed text-white/70">
        An evolving center for knowledge, discovery, ancient records, unexplained phenomena, and the examination of extraordinary claims. Explore the evidence, question established narratives, and investigate what remains unresolved. Every entry is labelled
        <span className="text-[#E5C77D]"> fact</span>,
        <span className="text-[#D4AF5A]"> theory</span>,
        <span className="text-[#C0C0C8]"> belief</span>, or
        <span className="text-white/85"> unexplained</span>, with sources you can check.
      </p>


      {/* Central stage: KP / Compass / CTAs */}
      <div className="relative mt-8 grid lg:grid-cols-[260px_1fr_220px] gap-8 items-center max-w-6xl mx-auto">
        {/* Left flank — KP gauge + flare bar */}
        <div className="order-2 lg:order-1 flex flex-col gap-3">
          <div className="rounded-xl border border-[#9B1C31]/30 bg-black/45 backdrop-blur-md p-3">
            <KpGauge kp={kp} />
            <div className="mt-2 flex items-center justify-center gap-2">
              <Flame className="w-3 h-3 text-[#D4AF5A]" />
              <span className="text-[10px] uppercase tracking-[3px] text-white/60">Flare</span>
              <span className="text-sm font-bold text-[#D4AF5A]">
                {flareOk && flareClass ? flareClass : flareClass === null ? '—' : 'N/A'}
              </span>
              <span className="text-[9px] uppercase tracking-[2px] text-amber-300 ml-1">
                {flareOk ? 'Live' : 'Connecting…'}
              </span>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="text-[10px] uppercase tracking-[3px] text-white/50 mb-2">
              {flareOk ? 'Flare Class · NOAA SWPC' : 'Flare Class · Connecting…'}
            </div>
            <FlareClassBar current={flareClass ?? ''} />
          </div>
        </div>

        {/* Center — Pantheon compass */}
        <div className="order-1 lg:order-2 relative">
          <div className="absolute -inset-12 rounded-full bg-[#9B1C31]/10 blur-3xl pointer-events-none" />
          <PantheonCompass />
        </div>

        {/* Right flank — quick CTAs */}
        <div className="order-3 flex flex-col gap-2 items-stretch lg:items-end">
          <Link to="/gods" className="group inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-md border border-[#D4AF5A]/50 bg-[#D4AF5A]/10 hover:bg-[#D4AF5A]/20 transition-colors">
            <span className="text-[10px] uppercase tracking-[3px] text-[#E5C77D]">The 46 Codex</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#E5C77D] group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/gods" className="group inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-md border border-[#9B1C31]/40 bg-[#9B1C31]/10 hover:bg-[#9B1C31]/20 transition-colors">
            <span className="text-[10px] uppercase tracking-[3px] text-[#D4AF5A]">Enter Mythology</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D4AF5A] group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/earth-pulse" className="group inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-md border border-red-400/40 bg-red-500/10 hover:bg-red-500/20 transition-colors">
            <span className="text-[10px] uppercase tracking-[3px] text-red-300">Earth Pulse Live</span>
            <ChevronRight className="w-3.5 h-3.5 text-red-300 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/echo" className="group inline-flex items-center justify-between gap-2 px-4 py-2.5 rounded-md border border-stone-400/40 bg-stone-400/10 hover:bg-stone-400/20 transition-colors">
            <span className="text-[10px] uppercase tracking-[3px] text-stone-300">Open Echo AI</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300 group-hover:translate-x-0.5 transition-transform" />
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
                className={`w-full rounded-sm transition-all ${isActive ? 'ring-1 ring-[#D4AF5A]' : ''}`}
                style={{
                  height: `${intensity * 100}%`,
                  background: isActive
                    ? 'linear-gradient(to top, #D4AF5A, #E5C77D)'
                    : `linear-gradient(to top, rgba(155,28,49,${0.15 + intensity * 0.4}), rgba(155,28,49,${0.05 + intensity * 0.2}))`,
                  boxShadow: isActive ? '0 0 12px rgba(212,175,90,0.6)' : 'none',
                }}
              />
              <span className={`text-[9px] font-bold ${isActive ? 'text-[#D4AF5A]' : 'text-white/40'}`}>{c}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between text-[9px] uppercase tracking-[2px] text-white/40">
        <span>Quiet</span>
        <span className="text-[#D4AF5A]">{current}</span>
        <span>Extreme</span>
      </div>
    </div>
  );
}

/* ───────────── ACTIVITY PANELS ───────────── */
function ActivityPanels() {
  const quakes = useEarthquakes();
  const q = quakes.data?.value;
  const qOk = quakes.data?.ok ?? false;

  // Region tags pulled from the latest 4 distinct places in the live feed
  const regions = q
    ? Array.from(
        new Set(
          q.latest
            .map((f) => {
              const m = /(?:of|near)\s+(.+)$/i.exec(f.place);
              return (m?.[1] ?? f.place).split(',').pop()?.trim() ?? f.place;
            })
            .filter(Boolean),
        ),
      ).slice(0, 4)
    : [];

  // Sparkline of latest magnitudes (chronological)
  const spark = q && q.latest.length > 0
    ? q.latest.slice().sort((a, b) => a.time - b.time).map((f) => f.mag)
    : [];

  return (
    <section className="relative px-4 sm:px-8 pb-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        {/* Earth Activity */}
        <div className="relative rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.18),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[3px] text-red-300/80 mb-1">
                Earth Activity · Last 24h (USGS)
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-black text-red-400">
                  {qOk && q ? q.count24h : '—'}
                </span>
                <span className="text-xs uppercase tracking-[2px] text-white/50">Events</span>
                {qOk && q?.highest && (
                  <span className="text-[10px] uppercase tracking-[2px] text-white/40">
                    Highest M
                    <span className="text-red-300 font-bold">{q.highest.mag.toFixed(1)}</span>
                  </span>
                )}
              </div>
              {qOk && q?.highest && (
                <a
                  href={q.highest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[10px] text-red-200/80 mt-1 hover:underline truncate max-w-xs"
                >
                  {q.highest.place}
                </a>
              )}
            </div>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          {spark.length > 1 ? (
            <Sparkline color="#ef4444" data={spark} />
          ) : (
            <div className="h-12 flex items-center text-[10px] uppercase tracking-[2px] text-white/35">
              {quakes.loading ? 'Connecting…' : 'No recent data'}
            </div>
          )}
          {regions.length > 0 && (
            <div className="relative flex flex-wrap gap-1.5 mt-3">
              {regions.map((t) => (
                <span
                  key={t}
                  className="text-[9px] uppercase tracking-[2px] px-2 py-0.5 rounded-full border border-red-400/30 text-red-200 bg-red-500/10"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          <LiveDataFooter
            source={quakes.data?.source ?? null}
            fetchedAt={quakes.data?.fetchedAt}
            stale={quakes.data?.stale}
            cacheAge={quakes.data?.cacheAge}
            lastSuccessAt={quakes.data?.lastSuccessAt}
            degraded={quakes.data?.degraded}
            ok={qOk}
            error={quakes.data?.error}
            loading={quakes.loading}
            onRefresh={quakes.refresh}
          />
        </div>

        {/* Anomalous Activity — community-sourced, no fake metrics */}
        <div className="relative rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-start justify-between mb-3">
            <div className="text-[10px] uppercase tracking-[3px] text-amber-300/80">
              Anomalous Reports · Community Submissions
            </div>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <p className="relative text-[11px] text-white/65 leading-snug mb-3">
            Pantheon does not publish a fake UAP counter. Sightings are
            user-submitted, reviewed by mods, and surfaced once verified
            against a credible source.
          </p>
          <div className="relative flex flex-wrap gap-2">
            <Link
              to="/orb-report"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 text-[10px] uppercase tracking-[2px] font-bold transition-colors"
            >
              Submit a sighting <ChevronRight className="w-3 h-3" />
            </Link>
            <Link
              to="/uap"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/15 bg-white/5 hover:bg-white/10 text-white/80 text-[10px] uppercase tracking-[2px] font-bold transition-colors"
            >
              Documented UAP cases <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="mt-3 text-[9px] uppercase tracking-[2px] text-white/40">
            Source · Pantheon community vault · pending review
          </div>
        </div>
      </div>
    </section>
  );
}

// Stat and CorrelationRow components were removed in the Phase 1 data-integrity
// pass — they templated fabricated deltas and grade rows that no longer appear
// on the dashboard. All current panels render only verified live values.


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
function LiveCosmicFeed({ utc }: { utc: Date }) {
  const flare = useFlare();
  const wind = useSolarWind();
  const quakes = useEarthquakes();
  const moon = useMoon();

  const cards = [
    {
      key: 'solar',
      img: feedSolar,
      kind: 'Solar X-ray Flux',
      tone: 'text-[#D4AF5A]',
      value: flare.data?.value?.class ?? (flare.loading ? '…' : 'N/A'),
      title: flare.data?.ok
        ? `Current GOES short-channel class · ${flare.data.value!.class}`
        : flare.loading
          ? 'Connecting to NOAA SWPC…'
          : 'Source unavailable',
      footer: flare.data,
      onRefresh: flare.refresh,
      ok: flare.data?.ok ?? false,
      loading: flare.loading,
    },
    {
      key: 'wind',
      img: feedSolar,
      kind: 'Solar Wind',
      tone: 'text-[#D4AF5A]',
      value: wind.data?.ok ? `${Math.round(wind.data.value!.speedKmS)} km/s` : (wind.loading ? '…' : 'N/A'),
      title: wind.data?.ok
        ? `Speed at L1 · observed ${timeAgo(wind.data.value!.observedAt)}`
        : wind.loading
          ? 'Connecting to NOAA SWPC…'
          : 'Source unavailable',
      footer: wind.data,
      onRefresh: wind.refresh,
      ok: wind.data?.ok ?? false,
      loading: wind.loading,
    },
    {
      key: 'quake',
      img: feedQuake,
      kind: 'Strongest Quake · 24h',
      tone: 'text-red-400',
      value: quakes.data?.value?.highest ? `M${quakes.data.value.highest.mag.toFixed(1)}` : (quakes.loading ? '…' : 'N/A'),
      title: quakes.data?.value?.highest
        ? quakes.data.value.highest.place
        : quakes.loading
          ? 'Connecting to USGS…'
          : 'Source unavailable',
      footer: quakes.data,
      onRefresh: quakes.refresh,
      ok: quakes.data?.ok ?? false,
      loading: quakes.loading,
    },
    {
      key: 'moon',
      img: portalEcho,
      kind: 'Moon Phase',
      tone: 'text-stone-300',
      value: moon.data?.value
        ? `${Math.round(moon.data.value.illumination * 100)}%`
        : '…',
      title: moon.data?.value
        ? `${moon.data.value.phaseName} · next full ${new Date(moon.data.value.nextFullMoon).toUTCString().slice(5, 16)}`
        : 'Computing phase…',
      footer: moon.data,
      onRefresh: moon.refresh,
      ok: moon.data?.ok ?? false,
      loading: moon.loading,
    },
  ];

  return (
    <section className="relative px-4 sm:px-8 pb-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon={Radio} label="Live Cosmic Feed" sub="Real APIs only · NOAA · USGS · synodic cycle" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cards.map((c, i) => (
            <motion.article
              key={c.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl hover:border-[#9B1C31]/50 transition-colors"
            >
              <div className="relative h-36 overflow-hidden">
                <img src={c.img} alt={c.kind} loading="lazy" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.4s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur text-[9px] uppercase tracking-[2px] text-white/85 border border-white/15 font-bold">
                  {c.kind}
                </div>
                <div className={`absolute bottom-2 right-3 text-2xl font-black ${c.tone}`} style={{ textShadow: '0 0 12px currentColor' }}>
                  {c.value}
                </div>
              </div>
              <div className="p-3.5">
                <h3 className="text-sm font-bold text-white leading-tight line-clamp-2">{c.title}</h3>
                <LiveDataFooter
                  source={c.footer?.source ?? null}
                  fetchedAt={c.footer?.fetchedAt}
                  stale={c.footer?.stale}
                  cacheAge={c.footer?.cacheAge}
                  lastSuccessAt={c.footer?.lastSuccessAt}
                  degraded={c.footer?.degraded}
                  ok={c.ok}
                  error={c.footer?.error}
                  loading={c.loading}
                  onRefresh={c.onRefresh}
                  compact
                />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Status panel */}
        <div className="mt-4 rounded-xl border border-[#9B1C31]/30 bg-gradient-to-r from-[#09090B] via-[#141418]/70 to-[#09090B] backdrop-blur-xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[2px]">
          <div className="flex items-center gap-1.5">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
              <span className="relative rounded-full w-1.5 h-1.5 bg-amber-400" />
            </span>
            <span className="text-amber-300 font-bold">Online</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/55">
            <span className="text-[#D4AF5A] font-bold">Codex 46</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/55 font-mono">
            <span>{utc.toISOString().slice(0, 10)} · {utc.toISOString().slice(11, 19)} UTC</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Lock className="w-3 h-3 text-amber-300" />
            <span className="text-amber-300 font-bold">Access · Authorized</span>
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
  { to: '/ancient-tech', title: 'Ancient Civilizations', desc: 'Archaeology, ancient engineering, lost places, and historical mysteries.', icon: Mountain, img: portalMythology, tone: 'text-[#D4AF5A]', ring: 'border-[#D4AF5A]/40', glow: 'shadow-[0_0_36px_-14px_rgba(212,175,90,0.28)]' },
  { to: '/gods', title: 'Mythology & the Gods', desc: 'Sacred traditions, divine figures, symbols, and comparative mythology.', icon: Mountain, img: portalMythology, tone: 'text-[#D4AF5A]', ring: 'border-[#D4AF5A]/40', glow: 'shadow-[0_0_36px_-14px_rgba(212,175,90,0.28)]' },
  { to: '/uap', title: 'Unexplained Phenomena', desc: 'Unusual observations, unresolved reports, and cases that merit investigation.', icon: Eye, img: portalDisclosure, tone: 'text-[#C0C0C8]', ring: 'border-[#C0C0C8]/30', glow: 'shadow-[0_0_36px_-14px_rgba(192,192,200,0.2)]' },
  { to: '/species', title: 'Nonhuman Intelligence', desc: 'Explore the evidence and open questions around life beyond Earth and UAP.', icon: Users, img: portalEcho, tone: 'text-[#C0C0C8]', ring: 'border-[#C0C0C8]/30', glow: 'shadow-[0_0_36px_-14px_rgba(192,192,200,0.2)]' },
  { to: '/whistleblowers', title: 'Disclosure & Hidden History', desc: 'Declassified records, public disclosures, historical claims, and source documents.', icon: Eye, img: portalDisclosure, tone: 'text-[#9B1C31]', ring: 'border-[#9B1C31]/40', glow: 'shadow-[0_0_36px_-14px_rgba(155,28,49,0.32)]' },
  { to: '/jwst', title: 'Science & the Unknown', desc: 'Space science, frontier research, unanswered questions, and new discoveries.', icon: Satellite, img: portalObservatory, tone: 'text-[#C0C0C8]', ring: 'border-[#C0C0C8]/30', glow: 'shadow-[0_0_36px_-14px_rgba(192,192,200,0.2)]' },
];;

function CorePortals() {
  return (
    <section className="relative px-4 sm:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading icon={Flame} label="Explore Research Domains" sub="Six domains. One standard: follow the evidence." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
          <div className="text-[10px] uppercase tracking-[6px] text-[#D4AF5A]/70">Mythology · Pantheon</div>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 tracking-[1px]" style={{ fontFamily: '"Cinzel", serif' }}>
            <span className="bg-gradient-to-b from-white via-[#E5C77D] to-[#d4a574] bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent', textShadow: '0 0 40px rgba(212,175,90,0.25)' }}>
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
                to={`/gods/${g.id}`}
                className="group block relative rounded-xl overflow-hidden border border-[#9B1C31]/25 bg-black/70 hover:border-[#D4AF5A]/50 transition-colors"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  {g.image && (
                    <img src={g.image} alt={g.name} loading="lazy" className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-[1.4s]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ background: g.atmosphericBg }} />
                  <div className="absolute top-2 left-2 text-[9px] uppercase tracking-[2px] px-1.5 py-0.5 rounded-sm bg-black/70 border border-[#D4AF5A]/30 text-[#E5C77D]">
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
                  <div className="mt-2 inline-flex items-center gap-1 text-[9px] uppercase tracking-[2px] font-bold text-[#D4AF5A] group-hover:gap-1.5 transition-all">
                    Open Dossier <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link to="/gods" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[#D4AF5A]/50 bg-[#D4AF5A]/10 text-[#E5C77D] text-[11px] uppercase tracking-[3px] font-bold hover:bg-[#D4AF5A]/20 transition-colors">
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
        <SectionHeading icon={Sun} label="SDO Reference Imagery" sub="Solar Dynamics Observatory · static reference panels (live API coming soon)" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SDO_IMAGES.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-xl overflow-hidden border border-[#D4AF5A]/25 bg-black"
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={img.src} alt={img.label} loading="lazy" className="w-full h-full object-cover" />
                {/* Crosshair overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40" />
                </div>
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-sm bg-black/80 text-[8.5px] uppercase tracking-[1.5px] text-[#E5C77D] border border-[#D4AF5A]/40 font-bold">
                  NASA
                </div>
              </div>
              <div className="p-2.5 bg-black/80 border-t border-white/10">
                <div className="text-[10px] font-bold text-[#E5C77D] tracking-[1px] uppercase">{img.label}</div>
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
interface TickerItem { icon: typeof Sun; color: string; text: string }
function TransmissionsTicker() {
  const flare = useFlare();
  const kp = useKp();
  const wind = useSolarWind();
  const quakes = useEarthquakes();
  const moon = useMoon();

  const items: TickerItem[] = [];
  if (flare.data?.ok && flare.data.value)
    items.push({ icon: Flame, color: 'text-[#D4AF5A]', text: `Flare ${flare.data.value.class} · NOAA SWPC · ${timeAgo(flare.data.value.observedAt)}` });
  if (kp.data?.ok && kp.data.value)
    items.push({ icon: Activity, color: 'text-[#D4AF5A]', text: `Kp ${kp.data.value.kp.toFixed(1)} · ${kp.data.value.stormLevel} · NOAA SWPC` });
  if (wind.data?.ok && wind.data.value)
    items.push({ icon: Waves, color: 'text-stone-300', text: `Solar wind ${Math.round(wind.data.value.speedKmS)} km/s · L1 · ${timeAgo(wind.data.value.observedAt)}` });
  if (quakes.data?.ok && quakes.data.value?.highest) {
    const h = quakes.data.value.highest;
    items.push({ icon: Mountain, color: 'text-red-400', text: `M${h.mag.toFixed(1)} · ${h.place} · USGS · ${timeAgo(new Date(h.time).toISOString())}` });
  }
  if (quakes.data?.ok && quakes.data.value)
    items.push({ icon: Mountain, color: 'text-red-300', text: `${quakes.data.value.count24h} earthquakes in last 24h · USGS` });
  if (moon.data?.value)
    items.push({ icon: Sparkles, color: 'text-stone-200', text: `Moon · ${moon.data.value.phaseName} · ${Math.round(moon.data.value.illumination * 100)}% illuminated` });

  const display = items.length > 0
    ? items
    : [{ icon: Radio, color: 'text-white/60', text: 'Connecting to live feeds…' } as TickerItem];

  return (
    <section className="relative border-y border-[#9B1C31]/30 bg-black/80 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center">
        <div className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-[#9B1C31]/40 to-transparent border-r border-[#9B1C31]/30 flex items-center gap-2">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
            <span className="relative rounded-full w-2 h-2 bg-amber-400" />
          </span>
          <span className="text-[10px] uppercase tracking-[3px] text-amber-300 font-bold">Live Transmissions</span>
        </div>
        <div className="flex-1 overflow-hidden py-2.5">
          <div className="flex gap-10 whitespace-nowrap animate-[ticker_60s_linear_infinite]">
            {[...display, ...display].map((t, i) => (
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
      <div className="w-9 h-9 rounded-md border border-[#9B1C31]/40 bg-[#9B1C31]/15 flex items-center justify-center shadow-[0_0_18px_-2px_rgba(155,28,49,0.5)]">
        <Icon className="w-4 h-4 text-[#D4AF5A]" />
      </div>
      <div>
        <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-[3px]" style={{ fontFamily: '"Cinzel", serif' }}>
          {label}
        </h2>
        <div className="text-[10px] uppercase tracking-[2px] text-white/45">{sub}</div>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-[#9B1C31]/40 via-[#9B1C31]/10 to-transparent" />
    </div>
  );
}

/* ───────────── QUICK START RAIL ───────────── */
function QuickStartRail() {
  const paths = [
    {
      to: '/uap',
      label: 'Disclosure Files',
      detail: 'Cases, records, and open questions',
      icon: Eye,
      tone: 'border-red-400/30 from-red-950/45 hover:border-red-300/70',
      iconTone: 'text-red-300 bg-red-400/10',
    },
    {
      to: '/pyramids',
      label: 'Ancient Engineering',
      detail: 'Test the evidence behind the legends',
      icon: Mountain,
      tone: 'border-amber-300/30 from-amber-950/40 hover:border-amber-200/70',
      iconTone: 'text-amber-200 bg-amber-300/10',
    },
    {
      to: '/earth-pulse',
      label: 'Live Earth Pulse',
      detail: 'Explore planetary activity and signals',
      icon: Activity,
      tone: 'border-stone-300/30 from-stone-950/40 hover:border-stone-200/70',
      iconTone: 'text-stone-200 bg-stone-300/10',
    },
  ];

  return (
    <section aria-label="Start exploring" className="px-4 sm:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[3px] text-white/55">Choose your first signal</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#D4AF5A]/35 to-transparent" />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {paths.map((path, index) => (
            <Link
              key={path.to}
              to={path.to}
              className={`group flex min-w-0 items-center gap-3 rounded-xl border bg-gradient-to-br ${path.tone} to-black/65 p-4 backdrop-blur-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_-20px_rgba(212,175,90,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C77D]`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 ${path.iconTone}`}>
                <path.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-bold uppercase tracking-[1.5px] text-white/90">{path.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-white/55">{path.detail}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-[#E5C77D]" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── PAGE ───────────── */
export function TempleObservatoryPage() {
  const utc = useUtcClock();
  const kpLive = useKp();
  const flareLive = useFlare();
  const kp = kpLive.data?.value?.kp ?? null;
  const kpOk = kpLive.data?.ok ?? false;
  const flareClass = flareLive.data?.value?.class ?? null;
  const flareOk = flareLive.data?.ok ?? false;

  return (
    <div className="relative min-h-screen text-white" style={{ background: 'radial-gradient(ellipse at top, #20191B 0%, #09090B 48%, #050506 100%)' }}>
      {/* Cinematic backdrop — first viewport only */}
      <div className="absolute inset-x-0 top-0 h-[100vh] z-0 pointer-events-none">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,rgba(9,9,11,0.85)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#09090B] to-transparent" />
        {/* Drifting nebula tints */}
        <div className="absolute -top-32 -left-32 w-[60vw] h-[60vw] rounded-full bg-[#9B1C31]/20 blur-3xl animate-[cosmic-pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-32 w-[50vw] h-[50vw] rounded-full bg-stone-500/10 blur-3xl animate-[cosmic-pulse_11s_ease-in-out_infinite]" />
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
        {/* Mobile realm strip */}
        <nav className="lg:hidden flex gap-2 overflow-x-auto px-3 py-2 border-b border-[#9B1C31]/20 bg-[#09090B]/80 backdrop-blur-xl scrollbar-none">
          {SIDE_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[2px] text-white/80 hover:border-[#D4AF5A]/50 hover:text-[#E5C77D] transition-colors"
            >
              <item.icon className={`w-3.5 h-3.5 ${item.tone}`} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <Hero kp={kp} kpOk={kpOk} flareClass={flareClass} flareOk={flareOk} utc={utc} />
            <section aria-labelledby="observatory-principle" className="relative px-4 sm:px-8 py-12 sm:py-16">
              <div className="max-w-4xl mx-auto rounded-2xl border border-[#D4AF5A]/25 bg-[#141418]/90 px-6 py-9 sm:px-10 sm:py-12 text-center shadow-[0_18px_70px_-42px_rgba(155,28,49,0.45)]">
                <div className="text-[10px] uppercase tracking-[4px] text-[#D4AF5A] mb-4">The Principle of the Observatory</div>
                <h2 id="observatory-principle" className="font-semibold text-2xl sm:text-4xl leading-tight text-[#F4F1EB]" style={{ fontFamily: '"Cinzel", "Cormorant Garamond", serif' }}>
                  No question is off limits by default. No claim is true by default. Follow the evidence.
                </h2>
                <div className="w-16 h-px bg-[#D4AF5A] mx-auto my-5" />
                <p className="max-w-3xl mx-auto text-sm sm:text-base leading-relaxed text-[#AAA6A1]">
                  Curiosity begins the investigation. Evidence shapes the conclusion. Every extraordinary claim deserves careful examination, and every conclusion remains open to revision when better evidence emerges.
                </p>
              </div>
            </section>
            <QuickStartRail />
            <ActivityPanels />
            <LiveCosmicFeed utc={utc} />
            <SolarEventsPanel />
            <SkyTrackerPanel />
            <WeatherStormPanel />
            <CorePortals />
            <section aria-labelledby="research-standard" className="relative px-4 sm:px-8 py-10 sm:py-14">
              <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-7">
                  <div className="text-[10px] uppercase tracking-[4px] text-[#D4AF5A] mb-3">The Research Standard</div>
                  <h2 id="research-standard" className="text-2xl sm:text-3xl text-[#F4F1EB]">Curiosity without credulity.</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#AAA6A1]">A good investigation follows the evidence, including when it challenges our favorite explanation.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { title: 'Source the claim', body: 'Trace claims to original documents, direct observations, primary research, and credible records.' },
                    { title: 'Separate fact from interpretation', body: 'Distinguish established facts from testimony, disputed information, hypotheses, and speculation.' },
                    { title: 'Test alternatives', body: 'Consider ordinary explanations, methodological limits, conflicting evidence, and competing interpretations.' },
                    { title: 'Update the record', body: 'Correct errors transparently and revise conclusions when stronger evidence becomes available.' },
                  ].map((item) => (
                    <article key={item.title} className="rounded-xl border border-[#302A2C] bg-[#141418]/85 p-5 hover:border-[#D4AF5A]/40 transition-colors">
                      <div className="w-8 h-px bg-[#D4AF5A] mb-4" />
                      <h3 className="text-sm font-bold text-[#F4F1EB] mb-2">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-[#AAA6A1]">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <TheGodsReturn />
            <SdoLiveImagery utc={utc} />
            <TransmissionsTicker />
          </main>
        </div>
      </div>
    </div>
  );
}
