import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

const COLORS = [
  { hue: 270, name: 'purple' },   // primary violet
  { hue: 200, name: 'cyan' },     // cosmic blue
  { hue: 320, name: 'magenta' },  // nebula pink
  { hue: 45, name: 'gold' },      // solar gold
  { hue: 160, name: 'teal' },     // aurora green
];

export function CosmicCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef<number>(0);
  const colorIndexRef = useRef(0);

  const createParticle = useCallback((x: number, y: number) => {
    const color = COLORS[colorIndexRef.current % COLORS.length];
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.3;
    const maxLife = Math.random() * 40 + 20;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.5,
      life: maxLife,
      maxLife,
      size: Math.random() * 3 + 1,
      hue: color.hue + (Math.random() - 0.5) * 30,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Slowly cycle colors
    const colorInterval = setInterval(() => {
      colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length;
    }, 3000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = mouseRef.current;
      const { x: px, y: py } = prevMouseRef.current;
      const dx = x - px;
      const dy = y - py;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles based on movement speed
      const count = Math.min(Math.floor(speed * 0.4) + 1, 5);
      if (x > 0 && y > 0) {
        for (let i = 0; i < count; i++) {
          const t = i / count;
          particlesRef.current.push(
            createParticle(px + dx * t, py + dy * t)
          );
        }
      }

      prevMouseRef.current = { x, y };

      // Update & draw
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02; // gentle gravity
        p.life -= 1;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.life <= 0) return false;

        const alpha = (p.life / p.maxLife) * 0.7;
        const size = p.size * (p.life / p.maxLife);

        // Glow
        ctx.save();
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 1)`;
        ctx.fill();

        // Core
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, 1)`;
        ctx.fill();
        ctx.restore();

        return true;
      });

      // Cap particles
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-200);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(colorInterval);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
