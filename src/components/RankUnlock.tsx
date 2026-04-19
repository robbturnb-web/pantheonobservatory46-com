import { Lock } from 'lucide-react';
import { useEchoXp } from '@/hooks/use-echo-xp';

interface RankUnlockProps {
  /** Minimum XP required to view the children */
  minXp: number;
  /** Friendly rank name shown when locked, e.g. "Adept" */
  rankName: string;
  /** Label for the locked content type, e.g. "hidden lore" */
  label?: string;
  children: React.ReactNode;
}

/**
 * Gates content behind an XP threshold.
 * Shows a teaser/lock UI when below threshold; renders children when unlocked.
 */
export function RankUnlock({ minXp, rankName, label = 'hidden lore', children }: RankUnlockProps) {
  const { xp, userId } = useEchoXp();

  if (userId && xp >= minXp) {
    return <>{children}</>;
  }

  const xpNeeded = userId ? minXp - xp : minXp;

  return (
    <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
      <Lock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
      <div className="text-xs text-muted-foreground leading-relaxed">
        <span className="text-primary font-semibold">{rankName} rank</span> required to unveil this {label}.
        {userId ? (
          <> Earn <span className="text-foreground font-semibold">{xpNeeded} more XP</span> to unlock.</>
        ) : (
          <> Sign in and start exploring to earn rank.</>
        )}
      </div>
    </div>
  );
}
