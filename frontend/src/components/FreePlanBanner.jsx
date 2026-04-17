import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function FreePlanBanner() {
  const features = [
    "5 short links/month",
    "3 custom back-halves/month",
    "Unlimited link clicks"
  ];

  return (
    <section className="w-full bg-[#001837] py-6 px-4 flex flex-col items-center justify-center relative z-10">
      
      <div className="mb-14 text-center">
        <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-6">
          Sign up for free. Your free plan includes:
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle size={20} className="text-[#ee4f1c]" strokeWidth={2} />
              <span className="text-white font-medium text-[15px]">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 max-w-6xl mx-auto">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border-[3px] border-[#a0aec0] relative overflow-hidden flex items-center justify-center">
             <div className="w-3 h-3 bg-[#a0aec0] rounded-full absolute -bottom-1 -left-1"></div>
          </div>
          <span className="text-[#a0aec0] font-bold text-xl tracking-tight">Curology</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#a0aec0] font-black text-2xl tracking-tighter">N</span>
          <span className="text-[#a0aec0] font-bold text-sm tracking-widest mt-1">NOVASOL</span>
        </div>

        <div className="flex items-center gap-2">
          <svg width="32" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5.5" cy="17.5" r="3.5"/>
            <circle cx="18.5" cy="17.5" r="3.5"/>
            <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
          </svg>
          <span className="text-[#a0aec0] font-semibold text-[11px] tracking-wider mt-1">RAD POWER BIKES</span>
        </div>

        <div className="flex flex-col items-center justify-center leading-none">
          <span className="text-[#a0aec0] font-medium text-[9px] tracking-[0.2em] mb-1">MARRIOTT</span>
          <span className="text-[#a0aec0] font-serif text-lg tracking-widest">BONVOY</span>
        </div>

        <div>
          <span className="text-[#a0aec0] font-serif font-black text-xl tracking-tight italic">
            The New York Times
          </span>
        </div>

        <div>
          <span className="text-[#a0aec0] font-bold text-lg tracking-[0.15em]">
            SMALLS
          </span>
        </div>

      </div>
    </section>
  );
}