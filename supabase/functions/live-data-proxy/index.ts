// Pantheon live-data proxy. Whitelisted upstream sources, 15-minute in-memory
// server cache, CORS-open. Avoids browser-side CORS/CSP/network issues that
// blocked direct fetches to NOAA/USGS/NASA from the preview iframe.
//
// Also exposes NORMALIZED routes (e.g. ?source=space-weather) that return a
// stable Pantheon-owned shape so upstream provider changes never reach the
// frontend.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const TTL_MS = 15 * 60 * 1000;
const NASA_KEY = Deno.env.get('NASA_API_KEY') || 'DEMO_KEY';

type SourceFn = (params: URLSearchParams) => { url: string; headers?: Record<string, string> };

function isoDaysAgo(n: number) {
  return new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);
}

const SOURCES: Record<string, SourceFn> = {
  earthquakes: () => ({
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
  }),
  earthquakes_week: () => ({
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
  }),
  kp: () => ({ url: 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json' }),
  flare: () => ({ url: 'https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json' }),
  solarwind: () => ({ url: 'https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json' }),
  alerts: () => ({ url: 'https://services.swpc.noaa.gov/products/alerts.json' }),
  iss: () => ({ url: 'https://api.wheretheiss.at/v1/satellites/25544' }),
  nws: () => ({
    url: 'https://api.weather.gov/alerts/active?status=actual&severity=Severe,Extreme',
    headers: { Accept: 'application/geo+json', 'User-Agent': 'Pantheon Observatory (pantheonobservatory46.com)' },
  }),
  marine: (p) => {
    const lat = Number(p.get('lat') ?? '36.6');
    const lon = Number(p.get('lon') ?? '-122.0');
    const safeLat = Number.isFinite(lat) ? Math.max(-90, Math.min(90, lat)) : 36.6;
    const safeLon = Number.isFinite(lon) ? Math.max(-180, Math.min(180, lon)) : -122.0;
    return {
      url: `https://marine-api.open-meteo.com/v1/marine?latitude=${safeLat}&longitude=${safeLon}&current=wave_height,wave_direction,wave_period`,
    };
  },
  cme: () => ({
    url: `https://api.nasa.gov/DONKI/CME?startDate=${isoDaysAgo(7)}&endDate=${isoDaysAgo(0)}&api_key=${NASA_KEY}`,
  }),
  flr: () => ({
    url: `https://api.nasa.gov/DONKI/FLR?startDate=${isoDaysAgo(7)}&endDate=${isoDaysAgo(0)}&api_key=${NASA_KEY}`,
  }),
  gst: () => ({
    url: `https://api.nasa.gov/DONKI/GST?startDate=${isoDaysAgo(7)}&endDate=${isoDaysAgo(0)}&api_key=${NASA_KEY}`,
  }),
};

interface CacheEntry { body: string; fetchedAt: number; upstreamStatus: number }
const cache = new Map<string, CacheEntry>();

interface LoadResult {
  body: string;
  /** MISS | HIT | STALE | FALLBACK */
  cacheState: 'MISS' | 'HIT' | 'STALE' | 'FALLBACK';
  cacheAge: number | null;
  upstreamStatus: string;
  error?: string;
}

function looksLikeHtml(text: string): boolean {
  const t = text.trimStart();
  return t.startsWith('<') || t.includes('<!DOCTYPE') || t.includes('<html');
}

async function loadSource(
  source: string,
  params: URLSearchParams,
  nocache: boolean,
): Promise<LoadResult> {
  const factory = SOURCES[source];
  const listShaped = source === 'cme' || source === 'flr' || source === 'gst'
    || source === 'alerts' || source === 'earthquakes' || source === 'earthquakes_week';
  const emptyFallback = listShaped ? '[]' : '{}';
  if (!factory) {
    return { body: emptyFallback, cacheState: 'FALLBACK', cacheAge: null, upstreamStatus: 'UNKNOWN_SOURCE' };
  }

  const cacheKey = `${source}?${params.toString()}`;
  const now = Date.now();
  const hit = cache.get(cacheKey);
  if (!nocache && hit && now - hit.fetchedAt < TTL_MS) {
    return {
      body: hit.body,
      cacheState: 'HIT',
      cacheAge: Math.floor((now - hit.fetchedAt) / 1000),
      upstreamStatus: String(hit.upstreamStatus),
    };
  }

  const { url: upstream, headers } = factory(params);
  const slowUpstream = source === 'cme' || source === 'flr' || source === 'gst' || source === 'nws' || source === 'iss';
  const timeoutMs = slowUpstream ? 25_000 : 8_000;

  const staleOr = (status: string, error?: string): LoadResult =>
    hit
      ? {
          body: hit.body,
          cacheState: 'STALE',
          cacheAge: Math.floor((now - hit.fetchedAt) / 1000),
          upstreamStatus: status,
          error,
        }
      : { body: emptyFallback, cacheState: 'FALLBACK', cacheAge: null, upstreamStatus: status, error };

  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), timeoutMs);
    let r: Response;
    try {
      r = await fetch(upstream, { headers, signal: ctrl.signal });
    } finally {
      clearTimeout(timeout);
    }
    const text = await r.text();
    // NASA DONKI DEMO_KEY often returns an HTML rate-limit / error page.
    // Never cache or return HTML as if it were JSON.
    if (!r.ok || looksLikeHtml(text)) {
      return staleOr(String(r.status), looksLikeHtml(text) ? 'upstream returned HTML (rate limit or error page)' : undefined);
    }
    cache.set(cacheKey, { body: text, fetchedAt: now, upstreamStatus: r.status });
    return { body: text, cacheState: 'MISS', cacheAge: null, upstreamStatus: String(r.status) };
  } catch (e) {
    return staleOr('ERR', (e as Error).message.slice(0, 120));
  }
}

