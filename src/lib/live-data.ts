/**
 * live-data.ts — Real-time public-API fetchers for the Pantheon dashboard.
 *
 * All endpoints below are CORS-enabled and require no API key.
 *  - USGS earthquakes:        earthquake.usgs.gov  (public GeoJSON)
 *  - NOAA SWPC Kp + X-ray:    services.swpc.noaa.gov  (public JSON)
 *  - NOAA solar wind:         services.swpc.noaa.gov
 *  - Open-Meteo marine:       marine-api.open-meteo.com  (no key)
 *  - Moon phase:              computed locally (no network)
 *
 * Every fetcher returns { ok, value, source, fetchedAt, error? } so the UI
 * can render a real "Source · Updated · Refresh" footer or a clearly
 * labelled "Source unavailable" state when an upstream fails.
 */

const PROXY_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-data-proxy`;
const PROXY_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

/**
 * Fetch a whitelisted upstream source via the Pantheon edge proxy.
 * The proxy adds 15-minute server-side caching, serves stale on upstream
 * failure, and bypasses browser-side CORS/CSP/network blocks. Cache state
 * is read from `X-Pantheon-Cache` (HIT|MISS|STALE) and exposed on the
 * returned Response as `.proxyMeta` so each fetcher can mark its result
 * as fresh / cached / stale and surface a real "last successful fetch".
 */
export interface ProxyMeta {
  /** true when proxy served cached data because upstream just failed */
  stale: boolean;
  /** age of the cached payload in seconds, when HIT or STALE */
  cacheAge: number | null;
  /** ISO timestamp of the last successful upstream fetch (when known) */
  lastSuccessAt: string | null;
}
type ProxyResponse = Response & { proxyMeta: ProxyMeta };

async function proxyFetch(source: string, params: Record<string, string> = {}): Promise<ProxyResponse> {
  const q = new URLSearchParams({ source, ...params });
  const res = (await fetch(`${PROXY_BASE}?${q.toString()}`, {
    headers: { apikey: PROXY_KEY, Authorization: `Bearer ${PROXY_KEY}` },
  })) as ProxyResponse;
  const cache = res.headers.get('X-Pantheon-Cache');
  const ageStr = res.headers.get('X-Pantheon-Cache-Age');
  const age = ageStr != null ? Number(ageStr) : NaN;
  const cached = cache === 'HIT' || cache === 'STALE';
  res.proxyMeta = {
    stale: cache === 'STALE',
    cacheAge: cached && Number.isFinite(age) ? age : null,
    lastSuccessAt:
      cached && Number.isFinite(age)
        ? new Date(Date.now() - age * 1000).toISOString()
        : cache === 'MISS'
          ? new Date().toISOString()
          : null,
  };
  return res;
}

export interface LiveResult<T> {
  ok: boolean;
  value: T | null;
  source: { label: string; url: string };
  fetchedAt: string;
  error?: string;
  /** true if data was served from the proxy cache after upstream failed */
  stale?: boolean;
  /** age of cached payload in seconds, when proxy served cached data */
  cacheAge?: number | null;
  /** ISO of last verified upstream success (defaults to fetchedAt on MISS) */
  lastSuccessAt?: string | null;
  /** true when upstream failed and we are showing the last verified reading */
  degraded?: boolean;
}

/**
 * Raw gateway read for non-hook consumers (3D globe layers).
 * Always goes through the Pantheon Data Gateway — never the upstream directly.
 */
export async function fetchGatewayJson<T = any>(
  source: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  try {
    const r = await proxyFetch(source, params);
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}



/* ─────────── USGS earthquakes (last 24h, all magnitudes) ─────────── */
export interface QuakeFeature {
  id: string;
  mag: number;
  place: string;
  time: number;
  url: string;
  coords: [number, number]; // [lon, lat]
}
export interface QuakeSummary {
  count24h: number;
  highest: QuakeFeature | null;
  latest: QuakeFeature[];
}

const USGS_SOURCE = {
  label: 'USGS Earthquake Feed',
  url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
};

export async function fetchEarthquakes(): Promise<LiveResult<QuakeSummary>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await proxyFetch('earthquakes');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const __m = r.proxyMeta;
    const json = await r.json();
    const features: QuakeFeature[] = (json.features ?? [])
      .filter((f: any) => typeof f?.properties?.mag === 'number')
      .map((f: any) => ({
        id: f.id,
        mag: f.properties.mag,
        place: f.properties.place ?? 'Unknown region',
        time: f.properties.time,
        url: f.properties.url,
        coords: [f.geometry.coordinates[0], f.geometry.coordinates[1]],
      }));
    features.sort((a, b) => b.time - a.time);
    const highest = features.slice().sort((a, b) => b.mag - a.mag)[0] ?? null;
    return {
      ok: true, ...__m,
      source: USGS_SOURCE,
      fetchedAt,
      value: { count24h: features.length, highest, latest: features.slice(0, 8) },
    };
  } catch (e: any) {
    return { ok: false, source: USGS_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

/* ─────────── NOAA SWPC planetary Kp index (latest minute) ─────────── */
const KP_SOURCE = {
  label: 'NOAA SWPC · Planetary K-index',
  url: 'https://services.swpc.noaa.gov/json/planetary_k_index_1m.json',
};
export interface KpReading {
  kp: number;
  stormLevel: 'Quiet' | 'Unsettled' | 'Active' | 'Minor Storm' | 'Moderate Storm' | 'Strong Storm' | 'Severe Storm' | 'Extreme Storm';
  observedAt: string;
}
/* ─────────── Normalized NOAA space-weather gateway route ───────────
 * One gateway call (`?source=space-weather`) returns Pantheon-owned shapes for
 * Kp, X-ray flare, solar wind and SWPC alerts. Upstream payload changes are
 * absorbed server-side, so the frontend never parses NOAA JSON again. */
interface FeedEnvelope<T> {
  ok: boolean;
  value: T | null;
  error?: string;
  cacheState?: string;
  cacheAge?: number | null;
  upstreamStatus?: string;
}
interface SpaceWeatherPayload {
  generatedAt: string;
  kp: FeedEnvelope<KpReading>;
  flare: FeedEnvelope<FlareReading>;
  solarwind: FeedEnvelope<WindReading>;
  alerts: FeedEnvelope<SwpcAlert[]>;
}

let swCache: { at: number; promise: Promise<SpaceWeatherPayload> } | null = null;
const SW_MEMO_MS = 30_000;

function fetchSpaceWeather(): Promise<SpaceWeatherPayload> {
  if (swCache && Date.now() - swCache.at < SW_MEMO_MS) return swCache.promise;
  const promise = (async () => {
    let res: Response;
    try {
      res = await fetch(`${PROXY_BASE}?source=space-weather`, {
        headers: { apikey: PROXY_KEY, Authorization: `Bearer ${PROXY_KEY}` },
        signal: AbortSignal.timeout(20_000),
      });
    } catch (e: any) {
      throw new Error(
        e?.name === 'TimeoutError'
          ? 'Data gateway timed out after 20s'
          : 'Data gateway unreachable — backend may be paused or offline',
      );
    }
    if (!res.ok) {
      const paused = [402, 503, 504, 540, 544].includes(res.status);
      throw new Error(paused ? `Backend paused or unavailable (HTTP ${res.status})` : `Data gateway error (HTTP ${res.status})`);
    }
    return (await res.json()) as SpaceWeatherPayload;
  })();
  swCache = { at: Date.now(), promise };
  promise.catch(() => {
    swCache = null;
  });
  return promise;
}

function envelopeToResult<T>(
  feed: FeedEnvelope<T> | undefined,
  source: { label: string; url: string },
  fetchedAt: string,
): LiveResult<T> {
  if (!feed || !feed.ok || feed.value == null) {
    return { ok: false, source, fetchedAt, value: null, error: feed?.error ?? 'feed unavailable' };
  }
  const cached = feed.cacheState === 'HIT' || feed.cacheState === 'STALE';
  const age = typeof feed.cacheAge === 'number' ? feed.cacheAge : null;
  return {
    ok: true,
    source,
    fetchedAt,
    value: feed.value,
    stale: feed.cacheState === 'STALE',
    cacheAge: cached ? age : null,
    lastSuccessAt:
      cached && age != null ? new Date(Date.now() - age * 1000).toISOString() : fetchedAt,
  };
}

async function spaceWeatherFeed<T>(
  key: 'kp' | 'flare' | 'solarwind' | 'alerts',
  source: { label: string; url: string },
): Promise<LiveResult<T>> {
  const fetchedAt = new Date().toISOString();
  try {
    const payload = await fetchSpaceWeather();
    return envelopeToResult<T>(payload[key] as FeedEnvelope<T>, source, fetchedAt);
  } catch (e: any) {
    return { ok: false, source, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

export function fetchKp(): Promise<LiveResult<KpReading>> {
  return spaceWeatherFeed<KpReading>('kp', KP_SOURCE);
}


/* ─────────── NOAA SWPC GOES X-ray flares (last 24h) ─────────── */
const FLARE_SOURCE = {
  label: 'NOAA SWPC · GOES X-ray Flux',
  url: 'https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json',
};
export interface FlareReading {
  /** e.g. "M2.4" or "C1.1" or "A9.0" — derived from current short-wave flux */
  class: string;
  flux: number;
  observedAt: string;
}
export function fetchFlare(): Promise<LiveResult<FlareReading>> {
  return spaceWeatherFeed<FlareReading>('flare', FLARE_SOURCE);
}

/* ─────────── NOAA solar wind speed (latest reading) ─────────── */
const WIND_SOURCE = {
  label: 'NOAA SWPC · Solar Wind',
  url: 'https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json',
};
export interface WindReading { speedKmS: number; observedAt: string }
export function fetchSolarWind(): Promise<LiveResult<WindReading>> {
  return spaceWeatherFeed<WindReading>('solarwind', WIND_SOURCE);
}

/* ─────────── Open-Meteo marine (Pacific reference point) ─────────── */
const MARINE_SOURCE = {
  label: 'Open-Meteo Marine API',
  url: 'https://marine-api.open-meteo.com/',
};
export interface MarineReading {
  waveHeightM: number;
  waveDirectionDeg: number;
  wavePeriodS: number;
  lat: number;
  lon: number;
  observedAt: string;
}
export async function fetchMarine(
  lat = 36.6,
  lon = -122.0, // off Monterey, CA — busy Pacific corridor
): Promise<LiveResult<MarineReading>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await proxyFetch('marine', { lat: String(lat), lon: String(lon) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const __m = r.proxyMeta;
    const json = await r.json();
    const c = json.current;
    if (!c) throw new Error('no marine current');
    return {
      ok: true, ...__m,
      source: MARINE_SOURCE,
      fetchedAt,
      value: {
        waveHeightM: Number(c.wave_height),
        waveDirectionDeg: Number(c.wave_direction),
        wavePeriodS: Number(c.wave_period),
        lat,
        lon,
        observedAt: c.time ?? fetchedAt,
      },
    };
  } catch (e: any) {
    return { ok: false, source: MARINE_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

/* ─────────── Moon phase (computed locally, no network) ─────────── */
const MOON_SOURCE = {
  label: 'Computed · Synodic Cycle',
  url: 'https://en.wikipedia.org/wiki/Lunar_phase',
};
export interface MoonReading {
  phaseName: string;
  illumination: number; // 0..1
  ageDays: number;
  nextFullMoon: string; // ISO
  nextNewMoon: string; // ISO
}
const SYNODIC = 29.530588853;
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0); // 2000-01-06 18:14 UTC
function phaseAt(date = new Date()): MoonReading {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86_400_000;
  const age = ((days % SYNODIC) + SYNODIC) % SYNODIC;
  const illumination = 0.5 * (1 - Math.cos((2 * Math.PI * age) / SYNODIC));
  let name = 'New Moon';
  if (age < 1.84566) name = 'New Moon';
  else if (age < 5.53699) name = 'Waxing Crescent';
  else if (age < 9.22831) name = 'First Quarter';
  else if (age < 12.91963) name = 'Waxing Gibbous';
  else if (age < 16.61096) name = 'Full Moon';
  else if (age < 20.30228) name = 'Waning Gibbous';
  else if (age < 23.99361) name = 'Last Quarter';
  else if (age < 27.68493) name = 'Waning Crescent';
  else name = 'New Moon';
  const daysToFull = (SYNODIC / 2 - age + SYNODIC) % SYNODIC;
  const daysToNew = (SYNODIC - age) % SYNODIC;
  return {
    phaseName: name,
    illumination,
    ageDays: age,
    nextFullMoon: new Date(date.getTime() + daysToFull * 86_400_000).toISOString(),
    nextNewMoon: new Date(date.getTime() + daysToNew * 86_400_000).toISOString(),
  };
}
export async function fetchMoon(): Promise<LiveResult<MoonReading>> {
  const fetchedAt = new Date().toISOString();
  return { ok: true, source: MOON_SOURCE, fetchedAt, value: phaseAt(new Date()) };
}

/* ─────────── NASA DONKI · CME · FLR · GST (last 7 days) ─────────── */
const DONKI_KEY = 'DEMO_KEY'; // rate-limited (30/h, 50/day); swap for api.nasa.gov key later

function isoDaysAgo(n: number) {
  return new Date(Date.now() - n * 86_400_000).toISOString().slice(0, 10);
}

export interface CmeEvent {
  id: string;
  startTime: string;
  speedKmS: number | null;
  type: string | null;
  note: string;
  link: string;
}
const CME_SOURCE = {
  label: 'NASA DONKI · Coronal Mass Ejections',
  url: 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/',
};
export interface CmeSummary { count7d: number; latest: CmeEvent[]; fastest: CmeEvent | null }
export async function fetchCMEs(): Promise<LiveResult<CmeSummary>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await proxyFetch('cme');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const __m = r.proxyMeta;
    const arr = await r.json();
    const events: CmeEvent[] = (arr ?? []).map((e: any) => {
      const analysis = Array.isArray(e.cmeAnalyses) && e.cmeAnalyses.length ? e.cmeAnalyses[0] : null;
      return {
        id: e.activityID,
        startTime: e.startTime,
        speedKmS: analysis?.speed ?? null,
        type: analysis?.type ?? null,
        note: (e.note ?? '').slice(0, 220),
        link: e.link ?? 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/',
      };
    });
    events.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    const fastest = events
      .filter((e) => Number.isFinite(e.speedKmS as number))
      .sort((a, b) => (b.speedKmS ?? 0) - (a.speedKmS ?? 0))[0] ?? null;
    return { ok: true, ...__m, source: CME_SOURCE, fetchedAt, value: { count7d: events.length, latest: events.slice(0, 6), fastest } };
  } catch (e: any) {
    return { ok: false, source: CME_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

export interface FlareEvent {
  id: string;
  class: string;
  beginTime: string;
  peakTime: string | null;
  sourceLocation: string | null;
  activeRegion: string | null;
  link: string;
}
const FLR_SOURCE = {
  label: 'NASA DONKI · Solar Flare Events',
  url: 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/',
};
export interface FlareEventSummary { count7d: number; strongest: FlareEvent | null; latest: FlareEvent[] }
function flareClassRank(c: string): number {
  const letter = c?.charAt(0)?.toUpperCase() ?? 'A';
  const mag = parseFloat(c?.slice(1)) || 0;
  const base = ({ A: 0, B: 1, C: 2, M: 3, X: 4 } as Record<string, number>)[letter] ?? 0;
  return base * 10 + Math.min(mag, 9.9);
}
export async function fetchFlareEvents(): Promise<LiveResult<FlareEventSummary>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await proxyFetch('flr');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const __m = r.proxyMeta;
    const arr = await r.json();
    const events: FlareEvent[] = (arr ?? []).map((e: any) => ({
      id: e.flrID,
      class: e.classType ?? '—',
      beginTime: e.beginTime,
      peakTime: e.peakTime ?? null,
      sourceLocation: e.sourceLocation ?? null,
      activeRegion: e.activeRegionNum ? `AR${e.activeRegionNum}` : null,
      link: e.link ?? 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/',
    }));
    events.sort((a, b) => new Date(b.beginTime).getTime() - new Date(a.beginTime).getTime());
    const strongest = events.slice().sort((a, b) => flareClassRank(b.class) - flareClassRank(a.class))[0] ?? null;
    return { ok: true, ...__m, source: FLR_SOURCE, fetchedAt, value: { count7d: events.length, strongest, latest: events.slice(0, 6) } };
  } catch (e: any) {
    return { ok: false, source: FLR_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

export interface GstEvent {
  id: string;
  startTime: string;
  maxKp: number | null;
  link: string;
}
const GST_SOURCE = {
  label: 'NASA DONKI · Geomagnetic Storms',
  url: 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/',
};
export interface GstSummary { count7d: number; latest: GstEvent[]; strongest: GstEvent | null }
export async function fetchGSTs(): Promise<LiveResult<GstSummary>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await proxyFetch('gst');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const __m = r.proxyMeta;
    const arr = await r.json();
    const events: GstEvent[] = (arr ?? []).map((e: any) => {
      const maxKp = Array.isArray(e.allKpIndex) && e.allKpIndex.length
        ? Math.max(...e.allKpIndex.map((k: any) => Number(k.kpIndex) || 0))
        : null;
      return {
        id: e.gstID,
        startTime: e.startTime,
        maxKp,
        link: e.link ?? 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/',
      };
    });
    events.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    const strongest = events.slice().sort((a, b) => (b.maxKp ?? 0) - (a.maxKp ?? 0))[0] ?? null;
    return { ok: true, ...__m, source: GST_SOURCE, fetchedAt, value: { count7d: events.length, latest: events.slice(0, 6), strongest } };
  } catch (e: any) {
    return { ok: false, source: GST_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

/* ─────────── NOAA SWPC active alerts (last 24h) ─────────── */
const SWPC_ALERT_SOURCE = {
  label: 'NOAA SWPC · Space Weather Alerts',
  url: 'https://services.swpc.noaa.gov/products/alerts.json',
};
export interface SwpcAlert {
  serial: string;
  issued: string;
  message: string;
  productId: string;
}
export function fetchSwpcAlerts(): Promise<LiveResult<SwpcAlert[]>> {
  return spaceWeatherFeed<SwpcAlert[]>('alerts', SWPC_ALERT_SOURCE);
}

/* ─────────── ISS live position (Where The ISS At?) ─────────── */
const ISS_SOURCE = {
  label: 'Where The ISS At? · Live ISS Telemetry',
  url: 'https://wheretheiss.at/',
};
export interface IssReading {
  latitude: number;
  longitude: number;
  altitudeKm: number;
  velocityKmH: number;
  visibility: string;
  observedAt: string; // ISO
}
export async function fetchISS(): Promise<LiveResult<IssReading>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await proxyFetch('iss');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const __m = r.proxyMeta;
    const json = await r.json();
    if (!Number.isFinite(json?.latitude)) throw new Error('no telemetry');
    return {
      ok: true, ...__m,
      source: ISS_SOURCE,
      fetchedAt,
      value: {
        latitude: Number(json.latitude),
        longitude: Number(json.longitude),
        altitudeKm: Number(json.altitude),
        velocityKmH: Number(json.velocity),
        visibility: String(json.visibility ?? 'unknown'),
        observedAt: new Date((Number(json.timestamp) || Date.now() / 1000) * 1000).toISOString(),
      },
    };
  } catch (e: any) {
    return { ok: false, source: ISS_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

/* ─────────── Lunar calendar (next 4 principal phases, computed) ─────────── */
const LUNAR_CAL_SOURCE = {
  label: 'Computed · Synodic Cycle (NASA reference epoch)',
  url: 'https://svs.gsfc.nasa.gov/Gallery/moonphase.html',
};
export interface LunarPhaseEvent {
  phase: 'New Moon' | 'First Quarter' | 'Full Moon' | 'Last Quarter';
  iso: string;
}
export interface LunarCalendar {
  current: MoonReading;
  upcoming: LunarPhaseEvent[]; // next 4 principal phases, chronological
}
function nextPhaseAfter(date: Date, targetAge: number): Date {
  // Solve: ((date+Δ - epoch) / day) mod SYNODIC == targetAge
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86_400_000;
  const age = ((days % SYNODIC) + SYNODIC) % SYNODIC;
  const delta = (targetAge - age + SYNODIC) % SYNODIC;
  return new Date(date.getTime() + delta * 86_400_000);
}
export async function fetchLunarCalendar(): Promise<LiveResult<LunarCalendar>> {
  const fetchedAt = new Date().toISOString();
  const now = new Date();
  const current = phaseAt(now);
  const targets: { phase: LunarPhaseEvent['phase']; age: number }[] = [
    { phase: 'New Moon', age: 0 },
    { phase: 'First Quarter', age: SYNODIC * 0.25 },
    { phase: 'Full Moon', age: SYNODIC * 0.5 },
    { phase: 'Last Quarter', age: SYNODIC * 0.75 },
  ];
  const upcoming = targets
    .map((t) => ({ phase: t.phase, iso: nextPhaseAfter(now, t.age).toISOString() }))
    .sort((a, b) => new Date(a.iso).getTime() - new Date(b.iso).getTime());
  return { ok: true, source: LUNAR_CAL_SOURCE, fetchedAt, value: { current, upcoming } };
}

/* ─────────── Meteor showers (IMO published calendar 2026) ─────────── */
const METEOR_SOURCE = {
  label: 'IMO · Published Annual Meteor Shower Calendar',
  url: 'https://www.imo.net/files/meteor-shower/cal2026.pdf',
};
export interface MeteorShower {
  code: string;
  name: string;
  peakIso: string; // peak date (UTC midnight reference)
  activeFrom: string;
  activeTo: string;
  zhr: number; // zenithal hourly rate at peak
  parent: string; // parent body
}
// Source: International Meteor Organization 2026 calendar (imo.net). ZHR is
// the published estimate, not a live measurement.
const METEOR_SHOWERS_2026: MeteorShower[] = [
  { code: 'QUA', name: 'Quadrantids',          peakIso: '2026-01-03', activeFrom: '2025-12-26', activeTo: '2026-01-12', zhr: 120, parent: '2003 EH1' },
  { code: 'LYR', name: 'Lyrids',               peakIso: '2026-04-22', activeFrom: '2026-04-14', activeTo: '2026-04-30', zhr: 18,  parent: 'C/1861 G1 Thatcher' },
  { code: 'ETA', name: 'Eta Aquariids',        peakIso: '2026-05-06', activeFrom: '2026-04-19', activeTo: '2026-05-28', zhr: 50,  parent: '1P/Halley' },
  { code: 'SDA', name: 'Southern δ Aquariids', peakIso: '2026-07-30', activeFrom: '2026-07-12', activeTo: '2026-08-23', zhr: 25,  parent: '96P/Machholz' },
  { code: 'PER', name: 'Perseids',             peakIso: '2026-08-12', activeFrom: '2026-07-17', activeTo: '2026-08-24', zhr: 100, parent: '109P/Swift-Tuttle' },
  { code: 'DRA', name: 'Draconids',            peakIso: '2026-10-08', activeFrom: '2026-10-06', activeTo: '2026-10-10', zhr: 10,  parent: '21P/Giacobini-Zinner' },
  { code: 'ORI', name: 'Orionids',             peakIso: '2026-10-21', activeFrom: '2026-10-02', activeTo: '2026-11-07', zhr: 20,  parent: '1P/Halley' },
  { code: 'LEO', name: 'Leonids',              peakIso: '2026-11-17', activeFrom: '2026-11-06', activeTo: '2026-11-30', zhr: 15,  parent: '55P/Tempel-Tuttle' },
  { code: 'GEM', name: 'Geminids',             peakIso: '2026-12-14', activeFrom: '2026-12-04', activeTo: '2026-12-20', zhr: 150, parent: '3200 Phaethon' },
  { code: 'URS', name: 'Ursids',               peakIso: '2026-12-22', activeFrom: '2026-12-17', activeTo: '2026-12-26', zhr: 10,  parent: '8P/Tuttle' },
];
export interface MeteorSummary {
  active: MeteorShower[];
  upcoming: MeteorShower[];
  next: MeteorShower | null;
}
export async function fetchMeteorShowers(): Promise<LiveResult<MeteorSummary>> {
  const fetchedAt = new Date().toISOString();
  const now = Date.now();
  const active = METEOR_SHOWERS_2026.filter((s) => {
    const a = Date.parse(s.activeFrom);
    const b = Date.parse(s.activeTo) + 86_400_000;
    return now >= a && now <= b;
  });
  const upcoming = METEOR_SHOWERS_2026
    .filter((s) => Date.parse(s.peakIso) >= now)
    .sort((a, b) => Date.parse(a.peakIso) - Date.parse(b.peakIso))
    .slice(0, 5);
  return {
    ok: true,
    source: METEOR_SOURCE,
    fetchedAt,
    value: { active, upcoming, next: upcoming[0] ?? null },
  };
}

/* ─────────── NWS active severe / extreme weather alerts (US) ─────────── */
const NWS_SOURCE = {
  label: 'NOAA NWS · Active Severe/Extreme Alerts',
  url: 'https://api.weather.gov/alerts/active',
};
export type NwsCategory =
  | 'Tropical'
  | 'Tornado'
  | 'Thunderstorm'
  | 'Flood'
  | 'Winter'
  | 'Fire'
  | 'Heat'
  | 'Other';
export interface NwsAlert {
  id: string;
  event: string;
  severity: string;
  area: string;
  headline: string;
  sent: string;
  category: NwsCategory;
  url: string;
}
function classifyNws(event: string): NwsCategory {
  const e = event.toLowerCase();
  if (e.includes('hurricane') || e.includes('tropical') || e.includes('storm surge') || e.includes('typhoon')) return 'Tropical';
  if (e.includes('tornado')) return 'Tornado';
  if (e.includes('thunderstorm')) return 'Thunderstorm';
  if (e.includes('flood') || e.includes('flash flood')) return 'Flood';
  if (e.includes('winter') || e.includes('blizzard') || e.includes('ice') || e.includes('snow')) return 'Winter';
  if (e.includes('fire') || e.includes('red flag')) return 'Fire';
  if (e.includes('heat')) return 'Heat';
  return 'Other';
}
export interface NwsSummary {
  total: number;
  byCategory: Record<NwsCategory, number>;
  latest: NwsAlert[];
}
export async function fetchNwsAlerts(): Promise<LiveResult<NwsSummary>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await proxyFetch('nws');
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const __m = r.proxyMeta;
    const json = await r.json();
    const features = (json?.features ?? []) as any[];
    const alerts: NwsAlert[] = features
      .map((f) => {
        const p = f?.properties ?? {};
        return {
          id: String(f.id ?? p.id ?? Math.random()),
          event: String(p.event ?? 'Alert'),
          severity: String(p.severity ?? 'Unknown'),
          area: String(p.areaDesc ?? '').split(';')[0].trim(),
          headline: String(p.headline ?? p.event ?? '').slice(0, 200),
          sent: String(p.sent ?? p.effective ?? fetchedAt),
          category: classifyNws(String(p.event ?? '')),
          url: String(p.uri ?? p['@id'] ?? 'https://www.weather.gov/'),
        } as NwsAlert;
      })
      .sort((a, b) => new Date(b.sent).getTime() - new Date(a.sent).getTime());
    const byCategory: Record<NwsCategory, number> = {
      Tropical: 0, Tornado: 0, Thunderstorm: 0, Flood: 0, Winter: 0, Fire: 0, Heat: 0, Other: 0,
    };
    for (const a of alerts) byCategory[a.category] += 1;
    return {
      ok: true, ...__m,
      source: NWS_SOURCE,
      fetchedAt,
      value: { total: alerts.length, byCategory, latest: alerts.slice(0, 10) },
    };
  } catch (e: any) {
    return { ok: false, source: NWS_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}



/* ─────────── helpers ─────────── */
export function timeAgo(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return `${Math.floor(d)}s ago`;
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}
