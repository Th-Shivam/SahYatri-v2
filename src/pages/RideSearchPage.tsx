import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Luggage, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/mockData';

export const RideSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pickup, setPickup] = useState(searchParams.get('pickup') || 'VIT Bhopal University, Kothri Kalan');
  const [destination, setDestination] = useState(searchParams.get('destination') || 'Bhopal Junction Railway Station (BPL)');
  const [date, setDate] = useState('Today, 12 Oct');
  const [timeSlot, setTimeSlot] = useState('16:00 - 17:00');
  const [genderFilter, setGenderFilter] = useState<'any' | 'same-gender'>('any');
  const [luggageSize, setLuggageSize] = useState<'any' | 'small' | 'large'>('any');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/app/matches?pickup=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#0E3824]">
          Find Your Travel Partner
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141715] tracking-tight mt-1">
          Search Shared Ride Routes
        </h1>
        <p className="text-xs text-[#79827D] mt-1">
          Find campus peers and verified riders travelling along your corridor.
        </p>
      </div>

      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-sm">
        <form onSubmit={handleSearchSubmit} className="space-y-6">
          
          {/* Main Corridor Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Pickup Waypoint
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#0E3824] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Drop Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#D6621B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                />
              </div>
            </div>
          </div>

          {/* Quick Destination Selectors */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] text-[#79827D] font-medium mr-1 self-center">Popular:</span>
            {POPULAR_LOCATIONS.slice(0, 5).map((loc) => (
              <button
                type="button"
                key={loc}
                onClick={() => setDestination(loc)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  destination === loc
                    ? 'bg-[#EAF4EE] text-[#0E3824] border-[#0E3824]/30 font-bold'
                    : 'bg-[#FAF9F5] text-[#4A514D] border-[rgba(20,23,21,0.06)] hover:bg-[#F4F3EE]'
                }`}
              >
                {loc.split(',')[0]}
              </button>
            ))}
          </div>

          {/* Date & Time Slot Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[rgba(20,23,21,0.06)]">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Travel Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#79827D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                >
                  <option value="Today, 12 Oct">Today, 12 Oct</option>
                  <option value="Tomorrow, 13 Oct">Tomorrow, 13 Oct</option>
                  <option value="Wednesday, 14 Oct">Wednesday, 14 Oct</option>
                  <option value="Thursday, 15 Oct">Thursday, 15 Oct</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Departure Time Window
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-[#79827D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                >
                  <option value="15:00 - 16:00">15:00 - 16:00 (Afternoon)</option>
                  <option value="16:00 - 17:00">16:00 - 17:00 (Evening trains)</option>
                  <option value="17:00 - 18:30">17:00 - 18:30 (Peak transit)</option>
                  <option value="18:30 - 20:00">18:30 - 20:00 (Night link)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferences Filters */}
          <div className="pt-2 border-t border-[rgba(20,23,21,0.06)] space-y-3">
            <span className="text-xs uppercase font-semibold text-[#79827D] tracking-wider block">
              Preferences & Filters:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Gender Preference */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F5] border border-[rgba(20,23,21,0.06)]">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#0E3824]" />
                  <span className="text-xs font-semibold text-[#141715]">Rider Gender</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setGenderFilter('any')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      genderFilter === 'any' ? 'bg-[#0E3824] text-[#FAF9F5]' : 'bg-[#FFFFFF] text-[#4A514D]'
                    }`}
                  >
                    Any
                  </button>
                  <button
                    type="button"
                    onClick={() => setGenderFilter('same-gender')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      genderFilter === 'same-gender' ? 'bg-[#0E3824] text-[#FAF9F5]' : 'bg-[#FFFFFF] text-[#4A514D]'
                    }`}
                  >
                    Women-only
                  </button>
                </div>
              </div>

              {/* Luggage Fit */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF9F5] border border-[rgba(20,23,21,0.06)]">
                <div className="flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-[#0E3824]" />
                  <span className="text-xs font-semibold text-[#141715]">Luggage Space</span>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setLuggageSize('any')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      luggageSize === 'any' ? 'bg-[#0E3824] text-[#FAF9F5]' : 'bg-[#FFFFFF] text-[#4A514D]'
                    }`}
                  >
                    Backpack
                  </button>
                  <button
                    type="button"
                    onClick={() => setLuggageSize('large')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      luggageSize === 'large' ? 'bg-[#0E3824] text-[#FAF9F5]' : 'bg-[#FFFFFF] text-[#4A514D]'
                    }`}
                  >
                    Suitcase / XL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Search */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] py-4 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Search Compatible SahYatris</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
