import { motion } from 'framer-motion';
import { Pin, Tag, Calendar } from 'lucide-react';

export interface TestimonyCardData {
  id: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  pinned: boolean;
  flow_drive_url?: string | null;
  created_at: string;
  status?: string;
  approved_at?: string | null;
}

// YouTube IDs are 11 chars of [A-Za-z0-9_-]; Vimeo IDs are pure digits.
// Validate before composing the iframe src to prevent injection.
const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;
const VIMEO_ID_RE = /^[0-9]+$/;

function getEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;

    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      const id = u.hostname.includes('youtu.be')
        ? u.pathname.slice(1)
        : u.searchParams.get('v') ?? '';
      return id && YOUTUBE_ID_RE.test(id)
        ? `https://www.youtube-nocookie.com/embed/${id}`
        : null;
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop() ?? '';
      return VIMEO_ID_RE.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function TestimonyCard({ t }: { t: TestimonyCardData }) {
  const embedUrl = t.flow_drive_url ? getEmbedUrl(t.flow_drive_url) : null;
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-xl border p-4 sm:p-5 ${
        t.pinned
          ? 'border-primary/60 bg-gradient-to-br from-primary/10 to-card shadow-[0_0_30px_rgba(157,77,237,0.2)]'
          : 'border-border bg-card'
      }`}
    >
      {t.pinned && (
        <div className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center gap-1">
          <Pin className="w-3 h-3" /> PINNED
        </div>
      )}
      <div className="flex items-center gap-2 mb-2 text-[10px] text-muted-foreground">
        <span className="px-2 py-0.5 rounded-full bg-accent/30 text-accent-foreground capitalize">
          {t.category}
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="w-3 h-3" /> {new Date(t.created_at).toLocaleDateString()}
        </span>
      </div>
      <h3 className="font-bold text-base mb-2">{t.title}</h3>
      <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-3">{t.body}</p>

      {embedUrl && (
        <div className="aspect-video rounded-lg overflow-hidden border border-border mb-3">
          <iframe
            src={embedUrl}
            title={t.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {t.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {t.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 inline-flex items-center gap-1">
              <Tag className="w-2.5 h-2.5" /> {tag}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}
