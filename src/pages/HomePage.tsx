import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Eye, Clock, FileSearch, Sparkles, Brain, Radio, Compass, MessageCircle, ChevronDown, Shield, BookOpen, Zap, Globe, Telescope, Users, Pyramid, Lock, Skull, UserCircle2 } from 'lucide-react';
import { vaultSlots, daysOverdue } from '@/data/the-46';
import { VideoStrip } from '@/components/VideoStrip';
import { Walkthrough } from '@/components/Walkthrough';
import { AtlasHero } from '@/components/cosmic/AtlasHero';
import { StefanLocator } from '@/components/cosmic/StefanLocator';
import { DailyPulseCard } from '@/components/cosmos/DailyPulseCard';
import silhouetteMale from '@/assets/missing/silhouette-male.jpg';
import silhouetteFemale from '@/assets/missing/silhouette-female.jpg';
import silhouetteMilitary from '@/assets/missing/silhouette-military.jpg';

const sections = [
  { to: '/timeline', icon: Clock, title: 'Cosmic Timeline', desc: 'From 300,000 BCE to congressional hearings — the hidden history humanity forgot.', color: '#8b5cf6' },
  { to: '/uap', icon: FileSearch, title: 'UAP Case Files', desc: 'Military encounters, whistleblower testimony, and evidence-graded case studies.', color: '#3b82f6' },
  { to: '/gods', icon: Sparkles, title: 'Gods & Archetypes', desc: '18 deities across 6 pantheons. Tap into mythological intelligence.', color: '#f59e0b' },
  { to: '/species', icon: UserCircle2, title: 'Alien Species Codex', desc: '16 documented non-human intelligences. Greys, Draconians, Pleiadians, Mexico bodies, NJ drones — sourced.', color: '#22d3ee' },
  { to: '/consciousness', icon: Brain, title: 'Consciousness Lab', desc: 'Project Stargate, the CIA Gateway Process, NDEs, and the nature of mind.', color: '#10b981' },
  { to: '/signals', icon: Radio, title: 'Signal Watch', desc: 'Credibility ratings for researchers and creators. Green, yellow, red.', color: '#f43f5e' },
  { to: '/whistleblowers', icon: Shield, title: 'Whistleblower Vault', desc: '8 evidence-graded profiles of those who risked everything for disclosure.', color: '#ef4444' },
  { to: '/telescopes', icon: Telescope, title: 'Telescope Observatory', desc: 'Hubble to James Webb — every discovery, every anomaly, year by year.', color: '#06b6d4' },
  { to: '/galaxy', icon: Globe, title: '3D Galaxy Explorer', desc: 'Fly through our solar system with moons, tour mode, and Echo narration.', color: '#a855f7' },
  { to: '/pyramids', icon: Pyramid, title: 'Pyramid Explorer', desc: '6 ancient structures with stellar alignments, acoustic anomalies, and forbidden theories.', color: '#d4a574' },
  { to: '/shadow-pantheon', icon: Skull, title: 'Shadow Pantheon', desc: 'The gods they told you not to name. 10 dark archetypes for shadow integration work.', color: '#dc2626' },
  { to: '/echoverse', icon: Users, title: 'Echoverse', desc: 'Real-time community hub. Chat with fellow starseeds across 5 channels.', color: '#39ff14' },
  { to: '/origin', icon: Compass, title: 'Origin Chamber', desc: 'A 7-question quiz to discover your starseed archetype lineage.', color: '#c084fc' },
  { to: '/echo', icon: MessageCircle, title: 'Echo AI', desc: 'Ask the cosmic intelligence anything about UAPs, gods, or consciousness.', color: '#60a5fa' },
];

const stats = [
  { label: 'UAP Cases', value: 6, icon: Shield },
  { label: 'Ancient Gods', value: 18, icon: Sparkles },
  { label: 'Whistleblowers', value: 8, icon: Shield },
  { label: 'Pyramids', value: 6, icon: Pyramid },
  { label: 'Telescopes', value: 8, icon: Telescope },
];

