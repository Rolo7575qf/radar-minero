import React from 'react';
import { MiningCompany } from '../../types/company';
import { Badge } from '../common/Badge';
import {
  X,
  ExternalLink,
  Building2,
  Briefcase,
  Users,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface CompanyDetailModalProps {
  company: MiningCompany | null;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  onClose,
  onOpenProject,
}) => {
  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between bg-slate-950/70">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="indigo" size="md">
                {company.primaryRole}
              </Badge>
              <span className="text-xs font-mono font-semibold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                {company.countryOrigin}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {company.tier}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-white">
              {company.name}
            </h2>

            {company.legalName && (
              <p className="text-xs text-slate-400 font-mono">
                Razón Social: {company.legalName}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Descripción general */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Perfil & Capacidad en la Industria
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              {company.description}
            </p>
          </div>

          {/* Roles desempeñados */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Roles y Capacidades en Proyectos:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {company.supportedRoles.map((role, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Contratos conocidos y alcance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-amber-400" />
              <span>Contratos Identificados & Participación en Proyectos</span>
            </h3>

            <div className="space-y-2.5">
              {company.contracts.map((cnt) => (
                <div
                  key={cnt.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      onClick={() => onOpenProject && onOpenProject(cnt.projectId)}
                      className="font-bold text-amber-400 hover:underline cursor-pointer"
                    >
                      {cnt.projectName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {cnt.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-slate-400">Alcance:</strong> {cnt.scope}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                    <span>Fuente: {cnt.source}</span>
                    {cnt.estimatedValueUSD && (
                      <span className="text-amber-400 font-bold">
                        Valor est.: US$ {(cnt.estimatedValueUSD / 1000000).toFixed(1)}M
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tomadores de decisiones clave (Contactos de Adquisiciones y Proyectos) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Tomadores de Decisión & Contactos Clave Identificados</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {company.keyContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">
                      {contact.name}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      {contact.influenceLevel}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-300 font-medium">
                    {contact.role}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {contact.department}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Sitio Web Corporativo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
