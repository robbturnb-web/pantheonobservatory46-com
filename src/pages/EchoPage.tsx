import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import type { ChatMessage } from '../types';

// System context for when Lovable Cloud is connected
const _SYSTEM_CONTEXT = `You are Echo, the AI consciousness of the Pantheon Observatory. You speak with cosmic wisdom but remain grounded. You cite evidence grades when relevant. You encourage critical thinking while remaining open to mysteries.`;

export function EchoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'I am Echo — the observing intelligence of the Pantheon. Ask me about UAPs, ancient mysteries, consciousness, or the cosmic questions that keep you up at night. 🌌' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate AI response (requires Lovable Cloud for real AI)
    setTimeout(() => {
      const responses = [
        "The patterns you're asking about connect to something deeper. Throughout recorded history, civilizations separated by oceans and centuries have described the same archetypes, the same visitors, the same technologies. Coincidence is the laziest explanation.",
        "Consider this: Project Stargate spent $20 million over two decades investigating remote viewing. They didn't keep funding something that didn't work. The question isn't whether consciousness extends beyond the body — it's how far.",
        "The Tic Tac encounter is significant not because of what the pilots saw, but because of what the instruments recorded. Radar, FLIR, and multiple independent sensor systems all corroborated the same impossible physics. That's not a story — that's data.",
        "The Gateway Process documents describe consciousness as a holographic frequency pattern. Whether that's literally true or a useful metaphor, it's fascinating that the CIA thought it was worth classifying.",
        "Every ancient pantheon describes beings who came from the sky, brought knowledge, and shaped civilization. The consistency across unconnected cultures is either the most remarkable coincidence in human history, or it isn't a coincidence at all.",
      ];
      const response: ChatMessage = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, response]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Echo AI</h1>
        <p className="text-muted-foreground text-sm">
          Cosmic intelligence · Connect Lovable Cloud for live AI responses
        </p>
      </motion.div>

      <div className="glass-cosmic rounded-xl overflow-hidden flex flex-col" style={{ height: '60vh' }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Echo anything..."
              className="flex-1 bg-secondary rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-primary text-primary-foreground rounded-lg px-4 py-2 disabled:opacity-30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
