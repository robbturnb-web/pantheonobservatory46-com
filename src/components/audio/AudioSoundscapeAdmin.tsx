import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const TRACK_KEYS = ['cosmos1', 'cosmos2', 'ancient1', 'ancient2', 'disclosure1', 'disclosure2'] as const;
type TrackKey = (typeof TRACK_KEYS)[number];

interface AudioTrackRow {
  track_key: string;
  playlist: string;
  label: string;
  status: string;
  public_url: string | null;
  error_message: string | null;
  generated_at: string | null;
}

/**
 * Admin-only soundscape generator. Calls the `generate-ambient-track` edge
 * function for each missing track sequentially (ElevenLabs Music API takes
 * ~30s per track and edge timeouts cap us at 150s, so one-at-a-time is safer).
 */
export function AudioSoundscapeAdmin() {
  const [rows, setRows] = useState<AudioTrackRow[]>([]);
  const [busy, setBusy] = useState<TrackKey | 'all' | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from('audio_tracks')
      .select('track_key, playlist, label, status, public_url, error_message, generated_at');
    setRows((data ?? []) as AudioTrackRow[]);
  };

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data: role } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', u.user.id)
        .eq('role', 'admin')
        .maybeSingle();
      setIsAdmin(Boolean(role));
      await load();
    })();
  }, []);

  const generate = async (key: TrackKey) => {
    setBusy(key);
    try {
      const { data, error } = await supabase.functions.invoke('generate-ambient-track', {
        body: { track_key: key },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Generated ${key}`, { description: `${Math.round((data?.bytes ?? 0) / 1024)} KB` });
      await load();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Generation failed';
      toast.error(`Failed: ${key}`, { description: msg });
    } finally {
      setBusy(null);
    }
  };

  const generateAll = async () => {
    setBusy('all');
    for (const k of TRACK_KEYS) {
      const row = rows.find((r) => r.track_key === k);
      if (row?.status === 'ready' && row.public_url) continue;
      try {
        const { data, error } = await supabase.functions.invoke('generate-ambient-track', {
          body: { track_key: k },
        });
        if (error) throw error;
        if (data?.error) throw new Error(data.error);
        toast.success(`Generated ${k}`);
        await load();
      } catch (e) {
        toast.error(`Failed: ${k}`, { description: e instanceof Error ? e.message : 'error' });
        break;
      }
    }
    setBusy(null);
  };

  if (!isAdmin) {
    return (
      <div className="glass-cosmic rounded-2xl p-6 border border-amber-500/30 text-center">
        <Sparkles className="w-6 h-6 mx-auto mb-2 text-amber-400" />
        <p className="text-sm text-muted-foreground">
          Soundscape generation is admin-only. Sign in with an admin account to seed the cosmic ambient tracks.
        </p>
      </div>
    );
  }

  const statusFor = (key: TrackKey) => rows.find((r) => r.track_key === key);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-cosmic rounded-2xl p-6 border border-primary/30 space-y-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Cosmic Soundscape Generator
          </h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-md">
            Generates 6 ambient tracks via ElevenLabs Music. ~30 seconds per track. Outputs cached in Lovable Cloud Storage.
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={load} disabled={busy !== null}>
            <RefreshCw className="w-3 h-3" />
          </Button>
          <Button size="sm" onClick={generateAll} disabled={busy !== null}>
            {busy === 'all' ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
            Generate All Missing
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {TRACK_KEYS.map((key) => {
          const row = statusFor(key);
          const ready = row?.status === 'ready' && row.public_url;
          const failed = row?.status === 'failed';
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/40 p-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {ready && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  {failed && <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                  {!ready && !failed && <span className="w-3.5 h-3.5 inline-block rounded-full border border-muted-foreground/50" />}
                  <span className="truncate">{key}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                  {row?.label ?? '—'} · {row?.status ?? 'not generated'}
                </div>
                {failed && row?.error_message && (
                  <div className="text-[10px] text-red-400 mt-1 truncate">{row.error_message}</div>
                )}
              </div>
              <Button size="sm" variant={ready ? 'ghost' : 'secondary'} onClick={() => generate(key)} disabled={busy !== null}>
                {busy === key ? <Loader2 className="w-3 h-3 animate-spin" /> : ready ? 'Regen' : 'Generate'}
              </Button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
