/**
 * EarthPulsePage — LIVE FEED · DISCLOSURE · ANTARCTICA
 *
 * Tabbed live planetary monitor:
 *  - LIVE FEED: SDO auto-refreshing imagery grid + Solar / Planetary hero
 *    cards + curated Stefan Burns pulse updates.
 *  - DISCLOSURE: Deep-link card into THE 46 vault and disclosure docs.
 *  - ANTARCTICA: Operation Highjump + Antarctic Pyramid claim with
 *    deep-link into the Antarctica dossier.
 *
 * Cards open a Pantheon bottom-sheet modal with tiered Seeker / Oracle
 * intel and award XP via the existing useEchoXp pipeline (idempotent).
 */
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Activity,
  Sun,
  Mountain,
  Sparkles,
  ExternalLink,
  X,
  ArrowRight,
  Radio,
} from 'lucide-react';
import { pulseUpdates, type PulseUpdate } from '@/data/pulse-updates';
import { Countdown } from '@/components/Countdown';
import { VideoStrip } from '@/components/VideoStrip';
import { SEO } from '@/components/SEO';
import { useEchoXp } from '@/hooks/use-echo-xp';

type TabId = 'live' | 'disclosure' | 'antarctica';

const TABS: { id: TabId; label: string }[] = [
  { id: 'live', label: 'Live Feed' },
  { id: 'disclosure', label: 'Disclosure' },
  { id: 'antarctica', label: 'Antarctica' },
];

// SDO channels — NASA Solar Dynamics Observatory public CDN.
// Each refreshes every ~10–15 min. We bust cache every 5 min.
const SDO_CHANNELS = [
  { key: '193', label: '193 Å · Corona', tone: 'text-accent-neon', border: 'border-accent-neon/40' },
  { key: '304', label: '304 Å · Chromosphere', tone: 'text-[#ff5b5b]', border: 'border-[#ff5b5b]/40' },
  { key: '171', label: '171 Å · Quiet Corona', tone: 'text-accent-amber', border: 'border-accent-amber/40' },
  { key: 'HMI', label: 'HMI · Magnetogram', tone: 'text-white', border: 'border-white/30' },
] as const;

const SDO_URL = (channel: string, bust: number) =>
  `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_${channel}.jpg?v=${bust}`;

interface ModalEntry {
  id: string;
  badge: string;
  badgeTone: string;
  title: string;
  seeker: string;
  oracle: string;
  cta?: { label: string; to: string; external?: boolean };
  xpReason: string;
}

