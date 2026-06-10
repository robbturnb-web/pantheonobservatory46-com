import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

async function checkOne(url: string): Promise<{ status: string; http: number | null; ms: number | null; err: string | null }> {
  const start = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    // HEAD first; fall back to GET if 405
    let res = await fetch(url, { method: 'HEAD', signal: controller.signal, redirect: 'follow' });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: 'GET', signal: controller.signal, redirect: 'follow' });
    }
    clearTimeout(timer);
    const ms = Date.now() - start;
    let status = 'verified';
    if (res.status >= 500) status = 'broken';
    else if (res.status >= 400) status = 'degraded';
    return { status, http: res.status, ms, err: null };
  } catch (e) {
    clearTimeout(timer);
    return { status: 'broken', http: null, ms: Date.now() - start, err: (e as Error).message };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { data: sources, error } = await supabase.from('source_health').select('id, url');
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const results = await Promise.all(
    (sources ?? []).map(async (s) => {
      const r = await checkOne(s.url);
      await supabase
        .from('source_health')
        .update({
          verification_status: r.status,
          http_status: r.http,
          response_time_ms: r.ms,
          last_checked_at: new Date().toISOString(),
          error_message: r.err,
        })
        .eq('id', s.id);
      return { url: s.url, ...r };
    }),
  );

  return new Response(JSON.stringify({ checked: results.length, results }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
