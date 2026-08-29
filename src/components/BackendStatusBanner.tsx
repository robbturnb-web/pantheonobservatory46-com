import { useState } from 'react';
import { AlertTriangle, RefreshCw, X, ExternalLink } from 'lucide-react';
import { useBackendHealth } from '@/hooks/use-backend-health';

/**
 * Global banner shown when the Lovable Cloud backend is paused or unreachable.
 * Live feeds, Echo AI and auth all depend on it, so we surface a clear recovery path.
 */
export function BackendStatusBanner() {
  const { state, lastChecked, checking, recheck } = useBackendHealth();
  const [dismissed, setDismissed] = useState(false);

  const down = state === 'paused' || state === 'unreachable';
  if (!down || dismissed) return null;

  const paused = state === 'paused';

  return (
    <div className="fixed top-0 inset-x-0 z-[60] px-3 pt-3 pointer-events-none">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto mx-auto max-w-5xl rounded-xl border border-destructive/50 bg-background/90 backdrop-blur-xl shadow-[0_0_40px_-12px_hsl(var(--destructive)/0.5)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3">
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-destructive" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[2.5px] font-semibold text-destructive">
                {paused ? 'Backend paused' : 'Backend unreachable'}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {paused
                  ? 'Your Lovable Cloud backend is hibernating — live feeds, Echo AI and sign-in are offline until it resumes. Open the backend panel and hit Resume (an upgrade prompt there means the pause is plan-related).'
                  : 'The Lovable Cloud backend is not responding. It may be paused, restarting, or blocked by your network. Retry, or open the backend panel to check its status.'}
                {lastChecked && (
                  <span className="block mt-1 font-mono text-[10px] text-muted-foreground/70">
                    last checked {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 pl-7 sm:pl-0">
            <button
              type="button"
              onClick={() => void recheck()}
              disabled={checking}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-foreground hover:bg-primary/20 transition-colors disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
              {checking ? 'Checking' : 'Retry'}
            </button>
            <a
              href="https://lovable.dev/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Backend
            </a>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss backend status banner"
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackendStatusBanner;
