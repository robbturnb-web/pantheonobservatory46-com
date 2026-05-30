import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Film, ExternalLink, PlayCircle, Calendar, Clock, User } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { documentaries, docTopics, type Documentary } from '@/data/documentaries';

const STATUS_COLORS: Record<string, string> = {
  streaming: 'text-signal-online border-signal-online/40 bg-signal-online/10',
  theatrical: 'text-amber-300 border-amber-300/40 bg-amber-300/10',
  free: 'text-cyan-300 border-cyan-300/40 bg-cyan-300/10',
  upcoming: 'text-fuchsia-300 border-fuchsia-300/40 bg-fuchsia-300/10',
};

export function DocumentariesPage() {
  const [topic, setTopic] = useState<string>('ALL');

  const filtered = useMemo(
    () => (topic === 'ALL' ? documentaries : documentaries.filter((d) => d.topics.includes(topic))),
    [topic]
  );

  return (
    <>
      <SEO
        title="Disclosure Documentaries — Pantheon"
        description="The Age of Disclosure, Jeremy Corbell, James Fox, Steven Greer — every major UAP/disclosure documentary with trailers and where to watch."
        canonical="/documentaries"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[4px] text-emerald-300 mb-4">
            <Film className="w-3.5 h-3.5" /> Disclosure Archive
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-3" style={{ fontFamily: 'Cinzel, serif' }}>
            Documentaries
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Every major UAP and disclosure documentary worth your time. Trailers, official sites, and where to watch — curated for seekers who want primary sources, not recycled YouTube essays.
          </p>
        </motion.header>

        {/* Topic filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['ALL', ...docTopics].map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`text-[11px] uppercase tracking-[2px] px-3 py-1.5 rounded-full border transition-colors ${
                topic === t
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((doc, i) => (
            <DocCard key={doc.id} doc={doc} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function DocCard({ doc, index }: { doc: Documentary; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.06 }}
      className="glass-cosmic rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors group"
    >
      {/* Trailer / poster — uses VideoEmbed (lite-yt thumbnail + click-to-play + open-on-YouTube fallback) */}
      <div className="relative">
        {doc.trailerYouTubeId ? (
          <VideoEmbed video={{ platform: 'youtube', id: doc.trailerYouTubeId, title: `${doc.title} — trailer` }} />
        ) : (
          <a
            href={doc.watchUrl ?? doc.officialUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-video bg-gradient-to-br from-primary/20 via-background to-emerald-500/10 flex items-center justify-center group"
          >
            <PlayCircle className="w-16 h-16 text-primary/60 group-hover:text-primary transition-colors" />
          </a>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <span
            className={`text-[10px] uppercase tracking-[2px] px-2.5 py-1 rounded-full border ${
              STATUS_COLORS[doc.status]
            }`}
          >
            {doc.status}
          </span>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{doc.year}</span>
            {doc.runtime && <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{doc.runtime}</span>}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: 'Cinzel, serif' }}>
          {doc.title}
        </h2>
        <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5 mb-3">
          <User className="w-3 h-3" /> Dir. {doc.director}
        </p>

        <p className="text-sm text-foreground/80 leading-relaxed mb-4">{doc.synopsis}</p>

        {doc.notes && (
          <p className="text-xs text-amber-300/80 italic mb-4">{doc.notes}</p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {doc.topics.map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-[1.5px] px-2 py-0.5 rounded-full bg-secondary/60 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {doc.watchUrl && (
            <a
              href={doc.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <PlayCircle className="w-3.5 h-3.5" /> Watch
            </a>
          )}
          {doc.officialUrl && (
            <a
              href={doc.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-foreground hover:border-primary/40 transition-colors"
            >
              Official site <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
