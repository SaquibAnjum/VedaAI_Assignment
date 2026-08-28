import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorTheme?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple';
  trend?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorTheme = 'indigo',
}) => {
  const themeStyles = {
    indigo: {
      bg: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20',
      iconBg: 'bg-indigo-500/20 text-indigo-400',
      valueColor: 'text-indigo-300',
    },
    emerald: {
      bg: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
      valueColor: 'text-emerald-300',
    },
    amber: {
      bg: 'from-amber-500/10 to-amber-600/5 border-amber-500/20',
      iconBg: 'bg-amber-500/20 text-amber-400',
      valueColor: 'text-amber-300',
    },
    rose: {
      bg: 'from-rose-500/10 to-rose-600/5 border-rose-500/20',
      iconBg: 'bg-rose-500/20 text-rose-400',
      valueColor: 'text-rose-300',
    },
    purple: {
      bg: 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
      iconBg: 'bg-purple-500/20 text-purple-400',
      valueColor: 'text-purple-300',
    },
  };

  const style = themeStyles[colorTheme];

  return (
    <div className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${style.bg} p-4 backdrop-blur-md transition-all duration-300 hover:border-opacity-40 hover:shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <p className={`mt-1 text-2xl font-bold tracking-tight ${style.valueColor}`}>{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className={`rounded-lg p-3 ${style.iconBg}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
};
