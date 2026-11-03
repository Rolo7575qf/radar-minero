import { MiningCompany, EcosystemRelation } from '../types/company';

export const initialCompanies: MiningCompany[] = [
  {
    id: 'comp-aminerals',
    name: 'Antofagasta Minerals',
    legalName: 'Antofagasta plc / Minera Centinela / Los Pelambres',
    countryOrigin: 'Chile / Reino Unido',
    primaryRole: 'Titular Minero',
    supportedRoles: ['Titular Minero', 'Grupo Empresarial / Matriz'],
    website: 'https://aminerals.cl',
    description: 'Uno de los mayores productores de cobre del mundo y principal grupo minero privado chileno controlado por el Grupo Luksic. Opera Los Pelambres, Centinela, Antucoya y Zaldívar.',
    participatingProjectsCount: 3,
    relatedProjectIds: ['proj-centinela-2'],
    contracts: [
      {
        id: 'cnt-am-01',
        projectId: 'proj-centinela-2',
        projectName: 'Nueva Centinela',
        scope: 'EPCM Planta Concentradora y Obras Auxiliares (Adjudicado a Fluor Chile)',
        awardDate: '2024-04-10',
        estimatedValueUSD: 1800000000,
        status: 'Vigente',
        source: 'Hecho Esencial CMF / Memoria Anual'
      }
    ],
    keyContacts: [
      {
        name: 'Patricio Echeverría',
        role: 'Gerente de Proyectos Nueva Centinela',
        department: 'Vicepresidencia de Proyectos',
        influenceLevel: 'Decisor Clave'
      },
      {
        name: 'María Paz Silva',
        role: 'Subgerente de Adquisiciones y Contratos Mayores',
        department: 'Cadena de Suministro Corporativa',
        influenceLevel: 'Gestor Contratos'
      }
    ],
    verifiedSources: ['CMF Chile', 'Presentaciones Institucionales', 'Reportes de Sustentabilidad'],
    tier: 'Tier 1 Global'
  },
  {
    id: 'comp-fluor',
    name: 'Fluor Chile',
    legalName: 'Fluor Corporation Sucursal Chile',
    countryOrigin: 'Estados Unidos',
    primaryRole: 'EPCM',
    supportedRoles: ['EPCM', 'Empresa de Ingeniería'],
    website: 'https://fluor.com',
    description: 'Gigante global de ingeniería, procura, construcción y mantenimiento. En Chile lidera el EPCM de Nueva Centinela y múltiples expansiones mineras en el norte grande.',
    participatingProjectsCount: 2,
    relatedProjectIds: ['proj-centinela-2'],
    contracts: [
      {
        id: 'cnt-fl-01',
        projectId: 'proj-centinela-2',
        projectName: 'Nueva Centinela',
        scope: 'Gestión EPCM integral Concentradora 95ktpd',
        status: 'Vigente',
        source: 'Contrato Marco Antofagasta Minerals'
      }
    ],
    keyContacts: [
      {
        name: 'Carlos Monroy',
        role: 'Project Director Nueva Centinela EPCM',
        department: 'Mining & Metals Fluor Chile',
        influenceLevel: 'Decisor Clave'
      },
      {
        name: 'Loreto Valenzuela',
        role: 'Lead Procurement Manager Subcontratos',
        department: 'Global Supply Chain',
        influenceLevel: 'Gestor Contratos'
      }
    ],
    verifiedSources: ['Engineering News-Record (ENR)', 'Prensa especializada Minería'],
    tier: 'Tier 1 Global'
  },
  {
    id: 'comp-teck',
    name: 'Teck Resources',
    legalName: 'Teck Resources Chile Ltda.',
    countryOrigin: 'Canadá',
    primaryRole: 'Titular Minero',
    supportedRoles: ['Titular Minero', 'Socio Inversionista'],
    website: 'https://teck.com',
    description: 'Compañía minera global diversificada canadiense enfocada en cobre y zinc. Opera Quebrada Blanca (QB2) en Tarapacá, Carmen de Andacollo y colidera los proyectos NuevaUnión y Zafranal.',
    participatingProjectsCount: 2,
    relatedProjectIds: ['proj-nuevaunion', 'proj-zafranal-peru'],
    contracts: [
      {
        id: 'cnt-tk-01',
        projectId: 'proj-nuevaunion',
        projectName: 'Proyecto NuevaUnión',
        scope: 'Ingeniería Conceptual y Adendas SEIA (JV con Newmont)',
        status: 'Vigente',
        source: 'SEDAR+ Technical Reports'
      }
    ],
    keyContacts: [
      {
        name: 'Andrés Villaseca',
        role: 'Director de Desarrollo de Proyectos Cobre Sudamérica',
        department: 'Project Development Teck',
        influenceLevel: 'Decisor Clave'
      },
      {
        name: 'Gonzalo Arancibia',
        role: 'Gerente de Sustentabilidad y Permisos NuevaUnión',
        department: 'Medio Ambiente y Comunidades',
        influenceLevel: 'Evaluador Técnico'
      }
    ],
    verifiedSources: ['SEDAR+', 'TSX', 'SEA Chile'],
    tier: 'Tier 1 Global'
  },
  {
    id: 'comp-codelco',
    name: 'Codelco Chile',
    legalName: 'Corporación Nacional del Cobre de Chile',
    countryOrigin: 'Chile',
    primaryRole: 'Titular Minero',
    supportedRoles: ['Titular Minero', 'Grupo Empresarial / Matriz'],
    website: 'https://codelco.com',
    description: 'Mayor empresa productora de cobre del planeta y propiedad estatal chilena. Desarrolla los megaproyectos estructurales: Chuquicamata Subterránea, El Teniente Nuevo Nivel Mina, Rajo Inca y la filial Codelco Litio.',
    participatingProjectsCount: 2,
    relatedProjectIds: ['proj-teniente-nnm', 'proj-maricunga-litio'],
    contracts: [
      {
        id: 'cnt-cod-01',
        projectId: 'proj-teniente-nnm',
        projectName: 'El Teniente: Nuevo Nivel Mina',
        scope: 'Obras subterráneas frente Andesita y Recursos Norte',
        status: 'Vigente',
        source: 'Portal de Compras Codelco VP'
      }
    ],
    keyContacts: [
      {
        name: 'Rodrigo Andaur',
        role: 'Gerente Corporativo de Proyectos El Teniente',
        department: 'Vicepresidencia de Proyectos (VP)',
        influenceLevel: 'Decisor Clave'
      },
      {
        name: 'Claudio Bustos',
        role: 'Director de Abastecimiento Estratégico',
        department: 'Gerencia de Abastecimiento Codelco',
        influenceLevel: 'Gestor Contratos'
      }
    ],
    verifiedSources: ['CMF Chile', 'Cochilco', 'Portal de Compras Codelco'],
    tier: 'Tier 1 Global'
  },
  {
    id: 'comp-anglo',
    name: 'Anglo American',
    legalName: 'Anglo American Sur S.A.',
    countryOrigin: 'Reino Unido',
    primaryRole: 'Titular Minero',
    supportedRoles: ['Titular Minero', 'Socio Inversionista'],
    website: 'https://angloamerican.com',
    description: 'Compañía minera global con operaciones clave de cobre en Chile (Los Bronces, El Soldado, Fundición Chagres y participación en Collahuasi) y Quellaveco en Perú.',
    participatingProjectsCount: 2,
    relatedProjectIds: ['proj-los-bronces-integrado', 'proj-collahuasi-c20'],
    contracts: [
      {
        id: 'cnt-aa-01',
        projectId: 'proj-los-bronces-integrado',
        projectName: 'Los Bronces Integrado (LBI)',
        scope: 'Ingeniería básica y de detalle minería subterránea (Hatch)',
        status: 'Vigente',
        source: 'Memoria Anual Anglo American'
      }
    ],
    keyContacts: [
      {
        name: 'Fernando Gómez',
        role: 'Head of Studies & Projects LBI',
        department: 'Mining Operations & Projects',
        influenceLevel: 'Decisor Clave'
      },
      {
        name: 'Claudia Hormazábal',
        role: 'Commercial Lead Sustainable Procurement',
        department: 'Supply Chain Chile',
        influenceLevel: 'Gestor Contratos'
      }
    ],
    verifiedSources: ['LSE Filings', 'SEA Chile', 'Memoria Anual'],
    tier: 'Tier 1 Global'
  },
  {
    id: 'comp-ausenco',
    name: 'Ausenco Engineering',
    legalName: 'Ausenco Chile SpA',
    countryOrigin: 'Australia',
    primaryRole: 'EPCM',
    supportedRoles: ['EPCM', 'Empresa de Ingeniería'],
    website: 'https://ausenco.com',
    description: 'Líder internacional en soluciones de ingeniería, diseño de plantas concentradoras de bajo CAPEX y relaves de alta densidad. Lidera el DFS de Vizcachitas y proyectos de desalinización.',
    participatingProjectsCount: 2,
    relatedProjectIds: ['proj-vizcachitas', 'proj-centinela-2'],
    contracts: [
      {
        id: 'cnt-aus-01',
        projectId: 'proj-vizcachitas',
        projectName: 'Proyecto Vizcachitas',
        scope: 'Definitive Feasibility Study (DFS) y Vendor Pre-qualification',
        awardDate: '2026-09-28',
        estimatedValueUSD: 35000000,
        status: 'Vigente',
        source: 'TSX Press Release'
      }
    ],
    keyContacts: [
      {
        name: 'Álvaro Tapia',
        role: 'Vicepresidente de Minería & Metales Chile',
        department: 'Ingeniería y Estudios',
        influenceLevel: 'Decisor Clave'
      },
      {
        name: 'Francisca Morales',
        role: 'Project Engineering Manager DFS Vizcachitas',
        department: 'Ingeniería de Procesos',
        influenceLevel: 'Evaluador Técnico'
      }
    ],
    verifiedSources: ['Ausenco News', 'TSX Filings'],
    tier: 'Tier 1 Global'
  },
  {
    id: 'comp-sigdokoppers',
    name: 'Sigdo Koppers',
    legalName: 'Ingeniería y Construcción Sigdo Koppers S.A. (ICSK)',
    countryOrigin: 'Chile',
    primaryRole: 'Contratista Principal Construcción',
    supportedRoles: ['Contratista Principal Construcción', 'Contratista Montaje / Obras Civiles'],
    website: 'https://sigdokoppers.cl',
    description: 'Conglomerado líder en servicios de ingeniería, construcción y montaje industrial en Sudamérica, con más de 60 años de trayectoria en la gran minería de cobre.',
    participatingProjectsCount: 2,
    relatedProjectIds: ['proj-centinela-2', 'proj-collahuasi-c20'],
    contracts: [
      {
        id: 'cnt-sk-01',
        projectId: 'proj-centinela-2',
        projectName: 'Nueva Centinela',
        scope: 'Montaje electromecánico primario y piping alta presión',
        status: 'Vigente',
        source: 'Prensa Económica / CMF'
      }
    ],
    keyContacts: [
      {
        name: 'Mauricio Ramos',
        role: 'Gerente de Operaciones Minería Norte',
        department: 'División Montaje Industrial',
        influenceLevel: 'Decisor Clave'
      }
    ],
    verifiedSources: ['CMF Chile', 'Memoria Anual ICSK'],
    tier: 'Tier 1 Global'
  },
  {
    id: 'comp-wsp',
    name: 'WSP Chile',
    legalName: 'WSP Asesorías Técnicas S.A.',
    countryOrigin: 'Canadá / Chile',
    primaryRole: 'Consultora Ambiental y Permisos',
    supportedRoles: ['Consultora Ambiental y Permisos', 'Empresa de Ingeniería'],
    website: 'https://wsp.com',
    description: 'Una de las principales consultoras globales de servicios profesionales multidisciplinarios en ingeniería ambiental, recursos hídricos, permisología SEIA y cambio climático.',
    participatingProjectsCount: 1,
    relatedProjectIds: ['proj-nuevaunion'],
    contracts: [
      {
        id: 'cnt-wsp-01',
        projectId: 'proj-nuevaunion',
        projectName: 'Proyecto NuevaUnión',
        scope: 'Elaboración de Adendas SEIA y Estudios Hidrológicos de Cuenca',
        status: 'Vigente',
        source: 'Expediente SEA'
      }
    ],
    keyContacts: [
      {
        name: 'Patricia Domínguez',
        role: 'Líder de Negocios Minería y Sustentabilidad',
        department: 'Medio Ambiente',
        influenceLevel: 'Evaluador Técnico'
      }
    ],
    verifiedSources: ['Expediente SEIA', 'WSP Global Reports'],
    tier: 'Tier 1 Global'
  }
];

