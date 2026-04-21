import { useEffect, useRef } from 'react';

/**
 * Cursor-aware cosmic comet trails.
 * - 1-2 free-flight comets per minute streak across the viewport.
 * - One comet always tracks toward the cursor with a glowing ion tail.
 * - Pure canvas, no DOM nodes per comet → cheap.
 */
export function CometTrails() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, lastMove: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.lastMove = performance.now();
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    interface Comet {
      x: number; y: number;
      vx: number; vy: number;
      tail: { x: number; y: number }[];
      life: number; maxLife: number;
      hueA: string; hueB: string;
      size: number;
      cursorTracker: boolean;
    }

    const comets: Comet[] = [];

    const spawnFreeFlight = () => {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0, vx = 0, vy = 0;
      const speed = 2 + Math.random() * 2.5;
      switch (edge) {
        case 0: x = Math.random() * width; y = -20; vx = (Math.random() - 0.5) * 2; vy = speed; break;
        case 1: x = width + 20; y = Math.random() * height; vx = -speed; vy = (Math.random() - 0.5) * 2; break;
        case 2: x = Math.random() * width; y = height + 20; vx = (Math.random() - 0.5) * 2; vy = -speed; break;
        case 3: x = -20; y = Math.random() * height; vx = speed; vy = (Math.random() - 0.5) * 2; break;
      }
      comets.push({
        x, y, vx, vy,
        tail: [],
        life: 0,
        maxLife: 280,
        hueA: 'rgba(139,92,246,1)',
        hueB: 'rgba(34,211,238,0)',
        size: 1.6 + Math.random() * 1.4,
        cursorTracker: false,
      });
    };

    const spawnTracker = () => {
      const fromLeft = Math.random() > 0.5;
      comets.push({
        x: fromLeft ? -30 : width + 30,
        y: Math.random() * height,
        vx: fromLeft ? 3 : -3,
        vy: 0,
        tail: [],
        life: 0,
        maxLife: 380,
        hueA: 'rgba(57,255,20,1)',
        hueB: 'rgba(139,92,246,0)',
        size: 2,
        cursorTracker: true,
      });
    };

    let lastSpawn = 0;
    let lastTracker = 0;

    const loop = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // Spawn free-flight comets
      if (t - lastSpawn > 22000 + Math.random() * 18000) {
        spawnFreeFlight();
        lastSpawn = t;
      }
      // Spawn cursor tracker if mouse recently moved
      if (t - lastTracker > 12000 && t - mouseRef.current.lastMove < 6000) {
        spawnTracker();
        lastTracker = t;
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.life++;

        // Cursor trackers gently steer toward the cursor while it's recent
        if (c.cursorTracker && t - mouseRef.current.lastMove < 4000) {
          const dx = mouseRef.current.x - c.x;
          const dy = mouseRef.current.y - c.y;
          const dist = Math.hypot(dx, dy) || 1;
          const steer = 0.08;
          c.vx += (dx / dist) * steer;
          c.vy += (dy / dist) * steer;
          // Cap speed
          const sp = Math.hypot(c.vx, c.vy);
          const max = 4.5;
          if (sp > max) { c.vx = (c.vx / sp) * max; c.vy = (c.vy / sp) * max; }
        }

        c.x += c.vx;
        c.y += c.vy;
        c.tail.unshift({ x: c.x, y: c.y });
        if (c.tail.length > 28) c.tail.pop();

        // Draw tail
        for (let j = c.tail.length - 1; j > 0; j--) {
          const a = c.tail[j];
          const b = c.tail[j - 1];
          const alpha = (1 - j / c.tail.length) * 0.6;
          ctx.strokeStyle = c.cursorTracker
            ? `rgba(57,255,20,${alpha})`
            : `rgba(139,92,246,${alpha})`;
          ctx.lineWidth = c.size * (1 - j / c.tail.length);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Glow head
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.size * 6);
        grad.addColorStop(0, c.hueA);
        grad.addColorStop(1, c.hueB);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fill();

        // Cull
        if (
          c.life > c.maxLife ||
          c.x < -60 || c.x > width + 60 ||
          c.y < -60 || c.y > height + 60
        ) {
          comets.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    let raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden
    />
  );
}
