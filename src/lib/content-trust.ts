/**
 * Content-trust model — every card, dossier, feed, and article in Pantheon
 * should declare WHAT KIND of claim it makes, so users can instantly tell
 * verified evidence apart from mythology, speculation, or unsourced lore.
 *
 * This sits ABOVE the URL-based `source-tier` system: source-tier asks
 * "how trustworthy is this domain?", content-trust asks "what kind of
 * statement is the content itself?".
 */

import type { SourceTier } from './source-tier';

export type ContentTrust =
  | 'VERIFIED_FACT'
  | 'OFFICIAL_SOURCE'
  | 'HISTORICAL_RECORD'
  | 'ACADEMIC_SOURCE'
  | 'MYTH_LORE'
  | 'SPECULATIVE'
  | 'COMMUNITY_THEORY'
  | 'UNSOURCED_PENDING_REVIEW';

interface TrustVisual {
  label: string;
  short: string;
  description: string;
  /** Tailwind classes — JIT-safe (hardcoded, never composed). */
  text: string;
  bg: string;
  border: string;
}

export const CONTENT_TRUST_VISUAL: Record<ContentTrust, TrustVisual> = {
  VERIFIED_FACT: {
    label: 'Verified Fact',
    short: 'Verified',
    description: 'Independently confirmed by multiple primary sources.',
    text: 'text-signal-online',
    bg: 'bg-signal-online/10',
    border: 'border-signal-online/50',
  },
  OFFICIAL_SOURCE: {
    label: 'Official Source',
    short: 'Official',
    description: 'Released by a government, agency, or recognized institution.',
    text: 'text-realm-cosmos',
    bg: 'bg-realm-cosmos/10',
    border: 'border-realm-cosmos/50',
  },
  HISTORICAL_RECORD: {
    label: 'Historical Record',
    short: 'Historical',
    description: 'Documented in archives, museums, or accepted historical sources.',
    text: 'text-realm-gods',
    bg: 'bg-realm-gods/10',
    border: 'border-realm-gods/50',
  },
  ACADEMIC_SOURCE: {
    label: 'Academic Source',
    short: 'Academic',
    description: 'Peer-reviewed research or university publication.',
    text: 'text-realm-consciousness',
    bg: 'bg-realm-consciousness/10',
    border: 'border-realm-consciousness/50',
  },
  MYTH_LORE: {
    label: 'Myth / Lore',
    short: 'Myth',
    description: 'Mythology, folklore, or symbolic tradition — not literal fact.',
    text: 'text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
  },
  SPECULATIVE: {
    label: 'Speculative Theory',
    short: 'Speculative',
    description: 'A hypothesis or framework, not established fact.',
    text: 'text-realm-observatory',
    bg: 'bg-realm-observatory/10',
    border: 'border-realm-observatory/50',
  },
  COMMUNITY_THEORY: {
    label: 'Community Theory',
    short: 'Community',
    description: 'Reader- or researcher-submitted theory pending review.',
    text: 'text-realm-echo',
    bg: 'bg-realm-echo/10',
    border: 'border-realm-echo/40',
  },
  UNSOURCED_PENDING_REVIEW: {
    label: 'Needs Review',
    short: 'Needs Review',
    description: 'No verified source yet — held for review.',
    text: 'text-muted-foreground',
    bg: 'bg-muted/20',
    border: 'border-muted-foreground/30',
  },
};

/** Map a URL-classified source tier into the content-trust system. */
export function trustFromSourceTier(tier: SourceTier): ContentTrust {
  switch (tier) {
    case 'PRIMARY':
      return 'VERIFIED_FACT';
    case 'OFFICIAL':
      return 'OFFICIAL_SOURCE';
    case 'SECONDARY':
      return 'HISTORICAL_RECORD';
    default:
      return 'UNSOURCED_PENDING_REVIEW';
  }
}
