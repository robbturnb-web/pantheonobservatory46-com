import { SEO } from '@/components/SEO';
import { Mail } from 'lucide-react';
import { CosmicCard } from '@/components/cards/CosmicCard';

export function ContactPage() {
  return (
    <>
      <SEO title="Contact · Pantheon Frequency 46" description="Reach the Pantheon team." />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <p className="text-[10px] uppercase tracking-[3px] text-primary">Contact</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2">
            Open the Channel
          </h1>
          <p className="text-sm text-muted-foreground mt-3">
            Source submissions, broken-link reports, partnership requests, or general signal.
          </p>
        </header>
        <CosmicCard className="p-5 flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          <a href="mailto:contact@pantheonobservatory46.com" className="text-sm text-foreground hover:text-primary">
            contact@pantheonobservatory46.com
          </a>
        </CosmicCard>
      </main>
    </>
  );
}

export default ContactPage;
