
import { Unit, UnitStatus, Property, PropertyType, PropertyStatus, MaintenanceTicket, MaintenanceStatus, MaintenancePriority } from '../types';

export interface PropertyActivity {
  id: string;
  type: 'PAYMENT' | 'MAINTENANCE' | 'TENANT' | 'UNIT';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
}

export const getProperties = async (): Promise<Property[]> => {
  return [
    {
      id: '1',
      propertyName: 'Palm Heights',
      propertyType: PropertyType.RESIDENTIAL,
      addressLine1: 'Hiranandani Gardens, Powai',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400076',
      totalUnits: 12,
      propertyCode: 'PH-001',
      status: PropertyStatus.ACTIVE,
      gstApplicable: false
    },
    {
      id: '2',
      propertyName: 'Global Office Park',
      propertyType: PropertyType.OFFICE,
      addressLine1: 'Whitefield Main Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
      totalUnits: 4,
      propertyCode: 'GOP-102',
      status: PropertyStatus.ACTIVE,
      gstApplicable: true
    },
    {
      id: '3',
      propertyName: 'Market Square',
      propertyType: PropertyType.COMMERCIAL_SHOP,
      addressLine1: 'Linking Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      totalUnits: 24,
      propertyCode: 'MS-502',
      status: PropertyStatus.ACTIVE,
      gstApplicable: true
    }
  ];
};

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
  const properties = await getProperties();
  return properties.find(p => p.id === id);
};

export const getUnitsByPropertyId = async (propertyId: string): Promise<Unit[]> => {
  return [
    { id: 'u1', propertyId, unitNumber: '101', status: UnitStatus.OCCUPIED, tenantName: 'Rahul Sharma', tenantPhone: '+91 98765 43210', tenantEmail: 'rahul.s@example.com', monthlyRent: 24500, lastMaintenanceDate: '2025-01-10' },
    { id: 'u2', propertyId, unitNumber: '102', status: UnitStatus.VACANT, monthlyRent: 22000 },
    { id: 'u3', propertyId, unitNumber: '201', status: UnitStatus.OCCUPIED, tenantName: 'Sana Khan', tenantPhone: '+91 98123 45678', tenantEmail: 'sana.k@example.com', monthlyRent: 24500, lastMaintenanceDate: '2024-12-15' },
    { id: 'u4', propertyId, unitNumber: '202', status: UnitStatus.MAINTENANCE, monthlyRent: 24500 },
    { id: 'u5', propertyId, unitNumber: '301', status: UnitStatus.OCCUPIED, tenantName: 'Amit Patel', tenantPhone: '+91 98888 77777', tenantEmail: 'amit.p@example.com', monthlyRent: 26000 },
    { id: 'u6', propertyId, unitNumber: '302', status: UnitStatus.VACANT, monthlyRent: 26000 },
  ];
};

export const getPropertyActivity = async (propertyId: string): Promise<PropertyActivity[]> => {
  return [
    { id: 'act1', type: 'PAYMENT', title: 'Rent Collected', description: 'Unit 101 monthly rent received.', timestamp: '2 hours ago', amount: 24500 },
    { id: 'act2', type: 'MAINTENANCE', title: 'New Ticket', description: 'Unit 202 reported kitchen leakage.', timestamp: '5 hours ago' },
    { id: 'act3', type: 'TENANT', title: 'Lease Renewal', description: 'Amit Patel renewed lease for Unit 301.', timestamp: 'Yesterday' },
    { id: 'act4', type: 'UNIT', title: 'Status Changed', description: 'Unit 302 marked as Vacant.', timestamp: '2 days ago' },
  ];
};

export const getUnitHistory = async (unitId: string): Promise<MaintenanceTicket[]> => {
  return [
    {
      id: 'TKT-991',
      propertyId: '1',
      unitId: unitId,
      tenantId: 'USR-1',
      title: 'Water Seepage',
      description: 'Wall dampness observed in the living room corner.',
      status: MaintenanceStatus.CLOSED,
      priority: MaintenancePriority.MEDIUM,
      createdAt: '2024-11-20',
      updatedAt: '2024-11-25'
    },
    {
      id: 'TKT-992',
      propertyId: '1',
      unitId: unitId,
      tenantId: 'USR-1',
      title: 'Bulb Replacement',
      description: 'Balcony light not working.',
      status: MaintenanceStatus.CLOSED,
      priority: MaintenancePriority.LOW,
      createdAt: '2024-12-05',
      updatedAt: '2024-12-05'
    }
  ];
};
