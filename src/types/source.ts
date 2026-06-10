/**
 * Canonical Source / citation shape used by SourceLink, SourceList,
 * LiveFeedCard, and YouTubeResourceCard.
 */

export type SourceCategory =
  | 'official'
  | 'academic'
  | 'news'
  | 'video'
  | 'archive'
  | 'community'
  | 'unknown';

export type SourceStatus = 'verified' | 'needs-review' | 'broken' | 'archived';

export interface Source {
  title: string;
  url: string;
  publisher?: string;
  /** ISO date string. */
  lastChecked?: string;
  category: SourceCategory;
  status: SourceStatus;
}
