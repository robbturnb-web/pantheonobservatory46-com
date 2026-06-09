import { lazy, Suspense } from 'react';
import { SEO } from '@/components/SEO';

const ObservatoryGlobe = lazy(() =>
  import('@/components/observatory/ObservatoryGlobe').then(m => ({
    default: m.ObservatoryGlobe,
  }))
);

export function ObservatoryMapPage() {
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
          The living planetary view. Data layers — seismic, solar, ISS, UAP, ancient
          sites, ley lines — activate in upcoming phases. This shell is the canvas.
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
          <ObservatoryGlobe className="relative w-full h-[70vh] min-h-[520px] rounded-2xl overflow-hidden border border-realm-observatory/30 bg-[#05030D] shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]" />
        </Suspense>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Seismic Layer', status: 'Phase 3.1' },
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
      </section>
    </div>
  );
}

export default ObservatoryMapPage;
