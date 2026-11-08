-- ==============================================================================
-- OPORTUNIDADES B2B — TIERRAS RARAS OLA 1
-- Oportunidades comerciales para proveedores de servicios de ingeniería,
-- construcción, tecnología de proceso, medioambiente y operaciones
-- en los proyectos REE de Chile / LATAM
-- Principio: INSERT OR IGNORE INTO opportunities
-- ==============================================================================

INSERT OR IGNORE INTO opportunities (
  id, project_id, title, company_target, contact_name, contact_role,
  contact_email, estimated_value_usd, priority, status, description,
  recommended_action, horizon_date
) VALUES

-- ============================================================
-- MÓDULO PENCO (proj-aclara-modulo-penco-ree) — 5 oportunidades
-- ============================================================

(
  'opp-penco-ree-epcm',
  'proj-aclara-modulo-penco-ree',
  'Contratista EPCM — Ingeniería, Procura y Construcción Módulo Penco',
  'SNC-Lavalin / Ausenco / Worley Chile',
  'No informado',
  'Gerente de Proyectos / VP Engineering',
  NULL,
  12000000,
  'Máxima',
  'Identificada Tempranamente',
  'Hatch Ltd. lidera la ingeniería básica y de detalle, pero Aclara Resources deberá contratar un EPCM para la ejecución constructiva del Módulo Penco una vez que se concrete el financiamiento de proyecto (proyectado 2027-2028). CAPEX constructivo de US$ 204 MM directos. Paquetes probables: planta de procesamiento de intercambio iónico, obras civiles, infraestructura de agua, sistema de lixiviación y recuperación. Oportunidad de posicionamiento temprano ante Hatch y REE Uno SpA como contratista especializado en plantas de procesamiento de minerales no metálicos o minerales críticos.',
  'Contactar a Hatch Ltd. Chile para identificar al Project Manager del Módulo Penco. Asistir a seminarios CORFO / IIMCH sobre minerales críticos donde Aclara Resources presenta avances. Solicitar reunión con Enrique Donoso Moscoso (Gerente General Aclara Chile) para presentar capacidades técnicas en ingeniería de plantas de proceso.',
  '2027-06-30'
),
(
  'opp-penco-ree-agua-proceso',
  'proj-aclara-modulo-penco-ree',
  'Sistema de Gestión y Recirculación de Agua de Proceso — Módulo Penco',
  'Suez Water Technologies / Veolia Chile / IDE Technologies',
  'No informado',
  'Gerente de Ingeniería de Proceso',
  NULL,
  3500000,
  'Alta',
  'Identificada Tempranamente',
  'El Módulo Penco opera bajo la tecnología de Cosecha Circular de Minerales, que recircula más del 90% del agua y los reactivos (sulfato de amonio). Se requieren sistemas especializados de tratamiento, recirculación, control de calidad y descarga de efluentes para la planta de procesamiento. Alta sensibilidad ambiental en zona de Biobío exige estándares premium de zero liquid discharge (ZLD) o mínima descarga.',
  'Contactar a REE Uno SpA a través de su web somosaclara.cl para identificar necesidades de ingeniería de proceso hídrico. Presentar soluciones de ZLD y recirculación con referencias en plantas de procesamiento de minerales no metálicos. Proponer piloto técnico en laboratorio antes de la ingeniería de detalle.',
  '2027-03-31'
),
(
  'opp-penco-ree-ambiental-social',
  'proj-aclara-modulo-penco-ree',
  'Consultoría Ambiental, Social y de Relacionamiento Comunitario — Seguimiento RCA Penco',
  'ERM Chile / Arcadis Chile / Econsult',
  'No informado',
  'Directora de Sustentabilidad / Gerente de Asuntos Comunitarios',
  NULL,
  1800000,
  'Alta',
  'En Análisis Comercial',
  'Con la RCA aprobada en junio 2026, el Módulo Penco debe cumplir un riguroso Plan de Seguimiento Ambiental y Social establecido en la resolución. Incluye monitoreo de aguas superficiales, suelos, comunidades vecinas (zona periurbana de Penco/Concepción), fauna y flora, además de un Plan de Relaciones Comunitarias de largo plazo. El proyecto opera en zona de alta sensibilidad pública y política.',
  'Presentar propuesta de servicios de seguimiento y monitoreo ambiental RCA con énfasis en experiencia en proyectos de alta conflictividad social en Chile. Contactar a Enrique Donoso Moscoso (GG Aclara Chile) y al equipo de sustentabilidad de REE Uno SpA. Referenciarse en experiencia en Biobío y/o proyectos con comunidades mapuche o pescadores artesanales.',
  '2026-12-31'
),
(
  'opp-penco-ree-reactivos-sulfato',
  'proj-aclara-modulo-penco-ree',
  'Suministro de Sulfato de Amonio y Reactivos de Proceso — Módulo Penco',
  'Coagra / SQM / Solvay Chile',
  'No informado',
  'Gerente de Abastecimiento / Supply Chain Manager',
  NULL,
  2200000,
  'Alta',
  'Identificada Tempranamente',
  'El proceso de intercambio iónico del Módulo Penco requiere sulfato de amonio como reactivo principal para la extracción de tierras raras de las arcillas. Sistema de recirculación del 90%, pero se requiere reposición continua. Contrato de suministro de largo plazo con proveedor confiable y certificado. Volúmenes a definir en ingeniería de detalle, estimados en miles de toneladas anuales.',
  'Contactar al equipo de abastecimiento de REE Uno SpA / Aclara Resources Chile para identificar al responsable de supply chain. Presentar capacidades de suministro de reactivos industriales con enfoque en trazabilidad, certificación de pureza y logística para zona de Biobío. SQM tiene ventaja natural como productor chileno de sulfato.',
  '2027-06-30'
),
(
  'opp-penco-ree-laboratorio-certificacion',
  'proj-aclara-modulo-penco-ree',
  'Servicios de Laboratorio, Análisis y Certificación de Concentrados REE — Módulo Penco',
  'SGS Chile / ALS Global / Bureau Veritas Chile',
  'No informado',
  'Gerente de QA/QC / Laboratorio',
  NULL,
  950000,
  'Media',
  'Identificada Tempranamente',
  'El SPREC (concentrado de tierras raras) producido por el Módulo Penco requiere análisis multielemental especializado (ICP-MS, XRF), certificación de pureza del 98,9% y muestreo representativo para comercialización internacional. Contrato de largo plazo con laboratorio acreditado para control de proceso y certificación de exportación hacia clientes en EE.UU., Europa y Japón.',
  'Presentar capacidades de análisis multielemental de tierras raras (REE) ante el equipo técnico de Aclara Resources. Referenciarse en análisis de minerales críticos y materiales de batería. SGS y ALS tienen posición de partida.',
  '2027-01-31'
),

