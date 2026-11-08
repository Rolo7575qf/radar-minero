-- ==============================================================================
-- HISTORIAL PÚBLICO OFICIAL (2021 - 2026) - OLA 4 COCHILCO (10 GRANDES PROYECTOS)
-- Reconstrucción de huellas verificadas: SEIA, Memorias Técnicas, ASX/TSX Disclosures e Informes Corporativos
-- Principio: INSERT OR IGNORE INTO project_history
-- ==============================================================================

INSERT OR IGNORE INTO project_history (
  id, project_id, event_date, signal_title, source,
  previous_stage, new_stage, previous_capex, new_capex,
  change_description, commercial_interpretation, potential_impact, confidence_level
) VALUES 
-- 1. Radomiro Tomic Sulfuros Fase II
(
  'hist-rt-sulfuros-01',
  'proj-radomiro-tomic-sulfuros',
  '2021-06-15',
  'Presentación de adenda técnica para suministro de agua desalada desde Tocopilla',
  'SEIA / Codelco Memoria Anual',
  '4. Prefactibilidad',
  '5. Factibilidad',
  800.0,
  882.0,
  'Codelco actualizó el diseño de explotación de sulfuros en RT, vinculando la fuente hídrica al consorcio de la Planta Desaladora Distrito Norte para garantizar 1.000 l/s.',
  'Hito que destraba la ingeniería de detalle de la concentradora al resolver el abastecimiento hídrico sin derechos de agua continental en Calama.',
  'Licitaciones de obras civiles para la subestación eléctrica y correas transportadoras overland de mineral grueso.',
  'Alta'
),
(
  'hist-rt-sulfuros-02',
  'proj-radomiro-tomic-sulfuros',
  '2024-04-20',
  'Aprobación de fondos de inversión para ingeniería básica y pilotaje metalúrgico',
  'Directorio Codelco / Cochilco Inversiones',
  '5. Factibilidad',
  '6. Ingeniería básica',
  882.0,
  882.0,
  'El directorio de Codelco aprobó el presupuesto para culminar la ingeniería básica de la nueva línea de flotación de sulfuros primarios de 100.000 tpd.',
  'El proyecto avanza a fase clave de definición de equipos principales (molinos SAG, celdas de flotación de gran volumen y espesadores).',
  'Oportunidades tempranas de inserción en Vendor List para proveedores de piping revestido y válvulas de alta presión.',
  'Alta'
),

-- 2. Expansión y Quinta Línea Collahuasi
(
  'hist-collahuasi-exp-01',
  'proj-collahuasi-expansion-fase-2',
  '2022-03-10',
  'RCA Favorable para el Proyecto de Desarrollo y Optimización de Infraestructura',
  'Servicio de Evaluación Ambiental (SEA)',
  '8. Permisos y aprobaciones',
  '9. Decisión de inversión',
  2800.0,
  3200.0,
  'Aprobación ambiental unánime del proyecto integral que incluye quinta línea de procesamiento, planta desaladora en Patache y nuevo depósito de relaves espesados.',
  'Hito maestro de viabilidad que dio luz verde a los socios (Glencore, Anglo American y JX Nippon) para comprometer el CAPEX mayor.',
  'Apertura inmediata de paquetes de ingeniería de compras y contratos EPC para obras marítimas y de molienda.',
  'Alta'
),
(
  'hist-collahuasi-exp-02',
  'proj-collahuasi-expansion-fase-2',
  '2024-08-15',
  'Adjudicación de contratos de montaje electromecánico y avance en impulsión de agua',
  'Collahuasi Corporate Release / Portal Proveedores',
  '10. Contratación',
  '11. Construcción',
  3200.0,
  3200.0,
  'Inicio de obras masivas de montaje de la quinta línea de molienda SAG y tendido del acueducto de 110 km desde la costa de Tarapacá hasta los 4.400 msnm.',
  'Fase máxima de contratación de contratistas secundarios de montaje, logística pesada, campamentos y servicios de instrumentación.',
  'Alta demanda de servicios de torque controlado, pruebas no destructivas, montaje de cañerías de acero y comisionamiento preoperacional.',
  'Alta'
),

