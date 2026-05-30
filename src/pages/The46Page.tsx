import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Lock, Unlock, Clock, ExternalLink, FileText, Play, Folder, Users, Radio, Sparkles, Eye } from 'lucide-react';
import {
  vaultSlots,
  publicSlots,
  VAULT_LORE,
  ALREADY_PUBLIC_LORE,
  daysOverdue,
  type VaultSlot,
  type PublicSlot,
} from '@/data/the-46';
import { TikTokVoicesSection } from '@/components/the46/TikTokVoicesSection';
import { LiveDropsTicker } from '@/components/the46/LiveDropsTicker';
import { SkepticSpotlight } from '@/components/the46/SkepticSpotlight';
import { AudioSoundscapeAdmin } from '@/components/audio/AudioSoundscapeAdmin';
import { VaultSlotCard } from '@/components/the46/VaultSlotCard';
import { VaultSlotModal } from '@/components/the46/VaultSlotModal';
import { VideoEmbed } from '@/components/VideoEmbed';
import { useEchoXp } from '@/hooks/use-echo-xp';
import { SEO } from '@/components/SEO';

import letter1 from '@/assets/the-46/hegseth-letter-page-1.jpg';
import letter2 from '@/assets/the-46/hegseth-letter-page-2.jpg';
import letter3 from '@/assets/the-46/hegseth-letter-page-3.jpg';
import letter4 from '@/assets/the-46/hegseth-letter-page-4.jpg';
import letter5 from '@/assets/the-46/hegseth-letter-page-5.jpg';
import vaultHero from '@/assets/the-46/vault-hero.jpg';

const letterImages = [letter1, letter2, letter3, letter4, letter5];

type Tab = 'vault' | 'voices' | 'drops' | 'public' | 'soundscape';

const TABS: { id: Tab; label: string; icon: typeof Folder; hint: string }[] = [
  { id: 'vault',      label: 'Vault',      icon: Folder,    hint: '46 demanded files' },
  { id: 'voices',     label: 'Voices',     icon: Users,     hint: 'TikTok disclosure creators' },
  { id: 'drops',      label: 'Live Drops', icon: Radio,     hint: 'Real-time updates' },
  { id: 'public',     label: 'Already Public', icon: Eye,   hint: 'Context videos' },
  { id: 'soundscape', label: 'Soundscape', icon: Sparkles,  hint: 'Admin: generate ambient' },
];

function tabFromHash(hash: string): Tab {
  const clean = hash.replace('#', '') as Tab;
  return (TABS.find(t => t.id === clean)?.id) ?? 'vault';
}

