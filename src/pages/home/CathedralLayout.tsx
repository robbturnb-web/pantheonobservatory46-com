import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ChevronDown, Zap } from 'lucide-react';
import { useHomeTheme, HomeDomain } from '@/contexts/HomeThemeContext';
import { LiveBackdrop } from '@/components/home/LiveBackdrop';
import { CanvasErrorBoundary } from '@/components/home/CanvasErrorBoundary';
import { isWebGLAvailable } from '@/lib/webgl';

/**
 * Cathedral Layout — a 3D R3F scene of a "star cathedral" with four altars.
 * Mobile fallback renders a simplified parallax SVG version.
 */

interface Altar {
  id: string;
  domain: HomeDomain;
  label: string;
  to: string;
  accent: string;
  position: [number, number, number];
}

const ALTARS: Altar[] = [
  { id: 'pyramid',  domain: 'ancient',    label: 'ANCIENT',   to: '/pyramids', accent: '#fcd34d', position: [-3.2, 0, 0] },
  { id: 'saucer',   domain: 'disclosure', label: 'DISCLOSURE', to: '/uap',     accent: '#ef4444', position: [3.2, 0, 0] },
  { id: 'planet',   domain: 'cosmic',     label: 'COSMOS',     to: '/galaxy',  accent: '#a78bfa', position: [0, 0, -3.2] },
  { id: 'mind',     domain: 'inner',      label: 'MIND',       to: '/consciousness', accent: '#34d399', position: [0, 0, 3.2] },
];

function FloatingArtifact({ altar, hovered, onPointer }: { altar: Altar; hovered: boolean; onPointer: (over: boolean) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime + altar.position[0]) * 0.15;
    }
  });

  // Different artifact geometry per altar
  const geometry = (() => {
    switch (altar.id) {
      case 'pyramid': return <coneGeometry args={[0.6, 1, 4]} />;
      case 'saucer':  return <cylinderGeometry args={[0.8, 0.4, 0.2, 24]} />;
      case 'planet':  return <sphereGeometry args={[0.55, 24, 24]} />;
      case 'mind':    return <icosahedronGeometry args={[0.6, 0]} />;
      default:        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
    }
  })();

  return (
    <group position={altar.position} ref={groupRef}>
      {/* Altar base */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.7, 0.8, 0.3, 8]} />
        <meshStandardMaterial color="#a89571" emissive={hovered ? altar.accent : '#000'} emissiveIntensity={hovered ? 0.3 : 0} />
      </mesh>
      {/* Artifact */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onPointer(true); }}
        onPointerOut={() => onPointer(false)}
      >
        {geometry}
        <meshStandardMaterial
          color={altar.accent}
          emissive={altar.accent}
          emissiveIntensity={hovered ? 1.4 : 0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color={altar.accent} transparent opacity={hovered ? 0.18 : 0.06} />
      </mesh>
    </group>
  );
}

function CathedralColumns() {
  // Six columns arranged in a circle
  const positions: Array<[number, number, number]> = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    positions.push([Math.cos(angle) * 5, 0, Math.sin(angle) * 5]);
  }
  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.3, 0.3, 6, 12]} />
          <meshStandardMaterial color="#d9cfb6" emissive="#fcd34d" emissiveIntensity={0.15} />
        </mesh>
      ))}
      {/* Floor disc */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 32]} />
        <meshStandardMaterial color="#1a1410" emissive="#5a3f0a" emissiveIntensity={0.1} />
      </mesh>
    </>
  );
}

function CathedralStars() {
  const ref = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array>();
  if (!positions.current) {
    const arr = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    positions.current = arr;
  }
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={2000} array={positions.current} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#fff" size={0.15} sizeAttenuation transparent opacity={0.85} />
    </points>
  );
}

function CathedralScene({ onAltarHover }: { onAltarHover: (id: string | null) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 0]} intensity={1.4} color="#fcd34d" />
      <pointLight position={[0, -2, 0]} intensity={0.5} color="#a78bfa" />

      <CathedralStars />
      <CathedralColumns />

      {ALTARS.map((altar) => (
        <FloatingArtifact
          key={altar.id}
          altar={altar}
          hovered={hovered === altar.id}
          onPointer={(over) => {
            const next = over ? altar.id : null;
            setHovered(next);
            onAltarHover(next);
          }}
        />
      ))}
    </>
  );
}

