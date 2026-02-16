
import React from 'react';
import { 
  User as UserIcon, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  IndianRupee, 
  FileText,
  ChevronRight,
  Edit2
} from 'lucide-react';
import { useToast } from '../components/Toast';

const TenantProfile: React.FC = () => {
  const { showToast } = useToast();
  
  // Mock data for the current tenant user
  const tenantData = {
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    email: 'rahul.sharma@example.com',
    memberSince: 'January 2023',
    kycStatus: 'Verified',
    lease: {
      property: 'Palm Heights',
      unit: 'Flat 402',
      rent: 24500,
      deposit: 75000,
      startDate: '12 Jan 2023',
      endDate: '11 Jan 2025',
    }
  };

  const handleEditProfile = () => {
    showToast('info', 'Profile editing will be available in the next update.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-indigo-100">
              {tenantData.name.charAt(0)}
            </div>
            <button 
              onClick={handleEditProfile}
              className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{tenantData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center">
                <ShieldCheck size={12} className="mr-1" />
                {tenantData.kycStatus}
              </span>
              <p className="text-slate-500 text-sm font-medium">Tenant since {tenantData.memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Personal Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Mobile Number</p>
                  <p className="text-sm font-semibold text-slate-700">{tenantData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Email Address</p>
                  <p className="text-sm font-semibold text-slate-700">{tenantData.email}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleEditProfile}
              className="w-full py-3 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
            >
              Update Details
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Documents</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={18} />
                  <span className="text-sm font-semibold text-slate-600">Rental Agreement</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={18} />
                  <span className="text-sm font-semibold text-slate-600">Rent Receipts (Zip)</span>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Lease Summary */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="text-indigo-600" size={20} />
                Active Lease Summary
              </h3>
              <span className="text-xs font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                REF: PH-402-23
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Property & Unit</p>
                  <p className="text-lg font-bold text-slate-900">{tenantData.lease.property}</p>
                  <p className="text-sm text-slate-500 font-medium">{tenantData.lease.unit}</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Financials</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium">Monthly Rent</p>
                      <p className="text-md font-bold text-slate-900 flex items-center">
                        <IndianRupee size={14} className="mr-0.5" />
                        {tenantData.lease.rent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5 font-medium">Security Deposit</p>
                      <p className="text-md font-bold text-slate-900 flex items-center">
                        <IndianRupee size={14} className="mr-0.5" />
                        {tenantData.lease.deposit.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Term Duration</p>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-slate-400" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">{tenantData.lease.startDate}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Start Date</p>
                    </div>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-100 ml-2.5 my-1" />
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-slate-400" />
                    <div>
                      <p className="text-sm font-bold text-slate-700">{tenantData.lease.endDate}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">End Date</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Notice Period</p>
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <p className="text-xs text-amber-700 font-bold">60 Days Mandatory Notice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-200">
            <div>
              <h4 className="text-xl font-bold mb-2">Need a Lease Extension?</h4>
              <p className="text-slate-400 text-sm max-w-sm">Contact your landlord directly to discuss renewal options before your term expires on {tenantData.lease.endDate}.</p>
            </div>
            <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all whitespace-nowrap">
              Contact Landlord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantProfile;
