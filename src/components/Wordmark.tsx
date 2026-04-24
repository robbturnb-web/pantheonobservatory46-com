/**
 * PantheonWordmark — split-color brand mark.
 *  Pan    → cosmic jade
 *  theon  → purple
 *  Observ → purple
 *  atory  → cosmic gold
 */
interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Show only "PANTHEON" (used in compact navbar). */
  short?: boolean;
}

const sizeMap = {
  sm: 'text-sm tracking-[0.18em]',
  md: 'text-xl tracking-[0.18em]',
  lg: 'text-3xl tracking-[0.2em]',
  xl: 'text-5xl tracking-[0.22em]',
};

export function PantheonWordmark({ size = 'md', className = '', short = false }: WordmarkProps) {
  return (
    <span
      className={`font-bold uppercase ${sizeMap[size]} ${className}`}
      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      <span
        style={{
          backgroundImage: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 20px rgba(16,185,129,0.25)',
        }}
      >
        Pan
      </span>
      <span
        style={{
          backgroundImage: 'linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 20px rgba(139,92,246,0.25)',
        }}
      >
        theon
      </span>
      {!short && (
        <>
          <span className="opacity-40 mx-1.5" style={{ color: '#a78bfa' }}>·</span>
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(139,92,246,0.25)',
            }}
          >
            Observ
          </span>
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(251,191,36,0.3)',
            }}
          >
            atory
          </span>
        </>
      )}
    </span>
  );
}
