-- ==============================================================================
-- RADAR MINERO — ESQUEMA PARA CLOUDFLARE D1 (SQLITE SERVERLESS)
-- Base de datos distribuida en el Edge de Cloudflare
-- ==============================================================================

-- 1. TABLA: PROJECTS (Proyectos Mineros)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Chile',
  region TEXT NOT NULL,
  location_details TEXT,
  latitude REAL,
  longitude REAL,
  owner_company TEXT NOT NULL,
  associated_companies TEXT DEFAULT '[]', -- JSON array
  main_mineral TEXT NOT NULL DEFAULT 'Cobre',
  secondary_minerals TEXT DEFAULT '[]', -- JSON array
  project_type TEXT NOT NULL DEFAULT 'Greenfield',
  capex_estimated_millions_usd REAL NOT NULL DEFAULT 0,
  productive_capacity TEXT,
  estimated_start_date TEXT,
  estimated_commissioning_date TEXT,
  current_status TEXT NOT NULL DEFAULT 'Activo',
  stage TEXT NOT NULL DEFAULT '1. Exploración',
  information_sources TEXT DEFAULT '[]', -- JSON array
  last_update_date TEXT,
  signals_count INTEGER DEFAULT 0,
  epcm_company TEXT,
  key_contractors TEXT DEFAULT '[]', -- JSON array
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA: PROJECT_HISTORY (Trazabilidad Inmutable del Proyecto)
-- "No sobrescribir información histórica. Cada cambio conserva su registro y trazabilidad"
CREATE TABLE IF NOT EXISTS project_history (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  event_date TEXT NOT NULL,
  signal_title TEXT NOT NULL,
  source TEXT NOT NULL,
  previous_stage TEXT,
  new_stage TEXT,
  previous_capex REAL,
  new_capex REAL,
  change_description TEXT NOT NULL,
  commercial_interpretation TEXT,
  potential_impact TEXT,
  confidence_level TEXT DEFAULT 'Alta',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLA: SIGNALS (Motor de Detección de Señales Tempranas A-H)
CREATE TABLE IF NOT EXISTS signals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  original_source TEXT NOT NULL,
  source_url TEXT,
  country TEXT NOT NULL DEFAULT 'Chile',
  published_date TEXT NOT NULL,
  detection_date TEXT DEFAULT CURRENT_TIMESTAMP,
  related_project_id TEXT,
  related_project_name TEXT NOT NULL,
  related_company TEXT NOT NULL,
  project_stage TEXT NOT NULL,
  relevance TEXT NOT NULL DEFAULT 'Alta',
  confidence TEXT NOT NULL DEFAULT 'Alta',
  commercial_interpretation TEXT NOT NULL, -- JSON con hipótesis, needs, services
  validation_state TEXT DEFAULT 'Detectada automát.',
  history_logs TEXT DEFAULT '[]', -- JSON array
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLA: COMPANIES (Directorio de Empresas del Ecosistema)
CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  legal_name TEXT,
  country_origin TEXT NOT NULL,
  primary_role TEXT NOT NULL,
  supported_roles TEXT DEFAULT '[]', -- JSON array
  website TEXT,
  description TEXT,
  tier TEXT DEFAULT 'Tier 1 Global',
  participating_projects_count INTEGER DEFAULT 0,
  related_project_ids TEXT DEFAULT '[]', -- JSON array
  contracts TEXT DEFAULT '[]', -- JSON array
  key_contacts TEXT DEFAULT '[]', -- JSON array
  verified_sources TEXT DEFAULT '[]', -- JSON array
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLA: OPPORTUNITIES (Oportunidades Comerciales B2B & Scoring 100 Pts)
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  related_project_id TEXT,
  related_project_name TEXT NOT NULL,
  target_company TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Chile',
  project_stage TEXT NOT NULL,
  originating_signal_ids TEXT DEFAULT '[]', -- JSON array
  originating_signal_names TEXT DEFAULT '[]', -- JSON array
  detection_date TEXT,
  potential_need TEXT NOT NULL,
  related_solution_category TEXT NOT NULL,
  involved_companies TEXT DEFAULT '[]', -- JSON array
  key_decision_makers TEXT DEFAULT '[]', -- JSON array
  anticipation_window_months INTEGER DEFAULT 6,
  priority TEXT NOT NULL DEFAULT 'Alta',
  confidence TEXT NOT NULL DEFAULT 'Alta',
  recommended_next_action TEXT NOT NULL,
  commercial_status TEXT NOT NULL DEFAULT 'Identificada Tempranamente',
  estimated_contract_value_usd REAL,
  scoring TEXT NOT NULL, -- JSON con desglose de las 6 variables del modelo de 100 puntos
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABLA: DASHBOARDS (Configuraciones del Dashboard Builder)
CREATE TABLE IF NOT EXISTS dashboards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  is_default INTEGER DEFAULT 0,
  is_predefined INTEGER DEFAULT 0,
  widgets TEXT NOT NULL, -- JSON array
  global_filters TEXT DEFAULT '{}',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- ÍNDICES DE ALTO RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_d1_projects_country ON projects(country);
CREATE INDEX IF NOT EXISTS idx_d1_projects_stage ON projects(stage);
CREATE INDEX IF NOT EXISTS idx_d1_signals_category ON signals(category);
CREATE INDEX IF NOT EXISTS idx_d1_signals_project ON signals(related_project_id);
CREATE INDEX IF NOT EXISTS idx_d1_signals_date ON signals(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_d1_opps_priority ON opportunities(priority);
CREATE INDEX IF NOT EXISTS idx_d1_history_project ON project_history(project_id, event_date DESC);
