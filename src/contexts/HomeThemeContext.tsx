import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';

/**
 * HomeThemeContext
 * ----------------
 * Drives the homepage's *live* atmosphere based on which "domain" the user is
 * currently attending to (hovering / focusing / pointing at).
 *
 * Each homepage layout (Pillars, Temple, Constellation, Console, Cathedral)
 * calls `setDomain(...)` whenever the user's attention shifts. The provider
 * publishes the resulting palette so background, particles, and audio bed
 * can all react together.
 *
 * Domains map to existing audio playlists:
 *   disclosure → playlist 'disclosure'
 *   ancient    → playlist 'ancient'
 *   cosmic     → playlist 'cosmos'
 *   inner      → playlist 'cosmos' (no dedicated bed)
 *   none       → playlist 'cosmos' (default)
 */

export type HomeDomain = 'disclosure' | 'ancient' | 'cosmic' | 'inner' | 'none';

export interface DomainPalette {
  /** Primary accent color (hex) */
  accent: string;
  /** Soft glow color (rgba) */
  glow: string;
  /** Full-page background gradient */
  background: string;
  /** Short label */
  label: string;
  /** Audio playlist key (matches src/lib/audio/playlists.ts) */
  playlist: 'cosmos' | 'ancient' | 'disclosure';
}

export const DOMAIN_PALETTES: Record<HomeDomain, DomainPalette> = {
  disclosure: {
    accent: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.35)',
    background:
      'radial-gradient(ellipse at top, rgba(220,38,38,0.20) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(80,10,10,0.55) 0%, transparent 60%), linear-gradient(180deg, #160606 0%, #0a0303 60%, #050000 100%)',
    label: 'Disclosure',
    playlist: 'disclosure',
  },
  ancient: {
    accent: '#fcd34d',
    glow: 'rgba(252, 211, 77, 0.35)',
    background:
      'radial-gradient(ellipse at top, rgba(252,211,77,0.18) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(120,80,20,0.45) 0%, transparent 60%), linear-gradient(180deg, #14100a 0%, #08050a 60%, #050308 100%)',
    label: 'Ancient',
    playlist: 'ancient',
  },
  cosmic: {
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.35)',
    background:
      'radial-gradient(ellipse at top, rgba(139,92,246,0.20) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(40,15,80,0.55) 0%, transparent 60%), linear-gradient(180deg, #0a0518 0%, #050310 60%, #02010a 100%)',
    label: 'Cosmic',
    playlist: 'cosmos',
  },
  inner: {
    accent: '#34d399',
    glow: 'rgba(52, 211, 153, 0.35)',
    background:
      'radial-gradient(ellipse at center, rgba(16,185,129,0.18) 0%, transparent 60%), linear-gradient(180deg, #030a07 0%, #010503 100%)',
    label: 'Inner',
    playlist: 'cosmos',
  },
  none: {
    accent: '#a78bfa',
    glow: 'rgba(167, 139, 250, 0.18)',
    background:
      'radial-gradient(ellipse at top, rgba(139,92,246,0.10) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(252,211,77,0.06) 0%, transparent 55%), linear-gradient(180deg, #050314 0%, #02010a 100%)',
    label: 'Pantheon',
    playlist: 'cosmos',
  },
};

interface HomeThemeContextValue {
  domain: HomeDomain;
  palette: DomainPalette;
  setDomain: (domain: HomeDomain) => void;
  /** Convenience hover handlers — pass to onMouseEnter / onMouseLeave / onFocus / onBlur */
  bind: (domain: HomeDomain) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

const HomeThemeContext = createContext<HomeThemeContextValue | null>(null);

export function HomeThemeProvider({ children }: { children: ReactNode }) {
  const [domain, setDomain] = useState<HomeDomain>('none');

  const bind = useCallback(
    (d: HomeDomain) => ({
      onMouseEnter: () => setDomain(d),
      onMouseLeave: () => setDomain('none'),
      onFocus: () => setDomain(d),
      onBlur: () => setDomain('none'),
    }),
    []
  );

  const value = useMemo<HomeThemeContextValue>(
    () => ({
      domain,
      palette: DOMAIN_PALETTES[domain],
      setDomain,
      bind,
    }),
    [domain, bind]
  );

  return <HomeThemeContext.Provider value={value}>{children}</HomeThemeContext.Provider>;
}

export function useHomeTheme(): HomeThemeContextValue {
  const ctx = useContext(HomeThemeContext);
  if (!ctx) {
    // Safe fallback so layouts can be previewed in isolation
    return {
      domain: 'none',
      palette: DOMAIN_PALETTES.none,
      setDomain: () => {},
      bind: () => ({
        onMouseEnter: () => {},
        onMouseLeave: () => {},
        onFocus: () => {},
        onBlur: () => {},
      }),
    };
  }
  return ctx;
}
