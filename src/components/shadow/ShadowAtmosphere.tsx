import { useEffect, useRef } from 'react';

/**
 * Holographic restricted-chamber atmosphere — scoped to Shadow Pantheon.
 * Layered behind the page content. Pure canvas + CSS for performance.
 */

const GLYPHS = ['✦', '◯', '✕', '⌬', '◬', '☥', '⚹', '✧'];

interface Glyph {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  opacity: number;
  phase: number;
  speed: number;
  color: string;
}

interface Ember {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  life: number;
  maxLife: number;
}

export function ShadowAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth * window.devicePixelRatio);
    let h = (canvas.height = window.innerHeight * window.devicePixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const dpr = window.devicePixelRatio;

    const glyphs: Glyph[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15 * dpr,
      vy: (Math.random() - 0.5) * 0.15 * dpr,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      size: (10 + Math.random() * 16) * dpr,
      opacity: 0.08 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.2,
      color: Math.random() > 0.5 ? '#dc2626' : '#a78bfa',
    }));

    const embers: Ember[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vy: -(0.3 + Math.random() * 0.9) * dpr,
      vx: (Math.random() - 0.5) * 0.2 * dpr,
      size: (1 + Math.random() * 2.5) * dpr,
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.4,
    }));

    let scanlineY = 0;

    const handleResize = () => {
      w = canvas.width = window.innerWidth * window.devicePixelRatio;
      h = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', handleResize);

    const start = performance.now();

    const draw = () => {
      const t = (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Vignette pulse — red corner glow that breathes
      const pulse = 0.5 + 0.5 * Math.sin(t * (Math.PI * 2) / 6);
      const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.7);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, `rgba(180, 0, 30, ${0.18 + pulse * 0.12})`);
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      // Scanlines drifting upward
      scanlineY = (scanlineY - 0.4 * dpr) % (4 * dpr);
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let y = scanlineY; y < h; y += 4 * dpr) {
        ctx.fillStyle = 'rgba(220, 38, 38, 0.04)';
        ctx.fillRect(0, y, w, dpr);
      }
      ctx.restore();

      // Embers
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const e of embers) {
        e.y += e.vy;
        e.x += e.vx + Math.sin(t * 2 + e.life * 10) * 0.15 * dpr;
        e.life += 0.005;
        if (e.life > e.maxLife || e.y < -10) {
          e.x = Math.random() * w;
          e.y = h + 10;
          e.life = 0;
        }
        const alpha = Math.sin((e.life / e.maxLife) * Math.PI) * 0.85;
        const flick = 0.6 + 0.4 * Math.sin(t * 8 + e.x);
        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4);
        grad.addColorStop(0, `rgba(255, 180, 80, ${alpha * flick})`);
        grad.addColorStop(0.4, `rgba(220, 60, 30, ${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(220, 60, 30, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Glyphs
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const g of glyphs) {
        g.x += g.vx;
        g.y += g.vy;
        if (g.x < -20) g.x = w + 20;
        if (g.x > w + 20) g.x = -20;
        if (g.y < -20) g.y = h + 20;
        if (g.y > h + 20) g.y = -20;
        const tw = 0.4 + 0.6 * Math.sin(t * g.speed + g.phase);
        ctx.font = `${g.size}px serif`;
        const r = g.color === '#dc2626' ? 220 : 167;
        const gC = g.color === '#dc2626' ? 38 : 139;
        const bC = g.color === '#dc2626' ? 38 : 250;
        ctx.fillStyle = `rgba(${r}, ${gC}, ${bC}, ${g.opacity * tw})`;
        ctx.shadowColor = g.color;
        ctx.shadowBlur = 8 * dpr * tw;
        ctx.fillText(g.char, g.x, g.y);
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden
      />
      {/* Holographic gradient fog overlays — drift in opposite directions */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden>
        <div
          className="absolute -inset-[20%] opacity-30 mix-blend-screen animate-shadow-fog-a"
          style={{
            background:
              'radial-gradient(ellipse at 30% 40%, rgba(180, 0, 40, 0.25), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(120, 0, 80, 0.2), transparent 60%)',
          }}
        />
        <div
          className="absolute -inset-[20%] opacity-25 mix-blend-screen animate-shadow-fog-b"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(90, 20, 130, 0.3), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(150, 0, 50, 0.2), transparent 60%)',
          }}
        />
      </div>
    </>
  );
}
