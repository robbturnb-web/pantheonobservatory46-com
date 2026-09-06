import { useState } from 'react';
import { AlertTriangle, RefreshCw, X, ExternalLink } from 'lucide-react';
import { useBackendHealth } from '@/hooks/use-backend-health';
import { Button } from '@/components/ui/button';

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
    <div className="fixed inset-x-0 top-0 z-[60] px-2 pt-[max(0.5rem,env(safe-area-inset-top))] pointer-events-none sm:px-4 sm:pt-3">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto mx-auto w-full max-w-5xl overflow-hidden rounded-lg border border-destructive/40 bg-background/95 shadow-lg backdrop-blur-xl"
      >
        <div className="flex min-h-14 items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:items-start">
            <AlertTriangle className="h-4 w-4 shrink-0 text-destructive sm:mt-0.5" />
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[2px] text-destructive sm:tracking-[2.5px]">
                {paused ? 'Backend paused' : 'Backend unreachable'}
              </p>
              <p className="mt-0.5 truncate text-[11px] leading-snug text-muted-foreground sm:hidden">
                {paused ? 'Live services are temporarily offline.' : 'Live services cannot connect.'}
              </p>
              <p className="mt-1 hidden text-xs leading-relaxed text-muted-foreground sm:block">
                {paused
                  ? 'Your Lovable Cloud backend is hibernating — live feeds, Echo AI and sign-in are offline until it resumes. Open the backend panel and hit Resume (an upgrade prompt there means the pause is plan-related).'
                  : 'The Lovable Cloud backend is not responding. It may be paused, restarting, or blocked by your network. Retry, or open the backend panel to check its status.'}
                {lastChecked && (
                  <span className="mt-1 block font-mono text-[10px] text-muted-foreground/70">
                    last checked {lastChecked.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button
              type="button"
              onClick={() => void recheck()}
              disabled={checking}
              variant="outline"
              size="icon"
              className="h-9 w-9 border-primary/40 bg-primary/10 text-foreground hover:bg-primary/20 sm:w-auto sm:px-3"
              title={checking ? 'Checking backend' : 'Retry connection'}
            >
              <RefreshCw className={checking ? 'animate-spin' : ''} />
              <span className="sr-only sm:not-sr-only sm:text-[11px] sm:font-semibold sm:uppercase sm:tracking-[1.5px]">
                {checking ? 'Checking' : 'Retry'}
              </span>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground sm:inline-flex"
            >
              <a href="https://lovable.dev/projects" target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                Backend
              </a>
            </Button>
            <Button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss backend status banner"
              title="Dismiss"
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <X />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackendStatusBanner;
