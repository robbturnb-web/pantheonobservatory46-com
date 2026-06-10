/**
 * SourceLink — production-grade citation link.
 *
 * - Opens in a new tab.
 * - Shows status pill (verified / needs-review / broken / archived).
 * - Shows publisher + last-checked date when available.
 * - Refuses to render placeholder or empty URLs.
 * - "Report Broken Link" hook for the link-health system.
 */
import { useState } from 'react';
import { ExternalLink, AlertTriangle, CheckCircle2, Clock, Archive, Flag } from 'lucide-react';
import type { Source, SourceStatus } from '@/types/source';
import { markSourceAsBroken } from '@/services/sources/sourceHealthService';

interface Props {
  source: Source;
  /** Show the "Report Broken Link" button. Defaults to true. */
  allowReport?: boolean;
  className?: string;
}

const STATUS_VISUAL: Record<
  SourceStatus,
  { label: string; text: string; bg: string; border: string; Icon: typeof CheckCircle2 }
> = {
  verified: {
    label: 'Verified',
    text: 'text-signal-online',
    bg: 'bg-signal-online/10',
    border: 'border-signal-online/40',
    Icon: CheckCircle2,
  },
  'needs-review': {
    label: 'Needs Review',
    text: 'text-amber-300',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/40',
    Icon: Clock,
  },
  broken: {
    label: 'Broken',
    text: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/40',
    Icon: AlertTriangle,
  },
  archived: {
    label: 'Archived',
    text: 'text-muted-foreground',
    bg: 'bg-muted/20',
    border: 'border-muted-foreground/30',
    Icon: Archive,
  },
};

function isUsableUrl(url: string): boolean {
  if (!url) return false;
  const u = url.trim();
  if (u.length < 4) return false;
  if (u.includes('example.com') || u === '#' || u.startsWith('javascript:')) return false;
  try {
    const parsed = new URL(u);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function SourceLink({ source, allowReport = true, className }: Props) {
  const [reported, setReported] = useState(false);

  if (!isUsableUrl(source.url)) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-muted-foreground/30 bg-muted/10 px-2 py-1 text-xs text-muted-foreground ${className ?? ''}`}
        title="No valid URL provided for this source."
      >
        <AlertTriangle className="w-3 h-3" />
        Source pending
      </span>
    );
  }

  const visual = STATUS_VISUAL[reported ? 'broken' : source.status];
  const { Icon } = visual;

  return (
    <span className={`inline-flex flex-wrap items-center gap-1.5 ${className ?? ''}`}>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition hover:opacity-90 ${visual.border} ${visual.bg}`}
        aria-label={`Open source: ${source.title}`}
      >
        <Icon className={`w-3 h-3 ${visual.text}`} />
        <span className={`font-mono uppercase tracking-[1.5px] text-[9px] ${visual.text}`}>
          {visual.label}
        </span>
        <span className="text-foreground/90 truncate max-w-[220px]">{source.title}</span>
        <ExternalLink className="w-2.5 h-2.5 text-foreground/40 group-hover:text-foreground/70" />
      </a>

      {source.publisher && (
        <span className="text-[10px] uppercase tracking-[1px] text-muted-foreground">
          · {source.publisher}
        </span>
      )}

      {source.lastChecked && (
        <span className="text-[10px] text-muted-foreground" title="Last checked">
          · checked {source.lastChecked}
        </span>
      )}

      {allowReport && !reported && source.status !== 'broken' && (
        <button
          type="button"
          onClick={() => {
            markSourceAsBroken(source.url);
            setReported(true);
          }}
          className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[1px] text-muted-foreground hover:text-destructive transition"
          aria-label={`Report broken link for ${source.title}`}
        >
          <Flag className="w-2.5 h-2.5" />
          Report broken
        </button>
      )}
      {reported && (
        <span className="text-[10px] uppercase tracking-[1px] text-destructive">
          Reported · thank you
        </span>
      )}
    </span>
  );
}

export default SourceLink;
