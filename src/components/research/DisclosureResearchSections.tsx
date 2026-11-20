import { ExternalLink } from 'lucide-react';
import { CitationCard, TierChip } from './CitationCard';
import { MEDIA_KIND_LABEL } from '@/lib/evidence';
import { officialMedia } from '@/data/official-media';
import {
  pursueReleases, pursueFeaturedRecords, pursueScope,
  PURSUE_ARCHIVE_URL, PURSUE_SEARCH_URL, PURSUE_LAST_REVIEWED,
} from '@/data/pursue-releases';

const fmt = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export function PursueTracker() {
  const latest = pursueReleases[pursueReleases.length - 1];
  return (
    <section aria-labelledby="pursue-h" className="mb-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
        <h2 id="pursue-h" className="font-display text-2xl text-foreground">PURSUE official records</h2>
        <span className="text-xs text-muted-foreground">Checked against the official archive {fmt(PURSUE_LAST_REVIEWED)}</span>
      </div>
      <p className="text-muted-foreground max-w-3xl mb-4">
        The Department of War publishes declassified UAP records in rolling releases. Latest verified release:{' '}
        <strong className="text-foreground">Release {latest.number}, {fmt(latest.date)}</strong>. The archive may have changed since —
        always check the official pages.
      </p>
      <div className="flex flex-wrap gap-3 mb-5">
        <a href={PURSUE_ARCHIVE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-realm-gods/50 px-3 py-2 text-sm font-medium text-realm-gods hover:bg-realm-gods/10">
          Official archive <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
        <a href={PURSUE_SEARCH_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/40">
          Search all records <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
        {pursueReleases.map((r) => (
          <li key={r.number}>
            <a href={r.noticeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-md border border-border bg-card/40 px-3 py-2 text-sm hover:border-realm-gods/50">
              <span><span className="font-semibold text-foreground">Release {r.number}</span> <span className="text-muted-foreground">· {fmt(r.date)}</span></span>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-label="Official release notice" />
            </a>
          </li>
        ))}
      </ol>
      <details className="mb-4 rounded-md border border-border bg-card/30 p-3">
        <summary className="cursor-pointer text-sm font-medium text-foreground">Records featured on the official page for Release {latest.number}</summary>
        <ul className="mt-3 space-y-1.5 text-sm">
          {pursueFeaturedRecords.map((r) => (
            <li key={r.id}><a href={r.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"><span className="font-mono text-foreground">{r.id}</span> — {r.title}</a></li>
          ))}
        </ul>
      </details>
      <CitationCard c={pursueScope} status="official-statement" />
    </section>
  );
}

export function OfficialMediaLibrary() {
  return (
    <section aria-labelledby="media-h" className="mb-12">
      <h2 id="media-h" className="font-display text-2xl text-foreground mb-2">Official videos and primary documents</h2>
      <p className="text-muted-foreground max-w-3xl mb-5">Each item opens the original publisher's page. Videos are embedded only when hosted on the publisher's own channel.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {officialMedia.map((m) => (
          <article key={m.url} className="rounded-xl border border-border bg-card/40 overflow-hidden flex flex-col">
            {m.youtubeId && (
              <div className="aspect-video bg-muted">
                <iframe
                  className="h-full w-full" loading="lazy" title={m.title}
                  src={`https://www.youtube-nocookie.com/embed/${m.youtubeId}`}
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                />
              </div>
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <TierChip>{MEDIA_KIND_LABEL[m.kind]}</TierChip>
                <span className="text-xs text-muted-foreground">{m.publisher} · {m.date}</span>
              </div>
              <h3 className="font-semibold text-foreground">{m.title}</h3>
              <p className="text-sm text-muted-foreground">{m.description}</p>
              {m.establishes && <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Establishes:</span> {m.establishes}</p>}
              {m.doesNotEstablish && <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Does not establish:</span> {m.doesNotEstablish}</p>}
              <a href={m.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-medium text-realm-gods hover:underline">
                {m.linkLabel} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
