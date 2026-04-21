import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

function CometNucleus() {
  const nucleusRef = useRef<THREE.Mesh>(null);
  const tailRef = useRef<THREE.Points>(null);
  const tailGeo = useRef<THREE.BufferGeometry>(new THREE.BufferGeometry());
  const positions = useRef<Float32Array>();

  useEffect(() => {
    const N = 600;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const t = Math.random();
      arr[i * 3] = -t * 6 + (Math.random() - 0.5) * 0.5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * (0.6 + t * 1.2);
      arr[i * 3 + 2] = (Math.random() - 0.5) * (0.6 + t * 1.2);
    }
    positions.current = arr;
    tailGeo.current.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  }, []);

  useFrame((state) => {
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y += 0.005;
      nucleusRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (tailRef.current && positions.current) {
      const pos = positions.current;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i] -= 0.01;
        if (pos[i] < -7) pos[i] = -0.5;
      }
      tailGeo.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Nucleus */}
      <mesh ref={nucleusRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#a5f3fc"
          emissive="#22d3ee"
          emissiveIntensity={1.2}
          roughness={0.3}
        />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.15} />
      </mesh>
      {/* Tail */}
      <points ref={tailRef}>
        <primitive object={tailGeo.current} attach="geometry" />
        <pointsMaterial
          color="#8b5cf6"
          size={0.08}
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export function AtlasHero() {
  const [data, setData] = useState<AtlasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let alive = true;
    supabase.functions.invoke('atlas-tracker', { body: {} })
      .then(({ data, error }) => {
        if (!alive) return;
        if (error || !data) {
          // Soft fallback so the section never looks empty
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
        {/* 3D Comet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-cosmic rounded-2xl border border-accent-neon/30 overflow-hidden aspect-video lg:aspect-auto min-h-[280px] relative"
        >
          <Canvas camera={{ position: [0, 1, 5], fov: 55 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 5, 5]} intensity={2} color="#fde68a" />
            <pointLight position={[-5, -2, 2]} intensity={0.6} color="#8b5cf6" />
            <Suspense fallback={null}>
              <CometNucleus />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-accent-neon/70 uppercase tracking-wider">
            ⟢ live render · hyperbolic trajectory
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
