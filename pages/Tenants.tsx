
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  MoreVertical,
  Plus,
  MessageCircle,
  Clock,
  X,
  Calendar,
  IndianRupee,
  ShieldCheck,
  FileText
} from 'lucide-react';

const Tenants: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenants, setTenants] = useState([
    {
      id: '1',
      name: 'Rahul Sharma',
      property: 'Palm Heights',
      unit: '402',
      rent: 24500,
      status: 'Current',
      due: 'Paid',
      phone: '+91 9876543210',
      joined: '12 Jan 2023'
    },
    {
      id: '2',
      name: 'Ananya Iyer',
      property: 'Office Park',
      unit: 'Suite 12',
      rent: 85000,
      status: 'Current',
      due: '5 Days Overdue',
      phone: '+91 9822334455',
      joined: '05 May 2023'
    }
  ]);

  const [formData, setFormData] = useState({
    tenantName: '',
    tenantMobile: '',
    propertyId: '1',
    unitNumber: '',
    monthlyRent: '',
    securityDeposit: '',
    leaseStartDate: '',
    rentDueDay: '1'
  });

  const handleAddTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const newTenant = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.tenantName,
      property: formData.propertyId === '1' ? 'Palm Heights' : 'New Property',
      unit: formData.unitNumber,
      rent: parseInt(formData.monthlyRent),
      status: 'Current',
      due: 'Paid',
      phone: `+91 ${formData.tenantMobile}`,
      joined: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setTenants([newTenant, ...tenants]);
    setIsModalOpen(false);
    setFormData({
      tenantName: '',
      tenantMobile: '',
      propertyId: '1',
      unitNumber: '',
      monthlyRent: '',
      securityDeposit: '',
      leaseStartDate: '',
      rentDueDay: '1'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tenants</h1>
          <p className="text-slate-500">Manage all your active and previous tenancies.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Tenants', value: tenants.length, color: 'text-indigo-600' },
          { label: 'New This Month', value: '1', color: 'text-emerald-600' },
          { label: 'Pending Dues', value: '1', color: 'text-amber-600' },
          { label: 'Lease Expiring', value: '0', color: 'text-rose-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{item.label}</p>
            <p className={`text-2xl font-bold mt-1 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, phone or unit..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tenant Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Unit Information</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Monthly Rent</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Rent Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Joined On</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                        {tenant.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-slate-900">{tenant.name}</p>
                        <p className="text-xs text-slate-500">{tenant.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{tenant.property}</p>
                    <p className="text-xs text-slate-500">Unit: {tenant.unit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">₹{tenant.rent.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      tenant.due === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                      tenant.due.includes('Overdue') ? 'bg-rose-50 text-rose-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {tenant.due === 'Paid' ? 'Up-to-date' : tenant.due}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      {tenant.joined}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
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

      {/* Add Tenant Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Enroll New Tenant</h2>
                <p className="text-sm text-slate-500">Assign a tenant to an available unit.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleAddTenant} className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                    <Users className="w-4 h-4 mr-2" /> Tenant Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.tenantName}
                        onChange={(e) => setFormData({...formData, tenantName: e.target.value})}
                        placeholder="Tenant Name"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">+91</span>
                        <input 
                          required
                          type="tel" 
                          maxLength={10}
                          value={formData.tenantMobile}
                          onChange={(e) => setFormData({...formData, tenantMobile: e.target.value.replace(/\D/g, '')})}
                          className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center">
                    <FileText className="w-4 h-4 mr-2" /> Tenancy & Rental Terms
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Select Property</label>
                      <select 
                        value={formData.propertyId}
                        onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      >
                        <option value="1">Palm Heights</option>
                        <option value="2">Global Office Park</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Unit Number</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. 402"
                        value={formData.unitNumber}
                        onChange={(e) => setFormData({...formData, unitNumber: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Rent (₹)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="number" 
                          value={formData.monthlyRent}
                          onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Security Deposit (₹)</label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="number" 
                          value={formData.securityDeposit}
                          onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Lease Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="date" 
                          value={formData.leaseStartDate}
                          onChange={(e) => setFormData({...formData, leaseStartDate: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Rent Due Day</label>
                      <select 
                        value={formData.rentDueDay}
                        onChange={(e) => setFormData({...formData, rentDueDay: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                      >
                        {[...Array(31)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1}st of month</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3 sticky bottom-0 bg-white">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 px-4 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center"
                >
                  Enroll Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenants;
