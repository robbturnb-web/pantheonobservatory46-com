import { SEO } from '@/components/SEO';
import { CosmicCard } from '@/components/cards/CosmicCard';
import { ContentTrustBadge } from '@/components/ContentTrustBadge';
import { CONTENT_TRUST_VISUAL, type ContentTrust } from '@/lib/content-trust';

const TIERS: ContentTrust[] = [
  'VERIFIED_FACT',
  'OFFICIAL_SOURCE',
  'HISTORICAL_RECORD',
  'ACADEMIC_SOURCE',
  'MYTH_LORE',
  'SPECULATIVE',
  'COMMUNITY_THEORY',
  'UNSOURCED_PENDING_REVIEW',
];

export function SourcesPage() {
  return (
    <>
      <SEO
        title="Sources & Trust Tiers · Pantheon Frequency 46"
        description="How Pantheon labels evidence, lore, and speculation across the archive."
      />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-[10px] uppercase tracking-[3px] text-primary">Sources</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2">
            Facts vs Speculation
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            Every claim on Pantheon is tagged with one of the badges below so you can see
            instantly whether something is documented fact, mythology, or pending review.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIERS.map((t) => (
            <CosmicCard key={t} className="p-4 flex items-start gap-3">
              <ContentTrustBadge trust={t} />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{CONTENT_TRUST_VISUAL[t].label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{CONTENT_TRUST_VISUAL[t].description}</p>
              </div>
            </CosmicCard>
          ))}
        </section>
      </main>
    </>
  );
}

export default SourcesPage;
