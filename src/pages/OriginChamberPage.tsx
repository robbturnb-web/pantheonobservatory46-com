import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, starSeedArchetypes, calculateArchetype } from '../data/starseed-archetypes';
import type { StarSeedId } from '../types';

export function OriginChamberPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [result, setResult] = useState<StarSeedId | null>(null);

  const question = quizQuestions[currentQ];
  const archetype = result ? starSeedArchetypes.find((a) => a.id === result) : null;

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
      setResult(calculateArchetype(answers));
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Origin Chamber</h1>
        <p className="text-muted-foreground">Discover your starseed archetype.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={`q-${currentQ}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-cosmic rounded-xl p-8"
          >
            <div className="mb-6">
              <span className="text-xs text-primary font-mono">
                Question {currentQ + 1} of {quizQuestions.length}
              </span>
              <h2 className="text-xl font-bold text-foreground mt-2">{question.text}</h2>
            </div>

            <div className="space-y-3 mb-8">
              {question.options.map((opt) => {
                const selected = (answers[question.id] || []).includes(opt.label);
                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                      selected
                        ? 'border-primary bg-accent text-foreground'
                        : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="px-4 py-2 text-sm text-muted-foreground disabled:opacity-30"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!(answers[question.id]?.length > 0)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium disabled:opacity-30"
              >
                {currentQ < quizQuestions.length - 1 ? 'Next' : 'Reveal'}
              </button>
            </div>
          </motion.div>
        ) : archetype ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-8 text-center"
            style={{ background: archetype.cosmicBg }}
          >
            <span className="text-6xl mb-4 block">{archetype.symbol}</span>
            <h2 className="text-3xl font-bold text-foreground mb-1">{archetype.name}</h2>
            <p className="text-lg mb-6" style={{ color: archetype.accentColor }}>{archetype.subtitle}</p>

            <div className="text-left space-y-3 mb-6">
              {archetype.coreTraits.map((trait, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ color: archetype.accentColor }}>✦</span>
                  <p className="text-sm text-foreground">{trait}</p>
                </div>
              ))}
            </div>

            <blockquote className="border-l-2 pl-4 text-sm text-muted-foreground italic text-left mb-8"
              style={{ borderColor: archetype.accentColor }}>
              {archetype.missionStatement}
            </blockquote>

            <button
              onClick={handleReset}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
            >
              Retake Quiz
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
