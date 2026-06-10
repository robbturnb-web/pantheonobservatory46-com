import { useState } from 'react';
import { ExternalLink, PlayCircle, AlertTriangle } from 'lucide-react';
import { CosmicCard } from './CosmicCard';
import { ContentTrustBadge } from '@/components/ContentTrustBadge';
import { youtubeEmbedUrl, youtubeWatchUrl, youtubeThumbnail } from '@/services/youtube/youtubeService';
import type { ContentTrust } from '@/lib/content-trust';

export interface YouTubeResource {
  title: string;
  channel: string;
  videoId: string;
  category: string;
  trust: ContentTrust;
  lastChecked?: string;
  needsRealId?: boolean;
}

interface Props {
  resource: YouTubeResource;
}

export function YouTubeResourceCard({ resource }: Props) {
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  if (resource.needsRealId) {
    return (
      <CosmicCard className="p-4 flex flex-col gap-3">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{resource.title}</h3>
            <p className="text-xs text-muted-foreground">{resource.channel}</p>
          </div>
          <ContentTrustBadge trust="UNSOURCED_PENDING_REVIEW" compact />
        </header>
        <div className="flex items-center gap-2 rounded-md border border-amber-500/40 bg-amber-500/5 p-3 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          Needs real video ID — supply a verified YouTube ID before publishing.
        </div>
      </CosmicCard>
    );
  }

  return (
    <CosmicCard className="p-4 flex flex-col gap-3">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">{resource.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{resource.channel}</p>
        </div>
        <ContentTrustBadge trust={resource.trust} compact />
      </header>

      <div className="relative aspect-video overflow-hidden rounded-md bg-muted/30">
        {playing && !errored ? (
          <iframe
            src={youtubeEmbedUrl(resource.videoId, { autoplay: true })}
            title={resource.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            onError={() => setErrored(true)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Play video: ${resource.title}`}
          >
            <img
              src={youtubeThumbnail(resource.videoId)}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
            />
            <PlayCircle className="relative w-14 h-14 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))] transition group-hover:scale-110" />
          </button>
        )}
        {errored && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-xs text-muted-foreground p-4 text-center">
            Video unavailable.{' '}
            <a
              href={youtubeWatchUrl(resource.videoId)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline text-primary"
            >
              Open on YouTube ↗
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[10px] uppercase tracking-[1.5px] text-muted-foreground">
        <span>{resource.category}</span>
        <a
          href={youtubeWatchUrl(resource.videoId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 hover:text-primary"
        >
          Open on YouTube <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      {resource.lastChecked && (
        <p className="text-[10px] text-muted-foreground">Last checked {resource.lastChecked}</p>
      )}
    </CosmicCard>
  );
}

export default YouTubeResourceCard;
