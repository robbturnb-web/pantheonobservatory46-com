import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Telescope, Zap, Calendar, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AtlasData {
  name: string;
  distanceFromEarthAu: number | null;
  speedKmS: number | null;
  closestApproachDate: string | null;
  constellation: string | null;
  notes: string | null;
  updatedAt: string;
  sourceUrl?: string;
  companions?: { name: string; status: string; note: string }[];
}

/* The sun positioned off-screen-right so tails point physically away (orbital realism) */
const SUN_POSITION = new THREE.Vector3(12, 2, -2);

function CometNucleus() {
  const nucleusRef = useRef<THREE.Mesh>(null);
  const coma1 = useRef<THREE.Mesh>(null);
  const coma2 = useRef<THREE.Mesh>(null);
  const coma3 = useRef<THREE.Mesh>(null);

  // High-detail cratered sphere via vertex displacement (procedural)
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.55, 4);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = v.clone().normalize();
      const big = Math.sin(n.x * 4 + 0.7) * Math.cos(n.y * 4 - 0.3) * 0.06;
      const med = Math.sin(n.x * 9 + n.z * 7) * 0.03;
      const crater = Math.cos(n.y * 18 + n.z * 14) * Math.sin(n.x * 16) * 0.018;
      const offset = big + med + crater;
      v.addScaledVector(n, offset);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y += 0.004;
      nucleusRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
    // Coma pulse — 4-second breath cycle
    const breath = 1 + Math.sin(t * (Math.PI * 2) / 4) * 0.08;
    if (coma1.current) {
      coma1.current.scale.setScalar(breath);
      (coma1.current.material as THREE.MeshBasicMaterial).opacity = 0.28 + Math.sin(t * 1.5) * 0.05;
    }
    if (coma2.current) {
      coma2.current.scale.setScalar(1 + (breath - 1) * 1.4);
      (coma2.current.material as THREE.MeshBasicMaterial).opacity = 0.13 + Math.sin(t * 1.5 + 0.5) * 0.04;
    }
    if (coma3.current) {
      coma3.current.scale.setScalar(1 + (breath - 1) * 1.8);
    }
  });

  return (
    <group>
      <mesh ref={nucleusRef} geometry={geometry}>
        <meshStandardMaterial
          color="#cfd9e0"
          emissive="#22d3ee"
          emissiveIntensity={0.18}
          roughness={0.55}
          metalness={0.15}
          flatShading={false}
        />
      </mesh>
      <mesh ref={coma1}>
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={coma2}>
        <sphereGeometry args={[1.05, 24, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.13} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={coma3}>
        <sphereGeometry args={[1.5, 18, 18]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.05} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* Round glowing point shader for tail particles (radial gradient, no square pixels) */
const TAIL_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aLife;
  varying float vLife;
  varying float vSize;
  uniform float uPixelRatio;
  void main() {
    vLife = aLife;
    vSize = aSize;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (300.0 / -mv.z) * uPixelRatio;
  }
`;
const TAIL_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorCore;
  uniform vec3 uColorTip;
  varying float vLife;
  varying float vSize;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float halo = pow(core, 2.4);
    vec3 col = mix(uColorCore, uColorTip, vLife);
    float a = halo * (1.0 - vLife * 0.85);
    gl_FragColor = vec4(col, a);
  }
`;

/* Straight ion tail — points directly away from sun, electric blue → white at root */
function IonTail() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 4000;

  // Direction away from sun (sun is at +X mostly), so tail extends along -direction
  const sunDir = useMemo(() => SUN_POSITION.clone().normalize(), []);
  const tailDir = useMemo(() => sunDir.clone().multiplyScalar(-1), [sunDir]);

  const { positions, velocities, lives, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT);
    const lives = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random();
      const r = (1 - t) * 0.25 + 0.05;
      const angle = Math.random() * Math.PI * 2;
      const offX = Math.cos(angle) * r * (1 - t * 0.3);
      const offY = Math.sin(angle) * r * (1 - t * 0.3);
      const dist = t * 7;
      positions[i * 3] = tailDir.x * dist + offX;
      positions[i * 3 + 1] = tailDir.y * dist + offY;
      positions[i * 3 + 2] = tailDir.z * dist;
      velocities[i] = 0.012 + Math.random() * 0.02;
      lives[i] = t;
      // Head particles bigger, tip particles tiny — real taper
      sizes[i] = (1 - t) * 22 + 4 + Math.random() * 3;
    }
    return { positions, velocities, lives, sizes };
  }, [tailDir]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aLife', new THREE.BufferAttribute(lives, 1));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, lives, sizes]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      uColorCore: { value: new THREE.Color('#ffffff') },
      uColorTip: { value: new THREE.Color('#22d3ee') },
    }),
    []
  );

  useFrame(() => {
    const arr = geom.attributes.position.array as Float32Array;
    const lifeArr = geom.attributes.aLife.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      lives[i] += velocities[i];
      if (lives[i] > 1) lives[i] = 0;
      const t = lives[i];
      const dist = t * 7;
      const angle = (i * 1.7) % (Math.PI * 2);
      const r = (1 - t) * 0.25 + 0.05;
      const offX = Math.cos(angle + t * 0.3) * r * (1 - t * 0.3);
      const offY = Math.sin(angle + t * 0.3) * r * (1 - t * 0.3);
      arr[i * 3] = tailDir.x * dist + offX;
      arr[i * 3 + 1] = tailDir.y * dist + offY;
      arr[i * 3 + 2] = tailDir.z * dist;
      lifeArr[i] = t;
    }
    geom.attributes.position.needsUpdate = true;
    geom.attributes.aLife.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geom}>
      <shaderMaterial
        vertexShader={TAIL_VERT}
        fragmentShader={TAIL_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Curved dust tail — golden amber, lags behind orbit */
function DustTail() {
  const COUNT = 3000;
  const sunDir = useMemo(() => SUN_POSITION.clone().normalize(), []);
  const tailDir = useMemo(() => sunDir.clone().multiplyScalar(-1), [sunDir]);
  // Perpendicular for curve direction
  const perp = useMemo(() => new THREE.Vector3(0, -1, 0).cross(tailDir).normalize(), [tailDir]);

  const { positions, velocities, lives, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT);
    const lives = new Float32Array(COUNT);
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random();
      lives[i] = t;
      velocities[i] = 0.008 + Math.random() * 0.015;
      const dist = t * 6;
      const curve = Math.pow(t, 1.6) * 1.6;
      const angle = Math.random() * Math.PI * 2;
      const r = (1 - t) * 0.3 + 0.06;
      const offX = Math.cos(angle) * r;
      const offY = Math.sin(angle) * r;
      positions[i * 3] = tailDir.x * dist + perp.x * curve + offX;
      positions[i * 3 + 1] = tailDir.y * dist + perp.y * curve - 0.2 * t + offY;
      positions[i * 3 + 2] = tailDir.z * dist + perp.z * curve;
      sizes[i] = (1 - t) * 26 + 5 + Math.random() * 4;
    }
    return { positions, velocities, lives, sizes };
  }, [tailDir, perp]);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aLife', new THREE.BufferAttribute(lives, 1));
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, lives, sizes]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
      uColorCore: { value: new THREE.Color('#fff7ed') },
      uColorTip: { value: new THREE.Color('#fbbf24') },
    }),
    []
  );

  useFrame(() => {
    const arr = geom.attributes.position.array as Float32Array;
    const lifeArr = geom.attributes.aLife.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      lives[i] += velocities[i];
      if (lives[i] > 1) lives[i] = 0;
      const t = lives[i];
      const dist = t * 6;
      const curve = Math.pow(t, 1.6) * 1.6;
      const angle = (i * 2.3) % (Math.PI * 2);
      const r = (1 - t) * 0.3 + 0.06;
      arr[i * 3] = tailDir.x * dist + perp.x * curve + Math.cos(angle) * r;
      arr[i * 3 + 1] = tailDir.y * dist + perp.y * curve - 0.2 * t + Math.sin(angle) * r;
      arr[i * 3 + 2] = tailDir.z * dist + perp.z * curve;
      lifeArr[i] = t;
    }
    geom.attributes.position.needsUpdate = true;
    geom.attributes.aLife.needsUpdate = true;
  });

  return (
    <points geometry={geom}>
      <shaderMaterial
        vertexShader={TAIL_VERT}
        fragmentShader={TAIL_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Distant glowing sun (off-frame light source) */
function DistantSun() {
  return (
    <group position={SUN_POSITION}>
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshBasicMaterial color="#fde68a" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.4, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight intensity={3.5} distance={40} color="#fde68a" />
    </group>
  );
}

/* Subtle camera drift */
function CameraDrift() {
  const { camera } = useThree();
  const base = useRef(new THREE.Vector3(0, 1, 5));

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.12;
    camera.position.x = base.current.x + Math.sin(t) * 0.6;
    camera.position.y = base.current.y + Math.cos(t * 0.7) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* Animated live-distance ticker for the HUD */
function LiveDistanceTicker() {
  const [val, setVal] = useState(1.81);
  useEffect(() => {
    const id = setInterval(() => {
      setVal((v) => {
        const next = v + (Math.random() - 0.45) * 0.0007;
        return Math.max(1.7, Math.min(1.95, next));
      });
    }, 600);
    return () => clearInterval(id);
  }, []);
  return <>Δ{val.toFixed(4)} AU</>;
}


  const [data, setData] = useState<AtlasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase.functions.invoke('atlas-tracker', { body: {} })
      .then(({ data, error }) => {
        if (!alive) return;
        if (error || !data) {
          setData({
            name: '3I/ATLAS',
            distanceFromEarthAu: 1.81,
            speedKmS: 58,
            closestApproachDate: '2025-12-19',
            constellation: 'Sagittarius',
            notes: 'Third confirmed interstellar object. Hyperbolic trajectory; under active observation by JWST and ground observatories.',
            updatedAt: new Date().toISOString(),
            sourceUrl: 'https://theskylive.com/3iatlas-info',
            companions: [
              { name: 'C/2024 G3 (ATLAS)', status: 'Post-perihelion', note: 'Faded after January 2025 close approach.' },
              { name: 'C/2023 A3 (Tsuchinshan-ATLAS)', status: 'Outbound', note: 'Naked-eye visible Oct 2024; now receding.' },
            ],
          });
        } else {
          setData(data as AtlasData);
        }
        setLoading(false);
      })
      .catch(() => {
        if (alive) setLoading(false);
      });
    return () => { alive = false; };
  }, []);

  return (
    <section className="relative px-4 py-12 sm:py-16 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-neon/10 border border-accent-neon/30 text-[10px] uppercase tracking-[3px] text-accent-neon mb-3">
          <Telescope className="w-3 h-3" />
          Live Interstellar Tracker
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground mb-2">
          3I/<span className="text-accent-neon neon-glow">ATLAS</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Third confirmed interstellar object — and it's still moving.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        {/* 3D Comet — telescope-feed style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-cosmic rounded-2xl border border-accent-neon/30 overflow-hidden aspect-video lg:aspect-auto min-h-[280px] relative"
        >
          <Canvas camera={{ position: [0, 1, 5], fov: 55 }} dpr={[1, 1.5]}>
            <color attach="background" args={['#02030a']} />
            <ambientLight intensity={0.25} />
            <directionalLight position={SUN_POSITION.toArray()} intensity={1.6} color="#fde68a" />
            <pointLight position={[-4, -2, 2]} intensity={0.4} color="#a78bfa" />
            <Suspense fallback={null}>
              <Stars radius={60} depth={40} count={1500} factor={3} fade speed={0.4} />
              <DistantSun />
              <CometNucleus />
              <IonTail />
              <DustTail />
              <CameraDrift />
            </Suspense>
          </Canvas>

          {/* HUD overlay — holographic brackets, crosshair, drifting scanlines, REC blink */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Corner brackets w/ chromatic aberration */}
            <div className="hud-aberration absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 border-accent-neon/60" />
            <div className="hud-aberration absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 border-accent-neon/60" />
            <div className="hud-aberration absolute bottom-2 left-2 w-5 h-5 border-l-2 border-b-2 border-accent-neon/60" />
            <div className="hud-aberration absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-accent-neon/60" />
            {/* Center crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-30">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-accent-neon" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent-neon" />
              <div className="absolute inset-3 border border-accent-neon rounded-full" />
            </div>
            {/* Drifting CRT scanlines */}
            <div className="hud-scanlines absolute inset-0 opacity-[0.09]" />
            {/* Sun lens flare bar (faint horizontal streak from sun direction — right side) */}
            <div
              className="absolute top-1/2 right-0 -translate-y-1/2 w-2/3 h-8 opacity-30 mix-blend-screen"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(253, 230, 138, 0.0) 30%, rgba(253, 230, 138, 0.4) 75%, rgba(255, 255, 255, 0.6) 95%, transparent 100%)',
                filter: 'blur(3px)',
              }}
            />
            {/* Telemetry label + REC blink */}
            <div className="absolute top-3 left-9 flex items-center gap-2 text-[9px] font-mono text-accent-neon/80 uppercase tracking-[2px]">
              <span className="hud-rec inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
              REC · JWST·NEAR-IR
            </div>
            <div className="absolute top-3 right-9 text-[9px] font-mono text-accent-neon/70 uppercase tracking-[2px]">
              <LiveDistanceTicker />
            </div>
            <div className="absolute bottom-3 right-9 text-[9px] font-mono text-accent-neon/70 uppercase tracking-[2px]">
              ⟢ HYPERBOLIC TRAJECTORY
            </div>
            <div className="absolute bottom-3 left-9 text-[9px] font-mono text-accent-neon/60 uppercase tracking-[2px]">
              SIG·LOCK ▮▮▮▮▯
            </div>
          </div>
        </motion.div>

        {/* Live data card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-cosmic rounded-2xl border border-primary/30 p-5 sm:p-6 flex flex-col"
        >
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : data ? (
            <>
              <div className="text-[10px] uppercase tracking-[3px] text-primary mb-3">Current Telemetry</div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Stat label="Distance" value={data.distanceFromEarthAu != null ? `${data.distanceFromEarthAu.toFixed(2)} AU` : '—'} />
                <Stat label="Speed" value={data.speedKmS != null ? `${data.speedKmS.toFixed(0)} km/s` : '—'} icon={Zap} />
                <Stat label="Closest Approach" value={data.closestApproachDate ?? '—'} icon={Calendar} />
                <Stat label="Constellation" value={data.constellation ?? '—'} icon={MapPin} />
              </div>

              {data.notes && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{data.notes}</p>
              )}

              <button
                onClick={() => setExpanded((v) => !v)}
                className="w-full text-xs uppercase tracking-[3px] text-primary flex items-center justify-center gap-1 py-2 border-t border-border hover:text-accent-neon transition-colors"
              >
                What is 3I/ATLAS?
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-xs text-muted-foreground space-y-2 pt-3 leading-relaxed">
                      <p>
                        <strong className="text-foreground">3I/ATLAS</strong> is the third known interstellar object
                        (after 1I/ʻOumuamua and 2I/Borisov). Discovered July 2025 by the ATLAS survey, it's on a
                        hyperbolic, sun-bound path — meaning it came from outside our solar system and will leave again.
                      </p>
                      <p>
                        Anomalies under study: non-gravitational acceleration, unusual brightening curves, and
                        spectroscopic signatures that don't perfectly match standard cometary chemistry.
                      </p>
                      {data.sourceUrl && (
                        <a
                          href={data.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80"
                        >
                          Live tracker on TheSkyLive <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : null}
        </motion.div>
      </div>

      {/* Comet Watch */}
      {data?.companions && data.companions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 glass-cosmic rounded-2xl border border-border p-5"
        >
          <div className="text-[10px] uppercase tracking-[3px] text-accent-neon mb-3">Comet Watch</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.companions.map((c) => (
              <div key={c.name} className="rounded-xl border border-border bg-black/30 p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-sm text-foreground">{c.name}</h4>
                  <span className="text-[9px] uppercase tracking-wider text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon?: typeof Zap }) {
  return (
    <div className="rounded-xl border border-border bg-black/40 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </div>
      <div className="text-base sm:text-lg font-bold text-accent-neon font-mono tracking-tight">
        {value}
      </div>
    </div>
  );
}
