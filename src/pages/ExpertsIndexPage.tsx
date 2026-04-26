import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { EXPERTS } from '@/data/experts';

export function ExpertsIndexPage() {
  return (
    <div className="min-h-screen bg-cosmic-gradient">
      <SEO
        title="Voices of Disclosure — Pantheon Observatory Experts"
        description="Researchers, geophysicists, and witnesses contributing to the Pantheon Observatory archive."
        canonical="/experts"
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sacred/40 bg-sacred-dark/20 text-sacred-light text-xs uppercase tracking-[3px] mb-4">
            <Radio className="w-3 h-3 animate-pulse" /> Voices
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-clarity mb-4 drop-shadow-[0_0_20px_rgba(0,255,136,0.4)]">
            Researchers & Witnesses
          </h1>
          <p className="text-clarity-silver max-w-2xl mx-auto">
            The people whose work, testimony, and analysis power the Pantheon
            Observatory archive. Click any voice to explore their contributions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTS.map((e, i) => (
            <motion.div
              key={e.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/experts/${e.slug}`}
                className="block group rounded-2xl overflow-hidden border border-mystic/30 bg-space-blue/30 backdrop-blur-sm hover:border-sacred/60 hover:shadow-neon-green transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-space-navy">
                  <img
                    src={e.image || '/placeholder.svg'}
                    alt={e.name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    onError={(ev) => {
                      (ev.currentTarget as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-sacred-light group-hover:text-sacred-glow transition-colors">
                    {e.name}
                  </h2>
                  <p className="text-cosmic-bright text-sm mt-1">{e.title}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {e.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full bg-mystic-dark/40 text-clarity-silver text-[11px] border border-mystic/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
