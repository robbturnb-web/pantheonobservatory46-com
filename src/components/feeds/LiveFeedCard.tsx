import { ExternalLink, KeyRound, WifiOff } from 'lucide-react';
import { CosmicCard } from '@/components/cards/CosmicCard';
import { LiveDataFooter } from '@/components/live/LiveDataFooter';

export type LiveFeedStatus = 'live' | 'external' | 'cached' | 'unavailable' | 'needs-api-key';

interface Props {
  title: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
  status: LiveFeedStatus;
  fetchedAt?: string | null;
  loading?: boolean;
  error?: string | null;
  stale?: boolean;
  cacheAge?: number | null;
  lastSuccessAt?: string | null;
  degraded?: boolean;
  onRefresh?: () => void;
  /** Optional rendered live metric (number, chip, mini-chart). */
  children?: React.ReactNode;
}

export function LiveFeedCard({
  title,
  description,
  sourceLabel,
  sourceUrl,
  status,
  fetchedAt,
  loading,
  error,
  stale,
  cacheAge,
  lastSuccessAt,
  degraded,
  onRefresh,
  children,
}: Props) {
  return (
    <CosmicCard className="p-5 flex flex-col gap-3">
      <header>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </header>

      <div className="min-h-[64px]">
        {status === 'needs-api-key' ? (
          <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/5 p-3 text-xs text-amber-200">
            <KeyRound className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              API key missing — add it to your environment variables to enable this live feed.
            </span>
          </div>
        ) : status === 'unavailable' ? (
          <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
            <WifiOff className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Unable to load this feed right now.{' '}
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                Open official source ↗
              </a>
            </span>
          </div>
        ) : status === 'external' ? (
          <p className="text-xs text-muted-foreground">
            External feed — opens at the official source.
          </p>
        ) : (
          children
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          {status === 'external' ? 'Open Feed' : 'View Source'}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {status !== 'external' && status !== 'needs-api-key' && (
        <LiveDataFooter
          source={{ label: sourceLabel, url: sourceUrl }}
          fetchedAt={fetchedAt ?? undefined}
          loading={loading}
          ok={status === 'live' || status === 'cached'}
          error={error}
          stale={stale}
          cacheAge={cacheAge}
          lastSuccessAt={lastSuccessAt}
          degraded={degraded}
          onRefresh={onRefresh}
        />
      )}
    </CosmicCard>
  );
}

export default LiveFeedCard;
