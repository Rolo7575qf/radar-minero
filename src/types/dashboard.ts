// Panel de Control — Dashboard Dinámico y Personalizable (Dashboard Builder)

export type WidgetType =
  | 'kpi_metric'
  | 'bar_chart'
  | 'pie_chart'
  | 'stage_funnel'
  | 'signal_feed'
  | 'recent_capex_table'
  | 'epcm_distribution'
  | 'opportunity_priority_chart'
  | 'geo_distribution';

export type DimensionType =
  | 'country'
  | 'stage'
  | 'mineral'
  | 'signal_category'
  | 'opportunity_priority'
  | 'epcm_company'
  | 'project_type';

export type MetricType =
  | 'project_count'
  | 'total_capex'
  | 'signal_count'
  | 'opportunity_count'
  | 'avg_score';

export interface WidgetFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greaterThan' | 'in';
  value: string | number | string[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: WidgetType;
  dimension?: DimensionType;
  metric?: MetricType;
  width: 'third' | 'half' | 'two-thirds' | 'full'; // Tamaño en columnas
  height?: 'sm' | 'md' | 'lg';
  filters?: WidgetFilter[];
  colorScheme?: 'amber' | 'cyan' | 'emerald' | 'indigo' | 'rose';
  customDescription?: string;
}

export interface DashboardConfig {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
  isPredefined?: boolean;
  createdAt: string;
  updatedAt: string;
  widgets: DashboardWidget[];
  globalFilters?: {
    country?: string;
    mineral?: string;
    stageCategory?: string;
  };
}