function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
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

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse text-primary">|</span>}
    </span>
  );
}

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="relative">
      <Walkthrough />
      {/* HERO */}
      <motion.div
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
          <Eye className="w-20 h-20 sm:w-28 sm:h-28 text-primary cosmic-float relative z-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-4"
        >
          <span className="text-foreground">PANTHEON</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-8"
        >
          <span className="text-primary">OBSER</span><span className="text-accent-neon neon-glow">VATORY</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          The questions humanity was told to stop asking — about who we are, where we came from,
          and what's been watching from above since the beginning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/timeline"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Zap className="w-5 h-5" /> Begin the Descent
          </Link>
          <Link
            to="/echo"
            className="px-8 py-3 glass-cosmic rounded-xl font-semibold text-lg text-foreground hover:border-primary/40 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" /> Ask Echo
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </motion.div>

      {/* 3I/ATLAS LIVE TRACKER */}
      <AtlasHero />

      {/* STEFAN + DAILY PULSE */}
      <section className="px-4 pb-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
          <StefanLocator />
          <DailyPulseCard />
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-4">
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
                transition={{ delay: i * 0.1 }}
                className="glass-cosmic rounded-xl p-6 text-center group hover:border-accent-neon/40 transition-colors"
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

      {/* THE 46 LIVE BANNER */}
      <section className="px-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/the-46"
              className="block relative overflow-hidden rounded-2xl border border-primary/30 glass-cosmic group hover:border-primary/60 transition-colors"
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.25), transparent 60%), radial-gradient(circle at 85% 50%, rgba(57,255,20,0.15), transparent 55%)',
                }}
              />
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
                    {vaultSlots.filter((s) => s.status === 'unlocked').length} of 46 disclosed · Congressional demand expired April 14, 2026 · <span className="text-amber-300 font-semibold">{daysOverdue()} days overdue</span>
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
          </motion.div>
        </div>
      </section>

      {/* MISSING PERSONS ARCHIVE TEASER */}
      <section className="px-4 pb-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/missing"
              className="block relative overflow-hidden rounded-2xl border border-red-900/40 glass-cosmic group hover:border-red-500/60 transition-colors"
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background:
                    'radial-gradient(circle at 15% 50%, rgba(220,38,38,0.2), transparent 60%), radial-gradient(circle at 90% 50%, rgba(100,100,100,0.15), transparent 55%)',
                }}
              />
              <motion.div
                className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative z-10 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
                {/* Portrait collage */}
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

                {/* Center content */}
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="text-[10px] uppercase tracking-[3px] text-red-500/90 mb-1 font-semibold">
                    ▌ Investigation
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-foreground tracking-tight leading-tight">
                    The Vanishing — 11 Scientists. 6 Programs. Zero Answers.
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    House Oversight Committee inquiry into the deaths and disappearances of US scientists tied to nuclear, fusion, and aerospace programs.
                  </p>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground/80 mt-2 font-mono">
                    11 dossiers · 6 programs · 4 historical precedents
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0 w-full sm:w-auto">
                  <div className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-red-950/40 border border-red-700/50 text-red-100 text-sm font-semibold group-hover:bg-red-900/60 group-hover:border-red-500 transition-colors">
                    <FileSearch className="w-4 h-4" />
                    Open the Archive →
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION GRID */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-4 text-foreground"
          >
            Explore the Observatory
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
          >
            Seven chambers of knowledge. Each one pulls you deeper.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={section.to}
                  className="block glass-cosmic rounded-xl p-6 transition-all hover:scale-[1.03] group relative overflow-hidden h-full"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 100%, ${section.color}15, transparent 70%)` }}
                  />
                  <div className="relative z-10">
                    <section.icon
                      className="w-10 h-10 mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ color: section.color }}
                    />
                    <h3 className="text-xl font-bold text-foreground mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST TRANSMISSIONS */}
      <VideoStrip
        title="Latest Transmissions"
        subtitle="Fresh signal from the creators we track."
        limit={3}
      />

      {/* MANIFESTO */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
              The Manifesto
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We don't believe in conspiracies. We believe in{' '}
                <span className="text-foreground font-semibold">evidence, patterns, and questions</span>{' '}
                that deserve answers.
              </p>
              <p>
                Every culture on Earth tells the same story: beings came from the sky, gave knowledge,
                and promised to return. The Pantheon Observatory collects, grades, and presents these
                patterns without ideology.
              </p>
              <p className="text-primary font-semibold text-xl">
                "The truth is not a destination — it is a practice."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Link
              to="/origin"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              <Compass className="w-5 h-5" /> Discover Your Origin
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
