import React, { useState } from 'react';
import { ScoringWeights } from '../../types/opportunity';
import { DEFAULT_WEIGHTS } from '../../services/scoringService';
import { X, Sliders, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';

interface ScoringConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeights: ScoringWeights;
  onSaveWeights: (weights: ScoringWeights) => void;
}

export const ScoringConfigModal: React.FC<ScoringConfigModalProps> = ({
  isOpen,
  onClose,
  currentWeights,
  onSaveWeights,
}) => {
  const [weights, setWeights] = useState<ScoringWeights>({ ...currentWeights });

  if (!isOpen) return null;

  const totalPoints =
    Number(weights.maturity) +
    Number(weights.recentSignals) +
    Number(weights.serviceFit) +
    Number(weights.actorsIdentified) +
    Number(weights.economicSize) +
    Number(weights.anticipationWindow);

  const isValid = totalPoints === 100;

  const handleReset = () => {
    setWeights({ ...DEFAULT_WEIGHTS });
  };

  const handleSave = () => {
    onSaveWeights(weights);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Modelo de Scoring Comercial (100 Puntos)
              </h2>
              <p className="text-xs text-slate-400">
                Ajusta las ponderaciones según la estrategia comercial de tu empresa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Total Points Indicator */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold ${
              isValid
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
            }`}
          >
            <span>Suma Total de Ponderaciones:</span>
            <span className="text-base font-mono font-extrabold">
              {totalPoints} / 100 pts
            </span>
          </div>

          {/* 1. Madurez del proyecto */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200">
                1. Madurez del Proyecto
              </label>
              <span className="font-mono font-extrabold text-amber-400 text-sm">
                {weights.maturity} pts
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={weights.maturity}
              onChange={(e) => setWeights({ ...weights, maturity: Number(e.target.value) })}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Favorece proyectos en etapas avanzadas de definición contractual o ingeniería de detalle.
            </p>
          </div>

          {/* 2. Señales recientes */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200">
                2. Señales Recientes de Inversión o Contratación
              </label>
              <span className="font-mono font-extrabold text-cyan-400 text-sm">
                {weights.recentSignals} pts
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={weights.recentSignals}
              onChange={(e) => setWeights({ ...weights, recentSignals: Number(e.target.value) })}
              className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Premia la velocidad y actividad reciente detectada en SEA, CMF, Cochilco o SEDAR+.
            </p>
          </div>

          {/* 3. Compatibilidad con servicios */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200">
                3. Compatibilidad con Servicios Potenciales
              </label>
              <span className="font-mono font-extrabold text-emerald-400 text-sm">
                {weights.serviceFit} pts
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={weights.serviceFit}
              onChange={(e) => setWeights({ ...weights, serviceFit: Number(e.target.value) })}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Alineación entre el alcance técnico requerido y la oferta de servicios especializada.
            </p>
          </div>

          {/* 4. Identificación de actores y decisores */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200">
                4. Identificación de Actores y Decisores
              </label>
              <span className="font-mono font-extrabold text-purple-400 text-sm">
                {weights.actorsIdentified} pts
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={weights.actorsIdentified}
              onChange={(e) => setWeights({ ...weights, actorsIdentified: Number(e.target.value) })}
              className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Valoración cuando la titular, el EPCM y los tomadores de compras ya están identificados.
            </p>
          </div>

          {/* 5. Tamaño y viabilidad económica */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200">
                5. Tamaño y Viabilidad Económica (CAPEX)
              </label>
              <span className="font-mono font-extrabold text-rose-400 text-sm">
                {weights.economicSize} pts
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={weights.economicSize}
              onChange={(e) => setWeights({ ...weights, economicSize: Number(e.target.value) })}
              className="w-full accent-rose-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Prioriza megaproyectos clase mundial con mayor presupuesto disponible.
            </p>
          </div>

          {/* 6. Ventana de anticipación */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200">
                6. Ventana de Anticipación Comercial
              </label>
              <span className="font-mono font-extrabold text-blue-400 text-sm">
                {weights.anticipationWindow} pts
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={weights.anticipationWindow}
              onChange={(e) => setWeights({ ...weights, anticipationWindow: Number(e.target.value) })}
              className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">
              Premia la anticipación (6 a 18 meses previos) para influir antes del RFI/RFQ formal.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Valores Sugeridos</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/20"
            >
              <Check className="w-4 h-4" />
              <span>Aplicar y Recalcular Oportunidades</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
