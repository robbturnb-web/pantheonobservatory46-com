import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Clock, FileSearch, Sparkles, Brain, Radio, Compass, MessageCircle, Shield,
  Globe, Telescope, Users, Pyramid, Lock, Skull, UserCircle2,
} from 'lucide-react';
import { vaultSlots, daysOverdue } from '@/data/the-46';
import { VideoStrip } from '@/components/VideoStrip';
import { CommandHeroBar } from '@/components/command/CommandHeroBar';
import { CommandDashboard } from '@/components/command/CommandDashboard';
import { FeaturedMystery } from '@/components/command/FeaturedMystery';
import { PantheonPathTeaser } from '@/components/command/PantheonPathTeaser';
import { SourceIntegrity } from '@/components/command/SourceIntegrity';

import silhouetteMale from '@/assets/missing/silhouette-male.jpg';
import silhouetteFemale from '@/assets/missing/silhouette-female.jpg';
import silhouetteMilitary from '@/assets/missing/silhouette-military.jpg';

const stats = [
  { label: 'UAP Cases', value: 6, icon: Shield },
  { label: 'Ancient Gods', value: 18, icon: Sparkles },
  { label: 'Whistleblowers', value: 8, icon: Shield },
  { label: 'Pyramids', value: 6, icon: Pyramid },
];

interface HubSection { to: string; icon: typeof Clock; title: string; desc: string }
interface Hub { key: string; label: string; tagline: string; accent: string; sections: HubSection[] }

const hubs: Hub[] = [
  {
    key: 'disclosure',
    label: 'Disclosure Files',
    tagline: 'Evidence-graded testimony, classified leaks, the long cover-up.',
    accent: '#ef4444',
    sections: [
      { to: '/uap', icon: FileSearch, title: 'UAP Case Files', desc: 'Military encounters, whistleblower testimony, and evidence-graded case studies.' },
      { to: '/whistleblowers', icon: Shield, title: 'Whistleblower Vault', desc: '8 evidence-graded profiles of those who risked everything for disclosure.' },
      { to: '/signals', icon: Radio, title: 'Signal Watch', desc: 'Credibility ratings for researchers and creators.' },
    ],
  },
  {
    key: 'ancient',
    label: 'Ancient Intelligence',
    tagline: 'The history humanity was told to forget.',
    accent: '#fcd34d',
    sections: [
      { to: '/timeline', icon: Clock, title: 'Cosmic Timeline', desc: 'From 300,000 BCE to congressional hearings.' },
      { to: '/gods', icon: Sparkles, title: 'Gods & Archetypes', desc: '18 deities across 6 pantheons.' },
      { to: '/shadow-pantheon', icon: Skull, title: 'Shadow Pantheon', desc: '10 dark archetypes for shadow integration work.' },
      { to: '/pyramids', icon: Pyramid, title: 'Pyramid Explorer', desc: '6 ancient structures with stellar alignments.' },
    ],
  },
  {
    key: 'cosmic',
    label: 'Cosmic Observatory',
    tagline: 'Look outward. The sky is no longer empty.',
    accent: '#67e8f9',
    sections: [
      { to: '/galaxy', icon: Globe, title: '3D Galaxy Explorer', desc: 'Fly through our solar system with Echo narration.' },
      { to: '/telescopes', icon: Telescope, title: 'Telescope Observatory', desc: 'Hubble to James Webb — every discovery.' },
      { to: '/species', icon: UserCircle2, title: 'Alien Species Codex', desc: '16 documented non-human intelligences.' },
    ],
  },
  {
    key: 'inner',
    label: 'Inner Work',
    tagline: 'The sky reflects the mind. Tune the receiver.',
    accent: '#34d399',
    sections: [
      { to: '/consciousness', icon: Brain, title: 'Consciousness Lab', desc: 'Project Stargate, the Gateway Process, NDEs.' },
      { to: '/origin', icon: Compass, title: 'Origin Chamber', desc: 'A 7-question quiz to discover your starseed lineage.' },
      { to: '/echoverse', icon: Users, title: 'Echoverse', desc: 'Real-time community hub across 5 channels.' },
      { to: '/echo', icon: MessageCircle, title: 'Echo AI', desc: 'Ask the cosmic intelligence anything.' },
    ],
  },
];

function AnimatedCounter({ value, duration = 1800 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const step = Math.max(1, Math.floor(duration / value));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [hasStarted, value, duration]);

  return <span ref={ref}>{count}</span>;
}

/**
 * Shared lower-page sections used by every homepage layout concept.
 * Keeps the swappable hero distinct while reusing the rest of the page.
 */
