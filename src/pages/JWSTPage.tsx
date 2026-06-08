import { Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WebbHeroImage } from '@/components/jwst/WebbHeroImage';
import { WebbGalleryStrip } from '@/components/jwst/WebbGalleryStrip';
import { MissionConsole } from '@/components/jwst/MissionConsole';
import { WhyOnlyWebb } from '@/components/jwst/WhyOnlyWebb';
import { FindingsVault } from '@/components/jwst/FindingsVault';
import { CosmicTimeline } from '@/components/jwst/CosmicTimeline';
import { FindingModal } from '@/components/jwst/FindingModal';
import { JwstSubNav } from '@/components/jwst/JwstSubNav';
import { DailyFindingsFeed } from '@/components/jwst/DailyFindingsFeed';
import { HowWebbSees } from '@/components/jwst/HowWebbSees';
import { InstrumentsDeepDive } from '@/components/jwst/InstrumentsDeepDive';
import { L2OrbitExplainer } from '@/components/jwst/L2OrbitExplainer';
import { MissionTimeline } from '@/components/jwst/MissionTimeline';
import { useEchoXp } from '@/hooks/use-echo-xp';
import type { JwstFinding, JwstInstrument } from '@/data/jwst-findings';

const LiveWebbFeed = lazy(() =>
  import('@/components/jwst/LiveWebbFeed').then((m) => ({ default: m.LiveWebbFeed })),
);

export function JWSTPage() {
  const [instrumentFilter, setInstrumentFilter] = useState<JwstInstrument | 'all'>('all');
  const [openFinding, setOpenFinding] = useState<JwstFinding | null>(null);
  const { trackVaultOpen } = useEchoXp();

  const handleOpen = (f: JwstFinding) => {
    setOpenFinding(f);
    trackVaultOpen(`jwst-${f.id}`);
  };

  return (
    <>
    <SEO
      title="James Webb Space Telescope · Pantheon Mission Console"
      description='The cinematic mission console for JWST — interactive 3D model, 25 curated findings, "Why only Webb" comparisons, daily updates from L2.'
      path="/jwst"
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Webb%27s_First_Deep_Field.jpg/1280px-Webb%27s_First_Deep_Field.jpg"
      schema={{
        '@context':'https://schema.org','@type':'Observatory',
        name:'James Webb Space Telescope — Pantheon Mission Flagship',
        description:'The cinematic mission console for JWST — interactive 3D model, 25 curated findings, daily updates from L2.',
        about:'James Webb Space Telescope',
        publisher:{ '@type':'Organization', name:'Pantheon Observatory' },
        image:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Webb%27s_First_Deep_Field.jpg/1280px-Webb%27s_First_Deep_Field.jpg',
      }}
    />
    <div className="relative min-h-screen -mt-16" style={{ background: 'linear-gradient(180deg, #05030d 0%, #0a0420 45%, #03020a 100%)' }}>
      <JwstSubNav />

      <WebbHeroImage />

      <WebbGalleryStrip />

      <MissionConsole active={instrumentFilter} onChange={setInstrumentFilter} />

      <HowWebbSees />

      <InstrumentsDeepDive />

      <L2OrbitExplainer />

      <WhyOnlyWebb />

      <MissionTimeline />

      <FindingsVault instrumentFilter={instrumentFilter} onOpen={handleOpen} />

      <div id="jwst-timeline">
        <CosmicTimeline onOpen={handleOpen} />
      </div>

      <DailyFindingsFeed />

      <div id="jwst-live">
        <Suspense fallback={<div className="py-20 text-center text-violet-300/40 text-xs">Loading live feed…</div>}>
          <LiveWebbFeed />
        </Suspense>
      </div>

      {/* Echo handoff */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center rounded-3xl border p-10 backdrop-blur-md" style={{ borderColor: 'rgba(167,139,250,0.3)', background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(252,211,77,0.04))', boxShadow: '0 0 60px rgba(124,58,237,0.25)' }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300 mb-2" style={{ fontFamily: "'Space Mono', monospace" }}>
            ECHO HANDOFF
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-violet-50" style={{ fontFamily: "'Cinzel', serif" }}>
            Ask Echo about James Webb
          </h2>
          <p className="mt-3 text-violet-100/80 text-sm md:text-base">
            Go deeper on any finding, any instrument, any controversy. Echo holds the rest of the file.
          </p>
          <motion.div whileHover={{ scale: 1.04 }} className="mt-6 inline-block">
            <Link
              to="/echo?seed=Tell+me+about+the+James+Webb+Space+Telescope%27s+most+important+discoveries"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border transition-all"
              style={{
                color: '#f5f3ff',
                background: 'rgba(167,139,250,0.18)',
                borderColor: 'rgba(167,139,250,0.5)',
                boxShadow: '0 0 24px rgba(167,139,250,0.35)',
              }}
            >
              <MessageCircle className="w-4 h-4" /> Open Echo
            </Link>
          </motion.div>
        </div>
      </section>

      <FindingModal finding={openFinding} onClose={() => setOpenFinding(null)} />
    </div>
    </>
  );
}

export default JWSTPage;
