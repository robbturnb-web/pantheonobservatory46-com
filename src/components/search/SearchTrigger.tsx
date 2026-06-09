import { Search } from 'lucide-react';
import { useSearchPalette } from './SearchProvider';

/** Compact search trigger button — drop into nav. */
export function SearchTrigger({ className = '' }: { className?: string }) {
  const { open } = useSearchPalette();
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
  return (
    <button
      onClick={open}
      className={`inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground border border-border/60 hover:border-primary/40 bg-card/30 backdrop-blur-sm rounded-md px-2.5 py-1.5 transition-colors ${className}`}
      aria-label="Open site search"
    >
      <Search className="w-3.5 h-3.5" />
      <span className="hidden md:inline">Search…</span>
      <kbd className="hidden md:inline-block font-mono text-[10px] border border-border/60 rounded px-1">
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  );
}
