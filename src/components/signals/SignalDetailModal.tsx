import React from 'react';
import { EarlySignal } from '../../types/signal';
import { Badge } from '../common/Badge';
import {
  X,
  ExternalLink,
  Clock,
  Radio,
  Lightbulb,
  Building2,
  CheckCircle2,
  FileText,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface SignalDetailModalProps {
  signal: EarlySignal | null;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
}

export const SignalDetailModal: React.FC<SignalDetailModalProps> = ({
  signal,
  onClose,
  onOpenProject,
}) => {
  if (!signal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-start justify-between bg-slate-950/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="amber" size="sm">
                {signal.category}
              </Badge>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Fuente: {signal.originalSource}
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                {signal.validationState}
              </span>
            </div>
            <h2 className="text-base font-extrabold text-white mt-1">
              {signal.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Proyecto Relacionado
              </span>
              <div
                onClick={() => onOpenProject && onOpenProject(signal.relatedProjectId)}
                className="font-bold text-amber-400 hover:underline cursor-pointer truncate mt-0.5"
              >
                {signal.relatedProjectName}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Empresa Responsable
              </span>
              <div className="font-bold text-slate-200 truncate mt-0.5">
                {signal.relatedCompany}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Fecha Publicación
              </span>
              <div className="font-mono text-slate-300 mt-0.5">
                {signal.publishedDate}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Ventana Anticipación
              </span>
              <div className="font-bold text-emerald-400 font-mono mt-0.5">
                {signal.commercialInterpretation.anticipationWindowMonths} meses previos
              </div>
            </div>
          </div>

          {/* Descripción Oficial */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Hecho Detectado & Descripción de la Fuente</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              {signal.description}
            </p>
          </div>

          {/* Interpretación Comercial (El Core de RADAR MINERO) */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 space-y-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Interpretación Comercial & Hipótesis B2B
                </h3>
                <p className="text-[11px] text-slate-400">
                  Inferencia del significado técnico para la cadena de valor y proveedores
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {signal.commercialInterpretation.hypothesis}
            </p>

            {/* Necesidades Comerciales Potenciales */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Necesidades Comerciales Potenciales que se Inician:
              </span>
              <ul className="space-y-1.5">
                {signal.commercialInterpretation.potentialNeeds.map((need, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios Objetivo */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Categorías de Proveedores / Contratistas Involucrados:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {signal.commercialInterpretation.targetServices.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trazabilidad y Bitácora Inmutable */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Trazabilidad & Registro de Detección</span>
            </h3>
            <div className="space-y-2">
              {signal.historyLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] flex items-center justify-between"
                >
                  <span className="text-slate-300 font-medium">{log.action}</span>
                  <div className="flex items-center gap-2 font-mono text-slate-500 text-[10px]">
                    <span>{log.userOrEngine}</span>
                    <span>·</span>
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <a
            href={signal.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <span>Ver Expediente / Fuente Oficial</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
