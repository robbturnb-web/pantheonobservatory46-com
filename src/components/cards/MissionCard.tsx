import { CheckCircle2, Sparkles } from 'lucide-react';
import { CosmicCard } from './CosmicCard';
import type { MissionState } from '@/hooks/use-mission-progress';

interface Props {
  mission: MissionState;
  onComplete?: () => void;
}

export function MissionCard({ mission, onComplete }: Props) {
  const pct = Math.round((mission.progress / mission.target) * 100);
  return (
    <CosmicCard className="p-4 flex flex-col gap-3">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{mission.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{mission.description}</p>
        </div>
        <span className="text-[10px] uppercase tracking-[1.5px] text-primary">
          +{mission.xpReward} XP
        </span>
      </header>

      <div className="space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-muted/30 overflow-hidden">
          <div
            className={`h-full transition-all ${mission.complete ? 'bg-signal-online' : 'bg-primary'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[1.5px] text-muted-foreground">
          <span>{mission.category}</span>
          <span>
            {mission.progress} / {mission.target}
          </span>
        </div>
      </div>

      {mission.complete ? (
        <div className="inline-flex items-center gap-1.5 text-xs text-signal-online">
          <CheckCircle2 className="w-4 h-4" /> Complete
        </div>
      ) : onComplete ? (
        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs text-primary hover:bg-primary/20 transition"
        >
          <Sparkles className="w-3.5 h-3.5" /> Mark complete
        </button>
      ) : null}
    </CosmicCard>
  );
}

export default MissionCard;
