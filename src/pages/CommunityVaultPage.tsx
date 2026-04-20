import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { TestimonyCard, type TestimonyCardData } from '@/components/community/TestimonyCard';
import { TestimonySubmitForm } from '@/components/community/TestimonySubmitForm';
import { useUserRole } from '@/hooks/use-user-role';
import { useEchoXp } from '@/hooks/use-echo-xp';

const CATEGORIES = ['all', 'sighting', 'encounter', 'contact', 'dream', 'synchronicity', 'other'] as const;

export function CommunityVaultPage() {
  const [testimonies, setTestimonies] = useState<TestimonyCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('all');
  const { isModerator } = useUserRole();
  const { userId } = useEchoXp();

  const fetchTestimonies = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('community_testimonies')
      .select('id, title, body, category, tags, pinned, flow_drive_url, created_at')
      .eq('status', 'approved')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(100);
    setTestimonies(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Community Vault — Pantheon Observatory';
    fetchTestimonies();
  }, []);

  const filtered = useMemo(() => {
    return testimonies.filter((t) => {
      if (category !== 'all' && t.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        const inText = t.title.toLowerCase().includes(q) || t.body.toLowerCase().includes(q);
        const inTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!inText && !inTags) return false;
      }
      return true;
    });
  }, [testimonies, search, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-xs uppercase tracking-wider text-primary mb-4">
          <Users className="w-3.5 h-3.5" /> Community Vault
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-3">Voices of the Witnesses</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real testimonies from the community. Sightings, encounters, contact experiences, dreams, synchronicities. All submissions reviewed by moderators.
        </p>
        {isModerator && (
          <Link
            to="/community/mod"
            className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full border border-accent-neon/40 bg-accent-neon/10 text-accent-neon text-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Moderator dashboard
          </Link>
        )}
      </motion.header>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <section>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, story, tags…"
                className="w-full pl-9 pr-3 py-2 rounded-md bg-input border border-border text-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number])}
                className="pl-9 pr-3 py-2 rounded-md bg-input border border-border text-sm capitalize"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-12">Loading transmissions…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 glass-cosmic rounded-xl">
              {testimonies.length === 0
                ? 'No testimonies yet. Be the first to share.'
                : 'No matches for your filter.'}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filtered.map((t) => (
                <TestimonyCard key={t.id} t={t} />
              ))}
            </div>
          )}
        </section>

        <aside className="lg:sticky lg:top-20 h-fit space-y-4">
          {userId ? (
            <TestimonySubmitForm onSubmitted={fetchTestimonies} />
          ) : (
            <div className="glass-cosmic rounded-xl p-5 text-center">
              <p className="text-sm text-muted-foreground mb-3">Sign in to share your testimony.</p>
              <Link
                to="/auth"
                className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold"
              >
                Sign in
              </Link>
            </div>
          )}
          <div className="glass-cosmic rounded-xl p-4 text-xs text-muted-foreground">
            <strong className="text-foreground">Vault rules:</strong> First-person experiences only. No links to merch / monetization. No personal attacks. Moderators review every submission.
          </div>
        </aside>
      </div>
    </div>
  );
}
