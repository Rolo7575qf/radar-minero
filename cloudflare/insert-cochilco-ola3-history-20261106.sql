-- ==============================================================================
-- HISTORIAL PÚBLICO OFICIAL (2021 - 2026) - OLA 3 COCHILCO (10 PROYECTOS MEDIANOS Y EXPANSIONES)
-- Reconstrucción de huellas verificadas: SEIA, Memorias Técnicas, ASX/TSX Disclosures e Informes Corporativos
-- Principio: INSERT OR IGNORE INTO project_history
-- ==============================================================================

INSERT OR IGNORE INTO project_history (
  id, project_id, event_date, signal_title, source,
  previous_stage, new_stage, previous_capex, new_capex,
  change_description, commercial_interpretation, potential_impact, confidence_level
) VALUES 

-- ------------------------------------------------------------------------------
-- 1. Proyecto Marimaca Cobre - Marimaca Copper Corp
-- ------------------------------------------------------------------------------
(
  'hist-ola3-mar-2022-pea',
  'proj-marimaca-cobre',
  '2022-05-19',
  'Actualización del PEA por Ausenco y expansión de recursos a 140 Mt',
  'TSX Marimaca Copper / Ausenco Study',
  '4. Prefactibilidad',
  '5. Factibilidad',
  285.0,
  413.0,
  'Ausenco y Golder entregan la actualización del Estudio Económico Preliminar elevando los recursos lixiviables a 140 Mt @ 0.48% CuT y definiendo una planta de 50 ktpa de cátodos por US$ 413M.',
  'Consolida a Marimaca como uno de los proyectos de óxidos de cobre a cielo abierto más eficientes del mundo por su ubicación a baja cota cerca de Mejillones.',
  'Define el diagrama de flujo con uso directo de agua de mar sin desalar para el proceso de lixiviación.',
  'Alta'
),
(
  'hist-ola3-mar-2023-mitsu',
  'proj-marimaca-cobre',
  '2023-06-20',
  'Entrada de Mitsubishi Corporation con el 5% de la propiedad',
  'Marimaca Corporate Disclosure',
  '5. Factibilidad',
  '5. Factibilidad',
  413.0,
  413.0,
  'Mitsubishi Corporation suscribe una colocación privada por CAD$ 20M adquiriendo el 5% de Marimaca Copper para asegurar opciones de compra de cátodos de cobre.',
  'Entrada de un conglomerado japonés de primera línea que valida la rentabilidad del proyecto y asegura respaldo financiero.',
  'Acelera los estudios de ingeniería de detalle y las campañas de sondajes geotécnicos.',
  'Alta'
),
(
  'hist-ola3-mar-2024-dfs',
  'proj-marimaca-cobre',
  '2024-01-22',
  'Adjudicación del Estudio de Factibilidad Definitivo (DFS) a Ausenco',
  'Press Release Marimaca Copper',
  '5. Factibilidad',
  '5. Factibilidad',
  413.0,
  413.0,
  'Ausenco Chile es seleccionada para liderar el DFS y la ingeniería de detalle de las plantas de extracción por solventes y electroobtención (SX-EW).',
  'Ausenco se convierte en el decisor técnico clave para la selección de celdas de hormigón polimérico, bombas y piping de refino.',
  'Oportunidades de suministro en equipos de SX-EW, geomembranas de lixiviación y grúas despegadoras catódicas.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 2. Proyecto Litio Laguna Verde (EDL) - CleanTech Lithium
-- ------------------------------------------------------------------------------
(
  'hist-ola3-cle-2023-scoping',
  'proj-litio-laguna-verde',
  '2023-01-03',
  'Publicación del Scoping Study con 100% Extracción Directa de Litio',
  'AIM CleanTech Lithium Regulatory News',
  '1. Identificación',
  '4. Prefactibilidad',
  250.0,
  380.0,
  'CleanTech Lithium publica estudio conceptual validando proceso EDL con tecnólogo Sunresin, estimando producción de 20.000 t/año de carbonato de litio grado batería sin piscinas de evaporación.',
  'Se posiciona como proyecto verde modelo en Chile que cumple con los requerimientos de la Estrategia Nacional del Litio.',
  'Compromiso de reinyección del 100% de la salmuera y uso exclusivo de energía fotovoltaica.',
  'Alta'
),
(
  'hist-ola3-cle-2024-piloto',
  'proj-litio-laguna-verde',
  '2024-06-18',
  'Puesta en marcha de planta piloto de EDL en Copiapó y primeras muestras de batería',
  'CleanTech Lithium Operations Report',
  '4. Prefactibilidad',
  '4. Prefactibilidad',
  380.0,
  380.0,
  'Inicio de operaciones de la planta piloto en Copiapó procesando salmuera real de Laguna Verde con recuperación superior al 95% de litio.',
  'Hito técnico que despeja el riesgo de adsorción y habilita la negociación de contratos de off-take con automotrices.',
  'Demanda de nanofiltración, resinas selectivas de litio y plantas desaladoras dedicadas para lavado de resinas.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 3. Planta Magnetita y Relaves El Algarrobo - CMP
-- ------------------------------------------------------------------------------
(
  'hist-ola3-alg-2022-descarb',
  'proj-cmp-el-algarrobo',
  '2022-11-15',
  'Lanzamiento del Plan de Reprocesamiento de Pasivos y Minería Verde CMP',
  'Reporte de Sostenibilidad Grupo CAP / CMP',
  '5. Factibilidad',
  '7. Ingeniería de detalle',
  180.0,
  250.0,
  'CMP prioriza la recuperación de mineral de hierro desde los relaves históricos de El Algarrobo para generar concentrado de pellet feed >67% Fe bajo en emisiones.',
  'Paso estratégico para descarbonizar la siderurgia y revalorizar pasivos ambientales mineros sin abrir nuevas minas.',
  'Abre licitaciones para plantas concentradoras magnéticas de tambor húmedo y filtros prensa.',
  'Alta'
),
(
  'hist-ola3-alg-2024-filtro',
  'proj-cmp-el-algarrobo',
  '2024-05-20',
  'Aprobación de diseño de relaves filtrados en seco con Wood',
  'Portal Proveedores CMP',
  '7. Ingeniería de detalle',
  '7. Ingeniería de detalle',
  250.0,
  250.0,
  'Wood y CMP concluyen el diseño definitivo del sistema de deshidratación mecánica de relaves mediante filtros de placas de gran capacidad, eliminando el uso de tranques húmedos.',
  'Establece el más alto estándar de seguridad física y química para los depósitos de la Región de Atacama.',
  'Requerimientos directos de filtros prensa de alta presión, fajas overland y apiladores móviles de relaves secos.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 4. Pampa Camarones Fase 2 (Ampliación Sulfuros) - Minera Pampa Camarones
-- ------------------------------------------------------------------------------
(
  'hist-ola3-cam-2023-rca',
  'proj-pampa-camarones-f2',
  '2023-10-12',
  'Obtención de RCA Favorable para extensión de vida útil y planta de sulfuros',
  'SEIA Arica y Parinacota (RCA N° 068/2023)',
  '8. Permisos y aprobaciones',
  '7. Ingeniería de detalle',
  120.0,
  120.0,
  'La Comisión de Evaluación Ambiental de Arica aprueba la continuidad operacional hasta 2035 y ampliación de faena para procesar mineral sulfurado a 8.500 tpd.',
  'Garantiza la continuidad del único productor de cobre formal de la XV Región y protege más de 800 empleos.',
  'Habilita la construcción de nuevas líneas de flotación y la profundización de túneles mineros.',
  'Alta'
),
(
  'hist-ola3-cam-2024-obras',
  'proj-pampa-camarones-f2',
  '2024-04-10',
  'Arranque de obras subterráneas hacia cuerpos Chacabuco y Salamanqueja',
  'Minera Pampa Camarones Comunicado',
  '7. Ingeniería de detalle',
  '11. Construcción',
  120.0,
  120.0,
  'Mas Errázuriz y contratistas locales inician la construcción de las rampas de profundización y galerías de transporte hacia los niveles de sulfuros primarios.',
  'Entrada en fase constructiva activa que requiere equipamiento de interior mina y suministros de fortificación.',
  'Demanda de jumbos electrohidráulicos, shotcrete robotizado, pernos split set y ventilación secundaria.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 5. Continuidad Operacional Mina El Soldado Fase V - Anglo American Sur
-- ------------------------------------------------------------------------------
(
  'hist-ola3-sol-2023-eia',
  'proj-el-soldado-fase-v',
  '2023-02-14',
  'Ingreso al SEIA del EIA Continuidad El Soldado Fase V por US$ 150M',
  'SEIA Valparaíso (Expediente N° 2158911983)',
  '5. Factibilidad',
  '8. Permisos y aprobaciones',
  150.0,
  150.0,
  'Anglo American presenta EIA para adecuar las fases del rajo y sectores subterráneos para asegurar suministro a la Concentradora El Torito hasta 2029+.',
  'Resguardo de la continuidad productiva de cobre en la Provincia de Quillota.',
  'Integración de tecnologías de clasificación anticipada de mineral para reducir consumo hídrico y energético.',
  'Alta'
),
(
  'hist-ola3-sol-2024-adenda',
  'proj-el-soldado-fase-v',
  '2024-08-16',
  'Ingreso de Adenda N° 1 y validación de Bulk Ore Sorting industrial',
  'SEIA Chile (Adenda N° 1 e-seia.cl)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  150.0,
  150.0,
  'Anglo American entrega respuesta consolidada sobre estabilidad del tranque El Torito y presenta datos de operación del sistema de clasificación de mineral por sensores en faja.',
  'Despeja inquietudes sectoriales y acerca la obtención de la RCA favorable para fines de 2026.',
  'Oportunidades de suministro en repuestos de chancadores, sensores de rayos X y reactivos de flotación selectiva.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 6. Proyecto Minero San Antonio - Capstone Copper
-- ------------------------------------------------------------------------------
(
  'hist-ola3-san-2023-sondajes',
  'proj-san-antonio-capstone',
  '2023-08-25',
  'Campaña de sondajes confirma 65 Mt de óxidos de cobre de alta ley',
  'Capstone Copper Technical Report',
  '4. Prefactibilidad',
  '5. Factibilidad',
  150.0,
  210.0,
  'La campaña de 15.000 metros de perforación delimita un cuerpo mineralizado de óxidos de cobre a solo 20 km de faena Mantoverde.',
  'Asegura mineral de bajo costo para mantener la planta de extracción por solventes (SX-EW) al 100% de capacidad.',
  'Se inicia el diseño conceptual de la flota de acarreo carretero entre San Antonio y Mantoverde.',
  'Alta'
),
(
  'hist-ola3-san-2024-ausenco',
  'proj-san-antonio-capstone',
  '2024-04-18',
  'Ausenco concluye estudio de factibilidad preliminar para integración operacional',
  'Capstone Copper Investor Update',
  '5. Factibilidad',
  '5. Factibilidad',
  210.0,
  210.0,
  'Ausenco finaliza la ingeniería de prefactibilidad definiendo un rajo abierto satélite con transporte de mineral en camiones batea hacia las chancadoras de Mantoverde.',
  'Bajísimo riesgo de ejecución por apoyarse íntegramente en la infraestructura ya existente en el distrito.',
  'Contratos de transporte masivo de mineral, plantas chancadoras primarias móviles y supresores de polvo.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 7. Proyecto Polimetálico Ciclón Exploradora - Eco Oro / Hampton Mining
-- ------------------------------------------------------------------------------
(
  'hist-ola3-cic-2021-rca',
  'proj-ciclon-exploradora',
  '2021-11-29',
  'Obtención de RCA Favorable N° 295/2021 para faena polimetálica subterránea',
  'SEIA Antofagasta (RCA N° 295/2021)',
  '8. Permisos y aprobaciones',
  '7. Ingeniería de detalle',
  115.0,
  115.0,
  'Resolución favorable para la construcción de una mina subterránea y planta concentradora de 2.500 tpd para producir concentrados de cobre-plata y zinc-plomo en Taltal.',
  'Certeza ambiental plena para avanzar hacia la búsqueda de financiamiento y selección de contratistas EPC.',
  'Define las condiciones ambientales para el depósito de relaves espesados y uso de agua de mar.',
  'Alta'
),
(
  'hist-ola3-cic-2023-jri',
  'proj-ciclon-exploradora',
  '2023-10-10',
  'JRI Ingeniería completa ingeniería de detalle de la concentradora selectiva',
  'JRI Ingeniería Corporativa',
  '7. Ingeniería de detalle',
  '7. Ingeniería de detalle',
  115.0,
  115.0,
  'JRI finaliza los planos y especificaciones de compra para molinos de bolas, celdas mecánicas de flotación diferencial y filtros de concentrado de zinc y cobre.',
  'El proyecto queda listo para la orden de compra y adjudicación de montaje mecánico una vez cerrado el paquete de deuda.',
  'Oportunidades de suministro en equipos de molienda modular, celdas de flotación de 20 m3 y bombas de pulpa.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 8. Planta Recuperadora y Autoclave Ecometales - Codelco / Ecometales
-- ------------------------------------------------------------------------------
(
  'hist-ola3-eco-2022-mandato',
  'proj-ecometales-autoclave',
  '2022-09-28',
  'Mandato Codelco para solución integral de polvos de fundición y arsénico',
  'Directorio Codelco / Ecometales',
  '5. Factibilidad',
  '7. Ingeniería de detalle',
  120.0,
  180.0,
  'Codelco mandata la expansión de la planta de lixiviación a presión de Ecometales en Calama para procesar los polvos metalúrgicos de Chuquicamata y Potrerillos.',
  'Proyecto de sustentabilidad vital para evitar la acumulación de polvos con alto contenido de arsénico y recuperar cobre.',
  'Aprobación de fondos para ingeniería de recipientes a presión y autoclaves de titanio.',
  'Alta'
),
(
  'hist-ola3-eco-2024-licit',
  'proj-ecometales-autoclave',
  '2024-07-11',
  'Licitación de recipientes a presión de titanio y bombas para pulpa hiperácida',
  'Portal Proveedores Codelco VP',
  '7. Ingeniería de detalle',
  '10. Contratación',
  180.0,
  180.0,
  'Ecometales publica bases de licitación para la fabricación de reactores autoclave resistentes a ácido sulfúrico concentrado y altas temperaturas.',
  'Ventana comercial inmediata para especialistas en metalurgia de titanio, aleaciones especiales y válvulas cerámicas.',
  'Adjudicación de contratos de montaje mecánico y sistemas de control distribuido de proceso.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 9. Reactivación Minera Tres Valles - Minera Tres Valles / SRK
-- ------------------------------------------------------------------------------
(
  'hist-ola3-tv-2023-rescate',
  'proj-tres-valles-continuidad',
  '2023-06-15',
  'Aprobación judicial de rescate financiero y rediseño a block caving',
  'Segundo Juzgado de Letras de La Serena / SRK',
  '5. Factibilidad',
  '7. Ingeniería de detalle',
  100.0,
  140.0,
  'Acreedores y juzgado aprueban el plan de reestructuración financiera que inyecta US$ 140M para reabrir la faena subterránea Papomono bajo el método de block caving.',
  'Salva a la compañía de la quiebra y reactiva las compras mineras en la Provincia de Choapa.',
  'SRK Consulting lidera el rediseño geomecánico y los nuevos niveles de hundimiento.',
  'Alta'
),
(
  'hist-ola3-tv-2024-arranque',
  'proj-tres-valles-continuidad',
  '2024-09-05',
  'Reactivación de planta de lixiviación en sal y preparación de nuevos frentes',
  'Minera Tres Valles Operaciones',
  '7. Ingeniería de detalle',
  '11. Construcción',
  140.0,
  140.0,
  'Reanudación de operaciones de riego en pilas con cloruro de sodio para sulfuros secundarios y avance de galerías de tiraje en interior mina.',
  'Reinicio de compras recurrentes de insumos químicos, reactivos y repuestos para maquinaria pesada.',
  'Oportunidades en sostenimiento subterráneo, tuberías para riego salino y mantenimiento de celdas SX-EW.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 10. Proyecto Explotación Subterránea Mina Venus - Marta (VEM) - COMIN S.A.
-- ------------------------------------------------------------------------------
(
  'hist-ola3-vm-2023-termino',
  'proj-venus-marta',
  '2023-07-20',
  'Término anticipado de primer trámite DIA por falta de antecedentes técnicos',
  'SEIA Atacama (Resolución Exenta N° 202303001150)',
  '8. Permisos y aprobaciones',
  '5. Factibilidad',
  40.0,
  50.0,
  'La Dirección Regional del SEA da término anticipado a la DIA ingresada originalmente por Minera de Cobre SpA para solicitar mayor detalle en hidrogeología y plan de laboreo minero.',
  'Obligó a una reingeniería completa del proyecto y cambio de estructura de gobernanza y propiedad hacia COMIN S.A.',
  'Reestructuración de consultorías geotécnicas y levantamiento de línea de base complementaria.',
  'Alta'
),
(
  'hist-ola3-vm-2024-reingreso',
  'proj-venus-marta',
  '2024-11-04',
  'Reingreso formal de nueva DIA por COMIN S.A. para 45.000 t/mes',
  'SEIA Chile (Expediente N° 2158914022)',
  '5. Factibilidad',
  '8. Permisos y aprobaciones',
  40.0,
  50.0,
  'COMIN S.A. ingresa nueva Declaración de Impacto Ambiental subsanando todas las observaciones técnicas para explotar mineral sulfurado subterráneo por US$ 50M.',
  'Reinicio formal del reloj ambiental con respaldo de una compañía de ingeniería y servicios consolidada en el norte de Chile.',
  'Licitaciones inmediatas de chimeneas de ventilación Raise Boring, perforación subterránea y transporte carretero de mineral.',
  'Alta'
);
