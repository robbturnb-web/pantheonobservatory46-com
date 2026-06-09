/**
 * SourceLabel — compact verification chip for any single citation.
 *
 * Pairs the existing live-data footer states (verified/cached/offline) with
 * the new static-source tier system (primary/official/secondary/unverified),
 * so any surface across Pantheon can display *exactly* what backs a claim.
 */
import { ExternalLink, ShieldCheck, Building2, Newspaper, HelpCircle } from 'lucide-react';
import { classifySource, TIER_VISUAL, type SourceTier } from '@/lib/source-tier';

const ICON: Record<SourceTier, typeof ShieldCheck> = {
  PRIMARY: ShieldCheck,
  OFFICIAL: Building2,
  SECONDARY: Newspaper,
  UNVERIFIED: HelpCircle,
};

interface SourceLabelProps {
  url: string;
  label?: string;
  /** Force a tier override (rare — e.g. a known-FOIA doc on a journalism domain). */
  tier?: SourceTier;
  /** Compact one-line variant for inline / footer use. */
  compact?: boolean;
  className?: string;
}

export function SourceLabel({ url, label, tier, compact, className }: SourceLabelProps) {
  const t = tier ?? classifySource(url);
  const v = TIER_VISUAL[t];
  const Icon = ICON[t];
  const display = label ?? (() => {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return url; }
  })();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${v.label} · ${display}`}
      className={`inline-flex items-center gap-1.5 rounded-md border transition hover:opacity-90 ${v.border} ${v.bg} ${
        compact ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'
      } ${className ?? ''}`}
    >
      <Icon className={`w-3 h-3 ${v.text}`} />
      <span className={`font-mono uppercase tracking-[1.5px] text-[9px] ${v.text}`}>
        {v.short}
      </span>
      <span className="text-foreground/80 truncate max-w-[160px]">{display}</span>
      <ExternalLink className="w-2.5 h-2.5 text-foreground/40" />
    </a>
  );
}

export default SourceLabel;
