import { SEO } from '@/components/SEO';
import { Walkthrough } from '@/components/Walkthrough';
import { TempleObservatoryPage } from './home/TempleObservatoryPage';

export function HomePage() {
  return (
    <>
      <SEO
        title="Pantheon Frequency 46 — Cosmic Disclosure Archive"
        description="A cinematic cosmic operating system. UAP cases, mythology, consciousness, live solar weather, and Echo AI — all in one observatory."
        canonical="/"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Pantheon Observatory',
            url: 'https://pantheonobservatory46-com.lovable.app/',
            description: 'A cinematic cosmic operating system for UAP, mythology, consciousness, and disclosure.',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Pantheon Observatory',
            url: 'https://pantheonobservatory46-com.lovable.app/',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://pantheonobservatory46-com.lovable.app/echo?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          },
        ]}
      />
      <Walkthrough />
      <TempleObservatoryPage />
    </>
  );
}
