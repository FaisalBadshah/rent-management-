
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Building2, 
  MapPin, 
  Layers, 
  ExternalLink,
  Search,
  Filter,
  MoreVertical,
  X,
  Hash,
  Map,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { PropertyType, PropertyStatus, Property } from '../types';
import { getProperties } from '../services/propertyService';

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProps = async () => {
      const data = await getProperties();
      setProperties(data);
      setIsLoading(false);
    };
    fetchProps();
  }, []);

  const [formData, setFormData] = useState({
    propertyName: '',
    propertyType: PropertyType.RESIDENTIAL,
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    totalUnits: '1'
  });

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = formData.propertyName.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 3);
    const newProperty: Property = {
      id: Math.random().toString(36).substr(2, 9),
      propertyName: formData.propertyName,
      propertyType: formData.propertyType,
      addressLine1: formData.addressLine1,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      totalUnits: parseInt(formData.totalUnits),
      propertyCode: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: PropertyStatus.ACTIVE,
      gstApplicable: false
    };

    setProperties([newProperty, ...properties]);
    setIsModalOpen(false);
    setFormData({
      propertyName: '',
      propertyType: PropertyType.RESIDENTIAL,
      addressLine1: '',
      city: '',
      state: '',
      pincode: '',
      totalUnits: '1'
    });
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = 
      p.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.addressLine1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.propertyCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'ALL' || p.propertyType === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-slate-500">Manage your real estate portfolio across India.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold flex items-center justify-center transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, address, city or code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer hover:bg-slate-50 min-w-[160px]"
            >
              <option value="ALL">All Types</option>
              <option value={PropertyType.RESIDENTIAL}>Residential</option>
              <option value={PropertyType.COMMERCIAL_SHOP}>Commercial</option>
              <option value={PropertyType.OFFICE}>Office</option>
              <option value={PropertyType.WAREHOUSE}>Warehouse</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none appearance-none cursor-pointer hover:bg-slate-50 min-w-[140px]"
            >
              <option value="ALL">All Status</option>
              <option value={PropertyStatus.ACTIVE}>Active</option>
              <option value={PropertyStatus.INACTIVE}>Inactive</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1,2,3].map(n => <div key={n} className="h-80 bg-slate-100 animate-pulse rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div 
              key={property.id} 
              onClick={() => navigate(`/properties/${property.id}`)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={`https://picsum.photos/seed/${property.id}/400/300`} 
                  alt={property.propertyName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    {property.propertyType.replace('_', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{property.propertyName}</h3>
                  <span className="text-xs font-bold text-slate-400">#{property.propertyCode}</span>
                </div>
                
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
                  <span className="truncate">{property.addressLine1}, {property.city}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center text-slate-500 text-xs mb-1">
                      <Layers className="w-3.5 h-3.5 mr-1" />
                      Units
                    </div>
                    <p className="text-sm font-bold text-slate-900">{property.totalUnits} <span className="text-slate-400 font-normal text-xs ml-1">Total</span></p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center text-slate-500 text-xs mb-1">
                      <Building2 className="w-3.5 h-3.5 mr-1" />
                      Status
                    </div>
                    <p className={`text-sm font-bold capitalize ${property.status === PropertyStatus.ACTIVE ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {property.status.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/properties/${property.id}/units`);
                    }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-semibold flex items-center"
                  >
                    Manage Units
                    <ExternalLink className="w-4 h-4 ml-1.5" />
                  </button>
                  <button className="text-slate-400 hover:text-slate-600" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProperties.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <Building2 size={48} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">No properties found</h3>
              <p className="text-slate-500">Adjust your search or filters to see more results.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Add New Property</h2>
                <p className="text-sm text-slate-500">Register a new property to your portfolio.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleCreateProperty} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <Building2 className="w-4 h-4 mr-2" /> Property Name
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.propertyName}
                    onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                    placeholder="e.g. Sunset Apartments"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type</label>
                  <select 
                    value={formData.propertyType}
                    onChange={(e) => setFormData({...formData, propertyType: e.target.value as PropertyType})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  >
                    <option value={PropertyType.RESIDENTIAL}>Residential</option>
                    <option value={PropertyType.COMMERCIAL_SHOP}>Commercial Shop</option>
                    <option value={PropertyType.OFFICE}>Office</option>
                    <option value={PropertyType.WAREHOUSE}>Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <Hash className="w-4 h-4 mr-2" /> Total Units
                  </label>
                  <input 
                    required
                    type="number" 
                    min="1"
                    value={formData.totalUnits}
                    onChange={(e) => setFormData({...formData, totalUnits: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" /> Address Line
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({...formData, addressLine1: e.target.value})}
                    placeholder="Street, Area, etc."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <input 
                    required
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center">
                    <Map className="w-4 h-4 mr-2" /> State
                  </label>
                  <input 
                    required
                    type="text" 
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
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
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Create Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;
