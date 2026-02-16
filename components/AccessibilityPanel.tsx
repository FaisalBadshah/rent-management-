
import React from 'react';
import { Type, Eye, X, Settings2 } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export const AccessibilityPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { fontSize, setFontSize, contrast, setContrast } = useAccessibility();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[300] flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] w-full sm:max-w-md p-8 shadow-2xl animate-in slide-in-from-bottom-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Settings2 size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Display Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-8">
          {/* Font Size */}
          <div>
            <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              <Type className="mr-2" size={16} />
              Text Size
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { value: 'normal', label: 'Normal' },
                { value: 'large', label: 'Large (A+)' },
                { value: 'xlarge', label: 'Extra Large (A++)' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFontSize(option.value as any)}
                  className={`w-full px-5 py-3.5 rounded-2xl border-2 text-left transition-all font-bold ${
                    fontSize === option.value
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contrast */}
          <div>
            <label className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              <Eye className="mr-2" size={16} />
              Contrast Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'normal', label: 'Standard' },
                { value: 'high', label: 'High' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setContrast(option.value as any)}
                  className={`w-full px-5 py-3.5 rounded-2xl border-2 text-center transition-all font-bold ${
                    contrast === option.value
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Preferences saved to your browser
        </p>
      </div>
    </div>
  );
};
