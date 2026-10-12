import React, { useState, useEffect } from 'react';

export const RouteConvergenceMap: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Cycle animation steps for storytelling:
  // Step 0: Two separate riders starting from nearby locations
  // Step 1: Matching detected (Radar ping & route alignment)
  // Step 2: Routes converge seamlessly into shared route towards Bhopal Junction
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative w-full max-w-xl mx-auto rounded-3xl bg-[#FAF9F5] border border-[rgba(20,23,21,0.09)] shadow-[0_4px_24px_-4px_rgba(20,23,21,0.08)] overflow-hidden p-6 md:p-8 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top subtle status bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(20,23,21,0.06)]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#165337] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0E3824]"></span>
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#141715]">
            LIVE CORRIDOR TELEMETRY
          </span>
        </div>
        
        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5 bg-[#F4F3EE] p-1 rounded-full border border-[rgba(20,23,21,0.06)]">
          {[0, 1, 2].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === step ? 'w-5 bg-[#0E3824]' : 'w-2 bg-[rgba(20,23,21,0.2)]'
              }`}
              aria-label={`Go to animation phase ${step + 1}`}
            />
          ))}
        </div>
      </div>

      {/* SVG Canvas for Route Convergence */}
      <div className="relative w-full aspect-[4/3] bg-[#FFFFFF] rounded-2xl border border-[rgba(20,23,21,0.06)] p-3 shadow-inner overflow-hidden flex items-center justify-center">
        {/* Subtle map road grid background */}
        <svg 
          viewBox="0 0 500 380" 
          className="w-full h-full overflow-visible"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Map Grid & Roads */}
          <g opacity="0.18">
            <line x1="0" y1="90" x2="500" y2="90" stroke="#79827D" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="190" x2="500" y2="190" stroke="#79827D" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="290" x2="500" y2="290" stroke="#79827D" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="120" y1="0" x2="120" y2="380" stroke="#79827D" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="250" y1="0" x2="250" y2="380" stroke="#79827D" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="380" y1="0" x2="380" y2="380" stroke="#79827D" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Background Secondary Streets */}
            <path d="M40 320 Q 150 300 230 330 T 460 300" stroke="#4A514D" strokeWidth="1.5" />
            <path d="M30 140 Q 180 180 340 130 T 480 170" stroke="#4A514D" strokeWidth="1.5" />
          </g>

          {/* SHARED MAIN HIGHWAY CORRIDOR (Post Convergence) */}
          {/* Convergence Waypoint: (250, 200) -> Destination: (410, 80) */}
          <path
            d="M 250 200 C 310 180, 360 130, 410 80"
            stroke={activeStep === 2 ? '#0E3824' : '#E0DED7'}
            strokeWidth={activeStep === 2 ? '6' : '3'}
            strokeLinecap="round"
            className="transition-all duration-700"
          />

          {/* RIDER A ROUTE: Origin (80, 290) -> Waypoint (250, 200) */}
          <path
            d="M 80 290 C 120 270, 180 230, 250 200"
            stroke="#165337"
            strokeWidth={activeStep >= 1 ? '4' : '3'}
            strokeLinecap="round"
            strokeDasharray={activeStep === 0 ? '6 6' : 'none'}
            className="transition-all duration-700"
          />

          {/* RIDER B ROUTE: Origin (90, 110) -> Waypoint (250, 200) */}
          <path
            d="M 90 110 C 140 140, 190 170, 250 200"
            stroke="#D6621B"
            strokeWidth={activeStep >= 1 ? '4' : '3'}
            strokeLinecap="round"
            strokeDasharray={activeStep === 0 ? '6 6' : 'none'}
            className="transition-all duration-700"
          />

          {/* PULSE RADAR EFFECT AT CONVERGENCE POINT */}
          {activeStep >= 1 && (
            <g transform="translate(250, 200)">
              <circle r="36" fill="#0E3824" fillOpacity="0.06" className="animate-ping" />
              <circle r="22" fill="#0E3824" fillOpacity="0.12" />
              <circle r="6" fill="#0E3824" stroke="#FFFFFF" strokeWidth="2" />
            </g>
          )}

          {/* RIDER A ORIGIN PIN */}
          <g transform="translate(80, 290)">
            <circle r="14" fill="#EAF4EE" stroke="#165337" strokeWidth="2" />
            <circle r="5" fill="#165337" />
            <text x="-24" y="28" fill="#141715" fontSize="11" fontWeight="600" fontFamily="sans-serif">
              You (Campus Gate)
            </text>
          </g>

          {/* RIDER B ORIGIN PIN */}
          <g transform="translate(90, 110)">
            <circle r="14" fill="#FEF3EB" stroke="#D6621B" strokeWidth="2" />
            <circle r="5" fill="#D6621B" />
            <text x="-20" y="-12" fill="#141715" fontSize="11" fontWeight="600" fontFamily="sans-serif">
              Aarav (Hostel Block)
            </text>
          </g>

          {/* DESTINATION PIN (Bhopal Junction) */}
          <g transform="translate(410, 80)">
            <circle r="18" fill="#0E3824" />
            <path d="M-6 -4 L0 -10 L6 -4 L4 -4 L4 6 L-4 6 L-4 -4 Z" fill="#FAF9F5" />
            <text x="-48" y="32" fill="#141715" fontSize="12" fontWeight="700" fontFamily="sans-serif">
              Bhopal Junction
            </text>
          </g>

          {/* MOVING RIDER CAB GLYPH ON SHARED SEGMENT */}
          {activeStep === 2 && (
            <g transform="translate(330, 140)">
              <rect x="-16" y="-12" width="32" height="24" rx="6" fill="#0E3824" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="-10" y="4" fill="#FAF9F5" fontSize="9" fontWeight="700">CAB</text>
            </g>
          )}
        </svg>

        {/* Dynamic Badge Overlays based on state */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {activeStep === 0 && (
            <div className="bg-[#FAF9F5]/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-[rgba(20,23,21,0.08)] shadow-sm">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#79827D]">
                Step 1: 2 Nearby Requests Detected
              </span>
            </div>
          )}
          {activeStep === 1 && (
            <div className="bg-[#EAF4EE] px-3.5 py-1.5 rounded-xl border border-[#165337]/20 shadow-sm animate-fade-in">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#0E3824]">
                ⚡ MATCH DETECTED • 92% Route Match
              </span>
            </div>
          )}
          {activeStep === 2 && (
            <div className="bg-[#0E3824] text-[#FAF9F5] px-3.5 py-1.5 rounded-xl shadow-md animate-fade-in flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EA752A] animate-pulse"></span>
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                SHARED RIDE ACTIVE • 1 CAB INSTEAD OF 2
              </span>
            </div>
          )}
        </div>

        {/* Co-rider floating preview card */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[rgba(20,23,21,0.08)] shadow-lg flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Aarav Sharma"
            className="w-9 h-9 rounded-full object-cover border border-[#0E3824]/20"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#141715]">Aarav Sharma</span>
              <span className="text-[10px] bg-[#EAF4EE] text-[#0E3824] px-1.5 py-0.5 rounded font-medium">VIT &apos;27</span>
            </div>
            <p className="text-[11px] text-[#79827D]">Departs 16:45 • Platform 1</p>
          </div>
        </div>
      </div>

      {/* Hero Metrics Reveal Bar */}
      <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-[rgba(20,23,21,0.06)]">
        <div className="bg-[#FFFFFF] p-3.5 rounded-2xl border border-[rgba(20,23,21,0.06)] flex flex-col justify-between">
          <div className="text-[11px] uppercase tracking-wider font-medium text-[#79827D]">
            Route Compatibility
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-[#0E3824]">92%</span>
            <span className="text-xs text-[#165337] font-medium">High alignment</span>
          </div>
        </div>

        <div className="bg-[#FEF3EB] p-3.5 rounded-2xl border border-[#D6621B]/20 flex flex-col justify-between">
          <div className="text-[11px] uppercase tracking-wider font-medium text-[#D6621B]">
            Estimated Savings
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold font-mono text-[#D6621B]">₹180</span>
            <span className="text-xs text-[#D6621B]/80 font-medium">Split 50/50</span>
          </div>
        </div>
      </div>

      {/* Caption footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-[#79827D]">
        <span>Illustrative simulation based on Bhopal railway corridor</span>
        <button 
          onClick={() => setActiveStep((prev) => (prev + 1) % 3)}
          className="text-[#0E3824] font-semibold hover:underline cursor-pointer"
        >
          Replay phase ⟳
        </button>
      </div>
    </div>
  );
};
