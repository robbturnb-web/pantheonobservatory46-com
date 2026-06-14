import { SEO } from '@/components/SEO';
import { MotionConfig } from 'framer-motion';
import { LivePanel } from '@/components/command/LivePanel';

import { LiveChamber } from '@/components/command/LiveChamber';
import { LiveImageInset } from '@/components/command/LiveImageInset';
import { SeismicRibbon } from '@/components/command/SeismicRibbon';
import { IssTrackStrip } from '@/components/command/IssTrackStrip';
import solarHero from '@/assets/chambers/solar.jpg';
import seismicHero from '@/assets/chambers/seismic.jpg';
import orbitalHero from '@/assets/chambers/orbital.jpg';
import atmosphereHero from '@/assets/chambers/atmosphere.jpg';
import anomalyHero from '@/assets/chambers/anomaly.jpg';
import codexHero from '@/assets/chambers/codex.jpg';
import {
  useKp, useFlare, useISS, useEarthquakes, useNwsAlerts,
} from '@/hooks/use-live-data';
import {
  Sun, Wind, Satellite, Eye, Activity, Telescope, Radio,
  Flame, Globe2, CloudLightning, ScanEye, BookOpenCheck,
} from 'lucide-react';

export function LiveFeedsPage() {
  const kp = useKp();
  const flare = useFlare();
  const iss = useISS();
  const quakes = useEarthquakes();
  const nws = useNwsAlerts();

  const statusOf = <T,>(r: { data: { ok: boolean; stale?: boolean } | null }) =>
    r.data?.ok ? (r.data.stale ? ('cached' as const) : ('live' as const)) : ('pending' as const);

  return (
    <>
      <SEO
        title="Live Cosmic Feed · Pantheon Observatory 46"
        description="Themed live intelligence chambers — Solar, Seismic, Orbital, Atmospheric, Anomaly, and the Codex Vault."
      />
      <MotionConfig reducedMotion="user">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 sm:space-y-10">

        <header className="text-center sm:text-left animate-fade-in">
          <p className="text-[10px] uppercase tracking-[4px] text-primary">Live Cosmic Feed · V2</p>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground mt-2 tracking-tight">
            Cosmic Command Chambers
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto sm:mx-0 leading-relaxed">
            Each chamber is a distinct environment — solar fire, tectonic pulse, orbital sweep, atmospheric flash,
            anomaly grid, and the golden codex vault. When upstream APIs are offline we say so. We never fabricate readings.
          </p>
        </header>

        {/* SOLAR */}
        <LiveChamber
          title="Solar Observatory"
          subtitle="Flare class · geomagnetic Kp · solar wind regime"
          Icon={Flame}
          theme="solar"
          heroImage={solarHero}
          status={statusOf(flare)}
        >
          <LiveImageInset
            src="https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0304.jpg"
            alt="NASA Solar Dynamics Observatory — AIA 304 latest image of the Sun"
            caption="SDO · AIA 304 · LIVE"
            accentRing="ring-amber-300/50"
            accentText="text-amber-200/80"
            refreshMs={5 * 60_000}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              accent="text-amber-200"
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
          </div>
        </LiveChamber>

        {/* SEISMIC */}
        <LiveChamber
          title="Planetary Monitoring Grid"
          subtitle="Worldwide seismic activity and fault-line pulse"
          Icon={Globe2}
          theme="seismic"
          heroImage={seismicHero}
          status={statusOf(quakes)}
        >
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
            <p className="text-3xl font-black text-foreground">{quakes.data?.value?.count24h ?? '—'}</p>
            <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground mt-1">
              events · 24h · max M {quakes.data?.value?.highest?.mag?.toFixed(1) ?? '—'}
            </p>
            <SeismicRibbon quakes={quakes.data?.value?.latest ?? []} />
          </LivePanel>
        </LiveChamber>

        {/* ORBITAL */}
        <LiveChamber
          title="Orbital Command Deck"
          subtitle="ISS ground-track · interstellar object watch"
          Icon={Satellite}
          theme="orbital"
          heroImage={orbitalHero}
          status={statusOf(iss)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LivePanel
              title="ISS / Orbital Tracking"
              description="International Space Station, ~15s refresh."
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
              <IssTrackStrip
                latitude={iss.data?.value?.latitude}
                longitude={iss.data?.value?.longitude}
              />
            </LivePanel>

            <LivePanel
              title="Interstellar Objects"
              description="3I/ATLAS and other ISO tracking via JPL Horizons."
              Icon={Telescope}
              accent="text-cyan-200"
              status="external"
              sourceUrl="https://ssd.jpl.nasa.gov/horizons/"
              sourceLabel="JPL Horizons"
            >
              <p className="text-xs text-foreground/80">
                Track current ISO candidates via JPL — live feed pending integration.
              </p>
            </LivePanel>
          </div>
        </LiveChamber>

        {/* ATMOSPHERE */}
        <LiveChamber
          title="Atmospheric Intelligence"
          subtitle="Severe weather and storm advisories"
          Icon={CloudLightning}
          theme="atmosphere"
          heroImage={atmosphereHero}
          status={statusOf(nws)}
        >
          <LiveImageInset
            src="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/13/1250x750.jpg"
            alt="NOAA GOES-16 Band 13 infrared satellite — latest CONUS image"
            caption="GOES-16 · IR · LIVE"
            accentRing="ring-sky-300/50"
            accentText="text-sky-200/80"
            shape="square"
            refreshMs={5 * 60_000}
          />
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
        </LiveChamber>

        {/* ANOMALY */}
        <LiveChamber
          title="Anomaly Detection Network"
          subtitle="UAP disclosure · classified signal review"
          Icon={ScanEye}
          theme="anomaly"
          heroImage={anomalyHero}
          status="manual"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              title="Mystery Signal of the Week"
              description="Curator-selected anomaly under active observation."
              Icon={Radio}
              accent="text-emerald-200"
              status="manual"
            >
              <p className="text-sm font-semibold text-foreground">BLC1 · Proxima Centauri (revisited)</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Narrowband signal first reported 2019 — re-examination ongoing.
              </p>
            </LivePanel>
          </div>
        </LiveChamber>

        {/* CODEX */}
        <LiveChamber
          title="The Codex Vault"
          subtitle="Pantheon's sacred archive · cross-discipline knowledge index"
          Icon={BookOpenCheck}
          theme="codex"
          heroImage={codexHero}
          status="external"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Gods · Mythology', href: '/gods' },
              { label: 'Pyramids · Megaliths', href: '/pyramids' },
              { label: 'Whistleblower Vault', href: '/whistleblowers' },
              { label: 'Disclosure Command', href: '/disclosure' },
              { label: 'Starseed Terminal', href: '/starseed' },
              { label: 'Frequencies · 46', href: '/frequencies' },
            ].map((x) => (
              <a
                key={x.href}
                href={x.href}
                className="group rounded-xl border border-amber-300/20 bg-black/40 px-4 py-3 text-sm text-amber-100/90 hover:border-amber-300/60 hover:bg-amber-300/10 transition-colors"
              >
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-amber-300/70 block">
                  Enter →
                </span>
                <span className="font-bold tracking-tight">{x.label}</span>
              </a>
            ))}
          </div>
        </LiveChamber>
      </main>
      </MotionConfig>

    </>
  );
}

export default LiveFeedsPage;
