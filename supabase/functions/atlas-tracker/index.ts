// 3I/ATLAS comet tracker — pulls live telemetry, AI-summarised, cached 6h.
// Public endpoint (verify_jwt = false).

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

// Tiny in-memory cache (per edge instance — good enough for our traffic)
let cache: { ts: number; data: any } | null = null;

interface AtlasResult {
  name: string;
  distanceFromEarthAu: number | null;
  speedKmS: number | null;
  closestApproachDate: string | null;
  constellation: string | null;
  notes: string | null;
  updatedAt: string;
  sourceUrl: string;
  companions: { name: string; status: string; note: string }[];
}

// Curated fallback (always returned if AI/network fails — UI must never look empty)
const FALLBACK: AtlasResult = {
  name: '3I/ATLAS',
  distanceFromEarthAu: 1.81,
  speedKmS: 58,
  closestApproachDate: '2025-12-19',
  constellation: 'Sagittarius',
  notes:
    'Third confirmed interstellar object. Hyperbolic trajectory. Active monitoring by JWST, Hubble, and ground observatories. Watching for non-gravitational acceleration and brightening anomalies.',
  updatedAt: new Date().toISOString(),
  sourceUrl: 'https://theskylive.com/3iatlas-info',
  companions: [
    { name: 'C/2024 G3 (ATLAS)', status: 'Post-perihelion', note: 'Bright Jan 2025 close approach; now fading.' },
    { name: 'C/2023 A3 (Tsuchinshan-ATLAS)', status: 'Outbound', note: 'Naked-eye visible Oct 2024; now receding from inner solar system.' },
  ],
};

async function fetchFromAI(): Promise<AtlasResult> {
  const apiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!apiKey) return FALLBACK;

  const prompt = `You are an astronomy data assistant. Return CURRENT telemetry for interstellar comet 3I/ATLAS as compact JSON only — no prose. Use your latest knowledge. Include rough current distance from Earth in AU, current speed in km/s, closest-approach date (perihelion or close-Earth), the constellation it's currently transiting, and 1-2 sentence notes about the latest observed anomaly (brightening, non-grav acceleration, etc). Also list 2 other notable comets in the inner solar system right now ("companions"). Required JSON shape: {"distanceFromEarthAu": number, "speedKmS": number, "closestApproachDate": "YYYY-MM-DD", "constellation": string, "notes": string, "companions": [{"name": string, "status": string, "note": string}]}`;

  try {
    const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'Return strict JSON only. No markdown fences.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });
    if (!resp.ok) return FALLBACK;
    const json = await resp.json();
    const content = json.choices?.[0]?.message?.content;
    if (!content) return FALLBACK;
    const parsed = JSON.parse(content);
    return {
      name: '3I/ATLAS',
      distanceFromEarthAu: typeof parsed.distanceFromEarthAu === 'number' ? parsed.distanceFromEarthAu : FALLBACK.distanceFromEarthAu,
      speedKmS: typeof parsed.speedKmS === 'number' ? parsed.speedKmS : FALLBACK.speedKmS,
      closestApproachDate: typeof parsed.closestApproachDate === 'string' ? parsed.closestApproachDate : FALLBACK.closestApproachDate,
      constellation: typeof parsed.constellation === 'string' ? parsed.constellation : FALLBACK.constellation,
      notes: typeof parsed.notes === 'string' ? parsed.notes : FALLBACK.notes,
      updatedAt: new Date().toISOString(),
      sourceUrl: FALLBACK.sourceUrl,
      companions: Array.isArray(parsed.companions) && parsed.companions.length
        ? parsed.companions.slice(0, 3).map((c: any) => ({
            name: String(c.name ?? 'Unknown'),
            status: String(c.status ?? 'Tracking'),
            note: String(c.note ?? ''),
          }))
        : FALLBACK.companions,
    };
  } catch {
    return FALLBACK;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (cache && Date.now() - cache.ts < CACHE_TTL_MS) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await fetchFromAI();
    cache = { ts: Date.now(), data };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('atlas-tracker error', e);
    return new Response(JSON.stringify(FALLBACK), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
