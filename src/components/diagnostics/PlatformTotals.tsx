import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database, Link2, Users, Activity } from 'lucide-react';

interface Totals {
  users: number | null;
  sources: number | null;
  sourcesHealthy: number | null;
  links: number | null;
  linksHealthy: number | null;
  briefings: number | null;
}

/**
 * PlatformTotals — top-of-diagnostics overview. Aggregates from source_health,
 * link_health, disclosure_briefings, and profiles. All counts are live.
 */
export function PlatformTotals() {
  const [totals, setTotals] = useState<Totals>({
    users: null, sources: null, sourcesHealthy: null,
    links: null, linksHealthy: null, briefings: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [users, sources, sourcesOk, links, linksOk, briefings] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('source_health').select('*', { count: 'exact', head: true }),
        supabase.from('source_health').select('*', { count: 'exact', head: true }).eq('verification_status', 'verified'),
        supabase.from('link_health').select('*', { count: 'exact', head: true }),
        supabase.from('link_health').select('*', { count: 'exact', head: true }).eq('ok', true),
        supabase.from('disclosure_briefings').select('*', { count: 'exact', head: true }),
      ]);
      if (cancelled) return;
      setTotals({
        users: users.count, sources: sources.count, sourcesHealthy: sourcesOk.count,
        links: links.count, linksHealthy: linksOk.count, briefings: briefings.count,
      });
    })();
    return () => { cancelled = true; };
  }, []);

  const cards = [
    { icon: Users, label: 'Observers', value: totals.users, sub: 'Registered profiles' },
    { icon: Database, label: 'Live Sources', value: totals.sources, sub: `${totals.sourcesHealthy ?? '—'} verified` },
    { icon: Link2, label: 'Tracked Links', value: totals.links, sub: `${totals.linksHealthy ?? '—'} healthy` },
    { icon: Activity, label: 'Briefings', value: totals.briefings, sub: 'Published + draft' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {cards.map(({ icon: Icon, label, value, sub }) => (
        <div key={label} className="rounded-lg border border-border/40 bg-card/30 backdrop-blur p-4">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-muted-foreground">
            <Icon className="w-3 h-3" />{label}
          </div>
          <div className="text-2xl sm:text-3xl font-display mt-2 text-foreground">
            {value ?? '—'}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">{sub}</div>
        </div>
      ))}
    </div>
  );
}
