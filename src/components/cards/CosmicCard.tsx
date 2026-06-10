import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * CosmicCard — reusable glass panel with subtle border glow.
 * Pure presentational wrapper; no hardcoded colors.
 */
export const CosmicCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md',
        'shadow-[0_0_40px_-12px_hsl(var(--primary)/0.25)]',
        'transition hover:border-primary/40',
        className,
      )}
      {...props}
    />
  ),
);
CosmicCard.displayName = 'CosmicCard';

export default CosmicCard;
