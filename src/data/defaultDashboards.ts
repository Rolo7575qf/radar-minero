import { DashboardConfig } from '../types/dashboard';

export const defaultDashboards: DashboardConfig[] = [
  {
    id: 'dash-main-executive',
    name: 'Radar Ejecutivo Minero — LatAm & Chile',
    description: 'Tablero consolidado de proyectos, detección de señales en 7/30/90 días y oportunidades comerciales de alta prioridad.',
    isDefault: true,
    isPredefined: true,
    createdAt: '2026-10-01T00:00:00Z',
    updatedAt: '2026-11-03T18:00:00Z',
    widgets: [
      {
        id: 'w-kpi-1',
        title: 'Proyectos Monitoreados',
        type: 'kpi_metric',
        dimension: 'country',
        metric: 'project_count',
        width: 'third',
        height: 'sm',
        colorScheme: 'amber',
        customDescription: 'Total de proyectos en cartera activa (Chile, Perú, Argentina)'
      },
      {
        id: 'w-kpi-2',
        title: 'Señales detectadas (30 días)',
        type: 'kpi_metric',
        dimension: 'signal_category',
        metric: 'signal_count',
        width: 'third',
        height: 'sm',
        colorScheme: 'cyan',
        customDescription: 'Eventos ambientales, de inversión y de contratación publicados en los últimos 30 días'
      },
      {
        id: 'w-kpi-3',
        title: 'Oportunidades prioritarias',
        type: 'kpi_metric',
        dimension: 'opportunity_priority',
        metric: 'opportunity_count',
        width: 'third',
        height: 'sm',
        colorScheme: 'emerald',
        customDescription: 'Prioridad Alta o Máxima (puntaje de 68 o más sobre 100)'
      },
      {
        id: 'w-stage-funnel',
        title: 'Distribución de Proyectos por Etapa de Desarrollo',
        type: 'stage_funnel',
        dimension: 'stage',
        metric: 'project_count',
        width: 'two-thirds',
        height: 'md',
        colorScheme: 'amber',
        customDescription: 'Flujo de maduración desde Exploración hasta Operación y Expansión'
      },
      {
        id: 'w-mineral-pie',
        title: 'Distribución por Mineral Principal',
        type: 'pie_chart',
        dimension: 'mineral',
        metric: 'project_count',
        width: 'third',
        height: 'md',
        colorScheme: 'rose',
        customDescription: 'Concentración de cartera en Cobre, Litio, Oro y Polimetálicos'
      },
      {
        id: 'w-recent-signals',
        title: 'Feed de Señales Tempranas en Tiempo Real',
        type: 'signal_feed',
        dimension: 'signal_category',
        width: 'half',
        height: 'lg',
        colorScheme: 'cyan',
        customDescription: 'Últimas señales extraídas de SEA, CMF, Cochilco y SEDAR+'
      },
      {
        id: 'w-opps-priority',
        title: 'Oportunidades Comerciales por Nivel de Prioridad',
        type: 'opportunity_priority_chart',
        dimension: 'opportunity_priority',
        metric: 'opportunity_count',
        width: 'half',
        height: 'lg',
        colorScheme: 'emerald',
        customDescription: 'Clasificación de atractivo comercial según algoritmo de 100 puntos'
      },
      {
        id: 'w-capex-table',
        title: 'Cartera de Proyectos con Mayor CAPEX y Actividad',
        type: 'recent_capex_table',
        width: 'full',
        height: 'md',
        colorScheme: 'indigo',
        customDescription: 'Proyectos clave ordenados por volumen de inversión estimada (M USD)'
      }
    ]
  },
  {
    id: 'dash-epcm-commercial',
    name: 'Ecosistema EPCM & Contratistas',
    description: 'Enfoque comercial para contratistas, proveedores de equipamiento e ingenierías buscando inserción temprana.',
    isDefault: false,
    isPredefined: true,
    createdAt: '2026-10-15T00:00:00Z',
    updatedAt: '2026-11-03T15:30:00Z',
    widgets: [
      {
        id: 'w-epcm-1',
        title: 'Empresas EPCM y Consultoras Activas',
        type: 'epcm_distribution',
        width: 'half',
        height: 'md',
        colorScheme: 'amber',
        customDescription: 'Fluor, Ausenco, Bechtel, Wood, Hatch liderando estudios y obras'
      },
      {
        id: 'w-epcm-opps',
        title: 'Oportunidades Comerciales B2B',
        type: 'opportunity_priority_chart',
        width: 'half',
        height: 'md',
        colorScheme: 'emerald',
        customDescription: 'Subcontratos y venta de tecnología con ventana comercial activa'
      },
      {
        id: 'w-epcm-signals',
        title: 'Señales de Contratación y Nombramientos de Decisores',
        type: 'signal_feed',
        width: 'full',
        height: 'lg',
        colorScheme: 'cyan',
        customDescription: 'Cambios en equipos directivos, RFI/RFQ y precalificaciones abiertas'
      }
    ]
  }
];
