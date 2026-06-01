import type { NatalChart, ZodiacSign } from '@/lib/star-seed-classifier';

export interface ZodiacSeason {
  sign: ZodiacSign;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  mantra: string;
}

export const zodiacSeasons: ZodiacSeason[] = [
  { sign: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19, mantra: 'initiation, courage, first fire' },
  { sign: 'Taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20, mantra: 'embodiment, value, sacred patience' },
  { sign: 'Gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20, mantra: 'signal, language, mirrored intelligence' },
  { sign: 'Cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22, mantra: 'memory, protection, emotional tide' },
  { sign: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22, mantra: 'radiance, authorship, solar command' },
  { sign: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22, mantra: 'craft, refinement, sacred systems' },
  { sign: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22, mantra: 'balance, beauty, relational intelligence' },
  { sign: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21, mantra: 'depth, shadow, transformation' },
  { sign: 'Sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21, mantra: 'vision, quest, horizon expansion' },
  { sign: 'Capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19, mantra: 'discipline, structure, mountain work' },
  { sign: 'Aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18, mantra: 'future, networks, rebel architecture' },
  { sign: 'Pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20, mantra: 'dream, compassion, veil-thinning' },
];

export const zodiacGlyphs: Record<ZodiacSign, string> = {
  Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋', Leo: '♌', Virgo: '♍',
  Libra: '♎', Scorpio: '♏', Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
};

export const planetGlyphs: Record<keyof NatalChart, string> = {
  sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂', jupiter: '♃', saturn: '♄', ascendant: 'ASC',
};

function isDateInsideSeason(date: Date, season: ZodiacSeason): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const marker = month * 100 + day;
  const start = season.startMonth * 100 + season.startDay;
  const end = season.endMonth * 100 + season.endDay;

  if (start <= end) return marker >= start && marker <= end;
  return marker >= start || marker <= end;
}

export function getCurrentZodiacSeason(now: Date): ZodiacSeason {
  return zodiacSeasons.find((season) => isDateInsideSeason(now, season)) ?? zodiacSeasons[0];
}

export function getSkyTimestamp(now: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(now);
}

export function getTransitHighlights(natal: NatalChart, current: NatalChart): string[] {
  const highlights: string[] = [];
  if (current.sun.sign === natal.sun.sign) highlights.push('Solar return resonance — your core identity is being amplified.');
  if (current.moon.sign === natal.moon.sign) highlights.push('Lunar mirror active — emotional patterns are louder than usual.');
  if (current.mercury.sign === natal.mercury.sign) highlights.push('Mercury sync — your mind is speaking in its native code.');
  if (current.venus.sign === natal.venus.sign) highlights.push('Venus echo — love, beauty, and magnetism are on familiar terrain.');
  if (current.mars.sign === natal.mars.sign) highlights.push('Mars ignition — your action engine is receiving direct voltage.');
  if (current.jupiter.sign === natal.jupiter.sign) highlights.push('Jupiter blessing — expansion is touching your natal luck channel.');
  if (current.saturn.sign === natal.saturn.sign) highlights.push('Saturn masterclass — discipline is revisiting a life curriculum.');
  return highlights.slice(0, 3);
}