/**
 * Source verification tiers — Priority #5 (Phase 2 roadmap).
 *
 * Every citation displayed in Pantheon is classified into one of four tiers
 * by URL domain. This makes "where does this come from?" answerable at a
 * glance, and lets the dashboard / dossier / disclosure surfaces show an
 * honest aggregate verification posture instead of pretending all links
 * carry equal weight.
 *
 *  PRIMARY     — first-party records: court filings, hearings, FOIA releases,
 *                official agency archives, peer-reviewed journals.
 *  OFFICIAL    — recognized institutions: NASA / NOAA / USGS / DoD / AARO /
 *                Congress / UN / major universities.
 *  SECONDARY   — established journalism, recognized researchers, books.
 *  UNVERIFIED  — blogs, forums, social, anonymous, unknown domain.
 */

export type SourceTier = 'PRIMARY' | 'OFFICIAL' | 'SECONDARY' | 'UNVERIFIED';

interface TierVisual {
  label: string;
  short: string;
  /** Tailwind classes — JIT-safe (hardcoded, never composed). */
  text: string;
  bg: string;
  border: string;
  dot: string;
}

export const TIER_VISUAL: Record<SourceTier, TierVisual> = {
  PRIMARY: {
    label: 'Primary record',
    short: 'Primary',
    text: 'text-signal-online',
    bg: 'bg-signal-online/10',
    border: 'border-signal-online/50',
    dot: 'bg-signal-online',
  },
  OFFICIAL: {
    label: 'Official institution',
    short: 'Official',
    text: 'text-realm-cosmos',
    bg: 'bg-realm-cosmos/10',
    border: 'border-realm-cosmos/50',
    dot: 'bg-realm-cosmos',
  },
  SECONDARY: {
    label: 'Established secondary',
    short: 'Secondary',
    text: 'text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    dot: 'bg-amber-400',
  },
  UNVERIFIED: {
    label: 'Unverified source',
    short: 'Unverified',
    text: 'text-muted-foreground',
    bg: 'bg-muted/20',
    border: 'border-muted-foreground/30',
    dot: 'bg-muted-foreground/60',
  },
};

// Domain suffix → tier. Match is "host ends with key".
const DOMAIN_TIERS: Array<[string, SourceTier]> = [
  // ── PRIMARY: first-party records, court, FOIA, peer-reviewed ──
  ['supremecourt.gov', 'PRIMARY'],
  ['uscourts.gov', 'PRIMARY'],
  ['justice.gov', 'PRIMARY'],
  ['archives.gov', 'PRIMARY'],
  ['govinfo.gov', 'PRIMARY'],
  ['congress.gov', 'PRIMARY'],
  ['senate.gov', 'PRIMARY'],
  ['house.gov', 'PRIMARY'],
  ['foia.gov', 'PRIMARY'],
  ['cia.gov', 'PRIMARY'],
  ['fbi.gov', 'PRIMARY'],
  ['nsa.gov', 'PRIMARY'],
  ['defense.gov', 'PRIMARY'],
  ['af.mil', 'PRIMARY'],
  ['navy.mil', 'PRIMARY'],
  ['army.mil', 'PRIMARY'],
  ['nature.com', 'PRIMARY'],
  ['science.org', 'PRIMARY'],
  ['arxiv.org', 'PRIMARY'],
  ['pubmed.ncbi.nlm.nih.gov', 'PRIMARY'],
  ['ncbi.nlm.nih.gov', 'PRIMARY'],
  ['doi.org', 'PRIMARY'],

  // ── OFFICIAL: recognized institutions ──
  ['nasa.gov', 'OFFICIAL'],
  ['noaa.gov', 'OFFICIAL'],
  ['usgs.gov', 'OFFICIAL'],
  ['nist.gov', 'OFFICIAL'],
  ['nih.gov', 'OFFICIAL'],
  ['weather.gov', 'OFFICIAL'],
  ['swpc.noaa.gov', 'OFFICIAL'],
  ['esa.int', 'OFFICIAL'],
  ['cern.ch', 'OFFICIAL'],
  ['un.org', 'OFFICIAL'],
  ['who.int', 'OFFICIAL'],
  ['mit.edu', 'OFFICIAL'],
  ['harvard.edu', 'OFFICIAL'],
  ['stanford.edu', 'OFFICIAL'],
  ['caltech.edu', 'OFFICIAL'],
  ['ox.ac.uk', 'OFFICIAL'],
  ['cam.ac.uk', 'OFFICIAL'],
  ['.gov', 'OFFICIAL'],
  ['.edu', 'OFFICIAL'],
  ['.int', 'OFFICIAL'],

  // ── SECONDARY: established journalism + research orgs ──
  ['nytimes.com', 'SECONDARY'],
  ['washingtonpost.com', 'SECONDARY'],
  ['reuters.com', 'SECONDARY'],
  ['apnews.com', 'SECONDARY'],
  ['bbc.com', 'SECONDARY'],
  ['bbc.co.uk', 'SECONDARY'],
  ['theguardian.com', 'SECONDARY'],
  ['wsj.com', 'SECONDARY'],
  ['bloomberg.com', 'SECONDARY'],
  ['npr.org', 'SECONDARY'],
  ['economist.com', 'SECONDARY'],
  ['nationalgeographic.com', 'SECONDARY'],
  ['scientificamerican.com', 'SECONDARY'],
  ['newscientist.com', 'SECONDARY'],
  ['space.com', 'SECONDARY'],
  ['theblackvault.com', 'SECONDARY'],
  ['nicap.org', 'SECONDARY'],
  ['cufos.org', 'SECONDARY'],
  ['mufon.com', 'SECONDARY'],
  ['wikipedia.org', 'SECONDARY'],
];

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

export function classifySource(url: string): SourceTier {
  const host = hostOf(url);
  if (!host) return 'UNVERIFIED';
  for (const [suffix, tier] of DOMAIN_TIERS) {
    if (host === suffix.replace(/^\./, '') || host.endsWith(suffix)) return tier;
  }
  return 'UNVERIFIED';
}

export interface TierBreakdown {
  primary: number;
  official: number;
  secondary: number;
  unverified: number;
  total: number;
  /** Highest tier achieved across all citations. */
  best: SourceTier;
}

export function summarizeSources(urls: string[]): TierBreakdown {
  const b: TierBreakdown = {
    primary: 0,
    official: 0,
    secondary: 0,
    unverified: 0,
    total: urls.length,
    best: 'UNVERIFIED',
  };
  const order: SourceTier[] = ['PRIMARY', 'OFFICIAL', 'SECONDARY', 'UNVERIFIED'];
  let bestIdx = 3;
  for (const u of urls) {
    const t = classifySource(u);
    if (t === 'PRIMARY') b.primary++;
    else if (t === 'OFFICIAL') b.official++;
    else if (t === 'SECONDARY') b.secondary++;
    else b.unverified++;
    const idx = order.indexOf(t);
    if (idx < bestIdx) bestIdx = idx;
  }
  b.best = order[bestIdx];
  return b;
}
