
import React from 'react';
import { 
  IndianRupee, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Building2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PaymentStatus } from '../types';

const TenantHome: React.FC = () => {
  const activeTenancy = {
    propertyName: 'Palm Heights',
    unitNumber: 'Flat 402',
    monthlyRent: 24500,
    rentDueDay: 5,
    leaseStartDate: '2023-01-12',
    leaseEndDate: '2025-01-12',
    pendingPaymentsCount: 1,
    payments: [
      { id: 'PAY-004', month: 'February 2025', amount: 24500, status: PaymentStatus.PENDING, link: 'https://rzp.io/i/example' },
      { id: 'PAY-001', month: 'January 2025', amount: 24500, status: PaymentStatus.COMPLETED, date: '02 Jan 2025' },
      { id: 'PAY-000', month: 'December 2024', amount: 24500, status: PaymentStatus.COMPLETED, date: '04 Dec 2024' },
    ]
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-700" role="main" aria-label="Tenant home portal">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tenant Portal</h1>
          <p className="text-slate-500">Manage your payments and rental documents.</p>
        </div>
        {activeTenancy.pendingPaymentsCount > 0 && (
          <div className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center animate-pulse" role="alert">
            <AlertCircle className="w-3.5 h-3.5 mr-1" />
            Payment Due
          </div>
        )}
      </div>

      {/* Property Details Card */}
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
          <Building2 className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{activeTenancy.propertyName}</h2>
              <p className="text-indigo-100 font-medium">{activeTenancy.unitNumber}</p>
            </div>
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold border border-emerald-400 flex items-center gap-1.5 shadow-sm">
              <ShieldCheck size={14} />
              VERIFIED LEASE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Monthly Rent</p>
              <p className="text-xl font-bold flex items-center" aria-label={`Monthly rent: ${activeTenancy.monthlyRent} rupees`}>
                <IndianRupee className="w-4 h-4 mr-1" aria-hidden="true" />
                {activeTenancy.monthlyRent.toLocaleString()}
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Next Due Date</p>
              <p className="text-xl font-bold">
                {activeTenancy.rentDueDay}th Feb
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Section: Pay Rent */}
      {activeTenancy.payments.find(p => p.status === PaymentStatus.PENDING) && (
        <div className="bg-white p-8 rounded-3xl border-2 border-amber-200 shadow-lg shadow-amber-50 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-2 rounded-xl" aria-hidden="true">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Payment Pending</h3>
              <p className="text-sm text-slate-500">February 2025 rent is ready for payment.</p>
            </div>
          </div>
          <a 
            href={activeTenancy.payments.find(p => p.status === PaymentStatus.PENDING)?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all shadow-lg shadow-indigo-100 focus:ring-4 focus:ring-indigo-100 outline-none"
          >
            Pay Securely via UPI
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      )}

      {/* Payment History */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden" aria-labelledby="history-title">
        <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <h3 id="history-title" className="font-bold text-slate-900">Recent Transactions</h3>
          <HelpCircle size={18} className="text-slate-300" />
        </div>
        <div className="divide-y divide-slate-50">
          {activeTenancy.payments.map((payment) => (
            <div key={payment.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors" role="listitem">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${payment.status === PaymentStatus.COMPLETED ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`} aria-hidden="true">
                  {payment.status === PaymentStatus.COMPLETED ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{payment.month}</p>
                  <p className="text-xs text-slate-400 font-medium">
                    {payment.status === PaymentStatus.COMPLETED ? `Settled on ${payment.date}` : 'Awaiting payment'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900">₹{payment.amount.toLocaleString()}</p>
                {payment.status === PaymentStatus.COMPLETED && (
                  <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider hover:underline">Receipt</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center p-8 border-t border-slate-100">
        <p className="text-sm text-slate-400 mb-2 font-medium">Questions about your tenancy?</p>
        <button className="text-indigo-600 font-bold hover:underline flex items-center justify-center mx-auto gap-2">
           Contact Property Manager
           <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default TenantHome;
