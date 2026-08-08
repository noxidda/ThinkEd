import { NavLink, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

const sidebarItems = [
  { to: '/dashboard', code: 'DB', label: 'Dashboard' },
  { to: '/notes', code: 'NT', label: 'Notes' },
  { to: '/flashcards', code: 'FC', label: 'Flashcards' },
  { to: '/quiz', code: 'QZ', label: 'Quiz' },
  { to: '/chat', code: 'AI', label: 'Chat with Notes' },
  { to: '/study-plan', code: 'SP', label: 'Study Plan' },
  { to: '/analytics', code: 'AN', label: 'Analytics' },
];

export default function Sidebar() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#13091B] border-r border-[#2E1C3F] flex flex-col h-screen">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-[#2E1C3F]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#CDB4DB] text-[#13091B] font-bold text-xs flex items-center justify-center">
            TE
          </div>
          <div>
            <h1 className="text-xs font-bold text-[#FFC8DD] tracking-widest uppercase">
              ThinkEd
            </h1>
            <p className="text-[10px] text-[#BDE0FE]/70">SYSTEM ARCHITECTURE</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="text-[10px] px-1.5 py-0.5 border border-[#2E1C3F] text-[#BDE0FE]">
                  {item.code}
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Clerk User Button */}
      <div className="p-4 border-t border-[#2E1C3F] flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <UserButton afterSignOutUrl="/" />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">
              {user?.fullName || user?.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-[10px] text-[#BDE0FE]/60 truncate">AUTHENTICATED</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
