// Generate a single ambient soundscape via ElevenLabs Music API,
// upload it to the public `audio-tracks` bucket, and upsert its URL
// into the audio_tracks registry. Admin-only.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { encode as base64Encode } from 'https://deno.land/std@0.168.0/encoding/base64.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface Body {
  track_key: string;
}

// The full catalogue of soundscapes Pantheon needs. Edit prompts here
// to fine-tune the vibe; admins can regenerate any track on demand.
const CATALOGUE: Record<string, { playlist: string; label: string; prompt: string; duration: number }> = {
  cosmos1: {
    playlist: 'cosmos',
    label: 'Deep Space',
    prompt: 'Cinematic deep-space ambient drone. Vast nebula textures, slow swelling pads, subterranean sub-bass pulse, occasional shimmering bell harmonics, faint cosmic radio static. No drums, no melody, pure cosmic awe. Mysterious, vast, sacred.',
    duration: 90,
  },
  cosmos2: {
    playlist: 'cosmos',
    label: 'Nebula Drift',
    prompt: 'Ethereal nebula drift. Floating glass harmonics, distant choral pads, slow celestial arpeggios on soft synths, gentle reverberant chimes. Weightless and contemplative. No drums. Feels like watching a galaxy form.',
    duration: 90,
  },
  ancient1: {
    playlist: 'ancient',
    label: 'Temple Echo',
    prompt: 'Ancient Egyptian temple ambience. Deep meditative drone, distant low chanting (wordless), slow stone hand-drum heartbeat at 60 bpm, faint sistrum shimmer, reverberant ney flute breath. Sacred, dusty, golden, mysterious.',
    duration: 90,
  },
  ancient2: {
    playlist: 'ancient',
    label: 'Lost Civilizations',
    prompt: 'Lost civilization soundscape. Hypnotic Anunnaki ritual drone, low Tibetan singing bowl swells, distant Andean pan flute echoes, slow ceremonial drum, sub-bass omm. Cinematic, archaeological, otherworldly.',
    duration: 90,
  },
  disclosure1: {
    playlist: 'disclosure',
    label: 'Signal Pulse',
    prompt: 'Classified briefing room ambient. Tense low-frequency drone, slow Geiger-counter ticks, faint encrypted radio static, single sustained dark cello note, distant submarine sonar pings. Mysterious, paranoid, government black-budget.',
    duration: 90,
  },
  disclosure2: {
    playlist: 'disclosure',
    label: 'Dark Briefing',
    prompt: 'Dark disclosure briefing soundtrack. Inception-style sub bass hits at 30s intervals, eerie sustained synth pads, distant whispered radio chatter (unintelligible), pulsing heartbeat. Cinematic Christopher Nolan tension. No melody, pure dread and revelation.',
    duration: 90,
  },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    if (!ELEVENLABS_API_KEY) throw new Error('ELEVENLABS_API_KEY is not configured');

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    // Verify caller is an admin
    const supabaseAuth = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData } = await supabaseAuth.auth.getUser();
    if (!userData?.user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: roleData } = await admin
      .from('user_roles')
      .select('role')
      .eq('user_id', userData.user.id)
      .eq('role', 'admin')
      .maybeSingle();
    if (!roleData) return new Response(JSON.stringify({ error: 'Forbidden — admin only' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const body: Body = await req.json();
    const entry = CATALOGUE[body.track_key];
    if (!entry) return new Response(JSON.stringify({ error: 'Unknown track_key' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    // Mark as generating
    await admin.from('audio_tracks').upsert(
      {
        track_key: body.track_key,
        playlist: entry.playlist,
        label: entry.label,
        prompt: entry.prompt,
        duration_seconds: entry.duration,
        status: 'generating',
        error_message: null,
      },
      { onConflict: 'track_key' },
    );

    // Call ElevenLabs Music API (note: parameter is `prompt`, NOT `text`)
    const elResp = await fetch('https://api.elevenlabs.io/v1/music', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: entry.prompt,
        music_length_ms: entry.duration * 1000,
      }),
    });

    if (!elResp.ok) {
      const errText = await elResp.text();
      await admin.from('audio_tracks').update({ status: 'failed', error_message: `ElevenLabs ${elResp.status}: ${errText.slice(0, 500)}` }).eq('track_key', body.track_key);
      throw new Error(`ElevenLabs ${elResp.status}: ${errText}`);
    }

    const audioBuffer = await elResp.arrayBuffer();
    const audioBytes = new Uint8Array(audioBuffer);

    // Upload to public bucket
    const path = `${entry.playlist}/${body.track_key}.mp3`;
    const { error: uploadError } = await admin.storage
      .from('audio-tracks')
      .upload(path, audioBytes, { contentType: 'audio/mpeg', upsert: true });
    if (uploadError) {
      await admin.from('audio_tracks').update({ status: 'failed', error_message: `Upload: ${uploadError.message}` }).eq('track_key', body.track_key);
      throw uploadError;
    }

    const { data: pub } = admin.storage.from('audio-tracks').getPublicUrl(path);
    const publicUrl = pub.publicUrl;

    await admin.from('audio_tracks').update({
      public_url: publicUrl,
      status: 'ready',
      error_message: null,
      generated_at: new Date().toISOString(),
    }).eq('track_key', body.track_key);

    // Avoid base64-encoding the full audio in response; URL is enough
    void base64Encode; // (kept import for future signed-URL variants)

    return new Response(JSON.stringify({ ok: true, track_key: body.track_key, url: publicUrl, bytes: audioBytes.byteLength }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
