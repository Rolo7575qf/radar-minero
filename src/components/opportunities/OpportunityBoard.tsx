import React, { useState } from 'react';
import {
  CommercialOpportunity,
  OpportunityPriority,
  CommercialStatus,
} from '../../types/opportunity';
import { Badge } from '../common/Badge';
import {
  Target,
  Search,
  Filter,
  Sliders,
  Users,
  Clock,
  Sparkles,
  Kanban,
  List,
  Building2,
  ChevronRight,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

interface OpportunityBoardProps {
  opportunities: CommercialOpportunity[];
  onSelectOpportunity: (opportunity: CommercialOpportunity) => void;
  onOpenScoringConfig: () => void;
  onOpenProject?: (projectId: string) => void;
}

export const OpportunityBoard: React.FC<OpportunityBoardProps> = ({
  opportunities,
  onSelectOpportunity,
  onOpenScoringConfig,
  onOpenProject,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('Todas');

  const PRIORITIES: (OpportunityPriority | 'Todas')[] = [
    'Todas',
    'Máxima',
    'Alta',
    'Media',
    'Baja-media',
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesPriority = selectedPriority === 'Todas' || opp.priority === selectedPriority;
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.targetCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.relatedProjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.potentialNeed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const priorityColumns: OpportunityPriority[] = ['Máxima', 'Alta', 'Media', 'Baja-media'];

  const priorityBadgeVariant = (p: OpportunityPriority) => {
    switch (p) {
      case 'Máxima':
        return 'emerald';
      case 'Alta':
        return 'amber';
      case 'Media':
        return 'cyan';
      default:
        return 'slate';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white">
              Motor de Oportunidades Comerciales B2B
            </h2>
            <p className="text-xs text-slate-400">
              Transformación de señales tempranas en prospección calificada antes de licitaciones públicas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Switch View Mode */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                viewMode === 'kanban'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-slate-800 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Lista</span>
            </button>
          </div>

          <button
            onClick={onOpenScoringConfig}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Ponderar 100 Puntos</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por servicio, empresa objetivo, decisor o necesidad..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Prioridad:</span>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* View: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {priorityColumns.map((colPriority) => {
            const oppsInCol = filteredOpportunities.filter((o) => o.priority === colPriority);

            const colHeaders = {
              'Máxima': { title: 'Prioridad Máxima', color: 'border-emerald-500/40 text-emerald-300' },
              'Alta': { title: 'Prioridad Alta', color: 'border-amber-500/40 text-amber-300' },
              'Media': { title: 'Prioridad Media', color: 'border-cyan-500/40 text-cyan-300' },
              'Baja-media': { title: 'Baja-Media', color: 'border-slate-700 text-slate-400' },
            };

            return (
              <div
                key={colPriority}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className={`text-xs font-bold uppercase tracking-wider ${colHeaders[colPriority].color}`}>
                    {colHeaders[colPriority].title}
                  </span>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                    {oppsInCol.length}
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-3 min-h-[300px]">
                  {oppsInCol.map((opp) => (
                    <div
                      key={opp.id}
                      onClick={() => onSelectOpportunity(opp)}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group shadow-md space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-1 text-[11px]">
                        <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                          {opp.scoring.totalScore} pts
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          {opp.commercialStatus}
                        </span>
                      </div>

                      <h4 className="text-xs font-extrabold text-white group-hover:text-emerald-300 transition leading-snug">
                        {opp.title}
                      </h4>

                      <div className="text-[11px] text-amber-300/90 font-medium truncate">
                        🏢 {opp.targetCompany}
                      </div>

                      <div className="text-[10.5px] text-slate-400 line-clamp-2">
                        {opp.potentialNeed}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-emerald-400" />
                          {opp.keyDecisionMakers.length} decisores
                        </span>
                        <span className="text-amber-400 font-medium">
                          {opp.anticipationWindowMonths}m previos
                        </span>
                      </div>
                    </div>
                  ))}

                  {oppsInCol.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-600 italic">
                      Sin oportunidades en este rango
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View: LIST TABLE */}
      {viewMode === 'list' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Oportunidad & Solución</th>
                  <th className="py-3 px-4">Empresa Objetivo</th>
                  <th className="py-3 px-4">Proyecto & País</th>
                  <th className="py-3 px-4 text-center">Score (100)</th>
                  <th className="py-3 px-4">Prioridad</th>
                  <th className="py-3 px-4">Ventana</th>
                  <th className="py-3 px-4">Decisores</th>
                  <th className="py-3 px-4 text-right">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOpportunities.map((opp) => (
                  <tr
                    key={opp.id}
                    onClick={() => onSelectOpportunity(opp)}
                    className="hover:bg-slate-800/50 cursor-pointer group transition"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white group-hover:text-emerald-300 transition">
                        {opp.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {opp.relatedSolutionCategory}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-200">
                      {opp.targetCompany}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <div>{opp.relatedProjectName}</div>
                      <div className="text-[10px] text-slate-500">{opp.country}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800">
                        {opp.scoring.totalScore}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={priorityBadgeVariant(opp.priority) as any} size="sm">
                        {opp.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 font-mono text-amber-400 font-semibold">
                      {opp.anticipationWindowMonths} meses
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-400" />
                        {opp.keyDecisionMakers.length} identificados
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-slate-400 group-hover:text-emerald-400 p-1 rounded hover:bg-slate-800 transition">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
