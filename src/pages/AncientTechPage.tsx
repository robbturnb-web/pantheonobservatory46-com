import { SEO } from '@/components/SEO';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { ContentTrustBadge } from '@/components/ContentTrustBadge';
import { ancientTechnologies } from '@/data/ancient-tech';
import { ExternalLink, Cog } from 'lucide-react';

export function AncientTechPage() {
  return (
    <>
      <SEO
        title="Ancient Technologies Archive — Pantheon"
        description="Antikythera, Roman concrete, Damascus steel, polygonal masonry — engineering we still cannot fully reproduce."
        canonical="/ancient-tech"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-gods font-mono">Archive · 08 files</span>
          <span className="h-px flex-1 bg-realm-gods/30" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3">
          Ancient <span className="text-realm-gods">Technologies</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-6">
          Engineering, metallurgy, optics, and navigation produced by civilizations
          without the tools we use today — and in some cases beyond them.
        </p>
        <SourceIntegrityPanel className="mb-8" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ancientTechnologies.map((t) => (
            <article
              key={t.id}
              className="rounded-xl border border-realm-gods/25 bg-card/50 backdrop-blur p-5 transition hover:border-realm-gods/60 hover:bg-card/70"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg border border-realm-gods/40 bg-realm-gods/10 flex items-center justify-center">
                  <Cog className="w-5 h-5 text-realm-gods" />
                </div>
                <ContentTrustBadge trust={t.trust} compact />
              </div>
              <h2 className="font-display text-lg text-foreground leading-tight">{t.name}</h2>
              <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-realm-gods/80 mt-0.5 mb-3">
                {t.civilization} · {t.era}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t.summary}</p>
              <p className="text-[11px] italic text-foreground/80 mb-4">{t.whyItMatters}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <span className="text-[9px] uppercase tracking-[1.5px] font-mono text-muted-foreground">
                  {t.type}
                </span>
                {t.sourceUrl ? (
                  <a
                    href={t.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1.5px] font-mono text-realm-gods hover:text-realm-gods/80"
                  >
                    {t.source} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground">
                    {t.source}
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

export default AncientTechPage;
