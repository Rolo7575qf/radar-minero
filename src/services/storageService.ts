import { MiningProject } from '../types/project';
import { EarlySignal } from '../types/signal';
import { CommercialOpportunity, ScoringWeights } from '../types/opportunity';
import { DashboardConfig } from '../types/dashboard';
import { Actor } from '../types/company';
import { defaultDashboards } from '../data/defaultDashboards';
import { DEFAULT_WEIGHTS } from './scoringService';
import { workspaceService } from './workspaceService';

const STORAGE_KEYS = {
  PROJECTS: 'radar_minero_projects_v2',
  SIGNALS: 'radar_minero_signals_v2',
  OPPORTUNITIES: 'radar_minero_opportunities_v2',
  DASHBOARDS: 'radar_minero_dashboards_v2',
  ACTIVE_DASHBOARD_ID: 'radar_minero_active_dashboard_id_v2',
  SCORING_WEIGHTS: 'radar_minero_scoring_weights_v1',
};

export const storageService = {
  getProjects(): MiningProject[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveProjects(projects: MiningProject[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getSignals(): EarlySignal[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SIGNALS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveSignals(signals: EarlySignal[]): void {
    localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(signals));
  },

  getOpportunities(): CommercialOpportunity[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveOpportunities(opps: CommercialOpportunity[]): void {
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opps));
  },

  /** Los tableros predefinidos toman siempre el texto vigente, aunque el usuario tenga una copia guardada. */
  refreshPredefinedTexts(dashboards: DashboardConfig[]): DashboardConfig[] {
    return dashboards.map((d) => {
      const base = defaultDashboards.find((x) => x.id === d.id);
      if (!base || !d.isPredefined) return d;
      return {
        ...d,
        description: base.description,
        widgets: d.widgets.map((w) => {
          const bw = base.widgets.find((x) => x.id === w.id);
          return bw ? { ...w, title: bw.title, customDescription: bw.customDescription } : w;
        }),
      };
    });
  },

  getDashboards(): DashboardConfig[] {
    const data = localStorage.getItem(STORAGE_KEYS.DASHBOARDS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(defaultDashboards));
      return defaultDashboards;
    }
    try {
      return this.refreshPredefinedTexts(JSON.parse(data));
    } catch {
      return defaultDashboards;
    }
  },

  saveDashboards(dashboards: DashboardConfig[]): void {
    localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(dashboards));
    workspaceService.queueSave({ dashboards });
  },

  getActiveDashboardId(): string {
    const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_DASHBOARD_ID);
    return id || defaultDashboards[0].id;
  },

  setActiveDashboardId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DASHBOARD_ID, id);
    workspaceService.queueSave({ activeDashboardId: id });
  },

  getScoringWeights(): ScoringWeights {
    const data = localStorage.getItem(STORAGE_KEYS.SCORING_WEIGHTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SCORING_WEIGHTS, JSON.stringify(DEFAULT_WEIGHTS));
      return DEFAULT_WEIGHTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return DEFAULT_WEIGHTS;
    }
  },

  saveScoringWeights(weights: ScoringWeights): void {
    localStorage.setItem(STORAGE_KEYS.SCORING_WEIGHTS, JSON.stringify(weights));
    workspaceService.queueSave({ scoringWeights: weights });
  },

  resetAllToDefaults(): void {
    // Los datos reales viven en D1: se limpia el caché local y se restauran dashboards y pesos.
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SIGNALS);
    localStorage.removeItem(STORAGE_KEYS.OPPORTUNITIES);
    localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(defaultDashboards));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DASHBOARD_ID, defaultDashboards[0].id);
    localStorage.setItem(STORAGE_KEYS.SCORING_WEIGHTS, JSON.stringify(DEFAULT_WEIGHTS));
    workspaceService.queueSave({
      dashboards: defaultDashboards,
      activeDashboardId: defaultDashboards[0].id,
      scoringWeights: DEFAULT_WEIGHTS,
    });
  },

  /** Actores clave (nombre, cargo, correo) desde D1. Si no hay API, devuelve lista vacía. */
  async fetchActors(): Promise<Actor[]> {
    try {
      const res = await fetch('/api/actors');
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },

  /**
   * Intenta sincronizar datos en vivo con Cloudflare D1 en producción.
   * Si no está disponible o falla la red, conserva los datos locales transparentemente.
   */
  async syncWithCloudflareD1(): Promise<{
    projects?: MiningProject[];
    signals?: EarlySignal[];
    opportunities?: CommercialOpportunity[];
  } | null> {
    try {
      const [projRes, sigRes, oppRes] = await Promise.allSettled([
        fetch('/api/projects'),
        fetch('/api/signals'),
        fetch('/api/opportunities'),
      ]);

      let updatedProjects: MiningProject[] | undefined;
      let updatedSignals: EarlySignal[] | undefined;
      let updatedOpps: CommercialOpportunity[] | undefined;

      if (projRes.status === 'fulfilled' && projRes.value.ok) {
        const data = await projRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          updatedProjects = data;
          this.saveProjects(data);
        }
      }

      if (sigRes.status === 'fulfilled' && sigRes.value.ok) {
        const data = await sigRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          updatedSignals = data;
          this.saveSignals(data);
        }
      }

      if (oppRes.status === 'fulfilled' && oppRes.value.ok) {
        const data = await oppRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          updatedOpps = data;
          this.saveOpportunities(data);
        }
      }

      return {
        projects: updatedProjects,
        signals: updatedSignals,
        opportunities: updatedOpps,
      };
    } catch {
      // Entorno local o sin Cloudflare D1 activo: fallback silencioso a localStorage
      return null;
    }
  },
};
