/**
 * LiveDataFooter — standard footer for any "live" card.
 *
 * Renders one of four explicit states (no fake data, ever):
 *  - VERIFIED       — upstream just returned fresh data
 *  - CACHED         — proxy served a recent 15-min cache HIT
 *  - SOURCE OFFLINE — proxy served stale data because upstream failed
 *  - UNAVAILABLE    — proxy itself failed and had no cache to fall back on
 *  - CONNECTING     — first load in progress
 */
import { CheckCircle2, RefreshCw, AlertTriangle, WifiOff, Clock } from 'lucide-react';
import { timeAgo } from '@/lib/live-data';

interface Props {
  source: { label: string; url: string } | null;
  fetchedAt?: string | null;
  loading?: boolean;
  ok?: boolean;
  error?: string | null;
  stale?: boolean;
  cacheAge?: number | null;
  lastSuccessAt?: string | null;
  /** upstream failed; showing the last verified reading, retrying automatically */
  degraded?: boolean;
  onRefresh?: () => void;
  compact?: boolean;
}

export function LiveDataFooter({
  source,
  fetchedAt,
  loading,
  ok,
  error,
  stale,
  cacheAge,
  lastSuccessAt,
  degraded,
  onRefresh,
  compact,
}: Props) {
  const verifiedAt = lastSuccessAt ?? (ok ? fetchedAt : null);
  const cached = ok && !stale && typeof cacheAge === 'number' && cacheAge > 0;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] uppercase tracking-[2px] text-white/55 ${
        compact ? '' : 'mt-2 pt-2 border-t border-white/10'
      }`}
    >
      {!source ? (
        <span className="text-white/45">Connecting…</span>
      ) : degraded ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200"
          title={`Upstream source is not responding. Showing last verified reading. ${error ?? ''}`}
        >
          <AlertTriangle className="w-3 h-3" />
          <span className="font-bold">Degraded · Retrying</span>
          <span className="text-white/55 normal-case tracking-normal">· {source.label}</span>
        </a>
      ) : ok && stale ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200"
          title="Upstream source is currently offline. Showing last cached payload."
        >
          <WifiOff className="w-3 h-3" />
          <span className="font-bold">Source Offline</span>
          <span className="text-white/55 normal-case tracking-normal">· {source.label}</span>
        </a>
      ) : ok && cached ? (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"
          title={`Served from 15-min server cache (${cacheAge}s old).`}
        >
          <Clock className="w-3 h-3" />
          <span className="font-bold">Cached</span>
          <span className="text-white/55 normal-case tracking-normal">· {source.label}</span>
        </a>
      ) : ok ? (
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
      ) : (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200"
        >
          <AlertTriangle className="w-3 h-3" />
          <span className="font-bold">Source Unavailable</span>
          <span className="text-white/45 normal-case tracking-normal">· {source.label}</span>
        </a>
      )}

      {verifiedAt ? (
        <span className="font-mono normal-case tracking-normal text-white/45">
          {degraded || stale ? 'Last verified ' : ok ? 'Updated ' : 'Last verified '}
          {timeAgo(verifiedAt)}
        </span>
      ) : fetchedAt ? (
        <span className="font-mono normal-case tracking-normal text-white/45">
          {timeAgo(fetchedAt)}
        </span>
      ) : null}

      {error && !stale && !degraded && (
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
