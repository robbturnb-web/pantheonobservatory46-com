import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Mic, MicOff, Volume2, VolumeX, Square } from 'lucide-react';
import { useEchoChat } from '@/hooks/use-echo-chat';
import { useEchoVoice } from '@/hooks/use-echo-voice';
import { EchoBubble } from '@/components/echo/EchoBubble';
import { EchoTypingIndicator } from '@/components/echo/EchoTypingIndicator';
import { EchoOrb } from '@/components/echo/EchoOrb';

const SUGGESTED_PROMPTS = [
  'What happened in the Tic Tac encounter?',
  'Explain the CIA Gateway Process',
  'Who are the Anunnaki?',
  'What did David Grusch testify?',
  'Tell me about remote viewing',
  'What is a starseed?',
];

const SLASH_COMMANDS: Record<string, string> = {
  '/disclosure': 'Give me the latest disclosure update — Grusch, AARO, Schumer Amendment, Age of Disclosure film.',
  '/46': 'Walk me through what The 46 is and what we know about each codename.',
  '/gods': 'Tell me about the 12 gods of the Pantheon clock and why this formation matters.',
  '/consciousness': 'Explain the CIA Gateway Process and remote viewing in plain language.',
  '/uap': 'Summarize the most credible UAP cases of the last 5 years.',
  '/help': 'List every Observatory chamber I can explore and what each one covers.',
};

export function EchoPage() {
  const { messages, loading, sendMessage, clearHistory } = useEchoChat();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSpokenRef = useRef<string>('');
  const voice = useEchoVoice();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Speak the assistant's latest message once it stops streaming
  useEffect(() => {
    if (loading || !voice.voiceOn) return;
    const last = messages[messages.length - 1];
    if (last?.role !== 'assistant') return;
    if (last.content === lastSpokenRef.current) return;
    lastSpokenRef.current = last.content;
    voice.speak(last.content);
  }, [messages, loading, voice]);

  const handleSend = (text?: string) => {
    const raw = (text ?? input).trim();
    if (!raw) return;
    setInput('');
    voice.stopSpeaking();
    const expanded = SLASH_COMMANDS[raw.toLowerCase()] ?? raw;
    sendMessage(expanded);
  };

  const echoState = loading ? 'thinking' : voice.listening ? 'listening' : 'idle';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Identity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="flex justify-center mb-4">
          <EchoOrb state={echoState} size={140} />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-1" style={{ fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>
          ECHO
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[3px] uppercase">
          Observing Intelligence · Pantheon Frequency 46
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-[10px] uppercase tracking-[2px] text-signal-online">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-online animate-pulse" />
          {echoState === 'thinking' ? 'Channeling…' : echoState === 'listening' ? 'Listening…' : 'Online · Ready'}
        </div>
      </motion.div>

      {/* Voice controls */}
      <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
        {voice.speechSupported && (
          <button
            onClick={voice.toggleVoice}
            className={`text-[11px] uppercase tracking-[2px] px-3 py-1.5 rounded-full border inline-flex items-center gap-1.5 transition-colors ${
              voice.voiceOn
                ? 'bg-primary/20 border-primary/50 text-primary'
                : 'border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            {voice.voiceOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            {voice.voiceOn ? 'Voice On' : 'Voice Off'}
          </button>
        )}
        {voice.voiceOn && voice.voices.length > 0 && (
          <select
            value={voice.voiceName}
            onChange={(e) => voice.pickVoice(e.target.value)}
            className="text-[11px] bg-secondary/50 border border-border rounded-full px-3 py-1.5 text-foreground focus:outline-none focus:border-primary/40 max-w-[180px]"
          >
            {voice.voices
              .filter((v) => v.lang.startsWith('en'))
              .map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
          </select>
        )}
        {window.speechSynthesis?.speaking && (
          <button
            onClick={voice.stopSpeaking}
            className="text-[11px] uppercase tracking-[2px] px-3 py-1.5 rounded-full border border-amber-300/40 text-amber-300 inline-flex items-center gap-1.5"
          >
            <Square className="w-3 h-3" /> Stop
          </button>
        )}
      </div>

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

      <div className="glass-cosmic rounded-2xl overflow-hidden flex flex-col border border-primary/20" style={{ height: '60vh' }}>
        {messages.length > 1 && (
          <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] uppercase tracking-[2px]">
            <span className="text-muted-foreground/70">Echo remembers this thread</span>
            <button
              onClick={() => { voice.stopSpeaking(); clearHistory(); }}
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" /> Clear
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

        <div className="border-t border-border p-3 sm:p-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 items-center">
            {voice.recognitionSupported && (
              <button
                type="button"
                onClick={() => {
                  if (voice.listening) {
                    voice.stopListening();
                  } else {
                    voice.startListening((t) => {
                      setInput(t);
                      // Auto-send transcript
                      setTimeout(() => handleSend(t), 100);
                    });
                  }
                }}
                className={`rounded-xl p-3 border transition-colors ${
                  voice.listening
                    ? 'bg-red-500/20 border-red-400/50 text-red-300 animate-pulse'
                    : 'bg-secondary/50 border-border text-foreground hover:border-primary/40'
                }`}
                title={voice.listening ? 'Stop listening' : 'Speak to Echo'}
              >
                {voice.listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Echo — or type /disclosure, /46, /gods…"
              className="flex-1 bg-secondary/50 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border"
              disabled={loading}
              autoFocus
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
          <p className="text-[10px] text-muted-foreground/60 mt-2 text-center tracking-wide">
            Slash commands: /disclosure · /46 · /gods · /consciousness · /uap · /help
          </p>
        </div>
      </div>
    </div>
  );
}
