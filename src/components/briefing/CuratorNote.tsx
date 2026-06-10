import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Newspaper } from 'lucide-react';

interface Brief {
  id: string;
  briefing_date: string;
  headline: string;
  summary: string;
  evidence_grade: string;
}

/**
 * CuratorNote — surfaces the most recent published disclosure_briefings entry
 * at the top of the public /briefing page. Silent if nothing published yet.
 */
export function CuratorNote() {
  const [brief, setBrief] = useState<Brief | null>(null);

  useEffect(() => {
    supabase
      .from('disclosure_briefings')
      .select('id, briefing_date, headline, summary, evidence_grade')
      .eq('published', true)
      .order('briefing_date', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setBrief(data as Brief | null));
  }, []);

  if (!brief) return null;

  return (
    <section className="mb-8 p-5 sm:p-6 rounded-2xl border border-primary/40 bg-primary/5 backdrop-blur">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[4px] text-primary mb-3">
        <Newspaper className="w-3.5 h-3.5" />
        Curator's Note
        <span className="text-muted-foreground">·</span>
        <span className="font-mono text-muted-foreground">
          {new Date(brief.briefing_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="font-mono text-muted-foreground">Grade {brief.evidence_grade}</span>
      </div>
      <h2 className="font-display text-xl sm:text-2xl mb-2">{brief.headline}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{brief.summary}</p>
    </section>
  );
}
