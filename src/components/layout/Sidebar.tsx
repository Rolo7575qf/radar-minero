import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Pickaxe,
  Network,
  Target,
  Sliders,
  FileText,
  ChevronRight,
  ShieldCheck,
  Building2,
  TrendingUp
} from 'lucide-react';

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
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Panel & Builder',
      subtitle: 'Dashboards dinámicos',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'signals' as ActiveTab,
      label: 'Motor de Señales',
      subtitle: 'Detección temprana A-H',
      icon: Radio,
      badge: counts.signals,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    },
    {
      id: 'projects' as ActiveTab,
      label: 'Cartera de Proyectos',
      subtitle: '14 etapas & evolución',
      icon: Pickaxe,
      badge: counts.projects,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      id: 'ecosystem' as ActiveTab,
      label: 'Ecosistema & Red',
      subtitle: 'Titular → EPCM → Contratistas',
      icon: Network,
      badge: counts.companies,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    },
    {
      id: 'opportunities' as ActiveTab,
      label: 'Oportunidades B2B',
      subtitle: 'Scoring 100 pts & decisores',
      icon: Target,
      badge: counts.opportunities,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      id: 'scoring' as ActiveTab,
      label: 'Modelo de Scoring',
      subtitle: 'Ponderación 6 variables',
      icon: Sliders,
      badge: '100 pts',
      badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700',
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/70 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Navigation menu */}
      <nav className="p-3 space-y-1.5 flex-1">
        <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Navegación Analítica
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/15 to-transparent text-white border-l-4 border-amber-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300'
                      : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold leading-tight truncate">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge !== null && (
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ml-2 shrink-0 ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Info Box: Principio de Funcionamiento */}
      <div className="p-3 m-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 font-bold text-slate-300 mb-1">
          <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
          <span>Principio Radar</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Fuente → Señal → Proyecto → Evolución → Necesidad → Actor → Oportunidad.
        </p>
      </div>

      {/* Official Sources Sync Footer */}
      <div className="p-3 border-t border-slate-900 bg-slate-950 text-[10px] text-slate-500">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Fuentes Oficiales:</span>
          </span>
          <span className="text-slate-400 font-mono">SEIA/COCHILCO</span>
        </div>
        <div className="mt-1 text-[9px] text-slate-500">
          Trazabilidad inmutable activada
        </div>
      </div>
    </aside>
  );
};
