// RADAR MINERO - Worker con mapeo D1 (snake_case) -> front (camelCase + JSON parseado)
const REGION_COORDS = {
  "Antofagasta": [-23.65, -70.4],
  "Atacama": [-27.37, -70.33],
  "O Higgins": [-34.17, -70.74],
  "Valparaíso": [-33.05, -71.62],
  "Coquimbo": [-29.95, -71.34],
};

const j = (s, fallback) => {
  if (s === null || s === undefined || s === "") return fallback;
  try { return JSON.parse(s); } catch { return fallback; }
};

const mapSignal = (r) => ({
  id: r.id,
  name: r.name || "",
  category: r.category || "Sectorial",
  description: r.description || "",
  originalSource: r.original_source || "Corporativo / Prensa",
  sourceUrl: r.source_url || "",
  country: r.country || "Chile",
  publishedDate: r.published_date || "",
  detectionDate: r.detection_date || "",
  relatedProjectId: r.related_project_id || "",
  relatedProjectName: r.related_project_name || "Contexto sectorial (sin proyecto específico)",
  relatedCompany: r.related_company || "",
  projectStage: r.project_stage || "",
  relevance: r.relevance || "Informativa",
  confidence: r.confidence || "Media",
  commercialInterpretation: (() => {
    const c = j(r.commercial_interpretation, {}) || {};
    return {
      hypothesis: c.hypothesis || "",
      potentialNeeds: Array.isArray(c.potentialNeeds) ? c.potentialNeeds : [],
      targetServices: Array.isArray(c.targetServices) ? c.targetServices : [],
      anticipationWindowMonths: c.anticipationWindowMonths || 0,
      supportingEvidence: Array.isArray(c.supportingEvidence) ? c.supportingEvidence : [],
    };
  })(),
  validationState: r.validation_state || "Detectada automát.",
  historyLogs: j(r.history_logs, []),
});

const mapOpportunity = (r) => ({
  id: r.id,
  title: r.title || "",
  relatedProjectId: r.related_project_id || "",
  relatedProjectName: r.related_project_name || "",
  targetCompany: r.target_company || "",
  country: r.country || "Chile",
  projectStage: r.project_stage || "",
  originatingSignalIds: j(r.originating_signal_ids, []),
  originatingSignalNames: j(r.originating_signal_names, []),
  detectionDate: r.detection_date || "",
  potentialNeed: r.potential_need || "",
  relatedSolutionCategory: r.related_solution_category || "",
  involvedCompanies: j(r.involved_companies, []),
  keyDecisionMakers: j(r.key_decision_makers, []),
  anticipationWindowMonths: r.anticipation_window_months ?? 0,
  targetRfqDate: r.target_rfq_date ?? undefined,
  targetBasis: r.target_basis ?? undefined,
  lastReviewed: r.last_reviewed ?? undefined,
  priority: r.priority || "Media",
  confidence: r.confidence || "Media",
  recommendedNextAction: r.recommended_next_action || "",
  commercialStatus: r.commercial_status || "Identificada Tempranamente",
  estimatedContractValueUSD: r.estimated_contract_value_usd ?? 0,
  scoring: j(r.scoring, {
    totalScore: 0, maturityScore: 0, recentSignalsScore: 0, serviceFitScore: 0,
    actorsIdentifiedScore: 0, economicSizeScore: 0, anticipationWindowScore: 0,
    maturityExplanation: "", recentSignalsExplanation: "", serviceFitExplanation: "",
    actorsIdentifiedExplanation: "", economicSizeExplanation: "", anticipationWindowExplanation: "",
  }),
});

const mapHistory = (h) => ({
  id: h.id,
  date: h.event_date || "",
  signalTitle: h.signal_title || "",
  source: h.source || "",
  previousStage: h.previous_stage,
  newStage: h.new_stage,
  previousCapex: h.previous_capex,
  newCapex: h.new_capex,
  changeDescription: h.change_description || "",
  commercialInterpretation: h.commercial_interpretation || "",
  potentialImpact: h.potential_impact || "",
  confidenceLevel: h.confidence_level || "Media",
});

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://radar.inteligenciaconectada.com" },
  });


// ---------- Autenticación (Cloudflare Access) ----------
// Se activa con la variable REQUIRE_AUTH="1". Requiere ACCESS_TEAM_DOMAIN (ej: "miequipo.cloudflareaccess.com")
// y ACCESS_AUD (Application Audience tag de la app de Access). Si REQUIRE_AUTH no está activa, no cambia nada.
const b64urlToBytes = (str) => {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const bin = atob(str);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

let jwksCache = { at: 0, keys: null };
async function getJwks(env) {
  if (jwksCache.keys && Date.now() - jwksCache.at < 3600_000) return jwksCache.keys;
  const res = await fetch("https://" + env.ACCESS_TEAM_DOMAIN + "/cdn-cgi/access/certs");
  if (!res.ok) throw new Error("jwks");
  const { keys } = await res.json();
  jwksCache = { at: Date.now(), keys };
  return keys;
}

// Devuelve el email verificado del usuario, o null si no hay sesión válida.
async function verifiedUser(request, env) {
  try {
    const token = request.headers.get("Cf-Access-Jwt-Assertion");
    if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return null;
    const [h, p, sig] = token.split(".");
    if (!h || !p || !sig) return null;
    const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(h)));
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
    const jwk = (await getJwks(env)).find((k) => k.kid === header.kid);
    if (!jwk || header.alg !== "RS256") return null;
    const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(sig), new TextEncoder().encode(h + "." + p));
    if (!ok) return null;
    const aud = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!aud.includes(env.ACCESS_AUD)) return null;
    if (payload.iss !== "https://" + env.ACCESS_TEAM_DOMAIN) return null;
    if (!payload.exp || payload.exp * 1000 < Date.now()) return null;
    return payload.email || null;
  } catch {
    return null;
  }
}

