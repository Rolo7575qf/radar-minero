// Catálogo de servicios que un proveedor puede ofrecer a proyectos mineros.
// Cada categoría se reconoce en el texto del proyecto por palabras clave (sin tildes, en minúscula).
// Si el texto no menciona nada reconocible, se declara "alcance por confirmar": no se inventan necesidades.

export interface ServiceCategory {
  id: string;
  label: string;
  keywords: string[];
}

export const SERVICE_CATALOG: ServiceCategory[] = [
  { id: 'ingenieria', label: 'Ingeniería y estudios', keywords: ['ingenier', 'estudio', 'consultor', 'geotec', 'modelacion'] },
  { id: 'civil', label: 'Obras civiles y movimiento de tierra', keywords: ['obra civil', 'obras civiles', 'movimiento de tierra', 'esteril', 'cantera', 'camino', 'excavaci', 'obras anexas', 'obras complementarias', 'canalizaci', 'impermeabiliz'] },
  { id: 'montaje', label: 'Montaje electromecánico y equipos de proceso', keywords: ['montaje', 'electromec', 'equipos de proceso', 'planta', 'concentradora', 'chancado', 'molienda', 'flotacion'] },
  { id: 'agua', label: 'Agua, desalación y bombeo', keywords: ['agua', 'desal', 'bombeo', 'hidric', 'hidraul', 'aduccion', 'tuberia', 'salmuera', 'impulsion'] },
  { id: 'relaves', label: 'Relaves y depósitos', keywords: ['relave', 'espesad', 'botadero', 'deposito de', 'ripios'] },
  { id: 'energia', label: 'Energía y electricidad', keywords: ['energ', 'electric', 'solar', 'subestacion', 'transmision'] },
  { id: 'perforacion', label: 'Perforación, exploración e hidrogeología', keywords: ['sondaje', 'perforaci', 'exploraci', 'prospecci', 'hidrogeolog', 'geofisic'] },
  { id: 'mina', label: 'Servicios mina y minería subterránea', keywords: ['servicios mina', 'subterr', 'fortificaci', 'ventilaci', 'tronadura', 'rajo', 'explotacion'] },
  { id: 'mantenimiento', label: 'Mantenimiento industrial', keywords: ['mantenimiento', 'continuidad operacional'] },
  { id: 'automatizacion', label: 'Automatización y tecnología', keywords: ['automatiz', 'tecnolog', 'instrument', 'digital'] },
  { id: 'ambiental', label: 'Consultoría ambiental y cierre de faenas', keywords: ['ambiental', 'cierre', 'monitoreo', 'permis'] },
  { id: 'logistica', label: 'Logística, campamentos y transporte', keywords: ['logistic', 'campamento', 'transporte', 'altura'] },
];

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Devuelve los ids de categorías que el texto menciona.
export function detectCategories(text: string): string[] {
  const t = normalize(text);
  return SERVICE_CATALOG.filter((c) => c.keywords.some((k) => t.includes(k))).map((c) => c.id);
}

export const serviceLabel = (id: string) => SERVICE_CATALOG.find((c) => c.id === id)?.label ?? id;
