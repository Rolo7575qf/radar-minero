// Cloudflare Pages Function: /api/signals

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      `SELECT * FROM signals ORDER BY published_date DESC`
    ).all();

    const parsed = results.map((row: any) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      description: row.description,
      originalSource: row.original_source,
      sourceUrl: row.source_url,
      country: row.country,
      publishedDate: row.published_date,
      detectionDate: row.detection_date,
      relatedProjectId: row.related_project_id,
      relatedProjectName: row.related_project_name,
      relatedCompany: row.related_company,
      projectStage: row.project_stage,
      relevance: row.relevance,
      confidence: row.confidence,
      commercialInterpretation: JSON.parse(row.commercial_interpretation || '{}'),
      validationState: row.validation_state,
      historyLogs: JSON.parse(row.history_logs || '[]'),
    }));

    return new Response(JSON.stringify(parsed), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const payload = (await context.request.json()) as any;
    const now = new Date().toISOString();

    await context.env.DB.prepare(
      `INSERT INTO signals (
        id, name, category, description, original_source, source_url, country,
        published_date, detection_date, related_project_id, related_project_name,
        related_company, project_stage, relevance, confidence, commercial_interpretation,
        validation_state, history_logs
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        payload.id || `sig-${Date.now()}`,
        payload.name,
        payload.category,
        payload.description,
        payload.originalSource,
        payload.sourceUrl || '',
        payload.country || 'Chile',
        payload.publishedDate || now.split('T')[0],
        now,
        payload.relatedProjectId,
        payload.relatedProjectName,
        payload.relatedCompany,
        payload.projectStage,
        payload.relevance,
        payload.confidence,
        JSON.stringify(payload.commercialInterpretation || {}),
        payload.validationState || 'Detectada automát.',
        JSON.stringify(payload.historyLogs || [])
      )
      .run();

    return new Response(JSON.stringify({ success: true, id: payload.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
