
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Home, 
  CreditCard, 
  CheckCircle, 
  Loader,
  AlertCircle,
  IndianRupee,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const TenantPaymentPage: React.FC = () => {
  const { paymentCode } = useParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');

  // Mock payment details
  const payment = {
    property: { propertyName: 'Palm Heights' },
    unit: { unitNumber: 'Flat 402' },
    tenant: { name: 'Rahul Sharma' },
    paymentForMonth: 'February 2025',
    totalAmount: 24500
  };

  const handlePay = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Rent Paid!</h1>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Your payment for {payment.paymentForMonth} was successful. A digital receipt has been sent via WhatsApp.
          </p>
          <button
            onClick={() => navigate('/tenant')}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg"
          >
            Go to Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <header className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="text-indigo-600" size={24} />
            <span className="text-lg font-bold text-slate-900 tracking-tight">RentFlow</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">
            <ShieldCheck size={14} />
            Secure Payment
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-indigo-600 p-8 text-white relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Home size={100} />
              </div>
              <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Rent Payment</p>
              <h1 className="text-3xl font-black">{payment.property.propertyName}</h1>
              <p className="text-indigo-100 font-bold">{payment.unit.unitNumber}</p>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">Tenant</p>
                  <p className="text-sm font-bold text-slate-700">{payment.tenant.name}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-1">Billing Month</p>
                  <p className="text-sm font-bold text-slate-700">{payment.paymentForMonth}</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white text-center">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Amount to Pay</p>
                <div className="flex items-center justify-center gap-1">
                  <IndianRupee size={32} className="text-indigo-400" />
                  <span className="text-5xl font-black">{payment.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center disabled:opacity-50"
              >
                {paymentStatus === 'processing' ? (
                  <Loader className="animate-spin mr-2" size={24} />
                ) : (
                  <>
                    Pay Securely Now
                    <ChevronRight className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 opacity-30 grayscale pointer-events-none px-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Powered By</span>
             <div className="flex gap-4 font-bold text-slate-900 text-lg">
                <span>UPI</span>
                <span>RAZORPAY</span>
             </div>
          </div>
        </div>
      </div>

      <footer className="py-12 text-center text-slate-400 px-6">
        <p className="text-sm font-medium">Need help? Email support@rentflow.com</p>
      </footer>
    </div>
  );
};

export default TenantPaymentPage;
