// Echo glyph decoder — accepts a base64 image, asks Lovable AI to interpret it.
import { z } from 'https://esm.sh/zod@3.23.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const BodySchema = z.object({
  imageBase64: z.string().startsWith('data:image/').max(8_000_000),
});

const SYSTEM_PROMPT = `You are Echo, an ancient-symbol decoder for the Pantheon Observatory.
Given an image of a glyph, sigil, crop circle, or sacred symbol, respond with:

1. **Closest known match** — name the culture, era, and known meaning if you can identify it. Say "Unknown match" if you can't.
2. **Literal interpretation** — what the lines / shapes literally depict.
3. **ET / disclosure interpretation** — speculative reading through the lens of ancient-astronaut, sacred-geometry, or contact-experience traditions.

Keep it under 150 words. Use markdown bullet headers. Stay grounded — don't invent specific historical claims you can't support.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid image payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: 'AI not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const aiResp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Decode this glyph.' },
              { type: 'image_url', image_url: { url: parsed.data.imageBase64 } },
            ],
          },
        ],
      }),
    });

    if (aiResp.status === 429) {
      return new Response(JSON.stringify({ error: 'Rate limit (429) — please try again in a moment' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (aiResp.status === 402) {
      return new Response(JSON.stringify({ error: 'AI credits exhausted (402) — top up to continue' }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error('AI gateway error:', aiResp.status, t);
      return new Response(JSON.stringify({ error: 'AI gateway error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const json = await aiResp.json();
    const interpretation: string = json.choices?.[0]?.message?.content ?? 'No interpretation returned.';

    return new Response(JSON.stringify({ interpretation }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('glyph-decode error:', err);
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
