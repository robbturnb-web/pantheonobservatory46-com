import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useHomeTheme, HomeDomain } from '@/contexts/HomeThemeContext';
import { LiveBackdrop } from '@/components/home/LiveBackdrop';

/**
 * Constellation Map layout
 * Each constellation is a cluster of stars with line segments between them,
 * shaped vaguely like its theme. Hovering brightens it + tints the sky.
 */

interface Star { x: number; y: number }
interface Constellation {
  id: string;
  domain: HomeDomain;
  to: string;
  label: string;
  blurb: string;
  accent: string;
  stars: Star[];
  edges: Array<[number, number]>;
}

// Coordinates in % of viewBox (0-100)
const CONSTELLATIONS: Constellation[] = [
  {
    id: 'orion-disclosure',
    domain: 'disclosure',
    to: '/uap',
    label: 'The Watcher',
    blurb: 'UAP case files',
    accent: '#ef4444',
    stars: [{ x: 12, y: 22 }, { x: 18, y: 28 }, { x: 15, y: 34 }, { x: 20, y: 40 }, { x: 13, y: 44 }, { x: 25, y: 30 }],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5]],
  },
  {
    id: 'pantheon-gods',
    domain: 'ancient',
    to: '/gods',
    label: 'The Pantheon',
    blurb: '18 deities · 6 cultures',
    accent: '#fcd34d',
    stars: [{ x: 38, y: 18 }, { x: 44, y: 22 }, { x: 50, y: 18 }, { x: 56, y: 22 }, { x: 62, y: 18 }, { x: 50, y: 32 }, { x: 50, y: 26 }],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 6], [6, 5]],
  },
  {
    id: 'pyramid-stones',
    domain: 'ancient',
    to: '/pyramids',
    label: 'The Megalith',
    blurb: 'Pyramids & stone faces',
    accent: '#f59e0b',
    stars: [{ x: 73, y: 30 }, { x: 80, y: 22 }, { x: 87, y: 30 }, { x: 80, y: 30 }],
    edges: [[0, 1], [1, 2], [2, 0], [0, 3], [2, 3]],
  },
  {
    id: 'galaxy-cosmos',
    domain: 'cosmic',
    to: '/galaxy',
    label: 'The Spiral',
    blurb: 'Galaxy explorer',
    accent: '#a78bfa',
    stars: [{ x: 22, y: 58 }, { x: 28, y: 54 }, { x: 32, y: 60 }, { x: 30, y: 66 }, { x: 24, y: 66 }],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
  },
  {
    id: 'echo-mind',
    domain: 'inner',
    to: '/consciousness',
    label: 'The Receiver',
    blurb: 'Mind & consciousness',
    accent: '#34d399',
    stars: [{ x: 50, y: 56 }, { x: 55, y: 62 }, { x: 50, y: 68 }, { x: 45, y: 62 }],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0]],
  },
  {
    id: 'saucer',
    domain: 'disclosure',
    to: '/whistleblowers',
    label: 'The Saucer',
    blurb: 'Whistleblower vault',
    accent: '#67e8f9',
    stars: [{ x: 70, y: 56 }, { x: 76, y: 54 }, { x: 82, y: 56 }, { x: 78, y: 62 }, { x: 73, y: 62 }],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]],
  },
];

function StarPoint({ x, y, accent, active, scale = 1 }: { x: number; y: number; accent: string; active: boolean; scale?: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={(active ? 0.55 : 0.32) * scale} fill={active ? accent : '#fff'} opacity={active ? 1 : 0.85} />
      {active && <circle cx={x} cy={y} r={1.6} fill={accent} opacity={0.25} />}
    </>
  );
}

function StarTwinkle({ count = 120 }: { count?: number }) {
  const stars = useRef<Array<{ x: number; y: number; r: number; d: number }>>([]);
  if (stars.current.length === 0) {
    stars.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 0.1 + Math.random() * 0.35,
      d: 2 + Math.random() * 5,
    }));
  }
  return (
    <>
      {stars.current.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="#fff"
          animate={{ opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: s.d, repeat: Infinity, delay: i * 0.04 }}
        />
      ))}
    </>
  );
}

