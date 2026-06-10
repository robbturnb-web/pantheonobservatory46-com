import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Toaster } from './components/ui/toaster';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AdminRoute } from './components/AdminRoute';

// Eager: critical entry routes (no need to lazy-load)
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

// Lazy: every other route gets its own chunk
const TimelinePage = lazy(() => import('./pages/TimelinePage').then(m => ({ default: m.TimelinePage })));
const UAPPage = lazy(() => import('./pages/UAPPage').then(m => ({ default: m.UAPPage })));
const GodsPage = lazy(() => import('./pages/GodsPage').then(m => ({ default: m.GodsPage })));
const GodDetailPage = lazy(() => import('./pages/GodDetailPage').then(m => ({ default: m.GodDetailPage })));
const ConsciousnessPage = lazy(() => import('./pages/ConsciousnessPage').then(m => ({ default: m.ConsciousnessPage })));
const SignalsPage = lazy(() => import('./pages/SignalsPage').then(m => ({ default: m.SignalsPage })));
const OriginChamberPage = lazy(() => import('./pages/OriginChamberPage').then(m => ({ default: m.OriginChamberPage })));
const EchoPage = lazy(() => import('./pages/EchoPage').then(m => ({ default: m.EchoPage })));
const WhistleblowerVaultPage = lazy(() => import('./pages/WhistleblowerVaultPage').then(m => ({ default: m.WhistleblowerVaultPage })));
const TelescopePage = lazy(() => import('./pages/TelescopePage').then(m => ({ default: m.TelescopePage })));
const GalaxyExplorerPage = lazy(() => import('./pages/GalaxyExplorerPage').then(m => ({ default: m.GalaxyExplorerPage })));
const EchoversePage = lazy(() => import('./pages/EchoversePage').then(m => ({ default: m.EchoversePage })));
const PyramidExplorerPage = lazy(() => import('./pages/PyramidExplorerPage').then(m => ({ default: m.PyramidExplorerPage })));
const EarthPulsePage = lazy(() => import('./pages/EarthPulsePage').then(m => ({ default: m.EarthPulsePage })));
const OrbReportPage = lazy(() => import('./pages/OrbReportPage').then(m => ({ default: m.OrbReportPage })));
const The46Page = lazy(() => import('./pages/The46Page').then(m => ({ default: m.The46Page })));
const ShadowPantheonPage = lazy(() => import('./pages/ShadowPantheonPage').then(m => ({ default: m.ShadowPantheonPage })));
const FrequenciesPage = lazy(() => import('./pages/FrequenciesPage').then(m => ({ default: m.FrequenciesPage })));
const SpeciesCodexPage = lazy(() => import('./pages/SpeciesCodexPage').then(m => ({ default: m.SpeciesCodexPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const MissingPage = lazy(() => import('./pages/MissingPage').then(m => ({ default: m.MissingPage })));
const AntarcticaPage = lazy(() => import('./pages/AntarcticaPage').then(m => ({ default: m.AntarcticaPage })));
const AtlantisPage = lazy(() => import('./pages/AtlantisPage').then(m => ({ default: m.AtlantisPage })));
const ElementsLabPage = lazy(() => import('./pages/ElementsLabPage').then(m => ({ default: m.ElementsLabPage })));
const CrashRetrievalPage = lazy(() => import('./pages/CrashRetrievalPage').then(m => ({ default: m.CrashRetrievalPage })));
const UndergroundBasesPage = lazy(() => import('./pages/UndergroundBasesPage').then(m => ({ default: m.UndergroundBasesPage })));
const BuildersArenaPage = lazy(() => import('./pages/BuildersArenaPage').then(m => ({ default: m.BuildersArenaPage })));
const AaroWatchPage = lazy(() => import('./pages/AaroWatchPage').then(m => ({ default: m.AaroWatchPage })));
const EntityEncountersPage = lazy(() => import('./pages/EntityEncountersPage').then(m => ({ default: m.EntityEncountersPage })));
const FederationPage = lazy(() => import('./pages/FederationPage').then(m => ({ default: m.FederationPage })));
const GlyphsPage = lazy(() => import('./pages/GlyphsPage').then(m => ({ default: m.GlyphsPage })));
const StoneFacesPage = lazy(() => import('./pages/StoneFacesPage').then(m => ({ default: m.StoneFacesPage })));
const ExtinctSpeciesPage = lazy(() => import('./pages/ExtinctSpeciesPage').then(m => ({ default: m.ExtinctSpeciesPage })));
const CernPage = lazy(() => import('./pages/CernPage').then(m => ({ default: m.CernPage })));
const ExpertsIndexPage = lazy(() => import('./pages/ExpertsIndexPage').then(m => ({ default: m.ExpertsIndexPage })));
const ExpertProfilePage = lazy(() => import('./pages/ExpertProfilePage').then(m => ({ default: m.ExpertProfilePage })));
const StyleGuidePage = lazy(() => import('./pages/StyleGuidePage').then(m => ({ default: m.StyleGuidePage })));
const DocumentariesPage = lazy(() => import('./pages/DocumentariesPage').then(m => ({ default: m.DocumentariesPage })));
const JeremyCorbellPage = lazy(() => import('./pages/JeremyCorbellPage').then(m => ({ default: m.JeremyCorbellPage })));
const BlackProgramsPage = lazy(() => import('./pages/BlackProgramsPage').then(m => ({ default: m.BlackProgramsPage })));
const RubiksCubePage = lazy(() => import('./pages/RubiksCubePage').then(m => ({ default: m.RubiksCubePage })));
const SanctuaryPage = lazy(() => import('./pages/SanctuaryPage').then(m => ({ default: m.SanctuaryPage })));
const StarSeedTerminalPage = lazy(() => import('./pages/StarSeedTerminalPage').then(m => ({ default: m.StarSeedTerminalPage })));
const BrazilPage = lazy(() => import('./pages/BrazilPage').then(m => ({ default: m.BrazilPage })));
const JWSTPage = lazy(() => import('./pages/JWSTPage').then(m => ({ default: m.JWSTPage })));
const NotFound = lazy(() => import('./pages/NotFound'));
const CodexPage = lazy(() => import('./pages/CodexPage'));
const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })));
const LegislationPage = lazy(() => import('./pages/LegislationPage').then(m => ({ default: m.LegislationPage })));
const ObservatoryMapPage = lazy(() => import('./pages/ObservatoryMapPage').then(m => ({ default: m.ObservatoryMapPage })));
const DisclosureCommandPage = lazy(() => import('./pages/DisclosureCommandPage').then(m => ({ default: m.DisclosureCommandPage })));
const DailyBriefingPage = lazy(() => import('./pages/DailyBriefingPage').then(m => ({ default: m.DailyBriefingPage })));
const DiagnosticsPage = lazy(() => import('./pages/DiagnosticsPage'));
const LiveFeedsPage = lazy(() => import('./pages/LiveFeedsPage').then(m => ({ default: m.LiveFeedsPage })));
const MissionsPage = lazy(() => import('./pages/MissionsPage').then(m => ({ default: m.MissionsPage })));
const SourcesPage = lazy(() => import('./pages/SourcesPage').then(m => ({ default: m.SourcesPage })));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/legal/TermsPage').then(m => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import('./pages/legal/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })));
const ContactPage = lazy(() => import('./pages/legal/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage = lazy(() => import('./pages/legal/AboutPage').then(m => ({ default: m.AboutPage })));
const DebugChecklistPage = lazy(() => import('./pages/DebugChecklistPage').then(m => ({ default: m.DebugChecklistPage })));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));
const SourceManagerPage = lazy(() => import('./pages/admin/SourceManagerPage'));
const ContentManagerPage = lazy(() => import('./pages/admin/ContentManagerPage'));
const RoadmapPage = lazy(() => import('./pages/admin/RoadmapPage'));
const ChangelogPage = lazy(() => import('./pages/admin/ChangelogPage'));
const SystemStatusPage = lazy(() => import('./pages/admin/SystemStatusPage'));
const PyramidScannerPage = lazy(() => import('./pages/PyramidScannerPage'));


