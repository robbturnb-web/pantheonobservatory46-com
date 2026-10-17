/**
 * MysteryOfTheDay — cinematic feature band on the homepage.
 * Starter mystery: The Lost Knowledge of the Pyramids.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bookmark, GitCompare, X } from 'lucide-react';
import { ContentTrustBadge } from '@/components/ContentTrustBadge';
import { toast } from 'sonner';
import { isArchived, saveToArchive } from '@/lib/archive';

const MYSTERY = {
  category: 'Ancient Engineering',
  title: 'The Lost Knowledge of the Pyramids',
  summary:
    'The Great Pyramid of Giza is aligned to true north within 3/60ths of a degree, built from 2.3 million stones averaging 2.5 tons each, and contains internal geometry that encodes π and the dimensions of the Earth. We still cannot fully explain how — or who — built it.',
  trusts: ['HISTORICAL_RECORD', 'SPECULATIVE', 'MYTH_LORE'] as const,
  investigateRoute: '/pyramids',
  sources: [
    { name: 'National Geographic — Giza', url: 'https://www.nationalgeographic.com/history/article/giza-pyramids' },
    { name: 'ScanPyramids Project', url: 'http://www.scanpyramids.org' },
    { name: 'AERA — Ancient Egypt Research Associates', url: 'https://www.aeraweb.org' },
  ],
};

export function MysteryOfTheDay() {
  const [showSources, setShowSources] = useState(false);

  const save = () => {
    const id = 'mystery-lost-knowledge-pyramids';
    if (isArchived(id)) {
      toast('Already in your archive');
      return;
    }
    saveToArchive({
      id,
      type: 'investigation',
      title: MYSTERY.title,
      description: MYSTERY.summary,
      href: MYSTERY.investigateRoute,
      tags: ['ancient engineering', 'pyramids', 'mystery of the day'],
    });
    toast.success(`Saved · "${MYSTERY.title}"`);
  };

  return (
    <section aria-labelledby="motd-h" className="relative px-3 sm:px-6 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-realm-gods font-mono">
            Mystery of the Day
          </span>
          <span className="h-px flex-1 bg-realm-gods/30" />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-realm-gods/30 bg-gradient-to-br from-[#1a1038]/60 via-[#0a0a1f]/80 to-[#05030D]/80 backdrop-blur shadow-[0_0_60px_-15px_rgba(214,179,90,0.4)]">
          {/* Golden scan beam */}
          <div className="pointer-events-none absolute inset-0 motion-safe:animate-[pulse_4s_ease-in-out_infinite]">
            <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_center_top,rgba(214,179,90,0.18),transparent_60%)]" />
          </div>
          {/* Purple fog */}
          <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-realm-observatory/20 blur-[100px]" />
          {/* Holographic grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(214,179,90,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(214,179,90,0.6) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative p-6 sm:p-10 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <span className="inline-block text-[10px] uppercase tracking-[2px] font-mono text-realm-gods mb-3">
                {MYSTERY.category}
              </span>
              <h2 id="motd-h" className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
                {MYSTERY.title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 max-w-xl">
                {MYSTERY.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {MYSTERY.trusts.map((t) => <ContentTrustBadge key={t} trust={t} />)}
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  to={MYSTERY.investigateRoute}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-realm-gods/20 border border-realm-gods/60 text-realm-gods hover:bg-realm-gods/30 transition text-sm font-medium"
                >
                  <Search className="w-4 h-4" /> Investigate
                </Link>
                <button
                  onClick={save}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 bg-primary/10 text-foreground hover:bg-primary/20 transition text-sm font-medium"
                >
                  <Bookmark className="w-4 h-4" /> Save to Archive
                </button>
                <button
                  onClick={() => setShowSources(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/80 transition text-sm font-medium"
                >
                  <GitCompare className="w-4 h-4" /> Compare Sources
                </button>
              </div>
            </div>

            {/* Holographic document panel */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-xl border border-realm-gods/40 bg-gradient-to-b from-realm-gods/10 to-transparent p-6 backdrop-blur overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><polygon points=%22100,20 180,180 20,180%22 fill=%22none%22 stroke=%22rgba(214,179,90,0.5)%22 stroke-width=%220.6%22/><polygon points=%22100,60 150,170 50,170%22 fill=%22none%22 stroke=%22rgba(214,179,90,0.3)%22 stroke-width=%220.4%22/><line x1=%22100%22 y1=%2220%22 x2=%22100%22 y2=%22180%22 stroke=%22rgba(214,179,90,0.2)%22 stroke-width=%220.3%22/></svg>')] bg-center bg-no-repeat bg-contain opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1 font-mono text-[10px] text-realm-gods/80">
                  <div className="flex justify-between"><span>BASE</span><span>230.4 m</span></div>
                  <div className="flex justify-between"><span>HEIGHT</span><span>146.6 m</span></div>
                  <div className="flex justify-between"><span>BLOCKS</span><span>~2.3 M</span></div>
                  <div className="flex justify-between"><span>ALIGN</span><span>0.05° N</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Sources modal */}
      {showSources && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur"
          onClick={() => setShowSources(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-xl border border-primary/40 bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSources(false)}
              className="absolute top-3 right-3 p-1 rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-display text-xl text-foreground mb-1">Compare Sources</h3>
            <p className="text-xs text-muted-foreground mb-4">{MYSTERY.title}</p>
            <ul className="space-y-2">
              {MYSTERY.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-lg border border-border bg-card/50 hover:border-primary/60 hover:bg-primary/10 transition text-sm text-foreground"
                  >
                    {s.name}
                    <span className="block text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                      {s.url}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default MysteryOfTheDay;
