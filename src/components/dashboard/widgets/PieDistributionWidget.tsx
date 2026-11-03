import React from 'react';
import { MiningProject } from '../../../types/project';
import { DimensionType } from '../../../types/dashboard';

interface PieDistributionWidgetProps {
  projects: MiningProject[];
  dimension?: DimensionType;
}

export const PieDistributionWidget: React.FC<PieDistributionWidgetProps> = ({
  projects,
  dimension = 'mineral',
}) => {
  // Contamos según la dimensión
  const counts: Record<string, number> = {};
  const capexMap: Record<string, number> = {};

  projects.forEach((p) => {
    let key = 'Otros';
    if (dimension === 'country') key = p.country;
    else if (dimension === 'mineral') key = p.mainMineral;
    else if (dimension === 'project_type') key = p.projectType;

    counts[key] = (counts[key] || 0) + 1;
    capexMap[key] = (capexMap[key] || 0) + (p.capexEstimatedMillionsUSD || 0);
  });

  const total = projects.length || 1;
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  const colors = [
    'bg-amber-500 text-amber-400',
    'bg-cyan-500 text-cyan-400',
    'bg-emerald-500 text-emerald-400',
    'bg-rose-500 text-rose-400',
    'bg-indigo-500 text-indigo-400',
    'bg-purple-500 text-purple-400',
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-2.5">
        {entries.map(([label, count], idx) => {
          const percent = Math.round((count / total) * 100);
          const colorClass = colors[idx % colors.length];
          const bgBar = colorClass.split(' ')[0];
          const textColor = colorClass.split(' ')[1];
          const capex = capexMap[label] || 0;

          return (
            <div key={label} className="p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-200 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${bgBar}`} />
                  {label}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  <strong className={textColor}>{count}</strong> ({percent}%) · US$ {(capex / 1000).toFixed(1)}B
                </span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                <div
                  style={{ width: `${percent}%` }}
                  className={`h-full rounded-full ${bgBar} transition-all duration-500`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
