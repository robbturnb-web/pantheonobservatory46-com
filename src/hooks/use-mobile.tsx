import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Returns whether the current viewport is mobile-width.
 *
 * Backwards-compatible: returns a boolean. On the very first render the
 * value is computed synchronously from `window.innerWidth` (or `false`
 * during SSR) so there is no hydration flash where desktop UI flickers
 * into mobile.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    mql.addEventListener("change", onChange);
    // Re-sync on mount in case window size changed before hydration ran.
    onChange();
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
