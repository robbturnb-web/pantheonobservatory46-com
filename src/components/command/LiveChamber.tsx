import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

export type ChamberTheme =
  | 'solar'
  | 'seismic'
  | 'orbital'
  | 'atmosphere'
  | 'anomaly'
  | 'codex';

interface ThemeStyle {
  ring: string;
  glow: string;
  accent: string;
  label: string;
  bg: ReactNode;
}

const SCANLINES = (
  <div
    className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
    style={{
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0 1px, transparent 1px 3px)',
    }}
  />
);

const THEMES: Record<ChamberTheme, ThemeStyle> = {
  solar: {
    ring: 'border-amber-400/30',
    glow: 'shadow-[0_0_80px_-20px_rgba(251,191,36,0.35)]',
    accent: 'text-amber-300',
    label: 'text-amber-300/80',
    bg: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(220,38,38,0.25),transparent_60%)]" />
        <div className="absolute inset-0 animate-[chamber-pulse_6s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,rgba(252,211,77,0.2),transparent_70%)]" />
        {SCANLINES}
      </>
    ),
  },
  seismic: {
    ring: 'border-rose-500/30',
    glow: 'shadow-[0_0_80px_-20px_rgba(220,38,38,0.35)]',
    accent: 'text-rose-300',
    label: 'text-rose-300/80',
    bg: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(220,38,38,0.25),transparent_55%),radial-gradient(ellipse_at_70%_30%,rgba(120,53,15,0.4),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgba(248,113,113,0.15) 0 1px, transparent 1px 24px), repeating-linear-gradient(25deg, rgba(248,113,113,0.1) 0 1px, transparent 1px 32px)',
          }}
        />
      </>
    ),
  },
  orbital: {
    ring: 'border-cyan-400/30',
    glow: 'shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)]',
    accent: 'text-cyan-300',
    label: 'text-cyan-300/80',
    bg: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.25),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.25),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-40 animate-[chamber-sweep_12s_linear_infinite]"
          style={{
            backgroundImage:
              'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(103,232,249,0.25) 30deg, transparent 60deg, transparent 360deg)',
          }}
        />
        {SCANLINES}
      </>
    ),
  },
  atmosphere: {
    ring: 'border-sky-400/30',
    glow: 'shadow-[0_0_80px_-20px_rgba(56,189,248,0.35)]',
    accent: 'text-sky-300',
    label: 'text-sky-300/80',
    bg: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(ellipse_at_50%_80%,rgba(148,163,184,0.2),transparent_60%)]" />
        <div className="absolute inset-0 animate-[chamber-flash_7s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_25%)]" />
      </>
    ),
  },
  anomaly: {
    ring: 'border-emerald-400/30',
    glow: 'shadow-[0_0_80px_-20px_rgba(16,185,129,0.35)]',
    accent: 'text-emerald-300',
    label: 'text-emerald-300/80',
    bg: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(16,185,129,0.2),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(88,28,135,0.4),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.18) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {SCANLINES}
      </>
    ),
  },
  codex: {
    ring: 'border-amber-300/30',
    glow: 'shadow-[0_0_80px_-20px_rgba(214,179,90,0.4)]',
    accent: 'text-amber-200',
    label: 'text-amber-200/80',
    bg: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(214,179,90,0.25),transparent_55%),radial-gradient(circle_at_50%_90%,rgba(124,58,237,0.3),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-30 animate-[chamber-spin_60s_linear_infinite]"
          style={{
            backgroundImage:
              'conic-gradient(from 0deg, rgba(252,211,77,0.18), transparent 25%, rgba(252,211,77,0.18) 50%, transparent 75%, rgba(252,211,77,0.18))',
          }}
        />
      </>
    ),
  },
};

export interface LiveChamberProps {
  title: string;
  subtitle?: string;
  Icon?: LucideIcon;
  theme: ChamberTheme;
  status?: 'live' | 'pending' | 'manual' | 'cached' | 'external';
  heroImage?: string;
  children: ReactNode;
  className?: string;
}

const STATUS_LABEL: Record<NonNullable<LiveChamberProps['status']>, string> = {
  live: '● LIVE',
  pending: '◌ PENDING',
  manual: '◇ MANUAL',
  cached: '◐ CACHED',
  external: '◈ EXTERNAL',
};

const shellVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(12px)', scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function LiveChamber({
  title,
  subtitle,
  Icon,
  theme,
  status,
  heroImage,
  children,
  className,
}: LiveChamberProps) {
  const t = THEMES[theme];
  return (
    <motion.section
      variants={shellVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'relative rounded-3xl border bg-background/40 backdrop-blur-xl overflow-hidden',
        t.ring,
        t.glow,
        className,
      )}
    >
      {heroImage && (
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1536}
            height={768}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background/95" />
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70">{t.bg}</div>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 chamber-enter-glow',
          t.accent,
        )}
        style={{
          background:
            'radial-gradient(circle at 50% 40%, currentColor, transparent 60%)',
          mixBlendMode: 'screen',
          opacity: 0,
        }}
      />
      <span className="pointer-events-none absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-current rounded-tl-3xl opacity-40" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-current rounded-br-3xl opacity-40" />

      <motion.header
        variants={childVariants}
        className="relative z-10 flex items-start justify-between gap-3 px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-white/5"
      >
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <div className={cn('shrink-0 w-11 h-11 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center', t.accent)}>
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div className="min-w-0">
            <p className={cn('text-[10px] font-mono uppercase tracking-[3px]', t.label)}>
              Chamber · {theme}
            </p>
            <h2 className="text-lg sm:text-xl font-black text-foreground tracking-tight leading-tight truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{subtitle}</p>
            )}
          </div>
        </div>
        {status && (
          <span className={cn('shrink-0 font-mono text-[10px] uppercase tracking-[2px] px-2 py-1 rounded border border-current/40 bg-black/30', t.accent)}>
            {STATUS_LABEL[status]}
          </span>
        )}
      </motion.header>

      <motion.div variants={childVariants} className="relative z-10 p-5 sm:p-6">
        {children}
      </motion.div>
    </motion.section>
  );
}


export default LiveChamber;
