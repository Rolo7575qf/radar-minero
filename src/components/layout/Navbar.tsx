import React from 'react';
import { Search, PlusCircle, ChevronDown } from 'lucide-react';
import { ICSeal, ClientBrand } from '../brand/ICSeal';

interface NavbarProps {
  sectionTitle: string;
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAccount: () => void;
  onOpenSignalSimulator?: () => void; // solo administrador IC
  userEmail?: string | null;
  clientBrand?: ClientBrand;
  projectsCount?: number;
  lastSignalDate?: string;
}

const initials = (email?: string | null, name?: string) => {
  const base = name || (email ? email.split('@')[0] : '');
  const parts = base.replace(/[._-]+/g, ' ').trim().split(' ').filter(Boolean);
  return (parts[0]?.[0] || 'I').toUpperCase() + (parts[1]?.[0] || '').toUpperCase();
};

export const Navbar: React.FC<NavbarProps> = ({
  sectionTitle,
  selectedCountry,
  onSelectCountry,
  searchQuery,
  onSearchChange,
  onOpenAccount,
  onOpenSignalSimulator,
  userEmail,
  clientBrand,
  projectsCount = 0,
  lastSignalDate = '',
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        {/* Sección actual */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="lg:hidden"><ICSeal size={30} /></div>
          <div className="min-w-0">
            <div className="ic-mono text-[10px] text-slate-500 truncate">
              RADAR MINERO <span className="text-slate-700">/</span> {sectionTitle.toUpperCase()}
            </div>
            <h1 className="ic-display text-white text-lg sm:text-xl truncate">
              {sectionTitle}
              <span className="text-amber-400">.</span>
            </h1>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="hidden md:flex flex-1 max-w-md items-center relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" strokeWidth={1.5} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar proyecto, titular, región o mineral"
            className="w-full bg-slate-900 border border-slate-800 rounded-[6px] pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* País — solo Chile por ahora; agregar Perú/Argentina cuando corresponda */}
          <div className="hidden sm:flex items-center border border-slate-800 rounded-[6px] p-0.5 text-[11px]">
            <span className="px-2.5 py-1 rounded-[4px] font-bold bg-amber-400 text-slate-950">
              Chile
            </span>
          </div>

          {/* Estado de datos */}
          <div className="hidden xl:flex items-center gap-2 ic-mono text-[10px] text-slate-400 px-2.5 py-1.5 border border-slate-800 rounded-[6px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="ic-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {projectsCount} PROYECTOS{lastSignalDate ? ` · ACT. ${lastSignalDate}` : ''}
          </div>

          {onOpenSignalSimulator && (
            <button
              onClick={onOpenSignalSimulator}
              title="Solo administrador IC"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-[6px] text-[11px] font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" strokeWidth={2} />
              NUEVA SEÑAL
            </button>
          )}

          {/* Cuenta */}
          <button
            onClick={onOpenAccount}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-[6px] border border-slate-800 hover:border-slate-600 transition"
            title="Configuración de su cuenta"
          >
            <span className="w-8 h-8 rounded-[6px] bg-white flex items-center justify-center overflow-hidden">
              {clientBrand?.logo ? (
                <img src={clientBrand.logo} alt="" className="max-w-[28px] max-h-[28px] object-contain" />
              ) : (
                <span className="ic-display text-slate-950 text-[11px]">{initials(userEmail, clientBrand?.name)}</span>
              )}
            </span>
            <span className="hidden md:block text-left max-w-[160px]">
              <span className="block text-[11px] font-bold text-white truncate">{clientBrand?.name || 'Mi cuenta'}</span>
              <span className="block ic-mono text-[9px] text-slate-500 truncate">{userEmail || 'Sesión verificada'}</span>
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
