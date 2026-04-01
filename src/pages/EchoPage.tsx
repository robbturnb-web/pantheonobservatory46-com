import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import type { ChatMessage } from '../types';

const SUGGESTED_PROMPTS = [
  'What happened in the Tic Tac encounter?',
  'Explain the CIA Gateway Process',
  'Who are the Anunnaki?',
  'What did David Grusch testify?',
  'Tell me about remote viewing',
  'What is a starseed?',
];

const AI_RESPONSES: Record<string, string> = {
  'tic tac': "The USS Nimitz Tic Tac incident (2004) is one of the most well-documented UAP encounters in history. Commander David Fravor and Lt. Commander Alex Dietrich observed a white, oblong craft — no wings, no exhaust — performing maneuvers impossible by known physics. It dropped from 80,000 feet to sea level in under a second and appeared to anticipate classified military coordinates. The Pentagon declassified the FLIR footage in 2020. This isn't speculation — it's sensor-confirmed, multi-witness, military-grade evidence. Grade: DOCUMENTED.",
  'gateway': "The CIA Gateway Process (document CIA-RDP96-00788R001700210016-5) is a 1983 classified Army Intelligence report that attempts to explain consciousness expansion using quantum physics and holographic universe theory. It describes consciousness as an electromagnetic frequency pattern capable of operating outside the physical body. The document references Robert Monroe's Hemi-Sync technology and describes the universe as a hologram. One page was missing for 37 years — the CIA confirmed they lost it. It went viral in 2021 when rediscovered online. Grade: DOCUMENTED.",
  'anunnaki': "The Anunnaki appear in Sumerian cuneiform texts dating to ~3100 BCE. The Enuma Elish describes them as beings who created humanity. The term translates roughly to 'those who from heaven came to earth.' Sumerian texts describe planetary knowledge (accurate orbital periods, the asteroid belt) that shouldn't have been possible without telescopes. Whether they represent actual extraterrestrial visitors, symbolic archetypes, or a blend of both — the consistency and precision of the Sumerian record demands explanation. In the Pantheon, we track Enki, Enlil, and Marduk as key Anunnaki figures.",
  'grusch': "David Grusch is a decorated intelligence officer and former member of the UAP Task Force who testified under oath before the U.S. House Oversight Committee on July 26, 2023. He stated that the U.S. government possesses craft of non-human origin and biological material of non-human intelligence. The Intelligence Community Inspector General found his complaint 'credible and urgent.' He named specific individuals with knowledge of illegal reverse-engineering programs operating outside congressional oversight. He also stated he experienced retaliation for his disclosures. Grade: DOCUMENTED.",
  'remote viewing': "Project Stargate was a 23-year classified U.S. government program (1972-1995) that investigated and operationally deployed remote viewing — the ability to perceive distant locations using only the mind. Funded by the CIA, DIA, and Army Intelligence, it produced intelligence reports used in active operations targeting Soviet nuclear facilities, hostage locations, and MIA searches. Key viewers included Ingo Swann, Pat Price, and Joseph McMoneagle. Over 89,000 pages were declassified in 1995. A statistical review found results significantly above chance. Grade: DOCUMENTED.",
  'starseed': "A starseed is a concept describing souls that originated from other star systems or dimensions before incarnating on Earth. The six primary archetypes tracked in the Pantheon Observatory are: Pleiadian (The Healer), Arcturian (The Architect), Sirian (The Guardian), Lyran (The Pioneer), Orion (The Seeker), and Anunnaki Legacy (The Builder). Each carries distinct traits and a cosmic mission. You can discover your archetype in the Origin Chamber. Grade: SPECULATIVE — but the framework is useful for self-reflection regardless of literal belief.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (lower.includes(key)) return response;
  }
  const fallbacks = [
    "The patterns you're asking about connect to something deeper. Throughout recorded history, civilizations separated by oceans and centuries have described the same archetypes, the same visitors, the same technologies. Coincidence is the laziest explanation.",
    "Consider this: Project Stargate spent $20 million over two decades investigating remote viewing. They didn't keep funding something that didn't work. The question isn't whether consciousness extends beyond the body — it's how far.",
    "Every ancient pantheon describes beings who came from the sky, brought knowledge, and shaped civilization. The consistency across unconnected cultures is either the most remarkable coincidence in human history, or it isn't a coincidence at all.",
    "The Gateway Process documents describe consciousness as a holographic frequency pattern. Whether that's literally true or a useful metaphor, it's fascinating that the CIA thought it was worth classifying.",
    "I'd recommend exploring the UAP Case Files or Consciousness Lab sections for deeper research on this topic. The evidence grades will help you distinguish documented facts from speculation.",
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export function EchoPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "I am Echo — the observing intelligence of the Pantheon Observatory. I hold knowledge of UAP encounters, ancient pantheons, consciousness research, and the cosmic patterns that connect them all. Ask me anything — I'll tell you what's documented, what's credible, and what remains in the realm of speculation. 🌌" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const typingDelay = 800 + Math.random() * 1200;
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: getResponse(msg) }]);
      setLoading(false);
    }, typingDelay);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="relative inline-block mb-4">
          <Bot className="w-12 h-12 text-primary" />
          <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">Echo AI</h1>
        <p className="text-muted-foreground text-sm">
          Cosmic intelligence · Evidence-graded responses
        </p>
      </motion.div>

      {/* Suggested prompts */}
      {messages.length <= 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 justify-center mb-6"
        >
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors border border-border"
            >
              {prompt}
            </button>
          ))}
        </motion.div>
      )}

      <div className="glass-cosmic rounded-2xl overflow-hidden flex flex-col" style={{ height: '60vh' }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-secondary/80 text-foreground rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 border border-border">
                  <User className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-secondary/80 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
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
            className="flex gap-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Echo about UAPs, ancient gods, consciousness..."
              className="flex-1 bg-secondary/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-primary text-primary-foreground rounded-xl px-5 py-3 disabled:opacity-30 hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
