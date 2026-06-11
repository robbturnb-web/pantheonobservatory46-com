import { Link } from 'react-router-dom';
import { Bookmark, Compass, Pyramid } from 'lucide-react';
import { ClaimBadge } from './ClaimBadge';
import { useToast } from '@/hooks/use-toast';

export function FeaturedMystery() {
  const { toast } = useToast();

  return (
    <section className="relative z-10 px-4 pb-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-5">
          <p className="text-[10px] uppercase tracking-[4px] text-amber-300">Featured Mystery</p>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mt-1">
            Today's Investigation
          </h2>
        </header>

        <article className="relative rounded-2xl border border-amber-400/30 bg-background/55 backdrop-blur-xl p-6 overflow-hidden">
          <span className="pointer-events-none absolute -top-px -left-px w-10 h-10 border-t border-l border-amber-400/70 rounded-tl-2xl" />
          <span className="pointer-events-none absolute -bottom-px -right-px w-10 h-10 border-b border-r border-amber-400/70 rounded-br-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.18),transparent_60%)]" />

          <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-5 items-center">
            <div className="w-14 h-14 rounded-xl border border-amber-400/40 bg-black/40 flex items-center justify-center text-amber-300">
              <Pyramid className="w-7 h-7" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[2.5px] text-amber-300 font-bold">Ancient Tech</span>
                <ClaimBadge kind="FACT" />
                <ClaimBadge kind="MYTH" />
                <ClaimBadge kind="THEORY" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground leading-tight">
                The Lost Knowledge of the Pyramids
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Acoustic engineering, stellar alignment, and the quarrying mystery — what does the
                evidence actually support, what's folklore, and what remains an open question?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <Link
                to="/pyramids"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500/90 px-4 py-2.5 text-sm font-bold text-black hover:bg-amber-400 transition-colors min-h-[44px]"
              >
                <Compass className="w-4 h-4" /> Investigate
              </Link>
              <button
                type="button"
                onClick={() => toast({ title: 'Saved to Archive', description: 'Featured Mystery added to your saved discoveries.' })}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-foreground hover:border-amber-400/60 transition-colors min-h-[44px]"
              >
                <Bookmark className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default FeaturedMystery;
