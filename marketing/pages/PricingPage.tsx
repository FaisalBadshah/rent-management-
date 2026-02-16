
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, Zap, Building2 } from 'lucide-react';
import CTASection from '../components/CTASection';
import { User, UserType } from '../../types';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isTenant, setIsTenant] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('rentflow_user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      if (user.userType === UserType.TENANT) {
        setIsTenant(true);
        navigate('/tenant'); // Don't sell to renters
      }
    }
  }, [navigate]);

  if (isTenant) return null;

  const plans = [
    {
      name: 'Starter',
      price: '₹499',
      desc: 'Ideal for individual owners with small portfolios.',
      features: ['Up to 10 Units', 'UPI Rent Collection', 'WhatsApp Reminders', 'Digital Receipts', 'Mobile App Access'],
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    },
    {
      name: 'Professional',
      price: '₹1,499',
      desc: 'Most popular for professional property managers.',
      features: ['Up to 100 Units', 'Everything in Starter', 'GST Invoicing', 'Expense Management', 'Financial Reports', 'Priority Support'],
      icon: ShieldCheck,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
      popular: true
    },
    {
      name: 'Business',
      price: '₹4,999',
      desc: 'Built for large developers and real estate firms.',
      features: ['Unlimited Units', 'Everything in Pro', 'White-labeling', 'API Access', 'Dedicated Account Manager', 'Custom Legal Forms'],
      icon: Building2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-500 font-medium">Choose the plan that fits your portfolio today. Scale as you grow.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((p, i) => (
            <div 
              key={i} 
              className={`relative bg-white rounded-[2.5rem] p-10 border transition-all duration-300 hover:shadow-2xl ${
                p.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-slate-100 shadow-sm hover:-translate-y-2'
              }`}
            >
              {p.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className={`${p.bg} ${p.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8`}>
                <p.icon size={28} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{p.desc}</p>
              
              <div className="mb-10">
                <span className="text-5xl font-extrabold text-slate-900">{p.price}</span>
                <span className="text-slate-400 font-bold ml-2">/month</span>
              </div>

              <button 
                onClick={() => navigate('/login')}
                className={`w-full py-4 rounded-2xl font-bold transition-all mb-10 ${
                  p.popular ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.popular ? 'Start Pro Trial' : 'Get Started'}
              </button>

              <ul className="space-y-4">
                {p.features.map((feat, fi) => (
                  <li key={fi} className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                    <Check className="text-indigo-600 shrink-0" size={18} />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mb-32">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">Need something more custom?</p>
          <button className="text-indigo-600 font-bold hover:underline">Contact our Enterprise Team</button>
        </div>
      </div>

      <CTASection 
        title="Ready to Start?"
        subtitle="Join 10,000+ landlords managing their property with confidence."
        primaryButton={{ text: "Create Free Account", action: () => navigate('/login') }}
      />
    </div>
  );
};

export default PricingPage;
