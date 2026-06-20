import { SEO } from '@/components/SEO';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { ContentTrustBadge } from '@/components/ContentTrustBadge';
import { restrictedLocations } from '@/data/restricted-locations';
import { Lock, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

export function RestrictedLocationsPage() {
  return (
    <>
      <SEO
        title="Restricted Locations — Verified Facts vs Claims | Pantheon"
        description="Area 51, Skinwalker Ranch, Pine Gap, Cheyenne Mountain, Vatican Archives — each case file strictly separates known facts from claims and theories."
        canonical="/restricted"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-disclosure font-mono">Classified Atlas · 08 sites</span>
          <span className="h-px flex-1 bg-realm-disclosure/30" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3">
          Restricted <span className="text-realm-disclosure">Locations</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-6">
          Each entry rigorously separates what is verified from what is alleged.
          Speculation is never presented as fact.
        </p>
        <SourceIntegrityPanel className="mb-8" />

        <div className="space-y-4">
          {restrictedLocations.map((r) => (
            <article
              key={r.id}
              className="rounded-xl border border-realm-disclosure/25 bg-card/50 backdrop-blur p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg border border-realm-disclosure/40 bg-realm-disclosure/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-realm-disclosure" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg text-foreground leading-tight">{r.name}</h2>
                    <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-realm-disclosure/80 mt-0.5">
                      {r.region} · {r.classification}
                    </p>
                  </div>
                </div>
                <ContentTrustBadge trust={r.trust} compact />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="rounded-lg border border-signal-online/30 bg-signal-online/5 p-4">
                  <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-signal-online mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Known Facts
                  </h3>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {r.knownFacts.map((f, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-signal-online">·</span><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-realm-observatory/30 bg-realm-observatory/5 p-4">
                  <h3 className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-realm-observatory mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" /> Claims &amp; Theories
                  </h3>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {r.claimsAndTheories.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-realm-observatory">·</span><span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-end">
                {r.sourceUrl ? (
                  <a
                    href={r.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1.5px] font-mono text-realm-disclosure hover:text-realm-disclosure/80"
                  >
                    {r.source} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground">
                    {r.source}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default RestrictedLocationsPage;
