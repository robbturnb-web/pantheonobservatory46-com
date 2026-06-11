import { Link } from 'react-router-dom';
import { Award, BookOpen, Film, Brain, Bookmark, Sunrise } from 'lucide-react';

const RANKS = [
  { name: 'Seeker',    cls: 'text-foreground/80 border-white/15' },
  { name: 'Researcher',cls: 'text-cyan-300 border-cyan-400/40' },
  { name: 'Pathfinder',cls: 'text-emerald-300 border-emerald-400/40' },
  { name: 'Archivist', cls: 'text-amber-300 border-amber-400/40' },
  { name: 'Guardian',  cls: 'text-fuchsia-300 border-fuchsia-400/40' },
  { name: 'Ascendant', cls: 'text-primary border-primary/60 shadow-[0_0_20px_-4px_hsl(var(--primary)/0.7)]' },
];

const ACTIONS = [
  { Icon: BookOpen, label: 'Read an archive entry',  xp: '+10 XP' },
  { Icon: Film,     label: 'Watch a verified source',xp: '+15 XP' },
  { Icon: Brain,    label: 'Complete a mystery quiz',xp: '+25 XP' },
  { Icon: Bookmark, label: 'Save a discovery',        xp: '+5 XP' },
  { Icon: Sunrise,  label: 'Return daily',            xp: '+20 XP' },
];

export function PantheonPathTeaser() {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 text-center">
          <p className="text-[10px] uppercase tracking-[4px] text-primary mb-2">Progression</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Begin Your Pantheon Path
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            Six ranks. Every discovery moves you forward.
          </p>
        </header>

        <div className="rounded-2xl border border-white/10 bg-background/55 backdrop-blur-xl p-5 sm:p-6">
          {/* Rank ladder */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            {RANKS.map((r, i) => (
              <div key={r.name} className="flex items-center gap-2 sm:gap-3">
                <span className={`px-3 py-1.5 rounded-full border bg-black/40 text-[11px] uppercase tracking-[2px] font-bold ${r.cls}`}>
                  {r.name}
                </span>
                {i < RANKS.length - 1 && (
                  <span className="hidden sm:block w-4 h-px bg-white/15" />
                )}
              </div>
            ))}
          </div>

          {/* XP actions */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {ACTIONS.map(({ Icon, label, xp }) => (
              <li key={label} className="flex items-center gap-3 rounded-lg border border-white/5 bg-black/30 px-3 py-2.5">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground/90 flex-1">{label}</span>
                <span className="text-[10px] font-mono text-emerald-300">{xp}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-center">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors min-h-[44px]"
            >
              <Award className="w-4 h-4" /> View Your Path
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PantheonPathTeaser;
