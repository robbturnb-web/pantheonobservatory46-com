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
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
