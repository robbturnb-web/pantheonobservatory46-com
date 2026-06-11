import { ShieldCheck, HelpCircle, Sparkles, Telescope } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ClaimKind = 'FACT' | 'THEORY' | 'MYTH' | 'SPECULATION';

const STYLES: Record<ClaimKind, { cls: string; Icon: typeof ShieldCheck; label: string }> = {
  FACT:        { cls: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300', Icon: ShieldCheck, label: 'Fact' },
  THEORY:      { cls: 'border-sky-400/50 bg-sky-400/10 text-sky-300',             Icon: Telescope,  label: 'Theory' },
  MYTH:        { cls: 'border-amber-400/50 bg-amber-400/10 text-amber-300',       Icon: Sparkles,   label: 'Myth' },
  SPECULATION: { cls: 'border-fuchsia-400/50 bg-fuchsia-400/10 text-fuchsia-300', Icon: HelpCircle, label: 'Speculation' },
};

export function ClaimBadge({ kind, className }: { kind: ClaimKind; className?: string }) {
  const { cls, Icon, label } = STYLES[kind];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-mono uppercase tracking-[2px]',
        cls,
        className,
      )}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

export default ClaimBadge;
