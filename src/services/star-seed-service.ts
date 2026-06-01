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
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city,
  )}&count=1&language=en&format=json`;

  const geoResp = await fetch(geoUrl);
  if (!geoResp.ok) throw new Error('City lookup failed. Try the closest major city.');

  const geoJson: unknown = await geoResp.json();
  if (!isGeocodeApiResponse(geoJson)) throw new Error('City lookup returned an unreadable signal.');

  const place = geoJson.results?.[0];
  if (!place) throw new Error(`Could not locate "${city}". Try the nearest major city.`);

  return place;
}

export async function resolveTimezoneOffsetMinutes(place: BirthPlace, date: string): Promise<number> {
  const tzUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&timezone=${encodeURIComponent(
    place.timezone,
  )}&start_date=${date}&end_date=${date}&hourly=temperature_2m`;

  const tzResp = await fetch(tzUrl);
  if (!tzResp.ok) return 0;

  const tzJson: unknown = await tzResp.json();
  if (!isTimezoneApiResponse(tzJson)) return 0;

  return Math.round((tzJson.utc_offset_seconds ?? 0) / 60);
}

export async function computeNatalChart({ date, time, city }: ChartRequest): Promise<{ chart: NatalChart; place: BirthPlace }> {
  const place = await resolveBirthPlace(city);
  const tzOffsetMinutes = await resolveTimezoneOffsetMinutes(place, date);

  const { data, error } = await supabase.functions.invoke('compute-natal-chart', {
    body: {
      date,
      time,
      lat: place.latitude,
      lon: place.longitude,
      tzOffsetMinutes,
    },
  });

  if (error) throw new Error(error.message || 'Chart engine returned an error.');
  if (!isNatalChartResponse(data) || !data.chart) {
    throw new Error('Chart engine returned an unreadable signal.');
  }

  return { chart: data.chart, place };
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

  const { data: updated, error: updateError } = await supabase
    .from('observer_files')
    .update({ starseed_archetype: seed })
    .eq('user_id', uid)
    .select('user_id')
    .maybeSingle();

  if (updateError) return 'failed';
  if (updated) return 'saved';

  const { error } = await supabase
    .from('observer_files')
    .insert({ user_id: uid, codename: 'Observer-0046', starseed_archetype: seed });

  return error ? 'failed' : 'saved';
}