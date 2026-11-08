import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, ActiveTab, MobileNav, SECTION_TITLES } from './components/layout/Sidebar';
import { AccessCurtain } from './components/brand/AccessCurtain';
import { AccountModal } from './components/account/AccountModal';
import { ClientBrand, ClientLogo } from './components/brand/ICSeal';
import { ArrowRight, Briefcase } from 'lucide-react';
import { DashboardView } from './components/dashboard/DashboardView';
import { DashboardBuilderModal } from './components/dashboard/DashboardBuilderModal';
import { SignalFeed } from './components/signals/SignalFeed';
import { SignalDetailModal } from './components/signals/SignalDetailModal';
import { SignalSimulatorModal } from './components/signals/SignalSimulatorModal';
import { ProjectList } from './components/projects/ProjectList';
import { ProjectTimeline } from './components/projects/ProjectTimeline';
import { ProjectMap } from './components/projects/ProjectMap';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { EcosystemNetwork } from './components/ecosystem/EcosystemNetwork';
import { CompanyList } from './components/ecosystem/CompanyList';
import { CompanyDetailModal } from './components/ecosystem/CompanyDetailModal';
import { OpportunityBoard } from './components/opportunities/OpportunityBoard';
import { OpportunityDetailModal } from './components/opportunities/OpportunityDetailModal';
import { ScoringConfigModal } from './components/opportunities/ScoringConfigModal';
import { ProviderProfileModal } from './components/opportunities/ProviderProfileModal';
import { AdminControlPanelModal } from './components/admin/AdminControlPanelModal';
import { detectCategories, serviceLabel } from './data/serviceCatalog';
import { AssistantPanel } from './components/assistant/AssistantPanel';

import { MiningProject } from './types/project';
import { EarlySignal } from './types/signal';
import { MiningCompany, Actor } from './types/company';
import { CommercialOpportunity, CommercialStatus, ScoringWeights } from './types/opportunity';
import { DashboardConfig } from './types/dashboard';

import { storageService } from './services/storageService';
import { buildEcosystem } from './services/ecosystemBuilder';
import { workspaceService, OppOverride } from './services/workspaceService';
import { signalEngine, IngestSignalPayload } from './services/signalEngine';
import { calculateOpportunityScore, getPriorityFromScore } from './services/scoringService';
import { monthsUntil } from './services/horizon';

// Recalcula puntaje y prioridad de todas las oportunidades con unas ponderaciones dadas.
const recalcOpportunities = (
  opps: CommercialOpportunity[],
  projs: MiningProject[],
  sigs: EarlySignal[],
  weights: ScoringWeights,
  services: string[] = []
): CommercialOpportunity[] =>
  opps.map((opp) => {
    const proj = projs.find((p) => p.id === opp.relatedProjectId) || {};
    const projSignals = sigs.filter((sg) => sg.relatedProjectId === opp.relatedProjectId);
    // Texto donde se buscan los servicios que demanda el proyecto (sin la interpretación genérica)
    const needText = [
      (proj as Partial<MiningProject>).name,
      (proj as Partial<MiningProject>).productiveCapacity,
      opp.potentialNeed,
      opp.relatedSolutionCategory,
      ...projSignals.flatMap((sg) => [
        ...(sg.commercialInterpretation?.targetServices || []),
        ...(sg.commercialInterpretation?.potentialNeeds || []),
      ]),
    ]
      .filter(Boolean)
      .join(' ');
    const newScore = calculateOpportunityScore(
      proj,
      projSignals,
      opp.involvedCompanies?.length || 0,
      opp.keyDecisionMakers?.length || 0,
      monthsUntil(opp.targetRfqDate, opp.anticipationWindowMonths),
      weights,
      { services, needText }
    );
    return { ...opp, scoring: newScore, priority: getPriorityFromScore(newScore.totalScore) };
  });

