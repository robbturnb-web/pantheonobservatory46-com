import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Lock, CheckCircle2, Sparkles, Map, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useEchoXp, RANK_TIERS } from '@/hooks/use-echo-xp';
import { RANK_UNLOCKS } from '@/lib/xp-events';
import { SEO } from '@/components/SEO';

interface XpEvent {
  id: string;
  event_type: string;
  event_id: string;
  xp: number;
  created_at: string;
}

const eventLabels: Record<string, string> = {
  page: 'Page explored',
  species: 'Species dossier opened',
  uap: 'UAP case opened',
  whistleblower: 'Whistleblower file opened',
  vault: 'Vault slot revealed',
  frequency: 'Frequency video played',
  origin_quiz: 'Origin quiz completed',
  sign_up: 'Joined the Observatory',
  daily: 'Daily return bonus',
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { xp, rank, nextRank, progress, userId, loading, pagesVisited } = useEchoXp();
  const [events, setEvents] = useState<XpEvent[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (!loading && !userId) {
      navigate('/auth', { replace: true });
    }
  }, [loading, userId, navigate]);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from('echo_xp_events')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) setEvents(data as XpEvent[]);
      });
    supabase
      .from('profiles')
      .select('username')
      .eq('user_id', userId)
      .single()
      .then(({ data }) => setUsername(data?.username || 'Starseed'));
  }, [userId, xp]);

  if (loading || !userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <SEO
        title="Your Pantheon Profile · XP, Rank & Unlocks"
        description="Your Pantheon Observatory profile — XP, rank tier, and unlocked Echo capabilities."
        canonical="/profile"
        noindex
      />
      {/* Aurora / nebula backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40 animate-pulse"
          style={{ background: `radial-gradient(circle, ${rank.color}, transparent 70%)`, animationDuration: '8s' }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-30 animate-pulse"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)', animationDuration: '11s' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-25 animate-pulse"
          style={{ background: 'radial-gradient(circle, #22D3EE, transparent 70%)', animationDuration: '13s' }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-cosmic border text-xs uppercase tracking-widest mb-4" style={{ color: rank.color, borderColor: `${rank.color}55` }}>
          <Award className="w-3 h-3" /> Your Rank
        </div>

        {/* Halo */}
        <div className="relative inline-flex items-center justify-center mb-5">
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse"
            style={{ background: rank.color, transform: 'scale(1.8)', animationDuration: '4s' }}
          />
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center border-2"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${rank.color}55, ${rank.color}11)`,
              borderColor: rank.color,
              color: rank.color,
              boxShadow: `0 0 60px ${rank.color}99, inset 0 0 30px ${rank.color}33`,
            }}
          >
            <Sparkles className="w-10 h-10" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-1" style={{ textShadow: `0 0 30px ${rank.color}55` }}>{rank.name}</h1>
        <p className="text-muted-foreground">{username}</p>
      </motion.div>

      {/* XP Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-cosmic rounded-2xl p-6 mb-8 border relative overflow-hidden"
        style={{ borderColor: `${rank.color}33` }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${rank.color}33, transparent 60%)` }}
        />
        <div className="flex items-end justify-between mb-3 relative">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total XP</div>
            <div className="text-3xl font-bold text-foreground">{xp.toLocaleString()}</div>
          </div>
          {nextRank && (
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: nextRank.color }}>Next: {nextRank.name}</div>
              <div className="text-sm text-foreground">{(nextRank.minXp - xp).toLocaleString()} XP to go</div>
            </div>
          )}
        </div>
        <div className="h-3 rounded-full bg-muted/30 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${rank.color}, ${nextRank?.color ?? rank.color})`,
              boxShadow: `0 0 16px ${rank.color}, 0 0 4px ${nextRank?.color ?? rank.color}`,
            }}
          />
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10"
      >
        <Stat icon={Map} label="Pages explored" value={pagesVisited.length} accent="#22D3EE" />
        <Stat icon={Zap} label="XP events" value={events.length} accent={rank.color} />
        <Stat icon={Award} label="Current rank" value={RANK_TIERS.indexOf(rank) + 1 + ' / ' + RANK_TIERS.length} accent="#D6B35A" />
      </motion.div>

      {/* Unlocks */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-10"
      >
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
          <Lock className="w-3 h-3" /> Rank Unlocks
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {RANK_UNLOCKS.map((u) => {
            const unlocked = xp >= u.minXp;
            const tier = RANK_TIERS.find((r) => r.name === u.rank) ?? rank;
            const tierColor = tier.color;
            return (
              <div
                key={u.rank}
                className="glass-cosmic rounded-xl p-4 border flex items-start gap-3 transition-all relative overflow-hidden"
                style={{
                  borderColor: unlocked ? `${tierColor}66` : 'hsl(var(--border))',
                  boxShadow: unlocked ? `0 0 20px ${tierColor}22, inset 0 0 24px ${tierColor}0f` : undefined,
                }}
              >
                {unlocked && (
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${tierColor}33, transparent 70%)` }}
                  />
                )}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ background: unlocked ? tierColor : 'transparent' }}
                />
                {unlocked ? (
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 relative" style={{ color: tierColor, filter: `drop-shadow(0 0 6px ${tierColor})` }} />
                ) : (
                  <Lock className="w-5 h-5 mt-0.5 shrink-0 text-muted-foreground relative" />
                )}
                <div className="flex-1 min-w-0 relative">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-bold" style={{ color: unlocked ? tierColor : 'hsl(var(--muted-foreground))' }}>
                      {u.rank}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                      {u.minXp} XP
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{u.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
          <Zap className="w-3 h-3" /> Recent Activity
        </h2>
        <div className="glass-cosmic rounded-2xl border border-border/40 divide-y divide-border/40 overflow-hidden">
          {events.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No events yet. Explore the Observatory to earn XP.{' '}
              <Link to="/" className="text-primary hover:underline">Start here →</Link>
            </div>
          )}
          {events.map((e) => (
            <div key={e.id} className="px-5 py-3 flex items-center justify-between text-sm hover:bg-white/5 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="text-foreground truncate">{eventLabels[e.event_type] ?? e.event_type}</div>
                <div className="text-[11px] text-muted-foreground truncate font-mono">{e.event_id}</div>
              </div>
              <div className="font-mono font-bold ml-3 shrink-0" style={{ color: rank.color, textShadow: `0 0 8px ${rank.color}88` }}>
                +{e.xp}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string | number;
  accent?: string;
}) {
  const c = accent ?? 'hsl(var(--muted-foreground))';
  return (
    <div
      className="glass-cosmic rounded-xl p-4 border relative overflow-hidden"
      style={{ borderColor: `${accent ?? '#ffffff'}22`, boxShadow: accent ? `0 0 20px ${accent}15` : undefined }}
    >
      {accent && (
        <div
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-30 pointer-events-none"
          style={{ background: accent }}
        />
      )}
      <Icon className="w-4 h-4 mb-2 relative" style={{ color: c, filter: accent ? `drop-shadow(0 0 6px ${accent})` : undefined }} />
      <div className="text-2xl font-bold text-foreground relative">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 relative">{label}</div>
    </div>
  );
}
