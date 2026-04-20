import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type AppRole = 'admin' | 'moderator' | 'user';

export function useUserRole() {
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async (uid: string) => {
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', uid);
      setRoles((data ?? []).map((r) => r.role as AppRole));
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) load(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) load(session.user.id);
      else { setRoles([]); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  return {
    roles,
    loading,
    isAdmin: roles.includes('admin'),
    isModerator: roles.includes('moderator') || roles.includes('admin'),
  };
}
