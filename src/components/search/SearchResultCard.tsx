import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import type { SearchHit } from '@/lib/search/use-search';
import { TYPE_LABEL } from '@/lib/search/use-search';
import { REALM_LABEL, REALM_TEXT, REALM_RING } from '@/lib/search/route-registry';

interface Props {
  hit: SearchHit;
  onNavigate?: () => void;
}

export function SearchResultCard({ hit, onNavigate }: Props) {
  const realmText = REALM_TEXT[hit.realm];
  const realmRing = REALM_RING[hit.realm];
  const sources = hit.sources ?? [];
  const askEchoHref = `/echo?q=${encodeURIComponent(hit.title)}`;

  return (
    <article
      className={`group relative rounded-lg bg-card/50 backdrop-blur-sm ring-1 ${realmRing} hover:ring-2 transition-all p-4 sm:p-5`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider">
          <span className={`${realmText} font-semibold`}>{REALM_LABEL[hit.realm]}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{TYPE_LABEL[hit.type]}</span>
          {hit.evidence && (
            <>
              <span className="text-muted-foreground">·</span>
              <span className="text-foreground/80 font-mono">{hit.evidence}</span>
            </>
          )}
        </div>
        <Link
          to={hit.route}
          onClick={onNavigate}
          className={`${realmText} opacity-0 group-hover:opacity-100 transition-opacity`}
          aria-label={`Open ${hit.title}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <Link to={hit.route} onClick={onNavigate} className="block">
        <h3 className="font-display text-lg leading-snug text-foreground group-hover:text-primary transition-colors">
          {hit.title}
        </h3>
      </Link>

      {hit.meta && (
        <p className="mt-1 text-xs text-muted-foreground font-mono">{hit.meta}</p>
      )}

      {hit.summary && (
        <p className="mt-2 text-sm text-foreground/75 line-clamp-3">{hit.summary}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <Link
          to={hit.route}
          onClick={onNavigate}
          className={`${realmText} hover:underline font-medium`}
        >
          Open →
        </Link>

        <Link
          to={askEchoHref}
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <Sparkles className="w-3 h-3" />
          Ask Echo
        </Link>

        {sources.length > 0 ? (
          <span className="text-muted-foreground">
            {sources.length} source{sources.length === 1 ? '' : 's'}
          </span>
        ) : (
          <span className="text-muted-foreground/60 italic">No primary source on file</span>
        )}
      </div>

      {sources.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px]">
          {sources.slice(0, 3).map((s, i) => (
            <li key={i}>
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
                >
                  {s.label}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ) : (
                <span className="text-muted-foreground">{s.label}</span>
              )}
            </li>
          ))}
          {sources.length > 3 && (
            <li className="text-muted-foreground/70">+{sources.length - 3} more</li>
          )}
        </ul>
      )}
    </article>
  );
}