-- 3. Salares Norte (Gold Fields)
(
  'hist-salares-norte-01',
  'proj-salares-norte-goldfields',
  '2021-11-20',
  'Inicio de movimiento de tierras y construcción de planta Merrill-Crowe',
  'Gold Fields TSX Disclosures',
  '10. Contratación',
  '11. Construcción',
  860.0,
  1020.0,
  'Arranque de obras civiles en alta cordillera de Atacama (4.500 msnm), enfrentando condiciones climáticas extremas que obligaron a modularizar la planta.',
  'Incremento de CAPEX por invierno altiplánico severo y refuerzo de estándares de habitabilidad y aislación térmica en campamentos.',
  'Contratos de mantenimiento de flotas de alta montaña, suministro de domos geodésicos y calefacción industrial.',
  'Alta'
),
(
  'hist-salares-norte-02',
  'proj-salares-norte-goldfields',
  '2024-03-28',
  'Primer vertido de metal doré (First Gold Pour) y comienzo del comisionamiento',
  'Gold Fields Comunicado de Prensa',
  '11. Construcción',
  '12. Puesta en marcha',
  1020.0,
  1020.0,
  'Producción del primer lingote de doré de oro y plata en la planta de proceso, iniciando el periodo de ramp-up hacia producción comercial plena.',
  'Transición de contratos de construcción a contratos de continuidad operacional y mantenimiento de reactivos de cianuración y filtrado.',
  'Requerimiento de repuestos críticos de bombas centrífugas, telas filtrantes de relaves y servicios de laboratorio químico analítico in situ.',
  'Alta'
),

-- 4. Mina El Peñón (Pan American Silver)
(
  'hist-el-penon-01',
  'proj-el-penon-yamana-panamerican',
  '2023-05-18',
  'Integración operacional tras adquisición de Yamana Gold por Pan American Silver',
  'Pan American Silver Corp Filing',
  '13. Operación',
  '7. Ingeniería de detalle',
  150.0,
  175.0,
  'Traspaso oficial de la mina subterránea El Peñón a Pan American Silver, lanzando un programa agresivo de exploración profunda en vetas Bonanza y Providencia.',
  'Nueva administración busca extender la vida de mina más allá de 2030 mediante desarrollo de rampas de exploración y perforación diamantina.',
  'Contratación de servicios de sondajes subterráneos, sostenimiento con pernos helicoidales y shotcrete robotizado.',
  'Alta'
),

-- 5. CMP Planta Pellets y Guacolda II
(
  'hist-cmp-guacolda-01',
  'proj-cmp-pellets-guacolda',
  '2023-09-12',
  'Ingreso al SEIA del proyecto de optimización de muelle y sistemas de descarbonización',
  'SEIA Atacama / Memoria CMP',
  '6. Ingeniería básica',
  '7. Ingeniería de detalle',
  160.0,
  195.0,
  'Presentación ambiental para reemplazar quemadores de fuel oil por gas natural/hidrógeno verde en hornos de pellets e instalar mangas telescópicas antipolvo en Guacolda.',
  'Estrategia de CMP de posicionarse como proveedor líder de pellets para reducción directa (DRI) de bajo CO2 en siderúrgicas internacionales.',
  'Licitaciones de instrumentación de monitoreo de emisiones en continuo (CEMS), correas encapsuladas y automatización de cargador de barcos.',
  'Alta'
),

