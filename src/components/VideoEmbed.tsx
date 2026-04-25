/**
 * Fixed VideoEmbed.
 *
 * Notes for the user:
 * - YouTube videos with embeddings disabled by their owner cannot play in iframes
 *   (this is a YouTube-side restriction, not a code issue). For those, the user
 *   sees a fallback CTA to "Open on YouTube" so the link is never dead.
 * - Make sure the video IDs in `src/data/frequencies.ts` are real (the part after `v=`).
 *   Placeholder IDs will show "Video unavailable" — that's a data problem, not a bug.
 */
import { useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';

export interface VideoData {
  platform: 'youtube' | 'tiktok';
  id: string;
  title: string;
}

interface VideoEmbedProps {
  video: VideoData;
}

// YouTube video IDs are exactly 11 chars of [A-Za-z0-9_-].
// Validating before injection prevents URL/script injection via data files.
const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export function VideoEmbed({ video }: VideoEmbedProps) {
  const [activated, setActivated] = useState(false);

  if (video.platform === 'youtube') {
    const safeId = YOUTUBE_ID_RE.test(video.id) ? video.id : null;

    if (!safeId) {
      return (
        <div className="rounded-lg aspect-video bg-muted/30 border border-border flex items-center justify-center text-xs text-muted-foreground p-4 text-center">
          Video unavailable (invalid ID)
        </div>
      );
    }

    const watchUrl = `https://www.youtube.com/watch?v=${safeId}`;
    const thumb = `https://i.ytimg.com/vi/${safeId}/hqdefault.jpg`;

    // Lite-YT pattern: show clickable thumbnail until user clicks → then load iframe with autoplay.
    if (!activated) {
      return (
        <div className="relative rounded-lg overflow-hidden aspect-video group bg-black">
          <button
            type="button"
            onClick={() => setActivated(true)}
            className="absolute inset-0 w-full h-full"
            aria-label={`Play ${video.title}`}
          >
            <img
              src={thumb}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Some video IDs return a placeholder gray frame. Fall back to a dark cover.
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-12 text-left">
              <p className="text-xs text-white/90 font-medium line-clamp-2">{video.title}</p>
            </div>
          </button>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-black/70 hover:bg-black flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Open on YouTube"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      );
    }

    return (
      <div className="rounded-lg overflow-hidden aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${safeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  // TikTok — open in a new tab (TikTok blocks iframe embeds without their script).
  return (
    <a
      href={`https://www.tiktok.com/video/${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg overflow-hidden aspect-video relative bg-gradient-to-br from-black via-zinc-900 to-black border border-border hover:border-primary/40 transition-colors group"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <Play className="w-6 h-6 text-white fill-white ml-1" />
        </div>
        <p className="text-sm font-semibold text-white line-clamp-2">{video.title}</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Watch on TikTok <ExternalLink className="w-3 h-3" />
        </p>
      </div>
    </a>
  );
}

interface VideoListProps {
  videos: VideoData[];
  title?: string;
}

export function VideoList({ videos, title = 'Videos' }: VideoListProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
      <div className="grid grid-cols-1 gap-3">
        {videos.map((v, i) => (
          <div key={i}>
            <VideoEmbed video={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
