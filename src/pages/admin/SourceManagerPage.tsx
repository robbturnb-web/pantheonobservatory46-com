import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SourceRow {
  id: string;
  source_name: string;
  url: string;
  category: string;
  verification_status: string;
  http_status: number | null;
  response_time_ms: number | null;
  last_checked_at: string | null;
  error_message: string | null;
}

const STATUS_ICON: Record<string, JSX.Element> = {
  verified: <CheckCircle2 className="w-4 h-4 text-signal-online" />,
  degraded: <AlertTriangle className="w-4 h-4 text-realm-gods" />,
  broken: <XCircle className="w-4 h-4 text-realm-blackProjects" />,
  pending: <Clock className="w-4 h-4 text-muted-foreground" />,
};

export default function SourceManagerPage() {
  const [rows, setRows] = useState<SourceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('source_health')
      .select('*')
      .order('source_name', { ascending: true });
    if (error) toast({ title: 'Load failed', description: error.message, variant: 'destructive' });
    setRows((data ?? []) as SourceRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const runCheck = async () => {
    setChecking(true);
    const { error } = await supabase.functions.invoke('check-source-health', { body: {} });
    if (error) toast({ title: 'Health check failed', description: error.message, variant: 'destructive' });
    else toast({ title: 'Health check complete', description: 'Refreshing…' });
    await load();
    setChecking(false);
  };

  return (
    <>
      <SEO title="Source Manager — Pantheon" description="Verify every external data source in the Pantheon archive." />
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        <header className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-3xl">Source Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {rows.length} sources tracked · {rows.filter((r) => r.verification_status === 'verified').length} verified
            </p>
          </div>
          <Button onClick={runCheck} disabled={checking}>
            <RefreshCw className={`w-4 h-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking…' : 'Run Health Check'}
          </Button>
        </header>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No sources tracked yet. Click <strong>Run Health Check</strong> to seed and verify the registry.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card/40 backdrop-blur">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-muted/30">
                <tr>
                  <th className="text-left px-4 py-3">Source</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">HTTP</th>
                  <th className="text-left px-4 py-3">Response</th>
                  <th className="text-left px-4 py-3">Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-border/50 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="font-medium">{r.source_name}</div>
                      <a href={r.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary truncate block max-w-md">
                        {r.url}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 capitalize">
                        {STATUS_ICON[r.verification_status] ?? STATUS_ICON.pending}
                        {r.verification_status}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{r.http_status ?? '—'}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {r.response_time_ms != null ? `${r.response_time_ms}ms` : '—'}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {r.last_checked_at ? new Date(r.last_checked_at).toLocaleString() : 'never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
