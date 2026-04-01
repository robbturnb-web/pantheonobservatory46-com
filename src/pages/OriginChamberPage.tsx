import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, starSeedArchetypes, calculateArchetype } from '../data/starseed-archetypes';
import type { StarSeedId } from '../types';
import { RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export function OriginChamberPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<StarSeedId | null>(null);
  const [revealing, setRevealing] = useState(false);

  const question = quizQuestions[currentQ];
  const archetype = result ? starSeedArchetypes.find((a) => a.id === result) : null;
  const progress = ((currentQ + 1) / quizQuestions.length) * 100;

  const handleSelect = (label: string) => {
    const current = answers[question.id] || [];
    const updated = current.includes(label)
      ? current.filter((l) => l !== label)
      : [...current, label];
    setAnswers({ ...answers, [question.id]: updated });
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setRevealing(true);
      setTimeout(() => {
        setResult(calculateArchetype(answers));
        setRevealing(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Origin Chamber</h1>
        <p className="text-muted-foreground text-lg">
          {quizQuestions.length} questions. {starSeedArchetypes.length} possible archetypes. One cosmic truth.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {revealing ? (
          <motion.div
            key="revealing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-cosmic rounded-2xl p-12 text-center"
          >
            <div className="relative inline-block">
              <Sparkles className="w-16 h-16 text-primary cosmic-float" />
              <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full" />
            </div>
            <p className="text-xl text-foreground mt-6 font-semibold">Scanning the cosmos...</p>
            <p className="text-sm text-muted-foreground mt-2">Analyzing your frequency pattern</p>
            <div className="mt-8 h-1 bg-secondary rounded-full overflow-hidden max-w-xs mx-auto">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        ) : !result ? (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-cosmic rounded-2xl p-8"
          >
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Question {currentQ + 1} of {quizQuestions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">{question.text}</h2>

            <div className="space-y-3 mb-8">
              {question.options.map((opt) => {
                const selected = (answers[question.id] || []).includes(opt.label);
                return (
                  <motion.button
                    key={opt.label}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.label)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm ${
                      selected
                        ? 'border-primary bg-primary/10 text-foreground shadow-lg shadow-primary/10'
                        : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                      }`}>
                        {selected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </div>
                      {opt.label}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleNext}
                disabled={!(answers[question.id]?.length > 0)}
                className="flex items-center gap-1 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold disabled:opacity-30 hover:bg-primary/90 transition-colors"
              >
                {currentQ < quizQuestions.length - 1 ? (
                  <>Next <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>Reveal <Sparkles className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.div>
        ) : archetype ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="rounded-2xl overflow-hidden relative"
          >
            <div className="absolute inset-0" style={{ background: archetype.cosmicBg }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

            <div className="relative z-10 p-8 sm:p-12 text-center">
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2, damping: 15 }}
                className="text-7xl block mb-6"
              >
                {archetype.symbol}
              </motion.span>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Your Archetype</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">{archetype.name}</h2>
                <p className="text-xl font-semibold mb-8" style={{ color: archetype.accentColor }}>
                  {archetype.subtitle}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-left space-y-3 mb-8 max-w-md mx-auto"
              >
                {archetype.coreTraits.map((trait, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span style={{ color: archetype.accentColor }} className="mt-0.5">✦</span>
                    <p className="text-sm text-foreground">{trait}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="border-l-2 pl-4 text-sm text-muted-foreground italic text-left mb-10 max-w-md mx-auto"
                style={{ borderColor: archetype.accentColor }}
              >
                {archetype.missionStatement}
              </motion.blockquote>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-foreground rounded-xl text-sm font-medium hover:bg-white/20 transition-colors border border-white/10"
              >
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
