// Tipos para Proyectos Mineros según especificación RADAR MINERO

export type MiningStage =
  | '1. Exploración'
  | '2. Exploración avanzada'
  | '3. Conceptual'
  | '4. Prefactibilidad'
  | '5. Factibilidad'
  | '6. Ingeniería básica'
  | '7. Ingeniería de detalle'
  | '8. Permisos y aprobaciones'
  | '9. Decisión de inversión'
  | '10. Contratación'
  | '11. Construcción'
  | '12. Puesta en marcha'
  | '13. Operación'
  | '14. Expansión o modificación';

export type MineralType =
  | 'Cobre'
  | 'Litio'
  | 'Oro'
  | 'Molibdeno'
  | 'Hierro'
  | 'Plata'
  | 'Polimetálico'
  | 'Potasio';

export type ProjectType = 'Greenfield' | 'Brownfield';

export type ProjectStatus = 'Activo' | 'En evaluación' | 'En construcción' | 'En operación' | 'Suspendido' | 'Pausado';

export interface ProjectHistoryEntry {
  id: string;
  date: string;
  signalTitle: string;
  source: string;
  previousStage?: MiningStage;
  newStage?: MiningStage;
  previousCapex?: number;
  newCapex?: number;
  changeDescription: string;
  commercialInterpretation: string;
  potentialImpact: string;
  confidenceLevel: 'Alta' | 'Media' | 'Baja';
}

export interface MiningProject {
  id: string;
  name: string;
  country: 'Chile' | 'Perú' | 'Argentina';
  region: string;
  locationDetails: string;
  latitude: number;
  longitude: number;
  ownerCompany: string; // Titular
  associatedCompanies: string[]; // Socios, matrices
  mainMineral: MineralType;
  secondaryMinerals?: MineralType[];
  projectType: ProjectType;
  capexEstimatedMillionsUSD: number;
  productiveCapacity?: string;
  estimatedStartDate?: string;
  estimatedCommissioningDate?: string;
  currentStatus: ProjectStatus;
  stage: MiningStage;
  informationSources: string[];
  lastUpdateDate: string;
  signalsCount: number;
  epcmCompany?: string;
  keyContractors?: string[];
  history: ProjectHistoryEntry[];
}
