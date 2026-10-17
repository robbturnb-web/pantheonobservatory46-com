import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Radio } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DailyItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  thumb: string;
  href: string;
  source: string;
}

export function DailyFindingsFeed() {
  const [items, setItems] = useState<DailyItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('jwst-daily-findings');
        if (cancelled) return;
        if (error) throw error;
        setItems((data?.items ?? []) as DailyItem[]);
        if (data?.error) setError(data.error);
      } catch (e) {
        if (cancelled) return;
        console.error('daily-findings error', e);
        setError('Daily feed temporarily unavailable.');
        setItems([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="jwst-daily" className="relative py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-green-400 inline-flex items-center gap-2" style={{ fontFamily: "'Space Mono', monospace" }}>
              <Radio className="w-3 h-3 animate-pulse" /> DAILY FROM WEBB · STScI + ESA
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
              What Webb saw this week
            </h2>
          </div>
          <p className="text-xs text-violet-300/60">Refreshed every 6 hours · Official mission feeds</p>
        </div>

        {!items && (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl animate-pulse" style={{ background: 'rgba(167,139,250,0.06)' }} />
            ))}
          </div>
        )}

        {items && items.length === 0 && (
          <p className="text-sm text-violet-300/60 text-center py-10">{error ?? 'No new releases.'}</p>
        )}

        {items && items.length > 0 && (
          <ol className="relative space-y-4 border-l-2 pl-6 ml-2" style={{ borderColor: 'rgba(167,139,250,0.25)' }}>
            {error && <p className="text-xs text-amber-300/80 -ml-4 mb-2">{error}</p>}
            {items.map((it, i) => (
              <motion.li
                key={it.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
                className="relative"
              >
                <span className="absolute -left-[34px] top-3 w-3 h-3 rounded-full ring-4 ring-[#0f0828]" style={{ background: '#fcd34d', boxShadow: '0 0 12px #fcd34d' }} />
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border p-4 backdrop-blur-md group hover:border-amber-300/50 transition-colors"
                  style={{ borderColor: 'rgba(167,139,250,0.22)', background: 'rgba(15,8,40,0.6)' }}
                >
                  <div className="flex gap-4">
                    {it.thumb && (
                      <img
                        src={it.thumb}
                        alt=""
                        loading="lazy"
                        className="w-24 h-24 rounded-lg object-cover shrink-0 hidden sm:block"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest" style={{ fontFamily: "'Space Mono', monospace" }}>
                        <span className="inline-flex items-center gap-1 text-amber-300/80"><Calendar className="w-3 h-3" /> {it.date || 'recent'}</span>
                        <span className="text-violet-300/60">· {it.source}</span>
                      </div>
                      <h3 className="mt-1 text-base md:text-lg font-bold text-violet-50 leading-tight group-hover:text-amber-200 transition-colors" style={{ fontFamily: "'Cinzel', serif" }}>
                        {it.title}
                      </h3>
                      {it.summary && (
                        <p className="mt-1.5 text-sm text-violet-200/75 leading-relaxed line-clamp-2">{it.summary}</p>
                      )}
                      <span className="mt-2 inline-flex items-center gap-1 text-xs text-amber-200/80">
                        Read release <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
