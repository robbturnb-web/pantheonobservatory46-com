import type { EvidenceGrade } from '../types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const gradeConfig: Record<
  EvidenceGrade,
  { label: string; dot: string; ring: string; glow: string }
> = {
  // Neon green — solid evidence
  DOCUMENTED: {
    label: 'Documented',
    dot: '#39ff14',
    ring: 'rgba(57, 255, 20, 0.35)',
    glow: 'rgba(57, 255, 20, 0.55)',
  },
  // Sky blue — credible / corroborated
  CREDIBLE: {
    label: 'Credible',
    dot: '#38bdf8',
    ring: 'rgba(56, 189, 248, 0.35)',
    glow: 'rgba(56, 189, 248, 0.55)',
  },
  // Teal — speculative / emerging
  SPECULATIVE: {
    label: 'Speculative',
    dot: '#2dd4bf',
    ring: 'rgba(45, 212, 191, 0.35)',
    glow: 'rgba(45, 212, 191, 0.5)',
  },
  // Muted purple-grey — unverified
  UNVERIFIED: {
    label: 'Unverified',
    dot: '#a78bfa',
    ring: 'rgba(167, 139, 250, 0.3)',
    glow: 'rgba(167, 139, 250, 0.4)',
  },
};

export function EvidenceBadge({ grade }: { grade: EvidenceGrade }) {
  const c = gradeConfig[grade];
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            role="img"
            aria-label={`Evidence grade: ${c.label}`}
            className="inline-flex items-center justify-center align-middle h-5 w-5 rounded-full cursor-help shrink-0"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${c.dot}, ${c.dot}cc 55%, transparent 75%)`,
              boxShadow: `0 0 10px ${c.glow}, inset 0 0 0 1px ${c.ring}`,
            }}
          >
            <span
              className="block h-1.5 w-1.5 rounded-full"
              style={{
                background: '#fff',
                opacity: 0.9,
                boxShadow: `0 0 6px ${c.dot}`,
              }}
            />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs font-semibold">
          {c.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
