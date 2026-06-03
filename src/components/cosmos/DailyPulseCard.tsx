import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Pulse {
  summary_date: string;
  source_url: string | null;
  source_title: string | null;
  summary_md: string;
  generated_at: string;
}

export function DailyPulseCard() {
  const [pulse, setPulse] = useState<Pulse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('daily_cosmos_pulse')
      .select('*')
      .order('summary_date', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        setPulse(data);
        setLoading(false);
      });
  }, []);

  if (loading || !pulse) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/40 to-transparent p-5 sm:p-6 overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs uppercase tracking-wider text-primary font-bold">Daily Cosmos Pulse</span>
          <span className="text-[10px] text-muted-foreground inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {pulse.summary_date}
          </span>
        </div>
        {pulse.source_title && (
          <div className="text-sm font-medium mb-2">{pulse.source_title}</div>
        )}
        <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{pulse.summary_md}</div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          {pulse.source_url && (
            <a
              href={pulse.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              Watch source <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <Link to="/echoverse" className="text-xs text-muted-foreground hover:text-foreground">
            Discuss in Echoverse →
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
