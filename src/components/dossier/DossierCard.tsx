import { motion } from 'framer-motion';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import type { DossierEntry, DossierConfidence } from './types';
import type { PageTheme } from '@/lib/page-themes';

const confidenceConfig: Record<
  DossierConfidence,
  { label: string; color: string }
> = {
  VERIFIED: { label: 'Verified', color: '#84cc16' },
  REPORTED: { label: 'Reported', color: '#3b82f6' },
  ALLEGED: { label: 'Alleged', color: '#f59e0b' },
  DEBATED: { label: 'Debated', color: '#a855f7' },
};

interface DossierCardProps {
  entry: DossierEntry;
  theme: PageTheme;
  index: number;
  onOpen: () => void;
}

export function DossierCard({ entry, theme, index, onOpen }: DossierCardProps) {
  const conf = entry.confidence ? confidenceConfig[entry.confidence] : null;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -4 }}
      className="group relative w-full text-left rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
      style={{
        background: theme.cardSurface,
        border: `1px solid ${theme.cardBorder}`,
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Hero image (optional) */}
      {entry.heroImage && (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src={entry.heroImage}
            alt={entry.title}
            loading="lazy"
            width={1280}
            height={720}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${theme.cardSurface} 0%, transparent 55%, transparent 100%)`,
            }}
          />
        </div>
      )}

      {/* Top classification strip */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentAlt})` }}
      />

      {/* Body */}
      <div className="p-5 md:p-6 relative">
        {/* Stamp watermark — desktop only */}
        <div
          className="hidden lg:block absolute top-4 right-4 px-2 py-0.5 text-[9px] font-bold tracking-[0.2em] border opacity-40 rotate-[6deg] group-hover:opacity-70 transition-opacity"
          style={{
            color: theme.stampColor,
            borderColor: theme.stampColor,
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {theme.classificationLabel.split('//')[0].trim()}
        </div>

        {/* Category + symbol */}
        <div className="flex items-center gap-2 mb-3">
          {entry.symbol && (
            <span className="text-2xl" aria-hidden>
              {entry.symbol}
            </span>
          )}
          {entry.category && (
            <span
              className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: theme.accent }}
            >
              {entry.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-2xl font-bold mb-1 leading-tight"
          style={{ color: theme.heroFg }}
        >
          {entry.title}
        </h3>

        {/* Subtitle */}
        {entry.subtitle && (
          <p className="text-sm mb-3 opacity-70" style={{ color: theme.heroFg }}>
            {entry.subtitle}
          </p>
        )}

        {/* Summary */}
        <p className="text-sm leading-relaxed opacity-80 line-clamp-3 mb-4" style={{ color: theme.heroFg }}>
          {entry.summary}
        </p>

        {/* Footer meta */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: theme.cardBorder }}>
          <div className="flex items-center gap-2 flex-wrap">
            {conf && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border"
                style={{ background: `${conf.color}15`, color: conf.color, borderColor: `${conf.color}55` }}
              >
                <ShieldAlert className="w-2.5 h-2.5" />
                {conf.label}
              </span>
            )}
            {entry.era && (
              <span className="text-[10px] uppercase tracking-wider opacity-60" style={{ color: theme.heroFg }}>
                {entry.era}
              </span>
            )}
          </div>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity"
            style={{ color: theme.accent }}
          >
            Open file <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
