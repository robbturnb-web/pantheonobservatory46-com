import { Award, Lock } from 'lucide-react';
import { CosmicCard } from '@/components/cards/CosmicCard';

export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  /** Minimum XP, OR an external earned flag. */
  unlockAtXp?: number;
  earned?: boolean;
}

export const PANTHEON_BADGES: BadgeDef[] = [
  { id: 'first-signal', name: 'First Signal', description: 'Opened your first dossier.', unlockAtXp: 10 },
  { id: 'source-hunter', name: 'Source Hunter', description: 'Opened 25 verified sources.', unlockAtXp: 250 },
  { id: 'truth-splitter', name: 'Truth Splitter', description: 'Compared myth vs. official source.', unlockAtXp: 300 },
  { id: 'lore-keeper', name: 'Lore Keeper', description: 'Completed 5 lore entries.', unlockAtXp: 400 },
  { id: 'skywatcher', name: 'Skywatcher', description: 'Watched 10 live feed updates.', unlockAtXp: 500 },
  { id: 'deep-archive', name: 'Deep Archive', description: 'Reached the Mystic rank.', unlockAtXp: 600 },
  { id: 'verified-mind', name: 'Verified Mind', description: 'Submitted a verified source.', unlockAtXp: 700 },
  { id: 'pantheon-founder', name: 'Pantheon Founder', description: 'Reached Pantheon Builder tier.', unlockAtXp: 1900 },
  { id: 'frequency-46', name: 'Frequency 46', description: 'Stand in the canon.', unlockAtXp: 3500 },
];

interface Props {
  xp: number;
  earnedOverrides?: Record<string, boolean>;
}

export function BadgeGrid({ xp, earnedOverrides = {} }: Props) {
  return (
    <CosmicCard className="p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3">Badges</h3>
      <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {PANTHEON_BADGES.map((b) => {
          const earned = earnedOverrides[b.id] ?? (b.unlockAtXp !== undefined && xp >= b.unlockAtXp);
          return (
            <li
              key={b.id}
              className={`flex flex-col items-center gap-1.5 rounded-md border p-3 text-center transition ${
                earned
                  ? 'border-primary/40 bg-primary/5 text-foreground'
                  : 'border-border/40 bg-muted/10 text-muted-foreground opacity-60'
              }`}
              title={b.description}
            >
              {earned ? <Award className="w-6 h-6 text-primary" /> : <Lock className="w-6 h-6" />}
              <span className="text-[10px] uppercase tracking-[1.5px] leading-tight">{b.name}</span>
            </li>
          );
        })}
      </ul>
    </CosmicCard>
  );
}

export default BadgeGrid;
