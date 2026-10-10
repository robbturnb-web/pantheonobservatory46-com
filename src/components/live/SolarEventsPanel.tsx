/**
 * SolarEventsPanel — live NASA DONKI + NOAA SWPC solar event readout.
 *
 *  - CME count (last 7d) + fastest event speed
 *  - Solar flare events (last 7d) + strongest class
 *  - Geomagnetic storm events (last 7d) + max Kp
 *  - NOAA SWPC active alerts (last 24h, scrollable)
 *
 * Every card carries its own LiveDataFooter (source · timestamp · refresh ·
 * verified badge), per Phase 1 sourcing rules.
 */
import { Sun, Zap, Activity, Radio, ExternalLink, ChevronRight } from 'lucide-react';
import {
  useCMEs,
  useFlareEvents,
  useGSTs,
  useSwpcAlerts,
} from '@/hooks/use-live-data';
import { timeAgo } from '@/lib/live-data';
import { LiveDataFooter } from './LiveDataFooter';

/** Clean up raw upstream errors (especially NASA DEMO_KEY HTML rate-limit pages). */
function cleanDonkiError(err?: string | null): string | undefined {
  if (!err) return undefined;
  if (err.includes('Unexpected token') || err.includes('<!DOCTYPE') || err.includes('HTML')) {
    return 'NASA DONKI temporarily unavailable (DEMO_KEY rate limit). Using last verified reading if available.';
  }
  return err;
}

