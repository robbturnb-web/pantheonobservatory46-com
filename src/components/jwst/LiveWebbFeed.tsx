import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Radio } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WebbItem {
  id: string;
  title: string;
  description: string;
  date: string;
  thumb: string;
  full: string;
  credit?: string;
  href: string;
}

export function LiveWebbFeed() {
  const [items, setItems] = useState<WebbItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('nasa-webb-feed');
        if (cancelled) return;
        if (error) throw error;
        const list = (data?.items ?? []) as WebbItem[];
        if (list.length === 0) {
          setError('Live feed currently empty.');
          setItems([]);
        } else {
          setItems(list);
        }
      } catch (e) {
        if (cancelled) return;
        console.error('Live Webb feed error', e);
        setError('Live feed temporarily unavailable.');
        setItems([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-green-400 inline-flex items-center gap-2" style={{ fontFamily: "'Space Mono', monospace" }}>
              <Radio className="w-3 h-3" /> LIVE FROM WEBB · NASA FEED
            </p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
              Fresh from the mirror
            </h2>
          </div>
          <p className="text-xs text-violet-300/60">Refreshed every 4 hours · NASA Image Library</p>
        </div>

        {!items && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl animate-pulse" style={{ background: 'rgba(167,139,250,0.08)' }} />
            ))}
          </div>
        )}

        {items && items.length === 0 && (
          <p className="text-sm text-violet-300/60 text-center py-10">{error ?? 'No live captures available.'}</p>
        )}

        {items && items.length > 0 && (
          <>
            {error && <p className="text-xs text-amber-300/80 mb-4">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {items.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.03, 0.4) }}
                  whileHover={{ y: -3 }}
                  className="group relative aspect-square rounded-xl overflow-hidden border block"
                  style={{ borderColor: 'rgba(167,139,250,0.22)' }}
                >
                  <img src={item.thumb} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2" style={{ background: 'linear-gradient(0deg, rgba(5,3,13,0.92) 0%, transparent 65%)' }}>
                    <div className="text-[10px] text-violet-100 leading-tight">
                      <p className="font-semibold line-clamp-2">{item.title}</p>
                      <p className="opacity-60 mt-0.5 inline-flex items-center gap-1"><ExternalLink className="w-2.5 h-2.5" /> {item.date || 'NASA'}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