-- ============================================================
-- PROYECTO NEORE ESPERANZA (proj-neore-esperanza-biobio) — 3 oportunidades
-- ============================================================

(
  'opp-neore-ingenieria-mep1',
  'proj-neore-esperanza-biobio',
  'Ingeniería y Suministro de Planta Modular MEP-1 — NeoRe Esperanza',
  'FLSmidth Chile / Metso Chile / Process Systems',
  'No informado',
  'Gerente de Ingeniería / CTO',
  NULL,
  4500000,
  'Alta',
  'Identificada Tempranamente',
  'NeoRe SpA y Chilean Cobalt Corp. buscan proveedores para el diseño, fabricación y puesta en marcha de la Planta de Extracción Modular MEP-1 en la zona de Esperanza, Biobío. La planta debe procesar arcillas iónicas mediante intercambio iónico para producir MREC (carbonato mixto de tierras raras). Formato modular para reducir CAPEX y acelerar tiempos de despliegue. Producción comercial objetivo Q1 2027.',
  'Contactar a Chilean Cobalt Corp. (EE.UU.) a través de su sitio web corporativo y a NeoRe SpA en Chile. Presentar capacidades en plantas de proceso modulares para minerales no metálicos o minerales críticos. Timing crítico: la prefactibilidad ya está publicada y la ingeniería de detalle comenzaría pronto.',
  '2026-12-31'
),
(
  'opp-neore-permisos-ambientales',
  'proj-neore-esperanza-biobio',
  'Gestión de Permisos Sectoriales y DGA — Proyecto NeoRe Biobío / Maule / Araucanía',
  'Gestión Ambiental Consultores (GAC) / Econsult / JARA Consultores',
  'No informado',
  'Gerente de Proyectos Ambientales',
  NULL,
  1200000,
  'Alta',
  'En Análisis Comercial',
  'NeoRe SpA debe tramitar permisos ambientales sectoriales (DGA para uso de agua, permisos municipales, consultas indígenas en Araucanía) para las concesiones en Biobío, Maule y La Araucanía. Alta complejidad regulatoria por la novedad del sector REE en zonas con comunidades mapuche y alta sensibilidad ambiental. Experiencia en territorio Araucanía es factor diferenciador clave.',
  'Contactar a NeoRe SpA (Arturo Albornoz Wegertseder) para identificar el estado de tramitación. Presentar capacidades de relacionamiento comunitario con comunidades indígenas y experiencia en permisos DGA en la zona centro-sur. Aprovechar el contexto post-conflicto de Aclara/Penco como referencia de lo que no hacer.',
  '2026-12-31'
),
(
  'opp-neore-sondajes-exploracion',
  'proj-neore-esperanza-biobio',
  'Servicios de Sondaje y Exploración Geotécnica — Concesiones NeoRe (67.000 ha)',
  'Boart Longyear Chile / Major Drilling Chile / Midwest Drilling',
  'No informado',
  'Gerente de Exploración',
  NULL,
  2800000,
  'Alta',
  'Mapeo de Decisores',
  'NeoRe SpA tiene un portafolio de más de 67.000 ha de concesiones en tres regiones y requiere continuar campañas sistemáticas de sondaje y caracterización geotécnica de arcillas para alimentar modelos de recursos y definir la geometría óptima de explotación. Contratos de drilling en zonas rurales y forestales del centro-sur de Chile.',
  'Contactar directamente a Arturo Albornoz Wegertseder en NeoRe SpA y al equipo técnico de Chilean Cobalt Corp. Presentar capacidades de sondaje en zonas de difícil acceso y en materiales blandos (arcillas). El formato superficial de la extracción REE requiere sondajes someros, alta densidad de puntos y logística de terreno eficiente.',
  '2026-10-31'
),

