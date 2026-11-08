import React from 'react';
import { MiningProject } from '../../../types/project';
import { Badge } from '../../common/Badge';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface CapexTableWidgetProps {
  projects: MiningProject[];
  onSelectProject?: (project: MiningProject) => void;
  onViewAllProjects?: () => void;
}

export const CapexTableWidget: React.FC<CapexTableWidgetProps> = ({
  projects,
  onSelectProject,
  onViewAllProjects,
}) => {
  const sortedProjects = [...projects]
    .sort((a, b) => (b.capexEstimatedMillionsUSD || 0) - (a.capexEstimatedMillionsUSD || 0))
    .slice(0, 6);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
              <th className="pb-2.5">Proyecto & Titular</th>
              <th className="pb-2.5">País / Región</th>
              <th className="pb-2.5">Mineral</th>
              <th className="pb-2.5">Etapa Actual</th>
              <th className="pb-2.5 text-right">CAPEX Estimado</th>
              <th className="pb-2.5 text-center">Señales</th>
              <th className="pb-2.5 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {sortedProjects.map((p) => (
              <tr
                key={p.id}
                onClick={() => onSelectProject && onSelectProject(p)}
                className="hover:bg-slate-800/50 cursor-pointer group transition-colors"
              >
                <td className="py-2.5 pr-3">
                  <div className="font-bold text-slate-200 group-hover:text-amber-400 transition">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {p.ownerCompany}
                  </div>
                </td>
                <td className="py-2.5 pr-3 text-slate-300">
                  <span className="font-semibold">{p.country}</span>
                  <div className="text-[10px] text-slate-400">{p.region}</div>
                </td>
                <td className="py-2.5 pr-3">
                  <Badge variant={p.mainMineral === 'Litio' ? 'cyan' : p.mainMineral?.toLowerCase().includes('tierras raras') ? 'purple' : 'amber'} size="sm">
                    {p.mainMineral}
                  </Badge>
                </td>
                <td className="py-2.5 pr-3 text-slate-300">
                  <span className="text-[11px] font-mono">{p.stage}</span>
                </td>
                <td className="py-2.5 pr-3 text-right font-mono font-bold text-amber-400">
                  US$ {p.capexEstimatedMillionsUSD?.toLocaleString()}M
                </td>
                <td className="py-2.5 pr-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                    {p.signalsCount}
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  <button className="text-slate-400 group-hover:text-white p-1 hover:bg-slate-800 rounded transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onViewAllProjects && (
        <div className="pt-2 text-right">
          <button
            onClick={onViewAllProjects}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
          >
            Ver todos los proyectos ({projects.length}) →
          </button>
        </div>
      )}
    </div>
  );
};
