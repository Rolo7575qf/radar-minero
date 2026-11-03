import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { DashboardBuilderModal } from './components/dashboard/DashboardBuilderModal';
import { SignalFeed } from './components/signals/SignalFeed';
import { SignalDetailModal } from './components/signals/SignalDetailModal';
import { SignalSimulatorModal } from './components/signals/SignalSimulatorModal';
import { ProjectList } from './components/projects/ProjectList';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { EcosystemNetwork } from './components/ecosystem/EcosystemNetwork';
import { CompanyList } from './components/ecosystem/CompanyList';
import { CompanyDetailModal } from './components/ecosystem/CompanyDetailModal';
import { OpportunityBoard } from './components/opportunities/OpportunityBoard';
import { OpportunityDetailModal } from './components/opportunities/OpportunityDetailModal';
import { ScoringConfigModal } from './components/opportunities/ScoringConfigModal';

import { MiningProject } from './types/project';
import { EarlySignal } from './types/signal';
import { MiningCompany } from './types/company';
import { CommercialOpportunity, ScoringWeights } from './types/opportunity';
import { DashboardConfig } from './types/dashboard';

import { storageService } from './services/storageService';
import { signalEngine, IngestSignalPayload } from './services/signalEngine';
import { calculateOpportunityScore, getPriorityFromScore } from './services/scoringService';

export const App: React.FC = () => {
  // Navigation & Filtering State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedCountry, setSelectedCountry] = useState<string>('Chile');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core Data State
  const [projects, setProjects] = useState<MiningProject[]>([]);
  const [signals, setSignals] = useState<EarlySignal[]>([]);
  const [companies, setCompanies] = useState<MiningCompany[]>([]);
  const [relations, setRelations] = useState(storageService.getEcosystemRelations());
  const [opportunities, setOpportunities] = useState<CommercialOpportunity[]>([]);
  const [dashboards, setDashboards] = useState<DashboardConfig[]>([]);
  const [activeDashboardId, setActiveDashboardId] = useState<string>('');
  const [scoringWeights, setScoringWeights] = useState<ScoringWeights>(storageService.getScoringWeights());

  // Modal State
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isScoringConfigOpen, setIsScoringConfigOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<MiningProject | null>(null);
  const [selectedSignal, setSelectedSignal] = useState<EarlySignal | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<MiningCompany | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<CommercialOpportunity | null>(null);

  // Initialize data from local storage
  useEffect(() => {
    setProjects(storageService.getProjects());
    setSignals(storageService.getSignals());
    setCompanies(storageService.getCompanies());
    setRelations(storageService.getEcosystemRelations());
    setOpportunities(storageService.getOpportunities());
    setDashboards(storageService.getDashboards());
    setActiveDashboardId(storageService.getActiveDashboardId());
    setScoringWeights(storageService.getScoringWeights());
  }, []);

  // Filter projects/signals by global search or country
  const filteredProjectsByCountry = projects.filter((p) => {
    const matchesCountry = selectedCountry === 'Todos' || p.country === selectedCountry;
    const matchesQuery = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ownerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mainMineral.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesQuery;
  });

  const filteredSignalsByCountry = signals.filter((s) => {
    const matchesCountry = selectedCountry === 'Todos' || s.country === selectedCountry;
    const matchesQuery = !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.relatedProjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.commercialInterpretation.hypothesis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesQuery;
  });

  const filteredOpportunitiesByCountry = opportunities.filter((o) => {
    const matchesCountry = selectedCountry === 'Todos' || o.country === selectedCountry;
    const matchesQuery = !searchQuery ||
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.targetCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.relatedProjectName.toLowerCase().includes(searchQuery.toLowerCase());
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

  const handleRestoreDefaults = () => {
    storageService.resetAllToDefaults();
    setProjects(storageService.getProjects());
    setSignals(storageService.getSignals());
    setCompanies(storageService.getCompanies());
    setOpportunities(storageService.getOpportunities());
    setDashboards(storageService.getDashboards());
    setActiveDashboardId(storageService.getActiveDashboardId());
    setScoringWeights(storageService.getScoringWeights());
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
    const recalculated = opportunities.map((opp) => {
      const proj = projects.find((p) => p.id === opp.relatedProjectId) || {};
      const projSignals = signals.filter((s) => s.relatedProjectId === opp.relatedProjectId);

      const newScore = calculateOpportunityScore(
        proj,
        projSignals,
        opp.involvedCompanies.length,
        opp.keyDecisionMakers.length,
        opp.anticipationWindowMonths,
        newWeights
      );

      return {
        ...opp,
        scoring: newScore,
        priority: getPriorityFromScore(newScore.totalScore),
      };
    });

    setOpportunities(recalculated);
    storageService.saveOpportunities(recalculated);
  };

  const currentDashboard =
    dashboards.find((d) => d.id === activeDashboardId) || dashboards[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
        onOpenSignalSimulator={() => setIsSimulatorOpen(true)}
        onOpenScoringConfig={() => setIsScoringConfigOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetData={handleRestoreDefaults}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={{
            signals: filteredSignalsByCountry.length,
            projects: filteredProjectsByCountry.length,
            companies: companies.length,
            opportunities: filteredOpportunitiesByCountry.length,
          }}
        />

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
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
              onOpenSimulator={() => setIsSimulatorOpen(true)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectList
              projects={filteredProjectsByCountry}
              onSelectProject={setSelectedProject}
              selectedCountry={selectedCountry}
            />
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

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
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
          opportunity={selectedOpportunity}
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
