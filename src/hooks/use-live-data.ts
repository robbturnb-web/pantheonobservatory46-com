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
} from '@/lib/live-data';

interface State<T> {
  data: LiveResult<T> | null;
  loading: boolean;
}

function useLive<T>(fetcher: () => Promise<LiveResult<T>>, refreshMs: number) {
  const [state, setState] = useState<State<T>>({ data: null, loading: true });
  const alive = useRef(true);

  const run = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    const result = await fetcher();
    if (!alive.current) return;
    setState({ data: result, loading: false });
  }, [fetcher]);

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
export const useEarthquakes = () => useLive<QuakeSummary>(fetchEarthquakes, 5 * 60_000);
export const useKp = () => useLive<KpReading>(fetchKp, 5 * 60_000);
export const useFlare = () => useLive<FlareReading>(fetchFlare, 5 * 60_000);
export const useSolarWind = () => useLive<WindReading>(fetchSolarWind, 5 * 60_000);
export const useMarine = () => useLive<MarineReading>(fetchMarine, 15 * 60_000);
export const useMoon = () => useLive<MoonReading>(fetchMoon, 60 * 60_000);
// DONKI is rate-limited under DEMO_KEY → 30 min cadence
export const useCMEs = () => useLive<CmeSummary>(fetchCMEs, 30 * 60_000);
export const useFlareEvents = () => useLive<FlareEventSummary>(fetchFlareEvents, 30 * 60_000);
export const useGSTs = () => useLive<GstSummary>(fetchGSTs, 30 * 60_000);
export const useSwpcAlerts = () => useLive<SwpcAlert[]>(fetchSwpcAlerts, 10 * 60_000);
