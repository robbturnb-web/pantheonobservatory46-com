/**
 * /diagnostics — Live endpoint health probe.
 *
 * Pings every external data source the dashboard depends on, directly from
 * the user's browser (so we see exactly what their session sees), and reports:
 *   - URL  ·  HTTP status  ·  response time  ·  payload sample  ·  error
 *   - last successful update
 *
 * No mocks. No fallbacks. If a feed is dark, this page tells you so.
 */
import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Activity, RefreshCw, CheckCircle2, XCircle, ExternalLink, Loader2 } from 'lucide-react';

interface Endpoint {
  id: string;
  label: string;
  provider: string;
  url: string;
  docsUrl: string;
  /** Optional shape probe — returns a one-line summary of the payload. */
  summarize?: (json: unknown) => string;
}

const ENDPOINTS: Endpoint[] = [
  {
    id: 'usgs-quakes',
    label: 'USGS Earthquakes · 24h',
    provider: 'USGS',
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
    docsUrl: 'https://earthquake.usgs.gov/earthquakes/feed/',
    summarize: (j) => {
      const features = (j as { features?: unknown[] })?.features ?? [];
      return `${features.length} quakes`;
    },
  },
  {
    id: 'noaa-kp',
    label: 'NOAA SWPC · Planetary Kp (1m)',
    provider: 'NOAA SWPC',
    url: 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json',
    docsUrl: 'https://www.swpc.noaa.gov/products/planetary-k-index',
    summarize: (j) => {
      const arr = j as Array<{ kp_index?: number }> | undefined;
      if (!Array.isArray(arr) || !arr.length) return 'empty';
      const last = arr[arr.length - 1];
      return `Kp ${last?.kp_index ?? '?'} (${arr.length} samples)`;
    },
  },
  {
    id: 'noaa-xray',
    label: 'NOAA SWPC · GOES X-ray Flux',
    provider: 'NOAA SWPC',
    url: 'https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json',
    docsUrl: 'https://www.swpc.noaa.gov/products/goes-x-ray-flux',
    summarize: (j) => `${(j as unknown[])?.length ?? 0} flux samples`,
  },
  {
    id: 'noaa-wind',
    label: 'NOAA SWPC · Solar Wind Speed',
    provider: 'NOAA SWPC',
    url: 'https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json',
    docsUrl: 'https://www.swpc.noaa.gov/products/real-time-solar-wind',
    summarize: (j) => {
      const r = j as { WindSpeed?: number; TimeStamp?: string };
      return `${r?.WindSpeed ?? '?'} km/s @ ${r?.TimeStamp ?? '?'}`;
    },
  },
  {
    id: 'noaa-alerts',
    label: 'NOAA SWPC · Space Weather Alerts',
    provider: 'NOAA SWPC',
    url: 'https://services.swpc.noaa.gov/products/alerts.json',
    docsUrl: 'https://www.swpc.noaa.gov/products/alerts-watches-and-warnings',
    summarize: (j) => `${(j as unknown[])?.length ?? 0} alerts (all-time)`,
  },
  {
    id: 'nasa-cme',
    label: 'NASA DONKI · CME (7d)',
    provider: 'NASA',
    url: `https://api.nasa.gov/DONKI/CME?startDate=${isoDaysAgo(7)}&endDate=${isoDaysAgo(0)}&api_key=DEMO_KEY`,
    docsUrl: 'https://api.nasa.gov/',
    summarize: (j) => `${(j as unknown[])?.length ?? 0} CME events`,
  },
  {
    id: 'nasa-flr',
    label: 'NASA DONKI · Solar Flares (7d)',
    provider: 'NASA',
    url: `https://api.nasa.gov/DONKI/FLR?startDate=${isoDaysAgo(7)}&endDate=${isoDaysAgo(0)}&api_key=DEMO_KEY`,
    docsUrl: 'https://api.nasa.gov/',
    summarize: (j) => `${(j as unknown[])?.length ?? 0} flare events`,
  },
  {
    id: 'nasa-gst',
    label: 'NASA DONKI · Geomagnetic Storms (7d)',
    provider: 'NASA',
    url: `https://api.nasa.gov/DONKI/GST?startDate=${isoDaysAgo(7)}&endDate=${isoDaysAgo(0)}&api_key=DEMO_KEY`,
    docsUrl: 'https://api.nasa.gov/',
    summarize: (j) => `${(j as unknown[])?.length ?? 0} GST events`,
  },
  {
    id: 'iss',
    label: 'ISS Live Telemetry',
    provider: 'Where The ISS At?',
    url: 'https://api.wheretheiss.at/v1/satellites/25544',
    docsUrl: 'https://wheretheiss.at/w/developer',
    summarize: (j) => {
      const r = j as { latitude?: number; longitude?: number; velocity?: number };
      return `lat ${r?.latitude?.toFixed(2)} · lon ${r?.longitude?.toFixed(2)} · ${Math.round(r?.velocity ?? 0)} km/h`;
    },
  },
  {
    id: 'nws-alerts',
    label: 'NWS · Active Severe/Extreme Alerts',
    provider: 'NOAA NWS',
    url: 'https://api.weather.gov/alerts/active?status=actual&severity=Severe,Extreme&limit=200',
    docsUrl: 'https://www.weather.gov/documentation/services-web-api',
    summarize: (j) => {
      const features = (j as { features?: unknown[] })?.features ?? [];
      return `${features.length} active alerts`;
    },
  },
];

