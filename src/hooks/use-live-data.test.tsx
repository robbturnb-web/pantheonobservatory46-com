import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchKp, type KpReading, type LiveResult } from '@/lib/live-data';
import { useKp } from './use-live-data';

vi.mock('@/lib/live-data', () => ({ fetchKp: vi.fn() }));
const failed: LiveResult<KpReading> = {
  ok: false, value: null, source: { label: 'NOAA', url: 'https://www.swpc.noaa.gov/' },
  fetchedAt: new Date().toISOString(), error: 'HTTP 503',
};
async function flush() { await act(async () => { await Promise.resolve(); }); }

describe('shared feed retries used by health and panels', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    localStorage.clear();
    vi.mocked(fetchKp).mockReset().mockResolvedValue(failed);
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

  it('retries after 2, 4, 8, 16, and 32 seconds then stops', async () => {
    const { result } = renderHook(() => useKp());
    await flush();
    expect(result.current.maxRetries).toBe(5);
    for (const delay of [2000, 4000, 8000, 16000, 32000]) {
      expect(result.current.nextRetryAt).toBe(Date.now() + delay);
      await act(async () => { await vi.advanceTimersByTimeAsync(delay); });
    }
    expect(fetchKp).toHaveBeenCalledTimes(6);
    expect(result.current.nextRetryAt).toBeNull();
    await act(async () => { await vi.advanceTimersByTimeAsync(60000); });
    expect(fetchKp).toHaveBeenCalledTimes(6);
  });

  it('retains verified Kp during outages and resets backoff on manual retry', async () => {
    const verified = { ...failed, ok: true, error: undefined, value: { kp: 3, stormLevel: 'Unsettled' as const, observedAt: failed.fetchedAt } };
    vi.mocked(fetchKp).mockResolvedValueOnce(verified);
    const { result } = renderHook(() => useKp());
    await flush();
    act(() => result.current.refresh());
    expect(result.current.loading).toBe(true);
    await flush();
    expect(result.current.data?.value?.kp).toBe(3);
    expect(result.current.data?.degraded).toBe(true);
    expect(result.current.data?.error).toBe('HTTP 503');
    await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
    expect(result.current.retryAttempt).toBe(2);
    act(() => result.current.refresh());
    await flush();
    expect(result.current.retryAttempt).toBe(1);
    expect(result.current.nextRetryAt).toBe(Date.now() + 2000);
  });
});