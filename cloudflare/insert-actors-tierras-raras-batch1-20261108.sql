-- ==============================================================================
-- DECISORES / ACTORES CLAVE — TIERRAS RARAS OLA 1
-- Ejecutivos verificados en fuentes públicas (somosaclara.cl, aclara-re.com,
-- resumen.cl, BNAmericas, LinkedIn, CAP S.A.)
-- Principio: INSERT OR IGNORE INTO actors
-- Email: solo valores verificado / catch_all / no_verificado
-- ==============================================================================

INSERT OR IGNORE INTO actors (
  id, project_id, full_name, role, company, email, email_status,
  linkedin_url, phone, notes
) VALUES

-- ============================================================
-- ACLARA RESOURCES / REE UNO SpA — Módulo Penco
-- ============================================================
(
  'actor-aclara-ramon-barua',
  'proj-aclara-modulo-penco-ree',
  'Ramón Barúa',
  'CEO / Director Ejecutivo Global',
  'Aclara Resources Inc.',
  NULL,
  'no_verificado',
  'https://www.linkedin.com/in/ramon-barua',
  NULL,
  'CEO de Aclara Resources a nivel corporativo global. Interlocutor clave para decisiones estratégicas de financiamiento y alianzas. Contacto de alto nivel para proveedores con propuesta de valor diferenciada. Fuente: BNAmericas, aclara-re.com.'
),
(
  'actor-aclara-enrique-donoso',
  'proj-aclara-modulo-penco-ree',
  'Enrique Donoso Moscoso',
  'Gerente General',
  'Aclara Resources Chile / REE Uno SpA',
  NULL,
  'no_verificado',
  'https://www.linkedin.com/in/enrique-donoso-moscoso',
  NULL,
  'Asumió como GG de Aclara Resources Chile en febrero 2026. Ex ejecutivo de CMPC, Colbún, Endesa y Aguas Andinas. Mandato: acelerar fase técnica y de ejecución del Módulo Penco post-RCA. Interlocutor principal para propuestas de ingeniería, construcción y servicios operacionales. Fuente: somosaclara.cl, resumen.cl.'
),
(
  'actor-aclara-nelson-donoso',
  'proj-aclara-modulo-penco-ree',
  'Nelson Donoso Navarrete',
  'Director de Desarrollo Corporativo',
  'Aclara Resources Chile / REE Uno SpA',
  NULL,
  'no_verificado',
  'https://www.linkedin.com/in/nelson-donoso-navarrete',
  NULL,
  'Ex Gerente General de Aclara Resources Chile (mayo 2023 - feb 2026). Lideró la tramitación del EIA y el relacionamiento comunitario. Hoy como Director de Desarrollo Corporativo es relevante para alianzas, suministro estratégico y desarrollo de proveedores locales. Fuente: somosaclara.cl.'
),

-- ============================================================
-- GRUPO CAP S.A. — Socio estratégico 20% Módulo Penco
-- ============================================================
(
  'actor-cap-rassmuss',
  'proj-aclara-modulo-penco-ree',
  'Juan Enrique Rassmuss',
  'Presidente del Directorio',
  'Grupo CAP S.A.',
  NULL,
  'no_verificado',
  'https://www.linkedin.com/in/juan-enrique-rassmuss',
  NULL,
  'Presidente del directorio de CAP S.A. y figura decisora en la alianza CAP-Aclara para el Módulo Penco y la Planta Aclara Metals en Talcahuano. Interlocutor de nivel directorio para propuestas de alto valor estratégico. Fuente: aclara-re.com.'
),
(
  'actor-cap-aclara-metals-ops',
  'proj-aclara-metals-talcahuano',
  'Juan Enrique Rassmuss',
  'Presidente del Directorio (JV Aclara Metals)',
  'Grupo CAP S.A. / Aclara Metals',
  NULL,
  'no_verificado',
  'https://www.linkedin.com/in/juan-enrique-rassmuss',
  NULL,
  'Rol dual: lidera tanto la participación de CAP en el Módulo Penco como la JV Aclara Metals en Talcahuano. Canal de entrada para proveedores industriales del Biobío reconvertidos desde el acero a minerales críticos. Fuente: aclara-re.com, mining.com.'
),

