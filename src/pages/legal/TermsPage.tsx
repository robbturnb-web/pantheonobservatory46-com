import { SEO } from '@/components/SEO';

export function TermsPage() {
  return (
    <>
      <SEO title="Terms · Pantheon Frequency 46" description="Pantheon Frequency 46 terms of use." />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
        <h1>Terms of Use</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <h2>Use of the platform</h2>
        <p>
          Pantheon Frequency 46 is provided as-is for research, education, and exploration. You
          agree not to abuse the platform, scrape it for resale, or upload illegal content.
        </p>

        <h2>Community submissions</h2>
        <p>
          Testimonies and submitted sources may be reviewed, edited, or removed at our discretion.
          Do not submit copyrighted material you do not own.
        </p>

        <h2>No warranties</h2>
        <p>
          Live feeds depend on third-party APIs and may be delayed, cached, or unavailable. See
          our <a href="/disclaimer">disclaimer</a> for the full content posture.
        </p>
      </main>
    </>
  );
}

export default TermsPage;
