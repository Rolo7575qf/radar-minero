import { CommercialOpportunity } from '../types/opportunity';
import { initialProjects } from './mockProjects';
import { initialSignals } from './mockSignals';
import { calculateOpportunityScore, getPriorityFromScore, DEFAULT_WEIGHTS } from '../services/scoringService';

const pCentinela = initialProjects.find(p => p.id === 'proj-centinela-2')!;
const pNuevaUnion = initialProjects.find(p => p.id === 'proj-nuevaunion')!;
const pLBI = initialProjects.find(p => p.id === 'proj-los-bronces-integrado')!;
const pVizcachitas = initialProjects.find(p => p.id === 'proj-vizcachitas')!;
const pMaricunga = initialProjects.find(p => p.id === 'proj-maricunga-litio')!;
const pTeniente = initialProjects.find(p => p.id === 'proj-teniente-nnm')!;

// Calculamos los scorings utilizando el servicio matemático
const scoreCentinela = calculateOpportunityScore(
  pCentinela,
  initialSignals.filter(s => s.relatedProjectId === 'proj-centinela-2'),
  3,
  2,
  3,
  DEFAULT_WEIGHTS
);

const scoreNuevaUnion = calculateOpportunityScore(
  pNuevaUnion,
  initialSignals.filter(s => s.relatedProjectId === 'proj-nuevaunion'),
  2,
  2,
  8,
  DEFAULT_WEIGHTS
);

const scoreLBI = calculateOpportunityScore(
  pLBI,
  initialSignals.filter(s => s.relatedProjectId === 'proj-los-bronces-integrado'),
  2,
  2,
  6,
  DEFAULT_WEIGHTS
);

const scoreVizcachitas = calculateOpportunityScore(
  pVizcachitas,
  initialSignals.filter(s => s.relatedProjectId === 'proj-vizcachitas'),
  2,
  2,
  12,
  DEFAULT_WEIGHTS
);

const scoreMaricunga = calculateOpportunityScore(
  pMaricunga,
  initialSignals.filter(s => s.relatedProjectId === 'proj-maricunga-litio'),
  2,
  1,
  7,
  DEFAULT_WEIGHTS
);

const scoreTeniente = calculateOpportunityScore(
  pTeniente,
  initialSignals.filter(s => s.relatedProjectId === 'proj-teniente-nnm'),
  3,
  2,
  4,
  DEFAULT_WEIGHTS
);

