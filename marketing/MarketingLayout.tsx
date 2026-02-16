
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

interface MarketingLayoutProps {
  isAuthenticated: boolean;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({ isAuthenticated }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header isAuthenticated={isAuthenticated} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