function isoDaysAgo(n: number) {
  return new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);
}

type Status = 'idle' | 'pending' | 'ok' | 'fail';
interface ProbeResult {
  status: Status;
  httpStatus?: number;
  durationMs?: number;
  summary?: string;
  error?: string;
  startedAt?: string;
  finishedAt?: string;
  lastOkAt?: string;
}

async function probe(ep: Endpoint, signal: AbortSignal): Promise<Omit<ProbeResult, 'lastOkAt'>> {
  const startedAt = new Date().toISOString();
  const t0 = performance.now();
  try {
    const r = await fetch(ep.url, { cache: 'no-store', signal });
    const t1 = performance.now();
    const finishedAt = new Date().toISOString();
    if (!r.ok) {
      return {
        status: 'fail',
        httpStatus: r.status,
        durationMs: Math.round(t1 - t0),
        startedAt,
        finishedAt,
        error: `HTTP ${r.status} ${r.statusText}`,
      };
    }
    const json = await r.json();
    const t2 = performance.now();
    return {
      status: 'ok',
      httpStatus: r.status,
      durationMs: Math.round(t2 - t0),
      startedAt,
      finishedAt: new Date().toISOString(),
      summary: ep.summarize ? ep.summarize(json) : 'OK',
    };
  } catch (e) {
    const t1 = performance.now();
    return {
      status: 'fail',
      durationMs: Math.round(t1 - t0),
      startedAt,
      finishedAt: new Date().toISOString(),
      error: e instanceof Error ? e.message : 'unknown error',
    };
  }
}

