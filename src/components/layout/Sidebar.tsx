import React from 'react';
import { Settings, Plus, ShieldCheck, LayoutDashboard, Target, Pickaxe, Radio, Network, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { ICSeal } from '../brand/ICSeal';
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
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}

export const NAV_ITEMS: { id: ActiveTab; label: string; subtitle: string; icon: React.ElementType; countKey?: keyof SidebarProps['counts'] }[] = [
  { id: 'dashboard', label: 'Inicio', subtitle: 'Resumen del mercado', icon: LayoutDashboard },
  { id: 'opportunities', label: 'Oportunidades', subtitle: 'Su pipeline comercial', icon: Target, countKey: 'opportunities' },
  { id: 'projects', label: 'Proyectos', subtitle: 'Cartera y etapas', icon: Pickaxe, countKey: 'projects' },
  { id: 'signals', label: 'Señales', subtitle: 'Huellas recientes', icon: Radio, countKey: 'signals' },
  { id: 'ecosystem', label: 'Ecosistema', subtitle: 'Titulares y contratistas', icon: Network, countKey: 'companies' },
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
  collapsed = false,
  onToggleCollapsed,
}) => {
  return (
    <aside
      className={`hidden lg:flex ${collapsed ? 'w-[76px]' : 'w-[264px]'} border-r border-slate-700/70 bg-black flex-col shrink-0 h-screen sticky top-0 transition-[width] duration-200 shadow-[8px_0_24px_-12px_rgba(0,0,0,0.9)] z-30`}
    >
      {/* Marca IC + contraer */}
      <div className={`border-b border-slate-800 flex items-center ${collapsed ? 'flex-col gap-3 px-2 py-4' : 'justify-between gap-1 pl-4 pr-2 pt-6 pb-5'}`}>
        {collapsed ? <ICSeal size={36} /> : <RadarWordmark />}
        <button
          onClick={onToggleCollapsed}
          title={collapsed ? 'Expandir menú' : 'Contraer menú'}
          className="p-1.5 rounded-[6px] text-slate-400 hover:text-amber-400 hover:bg-slate-900 transition shrink-0"
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" strokeWidth={1.5} /> : <PanelLeftClose className="w-4 h-4" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Co-branding: espacio del cliente */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <button
            onClick={onOpenAccount}
            className="w-full text-left rounded-[10px] border border-slate-700 bg-slate-900 hover:border-amber-400/60 transition p-3 group"
            title="Personalizar con el logo de su empresa"
          >
            <div className="ic-eyebrow text-[9px] text-slate-400 mb-2">Panel de</div>
            <div className="min-h-[36px] flex items-center">
              <ClientLogo
                brand={clientBrand}
                maxHeight={36}
                fallback={
                  <span className="flex items-center gap-2 text-xs text-slate-200 group-hover:text-amber-400 transition">
                    <span className="w-7 h-7 rounded-[6px] border border-dashed border-slate-500 flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                    Agregar el logo de su empresa
                  </span>
                }
              />
            </div>
          </button>
        </div>
      )}

      {/* Navegación */}
      <nav className={`${collapsed ? 'px-2' : 'px-3'} pt-5 flex-1 overflow-y-auto`}>
        {!collapsed && <p className="px-2 pb-2 ic-eyebrow text-[9px] text-slate-500">Navegación</p>}
        <div className="space-y-1">
          {NAV_ITEMS.map((item, i) => {
            const active = activeTab === item.id;
            const count = item.countKey ? counts[item.countKey] : null;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                title={collapsed ? item.label : undefined}
                className={`relative w-full flex items-center ${collapsed ? 'justify-center py-3' : 'gap-3 px-3 py-2.5'} rounded-[8px] text-left transition ${
                  active
                    ? 'bg-amber-400/[0.12] text-white ring-1 ring-amber-400/30'
                    : 'text-slate-100 hover:bg-slate-900'
                }`}
              >
                {active && <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-amber-400 rounded" />}
                {collapsed ? (
                  <span className="relative">
                    <Icon className={`w-5 h-5 ${active ? 'text-amber-400' : 'text-slate-300'}`} strokeWidth={1.5} />
                    {count !== null && (
                      <span className="absolute -top-2 -right-3 ic-mono text-[9px] font-bold px-1 rounded bg-slate-800 text-white">{count}</span>
                    )}
                  </span>
                ) : (
                  <>
                    <span className={`w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0 ${active ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-300'}`}>
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-baseline gap-1.5">
                        <span className={`ic-mono text-[10px] font-bold ${active ? 'text-amber-400' : 'text-slate-500'}`}>{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[13px] font-bold leading-tight">{item.label}</span>
                      </span>
                      <span className={`block text-[11px] truncate ${active ? 'text-slate-300' : 'text-slate-500'}`}>{item.subtitle}</span>
                    </span>
                    {count !== null && (
                      <span className={`ic-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${active ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200'}`}>{count}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Configuración y fuentes */}
      <div className={`${collapsed ? 'p-2' : 'p-4'} border-t border-slate-800 space-y-3`}>
        <button
          onClick={onOpenAccount}
          title="Configuración"
          className={`w-full flex items-center ${collapsed ? 'justify-center py-3' : 'gap-2 px-3 py-2.5'} rounded-[6px] border border-slate-700 bg-slate-900 text-xs font-bold text-white hover:border-amber-400/60 transition`}
        >
          <Settings className="w-4 h-4 text-amber-400" strokeWidth={1.5} />
          {!collapsed && 'Configuración'}
        </button>
        {!collapsed && (
          <div className="flex items-start gap-1.5 text-[10px] text-slate-500 leading-relaxed">
            <ShieldCheck className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" strokeWidth={1.5} />
            <span className="ic-mono line-clamp-2">{sources.length ? sources.join(' · ') : 'Sincronizando fuentes…'}</span>
          </div>
        )}
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