export function HomeLowerSections() {
  return (
    <>
      {/* COMMAND STATUS BAR */}
      <CommandHeroBar />

      {/* COMMAND DASHBOARD — 8-card portal grid */}
      <CommandDashboard />

      {/* FEATURED MYSTERY */}
      <FeaturedMystery />

      {/* STATS */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const [first, ...rest] = stat.label.split(' ');
            const second = rest.join(' ');
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-cosmic rounded-xl p-6 text-center"
              >
                <div className="relative w-fit mx-auto mb-3">
                  <div className="absolute inset-0 bg-yellow-400/20 blur-md rounded-full" />
                  <stat.icon className="w-6 h-6 text-yellow-400 relative" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-accent-neon neon-glow mb-1 tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-sm font-bold uppercase tracking-wider">
                  <span className="text-primary">{first}</span>
                  {second && <span className="text-yellow-400"> {second}</span>}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* THE 46 VAULT */}
      <section className="px-4 pb-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/the-46"
            className="block relative overflow-hidden rounded-2xl border border-primary/30 glass-cosmic group hover:border-primary/60 transition-colors"
          >
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent pointer-events-none"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative z-10 p-5 sm:p-6 flex items-center gap-4 sm:gap-6">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-black/60 border border-primary/40 flex items-center justify-center">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[3px] text-primary/80 mb-1">The Vault</div>
                <h3 className="text-lg sm:text-2xl font-black text-foreground tracking-tight">
                  THE 46 — Sealed Disclosure Vault
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                  {vaultSlots.filter((s) => s.status === 'unlocked').length} of 46 disclosed ·{' '}
                  <span className="text-amber-300 font-semibold">{daysOverdue()} days overdue</span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-2xl sm:text-3xl font-black text-accent-neon neon-glow">
                  {vaultSlots.filter((s) => s.status === 'unlocked').length}
                  <span className="text-muted-foreground/60 text-base">/46</span>
                </div>
                <div className="text-[9px] uppercase tracking-wider text-amber-300">Disclosed</div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* MISSING TEASER */}
      <section className="px-4 pb-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/missing"
            className="block relative overflow-hidden rounded-2xl border border-red-900/40 glass-cosmic group hover:border-red-500/60 transition-colors"
          >
            <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
              <div className="shrink-0 flex -space-x-4">
                {[silhouetteMale, silhouetteFemale, silhouetteMilitary].map((src, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-red-900/50 overflow-hidden bg-black"
                    style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.85)' }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="text-[10px] uppercase tracking-[3px] text-red-500/90 mb-1 font-semibold">
                  ▌ Investigation
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-foreground tracking-tight">
                  The Vanishing — 11 Scientists. 6 Programs. Zero Answers.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  House Oversight Committee inquiry into the deaths and disappearances of US scientists tied to nuclear, fusion, and aerospace programs.
                </p>
              </div>
              <div className="shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-950/40 border border-red-700/50 text-red-100 text-sm font-semibold group-hover:bg-red-900/60 transition-colors">
                  <FileSearch className="w-4 h-4" /> Open the Archive →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* HUBS */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-foreground">
            Explore the Observatory
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Four chambers. Each pulls you deeper.
          </p>

          <div className="space-y-20">
            {hubs.map((hub) => (
              <div
                key={hub.key}
                className="relative"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${hub.accent}0d, transparent 65%)`,
                  borderRadius: '1.5rem',
                  padding: '2rem 0',
                }}
              >
                <div className="mb-8 px-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-px flex-1 max-w-12" style={{ background: `linear-gradient(90deg, transparent, ${hub.accent})` }} />
                    <span className="text-[10px] uppercase tracking-[4px] font-bold" style={{ color: hub.accent }}>
                      {hub.label}
                    </span>
                    <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${hub.accent}, transparent)` }} />
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-2 max-w-xl mx-auto">
                    {hub.tagline}
                  </p>
                </div>

                <div className={`grid gap-5 px-2 ${hub.sections.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {hub.sections.map((section, i) => (
                    <motion.div
                      key={section.to}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <Link
                        to={section.to}
                        className="block glass-cosmic rounded-xl p-5 transition-all hover:scale-[1.03] group relative overflow-hidden h-full"
                        style={{ borderColor: `${hub.accent}33` }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: `radial-gradient(circle at 50% 100%, ${hub.accent}22, transparent 70%)` }}
                        />
                        <div className="relative z-10">
                          <section.icon className="w-9 h-9 mb-3 transition-all duration-300 group-hover:scale-110" style={{ color: hub.accent }} />
                          <h4 className="text-lg font-bold text-foreground mb-2 leading-tight">{section.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSMISSIONS */}
      <div className="relative z-10">
        <VideoStrip title="Latest Transmissions" subtitle="Fresh signal from the creators we track." limit={3} />
      </div>

      {/* MANIFESTO */}
      <section className="py-24 px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">The Manifesto</h2>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              We don't believe in conspiracies. We believe in{' '}
              <span className="text-foreground font-semibold">evidence, patterns, and questions</span> that deserve answers.
            </p>
            <p>
              Every culture on Earth tells the same story: beings came from the sky, gave knowledge,
              and promised to return. The Pantheon Observatory collects, grades, and presents these patterns without ideology.
            </p>
            <p className="text-primary font-semibold text-xl">
              "The truth is not a destination — it is a practice."
            </p>
          </div>
          <div className="mt-12">
            <Link
              to="/origin"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              <Compass className="w-5 h-5" /> Discover Your Origin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
