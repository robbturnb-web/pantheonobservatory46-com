import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, ExternalLink, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface LinkRow {
  id: string;
  url: string;
  link_type: string;
  source_page: string | null;
  http_status: number | null;
  ok: boolean;
  response_time_ms: number | null;
  last_checked_at: string;
  last_error: string | null;
}

export default function LinkScannerPage() {
  const [rows, setRows] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [filter, setFilter] = useState<'all' | 'broken' | 'ok'>('all');

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('link_health')
      .select('*')
      .order('ok', { ascending: true })
      .order('last_checked_at', { ascending: false })
      .limit(500);
    if (error) toast.error(error.message);
    setRows((data ?? []) as LinkRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const runScan = async () => {
    setScanning(true);
    try {
      const { data, error } = await supabase.functions.invoke('link-scanner', { body: {} });
      if (error) throw error;
      toast.success(`Scanned ${data.checked} links · ${data.ok} ok · ${data.broken} broken`);
      await load();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Scan failed');
    } finally {
      setScanning(false);
    }
  };

  const filtered = rows.filter((r) =>
    filter === 'all' ? true : filter === 'broken' ? !r.ok : r.ok
  );

  const total = rows.length;
  const okCount = rows.filter((r) => r.ok).length;
  const brokenCount = total - okCount;

  return (
    <>
      <Helmet><title>Link Scanner · Pantheon Admin</title></Helmet>
      <div className="min-h-screen bg-background pt-20 sm:pt-24 px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl sm:text-4xl text-foreground">Link Scanner</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Crawls every tracked URL. HEAD/GET probe with 6s timeout.
              </p>
            </div>
            <Button onClick={runScan} disabled={scanning} className="w-full sm:w-auto">
              {scanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              {scanning ? 'Scanning…' : 'Run Scan'}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Card className="p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Total</div>
              <div className="text-2xl sm:text-3xl font-display mt-1">{total}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Healthy</div>
              <div className="text-2xl sm:text-3xl font-display mt-1 text-signal-online">{okCount}</div>
            </Card>
            <Card className="p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Broken</div>
              <div className="text-2xl sm:text-3xl font-display mt-1 text-realm-blackprojects">{brokenCount}</div>
            </Card>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(['all', 'broken', 'ok'] as const).map((f) => (
              <Button key={f} size="sm" variant={filter === f ? 'default' : 'outline'} onClick={() => setFilter(f)}>
                {f.toUpperCase()}
              </Button>
            ))}
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">URL</th>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">HTTP</th>
                    <th className="px-3 py-2 text-left">Time</th>
                    <th className="px-3 py-2 text-left">Last Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">
                      <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                    </td></tr>
                  )}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={6} className="text-center py-12 text-muted-foreground">
                      No links yet. Run a scan to populate.
                    </td></tr>
                  )}
                  {filtered.map((r) => (
                    <tr key={r.id} className="border-t border-border/40 hover:bg-muted/20">
                      <td className="px-3 py-2">
                        {r.ok ? (
                          <CheckCircle2 className="w-4 h-4 text-signal-online" />
                        ) : r.http_status && r.http_status >= 300 && r.http_status < 400 ? (
                          <AlertTriangle className="w-4 h-4 text-realm-gods" />
                        ) : (
                          <XCircle className="w-4 h-4 text-realm-blackprojects" />
                        )}
                      </td>
                      <td className="px-3 py-2 max-w-md truncate">
                        <a href={r.url} target="_blank" rel="noreferrer" className="story-link inline-flex items-center gap-1">
                          {r.url}<ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                        {r.last_error && <div className="text-xs text-realm-blackprojects mt-0.5">{r.last_error}</div>}
                      </td>
                      <td className="px-3 py-2"><Badge variant="outline">{r.link_type}</Badge></td>
                      <td className="px-3 py-2 font-mono text-xs">{r.http_status ?? '—'}</td>
                      <td className="px-3 py-2 font-mono text-xs">{r.response_time_ms ? `${r.response_time_ms}ms` : '—'}</td>
                      <td className="px-3 py-2 text-xs text-muted-foreground">
                        {new Date(r.last_checked_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
