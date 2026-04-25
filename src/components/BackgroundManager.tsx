import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { StarfieldCanvas } from './StarfieldCanvas';

/**
 * Route-aware background system.
 *
 * Replaces the global StarfieldCanvas. Picks a backdrop "mode" per route
 * so disclosure pages don't look identical to god pages or vault pages.
 *
 * Modes:
 *   - 'starfield'     full 3D starfield (default cosmic look)
 *   - 'gradient'      pure animated gradient (no canvas — cheapest)
 *   - 'starfield-dim' starfield with heavy darkening overlay
 *
 * Each mode is wrapped in an AnimatePresence crossfade on route change.
 */

type Mode = 'starfield' | 'gradient' | 'starfield-dim';

interface BgConfig {
  /** Visual mode for the layer behind everything. */
  mode: Mode;
  /** CSS gradient painted over the mode (or as the whole bg in gradient mode). */
  gradient: string;
  /** Soft accent glow color used by the corner spotlight (rgba). */
  glow: string;
  /** Optional grain/scanline overlay class. */
  overlay?: 'redaction' | 'scanline' | 'ember' | 'sand' | 'ice' | 'ripple' | 'hex' | 'none';
  /** Used as React key — drives the crossfade. */
  id: string;
}

const DEFAULT_BG: BgConfig = {
  id: 'cosmic-default',
  mode: 'starfield',
  gradient:
    'radial-gradient(ellipse at top, rgba(139,92,246,0.10) 0%, transparent 60%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)',
  glow: 'rgba(139,92,246,0.18)',
  overlay: 'none',
};

/**
 * Route → background config.
 * Order matters: longer prefixes should come first.
 */
