import { EarlySignal, SignalCategory, SignalRelevance, SignalConfidence } from '../types/signal';
import { MiningProject, ProjectHistoryEntry } from '../types/project';
import { CommercialOpportunity } from '../types/opportunity';
import { calculateOpportunityScore, getPriorityFromScore, DEFAULT_WEIGHTS } from './scoringService';

export interface IngestSignalPayload {
  name: string;
  category: SignalCategory;
  description: string;
  originalSource: 'SEA / SEIA' | 'COCHILCO' | 'CMF' | 'SERNAGEOMIN' | 'SEDAR+' | 'Corporativo / Prensa' | 'MINEM' | 'RIGI / Provincias';
  sourceUrl: string;
  country: 'Chile' | 'Perú' | 'Argentina';
  relatedProjectId: string;
  relevance: SignalRelevance;
  confidence: SignalConfidence;
  hypothesis: string;
  potentialNeeds: string[];
  targetServices: string[];
  anticipationWindowMonths: number;
}

export const signalEngine = {
  /**
   * Ingesta y procesa una nueva señal conectando el flujo:
   * Fuente -> Señal -> Proyecto -> Evolución -> Hipótesis Comercial -> Oportunidad
   */
  processNewSignal(
    payload: IngestSignalPayload,
    currentProjects: MiningProject[],
    currentSignals: EarlySignal[],
    currentOpportunities: CommercialOpportunity[]
  ): {
    updatedSignals: EarlySignal[];
    updatedProjects: MiningProject[];
    updatedOpportunities: CommercialOpportunity[];
    newSignal: EarlySignal;
    newOpportunity?: CommercialOpportunity;
  } {
    const project = currentProjects.find(p => p.id === payload.relatedProjectId);
    const projectName = project ? project.name : 'Proyecto no catalogado';
    const company = project ? project.ownerCompany : 'Entidad Minera';
    const stage = project ? project.stage : 'En evaluación';

    const nowIso = new Date().toISOString();
    const newSignalId = `sig-${Date.now()}`;

    const newSignal: EarlySignal = {
      id: newSignalId,
      name: payload.name,
      category: payload.category,
      description: payload.description,
      originalSource: payload.originalSource,
      sourceUrl: payload.sourceUrl || 'https://radarminero.com/sources/verified',
      country: payload.country,
      publishedDate: new Date().toISOString().split('T')[0],
      detectionDate: nowIso,
      relatedProjectId: payload.relatedProjectId,
      relatedProjectName: projectName,
      relatedCompany: company,
      projectStage: stage,
      relevance: payload.relevance,
      confidence: payload.confidence,
      commercialInterpretation: {
        hypothesis: payload.hypothesis,
        potentialNeeds: payload.potentialNeeds,
        targetServices: payload.targetServices,
        anticipationWindowMonths: payload.anticipationWindowMonths || 6,
        supportingEvidence: [
          `Publicación confirmada en ${payload.originalSource}`,
          'Análisis de consistencia con cronograma de inversiones'
        ]
      },
      validationState: 'Detectada automát.',
      historyLogs: [
        {
          timestamp: nowIso,
          action: 'Ingesta y procesamiento en motor de señales',
          userOrEngine: 'Radar Signal Engine v1.0'
        }
      ]
    };

    const updatedSignals = [newSignal, ...currentSignals];

    // Actualizamos el proyecto preservando el historial inmutable
    let updatedProjects = [...currentProjects];
    if (project) {
      const historyEntry: ProjectHistoryEntry = {
        id: `hist-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        signalTitle: payload.name,
        source: payload.originalSource,
        changeDescription: payload.description,
        commercialInterpretation: payload.hypothesis,
        potentialImpact: payload.potentialNeeds.join(', '),
        confidenceLevel: payload.confidence
      };

      updatedProjects = currentProjects.map(p => {
        if (p.id === project.id) {
          return {
            ...p,
            lastUpdateDate: new Date().toISOString().split('T')[0],
            signalsCount: (p.signalsCount || 0) + 1,
            history: [historyEntry, ...(p.history || [])] // Conserva trazabilidad histórica
          };
        }
        return p;
      });
    }

    // Generamos una oportunidad comercial potencial asociada
    let newOpportunity: CommercialOpportunity | undefined;
    let updatedOpportunities = [...currentOpportunities];

    if (project && payload.potentialNeeds.length > 0) {
      const oppId = `opp-${Date.now()}`;
      const projectSignals = updatedSignals.filter(s => s.relatedProjectId === project.id);
      
      const scoring = calculateOpportunityScore(
        project,
        projectSignals,
        2, // actores conocidos
        1, // decisores
        payload.anticipationWindowMonths || 6,
        DEFAULT_WEIGHTS
      );

      newOpportunity = {
        id: oppId,
        title: `Prospección Temprana: ${payload.targetServices[0] || 'Servicios Especializados'} en ${project.name}`,
        relatedProjectId: project.id,
        relatedProjectName: project.name,
        targetCompany: project.epcmCompany || project.ownerCompany,
        country: project.country,
        projectStage: project.stage,
        originatingSignalIds: [newSignalId],
        originatingSignalNames: [newSignal.name],
        detectionDate: new Date().toISOString().split('T')[0],
        potentialNeed: payload.potentialNeeds.join('; '),
        relatedSolutionCategory: payload.targetServices.join(' / '),
        involvedCompanies: [
          { name: project.ownerCompany, role: 'Mandante Titular' },
          ...(project.epcmCompany ? [{ name: project.epcmCompany, role: 'EPCM Responsable' }] : [])
        ],
        keyDecisionMakers: [
          {
            name: 'Gerencia de Proyectos y Abastecimiento',
            title: 'Equipo Directivo de Compras',
            company: project.ownerCompany,
            relevanceNote: 'Licitaciones técnicas asociadas a la señal detectada'
          }
        ],
        anticipationWindowMonths: payload.anticipationWindowMonths || 6,
        priority: getPriorityFromScore(scoring.totalScore),
        confidence: payload.confidence,
        recommendedNextAction: `Contactar a la gerencia técnica de ${project.ownerCompany} para presentar credenciales respecto a: ${payload.potentialNeeds[0]}`,
        commercialStatus: 'Identificada Tempranamente',
        estimatedContractValueUSD: 1500000,
        scoring
      };

      updatedOpportunities = [newOpportunity, ...currentOpportunities];
    }

    return {
      updatedSignals,
      updatedProjects,
      updatedOpportunities,
      newSignal,
      newOpportunity
    };
  }
};
