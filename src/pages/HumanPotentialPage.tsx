import { SEO } from '@/components/SEO';
import { humanPotential } from '@/data/human-potential';
import { Brain, Heart, Wind, Activity, Moon, Sparkles, BookOpen, Compass, Zap, Target, Play } from 'lucide-react';

const iconFor: Record<string, typeof Brain> = {
  meditation: Brain, focus: Target, memory: BookOpen, sleep: Moon,
  breathwork: Wind, fitness: Activity, emotion: Heart, flow: Sparkles,
  philosophy: BookOpen, discipline: Compass,
};

export function HumanPotentialPage() {
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
          Pantheon isn't just about what's out there — it's about what you can become.
          Educational practices, not medical advice.
        </p>
        <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground mb-8">
          ⚕ Educational wellness content · not a substitute for professional medical care
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {humanPotential.map((p) => {
            const Icon = iconFor[p.id] ?? Sparkles;
            return (
              <article key={p.id} className="rounded-xl border border-realm-echo/25 bg-card/50 backdrop-blur p-5 flex flex-col hover:border-realm-echo/60 transition">
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
                <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-auto">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-realm-gods">
                    <Zap className="w-3 h-3" /> {p.xpReward} XP
                  </span>
                  <button className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1.5px] font-mono text-realm-echo hover:text-realm-echo/80">
                    <Play className="w-3 h-3" /> Start
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
