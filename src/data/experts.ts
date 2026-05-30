/**
 * Experts data layer.
 *
 * Add a new expert by appending an entry to EXPERTS. Slugs must be unique
 * (used in the URL: /experts/:slug). Image paths can be:
 *   - a path under /public (e.g. "/images/experts/stefan-burns.jpg")
 *   - a remote URL
 *   - left undefined → portrait falls back to /placeholder.svg
 *
 * VideoEmbed component (src/components/VideoEmbed.tsx) handles invalid YT IDs
 * and TikTok fallbacks, so don't worry about embed errors here.
 */

export type ExpertCategory = 'disclosure' | 'testimony' | 'research' | 'theory';

export interface ExpertKnowledgeItem {
  title: string;
  description: string;
  category: ExpertCategory;
  date?: string;
}

export interface ExpertVideo {
  /** Matches VideoData in src/components/VideoEmbed.tsx */
  platform: 'youtube' | 'tiktok';
  /** YouTube: 11-char video ID. TikTok: numeric video ID at the end of the URL. */
  id: string;
  title: string;
}

export interface ExpertSocialLinks {
  youtube?: string;
  tiktok?: string;
  twitter?: string;
  website?: string;
}

export interface Expert {
  slug: string;
  name: string;
  title: string;
  /** Optional portrait. Falls back to /placeholder.svg if missing or fails to load. */
  image?: string;
  bio: string;
  expertise: string[];
  knowledge: ExpertKnowledgeItem[];
  videos: ExpertVideo[];
  socialLinks?: ExpertSocialLinks;
}

export const EXPERTS: Expert[] = [
  {
    slug: 'stefan-burns',
    name: 'Stefan Burns',
    title: 'Geophysicist & UAP Researcher',
    image: '/images/experts/stefan-burns.jpg',
    bio: 'Stefan Burns is a geophysicist who has dedicated years to investigating unidentified aerial phenomena through a scientific lens. His work focuses on the intersection of advanced physics, consciousness studies, and documented UAP encounters. Burns has contributed significant analysis to understanding the technological implications of UAP sightings and their potential connection to human consciousness.',
    expertise: [
      'Geophysics',
      'UAP Analysis',
      'Consciousness Research',
      'Advanced Propulsion',
      'Scientific Method',
    ],
    knowledge: [
      {
        title: 'Gravity Manipulation in UAP Technology',
        description:
          'Analysis of how observed UAP flight characteristics suggest advanced understanding of gravity manipulation. Burns breaks down the physics of instantaneous acceleration and lack of visible propulsion systems.',
        category: 'research',
        date: '2024',
      },
      {
        title: 'Consciousness as Interface to Reality',
        description:
          'Exploration of how human consciousness may interact with UAP phenomena. Drawing from Gateway Process research and quantum physics, Burns proposes consciousness as a fundamental force in reality manipulation.',
        category: 'theory',
        date: '2023',
      },
      {
        title: "Nimitz Encounter: A Physicist's Perspective",
        description:
          "Detailed breakdown of the 2004 Nimitz Tic Tac encounter from a geophysics standpoint. Analysis of radar data, pilot testimony, and implications for our understanding of physics.",
        category: 'disclosure',
        date: '2023',
      },
    ],
    videos: [
      {
        platform: 'youtube',
        id: 'KBOWxvhQJ_k',
        title: "You Won't Believe The Interstellar Signal Earth Just Received",
      },
      {
        platform: 'youtube',
        id: 'q7fMtINMFsM',
        title: "What's Coming Will Change Humanity Forever",
      },
    ],
    socialLinks: {
      youtube: 'https://youtube.com/@stefanburns',
      twitter: 'https://twitter.com/stefanburns',
    },
  },
];

export function getExpertBySlug(slug: string): Expert | undefined {
  return EXPERTS.find((e) => e.slug === slug);
}
