import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  /** Optional custom fallback. If omitted, the cosmic default is used. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * Catches render-time crashes anywhere in its subtree so a single broken
 * component cannot blank the entire site. Renders a themed fallback with
 * a "try again" reset button. Logs to the console for debugging.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    if (this.props.fallback) return this.props.fallback(this.state.error, this.reset);

    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-border bg-card/80 backdrop-blur p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/15 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">A signal disturbance occurred</h2>
          <p className="text-sm text-muted-foreground">
            Something on this page failed to render. The rest of the Observatory is still online.
          </p>
          {import.meta.env.DEV && (
            <pre className="text-[11px] text-left text-muted-foreground bg-muted/40 rounded-md p-3 overflow-auto max-h-40">
              {this.state.error.message}
            </pre>
          )}
          <button
            type="button"
            onClick={this.reset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
        </div>
      </div>
    );
  }
}
