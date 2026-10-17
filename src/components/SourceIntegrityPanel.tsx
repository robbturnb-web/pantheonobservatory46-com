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
        <span className="uppercase tracking-[2px]">Evidence labels:</span>
        <ContentTrustBadge trust="VERIFIED_FACT" compact />
        <ContentTrustBadge trust="HISTORICAL_RECORD" compact />
        <ContentTrustBadge trust="MYTH_LORE" compact />
        <ContentTrustBadge trust="SPECULATIVE" compact />
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-primary/20 bg-card/40 p-5 backdrop-blur ${className ?? ''}`}>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-realm-observatory">
        Source Integrity Framework
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        Pantheon distinguishes documented evidence, official records, historical material, mythology,
        and hypotheses. A label describes the kind of support attached to an entry; it is not a guarantee
        that every interpretation is settled or independently verified. Open the linked source and assess
        what it directly supports.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="VERIFIED_FACT" />
          <p className="text-xs text-muted-foreground">Claims independently confirmed by multiple primary sources.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="OFFICIAL_SOURCE" />
          <p className="text-xs text-muted-foreground">A record published by a government, agency, or recognized institution. Official publication does not make every claim conclusive.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="HISTORICAL_RECORD" />
          <p className="text-xs text-muted-foreground">Material documented in archives, museums, or historical sources.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="ACADEMIC_SOURCE" />
          <p className="text-xs text-muted-foreground">Academic or peer-reviewed work. Check the study's methods, scope, and limitations.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="MYTH_LORE" />
          <p className="text-xs text-muted-foreground">Mythology or folklore, presented as cultural tradition rather than literal proof.</p>
        </div>
        <div className="flex items-start gap-3">
          <ContentTrustBadge trust="SPECULATIVE" />
          <p className="text-xs text-muted-foreground">A hypothesis or open question that is not established fact.</p>
        </div>
      </div>
    </div>
  );
}

export default SourceIntegrityPanel;
