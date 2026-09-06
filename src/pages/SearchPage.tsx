import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { useSiteSearch } from '@/lib/search/use-search';
import { SearchResultCard } from '@/components/search/SearchResultCard';
import { REALM_LABEL, type RealmKey } from '@/lib/search/route-registry';

const REALMS: (RealmKey | 'all')[] = [
  'all', 'cosmos', 'disclosure', 'ancient', 'entity', 'consciousness', 'gods', 'archive', 'observatory', 'echo',
];

export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const initial = params.get('q') ?? '';
  const [q, setQ] = useState(initial);
  const [realm, setRealm] = useState<RealmKey | 'all'>('all');

  useEffect(() => {
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (q.trim()) next.set('q', q.trim()); else next.delete('q');
      setParams(next, { replace: true });
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const { hits, total, ready } = useSiteSearch(q, { realm }, 100);

  const realmCounts = useMemo(() => {
    const m = new Map<RealmKey | 'all', number>();
    m.set('all', total);
    for (const h of hits) m.set(h.realm, (m.get(h.realm) ?? 0) + 1);
    return m;
  }, [hits, total]);

  return (
    <>
      <SEO
        title={q ? `"${q}" — Pantheon Search` : 'Search the Pantheon Archive'}
        description="Search across UAP cases, whistleblower testimony, ancient mysteries, JWST findings, and the full Pantheon Observatory archive."
        path="/search"
        noindex
        schema={{
          '@context': 'https://schema.org',
          '@type': 'SearchResultsPage',
          name: 'Pantheon Observatory Search',
          url: 'https://pantheonobservatory46.com/search',
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-realm-observatory mb-3">
            Pantheon Archive
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Search the Signal
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Every hit is linkable, every grade is shown, every source on file is surfaced.
            No silent re-rankings. No hidden filters.
          </p>
        </header>

        <div className="relative mb-6">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try: Grusch, Nimitz, Atlantis, JWST, Schumann…"
            className="w-full pl-12 pr-10 py-3.5 bg-card/40 backdrop-blur-sm border border-border rounded-lg outline-none focus:border-primary/60 text-base"
            aria-label="Search query"
          />
          {q && (
            <button
              onClick={() => setQ('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          {REALMS.map((r) => {
            const active = realm === r;
            const label = r === 'all' ? 'All realms' : REALM_LABEL[r as RealmKey];
            return (
              <button
                key={r}
                onClick={() => setRealm(r)}
                className={`px-3 py-1.5 rounded-full border transition-colors ${
                  active
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {label}
                {realmCounts.get(r) ? (
                  <span className="ml-1.5 opacity-70">{realmCounts.get(r)}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mb-4 text-xs text-muted-foreground">
          {!q.trim() && 'Type a query to begin.'}
          {q.trim() && !ready && 'Building index…'}
          {q.trim() && ready && (
            <>
              {total} result{total === 1 ? '' : 's'} for <span className="text-foreground">"{q}"</span>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {hits.map((h) => (
            <SearchResultCard key={h.id} hit={h} />
          ))}
        </div>

        {q.trim() && ready && hits.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="mb-2">No matches in the archive.</p>
            <p className="text-xs">Try a shorter phrase, a person's last name, or a year.</p>
          </div>
        )}
      </div>
    </>
  );
}
