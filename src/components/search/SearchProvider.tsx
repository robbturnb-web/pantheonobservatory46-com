import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CommandPalette } from './CommandPalette';

interface Ctx {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SearchCtx = createContext<Ctx | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((v) => !v);
      } else if (e.key === '/' && !isFormField(e.target)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <SearchCtx.Provider value={{ isOpen, open, close }}>
      {children}
      <CommandPalette open={isOpen} onOpenChange={setIsOpen} />
    </SearchCtx.Provider>
  );
}

export function useSearchPalette() {
  const ctx = useContext(SearchCtx);
  if (!ctx) throw new Error('useSearchPalette must be used within SearchProvider');
  return ctx;
}

function isFormField(t: EventTarget | null) {
  if (!(t instanceof HTMLElement)) return false;
  const tag = t.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || t.isContentEditable;
}
