import { lazy, Suspense, useState } from 'react';
import { SEO } from '@/components/SEO';
import { EarthquakeLayer } from '@/components/observatory/EarthquakeLayer';

const ObservatoryGlobe = lazy(() =>
  import('@/components/observatory/ObservatoryGlobe').then(m => ({
    default: m.ObservatoryGlobe,
  }))
);

export function ObservatoryMapPage() {
  const [seismicOn, setSeismicOn] = useState(true);
  const [quakeCount, setQuakeCount] = useState<number | null>(null);

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
          The living planetary view. Seismic layer is live — solar, ISS, UAP, and
          ancient sites activate in upcoming phases.
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
            {seismicOn && <EarthquakeLayer onCount={setQuakeCount} />}
          </ObservatoryGlobe>
        </Suspense>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setSeismicOn(s => !s)}
            className={`text-left p-3 rounded-lg border transition ${
              seismicOn
                ? 'border-signal-online/50 bg-signal-online/5'
                : 'border-primary/15 bg-card/40 hover:border-primary/30'
            } backdrop-blur`}
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  seismicOn ? 'bg-signal-online animate-pulse' : 'bg-muted-foreground/40'
                }`}
              />
              {seismicOn ? 'Live · M4.5+ · 7d' : 'Disabled'}
            </p>
            <p className="text-sm text-foreground mt-1">
              Seismic Layer {quakeCount !== null && seismicOn && (
                <span className="text-muted-foreground font-mono text-xs">· {quakeCount}</span>
              )}
            </p>
          </button>
          {[
            { label: 'Solar Storms', status: 'Phase 3.2' },
            { label: 'ISS Trace', status: 'Phase 3.3' },
            { label: 'Ancient Sites', status: 'Phase 3.4' },
          ].map(l => (
            <div
              key={l.label}
              className="p-3 rounded-lg border border-primary/15 bg-card/40 backdrop-blur"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                {l.status}
              </p>
              <p className="text-sm text-foreground mt-1">{l.label}</p>
            </div>
          ))}
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
          <span className="ml-auto">Source · USGS</span>
        </div>
      </section>
    </div>
  );
}

export default ObservatoryMapPage;
