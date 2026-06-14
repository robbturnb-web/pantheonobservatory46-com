interface IssTrackStripProps {
  latitude?: number;
  longitude?: number;
}

/**
 * Lightweight ISS ground-track strip — pure SVG world silhouette + pulsing marker.
 * No external map tiles, no token required.
 */
export function IssTrackStrip({ latitude, longitude }: IssTrackStripProps) {
  const hasFix = typeof latitude === 'number' && typeof longitude === 'number';
  const x = hasFix ? ((longitude! + 180) / 360) * 100 : 50;
  // y: lat 90 → top (0%), lat -90 → bottom (100%)
  const y = hasFix ? ((90 - latitude!) / 180) * 100 : 50;

  return (
    <div className="relative w-full h-32 sm:h-36 mt-3 rounded-xl border border-cyan-400/20 bg-[#04101a] overflow-hidden">
      {/* equator */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-400/20" />
      {/* prime meridian */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-400/20" />
      {/* lat/lon grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)',
          backgroundSize: '12.5% 16.66%',
        }}
      />
      {/* simplified world silhouette */}
      <svg
        viewBox="0 0 360 180"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-40"
      >
        <g fill="rgba(34,211,238,0.35)" stroke="rgba(34,211,238,0.5)" strokeWidth="0.5">
          {/* very rough continent blobs — purely decorative */}
          <path d="M30,55 Q60,40 95,55 T140,70 Q120,95 90,100 T40,90 Z" />
          <path d="M150,50 Q190,35 230,55 Q240,80 220,95 Q190,105 170,90 Q145,80 150,50 Z" />
          <path d="M165,100 Q190,110 200,140 Q185,160 165,150 Q150,130 165,100 Z" />
          <path d="M250,55 Q300,45 335,70 Q325,100 290,110 Q260,100 250,55 Z" />
          <path d="M270,115 Q295,120 305,140 Q290,155 275,145 Q260,130 270,115 Z" />
        </g>
      </svg>

      {/* ISS marker */}
      {hasFix && (
        <div
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <span className="absolute inset-0 -m-3 rounded-full bg-cyan-400/40 animate-ping" />
          <span className="relative block w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_2px_rgba(34,211,238,0.9)]" />
        </div>
      )}

      <p className="absolute top-1.5 left-2 font-mono text-[9px] uppercase tracking-[1.5px] text-cyan-300/80">
        ISS Ground Track · LIVE
      </p>
      <p className="absolute bottom-1.5 right-2 font-mono text-[9px] uppercase tracking-[1.5px] text-cyan-300/60">
        {hasFix
          ? `${latitude!.toFixed(2)}° / ${longitude!.toFixed(2)}°`
          : 'awaiting fix…'}
      </p>
    </div>
  );
}

export default IssTrackStrip;