-- 6. Lomas Bayas Continuidad (Glencore)
(
  'hist-lomas-bayas-01',
  'proj-lomas-bayas-continuidad',
  '2022-10-05',
  'Puesta en marcha de Lomas Lab con flota de camiones de extracción 100% autónomos',
  'Glencore Chile / Portal Minero',
  '4. Prefactibilidad',
  '5. Factibilidad',
  200.0,
  255.0,
  'Glencore transformó Lomas Bayas en el centro global de pruebas tecnológicas para minería autónoma y lixiviación de sulfuros de baja ley.',
  'La operación busca reducir costos unitarios para hacer viable la explotación de fases profundas con leyes de cobre inferiores al 0,3%.',
  'Demanda de soluciones de conectividad privada LTE/5G minera, radares de monitoreo de taludes y optimización de reactivos biolixiviantes.',
  'Alta'
),

-- 7. Depósito de Relaves Torito Fase 6 (El Soldado)
(
  'hist-torito-f6-01',
  'proj-el-soldado-torito-f6',
  '2024-02-14',
  'Obtención de RCA favorable para recrecimiento de tranque con relaves espesados',
  'SEA Región de Valparaíso',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  110.0,
  130.0,
  'Resolución de Calificación Ambiental favorable para la Fase 6 del Tranque El Torito, incorporando espesadores de alta densidad para reducir consumo de agua fresca.',
  'Despeja el principal cuello de botella de El Soldado, permitiendo mantener la operación subterránea y en rajo hasta fines de la década.',
  'Paquetes de tuberías de polietileno de alta densidad (HDPE) de gran diámetro, estaciones de bombeo de relaves y piezómetros de cuerda vibrante.',
  'Alta'
),

-- 8. Lobo-Marte (Kinross Gold)
(
  'hist-lobo-marte-01',
  'proj-lobo-marte-kinross',
  '2021-12-01',
  'Finalización de estudio de prefactibilidad y estimación de reservas de oro',
  'Kinross Gold News Release',
  '4. Prefactibilidad',
  '5. Factibilidad',
  995.0,
  1080.0,
  'Kinross acreditó 4,7 millones de onzas de reservas minerales en los yacimientos Lobo y Marte, diseñando una operación a cielo abierto con lixiviación en pilas.',
  'El proyecto aprovecha la infraestructura ya instalada en La Coipa, reduciendo la huella ambiental y el CAPEX de plantas de procesos.',
  'Licitaciones de estudios hidrogeológicos, monitoreo de vegas altoandinas y preselección de contratistas de movimiento de tierra masivo.',
  'Alta'
),

-- 9. Continuidad Operacional Caserones (Lundin Mining)
(
  'hist-caserones-lundin-01',
  'proj-caserones-lundin-deep',
  '2023-07-25',
  'Toma de control operacional por Lundin Mining y plan de optimización de planta',
  'Lundin Mining TSX Release',
  '13. Operación',
  '8. Permisos y aprobaciones',
  250.0,
  320.0,
  'Lundin asumió la gestión de Caserones, anunciando un programa de US$ 320M para resolver restricciones de confiabilidad en molienda y ampliar el rajo hacia el sector este.',
  'El operador canadiense aplica su disciplina técnica para reducir paradas imprevistas de planta e incrementar la recuperación metalúrgica.',
  'Servicios de revestimiento de molinos SAG, repuestos de bombas de pulpa y monitoreo predictivo de vibraciones en transmisiones de molienda.',
  'Alta'
),

-- 10. Franke Continuidad (Minera Las Cenizas)
(
  'hist-franke-cenizas-01',
  'proj-franke-minera-albermarle',
  '2022-04-30',
  'Adquisición de Minera Franke por Grupo Minero Las Cenizas a la polaca KGHM',
  'Diario Financiero / Boletín Minero',
  '13. Operación',
  '7. Ingeniería de detalle',
  60.0,
  85.0,
  'Las Cenizas tomó el control del yacimiento Franke en Taltal, iniciando un plan de optimización para reactivar pilas de lixiviación y comprar mineral a pequeños mineros.',
  'Consolidación de Las Cenizas como operador especialista de mediana minería con sinergias en plantas de beneficio en la Región de Antofagasta.',
  'Contratos de transporte terrestre de ácido sulfúrico, suministro de geomembranas de HDPE y maquila de minerales oxidados.',
  'Alta'
);
