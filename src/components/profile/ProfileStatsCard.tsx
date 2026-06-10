import { CosmicCard } from '@/components/cards/CosmicCard';
import { getMissionTier } from '@/lib/mission-tiers';

interface Props {
  xp: number;
  rank: string;
  streak?: number;
  badgesCount?: number;
  savedSources?: number;
  brokenReports?: number;
}

export function ProfileStatsCard({
  xp,
  rank,
  streak = 0,
  badgesCount = 0,
  savedSources = 0,
  brokenReports = 0,
}: Props) {
  const tier = getMissionTier(xp);
  return (
    <CosmicCard className="p-5 space-y-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[2px] text-muted-foreground">
            Level {tier.current.level} · {tier.current.name}
          </p>
          <h2 className="text-xl font-semibold text-foreground mt-1">{xp.toLocaleString()} XP</h2>
          <p className="text-xs text-muted-foreground italic">{tier.current.blurb}</p>
        </div>
        <span className="text-[10px] uppercase tracking-[1.5px] text-primary">{rank}</span>
      </header>

      <div className="space-y-1.5">
        <div className="h-2 w-full rounded-full bg-muted/30 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-realm-cosmos" style={{ width: `${tier.progressPct}%` }} />
        </div>
        {tier.next ? (
          <p className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground">
            {tier.xpToNext} XP to {tier.next.name}
          </p>
        ) : (
          <p className="text-[10px] uppercase tracking-[1.5px] text-signal-online">Max tier reached</p>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-3 text-xs">
        <Stat label="Streak" value={`${streak}d`} />
        <Stat label="Badges" value={badgesCount} />
        <Stat label="Saved sources" value={savedSources} />
        <Stat label="Broken reports" value={brokenReports} />
      </dl>
    </CosmicCard>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border/60 bg-card/30 p-3">
      <dt className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground">{label}</dt>
      <dd className="text-base font-semibold text-foreground mt-0.5">{value}</dd>
    </div>
  );
}

export default ProfileStatsCard;
