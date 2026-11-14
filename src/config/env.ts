/**
 * Centralized environment-variable accessor.
 *
 * IMPORTANT: Vite replaces import.meta.env variables at build time. Every
 * custom variable must be referenced with its full static property name.
 * Dynamic access such as import.meta.env[key] is not replaced in production.
 *
 * Add new VITE_ variables to .env.example and expose them here.
 */

const valueOrFallback = (value: string | undefined, fallback = ''): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback;

/** Normalize build-time URL values before handing them to fetch or the Supabase SDK. */
export function normalizeBaseUrl(value: string): string {
  const compact = value.trim().replace(/\\s+/g, '');
  return compact.replace(/^(https?:)\\/+/i, '$1//').replace(/\\/+$/, '');
}

export const env = {
  appEnv: valueOrFallback(import.meta.env.VITE_APP_ENV, import.meta.env.MODE),
  nasaApiKey: valueOrFallback(import.meta.env.VITE_NASA_API_KEY),
  youtubeApiKey: valueOrFallback(import.meta.env.VITE_YOUTUBE_API_KEY),
  noaaBaseUrl: valueOrFallback(import.meta.env.VITE_NOAA_BASE_URL, 'https://services.swpc.noaa.gov'),
  supabaseUrl: normalizeBaseUrl(valueOrFallback(import.meta.env.VITE_SUPABASE_URL)),
  supabasePublishableKey: valueOrFallback(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY),
  supabaseProjectId: valueOrFallback(import.meta.env.VITE_SUPABASE_PROJECT_ID),
} as const;

export interface EnvHealthItem {
  key: keyof typeof env;
  required: boolean;
  present: boolean;
  description: string;
}

export function envHealth(): EnvHealthItem[] {
  return [
    { key: 'supabaseUrl', required: true, present: !!env.supabaseUrl, description: 'Lovable Cloud (Supabase) URL' },
    { key: 'supabasePublishableKey', required: true, present: !!env.supabasePublishableKey, description: 'Lovable Cloud publishable key' },
    { key: 'supabaseProjectId', required: true, present: !!env.supabaseProjectId, description: 'Lovable Cloud project ID' },
    { key: 'nasaApiKey', required: false, present: !!env.nasaApiKey, description: 'NASA APIs (optional — proxy uses DEMO_KEY)' },
    { key: 'youtubeApiKey', required: false, present: !!env.youtubeApiKey, description: 'YouTube Data API (optional)' },
    { key: 'noaaBaseUrl', required: false, present: !!env.noaaBaseUrl, description: 'NOAA SWPC base URL' },
  ];
}
