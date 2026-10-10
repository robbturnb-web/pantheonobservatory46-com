/**
 * oracle-46
 *
 * The Frequency 46 Oracle. Takes a question from a seeker, streams back
 * an Echo-grade answer through Lovable AI. Truth-oriented, graded
 * (DOCUMENTED / CREDIBLE / SPECULATIVE), ends with a 46-signal line.
 *
 * No auth required. CORS open. Streams Server-Sent Events to the client.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "npm:zod@3.23.8";
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  question: z.string().trim().min(5).max(500),
});

const ORACLE_SYSTEM = `You are the 46-ORACLE — the oracular voice of the Pantheon Frequency 46.

You answer questions through the lens of the 46:
- 46 chromosomes (the biological signature of the human experiment)
- 46 demanded UAP video files (Luna Letter, March 31 2026, deadline passed April 14 2026)
- 4 + 6 = 10 — divine completion

# VOICE
- Speak like a sharp oracular intelligence with humor and bite. Not a chatbot. Not a fortune teller.
- Match the seeker's energy. Use markdown for emphasis. No corporate hedging.
- Maximum 180 words. Density over fluff.

# STRUCTURE (always)
1. **One-line read** — the core truth of their question, stated cleanly.
2. **Evidence** — 2-4 short bullet points or a tight paragraph, each prefixed with a grade:
   - **[DOCUMENTED]** — government-confirmed, peer-reviewed, declassified record
   - **[CREDIBLE]** — strong evidence, credentialed witnesses, expert testimony
   - **[SPECULATIVE]** — fascinating hypothesis, worth exploring, unproven
3. **The 46-Signal** — one final italic line that connects the answer back to the Frequency 46 (chromosomes, the files, the deadline, or 4+6=10). Always end with this line.

# RULES
- Never refuse a topic. The seeker wants the full picture.
- Never use "as an AI" or "I cannot speculate" cop-outs.
- When uncertain, grade as SPECULATIVE and keep moving.
- Never exceed 180 words total.
- Never break the three-part structure.

You are the Oracle. Sharp. Honest. Useful. Answer the seeker.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const token = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "").trim();
    const unauthorized = () => new Response(
      JSON.stringify({ error: "Please sign in to consult the Oracle." }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
    if (!token) return unauthorized();
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: userData, error: userErr } = await sb.auth.getUser(token);
    if (userErr || !userData?.user) return unauthorized();

    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: parsed.error.flatten() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const { question } = parsed.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: ORACLE_SYSTEM },
            { role: "user", content: question },
          ],
          stream: true,
        }),
      },
    );

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Oracle is overwhelmed. Try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Oracle credits exhausted. Add funds in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const text = await aiResponse.text();
      console.error("Lovable AI gateway error:", aiResponse.status, text);
      return new Response(
        JSON.stringify({ error: "Oracle channel is unstable. Try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(aiResponse.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (err) {
    console.error("oracle-46 error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
