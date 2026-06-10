// Pantheon live-data proxy. Whitelisted upstream sources, 15-minute in-memory
// server cache, CORS-open. Avoids browser-side CORS/CSP/network issues that
// blocked direct fetches to NOAA/USGS/NASA from the preview iframe.
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const url = new URL(req.url);
  const source = url.searchParams.get('source') ?? '';
  const nocache = url.searchParams.get('nocache') === '1';

  const factory = SOURCES[source];
  if (!factory) {
    return new Response(
      JSON.stringify({ error: 'unknown source', allowed: Object.keys(SOURCES) }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  const cacheKey = `${source}?${url.searchParams.toString()}`;
  const now = Date.now();
  const hit = cache.get(cacheKey);
  if (!nocache && hit && now - hit.fetchedAt < TTL_MS) {
    return new Response(hit.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-Pantheon-Cache': 'HIT',
        'X-Pantheon-Cache-Age': String(Math.floor((now - hit.fetchedAt) / 1000)),
        'X-Pantheon-Upstream-Status': String(hit.upstreamStatus),
      },
    });
  }

  const { url: upstream, headers } = factory(url.searchParams);
  // List-shaped sources should fall back to [] so client array ops don't crash.
  const listShaped = source === 'cme' || source === 'flr' || source === 'gst'
    || source === 'alerts' || source === 'earthquakes';
  const emptyFallback = listShaped ? '[]' : '{}';
  // DONKI endpoints are slow; give them more time before aborting.
  const slowUpstream = source === 'cme' || source === 'flr' || source === 'gst' || source === 'nws';
  const timeoutMs = slowUpstream ? 25_000 : 8_000;

  const respondFallback = (extra: Record<string, string> = {}) =>
    new Response(emptyFallback, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-Pantheon-Fallback': '1',
        ...extra,
      },
    });

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
    if (!r.ok) {
      if (hit) {
        return new Response(hit.body, {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'X-Pantheon-Cache': 'STALE',
            'X-Pantheon-Cache-Age': String(Math.floor((now - hit.fetchedAt) / 1000)),
            'X-Pantheon-Upstream-Status': String(r.status),
          },
        });
      }
      return respondFallback({ 'X-Pantheon-Upstream-Status': String(r.status) });
    }
    cache.set(cacheKey, { body: text, fetchedAt: now, upstreamStatus: r.status });
    return new Response(text, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'X-Pantheon-Cache': 'MISS',
        'X-Pantheon-Upstream-Status': String(r.status),
      },
    });
  } catch (e) {
    if (hit) {
      return new Response(hit.body, {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'X-Pantheon-Cache': 'STALE',
          'X-Pantheon-Cache-Age': String(Math.floor((now - hit.fetchedAt) / 1000)),
          'X-Pantheon-Upstream-Status': 'ERR',
        },
      });
    }
    return respondFallback({ 'X-Pantheon-Error': (e as Error).message.slice(0, 120) });
  }
});
