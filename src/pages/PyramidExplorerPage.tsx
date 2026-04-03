import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Pyramid } from 'lucide-react';
import { PyramidScene } from '../components/pyramid/PyramidScene';
import { PyramidInfo } from '../components/pyramid/PyramidInfo';
import type { Pyramid as PyramidType } from '../data/pyramids';

export function PyramidExplorerPage() {
  const [selectedPyramid, setSelectedPyramid] = useState<PyramidType | null>(null);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-20"
      >
        <div className="glass-cosmic rounded-xl px-5 py-3">
          <div className="flex items-center gap-2">
            <Pyramid className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Pyramid Explorer</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Click any pyramid • Lines show stellar alignments • Drag to rotate</p>
        </div>
      </motion.div>

      {/* Info Panel */}
      <PyramidInfo pyramid={selectedPyramid} onClose={() => setSelectedPyramid(null)} />

      {/* 3D Canvas */}
      <div className="w-full h-screen">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-primary animate-pulse text-lg">Loading Ancient Structures...</div>
          </div>
        }>
          <PyramidScene selectedPyramid={selectedPyramid} onSelectPyramid={setSelectedPyramid} />
        </Suspense>
      </div>
    </div>
  );
}
