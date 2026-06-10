import { useCallback, useEffect, useState } from 'react';
import { MISSIONS, type Mission } from '@/data/missions';

const STORAGE_KEY = 'pantheon.missionProgress.v1';

type ProgressMap = Record<string, number>;

function read(): ProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}') as ProgressMap;
  } catch {
    return {};
  }
}

function write(p: ProgressMap) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* ignore */
  }
}

export interface MissionState extends Mission {
  progress: number;
  complete: boolean;
}

export function useMissionProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => read());

  useEffect(() => {
    write(progress);
  }, [progress]);

  const bump = useCallback((id: string, by = 1) => {
    setProgress((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + by) }));
  }, []);

  const complete = useCallback((id: string) => {
    const mission = MISSIONS.find((m) => m.id === id);
    if (!mission) return;
    setProgress((prev) => ({ ...prev, [id]: mission.target }));
  }, []);

  const reset = useCallback((id: string) => {
    setProgress((prev) => ({ ...prev, [id]: 0 }));
  }, []);

  const state: MissionState[] = MISSIONS.map((m) => ({
    ...m,
    progress: Math.min(m.target, progress[m.id] ?? 0),
    complete: (progress[m.id] ?? 0) >= m.target,
  }));

  return { missions: state, bump, complete, reset };
}
