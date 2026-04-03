import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  const rank = getRankForXp(xp);
  const nextRank = getNextRank(xp);
  const progress = nextRank
    ? ((xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100
    : 100;

  // Listen for auth changes and load XP
  useEffect(() => {
    const loadXp = async (uid: string) => {
      const { data } = await supabase
        .from('echo_xp')
        .select('xp, pages_visited')
        .eq('user_id', uid)
        .single();
      if (data) {
        setXp(data.xp);
        setPagesVisited((data.pages_visited as string[]) || []);
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

  const addXp = useCallback(async (amount: number, reason?: string) => {
    if (!userId) return;
    const newXp = xp + amount;
    const oldRank = getRankForXp(xp);
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
  }, [userId, xp]);

  const trackPageVisit = useCallback(async (page: string) => {
    if (!userId || pagesVisited.includes(page)) return;
    const updated = [...pagesVisited, page];
    setPagesVisited(updated);

    await supabase
      .from('echo_xp')
      .update({ pages_visited: updated })
      .eq('user_id', userId);

    await addXp(10, 'New page explored');
  }, [userId, pagesVisited, addXp]);

  return { xp, rank, nextRank, progress, userId, loading, addXp, trackPageVisit };
}
