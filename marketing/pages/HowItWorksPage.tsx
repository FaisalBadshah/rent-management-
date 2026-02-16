
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, Building2, UserPlus, CreditCard, PieChart, Smartphone, Heart, ShieldCheck } from 'lucide-react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import { User, UserType } from '../../types';

const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();
  const [isTenant, setIsTenant] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('rentflow_user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      if (user.userType === UserType.TENANT) setIsTenant(true);
    }
  }, []);

  const ownerSteps = [
    { title: "1. Add your Properties", desc: "Import your portfolio details. Whether it's one flat or a commercial complex.", icon: Building2, color: "bg-indigo-100 text-indigo-600" },
    { title: "2. Enroll Tenants", desc: "Add tenant details. They get an automated WhatsApp invite instantly.", icon: UserPlus, color: "bg-emerald-100 text-emerald-600" },
    { title: "3. Automate Collection", desc: "Smart reminders go out automatically. Tenants pay via any UPI app.", icon: CreditCard, color: "bg-amber-100 text-amber-600" },
    { title: "4. Get Insights", desc: "Track every rupee. Generate tax-ready reports and GST invoices.", icon: PieChart, color: "bg-rose-100 text-rose-600" }
  ];

  const tenantSteps = [
    { title: "1. Receive Invite", desc: "Your landlord sends you a secure invite via WhatsApp or SMS.", icon: UserPlus, color: "bg-indigo-100 text-indigo-600" },
    { title: "2. Access Portal", desc: "Log in with your phone number. No complex registration needed.", icon: Smartphone, color: "bg-emerald-100 text-emerald-600" },
    { title: "3. Pay via UPI", desc: "Pay rent in seconds using GPay, PhonePe or Paytm.", icon: CreditCard, color: "bg-amber-100 text-amber-600" },
    { title: "4. Stay Secure", desc: "All your receipts and lease documents are saved forever.", icon: ShieldCheck, color: "bg-rose-100 text-rose-600" }
  ];

  const currentSteps = isTenant ? tenantSteps : ownerSteps;

  return (
    <div className="pt-20">
      <Hero 
        title={isTenant ? <>A Seamless Home <br/><span className="text-indigo-600">Experience.</span></> : <>Simple Steps to <br/><span className="text-indigo-600">Complete Automation.</span></>}
        subtitle={isTenant ? "Discover how RentFlow makes paying rent and managing your tenancy simple and stress-free." : "See how RentFlow transforms the way you manage your property portfolio from manual chasing to effortless growth."}
        primaryCTA={{ text: isTenant ? "Go to My Portal" : "Start Free Trial", action: () => navigate(isTenant ? '/tenant' : '/login') }}
        badge="How it Works"
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative group cursor-pointer overflow-hidden rounded-[3rem] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Demo Preview"
            />
            <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Play className="text-indigo-600 fill-indigo-600 w-10 h-10 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">{isTenant ? "For the Modern Tenant" : "For the Professional Owner"}</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">Designed for clarity, efficiency, and peace of mind.</p>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentSteps.map((step, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className={`${step.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection 
        title={isTenant ? "Have more questions?" : "Ready to automate your rent?"}
        subtitle={isTenant ? "Reach out to our support team for any assistance." : "Join thousands of Indian landlords who use RentFlow every day."}
        primaryButton={{ text: isTenant ? "Contact Support" : "Create Free Account", action: () => navigate(isTenant ? '/tenant' : '/login') }}
      />
    </div>
  );
};

export default HowItWorksPage;
