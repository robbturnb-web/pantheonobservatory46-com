import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered when the 3D subtree throws OR when WebGL context is lost. */
  fallback: ReactNode;
  /**
   * Optional callback fired the first time we fall back. Receives the error
   * message and a `reset` function the parent can call (e.g. after a backoff
   * timer) to retry rendering the 3D subtree.
   */
  onFallback?: (reason: string, reset: () => void) => void;
}

interface State {
  failed: boolean;
}

/**
 * Catches render-time crashes from React Three Fiber / three.js so a WebGL
 * failure can never leave the hero blank. Pair with `isWebGLAvailable()` for
 * up-front detection; this boundary handles the runtime failure path
 * (driver crash, context lost, allocation error, etc.).
 *
 * The parent can drive an automatic retry by calling the `reset` function
 * passed to `onFallback`, which clears the error state so children re-mount.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  reset = () => this.setState({ failed: false });

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.warn('[CanvasErrorBoundary] 3D scene failed, using fallback:', error?.message);
    this.props.onFallback?.(error?.message || 'render-error', this.reset);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
