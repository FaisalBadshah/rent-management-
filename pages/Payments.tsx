
import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  X,
  IndianRupee,
  Calendar,
  ExternalLink,
  Receipt,
  Smartphone
} from 'lucide-react';
import { Payment, PaymentStatus, PaymentMethod } from '../types';

const Payments: React.FC = () => {
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 'PAY-001',
      tenancyId: 'TEN-1',
      tenantId: 'USR-1',
      propertyId: 'PROP-1',
      paymentForMonth: '2025-02',
      rentAmount: 24500,
      lateFee: 0,
      discount: 0,
      totalAmount: 24500,
      paymentStatus: PaymentStatus.COMPLETED,
      paymentMethod: PaymentMethod.UPI,
      paymentDate: '2025-02-02',
      transactionId: 'razorpay_Pabcdef123',
      receiptNumber: 'RCP-202502-123456',
      receiptUrl: '#'
    },
    {
      id: 'PAY-002',
      tenancyId: 'TEN-2',
      tenantId: 'USR-2',
      propertyId: 'PROP-2',
      paymentForMonth: '2025-02',
      rentAmount: 85000,
      lateFee: 0,
      discount: 0,
      totalAmount: 85000,
      paymentStatus: PaymentStatus.PENDING,
      paymentLink: 'https://rzp.io/i/example_link'
    },
    {
      id: 'PAY-003',
      tenancyId: 'TEN-1',
      tenantId: 'USR-1',
      propertyId: 'PROP-1',
      paymentForMonth: '2025-01',
      rentAmount: 24500,
      lateFee: 500,
      discount: 0,
      totalAmount: 25000,
      paymentStatus: PaymentStatus.COMPLETED,
      paymentMethod: PaymentMethod.CASH,
      paymentDate: '2025-01-15',
      receiptNumber: 'RCP-202501-987654'
    }
  ]);

  const [manualFormData, setManualFormData] = useState({
    method: PaymentMethod.CASH,
    date: new Date().toISOString().split('T')[0],
    transactionId: '',
    notes: ''
  });

  const openRecordModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsRecordModalOpen(true);
  };

  const handleRecordManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment) return;

    const updatedPayments = payments.map(p => {
      if (p.id === selectedPayment.id) {
        return {
          ...p,
          paymentStatus: PaymentStatus.COMPLETED,
          paymentMethod: manualFormData.method,
          paymentDate: manualFormData.date,
          transactionId: manualFormData.transactionId,
          notes: manualFormData.notes,
          receiptNumber: `RCP-${new Date().getFullYear()}${String(new Date().getMonth()+1).padStart(2, '0')}-${Math.floor(100000 + Math.random() * 900000)}`
        };
      }
      return p;
    });

    setPayments(updatedPayments);
    setIsRecordModalOpen(false);
    setSelectedPayment(null);
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.COMPLETED: return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case PaymentStatus.PENDING: return <Clock className="w-4 h-4 text-amber-500" />;
      default: return <AlertCircle className="w-4 h-4 text-rose-500" />;
    }
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.COMPLETED: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case PaymentStatus.PENDING: return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-rose-50 text-rose-700 border-rose-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-500">Track and manage your rental income and receipts.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 flex items-center transition-all">
            <Download className="w-4 h-4 mr-2" />
            Export Ledger
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center transition-all shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Payment
          </button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Total Collected (Feb)</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">₹1,09,500</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Pending Dues</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">₹85,000</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Collection Efficiency</p>
          <h3 className="text-2xl font-bold text-indigo-600 mt-1">56%</h3>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, tenant or month..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <select className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 outline-none">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{payment.id}</span>
                      <span className="text-xs text-slate-500">Tenant ID: {payment.tenantId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {new Date(payment.paymentForMonth).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">₹{payment.totalAmount.toLocaleString()}</span>
                    {payment.lateFee > 0 && <span className="text-[10px] block text-rose-500">Inc. Late Fee: ₹{payment.lateFee}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.paymentStatus)}`}>
                      <span className="mr-1.5">{getStatusIcon(payment.paymentStatus)}</span>
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {payment.paymentMethod ? (
                      <div className="flex items-center">
                        {payment.paymentMethod === PaymentMethod.UPI ? <Smartphone className="w-3.5 h-3.5 mr-1.5" /> : <IndianRupee className="w-3.5 h-3.5 mr-1.5" />}
                        {payment.paymentMethod}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {payment.paymentStatus === PaymentStatus.PENDING ? (
                        <button 
                          onClick={() => openRecordModal(payment)}
                          className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          Record Manual
                        </button>
                      ) : (
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download Receipt">
                          <Receipt className="w-5 h-5" />
                        </button>
                      )}
                      <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Recording Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Record Manual Payment</h2>
                <p className="text-sm text-slate-500">Mark rent as received via offline methods.</p>
              </div>
              <button onClick={() => setIsRecordModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleRecordManual} className="p-8 space-y-6">
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-6">
                <div className="flex justify-between items-center text-indigo-900 font-bold">
                  <span>Recording for {selectedPayment?.id}</span>
                  <span>₹{selectedPayment?.totalAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-indigo-700 mt-1">Tenant: {selectedPayment?.tenantId}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[PaymentMethod.CASH, PaymentMethod.CHEQUE, PaymentMethod.BANK_TRANSFER].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setManualFormData({...manualFormData, method})}
                        className={`py-3 text-xs font-bold rounded-xl border-2 transition-all ${
                          manualFormData.method === method 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Received Date
                  </label>
                  <input 
                    type="date" 
                    value={manualFormData.date}
                    onChange={(e) => setManualFormData({...manualFormData, date: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <Smartphone className="w-4 h-4 mr-2" /> Reference #
                  </label>
                  <input 
                    type="text" 
                    placeholder="Chq / Ref No."
                    value={manualFormData.transactionId}
                    onChange={(e) => setManualFormData({...manualFormData, transactionId: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Internal Notes</label>
                  <textarea 
                    rows={2}
                    placeholder="Any specific comments..."
                    value={manualFormData.notes}
                    onChange={(e) => setManualFormData({...manualFormData, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsRecordModalOpen(false)}
                  className="flex-1 py-3.5 px-4 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3.5 px-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Razorpay Link Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 rounded-3xl text-white shadow-xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Next Auto-Generation</p>
              <h3 className="text-2xl font-bold">1st March, 2025</h3>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
            Automated rent records and Razorpay payment links will be created for 14 active tenancies on the 1st of the month.
          </p>
          <div className="flex gap-3">
            <button className="flex-1 bg-white text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors text-sm">
              Manage Auto-Pay
            </button>
            <button className="flex-1 bg-indigo-500/30 text-white py-3 rounded-xl font-bold hover:bg-indigo-500/50 transition-colors text-sm border border-white/20">
              Run Now
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
            <Smartphone className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Razorpay Integration</h3>
          <p className="text-sm text-slate-500 max-w-xs mt-2">
            Your Razorpay account is active. Payment links are currently being sent via SMS and Email.
          </p>
          <button className="mt-6 text-indigo-600 font-bold flex items-center text-sm hover:underline">
            View API Settings
            <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
