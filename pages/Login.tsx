
import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, User as UserIcon, Building2 } from 'lucide-react';
import { User, UserType } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserType>(UserType.OWNER);

  // Auto-focus first OTP input when moving to OTP step
  useEffect(() => {
    if (step === 'otp') {
      document.getElementById('otp-0')?.focus();
    }
  }, [step]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) return;
    
    setIsLoading(true);
    // Simulate real-world OTP sending delay
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate verification logic
    setTimeout(() => {
      const mockUser: User = {
        id: selectedRole === UserType.OWNER ? 'owner_1' : 'tenant_1',
        name: selectedRole === UserType.OWNER ? 'Rajesh Kumar (Owner)' : 'Rahul Sharma (Tenant)',
        mobileNumber: `+91${mobileNumber || '9876543210'}`,
        userType: selectedRole,
        isVerified: true
      };
      onLogin(mockUser);
    }, 1000);
  };

  // Helper for quick testing
  const quickLogin = (role: UserType) => {
    setIsLoading(true);
    setSelectedRole(role);
    setTimeout(() => {
      const mockUser: User = {
        id: role === UserType.OWNER ? 'owner_1' : 'tenant_1',
        name: role === UserType.OWNER ? 'Rajesh Kumar (Owner)' : 'Rahul Sharma (Tenant)',
        mobileNumber: role === UserType.OWNER ? '+919876543210' : '+919988776655',
        userType: role,
        isVerified: true
      };
      onLogin(mockUser);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl mb-6 shadow-xl shadow-indigo-100">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">RentFlow</h1>
          <p className="text-slate-500 font-medium">Smart Rent Management for India</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          {/* Header Progress */}
          <div className="flex border-b border-slate-50">
            <div className={`flex-1 h-1.5 transition-colors ${step === 'phone' ? 'bg-indigo-600' : 'bg-emerald-500'}`}></div>
            <div className={`flex-1 h-1.5 transition-colors ${step === 'otp' ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
          </div>

          <div className="p-8">
            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
              <button 
                type="button"
                onClick={() => setSelectedRole(UserType.OWNER)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${selectedRole === UserType.OWNER ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
              >
                <Building2 className="w-3.5 h-3.5" />
                OWNER
              </button>
              <button 
                type="button"
                onClick={() => setSelectedRole(UserType.TENANT)}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${selectedRole === UserType.TENANT ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                TENANT
              </button>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 font-semibold border-r border-slate-200 mr-4 pr-4">
                      +91
                    </div>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-20 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-lg tracking-wider"
                      placeholder="9876543210"
                    />
                  </div>
                  <p className="mt-2 text-[10px] text-slate-400">We'll send a 6-digit OTP to verify your identity.</p>
                </div>

                <button
                  type="submit"
                  disabled={mobileNumber.length !== 10 || isLoading}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center transition-all shadow-lg shadow-indigo-100 group"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">Verification Code</label>
                    <button type="button" onClick={() => setStep('phone')} className="text-xs font-bold text-indigo-600 hover:underline">Edit Number</button>
                  </div>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && i > 0) {
                            document.getElementById(`otp-${i-1}`)?.focus();
                          }
                        }}
                        className="w-full h-12 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={otp.some(d => !d) || isLoading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center transition-all shadow-lg shadow-emerald-100 group"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Verify & Login
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick Test Login Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Test Access</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={() => quickLogin(UserType.OWNER)}
                  className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-xs font-bold transition-colors border border-indigo-100 flex items-center justify-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Test Owner
                </button>
                <button 
                  type="button"
                  onClick={() => quickLogin(UserType.TENANT)}
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl text-xs font-bold transition-colors border border-emerald-100 flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  Test Tenant
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-center text-xs text-slate-400">
          By continuing, you agree to RentFlow's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