const MODAL_DATA: Record<string, ModalEntry> = {
  solar: {
    id: 'solar',
    badge: 'HIGH · SOLAR',
    badgeTone: 'bg-[#ff3366]/90 text-white',
    title: 'Solar Flare + Comet MAPS Window',
    seeker:
      'Comet C/2026 A1 (MAPS) — a Kreutz-family sungrazer with perihelion in April 2026 — passes through a period of recorded X-class solar activity. Stefan Burns links the window to a spike in orb sightings and seismic micro-swarms.',
    oracle:
      'Correlation engine (rolling 30-day): Solar X-class events ↔ global M5+ quakes (+18% above baseline) ↔ UAP reports (+12%). Watch for compounded effects on the geomagnetic Kp index in the next 72h.',
    cta: { label: 'Open Cosmos Pulse archive', to: '/earth-pulse#live' },
    xpReason: 'Solar pulse dossier opened',
  },
  planetary: {
    id: 'planetary',
    badge: 'HIGH · PLANETARY',
    badgeTone: 'bg-primary text-primary-foreground',
    title: 'Planetary Geometry Peak',
    seeker:
      'A multi-body alignment focal point passes through Earth during the April 17–23 window. Researchers track gravitational and electromagnetic resonance across the inner planets.',
    oracle:
      'Cross-referenced with Schumann amplitude spikes and Stefan Burns geomagnetic logs — three of the last four similar alignments coincided with measurable consciousness-field anomalies.',
    cta: { label: 'See planetary monitor', to: '/galaxy' },
    xpReason: 'Planetary geometry dossier opened',
  },
  the46: {
    id: 'the46',
    badge: 'THE 46 · SEALED VAULT',
    badgeTone: 'bg-accent-amber text-black',
    title: 'The 46 UAP Videos Demanded by Congress',
    seeker:
      'March 31, 2026 — Rep. Anna Paulina Luna sent an official letter to Sec. Pete Hegseth demanding the release of 46 classified UAP video files. The Pentagon missed the April 14, 2026 deadline.',
    oracle:
      'Every codename is logged inside the Pantheon vault — including platform, date, and area where disclosed. Cross-referenced with whistleblower testimony driving the demand.',
    cta: { label: 'Enter THE 46 Vault', to: '/the-46' },
    xpReason: 'The 46 dossier opened',
  },
  highjump: {
    id: 'highjump',
    badge: 'OPERATION HIGHJUMP · 1946-47',
    badgeTone: 'bg-[#7dd3fc] text-black',
    title: 'Largest Antarctic Expedition in History',
    seeker:
      'Task Force 68: 4,700 personnel, 13 ships, 33 aircraft under Adm. Richard E. Byrd. Officially a mapping and training exercise. Cut short months early under circumstances still partially classified.',
    oracle:
      'Byrd’s post-mission Chilean press interview referenced craft capable of polar flight at extreme speed. Both the documented operational record and the persistent classified-rumor record are preserved in the dossier.',
    cta: { label: 'Open Antarctica Dossier', to: '/antarctica' },
    xpReason: 'Highjump dossier opened',
  },
  pyramid: {
    id: 'pyramid',
    badge: 'ANOMALY · ELLSWORTH MOUNTAINS',
    badgeTone: 'bg-accent-neon text-black',
    title: 'The "Antarctic Pyramid" Claim',
    seeker:
      'Satellite imagery shows a pyramidal nunatak in the Ellsworth Mountains. Mainstream geology classifies it as a glacial horn. Independent researchers note its sharp four-sided symmetry.',
    oracle:
      'Coordinates, satellite IDs, and competing interpretations (geological vs. constructed) catalogued side-by-side inside the Antarctica dossier. Decide for yourself.',
    cta: { label: 'See full anomaly file', to: '/antarctica' },
    xpReason: 'Antarctic Pyramid dossier opened',
  },
};

function useSdoCacheBuster() {
  const [bust, setBust] = useState(() => Math.floor(Date.now() / 60_000));
  useEffect(() => {
    const id = window.setInterval(
      () => setBust(Math.floor(Date.now() / 60_000)),
      5 * 60_000,
    );
    return () => window.clearInterval(id);
  }, []);
  return bust;
}

const categoryIcon = (category: PulseUpdate['category']) => {
  switch (category) {
    case 'solar':
      return Sun;
    case 'seismic':
      return Mountain;
    case 'planetary':
      return Activity;
    case 'anomaly':
      return Sparkles;
  }
};

const urgencyClass = (urgency: PulseUpdate['urgency']) =>
  urgency === 'high'
    ? 'border-destructive/40 text-destructive'
    : 'border-accent-amber/40 text-accent-amber';

