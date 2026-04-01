import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Trash2 } from 'lucide-react';
import { useEchoChat } from '@/hooks/use-echo-chat';
import { EchoBubble } from '@/components/echo/EchoBubble';
import { EchoTypingIndicator } from '@/components/echo/EchoTypingIndicator';

const SUGGESTED_PROMPTS = [
  'What happened in the Tic Tac encounter?',
  'Explain the CIA Gateway Process',
  'Who are the Anunnaki?',
  'What did David Grusch testify?',
  'Tell me about remote viewing',
  'What is a starseed?',
];

export function EchoPage() {
  const { messages, loading, sendMessage, clearHistory } = useEchoChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    sendMessage(msg);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="relative inline-block mb-4">
          <Bot className="w-12 h-12 text-primary" />
          <motion.div
            className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Echo AI</h1>
        <p className="text-muted-foreground text-sm">Cosmic intelligence · Evidence-graded responses · Powered by AI</p>
      </motion.div>

      {/* Suggested prompts */}
      <AnimatePresence>
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mb-6"
          >
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <motion.button
                key={prompt}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => handleSend(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors border border-border hover:border-primary/40"
              >
                {prompt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-cosmic rounded-2xl overflow-hidden flex flex-col" style={{ height: '60vh' }}>
        {/* Header bar with clear button */}
        {messages.length > 1 && (
          <div className="flex items-center justify-end px-4 pt-3 pb-1">
            <button
              onClick={clearHistory}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Clear chat
            </button>
          </div>
        )}

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <EchoBubble key={i} message={msg} index={i} />
          ))}
          <AnimatePresence>
            {loading && messages[messages.length - 1]?.role !== 'assistant' && (
              <EchoTypingIndicator />
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-border p-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Echo about UAPs, ancient gods, consciousness..."
              className="flex-1 bg-secondary/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border"
              disabled={loading}
            />
            <motion.button
              type="submit"
              disabled={!input.trim() || loading}
              whileTap={{ scale: 0.93 }}
              className="bg-primary text-primary-foreground rounded-xl px-5 py-3 disabled:opacity-30 hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