function parse(body: string): any {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

/* ───────────────── NOAA normalizers ───────────────── */

function kpStorm(k: number): string {
  if (k < 3) return 'Quiet';
  if (k < 4) return 'Unsettled';
  if (k < 5) return 'Active';
  if (k < 6) return 'Minor Storm';
  if (k < 7) return 'Moderate Storm';
  if (k < 8) return 'Strong Storm';
  if (k < 9) return 'Severe Storm';
  return 'Extreme Storm';
}

function fluxToClass(flux: number): string {
  if (!Number.isFinite(flux) || flux <= 0) return 'A0.0';
  if (flux >= 1e-4) return `X${(flux / 1e-4).toFixed(1)}`;
  if (flux >= 1e-5) return `M${(flux / 1e-5).toFixed(1)}`;
  if (flux >= 1e-6) return `C${(flux / 1e-6).toFixed(1)}`;
  if (flux >= 1e-7) return `B${(flux / 1e-7).toFixed(1)}`;
  return `A${(flux / 1e-8).toFixed(1)}`;
}

interface FeedEnvelope<T> {
  ok: boolean;
  value: T | null;
  error?: string;
  cacheState: string;
  cacheAge: number | null;
  upstreamStatus: string;
}

function envelope<T>(load: LoadResult, value: T | null, error?: string): FeedEnvelope<T> {
  return {
    ok: value != null,
    value,
    error: value == null ? (error ?? load.error ?? `upstream ${load.upstreamStatus}`) : undefined,
    cacheState: load.cacheState,
    cacheAge: load.cacheAge,
    upstreamStatus: load.upstreamStatus,
  };
}

function normalizeKp(load: LoadResult) {
  const arr = parse(load.body);
  const last = Array.isArray(arr) ? arr[arr.length - 1] : null;
  const kp = Number(last?.kp_index ?? last?.estimated_kp ?? last?.kp);
  if (!last || !Number.isFinite(kp)) return envelope(load, null, 'no Kp value');
  return envelope(load, {
    kp,
    stormLevel: kpStorm(kp),
    observedAt: last.time_tag ?? new Date().toISOString(),
  });
}

function normalizeFlare(load: LoadResult) {
  const arr = parse(load.body);
  const shortWave = Array.isArray(arr) ? arr.filter((d: any) => d?.energy === '0.05-0.4nm') : [];
  const last = shortWave[shortWave.length - 1];
  const flux = Number(last?.flux);
  if (!last || !Number.isFinite(flux)) return envelope(load, null, 'no flare data');
  return envelope(load, {
    class: fluxToClass(flux),
    flux,
    observedAt: last.time_tag ?? new Date().toISOString(),
  });
}

function normalizeWind(load: LoadResult) {
  const json = parse(load.body);
  let speed = NaN;
  let observedAt = new Date().toISOString();
  if (Array.isArray(json) && json.length > 0) {
    const last = json[json.length - 1];
    speed = Number(last?.proton_speed ?? last?.WindSpeed ?? last?.speed);
    observedAt = last?.time_tag ?? last?.TimeStamp ?? observedAt;
  } else if (json && typeof json === 'object') {
    speed = Number(json.WindSpeed ?? json.proton_speed ?? json.speed);
    observedAt = json.TimeStamp ?? json.time_tag ?? observedAt;
  }
  if (!Number.isFinite(speed)) return envelope(load, null, 'no wind speed');
  return envelope(load, { speedKmS: speed, observedAt });
}

function normalizeAlerts(load: LoadResult) {
  const arr = parse(load.body);
  if (!Array.isArray(arr)) return envelope(load, null, 'no alert feed');
  const cutoff = Date.now() - 24 * 3600_000;
  const items = arr
    .filter((a: any) => {
      const t = Date.parse(String(a?.issue_datetime ?? '').replace(' ', 'T') + 'Z');
      return Number.isFinite(t) && t >= cutoff;
    })
    .map((a: any) => ({
      serial: a.serial_number ?? String(a.product_id ?? ''),
      issued: String(a.issue_datetime ?? '').replace(' ', 'T') + 'Z',
      message: String(a.message ?? '').slice(0, 600),
      productId: a.product_id ?? '',
    }))
    .sort((a, b) => new Date(b.issued).getTime() - new Date(a.issued).getTime())
    .slice(0, 8);
  return envelope(load, items);
}

/** GET ?source=space-weather — one normalized NOAA SWPC payload. */
async function spaceWeather(params: URLSearchParams, nocache: boolean) {
  const [kp, flare, wind, alerts] = await Promise.all([
    loadSource('kp', new URLSearchParams({ source: 'kp' }), nocache),
    loadSource('flare', new URLSearchParams({ source: 'flare' }), nocache),
    loadSource('solarwind', new URLSearchParams({ source: 'solarwind' }), nocache),
    loadSource('alerts', new URLSearchParams({ source: 'alerts' }), nocache),
  ]);
  return {
    generatedAt: new Date().toISOString(),
    kp: normalizeKp(kp),
    flare: normalizeFlare(flare),
    solarwind: normalizeWind(wind),
    alerts: normalizeAlerts(alerts),
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const source = url.searchParams.get('source') ?? '';
  const nocache = url.searchParams.get('nocache') === '1';

  if (source === 'space-weather') {
    const payload = await spaceWeather(url.searchParams, nocache);
    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Pantheon-Normalized': '1' },
    });
  }

  if (!SOURCES[source]) {
    return new Response(
      JSON.stringify({ error: 'unknown source', allowed: [...Object.keys(SOURCES), 'space-weather'] }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  const load = await loadSource(source, url.searchParams, nocache);
  const headers: Record<string, string> = {
    ...corsHeaders,
    'Content-Type': 'application/json',
    'X-Pantheon-Upstream-Status': load.upstreamStatus,
  };
  if (load.cacheState === 'FALLBACK') {
    headers['X-Pantheon-Fallback'] = '1';
    if (load.error) headers['X-Pantheon-Error'] = load.error;
  } else {
    headers['X-Pantheon-Cache'] = load.cacheState;
    if (load.cacheAge != null) headers['X-Pantheon-Cache-Age'] = String(load.cacheAge);
  }
  return new Response(load.body, { headers });
});
