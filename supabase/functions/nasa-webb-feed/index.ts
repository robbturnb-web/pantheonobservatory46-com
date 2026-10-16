// NASA Image and Video Library proxy — JWST feed.
// Public NASA API (no key required), cached in-memory for 4h to keep things friendly.
import { corsHeaders } from 'https://deno.land/x/supabase_functions_cors@v1.0.0/mod.ts';

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

interface CacheEntry {
  ts: number;
  data: WebbItem[];
}

const TTL_MS = 4 * 60 * 60 * 1000;
let cache: CacheEntry | null = null;

async function fetchWebb(): Promise<WebbItem[]> {
  const url =
    'https://images-api.nasa.gov/search?q=james%20webb%20space%20telescope&media_type=image&page_size=24';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`NASA API ${res.status}`);
  const json = await res.json();
  const items = (json?.collection?.items ?? []) as Array<{ data?: Array<{ nasa_id: string; title?: string; description?: string; date_created?: string; secondary_creator?: string; center?: string }>; links?: Array<{ render?: string; href?: string }> }>;

  const mapped: WebbItem[] = [];
  for (const item of items) {
    const data = item?.data?.[0];
    const links = item?.links ?? [];
    const thumb = links.find((l) => l.render === 'image')?.href;
    if (!data || !thumb) continue;
    mapped.push({
      id: data.nasa_id,
      title: data.title ?? 'Untitled',
      description: (data.description ?? '').slice(0, 240),
      date: (data.date_created ?? '').slice(0, 10),
      thumb,
      full: thumb,
      credit: data.secondary_creator ?? data.center ?? 'NASA',
      href: `https://images.nasa.gov/details-${data.nasa_id}`,
    });
    if (mapped.length >= 18) break;
  }
  return mapped;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const now = Date.now();
    if (!cache || now - cache.ts > TTL_MS) {
      const data = await fetchWebb();
      cache = { ts: now, data };
    }
    return new Response(
      JSON.stringify({ items: cache.data, cachedAt: cache.ts }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (err) {
    console.error('nasa-webb-feed error', err);
    return new Response(
      JSON.stringify({
        items: cache?.data ?? [],
        error: 'Live feed temporarily unavailable',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  }
});
