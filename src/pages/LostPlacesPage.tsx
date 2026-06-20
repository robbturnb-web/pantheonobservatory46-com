import { SEO } from '@/components/SEO';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { ContentTrustBadge } from '@/components/ContentTrustBadge';
import { lostPlaces } from '@/data/lost-places';
import { MapPin, Compass, ExternalLink } from 'lucide-react';

export function LostPlacesPage() {
  return (
    <>
      <SEO
        title="Lost Places Archive — Atlantis, Lemuria, El Dorado | Pantheon"
        description="Submerged cities, lost continents, and legendary lands — separated into myth, theory, and archaeologically confirmed."
        canonical="/lost-places"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-observatory font-mono">Atlas · 08 locations</span>
          <span className="h-px flex-1 bg-realm-observatory/30" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3">
          Lost <span className="text-realm-observatory">Places</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-6">
          Cities the seas swallowed, kingdoms the maps lost, and lands that may
          have only ever lived in story. Read with discernment.
        </p>
        <SourceIntegrityPanel className="mb-8" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lostPlaces.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border border-primary/25 bg-card/50 backdrop-blur p-5 hover:border-primary/60 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg border border-primary/40 bg-primary/10 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-primary" />
                </div>
                <ContentTrustBadge trust={p.trust} compact />
              </div>
              <h2 className="font-display text-lg text-foreground leading-tight">{p.name}</h2>
              <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-primary/80 mt-0.5 mb-2">
                {p.region}
              </p>
              <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground mb-3">
                Status · {p.status}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{p.summary}</p>
              <p className="text-[11px] italic text-foreground/80 mb-4">{p.legend}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                {p.coordinates ? (
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono text-realm-observatory">
                    <MapPin className="w-3 h-3" /> {p.coordinates}
                  </span>
                ) : <span />}
                {p.sourceUrl ? (
                  <a
                    href={p.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1.5px] font-mono text-primary hover:text-primary/80"
                  >
                    {p.source} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground">
                    {p.source}
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

export default LostPlacesPage;
