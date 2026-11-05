import React from 'react';

interface Stat { value: React.ReactNode; label: string }

// Encabezado de sección con la línea IC: franja amarilla, etiqueta espaciada, titular en mayúscula con punto final
export const SectionHeader: React.FC<{
  eyebrow: string;
  title: string;
  description?: string;
  stats?: Stat[];
  actions?: React.ReactNode;
}> = ({ eyebrow, title, description, stats = [], actions }) => (
  <div className="relative rounded-[16px] border border-slate-800 bg-slate-900 overflow-hidden">
    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
    <div className="p-5 lg:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
      <div className="min-w-0 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="ic-rule" />
          <span className="ic-eyebrow text-[10px] text-amber-400">{eyebrow}</span>
        </div>
        <h2 className="ic-display text-white text-[24px] sm:text-[28px] mt-2.5">
          {title}
          <span className="text-amber-400">.</span>
        </h2>
        {description && <p className="mt-2 text-[13px] text-slate-400 leading-relaxed">{description}</p>}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {stats.length > 0 && (
          <div className="flex">
            {stats.map((s, i) => (
              <div key={s.label} className={`px-4 ${i ? 'border-l border-slate-800' : ''}`}>
                <div className="ic-display text-amber-400 text-[26px] leading-none">{s.value}</div>
                <div className="ic-eyebrow text-[9px] text-slate-500 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        {actions}
      </div>
    </div>
  </div>
);
