// ==============================================================================
// TIPOS DE LICENCIAS, CLIENTES, RUBROS Y PAÍSES (CENTRO DE CONTROL IC)
// ==============================================================================

export type LicenseStatus = 'activa' | 'inactiva' | 'suspendida' | 'demo';
export type LicensePlan = 'Enterprise B2B' | 'Growth Partner' | 'Standard' | 'Trial' | 'Master Central Admin';

export interface ClientLicense {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  allowedEmails: string[];
  status: LicenseStatus;
  plan: LicensePlan;
  countries: string[];
  rubros: string[];
  maxUsers: number;
  startDate: string;
  expiryDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AvailableCountry {
  id: string;
  label: string;
  flag: string;
  isAvailableNow: boolean;
  description: string;
}

export interface AvailableRubro {
  id: string;
  label: string;
  iconName: string;
  isAvailableNow: boolean;
  description: string;
}

export const ALL_AVAILABLE_COUNTRIES: AvailableCountry[] = [
  {
    id: 'Chile',
    label: 'Chile',
    flag: '🇨🇱',
    isAvailableNow: true,
    description: 'Minería activa del cobre, litio, oro, hierro e infraestructura minera hídrica/desalación.',
  },
  {
    id: 'Perú',
    label: 'Perú',
    flag: '🇵🇪',
    isAvailableNow: false,
    description: 'Corredor minero sur (Arequipa, Moquegua, Tacna) y proyectos norte (Cajamarca).',
  },
  {
    id: 'Argentina',
    label: 'Argentina',
    flag: '🇦🇷',
    isAvailableNow: false,
    description: 'Proyectos de Cobre San Juan (Josemaría, Los Azules, Pachón) y Triángulo del Litio.',
  },
  {
    id: 'Colombia',
    label: 'Colombia',
    flag: '🇨🇴',
    isAvailableNow: false,
    description: 'Minería polimetálica y proyectos energéticos en evaluación.',
  },
];

export const ALL_AVAILABLE_RUBROS: AvailableRubro[] = [
  {
    id: 'Minería',
    label: 'Minería',
    iconName: 'Pickaxe',
    isAvailableNow: true,
    description: 'Cartera de inversiones, megaproyectos, plantas concentradoras, desaladoras y contratos EPCM.',
  },
  {
    id: 'Energía & Renovables',
    label: 'Energía & Renovables',
    iconName: 'Zap',
    isAvailableNow: false,
    description: 'Parques solares, eólicos, líneas de transmisión, subestaciones y almacenamiento BESS.',
  },
  {
    id: 'Infraestructura & Construcción',
    label: 'Infraestructura & Construcción',
    iconName: 'Building2',
    isAvailableNow: false,
    description: 'Obras públicas, puertos, plantas desalinizadoras multipropósito, túneles y autopistas.',
  },
  {
    id: 'Celulosa & Forestal',
    label: 'Celulosa & Forestal',
    iconName: 'TreePine',
    isAvailableNow: false,
    description: 'Modernización y ampliación de plantas industriales de celulosa, biomasa y aserraderos.',
  },
  {
    id: 'Agroindustria & Salmonicultura',
    label: 'Agroindustria & Salmonicultura',
    iconName: 'Fish',
    isAvailableNow: false,
    description: 'Centros de cultivo de alta tecnología, plantas procesadoras y cadenas logísticas frías.',
  },
];