const ROUTE_BG: Array<{ match: (path: string) => boolean; bg: BgConfig }> = [
  // ── Disclosure / intel ────────────────────────────────────────────────
  {
    match: (p) => p === '/uap' || p === '/aaro' || p === '/crash-retrieval',
    bg: {
      id: 'declassified',
      mode: 'gradient',
      gradient:
        'radial-gradient(ellipse at top, rgba(220,38,38,0.18) 0%, transparent 55%), linear-gradient(180deg, #160606 0%, #0a0303 60%, #050000 100%)',
      glow: 'rgba(220,38,38,0.25)',
      overlay: 'redaction',
    },
  },
  {
    match: (p) => p === '/whistleblowers',
    bg: {
      id: 'intel-drop',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at center, rgba(220,38,38,0.12) 0%, transparent 55%), linear-gradient(180deg, rgba(8,4,4,0.7) 0%, rgba(0,0,0,0.95) 100%)',
      glow: 'rgba(239,68,68,0.22)',
      overlay: 'scanline',
    },
  },
  {
    match: (p) => p === '/missing',
    bg: {
      id: 'somber-archive',
      mode: 'gradient',
      gradient:
        'radial-gradient(ellipse at top, rgba(60,60,60,0.25) 0%, transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
      glow: 'rgba(180,180,180,0.10)',
      overlay: 'scanline',
    },
  },
  {
    match: (p) => p === '/the-46' || p === '/video-vault',
    bg: {
      id: 'vault',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at top, rgba(212,165,116,0.14) 0%, transparent 60%), linear-gradient(180deg, #0d0a05 0%, #060403 100%)',
      glow: 'rgba(252,211,77,0.20)',
      overlay: 'none',
    },
  },

  // ── Ancient / mythological ────────────────────────────────────────────
  {
    match: (p) => p === '/gods',
    bg: {
      id: 'ancient-temple',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at top, rgba(212,165,116,0.18) 0%, transparent 60%), linear-gradient(180deg, #14100a 0%, #08050a 60%, #050308 100%)',
      glow: 'rgba(252,211,77,0.22)',
      overlay: 'none',
    },
  },
  {
    match: (p) => p === '/shadow-pantheon',
    bg: {
      id: 'underworld',
      mode: 'gradient',
      gradient:
        'radial-gradient(ellipse at bottom, rgba(220,38,38,0.20) 0%, transparent 55%), linear-gradient(180deg, #0a0203 0%, #050101 100%)',
      glow: 'rgba(220,38,38,0.25)',
      overlay: 'ember',
    },
  },
  {
    match: (p) => p === '/timeline',
    bg: {
      id: 'deep-time',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at top, rgba(245,158,11,0.12) 0%, transparent 65%), linear-gradient(180deg, #0a0805 0%, #060403 100%)',
      glow: 'rgba(245,158,11,0.18)',
      overlay: 'none',
    },
  },
  {
    match: (p) => p === '/pyramids' || p === '/stone-faces' || p === '/glyphs' || p === '/builders',
    bg: {
      id: 'desert-night',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at bottom, rgba(212,165,116,0.18) 0%, transparent 60%), linear-gradient(180deg, #0a0805 0%, #050302 100%)',
      glow: 'rgba(212,165,116,0.20)',
      overlay: 'sand',
    },
  },

  // ── Field expeditions ─────────────────────────────────────────────────
  {
    match: (p) => p === '/antarctica',
    bg: {
      id: 'ice-station',
      mode: 'gradient',
      gradient:
        'radial-gradient(ellipse at top, rgba(125,211,252,0.20) 0%, transparent 60%), linear-gradient(180deg, #0a1929 0%, #061625 100%)',
      glow: 'rgba(125,211,252,0.22)',
      overlay: 'ice',
    },
  },
  {
    match: (p) => p === '/atlantis',
    bg: {
      id: 'submerged',
      mode: 'gradient',
      gradient:
        'radial-gradient(ellipse at center, rgba(45,212,191,0.20) 0%, transparent 65%), linear-gradient(180deg, #021a1f 0%, #001318 100%)',
      glow: 'rgba(94,234,212,0.22)',
      overlay: 'ripple',
    },
  },
  {
    match: (p) => p === '/underground' || p === '/encounters',
    bg: {
      id: 'subterranean',
      mode: 'gradient',
      gradient:
        'radial-gradient(ellipse at bottom, rgba(234,88,12,0.18) 0%, transparent 60%), linear-gradient(180deg, #0a0606 0%, #050303 100%)',
      glow: 'rgba(251,146,60,0.22)',
      overlay: 'ember',
    },
  },

  // ── Lab / observatory / signals ───────────────────────────────────────
  {
    match: (p) => p === '/cern' || p === '/elements',
    bg: {
      id: 'collider',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at center, rgba(34,211,238,0.16) 0%, transparent 60%), linear-gradient(180deg, #03000f 0%, #010005 100%)',
      glow: 'rgba(34,211,238,0.22)',
      overlay: 'hex',
    },
  },
  {
    match: (p) => p === '/species' || p === '/extinct',
    bg: {
      id: 'specimen',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at top, rgba(34,211,238,0.10) 0%, transparent 60%), linear-gradient(180deg, #050a10 0%, #020508 100%)',
      glow: 'rgba(34,211,238,0.18)',
      overlay: 'hex',
    },
  },
  {
    match: (p) => p === '/telescopes' || p === '/orb-report' || p === '/signals',
    bg: {
      id: 'observatory',
      mode: 'starfield',
      gradient:
        'radial-gradient(ellipse at top, rgba(34,211,238,0.12) 0%, transparent 60%), linear-gradient(180deg, rgba(2,5,15,0.4) 0%, rgba(0,0,0,0.85) 100%)',
      glow: 'rgba(34,211,238,0.20)',
      overlay: 'none',
    },
  },

  // ── Inner work / community ────────────────────────────────────────────
  {
    match: (p) => p === '/echo' || p === '/consciousness' || p === '/frequencies' || p === '/origin',
    bg: {
      id: 'inner-work',
      mode: 'starfield-dim',
      gradient:
        'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 60%), linear-gradient(180deg, #030a07 0%, #010503 100%)',
      glow: 'rgba(16,185,129,0.20)',
      overlay: 'none',
    },
  },
  {
    match: (p) => p === '/echoverse',
    bg: {
      id: 'social-warm',
      mode: 'starfield',
      gradient:
        'radial-gradient(ellipse at center, rgba(57,255,20,0.10) 0%, transparent 55%), linear-gradient(180deg, rgba(2,8,5,0.4) 0%, rgba(0,0,0,0.85) 100%)',
      glow: 'rgba(57,255,20,0.18)',
      overlay: 'none',
    },
  },
  {
    match: (p) => p === '/federation' || p === '/galaxy' || p === '/earth-pulse',
    bg: {
      id: 'cosmic-void',
      mode: 'starfield',
      gradient:
        'radial-gradient(ellipse at top, rgba(139,92,246,0.10) 0%, transparent 60%)',
      glow: 'rgba(139,92,246,0.22)',
      overlay: 'none',
    },
  },

  // ── Home ──────────────────────────────────────────────────────────────
  {
    match: (p) => p === '/' || p === '/index',
    bg: {
      id: 'cosmic-cathedral',
      mode: 'starfield',
      gradient:
        'radial-gradient(ellipse at top, rgba(252,211,77,0.07) 0%, transparent 55%), radial-gradient(ellipse at bottom, rgba(16,185,129,0.07) 0%, transparent 55%)',
      glow: 'rgba(252,211,77,0.16)',
      overlay: 'none',
    },
  },
];

