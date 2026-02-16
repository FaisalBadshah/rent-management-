
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, CheckCircle2, Shield, Heart } from 'lucide-react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';

const ForTenantsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <Hero 
        title={<>Pay Rent in <br/><span className="text-indigo-600">One Click.</span></>}
        subtitle="No more bank transfers or chasing receipts. Pay with your favorite UPI app and keep all your rental history in one place."
        primaryCTA={{ text: "Log In to Portal", action: () => navigate('/login') }}
        badge="For Tenants"
        imageSrc="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
      />

      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6">A Better Rental Experience</h2>
            <p className="text-lg text-slate-500 font-medium">RentFlow isn't just for landlords. We've built the ultimate tool for modern tenants.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "UPI Ready", desc: "Pay via GPay, PhonePe, or Paytm instantly. No beneficiary setup needed.", icon: Smartphone },
              { title: "Instant Receipts", desc: "Get professional PDFs the moment you pay. Valid for HRA claims.", icon: CheckCircle2 },
              { title: "Issue Reporting", desc: "Raise maintenance requests with photos directly to your landlord.", icon: Heart }
            ].map((card, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] border border-slate-100 text-center">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <card.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection 
        title="Access your tenant portal"
        subtitle="Ask your landlord for your RentFlow invite link today."
        primaryButton={{ text: "Tenant Login", action: () => navigate('/login') }}
      />
    </div>
  );
};

export default ForTenantsPage;
