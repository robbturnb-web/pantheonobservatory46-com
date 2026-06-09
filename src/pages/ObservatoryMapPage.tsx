import { lazy, Suspense, useState } from 'react';
import { Activity, Satellite, CloudLightning, Sun } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { EarthquakeLayer } from '@/components/observatory/EarthquakeLayer';
import { IssLayer } from '@/components/observatory/IssLayer';
import { NwsStormLayer } from '@/components/observatory/NwsStormLayer';
import { SolarRegionLayer } from '@/components/observatory/SolarRegionLayer';

const ObservatoryGlobe = lazy(() =>
  import('@/components/observatory/ObservatoryGlobe').then(m => ({
    default: m.ObservatoryGlobe,
  }))
);

type LayerId = 'seismic' | 'iss' | 'storms' | 'solar';

interface LayerDef {
  id: LayerId;
  label: string;
  sublabel: string;
  icon: typeof Activity;
  /** Static Tailwind classes (JIT-safe). */
  classes: {
    border: string;   // when active
    bg: string;
    dot: string;
    text: string;
    sourceBorder: string;
  };
  source: string;
  sourceUrl: string;
}

const LAYERS: LayerDef[] = [
  {
    id: 'seismic',
    label: 'Seismic',
    sublabel: 'USGS · M4.5+ · 7d',
    icon: Activity,
    classes: {
      border: 'border-signal-online/60',
      bg: 'bg-signal-online/5',
      dot: 'bg-signal-online',
      text: 'text-signal-online',
      sourceBorder: 'border-signal-online/40 hover:border-signal-online',
    },
    source: 'USGS',
    sourceUrl: 'https://earthquake.usgs.gov',
  },
  {
    id: 'iss',
    label: 'ISS Trace',
    sublabel: 'wheretheiss.at · live',
    icon: Satellite,
    classes: {
      border: 'border-realm-cosmos/60',
      bg: 'bg-realm-cosmos/5',
      dot: 'bg-realm-cosmos',
      text: 'text-realm-cosmos',
      sourceBorder: 'border-realm-cosmos/40 hover:border-realm-cosmos',
    },
    source: 'WhereTheISS.at',
    sourceUrl: 'https://wheretheiss.at',
  },
  {
    id: 'storms',
    label: 'NWS Storms',
    sublabel: 'NOAA NWS · severe/extreme',
    icon: CloudLightning,
    classes: {
      border: 'border-amber-500/60',
      bg: 'bg-amber-500/5',
      dot: 'bg-amber-500',
      text: 'text-amber-500',
      sourceBorder: 'border-amber-500/40 hover:border-amber-500',
    },
    source: 'NOAA NWS',
    sourceUrl: 'https://www.weather.gov',
  },
  {
    id: 'solar',
    label: 'Solar Activity',
    sublabel: 'SWPC Kp · subsolar point',
    icon: Sun,
    classes: {
      border: 'border-realm-gods/60',
      bg: 'bg-realm-gods/5',
      dot: 'bg-realm-gods',
      text: 'text-realm-gods',
      sourceBorder: 'border-realm-gods/40 hover:border-realm-gods',
    },
    source: 'NOAA SWPC',
    sourceUrl: 'https://www.swpc.noaa.gov',
  },
];

export function ObservatoryMapPage() {
  const [active, setActive] = useState<Record<LayerId, boolean>>({
    seismic: true,
    iss: true,
    storms: true,
    solar: false,
  });
  const [counts, setCounts] = useState<{ quakes: number | null; storms: number | null }>({
    quakes: null, storms: null,
  });

  const toggle = (id: LayerId) => setActive(a => ({ ...a, [id]: !a[id] }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Observatory Map — Pantheon Frequency 46"
        description="Real-time 3D observatory globe tracking earthquakes, solar storms, the ISS, UAP signals, ancient sites, and ley lines."
      />

      <section className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-observatory font-mono">
            Phase 3 · Live Map
          </span>
          <span className="h-px flex-1 bg-realm-observatory/30" />
        </div>
        <h1 className="font-display text-4xl md:text-6xl text-foreground mb-3">
          Pantheon Observatory <span className="text-realm-observatory">Globe</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-8">
          The living planetary view. Toggle layers below to overlay seismic activity,
          the ISS in real time, active severe-weather alerts, and the current solar zenith.
        </p>

        <Suspense
          fallback={
            <div className="w-full h-[60vh] min-h-[420px] rounded-xl border border-primary/20 bg-[#05030D] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-realm-observatory/30 border-t-realm-observatory animate-spin" />
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-mono">
                  Booting globe…
                </p>
              </div>
            </div>
          }
        >
          <ObservatoryGlobe className="relative w-full h-[70vh] min-h-[520px] rounded-2xl overflow-hidden border border-realm-observatory/30 bg-[#05030D] shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
            {active.seismic && (
              <EarthquakeLayer onCount={(n) => setCounts(c => ({ ...c, quakes: n }))} />
            )}
            {active.iss && <IssLayer />}
            {active.storms && (
              <NwsStormLayer onCount={(n) => setCounts(c => ({ ...c, storms: n }))} />
            )}
            {active.solar && <SolarRegionLayer />}
          </ObservatoryGlobe>
        </Suspense>

        {/* Layer toggle bar */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {LAYERS.map(l => {
            const on = active[l.id];
            const Icon = l.icon;
            const count =
              l.id === 'seismic' ? counts.quakes :
              l.id === 'storms' ? counts.storms : null;
            return (
              <button
                key={l.id}
                onClick={() => toggle(l.id)}
                aria-pressed={on}
                className={`text-left p-3 rounded-lg border transition backdrop-blur ${
                  on
                    ? `${l.classes.border} ${l.classes.bg}`
                    : 'border-primary/15 bg-card/40 hover:border-primary/30'
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      on ? `${l.classes.dot} animate-pulse` : 'bg-muted-foreground/40'
                    }`}
                  />
                  {on ? l.sublabel : 'Disabled'}
                </p>
                <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${on ? l.classes.text : 'text-muted-foreground/60'}`} />
                  {l.label}
                  {on && count !== null && (
                    <span className="text-muted-foreground font-mono text-xs">· {count}</span>
                  )}
                </p>
              </button>
            );
          })}
        </div>

        {/* Magnitude legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.18em] font-mono text-muted-foreground">
          <span>Magnitude</span>
          {[
            { c: '#22D3EE', l: 'M4.5–5' },
            { c: '#F59E0B', l: 'M5–6' },
            { c: '#F97316', l: 'M6–7' },
            { c: '#DC2626', l: 'M7+' },
          ].map(s => (
            <span key={s.l} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
              {s.l}
            </span>
          ))}
        </div>

        {/* Source attribution */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] font-mono">
          <span className="text-muted-foreground">Sources</span>
          {LAYERS.map(l => (
            <a
              key={l.id}
              href={l.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-2 py-1 rounded border transition ${
                active[l.id]
                  ? `${l.classes.sourceBorder} text-foreground/90`
                  : 'border-primary/15 text-muted-foreground hover:text-foreground/80'
              }`}
            >
              {l.source}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ObservatoryMapPage;
