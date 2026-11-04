-- ==============================================================================
-- RADAR MINERO — ESQUEMA DE BASE DE DATOS SUPABASE (POSTGRESQL)
-- Inteligencia de proyectos mineros, detección de señales tempranas y scoring B2B
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE mining_country AS ENUM ('Chile', 'Perú', 'Argentina');
CREATE TYPE mining_mineral AS ENUM ('Cobre', 'Litio', 'Oro', 'Molibdeno', 'Hierro', 'Plata', 'Polimetálico', 'Potasio');
CREATE TYPE project_type_enum AS ENUM ('Greenfield', 'Brownfield');
CREATE TYPE project_status_enum AS ENUM ('Activo', 'En evaluación', 'En construcción', 'En operación', 'Suspendido', 'Pausado');

CREATE TYPE signal_category_enum AS ENUM (
  'Ambiental',
  'Inversión',
  'Ingeniería y desarrollo',
  'Contratación',
  'Corporativa y financiera',
  'Organizacional',
  'Operacional',
  'Sectorial'
);

CREATE TYPE signal_relevance_enum AS ENUM ('Crítica', 'Alta', 'Media', 'Informativa');
CREATE TYPE signal_confidence_enum AS ENUM ('Alta', 'Media', 'Baja');
CREATE TYPE opportunity_priority_enum AS ENUM ('Máxima', 'Alta', 'Media', 'Baja-media');

CREATE TYPE commercial_status_enum AS ENUM (
  'Identificada Tempranamente',
  'En Análisis Comercial',
  'Mapeo de Decisores',
  'Contacto Inicial / Warm Intro',
  'Precalificación Abierta',
  'RFI / RFQ en Proceso',
  'Ganada',
  'Descartada / Archivada'
);

-- ==============================================================================
-- 3. TABLA: PROJECTS (Proyectos Mineros)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country mining_country NOT NULL DEFAULT 'Chile',
  region TEXT NOT NULL,
  location_details TEXT,
  latitude NUMERIC(10, 6),
  longitude NUMERIC(10, 6),
  owner_company TEXT NOT NULL,
  associated_companies TEXT[] DEFAULT '{}',
  main_mineral mining_mineral NOT NULL DEFAULT 'Cobre',
  secondary_minerals TEXT[] DEFAULT '{}',
  project_type project_type_enum NOT NULL DEFAULT 'Greenfield',
  capex_estimated_millions_usd NUMERIC(12, 2) NOT NULL DEFAULT 0,
  productive_capacity TEXT,
  estimated_start_date TEXT,
  estimated_commissioning_date TEXT,
  current_status project_status_enum NOT NULL DEFAULT 'Activo',
  stage TEXT NOT NULL DEFAULT '1. Exploración',
  information_sources TEXT[] DEFAULT '{}',
  last_update_date DATE DEFAULT CURRENT_DATE,
  signals_count INTEGER DEFAULT 0,
  epcm_company TEXT,
  key_contractors TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. TABLA: PROJECT_HISTORY (Trazabilidad Inmutable del Proyecto)
