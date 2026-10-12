import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  IndianRupee, 
  ShieldCheck, 
  MessageSquare, 
  PhoneCall, 
  Share2, 
  AlertTriangle, 
  ArrowLeft,
  Navigation,
  Check,
  X
} from 'lucide-react';
import { rideStore } from '../services/rideStore';

export const RideDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activeRide = rideStore.getActiveRide();

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'coRider', text: 'Hey! I am heading from Block 2. Will reach Gate 2 by 16:40.', time: '16:15' },
    { sender: 'user', text: 'Perfect, I am at the coffee kiosk now. Let me know when you reach!', time: '16:18' }
  ]);
  const [inputText, setInputText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // If no active ride or id doesn't match, gracefully fallback or show empty state
  if (!activeRide) {
    return (
      <div className="bg-[#FFFFFF] rounded-3xl p-12 text-center border border-[rgba(20,23,21,0.08)] max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-[#141715]">No Active Ride In Progress</h2>
        <p className="text-xs text-[#79827D] mt-2 mb-6">
          You don&apos;t have any active shared trips right now. Search for an upcoming corridor to find a fellow traveller.
        </p>
        <Link
          to="/app/find"
          className="inline-flex items-center gap-2 bg-[#0E3824] text-[#FAF9F5] px-6 py-3 rounded-xl text-xs font-bold"
        >
          Find a Shared Ride
        </Link>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'user', text: inputText, time: 'Just now' }]);
    setInputText('');
  };

  const handleShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCompleteRide = () => {
    rideStore.completeActiveRide();
    navigate('/app/history');
  };

  const handleCancelRide = () => {
    if (confirm('Are you sure you want to cancel this coordinated ride?')) {
      rideStore.cancelActiveRide();
      navigate('/app');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Top back navigation and status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="p-2 bg-[#FFFFFF] rounded-xl border border-[rgba(20,23,21,0.08)] text-[#141715] hover:bg-[#F4F3EE] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#D6621B]">
                Active Shared Journey
              </span>
              <span className="text-[10px] bg-[#EAF4EE] text-[#0E3824] px-2 py-0.5 rounded-full font-bold">
                Status: Coordinated
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#141715] tracking-tight mt-0.5">
              Trip #{activeRide.id}
            </h1>
          </div>
        </div>

        {/* Action button header */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShareLink}
            className="px-3.5 py-2 bg-[#FFFFFF] rounded-xl border border-[rgba(20,23,21,0.08)] text-xs font-semibold text-[#141715] hover:bg-[#F4F3EE] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#0E3824]" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Live Trip'}</span>
          </button>
          <button
            onClick={() => setChatOpen(true)}
            className="px-4 py-2 bg-[#0E3824] hover:bg-[#165337] rounded-xl text-xs font-bold text-[#FAF9F5] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Co-Rider</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Route & Meeting details, Right Co-rider & Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Route Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Convergence Route Card */}
          <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-sm space-y-6">
            <h2 className="text-sm uppercase font-mono font-bold tracking-wider text-[#79827D]">
              Coordinated Route Itinerary
            </h2>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[rgba(20,23,21,0.1)]">
              
              {/* Point 1: Your Pickup */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-[#EAF4EE] border-2 border-[#0E3824] flex items-center justify-center shrink-0 z-10 text-[10px] font-bold text-[#0E3824]">
                  A
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#0E3824] font-semibold">Your Pickup Spot</span>
                  <div className="text-sm font-bold text-[#141715]">{activeRide.pickup}</div>
                  <div className="text-xs text-[#79827D] mt-0.5">Departs: {activeRide.departureTime}</div>
                </div>
              </div>

              {/* Point 2: Co-Rider Convergence */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-[#FEF3EB] border-2 border-[#D6621B] flex items-center justify-center shrink-0 z-10 text-[10px] font-bold text-[#D6621B]">
                  B
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#D6621B] font-semibold">Meeting Waypoint</span>
                  <div className="text-sm font-bold text-[#141715]">{activeRide.meetingPoint}</div>
                  <div className="text-xs text-[#79827D] mt-0.5">{activeRide.meetingDirections}</div>
                </div>
              </div>

              {/* Point 3: Final Destination */}
              <div className="flex items-start gap-4 relative">
                <div className="w-7 h-7 rounded-full bg-[#0E3824] border-2 border-[#FAF9F5] flex items-center justify-center shrink-0 z-10 text-[10px] font-bold text-[#FAF9F5]">
                  C
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#141715] font-semibold">Destination</span>
                  <div className="text-sm font-bold text-[#141715]">{activeRide.destination}</div>
                  <div className="text-xs text-[#79827D] mt-0.5">Estimated Arrival: ~45 mins</div>
                </div>
              </div>

            </div>

            {/* Cab Vehicle Telemetry */}
            {activeRide.cabService && (
              <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[rgba(20,23,21,0.06)] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#79827D] block">Coordinated Vehicle</span>
                  <div className="font-bold text-[#141715]">{activeRide.cabService}</div>
                  {activeRide.vehicleNumber && (
                    <div className="text-[11px] font-mono text-[#0E3824]">{activeRide.vehicleNumber}</div>
                  )}
                </div>
                {activeRide.otp && (
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-[#79827D] block">Cab Start OTP</span>
                    <span className="font-mono font-extrabold text-base text-[#D6621B]">{activeRide.otp}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Safety & Emergency Panel */}
          <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#227B52]" />
              <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-[#141715]">
                Trip Safety Actions
              </h3>
            </div>
            <p className="text-xs text-[#4A514D] leading-relaxed">
              Your ride coordinates are encrypted and verified against campus registration numbers.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={() => alert('Emergency alert dispatched to campus security and emergency contacts.')}
                className="px-3.5 py-2 rounded-xl bg-[#FEF3EB] hover:bg-[#FDE7D4] text-[#D6621B] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Trigger Safety SOS</span>
              </button>
              <button
                onClick={handleCancelRide}
                className="px-3.5 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F3EE] text-[#79827D] hover:text-[#141715] text-xs font-semibold border border-[rgba(20,23,21,0.08)] transition-colors cursor-pointer"
              >
                <span>Cancel Match</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Co-rider Profile & Fare Split */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Co-Rider Profile Card */}
          <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm space-y-4">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#79827D]">
              Matched Co-Traveller
            </span>

            <div className="flex items-center gap-4">
              <img
                src={activeRide.coRider.avatar}
                alt={activeRide.coRider.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0E3824]/20"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-[#141715]">{activeRide.coRider.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#227B52]" />
                </div>
                <div className="text-xs font-semibold text-[#0E3824]">{activeRide.coRider.institution}</div>
                <div className="text-xs text-[#79827D]">{activeRide.coRider.role}</div>
              </div>
            </div>

            <div className="bg-[#FAF9F5] p-3 rounded-2xl border border-[rgba(20,23,21,0.06)] text-xs text-[#4A514D]">
              <span className="font-semibold text-[#141715]">Note: </span>
              {activeRide.coRider.bio}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setChatOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#EAF4EE] text-[#0E3824] hover:bg-[#D8EDE0] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Coordination Chat</span>
              </button>
            </div>
          </div>

          {/* Fare Division Card */}
          <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-[rgba(20,23,21,0.08)] shadow-sm space-y-4">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#0E3824]">
              Transparent Cost Breakdown
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-[#79827D]">
                <span>Total Single-Cab Estimate:</span>
                <span className="font-mono text-[#141715]">₹{activeRide.soloFare}</span>
              </div>
              <div className="flex justify-between text-[#79827D]">
                <span>Number of Passengers:</span>
                <span className="font-mono text-[#141715]">2 (Equal 50/50 split)</span>
              </div>
              <div className="flex justify-between text-[#79827D]">
                <span>SahYatri Service Fee:</span>
                <span className="font-mono text-[#227B52] font-semibold">₹0 (Free during beta)</span>
              </div>
              <div className="pt-3 border-t border-[rgba(20,23,21,0.06)] flex justify-between items-baseline">
                <span className="text-xs font-bold text-[#141715]">Your Shared Portion:</span>
                <span className="text-2xl font-bold font-mono text-[#0E3824]">₹{activeRide.sharedFare}</span>
              </div>
            </div>

            <div className="bg-[#FEF3EB] p-3 rounded-xl border border-[#D6621B]/20 text-xs text-[#D6621B] font-semibold flex items-center justify-between">
              <span>Your Estimated Savings:</span>
              <span className="font-mono font-bold text-sm">₹{activeRide.savings}</span>
            </div>

            <button
              onClick={handleCompleteRide}
              className="w-full bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Check className="w-4 h-4" />
              <span>Mark Trip Completed</span>
            </button>
          </div>

        </div>

      </div>

      {/* Floating Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-3xl max-w-md w-full h-[520px] flex flex-col border border-[rgba(20,23,21,0.08)] shadow-2xl overflow-hidden animate-fade-in">
            {/* Chat header */}
            <div className="p-4 bg-[#FAF9F5] border-b border-[rgba(20,23,21,0.06)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeRide.coRider.avatar}
                  alt={activeRide.coRider.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-[#141715]">{activeRide.coRider.name}</div>
                  <div className="text-[10px] text-[#227B52]">Online • Co-rider</div>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-full text-[#79827D] hover:bg-[#EAE8E1]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat message history */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF9F5]/40">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#0E3824] text-[#FAF9F5] rounded-br-none'
                        : 'bg-[#FFFFFF] text-[#141715] border border-[rgba(20,23,21,0.08)] rounded-bl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#79827D] mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#FFFFFF] border-t border-[rgba(20,23,21,0.06)] flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type coordinate message..."
                className="flex-1 bg-[#FAF9F5] text-xs px-3 py-2.5 rounded-xl border border-[rgba(20,23,21,0.1)] focus:outline-none focus:border-[#0E3824]"
              />
              <button
                type="submit"
                className="bg-[#0E3824] text-[#FAF9F5] px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#165337] transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
