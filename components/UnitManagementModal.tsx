
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  History, 
  User as UserIcon, 
  IndianRupee, 
  Save, 
  Wrench,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Activity,
  Heart
} from 'lucide-react';
import { Unit, UnitStatus, MaintenanceTicket, MaintenanceStatus } from '../types';
import { getUnitHistory } from '../services/propertyService';
import { Modal } from './Modal';

interface UnitManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: Unit;
  onUpdate: (updatedUnit: Unit) => void;
}

const UnitManagementModal: React.FC<UnitManagementModalProps> = ({ isOpen, onClose, unit, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'history'>('settings');
  const [editedUnit, setEditedUnit] = useState<Unit>(unit);
  const [history, setHistory] = useState<MaintenanceTicket[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    setEditedUnit(unit);
    if (isOpen) {
      setIsLoadingHistory(true);
      getUnitHistory(unit.id).then(data => {
        setHistory(data);
        setIsLoadingHistory(false);
      });
    }
  }, [unit, isOpen]);

  const handleSave = () => {
    onUpdate(editedUnit);
    onClose();
  };

  const handleUnassignTenant = () => {
    const updated = {
      ...editedUnit,
      tenantName: undefined,
      tenantId: undefined,
      tenantPhone: undefined,
      tenantEmail: undefined,
      status: UnitStatus.VACANT
    };
    setEditedUnit(updated);
  };

  const getStatusIcon = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.CLOSED:
      case MaintenanceStatus.RESOLVED:
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" aria-label="Status: Resolved" />;
      case MaintenanceStatus.IN_PROGRESS:
        return <AlertCircle className="w-4 h-4 text-amber-500" aria-label="Status: In Progress" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-400" aria-label="Status: Pending" />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Unit ${unit.unitNumber} Management`} size="lg">
      <div className="flex flex-col h-full max-h-[80vh]" role="dialog" aria-label={`Manage unit ${unit.unitNumber}`}>
        {/* Tabs */}
        <div className="flex border-b border-slate-100 mb-6 shrink-0" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 text-sm font-bold flex items-center gap-2 transition-all border-b-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset ${
              activeTab === 'settings' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Settings size={18} />
            Unit Settings
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-bold flex items-center gap-2 transition-all border-b-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset ${
              activeTab === 'history' 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <History size={18} />
            Maintenance History
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {activeTab === 'settings' ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Tenant Pulse - Owner Insight */}
              {unit.status === UnitStatus.OCCUPIED && (
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-xl text-indigo-600 shadow-sm">
                      <Heart size={20} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Tenant Pulse</p>
                      <p className="text-sm font-bold text-indigo-900">Highly Satisfied (9.2/10)</p>
                    </div>
                  </div>
                  <p className="text-xs text-indigo-500 font-medium max-w-[180px] text-right">Based on timely rent payments and maintenance response.</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="unit-status" className="block text-sm font-bold text-slate-700 mb-2">Unit Status</label>
                  <select
                    id="unit-status"
                    value={editedUnit.status}
                    onChange={(e) => setEditedUnit({ ...editedUnit, status: e.target.value as UnitStatus })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
                  >
                    <option value={UnitStatus.VACANT}>Vacant</option>
                    <option value={UnitStatus.OCCUPIED}>Occupied</option>
                    <option value={UnitStatus.MAINTENANCE}>Under Maintenance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="unit-rent" className="block text-sm font-bold text-slate-700 mb-2">Monthly Rent (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="unit-rent"
                      type="number"
                      value={editedUnit.monthlyRent}
                      onChange={(e) => setEditedUnit({ ...editedUnit, monthlyRent: parseInt(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Tenant Details Section */}
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity size={80} className="text-indigo-600" />
                </div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
                    <UserIcon size={18} className="text-indigo-600" />
                    Tenant Information
                  </h4>
                  {editedUnit.tenantName && (
                    <button 
                      onClick={handleUnassignTenant}
                      className="text-rose-600 text-[10px] font-black uppercase hover:underline p-1"
                    >
                      Unassign
                    </button>
                  )}
                </div>

                {editedUnit.tenantName ? (
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-100">
                        {editedUnit.tenantName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-900">{editedUnit.tenantName}</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tenant ID: {editedUnit.tenantId || 'T-AUTO-23'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <Phone size={16} className="text-slate-400" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Phone</p>
                          <p className="text-sm font-bold text-slate-700">{editedUnit.tenantPhone || '+91 9XXXX XXXXX'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <Mail size={16} className="text-slate-400" />
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Email</p>
                          <p className="text-sm font-bold text-slate-700 truncate max-w-[140px]">{editedUnit.tenantEmail || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-h-[44px]">
                        <MessageSquare size={14} /> Message
                      </button>
                      <button className="flex-1 py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 min-h-[44px]">
                        <ExternalLink size={14} /> View Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 bg-white/50 rounded-2xl border border-dashed border-slate-200">
                    <UserIcon size={40} className="mx-auto text-slate-200 mb-3" />
                    <p className="text-sm text-slate-500 mb-4 font-medium">This unit is currently vacant.</p>
                    <button className="px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-all">
                      Assign New Tenant
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end shrink-0">
                <button
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-2 min-h-[48px]"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300 pb-4" role="tabpanel" aria-label="Maintenance service records">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Recent Service Records</h3>
                <button className="text-indigo-600 text-xs font-bold hover:underline p-1">New Ticket</button>
              </div>

              {isLoadingHistory ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3" aria-live="polite">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Loading History...</p>
                </div>
              ) : history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((ticket) => (
                    <div key={ticket.id} className="p-5 bg-white border border-slate-200 rounded-3xl hover:border-indigo-300 hover:shadow-lg transition-all flex items-start gap-4 group cursor-pointer" role="button" aria-label={`View details for ${ticket.title}`}>
                      <div className={`p-3 rounded-2xl shrink-0 ${
                        ticket.status === MaintenanceStatus.CLOSED ? 'bg-emerald-50 text-emerald-600' : 
                        ticket.status === MaintenanceStatus.IN_PROGRESS ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-50 text-slate-400'
                      }`}>
                        {getStatusIcon(ticket.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate pr-2">{ticket.title}</h5>
                          <span className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap">{ticket.createdAt}</span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">{ticket.description}</p>
                        <div className="flex items-center gap-4">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            ticket.priority === 'HIGH' || ticket.priority === 'URGENT' ? 'text-rose-600 bg-rose-50' : 'text-slate-400 bg-slate-50'
                          }`}>
                            {ticket.priority} Priority
                          </span>
                        </div>
                      </div>
                      <div className="self-center">
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-sm hover:border-indigo-200 hover:text-indigo-600 hover:bg-white transition-all min-h-[44px]">
                    View Complete Audit Log
                  </button>
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                  <Wrench size={56} className="mx-auto text-slate-200 mb-4" />
                  <h4 className="font-bold text-slate-900 mb-1">No maintenance found</h4>
                  <p className="text-sm text-slate-500 font-medium">This unit has a perfect maintenance record.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UnitManagementModal;
