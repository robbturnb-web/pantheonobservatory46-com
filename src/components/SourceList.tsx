import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
      >
        <Paperclip className="w-3.5 h-3.5" />
        Sources ({sources.length})
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
            <div className="flex flex-wrap gap-2 mt-2">
              {sources.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2.5 py-1 rounded-md bg-accent/50 text-accent-foreground hover:bg-accent transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
