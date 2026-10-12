import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Sparkles, 
  Filter, 
  ArrowRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { MOCK_RIDERS } from '../data/mockData';
import { Rider } from '../types';
import { rideStore } from '../services/rideStore';

export const MatchesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pickup = searchParams.get('pickup') || 'VIT Bhopal University';
  const destination = searchParams.get('destination') || 'Bhopal Junction Railway Station';

  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [requestSent, setRequestSent] = useState(false);
  const [filterMinCompatibility, setFilterMinCompatibility] = useState<number>(85);

  const filteredRiders = MOCK_RIDERS.filter(
    (r) => r.routeCompatibility >= filterMinCompatibility
  );

  const handleConfirmShare = (rider: Rider) => {
    const newRide = rideStore.requestRideShare(
      rider,
      pickup,
      destination,
      rider.departureTime
    );
    setRequestSent(true);
    setTimeout(() => {
      navigate(`/app/ride/${newRide.id}`);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      
      {/* Header and Filter summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#0E3824]">
            Corridor Telemetry Matches
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141715] tracking-tight mt-1">
            Compatible Riders Found
          </h1>
          <div className="flex items-center gap-2 text-xs text-[#79827D] mt-1">
            <span className="font-semibold text-[#141715]">{pickup.split(',')[0]}</span>
            <span>→</span>
            <span className="font-semibold text-[#141715]">{destination.split(',')[0]}</span>
          </div>
        </div>

        {/* Compatibility threshold filter */}
        <div className="flex items-center gap-2 bg-[#FFFFFF] p-1.5 rounded-2xl border border-[rgba(20,23,21,0.08)] shadow-sm">
          <Filter className="w-3.5 h-3.5 text-[#79827D] ml-2" />
          <span className="text-xs text-[#79827D] font-medium">Min Compatibility:</span>
          {[85, 90, 95].map((val) => (
            <button
              key={val}
              onClick={() => setFilterMinCompatibility(val)}
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                filterMinCompatibility === val
                  ? 'bg-[#0E3824] text-[#FAF9F5]'
                  : 'text-[#4A514D] hover:bg-[#FAF9F5]'
              }`}
            >
              {val}%+
            </button>
          ))}
        </div>
      </div>

      {/* Rider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRiders.map((rider) => (
          <div
            key={rider.id}
            className="bg-[#FFFFFF] rounded-3xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm hover:border-[#0E3824]/30 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Rider Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={rider.avatar}
                    alt={rider.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#0E3824]/15"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-bold text-[#141715]">{rider.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-[#227B52]" />
                    </div>
                    <div className="text-xs font-semibold text-[#0E3824]">{rider.institution}</div>
                    <div className="text-[11px] text-[#79827D]">{rider.role} • {rider.totalRides} trips</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center gap-1 bg-[#EAF4EE] text-[#0E3824] px-2.5 py-1 rounded-xl text-xs font-mono font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>{rider.routeCompatibility}% Match</span>
                  </div>
                  <div className="text-[11px] text-[#79827D] mt-1 font-mono">{rider.approxDistance}</div>
                </div>
              </div>

              {/* Bio snippet */}
              {rider.bio && (
                <p className="text-xs text-[#4A514D] bg-[#FAF9F5] p-3 rounded-xl border border-[rgba(20,23,21,0.06)] mb-4 italic">
                  &ldquo;{rider.bio}&rdquo;
                </p>
              )}

              {/* Trip Parameters */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-[rgba(20,23,21,0.06)]">
                  <span className="text-[#79827D] block text-[10px] uppercase font-semibold">Departure Time</span>
                  <div className="font-bold text-[#141715] font-mono mt-0.5">
                    {rider.departureTime} <span className="text-[10px] font-normal text-[#79827D]">({rider.timeFlexibility})</span>
                  </div>
                </div>

                <div className="bg-[#FAF9F5] p-2.5 rounded-xl border border-[rgba(20,23,21,0.06)]">
                  <span className="text-[#79827D] block text-[10px] uppercase font-semibold">Target Drop</span>
                  <div className="font-bold text-[#141715] truncate mt-0.5">
                    {rider.destination.split(',')[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Fare Split and CTA Action */}
            <div className="pt-4 border-t border-[rgba(20,23,21,0.06)] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#D6621B] block">
                  Estimated Savings: ₹{rider.estimatedSavings}
                </span>
                <div className="text-lg font-bold font-mono text-[#141715] flex items-center">
                  <IndianRupee className="w-4 h-4 mr-0.5 text-[#0E3824]" />
                  <span>{rider.sharedFare}</span>
                  <span className="text-[11px] font-normal text-[#79827D] ml-1">/ person</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRider(rider)}
                className="bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Request to Share</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[rgba(20,23,21,0.08)] shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setSelectedRider(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#79827D] hover:bg-[#FAF9F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#0E3824] bg-[#EAF4EE] px-2.5 py-1 rounded-lg">
              Confirm Peer Ride Request
            </span>

            <h3 className="text-xl font-bold text-[#141715] mt-3">
              Share cab with {selectedRider.name}?
            </h3>

            <p className="text-xs text-[#4A514D] mt-1.5 leading-relaxed">
              We will notify {selectedRider.name} on the campus coordination radar. You will both split the estimated ₹{selectedRider.soloFare} cab fare 50/50.
            </p>

            <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[rgba(20,23,21,0.06)] my-5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#79827D]">Meeting Waypoint:</span>
                <span className="font-semibold text-[#141715]">{selectedRider.pickupLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#79827D]">Target Departure:</span>
                <span className="font-semibold text-[#141715]">{selectedRider.departureTime} ({selectedRider.timeFlexibility})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#79827D]">Your Fare Split:</span>
                <span className="font-bold text-[#0E3824] font-mono">₹{selectedRider.sharedFare} (Save ₹{selectedRider.estimatedSavings})</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedRider(null)}
                className="w-1/3 py-3 rounded-xl text-xs font-semibold bg-[#F4F3EE] text-[#141715] hover:bg-[#EAE8E1]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmShare(selectedRider)}
                disabled={requestSent}
                className="w-2/3 py-3 rounded-xl text-xs font-bold bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] flex items-center justify-center gap-2 shadow-sm"
              >
                {requestSent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Connecting Route...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Connect</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
