import React from 'react';
import { EarlySignal } from '../../../types/signal';
import { Badge } from '../../common/Badge';
import { Radio, ExternalLink, Clock, Lightbulb, ChevronRight } from 'lucide-react';

interface SignalFeedWidgetProps {
  signals: EarlySignal[];
  onSelectSignal?: (signal: EarlySignal) => void;
  onViewAllSignals?: () => void;
}

export const SignalFeedWidget: React.FC<SignalFeedWidgetProps> = ({
  signals,
  onSelectSignal,
  onViewAllSignals,
}) => {
  const categoryVariant = (cat: string) => {
    switch (cat) {
      case 'Ambiental':
        return 'emerald';
      case 'Inversión':
        return 'amber';
      case 'Ingeniería y desarrollo':
        return 'cyan';
      case 'Contratación':
        return 'purple';
      case 'Corporativa y financiera':
        return 'indigo';
      case 'Organizacional':
        return 'rose';
      default:
        return 'slate';
    }
  };

  const recentSignals = signals.slice(0, 5);

  return (
    <div className="flex flex-col h-full space-y-3">
      <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
        {recentSignals.map((sig) => (
          <div
            key={sig.id}
            onClick={() => onSelectSignal && onSelectSignal(sig)}
            className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge variant={categoryVariant(sig.category) as any} size="sm">
                  {sig.category}
                </Badge>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded">
                  {sig.originalSource}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {sig.publishedDate}
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition leading-snug">
              {sig.name}
            </h4>

            <div className="text-[11px] text-amber-300/90 font-medium mt-1 truncate">
              📍 {sig.relatedProjectName} ({sig.relatedCompany})
            </div>

            {/* Hipótesis comercial anticipada */}
            <div className="mt-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 text-[11px] text-slate-300">
              <div className="flex items-center gap-1 text-cyan-400 font-semibold mb-0.5 text-[10px] uppercase tracking-wide">
                <Lightbulb className="w-3 h-3 text-cyan-400" />
                <span>Hipótesis Comercial:</span>
              </div>
              <p className="line-clamp-2 text-slate-400 text-[10.5px] leading-relaxed">
                {sig.commercialInterpretation.hypothesis}
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
              <span>Ventana: <strong className="text-slate-300">{sig.commercialInterpretation.anticipationWindowMonths} meses</strong></span>
              <span className="text-cyan-400 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                Ver análisis <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {onViewAllSignals && (
        <button
          onClick={onViewAllSignals}
          className="w-full py-2 text-xs font-semibold text-center text-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-800/40 rounded-xl transition"
        >
          Ver Feed Completo de Señales ({signals.length}) →
        </button>
      )}
    </div>
  );
};