/** SVG fallback for mobile / no-WebGL */
function CathedralFallback({ onHover }: { onHover: (id: HomeDomain | null) => void }) {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {/* Dome */}
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(252,211,77,0.18), transparent 60%)' }} />
      {/* 4 altars in cross layout */}
      {ALTARS.map((altar, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const r = 38;
        const left = 50 + Math.cos(angle) * r;
        const top = 50 + Math.sin(angle) * r;
        return (
          <Link
            key={altar.id}
            to={altar.to}
            onMouseEnter={() => onHover(altar.domain)}
            onMouseLeave={() => onHover(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: `radial-gradient(circle, ${altar.accent}55, transparent 70%)`, border: `1px solid ${altar.accent}` }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl" style={{ color: altar.accent, textShadow: `0 0 10px ${altar.accent}` }}>◈</span>
            </motion.div>
            <div className="mt-2 text-[10px] uppercase tracking-[3px] font-bold" style={{ color: altar.accent }}>
              {altar.label}
            </div>
          </Link>
        );
      })}
      {/* Center eye */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
    </div>
  );
}

export function CathedralLayout() {
  const { setDomain, bind } = useHomeTheme();
  const [isMobile, setIsMobile] = useState(false);
  // Probe WebGL once on mount; default to "available" until we know otherwise
  // so SSR / first paint don't flash the fallback unnecessarily.
  const [webglOk, setWebglOk] = useState(true);
  // Flips to true if the R3F subtree throws at runtime (driver crash, OOM, etc.)
  const [canvasFailed, setCanvasFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    setWebglOk(isWebGLAvailable());
    return () => mq.removeEventListener('change', update);
  }, []);

  // Use the SVG version on mobile, when WebGL isn't usable, or after a crash.
  const useFallback = isMobile || !webglOk || canvasFailed;

  const handleAltarHover = (id: string | null) => {
    if (!id) return setDomain('none');
    const altar = ALTARS.find((a) => a.id === id);
    if (altar) setDomain(altar.domain);
  };

  return (
    <div className="relative">
      <LiveBackdrop />

      <section className="relative min-h-[100vh] overflow-hidden flex flex-col items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center mb-6"
        >
          <div className="text-[10px] uppercase tracking-[6px] text-white/50 mb-2">Star Cathedral</div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            <span style={{ background: 'linear-gradient(90deg, #fcd34d, #fff, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              THE NAVE
            </span>
          </h1>
          <p className="text-sm text-white/60 mt-2">Look at an altar. The light answers.</p>
        </motion.div>

        {/* 3D scene or fallback */}
        <div className="relative w-full max-w-3xl aspect-square">
          {useFallback ? (
            <CathedralFallback onHover={(d) => setDomain(d ?? 'none')} />
          ) : (
            <CanvasErrorBoundary
              fallback={<CathedralFallback onHover={(d) => setDomain(d ?? 'none')} />}
              onFallback={() => setCanvasFailed(true)}
            >
              <Canvas
                camera={{ position: [0, 2, 7], fov: 60 }}
                gl={{ antialias: true, failIfMajorPerformanceCaveat: true }}
                onCreated={({ gl }) => {
                  // If the browser nukes the WebGL context (tab backgrounded,
                  // GPU reset, OOM), switch to the SVG version instead of a
                  // frozen black square.
                  gl.domElement.addEventListener('webglcontextlost', (e) => {
                    e.preventDefault();
                    setCanvasFailed(true);
                  });
                }}
              >
                <CathedralScene onAltarHover={handleAltarHover} />
              </Canvas>
            </CanvasErrorBoundary>
          )}

          {/* Click overlay for desktop (R3F doesn't navigate by itself) */}
          {!useFallback && (
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
              {ALTARS.map((altar, i) => (
                <Link
                  key={altar.id}
                  to={altar.to}
                  {...bind(altar.domain)}
                  className="pointer-events-auto opacity-0"
                  aria-label={altar.label}
                  style={{ gridColumn: i % 2 === 0 ? 1 : 2, gridRow: i < 2 ? 1 : 2 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Altar legend */}
        <div className="relative z-20 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl w-full">
          {ALTARS.map((altar) => (
            <Link
              key={altar.id}
              to={altar.to}
              {...bind(altar.domain)}
              className="glass-cosmic rounded-lg px-3 py-2 text-center transition-colors hover:border-white/30"
              style={{ borderColor: `${altar.accent}33` }}
            >
              <div className="text-[10px] uppercase tracking-[3px] font-bold" style={{ color: altar.accent }}>
                {altar.label}
              </div>
              <div className="text-[9px] text-white/50 mt-0.5">{altar.to}</div>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center pointer-events-none">
          <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
        </div>
      </section>
    </div>
  );
}
