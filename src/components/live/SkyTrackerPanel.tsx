/**
 * SkyTrackerPanel — Phase 2 (cont.) live readout for:
 *  - ISS real-time position + altitude + velocity (wheretheiss.at, 15s)
 *  - Lunar calendar: current phase + next 4 principal phases
 *  - Meteor showers: currently active + next peak (IMO 2026 calendar)
 *
 * Every card carries a LiveDataFooter (source · timestamp · refresh
 * · verified badge) per Phase 1 sourcing rules. Meteor data is
 * explicitly labelled as a published schedule, not a live rate.
 */
import { Satellite, Moon, Sparkles, ExternalLink } from 'lucide-react';
import {
  useISS,
  useLunarCalendar,
  useMeteorShowers,
} from '@/hooks/use-live-data';
import { LiveDataFooter } from './LiveDataFooter';

function fmtUtc(iso: string) {
  // e.g. "Wed, 11 Jun 2026 04:14 UTC"
  const d = new Date(iso);
  return d.toUTCString().slice(0, 22) + ' UTC';
}
function daysUntil(iso: string) {
  const ms = Date.parse(iso) - Date.now();
  const d = ms / 86_400_000;
  if (d < 0) return 'in progress';
  if (d < 1) return `in ${Math.max(1, Math.round(d * 24))}h`;
  return `in ${Math.round(d)}d`;
}
function moonGlyph(name: string) {
  switch (name) {
    case 'New Moon': return '🌑';
    case 'Waxing Crescent': return '🌒';
    case 'First Quarter': return '🌓';
    case 'Waxing Gibbous': return '🌔';
    case 'Full Moon': return '🌕';
    case 'Waning Gibbous': return '🌖';
    case 'Last Quarter': return '🌗';
    case 'Waning Crescent': return '🌘';
    default: return '🌑';
  }
}

