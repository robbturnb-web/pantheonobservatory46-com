import { useMemo } from 'react';
import type { QuakeFeature } from '@/lib/live-data';

interface SeismicRibbonProps {
  quakes: QuakeFeature[];
}

/**
 * Horizontal SVG ribbon plotting recent quakes by longitude (x).
 * Dot size = magnitude, color = depth proxy (via magnitude), strongest pulses.
 */
export function SeismicRibbon({ quakes }: SeismicRibbonProps) {
  const items = useMemo(() => {
    if (!quakes?.length) return [];
    const maxMag = quakes.reduce((m, q) => Math.max(m, q.mag), 0);
    return quakes.map((q) => {
      const [lon] = q.coords;
      const x = ((lon + 180) / 360) * 100; // % across
      const r = Math.max(2, 1.5 + q.mag * 1.2);
      return {
        id: q.id,
        x,
        r,
        mag: q.mag,
        isPeak: q.mag === maxMag,
        place: q.place,
      };
    });
  }, [quakes]);

  if (!items.length) return null;

  return (
    <div className="relative w-full h-16 mt-4 rounded-xl border border-rose-500/20 bg-black/40 overflow-hidden">
      {/* axis */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-rose-400/40 to-transparent" />
      {/* longitude ticks */}
      {[0, 25, 50, 75, 100].map((p) => (
        <div
          key={p}
          className="absolute top-0 bottom-0 w-px bg-rose-400/10"
          style={{ left: `${p}%` }}
        />
      ))}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        {items.map((it) => (
          <g key={it.id}>
            {it.isPeak && (
              <circle
                cx={it.x}
                cy={50}
                r={it.r * 2.5}
                fill="rgba(220,38,38,0.25)"
                className="animate-ping"
                style={{ transformOrigin: `${it.x}% 50%` }}
              />
            )}
            <circle
              cx={it.x}
              cy={50}
              r={it.r}
              fill={it.isPeak ? '#f87171' : '#fb923c'}
              opacity={0.85}
            >
              <title>{`M${it.mag.toFixed(1)} · ${it.place}`}</title>
            </circle>
          </g>
        ))}
      </svg>
      <p className="absolute bottom-1 left-2 font-mono text-[8px] uppercase tracking-[1.5px] text-rose-300/60">
        Lon −180° → +180°
      </p>
      <p className="absolute bottom-1 right-2 font-mono text-[8px] uppercase tracking-[1.5px] text-rose-300/60">
        24h pulse · USGS
      </p>
    </div>
  );
}

export default SeismicRibbon;
