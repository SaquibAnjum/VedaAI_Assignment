import React from 'react';
import type { EvaluationStatus } from '../../types';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: EvaluationStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  switch (status) {
    case 'Answered':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${sizeClasses[size]}`}
        >
          <CheckCircle2 size={iconSizes[size]} className="text-emerald-400" />
          Answered
        </span>
      );

    case 'Out of Order':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 ${sizeClasses[size]}`}
        >
          <AlertTriangle size={iconSizes[size]} className="text-amber-400 animate-pulse" />
          Out of Order
        </span>
      );

    case 'Unanswered':
      return (
        <span
          className={`inline-flex items-center rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 ${sizeClasses[size]}`}
        >
          <XCircle size={iconSizes[size]} className="text-rose-400" />
          Unanswered
        </span>
      );

    default:
      return null;
  }
};