export const App: React.FC = () => {
  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [projectsView, setProjectsView] = useState<'lista' | 'linea' | 'mapa'>('lista');
  const [selectedCountry, setSelectedCountry] = useState<string>('Chile');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core Data State
  const [projects, setProjects] = useState<MiningProject[]>([]);
  const [signals, setSignals] = useState<EarlySignal[]>([]);
  const [rawOpportunities, setOpportunities] = useState<CommercialOpportunity[]>([]);
  const [oppOverrides, setOppOverrides] = useState<Record<string, OppOverride>>({});
  const opportunities = useMemo(
    () =>
      rawOpportunities.map((o) => {
        const ov = oppOverrides[o.id];
        return ov
          ? { ...o, commercialStatus: ov.status ?? o.commercialStatus, clientNote: ov.note, statusUpdatedAt: ov.updatedAt }
          : o;
      }),
    [rawOpportunities, oppOverrides]
  );
  const sources = useMemo(() => [...new Set(signals.map((sg) => sg.originalSource).filter(Boolean))], [signals]);
  const lastSignalDate = useMemo(() => {
    const dates = signals.map((sg) => sg.publishedDate).filter(Boolean).sort();
    const d = dates[dates.length - 1];
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return day && m ? `${day}-${m}` : d;
  }, [signals]);
  const [actors, setActors] = useState<Actor[]>([]);
  const { companies, relations } = useMemo(() => buildEcosystem(projects, opportunities, actors), [projects, opportunities, actors]);
  const [dashboards, setDashboards] = useState<DashboardConfig[]>([]);
  const [activeDashboardId, setActiveDashboardId] = useState<string>('');
  const [scoringWeights, setScoringWeights] = useState<ScoringWeights>(storageService.getScoringWeights());
  const [providerServices, setProviderServices] = useState<string[]>([]);
  const [followedProjects, setFollowedProjects] = useState<string[]>([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [briefProject, setBriefProject] = useState<MiningProject | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [clientBrand, setClientBrand] = useState<ClientBrand>({});
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dataReady, setDataReady] = useState(false);
  const [showCurtain, setShowCurtain] = useState<boolean>(() => {
    try { return sessionStorage.getItem('radar_curtain_seen') !== '1'; } catch { return true; }
  });
  const isLocalDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const isAdmin = userEmail === 'roloquinonesf@gmail.com' || isLocalDev;
  const [navCollapsed, setNavCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('radar_nav_collapsed') === '1'; } catch { return false; }
  });
  const toggleNav = () => {
    setNavCollapsed((c) => {
      try { localStorage.setItem('radar_nav_collapsed', c ? '0' : '1'); } catch { /* sin almacenamiento */ }
      return !c;
    });
  };

  // Modal State
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isScoringConfigOpen, setIsScoringConfigOpen] = useState(false);
  const [isAdminControlPanelOpen, setIsAdminControlPanelOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<MiningProject | null>(null);
  const [selectedSignal, setSelectedSignal] = useState<EarlySignal | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<MiningCompany | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<CommercialOpportunity | null>(null);

  // Initialize data from local storage and sync with Cloudflare D1
  useEffect(() => {
    setProjects(storageService.getProjects());
    setSignals(storageService.getSignals());
    setOpportunities(storageService.getOpportunities());
    setDashboards(storageService.getDashboards());
    setActiveDashboardId(storageService.getActiveDashboardId());
    setScoringWeights(storageService.getScoringWeights());

    // Sincronización en segundo plano con Cloudflare D1 (si está desplegado en Cloudflare)
    (async () => {
      storageService.fetchActors().then(setActors);
      const synced = await storageService.syncWithCloudflareD1();
      let projs = storageService.getProjects();
      let sigs = storageService.getSignals();
      let opps = storageService.getOpportunities();
      if (synced) {
        if (synced.projects) { projs = synced.projects; setProjects(projs); }
        if (synced.signals) { sigs = synced.signals; setSignals(sigs); }
        if (synced.opportunities) { opps = synced.opportunities; }
      }

      // Espacio de trabajo del usuario (pipeline, ponderaciones, dashboards) desde D1
      const ws = await workspaceService.load();
      if (ws) {
        if (ws.oppOverrides) setOppOverrides(ws.oppOverrides);
        if (ws.dashboards && ws.dashboards.length) {
          const fresh = storageService.refreshPredefinedTexts(ws.dashboards);
          storageService.saveDashboards(fresh);
          setDashboards(fresh);
        }
        if (ws.activeDashboardId) {
          storageService.setActiveDashboardId(ws.activeDashboardId);
          setActiveDashboardId(ws.activeDashboardId);
        }
        if (ws.scoringWeights) {
          storageService.saveScoringWeights(ws.scoringWeights);
          setScoringWeights(ws.scoringWeights);
        }
        if (ws.providerServices) setProviderServices(ws.providerServices);
        if (ws.followedProjects) setFollowedProjects(ws.followedProjects);
        if (ws.clientBrand) setClientBrand(ws.clientBrand);
      }
      // Siempre se recalcula en el cliente: así el puntaje usa las ponderaciones y el perfil de cada usuario
      opps = recalcOpportunities(
        opps,
        projs,
        sigs,
        ws?.scoringWeights ?? storageService.getScoringWeights(),
        ws?.providerServices ?? []
      );
      setOpportunities(opps);
      setUserEmail(workspaceService.getEmail());
      setDataReady(true);
    })();
  }, []);

  // Filter projects/signals by global search or country
  const filteredProjectsByCountry = projects.filter((p) => {
    const matchesCountry = selectedCountry === 'Todos' || p.country === selectedCountry;
    const q = (searchQuery || '').toLowerCase();
    const matchesQuery = !q ||
      String(p.name || '').toLowerCase().includes(q) ||
      String(p.ownerCompany || '').toLowerCase().includes(q) ||
      String(p.mainMineral || '').toLowerCase().includes(q) ||
      String(p.region || '').toLowerCase().includes(q);
    return matchesCountry && matchesQuery;
  });

  const filteredSignalsByCountry = signals.filter((s) => {
    const matchesCountry = selectedCountry === 'Todos' || s.country === selectedCountry;
    const q = (searchQuery || '').toLowerCase();
    const matchesQuery = !q ||
      String(s.name || '').toLowerCase().includes(q) ||
      String(s.relatedProjectName || '').toLowerCase().includes(q) ||
      String(s.commercialInterpretation?.hypothesis || '').toLowerCase().includes(q);
    return matchesCountry && matchesQuery;
  });

  const filteredOpportunitiesByCountry = opportunities.filter((o) => {
    const matchesCountry = selectedCountry === 'Todos' || o.country === selectedCountry;
    const q = (searchQuery || '').toLowerCase();
    const matchesQuery = !q ||
      String(o.title || '').toLowerCase().includes(q) ||
      String(o.targetCompany || '').toLowerCase().includes(q) ||
      String(o.relatedProjectName || '').toLowerCase().includes(q);
    return matchesCountry && matchesQuery;
  });

  // Handlers for Dashboard Builder
  const handleSaveDashboard = (updated: DashboardConfig) => {
    const newDashboards = dashboards.map((d) => (d.id === updated.id ? updated : d));
    setDashboards(newDashboards);
    storageService.saveDashboards(newDashboards);
  };

  const handleCreateNewDashboard = (name?: string, description?: string) => {
    const newDash: DashboardConfig = {
      id: `dash-${Date.now()}`,
      name: name || `Mi Dashboard Personalizado ${dashboards.length + 1}`,
      description: description || 'Panel analítico personalizado creado en RADAR MINERO.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      widgets: [
        {
          id: `w-${Date.now()}-1`,
          title: 'Total Proyectos en Cartera',
          type: 'kpi_metric',
          width: 'third',
          height: 'sm',
          metric: 'project_count',
          colorScheme: 'amber',
        },
        {
          id: `w-${Date.now()}-2`,
          title: 'Señales Activas',
          type: 'kpi_metric',
          width: 'third',
          height: 'sm',
          metric: 'signal_count',
          colorScheme: 'cyan',
        },
        {
          id: `w-${Date.now()}-3`,
          title: 'Oportunidades Alta Prioridad',
          type: 'kpi_metric',
          width: 'third',
          height: 'sm',
          metric: 'opportunity_count',
          colorScheme: 'emerald',
        },
        {
          id: `w-${Date.now()}-4`,
          title: 'Distribución por Etapa',
          type: 'stage_funnel',
          width: 'two-thirds',
          height: 'md',
          colorScheme: 'amber',
        },
        {
          id: `w-${Date.now()}-5`,
          title: 'Distribución por Mineral',
          type: 'pie_chart',
          width: 'third',
          height: 'md',
          dimension: 'mineral',
          colorScheme: 'rose',
        },
      ],
    };

    const newDashboards = [...dashboards, newDash];
    setDashboards(newDashboards);
    setActiveDashboardId(newDash.id);
    storageService.saveDashboards(newDashboards);
    storageService.setActiveDashboardId(newDash.id);
  };

  const handleDuplicateDashboard = (dash: DashboardConfig) => {
    const duplicated: DashboardConfig = {
      ...dash,
      id: `dash-dup-${Date.now()}`,
      name: `${dash.name} (Copia)`,
      isDefault: false,
      isPredefined: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newDashboards = [...dashboards, duplicated];
    setDashboards(newDashboards);
    setActiveDashboardId(duplicated.id);
    storageService.saveDashboards(newDashboards);
    storageService.setActiveDashboardId(duplicated.id);
  };

  // Restaura dashboards y ponderaciones; los datos de D1, el pipeline y las notas no se tocan
  const handleRestoreDefaults = () => {
    storageService.resetAllToDefaults();
    storageService.saveProjects(projects);
    storageService.saveSignals(signals);
    const weights = storageService.getScoringWeights();
    setDashboards(storageService.getDashboards());
    setActiveDashboardId(storageService.getActiveDashboardId());
    setScoringWeights(weights);
    setOpportunities(recalcOpportunities(rawOpportunities, projects, signals, weights, providerServices));
  };

  const handleSaveBrand = (b: ClientBrand) => {
    setClientBrand(b);
    workspaceService.queueSave({ clientBrand: b });
  };

  const enterRadar = () => {
    setShowCurtain(false);
    try { sessionStorage.setItem('radar_curtain_seen', '1'); } catch { /* sin almacenamiento */ }
  };

  // Handler for New Signal Ingestion / Simulation
  const handleIngestSignal = (payload: IngestSignalPayload) => {
    const result = signalEngine.processNewSignal(payload, projects, signals, opportunities);
    setSignals(result.updatedSignals);
    setProjects(result.updatedProjects);
    setOpportunities(result.updatedOpportunities);

    storageService.saveSignals(result.updatedSignals);
    storageService.saveProjects(result.updatedProjects);
    storageService.saveOpportunities(result.updatedOpportunities);

    // Open detail of the new signal
    setSelectedSignal(result.newSignal);
  };

  // Handler for Scoring Weights Re-calibration
  const handleSaveWeights = (newWeights: ScoringWeights) => {
    setScoringWeights(newWeights);
    storageService.saveScoringWeights(newWeights);

    // Recalculate scoring for all opportunities
    const recalculated = recalcOpportunities(rawOpportunities, projects, signals, newWeights, providerServices);

    setOpportunities(recalculated);
    storageService.saveOpportunities(recalculated);
  };

  // Guardar perfil de proveedor: recalcula la compatibilidad de servicios y se guarda por usuario
  const handleSaveProfile = (services: string[]) => {
    setProviderServices(services);
    workspaceService.queueSave({ providerServices: services });
    setOpportunities(recalcOpportunities(rawOpportunities, projects, signals, scoringWeights, services));
  };

  // Seguir / dejar de seguir un proyecto (se guarda por usuario)
  const handleToggleFollow = (id: string) => {
    setFollowedProjects((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      workspaceService.queueSave({ followedProjects: next });
      return next;
    });
  };

  // Cambio de etapa / nota de una oportunidad (se guarda por usuario en D1)
  const handleUpdateOpportunity = (id: string, patch: { status?: CommercialStatus; note?: string }) => {
    const next = {
      ...oppOverrides,
      [id]: { ...oppOverrides[id], ...patch, updatedAt: new Date().toISOString() },
    };
    setOppOverrides(next);
    workspaceService.queueSave({ oppOverrides: next });
  };

  const selectedOpportunityView = selectedOpportunity
    ? opportunities.find((o) => o.id === selectedOpportunity.id) || selectedOpportunity
    : null;

  const currentDashboard =
    dashboards.find((d) => d.id === activeDashboardId) || dashboards[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex font-sans">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{
          signals: filteredSignalsByCountry.length,
          projects: filteredProjectsByCountry.length,
          companies: companies.length,
          opportunities: filteredOpportunitiesByCountry.length,
        }}
        sources={sources}
        clientBrand={clientBrand}
        onOpenAccount={() => setIsAccountOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminPanel={() => setIsAdminControlPanelOpen(true)}
        collapsed={navCollapsed}
        onToggleCollapsed={toggleNav}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar
          sectionTitle={SECTION_TITLES[activeTab]}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAccount={() => setIsAccountOpen(true)}
          onOpenSignalSimulator={isAdmin ? () => setIsSimulatorOpen(true) : undefined}
          isAdmin={isAdmin}
          onOpenAdminPanel={() => setIsAdminControlPanelOpen(true)}
          userEmail={userEmail}
          clientBrand={clientBrand}
          projectsCount={projects.length}
          lastSignalDate={lastSignalDate}
        />
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <section className="relative mb-8 rounded-[16px] border border-slate-800 bg-slate-900 ic-dot-grid overflow-hidden">
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-400" />
              <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,197,24,0.14), transparent 65%)' }} />
              <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="ic-rule" />
                    <span className="ic-eyebrow text-[10px] text-amber-400">Panel de {clientBrand.name || 'su empresa'}</span>
                  </div>
                  <h2 className="ic-display text-white text-[30px] sm:text-[40px] mt-3">
                    Mercado minero en seguimiento<span className="text-amber-400">.</span>
                  </h2>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-xl">
                    Cada proyecto minero con huellas públicas, su inversión declarada y las oportunidades que más le convienen a su empresa.{' '}
                    <span className="text-white font-bold">Se actualiza cada día.</span>
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button onClick={() => setActiveTab('opportunities')} className="flex items-center gap-2 px-4 py-2.5 rounded-[6px] bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-bold tracking-[0.12em]">
                      VER MIS OPORTUNIDADES <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {providerServices.length === 0 && (
                      <button onClick={() => setIsProfileOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-[6px] border border-amber-400/60 text-amber-400 hover:bg-amber-400/10 text-[11px] font-bold tracking-[0.12em]">
                        <Briefcase className="w-3.5 h-3.5" strokeWidth={1.5} /> DEFINIR MI PERFIL DE PROVEEDOR
                      </button>
                    )}
                  </div>
                </div>
                {clientBrand.logo && (
                  <div className="rounded-[10px] bg-white px-6 py-4 flex items-center justify-center min-w-[180px] min-h-[80px]">
                    <ClientLogo brand={clientBrand} maxHeight={52} />
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              dashboards={dashboards}
              activeDashboardId={activeDashboardId}
              onSelectDashboard={(id) => {
                setActiveDashboardId(id);
                storageService.setActiveDashboardId(id);
              }}
              onOpenBuilder={() => setIsBuilderOpen(true)}
              onCreateNewDashboard={() => handleCreateNewDashboard()}
              onDuplicateDashboard={handleDuplicateDashboard}
              onRestoreDefaults={handleRestoreDefaults}
              projects={filteredProjectsByCountry}
              signals={filteredSignalsByCountry}
              companies={companies}
              opportunities={filteredOpportunitiesByCountry}
              onSelectProject={setSelectedProject}
              onSelectSignal={setSelectedSignal}
              onSelectOpportunity={setSelectedOpportunity}
              onSelectCompany={setSelectedCompany}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'signals' && (
            <SignalFeed
              signals={filteredSignalsByCountry}
              onSelectSignal={setSelectedSignal}
              onOpenSimulator={isAdmin ? () => setIsSimulatorOpen(true) : undefined}
            />
          )}

          {activeTab === 'projects' && (
            (() => {
              const viewToggle = (
                <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800">
                  {([['lista', 'Cartera'], ['mapa', 'Mapa'], ['linea', 'Línea de tiempo']] as const).map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => setProjectsView(id)}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
                        projectsView === id ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              );
              return projectsView === 'lista' ? (
                <ProjectList
                  projects={filteredProjectsByCountry}
                  onSelectProject={setSelectedProject}
                  selectedCountry={selectedCountry}
                  viewToggle={viewToggle}
                  providerServices={providerServices}
                  onOpenProfile={() => setIsProfileOpen(true)}
                  followedIds={followedProjects}
                  onToggleFollow={handleToggleFollow}
                />
              ) : projectsView === 'mapa' ? (
                <ProjectMap
                  projects={filteredProjectsByCountry}
                  onSelectProject={setSelectedProject}
                  viewToggle={viewToggle}
                />
              ) : (
                <ProjectTimeline
                  projects={filteredProjectsByCountry}
                  opportunities={filteredOpportunitiesByCountry}
                  onSelectProject={setSelectedProject}
                  viewToggle={viewToggle}
                />
              );
            })()
          )}

          {activeTab === 'ecosystem' && (
            <div className="space-y-8">
              <EcosystemNetwork
                projects={filteredProjectsByCountry}
                companies={companies}
                relations={relations}
                onSelectProject={setSelectedProject}
                onSelectCompany={setSelectedCompany}
              />
              <CompanyList
                companies={companies}
                onSelectCompany={setSelectedCompany}
                onOpenProject={(pId) => {
                  const p = projects.find((item) => item.id === pId);
                  if (p) setSelectedProject(p);
                }}
              />
            </div>
          )}

          {activeTab === 'opportunities' && (
            <OpportunityBoard
              opportunities={filteredOpportunitiesByCountry}
              onSelectOpportunity={setSelectedOpportunity}
              onOpenScoringConfig={() => setIsScoringConfigOpen(true)}
              onOpenProject={(pId) => {
                const p = projects.find((item) => item.id === pId);
                if (p) setSelectedProject(p);
              }}
            />
          )}

          {activeTab === 'scoring' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                    <span className="text-2xl font-bold font-mono">100</span>
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-white">
                      Modelo Configurable de Scoring Comercial (100 Puntos)
                    </h2>
                    <p className="text-xs text-slate-400">
                      Representa el atractivo comercial para prospectar, no la probabilidad matemática de adjudicación
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Conforme a la sección 7 del prompt maestro, RADAR MINERO evalúa cada oportunidad comercial combinando 6 variables ponderables. Los usuarios pueden adaptar las ponderaciones de acuerdo con su modelo de negocio (ej. empresas de ingeniería que buscan proyectos tempranos vs contratistas de montaje que buscan proyectos con EPCM ya adjudicado).
                </p>

                <button
                  onClick={() => setIsScoringConfigOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
                >
                  Abrir Calibrador de Ponderaciones (Sliders)
                </button>
              </div>

              {/* Vista actual de ponderaciones */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-400 block">Madurez del Proyecto</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">{scoringWeights.maturity} pts</span>
                  <span className="text-[10px] text-slate-500">Etapa 1 a 14</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-400 block">Señales Recientes</span>
                  <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">{scoringWeights.recentSignals} pts</span>
                  <span className="text-[10px] text-slate-500">Últimos 90 días</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-400 block">Compatibilidad Servicio</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{scoringWeights.serviceFit} pts</span>
                  <span className="text-[10px] text-slate-500">Alineación técnica</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-400 block">Actores y Decisores</span>
                  <span className="text-2xl font-bold font-mono text-purple-400 mt-1 block">{scoringWeights.actorsIdentified} pts</span>
                  <span className="text-[10px] text-slate-500">Contactos mapeados</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-400 block">Tamaño y Viabilidad</span>
                  <span className="text-2xl font-bold font-mono text-rose-400 mt-1 block">{scoringWeights.economicSize} pts</span>
                  <span className="text-[10px] text-slate-500">Volumen CAPEX</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <span className="text-xs font-semibold text-slate-400 block">Ventana Anticipación</span>
                  <span className="text-2xl font-bold font-mono text-blue-400 mt-1 block">{scoringWeights.anticipationWindow} pts</span>
                  <span className="text-[10px] text-slate-500">Meses antes de RFQ</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Modals */}
      {isBuilderOpen && currentDashboard && (
        <DashboardBuilderModal
          isOpen={isBuilderOpen}
          onClose={() => setIsBuilderOpen(false)}
          currentDashboard={currentDashboard}
          allDashboards={dashboards}
          onSaveDashboard={handleSaveDashboard}
          onCreateNewDashboard={handleCreateNewDashboard}
          onDuplicateDashboard={handleDuplicateDashboard}
          onRestoreDefaults={handleRestoreDefaults}
        />
      )}

      {isSimulatorOpen && (
        <SignalSimulatorModal
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
          projects={projects}
          onIngestSignal={handleIngestSignal}
        />
      )}

      {isAdminControlPanelOpen && (
        <AdminControlPanelModal
          isOpen={isAdminControlPanelOpen}
          onClose={() => setIsAdminControlPanelOpen(false)}
          adminEmail={userEmail}
        />
      )}

      {isAccountOpen && (
        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          email={userEmail}
          brand={clientBrand}
          onSaveBrand={handleSaveBrand}
          providerServices={providerServices}
          onOpenProviderProfile={() => { setIsAccountOpen(false); setIsProfileOpen(true); }}
          onOpenScoringConfig={() => { setIsAccountOpen(false); setIsScoringConfigOpen(true); }}
          onOpenScoringGuide={() => { setIsAccountOpen(false); setActiveTab('scoring'); }}
          onRestoreDefaults={handleRestoreDefaults}
          onOpenAdminPanel={() => setIsAdminControlPanelOpen(true)}
          isAdmin={isAdmin}
        />
      )}

      {showCurtain && (
        <AccessCurtain
          ready={dataReady}
          email={userEmail}
          clientBrand={clientBrand}
          stats={{
            projects: projects.length,
            capexMillions: projects.reduce((t, p) => t + (p.capexEstimatedMillionsUSD || 0), 0),
            signals: signals.length,
          }}
          onEnter={enterRadar}
        />
      )}

      {isProfileOpen && (
        <ProviderProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          currentServices={providerServices}
          onSave={handleSaveProfile}
        />
      )}

      {isScoringConfigOpen && (
        <ScoringConfigModal
          isOpen={isScoringConfigOpen}
          onClose={() => setIsScoringConfigOpen(false)}
          currentWeights={scoringWeights}
          onSaveWeights={handleSaveWeights}
        />
      )}

      {/* Detail Modals */}
      {selectedSignal && (
        <SignalDetailModal
          signal={selectedSignal}
          onClose={() => setSelectedSignal(null)}
          onOpenProject={(pId) => {
            const p = projects.find((item) => item.id === pId);
            if (p) {
              setSelectedSignal(null);
              setSelectedProject(p);
            }
          }}
        />
      )}

      <button
        onClick={() => {
          setBriefProject(null);
          setAssistantOpen(true);
        }}
        className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-xl hover:bg-amber-300 transition"
        aria-label="Abrir asistente de IA"
      >
        <span aria-hidden>✦</span> Asistente IA
      </button>

      <AssistantPanel
        isOpen={assistantOpen}
        onClose={() => {
          setAssistantOpen(false);
          setBriefProject(null);
        }}
        briefProject={briefProject}
        providerServiceLabels={providerServices.map(serviceLabel)}
      />

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onGenerateBrief={(p) => {
            setBriefProject(p);
            setAssistantOpen(true);
          }}
          onSelectCompanyByName={(name) => {
            const c = companies.find((item) => item.name === name);
            if (c) {
              setSelectedProject(null);
              setSelectedCompany(c);
            }
          }}
        />
      )}

      {selectedCompany && (
        <CompanyDetailModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onOpenProject={(pId) => {
            const p = projects.find((item) => item.id === pId);
            if (p) {
              setSelectedCompany(null);
              setSelectedProject(p);
            }
          }}
        />
      )}

      {selectedOpportunity && (
        <OpportunityDetailModal
          opportunity={selectedOpportunityView}
          onUpdate={handleUpdateOpportunity}
          onClose={() => setSelectedOpportunity(null)}
          onOpenProject={(pId) => {
            const p = projects.find((item) => item.id === pId);
            if (p) {
              setSelectedOpportunity(null);
              setSelectedProject(p);
            }
          }}
          onOpenScoringConfig={() => {
            setSelectedOpportunity(null);
            setIsScoringConfigOpen(true);
          }}
        />
      )}
    </div>
  );
};

export default App;
