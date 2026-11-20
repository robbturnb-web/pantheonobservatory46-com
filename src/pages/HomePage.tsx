import { SEO } from '@/components/SEO';
import { TempleObservatoryPage } from './home/TempleObservatoryPage';
import { PantheonDailyBrief } from '@/components/home/PantheonDailyBrief';
import { MysteryOfTheDay } from '@/components/home/MysteryOfTheDay';
import { PantheonPathTeaser } from '@/components/home/PantheonPathTeaserHome';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SITE_URL = 'https://pantheonobservatory46.com';

export function HomePage() {
  return (
    <>
      <SEO
        title="Pantheon Observatory 46 — Independent Research Archive for UAP, Science & History"
        description="An independent public-source archive examining UAP, government records, space and earth science, history, consciousness and cultural traditions — every source dated and labeled."
        canonical={`${SITE_URL}/`}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Pantheon Observatory',
            url: SITE_URL,
            description: 'Evidence-led research into UAP, mythology, consciousness, and disclosure — facts, theories, beliefs, and open questions kept separate.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Pantheon Observatory',
            url: SITE_URL,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${SITE_URL}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          },
        ]}
      />

      <TempleObservatoryPage />
      <section className="px-4 sm:px-6 py-8 border-y border-border bg-background/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h2 className="font-display text-2xl text-foreground">Join Pantheon Observatory 46</h2>
            <p className="text-sm text-muted-foreground mt-2">Save your research trail, track what you have read, and join member discussions.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild><Link to="/auth?mode=signup&redirect=/profile">Join Pantheon <ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link to="/auth?mode=signin&redirect=/profile">Sign in</Link></Button>
          </div>
        </div>
      </section>
      <PantheonDailyBrief />
      <MysteryOfTheDay />
      <PantheonPathTeaser />

      <section className="px-3 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <SourceIntegrityPanel />
        </div>
      </section>
    </>
  );
}
