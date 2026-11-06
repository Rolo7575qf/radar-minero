-- ==============================================================================
-- HISTORIAL PÚBLICO OFICIAL (2021 - 2026) - OLA 2 COCHILCO (10 PROYECTOS ESTRATÉGICOS)
-- Reconstrucción de huellas verificadas: SEIA, CMF Hechos Esenciales, COCHILCO e Informes Corporativos
-- Principio: INSERT OR IGNORE INTO project_history
-- ==============================================================================

INSERT OR IGNORE INTO project_history (
  id, project_id, event_date, signal_title, source,
  previous_stage, new_stage, previous_capex, new_capex,
  change_description, commercial_interpretation, potential_impact, confidence_level
) VALUES 

-- ------------------------------------------------------------------------------
-- 1. Modernización Fundición Hernán Videla Lira (Nueva Paipote) - ENAMI
-- ------------------------------------------------------------------------------
(
  'hist-ola2-pai-2022-eia',
  'proj-paipote-modernizacion',
  '2022-05-18',
  'Ingreso al SEIA del EIA Nueva Fundición Paipote por US$ 1.100M',
  'SEIA Chile (Expediente N° 2158913340)',
  '5. Factibilidad',
  '8. Permisos y aprobaciones',
  1100.0,
  1100.0,
  'ENAMI ingresa Estudio de Impacto Ambiental para reemplazar la centenaria fundición por una moderna planta con tecnología de fusión y conversión de baño cerrado (Bottom Blown Bath Smelting) y captura >99% de azufre.',
  'Proyecto país crítico para la pequeña y mediana minería, sujeto a estricto escrutinio ambiental y político en Copiapó.',
  'Abre la búsqueda de socios tecnológicos internacionales (China ENFI / Outotec) y compras de sistemas de abatimiento de gases.',
  'Alta'
),
(
  'hist-ola2-pai-2024-cierre',
  'proj-paipote-modernizacion',
  '2024-02-23',
  'Cierre definitivo y planificado de la antigua fundición Paipote',
  'Directorio ENAMI / CMF',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  1100.0,
  1400.0,
  'ENAMI suspende de manera permanente las operaciones del antiguo complejo metalúrgico para frenar pérdidas operacionales de US$ 4M mensuales y habilitar el terreno para la nueva fundición.',
  'Hito operativo irreversible: obliga a acelerar el financiamiento y aprobación ambiental del nuevo proyecto.',
  'Despliegue de contratos de desmantelamiento, remediación de pasivos y adecuación de plantas de muestreo de minerales.',
  'Alta'
),
(
  'hist-ola2-pai-2024-adenda',
  'proj-paipote-modernizacion',
  '2024-10-15',
  'Ingreso de Adenda N° 1 y recalibración de CAPEX a US$ 1.400M',
  'SEIA Atacama (Adenda N° 1 e-seia.cl)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  1100.0,
  1400.0,
  'ENAMI entrega la Adenda N° 1 subsanando observaciones de emisiones difusas, disposición de escorias y consumo de agua, actualizando el presupuesto total de inversión a US$ 1.400M.',
  'El proyecto entra en la recta final de evaluación ambiental previa a la votación de la Comisión Regional de Evaluación.',
  'Oportunidades de suministro en plantas de ácido sulfúrico doble contacto, plantas de oxígeno y manejo de relaves de escoria.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 2. Planta Desalinizadora Distrito Norte Codelco - Codelco / Aguas Horizonte
-- ------------------------------------------------------------------------------
(
  'hist-ola2-des-2021-boot',
  'proj-desaladora-distrito-norte',
  '2021-11-25',
  'Adjudicación de contrato BOOT a Consorcio Aguas Horizonte',
  'CMF Hecho Esencial Codelco',
  '10. Contratación',
  '10. Contratación',
  1000.0,
  1000.0,
  'Codelco adjudica al consorcio integrado por Marubeni (50%) y Transelec (50%) el contrato BOOT (Construcción, Operación y Traspaso) por 20 años para suministrar 1.956 l/s de agua desalada.',
  'Codelco terceriza el CAPEX inicial reduciendo su endeudamiento directo y asegurando abastecimiento a 3 divisiones.',
  'El consorcio asume la contratación de la ingeniería de detalle y los contratos EPC mayores de tuberías y bombas.',
  'Alta'
),
(
  'hist-ola2-des-2022-epc',
  'proj-desaladora-distrito-norte',
  '2022-02-15',
  'Selección de Techint Chile como contratista principal EPC del acueducto',
  'Portal Compras Aguas Horizonte',
  '10. Contratación',
  '11. Construcción',
  1000.0,
  1000.0,
  'Aguas Horizonte suscribe contrato EPC con Techint para la construcción del acueducto de impulsión de acero de 160 km desde Tocopilla hasta el reservorio cordillera a 3.000 msnm.',
  'Techint se convierte en el decisor central de compras para válvulas, piping, obras civiles de cruces y tendido de tubería.',
  'Movilización de subcontratistas pesados de movimiento de tierras, zanjado en roca y soldadura industrial de tuberías.',
  'Alta'
),
(
  'hist-ola2-des-2024-avance',
  'proj-desaladora-distrito-norte',
  '2024-06-30',
  'Alcanzado el 60% de avance físico en obras marinas y tendido de tuberías',
  'Codelco VP / Reporte Aguas Horizonte',
  '11. Construcción',
  '11. Construcción',
  1000.0,
  1000.0,
  'El consorcio alcanza más del 60% de avance global, con la llegada de los módulos de osmosis inversa y la finalización de los primeros 100 km de trazado de cañería.',
  'Fase avanzada que transiciona de obras civiles pesadas a montaje electromecánico, instrumentación y control distribuido.',
  'Demanda caliente de sistemas SCADA, transmisores de presión, estaciones de bombeo de alta presión y pruebas hidrostáticas.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 3. Mantoverde Optimización y Sulfuros Fase 2 - Capstone Copper
-- ------------------------------------------------------------------------------
(
  'hist-ola2-mv-2021-f1fid',
  'proj-mantoverde-sulfuros-f2',
  '2021-01-20',
  'Cierre financiero sindicado por US$ 572M para Mantoverde Fase 1',
  'Capstone Copper Press Release',
  '6. Aprobación del directorio',
  '11. Construcción',
  572.0,
  870.0,
  'Mantos Copper completa el paquete de deuda sindicada con bancos internacionales para construir la primera concentradora de sulfuros con Ausenco como EPC.',
  'Inicia la transformación de Mantoverde de faena de óxidos en declive a gran productor de sulfuros de cobre.',
  'Validación del modelo de negocio que sienta las bases para la posterior expansión de Fase 2.',
  'Alta'
),
(
  'hist-ola2-mv-2024-comercial',
  'proj-mantoverde-sulfuros-f2',
  '2024-06-25',
  'Primera producción comercial de sulfuros y lanzamiento de ingeniería Fase 2',
  'Capstone Copper Q2 Earnings',
  '11. Construcción',
  '7. Ingeniería de detalle',
  870.0,
  800.0,
  'Mantoverde alcanza el régimen comercial en su nueva concentradora de sulfuros y Capstone Copper lanza formalmente la ingeniería de detalle de la Fase 2 para elevar la molienda a 45.000 tpd.',
  'Proyecto de bajísimo costo de capital (brownfield) con excelente retorno por utilizar la infraestructura existente de puerto y desaladora.',
  'Requerimientos directos de celdas de flotación adicionales, remolienda, espesadores y equipos de filtrado de concentrado.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 4. Asociación Codelco-SQM Salar de Atacama - Codelco / SQM
-- ------------------------------------------------------------------------------
(
  'hist-ola2-sqm-2023-mou',
  'proj-sqm-codelco-atacama',
  '2023-12-27',
  'Firma de Memorándum de Entendimiento (MoU) para alianza público-privada',
  'CMF Hecho Esencial Conjunto Codelco-SQM',
  '1. Identificación',
  '4. Prefactibilidad',
  1000.0,
  1500.0,
  'Codelco y SQM anuncian los términos base para crear una sociedad mixta (50% + 1 acción Codelco) que asumirá la operación del Salar de Atacama desde 2025 hasta 2060.',
  'Acuerdo histórico que destraba la continuidad del mayor activo de litio del mundo y garantiza ingresos fiscales masivos.',
  'Compromiso de incorporar tecnologías de Extracción Directa de Litio (EDL) para reemplazar pozas de evaporación solar.',
  'Alta'
),
(
  'hist-ola2-sqm-2024-acuerdo',
  'proj-sqm-codelco-atacama',
  '2024-05-31',
  'Firma del Acuerdo de Asociación vinculante y compromiso de US$ 1.500M de inversión',
  'CMF Hecho Esencial / Presidencia de la República',
  '4. Prefactibilidad',
  '5. Factibilidad',
  1500.0,
  1500.0,
  'Las partes protocolizan el Acuerdo de Asociación vinculante, condicionando la entrada en vigencia a autorizaciones antimonopolio y consultas con comunidades del Consejo de Pueblos Atacameños.',
  'Definición de inversiones obligatorias para reducir la extracción de salmuera en 50% hacia 2030 mediante tecnología de reinyección.',
  'Oportunidades de suministro en tecnologías DLE, plantas desalinizadoras dedicadas, resinas de adsorción y sistemas de reinyección hidrogeológica.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 5. Candelaria Optimización Operacional y Continuidad - Lundin Mining
-- ------------------------------------------------------------------------------
(
  'hist-ola2-can-2023-eia',
  'proj-candelaria-continuidad',
  '2023-08-04',
  'Ingreso al SEIA del EIA de Continuidad Operacional Candelaria hasta 2040',
  'SEIA Chile (Expediente N° 2155798901)',
  '5. Factibilidad',
  '8. Permisos y aprobaciones',
  450.0,
  450.0,
  'Lundin Mining ingresa Estudio de Impacto Ambiental por US$ 450M para prolongar la operación del rajo abierto y minas subterráneas Candelaria Norte y Santos hasta 2040.',
  'Asegura la estabilidad laboral y de compras del complejo minero más importante de la provincia de Copiapó.',
  'Incluye obras civiles de ampliación en el depósito de relaves Los Diques y reconfiguración de botaderos.',
  'Alta'
),
(
  'hist-ola2-can-2024-adenda',
  'proj-candelaria-continuidad',
  '2024-11-08',
  'Ingreso de Adenda N° 1 con foco en estabilidad de tranque Los Diques y mitigación de polvo',
  'SEIA Atacama (Adenda N° 1 e-seia.cl)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  450.0,
  450.0,
  'Candelaria entrega respuesta formal a observaciones del Sernageomin y DGA, certificando factores de seguridad sísmica de Los Diques y plan de supresores de polvo en Tierra Amarilla.',
  'Despeja inquietudes comunitarias y sectoriales, acercando la obtención de la RCA favorable para 2026.',
  'Apertura de licitaciones de instrumentación geotécnica satelital, piezómetros automatizados y obras de recrecimiento de muros.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 6. Proyecto Costa Fuego (Cortadera y Productora) - Hot Chili
-- ------------------------------------------------------------------------------
(
  'hist-ola2-cf-2023-pea',
  'proj-costa-fuego-hotchili',
  '2023-06-28',
  'Publicación del Preliminary Economic Assessment (PEA) por Wood',
  'ASX / TSX Hot Chili Disclosure',
  '4. Prefactibilidad',
  '5. Factibilidad',
  850.0,
  1050.0,
  'Hot Chili publica el PEA completado por Wood, proyectando una concentradora central de 20 Mtpa para producir 112.000 t Cu-eq anuales con un CAPEX inicial de US$ 1.050M.',
  'El proyecto destaca por su baja altitud (<1.000 msnm) y cercanía a infraestructura costera en la Región de Atacama.',
  'Establece el diseño de diagrama de flujo para molienda SAG y flotación convencional de sulfuros.',
  'Alta'
),
(
  'hist-ola2-cf-2024-pfs',
  'proj-costa-fuego-hotchili',
  '2024-07-15',
  'Avance de Factibilidad (PFS) y levantamiento de línea de base ambiental',
  'Hot Chili Corporate Update',
  '5. Factibilidad',
  '5. Factibilidad',
  1050.0,
  1050.0,
  'Hot Chili avanza la ingeniería con Wood e inicia el levantamiento de flora, fauna y arqueología para la redacción del Estudio de Impacto Ambiental.',
  'Fase de estudios preparatoria para el ingreso formal al SEIA durante 2026.',
  'Demanda de consultorías de permisos, estudios de impulsión de agua de mar y prospección hidrogeológica.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 7. Spence Lixiviación Secundaria - BHP
-- ------------------------------------------------------------------------------
(
  'hist-ola2-spence-2023-aprob',
  'proj-spence-lixiviacion-sec',
  '2023-10-18',
  'Aprobación interna en BHP para avanzar a ingeniería de detalle',
  'BHP Operational Review',
  '5. Factibilidad',
  '7. Ingeniería de detalle',
  250.0,
  350.0,
  'BHP aprueba los fondos de capital para desarrollar la ingeniería de detalle de la tecnología de biolixiviación catalítica en pilas para procesar calcopirita en faena Spence.',
  'Permite extender la vida útil de la planta de cátodos SX-EW sin requerir una nueva concentradora.',
  'Hatch lidera la ingeniería de diseño de sistemas de riego ácido y aireación profunda.',
  'Alta'
),
(
  'hist-ola2-spence-2024-procura',
  'proj-spence-lixiviacion-sec',
  '2024-08-20',
  'Licitación de paquetes de procura de piping resistente a ácidos y bio-reactores',
  'Portal Proveedores BHP Chile',
  '7. Ingeniería de detalle',
  '10. Contratación',
  350.0,
  350.0,
  'BHP y Hatch publican requerimientos para el suministro de tuberías HDPE especializadas, sopladores de aire industrial de alta presión y sensores de monitoreo de bacterias lixiviantes.',
  'Ventana comercial inmediata para proveedores de materiales termoplásticos y biotecnología minera.',
  'Contratos de montaje e interconexión mecánica previstos para adjudicación en el segundo semestre.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 8. Proyecto Minero Arqueros - Nittetsu Mining
-- ------------------------------------------------------------------------------
(
  'hist-ola2-arq-2021-eia',
  'proj-arqueros-nittetsu',
  '2021-11-10',
  'Ingreso al SEIA del EIA Proyecto Minero Arqueros por US$ 300M',
  'SEIA Coquimbo (Expediente N° 2142415520)',
  '5. Factibilidad',
  '8. Permisos y aprobaciones',
  300.0,
  300.0,
  'Nittetsu Mining ingresa Estudio de Impacto Ambiental para desarrollar una mina subterránea de 5.000 tpd mediante caserones por cuartos y pilares (room & pillar) en Vicuña.',
  'Proyecto greenfield emblemático para la mediana-gran minería en el Valle de Elqui.',
  'Licitaciones tempranas de prospección geotécnica y diseño de tranque de relaves espesados.',
  'Alta'
),
(
  'hist-ola2-arq-2024-adenda',
  'proj-arqueros-nittetsu',
  '2024-06-12',
  'Ingreso de Adenda Final subsanando observaciones hídricas de Quebrada Marquesa',
  'SEIA Chile (Adenda Final e-seia.cl)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  300.0,
  300.0,
  'Nittetsu entrega la Adenda consolidada respondiendo a requerimientos de la DGA sobre protección de napas freáticas y control de polvo en rutas de transporte.',
  'Último paso administrativo antes de la votación ambiental en la Comisión Regional.',
  'Oportunidades de preparación de licitaciones de desarrollo de túneles y compra de jumbos de perforación electrohidráulicos.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 9. Puerto Cruz Grande y Planta Magnetita - Compañía Minera del Pacífico (CMP)
-- ------------------------------------------------------------------------------
(
  'hist-ola2-cg-2021-tribunal',
  'proj-cruz-grande-cmp',
  '2021-08-27',
  'Tribunal Ambiental ratifica plena vigencia de la RCA Favorable del puerto',
  'Primer Tribunal Ambiental de Antofagasta',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  400.0,
  500.0,
  'El Tribunal rechaza recursos de reclamación de organizaciones opositoras y confirma la validez de la RCA N° 010/2015 para el puerto granelero de CMP en La Higuera.',
  'Respaldo jurídico contundente que protege la inversión portuaria estratégica del Grupo CAP.',
  'Permite a CMP planificar la salida al mar de futuros concentrados de hierro premium.',
  'Alta'
),
(
  'hist-ola2-cg-2024-reactivacion',
  'proj-cruz-grande-cmp',
  '2024-04-18',
  'Reactivación de ingenierías y diseño de terminal verde multipropósito',
  'Reporte de Sostenibilidad Grupo CAP / CMP',
  '8. Permisos y aprobaciones',
  '7. Ingeniería de detalle',
  500.0,
  500.0,
  'CMP actualiza la ingeniería del terminal portuario para convertirlo en un puerto verde mecanizado de 13.5 Mtpa de alta eficiencia para pellet feed magnetita.',
  'Inicio de licitaciones de prospección geotécnica marina y diseño de cargadores de barcos (shiploaders) con tecnología antipolvo.',
  'Contratos de dragado, enrocados, obras marítimas y montaje de cintas transportadoras encapsuladas.',
  'Alta'
),

-- ------------------------------------------------------------------------------
-- 10. Continuidad Operacional Minera Carmen de Andacollo - Teck Resources
-- ------------------------------------------------------------------------------
(
  'hist-ola2-and-2022-eia',
  'proj-andacollo-continuidad',
  '2022-12-14',
  'Ingreso al SEIA del proyecto de Continuidad Operacional Carmen de Andacollo 2035',
  'SEIA Coquimbo (Expediente N° 2155799120)',
  '5. Factibilidad',
  '8. Permisos y aprobaciones',
  350.0,
  350.0,
  'Teck ingresa EIA por US$ 350M para adecuar botaderos, optimizar el tranque de relaves y extender la explotación del rajo Carmen hasta 2035.',
  'Garantiza la continuidad productiva de 50.000 t de cobre fino anuales y fuentes laborales locales.',
  'Incluye programas exigentes de control de emisiones bajo el Plan de Descontaminación Atmosférica (PDA) de la comuna.',
  'Alta'
),
(
  'hist-ola2-and-2024-adenda',
  'proj-andacollo-continuidad',
  '2024-07-22',
  'Presentación de Adenda N° 1 con compromisos de supresión de polvo y energía solar',
  'SEIA Chile (Adenda N° 1 e-seia.cl)',
  '8. Permisos y aprobaciones',
  '8. Permisos y aprobaciones',
  350.0,
  350.0,
  'Teck entrega la Adenda N° 1 incorporando pavimentación de rutas mineras, sistemas de monitoreo continuo de calidad del aire y transición hacia flotas auxiliares eléctricas.',
  'Supera el principal escollo ambiental con las autoridades sectoriales y avanza hacia la RCA favorable proyectada para 2026.',
  'Demanda de servicios de pavimentación con polímeros, estaciones meteorológicas automatizadas y equipos de captación de polvo en tolvas.',
  'Alta'
);
