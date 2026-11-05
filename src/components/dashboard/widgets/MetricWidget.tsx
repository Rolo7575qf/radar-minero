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
  let chipText = '';
  const DAY = 86400000;
  const within30 = (d?: string) => {
    const t = d ? Date.parse(d) : NaN;
    return !isNaN(t) && Date.now() - t <= 30 * DAY;
  };

  if (widget.metric === 'project_count') {
    displayValue = projects.length;
    const totalCapex = projects.reduce((acc, p) => acc + (p.capexEstimatedMillionsUSD || 0), 0);
    subtitle = `CAPEX declarado acumulado: US$ ${(totalCapex / 1000).toFixed(1)} mil millones`;
    chipText = `${projects.filter(p => within30(p.lastUpdateDate)).length} actualizados en 30 días`;
    Icon = Pickaxe;
  } else if (widget.metric === 'signal_count') {
    const recent = signals.filter(sg => within30(sg.publishedDate));
    displayValue = recent.length;
    subtitle = 'Señales publicadas en fuentes oficiales y prensa en los últimos 30 días (la huella histórica llega a 3 años)';
    chipText = `${recent.filter(sg => sg.relevance === 'Crítica' || sg.relevance === 'Alta').length} de relevancia alta o crítica`;
    Icon = Radio;
  } else if (widget.metric === 'opportunity_count') {
    const highPriorities = opportunities.filter(o => o.priority === 'Máxima' || o.priority === 'Alta');
    displayValue = highPriorities.length;
    const withDm = opportunities.filter(o => (o.keyDecisionMakers || []).length > 0).length;
    subtitle = `${opportunities.length} oportunidades en total`;
    chipText = `${withDm} de ${opportunities.length} con decisores mapeados`;
    Icon = Target;
  } else if (widget.metric === 'total_capex') {
    const total = projects.reduce((acc, p) => acc + (p.capexEstimatedMillionsUSD || 0), 0);
    displayValue = `US$ ${(total / 1000).toFixed(1)}B`;
    const withCapex = projects.filter(p => (p.capexEstimatedMillionsUSD || 0) > 0).length;
    subtitle = `Promedio: US$ ${(total / (withCapex || 1)).toFixed(0)}M por proyecto con CAPEX declarado`;
    chipText = `${withCapex} de ${projects.length} con CAPEX declarado`;
    Icon = DollarSign;
  } else {
    displayValue = projects.length;
    subtitle = 'Cartera activa';
  }

  // Iconografía IC: línea fina amarilla, sin rellenos
  const iconColors = {
    amber: 'text-amber-400 border border-amber-400/40',
    cyan: 'text-amber-400 border border-amber-400/40',
    emerald: 'text-amber-400 border border-amber-400/40',
    rose: 'text-rose-400 border border-rose-400/40',
    indigo: 'text-amber-400 border border-amber-400/40',
  };

  const scheme = widget.colorScheme || 'amber';

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-baseline gap-3">
          <span className="ic-display text-[40px] sm:text-[48px] text-amber-400 leading-none">
            {displayValue}
          </span>
          {chipText && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {chipText}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          {subtitle}
        </p>
      </div>
      <div className={`p-3 rounded-[10px] ${iconColors[scheme]}`}>
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
    </div>
  );
};
