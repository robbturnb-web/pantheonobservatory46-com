import { SEO } from '@/components/SEO';

export function AboutPage() {
  return (
    <>
      <SEO title="About · Pantheon Frequency 46" description="What Pantheon Frequency 46 is, and why." />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
        <h1>About Pantheon</h1>
        <p>
          Pantheon Frequency 46 is a cinematic cosmic operating system — a living observatory,
          research platform, disclosure archive, and intelligence dashboard for UAP research,
          ancient civilizations, consciousness research, space weather, and the cosmic
          questions humanity has asked since the beginning.
        </p>
        <p>
          Every claim is tagged with a content-trust badge so you can tell verified evidence
          apart from mythology, lore, and speculation. Live feeds are honest — when a source is
          offline, we say so.
        </p>
      </main>
    </>
  );
}

export default AboutPage;
