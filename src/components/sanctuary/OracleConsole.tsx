import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Sparkles, Send, Loader2, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

/**
 * The 46-Oracle Console.
 * User asks a question, Lovable AI streams an Echo-graded response.
 */
export function OracleConsole() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const ask = async () => {
    const q = question.trim();
    if (q.length < 5 || q.length > 500 || loading) return;

    setLoading(true);
    setError(null);
    setAnswer('');
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const url = `https://${projectRef}.supabase.co/functions/v1/oracle-46`;
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) throw new Error('Please sign in to consult the Oracle.');

      const resp = await fetch(url, {
        method: 'POST',
        signal: abortRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ question: q }),
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({ error: 'Oracle is silent.' }));
        throw new Error(errJson.error || `Oracle error: ${resp.status}`);
      }

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (!reader) throw new Error('No response stream from Oracle.');

      // Parse SSE chunks
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              setAnswer((prev) => prev + delta);
              outputRef.current?.scrollTo({
                top: outputRef.current.scrollHeight,
                behavior: 'smooth',
              });
            }
          } catch {
            // ignore non-JSON keepalives
          }
        }
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      setError(e instanceof Error ? e.message : 'Oracle is silent.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  return (
    <section className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[6px] text-primary/70 mb-3">
          <Sparkles className="w-3 h-3" />
          The 46-Oracle
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-3">
          Ask the Frequency
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Any question. The Oracle returns a graded answer — DOCUMENTED, CREDIBLE, or SPECULATIVE
          — read through the lens of the 46.
        </p>
      </motion.div>

      <div className="rounded-2xl border border-primary/30 bg-background/70 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_60px_-20px_hsl(var(--primary))]">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, 500))}
          onKeyDown={handleKey}
          placeholder="What do you want to know? (e.g. Why did the Pentagon really miss the deadline?)"
          rows={3}
          className="w-full bg-transparent border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:border-primary/60 transition-colors"
        />
        <div className="flex items-center justify-between mt-3 gap-3">
          <div className="text-[10px] uppercase tracking-[2px] text-muted-foreground">
            {question.length}/500 · Press Enter to ask
          </div>
          <button
            onClick={ask}
            disabled={loading || question.trim().length < 5}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-[2px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Channeling
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Ask
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {(answer || error) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 overflow-hidden"
            >
              <div
                ref={outputRef}
                className="rounded-lg border border-primary/20 bg-background/50 p-4 max-h-96 overflow-y-auto"
              >
                {error ? (
                  <div className="flex items-start gap-2 text-sm text-destructive">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none prose-headings:text-primary prose-strong:text-primary prose-em:text-primary/80">
                    <ReactMarkdown>{answer || '…'}</ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
