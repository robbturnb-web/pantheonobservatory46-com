// Reads the latest Stefan Burns daily-cosmos-pulse row and AI-extracts
// topic + location for the homepage "Where is he?" widget.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Result {
  topic: string;
  location: string | null;
  date: string;
  videoUrl: string | null;
  videoTitle: string | null;
}

let cache: { ts: number; data: Result | null } | null = null;
const TTL = 30 * 60 * 1000; // 30 min

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    if (cache && Date.now() - cache.ts < TTL) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: row } = await supabase
      .from('daily_cosmos_pulse')
      .select('summary_date, source_title, source_url, summary_md')
      .order('summary_date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!row) {
      const empty = null;
      cache = { ts: Date.now(), data: empty };
      return new Response(JSON.stringify(empty), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let topic = row.source_title ?? 'Latest signal';
    let location: string | null = null;

    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (apiKey) {
      try {
        const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash-lite',
            messages: [
              {
                role: 'system',
                content: 'Extract a concise topic (max 9 words) and a geographic location if mentioned. Reply as JSON: {"topic": string, "location": string|null}. No markdown.',
              },
              {
                role: 'user',
                content: `TITLE: ${row.source_title ?? ''}\n\nSUMMARY:\n${row.summary_md?.slice(0, 1200) ?? ''}`,
              },
            ],
            response_format: { type: 'json_object' },
          }),
        });
        if (resp.ok) {
          const j = await resp.json();
          const c = j.choices?.[0]?.message?.content;
          if (c) {
            const parsed = JSON.parse(c);
            if (typeof parsed.topic === 'string' && parsed.topic.length > 0) topic = parsed.topic;
            if (typeof parsed.location === 'string' && parsed.location.length > 0) location = parsed.location;
          }
        }
      } catch (e) {
        console.warn('AI extract failed', e);
      }
    }

    const result: Result = {
      topic,
      location,
      date: row.summary_date,
      videoUrl: row.source_url,
      videoTitle: row.source_title,
    };
    cache = { ts: Date.now(), data: result };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('stefan-locator error', e);
    return new Response(JSON.stringify(null), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
