import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { useEchoXp } from '@/hooks/use-echo-xp';

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: { username: string } | null;
}

interface MessageFeedProps {
  channelId: string | null;
  channelName: string;
  userId: string | null;
  onAuthRequired: () => void;
}

export function MessageFeed({ channelId, channelName, userId, onAuthRequired }: MessageFeedProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { addXp } = useEchoXp();

  // Fetch messages
  useEffect(() => {
    if (!channelId) return;
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('echoverse_messages')
        .select('id, content, created_at, user_id, profiles:user_id(username)')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true })
        .limit(100);
      if (data) setMessages(data as any);
    };
    fetchMessages();

    // Realtime subscription
    const channel = supabase
      .channel(`echoverse-${channelId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'echoverse_messages', filter: `channel_id=eq.${channelId}` },
        async (payload) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('user_id', payload.new.user_id)
            .single();
          setMessages(prev => [...prev, { ...payload.new as any, profiles: profile }]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [channelId]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !channelId) return;
    if (!userId) { onAuthRequired(); return; }

    setSending(true);
    await supabase.from('echoverse_messages').insert({
      channel_id: channelId,
      user_id: userId,
      content: input.trim(),
    });
    setInput('');
    setSending(false);
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Channel header */}
      <div className="px-4 py-3 border-b border-border/30">
        <h2 className="text-lg font-bold text-foreground">#{channelName}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center mt-8">No messages yet. Be the first to speak.</p>
        )}
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i < 10 ? i * 0.03 : 0 }}
            className="flex gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
              {((msg.profiles as any)?.username || 'S')[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {(msg.profiles as any)?.username || 'Starseed'}
                </span>
                <span className="text-[10px] text-muted-foreground">{formatTime(msg.created_at)}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed break-words">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/30">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={userId ? `Message #${channelName}` : 'Sign in to chat...'}
            className="bg-muted/20 border-border/40 flex-1"
            disabled={sending}
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
