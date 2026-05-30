/**
 * 46 Across History — the Codex
 *
 * Real-world occurrences of the number 46 presented as evidence,
 * not woo. Each entry is verifiable.
 */

export interface CodexEntry {
  category: 'biology' | 'science' | 'culture' | 'history' | 'cosmic';
  title: string;
  detail: string;
}

export const numerologyEntries: CodexEntry[] = [
  {
    category: 'biology',
    title: '46 Chromosomes',
    detail:
      'The exact count in a healthy human cell. 23 pairs. The biological signature of our species — the lock the experiment is keyed to.',
  },
  {
    category: 'science',
    title: 'Palladium · Atomic Number 46',
    detail:
      'A transition metal with rare catalytic properties — required for hydrogen storage, fuel cells, and the most advanced electronics. Element 46 is what makes the next-generation grid possible.',
  },
  {
    category: 'cosmic',
    title: 'Messier 46 (NGC 2437)',
    detail:
      'A star cluster in the constellation Puppis, ~5,400 light-years away. Catalogued by Charles Messier in 1771. A nursery of roughly 500 stars all born together.',
  },
  {
    category: 'history',
    title: '46 BCE · The Year of Confusion',
    detail:
      'Julius Caesar lengthened this single year to 445 days to reset the calendar before introducing the Julian system. The longest year in recorded history. A reset point.',
  },
  {
    category: 'culture',
    title: "Mozart's Symphony No. 46 (K.466)",
    detail:
      'Mozart wrote 46 numbered symphonies. K.466 — his Piano Concerto No. 20 in D minor — is widely considered the moment he stopped writing for the court and started writing for eternity.',
  },
  {
    category: 'history',
    title: '46th President',
    detail:
      'Joseph R. Biden — sworn in on the same day a UAP-related Senate report was quietly transmitted to the Director of National Intelligence. Coincidence is the surface story.',
  },
  {
    category: 'science',
    title: '46 in DNA Genealogy',
    detail:
      'The standard diploid number. Down syndrome occurs at 47 chromosomes, Turner syndrome at 45. The 46-count is the narrow window where humanity functions. The blueprint is precise.',
  },
  {
    category: 'culture',
    title: '4 + 6 = 10 · Divine Completion',
    detail:
      'In Kabbalah, Pythagorean numerology, and Tarot, 10 is wholeness — the return to source after the journey. 46 reduces to the number of completion.',
  },
  {
    category: 'cosmic',
    title: '46 UAP Files',
    detail:
      'Demanded by Congresswoman Anna Paulina Luna on March 31, 2026. Deadline: April 14, 2026. The Pentagon refused to deliver. The number chose us back.',
  },
  {
    category: 'science',
    title: '46th Parallel North',
    detail:
      'Runs through the Roswell event horizon, Skinwalker Ranch latitude band, and the Pacific UAP hot zones documented by the Navy. The latitude where the sky gets strange.',
  },
];

export const codexCategories = [
  { id: 'biology', label: 'Biology', color: '#10b981' },
  { id: 'science', label: 'Science', color: '#22d3ee' },
  { id: 'culture', label: 'Culture', color: '#c084fc' },
  { id: 'history', label: 'History', color: '#f59e0b' },
  { id: 'cosmic', label: 'Cosmic', color: '#7C3AED' },
] as const;
