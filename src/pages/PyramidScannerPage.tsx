import { SEO } from '@/components/SEO';
import { Pyramid, Radio, Scan, Layers } from 'lucide-react';

const FOUNDATIONS = [
  { icon: Radio, title: 'LIDAR Overlay', desc: 'Topographic + sub-surface scan layer (planned: Open Topography API).' },
  { icon: Scan, title: 'Alignment Grid', desc: 'Cardinal + stellar alignment overlay (Orion, Sirius, Draco).' },
  { icon: Layers, title: 'Internal Geometry', desc: 'Chamber & shaft cross-sections from published surveys.' },
];

export default function PyramidScannerPage() {
  return (
    <>
      <SEO title="Pyramid Scanner — Pantheon" description="Foundational scanner for pyramid geometry, alignment, and sub-surface anomalies." />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-10 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-realm-cosmos/10 border border-realm-cosmos/30">
            <Pyramid className="w-7 h-7 text-realm-cosmos" />
          </div>
          <div>
            <h1 className="font-display text-4xl">Pyramid Scanner</h1>
            <p className="text-sm text-muted-foreground mt-1">Foundation pass · v0.1</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {FOUNDATIONS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 rounded-2xl border border-border bg-card/40 backdrop-blur">
              <Icon className="w-6 h-6 text-realm-cosmos mb-3" />
              <div className="font-display text-lg">{title}</div>
              <div className="text-xs text-muted-foreground mt-1">{desc}</div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl border border-dashed border-border/60 bg-card/20">
          <p className="text-sm text-muted-foreground">
            Scanner UI bootstraps the existing <code>PyramidScene</code> WebGL stack. Live LIDAR + alignment data
            ingest will arrive once the Open Topography + Stellarium pipelines are wired in v1.0.
          </p>
        </div>
      </div>
    </>
  );
}
