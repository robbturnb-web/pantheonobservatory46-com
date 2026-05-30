/**
 * AudioEngine — singleton player with crossfade, persistence, and event subscription.
 *
 * Two <audio> elements ping-pong so we can fade one out while the next fades in.
 * State is broadcast via a tiny event emitter so multiple React components stay in sync.
 */

export type Track = { src: string; label: string };

type EngineEvent =
  | 'play'
  | 'pause'
  | 'track'      // current track changed
  | 'volume'    // volume changed
  | 'playlist'; // playlist replaced

type Listener = () => void;

const STORAGE_KEY = 'pantheon_audio_state';

function safeReadStorage(): { index?: number; volume?: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function safeWriteStorage(state: { index: number; volume: number }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode / quota — ignore */
  }
}

export class AudioEngine {
  private static instance: AudioEngine | null = null;

  private audioA: HTMLAudioElement;
  private audioB: HTMLAudioElement;
  private active: HTMLAudioElement;

  private volume = 0.3;
  private playlist: Track[] = [];
  private index = 0;
  private playing = false;
  /** Consecutive load failures; reset on any successful play. */
  private errorStreak = 0;
  /** True once we've given up on the current playlist because every track failed. */
  private exhausted = false;

  // Crossfade RAF kill-switch — bumped on every new fade so old loops self-terminate.
  private fadeToken = 0;

  private listeners: Map<EngineEvent, Set<Listener>> = new Map();

  private constructor() {
    this.audioA = typeof Audio !== 'undefined' ? new Audio() : ({} as HTMLAudioElement);
    this.audioB = typeof Audio !== 'undefined' ? new Audio() : ({} as HTMLAudioElement);
    this.active = this.audioA;

    if (typeof Audio !== 'undefined') {
      this.audioA.preload = 'auto';
      this.audioB.preload = 'auto';
      this.audioA.loop = false;
      this.audioB.loop = false;

      // Auto-skip on end. Errors are handled defensively to avoid 404 loops.
      const handleEnded = () => {
        this.errorStreak = 0;
        this.next();
      };
      const handleError = (e: Event) => {
        // Only react to errors from the currently active element. Ignore
        // the inactive ping-pong audio (it may legitimately have a stale src).
        if (e.currentTarget !== this.active) return;
        this.errorStreak += 1;
        // If every track in the playlist failed in a row, stop. This prevents
        // a missing-file storm from rerendering the UI hundreds of times/sec.
        if (this.playlist.length === 0 || this.errorStreak >= this.playlist.length) {
          this.exhausted = true;
          this.playing = false;
          this.emit('pause');
          return;
        }
        // Otherwise try the next file, but only while the user wants playback.
        if (this.playing) this.next();
      };

      this.audioA.addEventListener('ended', handleEnded);
      this.audioB.addEventListener('ended', handleEnded);
      this.audioA.addEventListener('error', handleError);
      this.audioB.addEventListener('error', handleError);
      const handlePlaying = () => {
        this.errorStreak = 0;
        this.exhausted = false;
      };
      this.audioA.addEventListener('playing', handlePlaying);
      this.audioB.addEventListener('playing', handlePlaying);
    }

    this.restore();
  }

  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  // ─── Persistence ───────────────────────────────────────────────

  private save() {
    safeWriteStorage({ index: this.index, volume: this.volume });
  }

  private restore() {
    const saved = safeReadStorage();
    if (!saved) return;
    if (typeof saved.index === 'number') this.index = saved.index;
    if (typeof saved.volume === 'number') this.volume = saved.volume;
  }

  // ─── Event emitter ─────────────────────────────────────────────

  on(event: EngineEvent, fn: Listener): () => void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn);
    return () => this.listeners.get(event)?.delete(fn);
  }

  private emit(event: EngineEvent) {
    this.listeners.get(event)?.forEach((fn) => fn());
  }

  // ─── Playlist ──────────────────────────────────────────────────

  setPlaylist(list: Track[]) {
    // Avoid pointless reload if the playlist is identical.
    const same =
      list.length === this.playlist.length &&
      list.every((t, i) => t.src === this.playlist[i]?.src);
    if (same) return;

    const wasPlaying = this.playing;
    this.playlist = list;
    // Clamp index to the new playlist length.
    if (this.index >= list.length) this.index = 0;

    if (list.length === 0) {
      this.active.pause();
      this.active.removeAttribute('src');
      this.playing = false;
      this.emit('playlist');
      this.emit('track');
      return;
    }

    if (wasPlaying) {
      // Smoothly transition into the new playlist's current track.
      this.crossfadeTo(list[this.index].src);
    } else {
      this.loadCurrent();
    }
    this.emit('playlist');
    this.emit('track');
  }

  private loadCurrent() {
    if (!this.playlist.length) return;
    const track = this.playlist[this.index];
    this.active.src = track.src;
    this.active.volume = this.volume;
  }

  // ─── Transport ─────────────────────────────────────────────────

  async play(): Promise<void> {
    if (!this.playlist.length) return;
    if (!this.active.src) this.loadCurrent();
    this.active.volume = this.volume;
    try {
      await this.active.play();
      this.playing = true;
      this.emit('play');
    } catch {
      // Autoplay rejected or src missing — leave state false.
      this.playing = false;
      this.emit('pause');
    }
  }

  pause() {
    this.active.pause();
    this.playing = false;
    this.emit('pause');
  }

  async toggle(): Promise<void> {
    if (this.playing) this.pause();
    else await this.play();
  }

  setVolume(v: number) {
    this.volume = Math.max(0, Math.min(1, v));
    this.active.volume = this.volume;
    this.save();
    this.emit('volume');
  }

  next() {
    if (!this.playlist.length) return;
    this.index = (this.index + 1) % this.playlist.length;
    if (this.playing) {
      this.crossfadeTo(this.playlist[this.index].src);
    } else {
      this.loadCurrent();
    }
    this.save();
    this.emit('track');
  }

  prev() {
    if (!this.playlist.length) return;
    this.index = (this.index - 1 + this.playlist.length) % this.playlist.length;
    if (this.playing) {
      this.crossfadeTo(this.playlist[this.index].src);
    } else {
      this.loadCurrent();
    }
    this.save();
    this.emit('track');
  }

  // ─── Crossfade (rAF based) ─────────────────────────────────────

  private crossfadeTo(src: string, durationMs = 800) {
    const incoming = this.active === this.audioA ? this.audioB : this.audioA;
    const outgoing = this.active;

    incoming.src = src;
    incoming.volume = 0;
    incoming.play().catch(() => {
      // If incoming fails, skip ahead — error handler on the element will fire too.
    });

    const target = this.volume;
    const startedAt = performance.now();
    const fromOutgoingVol = outgoing.volume;
    const myToken = ++this.fadeToken;

    const tick = (now: number) => {
      // Another crossfade started — abandon this loop.
      if (myToken !== this.fadeToken) return;

      const t = Math.min(1, (now - startedAt) / durationMs);
      incoming.volume = target * t;
      outgoing.volume = fromOutgoingVol * (1 - t);

      if (t >= 1) {
        outgoing.pause();
        outgoing.volume = target; // reset for next reuse
        this.active = incoming;
        this.playing = true;
        this.emit('play');
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ─── Getters ───────────────────────────────────────────────────

  getVolume(): number {
    return this.volume;
  }

  isPlaying(): boolean {
    return this.playing;
  }

  getCurrentTrack(): Track | null {
    return this.playlist[this.index] ?? null;
  }

  getIndex(): number {
    return this.index;
  }

  getPlaylistLength(): number {
    return this.playlist.length;
  }
}
