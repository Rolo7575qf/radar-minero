import React from 'react';
import { DashboardWidget } from '../../../types/dashboard';
import { MiningProject } from '../../../types/project';
import { EarlySignal } from '../../../types/signal';
import { CommercialOpportunity } from '../../../types/opportunity';
import { TrendingUp, Pickaxe, Radio, Target, DollarSign } from 'lucide-react';

interface MetricWidgetProps {
  widget: DashboardWidget;
  projects: MiningProject[];
  signals: EarlySignal[];
  opportunities: CommercialOpportunity[];
}

export const MetricWidget: React.FC<MetricWidgetProps> = ({
  widget,
  projects,
  signals,
  opportunities,
}) => {
  let displayValue: string | number = 0;
  let subtitle = '';
  let Icon = TrendingUp;
  let trendText = '+12% vs mes anterior';

  if (widget.metric === 'project_count') {
    displayValue = projects.length;
    const totalCapex = projects.reduce((acc, p) => acc + (p.capexEstimatedMillionsUSD || 0), 0);
    subtitle = `CAPEX total acumulado: US$ ${(totalCapex / 1000).toFixed(1)} mil millones`;
    Icon = Pickaxe;
  } else if (widget.metric === 'signal_count') {
    displayValue = signals.length;
    subtitle = 'Señales ambientales, inversión y contratación activas';
    Icon = Radio;
  } else if (widget.metric === 'opportunity_count') {
    const highPriorities = opportunities.filter(o => o.priority === 'Máxima' || o.priority === 'Alta');
    displayValue = highPriorities.length;
    subtitle = `${opportunities.length} oportunidades totales mapeadas con decisores`;
    Icon = Target;
  } else if (widget.metric === 'total_capex') {
    const total = projects.reduce((acc, p) => acc + (p.capexEstimatedMillionsUSD || 0), 0);
    displayValue = `US$ ${(total / 1000).toFixed(1)}B`;
    subtitle = `Promedio: US$ ${(total / (projects.length || 1)).toFixed(0)}M por proyecto`;
    Icon = DollarSign;
  } else {
    displayValue = projects.length;
    subtitle = 'Cartera activa';
  }

  const iconColors = {
    amber: 'text-amber-400 bg-amber-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
    rose: 'text-rose-400 bg-rose-500/10',
    indigo: 'text-indigo-400 bg-indigo-500/10',
  };

  const scheme = widget.colorScheme || 'amber';

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
            {displayValue}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
            {trendText}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2 font-medium">
          {subtitle}
        </p>
      </div>
      <div className={`p-3.5 rounded-2xl ${iconColors[scheme]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
