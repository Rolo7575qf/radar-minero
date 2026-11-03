import React from 'react';
import {
  Radio,
  PlusCircle,
  Sliders,
  Globe2,
  Database,
  Search,
  Bell,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
  onOpenSignalSimulator: () => void;
  onOpenScoringConfig: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCountry,
  onSelectCountry,
  onOpenSignalSimulator,
  onOpenScoringConfig,
  searchQuery,
  onSearchChange,
  onResetData,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-amber-500/30 text-amber-400 shadow-inner">
            <Radio className="w-5 h-5 pulse-radar" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-white text-base sm:text-lg">
                RADAR <span className="text-amber-400">MINERO</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                SaaS B2B
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-400 -mt-0.5">
              Inteligencia de Proyectos & Señales Tempranas LatAm
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md items-center relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar proyectos, EPCM, señales, empresas o minerales..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
          />
        </div>

        {/* Country Selector & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Country Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 hidden sm:inline" />
            {(['Todos', 'Chile', 'Perú', 'Argentina'] as const).map((country) => (
              <button
                key={country}
                onClick={() => onSelectCountry(country)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedCountry === country
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {country === 'Todos' ? 'LatAm' : country}
              </button>
            ))}
          </div>

          {/* Scoring Engine Config Button */}
          <button
            onClick={onOpenScoringConfig}
            title="Configurar Modelo de Scoring (100 Puntos)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Ponderar Scoring</span>
          </button>

          {/* Ingest / Simulate Signal Button */}
          <button
            onClick={onOpenSignalSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold transition shadow-md shadow-amber-500/20"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nueva Señal</span>
            <Sparkles className="w-3 h-3 text-slate-950 animate-pulse hidden sm:inline" />
          </button>

          {/* Data Sources Health Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-400">
            <Database className="w-3 h-3" />
            <span>5 Fuentes Online</span>
          </div>

          {/* Reset / Restore Demo Button */}
          <button
            onClick={onResetData}
            title="Restaurar datos y configuraciones iniciales"
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
