/**
 * Centralized environment-variable accessor. Vite only inlines `import.meta.env.*`
 * when referenced statically, so all reads happen here.
 *
 * Add new VITE_ variables to `.env.example` and re-export them below.
 */

const raw = (key: string, fallback = ''): string => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v = (import.meta.env as any)?.[key];
  return typeof v === 'string' && v.length > 0 ? v : fallback;
};

/** Normalize build-time URL values before handing them to fetch or the Supabase SDK. */
export function normalizeBaseUrl(value: string): string {
  const compact = value.trim().replace(/\\s+/g, '');
  return compact.replace(/^(https?:)\\/+?/i, '$1//').replace(/\\/+$/, '');
}

export const env = {
  appEnv: raw('VITE_APP_ENV', import.meta.env.MODE),
  nasaApiKey: raw('VITE_NASA_API_KEY'),
  youtubeApiKey: raw('VITE_YOUTUBE_API_KEY'),
  noaaBaseUrl: raw('VITE_NOAA_BASE_URL', 'https://services.swpc.noaa.gov'),
  supabaseUrl: normalizeBaseUrl(raw('VITE_SUPABASE_URL')),
  supabasePublishableKey: raw('VITE_SUPABASE_PUBLISHABLE_KEY'),
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
    { key: 'nasaApiKey', required: false, present: !!env.nasaApiKey, description: 'NASA APIs (optional — proxy uses DEMO_KEY)' },
    { key: 'youtubeApiKey', required: false, present: !!env.youtubeApiKey, description: 'YouTube Data API (optional)' },
    { key: 'noaaBaseUrl', required: false, present: !!env.noaaBaseUrl, description: 'NOAA SWPC base URL' },
  ];
}
