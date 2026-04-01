import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TimelinePage } from './pages/TimelinePage';
import { UAPPage } from './pages/UAPPage';
import { GodsPage } from './pages/GodsPage';
import { ConsciousnessPage } from './pages/ConsciousnessPage';
import { SignalsPage } from './pages/SignalsPage';
import { OriginChamberPage } from './pages/OriginChamberPage';
import { EchoPage } from './pages/EchoPage';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
