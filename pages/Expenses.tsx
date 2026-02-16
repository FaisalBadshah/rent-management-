
import React, { useState } from 'react';
import { 
  IndianRupee, 
  Calendar, 
  Tag, 
  Plus, 
  ArrowUpRight, 
  Search, 
  Filter,
  PieChart,
  Download,
  FileText
} from 'lucide-react';
import { Expense, ExpenseCategory } from '../types';

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 'EXP-001',
      propertyId: '1',
      category: ExpenseCategory.REPAIR,
      amount: 1200,
      date: '2025-02-10',
      description: 'Plumbing repair for unit 201'
    },
    {
      id: 'EXP-002',
      propertyId: '1',
      category: ExpenseCategory.TAX,
      amount: 8500,
      date: '2025-02-05',
      description: 'Property Tax - Quarter 1'
    }
  ]);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Expenses</h1>
          <p className="text-slate-500">Track costs and calculate net profit across your portfolio.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 flex items-center transition-all">
            <Download size={18} className="mr-2" /> Export
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center shadow-lg shadow-indigo-100 transition-all">
            <Plus size={20} className="mr-2" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
               <IndianRupee size={24} />
             </div>
             <span className="text-rose-500 text-xs font-bold">+12% vs last month</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Monthly Expenses</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">₹{totalExpense.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
           <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
               <PieChart size={24} />
             </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Major Category</p>
          <h3 className="text-3xl font-black text-slate-900 mt-1">Repairs</h3>
          <p className="text-xs text-slate-400 mt-1">45% of total spend</p>
        </div>

        <div className="bg-indigo-600 p-6 rounded-3xl shadow-xl shadow-indigo-100 text-white">
           <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-white/20 text-white rounded-2xl">
               <FileText size={24} />
             </div>
          </div>
          <p className="text-indigo-200 text-sm font-medium">Net Income After Expense</p>
          <h3 className="text-3xl font-black mt-1">₹4,82,500</h3>
          <p className="text-xs text-indigo-300 mt-1">Feb 2025 calculation</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <h4 className="font-bold text-slate-900">Expense History</h4>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input type="text" placeholder="Search expenses..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none" />
             </div>
             <button className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-colors">
               <Filter size={18} />
             </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Description</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6 text-sm font-bold text-slate-600">{exp.date}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">{exp.category}</span>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-700 font-medium">{exp.description}</td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-sm font-black text-slate-900">₹{exp.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      <FileText size={18} className="mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
