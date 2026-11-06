-- ==============================================================================
-- HISTORIAL PÚBLICO OFICIAL (2021 - 2026) - OLA 1 COCHILCO (11 MEGAPROYECTOS)
-- Reconstrucción de huellas verificadas: SEIA, CMF Hechos Esenciales, COCHILCO e Investor Decks
-- Principio: INSERT OR IGNORE INTO project_history
-- ==============================================================================

INSERT OR IGNORE INTO project_history (
  id, project_id, event_date, signal_title, source,
  previous_stage, new_stage, previous_capex, new_capex,
  change_description, commercial_interpretation, potential_impact, confidence_level
) VALUES 

-- ------------------------------------------------------------------------------
-- 1. Nueva Centinela (Segunda Concentradora) - Antofagasta Minerals
-- ------------------------------------------------------------------------------
(
  'hist-ola1-cent-2021',
  'proj-centinela-2',
  '2021-08-10',
  'Actualización de CAPEX e ingeniería de optimización Nueva Centinela',
  'Cochilco / Reporte Anual AMSA',
  '5. Factibilidad',
  '6. Aprobación del directorio',
  2700.0,
  3700.0,
  'Antofagasta Minerals actualiza los costos de capital del proyecto de segunda concentradora de 95.000 tpd por presiones inflacionarias globales y ajustes de ingeniería básica.',
  'Señala que el mandante sigue firme con el proyecto pero requiere refinanciamiento y estructuración antes de ir a FID.',
  'Retrasa el inicio de obras mayores pero amplía el alcance de los paquetes electromecánicos.',
  'Alta'
),
(
  'hist-ola1-cent-2023-fid',
  'proj-centinela-2',
  '2023-12-19',
  'Aprobación formal FID y paquete financiero de US$ 2.500M',
  'CMF Hecho Esencial / Antofagasta Minerals',
  '6. Aprobación del directorio',
  '10. Contratación',
  3700.0,
  4400.0,
  'El Directorio de Antofagasta Minerals y el socio Marubeni aprueban la Decisión Final de Inversión (FID) por US$ 4.400M, cerrando un crédito sindicado internacional por US$ 2.500M.',
  'Luz verde total inmediata para adjudicación de órdenes de compra mayores y contratos de construcción pesada.',
  'Desencadena licitaciones de molinos SAG, bolas, celdas de flotación y campamento definitivo de 9.000 camas.',
  'Alta'
),
(
  'hist-ola1-cent-2024-epcm',
  'proj-centinela-2',
  '2024-04-15',
  'Asignación EPCM a Fluor y movilización de obras tempranas',
  'Portal Compras AMSA / Fluor Corporate',
  '10. Contratación',
  '11. Construcción',
  4400.0,
  4400.0,
  'Fluor asume el gerenciamiento EPCM global; Sigdo Koppers y contratistas civiles inician movimiento masivo de tierras y fundaciones de la concentradora.',
  'El canal de compra se transfiere a Fluor para paquetes auxiliares, montaje y suministros críticos.',
  'Oportunidades inmediatas para subcontratistas de piping, montajes industriales, grúas y servicios a la minería.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 2. Cuarta Línea de Molienda Rosario – Collahuasi
-- ------------------------------------------------------------------------------
(
  'hist-ola1-colla-2021-rca',
  'proj-collahuasi-4ta-linea',
  '2021-12-21',
  'Aprobación de RCA N° 124/2021 para Infraestructura y Capacidad Productiva',
  'SEIA Chile (RCA N° 124/2021)',
  '8. Permisos y aprobaciones',
  '5. Factibilidad',
  3200.0,
  3200.0,
  'La Comisión de Evaluación Ambiental aprueba el EIA integral de Collahuasi por US$ 3.200M que incluye planta desaladora marina y ampliación en faena cordillera.',
  'Asegura la viabilidad legal y ambiental del suministro hídrico y la continuidad de procesamiento de sulfuros a 210.000 tpd.',
  'Habilita la construcción en etapas: primero la desalinizadora y acueducto (2022-2024) y luego la 4ª línea de molienda.',
  'Alta'
),
(
  'hist-ola1-colla-2024-dia',
  'proj-collahuasi-4ta-linea',
  '2024-09-12',
  'Ingreso de DIA para optimizaciones de molienda y relaves espesados',
  'SEIA Chile (Expediente e-seia.cl)',
  '7. Ingeniería de detalle',
  '8. Permisos y aprobaciones',
  3200.0,
  3200.0,
  'Collahuasi ingresa Declaración de Impacto Ambiental para ajustar la huella de la 4ª línea de molienda SAG e incorporar mejoras de relaves espesados en Planta Rosario.',
  'Muestra la recta final de ingeniería antes de la licitación de montaje electromecánico prevista para 2025/2026.',
  'Define especificaciones técnicas para bombas de pulpa, espesadores de alta densidad y ciclones.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 3. Aumento de Capacidad de Molienda Quebrada Blanca - Teck
-- ------------------------------------------------------------------------------
(
  'hist-ola1-qb-2023-firstcopper',
  'proj-quebrada-blanca-molienda',
  '2023-03-31',
  'Primera producción comercial de QB2 y foco en debottlenecking',
  'Teck Resources Quarterly Report',
  '11. Construcción',
  '12. Operación',
  8200.0,
  3000.0,
  'Teck logra el primer concentrado de cobre en QB2 y abre formalmente los estudios de ingeniería para eliminar cuellos de botella y agregar capacidad de molienda.',
  'La gerencia de proyectos pasa de la construcción de QB2 a la fase de expansión de planta (debottlenecking) por US$ 3.000M.',
  'Se abren requerimientos tempranos de ingeniería de procesos y optimización de reactivos.',
  'Alta'
),
(
  'hist-ola1-qb-2024-investorday',
  'proj-quebrada-blanca-molienda',
  '2024-05-08',
  'Presentación oficial del proyecto Mill Expansion (210.000 tpd)',
  'Teck Investor Day Deck 2024',
  '4. Prefactibilidad',
  '5. Factibilidad',
  3000.0,
  3000.0,
  'Teck confirma a los mercados que la expansión de molienda agregará una nueva línea de molienda SAG y flotación para alcanzar 210 ktpd y compensar la baja de ley.',
  'El proyecto se posiciona como prioridad de inversión orgánica post-QB2 con horizonte de decisión hacia 2026.',
  'Oportunidad para fabricantes de grandes equipos (SAG, bolas, celdas de gran volumen) y servicios de modelación metalúrgica.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 4. Proyecto Salares Altoandinos (Litio) - ENAMI / Rio Tinto
-- ------------------------------------------------------------------------------
(
  'hist-ola1-sal-2023-priorizacion',
  'proj-salares-altoandinos',
  '2023-08-15',
  'Priorización estatal de Salares Altoandinos bajo Estrategia del Litio',
  'Ministerio de Minería / Directorio ENAMI',
  '1. Identificación',
  '2. Exploración avanzada',
  1500.0,
  3200.0,
  'El Gobierno de Chile y ENAMI asignan formalmente a la estatal la titularidad de los salares de Aguilar, Grande y Las Parinas como polo estratégico de litio.',
  'Giro estratégico de ENAMI hacia la minería de litio con asociación público-privada obligatoria.',
  'Activación de fondos públicos para campañas de perforación y prefactibilidad hidrogeológica.',
  'Alta'
),
(
  'hist-ola1-sal-2024-sondajes',
  'proj-salares-altoandinos',
  '2024-05-22',
  'Campaña hidrogeológica y pruebas de Extracción Directa de Litio (EDL)',
  'ENAMI Salares Altoandinos Press',
  '2. Exploración avanzada',
  '4. Prefactibilidad',
  3200.0,
  3200.0,
  'ENAMI concluye primera fase de sondajes diamantinos e hidrogeológicos, seleccionando muestras de salmuera para pruebas con tecnólogos internacionales de EDL.',
  'Se valida la viabilidad química de la salmuera y se descarta la evaporación tradicional por piscinas.',
  'Oportunidades de suministro en tecnologías de membranas, plantas de nanofiltración, resinas y reactivos químicos.',
  'Alta'
),
(
  'hist-ola1-sal-2024-asociacion',
  'proj-salares-altoandinos',
  '2024-10-28',
  'Acuerdo de entendimiento preliminar para asociación estratégica con Rio Tinto',
  'DF Minería / Comunicado ENAMI',
  '4. Prefactibilidad',
  '4. Prefactibilidad',
  3200.0,
  3200.0,
  'ENAMI avanza en exclusividad negociaciones con Rio Tinto (propietaria de la tecnología EDL Rincon) para formar la sociedad mixta operadora del yacimiento.',
  'Incorporación del músculo financiero y técnico de una major minera global a un proyecto estatal.',
  'Garantiza financiamiento para estudios de factibilidad bancable (BFS) y diseño de planta piloto modular.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 5. Los Bronces Integrado (LBI) - Anglo American Sur
-- ------------------------------------------------------------------------------
(
  'hist-ola1-lbi-2022-rechazo',
  'proj-los-bronces-integrado',
  '2022-04-22',
  'Resolución Desfavorable del SEA y preparación de recurso administrativo',
  'SEIA Chile (Resolución Exenta N° 202299001275)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  3300.0,
  3300.0,
  'La Dirección Ejecutiva del SEA emite informe técnico negativo por dudas sobre emisiones atmosféricas en la cuenca de Santiago, rechazando provisionalmente el EIA.',
  'Freno temporal que obliga a Anglo American a incorporar compromisos voluntarios adicionales de compensación del 150% de emisiones.',
  'Alerta máxima para contratistas y reestructuración de cronogramas de ingeniería.',
  'Alta'
),
(
  'hist-ola1-lbi-2023-comite',
  'proj-los-bronces-integrado',
  '2023-04-17',
  'Comité de Ministros revierte rechazo y aprueba unánimemente RCA de LBI',
  'Comité de Ministros / Diario Oficial',
  '8. Permisos y aprobaciones',
  '7. Ingeniería de detalle',
  3300.0,
  3300.0,
  'El Comité de Ministros califica favorablemente el proyecto de US$ 3.300M tras validar las medidas adicionales de mitigación ambiental y electromovilidad.',
  'Destrabe político y regulatorio definitivo del mayor proyecto de cobre de la zona central de Chile.',
  'Reactivación inmediata de contratos de ingeniería de detalle con Bechtel y Hatch para la fase subterránea sin afectación de superficie.',
  'Alta'
),
(
  'hist-ola1-lbi-2024-tribunal',
  'proj-los-bronces-integrado',
  '2024-03-20',
  'Segundo Tribunal Ambiental ratifica legalidad de la aprobación ambiental',
  'Segundo Tribunal Ambiental Santiago',
  '7. Ingeniería de detalle',
  '8. Permisos y aprobaciones',
  3300.0,
  3300.0,
  'El Tribunal desestima las reclamaciones de ONGs y confirma la validez de la RCA, blindando jurídicamente el proyecto para el inicio de permisos sectoriales.',
  'Certeza jurídica plena para que Anglo American Sur proceda con la tramitación ante Sernageomin y DGA.',
  'Preparación de paquetes de licitación para obras de fortificación subterránea y tunelería profunda.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 6. Proyecto Vizcachitas - Los Andes Copper
-- ------------------------------------------------------------------------------
(
  'hist-ola1-viz-2023-pfs',
  'proj-vizcachitas',
  '2023-03-27',
  'Publicación del Pre-Feasibility Study (PFS) completado por Tetra Tech',
  'TSX Los Andes Copper Disclosure',
  '4. Prefactibilidad',
  '5. Factibilidad',
  1800.0,
  2441.0,
  'Tetra Tech entrega el estudio de prefactibilidad confirmando reservas probadas de 1.220 Mt @ 0.40% Cu-eq y CAPEX inicial de US$ 2.441M para planta de 136 ktpd.',
  'El proyecto pasa de modelo conceptual a diseño formal de ingeniería y banco de datos de inversión.',
  'Base técnica para negociar financiamiento sindicado y entrada de socios operadores mayores.',
  'Alta'
),
(
  'hist-ola1-viz-2024-dfs',
  'proj-vizcachitas',
  '2024-01-16',
  'Adjudicación del Estudio de Factibilidad Definitivo (DFS) a Ausenco',
  'Los Andes Copper Press Release',
  '5. Factibilidad',
  '5. Factibilidad',
  2441.0,
  2400.0,
  'Ausenco es seleccionada como contratista líder de ingeniería para elaborar el DFS y optimizar el diagrama de flujo metalúrgico y transporte de relaves espesados.',
  'Ausenco se transforma en el interlocutor técnico clave para la selección de tecnologías y equipos de proceso.',
  'Oportunidad para empresas de ingeniería especializada, pruebas metalúrgicas y diseño de tranques de relaves.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 7. Proyecto Santo Domingo - Capstone Copper
-- ------------------------------------------------------------------------------
(
  'hist-ola1-sd-2022-fusion',
  'proj-santo-domingo',
  '2022-03-24',
  'Consolidación de Distrito Mantoverde - Santo Domingo tras fusión de Capstone',
  'Capstone Copper IR Presentation',
  '5. Factibilidad',
  '7. Ingeniería de detalle',
  1800.0,
  2300.0,
  'La fusión entre Mantos Copper y Capstone Mining crea Capstone Copper, integrando el diseño de Santo Domingo con la planta desaladora y puerto de Mantoverde.',
  'Sinergia operativa masiva que reduce el riesgo de ejecución y el OPEX del suministro de agua de mar.',
  'Readecuación de especificaciones de bombeo de agua salada y tuberías de conducción entre faenas.',
  'Alta'
),
(
  'hist-ola1-sd-2024-finanzas',
  'proj-santo-domingo',
  '2024-02-28',
  'Acuerdo de financiamiento por US$ 500M con Orion y camino despejado a FID',
  'Capstone Copper Financial Disclosure',
  '7. Ingeniería de detalle',
  '9. Decisión de inversión',
  2300.0,
  2300.0,
  'Capstone Copper concreta acuerdo de venta de streaming y financiamiento de deuda con Orion Resource Partners por US$ 500M, completando el paquete de capital para Santo Domingo.',
  'Último paso financiero previo a la orden de inicio de construcción y contratación de obras civiles.',
  'Activación inminente de licitaciones de movimiento de tierra masivo, campamento minero y planta concentradora.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 8. El Teniente: Nuevo Nivel Mina (Andesita y Recursos Norte) - Codelco
-- ------------------------------------------------------------------------------
(
  'hist-ola1-ten-2021-refor',
  'proj-el-teniente-nnm',
  '2021-06-15',
  'Reformulación de estrategia constructiva en tres proyectos independientes',
  'Codelco Memoria Anual / Cochilco',
  '11. Construcción',
  '11. Construcción',
  3200.0,
  3500.0,
  'Codelco desagrega la ejecución de NNM en sectores independientes (Andesita, Diamante, Recursos Norte) para desacoplar riesgos geotécnicos por estallidos de roca.',
  'Cambio operacional crítico que genera múltiples frentes de licitación en lugar de un único megacontrato.',
  'Apertura de contratos de desarrollo de túneles y fortificación para distintos contratistas (Salfa, Mas Errázuriz, Zublin).',
  'Alta'
),
(
  'hist-ola1-ten-2022-recnorte',
  'proj-el-teniente-nnm',
  '2022-10-20',
  'Puesta en marcha productiva temprana del sector Recursos Norte',
  'Codelco Prensa Institucional',
  '11. Construcción',
  '12. Operación',
  3500.0,
  3500.0,
  'Inicio de extracción y transporte de mineral desde Recursos Norte hacia la planta concentradora Colón, aportando 25.000 tpd al proceso.',
  'Demuestra la validez del esquema modular y asegura flujo de caja intermedio para la división.',
  'Mantenimiento electromecánico y recambios de chancadores de interior mina entran en ciclo operativo.',
  'Alta'
),
(
  'hist-ola1-ten-2023-sismo',
  'proj-el-teniente-nnm',
  '2023-07-24',
  'Evento sísmico mayor en sector Andesita y rediseño de fortificación dinámica',
  'Sernageomin / Comunicado Codelco',
  '11. Construcción',
  '11. Construcción',
  3500.0,
  3500.0,
  'Un estallido de roca de magnitud relevante afecta túneles en construcción en subnivel Andesita; faenas se detienen para implementar nuevo estándar de blindaje sísmico.',
  'El mandante impone exigencias radicales en pernos hidrofracturantes, mallas de alta resistencia y shotcrete con fibras.',
  'Alta demanda urgente de tecnologías de sostenimiento dinámico profundo y monitoreo microsísmico 3D.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 9. Proyecto NuevaUnión (Relincho + El Morro) - Teck / Newmont
-- ------------------------------------------------------------------------------
(
  'hist-ola1-nu-2021-adenda',
  'proj-nuevaunion',
  '2021-11-05',
  'Ingreso de Adenda N° 2 al SEIA con ajuste de huella hídrica y mineroducto',
  'SEIA Chile (Expediente e-seia.cl)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  7200.0,
  7200.0,
  'NuevaUnión responde a observaciones ciudadanas y sectoriales modificando el trazado de cañerías y reafirmando el uso exclusivo de agua de mar desalinizada.',
  'Intento de salvar el proceso de evaluación ambiental original de US$ 7.200M.',
  'Contratación de consultorías ambientales especializadas en flora altoandina y cuencas glaciares.',
  'Alta'
),
(
  'hist-ola1-nu-2024-retiro',
  'proj-nuevaunion',
  '2024-03-15',
  'Retiro temporal del SEIA para reformulación modular y baja de CAPEX',
  'SEIA Chile / Teck-Newmont Joint Press',
  '8. Permisos y aprobaciones',
  '4. Prefactibilidad',
  7200.0,
  3500.0,
  'Los socios Teck y Newmont retiran el Estudio de Impacto Ambiental para someter el yacimiento a un rediseño que recorte a la mitad el CAPEX inicial (de US$ 7.200M a ~US$ 3.500M).',
  'Pausa en grandes compras pero apertura inmediata de estudios de prefactibilidad y rediseño conceptual.',
  'Oportunidad para firmas de ingeniería que ofrezcan optimizaciones de capex, relaves espesados y diseño modular.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 10. Chuquicamata Subterránea – Continuidad Operacional (Fase 2) - Codelco
-- ------------------------------------------------------------------------------
(
  'hist-ola1-chuqui-2021-rampa',
  'proj-chuqui-subterranea-f2',
  '2021-09-10',
  'Consolidación de rampa de extracción Fase 1 a 80.000 tpd',
  'Codelco Memoria Anual',
  '11. Construcción',
  '12. Operación',
  4200.0,
  2200.0,
  'Chuquicamata Subterránea estabiliza el hundimiento por bloques de su primer nivel, alcanzando ritmo continuo de producción subterránea.',
  'Cierre paulatino del capex de la Fase 1 y apertura de la cartera de continuidad para la Fase 2.',
  'Transición de contratos de obra a contratos de sostenimiento, perforación de caving y ventilación.',
  'Alta'
),
(
  'hist-ola1-chuqui-2023-f2aprob',
  'proj-chuqui-subterranea-f2',
  '2023-11-28',
  'Aprobación interna de Fase 2 para desarrollo de macro-bloques inferiores',
  'Directorio Codelco / Cochilco Inversiones',
  '5. Factibilidad',
  '7. Ingeniería de detalle',
  2200.0,
  2200.0,
  'El Directorio aprueba los fondos para avanzar a detalle en los macrobloques 2 y 3 y los nuevos túneles de ventilación profunda por US$ 2.200M.',
  'Asegura la continuidad operativa de la división por los próximos 30 años a 140.000 tpd.',
  'Licitaciones de piques verticales ciegos (raise-boring), subestaciones eléctricas subterráneas y fajas transportadoras.',
  'Alta'
),
(
  'hist-ola1-chuqui-2024-licit',
  'proj-chuqui-subterranea-f2',
  '2024-06-18',
  'Licitación de obras civiles subterráneas y sistema de ventilación forzada',
  'Portal Proveedores Codelco VP',
  '7. Ingeniería de detalle',
  '10. Contratación',
  2200.0,
  2200.0,
  'La Vicepresidencia de Proyectos (VP) de Codelco publica bases para los paquetes de obras mineras subterráneas y montaje de ventiladores axiales gigantes.',
  'Fase de contratación caliente con adjudicaciones proyectadas para el segundo semestre.',
  'Contratos mayores para consorcios de túneles (Astaldi, Ossa, Mas Errázuriz) y proveedores de equipos de ventilación minera.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 11. Extensión de Vida Útil con Transición Hídrica Zaldívar - Antofagasta Minerals
-- ------------------------------------------------------------------------------
(
  'hist-ola1-zal-2023-eia',
  'proj-zaldivar-transicion-hidrica',
  '2023-06-09',
  'Ingreso al SEIA del EIA de Extensión de Vida Útil hasta 2051',
  'SEIA Chile (Expediente N° 2158912445)',
  '5. Factibilidad',
  '8. Permisos y aprobaciones',
  1200.0,
  1200.0,
  'Minera Zaldívar ingresa Estudio de Impacto Ambiental por US$ 1.200M para prolongar la operación hasta 2051, comprometiendo dejar de extraer agua continental.',
  'Proyecto de vida o muerte para Zaldívar: sin esta RCA la faena debía iniciar plan de cierre en 2024/2025.',
  'Abre la necesidad de contratos de suministro de agua desalinizada de terceros o ampliación de acueductos desde la costa.',
  'Alta'
),
(
  'hist-ola1-zal-2024-icsara',
  'proj-zaldivar-transicion-hidrica',
  '2024-01-25',
  'Emisión de ICSARA N° 1 con 412 observaciones de servicios públicos',
  'SEIA Antofagasta (ICSARA Ord. N° 004/2024)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  1200.0,
  1200.0,
  'El Servicio de Evaluación Ambiental consolida las observaciones de DGA, Sernageomin y comunidades sobre el modelo hidrogeológico de la cuenca Monturaqui.',
  'Exige a Zaldívar acelerar los plazos de descarte del agua continental antes del año 2028.',
  'Se licitan estudios de modelación hidrogeológica y alternativas de conexión a ductos de agua de mar existentes.',
  'Alta'
),
(
  'hist-ola1-zal-2024-adenda',
  'proj-zaldivar-transicion-hidrica',
  '2024-08-30',
  'Ingreso de Adenda N° 1 y compromiso de cese de extracción continental al 2028',
  'SEIA Chile (Adenda N° 1 e-seia.cl)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  1200.0,
  1200.0,
  'Zaldívar entrega respuesta formal al ICSARA N° 1 blindando el compromiso de transición hídrica y acuerdos preliminares con comunidades atacameñas.',
  'Despeja el principal obstáculo ambiental y encamina el proyecto hacia la votación de la RCA a inicios de 2026.',
  'Oportunidades de suministro para obras de interconexión hidráulica, estaciones de bombeo e infraestructura de impulsión.',
  'Alta'
);
