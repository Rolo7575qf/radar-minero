-- ==============================================================================
-- HISTORIAL PÚBLICO OFICIAL — TIERRAS RARAS OLA 1 (CHILE)
-- Esquema exacto de tabla project_history en Cloudflare D1
-- Fuentes: SEIA Chile, Memorias Aclara Resources, Grupo CAP, BNAmericas, Mining.com, CORFO
-- Principio: INSERT OR IGNORE INTO project_history
-- ==============================================================================

INSERT OR IGNORE INTO project_history (
  id, project_id, event_date, signal_title, source,
  previous_stage, new_stage, previous_capex, new_capex,
  change_description, commercial_interpretation, potential_impact, confidence_level
) VALUES 

-- 1. MÓDULO PENCO - Aclara Resources
(
  'hist-penco-ree-01',
  'proj-aclara-modulo-penco-ree',
  '2021-10-01',
  'Aclara Resources se escinde de Hochschild y formaliza Módulo Penco',
  'TSX Disclosures / Hochschild Mining',
  '3. Conceptual',
  '4. Prefactibilidad',
  NULL,
  115.0,
  'Aclara Resources se constituye como empresa independiente cotizada en Toronto (TSX: ARA) tras demerger de Hochschild Mining, tomando control del proyecto de arcillas iónicas en Penco.',
  'Hito fundacional del primer activo a escala industrial de tierras raras pesadas en Chile.',
  'Apertura de estudios geológicos y metalúrgicos tempranos con firmas internacionales.',
  'Alta'
),
(
  'hist-penco-ree-02',
  'proj-aclara-modulo-penco-ree',
  '2023-11-15',
  'Grupo CAP ingresa con 20% de participación estratégica en Aclara Chile',
  'Grupo CAP Memoria Anual / Hecho Esencial CMF',
  '4. Prefactibilidad',
  '5. Factibilidad',
  115.0,
  130.0,
  'Grupo CAP adquiere el 20% de REE Uno SpA como pilar de reconversión industrial en Biobío ante el cese del negocio siderúrgico tradicional en Huachipato.',
  'Alianza con el principal conglomerado minero-siderúrgico chileno, brindando respaldo financiero e institucional local.',
  'Sinergias en infraestructura portuaria, abastecimiento eléctrico y contratistas industriales regionales.',
  'Alta'
),
(
  'hist-penco-ree-03',
  'proj-aclara-modulo-penco-ree',
  '2024-01-20',
  'PEA actualizada eleva CAPEX a US$ 244 MM con pureza SPREC de 98,9%',
  'Aclara Resources Technical Report / BNAmericas',
  '5. Factibilidad',
  '6. Ingeniería básica',
  130.0,
  244.0,
  'Actualización económica y de proceso eleva CAPEX de construcción a US$ 244 MM (US$ 204 MM directos + US$ 39 MM contingencias) y VPN a US$ 344 MM al 8%, incorporando el método de Cosecha Circular de Minerales.',
  'Incremento presupuestario significativo que amplía el alcance de paquetes de licitación para ingeniería y equipos de proceso.',
  'Licitaciones de equipos de intercambio iónico, reactores químicos y plantas de recirculación de reactivos.',
  'Alta'
),
(
  'hist-penco-ree-04',
  'proj-aclara-modulo-penco-ree',
  '2024-06-18',
  'Ingreso formal del Estudio de Impacto Ambiental (EIA) optimizado al SEIA',
  'SEIA Chile / sea.gob.cl',
  '6. Ingeniería básica',
  '8. Permisos y aprobaciones',
  244.0,
  244.0,
  'REE Uno SpA ingresa formalmente el EIA del Proyecto de Desarrollo Minero de Extracción de Arcillas para Producción de Concentrado de Tierras Raras ante la Dirección Regional del SEA Biobío.',
  'Inicio de la ruta crítica ambiental del proyecto, activando procesos de participación ciudadana y evaluación sectorial.',
  'Demanda de asesoría regulatoria, monitoreo de línea base y consultoría ambiental especializada.',
  'Alta'
),
(
  'hist-penco-ree-05',
  'proj-aclara-modulo-penco-ree',
  '2024-10-10',
  'CORFO adjudica grant de US$ 730.000 para IA aplicada a exploración REE',
  'CORFO / website-files.com',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  244.0,
  244.0,
  'Adjudicación de fondos públicos CORFO para aplicar algoritmos de machine learning multivariable en exploración de arcillas iónicas en cuencas costeras chilenas.',
  'Validación estatal de la capacidad tecnológica y de innovación del proyecto.',
  'Contratación de servicios de analítica de datos geológicos y teledetección satelital.',
  'Alta'
),
(
  'hist-penco-ree-06',
  'proj-aclara-modulo-penco-ree',
  '2026-02-05',
  'Nombramiento de Enrique Donoso Moscoso como Gerente General de Aclara Chile',
  'somosaclara.cl / resumen.cl',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  244.0,
  244.0,
  'Llegada de ejecutivo senior con trayectoria en CMPC, Colbún, Endesa y Aguas Andinas para liderar la transición desde la fase de permisos hacia la construcción y montaje.',
  'Señal clara de transición operativa hacia fase de ejecución constructiva.',
  'Revisión y apertura de registro de proveedores de ingeniería de detalle y construcción.',
  'Alta'
),
(
  'hist-penco-ree-07',
  'proj-aclara-modulo-penco-ree',
  '2026-06-25',
  'Aprobación unánime del EIA por la Comisión de Evaluación Ambiental (COEVA) Biobío',
  'COEVA Biobío / Diario U de Chile',
  '8. Permisos y aprobaciones',
  '7. Ingeniería de detalle',
  244.0,
  244.0,
  'Votación favorable unánime de los seremis y delegado presidencial otorgando la RCA favorable al Módulo Penco, primer proyecto de tierras raras autorizado ambientalmente en Chile.',
  'Hito cumbre que destraba la ingeniería de detalle definitiva y el financiamiento de proyecto internacional.',
  'Licitaciones masivas de EPC/EPCM, obras civiles, planta de proceso y contratos de suministro a largo plazo.',
  'Alta'
),

