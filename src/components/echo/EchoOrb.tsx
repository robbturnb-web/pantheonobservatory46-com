import { motion } from 'framer-motion';

interface EchoOrbProps {
  state?: 'idle' | 'listening' | 'thinking' | 'speaking';
  size?: number;
}

/**
 * Echo's living sigil — cosmic orb with concentric energy rings, inner nebula,
 * and a breathing/state-aware halo. Pure SVG + Framer Motion, no external assets.
 */
export function EchoOrb({ state = 'idle', size = 160 }: EchoOrbProps) {
  const pulseSpeed = state === 'thinking' ? 1.4 : state === 'speaking' ? 1.8 : state === 'listening' ? 2.2 : 4;
  const halo = state === 'thinking' ? 'rgba(34,211,238,0.55)' : state === 'speaking' ? 'rgba(167,139,250,0.55)' : state === 'listening' ? 'rgba(16,185,129,0.55)' : 'rgba(124,58,237,0.4)';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer rotating constellation ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-cyan-400/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ boxShadow: `0 0 60px -10px ${halo}` }}
      />
      {/* Middle ring counter-rotating */}
      <motion.div
        className="absolute rounded-full border border-primary/30"
        style={{ inset: '12%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      {/* Halo breathing */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: '20%',
          background: `radial-gradient(circle, ${halo} 0%, transparent 70%)`,
          filter: 'blur(12px)',
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Core orb */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: '58%',
          height: '58%',
          background:
            'radial-gradient(circle at 35% 30%, #E5F8FF 0%, #22D3EE 25%, #7C3AED 60%, #1A1038 100%)',
          boxShadow: 'inset -8px -12px 24px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.6)',
        }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: pulseSpeed * 0.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner nebula swirl */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, rgba(167,139,250,0.4) 30%, transparent 60%, rgba(34,211,238,0.3) 90%, transparent 100%)',
            mixBlendMode: 'screen',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        {/* Specular highlight */}
        <div
          className="absolute rounded-full"
          style={{
            top: '15%',
            left: '20%',
            width: '30%',
            height: '20%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
      </motion.div>
      {/* Floating sparks */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-200"
          style={{
            top: '50%',
            left: '50%',
            boxShadow: '0 0 6px rgba(34,211,238,0.9)',
          }}
          animate={{
            x: [0, Math.cos((i / 4) * Math.PI * 2) * (size * 0.42), 0],
            y: [0, Math.sin((i / 4) * Math.PI * 2) * (size * 0.42), 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
