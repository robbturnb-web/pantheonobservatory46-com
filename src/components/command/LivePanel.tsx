import { ExternalLink, RefreshCw, type LucideIcon } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};


export type LiveStatus = 'live' | 'cached' | 'pending' | 'manual' | 'external';

const STATUS: Record<LiveStatus, { label: string; cls: string }> = {
  live:     { label: 'Live',                       cls: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300' },
  cached:   { label: 'Cached',                     cls: 'border-amber-400/50 bg-amber-400/10 text-amber-300' },
  pending:  { label: 'Live API Connection Pending',cls: 'border-sky-400/50 bg-sky-400/10 text-sky-300' },
  manual:   { label: 'Manual Update Mode',         cls: 'border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-300' },
  external: { label: 'External Source',            cls: 'border-white/20 bg-white/5 text-foreground/80' },
};

export interface LiveNotice {
  tone: 'degraded' | 'error';
  message: string;
  detail?: string;
}

/** Build outage messaging + status from a use-live-data hook result. */
export function liveFeedState(r: {
  data: { ok: boolean; stale?: boolean; degraded?: boolean; error?: string; lastSuccessAt?: string | null } | null;
  loading: boolean;
  retryAttempt?: number;
  nextRetryAt?: number | null;
  maxRetries?: number;
}): { status: LiveStatus; notice?: LiveNotice } {
  const d = r.data;
  const retryTxt = r.nextRetryAt
    ? `Auto-retry ${r.retryAttempt}/${r.maxRetries} in ~${Math.max(1, Math.round((r.nextRetryAt - Date.now()) / 1000))}s`
    : r.retryAttempt && r.retryAttempt >= (r.maxRetries ?? 5)
      ? 'Auto-retry paused — use Refresh'
      : undefined;
  if (!d) return { status: 'pending' };
  if (d.ok && d.degraded) {
    const t = d.lastSuccessAt ? new Date(d.lastSuccessAt).toLocaleTimeString() : 'earlier';
    return {
      status: 'cached',
      notice: { tone: 'degraded', message: `Showing last verified reading from ${t}`, detail: [d.error, retryTxt].filter(Boolean).join(' · ') },
    };
  }
  if (d.ok) return { status: d.stale ? 'cached' : 'live' };
  return {
    status: 'pending',
    notice: { tone: 'error', message: 'Source unavailable — no cached reading yet', detail: [d.error, retryTxt].filter(Boolean).join(' · ') },
  };
}

export interface LivePanelProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  status: LiveStatus;
  sourceUrl?: string;
  sourceLabel?: string;
  onRefresh?: () => void;
  refreshing?: boolean;
  children?: ReactNode;
  accent?: string;
  notice?: LiveNotice;
}

export function LivePanel({
  title, description, Icon, status, sourceUrl, sourceLabel,
  onRefresh, refreshing, children, accent = 'text-primary', notice,
}: LivePanelProps) {
  const s = STATUS[status];
  return (
    <motion.article
      variants={panelVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className="relative rounded-2xl border border-white/10 bg-background/55 backdrop-blur-xl p-5 overflow-hidden transition-colors hover:border-primary/40"
    >

      <span className="pointer-events-none absolute -top-px -left-px w-8 h-8 border-t border-l border-primary/40 rounded-tl-2xl" />
      <span className="pointer-events-none absolute -bottom-px -right-px w-8 h-8 border-b border-r border-primary/40 rounded-br-2xl" />

      <header className="flex items-start gap-3 mb-3">
        <div className={cn('shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center', accent)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-foreground leading-tight">{title}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{description}</p>
        </div>
        <span className={cn('shrink-0 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[9px] font-mono uppercase tracking-[1.5px]', s.cls)}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {s.label}
        </span>
      </header>

      <div className="min-h-[64px] rounded-lg border border-white/5 bg-black/30 p-3 text-sm text-foreground">
        {children ?? (
          <p className="text-xs text-muted-foreground italic">
            {status === 'pending'
              ? 'Live API connection pending — verified source link required.'
              : status === 'manual'
                ? 'Manual update mode active — refreshed by curator.'
                : 'No data.'}
          </p>
        )}
      </div>

      {notice && (
        <div
          role="status"
          className={cn(
            'mt-2 rounded-md border px-2.5 py-1.5 text-[11px] leading-snug',
            notice.tone === 'degraded'
              ? 'border-amber-400/40 bg-amber-400/10 text-amber-200'
              : 'border-rose-400/40 bg-rose-400/10 text-rose-200',
          )}
        >
          <p className="font-semibold">{notice.message}</p>
          {notice.detail && <p className="font-mono text-[10px] opacity-80 mt-0.5 break-words">{notice.detail}</p>}
        </div>
      )}

      <footer className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[2px] text-foreground/70 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {sourceLabel ?? 'Source'}
          </a>
        ) : (
          <span className="text-[10px] uppercase tracking-[2px] text-muted-foreground/60">Verified source link required</span>
        )}
        <button
          type="button"
          onClick={onRefresh}
          disabled={!onRefresh || refreshing}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[2px] text-foreground/80 hover:border-primary/50 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[28px]"
        >
          <RefreshCw className={cn('w-3 h-3', refreshing && 'animate-spin')} />
          {onRefresh ? 'Refresh' : 'Check Source'}
        </button>
      </footer>
    </motion.article>
  );
}

export default LivePanel;
