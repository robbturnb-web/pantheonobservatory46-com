export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  xpReward: number;
  topics: string[];
  startRoute: string;
}

export const learningPaths: LearningPath[] = [
  { id: 'mythology-101', title: 'Mythology 101', description: 'Map the world\'s great pantheons and the archetypes underneath them.',
    difficulty: 'Beginner', estimatedMinutes: 25, xpReward: 100,
    topics: ['Egyptian gods', 'Greek pantheon', 'Norse cosmology', 'Mesopotamian roots'],
    startRoute: '/gods' },
  { id: 'ancient-civ', title: 'Ancient Civilizations', description: 'From Göbekli Tepe to dynastic Egypt — how complex society actually began.',
    difficulty: 'Beginner', estimatedMinutes: 35, xpReward: 120,
    topics: ['Sumer', 'Egypt', 'Indus Valley', 'Pre-flood theories'],
    startRoute: '/timeline' },
  { id: 'space-weather', title: 'Space Weather Basics', description: 'Kp, solar flares, CMEs, and how they affect Earth.',
    difficulty: 'Intermediate', estimatedMinutes: 20, xpReward: 90,
    topics: ['Sun cycles', 'Geomagnetic storms', 'NOAA SWPC data'],
    startRoute: '/earth-pulse' },
  { id: 'uap-basics', title: 'UAP Disclosure Basics', description: 'The history of UFO/UAP investigation from Roswell to congressional testimony.',
    difficulty: 'Beginner', estimatedMinutes: 30, xpReward: 110,
    topics: ['Roswell', 'Pentagon AATIP', 'Tic-Tac', 'AARO'],
    startRoute: '/uap' },
  { id: 'lost-tech', title: 'Lost Technologies', description: 'Antikythera, Damascus steel, Roman concrete — engineering we still can\'t reproduce.',
    difficulty: 'Intermediate', estimatedMinutes: 25, xpReward: 110,
    topics: ['Antikythera', 'Wootz steel', 'Polygonal masonry'],
    startRoute: '/ancient-tech' },
  { id: 'earth-mysteries', title: 'Earth Mysteries', description: 'Pyramids, lost cities, submerged ruins, and the case for pre-history.',
    difficulty: 'Intermediate', estimatedMinutes: 30, xpReward: 120,
    topics: ['Atlantis', 'Dwarka', 'Antarctica', 'Stone faces'],
    startRoute: '/lost-places' },
  { id: 'source-literacy', title: 'Source Literacy', description: 'Tell verified fact from theory, myth, and speculation — Pantheon\'s integrity framework.',
    difficulty: 'Beginner', estimatedMinutes: 15, xpReward: 80,
    topics: ['Source tiers', 'Content trust', 'Primary vs secondary'],
    startRoute: '/sources' },
];

export interface QuizCategory {
  id: string;
  title: string;
  questionCount: number;
  xpReward: number;
}

export const quizCategories: QuizCategory[] = [
  { id: 'egyptian-gods', title: 'Egyptian Gods', questionCount: 10, xpReward: 50 },
  { id: 'greek-gods', title: 'Greek Pantheon', questionCount: 10, xpReward: 50 },
  { id: 'space-weather', title: 'Space Weather', questionCount: 8, xpReward: 40 },
  { id: 'ancient-tech', title: 'Ancient Technology', questionCount: 8, xpReward: 40 },
  { id: 'disclosure-timeline', title: 'Disclosure Timeline', questionCount: 12, xpReward: 60 },
];
