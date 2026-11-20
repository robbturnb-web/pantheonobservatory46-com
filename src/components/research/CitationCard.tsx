import { ExternalLink } from 'lucide-react';
import { SOURCE_TIER_LABEL, CLAIM_STATUS_LABEL, type Citation, type ClaimStatus } from '@/lib/evidence';

export function TierChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-border bg-muted/40 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

export function StatusChip({ status }: { status: ClaimStatus }) {
  const strong = status === 'verified' || status === 'official-statement' || status === 'academic' || status === 'historical';
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${strong ? 'border-realm-gods/50 text-realm-gods' : 'border-primary/40 text-primary'}`}>
      {CLAIM_STATUS_LABEL[status]}
    </span>
  );
}

/** One source line: title, publisher, date, tier, direct link, scope notes. */
export function CitationCard({ c, status }: { c: Citation; status?: ClaimStatus }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-4">
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        <TierChip>{SOURCE_TIER_LABEL[c.tier]}</TierChip>
        {status && <StatusChip status={status} />}
        <span className="text-xs text-muted-foreground">{c.publisher} · {c.date}</span>
      </div>
      <a href={c.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1.5 font-semibold text-foreground hover:text-realm-gods">
        <span>{c.title}</span>
        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 opacity-60 group-hover:opacity-100" aria-hidden />
        <span className="sr-only">(opens original source)</span>
      </a>
      {(c.establishes || c.doesNotEstablish) && (
        <dl className="mt-3 space-y-1.5 text-sm">
          {c.establishes && (<div><dt className="inline font-medium text-foreground">Establishes: </dt><dd className="inline text-muted-foreground">{c.establishes}</dd></div>)}
          {c.doesNotEstablish && (<div><dt className="inline font-medium text-foreground">Does not establish: </dt><dd className="inline text-muted-foreground">{c.doesNotEstablish}</dd></div>)}
        </dl>
      )}
    </div>
  );
}
