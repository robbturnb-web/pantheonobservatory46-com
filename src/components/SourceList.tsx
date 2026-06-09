import { useState } from 'react';
import { ChevronDown, ChevronUp, Paperclip, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SourceLabel } from './SourceLabel';
import { summarizeSources, TIER_VISUAL } from '@/lib/source-tier';

export interface Source {
  label: string;
  url: string;
}

interface SourceListProps {
  sources: Source[];
  defaultOpen?: boolean;
}

export function SourceList({ sources, defaultOpen = false }: SourceListProps) {
  const [open, setOpen] = useState(defaultOpen);
  if (!sources || sources.length === 0) return null;

  const breakdown = summarizeSources(sources.map((s) => s.url));
  const best = TIER_VISUAL[breakdown.best];

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
        aria-expanded={open}
      >
        <Paperclip className="w-3.5 h-3.5" />
        Sources ({sources.length})
        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${best.border} ${best.bg}`}
          title={`Highest-tier citation: ${best.label}`}
        >
          <ShieldCheck className={`w-2.5 h-2.5 ${best.text}`} />
          <span className={`text-[9px] tracking-[1.5px] ${best.text}`}>{best.short}</span>
        </span>
        {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Tier breakdown bar */}
            <div className="flex flex-wrap gap-2 mt-2 mb-2 text-[10px] font-mono uppercase tracking-[1.5px]">
              {breakdown.primary > 0 && (
                <span className={`px-1.5 py-0.5 rounded border ${TIER_VISUAL.PRIMARY.border} ${TIER_VISUAL.PRIMARY.bg} ${TIER_VISUAL.PRIMARY.text}`}>
                  {breakdown.primary} primary
                </span>
              )}
              {breakdown.official > 0 && (
                <span className={`px-1.5 py-0.5 rounded border ${TIER_VISUAL.OFFICIAL.border} ${TIER_VISUAL.OFFICIAL.bg} ${TIER_VISUAL.OFFICIAL.text}`}>
                  {breakdown.official} official
                </span>
              )}
              {breakdown.secondary > 0 && (
                <span className={`px-1.5 py-0.5 rounded border ${TIER_VISUAL.SECONDARY.border} ${TIER_VISUAL.SECONDARY.bg} ${TIER_VISUAL.SECONDARY.text}`}>
                  {breakdown.secondary} secondary
                </span>
              )}
              {breakdown.unverified > 0 && (
                <span className={`px-1.5 py-0.5 rounded border ${TIER_VISUAL.UNVERIFIED.border} ${TIER_VISUAL.UNVERIFIED.bg} ${TIER_VISUAL.UNVERIFIED.text}`}>
                  {breakdown.unverified} unverified
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {sources.map((s, i) => (
                <SourceLabel key={i} url={s.url} label={s.label} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
