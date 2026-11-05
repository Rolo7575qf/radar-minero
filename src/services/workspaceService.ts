// Espacio de trabajo por usuario (pipeline, ponderaciones, dashboards) guardado en D1
// vía /api/workspace. La identidad la entrega Cloudflare Access; si no hay sesión válida
// o falla la carga, no se envía nada (se evita pisar datos del servidor con valores por defecto).
import { CommercialStatus, ScoringWeights } from '../types/opportunity';
import { DashboardConfig } from '../types/dashboard';

export interface OppOverride {
  status?: CommercialStatus;
  note?: string;
  updatedAt: string;
}

export interface WorkspaceState {
  oppOverrides?: Record<string, OppOverride>;
  scoringWeights?: ScoringWeights;
  dashboards?: DashboardConfig[];
  activeDashboardId?: string;
  providerServices?: string[]; // perfil de proveedor: ids de servicios que ofrece
  clientBrand?: { name?: string; logo?: string }; // identidad del cliente (logo redimensionado)
}

let ready = false;
let email: string | null = null;
let pending: WorkspaceState = {};
let timer: ReturnType<typeof setTimeout> | null = null;

async function flush() {
  timer = null;
  if (!ready) return;
  try {
    const current = await workspaceService.load(true);
    const merged = { ...(current || {}), ...pending };
    pending = {};
    await fetch('/api/workspace', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merged),
    });
  } catch {
    /* sin red: el cambio queda solo en este navegador */
  }
}

export const workspaceService = {
  async load(silent = false): Promise<WorkspaceState | null> {
    try {
      const res = await fetch('/api/workspace');
      if (!res.ok) return null;
      const data = await res.json();
      if (data && data.email) email = data.email;
      if (!silent) ready = true;
      return (data && data.state) || {};
    } catch {
      return null;
    }
  },

  // Correo verificado por Cloudflare Access (null si no hay sesión)
  getEmail(): string | null {
    return email;
  },

  queueSave(partial: WorkspaceState): void {
    if (!ready) return;
    pending = { ...pending, ...partial };
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, 800);
  },
};
