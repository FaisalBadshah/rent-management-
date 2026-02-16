
import React from 'react';
import { User, Building2, Wrench, IndianRupee, MoreVertical, ArrowRight } from 'lucide-react';
import { Unit, UnitStatus } from '../types';

interface UnitCardProps {
  unit: Unit;
  onManage: (id: string) => void;
}

const UnitCard: React.FC<UnitCardProps> = ({ unit, onManage }) => {
  const getStatusStyle = (status: UnitStatus) => {
    switch (status) {
      case UnitStatus.OCCUPIED:
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case UnitStatus.MAINTENANCE:
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case UnitStatus.VACANT:
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Building2 size={24} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900">Unit {unit.unitNumber}</h4>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(unit.status)}`}>
              {unit.status}
            </span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-1">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <User size={16} />
            <span className="text-sm font-medium">Tenant</span>
          </div>
          <span className="text-sm font-bold text-slate-900">
            {unit.tenantName || <span className="text-slate-400 font-normal">No Tenant</span>}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <IndianRupee size={16} />
            <span className="text-sm font-medium">Monthly Rent</span>
          </div>
          <span className="text-sm font-bold text-slate-900">₹{unit.monthlyRent.toLocaleString()}</span>
        </div>

        {unit.lastMaintenanceDate && (
          <div className="flex items-center justify-between py-2 border-b border-slate-50">
            <div className="flex items-center gap-2 text-slate-500">
              <Wrench size={16} />
              <span className="text-sm font-medium">Last Service</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{unit.lastMaintenanceDate}</span>
          </div>
        )}
      </div>

      <button 
        onClick={() => onManage(unit.id)}
        className="w-full py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
      >
        Unit Details
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default UnitCard;
