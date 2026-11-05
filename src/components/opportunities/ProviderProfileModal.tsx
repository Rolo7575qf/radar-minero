import React, { useState } from 'react';
import { X, Briefcase, Check } from 'lucide-react';
import { SERVICE_CATALOG } from '../../data/serviceCatalog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentServices: string[];
  onSave: (services: string[]) => void;
}

export const ProviderProfileModal: React.FC<Props> = ({ isOpen, onClose, currentServices, onSave }) => {
  const [selected, setSelected] = useState<string[]>(currentServices);
  if (!isOpen) return null;

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-start justify-between bg-slate-950/70">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4" /> Mi perfil de proveedor
            </div>
            <h2 className="text-lg font-extrabold text-white mt-1">¿Qué servicios ofreces?</h2>
            <p className="text-xs text-slate-400 mt-1">
              El Radar mide la compatibilidad de cada proyecto con lo que tú ofreces y reordena tus oportunidades. Este perfil es solo tuyo.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SERVICE_CATALOG.map((c) => {
            const on = selected.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`flex items-center gap-2 text-left px-3 py-2.5 rounded-xl border text-xs font-semibold transition ${
                  on
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center ${on ? 'bg-amber-500 border-amber-500' : 'border-slate-600'}`}>
                  {on && <Check className="w-3 h-3 text-slate-950" />}
                </span>
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/70">
          <span className="text-xs text-slate-400">{selected.length} servicio(s) seleccionado(s)</span>
          <div className="flex gap-2">
            <button onClick={() => setSelected([])} className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white">
              Limpiar
            </button>
            <button
              onClick={() => { onSave(selected); onClose(); }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold"
            >
              Guardar perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
