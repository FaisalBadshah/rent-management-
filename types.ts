
export enum UserType {
  OWNER = 'OWNER',
  TENANT = 'TENANT',
  BOTH = 'BOTH'
}

export enum PropertyType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL_SHOP = 'COMMERCIAL_SHOP',
  OFFICE = 'OFFICE',
  WAREHOUSE = 'WAREHOUSE'
}

export enum MaintenanceStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum MaintenancePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum ExpenseCategory {
  REPAIR = 'REPAIR',
  TAX = 'TAX',
  UTILITY = 'UTILITY',
  SALARY = 'SALARY',
  INSURANCE = 'INSURANCE',
  OTHER = 'OTHER'
}

export enum UnitStatus {
  VACANT = 'VACANT',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  status: UnitStatus;
  tenantName?: string;
  tenantId?: string;
  tenantPhone?: string;
  tenantEmail?: string;
  monthlyRent: number;
  lastMaintenanceDate?: string;
}

export interface MaintenanceTicket {
  id: string;
  propertyId: string;
  unitId?: string;
  tenantId: string;
  title: string;
  description: string;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
  createdAt: string;
  updatedAt: string;
  photos?: string[];
}

export interface Expense {
  id: string;
  propertyId: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
}

export interface DashboardStats {
  occupancyRate: number;
  collectionEfficiency: number;
  totalExpected: number;
  totalCollected: number;
  totalPending: number;
  totalOverdue: number;
  activeTenancies: number;
}

export interface RevenueTrend {
  month: string;
  expected: number;
  collected: number;
}

export interface User {
  id: string;
  name: string;
  mobileNumber: string;
  email?: string;
  userType: UserType;
  isVerified: boolean;
  profilePhoto?: string;
}

export interface Payment {
  id: string;
  tenancyId: string;
  tenantId: string;
  propertyId: string;
  paymentForMonth: string;
  rentAmount: number;
  lateFee: number;
  discount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: string;
  transactionId?: string;
  receiptNumber?: string;
  receiptUrl?: string;
  paymentLink?: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  UPI = 'UPI',
  CASH = 'CASH',
  CHEQUE = 'CHEQUE',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export interface Property {
  id: string;
  propertyName: string;
  propertyType: PropertyType;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  totalUnits: number;
  propertyCode: string;
  status: PropertyStatus;
  gstApplicable: boolean;
}

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}
