import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  IndianRupee, 
  Leaf, 
  CheckCircle2, 
  XCircle, 
  Receipt, 
  X, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { rideStore } from '../services/rideStore';
import { SharedRide } from '../types';

export const RideHistoryPage: React.FC = () => {
  const history = rideStore.getHistory();
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'cancelled'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<SharedRide | null>(null);

  const filteredHistory = history.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const totalSaved = history
    .filter((r) => r.status === 'completed')
    .reduce((acc, curr) => acc + curr.savings, 0);

  return (
    <div className="space-y-8">
      
      {/* Header and Aggregate Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#0E3824]">
            Past Shared Journeys
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141715] tracking-tight mt-1">
            Trip History & Split Receipts
          </h1>
          <p className="text-xs text-[#79827D] mt-1">
            Complete records of co-travelled corridors and verified savings.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#FFFFFF] p-1.5 rounded-2xl border border-[rgba(20,23,21,0.08)] shadow-sm self-start sm:self-auto">
          {(['all', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#0E3824] text-[#FAF9F5]'
                  : 'text-[#4A514D] hover:bg-[#FAF9F5]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Savings Banner */}
      <div className="bg-[#EAF4EE] rounded-3xl p-6 border border-[#165337]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#0E3824] text-[#FAF9F5] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0E3824]">
              Cumulative Shared Savings
            </div>
            <div className="text-2xl font-extrabold font-mono text-[#0E3824]">
              ₹{totalSaved}
            </div>
          </div>
        </div>

        <Link
          to="/app/find"
          className="inline-flex items-center gap-1.5 bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] px-4 py-2.5 rounded-xl text-xs font-bold transition-all self-start sm:self-auto"
        >
          <span>Find Another Ride</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Trips Timeline */}
      {filteredHistory.length === 0 ? (
        <div className="bg-[#FFFFFF] rounded-3xl p-12 text-center border border-[rgba(20,23,21,0.08)] max-w-md mx-auto">
          <Clock className="w-10 h-10 text-[#79827D] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[#141715]">No Trips In This Category</h3>
          <p className="text-xs text-[#79827D] mt-1 mb-6">
            You don&apos;t have any {filterStatus !== 'all' ? filterStatus : ''} trips recorded yet.
          </p>
          <Link
            to="/app/find"
            className="inline-flex items-center gap-1.5 bg-[#0E3824] text-[#FAF9F5] px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            Start Shared Ride
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((trip) => (
            <div
              key={trip.id}
              className="bg-[#FFFFFF] rounded-3xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm hover:border-[#0E3824]/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Trip info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase font-bold px-2 py-0.5 rounded-md ${
                    trip.status === 'completed'
                      ? 'bg-[#EAF4EE] text-[#0E3824]'
                      : 'bg-[#FEF3EB] text-[#D6621B]'
                  }`}>
                    {trip.status === 'completed' ? (
                      <CheckCircle2 className="w-3 h-3 text-[#227B52]" />
                    ) : (
                      <XCircle className="w-3 h-3 text-[#D6621B]" />
                    )}
                    <span>{trip.status}</span>
                  </span>
                  <span className="text-xs text-[#79827D] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{trip.departureDate} at {trip.departureTime}</span>
                  </span>
                </div>

                <div className="text-sm font-bold text-[#141715] flex flex-wrap items-center gap-2">
                  <span>{trip.pickup.split(',')[0]}</span>
                  <span className="text-[#79827D]">→</span>
                  <span>{trip.destination.split(',')[0]}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#79827D]">
                  <img
                    src={trip.coRider.avatar}
                    alt={trip.coRider.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Co-rider: <strong className="text-[#141715]">{trip.coRider.name}</strong> ({trip.coRider.institution})</span>
                </div>
              </div>

              {/* Financials & Receipt Button */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-[rgba(20,23,21,0.06)]">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#79827D] block">Your Fare Paid</span>
                  <div className="text-base font-bold font-mono text-[#141715]">
                    ₹{trip.sharedFare}
                  </div>
                  {trip.status === 'completed' && (
                    <span className="text-[10px] text-[#227B52] font-semibold">Saved ₹{trip.savings}</span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedReceipt(trip)}
                  className="px-4 py-2 bg-[#FAF9F5] hover:bg-[#F4F3EE] rounded-xl text-xs font-semibold text-[#141715] border border-[rgba(20,23,21,0.08)] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Receipt className="w-3.5 h-3.5 text-[#0E3824]" />
                  <span>View Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[rgba(20,23,21,0.08)] shadow-2xl relative animate-fade-in">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#79827D] hover:bg-[#FAF9F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-6 border-b border-[rgba(20,23,21,0.06)]">
              <span className="text-xs uppercase font-mono tracking-widest text-[#0E3824] font-bold">
                SahYatri Split Receipt
              </span>
              <h3 className="text-xl font-bold text-[#141715] mt-1">
                Trip #{selectedReceipt.id}
              </h3>
              <p className="text-xs text-[#79827D] mt-0.5">
                {selectedReceipt.departureDate} • {selectedReceipt.departureTime}
              </p>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#79827D]">Pickup:</span>
                <span className="font-semibold text-[#141715] text-right max-w-[200px] truncate">{selectedReceipt.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#79827D]">Destination:</span>
                <span className="font-semibold text-[#141715] text-right max-w-[200px] truncate">{selectedReceipt.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#79827D]">Co-Rider:</span>
                <span className="font-semibold text-[#141715]">{selectedReceipt.coRider.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#79827D]">Cab Vehicle:</span>
                <span className="font-semibold text-[#141715]">{selectedReceipt.cabService || 'Coordinated Taxi'}</span>
              </div>

              <div className="pt-3 border-t border-[rgba(20,23,21,0.06)] space-y-2">
                <div className="flex justify-between text-[#79827D]">
                  <span>Total Single Cab Meter:</span>
                  <span className="font-mono text-[#141715]">₹{selectedReceipt.soloFare}</span>
                </div>
                <div className="flex justify-between text-[#79827D]">
                  <span>Split Ratio:</span>
                  <span className="font-mono text-[#141715]">50% (2 Passengers)</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-[rgba(20,23,21,0.06)]">
                  <span>Amount Paid By You:</span>
                  <span className="font-mono text-[#0E3824]">₹{selectedReceipt.sharedFare}</span>
                </div>
                <div className="flex justify-between text-[#227B52] font-semibold text-xs">
                  <span>Net Savings Realized:</span>
                  <span className="font-mono">₹{selectedReceipt.savings}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(20,23,21,0.06)]">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-full py-3 rounded-xl bg-[#0E3824] text-[#FAF9F5] text-xs font-bold"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
