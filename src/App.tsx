import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { Toaster } from './components/ui/toaster';
import { TimelinePage } from './pages/TimelinePage';
import { UAPPage } from './pages/UAPPage';
import { GodsPage } from './pages/GodsPage';
import { ConsciousnessPage } from './pages/ConsciousnessPage';
import { SignalsPage } from './pages/SignalsPage';
import { OriginChamberPage } from './pages/OriginChamberPage';
import { EchoPage } from './pages/EchoPage';
import { WhistleblowerVaultPage } from './pages/WhistleblowerVaultPage';
import { TelescopePage } from './pages/TelescopePage';
import { GalaxyExplorerPage } from './pages/GalaxyExplorerPage';
import { EchoversePage } from './pages/EchoversePage';
import { PyramidExplorerPage } from './pages/PyramidExplorerPage';
import { EarthPulsePage } from './pages/EarthPulsePage';
import { OrbReportPage } from './pages/OrbReportPage';
import { The46Page } from './pages/The46Page';
import { ShadowPantheonPage } from './pages/ShadowPantheonPage';
import { FrequenciesPage } from './pages/FrequenciesPage';
import { SpeciesCodexPage } from './pages/SpeciesCodexPage';
import { AuthPage } from './pages/AuthPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { MissingPage } from './pages/MissingPage';
import { AntarcticaPage } from './pages/AntarcticaPage';
import { AtlantisPage } from './pages/AtlantisPage';
import {
  AaroPage,
  CrashRetrievalPage,
  UndergroundBasesPage,
  EntityEncountersPage,
  ExtinctSpeciesPage,
  CernPage,
  FederationPage,
  BuildersPage,
  GlyphsPage,
  StoneFacesPage,
} from './pages/PlaceholderPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/uap" element={<UAPPage />} />
          <Route path="/gods" element={<GodsPage />} />
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
          <Route path="/video-vault" element={<The46Page />} />
          <Route path="/shadow-pantheon" element={<ShadowPantheonPage />} />
          <Route path="/frequencies" element={<FrequenciesPage />} />
          <Route path="/species" element={<SpeciesCodexPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/missing" element={<MissingPage />} />
          <Route path="/antarctica" element={<AntarcticaPage />} />
          <Route path="/atlantis" element={<AtlantisPage />} />
          <Route path="/aaro" element={<AaroPage />} />
          <Route path="/crash-retrieval" element={<CrashRetrievalPage />} />
          <Route path="/underground" element={<UndergroundBasesPage />} />
          <Route path="/encounters" element={<EntityEncountersPage />} />
          <Route path="/extinct" element={<ExtinctSpeciesPage />} />
          <Route path="/cern" element={<CernPage />} />
          <Route path="/federation" element={<FederationPage />} />
          <Route path="/builders" element={<BuildersPage />} />
          <Route path="/glyphs" element={<GlyphsPage />} />
          <Route path="/stone-faces" element={<StoneFacesPage />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
