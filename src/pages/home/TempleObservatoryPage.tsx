import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  Mountain, Sun, Radio, Flame, Activity, AlertTriangle, ChevronRight, Lock, Sparkles, Waves,
} from 'lucide-react';

import feedSolar from '@/assets/temple/feed-solar.jpg';
import feedQuake from '@/assets/temple/feed-quake.jpg';
import sdo193 from '@/assets/temple/sdo-193.jpg';
import sdo304 from '@/assets/temple/sdo-304.jpg';
import sdo171 from '@/assets/temple/sdo-171.jpg';
import sdoHmi from '@/assets/temple/sdo-hmi.jpg';
import portalEcho from '@/assets/temple/portal-echo.jpg';

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
import {
  InstitutionHero, ResearchDivisions, EvidenceRoom, FeaturedInvestigation, DocumentaryLibrary,
  ObservatoryResources, Archive46, InstSectionHeader,
} from '@/components/home/InstitutionSections';

/* Pantheon Observatory 46 home — institution hero, research divisions,
 * Evidence Room, featured investigation, live observatory panels (real
 * NOAA/NASA/USGS/NWS hooks only), documentary library, resources, archive. */

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

/* ───────────── PAGE ───────────── */
export function TempleObservatoryPage() {
  const utc = useUtcClock();
  const kpLive = useKp();
  const flareLive = useFlare();
  const kpOk = kpLive.data?.ok ?? false;
  const flareOk = flareLive.data?.ok ?? false;

  return (
    <div className="relative z-10 min-h-screen bg-inst-ink text-inst-bone">
      <InstitutionHero
        kp={kpLive.data?.value?.kp ?? null} kpOk={kpOk} kpAt={kpOk ? kpLive.data?.value?.observedAt : undefined}
        flareClass={flareLive.data?.value?.class ?? null} flareOk={flareOk} flareAt={flareOk ? flareLive.data?.value?.observedAt : undefined}
      />
      <ResearchDivisions />
      <EvidenceRoom />
      <FeaturedInvestigation />

      <section aria-labelledby="live-obs" className="pt-14">
        <div className="px-4 sm:px-8"><div className="mx-auto max-w-6xl">
          <InstSectionHeader id="live-obs" eyebrow="Live observatory" title="Current readings from public science feeds"
            lede="Data from NOAA, NASA, USGS and NWS. Each panel shows its source and when the reading was taken."
            action={{ to: '/live-feeds', label: 'Open Live Feed' }} />
        </div></div>
        <ActivityPanels />
        <LiveCosmicFeed utc={utc} />
        <SolarEventsPanel />
        <SkyTrackerPanel />
        <WeatherStormPanel />
        <SdoLiveImagery utc={utc} />
      </section>

      <DocumentaryLibrary />
      <ObservatoryResources />
      <Archive46 />
      <TheGodsReturn />
      <TransmissionsTicker />
    </div>
  );
}