export const ecosystemRelations: EcosystemRelation[] = [
  // Relaciones Nueva Centinela
  {
    sourceId: 'proj-centinela-2',
    sourceName: 'Nueva Centinela',
    sourceType: 'project',
    targetId: 'comp-aminerals',
    targetName: 'Antofagasta Minerals',
    targetType: 'company',
    relationType: 'titular',
    label: 'Titular Minero (70%)'
  },
  {
    sourceId: 'comp-aminerals',
    sourceName: 'Antofagasta Minerals',
    sourceType: 'company',
    targetId: 'comp-fluor',
    targetName: 'Fluor Chile',
    targetType: 'company',
    relationType: 'epcm',
    label: 'EPCM Contratado (Concentradora)'
  },
  {
    sourceId: 'comp-fluor',
    sourceName: 'Fluor Chile',
    sourceType: 'company',
    targetId: 'comp-sigdokoppers',
    targetName: 'Sigdo Koppers',
    targetType: 'company',
    relationType: 'contratista',
    label: 'Subcontrato Montaje Mayor'
  },
  // Relaciones NuevaUnión
  {
    sourceId: 'proj-nuevaunion',
    sourceName: 'Proyecto NuevaUnión',
    sourceType: 'project',
    targetId: 'comp-teck',
    targetName: 'Teck Resources',
    targetType: 'company',
    relationType: 'titular',
    label: 'Titular Joint Venture (50%)'
  },
  {
    sourceId: 'proj-nuevaunion',
    sourceName: 'Proyecto NuevaUnión',
    sourceType: 'project',
    targetId: 'comp-wsp',
    targetName: 'WSP Chile',
    targetType: 'company',
    relationType: 'consultora_ambiental',
    label: 'Consultora SEIA & Adendas'
  },
  // Relaciones Los Bronces Integrado
  {
    sourceId: 'proj-los-bronces-integrado',
    sourceName: 'Los Bronces Integrado (LBI)',
    sourceType: 'project',
    targetId: 'comp-anglo',
    targetName: 'Anglo American Sur',
    targetType: 'company',
    relationType: 'titular',
    label: 'Titular Operador (50.1%)'
  },
  // Relaciones Vizcachitas
  {
    sourceId: 'proj-vizcachitas',
    sourceName: 'Proyecto Vizcachitas',
    sourceType: 'project',
    targetId: 'comp-ausenco',
    targetName: 'Ausenco Engineering',
    targetType: 'company',
    relationType: 'epcm',
    label: 'Líder DFS y Vendor List'
  },
  // Relaciones El Teniente
  {
    sourceId: 'proj-teniente-nnm',
    sourceName: 'El Teniente: Nuevo Nivel Mina',
    sourceType: 'project',
    targetId: 'comp-codelco',
    targetName: 'Codelco Chile',
    targetType: 'company',
    relationType: 'titular',
    label: 'Titular Estatal (100%)'
  },
  // Relaciones Maricunga Litio
  {
    sourceId: 'proj-maricunga-litio',
    sourceName: 'Proyecto Blanco (Maricunga Litio)',
    sourceType: 'project',
    targetId: 'comp-codelco',
    targetName: 'Codelco Litio',
    targetType: 'company',
    relationType: 'titular',
    label: 'Operador y Gestor Estatal'
  }
];
