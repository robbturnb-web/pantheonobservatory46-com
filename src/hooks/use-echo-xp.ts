import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { XP_VALUES, type XpEventType } from '@/lib/xp-events';

export interface RankTier {
  name: string;
  minXp: number;
  color: string;
}

export const RANK_TIERS: RankTier[] = [
  { name: 'Initiate', minXp: 0, color: '#6b7280' },
  { name: 'Seeker', minXp: 100, color: '#8b5cf6' },
  { name: 'Adept', minXp: 300, color: '#3b82f6' },
  { name: 'Mystic', minXp: 600, color: '#06b6d4' },
  { name: 'Oracle', minXp: 1000, color: '#f59e0b' },
  { name: 'Ascended', minXp: 2000, color: '#39ff14' },
];

function getRankForXp(xp: number): RankTier {
  for (let i = RANK_TIERS.length - 1; i >= 0; i--) {
    if (xp >= RANK_TIERS[i].minXp) return RANK_TIERS[i];
  }
  return RANK_TIERS[0];
}

function getNextRank(xp: number): RankTier | null {
  const current = getRankForXp(xp);
  const idx = RANK_TIERS.indexOf(current);
  return idx < RANK_TIERS.length - 1 ? RANK_TIERS[idx + 1] : null;
}

export function useEchoXp() {
  const [userId, setUserId] = useState<string | null>(null);
  const [xp, setXp] = useState(0);
  const [pagesVisited, setPagesVisited] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  // Track in-flight event keys to avoid double-grants from React re-renders
  const inFlight = useRef<Set<string>>(new Set());

  const rank = getRankForXp(xp);
  const nextRank = getNextRank(xp);
  const progress = nextRank
    ? ((xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100
    : 100;

  // Listen for auth changes and load XP + handle daily-return bonus
  useEffect(() => {
    const loadXp = async (uid: string) => {
      const { data } = await supabase
        .from('echo_xp')
        .select('xp, pages_visited, last_daily_at')
        .eq('user_id', uid)
        .single();
      if (data) {
        setXp(data.xp);
        setPagesVisited((data.pages_visited as string[]) || []);

        // Daily-return bonus: if last_daily_at is null or > 20h ago
        const last = data.last_daily_at ? new Date(data.last_daily_at).getTime() : 0;
        const hoursSince = (Date.now() - last) / (1000 * 60 * 60);
        if (hoursSince >= 20) {
          // Defer to avoid setState during render
          setTimeout(() => {
            grantDaily(uid, data.xp).catch(() => {});
          }, 1500);
        }
      }
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadXp(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        loadXp(session.user.id);
      } else {
        setUserId(null);
        setXp(0);
        setPagesVisited([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * Grant XP and (optionally) log an idempotent event.
   * Returns true if XP was granted, false if it was a duplicate event.
   */
  const awardEvent = useCallback(
    async (
      type: XpEventType,
      eventId: string,
      amount: number,
      reason?: string
    ): Promise<boolean> => {
      if (!userId) return false;
      const key = `${type}:${eventId}`;
      if (inFlight.current.has(key)) return false;
      inFlight.current.add(key);

      try {
        // Insert event row — unique constraint blocks duplicates
        const { error: insertErr } = await supabase
          .from('echo_xp_events')
          .insert({ user_id: userId, event_type: type, event_id: eventId, xp: amount });

        if (insertErr) {
          // 23505 = unique_violation → already granted
          if ((insertErr as { code?: string }).code === '23505') return false;
          throw insertErr;
        }

        const oldRank = getRankForXp(xp);
        const newXp = xp + amount;
        const newRank = getRankForXp(newXp);
        setXp(newXp);

        await supabase
          .from('echo_xp')
          .update({ xp: newXp, rank: newRank.name })
          .eq('user_id', userId);

        if (newRank.name !== oldRank.name) {
          toast(`🌟 Rank Up! You are now ${newRank.name}`, {
            description: `${newXp} XP earned`,
          });
        } else if (reason) {
          toast(`✨ +${amount} XP — ${reason}`);
        }
        return true;
      } catch (e) {
        return false;
      } finally {
        inFlight.current.delete(key);
      }
    },
    [userId, xp]
  );

  // Daily-return helper (separate path because it needs to bypass the React-state guard at boot)
  const grantDaily = async (uid: string, currentXp: number) => {
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabase
      .from('echo_xp_events')
      .insert({ user_id: uid, event_type: 'daily', event_id: today, xp: XP_VALUES.DAILY_RETURN });
    if (error) return; // duplicate or RLS — silent
    const newXp = currentXp + XP_VALUES.DAILY_RETURN;
    const newRank = getRankForXp(newXp);
    setXp(newXp);
    await supabase
      .from('echo_xp')
      .update({ xp: newXp, rank: newRank.name, last_daily_at: new Date().toISOString() })
      .eq('user_id', uid);
    toast(`🌅 Daily return — +${XP_VALUES.DAILY_RETURN} XP`);
  };

  // Convenience wrappers for common events
  const trackPageVisit = useCallback(
    async (page: string) => {
      if (!userId || pagesVisited.includes(page)) return;
      const updated = [...pagesVisited, page];
      setPagesVisited(updated);
      await supabase.from('echo_xp').update({ pages_visited: updated }).eq('user_id', userId);
      await awardEvent('page', page, XP_VALUES.PAGE_VISIT, 'New page explored');
    },
    [userId, pagesVisited, awardEvent]
  );

  const trackSpeciesOpen = useCallback(
    (id: string) => awardEvent('species', id, XP_VALUES.SPECIES_OPEN, 'Species dossier opened'),
    [awardEvent]
  );
  const trackUapOpen = useCallback(
    (id: string) => awardEvent('uap', id, XP_VALUES.UAP_CASE_OPEN, 'UAP case opened'),
    [awardEvent]
  );
  const trackWhistleblowerOpen = useCallback(
    (id: string) => awardEvent('whistleblower', id, XP_VALUES.WHISTLEBLOWER_OPEN, 'Whistleblower file opened'),
    [awardEvent]
  );
  const trackVaultOpen = useCallback(
    (id: string) => awardEvent('vault', id, XP_VALUES.VAULT_SLOT_OPEN, 'Vault slot revealed'),
    [awardEvent]
  );

  return {
    xp,
    rank,
    nextRank,
    progress,
    userId,
    loading,
    awardEvent,
    trackPageVisit,
    trackSpeciesOpen,
    trackUapOpen,
    trackWhistleblowerOpen,
    trackVaultOpen,
    pagesVisited,
  };
}
