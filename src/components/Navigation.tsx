import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ArrowUpRight, User, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isApp = location.pathname.startsWith('/app');

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[rgba(20,23,21,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0E3824] flex items-center justify-center text-[#FAF9F5] shadow-sm group-hover:bg-[#165337] transition-colors">
            <Compass className="w-5 h-5 text-[#FAF9F5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-[#141715] font-display">
                SahYatri
              </span>
              <span className="text-[10px] font-mono uppercase bg-[#EAF4EE] text-[#0E3824] px-1.5 py-0.5 rounded font-bold border border-[#0E3824]/10">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-[#79827D] tracking-tight">Travel together. Spend less.</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4A514D]">
          <Link to="/" className="hover:text-[#141715] transition-colors">
            Overview
          </Link>
          <a href="/#how-it-works" className="hover:text-[#141715] transition-colors">
            How It Works
          </a>
          <a href="/#savings-moment" className="hover:text-[#141715] transition-colors">
            Savings
          </a>
          <a href="/#safety" className="hover:text-[#141715] transition-colors flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E3824]" />
            Safety
          </a>
          <Link to="/app/find" className="text-[#0E3824] font-semibold hover:text-[#165337] transition-colors">
            Find Matches
          </Link>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isApp ? (
            <Link
              to="/app/profile"
              className="inline-flex items-center gap-2 bg-[#F4F3EE] hover:bg-[#EAE8E1] text-[#141715] text-xs font-semibold px-4 py-2.5 rounded-xl border border-[rgba(20,23,21,0.08)] transition-all"
            >
              <User className="w-3.5 h-3.5 text-[#0E3824]" />
              Devansh (VIT)
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-semibold text-[#4A514D] hover:text-[#141715] px-3 py-2 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/app"
                className="inline-flex items-center gap-1.5 bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
              >
                Launch App
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#141715] hover:bg-[#F4F3EE] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.08)] px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#141715]"
          >
            Overview
          </Link>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#141715]"
          >
            How It Works
          </a>
          <a
            href="/#savings-moment"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#141715]"
          >
            Savings Calculator
          </a>
          <a
            href="/#safety"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#141715]"
          >
            Safety Protocols
          </a>
          <div className="pt-4 border-t border-[rgba(20,23,21,0.08)] flex flex-col gap-2">
            <Link
              to="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#0E3824] text-[#FAF9F5] py-2.5 rounded-xl font-semibold text-xs"
            >
              Open SahYatri App
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#F4F3EE] text-[#141715] py-2.5 rounded-xl font-semibold text-xs border border-[rgba(20,23,21,0.08)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF9F5] border-t border-[rgba(20,23,21,0.08)] py-12 text-[#79827D] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-[#0E3824] flex items-center justify-center text-[#FAF9F5]">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-[#141715] text-base">SahYatri</span>
            </div>
            <p className="text-[#4A514D] leading-relaxed mb-4">
              Peer ride-coordination for student campuses and transit corridors. Travel together. Spend less.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#F4F3EE] px-2.5 py-1 rounded-md text-[11px] font-mono text-[#0E3824]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#227B52]"></span>
              Operating in Bhopal & Sehore Hubs
            </div>
          </div>

          {/* Frequent Shared Corridors */}
          <div>
            <h4 className="font-semibold text-[#141715] uppercase tracking-wider text-[11px] mb-3">
              Key Corridors
            </h4>
            <ul className="space-y-2">
              <li>VIT Bhopal ↔ Bhopal Junction (BPL)</li>
              <li>VIT Bhopal ↔ Rani Kamlapati (RKMP)</li>
              <li>MANIT ↔ Raja Bhoj Airport (BHO)</li>
              <li>AIIMS Bhopal ↔ DB City Mall</li>
              <li>IISER Bhopal ↔ Sehore Station</li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="font-semibold text-[#141715] uppercase tracking-wider text-[11px] mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              <li><Link to="/app" className="hover:text-[#141715]">Rider Hub</Link></li>
              <li><Link to="/app/find" className="hover:text-[#141715]">Search Compatible Trips</Link></li>
              <li><Link to="/app/history" className="hover:text-[#141715]">Trip History & Receipts</Link></li>
              <li><Link to="/app/profile" className="hover:text-[#141715]">Campus ID Verification</Link></li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="font-semibold text-[#141715] uppercase tracking-wider text-[11px] mb-3">
              Trust & Transparency
            </h4>
            <p className="text-[11px] leading-relaxed text-[#79827D] mb-3">
              SahYatri is an intelligent co-traveller coordination network. We connect passengers for direct cab-sharing and cost splitting. We do not own cabs or charge marked-up taxi fares.
            </p>
            <span className="text-[11px] text-[#4A514D]">
              Made with care for Indian university travellers.
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-[rgba(20,23,21,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SahYatri Mobility Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#141715] cursor-pointer">Privacy Charter</span>
            <span className="hover:text-[#141715] cursor-pointer">Terms of Sharing</span>
            <span className="hover:text-[#141715] cursor-pointer">Campus Ambassador Program</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
