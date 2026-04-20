// Pulls Stefan Burns' latest YouTube video from public RSS, summarizes via Lovable AI,
// upserts into daily_cosmos_pulse keyed by today's date.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Stefan Burns YouTube channel ID
const STEFAN_BURNS_CHANNEL_ID = 'UCkn7BYY5LzmJ-zT3pXOY7vw';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${STEFAN_BURNS_CHANNEL_ID}`;

function extractFirst(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].trim() : null;
}

function parseLatestVideo(xml: string) {
  // Find first <entry>
  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/);
  if (!entryMatch) return null;
  const entry = entryMatch[1];

  const title = extractFirst(entry, 'title');
  const linkMatch = entry.match(/<link[^>]*href="([^"]+)"/);
  const link = linkMatch ? linkMatch[1] : null;
  const description = extractFirst(entry, 'media:description') ?? '';

  return { title, link, description };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY missing');

    // Fetch RSS
    const rssResp = await fetch(RSS_URL);
    if (!rssResp.ok) throw new Error(`RSS fetch failed: ${rssResp.status}`);
    const xml = await rssResp.text();

    const video = parseLatestVideo(xml);
    if (!video?.title) throw new Error('No video found in feed');

    // Call Lovable AI for summary
    const aiResp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content:
              'You are Echo, the cosmic intelligence of Pantheon Observatory. Summarize the following Stefan Burns video update in exactly 3 short bullet points, focused on planetary alignments, energetic forecasts, and consciousness implications. Use markdown dashes. Keep it under 100 words total. Cosmic, evocative tone.',
          },
          {
            role: 'user',
            content: `Title: ${video.title}\n\nDescription:\n${video.description.slice(0, 2000)}`,
          },
        ],
      }),
    });

    if (aiResp.status === 429 || aiResp.status === 402) {
      const errBody = await aiResp.text();
      throw new Error(`AI gateway ${aiResp.status}: ${errBody}`);
    }
    if (!aiResp.ok) throw new Error(`AI gateway error: ${aiResp.status}`);

    const aiJson = await aiResp.json();
    const summary: string = aiJson.choices?.[0]?.message?.content ?? '— no summary —';

    // Upsert into daily_cosmos_pulse
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const today = new Date().toISOString().slice(0, 10);

    const { error } = await supabase
      .from('daily_cosmos_pulse')
      .upsert(
        {
          summary_date: today,
          source_url: video.link,
          source_title: video.title,
          summary_md: summary,
          generated_at: new Date().toISOString(),
        },
        { onConflict: 'summary_date' },
      );

    if (error) throw error;

    return new Response(
      JSON.stringify({ ok: true, date: today, title: video.title }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('daily-cosmos-pulse error:', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
