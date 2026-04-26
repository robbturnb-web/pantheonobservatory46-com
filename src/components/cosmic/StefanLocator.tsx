import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radio, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StefanSignal {
  topic: string;
  location: string | null;
  date: string;
  videoUrl: string | null;
  videoTitle: string | null;
}

export function StefanLocator() {
  const [signal, setSignal] = useState<StefanSignal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    supabase.functions
      .invoke('stefan-locator', { body: {} })
      .then(({ data, error }) => {
        if (!alive) return;
        if (!error && data) {
          setSignal(data as StefanSignal);
        }
        setLoading(false);
      })
      .catch(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-xl border border-accent-neon/30 bg-gradient-to-br from-accent-neon/5 via-card/40 to-transparent p-5 overflow-hidden h-full"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent-neon/15 blur-3xl pointer-events-none" />
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-accent-neon animate-pulse" />
          <span className="text-xs uppercase tracking-[3px] text-accent-neon font-bold">Stefan Burns · Locator</span>
        </div>
        <Link
          to="/experts/stefan-burns"
          className="text-[10px] uppercase tracking-[2px] text-cosmic-bright hover:text-sacred-light transition-colors"
        >
          Profile →
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Triangulating signal…
        </div>
      ) : signal ? (
        <div className="space-y-2">
          <div className="text-base font-bold text-foreground leading-snug">
            {signal.topic}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {signal.location && (
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                📍 {signal.location}
              </span>
            )}
            <span className="font-mono">{signal.date}</span>
          </div>
          {signal.videoUrl && (
            <a
              href={signal.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-accent-neon hover:underline pt-1"
            >
              Watch latest signal <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          No fresh signal yet. Stefan goes silent before each major drop.
        </div>
      )}
    </motion.div>
  );
}
