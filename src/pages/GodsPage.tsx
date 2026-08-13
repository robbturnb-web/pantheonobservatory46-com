import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { gods } from '../data/gods';
import type { PantheonFilter } from '../types';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/HeroSection';
import { getPantheonAccent, accentAlpha } from '@/lib/pantheon-colors';

const filters: PantheonFilter[] = ['All', 'Greek', 'Norse', 'Egyptian', 'Hindu', 'Anunnaki', 'Starseed', 'Chinese', 'Japanese', 'Buddhist', 'Aztec', 'Mayan', 'Incan', 'Yoruba', 'Celtic', 'Slavic', 'Polynesian', 'Aboriginal', 'Native American', 'Zoroastrian', 'Islamic'];

export function GodsPage() {
  const [filter, setFilter] = useState<PantheonFilter>('All');

  const filtered = filter === 'All' ? gods : gods.filter((g) => g.pantheon === filter);

  return (
    <>
      <SEO
        title="Gods & Archetypes — Pantheons of the World | Pantheon Observatory"
        description={`${gods.length} deities across Greek, Norse, Egyptian, Hindu, Anunnaki and Starseed pantheons. Tap any card to open the dossier.`}
        canonical="/gods"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Gods & Archetypes',
          description: 'Deities across Greek, Norse, Egyptian, Hindu, Anunnaki, and Starseed pantheons.',
          url: 'https://pantheonobservatory46.com/gods',
          numberOfItems: gods.length,
        }}
      />
      <HeroSection
        label="Realm of Gods · Pantheon"
        title="Gods & Archetypes"
        tagline={`${gods.length} deities across ${filters.length - 1} pantheons. Tap any card to open the dossier.`}
        accent="#D6B35A"
        atmosphere={{ radial: true }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent'
              }`}
            >
              {f}
              {f !== 'All' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {gods.filter((g) => g.pantheon === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((god, i) => {
              const accent = getPantheonAccent(god.pantheon);
              return (
              <motion.div
                key={god.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="relative group"
              >
                <div
                  className="hidden lg:block absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none blur-2xl"
                  style={{ background: `radial-gradient(circle at 50% 40%, ${accentAlpha(accent, 0.55)}, transparent 70%)` }}
                  aria-hidden
                />
                <Link
                  to={`/gods/${god.id}`}
                  className="relative glass-cosmic rounded-xl overflow-hidden h-full block transition-all group-hover:scale-[1.02]"
                  style={{ boxShadow: `0 0 0 1px ${accentAlpha(accent, 0.18)}` }}
                >
                  {god.image ? (
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={god.image}
                        alt={god.name}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,10,40,0.95)] via-[rgba(15,10,40,0.3)] to-transparent" />
                      <div
                        className="absolute top-2 left-2 text-[9px] uppercase tracking-[2px] px-2 py-0.5 rounded-sm bg-black/70 border font-bold"
                        style={{ borderColor: accentAlpha(accent, 0.45), color: accent }}
                      >
                        {god.pantheon}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{god.symbol}</span>
                          <div>
                            <h2 className="font-bold text-foreground text-lg leading-tight">{god.name}</h2>
                            <span className="text-xs text-muted-foreground">{god.pantheon}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative p-5">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"
                        style={{ background: god.atmosphericBg }}
                      />
                      <div className="relative z-10 flex items-center gap-3 mb-3">
                        <span className="text-3xl">{god.symbol}</span>
                        <div>
                          <h2 className="font-bold text-foreground text-lg">{god.name}</h2>
                          <span className="text-xs text-muted-foreground">{god.pantheon}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{god.archetypeRole}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {god.domains.slice(0, 3).map((d) => (
                        <span key={d} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                          {d}
                        </span>
                      ))}
                      {god.domains.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{god.domains.length - 3}</span>
                      )}
                    </div>
                    <div
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[2px] font-bold group-hover:gap-2 transition-all"
                      style={{ color: accent }}
                    >
                      Open Dossier <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