-- ============================================================
-- HATCH LTD. — Firma de ingeniería EPCM Módulo Penco y Dynamo
-- ============================================================
(
  'actor-hatch-pm-penco',
  'proj-aclara-modulo-penco-ree',
  'Director de Proyectos Hatch — Módulo Penco',
  'Project Director / Lead Engineer',
  'Hatch Ltd. Chile',
  NULL,
  'no_verificado',
  NULL,
  NULL,
  'Hatch Ltd. es el engineering partner principal de Aclara Resources para el Módulo Penco y el Proyecto Dynamo. El director de proyectos específico para Chile no está identificado públicamente. Ruta de acceso: contactar a Hatch Santiago a través de hatch.com/es-cl. Fuente: juniorminingnetwork.com, newswire.ca.'
),

-- ============================================================
-- NEORE SpA / CHILEAN COBALT CORP.
-- ============================================================
(
  'actor-neore-albornoz',
  'proj-neore-esperanza-biobio',
  'Arturo Albornoz Wegertseder',
  'Director / Fundador',
  'NeoRe SpA',
  NULL,
  'no_verificado',
  'https://www.linkedin.com/in/arturo-albornoz-wegertseder',
  NULL,
  'Fundador y director de NeoRe SpA, la empresa chilena operadora de las concesiones de arcillas iónicas con tierras raras en Biobío, Maule y Araucanía. Vinculado originalmente a Madesal. Interlocutor clave para proveedores de exploración, sondaje y servicios ambientales. Fuente: terram.cl, eldesconcierto.cl.'
),
(
  'actor-ccc-ceo',
  'proj-neore-esperanza-biobio',
  'CEO / Presidente',
  'Chief Executive Officer',
  'Chilean Cobalt Corp. (EE.UU.)',
  NULL,
  'no_verificado',
  NULL,
  NULL,
  'Ejecutivo máximo de Chilean Cobalt Corp. (CCC), empresa listada en EE.UU. que tiene opción de compra sobre NeoRe SpA y lidera la estrategia comercial del Proyecto NeoRe. Nombre no identificado públicamente en las fuentes disponibles. Contactar vía investor relations de Chilean Cobalt Corp. Fuente: bnamericas.com, mineriaenlinea.com.'
),

-- ============================================================
-- SERNAGEOMIN / CORFO — Programa REE Norte Grande
-- ============================================================
(
  'actor-sernageomin-subdir-geo',
  'proj-sernageomin-ree-norte-grande',
  'Subdirector Nacional de Geología',
  'Subdirector Nacional de Geología',
  'SERNAGEOMIN',
  NULL,
  'no_verificado',
  'https://www.sernageomin.cl',
  NULL,
  'Cargo responsable del programa de mapeo de ocurrencias REE en sistemas IOCG del Norte Grande. Nombre del titular del cargo no publicado en fuentes disponibles. Contactar a través de sernageomin.cl o presencia en Congreso Geológico Chileno. Fuente: CORFO, ise-latam.com.'
),
(
  'actor-corfo-cnp-director',
  'proj-sernageomin-ree-norte-grande',
  'Director Centro Nacional de Pilotaje (CNP)',
  'Director Ejecutivo',
  'CORFO / Centro Nacional de Pilotaje',
  NULL,
  'no_verificado',
  'https://www.corfo.cl',
  NULL,
  'Responsable de la adjudicación de fondos para recuperación sustentable de REE y tecnologías de procesamiento de minerales críticos en Chile. Interlocutor para empresas con I+D en recuperación de lantánidos desde relaves u otros subproductos. Fuente: CORFO, ise-latam.com.'
);
