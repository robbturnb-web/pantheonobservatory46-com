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
        // Server-side bounded XP grant — client cannot inflate xp/rank
        const { data, error } = await supabase.rpc('award_xp', {
          p_event_type: type,
          p_event_id: eventId,
          p_amount: amount,
        });

        if (error) return false;
        const result = data as { granted: boolean; xp: number; rank: string } | null;
        if (!result || !result.granted) return false;

        const oldRank = getRankForXp(xp);
        setXp(result.xp);
        const newRank = getRankForXp(result.xp);

        if (newRank.name !== oldRank.name) {
          toast(`🌟 Rank Up! You are now ${newRank.name}`, {
            description: `${result.xp} XP earned`,
          });
        } else if (reason) {
          toast(`✨ +${amount} XP — ${reason}`);
        }
        return true;
      } catch {
        return false;
      } finally {
        inFlight.current.delete(key);
      }
    },
    [userId, xp]
  );

  // Daily-return helper — also goes through the secured RPC
  const grantDaily = async (uid: string, _currentXp: number) => {
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase.rpc('award_xp', {
      p_event_type: 'daily',
      p_event_id: today,
      p_amount: XP_VALUES.DAILY_RETURN,
    });
    if (error) return;
    const result = data as { granted: boolean; xp: number } | null;
    if (!result?.granted) return;
    setXp(result.xp);
    // last_daily_at is metadata only — still client-writable via RLS
    await supabase
      .from('echo_xp')
      .update({ last_daily_at: new Date().toISOString() })
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

  /**
   * Legacy ad-hoc XP grant. Kept for chat/community features that reward
   * activity rather than a discrete unique entity. Each call is a brand-new
   * idempotent event keyed by timestamp + random suffix.
   */
  const addXp = useCallback(
    async (amount: number, reason?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      return awardEvent('page', `adhoc:${id}`, amount, reason);
    },
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
    addXp,
    trackPageVisit,
    trackSpeciesOpen,
    trackUapOpen,
    trackWhistleblowerOpen,
    trackVaultOpen,
    pagesVisited,
  };
}
