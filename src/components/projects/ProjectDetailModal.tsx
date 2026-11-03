import React from 'react';
import { MiningProject } from '../../types/project';
import { Badge } from '../common/Badge';
import {
  X,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Layers,
  Building2,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: MiningProject | null;
  onClose: () => void;
  onSelectCompanyByName?: (name: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectCompanyByName,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-start justify-between bg-slate-950/70">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={project.mainMineral === 'Litio' ? 'cyan' : 'amber'} size="md">
                {project.mainMineral}
              </Badge>
              <span className="text-xs font-mono font-semibold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                {project.country} · {project.region}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                {project.currentStatus}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {project.projectType}
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-white">
              {project.name}
            </h2>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Titular: <strong className="text-slate-200">{project.ownerCompany}</strong></span>
              {project.associatedCompanies && project.associatedCompanies.length > 0 && (
                <span className="text-slate-500">
                  (Socios: {project.associatedCompanies.join(', ')})
                </span>
              )}
            </div>
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
          {/* Métricas Principales (CAPEX, Fechas, Capacidad) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                CAPEX Estimado
              </span>
              <span className="text-xl font-extrabold text-amber-400 font-mono mt-1 block">
                US$ {project.capexEstimatedMillionsUSD.toLocaleString()}M
              </span>
              <span className="text-[10px] text-slate-400">Inversión Total</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Etapa de Desarrollo
              </span>
              <span className="text-xs font-bold text-cyan-300 font-mono mt-1 block leading-tight">
                {project.stage}
              </span>
              <span className="text-[10px] text-slate-400">Clasificación 1-14</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Puesta en Marcha Estimada
              </span>
              <span className="text-sm font-bold text-white font-mono mt-1 block">
                {project.estimatedCommissioningDate || 'Por definir'}
              </span>
              <span className="text-[10px] text-slate-400">Inicio: {project.estimatedStartDate || 'N/D'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Señales Registradas
              </span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono mt-1 block">
                {project.signalsCount}
              </span>
              <span className="text-[10px] text-slate-400">Última: {project.lastUpdateDate}</span>
            </div>
          </div>

          {/* Detalles Operacionales y Capacidad */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Ubicación Geográfica:</strong> {project.locationDetails} (Coord: {project.latitude}, {project.longitude})</span>
            </div>
            {project.productiveCapacity && (
              <div className="flex items-center gap-2 text-slate-300">
                <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Capacidad Productiva Prevista:</strong> {project.productiveCapacity}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Fuentes Oficiales Validadas:</strong> {project.informationSources.join(' · ')}
              </span>
            </div>
          </div>

          {/* Ecosistema Involucrado (EPCM, Contratistas) */}
          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Ecosistema de Ejecución & Proveedores Principales</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Firma EPCM / Ingeniería Líder
                </span>
                <span className="text-sm font-bold text-amber-300 block mt-1">
                  {project.epcmCompany || 'No designada formalmente / En licitación'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Contratistas y Consultores Clave
                </span>
                <div className="mt-1 flex flex-wrap gap-1">
                  {project.keyContractors && project.keyContractors.length > 0 ? (
                    project.keyContractors.map((c, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">En proceso de licitación</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Historial de Evolución Inmutable (Requisito crítico del prompt 5) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Historial de Evolución & Trazabilidad Inmutable</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Cada hito preserva su registro histórico sin sobrescribirse (Línea de tiempo auditable)
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                {project.history?.length || 0} eventos registrados
              </span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {project.history?.map((entry) => (
                <div key={entry.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-slate-900 group-hover:scale-125 transition-transform" />

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-500/40 transition space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white text-sm">
                        {entry.signalTitle}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400">
                          {entry.date}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                          {entry.source}
                        </span>
                      </div>
                    </div>

                    {/* Stage & Capex Deltas */}
                    {(entry.previousStage || entry.previousCapex) && (
                      <div className="flex items-center gap-3 text-[11px] p-2 rounded-lg bg-slate-900/90 font-mono">
                        {entry.previousStage && entry.newStage && (
                          <span className="text-slate-300">
                            Etapa: <s className="text-slate-500">{entry.previousStage}</s> → <strong className="text-amber-400">{entry.newStage}</strong>
                          </span>
                        )}
                        {entry.previousCapex && entry.newCapex && (
                          <span className="text-slate-300">
                            CAPEX: <s className="text-slate-500">US$ {entry.previousCapex}M</s> → <strong className="text-emerald-400">US$ {entry.newCapex}M</strong>
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {entry.changeDescription}
                    </p>

                    <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide block mb-0.5">
                        Interpretación Comercial del Cambio:
                      </span>
                      <p className="text-slate-300 text-[11px]">
                        {entry.commercialInterpretation}
                      </p>
                    </div>

                    {entry.potentialImpact && (
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-300">Impacto Potencial:</strong> {entry.potentialImpact}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <span className="text-xs text-slate-500">
            Última actualización sincronizada: {project.lastUpdateDate}
          </span>
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
