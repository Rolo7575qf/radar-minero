// Cloudflare Pages Function: /api/opportunities

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      `SELECT * FROM opportunities ORDER BY detection_date DESC`
    ).all();

    const parsed = results.map((row: any) => ({
      id: row.id,
      title: row.title,
      relatedProjectId: row.related_project_id,
      relatedProjectName: row.related_project_name,
      targetCompany: row.target_company,
      country: row.country,
      projectStage: row.project_stage,
      originatingSignalIds: JSON.parse(row.originating_signal_ids || '[]'),
      originatingSignalNames: JSON.parse(row.originating_signal_names || '[]'),
      detectionDate: row.detection_date,
      potentialNeed: row.potential_need,
      relatedSolutionCategory: row.related_solution_category,
      involvedCompanies: JSON.parse(row.involved_companies || '[]'),
      keyDecisionMakers: JSON.parse(row.key_decision_makers || '[]'),
      anticipationWindowMonths: row.anticipation_window_months,
      priority: row.priority,
      confidence: row.confidence,
      recommendedNextAction: row.recommended_next_action,
      commercialStatus: row.commercial_status,
      estimatedContractValueUSD: row.estimated_contract_value_usd,
      scoring: JSON.parse(row.scoring || '{}'),
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
