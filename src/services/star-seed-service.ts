import { supabase } from '@/integrations/supabase/client';
import { starSeeds, type StarSeedId } from '@/data/star-seeds';
import type { NatalChart } from '@/lib/star-seed-classifier';

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