function pickBg(pathname: string): BgConfig {
  for (const entry of ROUTE_BG) {
    if (entry.match(pathname)) return entry.bg;
  }
  return DEFAULT_BG;
}

/* ─────────────────────────────────────────────────────────────────────── */

const overlayClass: Record<NonNullable<BgConfig['overlay']>, string> = {
  none: '',
  redaction:
    "after:content-[''] after:absolute after:inset-0 after:opacity-[0.05] after:pointer-events-none after:bg-[repeating-linear-gradient(0deg,#000_0_2px,transparent_2px_18px)]",
  scanline:
    "after:content-[''] after:absolute after:inset-0 after:opacity-[0.06] after:pointer-events-none after:bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.5)_0_1px,transparent_1px_3px)]",
  ember:
    "after:content-[''] after:absolute after:inset-0 after:opacity-30 after:pointer-events-none after:bg-[radial-gradient(circle_at_20%_85%,rgba(251,146,60,0.18),transparent_45%),radial-gradient(circle_at_75%_90%,rgba(220,38,38,0.14),transparent_50%)]",
  sand:
    "after:content-[''] after:absolute after:inset-0 after:opacity-20 after:pointer-events-none after:bg-[radial-gradient(circle_at_50%_95%,rgba(212,165,116,0.25),transparent_55%)]",
  ice: "after:content-[''] after:absolute after:inset-0 after:opacity-30 after:pointer-events-none after:bg-[radial-gradient(circle_at_50%_5%,rgba(186,230,253,0.22),transparent_60%)]",
  ripple:
    "after:content-[''] after:absolute after:inset-0 after:opacity-25 after:pointer-events-none after:bg-[radial-gradient(ellipse_at_30%_50%,rgba(94,234,212,0.18),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(45,212,191,0.14),transparent_55%)]",
  hex:
    "after:content-[''] after:absolute after:inset-0 after:opacity-[0.08] after:pointer-events-none after:bg-[linear-gradient(60deg,transparent_48%,rgba(34,211,238,0.4)_49%,rgba(34,211,238,0.4)_51%,transparent_52%),linear-gradient(-60deg,transparent_48%,rgba(34,211,238,0.4)_49%,rgba(34,211,238,0.4)_51%,transparent_52%)] after:bg-[length:30px_52px]",
};

const layerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function BackgroundManager() {
  const location = useLocation();
  const bg = useMemo(() => pickBg(location.pathname), [location.pathname]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={bg.id}
          variants={layerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`absolute inset-0 ${bg.overlay && bg.overlay !== 'none' ? overlayClass[bg.overlay] : ''}`}
          style={{ background: bg.gradient }}
        >
          {bg.mode === 'starfield' && <StarfieldCanvas />}
          {bg.mode === 'starfield-dim' && (
            <>
              <StarfieldCanvas />
              <div className="absolute inset-0 bg-black/55" />
            </>
          )}
          {/* Hub-color glow that bleeds in from the corners */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 0% 0%, ${bg.glow}, transparent 45%), radial-gradient(circle at 100% 100%, ${bg.glow}, transparent 45%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
