import React from 'react';
import { Settings, Plus, ShieldCheck } from 'lucide-react';
import { RadarWordmark, ClientLogo, ClientBrand } from '../brand/ICSeal';

export type ActiveTab = 'dashboard' | 'signals' | 'projects' | 'ecosystem' | 'opportunities' | 'scoring';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  counts: {
    signals: number;
    projects: number;
    companies: number;
    opportunities: number;
  };
  sources?: string[];
  clientBrand?: ClientBrand;
  onOpenAccount?: () => void;
}

export const NAV_ITEMS: { id: ActiveTab; label: string; subtitle: string; countKey?: keyof SidebarProps['counts'] }[] = [
  { id: 'dashboard', label: 'Inicio', subtitle: 'Resumen del mercado' },
  { id: 'opportunities', label: 'Oportunidades', subtitle: 'Su pipeline comercial', countKey: 'opportunities' },
  { id: 'projects', label: 'Proyectos', subtitle: 'Cartera y etapas', countKey: 'projects' },
  { id: 'signals', label: 'Señales', subtitle: 'Huellas recientes', countKey: 'signals' },
  { id: 'ecosystem', label: 'Ecosistema', subtitle: 'Titulares y contratistas', countKey: 'companies' },
];

export const SECTION_TITLES: Record<ActiveTab, string> = {
  dashboard: 'Inicio',
  opportunities: 'Oportunidades',
  projects: 'Proyectos',
  signals: 'Señales',
  ecosystem: 'Ecosistema',
  scoring: 'Modelo de puntaje',
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  counts,
  sources = [],
  clientBrand,
  onOpenAccount,
}) => {
  return (
    <aside className="hidden lg:flex w-[264px] border-r border-slate-800 bg-[#050505] flex-col shrink-0 h-screen sticky top-0">
      {/* Marca IC */}
      <div className="px-5 pt-6 pb-5 border-b border-slate-800">
        <RadarWordmark />
      </div>

      {/* Co-branding: espacio del cliente */}
      <div className="px-4 pt-4">
        <button
          onClick={onOpenAccount}
          className="w-full text-left rounded-[10px] border border-slate-800 bg-slate-900/60 hover:border-slate-600 transition p-3 group"
          title="Personalizar con el logo de su empresa"
        >
          <div className="ic-eyebrow text-[9px] text-slate-500 mb-2">Panel de</div>
          <div className="min-h-[40px] flex items-center">
            <ClientLogo
              brand={clientBrand}
              maxHeight={40}
              fallback={
                <span className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-amber-400 transition">
                  <span className="w-7 h-7 rounded-[6px] border border-dashed border-slate-600 flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                  Agregar el logo de su empresa
                </span>
              }
            />
          </div>
        </button>
      </div>

      {/* Navegación */}
      <nav className="px-3 pt-5 flex-1 overflow-y-auto">
        <p className="px-2 pb-2 ic-eyebrow text-[9px] text-slate-500">Navegación</p>
        <div className="space-y-0.5">
          {NAV_ITEMS.map((item, i) => {
            const active = activeTab === item.id;
            const count = item.countKey ? counts[item.countKey] : null;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative w-full flex items-center gap-3 px-3 py-3 rounded-[6px] text-left transition ${
                  active ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                {active && <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-amber-400 rounded" />}
                <span className={`ic-mono text-[11px] font-bold ${active ? 'text-amber-400' : 'text-slate-600'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-bold leading-tight">{item.label}</span>
                  <span className="block text-[11px] text-slate-500 truncate">{item.subtitle}</span>
                </span>
                {count !== null && (
                  <span className={`ic-mono text-[11px] ${active ? 'text-amber-400' : 'text-slate-500'}`}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Configuración y fuentes */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <button
          onClick={onOpenAccount}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-[6px] border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-600 transition"
        >
          <Settings className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
          Configuración
        </button>
        <div className="flex items-start gap-1.5 text-[10px] text-slate-500 leading-relaxed">
          <ShieldCheck className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" strokeWidth={1.5} />
          <span className="ic-mono">{sources.length ? sources.join(' · ') : 'Sincronizando fuentes…'}</span>
        </div>
      </div>
    </aside>
  );
};

// Navegación horizontal para pantallas angostas
export const MobileNav: React.FC<{ activeTab: ActiveTab; onTabChange: (t: ActiveTab) => void }> = ({ activeTab, onTabChange }) => (
  <div className="lg:hidden flex gap-1 overflow-x-auto px-4 py-2 border-b border-slate-800 bg-[#050505]">
    {NAV_ITEMS.map((item, i) => {
      const active = activeTab === item.id;
      return (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-bold transition ${
            active ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="ic-mono text-[10px]">{String(i + 1).padStart(2, '0')}</span>
          {item.label}
        </button>
      );
    })}
  </div>
);
