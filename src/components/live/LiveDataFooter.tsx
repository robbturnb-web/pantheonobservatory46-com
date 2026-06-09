/**
 * LiveDataFooter — standard footer for any "live" card.
 * Shows source label, last-updated timestamp, manual refresh button,
 * and a verified-source badge when the upstream returned ok.
 */
import { CheckCircle2, RefreshCw, AlertTriangle } from 'lucide-react';
import { timeAgo } from '@/lib/live-data';

interface Props {
  source: { label: string; url: string } | null;
  fetchedAt?: string | null;
  loading?: boolean;
  ok?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  compact?: boolean;
}

export function LiveDataFooter({
  source,
  fetchedAt,
  loading,
  ok,
  error,
  onRefresh,
  compact,
}: Props) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[2px] text-white/55 ${
        compact ? '' : 'mt-2 pt-2 border-t border-white/10'
      }`}
    >
      {ok && source ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200"
        >
          <CheckCircle2 className="w-3 h-3" />
          <span className="font-bold">Verified</span>
          <span className="text-white/55 normal-case tracking-normal">· {source.label}</span>
        </a>
      ) : source ? (
        <span className="inline-flex items-center gap-1 text-amber-300">
          <AlertTriangle className="w-3 h-3" />
          <span className="font-bold">Source unavailable</span>
          <span className="text-white/45 normal-case tracking-normal">· {source.label}</span>
        </span>
      ) : (
        <span className="text-white/45">Connecting…</span>
      )}
      {fetchedAt && (
        <span className="font-mono normal-case tracking-normal text-white/45">
          {timeAgo(fetchedAt)}
        </span>
      )}
      {error && (
        <span className="text-amber-200/80 normal-case tracking-normal" title={error}>
          ({error})
        </span>
      )}
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="ml-auto inline-flex items-center gap-1 text-white/55 hover:text-white disabled:opacity-50"
          aria-label="Refresh data"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      )}
    </div>
  );
}
