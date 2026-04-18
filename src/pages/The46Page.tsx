import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Eye } from 'lucide-react';
import { vaultSlots, VAULT_LORE, type VaultSlot } from '@/data/the-46';
import { VaultSlotCard } from '@/components/the46/VaultSlotCard';
import { VaultSlotModal } from '@/components/the46/VaultSlotModal';

export function The46Page() {
  const [selected, setSelected] = useState<VaultSlot | null>(null);

  const unlockedCount = vaultSlots.filter((s) => s.status === 'unlocked').length;
  const lockedCount = 46 - unlockedCount;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs uppercase tracking-[3px] text-primary mb-4">
          <Eye className="w-3 h-3" />
          The Vault
        </div>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight bg-gradient-to-b from-foreground via-foreground to-primary/50 bg-clip-text text-transparent mb-4">
          {VAULT_LORE.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{VAULT_LORE.subtitle}</p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-3 mb-8 max-w-md mx-auto"
      >
        <div className="glass-cosmic rounded-xl p-3 text-center border border-border">
          <Lock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <div className="text-2xl font-bold text-foreground">{lockedCount}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Sealed</div>
        </div>
        <div className="glass-cosmic rounded-xl p-3 text-center border border-accent-neon/30">
          <Unlock className="w-4 h-4 mx-auto mb-1 text-accent-neon" />
          <div className="text-2xl font-bold text-accent-neon">{unlockedCount}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Revealed</div>
        </div>
        <div className="glass-cosmic rounded-xl p-3 text-center border border-primary/30">
          <div className="text-2xl font-bold text-primary mt-1">46</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
        </div>
      </motion.div>

      {/* Lore */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-cosmic rounded-2xl p-5 sm:p-6 mb-10 border border-border"
      >
        <p className="text-sm text-foreground/85 leading-relaxed mb-3">{VAULT_LORE.intro}</p>
        <div className="text-[10px] uppercase tracking-wider text-yellow-400/80 border-l-2 border-yellow-400/60 pl-3">
          {VAULT_LORE.warning}
        </div>
      </motion.div>

      {/* Vault grid — 46 slots */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-2 sm:gap-3">
        {vaultSlots.map((slot, i) => (
          <VaultSlotCard key={slot.id} slot={slot} index={i} onClick={() => setSelected(slot)} />
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-12 text-xs text-muted-foreground/70 max-w-md mx-auto"
      >
        <p>Tap any slot to inspect. Revealed slots play the original footage. Sealed slots remain in stasis until disclosure.</p>
        <p className="mt-2 font-mono text-[10px] tracking-wider text-primary/60">
          4 + 6 = 10 · DIVINE COMPLETION · ECHO FREQUENCY
        </p>
      </motion.div>

      <VaultSlotModal slot={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
