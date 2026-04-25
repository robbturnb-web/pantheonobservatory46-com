import { useEffect, useState, lazy, Suspense } from 'react';
import { SEO } from '@/components/SEO';
import { Walkthrough } from '@/components/Walkthrough';
import { HomeThemeProvider } from '@/contexts/HomeThemeContext';
import { ConceptSwitcher, LayoutKey, readStoredLayout } from '@/components/home/ConceptSwitcher';
import { HomeLowerSections } from '@/components/home/HomeLowerSections';

// Lazy-load each layout so we don't ship all five up-front
const PillarsLayout = lazy(() => import('./home/PillarsLayout').then((m) => ({ default: m.PillarsLayout })));
const TempleLayout = lazy(() => import('./home/TempleLayout').then((m) => ({ default: m.TempleLayout })));
const ConstellationLayout = lazy(() => import('./home/ConstellationLayout').then((m) => ({ default: m.ConstellationLayout })));
const ConsoleLayout = lazy(() => import('./home/ConsoleLayout').then((m) => ({ default: m.ConsoleLayout })));
const CathedralLayout = lazy(() => import('./home/CathedralLayout').then((m) => ({ default: m.CathedralLayout })));

function LayoutFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

function renderLayout(layout: LayoutKey) {
  switch (layout) {
    case 'pillars':       return <PillarsLayout />;
    case 'temple':        return <TempleLayout />;
    case 'constellation': return <ConstellationLayout />;
    case 'console':       return <ConsoleLayout />;
    case 'cathedral':     return <CathedralLayout />;
  }
}

export function HomePage() {
  const [layout, setLayout] = useState<LayoutKey>(() => readStoredLayout());

  // Keep the URL ?layout= param in sync without reloading
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('layout') !== layout) {
      url.searchParams.set('layout', layout);
      window.history.replaceState({}, '', url.toString());
    }
  }, [layout]);

  return (
    <HomeThemeProvider>
      <div className="relative">
        <SEO
          title="Pantheon Observatory — Cosmic intelligence, disclosure & the unexplained"
          description="A living archive of UAP cases, whistleblower testimony, ancient mythology, and cosmic disclosure. Explore the signal."
          canonical="/"
        />
        <Walkthrough />

        <Suspense fallback={<LayoutFallback />}>
          {renderLayout(layout)}
        </Suspense>

        <HomeLowerSections />

        <ConceptSwitcher active={layout} onChange={setLayout} />
      </div>
    </HomeThemeProvider>
  );
}
