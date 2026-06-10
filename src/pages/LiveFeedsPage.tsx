import { SEO } from '@/components/SEO';
import { LiveFeedCard } from '@/components/feeds/LiveFeedCard';
import { useKp, useFlare, useSolarWind, useISS, useNwsAlerts } from '@/hooks/use-live-data';
import { NASA_PUBLIC_LINKS } from '@/services/nasa/nasaService';
import { NOAA_PUBLIC_LINKS } from '@/services/noaa/noaaService';

export function LiveFeedsPage() {
  const kp = useKp();
  const flare = useFlare();
  const wind = useSolarWind();
  const iss = useISS();
  const nws = useNwsAlerts();

  return (
    <>
      <SEO
        title="Live Feeds · Pantheon Frequency 46"
        description="Real-time space weather, ISS telemetry, NOAA alerts, and verified UAP source feeds."
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-[10px] uppercase tracking-[3px] text-primary">Live Feeds</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2">
            Pantheon Observatory · Live
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            Honest, source-attributed live data. When an upstream API is offline we say so —
            we never fabricate readings.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LiveFeedCard
            title="NOAA · Kp Index"
            description="Planetary geomagnetic disturbance index, 3-hour cadence."
            sourceLabel="NOAA SWPC"
            sourceUrl={NOAA_PUBLIC_LINKS.swpc}
            status={kp.data?.ok ? (kp.data.stale ? 'cached' : 'live') : 'unavailable'}
            fetchedAt={kp.data?.fetchedAt ?? null}
            loading={kp.loading}
            stale={kp.data?.stale}
            cacheAge={kp.data?.cacheAge}
            lastSuccessAt={kp.data?.lastSuccessAt}
            error={kp.data?.error ?? null}
            onRefresh={kp.refresh}
          >
            <div>
              <p className="text-3xl font-semibold text-foreground">
                {kp.data?.data?.kp?.toFixed(2) ?? '—'}
              </p>
              <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">
                {kp.data?.data?.storm ?? 'no data'}
              </p>
            </div>
          </LiveFeedCard>

          <LiveFeedCard
            title="NASA · Solar X-Ray Flux"
            description="GOES X-ray flare class — last 24 hours."
            sourceLabel="NASA SDO / NOAA GOES"
            sourceUrl={NASA_PUBLIC_LINKS.sdo}
            status={flare.data?.ok ? (flare.data.stale ? 'cached' : 'live') : 'unavailable'}
            fetchedAt={flare.data?.fetchedAt ?? null}
            loading={flare.loading}
            stale={flare.data?.stale}
            cacheAge={flare.data?.cacheAge}
            lastSuccessAt={flare.data?.lastSuccessAt}
            error={flare.data?.error ?? null}
            onRefresh={flare.refresh}
          >
            <div>
              <p className="text-3xl font-semibold text-foreground">
                {flare.data?.data?.class ?? '—'}
              </p>
              <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">
                peak class
              </p>
            </div>
          </LiveFeedCard>

          <LiveFeedCard
            title="NASA · Solar Wind"
            description="ACE/DSCOVR plasma + magnetic field readings."
            sourceLabel="NOAA SWPC"
            sourceUrl={NOAA_PUBLIC_LINKS.swpc}
            status={wind.data?.ok ? (wind.data.stale ? 'cached' : 'live') : 'unavailable'}
            fetchedAt={wind.data?.fetchedAt ?? null}
            loading={wind.loading}
            stale={wind.data?.stale}
            cacheAge={wind.data?.cacheAge}
            lastSuccessAt={wind.data?.lastSuccessAt}
            error={wind.data?.error ?? null}
            onRefresh={wind.refresh}
          >
            <div className="space-y-1">
              <p className="text-2xl font-semibold text-foreground">
                {wind.data?.data?.speed ? `${Math.round(wind.data.data.speed)} km/s` : '—'}
              </p>
              <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground">
                density {wind.data?.data?.density?.toFixed(1) ?? '—'}
              </p>
            </div>
          </LiveFeedCard>

          <LiveFeedCard
            title="ISS · Live Telemetry"
            description="International Space Station ground-track every 15 seconds."
            sourceLabel="Open Notify"
            sourceUrl={NASA_PUBLIC_LINKS.iss}
            status={iss.data?.ok ? (iss.data.stale ? 'cached' : 'live') : 'unavailable'}
            fetchedAt={iss.data?.fetchedAt ?? null}
            loading={iss.loading}
            stale={iss.data?.stale}
            cacheAge={iss.data?.cacheAge}
            lastSuccessAt={iss.data?.lastSuccessAt}
            error={iss.data?.error ?? null}
            onRefresh={iss.refresh}
          >
            <div className="font-mono text-xs text-foreground/90 space-y-0.5">
              <div>lat {iss.data?.data?.latitude?.toFixed(2) ?? '—'}</div>
              <div>lon {iss.data?.data?.longitude?.toFixed(2) ?? '—'}</div>
            </div>
          </LiveFeedCard>

          <LiveFeedCard
            title="NWS · Active Severe Alerts"
            description="US National Weather Service severe/extreme advisories."
            sourceLabel="weather.gov"
            sourceUrl={NOAA_PUBLIC_LINKS.weather}
            status={nws.data?.ok ? (nws.data.stale ? 'cached' : 'live') : 'unavailable'}
            fetchedAt={nws.data?.fetchedAt ?? null}
            loading={nws.loading}
            stale={nws.data?.stale}
            cacheAge={nws.data?.cacheAge}
            lastSuccessAt={nws.data?.lastSuccessAt}
            error={nws.data?.error ?? null}
            onRefresh={nws.refresh}
          >
            <p className="text-3xl font-semibold text-foreground">
              {nws.data?.data?.count ?? '—'}
            </p>
            <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">
              active alerts
            </p>
          </LiveFeedCard>

          <LiveFeedCard
            title="SOHO · Solar Imagery"
            description="Solar and Heliospheric Observatory — official ESA/NASA imagery."
            sourceLabel="SOHO"
            sourceUrl={NASA_PUBLIC_LINKS.soho}
            status="external"
          />

          <LiveFeedCard
            title="NASA · Near-Earth Objects"
            description="Asteroid + comet flybys tracked by CNEOS."
            sourceLabel="JPL CNEOS"
            sourceUrl={NASA_PUBLIC_LINKS.neo}
            status="external"
          />

          <LiveFeedCard
            title="Official UAP Documents"
            description="AARO, ODNI, and Congressional UAP releases."
            sourceLabel="defense.gov · AARO"
            sourceUrl="https://www.aaro.mil/"
            status="external"
          />
        </section>
      </main>
    </>
  );
}

export default LiveFeedsPage;
