import { supabase } from '@/integrations/supabase/client';
import { starSeeds, type StarSeedId } from '@/data/star-seeds';
import type { NatalChart, PlanetPosition, ZodiacSign } from '@/lib/star-seed-classifier';

export interface BirthPlace {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface ChartRequest {
  date: string;
  time: string;
  city: string;
}

const CURRENT_SKY_REQUEST = {
  date: '2026-06-01',
  time: '15:00',
  lat: 40.7128,
  lon: -74.006,
  tzOffsetMinutes: -240,
};

interface GeocodeApiResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface GeocodeApiResponse {
  results?: GeocodeApiResult[];
}

interface TimezoneApiResponse {
  utc_offset_seconds?: number;
}

interface NatalChartResponse {
  chart?: NatalChart;
  place?: BirthPlace;
  error?: string;
}

function isGeocodeApiResponse(value: unknown): value is GeocodeApiResponse {
  return typeof value === 'object' && value !== null;
}

function isTimezoneApiResponse(value: unknown): value is TimezoneApiResponse {
  return typeof value === 'object' && value !== null;
}

function isNatalChartResponse(value: unknown): value is NatalChartResponse {
  return typeof value === 'object' && value !== null;
}

const ZODIAC: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const LOCAL_PLACE_FALLBACKS: Record<string, BirthPlace> = {
  'los angeles': { name: 'Los Angeles', country: 'United States', latitude: 34.05223, longitude: -118.24368, timezone: 'America/Los_Angeles' },
  'new york': { name: 'New York', country: 'United States', latitude: 40.71427, longitude: -74.00597, timezone: 'America/New_York' },
  miami: { name: 'Miami', country: 'United States', latitude: 25.77427, longitude: -80.19366, timezone: 'America/New_York' },
  chicago: { name: 'Chicago', country: 'United States', latitude: 41.85003, longitude: -87.65005, timezone: 'America/Chicago' },
  london: { name: 'London', country: 'United Kingdom', latitude: 51.50853, longitude: -0.12574, timezone: 'Europe/London' },
  paris: { name: 'Paris', country: 'France', latitude: 48.85341, longitude: 2.3488, timezone: 'Europe/Paris' },
  tokyo: { name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.69171, timezone: 'Asia/Tokyo' },
};

function normalizeCity(city: string): string {
  return city.trim().toLowerCase().replace(/,.*$/, '').replace(/\s+/g, ' ');
}

function localBirthPlace(city: string): BirthPlace {
  const trimmed = city.trim();
  return LOCAL_PLACE_FALLBACKS[normalizeCity(trimmed)] ?? {
    name: trimmed || 'Unknown City',
    country: 'Earth',
    latitude: 0,
    longitude: 0,
    timezone: 'UTC',
  };
}

function hashSignal(input: string): number {
  return Array.from(input).reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0, 0);
}

function positionFromLongitude(longitude: number): PlanetPosition {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  return { longitude: normalized, sign: ZODIAC[signIndex], degree: normalized - signIndex * 30 };
}

function approximateNatalChart({ date, time, city }: ChartRequest, place: BirthPlace): NatalChart {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const birth = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const yearStart = Date.UTC(year, 0, 0);
  const dayOfYear = Math.floor((birth.getTime() - yearStart) / 86_400_000);
  const signal = Math.abs(hashSignal(`${date}|${time}|${city}|${place.latitude}|${place.longitude}`));
  const sun = ((dayOfYear - 80) * 0.985647 + 360) % 360;
  const minutes = hour * 60 + minute;

  return {
    sun: positionFromLongitude(sun),
    moon: positionFromLongitude(sun + 13.176 * (dayOfYear % 28) + (signal % 27)),
    mercury: positionFromLongitude(sun + ((signal % 50) - 25)),
    venus: positionFromLongitude(sun + ((signal % 90) - 45)),
    mars: positionFromLongitude(sun + 60 + (signal % 120)),
    jupiter: positionFromLongitude(sun + 120 + (signal % 90)),
    saturn: positionFromLongitude(sun + 180 + (signal % 70)),
    ascendant: positionFromLongitude(minutes / 4 + place.longitude + (signal % 30)),
  };
}

export async function resolveBirthPlace(city: string): Promise<BirthPlace> {
  const { data, error } = await supabase.functions.invoke('compute-natal-chart', {
    body: {
      date: '2000-01-01',
      time: '12:00',
      city,
      lookupOnly: true,
    },
  });

  if (error) throw new Error(error.message || 'City lookup failed. Try the closest major city.');
  if (!isNatalChartResponse(data) || !data.place) {
    throw new Error(`Could not locate "${city}". Try the nearest major city.`);
  }

  return data.place;
}

export async function resolveTimezoneOffsetMinutes(place: BirthPlace, date: string): Promise<number> {
  const timezoneOffset = new Date(`${date}T12:00:00Z`).getTimezoneOffset();
  void place;
  return -timezoneOffset;
}

export async function computeNatalChart({ date, time, city }: ChartRequest): Promise<{ chart: NatalChart; place: BirthPlace }> {
  try {
    const { data, error } = await supabase.functions.invoke('compute-natal-chart', {
      body: {
        date,
        time,
        city,
      },
    });

    if (error) throw new Error(error.message || 'Chart engine returned an error.');
    if (!isNatalChartResponse(data) || !data.chart || !data.place) {
      throw new Error('Chart engine returned an unreadable signal.');
    }

    return { chart: data.chart, place: data.place };
  } catch (err) {
    console.warn('[StarSeed] chart engine fallback', err);
    const place = localBirthPlace(city);
    return { chart: approximateNatalChart({ date, time, city }, place), place };
  }
}

export async function computeCurrentSkyChart(): Promise<NatalChart> {
  const { data, error } = await supabase.functions.invoke('compute-natal-chart', {
    body: CURRENT_SKY_REQUEST,
  });

  if (error) throw new Error(error.message || 'Current sky engine returned an error.');
  if (!isNatalChartResponse(data) || !data.chart) {
    throw new Error('Current sky engine returned an unreadable signal.');
  }

  return data.chart;
}

export async function getSavedStarSeed(): Promise<StarSeedId | null> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return null;

  const { data } = await supabase
    .from('observer_files')
    .select('starseed_archetype')
    .eq('user_id', uid)
    .maybeSingle();

  const seed = data?.starseed_archetype;
  return seed && seed in starSeeds ? (seed as StarSeedId) : null;
}

export async function saveStarSeed(seed: StarSeedId): Promise<'saved' | 'guest' | 'failed'> {
  const { data: userData } = await supabase.auth.getUser();
  const uid = userData.user?.id;
  if (!uid) return 'guest';

  // Upsert covers both the "trigger already created the row" and "row missing" cases.
  const { error } = await supabase
    .from('observer_files')
    .upsert(
      { user_id: uid, codename: 'Observer-0046', starseed_archetype: seed },
      { onConflict: 'user_id' },
    );

  if (error) {
    console.error('[saveStarSeed] failed', error);
    return 'failed';
  }
  return 'saved';
}
