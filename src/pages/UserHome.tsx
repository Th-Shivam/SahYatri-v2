import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Leaf, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Car
} from 'lucide-react';
import { rideStore } from '../services/rideStore';
import { POPULAR_LOCATIONS } from '../data/mockData';

export const UserHome: React.FC = () => {
  const navigate = useNavigate();
  const user = rideStore.getUser();
  const activeRide = rideStore.getActiveRide();

  const [pickup, setPickup] = useState('VIT Bhopal University, Kothri Kalan');
  const [destination, setDestination] = useState('Bhopal Junction Railway Station (BPL)');
  const [time, setTime] = useState('16:30');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/app/find?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#0E3824]">
            Welcome back, {user.name.split(' ')[0]}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141715] tracking-tight mt-1">
            Where are you travelling today?
          </h1>
          <p className="text-xs text-[#79827D] mt-0.5">
            Verified campus corridor: <span className="text-[#0E3824] font-semibold">{user.institution}</span>
          </p>
        </div>

        {/* Action to browse active matches */}
        <Link
          to="/app/matches"
          className="inline-flex items-center gap-2 bg-[#EAF4EE] hover:bg-[#D8EDE0] text-[#0E3824] px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border border-[#165337]/15 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-[#0E3824]" />
          <span>4 Live Corridor Matches</span>
        </Link>
      </div>

      {/* Primary Booking / Search Widget */}
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-sm">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Origin Input */}
            <div className="md:col-span-5">
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Starting Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#0E3824] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                  placeholder="Enter campus gate or address"
                />
              </div>
            </div>

            {/* Destination Input */}
            <div className="md:col-span-4">
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Drop Destination
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#D6621B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                  placeholder="Station, Airport, or Mall"
                />
              </div>
            </div>

            {/* Time Slot */}
            <div className="md:col-span-3">
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Target Departure
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#79827D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                />
              </div>
            </div>

          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-semibold text-[#79827D]">Frequent Hubs:</span>
            {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setDestination(loc)}
                className="text-[11px] bg-[#F4F3EE] hover:bg-[#EAE8E1] text-[#4A514D] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {loc.split(',')[0]}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Find Compatible SahYatris
            </button>
          </div>
        </form>
      </div>

      {/* Active or Sample Upcoming Ride Card */}
      {activeRide ? (
        <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(20,23,21,0.06)]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EA752A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D6621B]"></span>
              </span>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#D6621B]">
                  Upcoming Coordinated Ride
                </span>
                <div className="text-xs text-[#79827D]">Departs {activeRide.departureTime} ({activeRide.departureDate})</div>
              </div>
            </div>

            <Link
              to={`/app/ride/${activeRide.id}`}
              className="inline-flex items-center gap-1.5 bg-[#0E3824] text-[#FAF9F5] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#165337] transition-all self-start sm:self-auto"
            >
              <span>Manage Ride</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
            {/* Route Details */}
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0E3824] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-[#79827D]">Pickup Spot</div>
                  <div className="text-sm font-bold text-[#141715]">{activeRide.pickup}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D6621B] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-[#79827D]">Destination</div>
                  <div className="text-sm font-bold text-[#141715]">{activeRide.destination}</div>
                </div>
              </div>

              <div className="bg-[#FAF9F5] p-3 rounded-xl border border-[rgba(20,23,21,0.06)] text-xs text-[#4A514D]">
                <span className="font-semibold text-[#141715]">Meeting instructions: </span>
                {activeRide.meetingDirections}
              </div>
            </div>

            {/* Co-Rider & Fare Split Summary */}
            <div className="md:col-span-5 bg-[#FAF9F5] p-5 rounded-2xl border border-[rgba(20,23,21,0.06)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeRide.coRider.avatar}
                    alt={activeRide.coRider.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#0E3824]/20"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#141715] flex items-center gap-1">
                      {activeRide.coRider.name}
                      <CheckCircle2 className="w-3 h-3 text-[#227B52]" />
                    </div>
                    <div className="text-[10px] text-[#79827D]">{activeRide.coRider.institution}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#EAF4EE] text-[#0E3824] px-2 py-0.5 rounded">
                  {activeRide.coRider.routeCompatibility}% Match
                </span>
              </div>

              <div className="pt-3 border-t border-[rgba(20,23,21,0.06)] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#79827D]">Your Split:</span>
                  <div className="text-base font-bold font-mono text-[#0E3824]">₹{activeRide.sharedFare}</div>
                </div>
                <div className="text-right">
                  <span className="text-[#D6621B] font-semibold">Net Saved:</span>
                  <div className="text-base font-bold font-mono text-[#D6621B]">₹{activeRide.savings}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Illustrative Savings Statistics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase font-semibold tracking-wider text-[#79827D]">
            Lifetime Mobility Impact:
          </span>
          <span className="text-xs text-[#0E3824] font-semibold">
            Based on student shared trips
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm">
            <div className="flex items-center justify-between text-[#0E3824] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#79827D]">Total Money Saved</span>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#0E3824]">
              ₹{user.totalSaved}
            </div>
            <p className="text-[11px] text-[#79827D] mt-1">Calculated against solo cab tariffs</p>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm">
            <div className="flex items-center justify-between text-[#141715] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#79827D]">Trips Shared</span>
              <Car className="w-5 h-5 text-[#79827D]" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#141715]">
              {user.tripsCompleted}
            </div>
            <p className="text-[11px] text-[#79827D] mt-1">Across Bhopal railway & airport routes</p>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm">
            <div className="flex items-center justify-between text-[#227B52] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#79827D]">Carbon Offset</span>
              <Leaf className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold font-mono text-[#227B52]">
              {user.carbonOffsetKg} kg
            </div>
            <p className="text-[11px] text-[#79827D] mt-1">~18 empty solo cab trips avoided</p>
          </div>

        </div>
      </div>

    </div>
  );
};
