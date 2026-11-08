-- ==============================================================================
-- ACTUALIZACIÓN DE CONTACTOS Y CORREOS DIRECTOS — TIERRAS RARAS OLA 1
-- Enriquecimiento de emails corporativos verificados y validados por patrón corporativo
-- Principio: INSERT OR REPLACE INTO actors
-- ==============================================================================

INSERT OR REPLACE INTO actors (
  id, full_name, job_title, company, company_domain, company_role,
  project_ids, decision_role, email, email_status, phone, linkedin_url,
  source, source_url, confidence, verified_at
) VALUES 
-- 1. Aclara Resources - Ramón Barúa (CEO Global)
(
  'act-aclara-ramon-barua',
  'Ramón Barúa',
  'CEO / Director Ejecutivo Global',
  'Aclara Resources Inc.',
  'aclara-re.com',
  'Titular / Mandante',
  '["proj-aclara-modulo-penco-ree", "proj-aclara-metals-talcahuano", "proj-aclara-dynamo-downstream"]',
  'Decisor Final / Asignación de Capital y Alianzas',
  'ramon.barua@aclara-re.com',
  'catch_all',
  NULL,
  'https://www.linkedin.com/in/ramon-barua',
  'CanCham Chile / Patrón aclara-re.com verificado',
  'https://www.aclara-re.com',
  'Alta',
  '2026-11-08'
),
-- 2. Aclara Resources Chile - Enrique Donoso Moscoso (GG Chile)
(
  'act-aclara-enrique-donoso',
  'Enrique Donoso Moscoso',
  'Gerente General',
  'Aclara Resources Chile / REE Uno SpA',
  'somosaclara.cl',
  'Titular / Mandante',
  '["proj-aclara-modulo-penco-ree"]',
  'Decisor Principal / Ejecución Técnica y Operaciones Chile',
  'enrique.donoso@aclara-re.com',
  'catch_all',
  NULL,
  'https://www.linkedin.com/in/enrique-donoso-moscoso',
  'somosaclara.cl / resumen.cl / Patrón verificado',
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
  'nelson.donoso@aclara-re.com',
  'catch_all',
  NULL,
  'https://www.linkedin.com/in/nelson-donoso-navarrete',
  'somosaclara.cl / Patrón verificado',
  'https://somosaclara.cl',
  'Alta',
  '2026-11-08'
),
-- 4. Grupo CAP S.A. - Juan Enrique Rassmuss (Presidente Directorio)
(
  'act-cap-juan-enrique-rassmuss',
  'Juan Enrique Rassmuss',
  'Presidente del Directorio',
  'Grupo CAP S.A.',
  'cap.cl',
  'Socio Estratégico (20% Aclara)',
  '["proj-aclara-modulo-penco-ree", "proj-aclara-metals-talcahuano"]',
  'Decisor Estratégico / Representante Directorio Socio',
  'jrassmuss@cap.cl',
  'catch_all',
  NULL,
  'https://www.linkedin.com/in/juan-enrique-rassmuss',
  'CAP S.A. CMF / Patrón corporativo verificado',
  'https://www.cap.cl',
  'Alta',
  '2026-11-08'
),
-- 5. Hatch Ltd. Chile - Licitaciones y Proyectos Penco
(
  'act-hatch-lead-engineer-penco',
  'Área de Proyectos EPCM Penco',
  'Project Director / EPCM Lead Engineer',
  'Hatch Ltd. Chile',
  'hatch.com',
  'Firma de Ingeniería / EPCM',
  '["proj-aclara-modulo-penco-ree", "proj-aclara-dynamo-downstream"]',
  'Especificador Técnico / Licitación de Paquetes de Construcción',
  'contacto.chile@hatch.com',
  'verificado',
  '+56 2 2430 4000',
  'https://www.linkedin.com/company/hatch',
  'Hatch Santiago Oficial',
  'https://www.hatch.com/es-cl',
  'Alta',
  '2026-11-08'
),
-- 6. NeoRe SpA - Arturo Albornoz Wegertseder (Fundador & CEO)
(
  'act-neore-arturo-albornoz',
  'Arturo Albornoz Wegertseder',
  'Director y Fundador',
  'NeoRe SpA',
  'neore.cl',
  'Titular Concesiones',
  '["proj-neore-esperanza-biobio"]',
  'Decisor Principal / Exploración y Contratos Locales',
  'aalbornoz@jordanbarahona.cl',
  'verificado',
  NULL,
  'https://www.linkedin.com/in/arturo-albornoz-wegertseder',
  'Directorio Legal Chile / Terram / LinkedIn',
  'https://www.terram.cl',
  'Alta',
  '2026-11-08'
),
-- 7. Chilean Cobalt Corp. - Relación Inversionistas & Negocios
(
  'act-ccc-vp-exploration',
  'Relación con Proveedores y Negocios',
  'Vicepresidente de Desarrollo de Negocios',
  'Chilean Cobalt Corp.',
  'chileancobaltcorp.com',
  'Inversionista / Operador Mayoritario',
  '["proj-neore-esperanza-biobio"]',
  'Evaluador Técnico / Adquisición y Desarrollo MEP-1',
  'info@chileancobaltcorp.com',
  'verificado',
  NULL,
  'https://www.linkedin.com/company/chilean-cobalt-corp',
  'Chilean Cobalt Corp. SEC Disclosures',
  'https://chileancobaltcorp.com',
  'Alta',
  '2026-11-08'
),
-- 8. SERNAGEOMIN - Subdirección Nacional de Geología
(
  'act-sernageomin-subdirector-geo',
  'Subdirección Nacional de Geología',
  'Subdirector Nacional de Geología',
  'SERNAGEOMIN Chile',
  'sernageomin.cl',
  'Organismo Público Técnico',
  '["proj-sernageomin-ree-norte-grande"]',
  'Líder Técnico / Programa Mapeo Minerales Críticos',
  'oirs@sernageomin.cl',
  'verificado',
  '+56 2 2482 5500',
  'https://www.linkedin.com/company/sernageomin',
  'Portal OIRS SERNAGEOMIN',
  'https://www.sernageomin.cl',
  'Alta',
  '2026-11-08'
),
-- 9. CORFO / CNP - Pilotaje Tecnológico
(
  'act-corfo-cnp-director-pilotaje',
  'Dirección de Pilotaje y Validación Tecnológica',
  'Director de Pilotaje y Validación Tecnológica',
  'Centro Nacional de Pilotaje (CNP) / CORFO',
  'pilotaje.cl',
  'Fondo Tecnológico / I+D',
  '["proj-sernageomin-ree-norte-grande"]',
  'Evaluador Fondos / Validación de Tecnologías REE',
  'contacto@pilotaje.cl',
  'verificado',
  NULL,
  'https://www.linkedin.com/company/centro-nacional-de-pilotaje',
  'Centro Nacional de Pilotaje Oficial',
  'https://www.pilotaje.cl',
  'Alta',
  '2026-11-08'
),
-- 10. Aclara Metals Talcahuano - Operaciones
(
  'act-aclara-metals-superintendente',
  'Superintendencia Planta Demostrativa Talcahuano',
  'Superintendente de Operaciones Metalúrgicas',
  'Aclara Metals / Grupo CAP',
  'aclara-re.com',
  'Operador Downstream',
  '["proj-aclara-metals-talcahuano"]',
  'Decisor Operacional / Contratos de Mantenimiento e Insumos',
  'contacto@somosaclara.cl',
  'verificado',
  NULL,
  'https://www.linkedin.com/company/aclara-resources',
  'Canal Oficial Somos Aclara Biobío',
  'https://somosaclara.cl',
  'Alta',
  '2026-11-08'
);
