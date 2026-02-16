
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Bell,
  Zap,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Home,
  Briefcase,
  Sparkles
} from 'lucide-react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import { UserType, User } from '../../types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('rentflow_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const isTenant = user?.userType === UserType.TENANT;

  const testimonials = [
    {
      quote: "RentFlow saved me 15 hours every month! No more chasing tenants for rent. Everything is automated.",
      author: "Rajesh Kumar",
      role: "Property Owner, Mumbai",
      avatar: "R"
    },
    {
      quote: "The GST invoicing for my commercial units is a lifesaver. My CA loves the auto-generated reports.",
      author: "Ananya Iyer",
      role: "Commercial Manager, Bengaluru",
      avatar: "A"
    }
  ];

  const faqs = [
    {
      q: "How secure is my data?",
      a: "We use bank-grade 256-bit encryption. Your payment data is handled exclusively through Razorpay, India's leading payment gateway."
    },
    {
      q: "Do tenants need to download an app?",
      a: "No! Tenants receive payment links via WhatsApp and SMS. They can pay in 10 seconds through any UPI app without registering."
    }
  ];

  return (
    <div className="space-y-0 selection:bg-indigo-100">
      <Hero 
        title={isTenant ? <>Your Home.<br/><span className="text-indigo-600">Purely Managed.</span></> : <>Better Rent.<br/><span className="text-indigo-600">Zero Hassle.</span></>}
        subtitle={isTenant ? "Access your rental portal, pay rent via UPI, and track maintenance tickets with ease." : "Automate rent collection, manage tenants, and grow your Indian property portfolio with our all-in-one smart dashboard."}
        primaryCTA={{ 
          text: isTenant ? "Go to Tenant Portal" : "Start Free Trial", 
          action: () => navigate(isTenant ? '/tenant' : '/login') 
        }}
        secondaryCTA={isTenant ? undefined : { text: "Watch Demo", action: () => navigate('/how-it-works') }}
        badge={isTenant ? "Active Tenant Access" : "Trusted by 10,000+ Landlords"}
      />

      {!isTenant && (
        <section className="py-12 bg-white border-y border-slate-50">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 opacity-40 hover:opacity-100 transition-opacity">
             <span className="text-xs font-black uppercase tracking-widest text-slate-500">Supported Payments:</span>
             <div className="flex gap-8 font-bold text-slate-900 text-xl grayscale">
                <span>UPI</span>
                <span>GPay</span>
                <span>PhonePe</span>
                <span>Paytm</span>
             </div>
          </div>
        </section>
      )}

      {/* Benefits / Segments */}
      {!isTenant && (
        <section className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">Tailored for your Portfolio</h2>
              <p className="text-xl text-slate-500 font-medium">Whether you own one flat or an entire office park.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                  <Home size={32} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Residential Owners</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">Perfect for apartments, villas, and PGs. Focus on high occupancy and happy tenants.</p>
                <ul className="space-y-4 mb-10">
                  {["WhatsApp Rent Reminders", "KYC Document Storage", "Maintenance Tracking"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                      <CheckCircle2 className="text-emerald-500" size={20} /> {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/login')} className="w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all">Explore Residential</button>
              </div>

              <div className="bg-slate-900 p-12 rounded-[3rem] shadow-2xl transition-all text-white">
                <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Commercial Firms</h3>
                <p className="text-slate-400 mb-8 leading-relaxed font-medium">Designed for offices, shops, and warehouses. Complex billing made simple.</p>
                <ul className="space-y-4 mb-10">
                  {["GST Invoicing & Returns", "CAM & Utility Billing", "Annual Escalation Math"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-indigo-200 font-bold">
                      <CheckCircle2 className="text-indigo-400" size={20} /> {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/login')} className="w-full py-4 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-700 transition-all">Explore Commercial</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tenant-Specific FAQ if logged in as tenant */}
      {isTenant && (
        <section className="py-24 bg-indigo-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Tenant Support</h2>
            <p className="text-slate-600 mb-12">How can we help you today with your rental experience?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm flex flex-col items-center">
                <Sparkles className="text-indigo-600 mb-4" size={32} />
                <h4 className="font-bold text-slate-900">Raise Ticket</h4>
                <p className="text-sm text-slate-500 mt-2">Report plumbing, electrical or other issues.</p>
                <button onClick={() => navigate('/maintenance')} className="mt-4 text-indigo-600 font-bold text-sm">Open Maintenance &rarr;</button>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm flex flex-col items-center">
                <DollarSign className="text-emerald-500 mb-4" size={32} />
                <h4 className="font-bold text-slate-900">View Receipts</h4>
                <p className="text-sm text-slate-500 mt-2">Download your previous rent receipts for HRA.</p>
                <button onClick={() => navigate('/payments')} className="mt-4 text-emerald-600 font-bold text-sm">Payment History &rarr;</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {!isTenant && (
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">Real Results for Real Owners.</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">Don't just take our word for it. Join the 10,000+ portfolio owners who have switched to automated rent management.</p>
              </div>
              
              <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
                {testimonials.map((t, i) => (
                  <div key={i} className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                    <p className="text-xl text-slate-700 font-medium mb-8 leading-relaxed italic">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">{t.avatar}</div>
                      <div>
                        <p className="font-black text-slate-900">{t.author}</p>
                        <p className="text-sm text-slate-500 font-bold">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CTASection 
        title={isTenant ? "Need any help?" : "Start Your Automation Journey Today"}
        subtitle={isTenant ? "Contact your landlord or reach out to our support team." : "14 days free. No credit card. No strings attached."}
        primaryButton={{ 
          text: isTenant ? "Contact Support" : "Create Free Account", 
          action: () => isTenant ? window.open('#') : navigate('/login') 
        }}
        secondaryButton={isTenant ? undefined : { text: "Contact Sales", action: () => navigate('/contact') }}
      />
    </div>
  );
};

export default HomePage;
