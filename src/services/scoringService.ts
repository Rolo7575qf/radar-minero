import { ScoringWeights, ScoreBreakdown, CommercialOpportunity } from '../types/opportunity';
import { MiningProject } from '../types/project';
import { EarlySignal } from '../types/signal';
import { detectCategories, serviceLabel } from '../data/serviceCatalog';

// Perfil del proveedor: servicios que ofrece y texto del proyecto donde se buscan las necesidades.
export interface ServiceFitInput {
  services: string[];
  needText: string;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  maturity: 20,
  recentSignals: 20,
  serviceFit: 20,
  actorsIdentified: 15,
  economicSize: 15,
  anticipationWindow: 10,
};

/**
 * Calcula el scoring de 100 puntos configurable según las 6 variables del prompt maestro:
 * 1. Madurez del proyecto (20 pts)
 * 2. Señales recientes de inversión o contratación (20 pts)
 * 3. Compatibilidad con servicios potenciales (20 pts)
 * 4. Identificación de actores y decisores (15 pts)
 * 5. Tamaño y viabilidad económica (15 pts)
 * 6. Ventana de anticipación comercial (10 pts)
 */
export function calculateOpportunityScore(
  project: Partial<MiningProject>,
  recentSignals: EarlySignal[],
  involvedActorsCount: number,
  decisionMakersCount: number,
  anticipationMonths: number,
  customWeights: ScoringWeights = DEFAULT_WEIGHTS,
  fit?: ServiceFitInput
): ScoreBreakdown {
  // 1. Madurez del proyecto (0 - 100 raw)
  let rawMaturity = 40;
  let maturityExplanation = 'Proyecto en etapas preliminares';
  const stage = project.stage || '';

  if (stage.includes('Contratación') || stage.includes('Ingeniería de detalle')) {
    rawMaturity = 95;
    maturityExplanation = 'Etapa óptima de definición contractual e ingeniería de detalle.';
  } else if (stage.includes('Decisión de inversión') || stage.includes('Ingeniería básica') || stage.includes('Permisos')) {
    rawMaturity = 85;
    maturityExplanation = 'Alta madurez: permisos o ingeniería básica en curso, requerimientos técnicos maduros.';
  } else if (stage.includes('Factibilidad') || stage.includes('Prefactibilidad')) {
    rawMaturity = 65;
    maturityExplanation = 'Madurez intermedia: estudios de viabilidad activos para licitaciones tempranas.';
  } else if (stage.includes('Construcción') || stage.includes('Puesta en marcha')) {
    rawMaturity = 75;
    maturityExplanation = 'Proyecto en ejecución avanzada, contratos complementarios y servicios en sitio.';
  } else {
    rawMaturity = 40;
    maturityExplanation = 'Etapa conceptual o de prospección temprana.';
  }

  // 2. Señales recientes de inversión o contratación (0 - 100 raw)
  let rawSignals = 40;
  let signalsExplanation = 'Señales habituales detectadas.';
  const highImpactSignals = recentSignals.filter(s => 
    s.category === 'Inversión' || s.category === 'Contratación' || s.category === 'Ingeniería y desarrollo'
  );
  
  if (highImpactSignals.length >= 3) {
    rawSignals = 95;
    signalsExplanation = `Alta actividad: ${highImpactSignals.length} señales críticas recientes (inversión/contratación/ingeniería).`;
  } else if (highImpactSignals.length >= 1) {
    rawSignals = 75;
    signalsExplanation = `Actividad confirmada: ${highImpactSignals.length} señal(es) clave de avance reciente.`;
  } else if (recentSignals.length > 0) {
    rawSignals = 60;
    signalsExplanation = `${recentSignals.length} señales informativas registradas en los últimos 90 días.`;
  } else {
    rawSignals = 30;
    signalsExplanation = 'Baja frecuencia de señales en el último trimestre.';
  }

  // 3. Compatibilidad con servicios potenciales (0 - 100 raw)
  let rawServiceFit = 50;
  let serviceFitExplanation = 'Define tu perfil de proveedor para medir la compatibilidad real con este proyecto.';
  if (fit && fit.services.length > 0) {
    const needs = detectCategories(fit.needText);
    if (needs.length === 0) {
      rawServiceFit = 40;
      serviceFitExplanation = 'Alcance por confirmar: aún no hay servicios identificables en la información del proyecto.';
    } else {
      const matched = needs.filter((n) => fit.services.includes(n));
      if (matched.length === 0) {
        rawServiceFit = 10;
        serviceFitExplanation = `El proyecto demanda ${needs.map(serviceLabel).join(', ')}; ninguno coincide con tu perfil.`;
      } else {
        rawServiceFit = Math.min(95, Math.round(55 + (40 * matched.length) / needs.length));
        serviceFitExplanation = `Coinciden ${matched.length} de ${needs.length} servicios que demanda el proyecto: ${matched.map(serviceLabel).join(', ')}.`;
      }
    }
  }

  // 4. Identificación de actores y decisores (0 - 100 raw)
  let rawActors = 40;
  let actorsExplanation = 'Pocos decisores individualizados.';
  if (decisionMakersCount >= 3 && involvedActorsCount >= 2) {
    rawActors = 95;
    actorsExplanation = `Ecosistema mapeado: ${involvedActorsCount} empresas clave y ${decisionMakersCount} tomadores de decisiones identificados con cargo y rol.`;
  } else if (decisionMakersCount >= 1) {
    rawActors = 70;
    actorsExplanation = `Mapeo inicial: ${decisionMakersCount} decisor(es) clave identificados en la compañía o EPCM.`;
  } else {
    rawActors = 45;
    actorsExplanation = 'Identificada la empresa titular pero aún sin contacto directo de adquisiciones.';
  }

  // 5. Tamaño y viabilidad económica (0 - 100 raw)
  const capex = project.capexEstimatedMillionsUSD || 0;
  let rawSize = 50;
  let sizeExplanation = `CAPEX estimado de US$ ${capex}M.`;
  if (capex >= 2000) {
    rawSize = 95;
    sizeExplanation = `Megaproyecto clase mundial (US$ ${capex}M CAPEX) con alto presupuesto para proveedores.`;
  } else if (capex >= 600) {
    rawSize = 85;
    sizeExplanation = `Proyecto de gran envergadura (US$ ${capex}M CAPEX) con sólida solvencia financiera.`;
  } else if (capex >= 150) {
    rawSize = 70;
    sizeExplanation = `Proyecto mediano a grande (US$ ${capex}M CAPEX).`;
  } else {
    rawSize = 55;
    sizeExplanation = `Inversión menor o etapa exploratoria preliminar (US$ ${capex}M).`;
  }

  // 6. Ventana de anticipación comercial (0 - 100 raw)
  let rawAnticipation = 60;
  let anticipationExplanation = `${anticipationMonths} meses estimados de anticipación.`;
  if (anticipationMonths >= 6 && anticipationMonths <= 18) {
    rawAnticipation = 95;
    anticipationExplanation = `Ventana comercial óptima (${anticipationMonths} meses): tiempo suficiente para posicionar solución antes del RFI formal.`;
  } else if (anticipationMonths > 18) {
    rawAnticipation = 70;
    anticipationExplanation = `Ventana amplia (${anticipationMonths} meses): monitoreo y siembra de relación a mediano plazo.`;
  } else {
    rawAnticipation = 65;
    anticipationExplanation = `Ventana corta (${anticipationMonths} meses): requiere contacto urgente ante inminente proceso.`;
  }

  // Ponderación normalizada sobre 100 puntos
  const totalWeight =
    customWeights.maturity +
    customWeights.recentSignals +
    customWeights.serviceFit +
    customWeights.actorsIdentified +
    customWeights.economicSize +
    customWeights.anticipationWindow;

  const scoreMaturity = (rawMaturity * customWeights.maturity) / totalWeight;
  const scoreSignals = (rawSignals * customWeights.recentSignals) / totalWeight;
  const scoreServiceFit = (rawServiceFit * customWeights.serviceFit) / totalWeight;
  const scoreActors = (rawActors * customWeights.actorsIdentified) / totalWeight;
  const scoreSize = (rawSize * customWeights.economicSize) / totalWeight;
  const scoreAnticipation = (rawAnticipation * customWeights.anticipationWindow) / totalWeight;

  const totalScore = Math.round(
    scoreMaturity + scoreSignals + scoreServiceFit + scoreActors + scoreSize + scoreAnticipation
  );

  return {
    maturityScore: Math.round(scoreMaturity * 10) / 10,
    maturityExplanation,
    recentSignalsScore: Math.round(scoreSignals * 10) / 10,
    recentSignalsExplanation: signalsExplanation,
    serviceFitScore: Math.round(scoreServiceFit * 10) / 10,
    serviceFitExplanation,
    actorsIdentifiedScore: Math.round(scoreActors * 10) / 10,
    actorsIdentifiedExplanation: actorsExplanation,
    economicSizeScore: Math.round(scoreSize * 10) / 10,
    economicSizeExplanation: sizeExplanation,
    anticipationWindowScore: Math.round(scoreAnticipation * 10) / 10,
    anticipationWindowExplanation: anticipationExplanation,
    totalScore,
  };
}

export function getPriorityFromScore(score: number): 'Máxima' | 'Alta' | 'Media' | 'Baja-media' {
  if (score >= 82) return 'Máxima';
  if (score >= 68) return 'Alta';
  if (score >= 50) return 'Media';
  return 'Baja-media';
}
