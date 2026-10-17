import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';
import { humanPotential } from '@/data/human-potential';
import { Brain, Heart, Wind, Activity, Moon, Sparkles, BookOpen, Compass, Zap, Target, Play, Check } from 'lucide-react';
import { toast } from 'sonner';

const iconFor: Record<string, typeof Brain> = {
  meditation: Brain, focus: Target, memory: BookOpen, sleep: Moon,
  breathwork: Wind, fitness: Activity, emotion: Heart, flow: Sparkles,
  philosophy: BookOpen, discipline: Compass,
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readCompletions(day: string): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(`pantheon:human-potential:${day}`) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

export function HumanPotentialPage() {
  const [day, setDay] = useState(todayKey);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(readCompletions(day));
  }, [day]);

  useEffect(() => {
    const refreshDay = () => {
      const nextDay = todayKey();
      if (nextDay !== day) setDay(nextDay);
    };
    const timer = window.setInterval(refreshDay, 60_000);
    return () => window.clearInterval(timer);
  }, [day]);

  const togglePractice = (id: string, topic: string) => {
    const next = completed.includes(id)
      ? completed.filter((item) => item !== id)
      : [...completed, id];
    setCompleted(next);
    try {
      localStorage.setItem(`pantheon:human-potential:${day}`, JSON.stringify(next));
      toast.success(next.includes(id) ? `Practice complete · ${topic}` : `Completion undone · ${topic}`);
    } catch {
      toast.error('Could not save this practice on this device.');
    }
  };

  return (
    <>
      <SEO
        title="Human Potential — Daily Practice & Wellness | Pantheon"
        description="Practical, evidence-based practices: meditation, focus, sleep, breathwork, fitness, emotional regulation, flow, philosophy, discipline."
        canonical="/human-potential"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-echo font-mono">Practice · 10 disciplines</span>
          <span className="h-px flex-1 bg-realm-echo/30" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3">
          Human <span className="text-realm-echo">Potential</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-3">
          Pantheon isn't just about what's out there. It's about what you can practice, one day at a time.
          Educational practices, not medical advice.
        </p>
        <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground mb-6">
          ⚕ Educational wellness content · not a substitute for professional medical care
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-realm-echo/25 bg-realm-echo/5 p-4 mb-8">
          <div>
            <p className="text-sm font-medium text-foreground">Today's practice log</p>
            <p className="text-xs text-muted-foreground mt-1">Completions save on this device and reset each day.</p>
          </div>
          <p className="text-sm font-mono text-realm-echo">{completed.length} / {humanPotential.length} complete</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {humanPotential.map((p) => {
            const Icon = iconFor[p.id] ?? Sparkles;
            const isComplete = completed.includes(p.id);
            return (
              <article key={p.id} className={`rounded-xl border bg-card/50 backdrop-blur p-5 flex flex-col transition ${
                isComplete ? 'border-signal-online/50' : 'border-realm-echo/25 hover:border-realm-echo/60'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg border border-realm-echo/40 bg-realm-echo/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-realm-echo" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[1.5px] font-mono px-2 py-0.5 rounded-full border border-muted-foreground/30 text-muted-foreground">
                    {p.tradition}
                  </span>
                </div>
                <h2 className="font-display text-lg text-foreground leading-tight mb-2">{p.topic}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{p.summary}</p>
                <div className="rounded-lg bg-realm-echo/5 border border-realm-echo/20 p-3 mb-3">
                  <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-realm-echo mb-1">Today's practice</p>
                  <p className="text-xs text-foreground/90 leading-relaxed">{p.dailyPractice}</p>
                </div>
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40 mt-auto">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-realm-gods">
                    <Zap className="w-3 h-3" /> {p.xpReward} XP potential
                  </span>
                  <button
                    type="button"
                    aria-pressed={isComplete}
                    onClick={() => togglePractice(p.id, p.topic)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] uppercase tracking-[1px] font-mono transition ${
                      isComplete
                        ? 'border-signal-online/50 bg-signal-online/10 text-signal-online'
                        : 'border-realm-echo/40 text-realm-echo hover:bg-realm-echo/10'
                    }`}
                  >
                    {isComplete ? <Check className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isComplete ? 'Done today' : 'Mark complete'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HumanPotentialPage;
