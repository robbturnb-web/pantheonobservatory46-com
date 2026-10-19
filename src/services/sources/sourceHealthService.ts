/**
 * sourceHealthService — user-reported link health and verification status.
 *
 * Browser apps cannot reliably check arbitrary external URLs because of CORS.
 * Actual URL and YouTube availability checks must run server-side (for example
 * in a Supabase Edge Function or scheduled GitHub Action) and persist results.
 *
 * Until that backend is configured, verification functions return an explicit
 * "unknown / not verified" result. They must never report success without
 * making a real check.
 */

const STORAGE_KEY = 'pantheon.brokenSources.v1';

interface BrokenRecord {
  url: string;
  reportedAt: string; // ISO
}

function readStore(): BrokenRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BrokenRecord[]) : [];
  } catch {
    return [];
  }
}

function writeStore(records: BrokenRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch {
    /* quota / private-mode → ignore */
  }
}

/** Mark a URL as broken (user report). */
export function markSourceAsBroken(url: string): void {
  const store = readStore();
  if (store.some((r) => r.url === url)) return;
  store.push({ url, reportedAt: new Date().toISOString() });
  writeStore(store);
}

/** Clear a user report only after an actual verification has succeeded. */
export function markSourceAsVerified(url: string): void {
  writeStore(readStore().filter((r) => r.url !== url));
}

/** Has the local user reported this source as broken? */
export function isReportedBroken(url: string): boolean {
  return readStore().some((r) => r.url === url);
}

/** All user-reported broken URLs — useful for the debug/admin checklist. */
export function listReportedBroken(): BrokenRecord[] {
  return readStore();
}

export interface UrlHealthResult {
  /** null means no real check has been performed; it does not mean healthy. */
  ok: boolean | null;
  status?: number;
  checkedAt: string;
  verified: boolean;
  reason?: string;
}

export interface YouTubeHealthResult {
  /** null means the YouTube Data API has not been queried. */
  available: boolean | null;
  /** null means embedding permission has not been queried. */
  embeddable: boolean | null;
  checkedAt: string;
  verified: boolean;
  reason?: string;
}

/**
 * Check a URL's health.
 *
 * This frontend module deliberately does not issue a browser fetch: CORS
 * failures are not evidence that a source is down. Wire this to a server-side
 * checker before returning a positive or negative health verdict.
 */
export async function checkSingleUrl(_url: string): Promise<UrlHealthResult> {
  return {
    ok: null,
    checkedAt: new Date().toISOString(),
    verified: false,
    reason: 'Server-side URL health checker is not configured; status is unknown.',
  };
}

/**
 * Check YouTube availability and embedding permission.
 *
 * Requires a server-side YouTube Data API v3 videos.list request using
 * YOUTUBE_API_KEY. Never infer availability from a syntactically valid ID.
 */
export async function checkYouTubeVideo(_videoId: string): Promise<YouTubeHealthResult> {
  return {
    available: null,
    embeddable: null,
    checkedAt: new Date().toISOString(),
    verified: false,
    reason: 'YouTube Data API verification is not configured; status is unknown.',
  };
}

/** Convenience wrapper that classifies an "official" source response. */
export async function checkOfficialSource(url: string): Promise<UrlHealthResult> {
  return checkSingleUrl(url);
}
