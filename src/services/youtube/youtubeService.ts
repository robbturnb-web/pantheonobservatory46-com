/**
 * youtubeService — thin helpers for embedding + linking YouTube resources.
 *
 * If VITE_YOUTUBE_API_KEY is configured, future helpers can call the
 * YouTube Data API server-side to confirm video availability and pull
 * fresh metadata. For now the helpers are pure / offline-safe.
 */

export function youtubeEmbedUrl(videoId: string, opts: { autoplay?: boolean } = {}): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    ...(opts.autoplay ? { autoplay: '1' } : {}),
  });
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
}

export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
}

export function youtubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'max' = 'hq'): string {
  const map = { default: 'default.jpg', hq: 'hqdefault.jpg', max: 'maxresdefault.jpg' };
  return `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/${map[quality]}`;
}
