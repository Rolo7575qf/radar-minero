import React from 'react';

// Sello IC: amarillo sobre negro (versión positiva del sistema de diseño)
export const ICSeal: React.FC<{ size?: number; className?: string }> = ({ size = 36, className = '' }) => (
  <div
    className={`flex items-center justify-center rounded-[6px] bg-amber-400 text-slate-950 shrink-0 ${className}`}
    style={{ width: size, height: size }}
    aria-label="InteligenciaConectada"
  >
    <span className="ic-display" style={{ fontSize: size * 0.4, lineHeight: 1, letterSpacing: '-0.04em' }}>
      IC
    </span>
  </div>
);

// Marca completa del producto
export const RadarWordmark: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div className="flex items-center gap-3 min-w-0">
    <ICSeal size={compact ? 30 : 36} />
    <div className="min-w-0">
      <div className="ic-mono text-[9px] font-bold tracking-[0.08em] text-white whitespace-nowrap">INTELIGENCIACONECTADA™</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="ic-rule" style={{ width: 18 }} />
        <span className="ic-eyebrow text-[9px] text-amber-400 truncate">Radar Minero</span>
      </div>
    </div>
  </div>
);

export interface ClientBrand {
  name?: string;
  logo?: string; // data URL redimensionada
}

// Logo o nombre del cliente. Si no hay ninguno, muestra un marcador para agregarlo.
export const ClientLogo: React.FC<{
  brand?: ClientBrand;
  className?: string;
  maxHeight?: number;
  fallback?: React.ReactNode;
}> = ({ brand, className = '', maxHeight = 40, fallback = null }) => {
  if (brand?.logo) {
    return (
      <img
        src={brand.logo}
        alt={brand.name || 'Logo de la empresa'}
        className={`object-contain ${className}`}
        style={{ maxHeight, maxWidth: '100%' }}
      />
    );
  }
  if (brand?.name) {
    return <span className={`ic-display text-white text-base leading-tight ${className}`}>{brand.name}</span>;
  }
  return <>{fallback}</>;
};
