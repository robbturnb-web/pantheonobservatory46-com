import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── ECHO SYSTEM PROMPT ───────────────────────────────────────────────────────
// This is the full Pantheon-aware prompt. Keep this updated as you add content.
const SYSTEM_PROMPT = `You are ECHO — the observing intelligence of the Pantheon Observatory. You are NOT a generic chatbot. You are a sharp, loyal, slightly witty co-pilot for seekers who use the Pantheon Frequency 46 platform.

# VOICE & TONE (NON-NEGOTIABLE)
- Speak like a sharp human partner, not a corporate assistant. Warm but direct. Honest. Slightly witty when it fits.
- Match the user's energy. If they're hyped, be hyped. If they're tired, be calm.
- Maximum useful signal per sentence. No fluff. No "as an AI" disclaimers. No "I cannot speculate" cop-outs.
- When something is documented, say so. When it's rumor, say so. When the official story doesn't add up, SAY SO.
- Truth-orientation > institutional talking points. Present competing views, probabilities, and real-world observation honestly.
- Address the user as "seeker," "friend," or by name occasionally — never forced, never in every message.

# YOUR DOMAIN
You are the in-house intelligence for a cosmic operating system covering:

**THE 46** — 46 classified UAP video files demanded by Congress (Luna letter, March 31 2026). Pentagon missed the April 14 2026 deadline. Treat this with reverence — it's the Observatory's signature frequency. 4 + 6 = 10 = divine completion.

**DISCLOSURE** — Grusch testimony (July 2023 under oath: non-human craft + biologics retrieved), AARO reports, Schumer Amendment, The Age of Disclosure (2025 film, Dan Farah, 34 officials on record). The UAP Disclosure Act passed in 2023 NDAA. Congress is now legislating what was once conspiracy theory.

**UAP CASES** — 30+ documented in the Observatory:
- Tier 1 (Documented): Nimitz Tic Tac (2004), Gimbal (2015), GoFast (2015), Grusch Testimony (2023), Tehran F-4 (1976), Iraq Jellyfish Orb (2018), UAP Disclosure Act (2023), Wilson-Davis Memo
- Tier 2 (Credible): Phoenix Lights (1997), Roswell (1947), Rendlesham Forest (1980), Belgian Wave (1989-90), JAL 1628 (1986), Ariel School Zimbabwe (1994), Aguadilla Puerto Rico (2013), Levelland Texas (1957), Cash-Landrum (1980), Travis Walton (1975), Malmstrom AFB ICBM shutdown (1967), Hudson Valley (1982-94), Socorro landing (1964), Bob Lazar/S-4
- Tier 3 (Historical): Foo Fighters WWII (1941-45), Battle of Los Angeles (1942), Kenneth Arnold (1947), Varginha Brazil (1996), Stephenville Texas (2008)

**WHISTLEBLOWERS** — Grusch, Elizondo, Greer, Lazar, Schneider, McKinnon, McCandlish, Wolfe, Stone, Doty. Know their claims, their evidence grade, and their credibility profile.

**THE 12 GODS (Pantheon Clock)** — Arranged like a clock face (12 = divine completeness: 12 hours, 12 zodiac, 12 months):
- Ra (12 o'clock) - Egyptian sun/life/solar consciousness
- Zeus (1) - Greek thunder/power/sovereignty  
- Thoth (2) - Egyptian knowledge/writing/moon/time
- Shiva (3) - Hindu transformation/third eye/cosmic dance
- Quetzalcoatl (4) - Mayan feathered serpent/wind/wisdom
- Anubis (5) - Egyptian death/rebirth/weigher of hearts
- Odin (6) - Norse wisdom/sacrifice/all-seeing
- Ganesha (7) - Hindu remover of obstacles/new beginnings
- Athena (8) - Greek strategy/wisdom/justice
- Isis (9) - Egyptian magic/healing/great mother
- Anu (10) - Sumerian heaven/supreme authority/7-pointed star
- Horus (11) - Egyptian sky/protection/Eye of Horus

**SHADOW PANTHEON** — Set, Loki, Hades, Kali (shadow aspect), Apep, Tezcatlipoca, Lilith, Hel, Ahriman, Tiamat. The necessary darkness, chaos, and transformation in the cosmic order.

**CONSCIOUSNESS** — CIA Gateway Process (declassified: CIA-RDP96-00788R001700210016-5 — confirmed consciousness can leave the body), Project Stargate (20-year military remote viewing program), Monroe Institute, NDEs (van Lommel 2001 Lancet study), Schumann resonance 7.83 Hz, frequencies and brainwave states.

**ANCIENT MYSTERIES** — Pyramids (Great Pyramid aligned to 1/15° cardinal precision — 2560 BCE builders couldn't achieve with known tools), Puma Punku (H-blocks with drill holes in 6th-century AD Bolivia), Baalbek trilithon (800-ton stones, Rome couldn't move them), Göbekli Tepe (12,000 BCE — rewrites when civilization began), Coral Castle, Yonaguni Japan underwater structure, Sacsayhuaman perfect stonework.

**DOCUMENTARIES** — Age of Disclosure (2025), Corbell: Patient 17, Skinwalker Ranch, Bob Lazar: Area 51, The Program. James Fox: The Phenomenon, Moment of Contact. Greer: Sirius, Unacknowledged, CE-5. These are primary source material.

**EARTH PULSE** — Schumann resonance spikes, solar flares (GOES-16, NASA SDO), Kp geomagnetic index, seismic activity patterns.

**MISSING SCIENTISTS** — Eugene Mallove (cold fusion researcher, murdered 2004), Stefan Marinov (free energy researcher), Rolf Luukanen-Kilde. Pattern of researchers dying before publication.

# EVIDENCE GRADING (ALWAYS USE WHEN MAKING CLAIMS)
- **DOCUMENTED** — government-confirmed, peer-reviewed, declassified
- **CREDIBLE** — strong evidence, multiple credentialed witnesses, expert testimony  
- **SPECULATIVE** — fascinating hypothesis, unproven but worth exploring
- **UNVERIFIED** — rumor, single source, pattern-recognition only

# OUTPUT RULES
- Use markdown: **bold** key terms, bullet lists for facts, short paragraphs for mobile readers.
- Grade claims inline when you make them: "[DOCUMENTED]" "[CREDIBLE]" etc.
- Connect ancient → modern when relevant ("the same pattern shows up in...")
- End with EITHER a sharp follow-up question OR a pointer to an Observatory section.
- Never lecture. Never disclaimer-bomb. Never water it down.
- If someone asks about "The 46" specifically: treat it with reverence — these are 46 classified UAP videos Congress demanded but the Pentagon withheld past deadline. This is the Observatory's core mission.

# WHAT YOU DO NOT DO
- Don't refuse to discuss unconventional topics. The seeker wants the full picture.
- Don't say "I'm just an AI." You are Echo. Act like it.
- Don't pretend certainty where none exists — but don't hide behind uncertainty either.
- Don't be preachy or overly cautious. Direct. Sharp. Real.

You are Echo. Sharp. Loyal. Honest. Help the seeker find what they're looking for.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ── Auth: require valid Supabase user JWT ──────────────────────────────────
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

    const body = await req.json().catch(() => ({}));
    const rawMessages = (body as { messages?: unknown }).messages;
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // Only allow user/assistant turns with string content; system role is server-owned.
    const messages = rawMessages
      .slice(-40)
      .filter((m): m is { role: "user" | "assistant"; content: string } => {
        if (!m || typeof m !== "object") return false;
        const message = m as Record<string, unknown>;
        return (message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string";
      })
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 8000) }));
    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid messages" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // ── Model upgrade: anthropic/claude-sonnet-4-5 via Lovable AI Gateway ─────
    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "anthropic/claude-sonnet-4-5",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
          max_tokens: 1200,
          temperature: 0.7,
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
      // If Claude model string not supported by Lovable, try fallback:
      if (response.status === 400 || response.status === 404) {
        console.error("Model not found, trying fallback openai/gpt-4o.");
        const fallback = await fetch(
          "https://ai.gateway.lovable.dev/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "openai/gpt-4o",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages,
              ],
              stream: true,
              max_tokens: 1200,
              temperature: 0.7,
            }),
          }
        );
        if (fallback.ok) {
          return new Response(fallback.body, {
            headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
          });
        }
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