export default function DiagnosticsPage() {
  const [results, setResults] = useState<Record<string, ProbeResult>>(() =>
    Object.fromEntries(ENDPOINTS.map((e) => [e.id, { status: 'idle' as Status }])),
  );
  const [running, setRunning] = useState(false);

  const runAll = useCallback(async () => {
    setRunning(true);
    const ctrl = new AbortController();
    // Mark all pending
    setResults((prev) =>
      Object.fromEntries(
        ENDPOINTS.map((e) => [e.id, { ...prev[e.id], status: 'pending' as Status }]),
      ),
    );
    await Promise.all(
      ENDPOINTS.map(async (ep) => {
        const r = await probe(ep, ctrl.signal);
        setResults((prev) => ({
          ...prev,
          [ep.id]: { ...r, lastOkAt: r.status === 'ok' ? r.finishedAt : prev[ep.id]?.lastOkAt },
        }));
      }),
    );
    setRunning(false);
  }, []);

  useEffect(() => {
    void runAll();
  }, [runAll]);

  const okCount = Object.values(results).filter((r) => r.status === 'ok').length;
  const failCount = Object.values(results).filter((r) => r.status === 'fail').length;

  return (
    <>
      <Helmet>
        <title>Diagnostics · Pantheon Live Feed Health</title>
        <meta
          name="description"
          content="Real-time probe of every external data source Pantheon depends on. URL, HTTP status, response time, payload sample, last success."
        />
      </Helmet>

      <main className="min-h-screen bg-[#05030D] text-foreground">
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[6px] text-primary/80 mb-3">
              <Activity className="w-3 h-3" />
              System Diagnostics
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-3">
              Live Feed Health
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Each endpoint below is fetched directly from your browser — this shows exactly what
              your session sees. If a card is dark, the source is dark for you right now.
              Pantheon will never invent values to fill the gap.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={runAll}
                disabled={running}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[2px] disabled:opacity-40 hover:bg-primary/90 transition-colors"
              >
                {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                {running ? 'Probing…' : 'Re-run all probes'}
              </button>
              <div className="text-[11px] uppercase tracking-[2px] text-muted-foreground">
                <span className="text-emerald-400 font-bold">{okCount}</span> verified ·{' '}
                <span className="text-rose-400 font-bold">{failCount}</span> offline ·{' '}
                {ENDPOINTS.length} total
              </div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 space-y-3">
          {ENDPOINTS.map((ep, i) => {
            const r = results[ep.id] ?? { status: 'idle' as Status };
            return (
              <motion.article
                key={ep.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className={`rounded-xl border bg-black/40 backdrop-blur p-4 sm:p-5 transition-colors ${
                  r.status === 'ok'
                    ? 'border-emerald-500/30'
                    : r.status === 'fail'
                      ? 'border-rose-500/40'
                      : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusIcon status={r.status} />
                      <h2 className="text-base font-bold text-foreground truncate">{ep.label}</h2>
                      <span className="text-[9px] uppercase tracking-[2px] px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10 text-white/60">
                        {ep.provider}
                      </span>
                    </div>
                    <a
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300/80 hover:text-cyan-200 break-all"
                    >
                      {ep.url}
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                  <a
                    href={ep.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-[10px] uppercase tracking-[2px] text-white/50 hover:text-white/80 inline-flex items-center gap-1"
                  >
                    Docs <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                  <Field label="HTTP">
                    <span className={r.httpStatus && r.httpStatus >= 200 && r.httpStatus < 300 ? 'text-emerald-300' : 'text-rose-300'}>
                      {r.httpStatus ?? '—'}
                    </span>
                  </Field>
                  <Field label="Response Time">
                    {r.durationMs != null ? `${r.durationMs} ms` : '—'}
                  </Field>
                  <Field label="Last Probe">
                    {r.finishedAt ? new Date(r.finishedAt).toLocaleTimeString() : '—'}
                  </Field>
                  <Field label="Last Success">
                    {r.lastOkAt ? new Date(r.lastOkAt).toLocaleTimeString() : '—'}
                  </Field>
                </div>

                <div className="mt-3 rounded-md bg-black/60 border border-white/5 p-2.5">
                  {r.status === 'pending' && (
                    <div className="text-[11px] text-white/50 flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" /> Probing…
                    </div>
                  )}
                  {r.status === 'ok' && (
                    <div className="text-[11px] text-emerald-300 font-mono">
                      ✓ {r.summary}
                    </div>
                  )}
                  {r.status === 'fail' && (
                    <div className="text-[11px] text-rose-300 font-mono whitespace-pre-wrap break-words">
                      ✗ {r.error}
                    </div>
                  )}
                  {r.status === 'idle' && (
                    <div className="text-[11px] text-white/40">awaiting probe</div>
                  )}
                </div>
              </motion.article>
            );
          })}

          <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-4 text-[11px] text-white/70 leading-relaxed">
            <strong className="text-primary uppercase tracking-[2px] text-[10px] block mb-1.5">
              If everything fails
            </strong>
            Your browser/network is blocking outbound fetches to these public APIs (common on
            mobile carriers, corporate networks, or strict CSP/extensions). The fix is an
            edge-function proxy that fetches server-side, caches for 15&nbsp;min, and serves your
            browser from <code className="text-cyan-300">{'/functions/v1/*'}</code>. That's Phase&nbsp;2.
          </div>
        </section>
      </main>
    </>
  );
}

function StatusIcon({ status }: { status: Status }) {
  if (status === 'ok') return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
  if (status === 'fail') return <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
  if (status === 'pending') return <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />;
  return <span className="w-4 h-4 rounded-full border border-white/20 shrink-0" />;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[2px] text-white/40 mb-0.5">{label}</div>
      <div className="font-mono text-white/85">{children}</div>
    </div>
  );
}
