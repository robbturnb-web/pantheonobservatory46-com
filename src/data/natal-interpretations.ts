/**
 * Natal interpretations — short, evocative readings for each (planet, sign)
 * placement. Used by the Star-Seed Terminal's natal breakdown section.
 *
 * Tone: Pantheon-flavored. Not horoscope fluff. Treat astrology as a
 * symbolic mirror, not a deterministic forecast.
 */

import type { ZodiacSign } from '@/lib/star-seed-classifier';

export type Planet = 'sun' | 'moon' | 'ascendant' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn';

export const planetMeaning: Record<Planet, { label: string; gloss: string }> = {
  sun: { label: 'Sun', gloss: 'Core identity — the engine of who you are' },
  moon: { label: 'Moon', gloss: 'Inner world — how you feel and recharge' },
  ascendant: { label: 'Ascendant', gloss: 'The mask the world sees first' },
  mercury: { label: 'Mercury', gloss: 'Mind, language, how you decode reality' },
  venus: { label: 'Venus', gloss: 'What you love and how you draw it in' },
  mars: { label: 'Mars', gloss: 'Drive, anger, how you take action' },
  jupiter: { label: 'Jupiter', gloss: 'Where the universe over-delivers for you' },
  saturn: { label: 'Saturn', gloss: 'Where you must master the hard discipline' },
};

const signEssence: Record<ZodiacSign, string> = {
  Aries: 'fire-first instinct, the courage to start before the plan is finished',
  Taurus: 'steady embodiment, the patience to build something that lasts',
  Gemini: 'quicksilver curiosity, multiple channels open at once',
  Cancer: 'tidal feeling, deep loyalty to chosen home and tribe',
  Leo: 'radiant authorship, the will to be seen as exactly who you are',
  Virgo: 'sacred craft, sharp pattern-eye, devotion to the small right thing',
  Libra: 'relational artistry, the gift of finding the missing balance',
  Scorpio: 'shadow-diver depth, the magnetism of one who has faced the underworld',
  Sagittarius: 'wide-arc vision, the hunger for the next horizon',
  Capricorn: 'architect endurance, the long game played without flinching',
  Aquarius: 'outsider clarity, the future arriving early through you',
  Pisces: 'oceanic empathy, the membrane between worlds dissolved',
};

/** Build a one-line reading for a (planet, sign) placement. */
export function readPlacement(planet: Planet, sign: ZodiacSign): string {
  const essence = signEssence[sign];
  switch (planet) {
    case 'sun':
      return `Your core identity runs on ${essence}.`;
    case 'moon':
      return `You recharge through ${essence}. Your inner world speaks this language.`;
    case 'ascendant':
      return `The world meets you as ${essence} before they meet anything else.`;
    case 'mercury':
      return `Your mind moves through ${essence} — it shapes how you think and speak.`;
    case 'venus':
      return `You attract — and are attracted to — ${essence}.`;
    case 'mars':
      return `You take action through ${essence}. Your fire burns this way.`;
    case 'jupiter':
      return `The universe over-delivers when you lean into ${essence}.`;
    case 'saturn':
      return `Your hard work, your discipline, your mastery is forged in ${essence}.`;
  }
}
