/**
 * WeatherStormPanel — Phase 2 (final) live readout for:
 *  - NWS active SEVERE / EXTREME alerts (US national feed) with
 *    category breakdown (Tropical · Tornado · Thunderstorm · Flood …)
 *  - A latest-alerts ticker with severity, event type, and area
 *  - Lightning placeholder: Pantheon does not yet have a CORS-safe
 *    realtime global lightning feed. Per Phase 1 sourcing rules, we
 *    show "Awaiting source · integration pending" instead of a fake
 *    counter, with a deep link to the public Blitzortung / LightningMaps
 *    visualization.
 */
import { CloudLightning, Wind, AlertOctagon, ExternalLink } from 'lucide-react';
import { useNwsAlerts } from '@/hooks/use-live-data';
import type { NwsCategory } from '@/lib/live-data';
import { LiveDataFooter } from './LiveDataFooter';

const CATEGORY_TONE: Record<NwsCategory, { text: string; border: string; bg: string }> = {
  Tropical:     { text: 'text-cyan-200',    border: 'border-cyan-400/40',    bg: 'bg-cyan-500/10' },
  Tornado:      { text: 'text-rose-200',    border: 'border-rose-400/40',    bg: 'bg-rose-500/10' },
  Thunderstorm: { text: 'text-amber-200',   border: 'border-amber-400/40',   bg: 'bg-amber-500/10' },
  Flood:        { text: 'text-sky-200',     border: 'border-sky-400/40',     bg: 'bg-sky-500/10' },
  Winter:       { text: 'text-indigo-200',  border: 'border-indigo-400/40',  bg: 'bg-indigo-500/10' },
  Fire:         { text: 'text-orange-200',  border: 'border-orange-400/40',  bg: 'bg-orange-500/10' },
  Heat:         { text: 'text-yellow-200',  border: 'border-yellow-400/40',  bg: 'bg-yellow-500/10' },
  Other:        { text: 'text-white/75',    border: 'border-white/20',       bg: 'bg-white/5' },
};
const SEVERITY_TONE: Record<string, string> = {
  Extreme: 'bg-rose-500/80 text-white',
  Severe:  'bg-amber-500/80 text-black',
};

function timeAgoLocal(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return `${Math.floor(d)}s ago`;
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}

