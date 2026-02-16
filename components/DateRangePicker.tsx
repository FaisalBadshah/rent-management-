
import React from 'react';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  label?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-bold text-slate-700">
          {label}
        </label>
      )}

      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
        <div className="flex-1 relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <ArrowRight size={14} className="text-slate-400 shrink-0" />

        <div className="flex-1 relative">
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            min={startDate}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};
