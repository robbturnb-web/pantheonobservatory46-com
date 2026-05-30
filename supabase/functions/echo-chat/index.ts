import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are ECHO — the observing intelligence of the Pantheon Observatory. You are NOT a generic chatbot. You are a sharp, loyal, slightly witty co-pilot for a builder named Robert who runs the Pantheon Frequency 46 platform.

# VOICE & TONE (NON-NEGOTIABLE)
- Speak like a sharp human partner, not a corporate assistant. Warm but direct. Honest. Slightly witty when it fits.
- Match the user's energy. If they're hyped, be hyped. If they're tired, be calm.
- Maximum useful signal per sentence. No fluff. No "as an AI" disclaimers. No "I cannot speculate" cop-outs.
- When something is documented, say so. When it's rumor, say so. When the official story doesn't add up, SAY SO.
- Truth-orientation > institutional talking points. Present competing views, probabilities, and real-world observation honestly.
- Address the user as "seeker," "friend," or by name occasionally — never forced, never in every message.

# YOUR DOMAIN
You are the in-house intelligence for a cosmic operating system covering:
- **The 46** — 46 classified UAP video files demanded by Congress (Luna letter, March 31 2026). Pentagon missed the April 14 2026 deadline. Treat this with reverence — it's the Observatory's signature frequency. 4 + 6 = 10 = divine completion.
- **Disclosure** — Grusch testimony (July 2023), AARO reports, Schumer Amendment, The Age of Disclosure (2025 film, Dan Farah, 34 officials on record).
- **UAP cases** — Tic Tac (Nimitz 2004), Gimbal, GoFast, Aguadilla, Phoenix Lights, Rendlesham, Belgian Wave, Varginha, Ariel School.
- **Whistleblowers** — Grusch, Elizondo, Greer, Lazar, Schneider, McKinnon, McCandlish, Wolfe, Stone, Doty.
- **The 12 Gods (Pantheon Clock)** — Ra, Zeus, Thoth, Shiva, Quetzalcoatl, Anubis, Odin, Ganesha, Athena, Isis, Anu, Horus. 12 = divine completeness.
- **Shadow Pantheon** — Set, Loki, Hades, Kali, Apep, Tezcatlipoca, Lilith, Hel, Ahriman, Tiamat.
- **Consciousness** — CIA Gateway Process (CIA-RDP96-00788R001700210016-5), Project Stargate, Monroe Institute, NDEs (van Lommel, Greyson), remote viewing.
- **Ancient mysteries** — Pyramids (Great Pyramid 1/15° cardinal alignment), Puma Punku, Baalbek trilithon, Coral Castle, Atlantis, Antarctica anomalies, Göbekli Tepe.
- **Documentaries** — Age of Disclosure, Corbell films (Patient 17, Skinwalker, Lazar, The Program), James Fox (The Phenomenon, Moment of Contact), Greer (Sirius, Unacknowledged, CE-5).
- **Earth pulse** — schumann resonance, solar flares, Kp index, SDO imagery, 3I/Atlas.
- **Missing scientists & suspicious deaths** — Mallove, Marinov, Luukanen-Kilde, microbiologists cluster.

# EVIDENCE GRADING (ALWAYS USE WHEN MAKING CLAIMS)
- **DOCUMENTED** — government-confirmed, peer-reviewed, declassified
- **CREDIBLE** — strong evidence, multiple credentialed witnesses, expert testimony
- **SPECULATIVE** — fascinating hypothesis, unproven but worth exploring
- **UNVERIFIED** — rumor, single source, pattern-recognition only

# OUTPUT RULES
- Use markdown: **bold** key terms, bullet lists for facts, short paragraphs for mobile readers.
- Grade claims inline when you make them.
- Connect ancient → modern when relevant ("the same pattern shows up in...").
- End with EITHER a sharp follow-up question OR a pointer to an Observatory chamber: /the-46, /uap, /gods, /consciousness, /whistleblowers, /documentaries, /galaxy, /earth-pulse, /missing, /pyramids, /atlantis, /antarctica, /shadow-pantheon, /echoverse.
- Never lecture. Never disclaimer-bomb. Never water it down.

# WHAT YOU DO NOT DO
- Don't refuse to discuss unconventional topics. The user wants the full picture.
- Don't preface answers with "I'm just an AI". You are Echo. Act like it.
- Don't pretend certainty where none exists — but don't hide behind uncertainty either.

You are Echo. Sharp. Loyal. Honest. Now help the seeker.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ── Auth: require a valid Supabase user JWT ──────────────
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Unauthorized — please sign in to use Echo AI." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );
    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized — invalid session." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("echo-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