export const initialOpportunities: CommercialOpportunity[] = [
  {
    id: 'opp-cent-01',
    title: 'Subcontrato de Ensayos No Destructivos (NDT) e Inspección Técnica EPCM',
    relatedProjectId: 'proj-centinela-2',
    relatedProjectName: 'Nueva Centinela (Segunda Concentradora)',
    targetCompany: 'Fluor Chile / Antofagasta Minerals',
    country: 'Chile',
    projectStage: '11. Construcción',
    originatingSignalIds: ['sig-cont-cent-2026-02'],
    originatingSignalNames: ['Fluor Chile abre precalificación de subcontratos electromecánicos para Concentradora 2'],
    detectionDate: '2026-10-23',
    potentialNeed: 'Inspección técnica independiente de soldaduras críticas de molinos SAG y líneas de tuberías de alta presión para concentrado y agua.',
    relatedSolutionCategory: 'Inspección Técnica (ITO) / Ensayos No Destructivos',
    involvedCompanies: [
      { name: 'Fluor Chile', role: 'EPCM Contratante' },
      { name: 'Antofagasta Minerals', role: 'Titular Mandante' },
      { name: 'Sigdo Koppers', role: 'Contratista Montaje Mayor' }
    ],
    keyDecisionMakers: [
      {
        name: 'Carlos Monroy',
        title: 'Project Director EPCM',
        company: 'Fluor Chile',
        relevanceNote: 'Aprueba la Vendor List de contratistas de control de calidad en faena'
      },
      {
        name: 'Loreto Valenzuela',
        title: 'Lead Procurement Manager Subcontratos',
        company: 'Fluor Chile',
        relevanceNote: 'Emite los paquetes de licitación cerrada y gestiona precalificación'
      }
    ],
    anticipationWindowMonths: 3,
    priority: getPriorityFromScore(scoreCentinela.totalScore),
    confidence: 'Alta',
    recommendedNextAction: 'Enviar dossier técnico de acreditaciones ISO/NCh a Loreto Valenzuela (Fluor) y solicitar inclusión inmediata en la lista de proveedores homologados para el paquete NDT.',
    commercialStatus: 'Precalificación Abierta',
    estimatedContractValueUSD: 3800000,
    scoring: scoreCentinela
  },
  {
    id: 'opp-nu-02',
    title: 'Monitoreo Hidrogeológico Telemétrico y Modelación de Relaves Espesados',
    relatedProjectId: 'proj-nuevaunion',
    relatedProjectName: 'Proyecto NuevaUnión (Relincho + El Morro)',
    targetCompany: 'NuevaUnión SpA / Teck',
    country: 'Chile',
    projectStage: '8. Permisos y aprobaciones',
    originatingSignalIds: ['sig-sea-nu-2026-01'],
    originatingSignalNames: ['Ingreso de Adenda Complementaria N° 3 y Estudio de Relaves Espesados'],
    detectionDate: '2026-10-15',
    potentialNeed: 'Diseño e implementación de red de piezómetros con telemetría satelital y modelo de transporte hidrogeológico para compromisos RCA.',
    relatedSolutionCategory: 'Hidrogeología / Monitoreo Ambiental / Relaves',
    involvedCompanies: [
      { name: 'NuevaUnión SpA', role: 'Titular' },
      { name: 'Teck Resources', role: 'Operador Principal' },
      { name: 'WSP Chile', role: 'Consultor Ambiental Titular' }
    ],
    keyDecisionMakers: [
      {
        name: 'Gonzalo Arancibia',
        title: 'Gerente de Sustentabilidad y Permisos',
        company: 'NuevaUnión SpA',
        relevanceNote: 'Define los requerimientos técnicos de monitoreo ambiental exigidos por el SEA Atacama'
      },
      {
        name: 'Andrés Villaseca',
        title: 'Director de Desarrollo de Proyectos Cobre',
        company: 'Teck Resources',
        relevanceNote: 'Valida presupuestos de estudios previos a la Decisión Final de Inversión'
      }
    ],
    anticipationWindowMonths: 8,
    priority: getPriorityFromScore(scoreNuevaUnion.totalScore),
    confidence: 'Alta',
    recommendedNextAction: 'Contactar a la gerencia ambiental de NuevaUnión ofreciendo una sesión técnica sobre instrumentación en línea autónoma probada en alta cordillera de Atacama.',
    commercialStatus: 'En Análisis Comercial',
    estimatedContractValueUSD: 2400000,
    scoring: scoreNuevaUnion
  },
  {
    id: 'opp-lbi-03',
    title: 'Ingeniería y Simulación de Ventilación de Galerías Profundas Subterráneas',
    relatedProjectId: 'proj-los-bronces-integrado',
    relatedProjectName: 'Los Bronces Integrado (LBI)',
    targetCompany: 'Anglo American Sur',
    country: 'Chile',
    projectStage: '7. Ingeniería de detalle',
    originatingSignalIds: ['sig-org-lbi-2026-03'],
    originatingSignalNames: ['Nombramiento de Study Director de Minería Subterránea en Anglo American'],
    detectionDate: '2026-10-12',
    potentialNeed: 'Modelamiento termodinámico de ventilación y diseño de piques verticales de inyección de aire para el macizo rocoso bajo glaciares.',
    relatedSolutionCategory: 'Ventilación Minera / Ingeniería Subterránea',
    involvedCompanies: [
      { name: 'Anglo American Sur', role: 'Titular Operador' },
      { name: 'Hatch', role: 'Ingeniería de Detalle Subterránea' }
    ],
    keyDecisionMakers: [
      {
        name: 'Fernando Gómez',
        title: 'Head of Studies & Projects LBI',
        company: 'Anglo American',
        relevanceNote: 'Nuevo Study Director con responsabilidad sobre el diseño subterráneo seguro'
      },
      {
        name: 'Claudia Hormazábal',
        title: 'Commercial Lead Sustainable Procurement',
        company: 'Anglo American',
        relevanceNote: 'Gestiona la precalificación de proveedores de ingeniería de nicho'
      }
    ],
    anticipationWindowMonths: 6,
    priority: getPriorityFromScore(scoreLBI.totalScore),
    confidence: 'Media',
    recommendedNextAction: 'Presentar caso de estudio sobre eficiencia energética en ventilación bajo condiciones de alta montaña y control de temperatura en galerías profundas.',
    commercialStatus: 'Mapeo de Decisores',
    estimatedContractValueUSD: 1900000,
    scoring: scoreLBI
  },
  {
    id: 'opp-vizc-04',
    title: 'Homologación en Vendor List Ausenco para Filtros Prensa de Gran Escala',
    relatedProjectId: 'proj-vizcachitas',
    relatedProjectName: 'Proyecto Vizcachitas',
    targetCompany: 'Ausenco Engineering / Los Andes Copper',
    country: 'Chile',
    projectStage: '5. Factibilidad',
    originatingSignalIds: ['sig-ing-vizc-2026-05'],
    originatingSignalNames: ['Los Andes Copper adjudica a Ausenco el Estudio de Factibilidad Definitivo (DFS)'],
    detectionDate: '2026-09-30',
    potentialNeed: 'Incorporación de marcas y tecnologías de filtrado rápido y bandas de transporte de queque seco en las especificaciones técnicas del DFS.',
    relatedSolutionCategory: 'Filtrado de Relaves / Equipamiento de Deshidratación',
    involvedCompanies: [
      { name: 'Ausenco Engineering', role: 'EPCM / Diseñador del DFS' },
      { name: 'Los Andes Copper Ltd.', role: 'Titular Propietario' }
    ],
    keyDecisionMakers: [
      {
        name: 'Álvaro Tapia',
        title: 'Vicepresidente Minería Chile',
        company: 'Ausenco',
        relevanceNote: 'Dirección ejecutiva del estudio y validación del CAPEX tecnológico'
      },
      {
        name: 'Francisca Morales',
        title: 'Project Engineering Manager DFS',
        company: 'Ausenco',
        relevanceNote: 'Ingeniera a cargo de redactar las hojas de datos de equipos de proceso'
      }
    ],
    anticipationWindowMonths: 12,
    priority: getPriorityFromScore(scoreVizcachitas.totalScore),
    confidence: 'Alta',
    recommendedNextAction: 'Agendar reunión técnica con Francisca Morales (Ausenco) para someter datos de rendimiento y curvas de consumo de energía de filtros prensa.',
    commercialStatus: 'Contacto Inicial / Warm Intro',
    estimatedContractValueUSD: 12500000,
    scoring: scoreVizcachitas
  },
  {
    id: 'opp-mar-05',
    title: 'Suministro de Columnas de Adsorción y Resinas Selectivas de Litio (EDL)',
    relatedProjectId: 'proj-maricunga-litio',
    relatedProjectName: 'Proyecto Blanco (Salar de Maricunga)',
    targetCompany: 'Codelco Litio SpA',
    country: 'Chile',
    projectStage: '8. Permisos y aprobaciones',
    originatingSignalIds: ['sig-corp-mar-2026-06'],
    originatingSignalNames: ['Codelco crea filial Codelco Litio SpA y prepara selección de socio tecnológico'],
    detectionDate: '2026-10-08',
    potentialNeed: 'Pilotaje a escala semi-industrial de tecnología de Extracción Directa de Litio con alta tasa de recirculación de agua y bajo consumo de reactivos.',
    relatedSolutionCategory: 'Tecnología DLE / Plantas de Proceso Químico',
    involvedCompanies: [
      { name: 'Codelco Litio SpA', role: 'Titular Mandante' },
      { name: 'Worley Chile', role: 'Ingeniería Conceptual' }
    ],
    keyDecisionMakers: [
      {
        name: 'Rodrigo Andaur',
        title: 'Gerente Corporativo Nuevos Negocios Mineros',
        company: 'Codelco',
        relevanceNote: 'Coordina la evaluación de proveedores de DLE para la Estrategia Nacional del Litio'
      }
    ],
    anticipationWindowMonths: 7,
    priority: getPriorityFromScore(scoreMaricunga.totalScore),
    confidence: 'Alta',
    recommendedNextAction: 'Participar en la ronda de consultas de Codelco Litio enviando el expediente de pruebas con salmueras de Maricunga y resultados de recuperación de litio.',
    commercialStatus: 'Identificada Tempranamente',
    estimatedContractValueUSD: 8500000,
    scoring: scoreMaricunga
  },
  {
    id: 'opp-ten-06',
    title: 'Monitoreo Microsísmico en Tiempo Real y Fortificación de Alta Energía',
    relatedProjectId: 'proj-teniente-nnm',
    relatedProjectName: 'El Teniente: Nuevo Nivel Mina (Andesita y Recursos Norte)',
    targetCompany: 'Codelco División El Teniente',
    country: 'Chile',
    projectStage: '11. Construcción',
    originatingSignalIds: ['sig-oper-ten-2026-07'],
    originatingSignalNames: ['Codelco Teniente reporta avance del 82% en túneles de Andesita y adjudica obras de fortificación'],
    detectionDate: '2026-10-28',
    potentialNeed: 'Instalación de sensores geomecánicos de fibra óptica y pernos de deformación plástica capaces de disipar estallidos de roca en frentes de avance profundo.',
    relatedSolutionCategory: 'Geomecánica / Seguridad Operacional / Fortificación Dinámica',
    involvedCompanies: [
      { name: 'Codelco Chile - VP', role: 'Mandante' },
      { name: 'Vial y Vives DSD', role: 'Contratista de Obras Subterráneas' }
    ],
    keyDecisionMakers: [
      {
        name: 'Rodrigo Andaur',
        title: 'Gerente de Proyectos El Teniente',
        company: 'Codelco VP',
        relevanceNote: 'Responsable de la seguridad operacional y continuidad del túnel Andesita'
      },
      {
        name: 'Claudio Bustos',
        title: 'Director de Abastecimiento Estratégico',
        company: 'Codelco',
        relevanceNote: 'Gestiona los contratos marco de seguridad minera subterránea'
      }
    ],
    anticipationWindowMonths: 4,
    priority: getPriorityFromScore(scoreTeniente.totalScore),
    confidence: 'Alta',
    recommendedNextAction: 'Presentar solicitud de homologación técnica para pernos dinámicos de disipación de choque en la Gerencia de Seguridad Minera de Codelco VP.',
    commercialStatus: 'RFI / RFQ en Proceso',
    estimatedContractValueUSD: 4200000,
    scoring: scoreTeniente
  }
];
