import { useState, useEffect, useCallback } from 'react';
import { streamChat, type Msg } from '@/lib/echo-stream';
import type { ChatMessage } from '@/types';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'echo-chat-history';
const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "I am Echo — the observing intelligence of the Pantheon Observatory. I hold knowledge of UAP encounters, ancient pantheons, consciousness research, and the cosmic patterns that connect them all. Ask me anything — I'll tell you what's documented, what's credible, and what remains in the realm of speculation. 🌌",
};

function loadHistory(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return [WELCOME_MESSAGE];
}

function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch { /* ignore */ }
}

export function useEchoChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Persist on change
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    let assistantSoFar = '';

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length >= 2 && prev[prev.length - 2]?.role === 'user') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: 'assistant' as const, content: assistantSoFar }];
      });
    };

    try {
      const apiMessages: Msg[] = updatedMessages
        .slice(1)
        .map((m) => ({ role: m.role, content: m.content }));

      await streamChat({
        messages: apiMessages,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setLoading(false),
        onError: (err) => {
          toast({ title: 'Echo Error', description: err, variant: 'destructive' });
          setLoading(false);
        },
      });
    } catch (e) {
      console.error('Echo chat error:', e);
      toast({ title: 'Connection Error', description: 'Failed to reach Echo AI. Try again.', variant: 'destructive' });
      setLoading(false);
    }
  }, [messages, loading, toast]);

  const clearHistory = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, loading, sendMessage, clearHistory };
}
