import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, LogIn, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ChannelList } from '@/components/echoverse/ChannelList';
import { MessageFeed } from '@/components/echoverse/MessageFeed';
import { AuthModal } from '@/components/echoverse/AuthModal';

interface Channel {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export function EchoversePage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeSlug, setActiveSlug] = useState('general');
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [authOpen, setAuthOpen] = useState(false);

  // Auth listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      if (uid) {
        const { data } = await supabase.from('profiles').select('username').eq('user_id', uid).single();
        setUsername(data?.username || 'Starseed');
      } else {
        setUsername('');
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id ?? null);
      if (session?.user?.id) {
        supabase.from('profiles').select('username').eq('user_id', session.user.id).single().then(({ data }) => {
          setUsername(data?.username || 'Starseed');
        });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch channels
  useEffect(() => {
    supabase.from('echoverse_channels').select('*').order('sort_order').then(({ data }) => {
      if (data) setChannels(data);
    });
  }, []);

  const activeChannel = channels.find(c => c.slug === activeSlug);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 sm:px-6 py-4 border-b border-border/30 glass-cosmic"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Echoverse</h1>
              <p className="text-xs text-muted-foreground">Starseed Community Hub</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {userId ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">{username}</span>
                <button onClick={handleSignOut} className="text-muted-foreground hover:text-foreground p-2">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Body */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-56 shrink-0 border-r border-border/30 py-4 px-2 hidden md:block"
        >
          <ChannelList channels={channels} activeSlug={activeSlug} onSelect={setActiveSlug} />
        </motion.aside>

        {/* Mobile channel select */}
        <div className="md:hidden px-4 pt-3">
          <select
            value={activeSlug}
            onChange={(e) => setActiveSlug(e.target.value)}
            className="w-full bg-muted/20 border border-border/40 rounded-lg px-3 py-2 text-sm text-foreground"
          >
            {channels.map(ch => (
              <option key={ch.id} value={ch.slug}>{ch.icon} {ch.name}</option>
            ))}
          </select>
        </div>

        {/* Chat */}
        <main className="flex-1 flex flex-col min-h-0">
          {activeChannel && (
            <MessageFeed
              channelId={activeChannel.id}
              channelName={activeChannel.name}
              userId={userId}
              onAuthRequired={() => setAuthOpen(true)}
            />
          )}
        </main>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
