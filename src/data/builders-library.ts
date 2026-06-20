export interface LibraryEntry {
  id: string;
  title: string;
  author?: string;
  category: 'Ancient History' | 'Mythology' | 'Astronomy' | 'Philosophy' | 'Survival' | 'Psychology' | 'Source Research' | 'Human Potential';
  format: 'Book' | 'Source' | 'Video' | 'Paper';
  readingLevel: 'Intro' | 'Intermediate' | 'Advanced';
  whyItMatters: string;
  link?: string;
}

export const buildersLibrary: LibraryEntry[] = [
  { id: 'sapiens', title: 'Sapiens — A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'Ancient History', format: 'Book', readingLevel: 'Intro',
    whyItMatters: 'Single best wide-angle frame for understanding how Homo sapiens went from forager to planet-modifier.' },
  { id: 'fingerprints', title: 'Fingerprints of the Gods', author: 'Graham Hancock', category: 'Ancient History', format: 'Book', readingLevel: 'Intermediate',
    whyItMatters: 'The foundational text for the "lost civilization" framework. Argue with it, but read it.' },
  { id: 'hero-1000-faces', title: 'The Hero with a Thousand Faces', author: 'Joseph Campbell', category: 'Mythology', format: 'Book', readingLevel: 'Intermediate',
    whyItMatters: 'Decodes the universal pattern beneath every mythology, religion, and story on Earth.' },
  { id: 'cosmos', title: 'Cosmos', author: 'Carl Sagan', category: 'Astronomy', format: 'Book', readingLevel: 'Intro',
    whyItMatters: 'Still the cleanest invitation into scientific awe ever written.' },
  { id: 'meditations', title: 'Meditations', author: 'Marcus Aurelius', category: 'Philosophy', format: 'Book', readingLevel: 'Intro',
    whyItMatters: 'A Roman emperor\'s private notebook. 1,900 years old and still the best operating manual for the mind.' },
  { id: 'deep-survival', title: 'Deep Survival', author: 'Laurence Gonzales', category: 'Survival', format: 'Book', readingLevel: 'Intro',
    whyItMatters: 'Why some people live and others die in the same situation. The psychology of staying alive.' },
  { id: 'thinking-fast-slow', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Psychology', format: 'Book', readingLevel: 'Intermediate',
    whyItMatters: 'A guided tour of your own cognitive biases by the Nobel laureate who mapped them.' },
  { id: 'aaro-report', title: 'AARO Historical Record Report Vol. 1', category: 'Source Research', format: 'Paper', readingLevel: 'Intermediate',
    whyItMatters: 'The U.S. government\'s own 80-year review of UAP investigation — read the primary source.',
    link: 'https://www.aaro.mil/HRRV1' },
  { id: 'why-we-sleep', title: 'Why We Sleep', author: 'Matthew Walker', category: 'Human Potential', format: 'Book', readingLevel: 'Intro',
    whyItMatters: 'The single most leveraged habit you control. Read this before anything else on wellness.' },
  { id: 'flow', title: 'Flow — The Psychology of Optimal Experience', author: 'Mihaly Csikszentmihalyi', category: 'Human Potential', format: 'Book', readingLevel: 'Intermediate',
    whyItMatters: 'The original research on the state every athlete, artist, and operator chases.' },
  { id: 'crash-course-history', title: 'Crash Course World History', category: 'Ancient History', format: 'Video', readingLevel: 'Intro',
    whyItMatters: 'Free, fast survey of 200,000 years of human history. Great starting ramp.',
    link: 'https://thecrashcourse.com' },
  { id: 'curated-pending', title: 'Curated list pending', category: 'Source Research', format: 'Book', readingLevel: 'Intro',
    whyItMatters: 'More entries added on a rolling basis. Submit recommendations via the Echo channel.' },
];
