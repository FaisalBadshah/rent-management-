
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Search, Filter, Plus, Home, ChevronDown } from 'lucide-react';
import { Unit, Property, UnitStatus } from '../types';
import { getUnitsByPropertyId, getPropertyById } from '../services/propertyService';
import UnitCard from '../components/UnitCard';
import UnitManagementModal from '../components/UnitManagementModal';
import { AddUnitModal } from '../components/AddUnitModal';
import { TableSkeleton } from '../components/Skeleton';
import { useToast } from '../components/Toast';

const PropertyUnits: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<UnitStatus | 'ALL'>('ALL');
  
  // Modal States
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (propertyId) {
        const [propData, unitData] = await Promise.all([
          getPropertyById(propertyId),
          getUnitsByPropertyId(propertyId)
        ]);
        if (propData) setProperty(propData);
        setUnits(unitData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [propertyId]);

  const filteredUnits = units.filter(u => {
    const matchesSearch = u.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleManageUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsManageModalOpen(true);
  };

  const handleUpdateUnit = (updatedUnit: Unit) => {
    setUnits(prev => prev.map(u => u.id === updatedUnit.id ? updatedUnit : u));
    showToast('success', `Unit ${updatedUnit.unitNumber} updated successfully.`);
  };

  const handleAddUnit = (unitData: Partial<Unit>) => {
    const newUnit: Unit = {
      ...unitData,
      id: `u-${Math.random().toString(36).substr(2, 9)}`,
      propertyId: propertyId!,
      unitNumber: unitData.unitNumber!,
      status: unitData.status!,
      monthlyRent: unitData.monthlyRent!,
    } as Unit;
    
    setUnits(prev => [newUnit, ...prev]);
    showToast('success', `Unit ${newUnit.unitNumber} added successfully.`);
  };

  if (isLoading) return <div className="p-8"><TableSkeleton rows={8} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-4">
        <Link to="/properties" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{property?.propertyName} Units</h1>
          <p className="text-slate-500">{property?.addressLine1}, {property?.city}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Units', value: units.length, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Occupied', value: units.filter(u => u.status === UnitStatus.OCCUPIED).length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Vacant', value: units.filter(u => u.status === UnitStatus.VACANT).length, color: 'text-slate-600', bg: 'bg-slate-50' },
          { label: 'Maintenance', value: units.filter(u => u.status === UnitStatus.MAINTENANCE).length, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search unit or tenant..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UnitStatus | 'ALL')}
              className="w-full sm:w-48 pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="ALL">All Status</option>
              <option value={UnitStatus.OCCUPIED}>Occupied</option>
              <option value={UnitStatus.VACANT}>Vacant</option>
              <option value={UnitStatus.MAINTENANCE}>Maintenance</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 transition-all"
          >
            <Plus size={20} /> Add Unit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {filteredUnits.length > 0 ? (
          filteredUnits.map((unit) => (
            <UnitCard 
              key={unit.id} 
              unit={unit} 
              onManage={() => handleManageUnit(unit)} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border border-dashed border-slate-200 animate-in fade-in duration-500">
            <Home size={48} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">No units found</h3>
            <p className="text-slate-500">Try adjusting your search or status filter.</p>
            {(searchTerm || statusFilter !== 'ALL') && (
              <button 
                onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
                className="mt-4 text-indigo-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {selectedUnit && (
        <UnitManagementModal 
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          unit={selectedUnit}
          onUpdate={handleUpdateUnit}
        />
      )}

      {propertyId && (
        <AddUnitModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddUnit}
          propertyId={propertyId}
        />
      )}
    </div>
  );
};

export default PropertyUnits;
