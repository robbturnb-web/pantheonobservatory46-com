/**
 * use-live-data.ts — React hooks wrapping the public-API fetchers in
 * `live-data.ts`. Each hook auto-refreshes on an interval and exposes a
 * manual `refresh()` so live cards can include a working refresh button.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchEarthquakes,
  fetchKp,
  fetchFlare,
  fetchSolarWind,
  fetchMarine,
  fetchMoon,
  fetchCMEs,
  fetchFlareEvents,
  fetchGSTs,
  fetchSwpcAlerts,
  fetchISS,
  fetchLunarCalendar,
  fetchMeteorShowers,
  fetchNwsAlerts,
  type LiveResult,
  type QuakeSummary,
  type KpReading,
  type FlareReading,
  type WindReading,
  type MarineReading,
  type MoonReading,
  type CmeSummary,
  type FlareEventSummary,
  type GstSummary,
  type SwpcAlert,
  type IssReading,
  type LunarCalendar,
  type MeteorSummary,
  type NwsSummary,
} from '@/lib/live-data';

interface State<T> {
  data: LiveResult<T> | null;
  loading: boolean;
}

/** Last verified reading cache — survives reloads so a source outage shows
 *  "DEGRADED · last verified 09:51:42" instead of "Source unavailable". */
const LAST_GOOD_TTL = 12 * 60 * 60_000;
function readLastGood<T>(key: string): LiveResult<T> | null {
  try {
    const raw = localStorage.getItem(`pantheon:live:${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LiveResult<T>;
    const at = Date.parse(parsed.lastSuccessAt ?? parsed.fetchedAt);
    if (!Number.isFinite(at) || Date.now() - at > LAST_GOOD_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}
function writeLastGood<T>(key: string, result: LiveResult<T>) {
  try {
    localStorage.setItem(`pantheon:live:${key}`, JSON.stringify(result));
  } catch {
    /* storage unavailable — non-fatal */
  }
}

function useLive<T>(fetcher: () => Promise<LiveResult<T>>, refreshMs: number, key: string) {
  const [state, setState] = useState<State<T>>({ data: null, loading: true });
  const alive = useRef(true);
  const lastGood = useRef<LiveResult<T> | null>(null);

  const run = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    const result = await fetcher();
    if (!alive.current) return;
    if (result.ok && result.value != null) {
      const verified = { ...result, lastSuccessAt: result.lastSuccessAt ?? result.fetchedAt };
      lastGood.current = verified;
      writeLastGood(key, verified);
      setState({ data: verified, loading: false });
      return;
    }
    const fallback = lastGood.current ?? readLastGood<T>(key);
    if (fallback?.value != null) {
      lastGood.current = fallback;
      setState({
        data: {
          ...fallback,
          ok: true,
          degraded: true,
          stale: true,
          fetchedAt: result.fetchedAt,
          error: result.error,
          lastSuccessAt: fallback.lastSuccessAt ?? fallback.fetchedAt,
        },
        loading: false,
      });
      return;
    }
    setState({ data: result, loading: false });
  }, [fetcher, key]);

  useEffect(() => {
    alive.current = true;
    void run();
    const id = window.setInterval(run, refreshMs);
    return () => {
      alive.current = false;
      window.clearInterval(id);
    };
  }, [run, refreshMs]);

  return { ...state, refresh: run };
}

// 5 min for fast-moving feeds, 15 min for slower ones
export const useEarthquakes = () => useLive<QuakeSummary>(fetchEarthquakes, 5 * 60_000, 'earthquakes');
export const useKp = () => useLive<KpReading>(fetchKp, 5 * 60_000, 'kp');
export const useFlare = () => useLive<FlareReading>(fetchFlare, 5 * 60_000, 'flare');
export const useSolarWind = () => useLive<WindReading>(fetchSolarWind, 5 * 60_000, 'solarwind');
export const useMarine = () => useLive<MarineReading>(fetchMarine, 15 * 60_000, 'marine');
export const useMoon = () => useLive<MoonReading>(fetchMoon, 60 * 60_000, 'moon');
// DONKI is rate-limited under DEMO_KEY → 30 min cadence
export const useCMEs = () => useLive<CmeSummary>(fetchCMEs, 30 * 60_000, 'cmes');
export const useFlareEvents = () => useLive<FlareEventSummary>(fetchFlareEvents, 30 * 60_000, 'flareevents');
export const useGSTs = () => useLive<GstSummary>(fetchGSTs, 30 * 60_000, 'gsts');
export const useSwpcAlerts = () => useLive<SwpcAlert[]>(fetchSwpcAlerts, 10 * 60_000, 'swpcalerts');
// ISS telemetry updates every ~5s upstream; we refresh every 15s for the dashboard
export const useISS = () => useLive<IssReading>(fetchISS, 15_000, 'iss');
// Lunar calendar + meteor shower schedule are deterministic — refresh hourly
export const useLunarCalendar = () => useLive<LunarCalendar>(fetchLunarCalendar, 60 * 60_000, 'lunarcalendar');
export const useMeteorShowers = () => useLive<MeteorSummary>(fetchMeteorShowers, 60 * 60_000, 'meteorshowers');
// NWS active severe/extreme alerts — refresh every 5 min
export const useNwsAlerts = () => useLive<NwsSummary>(fetchNwsAlerts, 5 * 60_000, 'nwsalerts');
