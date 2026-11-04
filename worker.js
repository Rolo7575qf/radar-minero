// Cloudflare Worker: API de Base de Datos D1 + Servidor de SPA
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Endpoints API
    if (url.pathname === '/api/projects') {
      try {
        const { results } = await env.DB.prepare(
          'SELECT * FROM projects ORDER BY capex_estimated_millions_usd DESC'
        ).all();
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    if (url.pathname === '/api/signals') {
      try {
        const { results } = await env.DB.prepare(
          'SELECT * FROM signals ORDER BY published_date DESC'
        ).all();
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    if (url.pathname === '/api/opportunities') {
      try {
        const { results } = await env.DB.prepare(
          'SELECT * FROM opportunities ORDER BY detection_date DESC'
        ).all();
        return new Response(JSON.stringify(results), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // Servir archivos estáticos de la SPA desde ./dist
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('RADAR MINERO Edge Worker Active', { status: 200 });
  }
};
