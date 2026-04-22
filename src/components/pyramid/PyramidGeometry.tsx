import { useMemo } from 'react';
import type { Pyramid } from '../../data/pyramids';

/**
 * Per-pyramid geometry builders.
 * - Stepped: Mesoamerican (Teotihuacan, Kukulcán) — stacked tiers + stairs on one face.
 * - Smooth: Egyptian/Nubian (Giza, Meroë) — clean 4-sided pyramid with a slight bevel.
 * - Bent: Dahshur — angle change halfway up (here we use a different pyramid mapping if added).
 * - Ziggurat: stepped with vertical sides (Ur).
 *
 * Style is selected by pyramid id.
 */

type Style = 'smooth' | 'stepped' | 'ziggurat' | 'bent';

function styleForId(id: string): Style {
  switch (id) {
    case 'teotihuacan':
    case 'kukulcan':
      return 'stepped';
    case 'ziggurat':
      return 'ziggurat';
    case 'bent':
      return 'bent';
    default:
      return 'smooth'; // giza, nubian, bosnian
  }
}

interface PyramidProps {
  pyramid: Pyramid;
  emissiveIntensity: number;
}

/* Smooth limestone pyramid (Giza-style) — 4-sided, slight bevel via segmented cone with bevel detail */
function SmoothPyramid({ pyramid, emissiveIntensity }: PyramidProps) {
  const s = pyramid.scale;
  return (
    <group>
      {/* Main body */}
      <mesh>
        <coneGeometry args={[s, s * 1.55, 4]} />
        <meshStandardMaterial
          color={pyramid.color}
          emissive={pyramid.accentColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.85}
          metalness={0.08}
          flatShading
        />
      </mesh>
      {/* Capstone (slightly brighter limestone) */}
      <mesh position={[0, s * 0.62, 0]}>
        <coneGeometry args={[s * 0.18, s * 0.25, 4]} />
        <meshStandardMaterial
          color="#e8d4a8"
          emissive={pyramid.accentColor}
          emissiveIntensity={emissiveIntensity * 1.4}
          roughness={0.6}
          metalness={0.15}
          flatShading
        />
      </mesh>
    </group>
  );
}