export function The46Page() {
  const [selected, setSelected] = useState<VaultSlot | null>(null);
  const [activePublic, setActivePublic] = useState<PublicSlot | null>(null);
  const { trackVaultOpen } = useEchoXp();
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>(() => tabFromHash(location.hash));

  useEffect(() => {
    setTab(tabFromHash(location.hash));
  }, [location.hash]);

  const setTabAndHash = (next: Tab) => {
    setTab(next);
    navigate({ hash: next === 'vault' ? '' : next }, { replace: false });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelect = (slot: VaultSlot) => {
    setSelected(slot);
    if (slot.status === 'unlocked') trackVaultOpen(String(slot.id));
  };

  const unlockedCount = vaultSlots.filter((s) => s.status === 'unlocked').length;
  const pendingCount = vaultSlots.filter((s) => s.status === 'pending-disclosure').length;
  const overdue = daysOverdue();

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto">
      <SEO
        title="The 46 — Pending Disclosure Vault"
        description={`The 46-slot disclosure vault: locked files, expired demands, and the videos already public. ${overdue} days overdue.`}
        canonical="/the-46"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs uppercase tracking-[3px] text-amber-300 mb-4">
          <Clock className="w-3 h-3" />
          Demand Expired · {overdue} Days Overdue
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-b from-foreground via-foreground to-primary/50 bg-clip-text text-transparent mb-3">
          {VAULT_LORE.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          {VAULT_LORE.subtitle}
        </p>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 max-w-md mx-auto">
        <div className="glass-cosmic rounded-xl p-3 text-center border border-amber-500/30">
          <Clock className="w-4 h-4 mx-auto mb-1 text-amber-400" />
          <div className="text-2xl font-bold text-amber-300">{pendingCount}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pending</div>
        </div>
        <div className="glass-cosmic rounded-xl p-3 text-center border border-accent-neon/30">
          <Unlock className="w-4 h-4 mx-auto mb-1 text-accent-neon" />
          <div className="text-2xl font-bold text-accent-neon">{unlockedCount}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Disclosed</div>
        </div>
        <div className="glass-cosmic rounded-xl p-3 text-center border border-primary/30">
          <Lock className="w-4 h-4 mx-auto mb-1 text-primary" />
          <div className="text-2xl font-bold text-primary">46</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-6 bg-background/85 backdrop-blur-xl border-y border-border/40">
        <div
          role="tablist"
          aria-label="The 46 sections"
          className="flex gap-1.5 overflow-x-auto no-scrollbar"
        >
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTabAndHash(t.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] uppercase tracking-[2px] font-semibold border transition-colors ${
                  active
                    ? 'border-primary/60 bg-primary/15 text-primary-foreground shadow-[0_0_18px_-4px_hsl(var(--primary))]'
                    : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                }`}
                title={t.hint}
              >
                <t.icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* VAULT TAB */}
      {tab === 'vault' && (
        <motion.section
          key="vault"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Lore + Letter */}
          <div className="glass-cosmic rounded-2xl p-5 sm:p-6 mb-6 border border-amber-500/30">
            <div className="text-[10px] uppercase tracking-[3px] text-amber-300 mb-2">
              Congressional Letter · March 31, 2026
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed mb-4">{VAULT_LORE.intro}</p>
            <div className="text-xs text-muted-foreground border-l-2 border-amber-500/50 pl-3 mb-4">
              {VAULT_LORE.requestedBy}
            </div>
            <a
              href={VAULT_LORE.letterUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Read the original letter (oversight.house.gov)
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Letter screenshots */}
          <div className="mb-8">
            <div className="text-[10px] uppercase tracking-[3px] text-muted-foreground mb-3 text-center">
              Source Proof — The Letter Pages
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {letterImages.map((img, i) => (
                <a
                  key={i}
                  href={img}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors group"
                >
                  <img
                    src={img}
                    alt={`Hegseth letter page ${i + 1}`}
                    className="w-full aspect-[9/16] object-cover group-hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Vault grid — 46 slots */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[3px] text-muted-foreground">
              The 46 Files · Demanded
            </h2>
            <div className="text-[10px] font-mono text-amber-300">DUE: {VAULT_LORE.dueDate}</div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-2 sm:gap-3">
            {vaultSlots.map((slot, i) => (
              <VaultSlotCard
                key={slot.id}
                slot={slot}
                index={i}
                onClick={() => handleSelect(slot)}
              />
            ))}
          </div>

          <div className="mt-10">
            <SkepticSpotlight />
          </div>
        </motion.section>
      )}

      {/* VOICES TAB */}
      {tab === 'voices' && (
        <motion.section
          key="voices"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <TikTokVoicesSection />
        </motion.section>
      )}

      {/* LIVE DROPS TAB */}
      {tab === 'drops' && (
        <motion.section
          key="drops"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <LiveDropsTicker />
        </motion.section>
      )}

      {/* ALREADY PUBLIC TAB */}
      {tab === 'public' && (
        <motion.section
          key="public"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-neon/10 border border-accent-neon/30 text-xs uppercase tracking-[3px] text-accent-neon mb-3">
              <Unlock className="w-3 h-3" />
              For Context — Not Part of the 46
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {ALREADY_PUBLIC_LORE.title}
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {ALREADY_PUBLIC_LORE.intro}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {publicSlots.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePublic(p)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-accent-neon/40 bg-gradient-to-br from-accent-neon/10 via-primary/5 to-black hover:border-accent-neon transition-colors"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                  <Play className="w-7 h-7 text-accent-neon fill-accent-neon" />
                  <span className="text-xs font-bold text-foreground">{p.codename}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">{p.date}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.section>
      )}

      {/* SOUNDSCAPE TAB */}
      {tab === 'soundscape' && (
        <motion.section
          key="soundscape"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <AudioSoundscapeAdmin />
        </motion.section>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12 text-xs text-muted-foreground/70 max-w-md mx-auto"
      >
        <p>
          Tap any slot to inspect. Codenames, dates, and platforms transcribed verbatim from the
          congressional letter.
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-wider text-primary/60">
          4 + 6 = 10 · DIVINE COMPLETION · ECHO FREQUENCY
        </p>
      </motion.div>

      <VaultSlotModal slot={selected} onClose={() => setSelected(null)} />

      {/* Public slot modal */}
      {activePublic && (
        <div
          onClick={() => setActivePublic(null)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-cosmic rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-accent-neon/40 p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{activePublic.codename}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {activePublic.date} ·{' '}
                  <span className="text-accent-neon">{activePublic.classification}</span>
                </p>
              </div>
              <button
                onClick={() => setActivePublic(null)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <VideoEmbed
              video={{
                platform: 'youtube',
                id: activePublic.videoEmbedId,
                title: activePublic.codename,
              }}
            />
            <p className="text-sm text-foreground/90 leading-relaxed">{activePublic.summary}</p>
            <p className="text-xs text-muted-foreground border-t border-border pt-3">
              {activePublic.source}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
