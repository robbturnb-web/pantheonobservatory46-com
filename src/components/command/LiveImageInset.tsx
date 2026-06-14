import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LiveImageInsetProps {
  src: string;
  alt: string;
  caption: string;
  /** Tailwind color class for ring/glow accent, e.g. "ring-amber-300/60" */
  accentRing?: string;
  /** Tailwind text color for caption, e.g. "text-amber-200" */
  accentText?: string;
  /** Auto-refresh interval in ms. Pass 0 to disable. */
  refreshMs?: number;
  /** Shape: round (default) or rounded square */
  shape?: 'circle' | 'square';
  className?: string;
}

/**
 * Floating live-image badge that sits in the top-right corner of a LiveChamber.
 * Refreshes the image by appending a cache-busting query param on an interval.
 * Gracefully hides if the upstream source fails to load.
 */
export function LiveImageInset({
  src,
  alt,
  caption,
  accentRing = 'ring-white/30',
  accentText = 'text-white/80',
  refreshMs = 5 * 60_000,
  shape = 'circle',
  className,
}: LiveImageInsetProps) {
  const [bust, setBust] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!refreshMs) return;
    const id = setInterval(() => setBust((n) => n + 1), refreshMs);
    return () => clearInterval(id);
  }, [refreshMs]);

  if (failed) return null;

  const url = bust === 0 ? src : `${src}${src.includes('?') ? '&' : '?'}_v=${bust}`;
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div
      className={cn(
        'absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-none',
        'w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40',
        className,
      )}
      aria-hidden="false"
    >
      <div
        className={cn(
          'relative w-full h-full overflow-hidden ring-2 ring-offset-2 ring-offset-transparent',
          radius,
          accentRing,
        )}
        style={{
          boxShadow:
            '0 0 32px -4px currentColor, inset 0 0 24px -6px rgba(0,0,0,0.6)',
        }}
      >
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 animate-pulse" />
        )}
        <img
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      <p
        className={cn(
          'mt-1.5 text-center font-mono text-[8px] sm:text-[9px] uppercase tracking-[1.5px] leading-tight',
          accentText,
        )}
      >
        {caption}
      </p>
    </div>
  );
}

export default LiveImageInset;
