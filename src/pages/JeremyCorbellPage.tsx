/**
 * JeremyCorbellPage — dedicated dossier for investigative filmmaker Jeremy Corbell.
 * Custom layout (does not use DossierPageLayout) so the page can have its own
 * cinematic noir feel: red-amber accents, film-grain hero, live X feed, signature
 * findings, and a verified video shelf.
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Radio, Shield, Camera, Flame } from 'lucide-react';
import heroCorbell from '@/assets/hero-corbell.jpg';
import { SEO } from '@/components/SEO';
import { VideoEmbed } from '@/components/VideoEmbed';
import {
  CORBELL_BIO,
  CORBELL_VIDEOS,
  CORBELL_FINDINGS,
  CORBELL_LINKS,
} from '@/data/jeremy-corbell';

export function JeremyCorbellPage() {
  return (
    <>
      <SEO
        title="Jeremy Corbell · Pantheon Disclosure Dossier"
        description="The investigative filmmaker behind GIMBAL, GO FAST, the USS Omaha pyramid UAPs and the Immaculate Constellation disclosure. Verified findings, sources, and every WEAPONIZED episode that matters."
        canonical="/corbell"
      />

      <main
        className="relative min-h-screen text-white"
        style={{
          background:
            'linear-gradient(180deg, #0a0405 0%, #1a0608 35%, #0c0405 100%)',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
        }}
      >
        {/* ============== HERO ============== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroCorbell}
              alt=""
              width={1920}
              height={1080}
              fetchPriority="high"
              className="w-full h-full object-cover opacity-60"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at top, rgba(220,38,38,0.18) 0%, transparent 60%), linear-gradient(180deg, rgba(10,4,5,0.55) 0%, rgba(10,4,5,0.98) 100%)',
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-red-200/70 hover:text-red-200 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Observatory
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-6 sm:mt-10"
            >
              <p
                className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.4em] text-red-400/90"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                CLASSIFIED // DISCLOSURE OPERATIVE · DOSSIER OPEN
              </p>
              <h1
                className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight"
                style={{
                  fontFamily: "'Cinzel', serif",
                  textShadow: '0 0 40px rgba(220,38,38,0.3)',
                }}
              >
                JEREMY <span className="text-red-400">CORBELL</span>
              </h1>
              <p className="mt-4 text-base sm:text-xl text-red-100/80 max-w-2xl">
                {CORBELL_BIO.tagline}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Camera, label: 'Filmmaker' },
                  { icon: Radio, label: 'WEAPONIZED Host' },
                  { icon: Shield, label: 'Whistleblower Conduit' },
                  { icon: Flame, label: 'Operating At Risk' },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-full border border-red-500/30 bg-red-950/40 text-red-100"
                  >
                    <b.icon className="w-3 h-3" /> {b.label}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============== BIO ============== */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/80 mb-6"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            // FIELD BRIEFING
          </h2>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-red-50/90">
            {CORBELL_BIO.long.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* ============== SIGNATURE FINDINGS ============== */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/80"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                // SIGNATURE FINDINGS
              </h2>
              <p className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                Receipts on record.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORBELL_FINDINGS.map((f, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-xl border border-red-500/20 bg-gradient-to-br from-red-950/40 to-black/60 p-5 hover:border-red-400/50 transition-colors"
              >
                <div
                  className="text-[11px] uppercase tracking-[0.25em] text-red-400/80"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  {f.year}
                </div>
                <h3 className="mt-2 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-red-50/80">
                  {f.summary}
                </p>
                {f.sourceUrl && (
                  <a
                    href={f.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 underline-offset-4 hover:underline"
                  >
                    {f.sourceLabel ?? 'Source'} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </section>

        {/* ============== VIDEO VAULT ============== */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-8">
            <h2
              className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/80"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              // WEAPONIZED — VERIFIED EPISODES
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Six drops that moved the needle.
            </p>
            <p className="mt-2 text-sm text-red-100/60">
              Every video below was verified live against YouTube before publish. Click any
              tile to play; tap the external link to open on YouTube.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CORBELL_VIDEOS.map((v) => (
              <article
                key={v.id}
                className="rounded-xl overflow-hidden border border-red-500/20 bg-black/40"
              >
                <VideoEmbed
                  video={{ platform: 'youtube', id: v.id, title: v.title }}
                />
                <div className="p-4">
                  <div
                    className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-red-400/80"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    <span>{v.episode}</span>
                    <span>{v.date}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-white leading-snug">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-red-50/75 leading-relaxed">
                    {v.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============== LIVE FEED / CURRENT FINDINGS ============== */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/50 via-black/60 to-black p-6 sm:p-10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-red-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              LIVE · CURRENT FINDINGS
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white">
              Track every new drop the moment it lands.
            </h3>
            <p className="mt-3 text-red-50/75 max-w-2xl">
              Corbell publishes breaking material on X and YouTube before mainstream
              pickup. These are the canonical fastest channels — bookmark them or open
              them inside the Pantheon at any time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://x.com/JeremyCorbell"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/90 hover:bg-red-500 text-white text-sm font-semibold transition"
              >
                Follow on X <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com/@JeremyCorbell"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-400/40 hover:bg-red-500/10 text-red-100 text-sm font-semibold transition"
              >
                Subscribe on YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.weaponizedpodcast.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-400/40 hover:bg-red-500/10 text-red-100 text-sm font-semibold transition"
              >
                WEAPONIZED Podcast <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ============== RESOURCES ============== */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <h2
            className="text-xs font-bold uppercase tracking-[0.3em] text-red-400/80 mb-6"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            // OFFICIAL CHANNELS & ARCHIVES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CORBELL_LINKS.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-red-500/20 bg-black/40 p-5 hover:border-red-400/60 hover:bg-red-950/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white group-hover:text-red-200 transition">
                    {l.label}
                  </span>
                  <ExternalLink className="w-4 h-4 text-red-300/70 group-hover:text-red-200" />
                </div>
                <p className="mt-2 text-sm text-red-50/70">{l.description}</p>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
