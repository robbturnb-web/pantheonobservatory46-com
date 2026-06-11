import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CommandCardProps {
  to: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  /** Tailwind text color class for icon + accents, e.g. "text-emerald-300". */
  accent?: string;
  comingSoon?: boolean;
}

/**
 * Reusable holographic glass card for the Command Dashboard grid.
 * Mobile-first: full-width by default, scales up via parent grid.
 */
export function CommandCard({ to, title, desc, Icon, accent = 'text-primary', comingSoon }: CommandCardProps) {
  const Inner = (
    <div className="relative h-full rounded-2xl border border-white/10 bg-background/50 backdrop-blur-xl p-5 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_36px_-8px_hsl(var(--primary)/0.55)] hover:-translate-y-0.5">
      {/* corner glows */}
      <span className="pointer-events-none absolute -top-px -left-px w-8 h-8 border-t border-l border-primary/60 rounded-tl-2xl" />
      <span className="pointer-events-none absolute -bottom-px -right-px w-8 h-8 border-b border-r border-primary/60 rounded-br-2xl" />
      {/* hover sheen */}
      <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_0%,hsl(var(--primary)/0.18),transparent_60%)]" />

      <div className="relative flex flex-col h-full gap-3">
        <div className={cn('w-11 h-11 rounded-xl border border-white/10 bg-black/40 flex items-center justify-center', accent)}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground leading-tight">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className={cn('text-[10px] uppercase tracking-[2.5px] font-bold', comingSoon ? 'text-amber-300/80' : accent)}>
            {comingSoon ? 'Coming Soon' : 'Explore'}
          </span>
          <ArrowRight className={cn('w-4 h-4 transition-transform group-hover:translate-x-1', accent)} />
        </div>
      </div>
    </div>
  );

  if (comingSoon) {
    return <div className="group block h-full cursor-not-allowed opacity-90">{Inner}</div>;
  }
  return (
    <Link to={to} className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl">
      {Inner}
    </Link>
  );
}

export default CommandCard;
