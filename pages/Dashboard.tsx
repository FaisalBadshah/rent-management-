
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  ChevronRight,
  CreditCard,
  PieChart as PieIcon,
  Sparkles,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { getMockDashboardStats, getMockRevenueTrends, getPropertyPerformance } from '../services/dashboardService';
import { analyzeRentTrends } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const stats = getMockDashboardStats();
  const trends = getMockRevenueTrends();
  const performance = getPropertyPerformance();
  const [aiSummary, setAiSummary] = useState<string>('Analyzing your collection trends...');
  const [isAiLoading, setIsAiLoading] = useState(true);

  useEffect(() => {
    const fetchAiAnalysis = async () => {
      const analysis = await analyzeRentTrends({ stats, trends, performance });
      setAiSummary(analysis);
      setIsAiLoading(false);
    };
    fetchAiAnalysis();
  }, []);

  const cardStats = [
    { label: 'Revenue Expected', value: `₹${(stats.totalExpected/100000).toFixed(1)}L`, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Collection Rate', value: `${stats.collectionEfficiency}%`, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Occupancy', value: `${stats.occupancyRate}%`, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending Dues', value: `₹${(stats.totalPending/1000).toFixed(0)}k`, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12" role="main" aria-labelledby="dash-title">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 id="dash-title" className="text-2xl font-bold text-slate-900">Portfolio Overview</h1>
          <p className="text-slate-500">Analytics and revenue insights for February 2025.</p>
        </div>
        <div className="flex gap-2">
          <Link 
            to="/reports"
            className="flex items-center bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            aria-label="Download monthly financial report"
          >
            <Download className="w-4 h-4 mr-2" />
            Monthly Report
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Key performance indicators">
        {cardStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all" role="status">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`} aria-hidden="true">
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </section>

      {/* AI Insight Section */}
      <section className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100/50" aria-labelledby="ai-title">
        <div className="absolute top-0 right-0 p-8 opacity-10" aria-hidden="true">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <h3 id="ai-title" className="font-bold text-lg">RentFlow AI Analysis</h3>
          </div>
          {isAiLoading ? (
            <div className="flex items-center gap-3" aria-live="polite">
              <div className="h-4 w-4 bg-indigo-400 rounded-full animate-ping"></div>
              <p className="text-indigo-100">Generating intelligence from your property data...</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none" aria-live="polite">
              <p className="text-indigo-50 leading-relaxed whitespace-pre-wrap">{aiSummary}</p>
            </div>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Collection Trends Chart */}
        <section className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm" aria-labelledby="chart-title">
          <div className="flex items-center justify-between mb-8">
            <h3 id="chart-title" className="text-lg font-bold text-slate-900">Revenue Trends</h3>
            <div className="flex gap-4" aria-hidden="true">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                <span className="text-xs font-semibold text-slate-500">Collected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                <span className="text-xs font-semibold text-slate-500">Expected</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full relative block min-h-[350px]" role="img" aria-label="Bar chart showing revenue expected vs collected over the last 6 months">
            <ResponsiveContainer width="99%" height="99%">
              <BarChart data={trends} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="expected" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="collected" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Property Performance */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm" aria-labelledby="perf-title">
          <h3 id="perf-title" className="text-lg font-bold text-slate-900 mb-6 flex items-center">
            <PieIcon className="w-5 h-5 mr-2 text-indigo-600" aria-hidden="true" />
            Performance by Property
          </h3>
          <div className="space-y-6">
            {performance.map((prop, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-slate-700">{prop.name}</span>
                  <span className="font-bold text-indigo-600">{prop.collection}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden" role="progressbar" aria-valuenow={prop.collection} aria-valuemin={0} aria-valuemax={100}>
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      prop.collection > 85 ? 'bg-emerald-500' : prop.collection > 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${prop.collection}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>{prop.occupied}/{prop.units} Units Occupied</span>
                  <span>Collection Score</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/properties" className="mt-8 w-full py-3 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all flex items-center justify-center focus:ring-2 focus:ring-indigo-500 outline-none">
            Manage Portfolio
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
