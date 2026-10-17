// Pantheon Link Scanner — admin-only. Accepts an optional list of URLs to check,
// or scans every URL already in source_health + link_health. HEAD/GET probes
// with a 6s per-URL timeout; results upserted into link_health.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2.45.0';

interface ProbeResult {
  url: string;
  link_type: string;
  source_page?: string;
  http_status: number | null;
  ok: boolean;
  response_time_ms: number;
  last_error: string | null;
  last_checked_at: string;
}

function classify(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.toLowerCase().endsWith('.pdf')) return 'pdf';
  if (url.startsWith('/') || url.includes('pantheonobservatory46')) return 'internal';
  return 'external';
}

function isPrivateHost(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, '');
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return true;
  if (h === '::1' || h === '::' || h.startsWith('fc') || h.startsWith('fd') || h.startsWith('fe80') || h.startsWith('::ffff:')) return h.includes(':');
  const m = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) ||
    (a === 100 && b >= 64 && b <= 127) || a >= 224;
}

async function isSafePublicUrl(raw: string): Promise<boolean> {
  let u: URL;
  try { u = new URL(raw); } catch { return false; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
  if (isPrivateHost(u.hostname)) return false;
  if (/^[\d.]+$/.test(u.hostname) || u.hostname.includes(':')) return true;
  try {
    const records = [
      ...(await Deno.resolveDns(u.hostname, 'A').catch(() => [] as string[])),
      ...(await Deno.resolveDns(u.hostname, 'AAAA').catch(() => [] as string[])),
    ];
    return records.length > 0 && !records.some(isPrivateHost);
  } catch { return false; }
}

async function safeFetch(url: string, init: RequestInit): Promise<Response> {
  let current = url;
  for (let i = 0; i < 5; i++) {
    if (!(await isSafePublicUrl(current))) throw new Error('blocked destination');
    const r = await fetch(current, { ...init, redirect: 'manual' });
    const loc = r.headers.get('location');
    if (r.status >= 300 && r.status < 400 && loc) {
      try { await r.body?.cancel(); } catch { /* Malformed or unavailable URL metadata is handled by the caller. */ }
      current = new URL(loc, current).toString();
      continue;
    }
    return r;
  }
  throw new Error('too many redirects');
}

async function probe(url: string, sourcePage?: string): Promise<ProbeResult> {
  const link_type = classify(url);
  const start = Date.now();
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 6000);
  try {
    // YouTube blocks HEAD; use GET with no-body shortcut isn't possible — use GET
    const method = link_type === 'youtube' || link_type === 'pdf' ? 'GET' : 'HEAD';
    const r = await safeFetch(url, {
      method,
      signal: ctrl.signal,
      headers: { 'User-Agent': 'Pantheon-LinkScanner/1.0 (+https://pantheonobservatory46.com)' },
    });
    clearTimeout(timeout);
    // Some servers (NWS, Cloudflare-protected) return 405 on HEAD; retry GET once
    let status = r.status;
    if (status === 405 && method === 'HEAD') {
      const r2 = await safeFetch(url, { method: 'GET', signal: ctrl.signal });
      status = r2.status;
      try { await r2.body?.cancel(); } catch { /* Malformed or unavailable URL metadata is handled by the caller. */ }
    }
    try { await r.body?.cancel(); } catch { /* Malformed or unavailable URL metadata is handled by the caller. */ }
    return {
      url, link_type, source_page: sourcePage,
      http_status: status, ok: status >= 200 && status < 400,
      response_time_ms: Date.now() - start,
      last_error: status >= 400 ? `HTTP ${status}` : null,
      last_checked_at: new Date().toISOString(),
    };
  } catch (e) {
    clearTimeout(timeout);
    return {
      url, link_type, source_page: sourcePage,
      http_status: null, ok: false,
      response_time_ms: Date.now() - start,
      last_error: (e as Error).message || 'fetch failed',
      last_checked_at: new Date().toISOString(),
    };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  // Admin gate
  const authHeader = req.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    if (!user) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new Response(JSON.stringify({ error: 'missing auth' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let payload: { urls?: Array<{ url: string; source_page?: string }> } = {};
  try { payload = await req.json(); } catch { /* empty body OK */ }

  // Build URL set: caller-supplied, plus existing link_health + source_health
  const urlMap = new Map<string, string | undefined>();
  for (const u of payload.urls ?? []) {
    if (u?.url) urlMap.set(u.url, u.source_page);
  }
  const { data: existing } = await supabase.from('link_health').select('url, source_page').limit(500);
  for (const row of existing ?? []) urlMap.set(row.url, row.source_page ?? undefined);
  const { data: sources } = await supabase.from('source_health').select('url, source_name').limit(500);
  for (const row of sources ?? []) urlMap.set(row.url, row.source_name);

  const urls = Array.from(urlMap.entries());
  if (urls.length === 0) {
    return new Response(JSON.stringify({ checked: 0, message: 'no urls to scan' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Concurrency-limited probing (8 at a time)
  const results: ProbeResult[] = [];
  const queue = [...urls];
  async function worker() {
    while (queue.length) {
      const next = queue.shift();
      if (!next) break;
      results.push(await probe(next[0], next[1]));
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));

  // Upsert in chunks
  for (let i = 0; i < results.length; i += 100) {
    const chunk = results.slice(i, i + 100);
    await supabase.from('link_health').upsert(chunk, { onConflict: 'url' });
  }

  const ok = results.filter((r) => r.ok).length;
  return new Response(
    JSON.stringify({ checked: results.length, ok, broken: results.length - ok }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});
