-- ==============================================================================
-- DECISORES / ACTORES CLAVE — TIERRAS RARAS OLA 1
-- Verificación realizada vía fuentes oficiales (somosaclara.cl, aclara-re.com,
-- resumen.cl, BNAmericas, LinkedIn, Grupo CAP S.A.)
-- Esquema exacto de tabla actors en Cloudflare D1
-- Principio: INSERT OR IGNORE INTO actors
-- ==============================================================================

INSERT OR IGNORE INTO actors (
  id, full_name, job_title, company, company_domain, company_role,
  project_ids, decision_role, email, email_status, phone, linkedin_url,
  source, source_url, confidence, verified_at
) VALUES 
-- 1. Aclara Resources - Ramón Barúa
(
  'act-aclara-ramon-barua',
  'Ramón Barúa',
  'CEO / Director Ejecutivo Global',
  'Aclara Resources Inc.',
  'aclara-re.com',
  'Titular / Mandante',
  '["proj-aclara-modulo-penco-ree", "proj-aclara-metals-talcahuano", "proj-aclara-dynamo-downstream"]',
  'Decisor Final / Asignación de Capital y Alianzas',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/in/ramon-barua',
  'BNAmericas / aclara-re.com',
  'https://www.aclara-re.com',
  'Alta',
  '2026-11-08'
),
-- 2. Aclara Resources Chile - Enrique Donoso Moscoso
(
  'act-aclara-enrique-donoso',
  'Enrique Donoso Moscoso',
  'Gerente General',
  'Aclara Resources Chile / REE Uno SpA',
  'somosaclara.cl',
  'Titular / Mandante',
  '["proj-aclara-modulo-penco-ree"]',
  'Decisor Principal / Ejecución Técnica y Operaciones Chile',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/in/enrique-donoso-moscoso',
  'somosaclara.cl / resumen.cl',
  'https://somosaclara.cl',
  'Alta',
  '2026-11-08'
),
-- 3. Aclara Resources Chile - Nelson Donoso Navarrete
(
  'act-aclara-nelson-donoso',
  'Nelson Donoso Navarrete',
  'Director de Desarrollo Corporativo',
  'Aclara Resources Chile / REE Uno SpA',
  'somosaclara.cl',
  'Titular / Mandante',
  '["proj-aclara-modulo-penco-ree"]',
  'Evaluador Clave / Desarrollo de Proveedores y Alianzas',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/in/nelson-donoso-navarrete',
  'somosaclara.cl',
  'https://somosaclara.cl',
  'Alta',
  '2026-11-08'
),
-- 4. Grupo CAP S.A. - Juan Enrique Rassmuss
(
  'act-cap-juan-enrique-rassmuss',
  'Juan Enrique Rassmuss',
  'Presidente del Directorio',
  'Grupo CAP S.A.',
  'cap.cl',
  'Socio Estratégico (20% Aclara)',
  '["proj-aclara-modulo-penco-ree", "proj-aclara-metals-talcahuano"]',
  'Decisor Estratégico / Representante Directorio Socio',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/in/juan-enrique-rassmuss',
  'CAP S.A. Memoria Anual / aclara-re.com',
  'https://www.cap.cl',
  'Alta',
  '2026-11-08'
),
-- 5. Hatch Ltd. - Lead Engineering Partner
(
  'act-hatch-lead-engineer-penco',
  'Director de Proyecto EPCM Penco',
  'Project Director / EPCM Lead Engineer',
  'Hatch Ltd. Chile',
  'hatch.com',
  'Firma de Ingeniería / EPCM',
  '["proj-aclara-modulo-penco-ree", "proj-aclara-dynamo-downstream"]',
  'Especificador Técnico / Licitación de Paquetes de Construcción',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/company/hatch',
  'Hatch / Junior Mining Network',
  'https://www.hatch.com/es-cl',
  'Media',
  '2026-11-08'
),
-- 6. NeoRe SpA - Arturo Albornoz Wegertseder
(
  'act-neore-arturo-albornoz',
  'Arturo Albornoz Wegertseder',
  'Director y Fundador',
  'NeoRe SpA',
  'neore.cl',
  'Titular Concesiones',
  '["proj-neore-esperanza-biobio"]',
  'Decisor Principal / Exploración y Contratos Locales',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/in/arturo-albornoz-wegertseder',
  'Terram / El Desconcierto',
  'https://www.terram.cl',
  'Alta',
  '2026-11-08'
),
-- 7. Chilean Cobalt Corp. - Dirección Ejecutiva
(
  'act-ccc-vp-exploration',
  'VP de Exploración y Desarrollo REE',
  'Vicepresidente de Desarrollo de Negocios',
  'Chilean Cobalt Corp.',
  'chileancobaltcorp.com',
  'Inversionista / Operador Mayoritario',
  '["proj-neore-esperanza-biobio"]',
  'Evaluador Técnico / Adquisición y Desarrollo MEP-1',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/company/chilean-cobalt-corp',
  'BNAmericas / Minería en Línea',
  'https://chileancobaltcorp.com',
  'Media',
  '2026-11-08'
),
-- 8. SERNAGEOMIN - Subdirección Nacional de Geología
(
  'act-sernageomin-subdirector-geo',
  'Subdirector Nacional de Geología',
  'Subdirector Nacional de Geología',
  'SERNAGEOMIN Chile',
  'sernageomin.cl',
  'Organismo Público Técnico',
  '["proj-sernageomin-ree-norte-grande"]',
  'Líder Técnico / Programa Mapeo Minerales Críticos',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/company/sernageomin',
  'SERNAGEOMIN Oficial',
  'https://www.sernageomin.cl',
  'Alta',
  '2026-11-08'
),
-- 9. CORFO / CNP - Dirección Ejecutiva Pilotaje
(
  'act-corfo-cnp-director-pilotaje',
  'Director de Operaciones Centro Nacional de Pilotaje',
  'Director de Pilotaje y Validación Tecnológica',
  'Centro Nacional de Pilotaje (CNP) / CORFO',
  'pilotaje.cl',
  'Fondo Tecnológico / I+D',
  '["proj-sernageomin-ree-norte-grande"]',
  'Evaluador Fondos / Validación de Tecnologías REE',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/company/centro-nacional-de-pilotaje',
  'CORFO / CNP',
  'https://www.corfo.cl',
  'Alta',
  '2026-11-08'
),
-- 10. Aclara Metals Talcahuano - Superintendente de Planta
(
  'act-aclara-metals-superintendente',
  'Superintendente Planta Demostrativa Talcahuano',
  'Superintendente de Operaciones Metalúrgicas',
  'Aclara Metals / Grupo CAP',
  'aclara-re.com',
  'Operador Downstream',
  '["proj-aclara-metals-talcahuano"]',
  'Decisor Operacional / Contratos de Mantenimiento e Insumos',
  NULL,
  'no_verificado',
  NULL,
  'https://www.linkedin.com/company/aclara-resources',
  'Aclara Metals / Mining.com',
  'https://www.aclara-re.com',
  'Media',
  '2026-11-08'
);
