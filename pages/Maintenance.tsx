
import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus,
  Sparkles,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { MaintenanceTicket, MaintenanceStatus, MaintenancePriority } from '../types';
import { predictMaintenanceIssues } from '../services/geminiService';

const Maintenance: React.FC = () => {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>([
    {
      id: 'TKT-001',
      propertyId: '1',
      tenantId: 'USR-1',
      title: 'Kitchen Sink Leakage',
      description: 'The main pipe under the sink is dripping continuously.',
      status: MaintenanceStatus.IN_PROGRESS,
      priority: MaintenancePriority.MEDIUM,
      createdAt: '2025-02-15',
      updatedAt: '2025-02-16'
    },
    {
      id: 'TKT-002',
      propertyId: '2',
      tenantId: 'USR-2',
      title: 'AC Not Cooling',
      description: 'Master bedroom AC is not cooling, possibly gas refill needed.',
      status: MaintenanceStatus.OPEN,
      priority: MaintenancePriority.HIGH,
      createdAt: '2025-02-18',
      updatedAt: '2025-02-18'
    }
  ]);

  const [aiPrediction, setAiPrediction] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      const pred = await predictMaintenanceIssues(tickets, { age: 10, type: 'Apartment' });
      setAiPrediction(pred);
      setIsLoadingAi(false);
    };
    fetchPrediction();
  }, []);

  const getStatusBadge = (status: MaintenanceStatus) => {
    const styles = {
      [MaintenanceStatus.OPEN]: 'bg-slate-100 text-slate-700',
      [MaintenanceStatus.IN_PROGRESS]: 'bg-amber-100 text-amber-700',
      [MaintenanceStatus.RESOLVED]: 'bg-emerald-100 text-emerald-700',
      [MaintenanceStatus.CLOSED]: 'bg-slate-200 text-slate-500',
    };
    return <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}>{status}</span>;
  };

  const getPriorityIcon = (priority: MaintenancePriority) => {
    switch (priority) {
      case MaintenancePriority.URGENT: return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case MaintenancePriority.HIGH: return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Maintenance</h1>
          <p className="text-slate-500">Track and resolve property issues reported by tenants.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center shadow-lg shadow-indigo-100 transition-all">
          <Plus size={20} className="mr-2" />
          Create Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tickets List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search tickets..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">
              <Filter size={16} /> Filter
            </button>
          </div>

          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Wrench size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{ticket.title}</h3>
                    <p className="text-xs text-slate-400">#{ticket.id} • {ticket.createdAt}</p>
                  </div>
                </div>
                {getStatusBadge(ticket.status)}
              </div>
              <p className="text-sm text-slate-600 mb-6 line-clamp-2">{ticket.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  {getPriorityIcon(ticket.priority)}
                  {ticket.priority} PRIORITY
                </div>
                <button className="flex items-center gap-1 text-indigo-600 font-bold text-sm">
                  Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Maintenance Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles size={64} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Sparkles size={20} className="text-indigo-300" />
                </div>
                <h3 className="font-bold text-lg">AI Maintenance Guard</h3>
              </div>
              {isLoadingAi ? (
                <div className="space-y-4">
                  <div className="h-4 bg-white/10 rounded-full animate-pulse w-3/4" />
                  <div className="h-4 bg-white/10 rounded-full animate-pulse w-1/2" />
                </div>
              ) : (
                <div className="prose prose-invert prose-sm">
                  <p className="text-indigo-100 leading-relaxed font-medium">
                    {aiPrediction}
                  </p>
                </div>
              )}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-2">Cost Projection</p>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-black">₹12,400</span>
                  <span className="text-xs text-emerald-400 font-bold">Estimated Budget</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <MessageSquare size={18} />
              Recent Updates
            </h4>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-indigo-200">
                <p className="text-xs font-bold text-indigo-600">Plumber assigned to TKT-001</p>
                <p className="text-[10px] text-indigo-400">2 hours ago</p>
              </div>
              <div className="pl-4 border-l-2 border-indigo-200">
                <p className="text-xs font-bold text-indigo-600">Tenant uploaded 2 photos for TKT-002</p>
                <p className="text-[10px] text-indigo-400">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
