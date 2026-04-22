import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Living starfield with custom GLSL:
 *  - per-star size variation (3 tiers)
 *  - radial-gradient soft glow (no square pixels)
 *  - per-star twinkle phase + speed
 *  - 4-point lens-flare cross spike for ~10% "hero" stars
 */
const STAR_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute float aHero;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vHero;
  uniform float uTime;
  uniform float uPixelRatio;
  void main() {
    vColor = color;
    vHero = aHero;
    float tw = 0.55 + 0.45 * sin(uTime * aSpeed + aPhase);
    vTwinkle = tw;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float sizeBoost = mix(1.0, 1.8, aHero);
    gl_PointSize = aSize * sizeBoost * (300.0 / -mv.z) * uPixelRatio * (0.7 + tw * 0.6);
  }
`;

const STAR_FRAG = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vHero;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    // soft radial glow
    float core = smoothstep(0.5, 0.0, d);
    float halo = pow(core, 2.2);
    // 4-point lens-flare cross spike (only hero stars)
    float spikeH = smoothstep(0.5, 0.0, abs(uv.y) * 12.0) * smoothstep(0.5, 0.0, abs(uv.x));
    float spikeV = smoothstep(0.5, 0.0, abs(uv.x) * 12.0) * smoothstep(0.5, 0.0, abs(uv.y));
    float spike = (spikeH + spikeV) * vHero * 0.6;
    float a = (halo + spike) * vTwinkle;
    vec3 col = vColor + vec3(spike) * 0.4;
    gl_FragColor = vec4(col, a);
  }
`;

interface StarLayerProps {
  count: number;
  spread: number;
  baseSize: number;
  speed: number;
  zOffset?: number;
  heroRatio?: number;
}

function StarLayer({ count, spread, baseSize, speed, zOffset = 0, heroRatio = 0.05 }: StarLayerProps) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors, sizes, phases, speeds, heroes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const heroes = new Float32Array(count);
    // Richer chromatic palette: lavender, purple, blue, white, violet, hot-pink, cyan
    const palette: [number, number, number][] = [
      [0.77, 0.71, 0.99],
      [0.55, 0.36, 0.96],
      [0.38, 0.65, 0.96],
      [0.96, 0.96, 1.0],
      [0.69, 0.53, 0.99],
      [1.0, 0.42, 0.78], // hot pink
      [0.42, 0.92, 0.99], // cyan
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread + zOffset;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
      // Size tiers: 60% tiny, 30% mid, 10% bright
      const r = Math.random();
      const tier = r < 0.6 ? 0.55 : r < 0.9 ? 1.0 : 1.9;
      sizes[i] = baseSize * tier;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.4 + Math.random() * 1.6;
      heroes[i] = Math.random() < heroRatio ? 1.0 : 0.0;
    }
    return { positions, colors, sizes, phases, speeds, heroes };
  }, [count, spread, baseSize, zOffset, heroRatio]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x += delta * speed * 0.25;
      ref.current.rotation.y += mouse.current.x * delta * speed * 4;
      ref.current.rotation.x += mouse.current.y * delta * speed * 2;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
    }),
    []
  );

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-aSize" count={count} array={sizes} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={count} array={phases} itemSize={1} />
        <bufferAttribute attach="attributes-aSpeed" count={count} array={speeds} itemSize={1} />
        <bufferAttribute attach="attributes-aHero" count={count} array={heroes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={STAR_VERT}
        fragmentShader={STAR_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}

/* Slow-drifting volumetric nebula clouds — violet & cyan, crossfading */
function NebulaClouds() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (a.current) {
      a.current.rotation.z = t * 0.008;
      const m = a.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.022 + Math.sin(t * 0.15) * 0.012;
    }
    if (b.current) {
      b.current.rotation.z = -t * 0.005;
      const m = b.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.02 + Math.cos(t * 0.18) * 0.011;
    }
  });

  return (
    <>
      <mesh ref={a} position={[-8, 4, -35]}>
        <planeGeometry args={[90, 90]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={b} position={[10, -6, -40]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.022}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export function StarfieldCanvas() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        {/* Far layer: tiny dust, slow rotation */}
        <StarLayer count={2200} spread={140} baseSize={1.8} speed={0.008} zOffset={-25} heroRatio={0.02} />
        {/* Mid layer */}
        <StarLayer count={1400} spread={110} baseSize={2.6} speed={0.02} zOffset={0} heroRatio={0.06} />
        {/* Near layer: bigger, faster parallax */}
        <StarLayer count={500} spread={80} baseSize={3.6} speed={0.04} zOffset={10} heroRatio={0.12} />
        <NebulaClouds />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60 pointer-events-none" />
    </div>
  );
}
