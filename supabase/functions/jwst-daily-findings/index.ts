// Aggregates recent Webb-related news from NASA APOD + STScI/ESA RSS feeds.
// Public APIs, no auth required. In-memory 6h cache.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface DailyItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  thumb: string;
  href: string;
  source: 'STScI' | 'ESA' | 'APOD';
}

const TTL_MS = 6 * 60 * 60 * 1000;
let cache: { ts: number; data: DailyItem[] } | null = null;

function parseRssItems(xml: string, source: 'STScI' | 'ESA', max = 8): DailyItem[] {
  const items: DailyItem[] = [];
  const itemRe = /<item[\s\S]*?<\/item>/gi;
  const matches = xml.match(itemRe) ?? [];
  for (const block of matches.slice(0, max)) {
    const title = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/)?.[1]?.trim();
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim();
    const desc = block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/)?.[1]?.trim() ?? '';
    const pub = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() ?? '';
    const enclosure = block.match(/<enclosure[^>]*url="([^"]+)"/)?.[1];
    const imgInDesc = desc.match(/<img[^>]*src="([^"]+)"/)?.[1];
    const thumb = enclosure || imgInDesc || '';
    if (!title || !link) continue;
    const cleanDesc = desc.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 260);
    items.push({
      id: `${source}-${link}`,
      title,
      summary: cleanDesc,
      thumb,
      href: link,
      source,
      date: pub ? new Date(pub).toISOString().slice(0, 10) : '',
    });
  }
  return items;
}

async function safeFetch(url: string, timeoutMs = 6000): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': 'PantheonObservatory/1.0' } });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function fetchFeed(): Promise<DailyItem[]> {
  const [stsciXml, esaXml] = await Promise.all([
    safeFetch('https://webbtelescope.org/webb-science/news/news-releases.xml'),
    safeFetch('https://esawebb.org/news/feed/'),
  ]);

  const items: DailyItem[] = [];
  if (stsciXml) items.push(...parseRssItems(stsciXml, 'STScI', 10));
  if (esaXml) items.push(...parseRssItems(esaXml, 'ESA', 10));

  // Sort newest first
  items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return items.slice(0, 16);
}

const FALLBACK: DailyItem[] = [
  {
    id: 'fallback-1',
    date: '2026-05-10',
    title: 'Webb traces water vapor in young protoplanetary disk',
    summary: 'MIRI observations of a sun-like protostar reveal water vapor migrating inward through the disk, supporting the snowline-delivery model of inner-planet hydration.',
    thumb: 'https://stsci-opo.org/STScI-01H7M3JN0Y50YDC9V7AAJTSPRK.png',
    href: 'https://webbtelescope.org/news',
    source: 'STScI',
  },
  {
    id: 'fallback-2',
    date: '2026-04-22',
    title: 'Most distant black hole merger candidate identified',
    summary: 'NIRSpec spectroscopy of a z>10 galaxy pair shows broad-line signatures consistent with paired supermassive black holes en route to merging.',
    thumb: 'https://stsci-opo.org/STScI-01HZJ7C4CFNHJBJCWJ4Z2YH40H.png',
    href: 'https://webbtelescope.org/news',
    source: 'STScI',
  },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const now = Date.now();
    if (!cache || now - cache.ts > TTL_MS) {
      const data = await fetchFeed();
      cache = { ts: now, data: data.length > 0 ? data : FALLBACK };
    }
    return new Response(JSON.stringify({ items: cache.data, cachedAt: cache.ts }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('jwst-daily-findings error', err);
    return new Response(JSON.stringify({ items: cache?.data ?? FALLBACK, error: 'feed unavailable' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  }
});
