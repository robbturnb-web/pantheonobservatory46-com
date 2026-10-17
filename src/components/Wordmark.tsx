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
          backgroundImage: 'linear-gradient(135deg, #9B1C31 0%, #721426 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 20px rgba(155,28,49,0.25)',
        }}
      >
        Pan
      </span>
      <span
        style={{
          backgroundImage: 'linear-gradient(135deg, #D4AF5A 0%, #C0C0C8 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 20px rgba(212,175,90,0.22)',
        }}
      >
        theon
      </span>
      {!short && (
        <>
          <span className="opacity-40 mx-1.5" style={{ color: '#D4AF5A' }}>·</span>
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #D4AF5A 0%, #C0C0C8 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(212,175,90,0.22)',
            }}
          >
            Observ
          </span>
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #E5C77D 0%, #D4AF5A 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 20px rgba(212,175,90,0.25)',
            }}
          >
            atory
          </span>
        </>
      )}
    </span>
  );
}
