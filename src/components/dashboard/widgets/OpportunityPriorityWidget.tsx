import React from 'react';
import { getHorizon, monthsUntil } from '../../../services/horizon';
import { CommercialOpportunity, OpportunityPriority } from '../../../types/opportunity';
import { Badge } from '../../common/Badge';
import { Target, ArrowUpRight, UserCheck, ShieldAlert } from 'lucide-react';

interface OpportunityPriorityWidgetProps {
  opportunities: CommercialOpportunity[];
  onSelectOpportunity?: (opp: CommercialOpportunity) => void;
  onViewAllOpps?: () => void;
}

export const OpportunityPriorityWidget: React.FC<OpportunityPriorityWidgetProps> = ({
  opportunities,
  onSelectOpportunity,
  onViewAllOpps,
}) => {
  const priorityColors: Record<string, { border: string; bg: string; text: string }> = {
    'Máxima': { border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', text: 'text-emerald-400' },
    'Critica': { border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', text: 'text-emerald-400' },
    'Crítica': { border: 'border-emerald-500/50', bg: 'bg-emerald-950/40', text: 'text-emerald-400' },
    'Alta': { border: 'border-amber-500/50', bg: 'bg-amber-950/40', text: 'text-amber-400' },
    'Media': { border: 'border-cyan-500/50', bg: 'bg-cyan-950/40', text: 'text-cyan-400' },
    'Baja-media': { border: 'border-slate-700', bg: 'bg-slate-900/40', text: 'text-slate-400' },
  };

  const DEFAULT_CFG = { border: 'border-slate-700', bg: 'bg-slate-900/40', text: 'text-slate-400' };

  const priorityCounts: Record<OpportunityPriority, number> = {
    'Máxima': opportunities.filter(o => o.priority === 'Máxima' || o.priority === ('Critica' as any) || o.priority === ('Crítica' as any)).length,
    'Alta': opportunities.filter(o => o.priority === 'Alta').length,
    'Media': opportunities.filter(o => o.priority === 'Media').length,
    'Baja-media': opportunities.filter(o => o.priority === 'Baja-media').length,
  };

  const topOpportunities = [...opportunities]
    .sort((a, b) => b.scoring.totalScore - a.scoring.totalScore)
    .slice(0, 4);

  return (
    <div className="flex flex-col h-full space-y-3.5">
      {/* Resumen en 4 bloques de prioridad */}
      <div className="grid grid-cols-4 gap-2">
        {(['Máxima', 'Alta', 'Media', 'Baja-media'] as OpportunityPriority[]).map((p) => {
          const cfg = priorityColors[p] || DEFAULT_CFG;
          return (
            <div
              key={p}
              className={`p-2 rounded-xl border ${cfg.border} ${cfg.bg} text-center`}
            >
              <div className={`text-base font-extrabold font-mono ${cfg.text}`}>
                {priorityCounts[p]}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter truncate">
                {p}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lista de las mejores oportunidades comerciales */}
      <div className="space-y-2.5 overflow-y-auto max-h-[290px] pr-1">
        {topOpportunities.map((opp) => {
          const cfg = priorityColors[opp.priority] || DEFAULT_CFG;
          return (
            <div
              key={opp.id}
              onClick={() => onSelectOpportunity && onSelectOpportunity(opp)}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition truncate">
                  {opp.title}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-xs font-extrabold font-mono px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                    {opp.scoring.totalScore} pts
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-amber-300/80 font-medium mt-1 truncate">
                🏢 {opp.targetCompany} · <span className="text-slate-400">{opp.relatedProjectName}</span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                  {opp.keyDecisionMakers.length} decisores mapeados
                </span>
                <span className="text-slate-400">
                  Ventana: <strong className="text-amber-400">{monthsUntil(opp.targetRfqDate, opp.anticipationWindowMonths)} meses · {getHorizon(monthsUntil(opp.targetRfqDate, opp.anticipationWindowMonths)).label}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {onViewAllOpps && (
        <button
          onClick={onViewAllOpps}
          className="w-full py-2 text-xs font-semibold text-center text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/40 rounded-xl transition"
        >
          Explorar Tablero Kanban de Oportunidades ({opportunities.length}) →
        </button>
      )}
    </div>
  );
};
