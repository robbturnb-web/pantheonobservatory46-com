export interface VideoData {
  platform: 'youtube' | 'tiktok';
  id: string;
  title: string;
}

interface VideoEmbedProps {
  video: VideoData;
}

export function VideoEmbed({ video }: VideoEmbedProps) {
  if (video.platform === 'youtube') {
    return (
      <div className="rounded-lg overflow-hidden aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  return (
    <blockquote
      className="tiktok-embed rounded-lg overflow-hidden"
      cite={`https://www.tiktok.com/video/${video.id}`}
      data-video-id={video.id}
    >
      <a href={`https://www.tiktok.com/video/${video.id}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary">
        {video.title} — Watch on TikTok
      </a>
    </blockquote>
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
            <p className="text-xs text-muted-foreground mb-1">{v.title}</p>
            <VideoEmbed video={v} />
          </div>
        ))}
      </div>
    </div>
  );
}
