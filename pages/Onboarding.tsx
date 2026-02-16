
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, CreditCard, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useToast } from '../components/Toast';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, title: 'Add Property', icon: Building2 },
    { id: 2, title: 'Add Tenants', icon: Users },
    { id: 3, title: 'Setup Rent', icon: CreditCard },
    { id: 4, title: 'Ready!', icon: CheckCircle },
  ];

  const handleComplete = () => {
    showToast('success', 'Welcome to RentFlow! Your portfolio is ready.');
    localStorage.setItem('onboarding_complete', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 sm:p-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-6 shadow-xl shadow-indigo-100">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Welcome to RentFlow!
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Let's set up your property portfolio in 3 simple steps.
          </p>
        </div>

        {/* Progress Timeline */}
        <div className="mb-12 relative flex items-center justify-between max-w-2xl mx-auto px-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  step >= s.id
                    ? 'bg-indigo-600 border-indigo-100 text-white shadow-lg'
                    : 'bg-white border-slate-100 text-slate-300'
                }`}
              >
                <s.icon size={18} />
              </div>
              <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${step >= s.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                {s.title}
              </p>
            </div>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-100/50 p-8 sm:p-12 min-h-[400px] flex flex-col animate-in zoom-in-95 duration-500 overflow-hidden relative border border-slate-100">
          {step === 1 && (
            <div className="space-y-6 flex-1">
              <h2 className="text-2xl font-bold text-slate-900">Add Your First Property</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Start by adding a property you manage. You can add more units and details later.
              </p>
              
              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Property Name</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="e.g. Skyline Towers" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="City, State" />
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center group"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 flex-1">
              <h2 className="text-2xl font-bold text-slate-900">Invite Your First Tenant</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Enter the name and mobile of your tenant. They will receive an automated invitation to their portal.
              </p>
              
              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tenant Full Name</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="+91 9876543210" />
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <button onClick={() => setStep(1)} className="px-6 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Back</button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center group"
                >
                  Confirm Tenant
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 flex-1">
              <h2 className="text-2xl font-bold text-slate-900">Setup Rent Collection</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Configure how much and when you collect rent. RentFlow automates the rest.
              </p>
              
              <div className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Rent (₹)</label>
                  <input className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="25000" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Due Day</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                    <option>5th of the month</option>
                    <option>1st of the month</option>
                    <option>10th of the month</option>
                  </select>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <button onClick={() => setStep(2)} className="px-6 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Back</button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center group"
                >
                  Finalize Setup
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center flex-1 flex flex-col items-center justify-center animate-in zoom-in-50 duration-500">
              <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-emerald-50">
                <CheckCircle size={48} className="text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">You're All Set!</h2>
              <p className="text-slate-600 max-w-sm mb-12 font-medium leading-relaxed">
                Your first property and tenant have been configured. You can now track collections and generate receipts.
              </p>
              <button
                onClick={handleComplete}
                className="w-full max-w-xs bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest"
          >
            Skip for now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
