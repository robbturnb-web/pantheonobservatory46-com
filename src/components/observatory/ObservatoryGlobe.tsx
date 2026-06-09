import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

/**
 * Phase 3 — Pantheon Observatory Globe (Shell)
 *
 * Three.js + react-three-fiber base globe.
 * Default camera framed on Earth, slow auto-rotation, atmospheric glow.
 * Data layers (earthquakes, solar, ISS, UAP, ancient sites, ley lines)
 * will mount as children in subsequent phases.
 */

// NASA Visible Earth Blue Marble — CC public domain, served via threejs.org examples
const EARTH_DAY =
  'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg';
const EARTH_BUMP =
  'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png';
const EARTH_CLOUDS =
  'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png';

const GLOBE_RADIUS = 1;

function EarthMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [day, bump, clouds] = useLoader(TextureLoader, [
    EARTH_DAY,
    EARTH_BUMP,
    EARTH_CLOUDS,
  ]);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.04;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.055;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshPhongMaterial
          map={day}
          bumpMap={bump}
          bumpScale={0.025}
          specular={new THREE.Color('#1a1038')}
          shininess={12}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.012}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshPhongMaterial
          map={clouds}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={1.06}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          uniforms={{
            uColor: { value: new THREE.Color('#7C3AED') },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            uniform vec3 uColor;
            void main() {
              float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
              gl_FragColor = vec4(uColor, 1.0) * intensity;
            }
          `}
        />
      </mesh>
    </group>
  );
}

function GlobeLoader() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 32, 32]} />
      <meshBasicMaterial color="#1A1038" wireframe />
    </mesh>
  );
}

interface ObservatoryGlobeProps {
  className?: string;
  /** Optional layer children (markers, arcs, etc) — wired in later phases. */
  children?: React.ReactNode;
}

export function ObservatoryGlobe({ className, children }: ObservatoryGlobeProps) {
  return (
    <div
      className={
        className ??
        'relative w-full h-[60vh] min-h-[420px] rounded-xl overflow-hidden border border-primary/20 bg-[#05030D]'
      }
    >
      <Canvas
        camera={{ position: [0, 0.4, 3.2], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#05030D', 1);
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.25} color="#8b7fd6" />
        <directionalLight position={[5, 3, 5]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-4, -2, -3]} intensity={0.4} color="#22D3EE" />

        {/* Deep space backdrop */}
        <Stars
          radius={50}
          depth={30}
          count={3500}
          factor={2.5}
          saturation={0}
          fade
          speed={0.4}
        />

        <Suspense fallback={<GlobeLoader />}>
          <EarthMesh />
          {children}
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom
          minDistance={1.6}
          maxDistance={6}
          rotateSpeed={0.4}
          zoomSpeed={0.6}
          autoRotate={false}
        />
      </Canvas>

      {/* HUD overlay */}
      <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/40 backdrop-blur-md border border-primary/30">
        <span className="w-2 h-2 rounded-full bg-signal-online animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/80 font-mono">
          Observatory · Globe Online
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.2em] text-foreground/50 font-mono">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  );
}

export default ObservatoryGlobe;