export function SolarEventsPanel() {
  const cmes = useCMEs();
  const flares = useFlareEvents();
  const gsts = useGSTs();
  const alerts = useSwpcAlerts();

  const cmeError = cleanDonkiError(cmes.data?.error);
  const flareError = cleanDonkiError(flares.data?.error);
  const gstError = cleanDonkiError(gsts.data?.error);

  return (
    <section className="relative px-4 sm:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-4 flex items-baseline justify-between gap-3 flex-wrap">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[3px] text-amber-300/90 font-bold">
            Solar & Geomagnetic Events · NASA DONKI + NOAA SWPC
          </h2>
          <span className="text-[9px] uppercase tracking-[2px] text-white/40">
            Rolling 7-day window
          </span>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {/* CME */}
          <article className="relative rounded-xl border border-amber-400/30 bg-gradient-to-br from-amber-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,200,80,0.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[3px] text-amber-300/80 mb-1">
                  Coronal Mass Ejections
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-amber-300">
                    {cmes.data?.ok ? cmes.data.value!.count7d : '—'}
                  </span>
                  <span className="text-xs uppercase tracking-[2px] text-white/50">
                    Events · 7d
                  </span>
                </div>
                {cmes.data?.value?.fastest && (
                  <div className="text-[10px] uppercase tracking-[2px] text-white/55 mt-1">
                    Fastest ·{' '}
                    <span className="text-amber-200 font-bold">
                      {Math.round(cmes.data.value.fastest.speedKmS ?? 0)} km/s
                    </span>
                  </div>
                )}
              </div>
              <Sun className="w-5 h-5 text-amber-300" />
            </div>

            <ul className="relative space-y-1.5 mt-2 mb-3 max-h-32 overflow-y-auto pr-1">
              {cmes.data?.value?.latest?.length ? (
                cmes.data.value.latest.map((e) => (
                  <li key={e.id} className="text-[10px] flex items-baseline gap-2">
                    <span className="font-mono text-amber-200/80 shrink-0">
                      {new Date(e.startTime).toUTCString().slice(5, 22)}
                    </span>
                    <span className="text-white/65 truncate">
                      {e.speedKmS ? `${Math.round(e.speedKmS)} km/s` : 'speed N/A'}
                      {e.type ? ` · ${e.type}` : ''}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-[10px] uppercase tracking-[2px] text-white/35">
                  {cmes.loading ? 'Connecting to DONKI…' : (cmeError ? 'Source temporarily unavailable' : 'No CME events in window')}
                </li>
              )}
            </ul>

            <LiveDataFooter
              source={cmes.data?.source ?? null}
              fetchedAt={cmes.data?.fetchedAt}
              stale={cmes.data?.stale}
              cacheAge={cmes.data?.cacheAge}
              lastSuccessAt={cmes.data?.lastSuccessAt}
              degraded={cmes.data?.degraded}
              ok={cmes.data?.ok ?? false}
              error={cmeError}
              loading={cmes.loading}
              onRefresh={cmes.refresh}
            />
          </article>

          {/* Flares */}
          <article className="relative rounded-xl border border-orange-400/30 bg-gradient-to-br from-orange-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,140,80,0.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[3px] text-orange-300/80 mb-1">
                  Solar Flare Events
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-orange-300">
                    {flares.data?.ok ? flares.data.value!.count7d : '—'}
                  </span>
                  <span className="text-xs uppercase tracking-[2px] text-white/50">
                    Events · 7d
                  </span>
                </div>
                {flares.data?.value?.strongest && (
                  <div className="text-[10px] uppercase tracking-[2px] text-white/55 mt-1">
                    Strongest ·{' '}
                    <span className="text-orange-200 font-bold">
                      {flares.data.value.strongest.class}
                    </span>
                    {flares.data.value.strongest.activeRegion ? (
                      <span className="text-white/45 normal-case tracking-normal">
                        {' '}
                        from {flares.data.value.strongest.activeRegion}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
              <Zap className="w-5 h-5 text-orange-300" />
            </div>

            <ul className="relative space-y-1.5 mt-2 mb-3 max-h-32 overflow-y-auto pr-1">
              {flares.data?.value?.latest?.length ? (
                flares.data.value.latest.map((e) => (
                  <li key={e.id} className="text-[10px] flex items-baseline gap-2">
                    <span className="font-mono text-orange-200/80 shrink-0 w-12">
                      {e.class}
                    </span>
                    <span className="text-white/65 truncate">
                      {new Date(e.beginTime).toUTCString().slice(5, 22)}
                      {e.sourceLocation ? ` · ${e.sourceLocation}` : ''}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-[10px] uppercase tracking-[2px] text-white/35">
                  {flares.loading ? 'Connecting to DONKI…' : (flareError ? 'Source temporarily unavailable' : 'No flare events in window')}
                </li>
              )}
            </ul>

            <LiveDataFooter
              source={flares.data?.source ?? null}
              fetchedAt={flares.data?.fetchedAt}
              stale={flares.data?.stale}
              cacheAge={flares.data?.cacheAge}
              lastSuccessAt={flares.data?.lastSuccessAt}
              degraded={flares.data?.degraded}
              ok={flares.data?.ok ?? false}
              error={flareError}
              loading={flares.loading}
              onRefresh={flares.refresh}
            />
          </article>

          {/* GST */}
          <article className="relative rounded-xl border border-fuchsia-400/30 bg-gradient-to-br from-fuchsia-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[3px] text-fuchsia-300/80 mb-1">
                  Geomagnetic Storms
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-fuchsia-300">
                    {gsts.data?.ok ? gsts.data.value!.count7d : '—'}
                  </span>
                  <span className="text-xs uppercase tracking-[2px] text-white/50">
                    Events · 7d
                  </span>
                </div>
                {gsts.data?.value?.strongest?.maxKp != null && (
                  <div className="text-[10px] uppercase tracking-[2px] text-white/55 mt-1">
                    Max Kp ·{' '}
                    <span className="text-fuchsia-200 font-bold">
                      {gsts.data.value.strongest.maxKp.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              <Activity className="w-5 h-5 text-fuchsia-300" />
            </div>

            <ul className="relative space-y-1.5 mt-2 mb-3 max-h-32 overflow-y-auto pr-1">
              {gsts.data?.value?.latest?.length ? (
                gsts.data.value.latest.map((e) => (
                  <li key={e.id} className="text-[10px] flex items-baseline gap-2">
                    <span className="font-mono text-fuchsia-200/80 shrink-0">
                      {new Date(e.startTime).toUTCString().slice(5, 22)}
                    </span>
                    <span className="text-white/65 truncate">
                      {e.maxKp != null ? `Kp ${e.maxKp.toFixed(1)}` : 'Kp N/A'}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-[10px] uppercase tracking-[2px] text-white/35">
                  {gsts.loading ? 'Connecting to DONKI…' : (gstError ? 'Source temporarily unavailable' : 'No geomagnetic storms in window')}
                </li>
              )}
            </ul>

            <LiveDataFooter
              source={gsts.data?.source ?? null}
              fetchedAt={gsts.data?.fetchedAt}
              stale={gsts.data?.stale}
              cacheAge={gsts.data?.cacheAge}
              lastSuccessAt={gsts.data?.lastSuccessAt}
              degraded={gsts.data?.degraded}
              ok={gsts.data?.ok ?? false}
              error={gstError}
              loading={gsts.loading}
              onRefresh={gsts.refresh}
            />
          </article>
        </div>

        {/* SWPC Alerts */}
        <article className="relative rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_60%)] pointer-events-none" />
          <div className="relative flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[3px] text-cyan-300/80 mb-1">
                NOAA SWPC · Active Alerts · Last 24h
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-cyan-300">
                  {alerts.data?.ok ? alerts.data.value!.length : '—'}
                </span>
                <span className="text-xs uppercase tracking-[2px] text-white/50">
                  Bulletins
                </span>
              </div>
            </div>
            <Radio className="w-5 h-5 text-cyan-300" />
          </div>

          <ul className="relative space-y-2 max-h-64 overflow-y-auto pr-1 mb-3">
            {alerts.data?.value?.length ? (
              alerts.data.value.map((a) => {
                const firstLine = a.message.split('\n').find((l) => l.trim().length > 0) ?? a.message;
                return (
                  <li
                    key={a.serial}
                    className="text-[11px] border-l-2 border-cyan-400/40 pl-2"
                  >
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-mono text-cyan-200/80 text-[10px]">
                        {timeAgo(a.issued)}
                      </span>
                      <span className="text-[9px] uppercase tracking-[2px] text-white/45">
                        #{a.serial}
                      </span>
                    </div>
                    <div className="text-white/75 leading-snug line-clamp-2">
                      {firstLine}
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="text-[10px] uppercase tracking-[2px] text-white/35">
                {alerts.loading ? 'Connecting to NOAA SWPC…' : 'No active bulletins'}
              </li>
            )}
          </ul>

          <div className="flex items-center gap-2 text-[10px] mb-2">
            <a
              href="https://www.swpc.noaa.gov/products/alerts-watches-and-warnings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-200 hover:text-white transition-colors"
            >
              Full SWPC alert center <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-white/30">·</span>
            <a
              href="https://kauai.ccmc.gsfc.nasa.gov/DONKI/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-200 hover:text-white transition-colors"
            >
              NASA DONKI archive <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          <LiveDataFooter
            source={alerts.data?.source ?? null}
            fetchedAt={alerts.data?.fetchedAt}
            stale={alerts.data?.stale}
            cacheAge={alerts.data?.cacheAge}
            lastSuccessAt={alerts.data?.lastSuccessAt}
            degraded={alerts.data?.degraded}
            ok={alerts.data?.ok ?? false}
            error={alerts.data?.error}
            loading={alerts.loading}
            onRefresh={alerts.refresh}
          />
        </article>
      </div>
    </section>
  );
}
