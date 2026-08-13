import type { PantheonFilter } from '@/types';

/**
 * Per-pantheon accent colors.
 * Gold (#D6B35A) stays the Realm-of-Gods umbrella color; each pantheon gets its
 * own signature hue so dossiers and cards read distinctly.
 * GREEN (#22C55E) is reserved for LIVE/ONLINE status and never used here.
 */
export const PANTHEON_ACCENTS: Record<Exclude<PantheonFilter, 'All'>, string> = {
  Greek: '#D6B35A',            // Olympian gold
  Norse: '#8FB8D8',            // frost steel blue
  Egyptian: '#E0A93B',         // desert amber
  Hindu: '#F0803C',            // saffron
  Anunnaki: '#B87333',         // bronze tablet
  Starseed: '#22D3EE',         // cosmic cyan
  Chinese: '#E2544B',          // imperial vermilion
  Japanese: '#F2A9C0',         // sakura rose
  Buddhist: '#F5C542',         // lotus gold
  Islamic: '#3FBF9F',          // celadon teal
  Aztec: '#C2452D',            // obsidian-fired red
  Mayan: '#4FB286',            // jade
  Incan: '#F4B942',            // sun-disk gold
  Yoruba: '#7FD1C1',           // river aqua
  Celtic: '#6FA96A',           // moss green
  Slavic: '#9AA7C7',           // winter steel
  Polynesian: '#3FA9C9',       // ocean blue
  Aboriginal: '#D4703A',       // ochre
  'Native American': '#C98A5B',// clay tan
  Mesopotamian: '#C79A56',     // ziggurat sand
  Zoroastrian: '#F26B4E',      // sacred flame
};

/** Fallback = Realm of Gods gold. */
export function getPantheonAccent(pantheon: string): string {
  return PANTHEON_ACCENTS[pantheon as Exclude<PantheonFilter, 'All'>] ?? '#D6B35A';
}

/** rgba() helper for glows/tints built from a pantheon accent. */
export function accentAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
