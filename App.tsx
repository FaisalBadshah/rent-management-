
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Onboarding from './pages/Onboarding';
import TenantHome from './pages/TenantHome';
import TenantProfile from './pages/TenantProfile';
import Maintenance from './pages/Maintenance';
import Expenses from './pages/Expenses';
import PropertyUnits from './pages/PropertyUnits';
import PropertyDetail from './pages/PropertyDetail';
import Login from './pages/Login';
import Layout from './components/Layout';
import MarketingLayout from './marketing/MarketingLayout';
import HomePage from './marketing/pages/HomePage';
import PricingPage from './marketing/pages/PricingPage';
import HowItWorksPage from './marketing/pages/HowItWorksPage';
import ForOwnersPage from './marketing/pages/ForOwnersPage';
import ForTenantsPage from './marketing/pages/ForTenantsPage';
import TenantPaymentPage from './tenant/pages/PaymentPage';
import { ToastProvider } from './components/Toast';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { User, UserType } from './types';
import { Settings2 } from 'lucide-react';

const SmartRouter: React.FC<{ user: User | null; onLogout: () => void; handleLogin: (u: User) => void }> = ({ user, onLogout, handleLogin }) => {
  const location = useLocation();
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const needsOnboarding = user?.userType === UserType.OWNER && !localStorage.getItem('onboarding_complete');

  return (
    <>
      <Routes>
        {/* TENANT PUBLIC UTILITY ROUTES - NO MARKETING */}
        <Route path="/pay/:paymentCode" element={<TenantPaymentPage />} />
        <Route path="/rent/:paymentCode" element={<TenantPaymentPage />} />

        {/* MARKETING ROUTES */}
        <Route element={<MarketingLayout isAuthenticated={!!user} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/for-owners" element={<ForOwnersPage />} />
          <Route path="/for-tenants" element={<ForTenantsPage />} />
        </Route>

        <Route 
          path="/login" 
          element={user ? <Navigate to="/app" /> : <Login onLogin={handleLogin} />} 
        />
        
        <Route 
          path="/onboarding" 
          element={user ? <Onboarding /> : <Navigate to="/login" />} 
        />
        
        <Route element={user ? <Layout user={user} onLogout={onLogout} /> : <Navigate to="/login" />}>
          <Route path="/app" element={
            user?.userType === UserType.TENANT 
              ? <Navigate to="/tenant" /> 
              : needsOnboarding 
                ? <Navigate to="/onboarding" /> 
                : <Dashboard />
          } />
          
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:propertyId" element={<PropertyDetail />} />
          <Route path="/properties/:propertyId/units" element={<PropertyUnits />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<TenantProfile />} />
          <Route path="/tenant" element={<TenantHome />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global Accessibility Trigger */}
      <button 
        onClick={() => setIsAccessibilityOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white text-slate-700 rounded-full shadow-2xl border border-slate-100 flex items-center justify-center hover:scale-110 transition-transform z-[250]"
        aria-label="Open display settings"
      >
        <Settings2 size={24} />
      </button>

      <AccessibilityPanel 
        isOpen={isAccessibilityOpen} 
        onClose={() => setIsAccessibilityOpen(false)} 
      />
    </>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('rentflow_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('rentflow_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rentflow_user');
    localStorage.removeItem('onboarding_complete');
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <AccessibilityProvider>
      <ToastProvider>
        <Router>
          <SmartRouter user={user} onLogout={handleLogout} handleLogin={handleLogin} />
        </Router>
      </ToastProvider>
    </AccessibilityProvider>
  );
};

export default App;
