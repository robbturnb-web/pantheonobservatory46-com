import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function EchoTypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5, transition: { duration: 0.15 } }}
      className="flex gap-3"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30"
      >
        <Sparkles className="w-4 h-4 text-primary" />
      </motion.div>
      <div className="bg-secondary/80 rounded-2xl rounded-bl-md px-5 py-3.5">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60"
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
          <motion.span
            className="ml-2 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Echo is thinking...
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
