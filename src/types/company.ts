// Inteligencia del Ecosistema Empresarial - RADAR MINERO

export type CompanyRole =
  | 'Titular Minero'
  | 'Grupo Empresarial / Matriz'
  | 'Socio Inversionista'
  | 'EPCM'
  | 'Empresa de Ingeniería'
  | 'Contratista Principal Construcción'
  | 'Contratista Montaje / Obras Civiles'
  | 'Consultora Ambiental y Permisos'
  | 'Proveedor Equipamiento Mayor'
  | 'Infraestructura / Agua / Energía';

export interface CompanyContract {
  id: string;
  projectId: string;
  projectName: string;
  scope: string; // Alcance (ej: "Ingeniería de detalle concentradora", "Movimiento de tierras masivo")
  awardDate?: string;
  estimatedValueUSD?: number;
  status: 'Vigente' | 'En licitación' | 'Finalizado' | 'En adjudicación';
  source: string;
}

export interface CompanyKeyContact {
  name: string;
  role: string;
  department: string;
  linkedinOrProfile?: string;
  influenceLevel: 'Decisor Clave' | 'Evaluador Técnico' | 'Gestor Contratos' | 'Consultor Clave';
}

export interface MiningCompany {
  id: string;
  name: string;
  legalName?: string;
  countryOrigin: string;
  primaryRole: CompanyRole;
  supportedRoles: CompanyRole[];
  website: string;
  description: string;
  participatingProjectsCount: number;
  relatedProjectIds: string[];
  contracts: CompanyContract[];
  keyContacts: CompanyKeyContact[];
  verifiedSources: string[];
  tier: 'Tier 1 Global' | 'Tier 2 Regional' | 'Especialista Local';
}

export interface EcosystemRelation {
  sourceId: string;
  sourceName: string;
  sourceType: 'project' | 'company';
  targetId: string;
  targetName: string;
  targetType: 'company';
  relationType: 'titular' | 'epcm' | 'contratista' | 'consultora_ambiental' | 'socio' | 'proveedor';
  label: string;
  details?: string;
}
