import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Reusable cinematic hero for Pantheon realm pages.
 * Standardizes label, title, tagline, and atmosphere across
 * /galaxy, /uap, /orb-report, and any future realm pages.
 */

interface HeroAtmosphere {
  radial?: boolean;   // Soft radial accent glow
  scanline?: boolean; // Diagonal grid overlay
  orbs?: boolean;     // Floating animated orbs
}

interface HeroSectionProps {
  label: string;
  title: string;
  tagline: string;
  accent: string; // CSS color value — hex, rgb, or var()
  variant?: 'section' | 'overlay';
  align?: 'left' | 'center';
  maxWidth?: string; // Tailwind max-width class
  pt?: string;      // Tailwind padding-top class
  pb?: string;      // Tailwind padding-bottom class
  atmosphere?: HeroAtmosphere;
  children?: React.ReactNode;
  className?: string;
}

export function HeroSection({
  label,
  title,
  tagline,
  accent,
  variant = 'section',
  align = 'left',
  maxWidth = 'max-w-4xl',
  pt = 'pt-24',
  pb = 'pb-14',
  atmosphere = { radial: true },
  children,
  className,
}: HeroSectionProps) {
  const isCenter = align === 'center';

  const textShadow = `0 0 28px ${accent}45, 0 2px 12px rgba(0,0,0,0.7)`;
  const labelGlow = `0 0 8px ${accent}`;

  const innerContent = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(isCenter && 'text-center')}
    >
      {/* Label with pulsing dot */}
      <div
        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.5em] mb-4"
        style={{ color: accent }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: accent, boxShadow: labelGlow }}
        />
        {label}
      </div>

      {/* Title */}
      <h1
        className="text-5xl sm:text-6xl md:text-7xl mb-5 leading-tight"
        style={{
          fontFamily: 'Cinzel, serif',
          color: '#E5F8FF',
          textShadow: textShadow,
        }}
      >
        {title}
      </h1>

      {/* Tagline */}
      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-6">
        {tagline}
      </p>

      {/* Extra content (chips, tiers, etc.) */}
      {children}
    </motion.div>
  );

  if (variant === 'overlay') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className={cn(
          'pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center px-4',
          className
        )}
      >
        <div
          className="text-[10px] uppercase tracking-[0.5em] mb-2"
          style={{ color: accent, textShadow: `0 0 12px ${accent}99` }}
        >
          {label}
        </div>
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-wide"
          style={{
            fontFamily: 'Cinzel, serif',
            color: '#E5F8FF',
            textShadow: `0 0 24px ${accent}70, 0 2px 8px rgba(0,0,0,0.8)`,
          }}
        >
          {title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground/90 max-w-md mx-auto">
          {tagline}
        </p>
        {children}
      </motion.div>
    );
  }

  return (
    <section className={cn('relative overflow-hidden border-b border-border/40', className)}>
      {/* Atmosphere — radial gradient */}
      {atmosphere?.radial && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${accent}2e, transparent 55%), radial-gradient(ellipse at 75% 80%, ${accent}1a, transparent 60%), linear-gradient(180deg, rgba(5,3,13,0) 0%, hsl(var(--background)) 100%)`,
          }}
        />
      )}

      {/* Atmosphere — scanline grid */}
      {atmosphere?.scanline && (
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${accent}99 1px, transparent 1px), linear-gradient(90deg, ${accent}99 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* Atmosphere — floating orbs */}
      {atmosphere?.orbs && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: '12%', top: '30%', size: 6, delay: 0 },
            { left: '78%', top: '20%', size: 4, delay: 1.5 },
            { left: '55%', top: '60%', size: 8, delay: 0.8 },
            { left: '30%', top: '70%', size: 5, delay: 2.2 },
            { left: '88%', top: '55%', size: 5, delay: 3 },
          ].map((o, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: o.left,
                top: o.top,
                width: o.size,
                height: o.size,
                background: accent,
                boxShadow: `0 0 16px ${accent}, 0 0 32px ${accent}99`,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: o.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div
        className={cn(
          'relative mx-auto px-4 sm:px-6 lg:px-8',
          maxWidth,
          pt,
          pb
        )}
      >
        {innerContent}
      </div>
    </section>
  );
}
