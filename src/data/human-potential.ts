export interface PracticeEntry {
  id: string;
  topic: string;
  summary: string;
  dailyPractice: string;
  tradition: 'Science' | 'Tradition' | 'Both';
  xpReward: number;
}

/**
 * Educational wellness content only — no medical claims.
 * Each entry frames practice as exploration, not prescription.
 */
export const humanPotential: PracticeEntry[] = [
  { id: 'meditation', topic: 'Meditation', summary: 'Sustained attention training — strengthens metacognition, lowers stress reactivity.',
    dailyPractice: '10 minutes seated, follow your breath, return without judgment whenever your mind drifts.',
    tradition: 'Both', xpReward: 30 },
  { id: 'focus', topic: 'Deep Focus', summary: 'Single-tasking under attention residue is the rarest skill in the modern economy.',
    dailyPractice: 'One 90-minute block per day on your most important work — phone in another room.',
    tradition: 'Science', xpReward: 30 },
  { id: 'memory', topic: 'Memory', summary: 'Spaced repetition and the method of loci push recall far beyond raw repetition.',
    dailyPractice: 'Build one mind palace for a topic you care about. Walk it daily for one week.',
    tradition: 'Both', xpReward: 25 },
  { id: 'sleep', topic: 'Sleep', summary: 'The single highest-leverage variable for cognition, mood, and recovery.',
    dailyPractice: 'Same wake time daily, dim lights 60 minutes before bed, no caffeine after 2pm.',
    tradition: 'Science', xpReward: 35 },
  { id: 'breathwork', topic: 'Breathwork', summary: 'Conscious breathing patterns shift autonomic state — calming or activating on demand.',
    dailyPractice: 'Box breathing (4-4-4-4) for five minutes, or physiological sighs before high-pressure tasks.',
    tradition: 'Both', xpReward: 25 },
  { id: 'fitness', topic: 'Fitness', summary: 'Strength + cardiovascular conditioning is the closest thing humans have to a longevity drug.',
    dailyPractice: '20-minute movement window every day — walk, lift, swim, anything that elevates heart rate.',
    tradition: 'Science', xpReward: 30 },
  { id: 'emotion', topic: 'Emotional Regulation', summary: 'Naming an emotion as you feel it (affect labeling) measurably reduces its intensity.',
    dailyPractice: 'When triggered, pause and label: "I notice I am feeling X." Then choose your response.',
    tradition: 'Science', xpReward: 30 },
  { id: 'flow', topic: 'Flow States', summary: 'Peak performance lives at the edge of your current skill — challenge slightly above capacity.',
    dailyPractice: 'Identify one skill at your edge today. Practice it deliberately for 25 minutes.',
    tradition: 'Science', xpReward: 30 },
  { id: 'philosophy', topic: 'Philosophy', summary: 'Stoic, Buddhist, and existentialist traditions all converge on a practical core: control attention, accept what you can\'t change.',
    dailyPractice: 'Morning page: write one short reflection on what is and isn\'t in your control today.',
    tradition: 'Tradition', xpReward: 25 },
  { id: 'discipline', topic: 'Personal Discipline', summary: 'Habit beats motivation. Identity beats willpower.',
    dailyPractice: 'Pick one tiny non-negotiable. Do it daily for 30 days. Then add a second.',
    tradition: 'Both', xpReward: 35 },
];
