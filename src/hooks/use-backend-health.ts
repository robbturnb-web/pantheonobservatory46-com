/**
 * use-backend-health.ts — lightweight poll that detects when the Lovable Cloud
 * backend is paused/unreachable so the UI can guide the user to resume it.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { env } from '@/config/env';

export type BackendState = 'checking' | 'online' | 'paused' | 'unreachable';

const POLL_MS = 60_000;

async function probe(signal: AbortSignal): Promise<BackendState> {
  if (!env.supabaseUrl || !env.supabasePublishableKey) return 'unreachable';
  try {
    const res = await fetch(`${env.supabaseUrl}/auth/v1/health`, {
      headers: { apikey: env.supabasePublishableKey },
      signal,
    });
    if (res.ok) return 'online';
    // Paused / hibernating projects answer with gateway-style errors
    if ([402, 503, 504, 540, 544].includes(res.status)) return 'paused';
    return 'unreachable';
  } catch {
    return 'unreachable';
  }
}

export function useBackendHealth() {
  const [state, setState] = useState<BackendState>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [checking, setChecking] = useState(false);
  const ctrl = useRef<AbortController | null>(null);

  const check = useCallback(async () => {
    ctrl.current?.abort();
    const c = new AbortController();
    ctrl.current = c;
    setChecking(true);
    const next = await probe(c.signal);
    if (c.signal.aborted) return;
    setState(next);
    setLastChecked(new Date());
    setChecking(false);
  }, []);

  useEffect(() => {
    void check();
    const id = window.setInterval(() => void check(), POLL_MS);
    return () => {
      window.clearInterval(id);
      ctrl.current?.abort();
    };
  }, [check]);

  return { state, lastChecked, checking, recheck: check };
}
