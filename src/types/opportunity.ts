// Motor de Oportunidades Comerciales B2B - TRACER

export type OpportunityPriority = 'Máxima' | 'Alta' | 'Media' | 'Baja-media';

export type CommercialStatus =
  | 'Identificada Tempranamente'
  | 'En Análisis Comercial'
  | 'Mapeo de Decisores'
  | 'Contacto Inicial / Warm Intro'
  | 'Precalificación Abierta'
  | 'RFI / RFQ en Proceso'
  | 'Ganada'
  | 'Descartada / Archivada';

export interface ScoringWeights {
  maturity: number;          // Madurez del proyecto (20)
  recentSignals: number;     // Señales recientes de inversión o contratación (20)
  serviceFit: number;        // Compatibilidad con servicios potenciales (20)
  actorsIdentified: number;  // Identificación de actores y decisores (15)
  economicSize: number;      // Tamaño y viabilidad económica (15)
  anticipationWindow: number;// Ventana de anticipación comercial (10)
}

export interface ScoreBreakdown {
  maturityScore: number;          // 0 - 100 raw, multiplied by weight
  maturityExplanation: string;
  recentSignalsScore: number;
  recentSignalsExplanation: string;
  serviceFitScore: number;
  serviceFitExplanation: string;
  actorsIdentifiedScore: number;
  actorsIdentifiedExplanation: string;
  economicSizeScore: number;
  economicSizeExplanation: string;
  anticipationWindowScore: number;
  anticipationWindowExplanation: string;
  totalScore: number; // 0 - 100 weighted
}

export interface CommercialOpportunity {
  id: string;
  title: string;
  relatedProjectId: string;
  relatedProjectName: string;
  targetCompany: string; // Empresa objetivo a prospectar (Titular o EPCM adjudicado)
  country: 'Chile' | 'Perú' | 'Argentina';
  projectStage: string;
  originatingSignalIds: string[];
  originatingSignalNames: string[];
  detectionDate: string;
  potentialNeed: string; // Ej: "Estudio geotécnico avanzado para presa de relaves"
  relatedSolutionCategory: string; // Ej: "Consultoría geotécnica / Monitoreo sísmico"
  involvedCompanies: {
    name: string;
    role: string;
  }[];
  keyDecisionMakers: {
    name: string;
    title: string;
    company: string;
    relevanceNote: string;
    email?: string;
    emailStatus?: 'verificado' | 'aceptado_sin_verificar' | 'no_verificado';
    phone?: string;
    linkedinUrl?: string;
  }[];
  anticipationWindowMonths: number; // Meses guardados al detectar (referencia)
  targetRfqDate?: string;           // Fecha objetivo del RFQ (ISO)
  targetBasis?: string;             // 'estimada' | 'publicada' | 'confirmada'
  lastReviewed?: string;            // Última verificación (ISO)
  priority: OpportunityPriority;
  confidence: 'Alta' | 'Media' | 'Baja';
  recommendedNextAction: string; // Ej: "Agendar reunión con Study Director en Expomin / Enviar whitepaper técnico"
  commercialStatus: CommercialStatus;
  estimatedContractValueUSD?: number;
  scoring: ScoreBreakdown;
  clientNote?: string;        // Nota del cliente (espacio de trabajo)
  statusUpdatedAt?: string;   // Último cambio de estado hecho por el cliente
}
