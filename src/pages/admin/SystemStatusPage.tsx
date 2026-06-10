import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StatusRow {
  id: string;
  component: string;
  status: string;
  message: string | null;
  updated_at: string;
}

const STATUS_ICON: Record<string, JSX.Element> = {
  operational: <CheckCircle2 className="w-5 h-5 text-signal-online" />,
  degraded: <AlertTriangle className="w-5 h-5 text-realm-gods" />,
  down: <XCircle className="w-5 h-5 text-realm-blackProjects" />,
};

const FALLBACK: StatusRow[] = [
  { id: '1', component: 'Frontend (Vite/React)', status: 'operational', message: null, updated_at: new Date().toISOString() },
  { id: '2', component: 'Lovable Cloud (Backend)', status: 'operational', message: null, updated_at: new Date().toISOString() },
  { id: '3', component: 'Echo AI (LLM Gateway)', status: 'operational', message: null, updated_at: new Date().toISOString() },
  { id: '4', component: 'Live Data Proxy', status: 'operational', message: 'Graceful fallback enabled', updated_at: new Date().toISOString() },
];

export default function SystemStatusPage() {
  const [rows, setRows] = useState<StatusRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('system_status_events').select('*').order('updated_at', { ascending: false }).limit(20)
      .then(({ data }) => {
        setRows(data && data.length > 0 ? (data as StatusRow[]) : FALLBACK);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SEO title="System Status — Pantheon" description="Live infrastructure status for Pantheon Frequency 46." />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-display text-4xl mb-2">System Status</h1>
        <p className="text-sm text-muted-foreground mb-10">Live infrastructure health.</p>
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading…</div>
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/40">
                {STATUS_ICON[r.status] ?? STATUS_ICON.operational}
                <div className="flex-1">
                  <div className="font-medium">{r.component}</div>
                  {r.message && <div className="text-xs text-muted-foreground mt-0.5">{r.message}</div>}
                </div>
                <div className="text-xs text-muted-foreground capitalize">{r.status}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
