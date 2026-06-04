import { useRef, useState } from 'react';

interface Props {
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
  alt: string;
}

export function ImageCompareSlider({ leftSrc, rightSrc, leftLabel, rightLabel, alt }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border select-none cursor-ew-resize"
      style={{ borderColor: 'rgba(167,139,250,0.3)' }}
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <img src={rightSrc} alt={`${alt} — ${rightLabel}`} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={leftSrc} alt={`${alt} — ${leftLabel}`} className="absolute inset-0 h-full object-cover" style={{ width: ref.current?.offsetWidth ?? '100%', maxWidth: 'none' }} />
      </div>

      {/* labels */}
      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase backdrop-blur-md" style={{ background: 'rgba(5,3,13,0.7)', color: '#fde68a' }}>{leftLabel}</span>
      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase backdrop-blur-md" style={{ background: 'rgba(5,3,13,0.7)', color: '#a78bfa' }}>{rightLabel}</span>

      {/* divider */}
      <div className="absolute top-0 bottom-0 w-px" style={{ left: `${pos}%`, background: '#fcd34d', boxShadow: '0 0 12px #fcd34d' }} />
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full border-2 flex items-center justify-center backdrop-blur-md"
        style={{ left: `${pos}%`, borderColor: '#fcd34d', background: 'rgba(15,8,40,0.85)' }}
      >
        <span className="text-amber-300 text-xs">⇆</span>
      </div>
    </div>
  );
}
