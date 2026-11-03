import { EarlySignal } from '../types/signal';

export const initialSignals: EarlySignal[] = [
  {
    id: 'sig-sea-nu-2026-01',
    name: 'Ingreso de Adenda Complementaria N° 3 y Estudio de Relaves Espesados',
    category: 'Ambiental',
    description: 'NuevaUnión ingresó ante el SEA Atacama la Adenda N° 3 respondiendo al ICSARA final sobre estabilidad física del tranque y tuberías de transporte de concentrado.',
    originalSource: 'SEA / SEIA',
    sourceUrl: 'https://seia.sea.gob.cl/expediente/expedientesEvaluacion.php?modo=ficha&id_expediente=21389472',
    country: 'Chile',
    publishedDate: '2026-10-14',
    detectionDate: '2026-10-14T08:30:00Z',
    relatedProjectId: 'proj-nuevaunion',
    relatedProjectName: 'Proyecto NuevaUnión (Relincho + El Morro)',
    relatedCompany: 'NuevaUnión SpA (Teck - Newmont)',
    projectStage: '8. Permisos y aprobaciones',
    relevance: 'Crítica',
    confidence: 'Alta',
    commercialInterpretation: {
      hypothesis: 'El proyecto se encuentra en la recta final de obtención de la RCA favorable (estimada para Q1 2027), lo que gatillará de inmediato licitaciones de ingeniería de detalle y preparación de obras tempranas.',
      potentialNeeds: [
        'Monitoreo hidrogeológico en línea y telemetría de napas subterráneas',
        'Modelación avanzada de reología de relaves espesados',
        'Ingeniería de detalle para caminos de acceso cordilleranos y campamentos de pioneros',
        'Auditoría y consultoría de cumplimiento de compromisos ambientales voluntarios (RCA)'
      ],
      targetServices: ['Consultoría geotécnica', 'Ingeniería hidráulica', 'Obras tempranas / Campamentos', 'Instrumentación ambiental'],
      anticipationWindowMonths: 8,
      supportingEvidence: [
        'Adenda responde a los últimos 4 servicios públicos pendientes en Atacama',
        'Presupuesto para ingeniería de detalle reservado en el plan trienal de Teck Resources'
      ]
    },
    validationState: 'Verificada',
    historyLogs: [
      {
        timestamp: '2026-10-14T08:30:00Z',
        action: 'Detección automática por crawler SEIA',
        userOrEngine: 'Radar Engine SEIA-Chile'
      },
      {
        timestamp: '2026-10-14T11:15:00Z',
        action: 'Clasificación e inferencia comercial validada',
        userOrEngine: 'Analista Senior Minería LatAm'
      }
    ]
  },
  {
    id: 'sig-cont-cent-2026-02',
    name: 'Fluor Chile abre precalificación de subcontratos electromecánicos para Concentradora 2',
    category: 'Contratación',
    description: 'Fluor Chile, en su calidad de EPCM de Nueva Centinela, ha publicado en plataforma privada de proveedores el requerimiento de precalificación para montaje electromecánico de molienda y flotación.',
    originalSource: 'Corporativo / Prensa',
    sourceUrl: 'https://aminerals.cl/proveedores/procesos-abiertos/centinela-fluor',
    country: 'Chile',
    publishedDate: '2026-10-22',
    detectionDate: '2026-10-22T14:10:00Z',
    relatedProjectId: 'proj-centinela-2',
    relatedProjectName: 'Nueva Centinela (Segunda Concentradora)',
    relatedCompany: 'Antofagasta Minerals / Fluor',
    projectStage: '11. Construcción',
    relevance: 'Crítica',
    confidence: 'Alta',
    commercialInterpretation: {
      hypothesis: 'Fluor está armando la matriz de proveedores secundarios antes de la adjudicación del contrato mayor de montaje a fines de año. Momento exacto para proveedores de soporte especializado, grúas de alto tonelaje y ensayos no destructivos.',
      potentialNeeds: [
        'Arriendo de grúas de alto tonelaje (500t - 800t) para montaje de molinos SAG',
        'Servicios de inspección técnica, control de calidad y ensayos no destructivos (NDT)',
        'Sistemas de piping de alta aleación y revestimientos antidesgaste',
        'Servicios de comisionamiento eléctrico y pruebas de aislamiento de subestación 220kV'
      ],
      targetServices: ['Montaje electromecánico', 'Arriendo maquinaria pesada', 'Inspección técnica (ITO)', 'Piping y Calderería'],
      anticipationWindowMonths: 3,
      supportingEvidence: [
        'Fluor ha enviado invitaciones RFI a contratistas Tier 1 y Tier 2 en Antofagasta',
        'Cronograma maestro de obra establece inicio de montaje de celdas para Q2 2027'
      ]
    },
    validationState: 'Confirmada por analista',
    historyLogs: [
      {
        timestamp: '2026-10-22T14:10:00Z',
        action: 'Ingesta desde portal corporativo de compras',
        userOrEngine: 'Engine Procurement-Monitor'
      }
    ]
  },
  {
    id: 'sig-org-lbi-2026-03',
    name: 'Nombramiento de Study Director de Minería Subterránea en Anglo American',
    category: 'Organizacional',
    description: 'Anglo American anunció la incorporación de ex-gerente de proyectos subterráneos de Codelco como nuevo Study Director del proyecto Los Bronces Integrado subterráneo.',
    originalSource: 'Corporativo / Prensa',
    sourceUrl: 'https://angloamerican.com/media/press-releases/2026/appointment-lbi-subterraneo',
    country: 'Chile',
    publishedDate: '2026-10-10',
    detectionDate: '2026-10-10T16:00:00Z',
    relatedProjectId: 'proj-los-bronces-integrado',
    relatedProjectName: 'Los Bronces Integrado (LBI)',
    relatedCompany: 'Anglo American Sur',
    projectStage: '7. Ingeniería de detalle',
    relevance: 'Alta',
    confidence: 'Media',
    commercialInterpretation: {
      hypothesis: 'La designación de un especialista con amplio recorrido en minería de block caving y obras subterráneas complejas anticipa la revisión y definición del paquete de licitación de túneles y macro-bloques de explotación.',
      potentialNeeds: [
        'Consultoría de diseño de túneles en roca dura con altos esfuerzos confinantes',
        'Equipos de perforación jumbo autónomos y teleoperados',
        'Ventilación secundaria de alta eficiencia y sistemas de refrigeración de galerías',
        'Software de modelamiento geomecánico 3D continuo'
      ],
      targetServices: ['Minería subterránea', 'Ventilación minera', 'Geomecánica', 'Automatización minera'],
      anticipationWindowMonths: 6,
      supportingEvidence: [
        'Historial del ejecutivo contratado se enfoca en transición de rajo a subterránea con proveedores innovadores',
        'LBI mantiene calendario de licitación de accesos subterráneos para primer semestre 2027'
      ]
    },
    validationState: 'Verificada',
    historyLogs: [
      {
        timestamp: '2026-10-10T16:00:00Z',
        action: 'Alerta de talento ejecutivo detectada en LinkedIn / Comunicado corporativo',
        userOrEngine: 'Radar Talent & Org Tracker'
      }
    ]
  },
  {
    id: 'sig-inv-sd-2026-04',
    name: 'Capstone Copper avanza en sindicación de crédito de US$ 1.200M para Santo Domingo',
    category: 'Inversión',
    description: 'Capstone Copper informó en conferencia de resultados avances decisivos con consorcio de bancos internacionales para el paquete de financiamiento del proyecto de cobre-hierro Santo Domingo.',
    originalSource: 'SEDAR+',
    sourceUrl: 'https://www.sedarplus.ca/cpa/companyView.do?companyOid=00030582',
    country: 'Chile',
    publishedDate: '2026-10-18',
    detectionDate: '2026-10-18T19:00:00Z',
    relatedProjectId: 'proj-santo-domingo',
    relatedProjectName: 'Santo Domingo Cobre-Hierro-Cobalto',
    relatedCompany: 'Capstone Copper Corp.',
    projectStage: '6. Ingeniería básica',
    relevance: 'Alta',
    confidence: 'Alta',
    commercialInterpretation: {
      hypothesis: 'El cierre financiero desbloqueará la orden de compra de equipos de largo plazo (Lead items como molinos, espesadores y equipos de separación magnética) y la contratación del EPCM definitivo.',
      potentialNeeds: [
        'Equipos de separación magnética húmeda para concentrado de hierro',
        'Ingeniería de detalle para ductos de concentrado y agua desalada',
        'Servicios de gestión de campamento y hotelería modular para 3.500 trabajadores',
        'Supervisión y control de aseguramiento de calidad (QA/QC)'
      ],
      targetServices: ['Equipamiento de proceso', 'Ingeniería EPCM', 'Campamentos y hotelería', 'QA/QC'],
      anticipationWindowMonths: 5,
      supportingEvidence: [
        'Términos clave de la deuda aprobados por bancos coordinadores líderes',
        'Sinergia con planta MantoVerde confirmada en presentación a analistas'
      ]
    },
    validationState: 'Verificada',
    historyLogs: [
      {
        timestamp: '2026-10-18T19:00:00Z',
        action: 'Ingesta desde filings SEDAR+ de Capstone Copper',
        userOrEngine: 'Radar Financial & TSX Bot'
      }
    ]
  },
  {
    id: 'sig-ing-vizc-2026-05',
    name: 'Los Andes Copper adjudica a Ausenco el Estudio de Factibilidad Definitivo (DFS)',
    category: 'Ingeniería y desarrollo',
    description: 'Los Andes Copper anunció la adjudicación formal a Ausenco Engineering del DFS para el proyecto Vizcachitas en Putaendo, fijando entrega para fines de 2027.',
    originalSource: 'SEDAR+',
    sourceUrl: 'https://losandescopper.com/news/dfs-award-ausenco',
    country: 'Chile',
    publishedDate: '2026-09-28',
    detectionDate: '2026-09-28T10:00:00Z',
    relatedProjectId: 'proj-vizcachitas',
    relatedProjectName: 'Proyecto Vizcachitas',
    relatedCompany: 'Los Andes Copper / Ausenco',
    projectStage: '5. Factibilidad',
    relevance: 'Alta',
    confidence: 'Alta',
    commercialInterpretation: {
      hypothesis: 'Durante el desarrollo del DFS (los próximos 12 meses), Ausenco definirá la lista de proveedores homologados (Vendor List) para todos los paquetes de equipos principales y auxiliares.',
      potentialNeeds: [
        'Pruebas metalúrgicas y de filtrabilidad a escala piloto para relaves secos',
        'Estudios geotécnicos de detalle en trazado de túneles y quebrada',
        'Modelación de dispersión de polvo y monitoreo continuo de material particulado',
        'Inclusión de marcas en la Vendor List oficial del estudio DFS'
      ],
      targetServices: ['Laboratorio metalúrgico', 'Geotecnia de detalle', 'Vendor List homologación', 'Monitoreo ambiental'],
      anticipationWindowMonths: 12,
      supportingEvidence: [
        'Ausenco está contratando ingenieros jefes de disciplina mecánica y piping en Santiago',
        'El diseño prioriza un footprint hídrico mínimo con relaves espesados y filtrados'
      ]
    },
    validationState: 'Confirmada por analista',
    historyLogs: [
      {
        timestamp: '2026-09-28T10:00:00Z',
        action: 'Detección en comunicado de prensa corporativo y TSX',
        userOrEngine: 'Radar TSX Ingestion'
      }
    ]
  },
  {
    id: 'sig-corp-mar-2026-06',
    name: 'Codelco crea filial Codelco Litio SpA y prepara selección de socio tecnológico',
    category: 'Corporativa y financiera',
    description: 'En cumplimiento del mandato presidencial de la Estrategia Nacional del Litio, Codelco constituyó legalmente la filial para el Salar de Maricunga y abrirá proceso de selección para socio tecnológico de Extracción Directa (EDL).',
    originalSource: 'CMF',
    sourceUrl: 'https://cmfchile.cl/institucional/hechos_esenciales/codelco-litio-maricunga',
    country: 'Chile',
    publishedDate: '2026-10-05',
    detectionDate: '2026-10-05T12:00:00Z',
    relatedProjectId: 'proj-maricunga-litio',
    relatedProjectName: 'Proyecto Blanco (Salar de Maricunga)',
    relatedCompany: 'Codelco Litio',
    projectStage: '8. Permisos y aprobaciones',
    relevance: 'Crítica',
    confidence: 'Alta',
    commercialInterpretation: {
      hypothesis: 'Oportunidad de primer orden para proveedores de tecnologías de Extracción Directa de Litio (DLE), resinas de adsorción, sistemas de membranas y tratamiento de efluentes salinos con alta tasa de recuperación de agua.',
      potentialNeeds: [
        'Plantas piloto modulares de adsorción / desorción de litio',
        'Sistemas de nanofiltración y ósmosis inversa para salmuera concentrada',
        'Consultoría hidrogeológica para reinyección profunda de salmuera sin afectar el acuífero',
        'Instrumentación de pozos con sensores de densidad y conductividad'
      ],
      targetServices: ['Tecnología DLE / Membranas', 'Plantas modulares', 'Hidrogeología salmueras', 'Sistemas de reinyección'],
      anticipationWindowMonths: 7,
      supportingEvidence: [
        'Ministerio de Minería confirmó que Maricunga requerirá DLE para minimizar pérdidas de agua por evaporación',
        'Codelco abrió registro previo de empresas con tecnología DLE probada'
      ]
    },
    validationState: 'Verificada',
    historyLogs: [
      {
        timestamp: '2026-10-05T12:00:00Z',
        action: 'Ingesta de Hecho Esencial CMF Chile',
        userOrEngine: 'Radar CMF Ingestion'
      }
    ]
  },
  {
    id: 'sig-oper-ten-2026-07',
    name: 'Codelco Teniente reporta avance del 82% en túneles de Andesita y adjudica obras de fortificación',
    category: 'Operacional',
    description: 'División El Teniente publicó informe de avances operacionales donde resalta la aceleración en el frente de desarrollo Andesita y la necesidad de licitar nuevos contratos de fortificación mecanizada.',
    originalSource: 'SERNAGEOMIN',
    sourceUrl: 'https://sernageomin.cl/informes-tecnicos-teniente-andesita',
    country: 'Chile',
    publishedDate: '2026-10-27',
    detectionDate: '2026-10-27T09:15:00Z',
    relatedProjectId: 'proj-teniente-nnm',
    relatedProjectName: 'El Teniente: Nuevo Nivel Mina (Andesita y Recursos Norte)',
    relatedCompany: 'Codelco División El Teniente',
    projectStage: '11. Construcción',
    relevance: 'Alta',
    confidence: 'Alta',
    commercialInterpretation: {
      hypothesis: 'El avance hacia zonas de mayor esfuerzo tensional exige blindaje de roca con hormigón proyectado (shotcrete) de fibra sintética y pernos autorroscantes de absorción de energía.',
      potentialNeeds: [
        'Suministro continuo de shotcrete con fibras estructurales de alta tenacidad',
        'Robots proyectadores de hormigón con control remoto',
        'Sensores acústicos de micro-sismicidad en frentes ciegos',
        'Servicios de mantenimiento electromecánico de chancadores subterráneos'
      ],
      targetServices: ['Fortificación y sostenimiento', 'Shotcrete mecanizado', 'Microsísmica', 'Mantención subterránea'],
      anticipationWindowMonths: 4,
      supportingEvidence: [
        'SERNAGEOMIN exige actualización de matriz de riesgos geomecánicos antes del hundimiento del bloque',
        'Licitaciones en portal de Codelco VP en estado próximo'
      ]
    },
    validationState: 'Confirmada por analista',
    historyLogs: [
      {
        timestamp: '2026-10-27T09:15:00Z',
        action: 'Detección en reporte trimestral de seguridad Sernageomin',
        userOrEngine: 'Radar Sernageomin Crawler'
      }
    ]
  },
  {
    id: 'sig-corp-bhp-2026-08',
    name: 'BHP y Lundin aprueban programa de exploración y desarrollo de US$ 250M para Josemaría',
    category: 'Corporativa y financiera',
    description: 'La nueva empresa conjunta creada por BHP y Lundin en San Juan, Argentina, aprobó el plan de trabajo conjunto para avanzar la ingeniería y logística de Josemaría bajo el régimen de incentivos RIGI.',
    originalSource: 'Corporativo / Prensa',
    sourceUrl: 'https://bhp.com/news/articles/2026/vicuna-district-investment-update',
    country: 'Argentina',
    publishedDate: '2026-10-15',
    detectionDate: '2026-10-15T18:00:00Z',
    relatedProjectId: 'proj-josemaria-arg',
    relatedProjectName: 'Proyecto Josemaría (Argentina)',
    relatedCompany: 'Lundin Mining / BHP JV',
    projectStage: '7. Ingeniería de detalle',
    relevance: 'Crítica',
    confidence: 'Alta',
    commercialInterpretation: {
      hypothesis: 'El ingreso de los estándares globales de BHP dinamizará contrataciones de proveedores binacionales (Chile-Argentina) capaces de brindar soporte logístico y técnico en la cordillera sanjuanina.',
      potentialNeeds: [
        'Logística y transporte de cargas sobredimensionadas a 4.000 msnm',
        'Campamentos sustentables de alta montaña con aislamiento térmico pasivo',
        'Estudios de ingeniería de trazado de caminos de acceso e interconexión eléctrica',
        'Servicios de perforación diamantina geotécnica profunda'
      ],
      targetServices: ['Logística binacional cordillerana', 'Campamentos sustentables', 'Perforación geotécnica', 'Ingeniería civil cordillera'],
      anticipationWindowMonths: 10,
      supportingEvidence: [
        'Aprobación formal del proyecto bajo el régimen RIGI confirmada por el Ministerio de Economía de Argentina',
        'Integración de equipos de compras de BHP en Santiago y Buenos Aires'
      ]
    },
    validationState: 'Verificada',
    historyLogs: [
      {
        timestamp: '2026-10-15T18:00:00Z',
        action: 'Ingesta de comunicado oficial conjunto BHP-Lundin',
        userOrEngine: 'Radar LatAm M&A Engine'
      }
    ]
  }
];
