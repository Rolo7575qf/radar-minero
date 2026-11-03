import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  colorScheme?: 'amber' | 'cyan' | 'emerald' | 'rose' | 'indigo';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive,
  colorScheme = 'amber',
}) => {
  const colorBorders = {
    amber: 'border-amber-500/20 hover:border-amber-500/40 text-amber-400',
    cyan: 'border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400',
    emerald: 'border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400',
    rose: 'border-rose-500/20 hover:border-rose-500/40 text-rose-400',
    indigo: 'border-indigo-500/20 hover:border-indigo-500/40 text-indigo-400',
  };

  const bgIcons = {
    amber: 'bg-amber-500/10 text-amber-400',
    cyan: 'bg-cyan-500/10 text-cyan-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    rose: 'bg-rose-500/10 text-rose-400',
    indigo: 'bg-indigo-500/10 text-indigo-400',
  };

  return (
    <div
      className={`bg-slate-900/90 backdrop-blur border rounded-xl p-5 transition-all shadow-lg ${colorBorders[colorScheme]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {value}
            </span>
            {trend && (
              <span
                className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                  trendPositive ? 'bg-emerald-950/80 text-emerald-400' : 'bg-rose-950/80 text-rose-400'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${bgIcons[colorScheme]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
