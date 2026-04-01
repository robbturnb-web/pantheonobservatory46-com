import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { PantheonFooter } from './PantheonFooter';
import { StarfieldCanvas } from './StarfieldCanvas';

export function Layout() {
  return (
    <div className="min-h-screen relative">
      <StarfieldCanvas />
      <Navbar />
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
      <PantheonFooter />
    </div>
  );
}
