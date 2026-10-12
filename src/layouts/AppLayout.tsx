import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  Users, 
  Clock, 
  User, 
  MapPin, 
  ShieldCheck, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { rideStore } from '../services/rideStore';

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const user = rideStore.getUser();
  const activeRide = rideStore.getActiveRide();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col md:flex-row text-[#141715]">
      
      {/* ============================================================ */}
      {/* DESKTOP SIDEBAR NAVIGATION                                   */}
      {/* ============================================================ */}
      <aside className="hidden md:flex w-64 flex-col justify-between bg-[#FFFFFF] border-r border-[rgba(20,23,21,0.08)] p-6 shrink-0">
        <div className="space-y-8">
          
          {/* Logo / Brand */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0E3824] flex items-center justify-center text-[#FAF9F5] shadow-sm">
              <Compass className="w-5 h-5 text-[#FAF9F5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#141715] font-display">
                SahYatri
              </span>
              <p className="text-[10px] font-mono text-[#79827D]">Rider Workspace</p>
            </div>
          </NavLink>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EAF4EE] text-[#0E3824]'
                    : 'text-[#4A514D] hover:bg-[#FAF9F5] hover:text-[#141715]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#0E3824]" />
                <span>Rider Hub</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>

            <NavLink
              to="/app/find"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EAF4EE] text-[#0E3824]'
                    : 'text-[#4A514D] hover:bg-[#FAF9F5] hover:text-[#141715]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4" />
                <span>Search Shared Rides</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>

            <NavLink
              to="/app/matches"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EAF4EE] text-[#0E3824]'
                    : 'text-[#4A514D] hover:bg-[#FAF9F5] hover:text-[#141715]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Active Matches</span>
              </div>
              <span className="text-[10px] bg-[#D6621B] text-white font-mono px-1.5 py-0.5 rounded-full font-bold">
                4
              </span>
            </NavLink>

            {activeRide && (
              <NavLink
                to={`/app/ride/${activeRide.id}`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0E3824] text-[#FAF9F5]'
                      : 'bg-[#FEF3EB] text-[#D6621B] hover:bg-[#FDE7D4]'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#EA752A] animate-ping"></span>
                  <span>Active Ride</span>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold">Live</span>
              </NavLink>
            )}

            <NavLink
              to="/app/history"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EAF4EE] text-[#0E3824]'
                    : 'text-[#4A514D] hover:bg-[#FAF9F5] hover:text-[#141715]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4" />
                <span>Trip History & Receipts</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>

            <NavLink
              to="/app/profile"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EAF4EE] text-[#0E3824]'
                    : 'text-[#4A514D] hover:bg-[#FAF9F5] hover:text-[#141715]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Profile & Trust</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>
          </nav>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="pt-6 border-t border-[rgba(20,23,21,0.06)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border border-[#0E3824]/20"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-[#141715] truncate">{user.name}</div>
                <div className="text-[10px] text-[#79827D] truncate">{user.institution}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-[#79827D] hover:text-[#141715] hover:bg-[#FAF9F5] rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2.5 bg-[#FAF9F5] rounded-xl border border-[rgba(20,23,21,0.06)] flex items-center justify-between text-[11px]">
            <span className="text-[#79827D]">Total Saved:</span>
            <span className="font-mono font-bold text-[#0E3824]">₹{user.totalSaved}</span>
          </div>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MOBILE TOP BAR & NAVIGATION                                  */}
      {/* ============================================================ */}
      <div className="md:hidden bg-[#FFFFFF] border-b border-[rgba(20,23,21,0.08)] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <NavLink to="/app" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0E3824] flex items-center justify-center text-[#FAF9F5]">
            <Compass className="w-4 h-4" />
          </div>
          <span className="font-bold text-base text-[#141715]">SahYatri</span>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink
            to="/app/find"
            className="p-2 text-xs font-semibold bg-[#EAF4EE] text-[#0E3824] rounded-lg flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </NavLink>
          <NavLink
            to="/app/profile"
            className="p-1.5 rounded-lg border border-[rgba(20,23,21,0.1)]"
          >
            <img src={user.avatar} alt="Profile" className="w-6 h-6 rounded-full object-cover" />
          </NavLink>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN VIEW CONTENT AREA                                       */}
      {/* ============================================================ */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      {/* ============================================================ */}
      {/* MOBILE BOTTOM TAB BAR                                        */}
      {/* ============================================================ */}
      <div className="md:hidden bg-[#FFFFFF] border-t border-[rgba(20,23,21,0.08)] py-2 px-6 flex items-center justify-around sticky bottom-0 z-40 text-[10px] font-medium text-[#79827D]">
        <NavLink
          to="/app"
          end
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#0E3824] font-bold' : ''}`}
        >
          <Compass className="w-4 h-4" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/app/find"
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#0E3824] font-bold' : ''}`}
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/app/matches"
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#0E3824] font-bold' : ''}`}
        >
          <Users className="w-4 h-4" />
          <span>Matches</span>
        </NavLink>

        <NavLink
          to="/app/history"
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#0E3824] font-bold' : ''}`}
        >
          <Clock className="w-4 h-4" />
          <span>History</span>
        </NavLink>

        <NavLink
          to="/app/profile"
          className={({ isActive }) => `flex flex-col items-center gap-1 ${isActive ? 'text-[#0E3824] font-bold' : ''}`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </NavLink>
      </div>

    </div>
  );
};
