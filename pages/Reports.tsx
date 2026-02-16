
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Search, 
  Filter, 
  ArrowLeft,
  CheckCircle2,
  Table as TableIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Reports: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2025-02');
  const [isExporting, setIsExporting] = useState(false);

  const reportData = [
    { property: 'Palm Heights', unit: '402', tenant: 'Rahul Sharma', rent: 24500, status: 'Completed', date: '02 Feb 2025' },
    { property: 'Palm Heights', unit: '101', tenant: 'Sana Khan', rent: 22000, status: 'Failed', date: '05 Feb 2025' },
    { property: 'Office Park', unit: 'Suite 12', tenant: 'Ananya Iyer', rent: 85000, status: 'Pending', date: '-' },
    { property: 'Market Square', unit: 'Shop 4', tenant: 'Vikram Singh', rent: 15000, status: 'Completed', date: '01 Feb 2025' },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Report for ' + selectedMonth + ' exported to CSV successfully!');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-slate-500">Generate and export detailed collection data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Report Filters
            </h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Target Month</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  <option value="2025-02">February 2025</option>
                  <option value="2025-01">January 2025</option>
                  <option value="2024-12">December 2024</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Report Type</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none">
                <option>Collections Summary</option>
                <option>Occupancy Report</option>
                <option>Expense Tracker</option>
                <option>Tax Statement (GST)</option>
              </select>
            </div>

            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
            >
              {isExporting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export to CSV
                </>
              )}
            </button>
          </div>

          <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-lg shadow-emerald-100">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <h4 className="font-bold">Verified Data</h4>
            </div>
            <p className="text-emerald-50 text-xs leading-relaxed">
              All transactions listed are verified against Razorpay bank settlements as of today.
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center">
                <TableIcon className="w-4 h-4 mr-2" />
                Data Preview
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter results..."
                  className="pl-8 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Property/Unit</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tenant</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rent</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reportData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">{row.property}</p>
                        <p className="text-[10px] text-slate-400">Unit: {row.unit}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{row.tenant}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">₹{row.rent.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                          row.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                          row.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
