
import { DashboardStats, RevenueTrend, PaymentStatus } from '../types';

export const getMockDashboardStats = (): DashboardStats => {
  return {
    occupancyRate: 87.5,
    collectionEfficiency: 82.3,
    totalExpected: 720000,
    totalCollected: 592500,
    totalPending: 127500,
    totalOverdue: 42000,
    activeTenancies: 38
  };
};

export const getMockRevenueTrends = (): RevenueTrend[] => {
  return [
    { month: 'Sep', expected: 450000, collected: 430000 },
    { month: 'Oct', expected: 450000, collected: 410000 },
    { month: 'Nov', expected: 520000, collected: 490000 },
    { month: 'Dec', expected: 520000, collected: 480000 },
    { month: 'Jan', expected: 680000, collected: 610000 },
    { month: 'Feb', expected: 720000, collected: 592500 },
  ];
};

export const getPropertyPerformance = () => {
  return [
    { name: 'Palm Heights', units: 12, occupied: 11, collection: 92 },
    { name: 'Global Office Park', units: 4, occupied: 2, collection: 50 },
    { name: 'Market Square', units: 24, occupied: 20, collection: 88 },
  ];
};
