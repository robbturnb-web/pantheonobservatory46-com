import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

/**
 * Phase 3 — Pantheon Observatory Globe
 *
 * Upgraded textures: NASA Blue Marble day + night-lights + real cloud layer
 * with a day/night shader that follows a virtual sun direction.
 * Markers/arcs mount as children.
 */

// three.js example textures — CC, hosted on threejs.org CDN
const EARTH_DAY    = 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg';
const EARTH_NIGHT  = 'https://threejs.org/examples/textures/planets/earth_lights_2048.png';
const EARTH_SPEC   = 'https://threejs.org/examples/textures/planets/earth_specular_2048.jpg';
const EARTH_NORMAL = 'https://threejs.org/examples/textures/planets/earth_normal_2048.jpg';
const EARTH_CLOUDS = 'https://threejs.org/examples/textures/planets/earth_clouds_1024.png';

const GLOBE_RADIUS = 1;

/** Approx subsolar point in world space (slow daily rotation for cinematic feel). */
function subsolarDirection(t: number): THREE.Vector3 {
  // Tilt 23.4° + slow azimuth sweep
  const az = t * 0.05;
  const tilt = THREE.MathUtils.degToRad(23.4);
  return new THREE.Vector3(
    Math.cos(az),
    Math.sin(tilt) * 0.6,
    Math.sin(az)
  ).normalize();
}

function EarthMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const [day, night, spec, normal, clouds] = useLoader(TextureLoader, [
    EARTH_DAY, EARTH_NIGHT, EARTH_SPEC, EARTH_NORMAL, EARTH_CLOUDS,
  ]);

  // sRGB color textures
  [day, night, clouds].forEach((t) => { (t as THREE.Texture).colorSpace = THREE.SRGBColorSpace; });

  const uniforms = useMemo(() => ({
    uDay:    { value: day },
    uNight:  { value: night },
    uSpec:   { value: spec },
    uNormal: { value: normal },
    uSun:    { value: new THREE.Vector3(1, 0.3, 0.2).normalize() },
  }), [day, night, spec, normal]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.025;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.04;
    if (matRef.current) {
      const t = performance.now() * 0.0001;
      const sun = subsolarDirection(t);
      // Convert sun into earth's local frame (inverse of group rotation)
      const inv = new THREE.Matrix4().makeRotationY(-(groupRef.current?.rotation.y ?? 0));
      sun.applyMatrix4(inv);
      (matRef.current.uniforms.uSun.value as THREE.Vector3).copy(sun);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 128, 128]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
              vUv = uv;
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform sampler2D uDay;
            uniform sampler2D uNight;
            uniform sampler2D uSpec;
            uniform vec3 uSun;
            varying vec2 vUv;
            varying vec3 vNormal;

            void main() {
              vec3 sunDir = normalize(uSun);
              float cosA = dot(normalize(vNormal), sunDir);
              float dayMix = smoothstep(-0.15, 0.25, cosA);

              vec3 dayCol   = texture2D(uDay, vUv).rgb;
              vec3 nightCol = texture2D(uNight, vUv).rgb;
              float ocean   = 1.0 - texture2D(uSpec, vUv).r;

              // Boost city lights on the dark side
              vec3 cityGlow = nightCol * 2.2;

              // Ocean glint near terminator
              float glint = pow(max(0.0, cosA), 24.0) * (1.0 - ocean) * 0.6;

              vec3 color = mix(cityGlow, dayCol, dayMix) + vec3(glint);

              // Subtle violet rim toward the dark limb
              float rim = pow(1.0 - max(0.0, dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 3.0);
              color += vec3(0.18, 0.10, 0.32) * rim * (1.0 - dayMix * 0.6);

              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>

      {/* Real cloud layer */}
      <mesh ref={cloudsRef} scale={1.008}>
        <sphereGeometry args={[GLOBE_RADIUS, 96, 96]} />
        <meshPhongMaterial
          map={clouds}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </mesh>

      {/* Inner atmosphere */}
      <mesh scale={1.025}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          uniforms={{ uColor: { value: new THREE.Color('#22D3EE') } }}
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
              float i = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
              gl_FragColor = vec4(uColor, 1.0) * i * 0.55;
            }
          `}
        />
      </mesh>

      {/* Outer violet halo */}
      <mesh scale={1.08}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          transparent
          side={THREE.BackSide}
          depthWrite={false}
          uniforms={{ uColor: { value: new THREE.Color('#7C3AED') } }}
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
              float i = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
              gl_FragColor = vec4(uColor, 1.0) * i;
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
        <ambientLight intensity={0.15} color="#8b7fd6" />
        <directionalLight position={[5, 3, 5]} intensity={0.6} color="#ffffff" />
        <pointLight position={[-4, -2, -3]} intensity={0.25} color="#22D3EE" />

        <Stars
          radius={50}
          depth={30}
          count={4500}
          factor={2.8}
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
