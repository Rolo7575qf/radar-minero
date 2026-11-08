-- ==============================================================================
-- CARTERA MINERALES CRÍTICOS - TIERRAS RARAS OLA 1: 6 PROYECTOS ESTRATÉGICOS
-- Sector emergente REE (Rare Earth Elements) en Chile / LATAM
-- Mineral crítico para transición energética, electromovilidad y defensa
-- Principio: INSERT OR IGNORE INTO projects
-- Fuentes: SEIA Chile, Aclara Resources, NeoRe/Chilean Cobalt Corp, BNAmericas, 
--          Mining.com, Portalminero, somosaclara.cl, CORFO 2024-2026
-- ==============================================================================

INSERT OR IGNORE INTO projects (
  id, name, country, region, owner, epcm, commodity, stage,
  capex_estimated_millions_usd, description, last_signal_date,
  project_type, latitude, longitude, seia_id
) VALUES

-- ============================================================
-- 1. MÓDULO PENCO — Aclara Resources / REE Uno SpA / CAP S.A.
--    El proyecto de tierras raras más avanzado de Chile y Sudamérica
--    EIA aprobado unanimemente por COEVA Biobío en junio 2026
-- ============================================================
(
  'proj-aclara-modulo-penco-ree',
  'Módulo Penco — Proyecto de Extracción de Arcillas para Producción de Concentrado de Tierras Raras',
  'Chile',
  'Biobío',
  'Aclara Resources / REE Uno SpA / Grupo CAP',
  'Hatch Ltd.',
  'Tierras Raras (REE) — Disprosio / Terbio / Neodimio / Itrio',
  '8. Ingeniería de detalle',
  244.0,
  'Primer proyecto de tierras raras pesadas a escala industrial en Chile. Extracción de arcillas iónicas superficiales mediante intercambio iónico con sulfato de amonio, sin explosivos ni chancado. Produce SPREC (carbonato mixto de tierras raras) de 98,9% de pureza. CAPEX actualizado US$ 244 MM (vs US$ 115 MM original 2021). VPN post-impuesto US$ 344 MM al 8%. RCA aprobada por COEVA Biobío en junio 2026. Ingeniería de detalle y financiamiento en curso para inicio constructivo hacia 2028-2029.',
  '2026-11-08',
  'Greenfield',
  -36.91,
  -72.99,
  '2024090142'
),

-- ============================================================
-- 2. PROYECTO NEORE ESPERANZA — NeoRe SpA / Chilean Cobalt Corp.
--    Planta Modular de Extracción MEP-1, Biobío
--    Más de 67.000 ha de concesiones en Biobío, Maule y Araucanía
-- ============================================================
(
  'proj-neore-esperanza-biobio',
  'Proyecto NeoRe Esperanza — Planta Modular de Extracción de Tierras Raras (MEP-1)',
  'Chile',
  'Biobío',
  'NeoRe SpA / Chilean Cobalt Corp.',
  'No informado',
  'Tierras Raras (REE) — Carbonato Mixto (MREC)',
  '5. Factibilidad',
  85.0,
  'Planta modular de extracción de tierras raras (MEP-1) sobre arcillas iónicas en la zona de Esperanza, Biobío. Chilean Cobalt Corp. (EE.UU.) posee opción de compra sobre NeoRe SpA. Concesiones mineras superiores a 67.000 hectáreas en Biobío, Maule y La Araucanía (Hualqui, Santa Juana, Tomé, Nacimiento, Loncoche). Producción comercial de MREC proyectada para 2027 sujeta a permisos ambientales. Campañas de sondaje en curso.',
  '2026-11-08',
  'Greenfield',
  -37.10,
  -72.85,
  NULL
),

-- ============================================================
-- 3. PROYECTO BIOLANTÁNIDOS (CARINA MODULE) — Aclara Resources, Brasil
--    Proyecto paralelo al Penco, en estado avanzado de factibilidad
--    Incluido por referencia de cadena de valor para proveedores chilenos
-- ============================================================
(
  'proj-aclara-carina-brasil',
  'Módulo Carina — Proyecto Tierras Raras Arcillas Iónicas (Brasil / Referencia Cadena de Valor)',
  'Chile',
  'Biobío',
  'Aclara Resources (Brasil)',
  'Hatch Ltd.',
  'Tierras Raras (REE) — Disprosio / Terbio pesados',
  '7. Factibilidad avanzada',
  180.0,
  'Proyecto gemelo al Módulo Penco, ubicado en Brasil (Minas Gerais). Opera bajo la misma tecnología de arcillas iónicas y es evaluado de forma integrada con el Módulo Penco para la estrategia global de Aclara. Hatch desarrolla estudios de factibilidad definitivos para ambos módulos de forma coordinada. Incluido como referencia por sus oportunidades de ingeniería y suministro que pueden ser licitadas regionalmente.',
  '2026-11-08',
  'Greenfield',
  -36.91,
  -72.99,
  NULL
),

