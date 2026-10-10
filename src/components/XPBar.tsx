import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEchoXp } from '@/hooks/use-echo-xp';

export function XPBar() {
  const { xp, rank, nextRank, progress, userId, loading } = useEchoXp();

  if (loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div className="glass-cosmic rounded-xl px-4 py-2.5 min-w-[180px]">
        {userId ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" style={{ color: rank.color }} />
                <span className="text-xs font-bold" style={{ color: rank.color }}>{rank.name}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">{xp} XP</span>
            </div>
            {nextRank && (
              <div className="relative h-1.5 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: rank.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            )}
            {nextRank && (
              <p className="text-[9px] text-muted-foreground/60 text-right">
                {nextRank.minXp - xp} XP to {nextRank.name}
              </p>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="text-[10px]">Sign in to track XP</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