/* Stepped Mesoamerican pyramid — stacked tiers with a staircase on the south face */
function SteppedPyramid({ pyramid, emissiveIntensity }: PyramidProps) {
  const s = pyramid.scale;
  const tiers = 6;
  const totalHeight = s * 1.4;
  const tierHeight = totalHeight / tiers;

  // Pre-compute tier sizes
  const tierData = useMemo(() => {
    const arr: { y: number; size: number }[] = [];
    for (let i = 0; i < tiers; i++) {
      const k = i / tiers;
      const size = s * (1 - k * 0.85);
      const y = i * tierHeight - totalHeight / 2 + tierHeight / 2;
      arr.push({ y, size });
    }
    return arr;
  }, [s, tierHeight, totalHeight]);

  // Staircase steps on +Z face
  const stairCount = 8;
  return (
    <group>
      {tierData.map((t, i) => (
        <mesh key={i} position={[0, t.y, 0]}>
          <boxGeometry args={[t.size * 1.7, tierHeight * 0.95, t.size * 1.7]} />
          <meshStandardMaterial
            color={pyramid.color}
            emissive={pyramid.accentColor}
            emissiveIntensity={emissiveIntensity * (0.6 + i * 0.08)}
            roughness={0.95}
            metalness={0.05}
            flatShading
          />
        </mesh>
      ))}
      {/* Staircase on +Z face */}
      {Array.from({ length: stairCount }, (_, i) => {
        const k = i / stairCount;
        const y = -totalHeight / 2 + (i + 0.5) * (totalHeight / stairCount);
        const w = s * (1 - k * 0.7) * 0.25;
        const z = s * (1 - k * 0.7) * 0.85;
        return (
          <mesh key={`stair-${i}`} position={[0, y, z]}>
            <boxGeometry args={[w, totalHeight / stairCount * 0.7, 0.08]} />
            <meshStandardMaterial
              color="#8a7256"
              emissive={pyramid.accentColor}
              emissiveIntensity={emissiveIntensity * 0.5}
              roughness={1}
              flatShading
            />
          </mesh>
        );
      })}
      {/* Sun-disc on top (Teotihuacan flair) */}
      {pyramid.id === 'teotihuacan' && (
        <mesh position={[0, totalHeight / 2 + 0.15, 0]}>
          <cylinderGeometry args={[s * 0.18, s * 0.18, 0.06, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={1.2}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
      )}
      {/* Top platform */}
      <mesh position={[0, totalHeight / 2 + 0.04, 0]}>
        <boxGeometry args={[s * 0.18, 0.08, s * 0.18]} />
        <meshStandardMaterial
          color={pyramid.color}
          emissive={pyramid.accentColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.9}
          flatShading
        />
      </mesh>
    </group>
  );
}

/* Ziggurat — stepped with vertical sides, fewer larger tiers */
function ZigguratPyramid({ pyramid, emissiveIntensity }: PyramidProps) {
  const s = pyramid.scale;
  const tiers = 3;
  const totalHeight = s * 1.2;
  const tierHeight = totalHeight / tiers;

  return (
    <group>
      {Array.from({ length: tiers }, (_, i) => {
        const k = i / tiers;
        const size = s * (1 - k * 0.55);
        const y = i * tierHeight - totalHeight / 2 + tierHeight / 2;
        return (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[size * 1.7, tierHeight * 0.97, size * 1.7]} />
            <meshStandardMaterial
              color={pyramid.color}
              emissive={pyramid.accentColor}
              emissiveIntensity={emissiveIntensity * (0.7 + i * 0.1)}
              roughness={0.95}
              flatShading
            />
          </mesh>
        );
      })}
      {/* Central staircase */}
      <mesh position={[0, -totalHeight / 2 + tierHeight * 0.5, s * 0.86]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[s * 0.4, tierHeight * 1.1, 0.08]} />
        <meshStandardMaterial color="#6b5740" roughness={1} flatShading />
      </mesh>
      {/* Top temple */}
      <mesh position={[0, totalHeight / 2 + 0.12, 0]}>
        <boxGeometry args={[s * 0.5, 0.25, s * 0.5]} />
        <meshStandardMaterial
          color="#a8896f"
          emissive={pyramid.accentColor}
          emissiveIntensity={emissiveIntensity * 1.3}
          roughness={0.8}
        />
      </mesh>
    </group>
  );
}

/* Bent pyramid — angle change halfway up */
function BentPyramid({ pyramid, emissiveIntensity }: PyramidProps) {
  const s = pyramid.scale;
  return (
    <group>
      {/* Lower section (steeper) */}
      <mesh position={[0, -s * 0.2, 0]}>
        <coneGeometry args={[s, s * 0.9, 4]} />
        <meshStandardMaterial
          color={pyramid.color}
          emissive={pyramid.accentColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.85}
          flatShading
        />
      </mesh>
      {/* Upper section (shallower) */}
      <mesh position={[0, s * 0.5, 0]}>
        <coneGeometry args={[s * 0.55, s * 0.7, 4]} />
        <meshStandardMaterial
          color={pyramid.color}
          emissive={pyramid.accentColor}
          emissiveIntensity={emissiveIntensity * 1.1}
          roughness={0.85}
          flatShading
        />
      </mesh>
    </group>
  );
}

/* Sphinx — sits next to Giza */
export function Sphinx({ scale }: { scale: number }) {
  const s = scale * 0.35;
  return (
    <group position={[scale * 1.4, -scale * 0.55, scale * 0.6]} rotation={[0, -0.4, 0]}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[s * 1.6, s * 0.5, s * 0.55]} />
        <meshStandardMaterial color="#c8a876" roughness={0.9} flatShading />
      </mesh>
      {/* Front legs */}
      <mesh position={[s * 0.6, -s * 0.35, 0]}>
        <boxGeometry args={[s * 0.4, s * 0.35, s * 0.55]} />
        <meshStandardMaterial color="#c8a876" roughness={0.9} flatShading />
      </mesh>
      {/* Head (pharaoh) */}
      <mesh position={[s * 0.85, s * 0.45, 0]}>
        <boxGeometry args={[s * 0.35, s * 0.45, s * 0.4]} />
        <meshStandardMaterial color="#d4b58a" roughness={0.85} flatShading />
      </mesh>
      {/* Headdress flare */}
      <mesh position={[s * 0.7, s * 0.45, 0]}>
        <coneGeometry args={[s * 0.28, s * 0.4, 4]} />
        <meshStandardMaterial color="#b8945e" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
}

export function PyramidGeometry({ pyramid, emissiveIntensity }: PyramidProps) {
  const style = styleForId(pyramid.id);
  switch (style) {
    case 'stepped': return <SteppedPyramid pyramid={pyramid} emissiveIntensity={emissiveIntensity} />;
    case 'ziggurat': return <ZigguratPyramid pyramid={pyramid} emissiveIntensity={emissiveIntensity} />;
    case 'bent': return <BentPyramid pyramid={pyramid} emissiveIntensity={emissiveIntensity} />;
    default: return <SmoothPyramid pyramid={pyramid} emissiveIntensity={emissiveIntensity} />;
  }
}
