import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { rideStore } from '../services/rideStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('devansh.k@vitbhopal.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app');
    }, 600);
  };

  const handleQuickDemo = (role: 'student' | 'prof') => {
    if (role === 'student') {
      setEmail('devansh.k@vitbhopal.ac.in');
      rideStore.updateUser({
        name: 'Devansh Kulkarni',
        institution: 'VIT Bhopal University',
        email: 'devansh.k@vitbhopal.ac.in'
      });
    } else {
      setEmail('priya.p@aiimsbhopal.edu.in');
      rideStore.updateUser({
        name: 'Dr. Priya Patel',
        institution: 'AIIMS Bhopal',
        email: 'priya.p@aiimsbhopal.edu.in'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-tactile-pattern">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-[#0E3824] flex items-center justify-center text-[#FAF9F5] shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-[#141715] font-display">SahYatri</span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-[#141715]">
          Welcome back to SahYatri
        </h2>
        <p className="mt-2 text-xs text-[#4A514D]">
          Sign in to coordinate rides, view active routes and split fares.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] py-8 px-6 shadow-sm rounded-3xl border border-[rgba(20,23,21,0.08)] sm:px-10">
          
          {/* Quick Demo Personas */}
          <div className="mb-6 p-3 bg-[#F4F3EE] rounded-2xl border border-[rgba(20,23,21,0.06)]">
            <div className="text-[11px] font-semibold text-[#79827D] uppercase tracking-wider mb-2">
              Quick One-Click Demo Personas:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="text-left p-2 rounded-xl bg-[#FFFFFF] border border-[rgba(20,23,21,0.06)] hover:border-[#0E3824] transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-[#141715]">Devansh K.</div>
                <div className="text-[10px] text-[#0E3824]">VIT Student</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('prof')}
                className="text-left p-2 rounded-xl bg-[#FFFFFF] border border-[rgba(20,23,21,0.06)] hover:border-[#0E3824] transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-[#141715]">Dr. Priya P.</div>
                <div className="text-[10px] text-[#0E3824]">AIIMS Resident</div>
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1">
                College or Verified Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] px-3.5 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                placeholder="name@university.ac.in"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider">
                  Password or OTP
                </label>
                <span className="text-[11px] text-[#0E3824] hover:underline cursor-pointer">
                  Use SMS OTP
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] px-3.5 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {isLoading ? 'Verifying Credentials...' : 'Sign In to SahYatri'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[rgba(20,23,21,0.06)] text-center text-xs text-[#79827D]">
            <span>Don&apos;t have an account yet? </span>
            <Link to="/signup" className="text-[#0E3824] font-bold hover:underline">
              Create an account
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#79827D]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#227B52]" />
            <span>Campus domain email authentication supported</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('VIT Bhopal University');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    rideStore.updateUser({
      name: name || 'New SahYatri Rider',
      email: email || 'student@vitbhopal.ac.in',
      phone: phone || '+91 98765 43210',
      institution: institution
    });
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-tactile-pattern">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-[#0E3824] flex items-center justify-center text-[#FAF9F5] shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-2xl font-extrabold text-[#141715] font-display">SahYatri</span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-[#141715]">
          Join the SahYatri Community
        </h2>
        <p className="mt-2 text-xs text-[#4A514D]">
          Connect with trusted co-travellers in your university corridor.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] py-8 px-6 shadow-sm rounded-3xl border border-[rgba(20,23,21,0.08)] sm:px-10">
          
          {/* Step tracker */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(20,23,21,0.06)] text-xs font-semibold">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#0E3824]' : 'text-[#79827D]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#EAF4EE] text-[#0E3824] flex items-center justify-center text-[10px] font-bold">1</span>
              <span>Profile</span>
            </div>
            <div className="w-8 h-[1px] bg-[rgba(20,23,21,0.1)]"></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#0E3824]' : 'text-[#79827D]'}`}>
              <span className="w-5 h-5 rounded-full bg-[#EAF4EE] text-[#0E3824] flex items-center justify-center text-[10px] font-bold">2</span>
              <span>Institution</span>
            </div>
          </div>

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleComplete} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] px-3.5 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                    placeholder="e.g. Ananya Sen"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1">
                    Mobile Number (For WhatsApp Cab OTPs)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] px-3.5 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                    placeholder="+91 98260 00000"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  Continue to Institution Verification
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1">
                    Select University / Organization
                  </label>
                  <select
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] px-3.5 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                  >
                    <option value="VIT Bhopal University">VIT Bhopal University</option>
                    <option value="AIIMS Bhopal">AIIMS Bhopal</option>
                    <option value="MANIT Bhopal (NIT)">MANIT Bhopal (NIT)</option>
                    <option value="IISER Bhopal">IISER Bhopal</option>
                    <option value="NIFT Bhopal">NIFT Bhopal</option>
                    <option value="Other / Working Professional">Other / Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-[#79827D] tracking-wider mb-1">
                    Institutional Email (.ac.in or .edu)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF9F5] text-xs font-semibold text-[#141715] px-3.5 py-3 rounded-xl border border-[rgba(20,23,21,0.12)] focus:outline-none focus:border-[#0E3824]"
                    placeholder="your.name@vitbhopal.ac.in"
                  />
                </div>

                <div className="p-3 bg-[#EAF4EE] rounded-2xl border border-[#165337]/20 text-xs text-[#0E3824] flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#0E3824] shrink-0 mt-0.5" />
                  <span>Your email verifies your campus trust badge. No spam or marketing messages.</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-[#F4F3EE] text-[#141715] py-3.5 rounded-xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#0E3824] hover:bg-[#165337] text-[#FAF9F5] py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Complete & Enter App
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6 pt-4 border-t border-[rgba(20,23,21,0.06)] text-center text-xs text-[#79827D]">
            <span>Already have an account? </span>
            <Link to="/login" className="text-[#0E3824] font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
