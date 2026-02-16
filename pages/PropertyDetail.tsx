
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Hash, 
  Layers, 
  CreditCard, 
  Wrench, 
  User, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Property, Unit, UnitStatus } from '../types';
import { getPropertyById, getUnitsByPropertyId, getPropertyActivity, PropertyActivity } from '../services/propertyService';
import { TableSkeleton } from '../components/Skeleton';

const PropertyDetail: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [activities, setActivities] = useState<PropertyActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (propertyId) {
        const [propData, unitData, activityData] = await Promise.all([
          getPropertyById(propertyId),
          getUnitsByPropertyId(propertyId),
          getPropertyActivity(propertyId)
        ]);
        if (propData) setProperty(propData);
        setUnits(unitData);
        setActivities(activityData);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [propertyId]);

  if (isLoading) return <div className="p-8"><TableSkeleton rows={10} /></div>;
  if (!property) return <div className="p-8 text-center text-slate-500">Property not found.</div>;

  const occupiedCount = units.filter(u => u.status === UnitStatus.OCCUPIED).length;
  const totalRevenue = units.reduce((acc, u) => acc + (u.status === UnitStatus.OCCUPIED ? u.monthlyRent : 0), 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/properties" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{property.propertyName}</h1>
            <div className="flex items-center text-slate-500 text-sm mt-1">
              <MapPin size={16} className="mr-1" />
              {property.addressLine1}, {property.city}, {property.pincode}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate(`/properties/${property.id}/units`)}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Layers size={18} />
            Manage Units
          </button>
        </div>
      </div>

      {/* Hero Section / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Property Code</p>
          <div className="flex items-center gap-2">
            <Hash size={20} className="text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-900">{property.propertyCode}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Occupancy</p>
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900">{occupiedCount} / {property.totalUnits} Units</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Expected Revenue</p>
          <div className="flex items-center gap-2">
            <CreditCard size={20} className="text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-900">₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Compliance Status</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-500" />
            <h3 className="text-xl font-bold text-emerald-600">{property.gstApplicable ? 'GST Registered' : 'Active'}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Units Summary */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Layers size={18} className="text-indigo-600" />
                Units Preview
              </h3>
              <button 
                onClick={() => navigate(`/properties/${property.id}/units`)}
                className="text-indigo-600 font-bold text-sm hover:underline flex items-center"
              >
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {units.slice(0, 4).map(unit => (
                <div key={unit.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Unit {unit.unitNumber}</p>
                      <p className="text-xs text-slate-500">
                        {unit.tenantName || 'Vacant'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-bold text-slate-900">₹{unit.monthlyRent.toLocaleString()}</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                      unit.status === UnitStatus.OCCUPIED ? 'bg-emerald-50 text-emerald-700' :
                      unit.status === UnitStatus.MAINTENANCE ? 'bg-amber-50 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {unit.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <User className="w-8 h-8 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900">Add Tenant</span>
            </button>
            <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <Wrench className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900">Maintenance</span>
            </button>
            <button className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <CreditCard className="w-8 h-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-slate-900">Collect Rent</span>
            </button>
          </div>
        </div>

        {/* Sidebar Activity Feed */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <Activity size={18} className="text-indigo-600" />
              <h3 className="font-bold text-slate-900">Recent Activity</h3>
            </div>
            <div className="p-6 space-y-6">
              {activities.map((act) => (
                <div key={act.id} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-indigo-600 bg-white z-10" />
                  {activities.indexOf(act) !== activities.length - 1 && (
                    <div className="absolute left-[7px] top-5 w-[2px] h-full bg-slate-100 -z-0" />
                  )}
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{act.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{act.description}</p>
                    {act.amount && (
                      <p className="text-xs font-bold text-emerald-600 mt-1">+ ₹{act.amount.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                View All Activity
              </button>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2">Performance Score</h4>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-4xl font-black">94</span>
                <span className="text-indigo-300 text-sm mb-1">/ 100</span>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Your collection efficiency is higher than 85% of properties in {property.city}.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
