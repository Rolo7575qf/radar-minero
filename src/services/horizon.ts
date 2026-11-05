// Tramos del horizonte de pipeline (meses hasta el RFQ / licitación formal).
export type HorizonTier = 'tarde' | 'urgente' | 'optima' | 'estrategico' | 'fuera';

export interface HorizonInfo {
  tier: HorizonTier;
  label: string;
  rawScore: number;
  tone: string; // clases tailwind para el chip
  description: string;
}

export const HORIZON_TIERS: Record<HorizonTier, Omit<HorizonInfo, 'tier'>> = {
  tarde: { label: 'Tarde', rawScore: 40, tone: 'text-rose-400 border-rose-500/40', description: 'Menos de 3 meses: el proceso ya está cerrado o por cerrarse.' },
  urgente: { label: 'Urgente', rawScore: 75, tone: 'text-orange-400 border-orange-500/40', description: '3 a 6 meses: contacto inmediato antes del RFI formal.' },
  optima: { label: 'Óptima', rawScore: 95, tone: 'text-emerald-400 border-emerald-500/40', description: '6 a 24 meses: tiempo para construir relación y posicionarse.' },
  estrategico: { label: 'Estratégico', rawScore: 65, tone: 'text-sky-400 border-sky-500/40', description: '24 a 48 meses: siembra de relación y monitoreo.' },
  fuera: { label: 'Fuera de horizonte', rawScore: 20, tone: 'text-slate-500 border-slate-600', description: 'Más de 48 meses: solo seguimiento.' },
};

export function tierFromMonths(months: number): HorizonTier {
  if (months < 3) return 'tarde';
  if (months < 6) return 'urgente';
  if (months <= 24) return 'optima';
  if (months <= 48) return 'estrategico';
  return 'fuera';
}

export function getHorizon(months: number): HorizonInfo {
  const tier = tierFromMonths(months);
  return { tier, ...HORIZON_TIERS[tier] };
}

/** Meses desde hoy hasta la fecha objetivo (ISO). Si no hay fecha, usa el valor guardado. */
export function monthsUntil(targetDate: string | undefined | null, fallback: number, now: Date = new Date()): number {
  if (!targetDate) return fallback;
  const t = new Date(targetDate + (targetDate.length === 10 ? 'T00:00:00' : ''));
  if (isNaN(t.getTime())) return fallback;
  const diffMonths = (t.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30.4375);
  return Math.max(0, Math.round(diffMonths));
}

export function formatDateEs(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
}
