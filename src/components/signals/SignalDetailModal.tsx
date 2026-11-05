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
      <div className="bg-slate-950 border border-slate-700 rounded-[16px] w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-6 border-b border-slate-800 flex items-start justify-between gap-6 bg-slate-900 ic-dot-grid">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="ic-rule" />
              <span className="ic-eyebrow text-[10px] text-amber-400">Señal · {signal.category}</span>
            </div>
            <h2 className="text-[20px] font-bold text-white leading-snug mt-3">{signal.name}</h2>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="ic-mono text-[10px] font-bold px-2 py-0.5 rounded-[4px] border border-slate-600 text-white">{signal.originalSource}</span>
              <span className="ic-mono text-[10px] text-slate-400">{signal.publishedDate}</span>
              <span className="text-[10px] text-slate-500">· Relevancia {signal.relevance} · Confianza {signal.confidence}</span>
            </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-700/80 text-xs">
            <div>
              <span className="ic-eyebrow text-[9px] text-slate-400">
                Proyecto Relacionado
              </span>
              <div
                onClick={() => onOpenProject && onOpenProject(signal.relatedProjectId)}
                className="font-bold text-amber-400 hover:underline cursor-pointer truncate mt-1"
              >
                {signal.relatedProjectName}
              </div>
            </div>
            <div>
              <span className="ic-eyebrow text-[9px] text-slate-400">
                Empresa Responsable
              </span>
              <div className="font-bold text-white truncate mt-1">
                {signal.relatedCompany}
              </div>
            </div>
            <div>
              <span className="ic-eyebrow text-[9px] text-slate-400">
                Fecha Publicación
              </span>
              <div className="ic-mono text-white mt-1">
                {signal.publishedDate}
              </div>
            </div>
            <div>
              <span className="ic-eyebrow text-[9px] text-slate-400">
                Ventana Anticipación
              </span>
              <div className="font-bold text-amber-400 ic-mono mt-1">
                {signal.commercialInterpretation.anticipationWindowMonths} meses previos
              </div>
            </div>
          </div>

          {/* Descripción Oficial */}
          <div>
            <h3 className="ic-eyebrow text-[10px] text-white mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
              <span>Hecho detectado</span>
            </h3>
            <p className="text-[13px] text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-xl border border-slate-700/80">
              {signal.description}
            </p>
          </div>

          {/* Interpretación Comercial (El Core de RADAR MINERO) */}
          <div className="relative p-5 pl-6 rounded-xl bg-slate-900 border border-slate-700/80 space-y-4 overflow-hidden">
            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-[6px] bg-amber-400 text-slate-950">
                <Lightbulb className="w-4 h-4" strokeWidth={2} />
              </div>
              <div>
                <h3 className="ic-eyebrow text-[10px] text-amber-400">
                  Qué significa para un proveedor
                </h3>
                <p className="text-[11px] text-slate-500">
                  Hipótesis comercial: una lectura, no un hecho confirmado
                </p>
              </div>
            </div>

            <p className="text-sm text-white leading-relaxed">
              {signal.commercialInterpretation.hypothesis}
            </p>

            {/* Necesidades Comerciales Potenciales */}
            {signal.commercialInterpretation.potentialNeeds.length > 0 && (
            <div>
              <span className="ic-eyebrow text-[9px] text-slate-400 block mb-2">
                Necesidades que se abren
              </span>
              <ul className="space-y-1.5">
                {signal.commercialInterpretation.potentialNeeds.map((need, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-100 bg-slate-950 p-2.5 rounded-[6px] border border-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>

            )}

            {/* Servicios Objetivo */}
            {signal.commercialInterpretation.targetServices.length > 0 && (
            <div>
              <span className="ic-eyebrow text-[9px] text-slate-400 block mb-2">
                Proveedores que pueden participar
              </span>
              <div className="flex flex-wrap gap-1.5">
                {signal.commercialInterpretation.targetServices.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-2.5 py-1 rounded-[6px] bg-white text-slate-950"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>
            )}
          </div>

          {/* Trazabilidad y Bitácora Inmutable */}
          {signal.historyLogs.length > 0 && (
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
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <a
            href={signal.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-[6px] bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-bold"
          >
            <span>VER FUENTE ORIGINAL</span>
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
