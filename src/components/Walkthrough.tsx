import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'pantheon_walkthrough_seen';

interface Step {
  title: string;
  body: string;
  emoji: string;
}

const STEPS: Step[] = [
  {
    emoji: '👁️',
    title: 'Welcome, Starseed',
    body: "You've found Pantheon Observatory — a living archive of UAP cases, ancient gods, alien species, and the questions humanity was told to stop asking.",
  },
  {
    emoji: '⚡',
    title: 'Earn rank as you explore',
    body: 'Open dossiers, visit new pages, and watch the XP bar in the bottom-right. Every discovery moves you closer to Ascended.',
  },
  {
    emoji: '🪐',
    title: 'Six chambers of knowledge',
    body: 'Greek pantheon, alien codex, whistleblower vault, frequency lab, the 46 sealed videos, and Echo AI. Every entry is sourced.',
  },
  {
    emoji: '🔓',
    title: 'Higher ranks unlock more',
    body: 'Reach Adept (300 XP) for hidden lore. Reach Ascended (2000 XP) for the full vault. Sign in to start tracking.',
  },
  {
    emoji: '🚀',
    title: 'Begin the descent',
    body: 'Start anywhere — the timeline, the codex, or just ask Echo. The Observatory rewards curiosity.',
  },
];

export function Walkthrough() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Let the hero animate in first, without blocking the initial paint.
        const t = setTimeout(() => setOpen(true), 1800);
        return () => clearTimeout(t);
      }
    } catch {
      // Storage can be disabled in private browsing; the walkthrough still works this visit.
      const t = setTimeout(() => setOpen(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Dismissal remains effective for this render if storage is unavailable.
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else close();
  };

  const current = STEPS[step];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain bg-background/85 backdrop-blur-md px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
          onClick={close}
        >
          <motion.div
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="walkthrough-title"
            aria-describedby="walkthrough-description"
            className="glass-cosmic relative my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto overscroll-contain rounded-3xl border border-primary/30 p-5 sm:p-8"
          >
            <button
              onClick={close}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Skip walkthrough"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 pt-5 text-center sm:mb-6 sm:pt-0">
              <motion.div
                key={step}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-3 text-5xl sm:mb-4 sm:text-6xl"
                aria-hidden="true"
              >
                {current.emoji}
              </motion.div>
              <h2 id="walkthrough-title" className="mb-3 pr-6 text-xl font-bold text-foreground sm:pr-0 sm:text-2xl">{current.title}</h2>
              <p id="walkthrough-description" className="text-sm leading-relaxed text-muted-foreground sm:text-base">{current.body}</p>
            </div>

            <div className="mb-5 flex items-center justify-center gap-1.5" aria-hidden="true">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-primary' : 'w-1.5 bg-muted/50'}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={close}
                className="min-h-11 rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Skip tour
              </button>
              <button
                onClick={next}
                className="flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {step === STEPS.length - 1 ? (
                  <>
                    <Sparkles className="h-4 w-4" /> Begin
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
