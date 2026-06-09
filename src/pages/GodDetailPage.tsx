import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, MessageCircle } from 'lucide-react';
import { gods } from '@/data/gods';
import { SEO } from '@/components/SEO';

export function GodDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const god = gods.find((g) => g.id === id);

  if (!god) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-cinzel text-3xl text-realm-gods mb-3">God not found</h1>
          <p className="text-muted-foreground mb-6">The deity you seek is not in the archive.</p>
          <Link
            to="/gods"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-realm-gods/40 bg-realm-gods/10 text-realm-gods hover:bg-realm-gods/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pantheon
          </Link>
        </div>
      </div>
    );
  }

  const askEchoPrompt = encodeURIComponent(
    `Tell me everything about ${god.name} from the ${god.pantheon} pantheon — origin, key myths, powers, and modern relevance.`
  );

  return (
    <>
      <SEO
        title={`${god.name} · ${god.pantheon} Pantheon | Pantheon Observatory`}
        description={`${god.name}: ${god.archetypeRole}. Domains: ${god.domains.join(', ')}.`}
        canonical={`/gods/${god.id}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: god.name,
          description: god.archetypeRole,
          additionalType: 'Deity',
          affiliation: god.pantheon,
        }}
      />

      <div className="relative min-h-screen">
        {/* Hero background — full portrait, blurred + darkened */}
        {god.image && (
          <div className="absolute inset-x-0 top-0 h-[70vh] overflow-hidden pointer-events-none">
            <img
              src={god.image}
              alt=""
              aria-hidden
              className="w-full h-full object-cover object-top scale-110 blur-3xl opacity-40"
            />
            <div className="absolute inset-0" style={{ background: god.atmosphericBg, opacity: 0.35 }} />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-black/40 backdrop-blur text-sm text-white/70 hover:text-white hover:border-realm-gods/40 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Header: portrait + identity */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10"
          >
            {god.image && (
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-full bg-realm-gods/30 blur-2xl" aria-hidden />
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-realm-gods/60 shadow-[0_0_40px_-5px_hsl(var(--realm-gods)/0.6)]">
                  <img src={god.image} alt={god.name} className="w-full h-full object-cover object-top" />
                </div>
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <div className="text-xs uppercase tracking-[4px] text-muted-foreground mb-2">
                <span className="text-2xl mr-2 align-middle">{god.symbol}</span>
                {god.pantheon} Pantheon
              </div>
              <h1
                className="font-cinzel text-4xl sm:text-6xl font-black leading-none mb-3 bg-gradient-to-b from-white via-[hsl(var(--realm-gods))] to-[#a8884a] bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: 'transparent', textShadow: '0 0 40px hsl(var(--realm-gods) / 0.4)' }}
              >
                {god.name}
              </h1>
              <p className="text-base text-white/80 leading-relaxed">{god.archetypeRole}</p>
            </div>
          </motion.header>

          {/* Domains */}
          <section className="mb-8">
            <h2 className="text-xs uppercase tracking-[3px] text-realm-gods/80 mb-3">Domains</h2>
            <div className="flex flex-wrap gap-2">
              {god.domains.map((d) => (
                <span
                  key={d}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary-foreground/90"
                >
                  {d}
                </span>
              ))}
            </div>
          </section>

          {/* Atmospheric description */}
          {god.atmosphericDesc && (
            <section className="mb-8">
              <blockquote className="border-l-2 border-realm-gods/60 pl-5 italic text-lg text-white/85 leading-relaxed">
                {god.atmosphericDesc}
              </blockquote>
            </section>
          )}

          {/* Origin story */}
          {god.originStory && (
            <section className="mb-8 glass-cosmic rounded-xl p-6">
              <h2 className="font-cinzel text-xl text-realm-gods mb-3">Origin</h2>
              <p className="text-white/80 leading-relaxed whitespace-pre-line">{god.originStory}</p>
            </section>
          )}

          {/* Key myths */}
          {god.keyMyths && god.keyMyths.length > 0 && (
            <section className="mb-8">
              <h2 className="font-cinzel text-xl text-realm-gods mb-4">Key Myths</h2>
              <div className="space-y-4">
                {god.keyMyths.map((m, i) => (
                  <div key={i} className="glass-cosmic rounded-xl p-5">
                    <h3 className="font-semibold text-white mb-2">{m.title}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{m.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Powers & relics */}
          {god.powersAndRelics && god.powersAndRelics.length > 0 && (
            <section className="mb-8 glass-cosmic rounded-xl p-6">
              <h2 className="font-cinzel text-xl text-realm-gods mb-3">Powers & Relics</h2>
              <ul className="space-y-1.5 text-white/80">
                {god.powersAndRelics.map((p, i) => (
                  <li key={i} className="flex gap-2"><span className="text-realm-gods">·</span>{p}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Modern relevance */}
          {god.modernRelevance && (
            <section className="mb-8 glass-cosmic rounded-xl p-6">
              <h2 className="font-cinzel text-xl text-realm-gods mb-3">Modern Relevance</h2>
              <p className="text-white/80 leading-relaxed">{god.modernRelevance}</p>
            </section>
          )}

          {/* Reflection — Echo Asks You */}
          {god.reflectionQuestion && (
            <section className="mb-8 rounded-xl p-6 border border-signal-online/30 bg-signal-online/5">
              <div className="text-xs uppercase tracking-[3px] text-signal-online mb-2">Echo Asks You</div>
              <p className="text-lg text-white/90 italic leading-relaxed">{god.reflectionQuestion}</p>
            </section>
          )}

          {/* Sources */}
          {god.sources && god.sources.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xs uppercase tracking-[3px] text-muted-foreground mb-3">Sources</h2>
              <ul className="space-y-2">
                {god.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-realm-gods hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Ask Echo CTA */}
          <div className="text-center">
            <Link
              to={`/echo?q=${askEchoPrompt}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-primary/50 bg-primary/15 text-primary-foreground hover:bg-primary/25 transition-colors font-semibold uppercase tracking-[2px] text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Ask Echo about {god.name}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
