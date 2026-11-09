// Motor de Detección de Señales - TRACER

export type SignalCategory =
  | 'Ambiental'
  | 'Inversión'
  | 'Ingeniería y desarrollo'
  | 'Contratación'
  | 'Corporativa y financiera'
  | 'Organizacional'
  | 'Operacional'
  | 'Sectorial';

export type SignalConfidence = 'Alta' | 'Media' | 'Baja';
export type SignalRelevance = 'Crítica' | 'Alta' | 'Media' | 'Informativa';
export type SignalValidationState = 'Verificada' | 'En revisión' | 'Detectada automát.' | 'Confirmada por analista';

export interface SignalHistoryLog {
  timestamp: string;
  action: string;
  userOrEngine: string;
  notes?: string;
}

export interface EarlySignal {
  id: string;
  name: string;
  category: SignalCategory;
  description: string;
  originalSource: 'SEA / SEIA' | 'COCHILCO' | 'CMF' | 'SERNAGEOMIN' | 'SEDAR+' | 'Corporativo / Prensa' | 'MINEM' | 'RIGI / Provincias';
  sourceUrl: string;
  country: 'Chile' | 'Perú' | 'Argentina';
  publishedDate: string;
  detectionDate: string;
  relatedProjectId: string;
  relatedProjectName: string;
  relatedCompany: string;
  projectStage: string;
  relevance: SignalRelevance;
  confidence: SignalConfidence;
  
  // Interpretación Comercial (Principio central del producto)
  commercialInterpretation: {
    hypothesis: string;
    potentialNeeds: string[]; // Servicios, equipamiento, consultorías requeridas
    targetServices: string[]; // Categorías de proveedores aplicables
    anticipationWindowMonths: number; // Meses de anticipación antes de licitación pública
    supportingEvidence: string[];
  };

  validationState: SignalValidationState;
  historyLogs: SignalHistoryLog[];
}
