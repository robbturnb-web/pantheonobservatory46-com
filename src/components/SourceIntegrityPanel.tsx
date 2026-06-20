/**
 * SourceIntegrityPanel — reusable legend that explains Pantheon's
 * FACT / MYTH / THEORY / SPECULATION labels. Drop into any page header.
 */
import { ContentTrustBadge } from './ContentTrustBadge';

interface Props {
  compact?: boolean;
  className?: string;
}

export function SourceIntegrityPanel({ compact, className }: Props) {
  if (compact) {
    return (
      <div className={`flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground ${className ?? ''}`}>
        <span className="uppercase tracking-[2px]">Source Integrity:</span>
        <ContentTrustBadge trust="VERIFIED_FACT" compact />
        <ContentTrustBadge trust="HISTORICAL_RECORD" compact />
        <ContentTrustBadge trust="MYTH_LORE" compact />
        <ContentTrustBadge trust="SPECULATIVE" compact />
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-primary/20 bg-card/40 backdrop-blur p-5 ${className ?? ''}`}>
      <h3 className="text-xs uppercase tracking-[0.25em] text-realm-observatory font-mono mb-3">
        Source Integrity Framework
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Pantheon separates verified information, mythology, theory, and speculation so visitors
        can explore mysteries without confusing belief with evidence.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="VERIFIED_FACT" />
          <p className="text-xs text-muted-foreground">Independently confirmed by multiple primary sources.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="HISTORICAL_RECORD" />
          <p className="text-xs text-muted-foreground">Documented in archives, museums, or accepted history.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="MYTH_LORE" />
          <p className="text-xs text-muted-foreground">Mythology or folklore — symbolic, not literal.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="SPECULATIVE" />
          <p className="text-xs text-muted-foreground">A hypothesis or open question — not established fact.</p>
        </div>
      </div>
    </div>
  );
}

export default SourceIntegrityPanel;
