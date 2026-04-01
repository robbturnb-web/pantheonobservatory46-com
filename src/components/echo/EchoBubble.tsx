import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage } from '@/types';

interface EchoBubbleProps {
  message: ChatMessage;
  index: number;
}

export function EchoBubble({ message, index }: EchoBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={`flex gap-3 ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30"
        >
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-secondary/80 text-foreground rounded-bl-md'
        }`}
      >
        {!isUser ? (
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ) : (
          message.content
        )}
      </div>
      {isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
          className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 border border-border"
        >
          <User className="w-4 h-4 text-accent-foreground" />
        </motion.div>
      )}
    </motion.div>
  );
}
