import { SEO } from '@/components/SEO';
import { MissionCard } from '@/components/cards/MissionCard';
import { useMissionProgress } from '@/hooks/use-mission-progress';

export function MissionsPage() {
  const { missions, complete } = useMissionProgress();
  const completed = missions.filter((m) => m.complete).length;
  return (
    <>
      <SEO
        title="Missions · Pantheon Frequency 46"
        description="Active missions, learning paths, and XP rewards across the Pantheon archive."
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <p className="text-[10px] uppercase tracking-[3px] text-primary">Missions</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mt-2">
            Open Briefings
          </h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl">
            Active assignments across UAP research, lore study, source verification, and community
            signal-tracking. {completed} of {missions.length} complete.
          </p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} onComplete={() => complete(m.id)} />
          ))}
        </section>
      </main>
    </>
  );
}

export default MissionsPage;
