import { useEffect, useRef } from 'react';
import type { AtmosphereId } from '@/lib/page-themes';

interface AtmosphereProps {
  id: AtmosphereId;
  accent: string;
}

/**
 * Page-specific ambient effects. All effects are gated to lg+ via parent
 * (the parent wraps this in `<div className="hidden lg:block">`).
 *
 * - frost: drifting snow particles + frostbite vignette
 * - caustic: shifting underwater caustic gradient
 * - redaction: subtle horizontal redaction-bar grain
 * - blueprint: blueprint grid + crosshair
 * - subterranean: ember-flicker + cross-section lines
 * - typewriter: paper grain + faint typewriter rule
 * - museum: soft cream texture + frame gradient
 * - collider: animated hex grid + scanline
 * - embassy: gold seal radial + diagonal shimmer
 * - papyrus: papyrus fiber texture + ink bleed
 * - dig: warm dust haze
 */
export function Atmosphere({ id, accent }: AtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Particle effects (frost, dig dust, ember) — only when needed
  useEffect(() => {
    const needsCanvas = id === 'frost' || id === 'dig' || id === 'subterranean';
    if (!needsCanvas) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = id === 'frost' ? 70 : id === 'subterranean' ? 35 : 50;
    type P = { x: number; y: number; r: number; vx: number; vy: number; o: number };
    const particles: P[] = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: (Math.random() * 1.6 + 0.4) * dpr,
      vx: (Math.random() - 0.5) * 0.2 * dpr,
      vy: (Math.random() * 0.4 + 0.1) * dpr,
      o: Math.random() * 0.6 + 0.3,
    }));

    const color =
      id === 'frost'
        ? '186, 230, 253'
        : id === 'subterranean'
          ? '251, 146, 60'
          : '214, 184, 142';

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > canvas.height + 4) {
          p.y = -4;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -4) p.x = canvas.width + 4;
        if (p.x > canvas.width + 4) p.x = -4;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${p.o})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [id]);

  // Static SVG atmospheres
  if (id === 'frost') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0, 20, 40, 0.55) 100%)',
          }}
        />
      </div>
    );
  }

  if (id === 'caustic') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -inset-20 opacity-40 mix-blend-screen animate-[causticDrift_22s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, ${accent}40, transparent 40%),
              radial-gradient(ellipse at 70% 60%, ${accent}30, transparent 50%),
              radial-gradient(ellipse at 40% 80%, ${accent}25, transparent 45%)
            `,
            filter: 'blur(40px)',
          }}
        />
        <style>{`
          @keyframes causticDrift {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(20px, -30px) scale(1.1); }
          }
        `}</style>
      </div>
    );
  }

  if (id === 'redaction') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent 0 24px, rgba(0, 0, 0, 0.18) 24px 26px)',
          }}
        />
      </div>
    );
  }

  if (id === 'blueprint') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${accent}22 1px, transparent 1px),
              linear-gradient(90deg, ${accent}22 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    );
  }

  if (id === 'subterranean') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(180deg, transparent 0 80px, ${accent}15 80px 81px)`,
          }}
        />
      </div>
    );
  }

  if (id === 'typewriter') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0 28px, ${accent}10 28px 29px)`,
          }}
        />
      </div>
    );
  }

  if (id === 'museum') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(ellipse at top, ${accent}10, transparent 70%)`,
          }}
        />
      </div>
    );
  }

  if (id === 'collider') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon
                points="30,2 58,17 58,42 30,57 2,42 2,17"
                fill="none"
                stroke={accent}
                strokeOpacity="0.25"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
        <div
          className="absolute inset-x-0 h-px animate-[scan_5s_linear_infinite]"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
        <style>{`@keyframes scan { 0% { top: 0 } 100% { top: 100% } }`}</style>
      </div>
    );
  }

  if (id === 'embassy') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${accent}25, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent 0 30px, ${accent}10 30px 31px)`,
          }}
        />
      </div>
    );
  }

  if (id === 'papyrus') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0 4px, ${accent}10 4px 5px)`,
          }}
        />
      </div>
    );
  }

  if (id === 'dig') {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 50%, ${accent}15 100%)`,
          }}
        />
      </div>
    );
  }

  return null;
}
