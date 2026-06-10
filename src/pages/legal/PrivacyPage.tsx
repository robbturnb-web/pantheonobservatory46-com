import { SEO } from '@/components/SEO';

export function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy · Pantheon Frequency 46" description="Pantheon Frequency 46 privacy policy." />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <h2>What we collect</h2>
        <p>
          Pantheon Frequency 46 collects the minimum data needed to operate: account email (if
          you sign up), XP / mission progress, optional community submissions, and standard
          server logs (IP, user agent, request paths).
        </p>

        <h2>How we use it</h2>
        <p>
          Data is used solely to operate the platform — authentication, progress tracking,
          community moderation, abuse prevention. We do not sell user data.
        </p>

        <h2>Third-party services</h2>
        <p>
          We rely on Supabase (auth, database, edge functions), official APIs (NASA, NOAA, USGS,
          NWS), and YouTube embeds. Each provider has its own privacy policy.
        </p>

        <h2>Your rights</h2>
        <p>
          You can request export or deletion of your account at any time via the contact page.
        </p>
      </main>
    </>
  );
}

export default PrivacyPage;
