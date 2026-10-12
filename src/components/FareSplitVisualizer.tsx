import React, { useState } from 'react';
import { IndianRupee, Leaf, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FareSplitVisualizer: React.FC = () => {
  const [soloFare, setSoloFare] = useState<number>(420);
  const [passengers, setPassengers] = useState<number>(2);

  const sharedFarePerPerson = Math.round(soloFare / passengers);
  const estimatedSavings = soloFare - sharedFarePerPerson;
  const carbonSavedKg = (estimatedSavings * 0.05).toFixed(1);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-[#FAF9F5] border border-[rgba(20,23,21,0.08)] p-6 md:p-10 shadow-[0_4px_24px_-4px_rgba(20,23,21,0.06)]">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs uppercase font-mono tracking-widest text-[#D6621B] font-semibold bg-[#FEF3EB] px-3 py-1 rounded-full border border-[#D6621B]/20">
          The Savings Moment
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-[#141715] mt-3 tracking-tight">
          Halve your commute costs with one tap.
        </h3>
        <p className="text-sm text-[#4A514D] mt-2">
          Move the slider to compare typical Bhopal cab fares (VIT Bhopal to Station / Airport).
        </p>
      </div>

      {/* Slider Controls */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[rgba(20,23,21,0.06)] shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <label className="text-xs uppercase font-semibold tracking-wider text-[#79827D]">
              Estimated Single-Cab Meter Fare
            </label>
            <div className="text-2xl font-bold font-mono text-[#141715] flex items-center mt-1">
              <IndianRupee className="w-5 h-5 mr-0.5 text-[#79827D]" />
              {soloFare}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#79827D]">Split With:</span>
            {[2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setPassengers(num)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  passengers === num
                    ? 'bg-[#0E3824] text-[#FAF9F5] shadow-sm'
                    : 'bg-[#F4F3EE] text-[#4A514D] hover:bg-[#EAE8E1]'
                }`}
              >
                {num} Passengers ({num === 2 ? '50/50' : '33% each'})
              </button>
            ))}
          </div>
        </div>

        <input
          type="range"
          min="200"
          max="1200"
          step="20"
          value={soloFare}
          onChange={(e) => setSoloFare(Number(e.target.value))}
          className="w-full h-2 bg-[#F4F3EE] rounded-lg appearance-none cursor-pointer accent-[#0E3824]"
        />

        <div className="flex justify-between text-[11px] text-[#79827D] mt-2 font-mono">
          <span>₹200 (Short city hop)</span>
          <span>₹420 (VIT to Bhopal Jn)</span>
          <span>₹1,200 (Airport / Indore Link)</span>
        </div>
      </div>

      {/* Visual Fare Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {/* Solo Card */}
        <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[rgba(20,23,21,0.08)] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#79827D]">
              Solo Ride (Without SahYatri)
            </span>
            <div className="text-3xl font-bold font-mono text-[#141715] mt-2 flex items-center line-through decoration-[#D6621B]/60 decoration-2">
              <IndianRupee className="w-6 h-6 mr-0.5" />
              {soloFare}
            </div>
            <p className="text-xs text-[#79827D] mt-1">1 person bearing 100% of fuel and driver fees</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[rgba(20,23,21,0.06)] text-xs text-[#79827D] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#79827D]/40"></span>
            Full cost out of pocket
          </div>
        </div>

        {/* Shared Card */}
        <div className="bg-[#EAF4EE] rounded-2xl p-6 border border-[#165337]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#0E3824] text-[#FAF9F5] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
            SahYatri Shared
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0E3824]">
              Your Shared Cost
            </span>
            <div className="text-3xl font-bold font-mono text-[#0E3824] mt-2 flex items-center">
              <IndianRupee className="w-6 h-6 mr-0.5" />
              {sharedFarePerPerson}
              <span className="text-xs font-normal text-[#165337] ml-2">/ person</span>
            </div>
            <p className="text-xs text-[#165337] mt-1">Exact equal split with pre-vetted co-rider</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#165337]/20 text-xs text-[#0E3824] font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#0E3824]" />
            Split in-app or cash direct to cab
          </div>
        </div>

        {/* Highlighted Savings Card */}
        <div className="bg-[#FEF3EB] rounded-2xl p-6 border border-[#D6621B]/30 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D6621B]">
              Estimated Net Savings
            </span>
            <div className="text-3xl font-bold font-mono text-[#D6621B] mt-2 flex items-center">
              <IndianRupee className="w-6 h-6 mr-0.5" />
              {estimatedSavings}
            </div>
            <p className="text-xs text-[#D6621B]/90 mt-1">Kept right in your pocket every trip</p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#D6621B]/20 text-xs text-[#D6621B] font-medium flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#227B52]" />
            ~{carbonSavedKg} kg CO₂ tailpipe emissions prevented
          </div>
        </div>
      </div>

      {/* CTA Trigger */}
      <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/app/find"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-sm hover:shadow"
        >
          Check Today&apos;s Active Matches
          <ArrowRight className="w-4 h-4" />
        </Link>
        <span className="text-xs text-[#79827D]">
          Illustrative values. Real fares calculated transparently at pickup.
        </span>
      </div>
    </div>
  );
};