export function WeatherStormPanel() {
  const alerts = useNwsAlerts();
  const summary = alerts.data?.value;
  const byCat = summary?.byCategory;

  return (
    <section className="relative px-4 sm:px-8 pb-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-4 flex items-baseline justify-between gap-3 flex-wrap">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[3px] text-sky-300/90 font-bold">
            Weather &amp; Storm Layer · NOAA NWS Active Alerts
          </h2>
          <span className="text-[9px] uppercase tracking-[2px] text-white/40">
            US national feed · severe + extreme only
          </span>
        </header>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Category counts */}
          <article className="relative md:col-span-1 rounded-xl border border-sky-400/30 bg-gradient-to-br from-sky-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[3px] text-sky-300/80 mb-1">
                  Active Storm Alerts
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-sky-200">
                    {alerts.data?.ok ? summary!.total : '—'}
                  </span>
                  <span className="text-xs uppercase tracking-[2px] text-white/50">
                    Active now
                  </span>
                </div>
              </div>
              <Wind className="w-5 h-5 text-sky-300" />
            </div>

            <ul className="relative grid grid-cols-2 gap-1.5 mb-3">
              {byCat
                ? (Object.entries(byCat) as [NwsCategory, number][])
                    .filter(([, n]) => n > 0)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, n]) => {
                      const t = CATEGORY_TONE[cat];
                      return (
                        <li
                          key={cat}
                          className={`flex items-baseline justify-between gap-2 text-[10px] uppercase tracking-[2px] px-2 py-1 rounded-md border ${t.border} ${t.bg}`}
                        >
                          <span className={`font-bold ${t.text}`}>{cat}</span>
                          <span className="font-mono text-white/70">{n}</span>
                        </li>
                      );
                    })
                : (
                  <li className="col-span-2 text-[10px] uppercase tracking-[2px] text-white/35">
                    {alerts.loading ? 'Connecting to NWS…' : 'No active severe alerts'}
                  </li>
                )}
              {byCat && summary!.total === 0 && (
                <li className="col-span-2 text-[10px] uppercase tracking-[2px] text-emerald-300/80">
                  All clear · no severe/extreme alerts active
                </li>
              )}
            </ul>

            <LiveDataFooter
              source={alerts.data?.source ?? null}
              fetchedAt={alerts.data?.fetchedAt}
              ok={alerts.data?.ok ?? false}
              error={alerts.data?.error}
              loading={alerts.loading}
              onRefresh={alerts.refresh}
            />
          </article>

          {/* Latest alerts ticker */}
          <article className="relative md:col-span-2 rounded-xl border border-amber-400/30 bg-gradient-to-br from-amber-950/30 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[3px] text-amber-300/80">
                Latest Active Alerts
              </div>
              <AlertOctagon className="w-5 h-5 text-amber-300" />
            </div>

            <ul className="relative space-y-2 max-h-64 overflow-y-auto pr-1 mb-3">
              {summary?.latest?.length ? (
                summary.latest.map((a) => {
                  const tone = CATEGORY_TONE[a.category];
                  const sev = SEVERITY_TONE[a.severity] ?? 'bg-white/20 text-white';
                  return (
                    <li
                      key={a.id}
                      className={`text-[11px] border-l-2 ${tone.border} pl-2`}
                    >
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`text-[9px] font-bold uppercase tracking-[1.5px] px-1.5 py-0.5 rounded-sm ${sev}`}>
                          {a.severity}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-[2px] ${tone.text}`}>
                          {a.event}
                        </span>
                        <span className="ml-auto font-mono text-white/45 text-[10px]">
                          {timeAgoLocal(a.sent)}
                        </span>
                      </div>
                      <div className="text-white/70 leading-snug line-clamp-2">
                        {a.area || a.headline}
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="text-[10px] uppercase tracking-[2px] text-white/35">
                  {alerts.loading ? 'Connecting to NWS…' : 'No active severe/extreme alerts'}
                </li>
              )}
            </ul>

            <a
              href="https://www.weather.gov/wwamap/wwatxtget.php?cwa=usa&wwa=all"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1 text-[10px] uppercase tracking-[2px] text-amber-200 hover:text-white"
            >
              NWS national alert map <ExternalLink className="w-3 h-3" />
            </a>
          </article>
        </div>

        {/* Lightning — honest placeholder, no fake counter */}
        <article className="relative mt-4 rounded-xl border border-yellow-400/30 bg-gradient-to-br from-yellow-950/30 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[3px] text-yellow-300/80 mb-1">
                Global Lightning Activity
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl font-black text-amber-200">Awaiting Source</span>
                <span className="text-[10px] uppercase tracking-[2px] text-white/50">
                  Realtime Blitzortung integration pending
                </span>
              </div>
            </div>
            <CloudLightning className="w-5 h-5 text-yellow-300" />
          </div>
          <p className="relative text-[11px] text-white/65 leading-snug mb-3">
            Pantheon does not publish a simulated lightning counter. The public
            Blitzortung network feed requires a server-side proxy (no CORS),
            which we will wire through Lovable Cloud in a follow-up. Until then,
            view the live community visualization directly:
          </p>
          <a
            href="https://map.blitzortung.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-yellow-400/40 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-200 text-[10px] uppercase tracking-[2px] font-bold transition-colors"
          >
            Open Blitzortung live lightning map <ExternalLink className="w-3 h-3" />
          </a>
          <div className="mt-3 text-[9px] uppercase tracking-[2px] text-white/40">
            Source · Blitzortung.org community network · external link only
          </div>
        </article>
      </div>
    </section>
  );
}
