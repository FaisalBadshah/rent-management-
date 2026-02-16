
import React, { useState } from 'react';
import { 
  Building2, 
  IndianRupee, 
  Plus, 
  X,
  Hash,
  Activity
} from 'lucide-react';
import { Modal } from './Modal';
import { UnitStatus, Unit } from '../types';

interface AddUnitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (unit: Partial<Unit>) => void;
  propertyId: string;
}

export const AddUnitModal: React.FC<AddUnitModalProps> = ({ isOpen, onClose, onAdd, propertyId }) => {
  const [formData, setFormData] = useState({
    unitNumber: '',
    monthlyRent: '',
    status: UnitStatus.VACANT
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      propertyId,
      unitNumber: formData.unitNumber,
      monthlyRent: parseInt(formData.monthlyRent),
      status: formData.status
    });
    setFormData({ unitNumber: '', monthlyRent: '', status: UnitStatus.VACANT });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Unit" size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Hash size={16} className="text-indigo-600" />
              Unit Number / Name
            </label>
            <input 
              required
              type="text" 
              value={formData.unitNumber}
              onChange={(e) => setFormData({...formData, unitNumber: e.target.value})}
              placeholder="e.g. 101, Suite A, Flat 4"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <IndianRupee size={16} className="text-indigo-600" />
              Monthly Rent
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                required
                type="number" 
                value={formData.monthlyRent}
                onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})}
                placeholder="25000"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Activity size={16} className="text-indigo-600" />
              Initial Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as UnitStatus})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value={UnitStatus.VACANT}>Vacant</option>
              <option value={UnitStatus.OCCUPIED}>Occupied</option>
              <option value={UnitStatus.MAINTENANCE}>Under Maintenance</option>
            </select>
          </div>
        </div>

        <div className="pt-6 flex gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="flex-1 py-3.5 px-4 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 py-3.5 px-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Unit
          </button>
        </div>
      </form>
    </Modal>
  );
};