export function SkyTrackerPanel() {
  const iss = useISS();
  const lunar = useLunarCalendar();
  const meteors = useMeteorShowers();

  return (
    <section className="relative px-4 sm:px-8 pb-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-4 flex items-baseline justify-between gap-3 flex-wrap">
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[3px] text-cyan-300/90 font-bold">
            Sky Tracker · ISS · Lunar Calendar · Meteor Showers
          </h2>
          <span className="text-[9px] uppercase tracking-[2px] text-white/40">
            Live telemetry + published schedules
          </span>
        </header>

        <div className="grid md:grid-cols-3 gap-4">
          {/* ISS */}
          <article className="relative rounded-xl border border-cyan-400/30 bg-gradient-to-br from-cyan-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[3px] text-cyan-300/80 mb-1">
                  International Space Station
                </div>
                <div className="text-2xl font-black text-cyan-200">
                  {iss.data?.ok && iss.data.value
                    ? `${iss.data.value.latitude.toFixed(2)}°, ${iss.data.value.longitude.toFixed(2)}°`
                    : iss.loading
                      ? 'Connecting…'
                      : 'Source unavailable'}
                </div>
                <div className="text-[10px] uppercase tracking-[2px] text-white/55 mt-0.5">
                  Sub-satellite point (lat · lon)
                </div>
              </div>
              <Satellite className="w-5 h-5 text-cyan-300" />
            </div>

            {iss.data?.ok && iss.data.value && (
              <div className="relative grid grid-cols-2 gap-2 text-[11px] mb-3">
                <div className="rounded-md border border-cyan-400/20 bg-cyan-500/5 px-2 py-1.5">
                  <div className="text-[9px] uppercase tracking-[2px] text-cyan-200/70">Altitude</div>
                  <div className="text-cyan-100 font-bold">{iss.data.value.altitudeKm.toFixed(1)} km</div>
                </div>
                <div className="rounded-md border border-cyan-400/20 bg-cyan-500/5 px-2 py-1.5">
                  <div className="text-[9px] uppercase tracking-[2px] text-cyan-200/70">Velocity</div>
                  <div className="text-cyan-100 font-bold">{Math.round(iss.data.value.velocityKmH)} km/h</div>
                </div>
                <div className="rounded-md border border-cyan-400/20 bg-cyan-500/5 px-2 py-1.5 col-span-2">
                  <div className="text-[9px] uppercase tracking-[2px] text-cyan-200/70">Visibility</div>
                  <div className="text-cyan-100 font-bold capitalize">{iss.data.value.visibility}</div>
                </div>
              </div>
            )}

            <a
              href="https://spotthestation.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-1 text-[10px] uppercase tracking-[2px] text-cyan-200 hover:text-white mb-2"
            >
              NASA Spot The Station <ExternalLink className="w-3 h-3" />
            </a>

            <LiveDataFooter
              source={iss.data?.source ?? null}
              fetchedAt={iss.data?.fetchedAt}
              stale={iss.data?.stale}
              cacheAge={iss.data?.cacheAge}
              lastSuccessAt={iss.data?.lastSuccessAt}
              degraded={iss.data?.degraded}
              ok={iss.data?.ok ?? false}
              error={iss.data?.error}
              loading={iss.loading}
              onRefresh={iss.refresh}
            />
          </article>

          {/* Lunar Calendar */}
          <article className="relative rounded-xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[3px] text-indigo-300/80 mb-1">
                  Lunar Calendar
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl">
                    {lunar.data?.value ? moonGlyph(lunar.data.value.current.phaseName) : '🌑'}
                  </span>
                  <span className="text-lg font-black text-indigo-100">
                    {lunar.data?.value?.current.phaseName ?? '…'}
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-[2px] text-white/55 mt-0.5">
                  {lunar.data?.value
                    ? `${Math.round(lunar.data.value.current.illumination * 100)}% illuminated · age ${lunar.data.value.current.ageDays.toFixed(1)}d`
                    : 'Computing phase…'}
                </div>
              </div>
              <Moon className="w-5 h-5 text-indigo-300" />
            </div>

            <ul className="relative space-y-1.5 mt-2 mb-3">
              {lunar.data?.value?.upcoming.map((p) => (
                <li key={p.iso} className="flex items-baseline justify-between gap-2 text-[11px]">
                  <span className="text-indigo-100/90">
                    <span className="mr-1.5">{moonGlyph(p.phase)}</span>
                    {p.phase}
                  </span>
                  <span className="font-mono text-white/55 text-[10px]">
                    {fmtUtc(p.iso).slice(0, 16)} · {daysUntil(p.iso)}
                  </span>
                </li>
              ))}
            </ul>

            <LiveDataFooter
              source={lunar.data?.source ?? null}
              fetchedAt={lunar.data?.fetchedAt}
              stale={lunar.data?.stale}
              cacheAge={lunar.data?.cacheAge}
              lastSuccessAt={lunar.data?.lastSuccessAt}
              degraded={lunar.data?.degraded}
              ok={lunar.data?.ok ?? false}
              error={lunar.data?.error}
              loading={lunar.loading}
              onRefresh={lunar.refresh}
            />
          </article>

          {/* Meteor Showers */}
          <article className="relative rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-950/40 to-black/70 backdrop-blur-xl p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.18),transparent_60%)] pointer-events-none" />
            <div className="relative flex items-start justify-between mb-3">
              <div>
                <div className="text-[10px] uppercase tracking-[3px] text-violet-300/80 mb-1">
                  Meteor Showers
                </div>
                {meteors.data?.value?.next ? (
                  <>
                    <div className="text-xl font-black text-violet-100">
                      {meteors.data.value.next.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-[2px] text-white/55 mt-0.5">
                      Peak {fmtUtc(meteors.data.value.next.peakIso).slice(0, 16)} ·{' '}
                      {daysUntil(meteors.data.value.next.peakIso)} · ZHR ≈{' '}
                      <span className="text-violet-200 font-bold">{meteors.data.value.next.zhr}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-black text-violet-100">…</div>
                )}
              </div>
              <Sparkles className="w-5 h-5 text-violet-300" />
            </div>

            {meteors.data?.value?.active?.length ? (
              <div className="relative mb-2">
                <div className="text-[9px] uppercase tracking-[2px] text-emerald-300/90 font-bold mb-1">
                  Active tonight
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {meteors.data.value.active.map((s) => (
                    <span
                      key={s.code}
                      title={`${s.name} · ${s.activeFrom} → ${s.activeTo} · parent ${s.parent}`}
                      className="text-[9px] uppercase tracking-[2px] px-2 py-0.5 rounded-full border border-emerald-400/40 text-emerald-200 bg-emerald-500/10"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <ul className="relative space-y-1 mt-2 mb-3">
              {meteors.data?.value?.upcoming.slice(0, 4).map((s) => (
                <li key={s.code} className="flex items-baseline justify-between gap-2 text-[11px]">
                  <span className="text-violet-100/90 truncate">
                    <span className="font-mono text-violet-300/70 mr-1.5">{s.code}</span>
                    {s.name}
                  </span>
                  <span className="font-mono text-white/55 text-[10px] shrink-0">
                    {s.peakIso.slice(5)} · ZHR {s.zhr}
                  </span>
                </li>
              ))}
            </ul>

            <div className="text-[9px] uppercase tracking-[2px] text-amber-300/80 mb-2">
              Published schedule · not a live observation rate
            </div>

            <LiveDataFooter
              source={meteors.data?.source ?? null}
              fetchedAt={meteors.data?.fetchedAt}
              stale={meteors.data?.stale}
              cacheAge={meteors.data?.cacheAge}
              lastSuccessAt={meteors.data?.lastSuccessAt}
              degraded={meteors.data?.degraded}
              ok={meteors.data?.ok ?? false}
              error={meteors.data?.error}
              loading={meteors.loading}
              onRefresh={meteors.refresh}
            />
          </article>
        </div>
      </div>
    </section>
  );
}
