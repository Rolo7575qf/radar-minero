-- Actualización de validación de fechas RFQ y last_reviewed para las 11 oportunidades pendientes (06-Nov-2026)
-- Criterio: Fechas estimadas basadas en ciclo SEIA (plazos de RCA y temporada operativa de faena)
-- target_basis: 'estimada'
-- last_reviewed: '2026-11-06'

-- 1. La Verde (Lundin / Minera La Frontera - Ingreso SEIA 30-Oct-2026)
UPDATE opportunities SET
  target_rfq_date = '2027-04-15',
  target_basis = 'estimada',
  anticipation_window_months = 5,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20261030-seia-laverde-lafrontera';

-- 2. Modificación Rajo Inca - Sector Salvador (Codelco - Ingreso SEIA 28-Ago-2026)
UPDATE opportunities SET
  target_rfq_date = '2027-02-15',
  target_basis = 'estimada',
  anticipation_window_months = 3,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20260828-dia-rajo-inca';

-- 3. Mantos de la Luna - Distrito Norte (Ingreso SEIA 26-Oct-2026)
UPDATE opportunities SET
  target_rfq_date = '2027-05-15',
  target_basis = 'estimada',
  anticipation_window_months = 6,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20261026-dia-mantos-luna';

-- 4. Romeral Fase V Subterránea (CMP - Ingreso SEIA 24-Mar-2026)
UPDATE opportunities SET
  target_rfq_date = '2027-01-15',
  target_basis = 'estimada',
  anticipation_window_months = 2,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20260324-sea-romeral-fase-v';

-- 5. Continuidad Litio Salar de Maricunga (Codelco - Ingreso SEIA 31-Mar-2026)
UPDATE opportunities SET
  target_rfq_date = '2026-12-15',
  target_basis = 'estimada',
  anticipation_window_months = 1,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20260331-sea-maricunga-exploracion';

-- 6. Ampliación Minera Eloísa (SCM Carola - Ingreso SEIA 03-Sep-2026)
UPDATE opportunities SET
  target_rfq_date = '2027-03-30',
  target_basis = 'estimada',
  anticipation_window_months = 4,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20260903-sea-eloisa-ampliacion';

-- 7. Complejo Productivo Sur / Ex Planta Delta (ENAMI - Ingreso SEIA 21-Ago-2026)
UPDATE opportunities SET
  target_rfq_date = '2027-03-15',
  target_basis = 'estimada',
  anticipation_window_months = 4,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20260821-sea-enami-complejo-sur';

-- 8. Exploración Litio Salar de Pedernales (Codelco - Ingreso SEIA 05-May-2026)
UPDATE opportunities SET
  target_rfq_date = '2027-01-30',
  target_basis = 'estimada',
  anticipation_window_months = 2,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20260505-sea-pedernales-litio-exploracion';

-- 9. Sondajes Prospección Carmen Cu (Ingreso SEIA 05-Mar-2026)
UPDATE opportunities SET
  target_rfq_date = '2026-12-30',
  target_basis = 'estimada',
  anticipation_window_months = 1,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20260305-sea-carmen-cu-sondajes';

-- 10. Continuidad Minera Sagasca (Ingreso SEIA 04-Jun-2025)
UPDATE opportunities SET
  target_rfq_date = '2027-01-15',
  target_basis = 'estimada',
  anticipation_window_months = 2,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20250604-sea-sagasca-continuidad';

-- 11. Manejo Aguas Depósito Donoso Norte - Los Bronces (Anglo American - Ingreso SEIA 15-Oct-2024)
UPDATE opportunities SET
  target_rfq_date = '2027-04-30',
  target_basis = 'estimada',
  anticipation_window_months = 5,
  last_reviewed = '2026-11-06'
WHERE id = 'opp-cl-20241015-sea-donoso-norte-aguas';
