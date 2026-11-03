import React, { useState } from 'react';
import {
  DashboardConfig,
  DashboardWidget,
  WidgetType,
  DimensionType,
  MetricType,
} from '../../types/dashboard';
import {
  X,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Layout,
  Save,
  Copy,
  RotateCcw,
  Sparkles,
  Sliders,
  Check
} from 'lucide-react';

interface DashboardBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDashboard: DashboardConfig;
  allDashboards: DashboardConfig[];
  onSaveDashboard: (dashboard: DashboardConfig) => void;
  onCreateNewDashboard: (name: string, description: string) => void;
  onDuplicateDashboard: (dashboard: DashboardConfig) => void;
  onRestoreDefaults: () => void;
}

export const DashboardBuilderModal: React.FC<DashboardBuilderModalProps> = ({
  isOpen,
  onClose,
  currentDashboard,
  allDashboards,
  onSaveDashboard,
  onCreateNewDashboard,
  onDuplicateDashboard,
  onRestoreDefaults,
}) => {
  const [config, setConfig] = useState<DashboardConfig>({ ...currentDashboard });
  const [activeTab, setActiveTab] = useState<'widgets' | 'meta' | 'presets'>('widgets');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const handleUpdateWidget = (index: number, updates: Partial<DashboardWidget>) => {
    const newWidgets = [...config.widgets];
    newWidgets[index] = { ...newWidgets[index], ...updates };
    setConfig({ ...config, widgets: newWidgets });
  };

  const handleRemoveWidget = (index: number) => {
    const newWidgets = config.widgets.filter((_, idx) => idx !== index);
    setConfig({ ...config, widgets: newWidgets });
  };

  const handleMoveWidget = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= config.widgets.length) return;
    const newWidgets = [...config.widgets];
    const temp = newWidgets[index];
    newWidgets[index] = newWidgets[targetIdx];
    newWidgets[targetIdx] = temp;
    setConfig({ ...config, widgets: newWidgets });
  };

  const handleAddWidget = (type: WidgetType = 'kpi_metric') => {
    const newWidget: DashboardWidget = {
      id: `w-${Date.now()}`,
      title: type === 'kpi_metric' ? 'Nueva Métrica Clave' : 'Nuevo Análisis Gráfico',
      type,
      width: type === 'kpi_metric' ? 'third' : 'half',
      height: 'md',
      dimension: 'stage',
      metric: 'project_count',
      colorScheme: 'amber',
      customDescription: 'Widget personalizado agregado por el usuario',
    };
    setConfig({
      ...config,
      widgets: [...config.widgets, newWidget],
    });
  };

  const handleSave = () => {
    const updated = {
      ...config,
      updatedAt: new Date().toISOString(),
    };
    onSaveDashboard(updated);
    setIsSuccessMessage(true);
    setTimeout(() => {
      setIsSuccessMessage(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Constructor de Dashboards (Dashboard Builder)
              </h2>
              <p className="text-xs text-slate-400">
                Personaliza componentes, métricas, dimensiones y distribución del panel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Builder Tabs */}
        <div className="flex items-center px-6 border-b border-slate-800 bg-slate-950/30 gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('widgets')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'widgets'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Widgets & Componentes ({config.widgets.length})
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'meta'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Configuración & Metadatos
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'presets'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Plantillas & Gestión
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'widgets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Componentes Activos en el Grid
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Ajusta el ancho (1/3, 1/2, 2/3, Full), tipo de gráfico, dimensión y posición
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddWidget('kpi_metric')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold border border-slate-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Métrica KPI</span>
                  </button>
                  <button
                    onClick={() => handleAddWidget('stage_funnel')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold border border-slate-700 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Gráfico / Funnel</span>
                  </button>
                </div>
              </div>

              {/* Lista editable de widgets */}
              <div className="space-y-3">
                {config.widgets.map((widget, idx) => (
                  <div
                    key={widget.id}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={widget.title}
                          onChange={(e) => handleUpdateWidget(idx, { title: e.target.value })}
                          className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white font-bold flex-1 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveWidget(idx, 'up')}
                          disabled={idx === 0}
                          title="Mover arriba"
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveWidget(idx, 'down')}
                          disabled={idx === config.widgets.length - 1}
                          title="Mover abajo"
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveWidget(idx)}
                          title="Eliminar widget"
                          className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Controles del widget */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      {/* Tipo de Widget */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                          Tipo de Visualización
                        </label>
                        <select
                          value={widget.type}
                          onChange={(e) =>
                            handleUpdateWidget(idx, { type: e.target.value as WidgetType })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                        >
                          <option value="kpi_metric">Métrica KPI</option>
                          <option value="stage_funnel">Funnel de Etapas (14)</option>
                          <option value="pie_chart">Distribución (Barras/Donut)</option>
                          <option value="signal_feed">Feed de Señales Tempranas</option>
                          <option value="opportunity_priority_chart">Prioridades de Oportunidad</option>
                          <option value="recent_capex_table">Tabla de CAPEX & Proyectos</option>
                          <option value="epcm_distribution">Ecosistema EPCM & Contratistas</option>
                        </select>
                      </div>

                      {/* Ancho en Grid */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                          Ancho en Panel
                        </label>
                        <select
                          value={widget.width}
                          onChange={(e) =>
                            handleUpdateWidget(idx, { width: e.target.value as any })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                        >
                          <option value="third">1/3 de ancho (4 cols)</option>
                          <option value="half">1/2 de ancho (6 cols)</option>
                          <option value="two-thirds">2/3 de ancho (8 cols)</option>
                          <option value="full">Ancho completo (12 cols)</option>
                        </select>
                      </div>

                      {/* Dimensión de Análisis */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                          Dimensión de Análisis
                        </label>
                        <select
                          value={widget.dimension || 'stage'}
                          onChange={(e) =>
                            handleUpdateWidget(idx, { dimension: e.target.value as DimensionType })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                        >
                          <option value="stage">Etapa del Proyecto (1-14)</option>
                          <option value="mineral">Mineral (Cu, Li, Au...)</option>
                          <option value="country">País (Chile, Perú, Arg)</option>
                          <option value="signal_category">Categoría de Señal (A-H)</option>
                          <option value="opportunity_priority">Prioridad Comercial</option>
                          <option value="project_type">Tipo (Green/Brownfield)</option>
                        </select>
                      </div>

                      {/* Esquema de Color */}
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">
                          Acento de Color
                        </label>
                        <select
                          value={widget.colorScheme || 'amber'}
                          onChange={(e) =>
                            handleUpdateWidget(idx, { colorScheme: e.target.value as any })
                          }
                          className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-amber-400 text-xs"
                        >
                          <option value="amber">Ámbar Minero</option>
                          <option value="cyan">Cian Radar</option>
                          <option value="emerald">Esmeralda Oportunidad</option>
                          <option value="rose">Rosa / Crítico</option>
                          <option value="indigo">Índigo Ecosistema</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nombre del Dashboard
                </label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Descripción del Objetivo Analítico
                </label>
                <textarea
                  rows={3}
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onDuplicateDashboard(config)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                >
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Duplicar este Dashboard como Nuevo</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Dashboards Guardados y Acciones Globales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allDashboards.map((dash) => (
                  <div
                    key={dash.id}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{dash.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                        {dash.description}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono mt-2 block">
                        {dash.widgets.length} widgets configurados
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-300">
                    Restaurar Configuración Predeterminada
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Restaura los paneles predeterminados originales de RADAR MINERO
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('¿Restaurar los dashboards predeterminados originales?')) {
                      onRestoreDefaults();
                      onClose();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-semibold transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Predeterminados</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/80">
          <span className="text-xs text-slate-400">
            {config.widgets.length} componentes en grid de 12 columnas
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-lg shadow-amber-500/20"
            >
              {isSuccessMessage ? (
                <>
                  <Check className="w-4 h-4 text-emerald-950" />
                  <span>¡Guardado!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Guardar Dashboard</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
