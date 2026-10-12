import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  Phone, 
  GraduationCap, 
  Music, 
  MessageCircle, 
  AlertCircle, 
  RefreshCw, 
  Check, 
  CheckCircle2,
  Share2
} from 'lucide-react';
import { rideStore } from '../services/rideStore';

export const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState(rideStore.getUser());
  const [preferredMusic, setPreferredMusic] = useState(user.preferredMusic);
  const [chattyRides, setChattyRides] = useState(user.chattyRides);
  const [isSaved, setIsSaved] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = rideStore.updateUser({
      preferredMusic,
      chattyRides
    });
    setUser(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleResetDemo = () => {
    if (confirm('Reset demo state to initial showcase values?')) {
      rideStore.resetDemoState();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[rgba(20,23,21,0.06)]">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-[#0E3824]/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#141715]">{user.name}</h1>
                <CheckCircle2 className="w-5 h-5 text-[#227B52]" />
              </div>
              <div className="text-xs font-semibold text-[#0E3824] flex items-center gap-1.5 mt-0.5">
                <GraduationCap className="w-4 h-4" />
                <span>{user.institution}</span>
              </div>
              <div className="text-xs text-[#79827D] mt-1">
                Member since September 2026 • 18 verified trips
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1 bg-[#EAF4EE] text-[#0E3824] px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-[#165337]/15">
              <ShieldCheck className="w-4 h-4 text-[#227B52]" />
              <span>Campus Verified</span>
            </span>
          </div>
        </div>

        {/* Verification & Contact Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[rgba(20,23,21,0.06)] flex items-center gap-3">
            <Mail className="w-4 h-4 text-[#0E3824]" />
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#79827D] block">Institutional Email</span>
              <span className="text-xs font-bold text-[#141715]">{user.email}</span>
            </div>
          </div>

          <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[rgba(20,23,21,0.06)] flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#0E3824]" />
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#79827D] block">Phone Verified</span>
              <span className="text-xs font-bold text-[#141715]">{user.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Preferences Card */}
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-sm space-y-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#0E3824]">
            Custom Experience
          </span>
          <h2 className="text-lg font-bold text-[#141715] mt-0.5">
            Ride Co-Travel Preferences
          </h2>
          <p className="text-xs text-[#79827D] mt-1">
            These preferences help match you with riders sharing similar commuting habits.
          </p>
        </div>

        <form onSubmit={handleSavePreferences} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Music / Atmosphere
              </label>
              <div className="relative">
                <Music className="w-4 h-4 text-[#79827D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={preferredMusic}
                  onChange={(e) => setPreferredMusic(e.target.value)}
                  className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] pl-10 pr-3 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1.5">
                Conversation Preference
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setChattyRides(true)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    chattyRides
                      ? 'bg-[#EAF4EE] text-[#0E3824] border-[#0E3824]/30'
                      : 'bg-[#FAF9F5] text-[#4A514D] border-[rgba(20,23,21,0.06)]'
                  }`}
                >
                  Friendly Chat
                </button>
                <button
                  type="button"
                  onClick={() => setChattyRides(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    !chattyRides
                      ? 'bg-[#EAF4EE] text-[#0E3824] border-[#0E3824]/30'
                      : 'bg-[#FAF9F5] text-[#4A514D] border-[rgba(20,23,21,0.06)]'
                  }`}
                >
                  Quiet / Focused
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4" /> : null}
            <span>{isSaved ? 'Preferences Updated!' : 'Save Preferences'}</span>
          </button>
        </form>
      </div>

      {/* Emergency Contact & Safety */}
      <div className="bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 border border-[rgba(20,23,21,0.08)] shadow-sm space-y-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#D6621B]">
            Emergency Link
          </span>
          <h2 className="text-lg font-bold text-[#141715] mt-0.5">
            Designated Safety Contact
          </h2>
          <p className="text-xs text-[#79827D] mt-1">
            Receives live trip telemetry automatically if an SOS is triggered during transit.
          </p>
        </div>

        <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-[rgba(20,23,21,0.06)] flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-[#141715]">{user.emergencyContact.name} ({user.emergencyContact.relation})</div>
            <div className="text-[#79827D] font-mono mt-0.5">{user.emergencyContact.phone}</div>
          </div>
          <span className="bg-[#EAF4EE] text-[#0E3824] px-2.5 py-1 rounded-lg font-semibold text-[11px]">
            Verified Contact
          </span>
        </div>
      </div>

      {/* Demo State Control */}
      <div className="p-6 rounded-3xl bg-[#FAF9F5] border border-[rgba(20,23,21,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-[#79827D]">
            Demo Environment Control
          </h3>
          <p className="text-xs text-[#4A514D] mt-0.5">
            Reset local mock storage to showcase a clean prototype state.
          </p>
        </div>

        <button
          onClick={handleResetDemo}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F3EE] text-[#D6621B] text-xs font-semibold border border-[rgba(20,23,21,0.08)] transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Store</span>
        </button>
      </div>

    </div>
  );
};
