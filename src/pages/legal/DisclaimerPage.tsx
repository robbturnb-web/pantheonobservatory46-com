import { SEO } from '@/components/SEO';

export function DisclaimerPage() {
  return (
    <>
      <SEO
        title="Disclaimer · Pantheon Frequency 46"
        description="How Pantheon Frequency 46 separates official sources, mythology, and speculation."
      />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
        <h1>Disclaimer</h1>
        <p className="text-base">
          Pantheon Frequency 46 contains a mix of official sources, historical material,
          mythology, folklore, speculative theories, and community research. Content should not
          be treated as legal, medical, financial, scientific, or government-confirmed fact
          unless directly linked to official verified sources.
        </p>
        <p>
          Every claim on the platform is tagged with a content-trust badge —{' '}
          <strong>Verified Fact</strong>, <strong>Official Source</strong>,{' '}
          <strong>Historical Record</strong>, <strong>Academic Source</strong>,{' '}
          <strong>Myth / Lore</strong>, <strong>Speculative</strong>,{' '}
          <strong>Community Theory</strong>, or <strong>Needs Review</strong>. Always check
          the badge and the linked source before acting on anything you read here.
        </p>
        <p>
          Pantheon is not affiliated with any government, military, or intelligence agency.
        </p>
      </main>
    </>
  );
}

export default DisclaimerPage;
