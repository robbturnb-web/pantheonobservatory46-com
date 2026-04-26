import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered when the 3D subtree throws OR when WebGL context is lost. */
  fallback: ReactNode;
  /** Optional callback fired the first time we fall back. */
  onFallback?: (reason: string) => void;
}

interface State {
  failed: boolean;
}

/**
 * Catches render-time crashes from React Three Fiber / three.js so a WebGL
 * failure can never leave the hero blank. Pair with `isWebGLAvailable()` for
 * up-front detection; this boundary handles the runtime failure path
 * (driver crash, context lost, allocation error, etc.).
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.warn('[CanvasErrorBoundary] 3D scene failed, using fallback:', error?.message);
    this.props.onFallback?.(error?.message || 'render-error');
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
