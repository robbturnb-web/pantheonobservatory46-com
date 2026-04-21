import { motion } from 'framer-motion';
import { Lock, Play, Eye, Clock } from 'lucide-react';
import type { VaultSlot } from '@/data/the-46';

interface Props {
  slot: VaultSlot;
  index: number;
  onClick: () => void;
}

export function VaultSlotCard({ slot, index, onClick }: Props) {
  const isLocked = slot.status === 'locked';
  const isPending = slot.status === 'pending-disclosure';
  const isUnlocked = slot.status === 'unlocked';

  const borderClass = isUnlocked
    ? 'border-accent-neon/50 bg-black/40 hover:border-accent-neon'
    : isPending
    ? 'border-amber-500/40 bg-black/60 hover:border-amber-400'
    : 'border-border bg-black/60 hover:border-primary/40';

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.012, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`relative aspect-square rounded-xl overflow-hidden border ${borderClass} transition-colors group cursor-pointer`}
      aria-label={`Slot ${slot.id} — ${slot.codename}`}
      title={slot.codename}
    >
      {/* Static / shimmer for locked & pending */}
      {(isLocked || isPending) && (
        <>
          <div
            className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 3px)',
            }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.1, 0.4, 0.1, 0.25, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: isPending
                ? 'radial-gradient(circle at 30% 40%, rgba(245,158,11,0.25), transparent 60%), radial-gradient(circle at 70% 70%, rgba(220,38,38,0.15), transparent 60%)'
                : 'radial-gradient(circle at 30% 40%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(circle at 70% 70%, rgba(34,197,94,0.15), transparent 60%)',
            }}
          />
          <motion.div
            className={`absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${
              isPending ? 'via-amber-400/70' : 'via-primary/60'
            } to-transparent pointer-events-none`}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3 + (slot.id % 5) * 0.4, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      {/* Unlocked thumbnail */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent-neon/20 via-primary/10 to-black" />
      )}

      {/* Center icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        {isUnlocked ? (
          <>
            <Play className="w-6 h-6 text-accent-neon fill-accent-neon" />
            <span className="text-[10px] sm:text-xs font-mono text-accent-neon tracking-wider">
              #{String(slot.id).padStart(2, '0')}
            </span>
          </>
        ) : isPending ? (
          <>
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400/90 group-hover:text-amber-300 transition-colors" />
            <span className="text-[10px] sm:text-xs font-mono text-amber-400/90 tracking-wider">
              #{String(slot.id).padStart(2, '0')}
            </span>
          </>
        ) : (
          <>
            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-wider">
              #{String(slot.id).padStart(2, '0')}
            </span>
          </>
        )}
      </div>

      {/* Bottom label */}
      {(isUnlocked || isPending) && slot.codename && (
        <div className="absolute inset-x-0 bottom-0 px-1 py-0.5 bg-black/80 backdrop-blur-sm">
          <p
            className={`text-[8px] sm:text-[9px] font-bold truncate text-center tracking-tight ${
              isUnlocked ? 'text-foreground' : 'text-amber-100/80'
            }`}
          >
            {slot.codename}
          </p>
        </div>
      )}

      {/* Corner chip */}
      <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-black/60 border border-border">
        <Eye className="w-2.5 h-2.5 text-muted-foreground/60" />
      </div>
    </motion.button>
  );
}