export function EarthPulsePage() {
  const [tab, setTab] = useState<TabId>('live');
  const [modal, setModal] = useState<ModalEntry | null>(null);
  const bust = useSdoCacheBuster();
  const { awardEvent } = useEchoXp();

  const openModal = (entry: ModalEntry) => {
    setModal(entry);
    void awardEvent('page', `pulse-modal:${entry.id}`, 25, entry.xpReason);
  };

  // Close on Escape
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal]);

  const heroCards = useMemo(
    () => [
      {
        modalKey: 'solar' as const,
        chip: 'HIGH · SOLAR',
        chipTone: 'bg-[#ff3366]/90 text-white',
        title: 'Solar Flare + Comet MAPS Update',
        sub: 'X-class activity + C/2026 A1 sungrazer · Stefan Burns seismic correlation active.',
        bg: SDO_URL('193', bust),
      },
      {
        modalKey: 'planetary' as const,
        chip: 'HIGH · PLANETARY',
        chipTone: 'bg-primary text-primary-foreground',
        title: 'Planetary Geometry Peak',
        sub: 'April 17–23 window · Earth at gravitational focal point.',
        bg: SDO_URL('171', bust),
      },
    ],
    [bust],
  );

  return (
    <>
      <SEO
        title="Earth Pulse · Live Planetary Monitor — Pantheon"
        description="Live SDO solar imagery, planetary geometry, congressional UAP disclosure, and Antarctic anomalies — auto-refreshing planetary pulse for the Pantheon Observatory."
        canonical="/earth-pulse"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-neon mb-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-neon opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-neon" />
            </span>
            Live planetary monitor
          </div>
          <h1
            className="text-4xl sm:text-6xl font-black tracking-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            EARTH PULSE
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Solar storms, planetary geometry, congressional disclosure, and Antarctic
            anomalies — curated from Stefan Burns and the field record.
          </p>
        </motion.header>

        {/* TABS */}
        <div className="flex justify-center mb-8">
          <div
            role="tablist"
            aria-label="Earth Pulse sections"
            className="inline-flex gap-1 rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur"
          >
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-full transition-colors ${
                    active
                      ? 'bg-white text-black shadow-lg'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* LIVE FEED TAB */}
        {tab === 'live' && (
          <motion.section
            key="live"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="mb-2">
              <Countdown />
            </div>

            {/* Hero cards */}
            <div className="grid md:grid-cols-2 gap-5">
              {heroCards.map((c) => (
                <button
                  key={c.modalKey}
                  type="button"
                  onClick={() => openModal(MODAL_DATA[c.modalKey])}
                  className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden text-left transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent-neon"
                  style={{
                    backgroundImage: `url(${c.bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${c.chipTone}`}
                    >
                      {c.chip}
                    </span>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-white/80">{c.sub}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-neon font-semibold uppercase tracking-wider">
                      Open dossier <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* SDO Live Imagery Grid */}
            <section aria-labelledby="sdo-heading">
              <h2
                id="sdo-heading"
                className="flex items-center gap-2 text-accent-neon text-sm font-semibold uppercase tracking-[0.25em] mb-4"
              >
                <Radio className="w-4 h-4" />
                SDO live imagery · auto-refreshing
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {SDO_CHANNELS.map((ch) => (
                  <figure
                    key={ch.key}
                    className={`rounded-2xl overflow-hidden border ${ch.border} bg-black/40`}
                  >
                    <img
                      src={SDO_URL(ch.key, bust)}
                      alt={`NASA SDO ${ch.label}`}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="w-full h-auto aspect-square object-cover"
                    />
                    <figcaption
                      className={`px-3 py-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider ${ch.tone}`}
                    >
                      {ch.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Source: NASA Solar Dynamics Observatory · sdo.gsfc.nasa.gov · refreshed every 5
                minutes.
              </p>
            </section>

            {/* Curated pulse updates */}
            <section aria-labelledby="updates-heading" className="space-y-4">
              <h2
                id="updates-heading"
                className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-neon"
              >
                Curated field updates
              </h2>
              {pulseUpdates.map((update, i) => {
                const Icon = categoryIcon(update.category);
                return (
                  <motion.article
                    key={update.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-cosmic rounded-2xl p-5 sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <span className="text-xs font-mono text-muted-foreground">
                            {update.date}
                          </span>
                          <span
                            className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${urgencyClass(
                              update.urgency,
                            )}`}
                          >
                            {update.urgency}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {update.category}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5">
                          {update.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {update.summary}
                        </p>
                        {update.stefanLink && (
                          <a
                            href={update.stefanLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 text-sm text-accent-neon hover:underline"
                          >
                            Watch Stefan Burns update
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </section>

            <div className="-mx-4 sm:mx-0">
              <VideoStrip
                topic="energy"
                title="Stefan Burns + Energy Updates"
                subtitle="Solar, Schumann, and planetary frequency monitoring."
                limit={3}
              />
            </div>
          </motion.section>
        )}

        {/* DISCLOSURE TAB */}
        {tab === 'disclosure' && (
          <motion.section
            key="disclosure"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <button
              type="button"
              onClick={() => openModal(MODAL_DATA.the46)}
              className="group relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden text-left transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-accent-amber"
              style={{
                background:
                  'linear-gradient(135deg, #1a0608 0%, #2d0f12 50%, #0a0405 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.5),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(124,58,237,0.45),transparent_55%)]" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <span className="inline-flex w-fit items-center text-[10px] font-bold uppercase tracking-[0.25em] text-accent-amber">
                  The 46 · Sealed vault
                </span>
                <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white leading-tight">
                  The 46 UAP Videos Demanded by Congress
                </h2>
                <p className="mt-3 text-sm sm:text-lg text-white/80 max-w-2xl">
                  March 31, 2026 · Rep. Anna Paulina Luna · Pentagon missed the April 14
                  deadline. Every codename catalogued inside the Pantheon vault.
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-accent-amber font-semibold uppercase tracking-wider">
                  Open vault dossier <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/whistleblowers"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent-neon">
                  Field witness
                </p>
                <h3 className="mt-2 text-lg font-bold">Whistleblower Vault</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Sworn testimony, redacted documents, congressional record.
                </p>
              </Link>
              <Link
                to="/corbell"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#ff5b5b]">
                  Investigative wing
                </p>
                <h3 className="mt-2 text-lg font-bold">Jeremy Corbell Dossier</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Six WEAPONIZED drops + live X / YouTube feed.
                </p>
              </Link>
            </div>
          </motion.section>
        )}

        {/* ANTARCTICA TAB */}
        {tab === 'antarctica' && (
          <motion.section
            key="antarctica"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5"
          >
            <button
              type="button"
              onClick={() => openModal(MODAL_DATA.highjump)}
              className="group relative h-72 sm:h-[400px] rounded-3xl overflow-hidden text-left transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]"
              style={{
                backgroundImage:
                  "url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Operation_Highjump_-_USS_Sennet_in_ice.jpg/1200px-Operation_Highjump_-_USS_Sennet_in_ice.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7dd3fc]">
                  Operation Highjump · 1946-47
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-white">
                  Largest Antarctic Expedition Ever
                </h2>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#7dd3fc] font-semibold uppercase tracking-wider">
                  Open dossier <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => openModal(MODAL_DATA.pyramid)}
              className="group relative h-64 sm:h-[340px] rounded-3xl overflow-hidden text-left transition-transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-accent-neon"
              style={{
                background:
                  'linear-gradient(135deg, #0a1929 0%, #0d2540 50%, #061625 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_50%_30%,rgba(125,211,252,0.45),transparent_60%)]" />
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-neon">
                  Anomaly · Ellsworth Mountains
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-white">
                  The "Antarctic Pyramid" Claim
                </h2>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-accent-neon font-semibold uppercase tracking-wider">
                  Compare records <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </motion.section>
        )}
      </main>

      {/* BOTTOM-SHEET MODAL */}
      <AnimatePresence>
        {modal && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={() => setModal(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pulse-modal-title"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-2xl mx-auto bg-[#0a001f] sm:rounded-3xl rounded-t-3xl max-h-[88vh] overflow-auto border border-white/10 shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#0a001f]/90 backdrop-blur border-b border-white/5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full ${modal.badgeTone}`}
                >
                  {modal.badge}
                </span>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <h2
                  id="pulse-modal-title"
                  className="text-2xl sm:text-3xl font-bold leading-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {modal.title}
                </h2>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent-neon mb-2">
                    Seeker Tier
                  </p>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {modal.seeker}
                  </p>
                </div>

                <div className="rounded-2xl bg-primary/10 border border-primary/30 p-4 sm:p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-2">
                    Oracle Tier
                  </p>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {modal.oracle}
                  </p>
                </div>

                {modal.cta && (
                  modal.cta.external ? (
                    <a
                      href={modal.cta.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-3.5 rounded-2xl bg-accent-neon text-black font-bold hover:opacity-90 transition"
                    >
                      {modal.cta.label}
                    </a>
                  ) : (
                    <Link
                      to={modal.cta.to}
                      onClick={() => setModal(null)}
                      className="block w-full text-center py-3.5 rounded-2xl bg-accent-neon text-black font-bold hover:opacity-90 transition"
                    >
                      {modal.cta.label}
                    </Link>
                  )
                )}

                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="block w-full text-center py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-sm uppercase tracking-wider transition"
                >
                  Close Vault
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
