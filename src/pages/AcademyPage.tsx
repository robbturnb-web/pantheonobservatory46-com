import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { SourceIntegrityPanel } from '@/components/SourceIntegrityPanel';
import { learningPaths, quizCategories } from '@/data/learning-paths';
import { BookOpen, Trophy, Clock, Zap, ArrowRight, HelpCircle } from 'lucide-react';

const diffColor: Record<string, string> = {
  Beginner: 'text-signal-online border-signal-online/50',
  Intermediate: 'text-realm-cosmos border-realm-cosmos/50',
  Advanced: 'text-realm-disclosure border-realm-disclosure/50',
};

export function AcademyPage() {
  return (
    <>
      <SEO
        title="Pantheon Academy — Learning Paths, Quizzes, XP | Pantheon"
        description="Mythology, ancient civilizations, space weather, UAP disclosure, source literacy. Earn XP and unlock ranks as you learn."
        canonical="/academy"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-cosmos font-mono">Academy · {learningPaths.length} paths</span>
          <span className="h-px flex-1 bg-realm-cosmos/30" />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-3">
          Pantheon <span className="text-realm-cosmos">Academy</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-6">
          Curated learning paths through Pantheon. Complete a path, earn XP, climb the ranks.
        </p>
        <SourceIntegrityPanel className="mb-8" />

        <h2 className="text-xs uppercase tracking-[0.25em] text-realm-cosmos font-mono mb-4">Learning Paths</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {learningPaths.map((p) => (
            <article key={p.id} className="rounded-xl border border-realm-cosmos/25 bg-card/50 backdrop-blur p-5 flex flex-col hover:border-realm-cosmos/60 transition">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg border border-realm-cosmos/40 bg-realm-cosmos/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-realm-cosmos" />
                </div>
                <span className={`text-[9px] uppercase tracking-[1.5px] font-mono px-2 py-0.5 rounded-full border ${diffColor[p.difficulty]}`}>
                  {p.difficulty}
                </span>
              </div>
              <h3 className="font-display text-lg text-foreground leading-tight mb-1">{p.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {p.topics.map((t) => (
                  <span key={t} className="text-[9px] uppercase tracking-[1px] font-mono px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-border/40 text-[10px] font-mono text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {p.estimatedMinutes}m</span>
                <span className="inline-flex items-center gap-1 text-realm-gods"><Zap className="w-3 h-3" /> {p.xpReward} XP</span>
                <Link to={p.startRoute} className="ml-auto inline-flex items-center gap-1 text-realm-cosmos hover:text-realm-cosmos/80">
                  Start <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Quiz Teaser */}
        <div className="rounded-2xl border border-realm-gods/30 bg-gradient-to-br from-realm-gods/10 to-transparent backdrop-blur p-8">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl border border-realm-gods/50 bg-realm-gods/15 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-realm-gods" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">Take the Pantheon Knowledge Trial</h2>
              <p className="text-sm text-muted-foreground mt-1">Pick a category. Earn the rank. Climb the path.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {quizCategories.map((q) => (
              <div key={q.id} className="rounded-lg border border-realm-gods/30 bg-card/50 p-3 text-center opacity-80">
                <HelpCircle className="w-4 h-4 mx-auto mb-1.5 text-realm-gods" />
                <div className="font-display text-sm text-foreground">{q.title}</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-1">
                  {q.questionCount} Q · {q.xpReward} XP
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-[1.5px] font-mono text-muted-foreground mt-4 text-center">
            Quiz engine launching shortly — categories above will become playable
          </p>
        </div>
      </div>
    </>
  );
}

export default AcademyPage;
