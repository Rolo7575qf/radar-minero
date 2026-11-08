-- ==============================================================================
-- TABLA DE CLIENTES Y LICENCIAS B2B (ADMINISTRADOR CENTRAL IC)
-- Control de acceso por cliente: activación de licencia, rubros y países
-- Exclusivo para: roloquinonesf@gmail.com (InteligenciaConectada™)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS client_licenses (
  id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL UNIQUE,
  allowed_emails TEXT NOT NULL DEFAULT '[]', -- Lista JSON de correos o dominios autorizados
  status TEXT NOT NULL DEFAULT 'activa',     -- 'activa' | 'inactiva' | 'suspendida' | 'demo'
  plan TEXT NOT NULL DEFAULT 'Enterprise B2B', -- 'Enterprise B2B' | 'Growth Partner' | 'Standard' | 'Trial'
  countries TEXT NOT NULL DEFAULT '["Chile"]', -- JSON array: ["Chile", "Perú", "Argentina"]
  rubros TEXT NOT NULL DEFAULT '["Minería"]',  -- JSON array: ["Minería", "Energía & Renovables", ...]
  max_users INTEGER DEFAULT 5,
  start_date TEXT NOT NULL DEFAULT CURRENT_DATE,
  expiry_date TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Licencia Maestra SuperAdmin InteligenciaConectada™ (Rolando Quiñones)
INSERT OR IGNORE INTO client_licenses (
  id, company_name, contact_name, contact_email, allowed_emails, status, plan, countries, rubros, max_users, start_date, expiry_date, notes
) VALUES (
  'lic-ic-master',
  'InteligenciaConectada™ Headquarters',
  'Rolando Quiñones',
  'roloquinonesf@gmail.com',
  '["roloquinonesf@gmail.com", "contacto@inteligenciaconectada.com"]',
  'activa',
  'Master Central Admin',
  '["Chile", "Perú", "Argentina", "Colombia"]',
  '["Minería", "Energía & Renovables", "Infraestructura & Construcción", "Celulosa & Forestal"]',
  999,
  '2026-01-01',
  '2030-12-31',
  'Licencia Maestra Central del Fundador y SuperAdministrador'
);

-- Clientes B2B iniciales (Metso, Komatsu, Ausenco) para el arranque del panel de control
INSERT OR IGNORE INTO client_licenses (
  id, company_name, contact_name, contact_email, allowed_emails, status, plan, countries, rubros, max_users, start_date, expiry_date, notes
) VALUES (
  'lic-metso-chile',
  'Metso Outotec Chile',
  'Rodrigo Larraín',
  'contacto.chile@metso.com',
  '["contacto.chile@metso.com", "@metso.com"]',
  'activa',
  'Enterprise B2B',
  '["Chile"]',
  '["Minería"]',
  10,
  '2026-02-01',
  '2027-02-01',
  'Cliente corporativo de equipos mineros de molienda y flotación.'
),
(
  'lic-komatsu-cummins',
  'Komatsu Cummins Chile',
  'Carlos Valenzuela',
  'c.valenzuela@komatsu.cl',
  '["c.valenzuela@komatsu.cl", "@komatsu.cl"]',
  'activa',
  'Growth Partner',
  '["Chile"]',
  '["Minería"]',
  8,
  '2026-03-01',
  '2027-03-01',
  'Monitoreo activo de flotas de extracción y contratos de mantenimiento en rajos abiertos.'
),
(
  'lic-ausenco-latam',
  'Ausenco Sudamérica',
  'Javier Morales',
  'j.morales@ausenco.com',
  '["j.morales@ausenco.com", "@ausenco.com"]',
  'demo',
  'Trial',
  '["Chile", "Perú"]',
  '["Minería"]',
  3,
  '2026-11-01',
  '2026-12-01',
  'Licencia de prueba comercial extendida para equipo de desarrollo de negocios EPCM.'
);
