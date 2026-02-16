
import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  primaryCTA: { text: string; action: () => void };
  secondaryCTA?: { text: string; action: () => void };
  badge?: string;
  imageSrc?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, primaryCTA, secondaryCTA, badge, imageSrc }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-white">
      {/* Background Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-50 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-slate-900 text-white mb-8 uppercase tracking-widest shadow-xl shadow-slate-200">
                <ShieldCheck size={14} className="text-emerald-400" />
                {badge}
              </div>
            )}
            <h1 className="text-5xl lg:text-8xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tighter">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={primaryCTA.action}
                className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center group"
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              {secondaryCTA && (
                <button 
                  onClick={secondaryCTA.action}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  {secondaryCTA.text}
                </button>
              )}
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 grayscale opacity-50">
               <span className="text-xs font-black uppercase tracking-widest text-slate-400">Trusted By</span>
               <div className="flex gap-6 font-bold text-slate-900 text-lg italic">
                  <span>Hiranandani</span>
                  <span>Godrej</span>
                  <span>DLF</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white/40 backdrop-blur-xl p-3 rounded-[3rem] shadow-2xl border border-white/50 overflow-hidden">
                <img 
                  src={imageSrc || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200"} 
                  alt="RentFlow Platform Preview" 
                  className="rounded-[2.5rem] shadow-inner w-full h-auto object-cover min-h-[500px]"
                />
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden xl:block animate-bounce-slow">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Collected</p>
              <p className="text-2xl font-black text-slate-900">₹8.42 Cr</p>
              <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[92%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
