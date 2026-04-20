// Centralized XP event constants — single source of truth for earn rules + unlock gates.

export const XP_VALUES = {
  PAGE_VISIT: 10,
  SPECIES_OPEN: 15,
  UAP_CASE_OPEN: 10,
  WHISTLEBLOWER_OPEN: 10,
  VAULT_SLOT_OPEN: 20,
  FREQUENCY_VIDEO_PLAY: 5,
  ORIGIN_QUIZ_COMPLETE: 100,
  SIGN_UP: 50,
  DAILY_RETURN: 25,
  ELEMENT_OPEN: 8,
  GLYPH_DECODE: 30,
  STONE_MARKER_OPEN: 12,
  TESTIMONY_SUBMIT: 40,
} as const;

export type XpEventType =
  | 'page'
  | 'species'
  | 'uap'
  | 'whistleblower'
  | 'vault'
  | 'frequency'
  | 'origin_quiz'
  | 'sign_up'
  | 'daily';

export interface RankUnlock {
  rank: string;          // matches RANK_TIERS[i].name
  minXp: number;
  description: string;
}

// Mirrors RANK_TIERS in use-echo-xp.ts (kept here so UI can list unlocks without importing the hook)
export const RANK_UNLOCKS: RankUnlock[] = [
  { rank: 'Initiate',  minXp: 0,    description: 'Base access to all public dossiers' },
  { rank: 'Seeker',    minXp: 100,  description: 'Vault Slot 1 of 46 unsealed' },
  { rank: 'Adept',     minXp: 300,  description: 'Hidden lore unlocks on species & UAP dossiers' },
  { rank: 'Mystic',    minXp: 600,  description: 'Echo "Oracle" persona + 2 more vault slots' },
  { rank: 'Oracle',    minXp: 1000, description: 'Shadow Pantheon ritual details + 5 more vault slots' },
  { rank: 'Ascended',  minXp: 2000, description: 'Full vault (46/46), all hidden lore, gold rank glow' },
];

/** Returns true if a given XP level meets or exceeds the threshold for hidden lore. */
export function isHiddenLoreUnlocked(xp: number): boolean {
  return xp >= 300;
}
