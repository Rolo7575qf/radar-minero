import React from 'react';
import { MiningProject, MiningStage } from '../../../types/project';

interface StageFunnelWidgetProps {
  projects: MiningProject[];
  onSelectStage?: (stage: string) => void;
}

export const StageFunnelWidget: React.FC<StageFunnelWidgetProps> = ({ projects, onSelectStage }) => {
  // Las 14 etapas estandarizadas del prompt maestro
  const ALL_STAGES: MiningStage[] = [
    '1. Exploración',
    '2. Exploración avanzada',
    '3. Conceptual',
    '4. Prefactibilidad',
    '5. Factibilidad',
    '6. Ingeniería básica',
    '7. Ingeniería de detalle',
    '8. Permisos y aprobaciones',
    '9. Decisión de inversión',
    '10. Contratación',
    '11. Construcción',
    '12. Puesta en marcha',
    '13. Operación',
    '14. Expansión o modificación',
  ];

  // Calculamos cantidad de proyectos y CAPEX por etapa
  const stageStats = ALL_STAGES.map((st) => {
    const matched = projects.filter((p) => p.stage === st);
    const totalCapex = matched.reduce((sum, p) => sum + (p.capexEstimatedMillionsUSD || 0), 0);
    return {
      stage: st,
      count: matched.length,
      capex: totalCapex,
      projects: matched,
    };
  }).filter((st) => st.count > 0); // Mostramos las que tienen proyectos actualmente

  const maxCount = Math.max(...stageStats.map((s) => s.count), 1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
        <span>Etapa de Desarrollo</span>
        <span>Proyectos / CAPEX (M USD)</span>
      </div>

      <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
        {stageStats.map(({ stage, count, capex, projects: stageProjects }) => {
          const widthPercent = Math.max((count / maxCount) * 100, 15);
          const isCriticalStage =
            stage.includes('Contratación') ||
            stage.includes('Ingeniería de detalle') ||
            stage.includes('Construcción') ||
            stage.includes('Permisos');

          return (
            <div
              key={stage}
              onClick={() => onSelectStage && onSelectStage(stage)}
              className="group cursor-pointer p-2 rounded-lg hover:bg-slate-800/60 transition"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200 group-hover:text-amber-400 transition truncate pr-2">
                  {stage}
                </span>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  <strong className="text-white">{count}</strong> ({count === 1 ? 'proyecto' : 'proyectos'}) · <span className="text-amber-400 font-semibold">US$ {capex.toLocaleString()}M</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden flex">
                <div
                  style={{ width: `${widthPercent}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCriticalStage
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-500'
                  }`}
                />
              </div>

              {/* Badges of projects in this stage */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {stageProjects.map((p) => (
                  <span
                    key={p.id}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                  >
                    {p.name.split('(')[0].trim()}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
