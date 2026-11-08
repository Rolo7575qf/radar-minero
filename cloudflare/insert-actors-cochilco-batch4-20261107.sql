-- ==============================================================================
-- DECISORES CLAVE LOTE 4: 10 MEGAPROYECTOS Y EXPANSIONES ESTRATÉGICAS COCHILCO
-- Verificación realizada vía Treg.to / LinkedIn en tiempo real (Noviembre 2026)
-- Criterio ético IC: Verificación estricta de correo (verificado / catch_all / no_verificado)
-- ==============================================================================

INSERT OR IGNORE INTO actors (
  id, full_name, job_title, company, company_domain, company_role,
  project_ids, decision_role, email, email_status, phone, linkedin_url,
  source, source_url, confidence, verified_at
) VALUES 
-- 1. Codelco RT Sulfuros - Julio Cuevas Ross
(
  'act-codelco-julio-cuevas',
  'Julio Cuevas Ross',
  'Vicepresidente de Proyectos',
  'Codelco',
  'codelco.cl',
  'Titular Minero',
  '["proj-radomiro-tomic-sulfuros"]',
  'Decisor Clave / Vicepresidencia de Proyectos',
  'jc@codelco.cl',
  'catch_all',
  NULL,
  'https://cl.linkedin.com/in/julio-cuevas-ross',
  'Treg.to / LinkedIn',
  'https://cl.linkedin.com/in/julio-cuevas-ross',
  'Alta',
  '2026-11-07'
),

-- 2. Codelco Radomiro Tomic - Claudia Domínguez Sepúlveda
(
  'act-codelco-claudia-dominguez',
  'Claudia Domínguez Sepúlveda',
  'Gerente General División Radomiro Tomic',
  'Codelco',
  'codelco.cl',
  'Titular Minero',
  '["proj-radomiro-tomic-sulfuros"]',
  'Decisor Clave / Gerencia General División',
  'claudia@codelco.cl',
  'catch_all',
  NULL,
  'https://linkedin.com/in/claudia-dom%C3%ADnguez-sep%C3%BAlveda-7a933769',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/claudia-dom%C3%ADnguez-sep%C3%BAlveda-7a933769',
  'Alta',
  '2026-11-07'
),

-- 3. Collahuasi Expansión - Alejandro Verdugo P.
(
  'act-collahuasi-alejandro-verdugo',
  'Alejandro Verdugo P.',
  'Vicepresidente de Proyectos',
  'Compañía Minera Doña Inés de Collahuasi',
  'collahuasi.cl',
  'Titular Minero',
  '["proj-collahuasi-expansion-fase-2"]',
  'Decisor Clave / Vicepresidente de Proyectos',
  'averdugo@collahuasi.cl',
  'no_verificado',
  NULL,
  'https://linkedin.com/in/alejandro-verdugo-p-45b45718',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/alejandro-verdugo-p-45b45718',
  'Alta',
  '2026-11-07'
),

-- 4. Collahuasi Expansión - Jorge Gómez Díaz
(
  'act-collahuasi-jorge-gomez',
  'Jorge Gómez Díaz',
  'Director Corporativo / Ex-CEO Collahuasi',
  'Compañía Minera Doña Inés de Collahuasi',
  'collahuasi.cl',
  'Titular Minero',
  '["proj-collahuasi-expansion-fase-2"]',
  'Decisor Estratégico / Director',
  'jgomez@collahuasi.cl',
  'no_verificado',
  NULL,
  'https://linkedin.com/in/jorge-g%C3%B3mez-d%C3%ADaz-ceo',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/jorge-g%C3%B3mez-d%C3%ADaz-ceo',
  'Alta',
  '2026-11-07'
),

-- 5. Gold Fields Salares Norte - Ronald Diaz
(
  'act-goldfields-ronald-diaz',
  'Ronald Diaz',
  'Vicepresidente Técnico / Ex-Gerente General Salares Norte',
  'Gold Fields',
  'goldfields.com',
  'Titular Minero',
  '["proj-salares-norte-goldfields"]',
  'Decisor Técnico / Evaluador de Operaciones',
  'ronald.diaz@goldfields.com',
  'catch_all',
  NULL,
  'https://linkedin.com/in/ronald-diaz-32472a15',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/ronald-diaz-32472a15',
  'Alta',
  '2026-11-07'
),

-- 6. Pan American Silver El Peñón - Sergio Castro Veaz
(
  'act-panamerican-sergio-castro',
  'Sergio Castro Veaz',
  'Gerente General Minera El Peñón',
  'Pan American Silver',
  'panamericansilver.com',
  'Titular Minero',
  '["proj-el-penon-yamana-panamerican"]',
  'Decisor Clave / Gerente General Faena',
  'sergio.castro@panamericansilver.com',
  'catch_all',
  NULL,
  'https://linkedin.com/in/sergio-castro-veaz-691b8745',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/sergio-castro-veaz-691b8745',
  'Alta',
  '2026-11-07'
),

