import { SEO } from '@/components/SEO';
import { Walkthrough } from '@/components/Walkthrough';
import { TempleObservatoryPage } from './home/TempleObservatoryPage';

export function HomePage() {
  return (
    <>
      <SEO
        title="Pantheon Frequency 46 — Temple Observatory"
        description="A cinematic cosmic operating system. UAP cases, mythology, consciousness, live solar weather, and Echo AI — all in one observatory."
        canonical="/"
      />
      <Walkthrough />
      <TempleObservatoryPage />
    </>
  );
}