const mapActor = (r) => ({
  id: r.id,
  fullName: r.full_name || "",
  jobTitle: r.job_title || "",
  company: r.company || "",
  companyRole: r.company_role || "",
  projectIds: j(r.project_ids, []),
  decisionRole: r.decision_role || "",
  email: r.email || undefined,
  emailStatus: r.email_status || undefined,
  phone: r.phone || undefined,
  linkedinUrl: r.linkedin_url || undefined,
});

var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);


    // --- Salud (público) ---
    if (url.pathname === "/api/health") {
      return json({ ok: true, auth: env.REQUIRE_AUTH === "1" });
    }

    // --- Control de acceso a toda la API ---
    let userEmail = null;
    if (url.pathname.startsWith("/api/")) {
      userEmail = await verifiedUser(request, env);
      if (env.REQUIRE_AUTH === "1" && !userEmail) {
        return json({ error: "No autorizado" }, 401);
      }
    }

    // --- Espacio de trabajo por usuario (pipeline, pesos, dashboards) ---
    if (url.pathname === "/api/workspace") {
      if (!userEmail) return json({ error: "No autorizado" }, 401);
      try {
        if (request.method === "GET") {
          const row = await env.DB.prepare("SELECT state, updated_at FROM workspaces WHERE email = ?").bind(userEmail).first();
          return json({ email: userEmail, state: j(row && row.state, {}), updatedAt: row ? row.updated_at : null });
        }
        if (request.method === "PUT") {
          const body = await request.text();
          if (body.length > 200000) return json({ error: "Estado demasiado grande" }, 413);
          JSON.parse(body); // valida JSON
          await env.DB.prepare(
            "INSERT INTO workspaces (email, state, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(email) DO UPDATE SET state = excluded.state, updated_at = CURRENT_TIMESTAMP"
          ).bind(userEmail, body).run();
          return json({ ok: true });
        }
        return json({ error: "Método no permitido" }, 405);
      } catch (err) {
        return json({ error: "Solicitud inválida" }, 400);
      }
    }

    if (url.pathname === "/api/projects") {
      try {
        const [p, s, h] = await env.DB.batch([
          env.DB.prepare("SELECT * FROM projects ORDER BY capex_estimated_millions_usd DESC"),
          env.DB.prepare("SELECT related_project_id, original_source FROM signals WHERE related_project_id IS NOT NULL"),
          env.DB.prepare("SELECT * FROM project_history ORDER BY event_date ASC"),
        ]);
        const count = {}, sources = {}, hist = {};
        for (const r of s.results) {
          count[r.related_project_id] = (count[r.related_project_id] || 0) + 1;
          (sources[r.related_project_id] ||= new Set()).add(r.original_source);
        }
        for (const r of h.results) (hist[r.project_id] ||= []).push(mapHistory(r));
        const out = p.results.map((r) => {
          const c = REGION_COORDS[r.region] || [-30.0, -70.5];
          return {
            id: r.id,
            name: r.name,
            country: r.country || "Chile",
            region: r.region || "",
            locationDetails: (r.region ? "Región: " + r.region : "") + " (ubicación referencial)",
            latitude: r.latitude ?? c[0],
            longitude: r.longitude ?? c[1],
            ownerCompany: r.owner || "",
            associatedCompanies: [],
            mainMineral: r.commodity || "No informado",
            secondaryMinerals: [],
            projectType: "No informado",
            submissionType: r.project_type || "No informado",
            seiaId: r.seia_id || null,
            capexEstimatedMillionsUSD: r.capex_estimated_millions_usd ?? 0,
            productiveCapacity: r.description || "",
            estimatedStartDate: "No informado",
            estimatedCommissioningDate: "No informado",
            currentStatus: r.stage === "13. Operación" ? "En operación" : "En evaluación",
            stage: r.stage || "",
            informationSources: sources[r.id] ? [...sources[r.id]] : [],
            lastUpdateDate: r.last_signal_date || "",
            signalsCount: count[r.id] || 0,
            epcmCompany: r.epcm || "No identificado",
            keyContractors: [],
            history: hist[r.id] || [],
          };
        });
        return json(out);
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    if (url.pathname === "/api/signals") {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM signals ORDER BY published_date DESC").all();
        return json(results.map(mapSignal));
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    if (url.pathname === "/api/opportunities") {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM opportunities ORDER BY detection_date DESC").all();
        return json(results.map(mapOpportunity));
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    if (url.pathname === "/api/actors") {
      try {
        const { results } = await env.DB.prepare("SELECT * FROM actors ORDER BY company, full_name").all();
        return json(results.map(mapActor));
      } catch (err) {
        return json({ error: err.message }, 500);
      }
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response("RADAR MINERO Edge Worker Active", { status: 200 });
  },
};
export { worker_default as default };