-- 7. CMP Pellets Guacolda II - Francisco Carvajal
(
  'act-cmp-francisco-carvajal',
  'Francisco Carvajal',
  'CEO / Gerente General',
  'Compañía Minera del Pacífico (CMP)',
  'cmp.cl',
  'Titular Minero',
  '["proj-cmp-pellets-guacolda"]',
  'Decisor Clave / Gerente General Corporativo',
  'fcarvajal@cmp.cl',
  'no_verificado',
  NULL,
  'https://linkedin.com/in/francisco-carvajal-84630974',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/francisco-carvajal-84630974',
  'Alta',
  '2026-11-07'
),

-- 8. Glencore Lomas Bayas - Pablo Carvallo
(
  'act-glencore-pablo-carvallo',
  'Pablo Carvallo',
  'Director de Operaciones Glencore Chile / Ex-GG Lomas Bayas',
  'Glencore',
  'glencore.cl',
  'Titular Minero',
  '["proj-lomas-bayas-continuidad"]',
  'Decisor Operacional / Director de Operaciones',
  'pablo.carvallo@glencore.cl',
  'catch_all',
  NULL,
  'https://linkedin.com/in/pablo-carvallo-b7534138',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/pablo-carvallo-b7534138',
  'Alta',
  '2026-11-07'
),

-- 9. Anglo American El Soldado - Leopoldo Garrido
(
  'act-anglo-leopoldo-garrido',
  'Leopoldo Garrido',
  'Gerente General Operación El Soldado',
  'Anglo American Sur',
  'angloamerican.com',
  'Titular Minero',
  '["proj-el-soldado-torito-f6"]',
  'Decisor Clave / Gerente General Faena',
  'leopoldo.garrido@angloamerican.com',
  'catch_all',
  NULL,
  'https://linkedin.com/in/leopoldo-garrido-2981892a',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/leopoldo-garrido-2981892a',
  'Alta',
  '2026-11-07'
),

-- 10. Kinross Lobo-Marte - Elizabeth Hughes
(
  'act-kinross-elizabeth-hughes',
  'Elizabeth Hughes',
  'Vice President and Deputy General Manager La Coipa',
  'Kinross Gold Corporation',
  'kinross.com',
  'Titular Minero',
  '["proj-lobo-marte-kinross"]',
  'Decisor Clave / Vicepresidente y Gerente Adjunta',
  'elizabeth.hughes@kinross.com',
  'catch_all',
  NULL,
  'https://linkedin.com/in/elizabethahughes',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/elizabethahughes',
  'Alta',
  '2026-11-07'
),

-- 11. Lundin Mining Caserones - Marcelo Maccioni (VERIFICADO)
(
  'act-lundin-marcelo-maccioni',
  'Marcelo Maccioni',
  'Managing Director Caserones',
  'Lundin Mining',
  'lundinmining.com',
  'Titular Minero',
  '["proj-caserones-lundin-deep"]',
  'Decisor Clave / Managing Director',
  'marcelo.maccioni@lundinmining.com',
  'verificado',
  NULL,
  'https://linkedin.com/in/marcelo-maccioni-98135423',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/marcelo-maccioni-98135423',
  'Alta',
  '2026-11-07'
),

-- 12. Lundin Mining Caserones - Gonzalo Araujo Alonso (VERIFICADO)
(
  'act-lundin-gonzalo-araujo',
  'Gonzalo Araujo Alonso',
  'Presidente Ejecutivo y Gerente General Caserones',
  'Lundin Mining',
  'lundinmining.com',
  'Titular Minero',
  '["proj-caserones-lundin-deep"]',
  'Decisor Clave / Presidente Ejecutivo & CEO',
  'gonzalo.araujo@lundinmining.com',
  'verificado',
  NULL,
  'https://linkedin.com/in/gonzalo-araujo-alonso-86033195',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/gonzalo-araujo-alonso-86033195',
  'Alta',
  '2026-11-07'
),

-- 13. Las Cenizas Franke - Cristian Argandoña León
(
  'act-cenizas-cristian-argandona',
  'Cristian Argandoña León',
  'Gerente General (CEO) Grupo Minero Las Cenizas',
  'Grupo Minero Las Cenizas',
  'cenizas.cl',
  'Titular Minero',
  '["proj-franke-minera-albermarle"]',
  'Decisor Clave / CEO Corporativo',
  'cristian.argandona@cenizas.cl',
  'catch_all',
  NULL,
  'https://linkedin.com/in/cristian-argando%C3%B1a-le%C3%B3n-02311235',
  'Treg.to / LinkedIn',
  'https://linkedin.com/in/cristian-argando%C3%B1a-le%C3%B3n-02311235',
  'Alta',
  '2026-11-07'
);
