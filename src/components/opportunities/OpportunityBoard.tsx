import React, { useState } from 'react';
import {
  CommercialOpportunity,
  OpportunityPriority,
  CommercialStatus,
} from '../../types/opportunity';
import { Badge } from '../common/Badge';
import { SectionHeader } from '../common/SectionHeader';
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
  const [groupBy, setGroupBy] = useState<'priority' | 'stage'>('priority');

  const STAGES = [
    'Identificada Tempranamente',
    'En Análisis Comercial',
    'Mapeo de Decisores',
    'Contacto Inicial / Warm Intro',
    'Precalificación Abierta',
    'RFI / RFQ en Proceso',
    'Ganada',
    'Descartada / Archivada',
  ];

  const colHeaders = {
    'Máxima': { title: 'Prioridad máxima', color: 'text-amber-400', bar: 'bg-amber-400' },
    'Alta': { title: 'Prioridad alta', color: 'text-amber-300', bar: 'bg-amber-400/60' },
    'Media': { title: 'Prioridad media', color: 'text-slate-200', bar: 'bg-slate-500' },
    'Baja-media': { title: 'Baja-media', color: 'text-slate-400', bar: 'bg-slate-700' },
  };

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
      {/* Encabezado */}
      <SectionHeader
        eyebrow="Pipeline comercial"
        title="Dónde entrar primero"
        description="Oportunidades ordenadas por un puntaje de 100 según su perfil de proveedor. Abra una para ver decisores, siguiente paso y su seguimiento."
        stats={[
          { value: opportunities.length, label: 'Oportunidades' },
          { value: opportunities.filter((o) => o.priority === 'Máxima' || o.priority === 'Alta').length, label: 'Prioridad alta' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-[6px] p-0.5 text-[11px]">
              {([['kanban', 'Tablero', Kanban], ['list', 'Lista', List]] as const).map(([m, label, Icon]) => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] font-bold transition ${
                    viewMode === m ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={onOpenScoringConfig}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[6px] border border-slate-700 text-slate-200 hover:border-amber-400 hover:text-amber-400 text-[11px] font-bold transition"
            >
              <Sliders className="w-3.5 h-3.5" strokeWidth={1.5} />
              Ponderaciones
            </button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por servicio, empresa objetivo, decisor o necesidad..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Prioridad:</span>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
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
        <div className="flex items-center gap-2 text-xs">
          <span className="ic-eyebrow text-[9px] text-slate-500">Agrupar por</span>
          {(['priority', 'stage'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGroupBy(g)}
              className={`px-3 py-1.5 rounded-[6px] text-[11px] font-bold border transition ${
                groupBy === g
                  ? 'bg-white text-slate-950 border-white'
                  : 'text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {g === 'priority' ? 'Prioridad' : 'Etapa del pipeline'}
            </button>
          ))}
        </div>
      )}

      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {(groupBy === 'priority' ? (priorityColumns as string[]) : STAGES).map((colKey) => {
            const colPriority = colKey as keyof typeof colHeaders;
            const oppsInCol = filteredOpportunities.filter((o) =>
              groupBy === 'priority' ? o.priority === colKey : o.commercialStatus === colKey
            );

            const header =
              groupBy === 'priority'
                ? colHeaders[colPriority]
                : { title: colKey, color: 'border-slate-700 text-slate-300' };

            return (
              <div
                key={colKey}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex flex-col space-y-3"
              >
                {/* Column Header */}
                <div className="px-1 pt-1">
                  <div className="flex items-center justify-between">
                    <span className={`ic-eyebrow text-[10px] ${header.color}`}>{header.title}</span>
                    <span className="ic-mono text-[11px] font-bold text-white">{oppsInCol.length}</span>
                  </div>
                  <div className={`mt-2.5 h-[2px] rounded ${'bar' in header ? (header as { bar: string }).bar : 'bg-slate-700'}`} />
                </div>

                {/* Cards in Column */}
                <div className="space-y-2.5 min-h-[300px]">
                  {oppsInCol.map((opp) => {
                    const sc = opp.scoring.totalScore;
                    return (
                    <div
                      key={opp.id}
                      onClick={() => onSelectOpportunity(opp)}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400/70 hover:-translate-y-0.5 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-baseline gap-1">
                          <span className={`ic-display text-[26px] leading-none ${sc >= 68 ? 'text-amber-400' : 'text-white'}`}>{sc}</span>
                          <span className="ic-mono text-[10px] text-slate-500">/100</span>
                        </div>
                        <span className="text-[10px] text-slate-500 text-right leading-tight max-w-[55%]">{opp.commercialStatus}</span>
                      </div>

                      <h4 className="mt-3 text-[13px] font-bold text-white leading-snug group-hover:text-amber-300 transition">
                        {opp.title}
                      </h4>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-300 truncate">
                        <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" strokeWidth={1.5} />
                        <span className="truncate">{opp.targetCompany}</span>
                      </div>

                      <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{opp.potentialNeed}</p>

                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Users className="w-3 h-3" strokeWidth={1.5} />
                          {opp.keyDecisionMakers.length ? `${opp.keyDecisionMakers.length} decisores` : 'Sin decisores'}
                        </span>
                        <span className="ic-mono text-slate-300">
                          VENTANA <span className="text-amber-400 font-bold">{opp.anticipationWindowMonths} M</span>
                        </span>
                      </div>
                    </div>
                    );
                  })}

                  {oppsInCol.length === 0 && (
                    <div className="py-10 text-center text-[11px] text-slate-600 border border-dashed border-slate-800 rounded-xl">
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
                      <div className="font-bold text-white group-hover:text-amber-300 transition">
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
                      <span className="ic-display text-[15px] text-amber-400">
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
