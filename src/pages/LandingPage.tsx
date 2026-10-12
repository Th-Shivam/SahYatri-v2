import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RouteConvergenceMap } from '../components/RouteConvergenceMap';
import { FareSplitVisualizer } from '../components/FareSplitVisualizer';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  Sparkles, 
  TrendingDown, 
  CheckCircle2, 
  Search,
  Building,
  GraduationCap
} from 'lucide-react';
import { MOCK_RIDERS } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('VIT Bhopal University');
  const [destination, setDestination] = useState('Bhopal Junction Railway Station');
  const [departureTime, setDepartureTime] = useState('16:30');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/app/find?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-[#141715] overflow-hidden">
      
      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[rgba(20,23,21,0.06)] bg-tactile-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Value Narrative */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Intentional Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF4EE] border border-[#165337]/15">
                <span className="w-2 h-2 rounded-full bg-[#0E3824]"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E3824] font-mono">
                  Smart Peer-To-Peer Transit
                </span>
                <span className="text-[#165337] text-xs">✦ Active across Bhopal & Sehore</span>
              </div>

              {/* Required Core Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141715] leading-[1.08] font-display">
                Someone&apos;s already <br className="hidden sm:inline" />
                <span className="text-[#0E3824] underline decoration-[#EA752A] decoration-wavy decoration-2 underline-offset-8">
                  going your way.
                </span>
              </h1>

              {/* Required Supporting Copy */}
              <p className="text-lg sm:text-xl text-[#4A514D] max-w-2xl font-normal leading-relaxed">
                Find nearby travellers heading to the same destination. Share one cab, split the fare and make every journey count.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/app/find"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] px-7 py-4 rounded-2xl text-base font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Find your SahYatri
                  <ArrowRight className="w-5 h-5 text-[#FAF9F5]" />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 bg-[#F4F3EE] hover:bg-[#EAE8E1] text-[#141715] px-6 py-4 rounded-2xl text-base font-semibold border border-[rgba(20,23,21,0.08)] transition-all"
                >
                  See how it works
                </a>
              </div>

              {/* Trust Indicators Bar */}
              <div className="pt-6 border-t border-[rgba(20,23,21,0.06)] grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div className="text-xl font-bold font-mono text-[#0E3824]">₹3,400+</div>
                  <div className="text-xs text-[#79827D]">Avg Student Savings / Term</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#141715]">92%</div>
                  <div className="text-xs text-[#79827D]">Min Route Compatibility</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-[#D6621B]">0%</div>
                  <div className="text-xs text-[#79827D]">Commission on Fare Split</div>
                </div>
              </div>
            </div>

            {/* Right Column: Animated Route Visualization Component */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <RouteConvergenceMap />
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION A — THE PROBLEM                                      */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.06)]">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D6621B] font-bold bg-[#FEF3EB] px-3 py-1 rounded-full border border-[#D6621B]/15">
              The Reality Today
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#141715] mt-4 tracking-tight leading-tight">
              Every day, people travel the same roads.
            </h2>
            <p className="text-lg text-[#4A514D] mt-4 leading-relaxed font-medium">
              Different cabs. Similar journeys. Unnecessary expense.
            </p>
          </div>

          {/* Problem Visual Storytelling Composition */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual 1: Parallel Waste */}
            <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[rgba(20,23,21,0.08)] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F4F3EE] flex items-center justify-center mb-6 text-[#141715]">
                  <TrendingDown className="w-6 h-6 text-[#D6621B]" />
                </div>
                <h3 className="text-xl font-bold text-[#141715] mb-2">
                  Solo Cabs, Double Bills
                </h3>
                <p className="text-sm text-[#4A514D] leading-relaxed">
                  Two university students leaving VIT Bhopal for the same 5 PM train book two independent cabs, each paying ₹450+. That is ₹900 spent when ₹450 total would have covered both.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[rgba(20,23,21,0.06)] flex items-center justify-between text-xs font-mono text-[#D6621B]">
                <span>Status Quo Inefficiency</span>
                <span>+100% Cost Surcharge</span>
              </div>
            </div>

            {/* Visual 2: Fragmented WhatsApp Groups */}
            <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[rgba(20,23,21,0.08)] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F4F3EE] flex items-center justify-center mb-6 text-[#141715]">
                  <Users className="w-6 h-6 text-[#0E3824]" />
                </div>
                <h3 className="text-xl font-bold text-[#141715] mb-2">
                  Chaotic Group Chats
                </h3>
                <p className="text-sm text-[#4A514D] leading-relaxed">
                  Students resort to posting &ldquo;Anyone going to BPL Jn at 4?&rdquo; in 500-person hostel groups. Messages get lost, timing rarely aligns, and strangers have zero verified credentials.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[rgba(20,23,21,0.06)] flex items-center justify-between text-xs font-mono text-[#79827D]">
                <span>Coordination Friction</span>
                <span>Uncertainty</span>
              </div>
            </div>

            {/* Visual 3: Traffic & Emissions */}
            <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[rgba(20,23,21,0.08)] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F4F3EE] flex items-center justify-center mb-6 text-[#141715]">
                  <Building className="w-6 h-6 text-[#227B52]" />
                </div>
                <h3 className="text-xl font-bold text-[#141715] mb-2">
                  Congested Transit Corridors
                </h3>
                <p className="text-sm text-[#4A514D] leading-relaxed">
                  Empty vehicle seats clogging the Sehore-Bhopal highway and station pick-up points. Shared mobility turns two vehicles into one efficient route.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[rgba(20,23,21,0.06)] flex items-center justify-between text-xs font-mono text-[#227B52]">
                <span>Environmental Impact</span>
                <span>2x Carbon Burn</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION B — THE IDEA                                         */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0E3824] rounded-3xl text-[#FAF9F5] p-8 md:p-14 lg:p-16 relative overflow-hidden">
            
            {/* Background Graphic Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 C300,100 400,300 800,300" stroke="#FAF9F5" strokeWidth="4" fill="none" />
                <path d="M0,500 C300,500 400,300 800,300" stroke="#FAF9F5" strokeWidth="4" fill="none" />
              </svg>
            </div>

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs uppercase font-mono tracking-widest text-[#EA752A] font-bold bg-[#EA752A]/15 px-3 py-1 rounded-full border border-[#EA752A]/30">
                The Thesis
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-4 text-[#FAF9F5] leading-tight">
                What if two journeys became one?
              </h2>

              <p className="text-base sm:text-lg text-[#FAF9F5]/80 mt-4 leading-relaxed font-light">
                SahYatri doesn&apos;t run cabs. Instead, our route-matching telemetry indexes common departure windows and intersecting paths. When two verified riders share 85%+ of a route, we instantly connect them to share a ride and split the bill cleanly.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#FAF9F5]/15">
                <div>
                  <div className="text-2xl font-bold font-mono text-[#EA752A]">1 Route</div>
                  <div className="text-xs text-[#FAF9F5]/70 mt-1">Both reach their exact stop</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-[#FAF9F5]">50% Cost</div>
                  <div className="text-xs text-[#FAF9F5]/70 mt-1">Direct split, zero hidden fees</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono text-[#227B52]">100% Verified</div>
                  <div className="text-xs text-[#FAF9F5]/70 mt-1">Campus ID & phone verified</div>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/app/find"
                  className="inline-flex items-center gap-2 bg-[#FAF9F5] hover:bg-[#F4F3EE] text-[#0E3824] px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  Experience the Matchmaking Engine
                  <ArrowRight className="w-4 h-4 text-[#0E3824]" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION C — HOW IT WORKS                                     */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.06)]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0E3824] font-bold bg-[#EAF4EE] px-3 py-1 rounded-full border border-[#0E3824]/15">
              Three Seamless Steps
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141715] mt-3 tracking-tight">
              From intent to destination in three simple moves.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 01 */}
            <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[rgba(20,23,21,0.08)] shadow-sm relative">
              <div className="text-3xl font-extrabold font-mono text-[#0E3824] mb-4">
                01
              </div>
              <h3 className="text-xl font-bold text-[#141715] mb-2">
                Tell us where you&apos;re going.
              </h3>
              <p className="text-sm text-[#4A514D] leading-relaxed mb-6">
                Enter your pickup, destination, and approximate travel window. We support all prime campus and station hubs.
              </p>
              
              {/* Visual Treatment for Step 1: Mini interactive location chip */}
              <div className="bg-[#F4F3EE] p-3.5 rounded-2xl border border-[rgba(20,23,21,0.06)] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#141715] font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#0E3824]" />
                  <span>VIT Bhopal Gate 2</span>
                </div>
                <div className="flex items-center gap-2 text-[#4A514D]">
                  <MapPin className="w-3.5 h-3.5 text-[#D6621B]" />
                  <span>Bhopal Junction (BPL)</span>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[rgba(20,23,21,0.08)] shadow-sm relative">
              <div className="text-3xl font-extrabold font-mono text-[#0E3824] mb-4">
                02
              </div>
              <h3 className="text-xl font-bold text-[#141715] mb-2">
                Find people going your way.
              </h3>
              <p className="text-sm text-[#4A514D] leading-relaxed mb-6">
                Our engine presents compatible co-travellers with mutual verification, route overlap percentage, and luggage fit.
              </p>

              {/* Visual Treatment for Step 2: Compatible rider preview radar */}
              <div className="bg-[#EAF4EE] p-3.5 rounded-2xl border border-[#165337]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
                    alt="Rider"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#0E3824]">Aarav (350m away)</div>
                    <div className="text-[10px] text-[#165337]">94% Route Match</div>
                  </div>
                </div>
                <span className="text-xs font-bold font-mono text-[#0E3824] bg-white px-2 py-0.5 rounded-md">
                  Matches
                </span>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-[#FFFFFF] rounded-3xl p-8 border border-[rgba(20,23,21,0.08)] shadow-sm relative">
              <div className="text-3xl font-extrabold font-mono text-[#0E3824] mb-4">
                03
              </div>
              <h3 className="text-xl font-bold text-[#141715] mb-2">
                Share the ride. Split the fare.
              </h3>
              <p className="text-sm text-[#4A514D] leading-relaxed mb-6">
                Meet at your designated campus gate or waypoint. Share the cab, split the total fare right in half, and travel comfortably.
              </p>

              {/* Visual Treatment for Step 3: Fare split breakdown card */}
              <div className="bg-[#FEF3EB] p-3.5 rounded-2xl border border-[#D6621B]/20 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#D6621B] font-bold">Meter: ₹420</span>
                  <div className="text-[10px] text-[#D6621B]/80">50/50 equal division</div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-[#D6621B]">₹210 each</span>
                  <div className="text-[10px] text-[#227B52] font-semibold">Save ₹210</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION D — THE PRODUCT (INTERACTIVE SEARCH & RIDERS)        */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.06)]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0E3824] font-bold bg-[#EAF4EE] px-3 py-1 rounded-full border border-[#0E3824]/15">
              Live Interactive Prototype
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141715] mt-3 tracking-tight">
              Test the matching interface right now.
            </h2>
            <p className="text-sm text-[#4A514D] mt-2">
              Select your departure point, choose your destination, and preview real-time compatible riders.
            </p>
          </div>

          {/* Interactive Booking Widget */}
          <div className="max-w-4xl mx-auto bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-[0_4px_24px_-4px_rgba(20,23,21,0.05)] mb-12">
            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              
              {/* Pickup Field */}
              <div className="sm:col-span-4">
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#79827D] mb-1.5">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#0E3824] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                    placeholder="e.g. VIT Bhopal Gate 2"
                  />
                </div>
              </div>

              {/* Destination Field */}
              <div className="sm:col-span-4">
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#79827D] mb-1.5">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#D6621B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                    placeholder="e.g. Bhopal Junction (BPL)"
                  />
                </div>
              </div>

              {/* Departure Time */}
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase font-semibold tracking-wider text-[#79827D] mb-1.5">
                  Departure Time
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#79827D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  Find a shared ride
                </button>
              </div>

            </form>
          </div>

          {/* Demonstration of Two Compatible Riders Below */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-semibold text-[#79827D] tracking-wider">
                Active Riders Coordinated on This Route:
              </span>
              <span className="text-xs text-[#0E3824] font-semibold">
                Updated 2 mins ago
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_RIDERS.slice(0, 2).map((rider) => (
                <div
                  key={rider.id}
                  className="bg-[#FFFFFF] rounded-2xl p-5 border border-[rgba(20,23,21,0.08)] shadow-sm hover:border-[#0E3824]/30 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rider.avatar}
                        alt={rider.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#0E3824]/15"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#141715]">{rider.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#227B52]" />
                        </div>
                        <span className="text-[11px] text-[#79827D]">{rider.institution}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block bg-[#EAF4EE] text-[#0E3824] text-[11px] font-bold font-mono px-2 py-0.5 rounded">
                        {rider.routeCompatibility}% Match
                      </span>
                      <div className="text-[10px] text-[#79827D] mt-1 font-mono">{rider.approxDistance}</div>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[rgba(20,23,21,0.06)] text-xs mb-4 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#79827D]">Departure window:</span>
                      <span className="font-semibold text-[#141715] font-mono">{rider.departureTime} ({rider.timeFlexibility})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#79827D]">Drop-off:</span>
                      <span className="font-semibold text-[#141715]">{rider.destination}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[rgba(20,23,21,0.06)]">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#D6621B]">Save ₹{rider.estimatedSavings}</span>
                      <div className="text-xs font-mono font-bold text-[#141715]">
                        Share for ₹{rider.sharedFare}
                      </div>
                    </div>

                    <Link
                      to="/app/matches"
                      className="bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                      Request to Share
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION E — THE SAVINGS MOMENT                               */}
      {/* ============================================================ */}
      <section id="savings-moment" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.06)]">
        <FareSplitVisualizer />
      </section>

      {/* ============================================================ */}
      {/* SECTION F — SAFETY AND TRUST                                 */}
      {/* ============================================================ */}
      <section id="safety" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.06)]">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#0E3824] font-bold bg-[#EAF4EE] px-3 py-1 rounded-full border border-[#0E3824]/15">
              Trust & Safety Protocols
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141715] mt-4 tracking-tight leading-tight">
              Designed around accountability, clarity and student trust.
            </h2>
            <p className="text-base text-[#4A514D] mt-3">
              We never compromise on rider peace of mind. Here is how SahYatri protects your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Trust feature 1 */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[rgba(20,23,21,0.08)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] flex items-center justify-center text-[#0E3824] mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#141715] text-base mb-1">Rider Profiles</h4>
              <p className="text-xs text-[#4A514D] leading-relaxed">
                Every member displays their institution, graduation batch, student email verification status, and ratings from previous co-riders.
              </p>
            </div>

            {/* Trust feature 2 */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[rgba(20,23,21,0.08)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] flex items-center justify-center text-[#0E3824] mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#141715] text-base mb-1">Clear Ride Details</h4>
              <p className="text-xs text-[#4A514D] leading-relaxed">
                Before confirming, review the exact route, agreed departure tolerance, vehicle category, luggage capacity, and fair cost split.
              </p>
            </div>

            {/* Trust feature 3 */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[rgba(20,23,21,0.08)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] flex items-center justify-center text-[#0E3824] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#141715] text-base mb-1">Verified Pickup Points</h4>
              <p className="text-xs text-[#4A514D] leading-relaxed">
                Meetings occur at well-lit, recognizable spots (e.g. Campus Gate 2 Security Post, Station Taxi Stand) to avoid confusion.
              </p>
            </div>

            {/* Trust feature 4 */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[rgba(20,23,21,0.08)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] flex items-center justify-center text-[#0E3824] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#141715] text-base mb-1">Transparent Trip History</h4>
              <p className="text-xs text-[#4A514D] leading-relaxed">
                Review past shared rides, timestamps, co-riders, and total monetary and carbon savings recorded on your profile.
              </p>
            </div>

            {/* Trust feature 5 */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[rgba(20,23,21,0.08)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#FEF3EB] flex items-center justify-center text-[#D6621B] mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#141715] text-base mb-1">Reporting & Blocking</h4>
              <p className="text-xs text-[#4A514D] leading-relaxed">
                Riders can report no-shows or inappropriate conduct with one click. Unverified or reported accounts are promptly restricted.
              </p>
            </div>

            {/* Trust feature 6 */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[rgba(20,23,21,0.08)] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4EE] flex items-center justify-center text-[#0E3824] mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#141715] text-base mb-1">Gender Preference Options</h4>
              <p className="text-xs text-[#4A514D] leading-relaxed">
                Riders can choose to match exclusively with fellow female students whenever preferred for late-night journeys.
              </p>
            </div>

          </div>

          <div className="mt-8 text-center text-xs text-[#79827D]">
            Note: SahYatri is a coordination platform. Always exercise standard situational awareness when travelling.
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION G — FINAL CTA                                        */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto text-center bg-[#FFFFFF] rounded-3xl p-10 md:p-16 border border-[rgba(20,23,21,0.08)] shadow-sm relative overflow-hidden">
          
          {/* Subtle Route Arc in the background */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none">
              <path d="M100 350 C 300 200, 500 200, 700 50" stroke="#0E3824" strokeWidth="8" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D6621B] font-bold bg-[#FEF3EB] px-3.5 py-1.5 rounded-full border border-[#D6621B]/20">
              Join the Network
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#141715] tracking-tight leading-tight">
              Your next ride might already have a passenger.
            </h2>

            <p className="text-base text-[#4A514D] leading-relaxed">
              Never pay full cab fare alone again. Search available travel partners across campus or schedule your upcoming journey.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app/find"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] px-8 py-4 rounded-2xl text-base font-bold shadow-md hover:shadow-lg transition-all"
              >
                Find your SahYatri
                <ArrowRight className="w-5 h-5 text-[#FAF9F5]" />
              </Link>
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F4F3EE] hover:bg-[#EAE8E1] text-[#141715] px-6 py-4 rounded-2xl text-base font-semibold border border-[rgba(20,23,21,0.08)] transition-all"
              >
                Create Free Account
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
