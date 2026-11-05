import { MiningProject } from '../types/project';

/**
 * Rubros de proveedor de Radar Minero ("Para mi rubro").
 * Las etiquetas por proyecto son HIPÓTESIS inferidas de etapa, tipo y texto público;
 * no son hechos declarados por el titular.
 */
export interface Rubro {
  id: string;
  label: string;
  /** Momento comercial óptimo, en lenguaje simple */
  momento: string;
}

export const RUBROS: Rubro[] = [
  { id: 'ingenieria', label: 'Ingeniería y EPCM', momento: 'Del concepto a la ingeniería de detalle' },
  { id: 'geologia', label: 'Geología y sondajes', momento: 'Exploración y prefactibilidad' },
  { id: 'geotecnia', label: 'Geotecnia e hidrogeología', momento: 'Relaves, estériles y manejo de aguas' },
  { id: 'ambiental', label: 'Consultoría ambiental y permisos', momento: 'Ingreso al SEIA y permisos' },
  { id: 'civil', label: 'Obras civiles, hormigón y shotcrete', momento: 'Contratación y construcción' },
  { id: 'montaje', label: 'Montaje, estructuras y equipos', momento: 'Contratación y construcción' },
  { id: 'agua', label: 'Agua e infraestructura hídrica', momento: 'Desalinización, impulsión, tratamiento' },
  { id: 'energia', label: 'Energía y electricidad', momento: 'Subestaciones, líneas y renovables' },
  { id: 'mantencion', label: 'Mantención e inspección', momento: 'Operación y continuidad operacional' },
  { id: 'abastecimiento', label: 'Abastecimiento de insumos y repuestos', momento: 'Construcción y operación' },
];

export const RUBRO_LABEL: Record<string, string> = Object.fromEntries(RUBROS.map((r) => [r.id, r.label]));

export const MAX_RUBROS = 3;

const stageNumber = (p: MiningProject): number => parseInt(p.stage, 10) || 0;

const textOf = (p: MiningProject): string =>
  [
    p.name,
    p.ownerCompany,
    p.productiveCapacity || '',
    p.locationDetails || '',
    ...(p.history || []).slice(0, 8).map((h) => `${h.signalTitle} ${h.changeDescription}`),
  ]
    .join(' ')
    .toLowerCase();

/** Devuelve los ids de rubros que probablemente necesite el proyecto (hipótesis). */
export function inferRubros(p: MiningProject): string[] {
  const n = stageNumber(p);
  const t = textOf(p);
  const has = (re: RegExp) => re.test(t);
  const out = new Set<string>();

  if ((n >= 3 && n <= 7) || p.epcmCompany || has(/ingenier|factibilidad|epcm/)) out.add('ingenieria');
  if (n <= 2 || has(/sondaje|prospecci|exploraci|geolog/)) out.add('geologia');
  if (has(/relave|ester|botadero|tranque|hidrogeol|geot|acu[ií]fero|dep[oó]sito de/)) out.add('geotecnia');
  if (n === 8 || ((p.submissionType === 'EIA' || p.submissionType === 'DIA') && n <= 8) || has(/seia|rca|adenda|icsara|ambiental|cierre/)) out.add('ambiental');
  if ((n >= 9 && n <= 12) || has(/obras|hormig|shotcrete|civil|construcci/)) out.add('civil');
  if ((n >= 9 && n <= 12) || has(/planta|concentrador|montaje|estructura|fundici|lixiviaci/)) out.add('montaje');
  if (has(/agua|desal|h[ií]dric|impulsi/)) out.add('agua');
  if (has(/energ|el[eé]ctric|subestaci|l[ií]nea de|solar|fotovolt/)) out.add('energia');
  if (n >= 13 || has(/continuidad|operacional|vida [uú]til|mantenci|extensi/)) out.add('mantencion');
  if (n >= 10 || has(/abastec|suministro|insumo|repuesto/)) out.add('abastecimiento');

  return [...out];
}

const KEY = 'radar_rubros_v1';

export function loadRubros(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string').slice(0, MAX_RUBROS) : [];
  } catch {
    return [];
  }
}

export function saveRubros(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids.slice(0, MAX_RUBROS)));
  } catch {
    /* sin almacenamiento: solo en memoria */
  }
}
