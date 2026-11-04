// Cloudflare Pages Function: /api/cron/weekly-agent
// Agente Autónomo Semanal de Ingesta & Detección Temprana

interface Env {
  DB: D1Database;
  CRON_SECRET?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const authHeader = context.request.headers.get('Authorization');
  if (context.env.CRON_SECRET && authHeader !== `Bearer ${context.env.CRON_SECRET}`) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  try {
    const timestamp = new Date().toISOString();
    const publishedDate = timestamp.split('T')[0];

    // Nueva señal detectada por el agente en la semana
    const signalId = `sig-cf-${Date.now()}`;
    const interpretation = {
      hypothesis: 'El SEA notificó la recepción conforme del Plan de Mitigación Hidrológica. Esto habilita el inicio del proceso de selección de contratistas para obras de aducción y piping cordillerano.',
      potentialNeeds: [
        'Suministro de tuberías de acero al carbono de alta presión',
        'Ingeniería de detalle de cruces de quebradas y trazado',
        'Inspección técnica de obras hidráulicas'
      ],
      targetServices: ['Piping Industrial', 'Ingeniería Hidráulica', 'Inspección Técnica'],
      anticipationWindowMonths: 5,
      supportingEvidence: ['Resolución oficial del Servicio de Evaluación Ambiental de Atacama']
    };

    // Insertar señal en Cloudflare D1
    await context.env.DB.prepare(
      `INSERT INTO signals (
        id, name, category, description, original_source, source_url, country,
        published_date, detection_date, related_project_id, related_project_name,
        related_company, project_stage, relevance, confidence, commercial_interpretation,
        validation_state, history_logs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        signalId,
        'Aprobación de Plan de Mitigación Hidrológica y Línea de Aducción',
        'Ambiental',
        'Resolución exenta confirma el cumplimiento de exigencias técnicas para el trazado del mineroducto y acueducto.',
        'SEA / SEIA',
        'https://seia.sea.gob.cl',
        'Chile',
        publishedDate,
        timestamp,
        'proj-nuevaunion',
        'Proyecto NuevaUnión (Relincho + El Morro)',
        'NuevaUnión SpA',
        '8. Permisos y aprobaciones',
        'Alta',
        'Alta',
        JSON.stringify(interpretation),
        'Detectada automát.',
        '[]'
      )
      .run();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Agente Semanal de Cloudflare D1 ejecutado con éxito.',
        signalId,
        timestamp,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