/** Themed cosmic loader shown while a lazy route chunk downloads. */
function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm text-muted-foreground tracking-widest uppercase">Tuning the signal…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/uap" element={<UAPPage />} />
              <Route path="/gods" element={<GodsPage />} />
              <Route path="/gods/:id" element={<GodDetailPage />} />
              <Route path="/consciousness" element={<ConsciousnessPage />} />
              <Route path="/signals" element={<SignalsPage />} />
              <Route path="/origin" element={<OriginChamberPage />} />
              <Route path="/echo" element={<EchoPage />} />
              <Route path="/whistleblowers" element={<WhistleblowerVaultPage />} />
              <Route path="/telescopes" element={<TelescopePage />} />
              <Route path="/galaxy" element={<GalaxyExplorerPage />} />
              <Route path="/echoverse" element={<EchoversePage />} />
              <Route path="/pyramids" element={<PyramidExplorerPage />} />
              <Route path="/earth-pulse" element={<EarthPulsePage />} />
              <Route path="/orb-report" element={<OrbReportPage />} />
              <Route path="/the-46" element={<The46Page />} />
              <Route path="/codex" element={<CodexPage />} />
              
              <Route path="/shadow-pantheon" element={<ShadowPantheonPage />} />
              <Route path="/frequencies" element={<FrequenciesPage />} />
              <Route path="/species" element={<SpeciesCodexPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/missing" element={<MissingPage />} />
              <Route path="/antarctica" element={<AntarcticaPage />} />
              <Route path="/atlantis" element={<AtlantisPage />} />
              <Route path="/aaro" element={<AaroWatchPage />} />
              <Route path="/crash-retrieval" element={<CrashRetrievalPage />} />
              <Route path="/black-programs" element={<BlackProgramsPage />} />
              <Route path="/rubiks-cube" element={<RubiksCubePage />} />
              <Route path="/46" element={<SanctuaryPage />} />
              <Route path="/star-seed" element={<StarSeedTerminalPage />} />
              <Route path="/underground" element={<UndergroundBasesPage />} />
              <Route path="/encounters" element={<EntityEncountersPage />} />
              <Route path="/extinct" element={<ExtinctSpeciesPage />} />
              <Route path="/cern" element={<CernPage />} />
              <Route path="/federation" element={<FederationPage />} />
              <Route path="/builders" element={<BuildersArenaPage />} />
              <Route path="/glyphs" element={<GlyphsPage />} />
              <Route path="/stone-faces" element={<StoneFacesPage />} />
              <Route path="/elements" element={<ElementsLabPage />} />
              <Route path="/experts" element={<ExpertsIndexPage />} />
              <Route path="/experts/:slug" element={<ExpertProfilePage />} />
              <Route path="/style-guide" element={<StyleGuidePage />} />
              <Route path="/documentaries" element={<DocumentariesPage />} />
              
              <Route path="/jeremy-corbell" element={<JeremyCorbellPage />} />
              <Route path="/brazil" element={<BrazilPage />} />
              <Route path="/jwst" element={<JWSTPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/legislation" element={<LegislationPage />} />
              <Route path="/observatory" element={<ObservatoryMapPage />} />
              <Route path="/observatory/map" element={<Navigate to="/observatory" replace />} />
              <Route path="/disclosure" element={<DisclosureCommandPage />} />
              <Route path="/briefing" element={<DailyBriefingPage />} />
              <Route path="/pyramids/scanner" element={<PyramidScannerPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/changelog" element={<ChangelogPage />} />
              <Route path="/system-status" element={<SystemStatusPage />} />
              {/* Admin-only routes */}
              <Route path="/admin" element={<AdminRoute><AdminHomePage /></AdminRoute>} />
              <Route path="/source-manager" element={<AdminRoute><SourceManagerPage /></AdminRoute>} />
              <Route path="/content-manager" element={<AdminRoute><ContentManagerPage /></AdminRoute>} />
              <Route path="/daily" element={<Navigate to="/briefing" replace />} />
              <Route path="/diagnostics" element={<AdminRoute><DiagnosticsPage /></AdminRoute>} />
              <Route path="/style-guide" element={<AdminRoute><StyleGuidePage /></AdminRoute>} />
              <Route path="/live-feeds" element={<LiveFeedsPage />} />
              <Route path="/missions" element={<MissionsPage />} />
              <Route path="/sources" element={<SourcesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/debug-checklist" element={<DebugChecklistPage />} />
              <Route path="/community" element={<Navigate to="/echoverse" replace />} />
              <Route path="/index" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
