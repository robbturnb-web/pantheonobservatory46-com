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
    body: 'You\'ve found Pantheon Observatory — a living archive of UAP cases, ancient gods, alien species, and the questions humanity was told to stop asking.',
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
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      // small delay so the hero animates in first
      const t = setTimeout(() => setOpen(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        localStorage.setItem(STORAGE_KEY, 'true');
        setOpen(false);
      }
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/85 backdrop-blur-md"
          onClick={close}
        >
          <motion.div
            initial={{ y: 30, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="walkthrough-title"
            aria-describedby="walkthrough-description"
            className="glass-cosmic rounded-3xl p-6 sm:p-8 max-w-md w-full border border-primary/30 relative"
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1.5 rounded-lg transition-colors"
              aria-label="Skip walkthrough"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <motion.div
                key={step}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl mb-4"
              >
                {current.emoji}
              </motion.div>
              <h2 id="walkthrough-title" className="text-2xl font-bold text-foreground mb-3">{current.title}</h2>
              <p id="walkthrough-description" className="text-muted-foreground leading-relaxed">{current.body}</p>
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-5" aria-hidden="true">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-primary' : 'w-1.5 bg-muted/50'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={close}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip tour
              </button>
              <button
                onClick={next}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                {step === STEPS.length - 1 ? (
                  <>
                    <Sparkles className="w-4 h-4" /> Begin
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-4 h-4" />
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
