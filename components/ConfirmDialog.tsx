
import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
  loading = false,
}) => {
  const variantStyles = {
    danger: {
      btn: 'bg-rose-600 hover:bg-rose-700 shadow-rose-100',
      icon: <AlertCircle className="text-rose-500 shrink-0" size={28} />
    },
    warning: {
      btn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-100',
      icon: <AlertTriangle className="text-amber-500 shrink-0" size={28} />
    },
    info: {
      btn: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100',
      icon: <Info className="text-indigo-500 shrink-0" size={28} />
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          {variantStyles[variant].icon}
          <p className="text-slate-600 leading-relaxed font-medium">{message}</p>
        </div>

        <div className="flex space-x-3 justify-end pt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 text-slate-600 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-3 text-white rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 ${variantStyles[variant].btn}`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            ) : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};
