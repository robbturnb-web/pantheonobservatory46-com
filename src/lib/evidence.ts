/**
 * Shared evidence vocabulary for research content.
 * Source tier = how reliable the SOURCE is. Claim status = what kind of
 * statement the CONTENT makes. The two are always shown separately.
 */
export type SourceTierKey = 'official' | 'peer-reviewed' | 'journalism' | 'testimony' | 'community';

export const SOURCE_TIER_LABEL: Record<SourceTierKey, string> = {
  official: 'Official primary',
  'peer-reviewed': 'Peer-reviewed',
  journalism: 'Established journalism',
  testimony: 'Testimony',
  community: 'Community / unverified',
};

export type ClaimStatus =
  | 'verified' | 'official-statement' | 'historical' | 'academic'
  | 'testimony' | 'unresolved' | 'speculation' | 'folklore' | 'disputed' | 'debunked';

export const CLAIM_STATUS_LABEL: Record<ClaimStatus, string> = {
  verified: 'Verified fact',
  'official-statement': 'Official statement',
  historical: 'Historical record',
  academic: 'Academic research',
  testimony: 'Testimony / allegation',
  unresolved: 'Unresolved',
  speculation: 'Speculation',
  folklore: 'Mythology / folklore',
  disputed: 'Disputed',
  debunked: 'Debunked',
};

export type MediaKind = 'official' | 'research' | 'testimony' | 'documentary';
export const MEDIA_KIND_LABEL: Record<MediaKind, string> = {
  official: 'Official',
  research: 'Research / educational',
  testimony: 'Testimony',
  documentary: 'Third-party documentary',
};

export interface Citation {
  title: string;
  publisher: string;
  /** ISO date or year as published. */
  date: string;
  url: string;
  tier: SourceTierKey;
  /** What this source establishes. */
  establishes?: string;
  /** What it does not establish. */
  doesNotEstablish?: string;
}
