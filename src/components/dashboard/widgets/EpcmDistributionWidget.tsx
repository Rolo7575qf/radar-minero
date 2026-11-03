import React from 'react';
import { MiningProject } from '../../../types/project';
import { MiningCompany } from '../../../types/company';
import { Building2, ArrowUpRight } from 'lucide-react';

interface EpcmDistributionWidgetProps {
  projects: MiningProject[];
  companies: MiningCompany[];
  onSelectCompany?: (company: MiningCompany) => void;
}

export const EpcmDistributionWidget: React.FC<EpcmDistributionWidgetProps> = ({
  projects,
  companies,
  onSelectCompany,
}) => {
  const epcmCompanies = companies.filter(
    (c) => c.primaryRole === 'EPCM' || c.supportedRoles.includes('EPCM') || c.primaryRole === 'Empresa de Ingeniería'
  );

  return (
    <div className="space-y-3">
      <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
        {epcmCompanies.map((c) => {
          const associatedProjects = projects.filter(
            (p) => p.epcmCompany?.includes(c.name) || c.relatedProjectIds.includes(p.id)
          );

          return (
            <div
              key={c.id}
              onClick={() => onSelectCompany && onSelectCompany(c)}
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/80 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition">
                      {c.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {c.countryOrigin} · {c.tier}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {associatedProjects.length} proyectos
                  </span>
                  <div className="text-[10px] text-slate-500">
                    {c.keyContacts.length} decisores mapeados
                  </div>
                </div>
              </div>

              {associatedProjects.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {associatedProjects.map((p) => (
                    <span
                      key={p.id}
                      className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium"
                    >
                      {p.name.split('(')[0].trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