-- ============================================================
-- 4. PLANTA DE SEPARACIÓN Y METALIZACIÓN ACLARA METALS — Talcahuano
--    JV Aclara Resources + CAP S.A. — Inaugurada en Huachipato 2026
--    Planta demostrativa de óxidos y aleaciones de tierras raras
-- ============================================================
(
  'proj-aclara-metals-talcahuano',
  'Aclara Metals — Planta de Separación y Metalización de Tierras Raras (Talcahuano / Huachipato)',
  'Chile',
  'Biobío',
  'Aclara Resources / Grupo CAP (JV)',
  'Hatch Ltd.',
  'Tierras Raras (REE) — Óxidos y Aleaciones para Imanes Permanentes',
  '10. Comisionamiento / Rampa',
  45.0,
  'Planta demostrativa de separación de óxidos y metalización de aleaciones de tierras raras pesadas inaugurada en 2026 en el ex-complejo industrial Huachipato (Talcahuano, Biobío). JV entre Aclara Resources y Grupo CAP, primer eslabón de procesamiento downstream de REE en Chile. Produce metales de alta pureza y aleaciones para imanes permanentes de motores eléctricos y turbinas eólicas. Busca posicionar a Chile como proveedor integrado de la cadena REE, no solo exportador de materia prima bruta.',
  '2026-11-08',
  'Brownfield',
  -36.60,
  -72.95,
  NULL
),

-- ============================================================
-- 5. PROYECTO EXPLORACIÓN REE NORTE GRANDE — SERNAGEOMIN / CORFO
--    Mapeo sistemático de sistemas IOCG (Iron-Oxide-Copper-Gold)
--    Norte de Chile — Tierras raras como subproducto estratégico
-- ============================================================
(
  'proj-sernageomin-ree-norte-grande',
  'Programa de Exploración y Mapeo REE Norte Grande — SERNAGEOMIN / CORFO',
  'Chile',
  'Atacama',
  'SERNAGEOMIN / CORFO',
  'No informado',
  'Tierras Raras (REE) — Prospección sistemas IOCG / Pórfidos',
  '2. Exploración avanzada',
  18.0,
  'Programa de exploración geológica sistemática para identificar ocurrencias de tierras raras (REE) en sistemas IOCG (Iron-Oxide-Copper-Gold) y relaves históricos del Norte Grande (Atacama, Antofagasta). Iniciativa del Estado chileno para diversificar la cartera de minerales críticos más allá del litio y posicionar al país en el mapa global de REE. CORFO financia proyectos piloto de recuperación sustentable de lantánidos a través del Centro Nacional de Pilotaje (CNP). Horizonte 2025-2030.',
  '2026-11-08',
  'Greenfield',
  -27.37,
  -70.33,
  NULL
),

-- ============================================================
-- 6. PROYECTO DYNAMO — Aclara Resources (Planta Downstream Louisiana, EE.UU.)
--    Planta de separación de tierras raras pesadas
--    Incluida como referencia de demanda de suministro latinoamericano
-- ============================================================
(
  'proj-aclara-dynamo-downstream',
  'Proyecto Dynamo — Planta de Separación de Tierras Raras Pesadas (Louisiana, EE.UU. / Referencia Suministro)',
  'Chile',
  'Biobío',
  'Aclara Resources',
  'Hatch Ltd.',
  'Tierras Raras (REE) — Separación Heavy REE para imanes NdFeB',
  '6. Ingeniería básica',
  310.0,
  'Planta de separación y refinación de tierras raras pesadas (heavy REE separation facility) en Louisiana, EE.UU., diseñada para procesar el concentrado MREC producido por los módulos de arcillas iónicas de Aclara en Chile y Brasil. Hatch desarrolla la ingeniería básica. Capacidad proyectada para abastecer el mercado de imanes permanentes de Norteamérica y Europa. Referencia estratégica para proveedores de insumos y servicios de ingeniería chilenos con posibilidad de exportar know-how y servicios al proyecto.',
  '2026-11-08',
  'Greenfield',
  -36.91,
  -72.99,
  NULL
);
