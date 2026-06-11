import { SEO } from '@/components/SEO';
import { LivePanel } from '@/components/command/LivePanel';
import { useKp, useFlare, useISS, useEarthquakes, useNwsAlerts } from '@/hooks/use-live-data';
import {
  Sun, Wind, Satellite, Eye, Activity, Telescope, Radio,
} from 'lucide-react';

export function LiveFeedsPage() {
  const kp = useKp();
  const flare = useFlare();
  const iss = useISS();
  const quakes = useEarthquakes();
  const nws = useNwsAlerts();

  const statusOf = <T,>(r: { data: { ok: boolean; stale?: boolean } | null }) =>
    r.data?.ok ? (r.data.stale ? 'cached' as const : 'live' as const) : 'pending' as const;

  return (
    <>
      <SEO
        title="Live Intelligence Hub · Pantheon Observatory 46"
        description="Solar activity, space weather, ISS tracking, UAP disclosure, earthquake watch, interstellar objects, and weekly mystery signals."
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <header className="mb-8 sm:mb-10">
          <p className="text-[10px] uppercase tracking-[4px] text-primary">Live Intelligence Hub</p>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-2 tracking-tight">
            Cosmic Command · Live
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Real-time solar, orbital, and geologic intelligence. When an upstream API is offline we say so —
            we never fabricate readings.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LivePanel
            title="Solar Activity"
            description="GOES X-ray flare class — last 24 hours."
            Icon={Sun}
            accent="text-amber-300"
            status={statusOf(flare)}
            sourceUrl="https://www.swpc.noaa.gov/products/goes-x-ray-flux"
            sourceLabel="NOAA SWPC · GOES"
            onRefresh={flare.refresh}
            refreshing={flare.loading}
          >
            <p className="text-3xl font-black text-foreground">{flare.data?.value?.class ?? '—'}</p>
            <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">peak class</p>
          </LivePanel>

          <LivePanel
            title="Space Weather"
            description="Planetary geomagnetic Kp index, 3-hour cadence."
            Icon={Wind}
            accent="text-primary"
            status={statusOf(kp)}
            sourceUrl="https://www.swpc.noaa.gov/products/planetary-k-index"
            sourceLabel="NOAA SWPC · Kp"
            onRefresh={kp.refresh}
            refreshing={kp.loading}
          >
            <p className="text-3xl font-black text-foreground">{kp.data?.value?.kp?.toFixed(2) ?? '—'}</p>
            <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">
              {kp.data?.value?.stormLevel ?? 'no data'}
            </p>
          </LivePanel>

          <LivePanel
            title="ISS / Orbital Tracking"
            description="International Space Station ground-track, ~15s refresh."
            Icon={Satellite}
            accent="text-cyan-300"
            status={statusOf(iss)}
            sourceUrl="https://spotthestation.nasa.gov/"
            sourceLabel="NASA · Spot the Station"
            onRefresh={iss.refresh}
            refreshing={iss.loading}
          >
            <div className="font-mono text-sm text-foreground/90 space-y-0.5">
              <div>lat {iss.data?.value?.latitude?.toFixed(2) ?? '—'}</div>
              <div>lon {iss.data?.value?.longitude?.toFixed(2) ?? '—'}</div>
            </div>
          </LivePanel>

          <LivePanel
            title="UAP / Disclosure Watch"
            description="Curated tracking of AARO, ODNI and Congressional UAP releases."
            Icon={Eye}
            accent="text-emerald-300"
            status="manual"
            sourceUrl="https://www.aaro.mil/"
            sourceLabel="AARO · Official"
          >
            <p className="text-xs text-muted-foreground italic">
              Manual update mode — curator reviews and posts verified document drops.
            </p>
          </LivePanel>

          <LivePanel
            title="Earthquake / Geology Watch"
            description="Significant seismic events worldwide, last 24h."
            Icon={Activity}
            accent="text-rose-300"
            status={statusOf(quakes)}
            sourceUrl="https://earthquake.usgs.gov/earthquakes/map/"
            sourceLabel="USGS"
            onRefresh={quakes.refresh}
            refreshing={quakes.loading}
          >
            <p className="text-3xl font-black text-foreground">
              {quakes.data?.value?.count24h ?? '—'}
            </p>
            <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">
              events · 24h · max M {quakes.data?.value?.highest?.mag?.toFixed(1) ?? '—'}
            </p>
          </LivePanel>

          <LivePanel
            title="Interstellar Objects"
            description="3I/ATLAS and other ISO tracking via JPL Horizons."
            Icon={Telescope}
            accent="text-fuchsia-300"
            status="external"
            sourceUrl="https://ssd.jpl.nasa.gov/horizons/"
            sourceLabel="JPL Horizons"
          >
            <p className="text-xs text-foreground/80">
              Track current ISO candidates via JPL — live feed pending integration.
            </p>
          </LivePanel>

          <LivePanel
            title="Mystery Signal of the Week"
            description="Curator-selected anomaly or signal under active observation."
            Icon={Radio}
            accent="text-amber-300"
            status="manual"
          >
            <p className="text-sm font-semibold text-foreground">BLC1 · Proxima Centauri (revisited)</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Narrowband signal first reported 2019 — re-examination ongoing.
            </p>
          </LivePanel>

          <LivePanel
            title="NWS · Active Severe Alerts"
            description="US National Weather Service severe/extreme advisories."
            Icon={Activity}
            accent="text-sky-300"
            status={statusOf(nws)}
            sourceUrl="https://www.weather.gov/"
            sourceLabel="weather.gov"
            onRefresh={nws.refresh}
            refreshing={nws.loading}
          >
            <p className="text-3xl font-black text-foreground">{nws.data?.value?.total ?? '—'}</p>
            <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">active alerts</p>
          </LivePanel>
        </section>
      </main>
    </>
  );
}

export default LiveFeedsPage;
