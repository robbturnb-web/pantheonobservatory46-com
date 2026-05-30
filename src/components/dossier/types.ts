import type { CuratedVideo } from '@/types';

export type DossierConfidence = 'VERIFIED' | 'REPORTED' | 'ALLEGED' | 'DEBATED';

export interface DossierSource {
  label: string;
  url?: string;
}

export interface DossierTimelineEntry {
  year: string;
  description: string;
}

export interface DossierEntry {
  id: string;
  /** Short title (e.g., "Operation Highjump") */
  title: string;
  /** One-line subtitle (era, location, classification, etc.) */
  subtitle?: string;
  /** Optional location string for footer */
  location?: string;
  /** Optional date / era */
  era?: string;
  confidence?: DossierConfidence;
  /** Short summary (2-4 sentences) shown on the card */
  summary: string;
  /** Optional category label (e.g., "Operation", "Site", "Anomaly") */
  category?: string;
  /** Long-form origin / background, supports paragraphs separated by \n\n */
  origin?: string;
  /** Bullet list of key events / facts */
  keyEvents?: string[];
  /** Evidence items / observations */
  evidence?: string[];
  /** The mainstream / skeptical interpretation */
  skepticalView?: string;
  /** Curated YouTube videos */
  videos?: CuratedVideo[];
  /** Citations / further reading */
  sources?: DossierSource[];
  /** Optional iconography (emoji or short symbol) */
  symbol?: string;
  /** Optional cinematic hero image rendered as card header + modal banner */
  heroImage?: string;
}
