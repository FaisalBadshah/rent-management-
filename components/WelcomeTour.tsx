
import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export interface TourStep {
  title: string;
  description: string;
  action?: string;
}

interface WelcomeTourProps {
  steps: TourStep[];
  onComplete: () => void;
}

export const WelcomeTour: React.FC<WelcomeTourProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-500" onClick={onComplete} />

      {/* Tour Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
              <Sparkles className="text-indigo-600" size={24} />
            </div>
            <button
              onClick={onComplete}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              {currentStepData.title}
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {currentStepData.description}
            </p>
          </div>

          {currentStepData.action && (
            <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
              <div className="mt-1">💡</div>
              <p className="text-sm text-indigo-700 font-semibold leading-relaxed">
                <span className="opacity-60 block text-[10px] uppercase tracking-wider mb-1">Try this:</span>
                {currentStepData.action}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            <div className="flex gap-1.5">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'w-6 bg-indigo-600' : 'w-1.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {!isFirstStep && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2.5 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors flex items-center text-sm"
                >
                  <ArrowLeft size={16} className="mr-1.5" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center text-sm"
              >
                {isLastStep ? 'Get Started' : 'Next'}
                {!isLastStep && <ArrowRight size={16} className="ml-1.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
