/**
 * ContentTrustBadge — labels a piece of content as fact, lore, speculation, etc.
 * Pair with SourceLink to show both WHAT the claim is AND where it comes from.
 */
import { CONTENT_TRUST_VISUAL, type ContentTrust } from '@/lib/content-trust';

interface Props {
  trust: ContentTrust;
  compact?: boolean;
  className?: string;
}

export function ContentTrustBadge({ trust, compact, className }: Props) {
  const v = CONTENT_TRUST_VISUAL[trust];
  return (
    <span
      title={v.description}
      className={`inline-flex items-center gap-1.5 rounded-md border font-mono uppercase tracking-[1.5px] ${v.border} ${v.bg} ${v.text} ${
        compact ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-1 text-[10px]'
      } ${className ?? ''}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${v.text.replace('text-', 'bg-')}`} aria-hidden />
      {compact ? v.short : v.label}
    </span>
  );
}

export default ContentTrustBadge;
