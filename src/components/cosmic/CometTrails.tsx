import { useEffect, useRef } from 'react';

/**
 * Cinematic cursor-aware comet trails.
 * - Each comet has a hot-white nucleus, glowing radial coma, tapered tail, and sparkle debris.
 * - 1 free-flight comet every ~30-50s, plus a curious cursor-tracker that gently arcs near the cursor.
 * - Rare fireball event every 3-5 minutes: large meteor with long orange tail and white flash.
 * - Pure canvas, additive blending, GPU-cheap.
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

    interface Spark {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number;
    }

    interface Comet {
      x: number; y: number;
      vx: number; vy: number;
      tail: { x: number; y: number }[];
      sparks: Spark[];
      life: number; maxLife: number;
      coreColor: string;
      tailColor: [number, number, number]; // rgb
      size: number;
      kind: 'free' | 'tracker' | 'fireball';
    }

    const comets: Comet[] = [];

    const spawnFreeFlight = () => {
      const edge = Math.floor(Math.random() * 4);
      let x = 0, y = 0, vx = 0, vy = 0;
      const speed = 2.2 + Math.random() * 2;
      switch (edge) {
        case 0: x = Math.random() * width; y = -30; vx = (Math.random() - 0.5) * 1.5; vy = speed; break;
        case 1: x = width + 30; y = Math.random() * height; vx = -speed; vy = (Math.random() - 0.5) * 1.5; break;
        case 2: x = Math.random() * width; y = height + 30; vx = (Math.random() - 0.5) * 1.5; vy = -speed; break;
        case 3: x = -30; y = Math.random() * height; vx = speed; vy = (Math.random() - 0.5) * 1.5; break;
      }
      // Violet ice comet
      comets.push({
        x, y, vx, vy,
        tail: [], sparks: [],
        life: 0, maxLife: 320,
        coreColor: '#ffffff',
        tailColor: [167, 139, 250],
        size: 2.2,
        kind: 'free',
      });
    };

    const spawnTracker = () => {
      const fromLeft = Math.random() > 0.5;
      comets.push({
        x: fromLeft ? -40 : width + 40,
        y: Math.random() * height,
        vx: fromLeft ? 2.2 : -2.2,
        vy: (Math.random() - 0.5) * 0.8,
        tail: [], sparks: [],
        life: 0, maxLife: 460,
        coreColor: '#ffffff',
        tailColor: [110, 231, 183], // soft mint-green
        size: 2.4,
        kind: 'tracker',
      });
    };

    const spawnFireball = () => {
      const fromLeft = Math.random() > 0.5;
      const angleY = (Math.random() - 0.5) * 1.2;
      comets.push({
        x: fromLeft ? -60 : width + 60,
        y: Math.random() * height * 0.6,
        vx: fromLeft ? 6 : -6,
        vy: angleY * 2,
        tail: [], sparks: [],
        life: 0, maxLife: 200,
        coreColor: '#fff7e0',
        tailColor: [255, 170, 60],
        size: 4.5,
        kind: 'fireball',
      });
    };

    let lastSpawn = 0;
    let lastTracker = 0;
    let lastFireball = -90000; // delay first fireball

    const loop = (t: number) => {
      // Soft trail-fade instead of full clear → richer streaks
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Spawn free-flight every 30-50s
      if (t - lastSpawn > 30000 + Math.random() * 20000) {
        spawnFreeFlight();
        lastSpawn = t;
      }
      // Cursor tracker if mouse moved recently (every ~25s)
      if (t - lastTracker > 25000 && t - mouseRef.current.lastMove < 8000) {
        spawnTracker();
        lastTracker = t;
      }
      // Fireball every 3-5 minutes
      if (t - lastFireball > 180000 + Math.random() * 120000) {
        spawnFireball();
        lastFireball = t;
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.life++;

        // Tracker steers toward cursor while it's recent (gentle arc)
        if (c.kind === 'tracker' && t - mouseRef.current.lastMove < 5000) {
          const dx = mouseRef.current.x - c.x;
          const dy = mouseRef.current.y - c.y;
          const dist = Math.hypot(dx, dy) || 1;
          // Falloff: stronger when far, gentler when close so it doesn't dive
          const proximity = Math.min(1, dist / 400);
          const steer = 0.04 * proximity;
          c.vx += (dx / dist) * steer;
          c.vy += (dy / dist) * steer;
          const sp = Math.hypot(c.vx, c.vy);
          const max = 3.2;
          if (sp > max) { c.vx = (c.vx / sp) * max; c.vy = (c.vy / sp) * max; }
        }

        c.x += c.vx;
        c.y += c.vy;
        c.tail.unshift({ x: c.x, y: c.y });
        const maxTail = c.kind === 'fireball' ? 60 : 32;
        if (c.tail.length > maxTail) c.tail.pop();

        // Sparkle debris emission
        if (Math.random() < (c.kind === 'fireball' ? 0.9 : 0.35)) {
          c.sparks.push({
            x: c.x + (Math.random() - 0.5) * 4,
            y: c.y + (Math.random() - 0.5) * 4,
            vx: -c.vx * 0.1 + (Math.random() - 0.5) * 0.6,
            vy: -c.vy * 0.1 + (Math.random() - 0.5) * 0.6,
            life: 0,
            maxLife: 30 + Math.random() * 30,
            size: 0.6 + Math.random() * 1.2,
          });
        }

        // Tapered tail with falloff curve
        const [tr, tg, tb] = c.tailColor;
        for (let j = c.tail.length - 1; j > 0; j--) {
          const a = c.tail[j];
          const b = c.tail[j - 1];
          const k = j / c.tail.length; // 0 at head, 1 at tip
          const taperAlpha = Math.pow(1 - k, 1.6) * (c.kind === 'fireball' ? 0.85 : 0.55);
          const taperWidth = c.size * Math.pow(1 - k, 0.7);
          ctx.strokeStyle = `rgba(${tr},${tg},${tb},${taperAlpha})`;
          ctx.lineWidth = Math.max(0.3, taperWidth);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        // Sparkles (twinkle then fade)
        for (let k = c.sparks.length - 1; k >= 0; k--) {
          const sp = c.sparks[k];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.life++;
          const lifeT = sp.life / sp.maxLife;
          if (lifeT >= 1) { c.sparks.splice(k, 1); continue; }
          const flicker = 0.6 + 0.4 * Math.sin(sp.life * 0.6);
          const alpha = (1 - lifeT) * flicker;
          ctx.fillStyle = `rgba(${tr},${tg},${tb},${alpha})`;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Glowing radial coma (soft halo around nucleus)
        const comaR = c.size * (c.kind === 'fireball' ? 14 : 9);
        const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, comaR);
        grad.addColorStop(0, `rgba(${tr},${tg},${tb},0.9)`);
        grad.addColorStop(0.4, `rgba(${tr},${tg},${tb},0.25)`);
        grad.addColorStop(1, `rgba(${tr},${tg},${tb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(c.x, c.y, comaR, 0, Math.PI * 2);
        ctx.fill();

        // Hot white nucleus (hard center)
        ctx.fillStyle = c.coreColor;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size * 0.9, 0, Math.PI * 2);
        ctx.fill();

        // Fireball flash near death
        if (c.kind === 'fireball' && c.life > c.maxLife - 25) {
          const fk = (c.life - (c.maxLife - 25)) / 25;
          ctx.fillStyle = `rgba(255,240,200,${(1 - fk) * 0.4})`;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.size * 18 * fk, 0, Math.PI * 2);
          ctx.fill();
        }

        if (
          c.life > c.maxLife ||
          c.x < -100 || c.x > width + 100 ||
          c.y < -100 || c.y > height + 100
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
