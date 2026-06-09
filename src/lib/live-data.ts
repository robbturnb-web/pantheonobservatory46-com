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

export interface LiveResult<T> {
  ok: boolean;
  value: T | null;
  source: { label: string; url: string };
  fetchedAt: string;
  error?: string;
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
    const r = await fetch(USGS_SOURCE.url, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
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
      ok: true,
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
function kpStorm(k: number): KpReading['stormLevel'] {
  if (k < 3) return 'Quiet';
  if (k < 4) return 'Unsettled';
  if (k < 5) return 'Active';
  if (k < 6) return 'Minor Storm';
  if (k < 7) return 'Moderate Storm';
  if (k < 8) return 'Strong Storm';
  if (k < 9) return 'Severe Storm';
  return 'Extreme Storm';
}
export async function fetchKp(): Promise<LiveResult<KpReading>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await fetch(KP_SOURCE.url, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const arr = await r.json();
    const last = arr?.[arr.length - 1];
    if (!last) throw new Error('empty feed');
    const kp = Number(last.kp_index ?? last.estimated_kp ?? last.kp);
    if (!Number.isFinite(kp)) throw new Error('no Kp value');
    return {
      ok: true,
      source: KP_SOURCE,
      fetchedAt,
      value: { kp, stormLevel: kpStorm(kp), observedAt: last.time_tag ?? fetchedAt },
    };
  } catch (e: any) {
    return { ok: false, source: KP_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
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
function fluxToClass(flux: number): string {
  if (!Number.isFinite(flux) || flux <= 0) return 'A0.0';
  if (flux >= 1e-4) return `X${(flux / 1e-4).toFixed(1)}`;
  if (flux >= 1e-5) return `M${(flux / 1e-5).toFixed(1)}`;
  if (flux >= 1e-6) return `C${(flux / 1e-6).toFixed(1)}`;
  if (flux >= 1e-7) return `B${(flux / 1e-7).toFixed(1)}`;
  return `A${(flux / 1e-8).toFixed(1)}`;
}
export async function fetchFlare(): Promise<LiveResult<FlareReading>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await fetch(FLARE_SOURCE.url, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const arr = await r.json();
    // Short channel (0.05-0.4 nm) is the flare-class channel
    const shortWave = (arr ?? []).filter((d: any) => d.energy === '0.05-0.4nm');
    const last = shortWave[shortWave.length - 1];
    if (!last) throw new Error('no flare data');
    const flux = Number(last.flux);
    return {
      ok: true,
      source: FLARE_SOURCE,
      fetchedAt,
      value: { class: fluxToClass(flux), flux, observedAt: last.time_tag ?? fetchedAt },
    };
  } catch (e: any) {
    return { ok: false, source: FLARE_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
}

/* ─────────── NOAA solar wind speed (latest reading) ─────────── */
const WIND_SOURCE = {
  label: 'NOAA SWPC · Solar Wind',
  url: 'https://services.swpc.noaa.gov/products/summary/solar-wind-speed.json',
};
export interface WindReading { speedKmS: number; observedAt: string }
export async function fetchSolarWind(): Promise<LiveResult<WindReading>> {
  const fetchedAt = new Date().toISOString();
  try {
    const r = await fetch(WIND_SOURCE.url, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const json = await r.json();
    const speed = Number(json.WindSpeed);
    if (!Number.isFinite(speed)) throw new Error('no wind speed');
    return {
      ok: true,
      source: WIND_SOURCE,
      fetchedAt,
      value: { speedKmS: speed, observedAt: json.TimeStamp ?? fetchedAt },
    };
  } catch (e: any) {
    return { ok: false, source: WIND_SOURCE, fetchedAt, value: null, error: e?.message ?? 'fetch failed' };
  }
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
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period`;
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const json = await r.json();
    const c = json.current;
    if (!c) throw new Error('no marine current');
    return {
      ok: true,
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

/* ─────────── helpers ─────────── */
export function timeAgo(iso: string): string {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return `${Math.floor(d)}s ago`;
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  return `${Math.floor(d / 86400)}d ago`;
}