/** Slow-drifting comet across the sky every ~25s */
function Comet() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 25000);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.line
      key={tick}
      x1={-5}
      y1={Math.random() * 30 + 5}
      x2={110}
      y2={Math.random() * 30 + 30}
      stroke="url(#cometGradient)"
      strokeWidth={0.4}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 1, 0] }}
      transition={{ duration: 4, ease: 'easeOut' }}
    />
  );
}

export function ConstellationLayout() {
  const { bind } = useHomeTheme();
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredCon = CONSTELLATIONS.find((c) => c.id === hovered);

  return (
    <div className="relative">
      <LiveBackdrop />

      <section className="relative min-h-[100vh] overflow-hidden">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center pt-10 px-4"
        >
          <div className="text-[10px] uppercase tracking-[6px] text-white/50 mb-2">Read the Sky</div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            <span style={{ background: 'linear-gradient(90deg, #c4b5fd, #fff, #fcd34d)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              CONSTELLATIONS
            </span>
          </h1>
          <p className="text-sm text-white/60 mt-2 h-5">
            {hoveredCon ? `${hoveredCon.label} — ${hoveredCon.blurb}` : 'Trace the figures the ancients left behind.'}
          </p>
        </motion.div>

        {/* Sky */}
        <svg
          viewBox="0 0 100 75"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-[88vh]"
        >
          <defs>
            <linearGradient id="cometGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0" />
              <stop offset="80%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
          </defs>

          <StarTwinkle />
          <Comet />

          {CONSTELLATIONS.map((c) => {
            const isActive = hovered === c.id;
            return (
              <Link key={c.id} to={c.to} {...bind(c.domain)}>
                <g
                  onMouseEnter={() => setHovered(c.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                  style={{ transition: 'opacity 0.4s' }}
                >
                  {/* Edges */}
                  {c.edges.map(([a, b], i) => (
                    <line
                      key={i}
                      x1={c.stars[a].x}
                      y1={c.stars[a].y}
                      x2={c.stars[b].x}
                      y2={c.stars[b].y}
                      stroke={isActive ? c.accent : '#fff'}
                      strokeOpacity={isActive ? 0.85 : 0.15}
                      strokeWidth={isActive ? 0.18 : 0.08}
                      style={{ transition: 'all 0.4s' }}
                    />
                  ))}
                  {/* Stars */}
                  {c.stars.map((s, i) => (
                    <StarPoint key={i} x={s.x} y={s.y} accent={c.accent} active={isActive} />
                  ))}
                  {/* Hit zone (invisible) */}
                  {c.stars.map((s, i) => (
                    <circle key={`hit-${i}`} cx={s.x} cy={s.y} r={3} fill="transparent" />
                  ))}
                  {/* Floating label when active */}
                  {isActive && (
                    <text
                      x={c.stars[0].x + 3}
                      y={c.stars[0].y - 2}
                      fontSize={1.6}
                      fill={c.accent}
                      style={{ filter: `drop-shadow(0 0 1px ${c.accent})`, fontFamily: 'serif' }}
                    >
                      {c.label.toUpperCase()}
                    </text>
                  )}
                </g>
              </Link>
            );
          })}
        </svg>

        {/* Pantheon temple silhouette horizon */}
        <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 w-full h-24 z-10">
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#000" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0 12 L0 9 L8 9 L8 7 L12 7 L12 5 L16 5 L16 3 L24 1 L32 3 L32 5 L36 5 L36 7 L40 7 L40 4 L42 3 L44 4 L44 7 L48 7 L48 5 L52 5 L52 7 L56 7 L56 4 L58 3 L60 4 L60 7 L64 7 L64 5 L68 5 L68 7 L72 7 L72 5 L76 5 L76 3 L84 1 L92 3 L92 5 L96 5 L96 7 L100 7 L100 12 Z"
            fill="url(#hg)"
          />
          {/* Tiny lit windows */}
          {[14, 30, 50, 66, 82].map((cx, i) => (
            <motion.rect
              key={i}
              x={cx}
              y={6}
              width={0.6}
              height={0.6}
              fill="#fcd34d"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </svg>

        {/* Caption */}
        <div className="absolute bottom-3 inset-x-0 z-20 text-center">
          <div className="text-[10px] uppercase tracking-[5px] text-white/40 font-mono">
            ROMA · PANTHEON · 126 CE
          </div>
        </div>
      </section>
    </div>
  );
}
