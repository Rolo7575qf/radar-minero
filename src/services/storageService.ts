import { MiningProject } from '../types/project';
import { EarlySignal } from '../types/signal';
import { MiningCompany, EcosystemRelation } from '../types/company';
import { CommercialOpportunity, ScoringWeights } from '../types/opportunity';
import { DashboardConfig } from '../types/dashboard';
import { initialProjects } from '../data/mockProjects';
import { initialSignals } from '../data/mockSignals';
import { initialCompanies, ecosystemRelations } from '../data/mockCompanies';
import { initialOpportunities } from '../data/mockOpportunities';
import { defaultDashboards } from '../data/defaultDashboards';
import { DEFAULT_WEIGHTS } from './scoringService';

const STORAGE_KEYS = {
  PROJECTS: 'radar_minero_projects_v1',
  SIGNALS: 'radar_minero_signals_v1',
  COMPANIES: 'radar_minero_companies_v1',
  RELATIONS: 'radar_minero_relations_v1',
  OPPORTUNITIES: 'radar_minero_opportunities_v1',
  DASHBOARDS: 'radar_minero_dashboards_v1',
  ACTIVE_DASHBOARD_ID: 'radar_minero_active_dashboard_id_v1',
  SCORING_WEIGHTS: 'radar_minero_scoring_weights_v1',
};

export const storageService = {
  getProjects(): MiningProject[] {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
      return initialProjects;
    }
    try {
      return JSON.parse(data);
    } catch {
      return initialProjects;
    }
  },

  saveProjects(projects: MiningProject[]): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  },

  getSignals(): EarlySignal[] {
    const data = localStorage.getItem(STORAGE_KEYS.SIGNALS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(initialSignals));
      return initialSignals;
    }
    try {
      return JSON.parse(data);
    } catch {
      return initialSignals;
    }
  },

  saveSignals(signals: EarlySignal[]): void {
    localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(signals));
  },

  getCompanies(): MiningCompany[] {
    const data = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(initialCompanies));
      return initialCompanies;
    }
    try {
      return JSON.parse(data);
    } catch {
      return initialCompanies;
    }
  },

  getEcosystemRelations(): EcosystemRelation[] {
    const data = localStorage.getItem(STORAGE_KEYS.RELATIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.RELATIONS, JSON.stringify(ecosystemRelations));
      return ecosystemRelations;
    }
    try {
      return JSON.parse(data);
    } catch {
      return ecosystemRelations;
    }
  },

  getOpportunities(): CommercialOpportunity[] {
    const data = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(initialOpportunities));
      return initialOpportunities;
    }
    try {
      return JSON.parse(data);
    } catch {
      return initialOpportunities;
    }
  },

  saveOpportunities(opps: CommercialOpportunity[]): void {
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opps));
  },

  getDashboards(): DashboardConfig[] {
    const data = localStorage.getItem(STORAGE_KEYS.DASHBOARDS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(defaultDashboards));
      return defaultDashboards;
    }
    try {
      return JSON.parse(data);
    } catch {
      return defaultDashboards;
    }
  },

  saveDashboards(dashboards: DashboardConfig[]): void {
    localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(dashboards));
  },

  getActiveDashboardId(): string {
    const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_DASHBOARD_ID);
    return id || defaultDashboards[0].id;
  },

  setActiveDashboardId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DASHBOARD_ID, id);
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
  },

  resetAllToDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    localStorage.setItem(STORAGE_KEYS.SIGNALS, JSON.stringify(initialSignals));
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(initialCompanies));
    localStorage.setItem(STORAGE_KEYS.RELATIONS, JSON.stringify(ecosystemRelations));
    localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(initialOpportunities));
    localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(defaultDashboards));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_DASHBOARD_ID, defaultDashboards[0].id);
    localStorage.setItem(STORAGE_KEYS.SCORING_WEIGHTS, JSON.stringify(DEFAULT_WEIGHTS));
  }
};
