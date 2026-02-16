
import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  className = '',
  variant = 'rectangular',
}) => {
  const baseClasses = 'animate-pulse bg-slate-200';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 space-y-4 shadow-sm">
    <Skeleton height="48px" width="48px" variant="rectangular" className="rounded-xl" />
    <Skeleton height="24px" width="60%" />
    <Skeleton height="16px" width="100%" />
    <div className="flex space-x-4 mt-4">
      <Skeleton height="40px" width="100px" />
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-4">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex space-x-4 px-6 py-4 border-b border-slate-50 last:border-0">
        <Skeleton width="40%" height="20px" />
        <Skeleton width="30%" height="20px" />
        <Skeleton width="30%" height="20px" />
      </div>
    ))}
  </div>
);
