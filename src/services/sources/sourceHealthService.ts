/**
 * sourceHealthService — link-health architecture.
 *
 * ⚠️ Browser apps cannot reliably check arbitrary external URLs due to CORS,
 * so this module is split into two halves:
 *
 *   1. Frontend (now): track user-reported broken links in localStorage so we
 *      can immediately show a "Needs Review" pill on every offending source.
 *
 *   2. Backend (later): the real scheduled health checker should run on a
 *      Supabase Edge Function, GitHub Action cron, Netlify Function, or
 *      Vercel Cron. From a server you can issue HEAD/GET requests with no
 *      CORS limits, hit the YouTube Data API for video availability, and
 *      write results back to a `source_health` table that the frontend reads.
 *
 * The function signatures below MATCH the future backend so swapping the
 * implementation is a one-file change.
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

/** Mark a URL as verified — clears any prior broken report. */
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

// ─────────────────────────────────────────────────────────────────────
// Backend-shaped stubs. Replace with real fetch when a server is wired.
// ─────────────────────────────────────────────────────────────────────

/**
 * checkSingleUrl — perform a HEAD/GET against a URL and return its status.
 * Must run server-side; the browser cannot bypass CORS reliably.
 */
export async function checkSingleUrl(_url: string): Promise<{ ok: boolean; status?: number; checkedAt: string }> {
  return { ok: true, checkedAt: new Date().toISOString() };
}

/**
 * checkYouTubeVideo — hit the YouTube Data API (v3) `videos.list` endpoint
 * with the given videoId and confirm it is still available & embeddable.
 * Requires YOUTUBE_API_KEY on the server.
 */
export async function checkYouTubeVideo(_videoId: string): Promise<{ available: boolean; embeddable: boolean }> {
  return { available: true, embeddable: true };
}

/** Convenience wrapper that classifies an "official" source response. */
export async function checkOfficialSource(url: string) {
  return checkSingleUrl(url);
}
