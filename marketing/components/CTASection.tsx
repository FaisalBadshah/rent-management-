
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserType, User } from '../../types';

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryButton: { text: string; action: () => void };
  secondaryButton?: { text: string; action: () => void };
}

const CTASection: React.FC<CTASectionProps> = ({ title, subtitle, primaryButton, secondaryButton }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('rentflow_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // If the user is a tenant, we don't want to "sell" them the platform.
  if (user?.userType === UserType.TENANT) return null;

  return (
    <section className="py-24 bg-indigo-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-indigo-400 rotate-12 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-emerald-400 rotate-12 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          {title}
        </h2>
        <p className="text-xl text-indigo-100 mb-12 font-medium">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <button 
            onClick={primaryButton.action}
            className="w-full sm:w-auto px-10 py-5 bg-white text-indigo-900 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all shadow-2xl flex items-center justify-center group"
          >
            {primaryButton.text}
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          {secondaryButton && (
            <button 
              onClick={secondaryButton.action}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-800 text-white border border-indigo-700 rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all"
            >
              {secondaryButton.text}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-indigo-200 text-sm font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            14-Day Free Trial
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            No Credit Card Required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            Set Up in 5 Minutes
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
