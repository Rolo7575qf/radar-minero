import React, { useState } from 'react';
import { DashboardConfig, DashboardWidget } from '../../types/dashboard';
import { MiningProject } from '../../types/project';
import { EarlySignal } from '../../types/signal';
import { MiningCompany } from '../../types/company';
import { CommercialOpportunity } from '../../types/opportunity';
import { WidgetCard } from './WidgetCard';
import { MetricWidget } from './widgets/MetricWidget';
import { StageFunnelWidget } from './widgets/StageFunnelWidget';
import { PieDistributionWidget } from './widgets/PieDistributionWidget';
import { SignalFeedWidget } from './widgets/SignalFeedWidget';
import { OpportunityPriorityWidget } from './widgets/OpportunityPriorityWidget';
import { CapexTableWidget } from './widgets/CapexTableWidget';
import { EpcmDistributionWidget } from './widgets/EpcmDistributionWidget';
import {
  Sliders,
  Plus,
  Copy,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';

interface DashboardViewProps {
  dashboards: DashboardConfig[];
  activeDashboardId: string;
  onSelectDashboard: (id: string) => void;
  onOpenBuilder: () => void;
  onCreateNewDashboard: () => void;
  onDuplicateDashboard: (dash: DashboardConfig) => void;
  onRestoreDefaults: () => void;
  projects: MiningProject[];
  signals: EarlySignal[];
  companies: MiningCompany[];
  opportunities: CommercialOpportunity[];
  onSelectProject: (p: MiningProject) => void;
  onSelectSignal: (s: EarlySignal) => void;
  onSelectOpportunity: (o: CommercialOpportunity) => void;
  onSelectCompany: (c: MiningCompany) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  dashboards,
  activeDashboardId,
  onSelectDashboard,
  onOpenBuilder,
  onCreateNewDashboard,
  onDuplicateDashboard,
  onRestoreDefaults,
  projects,
  signals,
  companies,
  opportunities,
  onSelectProject,
  onSelectSignal,
  onSelectOpportunity,
  onSelectCompany,
  onNavigateTab,
}) => {
  const currentDashboard =
    dashboards.find((d) => d.id === activeDashboardId) || dashboards[0];

  const renderWidgetContent = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'kpi_metric':
        return (
          <MetricWidget
            widget={widget}
            projects={projects}
            signals={signals}
            opportunities={opportunities}
          />
        );
      case 'stage_funnel':
        return (
          <StageFunnelWidget
            projects={projects}
            onSelectStage={() => onNavigateTab('projects')}
          />
        );
      case 'pie_chart':
        return (
          <PieDistributionWidget
            projects={projects}
            dimension={widget.dimension}
          />
        );
      case 'signal_feed':
        return (
          <SignalFeedWidget
            signals={signals}
            onSelectSignal={onSelectSignal}
            onViewAllSignals={() => onNavigateTab('signals')}
          />
        );
      case 'opportunity_priority_chart':
        return (
          <OpportunityPriorityWidget
            opportunities={opportunities}
            onSelectOpportunity={onSelectOpportunity}
            onViewAllOpps={() => onNavigateTab('opportunities')}
          />
        );
      case 'recent_capex_table':
        return (
          <CapexTableWidget
            projects={projects}
            onSelectProject={onSelectProject}
            onViewAllProjects={() => onNavigateTab('projects')}
          />
        );
      case 'epcm_distribution':
        return (
          <EpcmDistributionWidget
            projects={projects}
            companies={companies}
            onSelectCompany={onSelectCompany}
          />
        );
      default:
        return (
          <div className="text-xs text-slate-500 py-6 text-center">
            Widget no implementado: {widget.type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        {/* Selector de Dashboard Activo */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Dashboard Activo:
              </label>
              <select
                value={activeDashboardId}
                onChange={(e) => onSelectDashboard(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
              >
                {dashboards.map((dash) => (
                  <option key={dash.id} value={dash.id}>
                    {dash.name} {dash.isDefault ? '(Predeterminado)' : ''}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xl">
              {currentDashboard?.description}
            </p>
          </div>
        </div>

        {/* Botones de acción del Dashboard Builder */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => onDuplicateDashboard(currentDashboard)}
            title="Duplicar este dashboard"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Duplicar</span>
          </button>

          <button
            onClick={onCreateNewDashboard}
            title="Crear un nuevo dashboard en blanco"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nuevo Panel</span>
          </button>

          <button
            onClick={onOpenBuilder}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/20"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Editar con Builder</span>
          </button>
        </div>
      </div>

      {/* Grid Dinámico de Widgets (12 columnas) */}
      <div className="grid grid-cols-12 gap-5">
        {(currentDashboard?.widgets || []).map((widget) => (
          <WidgetCard key={widget.id} widget={widget}>
            {renderWidgetContent(widget)}
          </WidgetCard>
        ))}
      </div>
    </div>
  );
};
