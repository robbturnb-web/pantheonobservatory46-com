import { SEO } from '@/components/SEO';
import { TempleObservatoryPage } from './home/TempleObservatoryPage';
import { PantheonDailyBrief } from '@/components/home/PantheonDailyBrief';
import { MysteryOfTheDay } from '@/components/home/MysteryOfTheDay';
import { PantheonPathTeaser } from '@/components/home/PantheonPathTeaserHome';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { Link } from 'react-router-dom';
import { ArrowRight, Radio, Sparkles } from 'lucide-react';

const SITE_URL = 'https://pantheonobservatory46.com';

export function HomePage() {
  return (
    <>
      <SEO
        title="Pantheon Frequency 46 — Evidence-Led Cosmic Observatory & Archive"
        description="Evidence-led research into UAP cases, mythology, consciousness, and live solar weather — facts, theories, beliefs, and the unexplained, clearly separated."
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
      <PantheonDailyBrief />
      <MysteryOfTheDay />
      <PantheonPathTeaser />

      {/* Product funnel: discover → investigate → return → join. */}
      <section className="px-3 sm:px-6 py-14">
        <div className="max-w-7xl mx-auto glass-cosmic rounded-3xl p-6 sm:p-10 border border-primary/20">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[3px] text-accent-neon mb-3">
                <Radio className="w-3.5 h-3.5" /> Frequency 46
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Go deeper than the public signal.
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Explore the public Observatory free. When you want deeper research, curated signal,
                and a place to build your own investigation trail, Frequency 46 is the next layer.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                to="/echo"
                className="group rounded-2xl border border-border bg-background/40 p-5 hover:border-primary/50 transition-colors"
              >
                <Sparkles className="w-5 h-5 text-accent-neon mb-3" />
                <div className="font-semibold text-foreground">Ask Echo</div>
                <div className="text-xs text-muted-foreground mt-1">Turn a question into a research trail.</div>
                <ArrowRight className="w-4 h-4 mt-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/frequencies"
                className="group rounded-2xl border border-border bg-background/40 p-5 hover:border-primary/50 transition-colors"
              >
                <Radio className="w-5 h-5 text-accent-neon mb-3" />
                <div className="font-semibold text-foreground">Enter Frequencies</div>
                <div className="text-xs text-muted-foreground mt-1">Follow curated voices and signal ratings.</div>
                <ArrowRight className="w-4 h-4 mt-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-3 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <SourceIntegrityPanel />
        </div>
      </section>
    </>
  );
}