-- 2. NEORE ESPERANZA - Biobío
(
  'hist-neore-01',
  'proj-neore-esperanza-biobio',
  '2023-09-12',
  'NeoRe y Chilean Cobalt Corp expanden pertenencias a más de 67.000 hectáreas',
  'Resumen.cl / Minería en Línea',
  '1. Exploración',
  '2. Exploración avanzada',
  NULL,
  50.0,
  'Consolidación distrital de concesiones mineras de exploración y explotación en Biobío, Maule y Araucanía para prospección de arcillas iónicas portadoras de REE.',
  'Creación del segundo polo de tierras raras de gran extensión en el centro-sur de Chile.',
  'Contratos de sondajes de exploración somera y mapeo geotécnico en terreno.',
  'Media'
),
(
  'hist-neore-02',
  'proj-neore-esperanza-biobio',
  '2024-11-28',
  'Prefactibilidad de Planta Modular MEP-1 proyecta producción de MREC hacia 2027',
  'MinArt / Chilean Cobalt Corp Release',
  '2. Exploración avanzada',
  '5. Factibilidad',
  50.0,
  85.0,
  'Publicación del modelo económico preliminar para la Planta Modular de Extracción MEP-1 en la zona de Esperanza, proyectando producción comercial de carbonato mixto hacia 2027.',
  'Estrategia de modularización para minimizar CAPEX y acelerar la entrada a mercado.',
  'Oportunidades de suministro de skids de proceso, sistemas de lixiviación y permisos sectoriales.',
  'Alta'
),

-- 3. ACLARA METALS TALCAHUANO (HUACHIPATO)
(
  'hist-aclarametals-01',
  'proj-aclara-metals-talcahuano',
  '2024-07-22',
  'Alianza Aclara - Grupo CAP para planta demostrativa de aleaciones de tierras raras',
  'CAP S.A. / Aclara Resources',
  '6. Ingeniería básica',
  '11. Construcción',
  NULL,
  45.0,
  'Constitución del joint venture Aclara Metals para habilitar planta de metalización y separación de óxidos dentro del recinto industrial de Huachipato.',
  'Primer paso concreto hacia la agregación de valor y downstream de tierras raras en territorio chileno.',
  'Obras de acondicionamiento civil, hornos de metalización e instalaciones eléctricas de potencia.',
  'Alta'
),
(
  'hist-aclarametals-02',
  'proj-aclara-metals-talcahuano',
  '2026-09-30',
  'Inauguración de Planta Demostrativa de Separación y Metalización de Aleaciones NdFeB',
  'Mining.com / Aclara Press',
  '11. Construcción',
  '10. Comisionamiento / Rampa',
  45.0,
  45.0,
  'Puesta en marcha de las instalaciones en Talcahuano para producir aleaciones magnet-grade de disprosio, terbio y neodimio a escala piloto industrial.',
  'Hito operativo que valida la integración vertical chilena frente a compradores de EE.UU. y Europa.',
  'Contratos de mantenimiento mecánico, gases industriales (argón/nitrógeno) y ensayos de laboratorio.',
  'Alta'
),

-- 4. PROGRAMA EXPLORACIÓN REE NORTE GRANDE - SERNAGEOMIN / CORFO
(
  'hist-sernageomin-01',
  'proj-sernageomin-ree-norte-grande',
  '2024-08-30',
  'CORFO y Centro Nacional de Pilotaje lanzan fondos para recuperación de REE en relaves',
  'CORFO Innovación / CNP',
  '1. Exploración',
  '2. Exploración avanzada',
  NULL,
  18.0,
  'Lanzamiento de concursos de cofinanciamiento para pilotear tecnologías de recuperación de lantánidos y minerales críticos desde relaves y sistemas IOCG.',
  'Impulso estatal a la minería secundaria y valorización de pasivos mineros en Atacama y Antofagasta.',
  'Proyectos consorciados de pilotaje metalúrgico y ensayos de lixiviación selectiva.',
  'Alta'
);