-- ============================================================
-- ACLARA METALS TALCAHUANO (proj-aclara-metals-talcahuano) — 2 oportunidades
-- ============================================================

(
  'opp-aclarametals-suministro-insumos',
  'proj-aclara-metals-talcahuano',
  'Suministro de Insumos y Materiales Refractarios — Planta Metalización Aclara Metals Talcahuano',
  'Saint-Gobain Chile / Vesuvius Chile / Rima Industrial',
  'No informado',
  'Gerente de Operaciones / Supply Chain',
  NULL,
  1500000,
  'Alta',
  'Identificada Tempranamente',
  'La Planta Demostrativa Aclara Metals en Talcahuano/Huachipato requiere insumos especializados para la separación de óxidos de tierras raras y la metalización de aleaciones NdFeB: materiales refractarios de alta temperatura, crisoles de grafito, electrodos, gases industriales (argón, nitrógeno, hidrógeno), y materiales de sellado y aislamiento térmico para hornos de metalización.',
  'Contactar al equipo de operaciones de Aclara Metals a través de aclara-re.com. Presentar portafolio de insumos para metalurgia de metales de alta temperatura y tierras raras. El JV con CAP S.A. implica que el equipo de compras puede estar parcialmente centralizado en CAP — explorar también ese canal.',
  '2027-01-31'
),
(
  'opp-aclarametals-mantenimiento-industrial',
  'proj-aclara-metals-talcahuano',
  'Servicios de Mantenimiento Industrial y Mecánico — Planta Aclara Metals Huachipato',
  'Mantención y Montajes Industriales (MMI) / Ferrostaal Chile / Zapa',
  'No informado',
  'Jefe de Mantenimiento / Gerente de Planta',
  NULL,
  980000,
  'Media',
  'Identificada Tempranamente',
  'La Planta Demostrativa en Huachipato requiere servicios de mantenimiento preventivo y correctivo de equipos de proceso (reactores, intercambiadores, hornos de metalización, sistemas de control). La ubicación en el ex-complejo Huachipato facilita el acceso a proveedores industriales del Biobío con experiencia en siderurgia y petroquímica reconvertidos a la nueva industria de minerales críticos.',
  'Presentar capacidades de mantenimiento industrial en zona Biobío con referencia en plantas de proceso continuo. Contactar a través del canal CAP S.A. (socio mayoritario) para identificar al responsable de mantenimiento de la nueva planta. Oportunidad de largo plazo vinculada al crecimiento de la operación.',
  '2027-03-31'
),

