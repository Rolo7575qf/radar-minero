import React from 'react';
import { DashboardWidget } from '../../types/dashboard';
import {
  MoreVertical,
  Maximize2,
  Trash2,
  MoveUp,
  MoveDown,
  Sparkles
} from 'lucide-react';

interface WidgetCardProps {
  widget: DashboardWidget;
  isEditing?: boolean;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  isEditing,
  onRemove,
  onMoveUp,
  onMoveDown,
  children,
}) => {
  // Conversión de ancho a clases de Tailwind Grid (grid-cols-12)
  const widthClasses = {
    third: 'col-span-12 md:col-span-4',
    half: 'col-span-12 md:col-span-6',
    'two-thirds': 'col-span-12 md:col-span-8',
    full: 'col-span-12',
  };

  const borderColors = {
    amber: 'border-slate-800 hover:border-amber-500/40',
    cyan: 'border-slate-800 hover:border-cyan-500/40',
    emerald: 'border-slate-800 hover:border-emerald-500/40',
    rose: 'border-slate-800 hover:border-rose-500/40',
    indigo: 'border-slate-800 hover:border-indigo-500/40',
  };

  const scheme = widget.colorScheme || 'amber';

  return (
    <div
      className={`bg-slate-900 rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden ${
        widthClasses[widget.width]
      } ${borderColors[scheme]}`}
    >
      {/* Widget Header */}
      <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3 bg-gradient-to-b from-white/[0.035] to-transparent">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white truncate">
            <span className="w-1.5 h-1.5 bg-amber-400 shrink-0" />
            {widget.title}
          </h3>
          {widget.customDescription && (
            <p className="text-[11px] text-slate-500 truncate mt-1 pl-3.5">
              {widget.customDescription}
            </p>
          )}
        </div>

        {/* Action buttons (when in edit mode or normal) */}
        {isEditing && (
          <div className="flex items-center gap-1 shrink-0">
            {onMoveUp && (
              <button
                onClick={onMoveUp}
                title="Mover arriba"
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <MoveUp className="w-3.5 h-3.5" />
              </button>
            )}
            {onMoveDown && (
              <button
                onClick={onMoveDown}
                title="Mover abajo"
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <MoveDown className="w-3.5 h-3.5" />
              </button>
            )}
            {onRemove && (
              <button
                onClick={onRemove}
                title="Eliminar widget"
                className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 ml-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Widget Body */}
      <div className="p-5 flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};
