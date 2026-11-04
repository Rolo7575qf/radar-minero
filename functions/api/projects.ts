// Cloudflare Pages Function: /api/projects
// Conexión nativa a Cloudflare D1 Database

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      `SELECT * FROM projects ORDER BY capex_estimated_millions_usd DESC`
    ).all();

    // Procesamos campos JSON
    const parsed = results.map((row: any) => ({
      ...row,
      associatedCompanies: JSON.parse(row.associated_companies || '[]'),
      secondaryMinerals: JSON.parse(row.secondary_minerals || '[]'),
      informationSources: JSON.parse(row.information_sources || '[]'),
      keyContractors: JSON.parse(row.key_contractors || '[]'),
      capexEstimatedMillionsUSD: row.capex_estimated_millions_usd,
      ownerCompany: row.owner_company,
      mainMineral: row.main_mineral,
      projectType: row.project_type,
      currentStatus: row.current_status,
      signalsCount: row.signals_count,
      epcmCompany: row.epcm_company,
      lastUpdateDate: row.last_update_date,
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