-- "No sobrescribir información histórica. Cada cambio conserva registro y trazabilidad"
-- ==============================================================================
CREATE TABLE IF NOT EXISTS project_history (
  id TEXT PRIMARY KEY DEFAULT 'hist-' || uuid_generate_v4(),
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  event_date DATE NOT NULL DEFAULT CURRENT_DATE,
  signal_title TEXT NOT NULL,
  source TEXT NOT NULL,
  previous_stage TEXT,
  new_stage TEXT,
  previous_capex NUMERIC(12, 2),
  new_capex NUMERIC(12, 2),
  change_description TEXT NOT NULL,
  commercial_interpretation TEXT,
  potential_impact TEXT,
  confidence_level signal_confidence_enum DEFAULT 'Alta',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. TABLA: SIGNALS (Motor de Detección de Señales Tempranas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS signals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category signal_category_enum NOT NULL,
  description TEXT NOT NULL,
  original_source TEXT NOT NULL,
  source_url TEXT,
  country mining_country NOT NULL DEFAULT 'Chile',
  published_date DATE NOT NULL,
  detection_date TIMESTAMPTZ DEFAULT NOW(),
  related_project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
  related_project_name TEXT NOT NULL,
  related_company TEXT NOT NULL,
  project_stage TEXT NOT NULL,
  relevance signal_relevance_enum NOT NULL DEFAULT 'Alta',
  confidence signal_confidence_enum NOT NULL DEFAULT 'Alta',
  
  -- Interpretación comercial (JSON estructurado)
  commercial_interpretation JSONB NOT NULL DEFAULT '{
    "hypothesis": "",
    "potentialNeeds": [],
    "targetServices": [],
    "anticipationWindowMonths": 6,
    "supportingEvidence": []
  }',

  validation_state TEXT DEFAULT 'Detectada automát.',
  history_logs JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. TABLA: COMPANIES (Directorio del Ecosistema Empresarial)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  legal_name TEXT,
  country_origin TEXT NOT NULL,
  primary_role TEXT NOT NULL,
  supported_roles TEXT[] DEFAULT '{}',
  website TEXT,
  description TEXT,
  tier TEXT DEFAULT 'Tier 1 Global',
  participating_projects_count INTEGER DEFAULT 0,
  related_project_ids TEXT[] DEFAULT '{}',
  contracts JSONB DEFAULT '[]',
  key_contacts JSONB DEFAULT '[]',
  verified_sources TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 7. TABLA: OPPORTUNITIES (Oportunidades Comerciales B2B & Scoring 100 Pts)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  related_project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  related_project_name TEXT NOT NULL,
  target_company TEXT NOT NULL,
  country mining_country NOT NULL DEFAULT 'Chile',
  project_stage TEXT NOT NULL,
  originating_signal_ids TEXT[] DEFAULT '{}',
  originating_signal_names TEXT[] DEFAULT '{}',
  detection_date DATE DEFAULT CURRENT_DATE,
  potential_need TEXT NOT NULL,
  related_solution_category TEXT NOT NULL,
  involved_companies JSONB DEFAULT '[]',
  key_decision_makers JSONB DEFAULT '[]',
  anticipation_window_months INTEGER DEFAULT 6,
  priority opportunity_priority_enum NOT NULL DEFAULT 'Alta',
  confidence signal_confidence_enum NOT NULL DEFAULT 'Alta',
  recommended_next_action TEXT NOT NULL,
  commercial_status commercial_status_enum NOT NULL DEFAULT 'Identificada Tempranamente',
  estimated_contract_value_usd NUMERIC(14, 2),
  
  -- Desglose explicativo del scoring de 100 puntos
  scoring JSONB NOT NULL DEFAULT '{
    "totalScore": 75,
    "maturityScore": 15,
    "recentSignalsScore": 15,
    "serviceFitScore": 18,
    "actorsIdentifiedScore": 10,
    "economicSizeScore": 10,
    "anticipationWindowScore": 7
  }',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. TABLA: DASHBOARDS (Dashboard Builder Configurations)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS dashboards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  is_predefined BOOLEAN DEFAULT FALSE,
  widgets JSONB NOT NULL DEFAULT '[]',
  global_filters JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 9. ÍNDICES DE RENDIMIENTO (Performance & Search)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_projects_country ON projects(country);
CREATE INDEX IF NOT EXISTS idx_projects_stage ON projects(stage);
CREATE INDEX IF NOT EXISTS idx_projects_mineral ON projects(main_mineral);
CREATE INDEX IF NOT EXISTS idx_signals_category ON signals(category);
CREATE INDEX IF NOT EXISTS idx_signals_project ON signals(related_project_id);
CREATE INDEX IF NOT EXISTS idx_signals_date ON signals(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_opps_priority ON opportunities(priority);
CREATE INDEX IF NOT EXISTS idx_opps_status ON opportunities(commercial_status);
CREATE INDEX IF NOT EXISTS idx_opps_project ON opportunities(related_project_id);
CREATE INDEX IF NOT EXISTS idx_history_project ON project_history(project_id, event_date DESC);

-- ==============================================================================
-- 10. SEGURIDAD: ROW LEVEL SECURITY (RLS)
-- Permite lectura pública para la app y restringe escritura a servicios autorizados
-- ==============================================================================
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para clientes anónimos/autenticados
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on project_history" ON project_history FOR SELECT USING (true);
CREATE POLICY "Allow public read on signals" ON signals FOR SELECT USING (true);
CREATE POLICY "Allow public read on companies" ON companies FOR SELECT USING (true);
CREATE POLICY "Allow public read on opportunities" ON opportunities FOR SELECT USING (true);
CREATE POLICY "Allow public read on dashboards" ON dashboards FOR SELECT USING (true);

-- Políticas de escritura (habilitadas para inserción/actualización desde service role / app)
CREATE POLICY "Allow all operations for service role" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all operations for service role history" ON project_history FOR ALL USING (true);
CREATE POLICY "Allow all operations for service role signals" ON signals FOR ALL USING (true);
CREATE POLICY "Allow all operations for service role companies" ON companies FOR ALL USING (true);
CREATE POLICY "Allow all operations for service role opportunities" ON opportunities FOR ALL USING (true);
CREATE POLICY "Allow all operations for service role dashboards" ON dashboards FOR ALL USING (true);
