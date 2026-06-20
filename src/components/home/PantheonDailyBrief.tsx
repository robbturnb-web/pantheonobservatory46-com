/**
 * PantheonDailyBrief — top-of-home daily intelligence summary.
 * 5 cards: Solar · Earth Pulse · Orbit · Mythology · Mystery Watch.
 * Live cards pull from existing hooks; spotlight cards rotate by UTC day.
 */
import { Link } from 'react-router-dom';
import { Sun, Activity, Satellite, Sparkles, Eye, ArrowRight } from 'lucide-react';
import { useKp, useEarthquakes, useISS } from '@/hooks/use-live-data';
import { getTodaysSpotlight, mythologySpotlights, mysteryWatch } from '@/data/daily-brief';

interface BriefCardProps {
  icon: typeof Sun;
  accent: string;
  title: string;
  status: string;
  statusOnline: boolean;
  summary: string;
  source: string;
  to: string;
}

function BriefCard({ icon: Icon, accent, title, status, statusOnline, summary, source, to }: BriefCardProps) {
  return (
    <div className={`group relative rounded-xl border bg-card/50 backdrop-blur p-4 flex flex-col h-full transition-all hover:bg-card/70 ${accent}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${accent}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] uppercase tracking-[1.5px] font-mono ${
          statusOnline
            ? 'border-signal-online/50 bg-signal-online/10 text-signal-online'
            : 'border-muted-foreground/30 bg-muted/10 text-muted-foreground'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusOnline ? 'bg-signal-online animate-pulse' : 'bg-muted-foreground/50'}`} />
          {status}
        </span>
      </div>
      <h3 className="font-display text-base text-foreground mb-1.5 leading-tight">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{summary}</p>
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <span className="text-[9px] uppercase tracking-[1.5px] font-mono text-muted-foreground truncate max-w-[60%]">
          {source}
        </span>
        <Link to={to} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1.5px] font-mono text-foreground hover:text-primary transition-colors">
          Open Brief <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export function PantheonDailyBrief() {
  const kp = useKp();
  const quakes = useEarthquakes();
  const iss = useISS();

  const myth = getTodaysSpotlight(mythologySpotlights);
  const mystery = getTodaysSpotlight(mysteryWatch);

  const kpOk = kp.data?.ok === true;
  const quakesOk = quakes.data?.ok === true;
  const issOk = iss.data?.ok === true;
  const kpVal = kp.data?.value?.kp;
  const quakeCount = quakes.data?.value?.count24h ?? null;
  const issLat = iss.data?.value?.latitude;
  const issLon = iss.data?.value?.longitude;

  return (
    <section aria-labelledby="daily-brief-h" className="relative px-3 sm:px-6 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-observatory font-mono">
            Daily Transmission · {new Date().toUTCString().slice(5, 16)}
          </span>
          <span className="h-px flex-1 bg-realm-observatory/30" />
        </div>
        <h2 id="daily-brief-h" className="font-display text-3xl sm:text-4xl text-foreground mb-2">
          Pantheon <span className="text-realm-observatory">Daily Brief</span>
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
          Your daily cosmic intelligence summary — live solar weather, planetary pulse,
          orbital state, and the day's mythology &amp; mystery spotlight.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <BriefCard
            icon={Sun}
            accent="border-realm-gods/40 text-realm-gods"
            title="Solar Activity"
            status={kp.data?.status === 'verified' ? 'Live' : 'Offline'}
            statusOnline={kp.data?.status === 'verified'}
            summary={kpVal != null
              ? `Kp index ${kpVal.toFixed(1)} — ${kpVal < 4 ? 'quiet geomagnetic field' : kpVal < 5 ? 'unsettled' : 'storm conditions'}.`
              : 'Establishing uplink to NOAA SWPC…'}
            source="NOAA SWPC"
            to="/earth-pulse"
          />
          <BriefCard
            icon={Activity}
            accent="border-signal-online/40 text-signal-online"
            title="Earth Pulse"
            status={quakes.data?.status === 'verified' ? 'Live' : 'Offline'}
            statusOnline={quakes.data?.status === 'verified'}
            summary={quakeCount != null
              ? `${quakeCount} M4.5+ seismic events in the last 7 days.`
              : 'Loading USGS earthquake feed…'}
            source="USGS Earthquake Catalog"
            to="/observatory"
          />
          <BriefCard
            icon={Satellite}
            accent="border-realm-cosmos/40 text-realm-cosmos"
            title="Space / Orbit"
            status={iss.data?.status === 'verified' ? 'Live' : 'Offline'}
            statusOnline={iss.data?.status === 'verified'}
            summary={issLat != null && issLon != null
              ? `ISS over ${issLat.toFixed(1)}°, ${issLon.toFixed(1)}° — 7.66 km/s orbital velocity.`
              : 'Locating International Space Station…'}
            source="wheretheiss.at"
            to="/observatory"
          />
          <BriefCard
            icon={Sparkles}
            accent="border-realm-gods/40 text-realm-gods"
            title="Mythology Spotlight"
            status="Daily"
            statusOnline={false}
            summary={`${myth.title} — ${myth.summary}`}
            source={myth.source}
            to="/gods"
          />
          <BriefCard
            icon={Eye}
            accent="border-realm-disclosure/40 text-realm-disclosure"
            title="Mystery Watch"
            status="Daily"
            statusOnline={false}
            summary={`${mystery.title} — ${mystery.summary}`}
            source={mystery.source}
            to="/uap"
          />
        </div>
      </div>
    </section>
  );
}

export default PantheonDailyBrief;
