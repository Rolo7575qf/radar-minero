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
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });

var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);

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
            capexEstimatedMillionsUSD: r.capex_estimated_millions_usd ?? 0,
            productiveCapacity: r.description || "",
            estimatedStartDate: "No informado",
            estimatedCommissioningDate: "No informado",
            currentStatus: "En evaluación",
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

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return new Response("RADAR MINERO Edge Worker Active", { status: 200 });
  },
};
export { worker_default as default };
