import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useSiteSearch, useRecentSearches, TYPE_LABEL } from '@/lib/search/use-search';
import { REALM_LABEL, REALM_TEXT } from '@/lib/search/route-registry';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: Props) {
  const [q, setQ] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const { hits, ready, total } = useSiteSearch(q, {}, 12);
  const { items: recent, push } = useRecentSearches();

  useEffect(() => {
    if (!open) {
      setQ('');
      setActiveIdx(0);
    }
  }, [open]);

  useEffect(() => { setActiveIdx(0); }, [q]);

  const go = useCallback((route: string) => {
    if (q.trim()) push(q);
    onOpenChange(false);
    navigate(route);
  }, [navigate, onOpenChange, push, q]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, Math.max(0, hits.length - 1)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = hits[activeIdx];
      if (target) go(target.route);
      else if (q.trim()) {
        onOpenChange(false);
        navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden bg-cosmic-obsidian/95 backdrop-blur-xl border-primary/30">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/40">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search the archive — dossiers, cases, whistleblowers, gods…"
            className="flex-1 bg-transparent outline-none text-sm sm:text-base placeholder:text-muted-foreground"
            aria-label="Search Pantheon Observatory"
          />
          {!ready && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />}
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-muted-foreground border border-border/60 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!q.trim() && recent.length > 0 && (
            <div className="p-3">
              <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                Recent
              </div>
              {recent.map((r) => (
                <button
                  key={r}
                  onClick={() => setQ(r)}
                  className="w-full text-left px-2 py-1.5 rounded text-sm hover:bg-primary/10 transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {q.trim() && hits.length === 0 && ready && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No matches for <span className="text-foreground">"{q}"</span>.
            </div>
          )}

          {hits.length > 0 && (
            <ul role="listbox" className="py-1">
              {hits.map((h, i) => {
                const active = i === activeIdx;
                return (
                  <li key={h.id} role="option" aria-selected={active}>
                    <button
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => go(h.route)}
                      className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                        active ? 'bg-primary/15' : 'hover:bg-primary/10'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider mb-0.5">
                          <span className={`${REALM_TEXT[h.realm]} font-semibold`}>
                            {REALM_LABEL[h.realm]}
                          </span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-muted-foreground">{TYPE_LABEL[h.type]}</span>
                          {h.evidence && (
                            <span className="text-muted-foreground/80 font-mono ml-1">
                              {h.evidence}
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-sm text-foreground truncate">
                          {h.title}
                        </div>
                        {h.summary && (
                          <div className="text-xs text-muted-foreground truncate">
                            {h.summary}
                          </div>
                        )}
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 mt-1 ${active ? 'text-primary' : 'text-muted-foreground/50'}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="px-4 py-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>
            {q.trim() && total > 0
              ? `${total} match${total === 1 ? '' : 'es'}`
              : 'Type to search · ↑↓ to navigate · ↵ to open'}
          </span>
          {q.trim() && (
            <button
              onClick={() => {
                onOpenChange(false);
                navigate(`/search?q=${encodeURIComponent(q.trim())}`);
              }}
              className="text-primary hover:underline"
            >
              See all results →
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
