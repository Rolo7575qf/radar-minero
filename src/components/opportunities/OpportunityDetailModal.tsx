import React, { useState, useEffect } from 'react';
import { CommercialOpportunity, CommercialStatus } from '../../types/opportunity';
import { Badge } from '../common/Badge';
import { getHorizon, monthsUntil, formatDateEs } from '../../services/horizon';
import {
  X,
  Target,
  Building2,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: CommercialOpportunity | null;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
  onOpenScoringConfig?: () => void;
  onUpdate?: (id: string, patch: { status?: CommercialStatus; note?: string }) => void;
}

const STATUSES: CommercialStatus[] = [
  'Identificada Tempranamente',
  'En Análisis Comercial',
  'Mapeo de Decisores',
  'Contacto Inicial / Warm Intro',
  'Precalificación Abierta',
  'RFI / RFQ en Proceso',
  'Ganada',
  'Descartada / Archivada',
];

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
  onOpenProject,
  onOpenScoringConfig,
  onUpdate,
}) => {
  const [note, setNote] = useState('');
  useEffect(() => {
    setNote(opportunity?.clientNote || '');
  }, [opportunity?.id, opportunity?.clientNote]);

  if (!opportunity) return null;

  const priorityColors = {
    'Máxima': 'bg-emerald-950/80 text-amber-300 border-emerald-800/80',
    'Alta': 'bg-amber-950/80 text-amber-300 border-amber-800/80',
    'Media': 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80',
    'Baja-media': 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const { scoring } = opportunity;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-[16px] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative px-6 py-6 border-b border-slate-800 flex items-start justify-between gap-6 bg-slate-900 ic-dot-grid">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
          <div className="min-w-0 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="ic-rule" />
              <span className="ic-eyebrow text-[10px] text-amber-400">Oportunidad · Prioridad {opportunity.priority}</span>
            </div>
            <h2 className="text-[22px] font-bold text-white leading-tight mt-3">{opportunity.title}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} />
                {opportunity.targetCompany}
              </span>
              <button
                onClick={() => onOpenProject && onOpenProject(opportunity.relatedProjectId)}
                className="text-amber-400 hover:text-amber-300 font-bold"
              >
                Ver proyecto: {opportunity.relatedProjectName} →
              </button>
            </div>
          </div>
          <div className="flex items-start gap-5 shrink-0">
            <div className="text-right">
              <div className="flex items-baseline justify-end gap-1">
                <span className="ic-display text-[52px] leading-none text-amber-400">{scoring.totalScore}</span>
                <span className="ic-mono text-xs text-slate-500">/100</span>
              </div>
              <div className="ic-eyebrow text-[9px] text-slate-500 mt-2">Puntaje</div>
            </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Seguimiento comercial del cliente */}
          {onUpdate && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Seguimiento comercial
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-[11px] text-slate-400 space-y-1 block">
                  <span>Etapa en tu pipeline</span>
                  <select
                    value={opportunity.commercialStatus}
                    onChange={(e) => onUpdate(opportunity.id, { status: e.target.value as CommercialStatus })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-100"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </label>
                <label className="text-[11px] text-slate-400 space-y-1 block">
                  <span>Nota privada (solo tu equipo)</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onBlur={() => {
                      if (note !== (opportunity.clientNote || '')) onUpdate(opportunity.id, { note });
                    }}
                    rows={2}
                    placeholder="Ej: reunión agendada con el gerente de proyectos"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-100 resize-none"
                  />
                </label>
              </div>
              {opportunity.statusUpdatedAt && (
                <p className="text-[10px] text-slate-500">
                  Última actualización: {new Date(opportunity.statusUpdatedAt).toLocaleString('es-CL')}
                </p>
              )}
            </div>
          )}

          {/* Próxima Acción Comercial Recomendada (Call to action prioritario) */}
          <div className="relative p-5 rounded-xl bg-amber-400 text-slate-950 flex items-start gap-3">
            <div className="p-2 rounded-[6px] bg-slate-950 text-amber-400 shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="ic-eyebrow text-[10px] text-slate-950 block">
                Siguiente paso recomendado
              </span>
              <p className="text-sm text-slate-950 font-bold mt-1 leading-relaxed">
                {opportunity.recommendedNextAction}
              </p>
              <div className="mt-2 text-[11px] text-slate-800 flex flex-wrap items-center gap-3">
                <span>
                  Ventana: <strong>{getHorizon(monthsUntil(opportunity.targetRfqDate, opportunity.anticipationWindowMonths)).label} · {monthsUntil(opportunity.targetRfqDate, opportunity.anticipationWindowMonths)} meses</strong> hasta el RFQ ({opportunity.targetBasis ?? 'estimada'}: {formatDateEs(opportunity.targetRfqDate)}) · verificado {formatDateEs(opportunity.lastReviewed)}
                </span>
                <span>·</span>
                <span>
                  Valor estimado del contrato: <strong className="ic-mono">{opportunity.estimatedContractValueUSD ? `US$ ${opportunity.estimatedContractValueUSD / 1000000}M` : 'No estimado'}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Modelo de Scoring Explicable (Las 6 Variables del Prompt) */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Desglose Explicativo del Scoring (Modelo de 100 Puntos)</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Transparencia algorítmica: por qué esta oportunidad obtuvo {scoring.totalScore} puntos
                </p>
              </div>

              {onOpenScoringConfig && (
                <button
                  onClick={onOpenScoringConfig}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline"
                >
                  Personalizar Ponderaciones
                </button>
              )}
            </div>

            {/* 6 Variables del Modelo */}
            <div className="space-y-3 text-xs">
              {/* 1. Madurez del Proyecto */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-slate-300">1. Madurez del Proyecto (Peso: 20 pts)</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {scoring.maturityScore} / 20 pts
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div
                    style={{ width: `${(scoring.maturityScore / 20) * 100}%` }}
                    className="h-full bg-amber-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {scoring.maturityExplanation}
                </p>
              </div>

              {/* 2. Señales Recientes */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-slate-300">2. Señales Recientes de Inversión o Contratación (Peso: 20 pts)</span>
                  <span className="text-cyan-400 font-mono font-bold">
                    {scoring.recentSignalsScore} / 20 pts
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div
                    style={{ width: `${(scoring.recentSignalsScore / 20) * 100}%` }}
                    className="h-full bg-cyan-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {scoring.recentSignalsExplanation}
                </p>
              </div>

              {/* 3. Compatibilidad con Servicios */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-slate-300">3. Compatibilidad con Servicios Potenciales (Peso: 20 pts)</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {scoring.serviceFitScore} / 20 pts
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div
                    style={{ width: `${(scoring.serviceFitScore / 20) * 100}%` }}
                    className="h-full bg-amber-400 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {scoring.serviceFitExplanation}
                </p>
              </div>

              {/* 4. Actores y Decisores */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-slate-300">4. Identificación de Actores y Decisores (Peso: 15 pts)</span>
                  <span className="text-purple-400 font-mono font-bold">
                    {scoring.actorsIdentifiedScore} / 15 pts
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div
                    style={{ width: `${(scoring.actorsIdentifiedScore / 15) * 100}%` }}
                    className="h-full bg-purple-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {scoring.actorsIdentifiedExplanation}
                </p>
              </div>

              {/* 5. Tamaño y Viabilidad */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-slate-300">5. Tamaño y Viabilidad Económica (Peso: 15 pts)</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {scoring.economicSizeScore} / 15 pts
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div
                    style={{ width: `${(scoring.economicSizeScore / 15) * 100}%` }}
                    className="h-full bg-rose-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {scoring.economicSizeExplanation}
                </p>
              </div>

              {/* 6. Ventana de Anticipación */}
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                <div className="flex items-center justify-between font-semibold mb-1">
                  <span className="text-slate-300">6. Ventana de Anticipación Comercial (Peso: 10 pts)</span>
                  <span className="text-blue-400 font-mono font-bold">
                    {scoring.anticipationWindowScore} / 10 pts
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div
                    style={{ width: `${(scoring.anticipationWindowScore / 10) * 100}%` }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {scoring.anticipationWindowExplanation}
                </p>
              </div>
            </div>
          </div>

          {/* Tomadores de Decisión Mapeados */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Tomadores de Decisiones Directos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opportunity.keyDecisionMakers.map((dm, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1"
                >
                  <div className="font-bold text-white text-xs">{dm.name}</div>
                  <div className="text-[11px] text-amber-300 font-medium">
                    {dm.title} ({dm.company})
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                    {dm.relevanceNote}
                  </p>
                  {(dm.email || dm.phone || dm.linkedinUrl) && (
                    <div className="mt-2 pt-2 border-t border-slate-800 space-y-1">
                      {dm.email && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href={`mailto:${dm.email}`}
                            className="text-[11px] font-mono text-white hover:text-amber-300 break-all"
                          >
                            {dm.email}
                          </a>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              dm.emailStatus === 'verificado'
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            }`}
                          >
                            {dm.emailStatus === 'verificado'
                              ? 'Verificado'
                              : dm.emailStatus === 'aceptado_sin_verificar'
                              ? 'Sin confirmar'
                              : 'No verificado'}
                          </span>
                        </div>
                      )}
                      {dm.phone && (
                        <div className="text-[11px] font-mono text-slate-300">{dm.phone}</div>
                      )}
                      {dm.linkedinUrl && (
                        <a
                          href={dm.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-amber-300 hover:underline"
                        >
                          Ver perfil en LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Señales que Originan la Oportunidad */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Señales de Origen que Gatillaron esta Oportunidad:
            </h3>
            <div className="space-y-1.5">
              {opportunity.originatingSignalNames.map((sName, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{sName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <span className="text-xs text-slate-500">
            Detección: {opportunity.detectionDate} · Confianza: {opportunity.confidence}
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
