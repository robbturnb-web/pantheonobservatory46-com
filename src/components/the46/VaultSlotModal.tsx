import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Calendar, FileText } from 'lucide-react';
import { VideoEmbed } from '@/components/VideoEmbed';
import type { VaultSlot } from '@/data/the-46';

interface Props {
  slot: VaultSlot | null;
  onClose: () => void;
}

export function VaultSlotModal({ slot, onClose }: Props) {
  return (
    <AnimatePresence>
      {slot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 22 }}
            className="glass-cosmic rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-primary/30"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-background/90 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">
                  SLOT #{String(slot.id).padStart(2, '0')} / 46
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider ${
                  slot.status === 'locked'
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-accent-neon/20 text-accent-neon'
                }`}>
                  {slot.status === 'locked' ? 'SEALED' : 'REVEALED'}
                </span>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {slot.status === 'locked' ? (
                <div className="text-center py-10 space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="inline-block"
                  >
                    <Lock className="w-16 h-16 text-primary mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground">CLASSIFIED</h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                    This slot is sealed. It is reserved for one of the rumored 46 pieces of undisclosed visual evidence. When authenticated disclosure occurs, it will unlock here with the original footage, source, and analysis.
                  </p>
                  <div className="pt-2 text-[10px] uppercase tracking-[3px] text-muted-foreground/60">
                    Awaiting Revelation
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-1">{slot.codename}</h2>
                    {slot.date && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {slot.date}
                        {slot.classification && (
                          <span className="ml-2 px-2 py-0.5 rounded bg-accent-neon/10 text-accent-neon text-[10px] tracking-wide">
                            {slot.classification}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {slot.videoEmbedId && (
                    <VideoEmbed video={{ platform: 'youtube', id: slot.videoEmbedId, title: slot.codename || 'Disclosed footage' }} />
                  )}

                  {slot.summary && (
                    <p className="text-sm text-foreground/90 leading-relaxed">{slot.summary}</p>
                  )}

                  {slot.source && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground border-t border-border pt-3">
                      <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{slot.source}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
