/**
 * Star-Seed Classifier
 *
 * Pure deterministic function: given a natal chart (planetary positions),
 * return the dominant star-seed lineage and a confidence score.
 *
 * This is intentionally heuristic — not a horoscope, not a diagnosis.
 * The math is real (we use real ecliptic longitudes from the ephemeris
 * edge function), the *interpretation* is the Pantheon framework.
 */

import type { StarSeedId } from '@/data/star-seeds';

export type ZodiacSign =
  | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
  | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
  | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface PlanetPosition {
  /** Ecliptic longitude in degrees [0, 360) */
  longitude: number;
  sign: ZodiacSign;
  /** Degree within the sign [0, 30) */
  degree: number;
}

export interface NatalChart {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  ascendant: PlanetPosition;
}

export interface SeedResult {
  seed: StarSeedId;
  /** 0-100 — strength of the match */
  confidence: number;
  /** Top 2 runner-up lineages (secondary resonances) */
  secondary: StarSeedId[];
}

const ZODIAC: ZodiacSign[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

export function longitudeToSign(longitude: number): { sign: ZodiacSign; degree: number } {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  return {
    sign: ZODIAC[signIndex],
    degree: normalized - signIndex * 30,
  };
}

/**
 * Resonance weights — how strongly each sign placement pulls
 * each star-seed lineage. Tuned by the Pantheon framework, not
 * traditional astrology.
 *
 * Rows = sign, Cols = seed id, values = points contributed when
 * a planet sits in that sign.
 */
const SIGN_RESONANCE: Record<ZodiacSign, Partial<Record<StarSeedId, number>>> = {
  Aries:       { lyran: 3, orion: 2, andromedan: 1 },
  Taurus:      { pleiadian: 4, sirian: 1 },
  Gemini:      { arcturian: 2, andromedan: 2 },
  Cancer:      { sirian: 3, pleiadian: 2 },
  Leo:         { lyran: 3, orion: 1 },
  Virgo:       { arcturian: 3, pleiadian: 1 },
  Libra:       { pleiadian: 2, andromedan: 2 },
  Scorpio:     { orion: 4, sirian: 1 },
  Sagittarius: { lyran: 2, andromedan: 2 },
  Capricorn:   { orion: 2, arcturian: 2 },
  Aquarius:    { andromedan: 3, arcturian: 2 },
  Pisces:      { sirian: 3, pleiadian: 2 },
};

/** Heavier weight for personal points (Sun, Moon, Ascendant). */
const PLANET_WEIGHT: Record<keyof NatalChart, number> = {
  sun: 3,
  moon: 2.5,
  ascendant: 2.5,
  mercury: 1,
  venus: 1.5,
  mars: 1.5,
  jupiter: 1,
  saturn: 1,
};

const ALL_SEEDS: StarSeedId[] = [
  'lyran', 'sirian', 'pleiadian', 'arcturian', 'andromedan', 'orion',
];

export function classifyStarSeed(chart: NatalChart): SeedResult {
  const scores: Record<StarSeedId, number> = {
    lyran: 0,
    sirian: 0,
    pleiadian: 0,
    arcturian: 0,
    andromedan: 0,
    orion: 0,
  };

  (Object.keys(PLANET_WEIGHT) as Array<keyof NatalChart>).forEach((planet) => {
    const position = chart[planet];
    const weight = PLANET_WEIGHT[planet];
    const resonance = SIGN_RESONANCE[position.sign];

    for (const seed of ALL_SEEDS) {
      const r = resonance[seed] ?? 0;
      scores[seed] += r * weight;
    }
  });

  // Sort seeds by score descending
  const ranked = ALL_SEEDS
    .map((seed) => ({ seed, score: scores[seed] }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0];
  const total = ranked.reduce((sum, r) => sum + r.score, 0) || 1;
  const confidence = Math.round((top.score / total) * 100);

  return {
    seed: top.seed,
    confidence,
    secondary: [ranked[1].seed, ranked[2].seed],
  };
}
