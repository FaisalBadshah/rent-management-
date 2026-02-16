
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Clock, FileText, CheckCircle2 } from 'lucide-react';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';

const ForOwnersPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <Hero 
        title={<>Maximize Yield.<br/><span className="text-indigo-600">Minimize Effort.</span></>}
        subtitle="The all-in-one platform for professional Indian landlords. Stop chasing payments and start scaling your portfolio."
        primaryCTA={{ text: "Get Started Now", action: () => navigate('/login') }}
        badge="For Property Owners"
        imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
      />

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-4xl font-black text-slate-900 mb-6">Designed for the Indian Landlord</h2>
               <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">Managing properties in India comes with unique challenges. From tenant KYC to GST compliance, we've automated it all.</p>
               
               <div className="space-y-6">
                 {[
                   { title: "Automated Reminders", desc: "WhatsApp & SMS notifications sent automatically on your schedule.", icon: Clock },
                   { title: "GST Compliance", desc: "Auto-generated invoices for commercial units with HSN codes.", icon: FileText },
                   { title: "Legal Protection", desc: "Digital record of every payment and lease agreement.", icon: ShieldCheck }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-4">
                     <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0 text-indigo-600">
                       <feat.icon size={24} />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-900">{feat.title}</h4>
                       <p className="text-slate-500 text-sm">{feat.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="relative">
              <div className="bg-slate-100 rounded-[3rem] p-10">
                <div className="bg-white p-8 rounded-3xl shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                    <h5 className="font-bold text-slate-900">Yield Optimization</h5>
                    <span className="text-emerald-500 font-bold">+12% YoY</span>
                  </div>
                  <div className="space-y-4">
                    {[80, 45, 90, 65].map((w, i) => (
                      <div key={i} className="h-4 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: `${w}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection 
        title="Ready to upgrade your management?"
        subtitle="Experience the most sophisticated rent platform in India."
        primaryButton={{ text: "Sign Up as Owner", action: () => navigate('/login') }}
      />
    </div>
  );
};

export default ForOwnersPage;
