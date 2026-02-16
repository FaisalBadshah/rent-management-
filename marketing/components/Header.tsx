
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';
import { UserType, User } from '../../types';

interface HeaderProps {
  isAuthenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const storedUser = localStorage.getItem('rentflow_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTenant = user?.userType === UserType.TENANT;

  const navLinks = isTenant ? [
    { name: 'My Rental', href: '/tenant' },
    { name: 'Support', href: '#' },
    { name: 'How It Works', href: '/how-it-works' },
  ] : [
    { name: 'For Owners', href: '/for-owners' },
    { name: 'For Tenants', href: '/for-tenants' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <Building2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">RentFlow</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button 
              onClick={() => navigate(isTenant ? '/tenant' : '/app')} 
              className="hidden sm:flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              {isTenant ? 'Tenant Portal' : 'Owner Dashboard'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <>
              <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-700 hover:text-indigo-600">
                Log In
              </Link>
              <button 
                onClick={() => navigate('/login')} 
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Get Started
              </button>
            </>
          )}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-lg font-bold text-slate-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <hr className="border-slate-100 my-2" />
            <Link 
              to="/login" 
              className="text-lg font-bold text-indigo-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {isAuthenticated ? (isTenant ? 'Tenant Portal' : 'Owner Dashboard') : 'Login / Sign Up'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
