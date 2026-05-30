import { SEO } from '@/components/SEO';
import { Walkthrough } from '@/components/Walkthrough';
import { HomeThemeProvider } from '@/contexts/HomeThemeContext';
import { HomeLowerSections } from '@/components/home/HomeLowerSections';
import { DashboardLayout } from './home/DashboardLayout';

export function HomePage() {
  return (
    <HomeThemeProvider>
      <div className="relative">
        <SEO
          title="Pantheon Observatory — Cosmic intelligence, disclosure & the unexplained"
          description="A living archive of UAP cases, whistleblower testimony, ancient mythology, and cosmic disclosure. Explore the signal."
          canonical="/"
        />
        <Walkthrough />
        <DashboardLayout />
        <HomeLowerSections />
      </div>
    </HomeThemeProvider>
  );
}
