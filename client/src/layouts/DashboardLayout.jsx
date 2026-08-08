import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Sidebar from '../components/navigation/Sidebar';
import Navbar from '../components/navigation/Navbar';

export default function DashboardLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
          LOADING THINKED ARCHITECTURE...
        </p>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden selection:bg-white selection:text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 bg-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
