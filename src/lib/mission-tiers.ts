/**
 * Display-only "Mission Tier" mapping XP → 10 cosmic ranks.
 *
 * The persisted database rank stays Initiate → Ascended (see `xp-events.ts`
 * and the `compute_rank` SQL function). This is a layered display label
 * shown in the profile + missions UI so the experience feels like a
 * 10-step journey without breaking stored data.
 */

export interface MissionTier {
  level: number;
  name: string;
  minXp: number;
  blurb: string;
}

export const MISSION_TIERS: MissionTier[] = [
  { level: 1, name: 'Observer', minXp: 0, blurb: 'You opened the signal.' },
  { level: 2, name: 'Researcher', minXp: 100, blurb: 'You read the record.' },
  { level: 3, name: 'Signal Tracker', minXp: 250, blurb: 'You followed the trail.' },
  { level: 4, name: 'Archivist', minXp: 450, blurb: 'You catalogued the lore.' },
  { level: 5, name: 'Skywatcher', minXp: 700, blurb: 'You looked up — and stayed there.' },
  { level: 6, name: 'Field Investigator', minXp: 1000, blurb: 'You questioned the field.' },
  { level: 7, name: 'Disclosure Analyst', minXp: 1400, blurb: 'You parsed the unredacted.' },
  { level: 8, name: 'Pantheon Builder', minXp: 1900, blurb: 'You contributed signal back.' },
  { level: 9, name: 'Frequency Keeper', minXp: 2500, blurb: 'You hold the resonance.' },
  { level: 10, name: 'Legendary Witness', minXp: 3500, blurb: 'You stand in the canon.' },
];

export interface MissionTierState {
  current: MissionTier;
  next: MissionTier | null;
  progressPct: number; // 0–100
  xpToNext: number;
}

export function getMissionTier(xp: number): MissionTierState {
  const sorted = [...MISSION_TIERS].sort((a, b) => a.minXp - b.minXp);
  let current = sorted[0];
  let next: MissionTier | null = null;
  for (let i = 0; i < sorted.length; i++) {
    if (xp >= sorted[i].minXp) {
      current = sorted[i];
      next = sorted[i + 1] ?? null;
    }
  }
  if (!next) return { current, next: null, progressPct: 100, xpToNext: 0 };
  const span = next.minXp - current.minXp;
  const into = Math.max(0, xp - current.minXp);
  return {
    current,
    next,
    progressPct: Math.min(100, Math.round((into / span) * 100)),
    xpToNext: Math.max(0, next.minXp - xp),
  };
}
