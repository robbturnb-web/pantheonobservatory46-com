import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, X, Pin, PinOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/use-user-role';
import { toast } from 'sonner';

interface ModTestimony {
  id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  status: string;
  pinned: boolean;
  flow_drive_url: string | null;
  user_id: string;
  created_at: string;
}

export function CommunityModPage() {
  const { isModerator, loading: roleLoading } = useUserRole();
  const [testimonies, setTestimonies] = useState<ModTestimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from('community_testimonies')
      .select('id, title, body, category, tags, status, pinned, flow_drive_url, user_id, created_at')
      .order('created_at', { ascending: false })
      .limit(200);
    if (filter !== 'all') q = q.eq('status', filter);
    const { data } = await q;
    setTestimonies(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Mod Queue — Pantheon Observatory';
    if (isModerator) load();
  }, [isModerator, filter]);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const { data: { session } } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('community_testimonies')
      .update({
        status,
        approved_at: status === 'approved' ? new Date().toISOString() : null,
        approved_by: status === 'approved' ? session?.user.id : null,
      })
      .eq('id', id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Marked ${status}`);
      load();
    }
  };

  const togglePin = async (id: string, pinned: boolean) => {
    const { error } = await supabase
      .from('community_testimonies')
      .update({ pinned: !pinned })
      .eq('id', id);
    if (error) toast.error(error.message);
    else load();
  };

  if (roleLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
      </div>
    );
  }

  if (!isModerator) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShieldCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Restricted</h1>
        <p className="text-muted-foreground mb-6">This dashboard is for moderators only.</p>
        <Link to="/community" className="text-primary hover:underline">Back to community</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-accent-neon" /> Mod Queue
        </h1>
        <p className="text-muted-foreground text-sm">Review submitted testimonies.</p>
      </motion.header>

      <div className="flex gap-2 mb-5">
        {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border capitalize ${
              filter === f
                ? 'bg-primary/20 border-primary text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading…</div>
      ) : testimonies.length === 0 ? (
        <div className="text-center text-muted-foreground py-12 glass-cosmic rounded-xl">
          No testimonies in this bucket.
        </div>
      ) : (
        <div className="space-y-3">
          {testimonies.map((t) => (
            <article key={t.id} className="glass-cosmic rounded-xl p-4 border border-border">
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold">{t.title}</h3>
                  <div className="text-[10px] text-muted-foreground flex gap-2 flex-wrap">
                    <span className="capitalize px-1.5 py-0.5 rounded bg-accent/30">{t.category}</span>
                    <span>Status: <span className="font-mono">{t.status}</span></span>
                    <span>{new Date(t.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {t.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(t.id, 'approved')}
                      className="p-1.5 rounded-md bg-accent-neon/15 text-accent-neon border border-accent-neon/40 hover:bg-accent-neon/25"
                      aria-label="Approve"
                      title="Approve"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  {t.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(t.id, 'rejected')}
                      className="p-1.5 rounded-md bg-destructive/15 text-destructive border border-destructive/40 hover:bg-destructive/25"
                      aria-label="Reject"
                      title="Reject"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {t.status === 'approved' && (
                    <button
                      onClick={() => togglePin(t.id, t.pinned)}
                      className={`p-1.5 rounded-md border ${
                        t.pinned
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'border-border hover:bg-accent'
                      }`}
                      aria-label={t.pinned ? 'Unpin' : 'Pin'}
                      title={t.pinned ? 'Unpin' : 'Pin'}
                    >
                      {t.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{t.body}</p>
              {t.flow_drive_url && (
                <a
                  href={t.flow_drive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline mt-2 inline-block"
                >
                  Linked video →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