-- ============================================================
-- SERNAGEOMIN NORTE GRANDE (proj-sernageomin-ree-norte-grande) — 2 oportunidades
-- ============================================================

(
  'opp-sernageomin-consultoria-geologica',
  'proj-sernageomin-ree-norte-grande',
  'Consultoría Geológica Especializada REE — Programa Mapeo Norte Grande SERNAGEOMIN',
  'SRK Consulting Chile / Golder (WSP) Chile / Geosol',
  'No informado',
  'Subdirector Nacional de Geología SERNAGEOMIN',
  NULL,
  850000,
  'Media',
  'Identificada Tempranamente',
  'SERNAGEOMIN requiere consultoras geológicas especializadas en mineralogía de tierras raras y sistemas IOCG para apoyar el programa de mapeo sistemático del Norte Grande. Licitaciones públicas (ChileCompra) probables en 2025-2026. Perfil requerido: experiencia en geoquímica de lantánidos, interpretación de datos geofísicos en sistemas IOCG, y modelamiento de recursos de minerales críticos.',
  'Monitorear licitaciones en Mercado Público / ChileCompra bajo rubros SERNAGEOMIN y minerales críticos. Contactar a la Subdirección de Geología de SERNAGEOMIN para presentar capacidades en REE y sistemas IOCG. Publicar artículos técnicos o participar en el Congreso Geológico Chileno para posicionamiento.',
  '2025-12-31'
),
(
  'opp-sernageomin-cnp-piloto-ree',
  'proj-sernageomin-ree-norte-grande',
  'Proyecto de I+D Recuperación REE de Relaves Históricos — CORFO / Centro Nacional de Pilotaje',
  'Metso Chile / CSIRO Chile / Centro de Investigación Minera y Metalúrgica (CIMM)',
  'No informado',
  'Gerente de Proyectos CORFO / Director CNP',
  NULL,
  1200000,
  'Media',
  'Identificada Tempranamente',
  'CORFO y el Centro Nacional de Pilotaje (CNP) están adjudicando fondos para proyectos piloto de recuperación de tierras raras (REE) desde relaves históricos de la gran minería del cobre en el Norte de Chile. Modelos de consorcio público-privado con concursos periódicos. Oportunidad para empresas con I+D en recuperación de minerales críticos de relaves o residuos mineros.',
  'Monitorear convocatorias de CORFO para proyectos de minerales críticos y relaves. Contactar al equipo del Centro Nacional de Pilotaje (CNP) para proponer consorcio de investigación aplicada en recuperación REE. Partnerships con universidades chilenas (U. de Concepción, PUC, UTFSM) son valorados.',
  '2026-06-30'
);
